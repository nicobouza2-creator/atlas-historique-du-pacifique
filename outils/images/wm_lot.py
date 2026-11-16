# Télécharge lentement des fichiers Commons par nom exact (Special:FilePath, largeur 1000). Liste : "Nom|clé" par ligne.
import sys, time, os, urllib.request, urllib.parse
UA = {'User-Agent': 'atlas-classe/1.0 (usage scolaire; github nicobouza2-creator/atlas-historique-du-pacifique)'}
for line in open(sys.argv[1], encoding='utf8'):
    line = line.strip()
    if not line: continue
    n, k = line.rsplit('|', 1); out = 'brut3/%s.jpg' % k
    if os.path.exists(out) and os.path.getsize(out) > 5000: print('déjà', k); continue
    u = 'https://commons.wikimedia.org/wiki/Special:FilePath/' + urllib.parse.quote(n.replace(' ', '_')) + '?width=1000'
    for essai in range(3):
        try:
            d = urllib.request.urlopen(urllib.request.Request(u, headers=UA), timeout=90).read(); open(out, 'wb').write(d); print('OK ', k, len(d)); break
        except Exception as e:
            print('échec', essai + 1, k, getattr(e, 'code', e)); time.sleep(45)
    time.sleep(15)
print('FIN')
