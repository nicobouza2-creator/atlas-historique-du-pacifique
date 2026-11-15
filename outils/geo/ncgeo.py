import json, math
from shapely.geometry import shape, Polygon, MultiPolygon, Point, mapping
from shapely.ops import unary_union
def L(f): return json.load(open(f))
def polys(g):
    if g.is_empty: return []
    if g.geom_type=='Polygon': return [g]
    if g.geom_type in ('MultiPolygon','GeometryCollection'): return [p for x in g.geoms for p in polys(x)]
    return []
def rings(g, tol, minarea=0.0, prec=3):
    out=[]
    for p in polys(g.simplify(tol, preserve_topology=True)):
        if p.area<minarea: continue
        c=[[round(x,prec),round(y,prec)] for x,y in p.exterior.coords]
        # retirer les doublons consécutifs
        cc=[c[0]]+[q for a,q in zip(c,c[1:]) if q!=a]
        if len(cc)>=4: out.append(cc[:-1] if cc[0]==cc[-1] else cc)
    return out
# terres (pour la découpe côté mer)
s=open('/home/claude/atlas-historique-du-pacifique/js/geo.js',encoding='utf-8').read()
i=s.index('window.GEO=')+len('window.GEO=');j=s.index('window.GEO.reef')
G=json.loads(s[i:j].rstrip().rstrip(';'))
land=unary_union([Polygon(p[0]).buffer(0) for p in G['detail']['coordinates']])
def seaward(features, key, buf=0.04, tol=0.004):
    """Étend chaque zone vers la mer (la carte la découpe sur les terres) : seules les limites intérieures restent détaillées."""
    geoms={f['properties'][key]:shape(f['geometry']).buffer(0) for f in features}
    out={}
    for k,g in geoms.items():
        others=unary_union([h for kk,h in geoms.items() if kk!=k])
        e=g.buffer(buf).difference(others.buffer(0.0005)).buffer(0)
        out[k]=rings(e,tol,minarea=0.00002)
    return out
NCG={}
# 1. massifs de péridotites (1/1 000 000), regroupés par massif nommé
M=L('massifs_peridotites_1.geojson'); T=L('massifs_peridotites_0.geojson')
keep=[shape(f['geometry']).buffer(0) for f in M['features'] if f['properties']['unite'] in ('Nappe des péridotites',"Formations d'altération")]
u=unary_union(keep).buffer(0.002).buffer(-0.002)
tops=[(f['properties']['toponyme'].strip(), Point(f['geometry']['coordinates'])) for f in T['features']]
SUD={'Massif du Sud','Goro','Prony','Ounia'}
groups={}
for p in polys(u):
    if p.area<0.00003: continue
    c=p.representative_point(); name=min(tops,key=lambda t:t[1].distance(c))[0]
    if name in SUD: name='Massif du Sud'
    groups.setdefault(name,[]).append(p)
A=(164.0,-20.15);B=(167.05,-22.45);ax=(B[0]-A[0],B[1]-A[1]);n=math.hypot(*ax)
def u_of(pt): return ((pt.x-A[0])*ax[0]+(pt.y-A[1])*ax[1])/n
NCG['massifs']=[]
for name,ps in sorted(groups.items(), key=lambda kv:(kv[0]!='Massif du Sud', u_of(unary_union(kv[1]).centroid))):
    rr=rings(unary_union(ps),0.003)
    lab=[t[1] for t in tops if t[0]==name] or [unary_union(ps).representative_point()]
    NCG['massifs'].append([name,[round(lab[0].x,3),round(lab[0].y,3)],rr])
# 2. aires coutumières (données de travail des officiers publics coutumiers, non officialisées)
AC=L('aires_coutumieres_0.geojson')
NOMS={'HOOT MA WHAAP':'Hoot Ma Whaap','PAICI-CAMUKI':'Paicî-Cèmuhi','AJIE-ARO':'Ajië Aro','XARACUU':'Xârâcùù','DJUBEA-KAPONE':'Drubea-Kapumë','NENGONE':'Nengone','DREHU':'Drehu','IAII':'Iaai'}   # orthographe de la loi organique (art. 1)
NCG['aires']={NOMS[k]:v for k,v in seaward(AC['features'],'nom_aire').items()}
# 3. provinces (BDADMIN-NC)
PR=L('limites_terrestres_1.geojson')
NCG['provinces']={{'PROVINCE NORD':'nord','PROVINCE SUD':'sud','PROVINCE DES ILES':'iles'}[k]:v for k,v in seaward(PR['features'],'nom').items()}
# 3 bis. Grand Nouméa = les 4 communes de l’agglomération (BDADMIN-NC)
CO=L('limites_terrestres_0.geojson')
gn=[f for f in CO['features'] if f['properties']['nom'].upper().replace('É','E') in ('NOUMEA','DUMBEA','PAITA','MONT DORE')]
assert len(gn)==4, [f['properties']['nom'] for f in CO['features']]
NCG['grandnoumea']=rings(unary_union([shape(f['geometry']).buffer(0) for f in gn]).buffer(0.03),0.004)
# 4. tribus (272 points)
TR=L('tribus_nc_0.geojson')
NCG['tribus']=[[round(f['geometry']['coordinates'][0],3),round(f['geometry']['coordinates'][1],3),f['properties']['nom_de_tribu'],f['properties']['nom_district'] or ''] for f in TR['features'] if f['geometry']]
# 5. lagons inscrits à l'UNESCO (zones de biens) et ZEE
UN=L('UNESCO_1.geojson')
NCG['unesco']=[[f['properties']['nom_zone'],rings(shape(f['geometry']).buffer(0),0.004)] for f in UN['features']]
Z=L('Limites_administratives_maritimes_4.geojson')
NCG['zee']=rings(shape(Z['features'][0]['geometry']).buffer(0),0.02)
# 6. centres miniers et usines (DIMENC, 2025)
E=L('Exploitation_minière_v2_vue_0.geojson'); U=L('Exploitation_minière_v2_vue_1.geojson')
NCG['mines']=[[round(f['geometry']['coordinates'][0],3),round(f['geometry']['coordinates'][1],3),f['properties']['MASSIF_MIN'].strip(),f['properties']['SITE_MINIE'].strip(),f['properties']['TITULAIRE'],f['properties']['TYPE_AUTOR']] for f in E['features']]
NCG['usines']=[[round(f['geometry']['coordinates'][0],3),round(f['geometry']['coordinates'][1],3),f['properties']['SOCIETE'],f['properties']['SITE'],f['properties']['ETAT'],f['properties']['DATE_MISE_']] for f in U['features']]
# 7. RT1 (route territoriale n° 1, Nouméa - Koumac) : les morceaux du Géorep enchaînés depuis Nouméa (couche téléchargée sans simplification)
from shapely.geometry import LineString, MultiLineString
from shapely.ops import linemerge
RT=L('routes_territoriales_0.geojson')
f=[x for x in RT['features'] if x['properties']['num_route']=='R.T.1'][0]
segs=[list(l.coords) for l in linemerge(MultiLineString([[(round(x,4),round(y,4)) for x,y in l] for l in f['geometry']['coordinates']])).geoms]
dist=lambda a,b: math.hypot(a[0]-b[0],a[1]-b[1]); start=(166.45,-22.27)
cur=min(segs,key=lambda q:min(dist(q[0],start),dist(q[-1],start))); segs.remove(cur)
if dist(cur[-1],start)<dist(cur[0],start): cur=cur[::-1]
path=cur[:]
while segs:
    end=path[-1]; best=min(segs,key=lambda q:min(dist(q[0],end),dist(q[-1],end)))
    if min(dist(best[0],end),dist(best[-1],end))>0.08: break
    segs.remove(best); path+=best[::-1] if dist(best[-1],end)<dist(best[0],end) else best
NCG['rt1']=[[round(x,3),round(y,3)] for x,y in LineString(path).simplify(0.003).coords]
src='/* Données géographiques officielles de la Nouvelle-Calédonie, simplifiées pour l’atlas.\n   Source : Gouvernement de la Nouvelle-Calédonie, Géorep (DTSI-SGT, DITTT, DIMENC), données ouvertes, 2025-2026.\n   Aires coutumières : donnée de travail des officiers publics coutumiers, non officialisée (limites indicatives).\n   Fabriqué par outils/geo/ncgeo.py. */\nwindow.NCG='+json.dumps(NCG,ensure_ascii=False,separators=(',',':'))+';\n'
open('/home/claude/atlas-historique-du-pacifique/js/nc-geo.js','w',encoding='utf-8').write(src)
print('taille',len(src.encode())//1024,'Ko')
for k,v in NCG.items():
    print(k, len(v) if not isinstance(v,dict) else {kk:len(vv) for kk,vv in v.items()}, len(json.dumps(v,separators=(',',':')))//1024,'Ko')
print([m[0] for m in NCG['massifs']])
