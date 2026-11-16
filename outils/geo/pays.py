"""Étape 2 de js/pays.js : chaque pays est élargi vers la mer (la carte découpe les zones sur les terres :
seules les frontières terrestres comptent) et très légèrement vers l'intérieur (pas de liseré entre deux pays
d'une même zone). python3 pays.py <entrée.geojson> <js/pays.js>"""
import json, sys
from shapely.geometry import shape, box, mapping
from shapely.ops import unary_union

MER, BORD, TOL, MINI = 0.45, 0.04, 0.08, 0.02
fc = json.load(open(sys.argv[1]))
geoms = {}
for f in fc['features']:
    g = shape(f['geometry'])
    if not g.is_valid:
        g = g.buffer(0)
    c = f['properties']['c']
    geoms[c] = g if c not in geoms else geoms[c].union(g)
tout = unary_union(list(geoms.values()))
monde = box(-180, -89.5, 180, 89.5)
out, npts = {}, 0
for c, g in sorted(geoms.items()):
    mer = g.buffer(MER, quad_segs=2).difference(tout)
    h = unary_union([g.buffer(BORD, quad_segs=1), mer]).intersection(monde).simplify(TOL, preserve_topology=True)
    polys = [h] if h.geom_type == 'Polygon' else [p for p in getattr(h, 'geoms', []) if p.geom_type == 'Polygon']
    rings = []
    for p in polys:
        if p.area < MINI:
            continue
        r = [[round(x, 2), round(y, 2)] for x, y in p.exterior.coords]
        r = [pt for i, pt in enumerate(r) if i == 0 or pt != r[i - 1]]
        if len(r) >= 4:
            rings.append(r[:-1])
            npts += len(r)
    if rings:
        out[c] = rings
noms = {f['properties']['c']: f['properties']['n'] for f in fc['features']}
js = ("/* Pays actuels (contours simplifiés, élargis vers la mer) — Natural Earth 1:50 m, domaine public.\n"
      "   Fabriqué par outils/geo/pays_topo.js puis outils/geo/pays.py. window.PAYS[code ISO à 3 lettres] = liste d'anneaux.\n"
      "   Sert à colorier des ensembles de pays (empires, alliances) avec Rg() : frontières ACTUELLES, donc schéma pour le passé. */\n"
      "window.PAYS=" + json.dumps(out, separators=(',', ':')) + ";\n")
open(sys.argv[2], 'w').write(js)
print(len(out), 'pays,', npts, 'points,', len(js) // 1024, 'Ko')
json.dump(noms, open(sys.argv[2] + '.noms.json', 'w'), ensure_ascii=False)
