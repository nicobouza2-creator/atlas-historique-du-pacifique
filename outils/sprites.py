"""Sprites de carte : nettoie les PNG détourés (220 px) de la bibliothèque et écrit js/sprites.js.

  python3 outils/sprites.py <dossier des PNG> <dépôt> [dossier de sortie des PNG nettoyés]

Les PNG viennent de la bibliothèque d'images (Resources/Bibliotheque-images/atlas-sprites/, générés en local) :
  b-<clé>.png  bateaux (clé du moteur = <clé>)      s-<clé>.png  ce qui se déplace sur terre ou dans les airs
  l-<clé>.png  lieux (petits décors)                m-<clé>.png  monuments
  <clé>-f2.png 2e image d'une animation (pas de marche) : le moteur alterne <clé> et <clé>-f2

js/sprites.js = window.BOATS['<clé>'] = image WebP en « data: » (un seul fichier : l'artefact claude.ai est limité à 512 fichiers).
"""
import sys, os, io, base64, glob
import numpy as np
from PIL import Image
from scipy import ndimage

# fonds blancs restés enfermés dans le dessin (entre des troncs, des pattes…) : à vider
TROUS = {'l-tribu', 'l-mangrove', 's-caravane', 'm-tiki', 'l-cocoteraie'}
# ombre claire sous les pieds ou les roues : à retirer (elle fait une tache blanche sur la mer et les terres sombres)
OMBRES = {'s-erectus', 's-beringie', 's-paysans', 's-refugies', 's-camion-minier', 's-caravane', 's-sapiens', 's-missile',
          's-neandertal', 's-gi', 's-poilu', 's-tirailleur', 's-japonais', 's-allemand14', 's-bataillon-pacifique',
          's-char1917', 's-char1940', 's-char-sovietique', 's-train', 's-char-moderne', 's-immigres', 's-soldat-chinois', 's-pickup'}
# dessins à refaire (faux, ou avec de fausses lettres) : gardés dans la bibliothèque, pas publiés
EXCLUS = {'b-galere', 'l-debarquement', 'm-pearl-harbor'}
COTE = {'s': 200, 'b': 200, 'l': 132, 'm': 132}   # plus grand côté dans sprites.js

def composantes(masque):
    lab, n = ndimage.label(masque)
    return lab, n, ndimage.find_objects(lab)

def nettoie(cle, im):
    a = np.array(im.convert('RGBA')).astype(np.int32)
    A = a[..., 3]
    A[A < 16] = 0
    base = cle[:-3] if cle.endswith('-f2') or cle.endswith('-f3') else cle
    if base in TROUS or cle in TROUS:
        blanc = (a[..., :3].min(axis=2) > 243) & (A > 200)
        lab, n, objs = composantes(blanc)
        for i, sl in enumerate(objs):
            m = lab[sl] == i + 1
            if m.sum() >= 14: A[sl][m] = 0
    if base in OMBRES:
        h, w = A.shape
        clair = (a[..., :3].min(axis=2) > 198) & ((a[..., :3].max(axis=2) - a[..., :3].min(axis=2)) < 30) & (A > 0)
        lab, n, objs = composantes(clair)
        for i, sl in enumerate(objs):
            y0, y1, x0, x1 = sl[0].start, sl[0].stop, sl[1].start, sl[1].stop
            if y0 >= h * 0.80 and (x1 - x0) >= 2.2 * (y1 - y0):   # tache plate, tout en bas
                A[sl][lab[sl] == i + 1] = 0
    if cle == 'b-migrants':   # bloc d'eau rectangulaire : coins arrondis et bas fondu
        h, w = A.shape
        eau = (a[..., 2] > a[..., 0] + 40) & (a[..., 1] > a[..., 0] + 25) & (a[..., :3].sum(axis=2) > 430)
        ys = np.where(eau.sum(axis=1) > w * 0.6)[0]
        if len(ys):
            y0 = ys.min(); yy, xx = np.mgrid[0:h, 0:w]
            bas = np.clip((h - 1 - yy) / max(1, (h - 1 - y0)) * 2.2, 0, 1)               # fondu vers le bas
            bord = np.clip(np.minimum(xx, w - 1 - xx) / (w * 0.10), 0, 1)                 # fondu sur les côtés
            k = np.where(yy >= y0, np.minimum(bas, bord), 1.0)
            A[:] = (A * k).astype(np.int32)
    a[..., 3] = A
    out = Image.fromarray(a.astype(np.uint8), 'RGBA')
    bb = out.getchannel('A').point(lambda v: 255 if v > 8 else 0).getbbox()
    return out.crop(bb) if bb else out

def main(src, repo, propre=None):
    B = {}; tot = 0
    for p in sorted(glob.glob(os.path.join(src, '*.png'))):
        nom = os.path.basename(p)[:-4]
        if nom[:2] not in ('b-', 's-', 'l-', 'm-') or nom in EXCLUS: continue
        im = nettoie(nom, Image.open(p))
        if propre:
            os.makedirs(propre, exist_ok=True); im.save(os.path.join(propre, nom + '.png'), optimize=True)
        c = COTE[nom[0]]; im2 = im.copy(); im2.thumbnail((c, c), Image.LANCZOS)
        buf = io.BytesIO(); im2.save(buf, 'WEBP', quality=80, method=6, alpha_quality=90)
        cle = nom[2:] if nom.startswith('b-') else nom
        B[cle] = 'data:image/webp;base64,' + base64.b64encode(buf.getvalue()).decode(); tot += buf.tell()
    js = ("/* Atlas historique du Pacifique — © 2026 Nicolas BOUZA, idée, conception et réalisation, avec l’assistance de Claude (Anthropic) — CC BY-NC-ND 4.0\n"
          "   Sprites de carte (dessins générés en local, bibliothèque d'images de l'auteur). Fichier écrit par outils/sprites.py : ne pas modifier à la main. */\n"
          "(function(){var B=window.BOATS=window.BOATS||{},S={\n" + ',\n'.join("'%s':'%s'" % (k, B[k]) for k in sorted(B)) +
          "\n};for(var k in S)B[k]=S[k];if(window.ATLAS&&window.ATLAS.redraw)window.ATLAS.redraw();})();\n")
    open(os.path.join(repo, 'js', 'sprites.js'), 'w', encoding='utf-8').write(js)
    print(len(B), 'sprites,', tot // 1024, 'Ko d’images,', len(js) // 1024, 'Ko de script')

if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2], sys.argv[3] if len(sys.argv) > 3 else None)
