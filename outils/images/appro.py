#!/usr/bin/env python3
"""Approvisionnement en images libres (atlas, Mondix, fiches…) depuis l'espace de travail cloud, sans l'API Wikimedia (429 ici).
Copie de référence : doc projet claude/outils-images-appro.py ; dépôt atlas-historique-du-pacifique, outils/images/appro.py.
Toutes les commandes marchent hors de l'atlas ; seule « add » écrit dans un dépôt d'atlas (APPRO_REPO).

Sources qui répondent depuis le cloud (vérifié le 17/11/2026) :
  wm     Wikimedia Commons, par les PAGES HTML (recherche, catégories, page du fichier) + images sur thumb.wikimedia.org
         (serveur de vignettes : ~1 requête/s tenue, tailles standard 120/250/330/500/960/1280/1920 seulement)
  ov     Openverse (Flickr CC + autres) ; quota ~200 requêtes/jour pour l'IP
  aic    Art Institute of Chicago (œuvres du domaine public, CC0)
  cma    Cleveland Museum of Art (CC0)
  wel    Wellcome Collection (gravures, photos anciennes ; PDM / CC BY)
  loc    Library of Congress (photos ; vérifier « rights » au cas par cas)
Secours si les pages Commons sont refusées durablement : l'API Commons (recherche + licences + vignettes en un appel) répond
  depuis le navigateur intégré de l'appli Claude sur le PC (fetch('/w/api.php?…') dans un onglet commons.wikimedia.org).
Bloquées ici : API Commons et Wikipédia (429), Met Museum (410), Auckland Museum, Gallica, Rawpixel (403), Smithsonian (clé).

Commandes (toutes écrivent/complètent un fichier de candidats JSON, puis on regarde une planche) :
  appro.py wm  "requête" CAND.json [n]            recherche Commons (page Special:Search)
  appro.py cat "Category:Nom" CAND.json [n]       fichiers d'une catégorie Commons (+ liste des sous-catégories)
  appro.py ov|aic|cma|wel|loc "requête" CAND.json [n]
  appro.py lic CAND.json [id…]                    licence/auteur/date des candidats Commons retenus (page du fichier)
  appro.py sheet CAND.json planche.jpg [début]    planche contact (25 vignettes, id + licence sous chaque vignette)
  appro.py get CAND.json id sortie.jpg [720]      image finale (côté max 720 px, JPEG q80, ~60-90 Ko)
  appro.py add cle sortie.jpg "légende" "crédit" volet chapitre [volet chapitre…]
                                                  ajoute l'image à js/img.js et à la galerie du chapitre (js/galerie.js)
Réseau : chaque site a sa file d'attente (pages Commons 4 s, vignettes thumb.wikimedia.org 1,2 s, élargie après un refus) ; une URL déjà obtenue
  est relue dans le cache (APPRO_WORK/.cache). Un refus 429 n'est donc jamais une erreur : l'outil attend et reprend (jusqu'à 15 min).
Ordre conseillé : chercher → planche → choisir → lic sur les seuls retenus → get → add.
Règles : domaine public, CC0, CC BY, CC BY-SA seulement ; pas d'image générée par IA ; pas de photo récente de personne identifiable.
"""
import sys, os, re, json, time, html, hashlib, urllib.parse, urllib.request, io

UA = 'AtlasHG/1.0 (atlas scolaire; github nicobouza2-creator/atlas-historique-du-pacifique)'
REPO = os.environ.get('APPRO_REPO') or os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))  # dépôt de l'atlas (commande add seulement)


# ---------- réseau : débit limité par site, partagé entre processus, adaptatif, avec cache disque ----------
WORK = os.environ.get('APPRO_WORK', '/home/claude/work')
BASE = {'commons.wikimedia.org': 4.0, 'thumb.wikimedia.org': 1.2, 'upload.wikimedia.org': 6.0, 'api.openverse.org': 3.5}  # secondes mini entre deux appels
MAXI = 20.0  # plafond de l'intervalle adaptatif


def _slot(host):
    """Attend son tour pour `host` (verrou fichier : deux commandes lancées en même temps ne doublent pas le débit)."""
    import fcntl
    d = os.path.join(WORK, '.debit'); os.makedirs(d, exist_ok=True)
    with open(os.path.join(d, host), 'a+') as fh:
        fcntl.flock(fh, fcntl.LOCK_EX)
        fh.seek(0); t = fh.read().split()
        last, gap = (float(t[0]), float(t[1])) if len(t) == 2 else (0.0, BASE.get(host, 0.5))
        w = last + gap - time.time()
        if w > 0: time.sleep(w)
        fh.seek(0); fh.truncate(); fh.write(f'{time.time()} {gap}')
        fcntl.flock(fh, fcntl.LOCK_UN)


def _gap(host, factor):
    """Élargit (refus) ou resserre (succès) l'intervalle du site, entre la base et MAXI."""
    import fcntl
    f = os.path.join(WORK, '.debit', host)
    with open(f, 'a+') as fh:
        fcntl.flock(fh, fcntl.LOCK_EX); fh.seek(0); t = fh.read().split()
        last, gap = (float(t[0]), float(t[1])) if len(t) == 2 else (time.time(), BASE.get(host, 0.5))
        gap = min(MAXI, max(BASE.get(host, 0.5), gap * factor))
        fh.seek(0); fh.truncate(); fh.write(f'{last} {gap}'); fcntl.flock(fh, fcntl.LOCK_UN)
    return gap


def http(url, binary=False, cache=True, patience=900, **_):
    """GET robuste : file d'attente par site, respect de Retry-After, attente croissante (15 s → 4 min) jusqu'à
    `patience` secondes au total, puis seulement échec. Réponses mises en cache sur disque (une URL n'est jamais redemandée)."""
    host = urllib.parse.urlparse(url).netloc
    cf = os.path.join(WORK, '.cache', hashlib.md5(url.encode()).hexdigest())
    if cache and os.path.exists(cf):
        d = open(cf, 'rb').read(); return d if binary else d.decode('utf-8', 'replace')
    t0, k = time.time(), 0
    while True:
        _slot(host)
        try:
            r = urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': UA}), timeout=60)
            d = r.read()
            if not binary and b'too many requests' in d[:400].lower(): raise urllib.error.HTTPError(url, 429, 'page 429', {}, None)
            _gap(host, 0.9)
            if cache: os.makedirs(os.path.dirname(cf), exist_ok=True); open(cf, 'wb').write(d)
            return d if binary else d.decode('utf-8', 'replace')
        except urllib.error.HTTPError as e:
            if e.code in (400, 403, 404, 410): raise
            ra = (e.headers or {}).get('Retry-After') if e.headers else None
            wait = float(ra) if ra and str(ra).isdigit() else min(240, 15 * 2 ** k)
        except Exception:
            wait = min(120, 5 * 2 ** k)
        k += 1
        if time.time() - t0 + wait > patience: raise RuntimeError(f'{host} : toujours refusé après {int(time.time() - t0)} s ({url[:80]})')
        g = _gap(host, 1.5)
        print(f'    [{host} occupé : nouvel essai dans {int(wait)} s, intervalle porté à {g:.0f} s]', file=sys.stderr, flush=True)
        time.sleep(wait)


def strip(s, n=200):
    return re.sub(r'\s+', ' ', html.unescape(re.sub('<[^>]+>', ' ', s or ''))).strip()[:n]


# ---------- Wikimedia Commons sans API ----------
TAILLES = (120, 250, 330, 500, 960, 1280, 1920)  # tailles standard : thumb.wikimedia.org répond 400 aux autres


def wm_url(name, w=None):
    """Vignette sur thumb.wikimedia.org (serveur de vignettes, non rationné depuis le cloud au 17/11/2026 à ~1 requête/s) ;
    sans largeur : fichier original sur upload.wikimedia.org (rationné, à éviter)."""
    n = name.replace(' ', '_'); h = hashlib.md5(n.encode('utf-8')).hexdigest(); q = urllib.parse.quote(n)
    if not w: return f'https://upload.wikimedia.org/wikipedia/commons/{h[0]}/{h[:2]}/{q}'
    w = min(TAILLES, key=lambda t: abs(t - w))
    u = f'https://thumb.wikimedia.org/wikipedia/commons/thumb/{h[0]}/{h[:2]}/{q}/{w}px-{q}'
    if n.lower().endswith('.svg'): u += '.png'
    if n.lower().endswith(('.tif', '.tiff')): u = u.replace(f'/{w}px-', f'/lossy-page1-{w}px-') + '.jpg'
    return u


IMG_EXT = ('.jpg', '.jpeg', '.png', '.gif', '.svg', '.tif', '.tiff', '.webp')


def wm_files(page_html):
    out = []
    for f in re.findall(r'href="/wiki/File:([^"#?]+)"', page_html):
        f = urllib.parse.unquote(f).replace('_', ' ')
        if f.lower().endswith(IMG_EXT) and f not in out: out.append(f)
    return out


def wm_cand(f):
    return dict(src='wm', titre=f, vignette=wm_url(f, 330), page='https://commons.wikimedia.org/wiki/File:' + urllib.parse.quote(f.replace(' ', '_')))


def s_wm(q, n):
    s = http('https://commons.wikimedia.org/w/index.php?' + urllib.parse.urlencode(dict(search=q, ns6=1, fulltext=1, limit=max(n, 20))))
    return [wm_cand(f) for f in wm_files(s)[:n]]


def s_cat(cat, n):
    cat = cat if cat.startswith('Category:') else 'Category:' + cat
    s = http('https://commons.wikimedia.org/wiki/' + urllib.parse.quote(cat.replace(' ', '_')))
    subs = sorted(set(urllib.parse.unquote(x).replace('_', ' ') for x in re.findall(r'href="/wiki/(Category:[^"#?]+)"', s)))
    subs = [x for x in subs if not re.search(r'(?i)(CC-|GFDL|Pages |Media |files|license|Hidden|Uploaded|User|Commons)', x)]
    if subs: print('sous-catégories :', ' | '.join(subs[:60]), file=sys.stderr)
    return [wm_cand(f) for f in wm_files(s)[:n]]


LIBRE = re.compile(r'(?i)(public domain|domaine public|\bPD\b|PD-|CC0|cc[- ]zero|CC[- ]BY(?![- ]?N[CD])(?:[- ]SA)?(?:[- ]\d\.\d)?)')


def wm_lic(f):
    s = http('https://commons.wikimedia.org/wiki/File:' + urllib.parse.quote(f.replace(' ', '_')))
    s = re.sub(r'(?s)<style.*?</style>', '', s).replace('&#95;', '_')  # Commons écrit « licensetpl&#95;short »
    lic = sorted(set(strip(m, 60) for m in re.findall(r'licensetpl_short[^>]*>(.*?)</', s)) - {''})

    def row(k):
        m = re.search(r'id="fileinfotpl_' + k + r'"[^>]*>.*?</td>\s*<td[^>]*>(.*?)</td>', s, re.S)
        return strip(m.group(1), 180) if m else ''
    nc = bool(re.search(r'(?i)(non[- ]?commercial|NoDerivs|CC BY-NC|CC BY-ND|fair use)', ' '.join(lic)))
    return dict(licence=' / '.join(lic) or 'INCONNUE', libre=bool(lic) and not nc and bool(LIBRE.search(' '.join(lic))),
                auteur=row('aut'), date=row('date'), desc=row('desc'))


# ---------- autres sources ----------
def s_ov(q, n):
    d = json.loads(http('https://api.openverse.org/v1/images/?' + urllib.parse.urlencode(dict(q=q, page_size=n, license='by,by-sa,cc0,pdm'))))
    return [dict(src='ov', titre=r.get('title') or '', vignette=r.get('thumbnail') or r['url'], url=r['url'], page=r.get('foreign_landing_url'),
                 licence=('CC ' + r['license'].upper() + ' ' + (r.get('license_version') or '')).replace('CC PDM', 'domaine public (PDM)').replace('CC CC0', 'CC0').strip(),
                 libre=True, auteur=r.get('creator') or '', fournisseur=r.get('provider')) for r in d.get('results', [])]


def s_aic(q, n):
    d = json.loads(http('https://api.artic.edu/api/v1/artworks/search?' + urllib.parse.urlencode(
        {'q': q, 'limit': n, 'fields': 'id,title,artist_display,date_display,image_id,is_public_domain', 'query[term][is_public_domain]': 'true'})))
    iiif = d.get('config', {}).get('iiif_url', 'https://www.artic.edu/iiif/2')
    return [dict(src='aic', titre=r['title'], vignette=f"{iiif}/{r['image_id']}/full/400,/0/default.jpg", url=f"{iiif}/{r['image_id']}/full/843,/0/default.jpg",
                 page=f"https://www.artic.edu/artworks/{r['id']}", licence='CC0 (domaine public)', libre=True,
                 auteur=strip(r.get('artist_display'), 100), date=r.get('date_display', '')) for r in d.get('data', []) if r.get('image_id') and r.get('is_public_domain')]


def s_cma(q, n):
    d = json.loads(http('https://openaccess-api.clevelandart.org/api/artworks/?' + urllib.parse.urlencode(dict(q=q, cc0=1, has_image=1, limit=n))))
    out = []
    for r in d.get('data', []):
        im = r.get('images') or {}
        if not im.get('web'): continue
        out.append(dict(src='cma', titre=r.get('title', ''), vignette=im['web']['url'], url=(im.get('print') or im['web'])['url'], page=r.get('url'),
                        licence='CC0 (domaine public)', libre=True, auteur=', '.join(c.get('description', '') for c in r.get('creators') or [])[:100],
                        date=r.get('creation_date', '')))
    return out


def s_wel(q, n):
    d = json.loads(http('https://api.wellcomecollection.org/catalogue/v2/images?' + urllib.parse.urlencode(dict(query=q, pageSize=n, include='source.contributors'))))
    out = []
    for r in d.get('results', []):
        lic = (r.get('locations') or [{}])[0].get('license') or {}
        lid = lic.get('id', '')
        if lid not in ('pdm', 'cc-0', 'cc-by', 'cc-by-sa'): continue
        base = r['thumbnail']['url'].replace('/info.json', '')
        src = r.get('source', {})
        out.append(dict(src='wel', titre=src.get('title', ''), vignette=base + '/full/400,/0/default.jpg', url=base + '/full/1000,/0/default.jpg',
                        page='https://wellcomecollection.org/works/' + src.get('id', ''), licence=lic.get('label', lid), libre=True,
                        auteur=', '.join(c.get('agent', {}).get('label', '') for c in src.get('contributors') or [])[:100]))
    return out


def s_loc(q, n):
    d = json.loads(http('https://www.loc.gov/photos/?' + urllib.parse.urlencode(dict(q=q, fo='json', c=n))))
    out = []
    for r in d.get('results', []):
        ims = [u for u in r.get('image_url') or [] if u.startswith('http')]
        if not ims: continue
        rights = ' '.join(r.get('rights') or [])[:160] if isinstance(r.get('rights'), list) else str(r.get('rights') or '')[:160]
        out.append(dict(src='loc', titre=r.get('title', ''), vignette=ims[0], url=ims[-1].split('#')[0], page=r.get('id') or r.get('url'),
                        licence='LoC — ' + (rights or 'droits à vérifier'), libre=bool(re.search(r'(?i)no known restrictions', rights)),
                        date=r.get('date', '')))
    return out


SRC = dict(wm=s_wm, cat=s_cat, ov=s_ov, aic=s_aic, cma=s_cma, wel=s_wel, loc=s_loc)


def load(p):
    return json.load(open(p)) if os.path.exists(p) else []


def save(p, L):
    json.dump(L, open(p, 'w'), ensure_ascii=False, indent=0)


def vignette(c):
    return http(c['vignette'], binary=True)


def sheet(cand, out, start=0, per=25):
    from PIL import Image, ImageDraw, ImageFont
    font = ImageFont.load_default()
    try: font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 13)
    except Exception: pass
    L = cand[start:start + per]; W, H, cols = 250, 230, 5
    img = Image.new('RGB', (cols * W, ((len(L) + cols - 1) // cols) * H), 'white'); d = ImageDraw.Draw(img)
    for i, c in enumerate(L):
        x, y = (i % cols) * W, (i // cols) * H
        try:
            im = Image.open(io.BytesIO(vignette(c))).convert('RGB')
            im.thumbnail((W - 8, H - 46)); img.paste(im, (x + (W - im.width) // 2, y + 4))
        except Exception as e:
            d.text((x + 8, y + 60), 'vignette KO ' + str(e)[:24], fill='red', font=font)
        print(' ', c['id'], file=sys.stderr, flush=True)
        lab = f"{c['id']} {('✓' if c.get('libre') else ('?' if 'libre' not in c else '✗'))} {c.get('licence', '')}"[:34]
        d.text((x + 4, y + H - 40), lab, fill='black' if c.get('libre', True) else 'red', font=font)
        d.text((x + 4, y + H - 22), (c.get('titre') or '')[:34], fill='#444', font=font)
    img.save(out, quality=80); print(out, len(L), 'vignettes')


def get(c, out, side=720):
    from PIL import Image
    urls = [wm_url(c['titre'], t) for t in (960, 500, 330)] + [wm_url(c['titre'])] if c['src'] == 'wm' else [c['url'], c['vignette']]
    for u in urls:
        try:
            im = Image.open(io.BytesIO(http(u, binary=True))); break
        except Exception as e:
            print('  échec', u[:90], e, file=sys.stderr)
    else:
        raise SystemExit('aucune URL ne répond')
    im = im.convert('RGB'); im.thumbnail((side, side)); im.save(out, quality=80, optimize=True, progressive=True)
    print(out, im.size)


def add(key, path, cap, cred, places):
    ip, gp = os.path.join(REPO, 'js/img.js'), os.path.join(REPO, 'js/galerie.js')
    s = open(ip).read(); m = re.match(r'window\.IMG=(\{.*\});\s*$', s, re.S); IMG = json.loads(m.group(1))
    if key in IMG and IMG[key]['f'] != 'img/' + os.path.basename(path): raise SystemExit('clé déjà prise : ' + key)
    IMG[key] = {'f': 'img/' + os.path.basename(path), 'c': cap, 'r': cred}
    open(ip, 'w').write('window.IMG=' + json.dumps(IMG, ensure_ascii=False, separators=(',', ':')).replace('":{"f":', '":{"f": ').replace(',"c":', ', "c": ').replace(',"r":', ', "r": ') + ';\n')
    g = open(gp).read(); hd, js = g.split('window.GAL=', 1); GAL = json.loads(js.strip().rstrip(';'))
    for vol, ci in places:
        lst = GAL[vol][int(ci)]
        if key not in lst: lst.append(key)
    open(gp, 'w').write(hd + 'window.GAL=' + json.dumps(GAL, ensure_ascii=False, separators=(',', ':')) + ';\n')
    print('ajouté', key, places)


if __name__ == '__main__':
    a = sys.argv[1:]
    if not a: print(__doc__); sys.exit()
    c = a[0]
    if c in SRC:
        q, p, n = a[1], a[2], int(a[3]) if len(a) > 3 else 10
        L = load(p); have = {x['titre'] for x in L}; k0 = len(L)
        for x in SRC[c](q, n):
            if x['titre'] in have and x['src'] == 'wm': continue
            x['id'] = '%s%03d' % (x['src'], len(L)); x['q'] = q; L.append(x)
        save(p, L); print(f'{len(L) - k0} candidats ajoutés ({len(L)} au total) : ' + ' | '.join(f"{x['id']} {x['titre'][:40]}" for x in L[k0:]))
    elif c == 'lic':
        L = load(a[1]); ids = set(a[2:])
        for x in L:
            if x['src'] == 'wm' and (x['id'] in ids if ids else 'libre' not in x):
                try: x.update(wm_lic(x['titre']))
                except Exception as e: x['licence'] = 'ERREUR ' + str(e)[:40]
                print(x['id'], '✓' if x.get('libre') else '✗', x.get('licence'), '|', x.get('auteur', '')[:50], '|', x.get('date', '')[:30])
                save(a[1], L)
    elif c == 'sheet':
        sheet(load(a[1]), a[2], int(a[3]) if len(a) > 3 else 0)
    elif c == 'get':
        L = {x['id']: x for x in load(a[1])}; get(L[a[2]], a[3], int(a[4]) if len(a) > 4 else 720)
    elif c == 'add':
        add(a[1], a[2], a[3], a[4], list(zip(a[5::2], a[6::2])))
    else:
        print(__doc__)
