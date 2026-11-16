/* Atlas du collège — données « élèves » du volet « Conquêtes et sociétés coloniales ».
   Même format que facile.js et galerie.js (atlas du Pacifique), dans un fichier à part pour ne pas toucher à ces deux-là.
   À charger après facile.js et galerie.js, avant v-colonies.js : le moteur lit ces tables au moment de ATLAS.add().
   FACILE.colonies[chapitre][étape] : récit en phrases courtes (mots-clés entre *étoiles*).
   QCM.colonies[chapitre][question] : deux mauvaises réponses pour chaque question du chapitre (champ q).
   GAL.colonies[chapitre] : images supplémentaires (clés de img.js) rangées dans les documents du chapitre. */
window.FACILE=window.FACILE||{};window.QCM=window.QCM||{};window.GAL=window.GAL||{};

window.FACILE.colonies=[
['🏰 Vers *1815*, l’Espagne et le Portugal ont perdu presque toute l’*Amérique*. Le *Royaume-Uni* domine les mers. La France n’a plus que quelques « vieilles colonies ».',
 '🏭 En Europe, les *usines* se multiplient. Il leur faut des *matières premières* (coton, caoutchouc, métaux) et des *clients*.',
 '🚢 Les navires à *vapeur* n’ont plus besoin du vent. En *1869*, le *canal de Suez* raccourcit beaucoup la route vers l’Inde.',
 '⚓ Un vapeur brûle du *charbon*. Chaque pays veut donc des *ports* partout : Aden, Singapour, Dakar, Saïgon, *Nouméa*.',
 '👑 Avoir des colonies, c’est montrer sa *puissance*. La France, battue en 1870, veut retrouver son rang. L’Allemagne et l’Italie en veulent aussi.',
 '⚠️ Beaucoup d’Européens se croient *supérieurs* et disent vouloir « civiliser » les autres peuples. C’est *faux* et *raciste* : cela sert à justifier la conquête.'],
['⚔️ En *1830*, l’armée française prend *Alger*. L’émir *Abd el-Kader* résiste jusqu’en 1847. Des *colons* s’installent en Algérie.',
 '⛵ La marine installe la France à *Tahiti* (1842), en *Nouvelle-Calédonie* (1853), au *Sénégal* et à *Saïgon*.',
 '🏛️ Après 1880, la *République* reprend les conquêtes avec *Jules Ferry* : *Tunisie* (1881), *Tonkin* (1883-1885). L’*Indochine* française naît en 1887.',
 '🌍 En Afrique, l’armée avance vers l’intérieur. Les rois *Béhanzin* et *Samory Touré* résistent, puis sont vaincus. *Madagascar* est annexée en 1896.',
 '🕌 En *1912*, le *Maroc* devient un *protectorat* : le sultan reste, mais la France commande.',
 '🗺️ En *1914*, l’empire français est le *deuxième du monde* : *10 millions de km²* et 50 millions d’habitants. Très peu sont *citoyens*.'],
['🌍 Vers *1880*, les Européens ne tiennent que des *côtes*. Presque toute l’Afrique est *indépendante* : royaumes, empires, peuples libres.',
 '🖋️ En *1884-1885*, quatorze États se réunissent à *Berlin*. *Aucun Africain* n’est invité. Ils fixent les règles pour prendre des terres.',
 '🏃 Ensuite, c’est la *course*. En vingt ans, les puissances se partagent le continent. Les *frontières* sont tracées en Europe, souvent *à la règle*.',
 '⚔️ En *1898*, Français et Britanniques se font face à *Fachoda*, sur le Nil. La guerre menace. La *France recule*.',
 '🛡️ Les Africains *résistent*. En 1896, à *Adoua*, l’Éthiopie de *Ménélik II* bat l’Italie. Mais les Herero et les Nama sont *massacrés* par l’armée allemande.',
 '🗺️ En *1914*, il ne reste que *deux pays indépendants* : l’*Éthiopie* et le *Liberia*.'],
['⚓ Le *Royaume-Uni* est le pays des usines. Sa marine, la *Royal Navy*, contrôle les mers.',
 '💎 L’*Inde* est sa colonie la plus riche. Après la révolte de *1857*, Londres la gouverne directement. En 1876, la reine *Victoria* devient *impératrice des Indes*.',
 '🏡 Là où vivent beaucoup de Britanniques, Londres accorde l’*autonomie* : ce sont les *dominions* (Canada, Australie, Nouvelle-Zélande). Aborigènes et Maoris *perdent leurs terres*.',
 '🚢 Une chaîne de *ports* relie Londres à l’Asie : Gibraltar, Malte, *Suez*, Aden, Singapour, Hong Kong. En 1882, les Britanniques occupent l’*Égypte*.',
 '🌐 D’autres pays ont des colonies : la *France*, l’Allemagne, la Belgique… et deux pays hors d’Europe : les *États-Unis* et le *Japon*.',
 '🗺️ En *1914*, l’Empire britannique rassemble près d’*un humain sur quatre*. Les disputes pour les colonies font monter les *tensions* avant la guerre.'],
['🌊 Vers *1840*, presque toutes les îles du Pacifique sont *libres*. Baleiniers, marchands de santal et *missionnaires* y passent déjà.',
 '🖋️ En 1840, le traité de *Waitangi* donne la *Nouvelle-Zélande* aux Britanniques. La France prend *Tahiti* (1842) puis la *Nouvelle-Calédonie*, le *24 septembre 1853*.',
 '🏝️ Les *Fidji* deviennent britanniques en 1874. L’*Allemagne* arrive en *Nouvelle-Guinée* en 1884. *Wallis-et-Futuna* passe sous protection française.',
 '🦅 En *1898*, les *États-Unis* prennent les *Philippines*, Guam et *Hawaï*. En 1899, les *Samoa* sont coupées en deux.',
 '🤝 En *1906*, Français et Britanniques gouvernent *ensemble* les *Nouvelles-Hébrides* (le Vanuatu) : c’est un *condominium*. Plus une île n’est libre.',
 '⚓ La *Nouvelle-Calédonie* sert de *base* à la France. Elle y envoie des *forçats*, installe des *colons* et exploite le *nickel*. Les *Kanak* sont repoussés dans des *réserves*.'],
['⚖️ Dans une colonie, il y a deux sortes d’habitants. Les *colons* sont *citoyens*. Les colonisés sont des *sujets* : avec l’*indigénat*, on peut les punir *sans procès*.',
 '⛏️ La colonie doit *rapporter* : plantations, mines, ports, trains. Au *Congo*, la récolte forcée du *caoutchouc* fait tant de victimes que l’Europe s’indigne.',
 '🏝️ En *Nouvelle-Calédonie*, il y a le *bagne* et les *colons libres*. Les Kanak sont regroupés dans des *réserves*. Des travailleurs viennent du *Japon*, du *Tonkin* et de *Java* pour le nickel.',
 '🏫 Les colonisateurs ouvrent des *écoles*, des *hôpitaux*, des *missions*. Mais très *peu* d’enfants colonisés vont à l’école.',
 '✊ Les colonisés *résistent* : par la *guerre* (Abd el-Kader, Samory, *Ataï* en 1878), en refusant l’*impôt* ou le travail forcé, ou par des *pétitions*.',
 '🎪 En Europe, affiches et *expositions* vantent l’empire. À Paris, en *1889*, on *exhibe* des femmes et des hommes des colonies comme des curiosités.']
];

window.QCM.colonies=[
[['Des soldats et des impôts.','Des épices et de la soie.'],
 ['Il relie l’océan Atlantique à l’océan Pacifique.','Il permet aux voiliers d’aller deux fois plus vite.'],
 ['Pour y construire des usines de coton.','Pour abriter les voiliers quand le vent tombe.'],
 ['Le besoin de trouver de nouvelles terres pour les rois d’Europe.','La volonté d’apprendre les langues des autres peuples.']],
[['Par le protectorat sur la Tunisie, en 1881.','Par la prise de possession de la Nouvelle-Calédonie, en 1853.'],
 ['Un protectorat est une colonie peuplée seulement de soldats.','Dans un protectorat, le pays reste complètement indépendant.'],
 ['Jules Ferry et Georges Clemenceau.','Faidherbe et Lyautey.'],
 ['Environ 1 million de km² et 5 millions d’habitants.','Environ 33 millions de km² et 400 millions d’habitants.']],
[['La moitié vers 1880, la totalité en 1914.','Neuf dixièmes vers 1880, un dixième en 1914.'],
 ['Les rois africains et les États européens.','Seulement la France et le Royaume-Uni.'],
 ['Le Maroc et l’Égypte.','Le Congo et le Dahomey.'],
 ['L’armée italienne conquiert l’Éthiopie.','Français et Britanniques manquent de se faire la guerre.']],
[['Le Canada, premier dominion en 1867.','L’Égypte, occupée en 1882.'],
 ['Une colonie gouvernée directement par l’armée.','Un port d’escale sur la route des Indes.'],
 ['Pour y cultiver du thé.','Pour empêcher l’Éthiopie de s’agrandir.'],
 ['La Chine et l’Inde.','La Belgique et le Portugal.']],
[['L’acte de Berlin, en 1885.','Le traité de Paris, en 1898.'],
 ['En 1774, au passage de James Cook.','En 1864, à l’arrivée des premiers forçats.'],
 ['L’Espagne et le Portugal.','La Russie et la Chine.'],
 ['Une réserve où les Kanak sont regroupés.','Un port d’escale pour les navires à vapeur.']],
[['Le colon paie l’impôt ; le colonisé n’en paie pas.','Aucune : tous les habitants ont les mêmes droits.'],
 ['À faire voyager les habitants entre les villages.','À transporter les élèves vers les écoles.'],
 ['Le protectorat et le condominium.','Le comptoir de commerce et le dominion.'],
 ['L’indigénat, le cantonnement, le travail forcé.','Les expositions, les affiches, les journaux.']]
];

window.GAL.colonies=[
 ['ceylanthe','kimberley','singapour1901'],
 ['constantine1899','annam1889','biard','hautcom','expo1900'],
 ['caoutchouc','kimberley','capcaire','behanzin'],
 ['ceylanthe','suezchantier','suez1869','liliuokalani','pontouganda','levuka'],
 ['baleiniers','johnwilliams','santalbois','falechantier','balade1843','chartenoumea'],
 ['expo1900','zoulou1879','surveillant','communards','colonne1881','farino','stlouis','lemire','senegalais1914','capcaire']
];
