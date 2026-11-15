#!/usr/bin/env python3
"""Regroupe les dossiers d'un format en un fichier par volet, pour tenir sous le plafond
de 512 fichiers de l'artefact claude.ai (qui refuse aussi les extensions .docx/.zip).

  python3 pack.py <depot> pdf     ->  pdf/<volet>.pdf.txt   + pdf/index.json
  python3 pack.py <depot> docx    ->  docx/<volet>.docx.txt + docx/index.json

Chaque <volet>.<ext>.txt = les fichiers <volet>-01.<ext>, -02… encodés en base64 et mis
bout à bout (sans séparateur). index.json = {volet: [[début, longueur], …]} en caractères,
dans l'ordre des chapitres. Déterministe : mêmes fichiers d'entrée = mêmes sorties.
Les fichiers individuels restent dans le dépôt GitHub (liens « Ouvrir le PDF » et repli
de enquete.js) ; seuls les paquets sont publiés dans l'artefact.
"""
import base64, json, os, re, sys

def main(repo, ext):
    d = os.path.join(repo, ext)
    vols = {}
    for f in sorted(os.listdir(d)):
        m = re.fullmatch(r'([a-z]+)-(\d\d)\.' + ext, f)
        if m:
            vols.setdefault(m.group(1), []).append((int(m.group(2)), f))
    index = {}
    for v, items in sorted(vols.items()):
        items.sort()
        nums = [n for n, _ in items]
        if nums != list(range(1, len(nums) + 1)):
            sys.exit(f'{v} : numérotation trouée {nums}')
        pos, spans, parts = 0, [], []
        for _, f in items:
            b = base64.b64encode(open(os.path.join(d, f), 'rb').read()).decode('ascii')
            spans.append([pos, len(b)]); parts.append(b); pos += len(b)
        open(os.path.join(d, f'{v}.{ext}.txt'), 'w', encoding='ascii', newline='').write(''.join(parts))
        index[v] = spans
        print(f'{v}: {len(items)} fichiers, {pos} caractères')
    open(os.path.join(d, 'index.json'), 'w', encoding='ascii', newline='').write(json.dumps(index, separators=(',', ':')))

if __name__ == '__main__':
    if len(sys.argv) != 3 or sys.argv[2] not in ('pdf', 'docx'):
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2])
