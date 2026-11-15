# Outils de l'atlas

Rien ici n'est chargé par l'atlas : ce sont les scripts qui fabriquent les dossiers d'enquête, les paquets de l'artefact et les tests.
Python 3 (`reportlab`, `python-docx`, `pymupdf`, `pillow`, `playwright` + Chrome) et Node.
Chemins codés en dur : dépôt `/home/claude/repo/` (lien vers le clone), dossier de travail `/home/claude/dossiers/`.

## Dossiers d'enquête (PDF et Word)
1. `export.py <dépôt> [volet…]` : ouvre l'atlas dans Chrome, écrit `dossiers/data.json` (chapitres, enquêtes, images) et les cartes claires de fin de chapitre `dossiers/cartes/<volet>-<ci>.jpg`. d3 est servi en local (copie de d3 7.8.5).
2. Pièces en plus : `pdf/extras.json` (tous les volets sauf EMC, relus dans les PDF par `extract_extras.py`) et `pdf/extras5.py` (EMC, écrit à la main). Copier les deux dans `dossiers/` avec `pdf/*.py`, et fusionner `extras5.X` dans `dossiers/extras.json` pour `gen_docx.py`.
3. `pdf/gen_build.py [volet [index]]` (lancé depuis `dossiers/`) : écrit `dossiers/pdf/<volet>-<nn>.pdf` (ReportLab ; mise en page dans `gen_base.py` et `gen.py`). Les volets d'histoire ont l'en-tête « Bureau des enquêtes historiques ».
4. `gen_docx.py [volet [index]]` : écrit `dossiers/docx/<volet>-<nn>.docx` (même graine de mélange que les PDF).
5. `check_parity.py` : compare le corrigé de chaque .docx avec celui du PDF du dépôt. Faux positif connu : `mondial-11`.
6. Copier les PDF et .docx dans `pdf/` et `docx/` du dépôt.

Vérifié le 16/11/2026 : le générateur reproduit les dossiers publiés ; seul l'ordre des mauvaises réponses de la question de la « pièce en plus » peut changer. Les anciennes versions du générateur ne servent plus.

## Paquets pour l'artefact claude.ai (plafond de 512 fichiers, .docx refusé)
`pack.py <dépôt>` écrit `paquets/pdf-<volet>.txt`, `paquets/docx-<volet>.txt` et `paquets/index.json`. Le dossier `paquets/` n'est pas suivi par git : il ne sert qu'à l'artefact, où l'on publie `paquets/` à la place de `pdf/` et `docx/`.

## Tests (`tests/`)
- `D3=<chemin de d3.min.js> python3 run.py '<#lien>' regression.js` : parcourt les 79 chapitres et compte les erreurs JS.
- `node valider_enquetes.js <dépôt> <volet…>` : vérifie les enquêtes (images, réponses, indices).
- `auto.js` : joue une enquête de bout en bout (à injecter avec `run.py`).

## Images (`images/`)
- `wm.py search|info|get` : recherche et téléchargement sur Wikimedia Commons (vérifier la licence sur la page du fichier ; attendre entre deux requêtes).
- `schemas.py` : les quatre schémas du volet nickel (`img/profil.jpg`, `chaine.jpg`, `indonesie.jpg`, `coupe.jpg`).
