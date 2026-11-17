/* Atlas historique du Pacifique — © 2026 Nicolas BOUZA, idée, conception et réalisation, avec l’assistance de Claude (Anthropic) — CC BY-NC-ND 4.0
   Sprites de carte : quel dessin sur quel trajet et sur quel lieu. Lu par ATLAS.add (js/engine.js), images dans js/sprites.js.
   r  : {n° de chapitre : {n° de trajet : 'clé', '*' : 'clé' pour tous les trajets sans bateau}}
   l  : {'nom du lieu' : 'clé'} pour tout le volet ;  lc : {n° de chapitre : {'nom du lieu' : 'clé' ou '' pour aucune image}}
   'a|b' : a s'il existe (sprite commandé, pas encore dessiné), sinon b. Une clé inconnue ne casse rien : le trajet garde sa flèche, le lieu son point.
   Règles : pas d'image sur les lieux de massacres, de camps et de deuils ; pas de monument construit après la date du chapitre. */
(function(){
var CASE='l-grande-case',BAT='l-bataille',MINE='l-mine',US='l-usine',URNE='l-urne',GL='l-banquise',GR='l-grotte',FO='l-fouille-lapita',CAMP='l-campement',VILLE='l-ville',PORT='l-port-conteneurs',CPT='l-comptoir',PLANT='l-plantation',MAI='l-mairie',WH='l-wharf',MONT='l-montagne',ATOLL='l-atoll',CANAL='l-canal',BOMBE='l-champignon',TR='l-tranchee',AV='s-avion',SAP='s-sapiens';
var AIRES={'Hoot Ma Whaap':CASE,'Paicî-Cèmuhi':CASE,'Ajië Aro':CASE,'Xârâcùù':CASE,'Drubea-Kapumë':CASE,'Iaai (Ouvéa)':CASE,'Drehu (Lifou)':CASE,'Nengone (Maré)':CASE,'Iaai':CASE,'Drehu':CASE,'Nengone':CASE};
window.SPRMAP={
monde:{
 r:{0:{'*':'s-erectus'},1:{'*':SAP},2:{0:SAP,1:SAP,3:SAP,4:SAP,5:SAP},3:{'*':SAP},4:{'*':SAP},5:{0:'s-beringie',1:SAP,2:'s-beringie',3:SAP,4:SAP,5:SAP},6:{0:'s-paysans',1:'s-paysans',2:'s-paysans',3:'s-paysans'}},
 l:{'Toumaï (Tchad)':FO,'Lucy (Éthiopie)':FO,'Dmanisi (Géorgie)':FO,'Zhoukoudian (Chine)':GR,'Atapuerca (Espagne)':GR,'Denisova (Sibérie)':GR,'Denisova':GR,'Grotte de Denisova':GR,'Néandertaliens':'s-neandertal','Homo sapiens':SAP,
  'Jebel Irhoud (Maroc)':FO,'Florisbad (Afrique du Sud)':FO,'Omo (Éthiopie)':FO,'Blombos':GR,'Misliya et Qafzeh':GR,'Shanidar (Irak)':GR,'Bacho Kiro (Bulgarie)':GR,'Jura souabe':GR,'Chauvet':GR,'Lascaux':GR,'Altamira':GR,
  'Calotte de glace':GL,'Calottes de glace':GL,'Yana (Sibérie)':CAMP,'Clovis':CAMP,'Monte Verde (Chili)':CAMP,'Croissant fertile':'l-village-neolithique','Göbekli Tepe':'l-village-neolithique','Jéricho':'l-village-neolithique',
  'Rapa Nui':'m-moai','Antarctique':GL,'Sahara':'l-desert','Désert australien':'l-desert','Amazonie':'l-foret','Grand Nord':GL,'Himalaya':MONT}},
pacifique:{
 r:{1:{'*':SAP},4:{'*':'polynesien'}},
 l:{'Jebel Irhoud (Maroc)':FO,'Omo (Éthiopie)':FO,'Foué (Koné)':FO,'Rapa Nui':'m-moai','Lössi, sud de Lifou':CASE,'Grande Terre':CASE}},
decouvertes:{
 r:{0:{2:'galere',3:'s-caravane'}},
 l:{'Chine':'m-muraille','Constantinople':'m-sainte-sophie','Venise':'m-venise','Nankin':'m-pagode-nankin','Elmina':CPT,'Calicut':CPT,'Cochin':CPT,'Macao':CPT,'Batavia (Jakarta)':CPT,'La Navidad':'l-fort','Tempête':'s-cyclone|l-cyclone',
  'Stadaconé (Québec)':'l-village-iroquoien','Hochelaga (Montréal)':'l-village-iroquoien','Marquises':'m-tiki','Île de Pâques':'m-moai','Grande Barrière':'l-recif','Cercle polaire':GL,'71° sud':GL,'Détroit de Béring':GL,'Kamtchatka':'l-volcan','Vanikoro':'l-epave|l-recif'},
 lc:{12:{'Hawaï':'l-volcan'}}},
caledonie:{
 r:{8:{0:'paquebot',1:'paquebot'}},
 l:{'Mission de Balade':'l-mission','Port-de-France':'l-fort','Île de Ré':'l-fort','Île Nou':'l-bagne','Presqu’île Ducos':'l-bagne','Prony':'l-foret','Fort Teremba':'l-fort','Diahot':MINE,
  'Païta':'l-station','Moindou':'l-station','Poindimié':'l-cafeiere','Boulouparis':BAT,'Poya':BAT,'Thio':MINE,'Kouaoua':MINE,'Népoui':MINE,'Koniambo':MINE,'Tiébaghi':MINE,'Doniambo':US,
  'Bir Hakeim':BAT,'Guadalcanal':BAT,'États-Unis':'s-gi','Tontouta':'s-bombardier','Plaine des Gaïacs':'s-bombardier','Oua Tom':'l-aerodrome|l-base-us','Grand Nouméa':VILLE},
 lc:{0:AIRES,1:{'Maré':'l-mission','Lifou':'l-mission'},3:{'Île des Pins':'l-bagne','Bourail':'l-station'},4:{'Voh':'l-cafeiere','Îles Loyauté':CASE,'Bourail':'l-station'},5:{'La Foa':BAT,'Koné':BAT},7:{'Nouméa':'l-base-us'}}},
geonc:{
 r:{1:{1:'s-cyclone'},4:{0:'s-pickup',1:'s-pickup',2:'ferry',3:'ferry',4:AV,5:AV,6:AV,7:AV,8:AV,9:AV,10:AV,11:AV,12:AV,13:'cablier',14:'cablier'},5:{0:'conteneurs',1:'conteneurs'}},
 l:{'Mont Panié':MONT,'Mont Humboldt':MONT,'Récif barrière':'l-recif','Côte Est':'l-foret','Côte Ouest':'l-station','Massif du Koniambo':MINE,'Trajectoire d’un cyclone (exemple)':'s-cyclone|l-cyclone','Côte Est : la plus arrosée':'l-foret',
  'stations d’élevage':'l-station','Hienghène':'l-tribu','Fayaoué (Ouvéa)':'l-tribu','Tadine (Maré)':'l-tribu','Port de Nouméa':PORT,'La Tontouta':'l-aeroport','Sydney':'m-opera-sydney',
  'mines de nickel':MINE,'élevage, cultures':'l-station','fermes de crevettes':'l-ferme-crevettes','pêche au thon au large':'thonier','conteneurs importés':PORT,'Lagons classés (2008)':'l-recif','Chesterfield':'l-recif','Entrecasteaux':'l-recif','Matthew':'l-volcan','Hunter':'l-volcan'},
 lc:{2:{'Nouméa':VILLE},3:{'Nouméa':VILLE,'Bourail':MAI},4:{'Lifou':'l-aeroport'},5:{'Ouvéa':'l-cocoteraie'}}},
nickel:{
 r:{1:{0:'s-train'},3:{0:'s-camion-minier',2:'s-camion-minier'}},
 l:{'Koniambo':MINE,'Thio':MINE,'Mine du Koniambo':MINE,'Mine de Kouaoua':MINE,'Fern Hill':MINE,'Pilou (Diahot)':MINE,'Doniambo':US,'Usine du Sud':US,'Usine du Nord (Vavouto)':US,'Usine du Nord':US,'Gwangyang (Corée du Sud)':US,'Morowali':US,
  'Thio-Mission':WH,'Népoui':WH,'bord de mer':WH,'Port de Prony':WH,'Pam':WH,'Barrage de Yaté':'l-barrage','Parc de la Rivière Bleue':'l-foret','Lagons inscrits au patrimoine mondial (2008)':'l-recif'}},
mondial:{
 r:{6:{'*':'cablier'},7:{0:AV,1:AV,2:AV,3:AV,4:AV,5:AV,6:'s-refugies',7:AV,8:'s-refugies',9:'s-refugies',10:AV,11:AV},8:{3:AV,4:AV,5:AV,6:AV,7:AV,8:AV}},
 l:{'Everest (8 849 m)':MONT,'Aconcagua (6 961 m)':MONT,'Mont Blanc':MONT,'Kilimandjaro (5 895 m)':MONT,'Mont Panié (1 629 m)':MONT,'forêt du Congo':'l-foret','Amazonie':'l-foret','Sahara':'l-desert','désert australien':'l-desert','Gobi':'l-desert','Atacama':'l-desert',
  'zone froide':GL,'intérieur de l’Australie':'l-desert','Grand Nord canadien':GL,'Groenland':GL,'Tokyo':'m-tour-tokyo','Paris':'m-tour-eiffel','Le Caire':'m-pyramides','Sydney':'m-opera-sydney',
  'Jakarta':VILLE,'Dacca':VILLE,'Canton':VILLE,'Manille':VILLE,'Calcutta':VILLE,'Séoul':VILLE,'São Paulo':VILLE,'Lagos':VILLE,'Mexico':VILLE,'New Delhi':VILLE,
  'Ningbo':PORT,'Rotterdam':PORT,'Los Angeles':PORT,'canal de Suez (1869)':CANAL,'canal de Panama (1914)':CANAL,'Dubaï':'m-burj-khalifa','Atlanta':'l-aeroport',
  'cobalt (RD Congo)':MINE,'lithium (Chili)':MINE,'lithium (Australie)':MINE,'terres rares (Chine)':MINE,'puces (Taïwan)':US,'écrans (Corée du Sud)':US,'Assemblage (Chine, Inde, Vietnam)':US,
  'fonte des glaces':GL,'Tuvalu':ATOLL,'Kiribati':ATOLL,'îles Marshall':ATOLL,'Grande Barrière de corail':'l-recif'},
 lc:{2:{'Indonésie':'l-foret'},4:{'Shanghai':VILLE,'New York':'m-liberte','Londres':'m-big-ben'},5:{'Shanghai':PORT,'Singapour':PORT,'New York':PORT},7:{'Londres':'l-aeroport','Singapour':'l-aeroport'}}},
emc:{
 r:{0:{10:AV},4:{0:'marchand18',1:'marchand18',2:'marchand18',3:'marchand18',4:'marchand18',5:'marchand18',6:'goelette',7:'goelette',8:'goelette',9:'goelette'},7:{'*':AV}},
 l:{'Berlin':'m-brandebourg','Rome':'m-colisee','Assemblée nationale':'m-assemblee','Élysée':'m-elysee','Sénat':'m-senat','Île-de-France':'m-tour-eiffel','Normandie':'m-mont-saint-michel','Versailles':'m-versailles',
  'New York (ONU)':'l-onu','Gorée':CPT,'Ouidah':'l-fort','Luanda':'l-fort','Antilles':PLANT,'Brésil':PLANT,'Sud des États-Unis':PLANT,'Queensland':PLANT},
 lc:{0:{'Paris':'m-tour-eiffel','Strasbourg':'l-parlement-europeen'},1:{'Pouembout':MAI,'Koné':MAI,'Wé':MAI},2:AIRES,
  3:{'France':URNE,'Nouvelle-Zélande':URNE,'Australie':URNE,'Finlande':URNE,'Royaume-Uni':URNE,'États-Unis':URNE,'Japon':URNE,'Inde':URNE,'Suisse':URNE,'Arabie saoudite':URNE,'Nouvelle-Calédonie':URNE},
  4:{'Lisbonne':'m-belem','Washington':'m-maison-blanche','Antilles':PLANT},5:{'Paris':'m-tour-eiffel'},6:{'Paris':'m-tour-eiffel'},7:{'New York':'l-onu','Tonga':'l-volcan','Vanuatu':'s-cyclone|l-cyclone','Fidji':'s-cyclone|l-cyclone'}}},
colonies:{
 r:{0:{0:'troismats'},2:{1:'s-train'}},
 l:{'Usines':US,'Canal de Suez':CANAL,'or, diamants':MINE,'nickel':MINE,'coton':PLANT,'huile de palme':PLANT,'Gibraltar':'l-fort','Aden':CPT,'Singapour':CPT,'Djibouti':CPT,'Hong Kong':CPT,'Suez':CANAL,
  'Fachoda':'l-fort','Adoua':BAT,'Isandlwana':BAT,'Bourail':'l-bagne','Thio':MINE,'Marquises':'m-tiki','Réserves':'l-tribu','Zoulous':BAT,'Boxeurs':BAT},
 lc:{0:{'Nouméa':'l-fort'},2:{'Berlin':'m-brandebourg'},4:{'Nouméa':'l-fort'},5:{'La Foa':BAT,'Pouembout':'l-bagne','Indochine':PLANT,'Inde':PLANT,'Afrique du Sud':MINE}}},
guerres:{
 r:{3:{0:'barge|liberty',1:'s-char-sovietique'},4:{0:'porteavions',1:'porteavions'},5:{1:'barge|liberty',2:'barge|liberty'}},
 l:{'Front ouest':TR,'Verdun':TR,'Somme':TR,'Ypres':TR,'Chemin des Dames':TR,'La Marne':BAT,'Tannenberg':BAT,'Dardanelles':'cuirasse','Empire allemand':'s-allemand14','Rethondes':'l-rethondes',
  'Tiamou':BAT,'Dakar':'s-tirailleur','Versailles':'m-versailles','Moscou':'m-kremlin','Rome':'m-colisee','New York':'m-liberte','Berlin':'m-brandebourg','Londres':'m-big-ben',
  'Stalingrad':BAT,'El Alamein':BAT,'Normandie':'l-debarquement|l-bataille','Provence':'l-debarquement|l-bataille','Pearl Harbor':'l-pearl-harbor|s-chasseur-jp','Mer de Corail':'porteavions','Midway':'porteavions',
  'Guadalcanal':BAT,'Tarawa':BAT,'Saipan':BAT,'Iwo Jima':BAT,'Okinawa':BAT,'Hiroshima':BOMBE,'Nagasaki':BOMBE,'Tontouta':'s-bombardier','Plaine des Gaïacs':'s-bombardier','Bir Hakeim':BAT,'Sedan':'s-char1940','Paris libéré':'m-arc-triomphe'},
 lc:{0:{'France':'s-poilu'},1:{'Paris':'l-usine-armement','Koné':BAT},2:{'Paris':'m-tour-eiffel'},3:{'Paris':'m-tour-eiffel'},4:{'Nouméa':'l-base-us','Japon':'s-japonais'},5:{'Nouméa':'s-bataillon-pacifique'}}},
monde45:{
 r:{0:{1:'s-dakota',2:'s-dakota',3:'s-char-sovietique',4:'s-gi',5:'s-soldat-chinois',6:'cargo|vapeur'},1:{0:'porteavions'},2:{0:'paquebot|vapeur'},5:{0:'s-char-moderne',1:'s-char-moderne'}},
 l:{'Washington':'m-maison-blanche','Moscou':'m-kremlin','Mur de Berlin':'l-mur-berlin','Baïkonour':'l-fusee','Blocus américain':'cuirasse','Budapest':'s-char-sovietique','Prague':'s-char-sovietique',
  'Bikini':BOMBE,'Kiritimati':BOMBE,'Maralinga':BOMBE,'Moruroa':BOMBE,'Diên Biên Phu':BAT,'Suez':CANAL,'Guam':'l-base-us','Nauru':MINE,'Rome':'m-colisee','Strasbourg':'l-parlement-europeen','Londres':'m-big-ben','Pékin':'m-cite-interdite','Kiribati':ATOLL,'Tuvalu':ATOLL},
 lc:{0:{'Berlin':'m-brandebourg'},4:{'Paris':'m-tour-eiffel','Berlin':'m-brandebourg'}}},
republique:{
 r:{2:{0:'s-tgv'},3:{'*':'s-immigres'}},
 l:{'Premier vote des femmes':URNE,'Boulogne-Billancourt':US,'Bassin minier':MINE,'Référendum du 28 septembre 1958':URNE,'Paris, palais de l’Élysée':'m-elysee','Reggane':BOMBE,'Fessenheim':'l-centrale-nucleaire','Majorité à 18 ans':URNE,
  'Paris, Bastille':'m-bastille','Élysée':'m-elysee','Marseille':MAI,'Lille':MAI,'Rennes':MAI,'Toulouse':MAI,'Strasbourg':MAI,'Sochaux':US,'Longwy':US,'Lacq':US,'Sarcelles':'l-grand-ensemble|l-ville','Cergy-Pontoise':'l-grand-ensemble|l-ville',
  'Sainte-Geneviève-des-Bois':'l-hypermarche','Côte d’Azur':'l-plage','Thio':MINE,'Mélanésia 2000':CASE},
 lc:{0:{'Paris':'m-assemblee'},1:{'Nantes':US}}}
};
})();
