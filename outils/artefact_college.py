#!/usr/bin/env python3
"""Prépare l'artefact claude.ai « Atlas d'histoire — Collège » :  python3 outils/artefact_college.py <dépôt> <sortie>

<sortie> reçoit index.html (= college.html), js/ (seulement les scripts chargés, minifiés par terser) et img/
(seulement les images utilisées par les volets et les enquêtes du collège). Lancer outils/college.py avant.
terser : variable TERSER = chemin de l'exécutable, sinon « npx terser »."""
import os, re, shutil, subprocess, sys
import pack

def main(repo, out):
    if os.path.exists(out): shutil.rmtree(out)
    os.makedirs(os.path.join(out, 'js')); os.makedirs(os.path.join(out, 'img'))
    html = open(os.path.join(repo, 'college.html'), encoding='utf-8').read()
    open(os.path.join(out, 'index.html'), 'w', encoding='utf-8').write(html)
    scripts = re.findall(r'<script src="js/([^"]+)"></script>', html)
    terser = os.environ.get('TERSER', 'npx terser').split()
    pre = '/* Atlas d’histoire — Collège · CC BY-NC-ND 4.0 · usage en classe, pas d’usage commercial */'
    ids = set()
    for f in scripts:
        src = os.path.join(repo, 'js', f)
        subprocess.run(terser + [src, '-c', 'passes=1', '-m', '--comments', 'false', '--preamble', pre, '-o', os.path.join(out, 'js', f)], check=True)
        if f.startswith(('v-', 'enq-')):
            s = open(src, encoding='utf-8').read()
            ids |= set(re.findall(r"\bSh\('([A-Za-z0-9_]+)'", s)) | set(re.findall(r"\bI\('([A-Za-z0-9_]+)'", s))
    reg = open(os.path.join(repo, 'js', 'img.js'), encoding='utf-8').read()
    n = 0
    for i in sorted(ids):
        m = re.search(r'"%s":\s*\{"f":\s*"(img/[^"]+)"' % re.escape(i), reg)
        if not m: print('image inconnue :', i); continue
        shutil.copy(os.path.join(repo, m.group(1)), os.path.join(out, m.group(1))); n += 1
    for f in sorted(os.listdir(os.path.join(repo, 'img'))):          # bateaux : le moteur les charge tous au démarrage
        if f.startswith('b-') and f.endswith('.png'): shutil.copy(os.path.join(repo, 'img', f), os.path.join(out, 'img', f)); n += 1
    vols = set(re.findall(r'<script src="js/v-([a-z]+)\.js"></script>', html))
    pack.main(repo, out, vols)                                       # paquets/ : dossiers PDF et Word, fiches de l'Espace collège
    tot = sum(os.path.getsize(os.path.join(d, f)) for d, _, fs in os.walk(out) for f in fs)
    print(len(scripts), 'scripts,', n, 'images,', tot // 1024, 'Ko')

if __name__ == '__main__':
    if len(sys.argv) != 3: sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2])
