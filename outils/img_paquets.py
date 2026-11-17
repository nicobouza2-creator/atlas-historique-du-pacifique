#!/usr/bin/env python3
"""Images de l'artefact claude.ai de l'atlas du Pacifique (école), limité à 512 fichiers.

Appelé par artefact.py. Les images publiées une à une sont celles de `outils/artefact_ecole_images.txt`
(les 447 du premier artefact). Les autres images utilisées par l'atlas de l'école partent dans
`paquets/img-<n>.txt` (base64 mis bout à bout, comme les dossiers PDF), regroupées par volet.
Un chargeur ajouté à la fin de `js/img.js` (version de l'artefact seulement) remplace, pour ces images,
`IMG[clé].f` par une adresse blob: dès que le paquet est lu ; le paquet n'est lu que lorsqu'une de ses
images est demandée. Les images du collège ne sont pas copiées.
"""
import base64, json, os, re, shutil

GROUPES = [('caledonie', 'geonc', 'nickel', 'pacifique'), ('decouvertes', 'monde'), ('mondial', 'emc')]
MIME = {'.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.gif': 'image/gif'}

CHARGEUR = r'''(function(){var I=window.IMG,P=window.IMGPACK;if(!I||!P)return;
var PH='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',U={},S={};
function fixe(k){var t=PH+'#'+k,a=document.querySelectorAll('img'),i;for(i=0;i<a.length;i++)if(a[i].getAttribute('src')===t)a[i].src=U[k];}
function lit(n){if(S[n])return;S[n]=1;fetch(P.p[n]).then(function(r){if(!r.ok)throw 0;return r.text();}).then(function(t){
Object.keys(P.k).forEach(function(k){var e=P.k[k];if(e[0]!==n)return;var b=atob(t.substr(e[1],e[2])),a=new Uint8Array(b.length),i;
for(i=0;i<b.length;i++)a[i]=b.charCodeAt(i);U[k]=URL.createObjectURL(new Blob([a],{type:e[3]}));fixe(k);});
}).catch(function(){S[n]=0;});}
Object.keys(P.k).forEach(function(k){var o=I[k];if(!o)return;Object.defineProperty(o,'f',{configurable:true,enumerable:true,
get:function(){if(U[k])return U[k];lit(P.k[k][0]);return PH+'#'+k;}});});
window.IMGPACK_LIRE=function(){P.p.forEach(function(_,n){lit(n);});};})();'''

def scripts_ecole(repo):
    html = open(os.path.join(repo, 'index.html'), encoding='utf-8').read()
    return [s for s in re.findall(r'<script[^>]*src="(js/[^"]+)"', html) if s != 'js/img.js']

def main(repo, out):
    src = open(os.path.join(repo, 'js', 'img.js'), encoding='utf-8').read()
    IMG = json.loads(re.search(r'window\.IMG=(\{.*\});?\s*$', src, re.S).group(1))
    textes = {s: open(os.path.join(repo, s), encoding='utf-8').read() for s in scripts_ecole(repo)}
    def cite(k, t): return re.search(r'''["']''' + re.escape(k) + r'''["']''', t) is not None
    utiles = [k for k in IMG if any(cite(k, t) for t in textes.values())]
    indiv = set(l.strip() for l in open(os.path.join(repo, 'outils', 'artefact_ecole_images.txt')) if l.strip())
    os.makedirs(os.path.join(out, 'img'), exist_ok=True)
    for f in sorted(indiv):   # images publiées une à une (dont les bateaux img/b-*.png)
        if os.path.exists(os.path.join(repo, f)): shutil.copy(os.path.join(repo, f), os.path.join(out, f))
    a_paqueter = [k for k in utiles if IMG[k]['f'] not in indiv]
    gal = json.loads(re.search(r'window\.GAL=(\{.*\});?', textes['js/galerie.js'], re.S).group(1)) if 'js/galerie.js' in textes else {}
    def groupe(k):
        for g, vols in enumerate(GROUPES):
            for v in vols:
                if any(k in c for c in gal.get(v, [])): return g
        for g, vols in enumerate(GROUPES):
            for v in vols:
                for s in ('js/v-%s.js' % v, 'js/enq-%s.js' % v):
                    if s in textes and cite(k, textes[s]): return g
        return len(GROUPES) - 1
    pos, parts, idx = [0] * len(GROUPES), [[] for _ in GROUPES], {}
    for k in a_paqueter:
        g = groupe(k); f = IMG[k]['f']
        b = base64.b64encode(open(os.path.join(repo, f), 'rb').read()).decode('ascii')
        idx[k] = [g, pos[g], len(b), MIME[os.path.splitext(f)[1].lower()]]
        parts[g].append(b); pos[g] += len(b)
    os.makedirs(os.path.join(out, 'paquets'), exist_ok=True)
    noms = []
    for g in range(len(GROUPES)):
        n = 'paquets/img-%d.txt' % (g + 1); noms.append(n)
        open(os.path.join(out, n), 'w', encoding='ascii', newline='').write(''.join(parts[g]))
        print(n, sum(1 for e in idx.values() if e[0] == g), 'images', pos[g] // 1024, 'Ko')
    print('images utilisées', len(utiles), '· une à une', len(indiv), '· en paquets', len(idx))
    return 'window.IMGPACK=' + json.dumps({'p': noms, 'k': idx}, separators=(',', ':')) + ';\n' + CHARGEUR

if __name__ == '__main__':
    import sys; print(main(sys.argv[1], sys.argv[2])[:300])
