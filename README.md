# Atlas historique du Pacifique

Atlas animé d'histoire-géographie pour l'école primaire, centré sur la Nouvelle-Calédonie et le Pacifique.

**Site :** https://nicobouza2-creator.github.io/atlas-historique-du-pacifique/

## Contenu

Huit volets, 79 cartes animées, chacune avec sa galerie d'images, et une carte « Tout en même temps » :

Histoire
- **Peupler la Terre** (9) : les premiers humains, de l'Afrique au reste du monde, et les autres humanités.
- **Vers le Pacifique et la Nouvelle-Calédonie** (10) : Lapita, Polynésiens, peuplement de l'Océanie.
- **Les Grandes Découvertes** (15) : une carte par navigateur, de Zheng He à La Pérouse.
- **Histoire de la Nouvelle-Calédonie** (9) : aires coutumières, 1853, bagne, nickel, guerres mondiales, depuis 1946.

Géographie
- **Géographie de la NC** (7) : situer la Grande Terre, climat et risques, peuplement, habiter, se déplacer, produire, un pays maritime.
- **Le nickel** (9) : pourquoi ici, premières mines, mines et usines d'aujourd'hui, VKP, exportations, environnement.
- **Le monde et la mondialisation** (12) : se repérer, reliefs et climats, population et villes, routes de la mer, câbles, migrations, inégalités, changement climatique.

Enseignement moral et civique
- **Vivre ensemble (EMC)** (8) : la République de Paris à Nouméa, communes et élections, institutions de la Nouvelle-Calédonie, droit de vote, esclavage et abolitions, droits humains (1789, 1948, 1989), laïcité, solidarité.

Simultanéité
- **Tout en même temps** : tous les événements des volets d'histoire (et une quarantaine de repères du programme) sur une seule carte, avec un curseur du temps, une frise par région et dix « moments clés » (1492, 1774-1789, 1853-1879…). Lien direct : `index.html#simultane`.

## Mode enquête

79 enquêtes (une par chapitre), niveau école primaire ou collège : hypothèse, 4 pages de documents, carnet d'indices, conclusion.
Pour chaque enquête, un dossier à télécharger :
- `pdf/<volet>-<nn>.pdf` : dossier à imprimer (pièces, cahiers primaire et collège, corrigé) ;
- `docx/<volet>-<nn>.docx` : le même dossier en Word, modifiable (même numérotation, même corrigé).

Le dossier `outils/` contient les scripts qui régénèrent les dossiers PDF et Word, préparent la version publiée et testent l'atlas (voir `outils/LISEZMOI.md`).

## Pour la classe

- **Projection plein écran** (bouton ⛶ sur la carte ou touche **F**) : seulement la carte et le texte, en grand. Échap pour sortir.
- Clavier : Espace = lecture/pause, ← → = étape précédente/suivante.
- Outils : explorer la carte, mesurer une distance, jeu « Où est… ? », carte muette, lecture à voix haute, gros texte.
- Fiche du chapitre (récit, mots-clés, questions), export PDF et PNG.

Tracés schématiques ; dates anciennes approximatives. Photos et documents réels (crédits sous chaque image). Fonds de carte Natural Earth (domaine public) ; côtes de la Nouvelle-Calédonie © contributeurs OpenStreetMap (ODbL), via geo-maps ; récifs et limites administratives Natural Earth 10 m ; massifs de péridotites, provinces, aires coutumières (limites indicatives), tribus, ZEE, lagons inscrits à l’UNESCO, sites miniers et usines : Gouvernement de la Nouvelle-Calédonie, Géorep et DIMENC (données ouvertes), dans `js/nc-geo.js`.

## Licence

Textes, cartes animées, enquêtes et dossiers : [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.fr). Usage en classe libre, en citant l'atlas ; pas d'usage commercial, pas de version modifiée diffusée. Les photos et documents gardent la licence de leur auteur (indiquée sous chacun) ; fonds de carte Natural Earth (domaine public) et OpenStreetMap (ODbL).

## Protection

Dans l'atlas : pas de sélection de texte hors des champs de saisie, pas de clic droit ni de glisser sur les cartes et les images, copie de texte limitée à 200 caractères, mention de licence sur chaque export. La version publiée dans l'artefact Claude a un JavaScript minifié (`outils/artefact.py`). Ces mesures gênent la copie en bloc mais n'empêchent pas un utilisateur averti d'enregistrer la page. Tant que ce dépôt est public, son contenu reste lisible et téléchargeable ici.
