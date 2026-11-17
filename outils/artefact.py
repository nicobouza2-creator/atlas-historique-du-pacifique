#!/usr/bin/env python3
"""Prépare la version publiée dans l'artefact claude.ai :  python3 artefact.py <dépôt> <sortie>

<sortie> reçoit index.html, img/ (images publiées une à une, voir img_paquets.py), js/ (JavaScript minifié par terser : plus difficile à recopier, plus léger)
et paquets/ (dossiers PDF et Word, voir pack.py). Les sources lisibles restent dans le dépôt.
terser : npm install terser (variable TERSER = chemin de l'exécutable, sinon « npx terser »)."""
import json, os, shutil, subprocess, sys
import pack, img_paquets

def main(repo, out):
    if os.path.exists(out): shutil.rmtree(out)
    os.makedirs(os.path.join(out, 'js'))
    shutil.copy(os.path.join(repo, 'index.html'), out)
    charge = img_paquets.main(repo, out)   # images une à une (img/) + paquets/img-<n>.txt et leur chargeur, ajouté à js/img.js
    terser = os.environ.get('TERSER', 'npx terser').split()
    pre = '/* Atlas historique du Pacifique · © 2026 Nicolas BOUZA · idée, conception et réalisation : Nicolas BOUZA, avec l’assistance de Claude (Anthropic) · CC BY-NC-ND 4.0 · usage en classe, pas d’usage commercial */'
    charges = ['js/img.js'] + img_paquets.scripts_ecole(repo)   # seulement les scripts chargés par index.html (pas ceux du collège)
    for f in sorted(os.path.basename(c) for c in charges):
        src, dst = os.path.join(repo, 'js', f), os.path.join(out, 'js', f)
        subprocess.run(terser + [src, '-c', 'passes=1', '-m', '--comments', 'false', '-f', 'preamble=' + json.dumps(pre, ensure_ascii=False), '-o', dst], check=True)
        print(f, os.path.getsize(src) // 1024, '->', os.path.getsize(dst) // 1024, 'Ko')
    tmp = os.path.join(out, 'chargeur.js'); open(tmp, 'w', encoding='utf-8').write(charge)
    mini = subprocess.run(terser + [tmp, '-c', 'passes=1', '-m', '--comments', 'false'], check=True, capture_output=True, text=True).stdout
    os.remove(tmp); open(os.path.join(out, 'js', 'img.js'), 'a', encoding='utf-8').write('\n' + mini)
    import re
    volets = set(re.findall(r'js/enq-([a-z0-9]+)\.js', ' '.join(charges))) - {'q2'}
    pack.main(repo, out, volets)

if __name__ == '__main__':
    if len(sys.argv) != 3: sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2])
