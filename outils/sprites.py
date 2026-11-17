"""Sprites de carte : nettoie les PNG détourés (220 px) de la bibliothèque et écrit js/sprites.js.

  python3 outils/sprites.py <dossier des PNG> <dépôt> [dossier de sortie des PNG nettoyés] [--ajoute]
  --ajoute : garde les sprites déjà dans js/sprites.js et n'ajoute ou ne remplace que ceux du dossier (pour un nouveau lot)

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
EXCLUS = {'m-pearl-harbor', 'b-galere', 'm-sainte-sophie',   # fausses lettres ; voile carrée au lieu de voiles latines ; minarets (après 1453)
          # 2es images de marche redessinées par le mode « modifier » : autres personnages que la 1re image, inutilisables
          's-sapiens-f2', 's-erectus-f2', 's-beringie-f2', 's-paysans-f2', 's-refugies-f2', 's-caravane-f2',
          # planches à deux poses (lot 7) : les deux poses ne montrent pas les mêmes personnages (nombre, couleurs, casque) : inutilisables
          's-sapiens-x2', 's-erectus-x2', 's-beringie-x2', 's-paysans-x2', 's-refugies-x2', 's-caravane-x2', 's-immigres-x2', 's-poilu-x2',
          's-tirailleur-x2', 's-bataillon-pacifique-x2', 's-japonais-x2', 's-allemand14-x2'}
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

def coupe(im):
    """Planche <clé>-x2 : deux poses côte à côte, séparées par un vide. Rend [gauche, droite] ou None si la coupe n'est pas nette."""
    A = np.array(im.convert('RGBA'))[..., 3]; w = A.shape[1]; col = (A > 24).sum(axis=0)
    vides = [x for x in range(int(w * 0.3), int(w * 0.7)) if col[x] == 0]
    if not vides: return None
    x = vides[len(vides) // 2]
    return [im.crop((0, 0, x, im.height)), im.crop((x, 0, w, im.height))]

def main(src, repo, propre=None, ajoute=False):
    B = {}; tot = 0; fichiers = []
    if ajoute:
        import re
        B = dict(re.findall(r"^'([^']+)':'(data:[^']+)'", open(os.path.join(repo, 'js', 'sprites.js'), encoding='utf-8').read(), re.M))
    for p in sorted(glob.glob(os.path.join(src, '*.png'))):
        nom = os.path.basename(p)[:-4]
        if nom[:2] not in ('b-', 's-', 'l-', 'm-') or nom in EXCLUS: continue
        if nom.endswith('-x2'):   # planche de marche : remplace <clé> et <clé>-f2 (les deux poses viennent du même dessin, donc du même personnage)
            deux = coupe(Image.open(p))
            if not deux: print('planche non coupée (pas de vide au milieu) :', nom); continue
            fichiers += [(nom[:-3], deux[0]), (nom[:-3] + '-f2', deux[1])]
        else: fichiers.append((nom, Image.open(p)))
    vus = {}
    for nom, im in fichiers: vus[nom] = im   # une planche -x2 passe après le sprite simple (ordre alphabétique) et le remplace
    for nom in sorted(vus):
        im = nettoie(nom, vus[nom])
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
    a = [x for x in sys.argv[1:] if x != '--ajoute']
    main(a[0], a[1], a[2] if len(a) > 2 else None, '--ajoute' in sys.argv)
