# Classe les pages basses : ne garde que celles qui ne sont pas la dernière page de leur partie (ou qui sont presque vides).
import sys, glob, subprocess, os
from remplissage import pages, fill
def sect(pdf, n):
    t = subprocess.run(['pdftotext', '-f', str(n), '-l', str(n), '-layout', pdf, '-'], capture_output=True, text=True).stdout
    if 'CORRIGÉ · POUR' in t[:400] or 'CORRIGÉ' in t[:300]: return 'K'
    if 'NIVEAU' in t[:300].upper() and 'CAHIER' in t[:300].upper() or 'PARCOURS' in t[:300].upper() and 'CAHIER' in t[:300].upper(): return 'C' + ('1' if ('PRIMAIRE' in t[:300].upper() or 'GUIDÉ' in t[:300].upper()) else '2')
    return 'P'
res = []
for f in sorted(glob.glob(sys.argv[1] + '/*.pdf')):
    P = pages(f); n = len(P); S = [sect(f, i + 1) for i in range(n)]
    bad = []
    for i in range(1, n):
        x = fill(P[i]); tail = (i == n - 1) or S[i + 1] != S[i]
        if x < 0.03 or (not tail and x < 0.55 and i != 2) or (tail and x < 0.12): bad.append((i + 1, round(float(x), 2), S[i], 'fin' if tail else 'milieu'))
    res.append((os.path.basename(f), n, bad))
    print(os.path.basename(f), n, bad)
print('DOSSIERS avec pages à revoir :', sum(1 for r in res if r[2]), '/', len(res), '; pages :', sum(len(r[2]) for r in res))
