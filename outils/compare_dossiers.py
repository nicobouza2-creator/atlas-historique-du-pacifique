# Dit quels dossiers refaire : compare deux exports (export.py) — texte du chapitre, enquête, légendes des images, image de la carte.
# python3 compare_dossiers.py [<ancien dossier> <nouveau dossier>]   (par défaut /home/claude/dossiers-old et /home/claude/dossiers) ; écrit <nouveau>/todo.json
import json,re,sys
from PIL import Image, ImageChops, ImageStat
OLD, NEW = (sys.argv + ['/home/claude/dossiers-old', '/home/claude/dossiers'])[1:3]
O=json.load(open(OLD+'/data.json')); N=json.load(open(NEW+'/data.json'))
chg=[]; why={}
for v in N['vols']:
    for ci,e in enumerate(N['vols'][v]['enq']):
        r=[]
        if json.dumps(N['vols'][v]['chapters'][ci],sort_keys=True,ensure_ascii=False)!=json.dumps(O['vols'][v]['chapters'][ci],sort_keys=True,ensure_ascii=False): r.append('chapitre')
        se=json.dumps(e,sort_keys=True,ensure_ascii=False)
        if se!=json.dumps(O['vols'][v]['enq'][ci],sort_keys=True,ensure_ascii=False): r.append('enquête')
        ids=set(re.findall(r'"(?:id|im|img|i)": ?"([a-z0-9_]+)"',se))|set(k for k in N['IMG'] if '"'+k+'"' in se)
        if any(N['IMG'].get(k)!=O['IMG'].get(k) for k in ids): r.append('légende image')
        a=Image.open(OLD+'/cartes/%s-%d.jpg'%(v,ci)).convert('RGB'); b=Image.open(NEW+'/cartes/%s-%d.jpg'%(v,ci)).convert('RGB')
        d=sum(ImageStat.Stat(ImageChops.difference(a,b)).mean)/3 if a.size==b.size else 99
        if d>0.15: r.append('carte %.1f'%d)
        if r: chg.append((v,ci)); why['%s-%d'%(v,ci)]=r
json.dump(chg,open(NEW+'/todo.json','w'))
print(len(chg),'dossiers à refaire sur 79')
by={}
for v,ci in chg: by.setdefault(v,[]).append('%d(%s)'%(ci,'+'.join(x.split(' ')[0][:4] for x in why['%s-%d'%(v,ci)])))
for v in by: print(v,':',' '.join(by[v]))
