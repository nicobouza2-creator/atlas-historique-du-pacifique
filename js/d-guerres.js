/* Atlas du collège — données « élèves » du volet « Les guerres mondiales (1914-1945) ».
   Même format que d-colonies.js. À charger après facile.js et galerie.js, avant v-guerres.js.
   FACILE.guerres[chapitre][étape], QCM.guerres[chapitre][question] (deux mauvaises réponses), GAL.guerres[chapitre]. */
window.FACILE=window.FACILE||{};window.QCM=window.QCM||{};window.GAL=window.GAL||{};

window.FACILE.guerres=[
['💥 Le *28 juin 1914*, à *Sarajevo*, l’héritier de l’Autriche-Hongrie est assassiné. Par le jeu des *alliances*, l’Europe entre en guerre en août.',
 '🏃 L’armée allemande fonce vers Paris. Elle est arrêtée sur la *Marne*. Fin 1914, les soldats s’enterrent dans des *tranchées*.',
 '🌍 D’autres pays entrent en guerre : l’*Empire ottoman*, l’*Italie*, la Roumanie. On se bat aussi aux *Dardanelles*.',
 '🔄 *1917* change tout : la *Russie* fait sa révolution et quitte la guerre ; les *États-Unis* y entrent.',
 '🗺️ La guerre est *mondiale* : les empires font venir des soldats de leurs *colonies*, et l’on se bat sur plusieurs continents.',
 '🕊️ Le *11 novembre 1918*, l’*armistice* est signé. Environ *10 millions* de soldats sont morts.'],
['🪖 Les soldats, les « *poilus* », vivent dans la boue des *tranchées*, sous les obus. Les *gaz* et les mitrailleuses tuent en masse, comme à *Verdun* en 1916.',
 '🏭 C’est une *guerre totale* : les usines fabriquent des armes, les *femmes* remplacent les hommes partis au front, l’État contrôle tout.',
 '😢 Les *civils* souffrent aussi : occupation, faim, bombardements. En 1915-1916, les *Arméniens* de l’Empire ottoman sont victimes d’un *génocide*.',
 '🌍 Les *colonies* envoient des soldats et des travailleurs : tirailleurs d’Afrique, soldats de l’Inde, travailleurs d’Indochine.',
 '🏝️ Plus de *2 000 Calédoniens* d’origine européenne et plus de *1 000 tirailleurs kanak* partent en Europe. Le *bataillon mixte du Pacifique* combat en France.',
 '🔥 En *1917*, dans le nord de la Grande Terre, des Kanak se *révoltent* contre le recrutement et la colonisation. La révolte est durement réprimée.'],
['📜 En *1919*, le traité de *Versailles* déclare l’Allemagne responsable de la guerre : elle perd des territoires et doit payer. Beaucoup d’Allemands se sentent *humiliés*.',
 '🚩 En Russie, les bolcheviks ont pris le pouvoir : c’est l’*URSS*. *Staline* impose un *parti unique* et la *terreur*.',
 '⚫ En *Italie*, *Mussolini* prend le pouvoir en 1922. Le *fascisme* supprime les libertés et glorifie le chef.',
 '📉 En *1929*, la Bourse de New York s’effondre. La *crise* gagne le monde : *chômage*, misère.',
 '⚠️ En *1933*, *Hitler* devient chancelier en Allemagne. Il installe une *dictature raciste et antisémite* : parti unique, police politique, camps.',
 '🗳️ Les *démocraties* sont sous pression. En France, le *Front populaire* (1936) accorde les *congés payés*.',
 '⚔️ Hitler agrandit l’Allemagne : *Autriche*, *Sudètes*, Tchécoslovaquie. En août 1939, il signe un pacte avec Staline : la guerre approche.'],
['⚡ Le *1er septembre 1939*, l’Allemagne envahit la *Pologne*. En 1940, elle bat plusieurs pays d’Europe, dont la *France*.',
 '🌐 En *1941*, la guerre devient *mondiale* : Hitler attaque l’*URSS*, puis le Japon attaque les *États-Unis* à Pearl Harbor.',
 '💀 À l’Est, les nazis mènent une *guerre d’anéantissement* : villages brûlés, civils massacrés, prisonniers morts de faim.',
 '🕯️ La *Shoah* : les nazis assassinent environ *6 millions de Juifs* d’Europe, par fusillades puis dans des centres de mise à mort.',
 '🔁 Fin 1942, l’Axe recule : *El Alamein*, *Stalingrad*. Les Alliés débarquent en *Normandie* le *6 juin 1944*. L’Armée rouge avance vers Berlin.',
 '⚖️ Bilan : environ *60 millions de morts*, dont plus de la moitié de civils. À *Nuremberg*, des chefs nazis sont jugés pour *crimes contre l’humanité*.'],
['🗾 Le *Japon* s’est bâti un empire : Taïwan, Corée. Il occupe la *Mandchourie* (1931), puis envahit la *Chine* (1937).',
 '💥 Le *7 décembre 1941*, le Japon attaque la flotte américaine à *Pearl Harbor*. Les *États-Unis* entrent en guerre.',
 '🌏 En six mois, le Japon conquiert les Philippines, Singapour, les Indes néerlandaises. L’*Australie* est menacée.',
 '🛑 En *1942*, l’avance japonaise est arrêtée : *mer de Corail*, tout près de la Nouvelle-Calédonie, puis *Midway* et *Guadalcanal*.',
 '⚓ Le *12 mars 1942*, les *Américains* débarquent à *Nouméa*. La Nouvelle-Calédonie devient leur grande *base arrière* du Pacifique Sud.',
 '☢️ Les Américains avancent d’île en île. Les *6 et 9 août 1945*, deux *bombes atomiques* détruisent *Hiroshima* et *Nagasaki*. Le Japon capitule.'],
['🏳️ En *mai-juin 1940*, l’armée française est battue. Des millions de gens fuient sur les routes : c’est l’*exode*. *Pétain* signe l’*armistice* le 22 juin.',
 '📻 Le *18 juin 1940*, depuis *Londres*, le général *de Gaulle* appelle à continuer le combat. Il fonde la *France libre*.',
 '⚠️ À *Vichy*, Pétain supprime la République. Son régime est autoritaire et *antisémite* ; il *collabore* avec l’Allemagne nazie.',
 '🏝️ Le *19 septembre 1940*, la *Nouvelle-Calédonie* se rallie à la *France libre*, après le Tchad, le Cameroun et Tahiti.',
 '🎖️ Des volontaires calédoniens et tahitiens forment le *Bataillon du Pacifique*. Il combat à *Bir Hakeim* (1942), puis en Italie et en Provence.',
 '✊ En France, la *Résistance* s’organise : journaux clandestins, sabotages, maquis. *Jean Moulin* unifie ses mouvements.']
];

window.QCM.guerres=[
[['L’invasion de la Pologne par l’Allemagne.','L’attaque japonaise sur Pearl Harbor.'],
 ['Les soldats refusent de se battre en hiver.','Un armistice est signé pour Noël.'],
 ['L’Italie quitte la guerre ; le Japon y entre.','L’Allemagne capitule ; l’Autriche-Hongrie continue seule.'],
 ['Parce que tous les pays du monde y participent.','Parce qu’elle dure plus de quatre ans.']],
[['L’arbalète et le canon à poudre.','La bombe atomique et le radar.'],
 ['Parce que tous les soldats sont tués.','Parce qu’elle se déroule seulement sur mer.'],
 ['Les Belges.','Les Serbes.'],
 ['En Nouvelle-Calédonie, autour de Koné.','Aux Dardanelles, en 1915.']],
[['Parce qu’il donne de nouvelles colonies à l’Allemagne.','Parce qu’il oblige l’Allemagne à redevenir un empire.'],
 ['Des élections libres, plusieurs partis, une presse libre.','Un roi, un parlement élu, des syndicats libres.'],
 ['Les prix montent et chacun trouve du travail.','Les dictatures disparaissent en Europe.'],
 ['La prise de Paris (1936) et de Londres (1937).','L’invasion de l’URSS (1935) et de l’Italie (1936).']],
[['L’Allemagne, l’URSS et la France.','Le Royaume-Uni, les États-Unis et l’URSS.'],
 ['L’Allemagne envahit la Pologne.','La France signe l’armistice.'],
 ['Le bombardement des villes allemandes par les Alliés.','Le nom de code du débarquement de Normandie.'],
 ['Sedan (1940) et Pearl Harbor (1941).','Verdun (1916) et la Marne (1914).']],
[['Les États-Unis lancent une bombe atomique sur Hiroshima.','Les Américains débarquent à Nouméa.'],
 ['Elle se déroule dans le port de Nouméa.','Elle détruit la flotte américaine basée en Nouvelle-Calédonie.'],
 ['Elle est occupée par l’armée japonaise.','Elle reste à l’écart de la guerre.'],
 ['Par un débarquement américain à Tokyo.','Par la bataille de Midway.']],
[['La France continue la guerre depuis Londres.','L’Allemagne quitte le territoire français.'],
 ['D’accepter l’armistice.','D’obéir au maréchal Pétain.'],
 ['L’appel du 18 juin et la création de la France libre.','Le ralliement du Tchad et de la Nouvelle-Calédonie.'],
 ['Le 18 juin 1940.','Le 12 mars 1942.']]
];

window.GAL.guerres=[
 ['lenine1920','masquegaz'],
 ['tranchee1918','armistice1918'],
 ['armistice1918','petrograd1917'],
 ['pearlharbor','lexington1942','degaulle1943'],
 ['us1942','patch1942','enterprise'],
 ['patch1942','noumea1942','troupesnc1942','us1942']
];
