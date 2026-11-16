#!/usr/bin/env python3
"""PDF standard des fiches séquences (atlas école) :  D3=<d3.min.js> python3 seq_pdf.py <dépôt> [volet ...]

© 2026 Nicolas BOUZA — avec l'assistance de Claude (Anthropic) — CC BY-NC-ND 4.0.
Remplace outils/seq/batch.py (perdu). Ouvre index.html dans Chrome sans écran, affiche chaque chapitre, ouvre sa fiche
séquence (SEQ.open, réglages par défaut) et l'imprime en PDF : seq/<volet>-<nn>.pdf (dossier non suivi par git).
La mention d'auteur est dans la fiche (sequence.js) ; signer.py ajoute ensuite le pied de page et les propriétés.
d3 7.8.5 en local (variable D3) : le CDN n'est pas joignable depuis l'espace de travail."""
import functools, http.server, os, socketserver, sys, threading
from playwright.sync_api import sync_playwright


def main(repo, only=None):
    d3 = open(os.environ['D3'], 'rb').read() if os.environ.get('D3') else None
    out = os.path.join(repo, 'seq'); os.makedirs(out, exist_ok=True)

    class H(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a): pass
    socketserver.TCPServer.allow_reuse_address = True
    srv = socketserver.ThreadingTCPServer(('127.0.0.1', 0), functools.partial(H, directory=repo))
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    errs = []
    with sync_playwright() as p:
        b = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
        pg = b.new_page(viewport={'width': 1366, 'height': 900})
        if d3: pg.route('**/cdnjs.cloudflare.com/**', lambda r: r.fulfill(body=d3, content_type='application/javascript'))
        pg.route('**/fonts.googleapis.com/**', lambda r: r.fulfill(body='', content_type='text/css'))
        pg.route('**/fonts.gstatic.com/**', lambda r: r.abort())
        pg.on('pageerror', lambda e: errs.append(str(e)))
        pg.goto('http://127.0.0.1:%d/index.html' % srv.server_address[1])
        pg.wait_for_timeout(1500)
        vols = pg.evaluate("()=>ATLAS.api.vols().map(function(v){return [v.id,v.chapters.length];})")
        for i, (vid, n) in enumerate(vols):
            if only and vid not in only: continue
            for ci in range(n):
                pg.evaluate("([i,ci])=>{SEQ.close&&SEQ.close();ATLAS.api.volet(i,ci);}", [i, ci])
                pg.wait_for_timeout(700)
                pg.evaluate("()=>{SEQ.open();}")
                pg.wait_for_timeout(900)
                f = os.path.join(out, '%s-%02d.pdf' % (vid, ci + 1))
                pg.pdf(path=f, prefer_css_page_size=True, print_background=True)
                print(f, os.path.getsize(f) // 1024, 'Ko', flush=True)
        b.close()
    for e in errs[:10]: print('ERREUR', e[:300])


if __name__ == '__main__':
    if len(sys.argv) < 2: sys.exit(__doc__)
    main(sys.argv[1], set(sys.argv[2:]) or None)
