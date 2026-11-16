#!/usr/bin/env python3
"""Prépare la version publiée dans l'artefact claude.ai :  python3 artefact.py <dépôt> <sortie>

<sortie> reçoit index.html, img/, js/ (JavaScript minifié par terser : plus difficile à recopier, plus léger)
et paquets/ (dossiers PDF et Word, voir pack.py). Les sources lisibles restent dans le dépôt.
terser : npm install terser (variable TERSER = chemin de l'exécutable, sinon « npx terser »)."""
import os, shutil, subprocess, sys
import pack

def main(repo, out):
    if os.path.exists(out): shutil.rmtree(out)
    os.makedirs(os.path.join(out, 'js'))
    shutil.copy(os.path.join(repo, 'index.html'), out)
    shutil.copytree(os.path.join(repo, 'img'), os.path.join(out, 'img'))
    terser = os.environ.get('TERSER', 'npx terser').split()
    pre = '/* Atlas historique du Pacifique · © 2026 Nicolas BOUZA · idée, conception et réalisation : Nicolas BOUZA, avec l’assistance de Claude (Anthropic) · CC BY-NC-ND 4.0 · usage en classe, pas d’usage commercial */'
    for f in sorted(os.listdir(os.path.join(repo, 'js'))):
        if not f.endswith('.js'): continue
        src, dst = os.path.join(repo, 'js', f), os.path.join(out, 'js', f)
        subprocess.run(terser + [src, '-c', 'passes=1', '-m', '--comments', 'false', '--preamble', pre, '-o', dst], check=True)
        print(f, os.path.getsize(src) // 1024, '->', os.path.getsize(dst) // 1024, 'Ko')
    pack.main(repo, out)

if __name__ == '__main__':
    if len(sys.argv) != 3: sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2])
