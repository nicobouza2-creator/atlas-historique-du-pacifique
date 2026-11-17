#!/usr/bin/env python3
"""Capsule vidéo pilote « Le nickel, de la montagne au monde » (≈ 55 s, 1280×720, 20 images/s).

© 2026 Nicolas BOUZA — idée, conception et réalisation, avec l'assistance de Claude (Anthropic) — CC BY-NC-ND 4.0.

Principe : la carte animée du volet Nickel (chapitres « De la montagne à la mer » et « Le nickel voyage dans le monde »)
est rendue image par image par le vrai moteur de l'atlas (Chrome sans écran, Playwright) ; on superpose des sprites posés
sur les lieux, des photos légendées et créditées, une pastille d'étape et de gros sous-titres. La voix vient de Piper
(fr_FR-siwis-medium). ffmpeg assemble le tout en MP4 (H.264 + AAC) ; un fichier .srt est écrit à côté.

Usage :
  python3 capsule_nickel.py --depot <dossier du dépôt> --voix <dossier contenant fr_FR-siwis-medium.onnx(.json)>
                            --d3 <d3.min.js> [--travail /tmp/cap-nickel] [--sortie video/capsule-nickel.mp4]
                            [--essai]   # une image par scène (PNG) au lieu de la vidéo
Prérequis : python3 (playwright, piper-tts, pillow), Chrome, ffmpeg. d3 7.8.5 en local (le CDN n'est pas joignable partout).
Aucune modification du dépôt : un petit crochet window.__proj (projection → pixels) est injecté à la volée dans engine.js.
"""
import argparse, functools, http.server, json, math, os, re, shutil, socketserver, subprocess, sys, threading, wave

FPS = 20
W, H = 1280, 720
VOLET = 5                    # index du volet « nickel » dans window.__info()
CH_MONTAGNE, CH_MONDE = 3, 6  # index des chapitres : « De la montagne à la mer », « Le nickel voyage dans le monde »

# Lieux (lon, lat) tirés de js/v-nickel.js
LIEU = dict(koniambo=(164.793, -20.975), vavouto=(164.683, -21.014), kouaouam=(165.84, -21.40), doniambo=(166.43, -22.25), chine=(122.2, 31.0))

# --- Scénario --------------------------------------------------------------------------------------------------------
# texte : ce que dit la voix (et ce qui s'affiche en sous-titres). tts : respellings pour Piper seulement.
# a→b : intervalle de temps du chapitre (en secondes d'animation de l'atlas) déroulé pendant la scène.
# sprites : (id, fichier, lieu, largeur px, entrée en s, décalage x, décalage y) ; photos : (id, entrée, sortie, côté)
SCENES = [
    dict(id='titre', plan=3.6, ci=CH_MONTAGNE, a=0.0, b=1.0, chip=None,
         texte="Le nickel, de la montagne au monde.", title=True, voix_delai=0.5),
    dict(id='mine', plan=7.5, ci=CH_MONTAGNE, a=0.0, b=4.0, chip=(1, "La mine"),
         texte="Tout commence à la mine. Des pelles géantes creusent la montagne : on garde le minerai riche en nickel.",
         sprites=[('mine', 'l-mine.png', 'koniambo', 112, 0.6, 14, -26), ('camion', 's-camion-minier.png', 'koniambo', 74, 2.8, -74, -34)]),
    dict(id='convoyeur', plan=5.6, ci=CH_MONTAGNE, a=4.0, b=10.0, chip=(2, "Le convoyeur"),
         texte="Un convoyeur, un long tapis roulant, descend le minerai jusqu'à l'usine.",
         sprites=[('mine', 'l-mine.png', 'koniambo', 74, -9, 14, -22), ('usine1', 'l-usine.png', 'vavouto', 92, 2.4, -30, 0)],
         photos=[('conv', 0.8, None, 'd')]),
    dict(id='bateau', plan=5.6, ci=CH_MONTAGNE, a=10.0, b=17.0, chip=(3, "Le bateau"),
         texte="Puis un minéralier, un grand navire, l'emporte à travers le lagon.",
         sprites=[('usine1', 'l-usine.png', 'vavouto', 92, -9, -30, 0)],
         photos=[('vraq', 0.6, None, 'd')]),
    dict(id='usine', plan=9.8, ci=CH_MONTAGNE, a=25.0, b=44.0, chip=(4, "L'usine"),
         texte="Sur la côte Est, le minerai est chargé sur des bateaux. Ils contournent la Grande Terre jusqu'à l'usine de Doniambo, à Nouméa.",
         tts={"Doniambo": "Donniambo", "côte Est": "côte Èst"},
         sprites=[('wharf', 'l-wharf.png', 'kouaouam', 84, 0.8, 26, 0), ('usine2', 'l-usine.png', 'doniambo', 84, 6.2, 0, -2)],
         photos=[('doni', 6.0, None, 'g')]),
    dict(id='monde', plan=8.4, ci=CH_MONDE, a=6.0, b=19.5, chip=(5, "Le monde"),
         texte="Presque tout le nickel part à l'étranger, surtout en Asie : en Chine, au Japon et en Corée du Sud.",
         sprites=[('port', 'l-port-conteneurs.png', 'chine', 70, 5.4, 0, 0)]),
    dict(id='usages', plan=6.4, ci=CH_MONDE, a=42.0, b=52.0, chip=(6, "À quoi sert le nickel ?"),
         texte="Là-bas, il sert à fabriquer l'acier inoxydable, et aussi des batteries.",
         photos=[('inox', 0.6, 3.5, 'd'), ('batt', 3.1, None, 'd')]),
    dict(id='fin', plan=7.0, ci=CH_MONDE, a=52.0, b=58.0, chip=None, fin=True,
         texte="À retenir : la mine, le convoyeur, le minéralier, l'usine, et le monde."),
]
TOUS_SPRITES = []  # rempli dans main()
FADE = 0.30  # fondu au noir entre scènes (s)

PHOTOS = {  # clé → (fichier dans img/, légende, crédit) ; légendes et crédits repris de js/img.js
    'conv': ('kouaouaconv', "Un convoyeur de minerai (ici à Kouaoua)", "Monofruit · CC0 · Wikimedia Commons"),
    'vraq': ('vraquier', "Un minéralier en chargement à un quai minier", "Calistemon · CC BY-SA 4.0 · Wikimedia Commons"),
    'doni': ('doniambo2', "L'usine de Doniambo, à Nouméa", "Monofruit · CC0 · Wikimedia Commons"),
    'inox': ('inox', "Des bols en acier inoxydable", "Fumikas Sagisavas · CC0 · Wikimedia Commons"),
    'batt': ('batterie', "Des cellules de batterie lithium-ion", "Sevenethics · CC0 · Wikimedia Commons"),
}
FIN_MOTS = [("1", "La mine", 'l-mine.png'), ("2", "Le convoyeur", 'photo:kouaouaconv'), ("3", "Le minéralier", 'b-mineralier.png'),
            ("4", "L'usine", 'l-usine.png'), ("5", "Le monde", 'l-port-conteneurs.png')]


def ease_out(x):
    x = min(1, max(0, x)); return 1 - (1 - x) ** 3
def back(x):
    x = min(1, max(0, x)); c = 1.70158; return 1 + (c + 1) * (x - 1) ** 3 + c * (x - 1) ** 2


# --- Voix ------------------------------------------------------------------------------------------------------------
def synth_voix(travail, voix_dir):
    from piper import PiperVoice, SynthesisConfig
    v = PiperVoice.load(os.path.join(voix_dir, 'fr_FR-siwis-medium.onnx'))
    cfg = SynthesisConfig(length_scale=1.1)          # un peu plus lent : élèves à besoins particuliers
    for s in SCENES:
        txt = s['texte']
        for k, r in s.get('tts', {}).items(): txt = txt.replace(k, r)
        p = os.path.join(travail, f"voix-{s['id']}.wav")
        with wave.open(p, 'wb') as w: v.synthesize_wav(txt, w, syn_config=cfg)
        with wave.open(p) as w: s['voix_s'] = w.getnframes() / w.getframerate(); s['voix_sr'] = w.getframerate()
        s['voix_delai'] = s.get('voix_delai', 0.35)
        s['dur'] = max(s['plan'], s['voix_s'] + s['voix_delai'] + 0.7)
    t = 0.0
    for s in SCENES: s['t0'] = t; t += s['dur']
    return t


def mixer_audio(travail, total):
    sr = SCENES[0]['voix_sr']; buf = bytearray(int(total * sr) * 2)
    for s in SCENES:
        with wave.open(os.path.join(travail, f"voix-{s['id']}.wav")) as w: d = w.readframes(w.getnframes())
        o = int((s['t0'] + s['voix_delai']) * sr) * 2; buf[o:o + len(d)] = d
    p = os.path.join(travail, 'voix.wav')
    with wave.open(p, 'wb') as w: w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr); w.writeframes(bytes(buf))
    return p


def morceaux(texte):
    """Découpe en morceaux de sous-titres (phrases, puis virgules/deux-points si trop long)."""
    ph = re.findall(r'[^.!?]+[.!?]?', texte); out = []
    for p in ph:
        p = p.strip()
        if not p: continue
        if len(p) > 62:
            parts = re.split(r'(?<=[,:;])\s+', p); cur = ''
            for q in parts:
                if cur and len(cur) + len(q) > 62: out.append(cur.strip()); cur = q
                else: cur = (cur + ' ' + q).strip()
            if cur: out.append(cur)
            if len(out) > 1 and len(out[-1]) < 16: dernier = out.pop(); out[-1] += ' ' + dernier   # pas d'orphelin d'un mot
        else: out.append(p)
    return out


def sous_titres():
    """Retourne la liste (début, fin, texte) pour toute la vidéo."""
    L = []
    for s in SCENES:
        ch = morceaux(s['texte']); n = sum(len(c) for c in ch); t = s['t0'] + s['voix_delai']
        for c in ch:
            d = s['voix_s'] * len(c) / n; L.append((t, t + d, c)); t += d
    return L


def srt(L, path):
    def f(x): h = int(x // 3600); m = int(x % 3600 // 60); sec = x % 60; return f"{h:02d}:{m:02d}:{int(sec):02d},{int(round((sec % 1) * 1000)):03d}"
    with open(path, 'w', encoding='utf-8') as fh:
        for i, (a, b, t) in enumerate(L, 1): fh.write(f"{i}\n{f(a)} --> {f(b)}\n{t}\n\n")


# --- Calque HTML posé sur la carte -----------------------------------------------------------------------------------
CSS = """
html,body{margin:0;overflow:hidden;background:#000}
body>*:not(#app):not(#cap-ov){display:none!important}
#app{position:static!important;display:block!important}
#app .head,#app .chipwrap,#app .frise,#app .colR,#app .zoom,#app .sig,#app #tb,#photos{display:none!important}
#app .cols,#app .colL{display:block!important;position:static!important;padding:0!important;margin:0!important;width:auto!important;height:auto!important}
#stage{position:fixed!important;left:0;top:0;width:100vw!important;height:100vh!important;margin:0!important;border-radius:0!important;z-index:5}
#cap-ov{position:fixed;left:0;top:0;width:1280px;height:720px;z-index:50;pointer-events:none;font-family:Inter,'DejaVu Sans',Arial,sans-serif;color:#fff}
#cap-ov .cv-spr{position:absolute;left:0;top:0;transform-origin:50% 100%;filter:drop-shadow(0 5px 6px rgba(0,0,0,.55));display:none}
#cap-ov .cv-ph{position:absolute;left:0;top:0;width:392px;margin:0;padding:10px 10px 8px;background:#f7f2e6;color:#1d2530;border-radius:6px;box-shadow:0 10px 26px rgba(0,0,0,.5);display:none}
#cap-ov .cv-ph img{display:block;width:392px;height:262px;object-fit:cover;border-radius:3px}
#cap-ov .cv-ph b{display:block;font:700 20px/1.2 Inter,'DejaVu Sans',sans-serif;margin:8px 2px 2px}
#cap-ov .cv-ph small{display:block;font:500 12px/1.25 Inter,'DejaVu Sans',sans-serif;color:#5b6573;margin:0 2px}
#cap-ov .cv-chip{position:absolute;left:28px;top:24px;display:none;align-items:center;gap:12px;white-space:nowrap;color:#fff;background:rgba(7,18,36,.86);border:2px solid #ffd166;border-radius:40px;padding:6px 22px 6px 8px;font:800 30px/1 Inter,'DejaVu Sans',sans-serif}
#cap-ov .cv-chip span{color:#fff;white-space:nowrap}
#cap-ov .cv-chip i{flex:none;font-style:normal;display:flex;align-items:center;justify-content:center;width:46px;height:46px;border-radius:50%;background:#ffd166;color:#10202f;font-size:28px}
#cap-ov .cv-sub{position:absolute;left:80px;right:80px;bottom:34px;text-align:center;display:none}
#cap-ov .cv-sub span{display:inline-block;background:rgba(6,16,32,.88);padding:10px 26px 12px;border-radius:16px;font:700 38px/1.28 Inter,'DejaVu Sans',sans-serif;max-width:1100px}
#cap-ov .cv-fade{position:absolute;inset:0;background:#000;opacity:0}
#cap-ov .cv-card{position:absolute;inset:0;display:none;background:radial-gradient(ellipse at 50% 40%,#16406a 0%,#0a1c33 65%,#050d1a 100%);text-align:center}
#cap-ov .cv-card h1{margin:0;font:800 74px/1.08 Inter,'DejaVu Sans',sans-serif}
#cap-ov .cv-card h1 em{font-style:normal;color:#ffd166}
#cap-ov .cv-card .cv-sg{position:absolute;left:0;right:0;bottom:22px;font:600 17px/1.3 Inter,'DejaVu Sans',sans-serif;color:rgba(244,240,230,.7)}
#cap-ov .cv-card .cv-tt{position:absolute;left:90px;right:90px;top:210px}
#cap-ov .cv-card .cv-tt p{margin:22px 0 0;font:600 30px/1.3 Inter,'DejaVu Sans',sans-serif;color:#cfe3f7}
#cap-ov .cv-card .cv-sp0{position:absolute;left:50%;top:70px;margin-left:-80px;height:120px}
#cap-ov .cv-fin h2{position:absolute;left:0;right:0;top:34px;margin:0;font:800 52px/1 Inter,'DejaVu Sans',sans-serif;color:#ffd166}
#cap-ov .cv-fin .cv-row{position:absolute;left:36px;right:36px;top:128px;display:flex;justify-content:space-between}
#cap-ov .cv-fin .cv-col{width:222px;opacity:0}
#cap-ov .cv-fin .cv-rond{width:172px;height:172px;margin:0 auto;border-radius:50%;background:#e9f1f8;display:flex;align-items:center;justify-content:center;overflow:hidden;border:5px solid #ffd166}
#cap-ov .cv-fin .cv-rond img{max-width:132px;max-height:118px}
#cap-ov .cv-fin .cv-rond img.photo{max-width:none;max-height:none;width:100%;height:100%;object-fit:cover}
#cap-ov .cv-fin .cv-col b{display:block;margin-top:16px;font:800 32px/1.1 Inter,'DejaVu Sans',sans-serif}
#cap-ov .cv-fin .cv-col span{display:inline-block;width:44px;height:44px;line-height:44px;border-radius:50%;background:#ffd166;color:#10202f;font:800 26px/44px Inter,'DejaVu Sans',sans-serif;margin-bottom:8px}
"""

INIT = """
(function(spec){
  var ov=document.createElement('div');ov.id='cap-ov';document.body.appendChild(ov);var h='';
  Object.keys(spec.sprites).forEach(function(k){h+='<img class="cv-spr" id="sp_'+k+'" src="/_cap/'+spec.sprites[k]+'">';});
  Object.keys(spec.photos).forEach(function(k){var p=spec.photos[k];h+='<figure class="cv-ph" id="ph_'+k+'"><img src="/img/'+p[0]+'.jpg"><b>'+p[1]+'</b><small>'+p[2]+'</small></figure>';});
  h+='<div class="cv-chip" id="cv_chip"><i></i><span></span></div><div class="cv-sub" id="cv_sub"><span></span></div>';
  h+='<div class="cv-card" id="cv_titre"><img class="cv-sp0" src="/_cap/l-mine.png"><div class="cv-tt"><h1>Le <em>nickel</em>,<br>de la montagne<br>au monde</h1><p>Une capsule de l’Atlas historique du Pacifique</p></div><div class="cv-sg">© 2026 Nicolas BOUZA · Atlas historique du Pacifique · CC BY-NC-ND 4.0</div></div>';
  h+='<div class="cv-card cv-fin" id="cv_fin"><h2>À retenir</h2><div class="cv-row">';
  spec.fin.forEach(function(m,i){var im=m[2].indexOf('photo:')==0?'<img class="cv-photo" src="/img/'+m[2].slice(6)+'.jpg">':'<img src="/_cap/'+m[2]+'">';
    h+='<div class="cv-col" id="cv_fc'+i+'"><div class="cv-rond">'+im+'</div><b><span>'+m[0]+'</span><br>'+m[1]+'</b></div>';});
  h+='</div><div class="cv-sg">Photos : Wikimedia Commons (Monofruit, CC0) · sprites : Atlas historique du Pacifique · © 2026 Nicolas BOUZA</div></div>';
  h+='<div class="cv-fade" id="cv_fade"></div>';
  ov.innerHTML=h;
  return Promise.all([].slice.call(ov.querySelectorAll('img')).map(function(i){return i.decode?i.decode().catch(function(){}):0;}));
})
"""

FRAME = """
(function(st){
  var $=function(i){return document.getElementById(i);};
  window.__go(st.vi,st.ci,st.t);
  Object.keys(st.sp).forEach(function(k){var e=$('sp_'+k),s=st.sp[k];
    if(!s){e.style.display='none';return;}
    var p=window.__proj(s.lon,s.lat);if(!p){e.style.display='none';return;}
    var w=s.w;e.style.display='block';e.style.width=w+'px';
    e.style.transform='translate('+(p[0]-w/2+s.dx)+'px,'+(p[1]-w*0.9*s.h+s.dy+s.bob)+'px) scale('+s.sc+')';e.style.opacity=s.op;});
  Object.keys(st.ph).forEach(function(k){var e=$('ph_'+k),s=st.ph[k];
    if(!s){e.style.display='none';return;}
    e.style.display='block';e.style.opacity=s.op;e.style.transform='translate('+s.x+'px,'+s.y+'px) rotate('+s.rot+'deg)';});
  var c=$('cv_chip');if(st.chip){c.style.display='flex';c.style.opacity=st.chip.op;c.firstChild.textContent=st.chip.n;c.lastChild.textContent=st.chip.txt;}else c.style.display='none';
  var sb=$('cv_sub');if(st.sub){sb.style.display='block';sb.firstChild.textContent=st.sub;}else sb.style.display='none';
  var t=$('cv_titre');t.style.display=st.titre?'block':'none';if(st.titre)t.style.opacity=st.titre.op;
  var f=$('cv_fin');f.style.display=st.fin?'block':'none';
  if(st.fin){f.style.opacity=st.fin.op;st.fin.cols.forEach(function(o,i){var e=$('cv_fc'+i);e.style.opacity=o.op;e.style.transform='translateY('+o.y+'px)';});}
  $('cv_fade').style.opacity=st.fade;
  return 1;
})
"""


def etat(f, sub_list, hauteurs):
    """État de l'image f (calcul côté Python ; le JS applique)."""
    T = f / FPS
    s = next((x for x in SCENES if x['t0'] <= T < x['t0'] + x['dur']), SCENES[-1]); loc = T - s['t0']; x = min(1, loc / s['dur'])
    st = dict(vi=VOLET, ci=s['ci'], t=s['a'] + (s['b'] - s['a']) * x, sp={k: None for k in TOUS_SPRITES}, ph={k: None for k in PHOTOS}, chip=None, sub=None, titre=None, fin=None, fade=0)
    for (k, fic, lieu, w, tin, dx, dy) in s.get('sprites', []):
        age = loc - tin
        if age < 0: st['sp'][k] = None; continue
        lon, lat = LIEU[lieu]; sc = max(0.001, back(age / 0.5))
        st['sp'][k] = dict(lon=lon, lat=lat, w=w, dx=dx, dy=dy, h=hauteurs[fic], sc=sc, op=min(1, age / 0.2), bob=math.sin(age * 3.2) * 2.5)
    for (k, tin, tout, cote) in s.get('photos', []):
        age = loc - tin; out = (s['dur'] if tout is None else tout)
        if age < 0 or loc > out: st['ph'][k] = None; continue
        slide = 1 - ease_out(age / 0.55); op = min(1, age / 0.25) * (1 if tout is None else min(1, (out - loc) / 0.3))
        x0 = 856 if cote == 'd' else 44; y0 = 88 if cote == 'd' else 100
        st['ph'][k] = dict(x=x0 + (1 if cote == 'd' else -1) * 260 * slide, y=y0, rot=(2.2 if cote == 'd' else -2.2), op=op)
    if s.get('chip'): st['chip'] = dict(n=s['chip'][0], txt=s['chip'][1], op=min(1, loc / 0.3))
    for (a, b, t) in sub_list:
        if a <= T < b + 0.25 and (s['t0'] <= a < s['t0'] + s['dur']): st['sub'] = t; break
    if s.get('title'): st['titre'] = dict(op=1 - ease_out((loc - (s['dur'] - 0.8)) / 0.5) if loc > s['dur'] - 0.8 else 1)
    if s.get('fin'):
        cols = [dict(op=min(1, max(0, (loc - 0.4 - i * 0.9) / 0.4)), y=18 * (1 - ease_out((loc - 0.4 - i * 0.9) / 0.5))) for i in range(len(FIN_MOTS))]
        st['fin'] = dict(op=min(1, loc / 0.4), cols=cols)
    # fondu au noir aux changements de scène (et à la fin)
    fd = 0
    if s is not SCENES[0] and loc < FADE: fd = 1 - loc / FADE
    if s is not SCENES[-1] and loc > s['dur'] - FADE: fd = max(fd, (loc - (s['dur'] - FADE)) / FADE)
    if s is SCENES[0] and loc < 0.25: fd = 1 - loc / 0.25
    if s is SCENES[-1] and loc > s['dur'] - 0.6: fd = max(fd, (loc - (s['dur'] - 0.6)) / 0.6)
    st['fade'] = fd
    return st


# --- Rendu -----------------------------------------------------------------------------------------------------------
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--depot', required=True); ap.add_argument('--voix', required=True); ap.add_argument('--d3', required=True)
    ap.add_argument('--travail', default='/tmp/cap-nickel'); ap.add_argument('--sortie', default=None)
    ap.add_argument('--essai', action='store_true')
    a = ap.parse_args()
    depot = os.path.abspath(a.depot); assets = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'assets')
    sortie = a.sortie or os.path.join(depot, 'video', 'capsule-nickel.mp4')
    tr = a.travail; os.makedirs(tr, exist_ok=True); fr = os.path.join(tr, 'images'); shutil.rmtree(fr, ignore_errors=True); os.makedirs(fr)
    total = synth_voix(tr, a.voix); wav = mixer_audio(tr, total); subs = sous_titres(); srt(subs, os.path.join(tr, 'capsule-nickel.srt'))
    print(f"durée {total:.1f} s ; scènes : " + ', '.join(f"{s['id']} {s['t0']:.1f}+{s['dur']:.1f}" for s in SCENES))
    from PIL import Image
    haut = {}
    for fn in {x[1] for s in SCENES for x in s.get('sprites', [])}:
        im = Image.open(os.path.join(assets, fn)); haut[fn] = im.height / im.width
    d3 = open(a.d3, 'rb').read()
    engine = open(os.path.join(depot, 'js', 'engine.js'), encoding='utf-8').read()
    assert 'window.__camNow=' in engine
    engine = engine.replace('window.__camNow=', "window.__proj=function(lo,la){var p=projection([lo,la]);return (p&&(projKind!=='globe'||d3.geoDistance([lo,la],center)<1.45))?p:null;};window.__camNow=", 1)

    class Hd(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *x): pass
    socketserver.TCPServer.allow_reuse_address = True
    srv = socketserver.ThreadingTCPServer(('127.0.0.1', 0), functools.partial(Hd, directory=depot)); port = srv.server_address[1]
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    from playwright.sync_api import sync_playwright
    spec = dict(sprites={}, photos={k: [v[0], v[1], v[2]] for k, v in PHOTOS.items()}, fin=[list(m) for m in FIN_MOTS])
    for s in SCENES:
        for x in s.get('sprites', []): spec['sprites'][x[0]] = x[1]
    TOUS_SPRITES[:] = list(spec['sprites'])
    errs = []
    with sync_playwright() as p:
        b = p.chromium.launch(executable_path=shutil.which('google-chrome') or '/usr/bin/google-chrome', args=['--no-sandbox'])
        pg = b.new_page(viewport={'width': W, 'height': H})
        pg.route('**/cdnjs.cloudflare.com/**', lambda r: r.fulfill(body=d3, content_type='application/javascript'))
        pg.route('**/fonts.googleapis.com/**', lambda r: r.fulfill(body='', content_type='text/css'))
        pg.route('**/fonts.gstatic.com/**', lambda r: r.abort())
        pg.route('**/js/engine.js', lambda r: r.fulfill(body=engine, content_type='application/javascript'))
        pg.route('**/_cap/*', lambda r: r.fulfill(path=os.path.join(assets, r.request.url.split('/_cap/')[1]), content_type='image/png'))
        pg.on('pageerror', lambda e: errs.append(str(e)))
        pg.goto(f'http://127.0.0.1:{port}/index.html'); pg.wait_for_timeout(1500)
        pg.add_style_tag(content=CSS); pg.evaluate("document.getElementById('home').hidden=true")
        pg.evaluate('window.dispatchEvent(new Event("resize"))'); pg.wait_for_timeout(300)
        pg.evaluate(INIT + '(' + json.dumps(spec) + ')'); pg.wait_for_timeout(800)
        pg.evaluate("window.__go(%d,%d,0)" % (VOLET, CH_MONTAGNE)); pg.wait_for_timeout(500)
        frame_js = FRAME
        if a.essai:
            for s in SCENES:
                for q, k in ((0.5, 'm'), (0.92, 'f')):
                    f = int((s['t0'] + s['dur'] * q) * FPS); st = etat(f, subs, haut)
                    pg.evaluate(frame_js + '(' + json.dumps(st) + ')'); pg.wait_for_timeout(120)
                    pg.screenshot(path=os.path.join(tr, f"essai-{s['id']}-{k}.png"))
            b.close(); print('essais écrits', errs[:3]); return
        n = int(round(total * FPS))
        for f in range(n):
            st = etat(f, subs, haut)
            pg.evaluate(frame_js + '(' + json.dumps(st) + ')')
            pg.screenshot(path=os.path.join(fr, f"{f:05d}.jpg"), type='jpeg', quality=88)
            if f % 100 == 0: print('image', f, '/', n, flush=True)
        b.close()
    if errs: print('ERREURS JS :', errs[:5])
    os.makedirs(os.path.dirname(sortie), exist_ok=True)
    cmd = ['ffmpeg', '-y', '-loglevel', 'error', '-framerate', str(FPS), '-i', os.path.join(fr, '%05d.jpg'), '-i', wav,
           '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '24', '-pix_fmt', 'yuv420p', '-af', 'volume=0.85', '-c:a', 'aac', '-b:a', '128k', '-shortest', '-movflags', '+faststart',
           '-metadata', 'title=Le nickel, de la montagne au monde', '-metadata', 'artist=Nicolas BOUZA',
           '-metadata', 'copyright=© 2026 Nicolas BOUZA — CC BY-NC-ND 4.0 — Atlas historique du Pacifique', sortie]
    subprocess.check_call(cmd)
    src_srt, dst_srt = os.path.join(tr, 'capsule-nickel.srt'), os.path.splitext(sortie)[0] + '.srt'
    if os.path.abspath(src_srt) != os.path.abspath(dst_srt): shutil.copy(src_srt, dst_srt)
    print('écrit', sortie)


if __name__ == '__main__':
    main()
