# Atlas historique du Pacifique — © 2026 Nicolas BOUZA, avec l’assistance de Claude (Anthropic). CC BY-NC-ND 4.0.
"""Communes de Nouvelle-Calédonie pour les repères au zoom.

Usage : python3 outils/geo/communes.py <dossier des données> <dépôt>
Le dossier contient :
  limites_terrestres_0.geojson  (python3 outils/geo/georep.py limites_terrestres)
  pop.json                      (Populations_communes/FeatureServer/0/query?where=1=1&outFields=*&returnGeometry=false&f=json)
Écrit (ou remplace) le bloc NCG.communes à la fin de js/nc-geo.js :
  b = limites intérieures entre communes (lignes, sans le trait de côte)
  n = [nom, lon, lat, population 2019] trié par population décroissante
Source : Géorep (BDADMIN-NC, DITTT) et ISEE (recensement 2019)."""
import json, re, sys
from shapely.geometry import shape
from shapely.ops import linemerge, polylabel, unary_union

src, repo = sys.argv[1], sys.argv[2]
NOMS = {'Belep': 'Bélep', 'Houailou': 'Houaïlou', 'Ile des Pins': 'Île des Pins',
        'Kaala Gomen': 'Kaala-Gomen', 'Mont Dore': 'Le Mont-Dore'}
fc = json.load(open(src + '/limites_terrestres_0.geojson'))
pop = {f['attributes']['code_com']: f['attributes']['Population2019']
       for f in json.load(open(src + '/pop.json'))['features']}

com = []
for f in fc['features']:
    g = shape(f['geometry']).buffer(0)
    nom = f['properties']['nom_minus']
    com.append((NOMS.get(nom, nom), f['properties']['code_com'], g))

# limites intérieures : partie du contour de A à moins de EPS du voisin B (une seule fois par paire)
EPS = 0.004
lignes = []
for i in range(len(com)):
    for j in range(i + 1, len(com)):
        a, b = com[i][2], com[j][2]
        if a.distance(b) > EPS:
            continue
        part = a.boundary.intersection(b.buffer(EPS))
        if part.is_empty:
            continue
        m = linemerge(part) if part.geom_type == 'MultiLineString' else part
        for l in (m.geoms if hasattr(m, 'geoms') else [m]):
            if l.geom_type != 'LineString' or l.length < 0.02:
                continue
            l = l.simplify(0.0025)
            lignes.append([[round(x, 3), round(y, 3)] for x, y in l.coords])

noms = []
for nom, code, g in com:
    big = max(g.geoms, key=lambda p: p.area) if g.geom_type == 'MultiPolygon' else g
    p = polylabel(big, tolerance=0.005)
    noms.append([nom, round(p.x, 3), round(p.y, 3), pop.get(code, 0)])
noms.sort(key=lambda n: -n[3])

bloc = '\n/*COMMUNES*/window.NCG.communes=' + json.dumps({'b': lignes, 'n': noms}, ensure_ascii=False, separators=(',', ':')) + ';/*FIN COMMUNES*/\n'
path = repo + '/js/nc-geo.js'
s = open(path, encoding='utf-8').read()
s = re.sub(r'\n?/\*COMMUNES\*/.*?/\*FIN COMMUNES\*/\n?', '', s, flags=re.S).rstrip('\n')
open(path, 'w', encoding='utf-8').write(s + bloc)
print(len(com), 'communes ·', len(lignes), 'limites ·', sum(len(l) for l in lignes), 'points ·', len(bloc), 'octets')
