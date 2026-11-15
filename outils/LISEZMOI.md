# Outils de génération des dossiers Word

Chaîne (Python 3, `python-docx`, `pymupdf`, `pillow`, `playwright` + Chrome) :

1. `export.py <dépôt> [volet…]` : ouvre l'atlas dans Chrome, écrit `dossiers/data.json` (chapitres, enquêtes, images) et les cartes claires de fin de chapitre `dossiers/cartes/<volet>-<ci>.jpg`. d3 est servi en local (`tools/d3.min.js`, d3 7.8.5).
2. `extract_extras.py` : relit dans les PDF la « pièce en plus » de chaque dossier et ses questions → `dossiers/extras.json`.
3. `gen_docx.py [volet [index]]` : écrit `dossiers/docx/<volet>-<nn>.docx` (même graine de mélange que les PDF).
4. `check_parity.py` : compare le corrigé de chaque .docx avec celui du PDF.
   Faux positif connu : `mondial-11`, une ligne du PDF commence par « 1900. » et passe pour une réponse numérotée.

Chemins codés en dur : dépôt `/home/claude/repo/`, sortie `/home/claude/dossiers/`. `dump.py` = lecture des lignes d'un PDF (PyMuPDF).

Les dossiers PDF eux-mêmes viennent d'un autre générateur (ReportLab), conservé dans le projet Claude « Création d'un second cerveau » (`claude/atlas-dossiers/`).
