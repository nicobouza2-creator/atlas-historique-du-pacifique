#!/usr/bin/env python3
"""PDF des fiches de l'Espace collège (l'impression est bloquée dans un artefact claude.ai) :
  python3 outils/fiches_college.py <dépôt> [<dossier des polices>]
Écrit fiches/<volet>-<nn>.pdf : une fiche séance par chapitre (01…), puis la séquence avec son évaluation (dernier numéro).
Ouvre college.html dans Chrome, reprend le HTML de l'Espace collège (window.__college) et l'imprime en A4.
Polices : Atkinson Hyperlegible (google/fonts), dossier /home/claude/fonts par défaut. d3 : /home/claude/tools/d3.min.js."""
import sys, os, subprocess, time, tempfile, shutil
from playwright.sync_api import sync_playwright

CSS = """@font-face{font-family:Atk;src:url(AtkinsonHyperlegible-Regular.ttf)}@font-face{font-family:Atk;font-weight:700;src:url(AtkinsonHyperlegible-Bold.ttf)}
@page{size:A4;margin:13mm 12mm 14mm}body{font:10.5pt/1.42 Atk,sans-serif;color:#1b2430;margin:0}
h1{font-size:17pt;margin:0 0 2pt}h2{font-size:13pt;margin:14pt 0 4pt;border-bottom:1.5pt solid #1f2d3d;padding-bottom:2pt}h3{font-size:11.5pt;margin:10pt 0 3pt}
p{margin:4pt 0}.sub,.col-rem{color:#55606d}.col-rem{font-size:9.5pt}ul,ol{margin:3pt 0 3pt 16pt;padding:0}li{margin:1.5pt 0}
table{width:100%;border-collapse:collapse;margin:6pt 0 10pt;page-break-inside:auto}
td,th{border:1pt solid #333;padding:5pt 7pt;vertical-align:top;text-align:left}th{background:#eef2f6}td.h{width:17mm;font-weight:700;text-align:center;background:#f6f8fa}
.col-lv{display:none}.pied{margin-top:10pt;font-size:8.5pt;color:#55606d;border-top:.5pt solid #b8c2cc;padding-top:3pt}"""

def main(repo, fonts):
    out = os.path.join(repo, 'fiches'); os.makedirs(out, exist_ok=True)
    tmp = tempfile.mkdtemp()
    for f in ('AtkinsonHyperlegible-Regular.ttf', 'AtkinsonHyperlegible-Bold.ttf'): shutil.copy(os.path.join(fonts, f), tmp)
    srv = subprocess.Popen([sys.executable, '-m', 'http.server', '8766'], cwd=repo, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL); time.sleep(1)
    n = 0
    try:
        with sync_playwright() as p:
            b = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
            pg = b.new_page(viewport={'width': 1300, 'height': 900})
            pg.route('**/d3.min.js', lambda r: r.fulfill(path='/home/claude/tools/d3.min.js'))
            pg.goto('http://localhost:8766/college.html'); pg.wait_for_timeout(2500)
            vols = pg.evaluate("ATLAS.api.vols().filter(v=>COLLEGE.SEQC[v.id]).map(v=>[v.id,v.chapters.length,v.title])")
            pr = b.new_page()
            for vi, (vol, nch, titre) in enumerate(vols):
                pg.evaluate("(id)=>{var V=ATLAS.api.vols();ATLAS.api.volet(V.findIndex(v=>v.id===id),0);}", vol); pg.wait_for_timeout(300)
                pages = [pg.evaluate("(ci)=>window.__college('fiche',ci)", ci) for ci in range(nch)] + [pg.evaluate("()=>window.__college('seq')")]
                for k, inner in enumerate(pages):
                    html = '<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><style>%s</style></head><body>%s<p class="pied">Atlas d’histoire — Collège · %s · à adapter à la classe</p></body></html>' % (CSS, inner.replace(' · à modifier librement (cliquez dans le texte)', ''), titre)
                    f = os.path.join(tmp, 'f.html'); open(f, 'w', encoding='utf-8').write(html)
                    pr.goto('file://' + f); pr.wait_for_timeout(250)
                    pr.pdf(path=os.path.join(out, '%s-%02d.pdf' % (vol, k + 1)), format='A4', print_background=True, prefer_css_page_size=True); n += 1
            b.close()
    finally:
        srv.terminate(); shutil.rmtree(tmp, ignore_errors=True)
    print(n, 'fiches dans', out)

if __name__ == '__main__':
    main(sys.argv[1] if len(sys.argv) > 1 else os.path.abspath(os.path.join(os.path.dirname(__file__), '..')), sys.argv[2] if len(sys.argv) > 2 else '/home/claude/fonts')
