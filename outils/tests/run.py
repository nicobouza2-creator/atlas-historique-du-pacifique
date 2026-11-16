"""Banc d'essai : python3 run.py <hash> <fichier.js | -> [largeur hauteur] [capture.png]
Sert le dépôt, remplace d3 (CDN) par la copie locale, exécute le JS (async function body) et affiche le résultat + erreurs."""
import sys, json, threading, http.server, functools, socketserver, os
from playwright.sync_api import sync_playwright
PAGE = os.environ.get('PAGE', 'index.html')   # PAGE=college.html pour l'atlas du collège
REPO = os.environ.get('REPO') or os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))   # REPO=<dist> pour tester la version publiée
# d3 7.8.5 servi en local (le CDN n'est pas joignable partout) : chemin dans la variable D3, sinon le CDN est laissé passer
D3 = open(os.environ['D3'], 'rb').read() if os.environ.get('D3') else None
class H(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass
socketserver.TCPServer.allow_reuse_address = True
srv = socketserver.ThreadingTCPServer(('127.0.0.1', 0), functools.partial(H, directory=REPO))
port = srv.server_address[1]
threading.Thread(target=srv.serve_forever, daemon=True).start()
hsh = sys.argv[1]; src = sys.argv[2]
js = sys.stdin.read() if src == '-' else open(src).read()
w = int(sys.argv[3]) if len(sys.argv) > 3 else 1366; h = int(sys.argv[4]) if len(sys.argv) > 4 else 768
shot = sys.argv[5] if len(sys.argv) > 5 else None
errs = []
with sync_playwright() as p:
    b = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
    pg = b.new_page(viewport={'width': w, 'height': h})
    if D3: pg.route('**/cdnjs.cloudflare.com/**', lambda r: r.fulfill(body=D3, content_type='application/javascript'))
    pg.route('**/fonts.googleapis.com/**', lambda r: r.fulfill(body='', content_type='text/css'))
    pg.route('**/fonts.gstatic.com/**', lambda r: r.abort())
    pg.on('pageerror', lambda e: errs.append('PAGEERROR ' + str(e)))
    pg.on('console', lambda m: errs.append('CONSOLE ' + m.text) if m.type == 'error' and 'favicon' not in m.text else None)
    pg.goto(f'http://127.0.0.1:{port}/{PAGE}{hsh}')
    pg.wait_for_timeout(1500)
    try:
        res = pg.evaluate('async()=>{' + js + '}')
    except Exception as e:
        res = 'EVAL ERROR ' + str(e)[:800]
    if shot:
        pg.wait_for_timeout(300); pg.screenshot(path=shot)
    b.close()
if os.environ.get('OUT'): open(os.environ['OUT'], 'w', encoding='utf-8').write(json.dumps(res, ensure_ascii=False))   # résultat complet dans un fichier
print(json.dumps(res, ensure_ascii=False)[:6000] if not isinstance(res, str) else res[:6000])
for e in errs[:15]: print(e[:400])
