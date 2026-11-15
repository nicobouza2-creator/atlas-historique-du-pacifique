# Compare le corrigé (numéros + réponses) et la liste des pièces du .docx avec ceux du PDF, pour chaque dossier.
import glob, re, sys
from docx import Document
from dump import lines
norm = lambda t: re.sub(r'\s+', ' ', t.replace(' ', ' ')).strip()
bad = 0; n = 0
for f in sorted(glob.glob('/home/claude/dossiers/docx/*.docx')):
    name = f.split('/')[-1][:-5]; P = [p.text for p in Document(f).paragraphs]
    k = max(i for i, t in enumerate(P) if t.startswith('Corrigé · pour l’enseignant'))
    dx = [norm(t) for t in P[k:] if re.match(r'\d+\. ', t)]
    L = [x for x in lines('/home/claude/repo/pdf/%s.pdf' % name) if x[2] >= 10]
    c = next(i for i, x in enumerate(L) if x[3].startswith('Corrigé · pour l’enseignant') and x[2] == 18.0)
    pd = []
    for x in L[c:]:
        if x[2] != 10.5: continue
        if re.match(r'\d+\.\s', x[3]): pd.append(x[3])
        elif pd and not x[3].startswith('Pièce'): pd[-1] += ' ' + x[3]
    pd = [norm(t) for t in pd]
    pieces_d = [t for t in P if re.match(r'Pièce n° \d+ · ', t)]; n += 1
    dx = [t[:70] for t in dx]; pd = [t[:70] for t in pd]
    if dx != pd:
        bad += 1; diff = [(a, b) for a, b in zip(dx, pd) if a != b][:1]; print('≠', name, len(dx), len(pd), diff)
print(n, 'dossiers comparés,', bad, 'différence(s) dans le corrigé')
