#!/usr/bin/env python3
"""Prépare les dossiers PDF et Word pour l'artefact claude.ai, qui limite le nombre de fichiers
(512) et refuse l'extension .docx.

  python3 pack.py <dépôt> [<sortie>]   ->  <sortie>/paquets/pdf-<volet>.txt, docx-<volet>.txt, seq-<volet>.txt, index.json, seq-index.json

(<sortie> vaut <dépôt> par défaut.) Chaque <format>-<volet>.txt = les fichiers <volet>-01, -02…
encodés en base64 et mis bout à bout. index.json = {"pdf": {volet: [[début, longueur], …]}, "docx": {…}}.
Déterministe : mêmes dossiers = mêmes paquets.

Le dossier paquets/ n'est pas suivi par git (.gitignore) : sur le dépôt et sur GitHub Pages,
enquete.js lit directement pdf/<volet>-<nn>.pdf et docx/<volet>-<nn>.docx.
On ne publie dans l'artefact que paquets/, jamais les dossiers pdf/ et docx/.
"""
import base64, json, os, re, sys

def main(repo, out):
    dest = os.path.join(out, 'paquets'); os.makedirs(dest, exist_ok=True)
    index = {}
    for ext, fext in (('pdf', 'pdf'), ('docx', 'docx'), ('seq', 'pdf')):   # seq/ = fiches séquences (PDF)
        d = os.path.join(repo, ext); vols = {}
        if not os.path.isdir(d): continue
        for f in sorted(os.listdir(d)):
            m = re.fullmatch(r'([a-z]+)-(\d\d)\.' + fext, f)
            if m: vols.setdefault(m.group(1), []).append((int(m.group(2)), f))
        index[ext] = {}
        for v, items in sorted(vols.items()):
            items.sort(); nums = [n for n, _ in items]
            if nums != list(range(1, len(nums) + 1)): sys.exit(f'{ext}/{v} : numérotation trouée {nums}')
            pos, spans, parts = 0, [], []
            for _, f in items:
                b = base64.b64encode(open(os.path.join(d, f), 'rb').read()).decode('ascii')
                spans.append([pos, len(b)]); parts.append(b); pos += len(b)
            open(os.path.join(dest, f'{ext}-{v}.txt'), 'w', encoding='ascii', newline='').write(''.join(parts))
            index[ext][v] = spans
            print(f'{ext}-{v}: {len(items)} dossiers, {pos} caractères')
    seq = index.pop('seq', None)   # index à part : les fiches séquences ne touchent pas à index.json
    if seq is not None: open(os.path.join(dest, 'seq-index.json'), 'w', encoding='ascii', newline='').write(json.dumps(seq, separators=(',', ':')))
    open(os.path.join(dest, 'index.json'), 'w', encoding='ascii', newline='').write(json.dumps(index, separators=(',', ':')))

if __name__ == '__main__':
    if len(sys.argv) not in (2, 3): sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2] if len(sys.argv) == 3 else sys.argv[1])
