# Remplace « ≈ » par « environ » / « vers » dans les textes. python3 approx.py [--write] fichiers…
import re,sys
WRITE='--write' in sys.argv; files=[a for a in sys.argv[1:] if not a.startswith('--')]
S='[    ]'          # espaces (dont insécables)
NUM=r'\d(?:[\d    ]*\d)?'
ERA=r'(?:'+S+r'(?:av|apr)\.'+S+r'J\.-C\.)'
def conv(s):
    out=[]; i=0
    for m in re.finditer('≈'+S+'?',s):
        pre=s[max(0,m.start()-12):m.start()]; post=s[m.end():m.end()+60]
        startStr = bool(re.search(r"Ph\(\d+(?:\.\d+)?,'$",pre))            # titre d'étape : majuscule
        low = lambda w: w.capitalize() if startStr else w
        rep=None; skip=0
        if re.search(r"[Ii]l y a"+S+"$",pre): rep='environ '
        elif re.search(r"\bde"+S+"$",pre): out.append(s[i:m.start()-3]); i=m.start(); rep='d’environ '
        elif re.search(r"d’$",pre): rep='environ '
        else:
            r=re.match(r'('+NUM+ERA+r'?)'+S+r'à'+S+r'('+NUM+ERA+r'?)(?!'+S+r'?(?:ans|km|m\b|hab|%|millions|milliards))',post)
            d=re.match(r'('+NUM+r')(?:'+S+r'?[–-]'+S+r'?'+NUM+r')?'+ERA,post) or re.match(r'(\d{3,4})(?:'+S+r'?[–-]'+S+r'?\d{2,4})?(?!['+'    '+r']?(?:\d|ans|km|m\b|hab|%|kg|mètres|millions|milliards|fois|av\.|apr\.))',post)
            if r and (re.search(ERA,r.group(0)) or re.match(r'\d{3,4}$',r.group(1))):
                rep=low('de ')+r.group(1)+' à '+r.group(2)+' environ'; skip=len(r.group(0))
            elif d: rep=low('vers ')
            else: rep=low('environ ')
        out.append(s[i:m.start()]); out.append(rep); i=m.end()+skip
    out.append(s[i:]); return ''.join(out)
for f in files:
    s=open(f,encoding='utf-8').read(); n=s.count('≈'); t=conv(s)
    if not WRITE:
        for a,b in zip(s.split('\n'),t.split('\n')):
            if a!=b:
                for m in re.finditer('≈',a):
                    frag=a[max(0,m.start()-28):m.start()+44]
                    k=a[:m.start()].count('≈'); 
                # affiche les fragments modifiés de la ligne (après)
                ms=[x for x in re.finditer(r"(?:[Ee]nviron|[Vv]ers|d’environ|[Dd]e )",b)]
                segs=re.findall(r"[^'\[\(,]{0,30}(?:[Ee]nviron |[Vv]ers |d’environ )[^'\]\)]{0,40}|[Dd]e \d[^']{0,40} environ[^']{0,12}",b)
                print(f[3:],'|',' ¦ '.join(x.strip() for x in segs)[:230].replace(' ','⍽').replace(' ','⍽'))
    else: open(f,'w',encoding='utf-8').write(t)
    print('#',f,n,'→',t.count('≈'))
