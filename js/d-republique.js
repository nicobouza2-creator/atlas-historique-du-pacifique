/* Atlas historique du Pacifique · Atlas d’histoire — Collège — © 2026 Nicolas BOUZA. Idée, conception et réalisation : Nicolas BOUZA,
   avec l’assistance de Claude (Anthropic). Licence CC BY-NC-ND 4.0. https://github.com/nicobouza2-creator/atlas-historique-du-pacifique */
/* Atlas du collège — données « élèves » du volet « La République depuis 1944 ».
   Même format que d-colonies.js. À charger après facile.js et galerie.js, avant v-republique.js.
   FACILE.republique[chapitre][étape], QCM.republique[chapitre][question] (deux mauvaises réponses), GAL.republique[chapitre]. */
window.FACILE=window.FACILE||{};window.QCM=window.QCM||{};window.GAL=window.GAL||{};

window.FACILE.republique=[
['🎉 *Paris* est libéré le *25 août 1944*. Le gouvernement du général *de Gaulle* rétablit la *République* et les libertés.',
 '🗳️ Depuis *1944*, les *Françaises* peuvent voter et être élues. Elles votent pour la première fois le *29 avril 1945*.',
 '🏗️ La France est ruinée. L’État *nationalise* de grandes entreprises et crée la *Sécurité sociale* (1945).',
 '📜 En *1946*, de Gaulle, qui voulait un président fort, démissionne. La *IVe République* est créée.',
 '🌍 En *1946*, tous les habitants de l’outre-mer deviennent *citoyens*. Le travail forcé et l’*indigénat* sont supprimés.',
 '✂️ En *1947*, la guerre froide commence : l’*union* de la Libération se brise, de grandes *grèves* éclatent.'],
['🔁 Sous la *IVe République*, les gouvernements tombent sans cesse. Le régime s’enlise dans les *guerres coloniales*.',
 '⚡ Le *13 mai 1958*, une crise éclate à *Alger*. On rappelle le général *de Gaulle* au pouvoir.',
 '📜 En *1958*, une nouvelle Constitution fonde la *Ve République*. Elle donne beaucoup de pouvoirs au *président*.',
 '🗳️ De Gaulle met fin à la *guerre d’Algérie* (1962). Depuis 1962, le président est élu par *tous les citoyens*.',
 '✊ En *mai 1968*, les *étudiants* se révoltent, puis les ouvriers font une *grève générale*.',
 '👋 En *1969*, les Français disent non à un référendum. *De Gaulle démissionne*.'],
['🚄 Après de Gaulle, *Pompidou* modernise le pays. *Giscard d’Estaing*, élu en 1974, abaisse la majorité à *18 ans*.',
 '🌹 Le *10 mai 1981*, *François Mitterrand* est élu : la *gauche* arrive au pouvoir. C’est l’*alternance*.',
 '🏛️ La *décentralisation* (1982) donne plus de pouvoirs aux communes, aux départements et aux régions.',
 '🤝 En *1986*, le président est de gauche et le Premier ministre de droite : c’est la *cohabitation*.',
 '🖐️ D’autres cohabitations suivent. En 2000, le mandat du président passe de sept à *cinq ans* : c’est le *quinquennat*.',
 '🗳️ En *2002*, l’extrême droite arrive au second tour ; *Jacques Chirac* est réélu très largement.'],
['📈 De 1945 à 1973, l’économie grandit vite et il y a très peu de chômage : ce sont les *Trente Glorieuses*.',
 '👶 Les naissances augmentent fortement : c’est le *baby-boom*. Les paysans quittent les campagnes pour les *villes*.',
 '🛒 Les familles s’équipent : réfrigérateur, télévision, *voiture*. C’est la *société de consommation*.',
 '👷 La France fait venir des *travailleurs immigrés* pour construire les routes, les logements et faire tourner les usines.',
 '⛽ En *1973*, le prix du pétrole flambe. La croissance ralentit, le *chômage* augmente.',
 '🤲 L’État répond : *SMIC*, aides aux chômeurs, villes nouvelles, puis revenu minimum.'],
['🗳️ Depuis 1944, les *femmes votent*. Mais dans les années 1950, on attend encore d’elles qu’elles restent *au foyer*.',
 '💼 De plus en plus de femmes *travaillent*. Depuis *1965*, une femme mariée peut travailler et ouvrir un compte *sans l’accord de son mari*.',
 '✊ *Mai 68* exprime le désir de liberté de la jeunesse. Des mouvements *féministes* réclament l’égalité réelle.',
 '📜 Des lois changent la vie : *contraception* (1967), majorité à *18 ans* (1974), *loi Veil* (1975).',
 '⚖️ Années 1980 : *peine de mort abolie* (1981), loi sur l’*égalité professionnelle* (1983). Mais des inégalités demeurent.',
 '🏝️ En *Nouvelle-Calédonie*, les Kanak, libérés de l’indigénat, circulent librement. Avec le *boom du nickel*, *Nouméa* grandit.'],
['🗳️ En *1946*, la Nouvelle-Calédonie devient un *territoire d’outre-mer*. Les Kanak deviennent *citoyens* ; le droit de vote s’étend peu à peu à tous.',
 '⛏️ De 1958 à 1975, l’État reprend des pouvoirs au territoire. Le *boom du nickel* attire de nouveaux habitants.',
 '🌺 En 1975, le festival *Mélanésia 2000* affirme la *culture kanak*. Des partis réclament l’*indépendance*.',
 '💔 De *1984 à 1988*, ce sont les « *Événements* » : des violences graves, jusqu’au drame d’*Ouvéa*.',
 '🤝 Le *26 juin 1988*, *Jean-Marie Tjibaou* et *Jacques Lafleur* se serrent la main : les *accords de Matignon* ramènent la paix.',
 '📋 De *2018 à 2021*, trois *référendums* : le « non » à l’indépendance l’emporte, mais les indépendantistes ne participent pas au troisième.']
];

window.QCM.republique=[
[['Depuis la Révolution de 1789.','Depuis la loi Veil de 1975.'],
 ['Le revenu minimum d’insertion et le quinquennat.','Les congés payés et la semaine de 40 heures.'],
 ['Il perd l’élection présidentielle.','Il est renversé par l’armée.'],
 ['Ils sont regroupés dans des réserves.','La Nouvelle-Calédonie devient indépendante.']],
[['Le président a trop de pouvoirs.','Il n’y a plus d’élections.'],
 ['Il gagne l’élection présidentielle au suffrage universel.','Il prend le pouvoir après Mai 68.'],
 ['Il vote les lois à la place des députés et juge les crimes.','Il n’a aucun pouvoir : il inaugure seulement les monuments.'],
 ['Les femmes obtiennent le droit de vote.','L’Algérie devient un département français.']],
[['C’est la première élection au suffrage universel.','C’est la fin de la Ve République.'],
 ['Deux présidents élus en même temps : de Gaulle et Pompidou.','Un gouvernement sans Premier ministre, sous Giscard d’Estaing.'],
 ['L’État décide de tout depuis Paris.','Les maires sont nommés par le président.'],
 ['Une élection organisée tous les quinze ans.','La cohabitation de 1997 à 2002.']],
[['Trente années de guerre, de 1914 à 1945.','Les trente années de crise après 1973.'],
 ['La hausse du chômage et la fermeture des mines.','Le retour à la terre et le déclin des villes.'],
 ['Pour repeupler les campagnes.','Pour remplacer les soldats partis au front.'],
 ['Plein emploi et croissance record.','Baisse du prix du pétrole et ouverture de mines.']],
[['Elles obtiennent le droit de vote.','Elles gagnent le même salaire que les hommes.'],
 ['Le droit de vote des femmes et la Sécurité sociale.','L’abolition de la peine de mort et la loi Roudy.'],
 ['Oui : les salaires sont les mêmes depuis 1946.','Oui : la moitié des députés sont des femmes.'],
 ['Les Kanak n’ont plus le droit de quitter leur réserve.','Nouméa se vide de ses habitants.']],
[['Le début de l’indigénat.','L’indépendance de la Nouvelle-Calédonie.'],
 ['Les fêtes du festival Mélanésia 2000.','Les essais nucléaires français dans le Pacifique.'],
 ['Un État indépendant.','Un condominium franco-britannique.'],
 ['Un seul, en 1988.','Deux : en 1958 et en 1998.']]
];

window.GAL.republique=[
 ['degaulle1943','urne','marianne'],
 ['marianne'],
 ['assemblee','urne'],
 [],
 ['sheppard','urne'],
 ['cps','noumea','urne']
];
