# Wikimedia Commons : teste ou télécharge un fichier dont on connaît le nom exact (l'API de recherche est limitée ici).
# Usage : wm.py test "Nom.jpg" ...   |   wm.py get "Nom.jpg" sortie.jpg
import sys, hashlib, urllib.request, urllib.parse
UA = {'User-Agent': 'atlas-classe/1.0 (usage scolaire; github nicobouza2-creator/atlas-historique-du-pacifique)'}
def url(name):
    n = name.replace(' ', '_'); h = hashlib.md5(n.encode('utf8')).hexdigest()
    return 'https://upload.wikimedia.org/wikipedia/commons/%s/%s/%s' % (h[0], h[:2], urllib.parse.quote(n))
if sys.argv[1] == 'test':
    for n in sys.argv[2:]:
        try:
            r = urllib.request.urlopen(urllib.request.Request(url(n), headers=UA, method='HEAD'), timeout=30)
            print('OK ', r.headers.get('Content-Length'), n)
        except Exception as e: print('NON', getattr(e, 'code', e), n)
else:
    d = urllib.request.urlopen(urllib.request.Request(url(sys.argv[2]), headers=UA), timeout=120).read()
    open(sys.argv[3], 'wb').write(d); print(len(d), sys.argv[3])
