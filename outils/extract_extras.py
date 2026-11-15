# Relit la « pièce en plus » de chaque dossier PDF (texte, source, questions primaire/collège + corrigé) -> extras.json
import json, re, glob, sys
from dump import lines
D = json.load(open('/home/claude/dossiers/data.json'))
def isfont(x, f): return f in x[1]
def paras(L):
    if not L: return []
    gaps = [b[4] - a[4] for a, b in zip(L, L[1:]) if a[0] == b[0] and b[4] > a[4]]
    lead = min(gaps) if gaps else 99; out = [L[0][3]]
    for a, b in zip(L, L[1:]):
        if b[4] - a[4] > lead + 4 or b[0] != a[0]: out.append(b[3])
        else: out[-1] += ' ' + b[3]
    return [re.sub(r'\s+', ' ', p).strip() for p in out]
def extra(path, n_ex):
    L = [x for x in lines(path)]
    i = next(k for k, x in enumerate(L) if x[3] == 'PIÈCE N° %d' % n_ex and isfont(x, 'BlackOps'))
    j = next(k for k in range(i + 1, len(L)) if L[k][3].startswith('PIÈCE N° ') and isfont(L[k], 'BlackOps'))
    R = [x for x in L[i + 1:j] if x[2] >= 8.5 and not x[3].startswith(('PIÈCES DU DOSSIER', 'Dossier d’enquête')) and x[3] != 'CONFIDENTIEL' and not re.match(r'page \d+ /', x[3])]
    k = 0; tag = []
    while k < len(R) and isfont(R[k], 'Bol') and R[k][2] == 13.5: tag.append(R[k][3]); k += 1
    t = ' '.join(tag); R = R[k:]
    src = ' '.join(x[3] for x in R if isfont(x, 'Ita') and x[2] == 8.6)
    stamps = [x[3] for x in R if isfont(x, 'BlackOps')]
    e = {'t': t, 'src': src}
    if any(isfont(x, 'SpecialElite') and x[2] == 13.0 for x in R):
        e['kind'] = 'formulaire'
        labs = [x for x in R if isfont(x, 'Bol') and x[2] == 10.0]; vals = [x for x in R if isfont(x, 'SpecialElite') and x[2] == 10.8]
        rows = []
        for x in labs:
            if rows and x[4] - rows[-1][1][-1][4] < 16 and x[0] == rows[-1][1][-1][0]: rows[-1][1].append(x)
            else: rows.append([x[4], [x]])
        F = []
        for r, (y, ls) in enumerate(rows):
            y2 = rows[r + 1][0] if r + 1 < len(rows) else 1e9
            F.append([' '.join(l[3] for l in ls), ' '.join(v[3] for v in vals if y - 5 <= v[4] < y2 - 5 and v[0] == ls[0][0])])
        e['fields'] = F; return e, stamps
    body = [x for x in R if not isfont(x, 'BlackOps') and not (isfont(x, 'Ita') and x[2] == 8.6)]
    k = 0
    while k < len(body) and isfont(body[k], 'Bol') and body[k][2] == 12.5: k += 1
    body = body[k:]
    s = next((m for m, x in enumerate(body) if isfont(x, 'Bol') and x[2] == 10.0), None)
    if s is not None:
        e['tp'] = ' '.join(paras(body[s + 1:])); e['tp_title'] = body[s][3]; body = body[:s]
    f0 = body[0][1] if body else ''
    e['kind'] = 'carnet' if 'Patrick' in f0 else 'lettre' if 'FELL' in f0.upper() else 'tapuscrit' if 'Special' in f0 else 'fiche'
    e['txt'] = '\n'.join(paras(body)); return e, stamps
def question(L, a, n_ex):
    h = next(k for k in range(a, len(L)) if L[k][3].startswith('Pièce n° %d ·' % n_ex) and L[k][2] == 13.5)
    k = h + 1
    while L[k][2] == 13.5: k += 1
    Q = []
    while L[k][2] == 12.0 and 'Bol' in L[k][1]: Q.append(L[k][3]); k += 1
    q = ' '.join(Q); m = re.match(r'(\d+)\.\s*(.*)', q); n, q = int(m.group(1)), m.group(2)
    opts = []
    while k < len(L) and L[k][2] in (11.5, 15.0) and 'Bol' not in L[k][1]:
        s = L[k][3]
        if 'Vrai ou faux' in s: return n, {'k': 'vf', 'q': q}
        mm = re.match(r'^\W*([A-D])\. (.*)', s)
        if mm: opts.append(mm.group(2))
        elif opts: opts[-1] += ' ' + s.strip()
        k += 1
    return n, ({'k': 'qcm', 'q': q, 'opts': opts} if opts else {'k': 'libre', 'q': q})
def corrige(L):
    c = next(k for k, x in enumerate(L) if x[3].startswith('Corrigé · pour l’enseignant') and x[2] == 18.0)
    out = {}; cur = None; buf = {}
    for x in L[c:]:
        if x[2] == 13.5:
            cur = {'Cahier niveau école primaire': 'p', 'Cahier niveau collège': 'c'}.get(x[3]); continue
        if cur is None or x[2] != 10.5: continue
        m = re.match(r'(\d+)\.\s+(.*)', x[3])
        if m: buf = out.setdefault(cur, {}); buf[int(m.group(1))] = m.group(2); last = int(m.group(1))
        else: buf[last] += ' ' + x[3]
    return out
X = {}; bad = 0
for v, V in D['vols'].items():
    for ci, enq in enumerate(V['enq']):
        f = '/home/claude/repo/pdf/%s-%02d.pdf' % (v, ci + 1); n_ex = len(enq['pg']) + 1
        try:
            e, st = extra(f, n_ex); L = [x for x in lines(f) if x[2] >= 10]
            K = corrige(L)
            for lv, lab in (('p', 'NIVEAU ÉCOLE PRIMAIRE'), ('c', 'NIVEAU COLLÈGE')):
                a = next(k for k, x in enumerate(L) if x[3].startswith('Cahier de l’enquêteur · niveau ' + ('école primaire' if lv == 'p' else 'collège')))
                n, q = question(L, a, n_ex); ans = K[lv][n]
                if q['k'] == 'vf': q['a'] = ans.startswith('Vrai')
                elif q['k'] == 'libre': q['m'] = re.sub(r'^Réponse possible : ', '', ans)
                else:
                    good = re.sub(r'^[A-D]\. ', '', ans); assert good in q['opts'], (good, q['opts'])
                    q['a'] = [good] + [o for o in q['opts'] if o != good]; del q['opts']
                e['q' + lv] = q
            X['%s-%d' % (v, ci)] = e
        except Exception as ex:
            bad += 1; print('ÉCHEC', v, ci, repr(ex)[:200])
json.dump(X, open('/home/claude/dossiers/extras.json', 'w'), ensure_ascii=False, indent=0)
from collections import Counter
print(len(X), 'pièces relues ;', bad, 'échecs ;', Counter(e['kind'] for e in X.values()), Counter(e['qp']['k'] + '/' + e['qc']['k'] for e in X.values()))
print('sans texte :', [k for k, e in X.items() if e['kind'] != 'formulaire' and len(e.get('txt', '')) < 80], '; tp :', sum('tp' in e for e in X.values()), '; src vide :', [k for k, e in X.items() if not e['src']])
