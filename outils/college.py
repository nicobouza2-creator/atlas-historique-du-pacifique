#!/usr/bin/env python3
"""Fabrique college.html (Atlas d'histoire — Collège) à partir de index.html :  python3 outils/college.py <dépôt>

Même moteur, mêmes modules ; seuls changent le titre, l'accueil et la liste des volets chargés.
Ne jamais modifier college.html à la main : modifier index.html ou ce script, puis relancer."""
import re, sys, os

VOLETS = ['colonies']          # volets du collège, dans l'ordre de l'accueil (js/v-<id>.js, js/enq-<id>.js)
SANS_DOSSIER = ['colonies']   # volets dont les dossiers PDF/Word ne sont pas encore fabriqués
GARDE = ['geo.js', 'img.js', 'engine.js', 'ui.js', 'facile.js', 'activites.js', 'enquete.js', 'galerie.js']

def main(repo):
    s = open(os.path.join(repo, 'index.html'), encoding='utf-8').read()
    tags = re.findall(r'<script src="js/[^"]+"></script>\n', s)
    debut, fin = s.index(tags[0]), s.index(tags[-1]) + len(tags[-1])
    ordre = ['geo.js', 'pays.js', 'img.js', 'engine.js', 'ui.js', 'facile.js', 'activites.js', 'enquete.js']
    ordre += ['enq-%s.js' % v for v in VOLETS] + ['galerie.js'] + ['v-%s.js' % v for v in VOLETS] + ['college.js']
    assert all(f in ordre for f in GARDE)
    pre = '<script>window.ATLAS_COLLEGE=true;window.ENQ_LV={p:"Parcours guidé",c:"Parcours autonome"};window.ENQ_NODOS={%s};</script>\n' % ','.join('%s:1' % v for v in SANS_DOSSIER)
    s = s[:debut] + pre + ''.join('<script src="js/%s"></script>\n' % f for f in ordre) + s[fin:]
    n = s.count('Atlas historique du Pacifique')
    s = s.replace('<title>Atlas historique du Pacifique</title>', '<title>Atlas d’histoire — Collège</title>')
    s = s.replace('<h1 id="homeT">Atlas historique du Pacifique</h1>', '<h1 id="homeT">Atlas d’histoire — Collège</h1>')
    s = re.sub(r'(<h1 id="homeT">[^<]*</h1>\s*<p>)[^<]*(</p>)',
               r'\1Des cartes animées pour le programme d’histoire du collège adapté à la Nouvelle-Calédonie. Choisis un volet, ou ouvre l’Espace collège : programmes, fiches séance, suite du chantier.\2', s, count=1)
    s = s.replace('Atlas historique du Pacifique', 'Atlas d’histoire — Collège')
    open(os.path.join(repo, 'college.html'), 'w', encoding='utf-8').write(s)
    print('college.html :', len(ordre), 'scripts,', n, 'mentions du titre remplacées')

if __name__ == '__main__':
    main(sys.argv[1] if len(sys.argv) > 1 else os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
