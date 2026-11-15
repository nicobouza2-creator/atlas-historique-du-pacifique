import fitz,sys,re
def lines(path):
    d=fitz.open(path); out=[]
    for pi,p in enumerate(d):
        for b in p.get_text('dict')['blocks']:
            if b['type']!=0: continue
            for l in b['lines']:
                sp=[s for s in l['spans'] if s['text'].strip()]
                if not sp: continue
                f=re.sub(r'^[A-Z]{6}\+','',sp[0]['font']); out.append((pi,f,round(sp[0]['size'],1),''.join(s['text'] for s in l['spans']),round(l['bbox'][1]),b['number'],round(l['bbox'][0])))
    return out
if __name__=='__main__':
    L=lines(sys.argv[1]); a=int(sys.argv[2]); b=int(sys.argv[3])
    for x in L[a:b]: print(x)
