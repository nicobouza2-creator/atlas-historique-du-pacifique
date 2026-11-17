# Outils de l'atlas

© 2026 Nicolas BOUZA — idée, conception et réalisation, avec l'assistance de Claude (Anthropic) — CC BY-NC-ND 4.0.

Rien ici n'est chargé par l'atlas : ce sont les scripts qui fabriquent les dossiers d'enquête, les paquets de l'artefact et les tests.
Python 3 (`reportlab`, `python-docx`, `pymupdf`, `pillow`, `playwright` + Chrome) et Node.
Chemins codés en dur : dépôt `/home/claude/repo/` (lien vers le clone), dossier de travail `/home/claude/dossiers/`.

## Dossiers d'enquête (PDF et Word)
1. `export.py <dépôt> [volet…]` : ouvre l'atlas dans Chrome, écrit `dossiers/data.json` (chapitres, enquêtes, images) et les cartes claires de fin de chapitre `dossiers/cartes/<volet>-<ci>.jpg`. d3 est servi en local (copie de d3 7.8.5).
2. Pièces en plus : `pdf/extras.json` (tous les volets sauf EMC, relus dans les PDF par `extract_extras.py`) et `pdf/extras5.py` (EMC, écrit à la main). Copier les deux dans `dossiers/` avec `pdf/*.py`, et fusionner `extras5.X` dans `dossiers/extras.json` pour `gen_docx.py`.
3. `pdf/gen_build.py [volet [index]]` (lancé depuis `dossiers/`) : écrit `dossiers/pdf/<volet>-<nn>.pdf` (ReportLab ; mise en page dans `gen_base.py` et `gen.py`). Les volets d'histoire ont l'en-tête « Bureau des enquêtes historiques ».
4. `gen_docx.py [volet [index]]` : écrit `dossiers/docx/<volet>-<nn>.docx` (même graine de mélange que les PDF).
0. Pour savoir quels dossiers refaire après une modification : exporter l'ancienne version (`git worktree add /home/claude/base <commit>`, `export.py /home/claude/base`, déplacer `data.json` et `cartes/` dans `/home/claude/dossiers-old/`), exporter la nouvelle, puis `compare_dossiers.py`. Les cartes des dossiers n'ont pas de légende : seuls les noms et les dates posés sur la carte comptent.
5. `check_parity.py` : compare le corrigé de chaque .docx avec celui du PDF du dépôt. Faux positif connu : `mondial-11`.
6. Copier les PDF et .docx dans `pdf/` et `docx/` du dépôt.
7. `signer.py <dépôt>` : mention d'auteur (© 2026 Nicolas BOUZA, avec l'assistance de Claude) en pied de page, dans la marge et dans les propriétés de chaque PDF (`pdf/`, `fiches/`, `seq/`) et Word (`docx/`). Sans effet sur un fichier déjà signé ; `--verifier` liste les fichiers non signés. `pack.py` l'appelle de lui-même.

Vérifié le 16/11/2026 : le générateur reproduit les dossiers publiés ; seul l'ordre des mauvaises réponses de la question de la « pièce en plus » peut changer. Les anciennes versions du générateur ne servent plus.

## Paquets pour l'artefact claude.ai (plafond de 512 fichiers, .docx refusé)
`artefact.py <dépôt> <sortie>` ne garde que les scripts chargés par `index.html` et les volets de l'école. Images (`img_paquets.py`) : les 447 de `artefact_ecole_images.txt` sont publiées une à une ; les autres images utilisées par l'école partent dans `paquets/img-1.txt` (Calédonie, géo NC, nickel, Pacifique), `img-2.txt` (Découvertes, Peupler la Terre) et `img-3.txt` (mondialisation, EMC), lus à la demande par un chargeur ajouté à la fin de `js/img.js` de l'artefact (`IMG[clé].f` devient une adresse blob:). Total au 17/11/2026 : 499 fichiers + 9 paquets `seq-` = 508.
`pack.py <dépôt>` écrit `paquets/pdf-<volet>.txt`, `paquets/docx-<volet>.txt` et `paquets/index.json`. Le dossier `paquets/` n'est pas suivi par git : il ne sert qu'à l'artefact, où l'on publie `paquets/` à la place de `pdf/` et `docx/`.

## Tests (`tests/`)
- `D3=<chemin de d3.min.js> python3 run.py '<#lien>' regression.js` : parcourt les 79 chapitres et compte les erreurs JS.
- `node valider_enquetes.js <dépôt> <volet…>` : vérifie les enquêtes (images, réponses, indices).
- `auto.js` : joue une enquête de bout en bout (à injecter avec `run.py`).
- `mesures.js` : fonction à évaluer dans la page (`page.evaluate(open('mesures.js').read())`) ; rend les textes sous le seuil de contraste, les cibles de moins de 44 px, les textes de moins de 12 px et les débordements. Sert à l'audit d'interface (16/11/2026).

## Données géographiques de la NC (`geo/`)
- `georep.py <service> [couche] [simplification]` : télécharge une couche des services ArcGIS du Géorep (gouvernement de la NC) en GeoJSON WGS84. `georep.py <service> layers` liste les couches.
- `ncgeo.py` (lancé dans le dossier des GeoJSON) : simplifie et écrit `js/nc-geo.js` (massifs de péridotites, aires coutumières, provinces, Grand Nouméa, tribus, lagons UNESCO, ZEE, centres miniers, usines). Les zones qui touchent la côte sont étendues vers la mer : la carte les découpe sur les terres, seules les limites intérieures comptent.
- Couches utilisées : `massifs_peridotites` (1 et 0), `aires_coutumieres`, `limites_terrestres` (0 et 1), `tribus_nc`, `UNESCO` (1), `Limites_administratives_maritimes` (4), `Exploitation_minière_v2_vue` (0 et 1), `routes_territoriales` (0, à télécharger sans simplification : `georep.py routes_territoriales 0 0`).
- Zones en mer (ZEE, lagons) : objets `{k:'poly',…}`, non découpés sur les terres ; `Rg` est réservé aux zones terrestres.

## Images (`images/`)
- `wm.py search|info|get` : recherche et téléchargement sur Wikimedia Commons (vérifier la licence sur la page du fichier ; attendre entre deux requêtes).
- `schemas.py` : les quatre schémas du volet nickel (`img/profil.jpg`, `chaine.jpg`, `indonesie.jpg`, `coupe.jpg`).

## Fiches séquences et « J'entoure, je colorie »
- `js/sequence.js` : fiche séquence de chaque chapitre (trame des fiches séance DENC), construite à l'ouverture à partir du chapitre et de son enquête ; modifiable, impression, export Word (.doc), export `.json` pour Fiche-sequence-NC (`SEQ.ficheNC(F)` → `{app:'fiche-sequence-nc',fiches,seances}`). Bouton dans le tiroir « Fiche prof ». `window.__seq({lv:'p'|'c'})` rend le HTML de la fiche du chapitre affiché.
- `js/entoure.js` : exercices à entourer et code couleur (43 chapitres d'histoire, `EXOS.data['<volet>-<ci>']`), bouton dans « Activités » ; la fiche élève imprimable est ajoutée en annexe de la fiche séquence (avec la carte de fin de chapitre).
- PDF standard pour l'artefact claude.ai (où l'impression est bloquée) : `seq/<volet>-<nn>.pdf` (non suivi par git), écrits par `D3=<d3.min.js> python3 outils/seq_pdf.py <dépôt> [volet…]` puis signés par `signer.py` ; `pack.py` en fait `paquets/seq-<volet>.txt` et `paquets/seq-index.json`.

## Questions ajoutées aux enquêtes (`js/enq-q2.js`)
- Chargé après les `enq-<volet>.js` : `A(volet, n° de chapitre, titre de la page, question)` ajoute une question « école primaire » à une page retrouvée par son titre (16/11/2026 : 70 questions à trous, à relier ou à remettre en ordre, pour qu'aucune enquête ne se limite aux QCM et aux vrai/faux).
- `window.__q2miss` doit rester vide (titre de page introuvable). `export.py` lit les enquêtes dans la page : les PDF et les Word reprennent ces questions. `valider_enquetes.js`, lui, ne lit que les `enq-<volet>.js`.
- Texte à trous : les trous se remplissent dans l'ordre à l'écran ; ne jamais écrire deux trous interchangeables.

## Vocabulaire
- `approx.py [--write] <fichiers js>` : remplace « ≈ » par « vers » (date), « environ » (durée, quantité) ou « de… à… environ » (période). Sans `--write`, affiche seulement ce qui changerait. Passé le 16/11/2026 sur les volets, `facile.js`, `img.js` et `enq-*.js` ; à relire après coup : une quantité de 3 ou 4 chiffres est prise pour une date (« vers 500 familles »), et un calcul (« ÷ 18 600 ≈ 14 ») doit s'écrire « = environ 14 ».

## Atlas du collège (`college.html`)
- Même moteur, autres volets : `python3 outils/college.py` fabrique `college.html` à partir de `index.html` (listes `VOLETS` et `SANS_DOSSIER` en tête du script). Ne pas modifier `college.html` à la main.
- `js/pays.js` : contours de 199 pays actuels (Natural Earth 1:50 m, domaine public), `window.PAYS[code ISO3]`, élargis vers la mer. Fabrication : `node geo/pays_topo.js <node_modules> pays.geojson` (npm : `world-atlas@2 topojson-client topojson-simplify i18n-iso-countries`), puis `python3 geo/pays.py pays.geojson ../js/pays.js` (`shapely`). Frontières actuelles : schéma pour le passé.
- `js/v-colonies.js`, `js/enq-colonies.js` : volet « Conquêtes et sociétés coloniales » (4e). Chaque chapitre porte `fs` (éléments de la fiche séance). `js/college.js` : Espace collège (programmes adaptés 6e-3e, fiche séance à la trame du livret d'accueil HG-EMC, séquence et évaluation, méthode, suite) ; `window.__college(onglet, chapitre)` pour les tests.
- `js/v-guerres.js`, `js/v-monde45.js`, `js/v-republique.js` : les trois volets de 3e, écrits le 16/11/2026 dans une autre conversation, directement dans l'artefact, et récupérés le 17/11 depuis la version publiée (code minifié remis en forme avec `terser -b`). `js/college.js` vient de la même version. Le volet « Le monde depuis 1945 » a l'identifiant `monde45` : `monde` est déjà « Peupler la Terre », dont le mode facile, le quiz et la galerie s'accrochaient à lui. Tracés connus comme schématiques : `monde45` ch. 1 route 6 (détroits turcs) et ch. 3 route 0 (départ de Marseille).
- **Avant de republier l'artefact du collège** : comparer `list_files` avec le dernier paquet construit. L'artefact peut avoir été modifié ailleurs (c'est arrivé le 16/11) : ne publier que les fichiers changés, sans écraser le reste.
- `js/passerelle.js` : deux onglets en haut de l'écran d'accueil, « Atlas du Pacifique · école primaire » et « Atlas d'histoire · collège ». Chargé par `index.html` et par `college.html`. Sur GitHub Pages le lien est direct ; dans un artefact claude.ai, l'autre atlas s'ouvre à son adresse publique.
- Enquêtes et dossiers des quatre volets du collège : `js/enq-<volet>.js`, `pdf/<volet>-0x.pdf`, `docx/<volet>-0x.docx`, pièces en plus dans `pdf/extras6.py`. Préfixes des dossiers : CO, GM, M45, RF. Dans une question « relier », les réponses de droite doivent être toutes différentes (le validateur ne le vérifie pas).
- Wikimedia Commons : la recherche (API) répond 429 depuis l'espace de travail, mais la fiche d'un fichier (`images/wm_fiche.py "Nom exact.jpg"` : licence, auteur, date) et son téléchargement (`images/wm_lot.py liste.txt`, par `Special:FilePath`) passent, lentement. Liste des fichiers pris : `images/college-commons.txt`.
- `js/d-colonies.js` : données « élèves » du volet (mode facile `FACILE.colonies`, mauvaises réponses du quiz `QCM.colonies`, galerie `GAL.colonies`), dans un fichier à part pour ne pas toucher à `facile.js` ni à `galerie.js`. `college.py` le charge après `galerie.js` et avant `v-colonies.js` (le moteur lit ces tables dans `ATLAS.add`). Un futur volet `xxx` aura de même `js/d-xxx.js`.
- Images du collège : Library of Congress (`images/loc.py "requête"` pour chercher, `images/loc_get.py liste.txt` pour télécharger avec titre, date et droits ; liste du volet colonies dans `images/colonies-loc.txt`), Wellcome Collection (IIIF) et Wikimedia Commons (`images/wm_fichier.py`, par nom de fichier exact : l'API de recherche de Commons limite vite les requêtes, espacer les téléchargements). Stéréoscopies : ne garder qu'une des deux vues. Largeur 1 000 px au plus. Les entrées s'ajoutent à la fin de `js/img.js`, sans toucher aux autres. Deux photos hautes (`contain`) ne doivent pas être affichées en même temps : le moteur peut les déplacer du même côté pour dégager les noms de la carte.
- `js/enquete.js` : `window.ENQ_LV` renomme les deux niveaux (« Parcours guidé », « Parcours autonome ») ; `window.ENQ_NODOS[volet]` retire les boutons de dossier quand le PDF n'existe pas encore.
- Tests : `PAGE=college.html D3=… python3 tests/run.py '#colonies' tests/regression.js` ; planche : `PAGE=college.html … tests/planche.py sortie.jpg colonies:2:-1`.
- Artefact claude.ai (séparé de celui de l'atlas du Pacifique, limité à 512 fichiers) : `TERSER=… python3 outils/artefact_college.py <dépôt> <sortie>` ne garde que les scripts chargés, les images utilisées et les bateaux `img/b-*.png` (le moteur les charge tous au démarrage).
- Dossiers d'enquête du collège : même chaîne que l'atlas du Pacifique, avec `PAGE=college.html python3 outils/export.py <dépôt> colonies`, puis `gen_build.py colonies <index>` et `gen_docx.py colonies <index>`. Les pièces en plus sont dans `pdf/extras6.py` (à fusionner dans `dossiers/extras.json` pour le Word). `COLLEGE` (dans `pdf/gen_build.py` et `gen_docx.py`) donne aux volets du collège leur nom d'atlas et les deux parcours ; rien ne change pour les autres volets (vérifié sur `caledonie-01`).
- `pack.py` : un volet de `TROUS` peut avoir des chapitres sans enquête (`null` dans l'index) ; `pack.main(dépôt, sortie, volets)` n'empaquette que les volets donnés.
- Fiches de l'Espace collège en PDF (l'impression est bloquée dans un artefact) : `python3 outils/fiches_college.py <dépôt>` écrit `fiches/<volet>-<nn>.pdf` (une fiche séance par chapitre, puis la séquence) ; `pack.py` en fait `paquets/fiches-<volet>.txt` et `paquets/fiches-index.json`.

## Sprites de carte (17/11/2026)
- Petits dessins posés sur la carte : bateaux, ce qui se déplace à pied, en train ou en avion (`s-`), lieux (`l-`), monuments (`m-`). Ils sont générés en local (ComfyUI) et rangés dans la bibliothèque d'images de l'auteur (`Resources/Bibliotheque-images/atlas-sprites/`, PNG de 220 px détourés ; les lots de génération sont dans `connecteur-mcp/images_jobs/lot-atlas-<n>.json`).
- `python3 outils/sprites.py <dossier des PNG> <dépôt> [dossier des PNG nettoyés]` : retire les fonds blancs restés dans le dessin (`TROUS`) et les ombres claires sous les pieds (`OMBRES`), écarte les dessins à refaire (`EXCLUS`), écrit `js/sprites.js` (`window.BOATS`, images WebP en « data: », un seul fichier à cause du plafond de 512 fichiers de l'artefact). Le moteur charge ce fichier après le démarrage (`sprLoad`) ; `artefact.py` et `artefact_college.py` le copient tel quel.
- `js/sprmap.js` (`window.SPRMAP`, lu par `ATLAS.add`) : quel sprite sur quel trajet (`r`) et sur quel lieu (`l` pour tout le volet, `lc` pour un chapitre). `'a|b'` = a s'il existe, sinon b ; une clé inconnue ne casse rien (le trajet garde sa flèche, le lieu son point) : on peut donc affecter un sprite avant qu'il soit dessiné. Règles : pas d'image sur les lieux de massacres, de camps et de deuils ; pas de monument construit après la date du chapitre.
- Moteur (`js/engine.js`) : `drawSpr` (sprite au bout d'un trajet : roulis et sillage des bateaux, pas des marcheurs, poussière des véhicules, ombre et inclinaison des avions, cyclone qui tourne), `icDim`/`drawIcon` (image sur un lieu : apparaît en grossissant, le texte s'écarte, fumée sur l'usine et le volcan), `<clé>-f2` = 2e image d'une animation (le moteur alterne les deux). Légendes des sprites : `SPR_PLUS`. Option « Petites images » (`opt.sprites`) dans les réglages ; les images figurent aussi dans la fiche du chapitre et dans les cartes exportées.
- Contrôle visuel : captures à mi-parcours d'un chapitre (les sprites de trajet ne se voient que pendant le déplacement), par exemple avec `window.__go(vi, ci, t)` puis `canvas.toDataURL()`.
