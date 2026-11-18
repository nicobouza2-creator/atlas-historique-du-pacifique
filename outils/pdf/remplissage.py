# Mesure le remplissage de chaque page d'un PDF de dossier : part de la hauteur utile occupée (haut du cadre -> dernier contenu).
# python3 remplissage.py <dossier pdf> [seuil=0.6]  -> liste les pages sous le seuil (hors couverture)
import sys, glob, subprocess, tempfile, os
import numpy as np
from PIL import Image
DPI = 40; MM = DPI / 25.4
def pages(pdf):
    d = tempfile.mkdtemp(); subprocess.run(['pdftoppm', '-r', str(DPI), '-png', pdf, d + '/p'], check=True)
    return [np.asarray(Image.open(f).convert('RGB')).astype(int) for f in sorted(glob.glob(d + '/p-*.png'))]
def fill(im):
    h = im.shape[0]; top = int(18 * MM); bot = h - int(16 * MM)
    zone = im[top:bot]
    bg = np.median(zone.reshape(-1, 3), axis=0)
    diff = np.abs(zone - bg).sum(axis=2) > 40
    rows = np.where(diff.sum(axis=1) > 0)[0]
    return 0.0 if len(rows) == 0 else (rows.max() + 1) / (bot - top)
if __name__ == '__main__':
    seuil = float(sys.argv[2]) if len(sys.argv) > 2 else 0.6
    tot = bad = 0
    for f in sorted(glob.glob(sys.argv[1].rstrip('/') + '/*.pdf') if os.path.isdir(sys.argv[1]) else [sys.argv[1]]):
        P = pages(f); L = [(i + 1, fill(im)) for i, im in enumerate(P) if i > 0]
        low = [(i, round(x, 2)) for i, x in L if x < seuil]
        tot += len(P); bad += len(low)
        print(os.path.basename(f), len(P), 'pages', low)
    print('TOTAL', tot, 'pages ;', bad, 'sous', seuil)
