# Taille imprimée de la planche (carte-document) dans chaque PDF : largeur en mm et hauteur du texte de légende en points.
# python3 taille_planches.py <dossier pdf> [seuil en points = 6]
import pymupdf, glob, os, sys, statistics
def mesure(d):
    R = []
    for f in sorted(glob.glob(d.rstrip('/') + '/*.pdf')):
        doc = pymupdf.open(f)
        for i, p in enumerate(doc):
            if 'fonds de carte Natural Earth' not in p.get_text(): continue
            best = None
            for im in p.get_images(full=True):
                for r in p.get_image_rects(im[0]):
                    if best is None or r.width * r.height > best[0].width * best[0].height: best = (r, im)
            r, im = best; wmm = r.width / 72 * 25.4
            R.append((os.path.basename(f)[:-4], i + 1, round(wmm), round(28 / im[2] * wmm / 25.4 * 72, 1)))   # 28 px = texte de légende sur la planche
    return R
if __name__ == '__main__':
    seuil = float(sys.argv[2]) if len(sys.argv) > 2 else 6
    R = mesure(sys.argv[1]); pts = [x[3] for x in R]
    print(len(R), 'planches ; légende : médiane %.1f pt, mini %.1f pt ; sous %g pt : %d' % (statistics.median(pts), min(pts), seuil, sum(1 for x in pts if x < seuil)))
    for x in sorted(R, key=lambda x: x[3]):
        if x[3] < seuil: print('  %s p. %d : %d mm de large, légende %.1f pt' % x)
