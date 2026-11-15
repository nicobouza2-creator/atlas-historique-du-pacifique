/* « Tout en même temps » : une seule carte avec tous les événements des volets d'histoire (+ quelques repères du programme),
   un curseur du temps, une frise par grande région et des « moments clés ». Ouverture : carte du menu d'entrée, #simultane, SIMUL.open().
   Données : [début, fin, lon, lat, titre, texte, volet, chapitre, région, important]
   volet : m (Peupler la Terre), p (Vers le Pacifique), d (Grandes Découvertes), c (Histoire de la NC), r (repère hors atlas, chapitre -1)
   région : a Afrique, e Europe, s Asie, m Amériques, o Océanie et Pacifique, n Nouvelle-Calédonie */
(function(){
'use strict';
var EV=[
/* Peupler la Terre */
[-7000000,-7000000,17.0,16.0,'Toumaï','Peut-être un des plus anciens ancêtres de la lignée humaine, au Tchad.','m',0,'a',1],
[-3200000,-3200000,40.5,11.1,'Lucy','Une australopithèque qui marche déjà debout, en Éthiopie.','m',0,'a',1],
[-1800000,-1800000,44.3,41.3,'Dmanisi','Des Homo erectus sont déjà sortis d’Afrique (Géorgie).','m',0,'e'],
[-1200000,-800000,-3.5,42.4,'Atapuerca','Les plus vieux humains connus d’Europe de l’Ouest (Espagne).','m',0,'e'],
[-1300000,-110000,110.8,-7.4,'Homo erectus à Java','Des Homo erectus vivent à Java pendant plus d’un million d’années.','m',3,'s'],
[-700000,-700000,115.9,39.7,'Zhoukoudian','L’« homme de Pékin », un Homo erectus de Chine.','m',0,'s'],
[-400000,-40000,22.0,48.5,'Néandertaliens','Une autre humanité vit en Europe et en Asie de l’Ouest.','m',3,'e',1],
[-335000,-236000,27.7,-26.0,'Homo naledi','Une humanité au petit cerveau, en Afrique du Sud.','m',3,'a'],
[-200000,-50000,104.0,43.0,'Dénisoviens','Une humanité d’Asie, connue surtout grâce à son ADN.','m',3,'s'],
[-300000,-300000,-8.9,31.9,'Jebel Irhoud','Les plus anciens fossiles connus d’Homo sapiens (Maroc).','m',1,'a',1],
[-230000,-230000,35.9,5.4,'Omo','Des Homo sapiens en Éthiopie.','m',1,'a'],
[-190000,-50000,120.5,-8.6,'L’homme de Florès','Un humain d’environ 1 m de haut, sur l’île de Florès (Indonésie).','m',3,'s'],
[-180000,-100000,35.0,32.7,'Misliya et Qafzeh','Premières sorties d’Homo sapiens vers le Proche-Orient.','m',1,'s'],
[-75000,-75000,21.2,-34.4,'Blombos','De l’ocre gravée : un des plus anciens dessins connus (Afrique du Sud).','m',1,'a'],
[-70000,-50000,43.3,12.6,'La grande sortie d’Afrique','Des Homo sapiens quittent l’Afrique et partent vers l’Asie.','m',2,'a',1],
[-70000,-45000,44.2,36.8,'Shanidar','Des Néandertaliens enterrent leurs morts (Irak).','m',3,'s'],
[-65000,-65000,132.9,-12.5,'Madjedbebe','Des humains en Australie, il y a peut-être 65 000 ans.','m',2,'o',1],
[-45000,-45000,25.4,43.0,'Bacho Kiro','Parmi les premiers Homo sapiens d’Europe (Bulgarie).','m',4,'e'],
[-42000,-42000,143.1,-33.7,'Lac Mungo','Les plus anciennes sépultures connues d’Australie.','m',2,'o'],
[-38000,-38000,137.0,35.5,'Japon','Des humains arrivent au Japon.','m',2,'s'],
[-36000,-36000,4.4,44.4,'Grotte Chauvet','Lions, chevaux et rhinocéros peints sur les parois (France).','m',4,'e',1],
[-23000,-23000,-106.3,32.8,'White Sands','Des empreintes de pas humains en Amérique du Nord.','m',5,'m'],
[-20000,-20000,1.2,45.0,'Lascaux','Une grotte ornée célèbre (France).','m',4,'e'],
[-14500,-14500,-73.2,-41.5,'Monte Verde','Un campement très ancien au Chili.','m',5,'m'],
[-13000,-13000,-103.3,34.3,'Clovis','Des chasseurs aux pointes de pierre taillée (Amérique du Nord).','m',5,'m'],
[-9500,-9500,41.0,37.0,'Les premiers paysans','Blé, orge, moutons : l’agriculture naît au Proche-Orient.','m',6,'s',1],
[-7000,-7000,113.0,33.0,'Riz et millet en Chine','Les paysans de Chine cultivent le riz et le millet.','m',6,'s'],
[-7000,-7000,-98.0,19.0,'Maïs au Mexique','Le maïs et la courge sont cultivés en Mésoamérique.','m',6,'m'],
[-5800,-5800,3.0,46.5,'Premiers paysans en France','L’agriculture arrive en France.','m',6,'e'],
[-5000,-5000,142.0,-6.0,'Taro en Nouvelle-Guinée','Taro et banane : une agriculture née en Océanie.','m',6,'o'],
[-2500,-2500,-42.0,73.0,'Groenland','Des chasseurs atteignent le Grand Nord.','m',7,'m'],
[500,1000,43.5,-20.5,'Madagascar','Des marins venus d’Indonésie peuplent Madagascar.','m',7,'a'],
[874,874,-18.5,64.9,'Islande','Des Vikings s’installent en Islande.','m',7,'e'],
[1000,1000,-55.5,51.6,'Vikings en Amérique','À L’Anse aux Meadows (Canada), des Vikings s’installent vers l’an 1000.','m',7,'m',1],
[1250,1300,173.5,-41.0,'Aotearoa','Les Polynésiens atteignent la Nouvelle-Zélande : ce sont les ancêtres des Maori.','m',7,'o',1],
[2022,2022,79.0,22.0,'8 milliards d’humains','La Terre compte 8 milliards d’habitants ; plus de la moitié vivent en Asie.','m',8,'s'],
/* Vers le Pacifique */
[-2200,-2200,121.3,24.0,'Départ de Taïwan','Les Austronésiens, paysans et navigateurs, partent de Taïwan vers les Philippines.','p',2,'s',1],
[-1350,-1350,150.5,-5.2,'Naissance des Lapita','Une culture de potiers et de navigateurs apparaît dans l’archipel Bismarck.','p',3,'o',1],
[-1100,-1000,168.0,-16.0,'Lapita au Vanuatu','Les Lapita arrivent au Vanuatu (vers 1100–1000 av. J.-C.).','p',3,'o'],
[-1100,-1100,164.8,-21.0,'Arrivée en Nouvelle-Calédonie','Les premiers habitants arrivent ; on retrouve leurs poteries à Foué, près de Koné.','p',5,'n',1],
[-1000,-1000,178.0,-17.8,'Lapita aux Fidji','Les Lapita arrivent aux Fidji (vers 1000 av. J.-C.).','p',3,'o'],
[-900,-900,-175.2,-21.2,'Lapita aux Tonga','Les Lapita arrivent aux Tonga.','p',3,'o'],
[-800,-800,-171.7,-13.8,'Lapita aux Samoa','Les Lapita arrivent aux Samoa.','p',3,'o'],
[-500,1000,165.6,-21.4,'La société kanak','Les poteries et les modes de vie changent, peut-être avec de nouveaux arrivants ; vers l’an 1000, la société kanak traditionnelle prend forme.','p',6,'n'],
[1000,1100,-149.5,-17.5,'Tahiti','Les Polynésiens s’installent en Polynésie orientale.','p',4,'o'],
[1000,1250,-155.5,19.6,'Hawaï','Les Polynésiens atteignent Hawaï.','p',4,'o'],
[1150,1250,-109.4,-27.1,'Rapa Nui (île de Pâques)','Les Polynésiens atteignent l’une des îles habitées les plus isolées du monde.','p',4,'o'],
[1200,1200,-175.0,-21.1,'Ha’amonga ’a Maui','Un grand portique de pierre est construit aux Tonga.','p',8,'o'],
[1200,1700,167.2,-20.9,'Des îles reliées par la mer','Grande Terre, Loyauté, île des Pins et Vanuatu échangent jade, ignames et alliances.','p',7,'n'],
[1750,1750,166.5,-20.6,'Les Wallisiens à Ouvéa','Des pirogues de Wallis arrivent à Ouvéa ; on y parle encore leur langue, le fagauvea.','p',8,'n'],
[1841,1841,167.9,-21.5,'Enseignants samoans aux Loyauté','Des enseignants polynésiens protestants s’installent à Maré (1841), puis à Lifou (1842).','p',8,'n'],
/* Grandes Découvertes */
[1405,1433,118.8,32.1,'Zheng He','Les grandes flottes chinoises de Zheng He vont jusqu’en Afrique de l’Est.','d',1,'s',1],
[1420,1460,-8.9,37.0,'Henri le Navigateur','Le Portugal lance l’exploration des côtes de l’Afrique.','d',2,'e'],
[1453,1453,29.0,41.0,'Prise de Constantinople','Les Ottomans prennent Constantinople : les routes du commerce vers l’Asie changent.','d',0,'e',1],
[1488,1488,18.5,-34.4,'Cap de Bonne-Espérance','Bartolomeu Dias passe la pointe sud de l’Afrique.','d',2,'a',1],
[1492,1492,-74.5,24.1,'Colomb aux Bahamas','Le 12 octobre 1492, Christophe Colomb aborde une île des Bahamas.','d',3,'m',1],
[1494,1494,-5.0,41.5,'Traité de Tordesillas','L’Espagne et le Portugal se partagent les terres à découvrir.','d',5,'e'],
[1498,1498,75.8,11.3,'Vasco de Gama en Inde','Vasco de Gama atteint Calicut, en Inde, par la mer (20 mai 1498).','d',4,'s',1],
[1500,1500,-39.1,-16.4,'Cabral au Brésil','Pedro Álvares Cabral aborde le Brésil (22 avril 1500).','d',5,'m'],
[1507,1507,7.0,48.3,'Le nom « America »','À Saint-Dié, une carte nomme le Nouveau Monde « America », d’après Amerigo Vespucci.','d',6,'e'],
[1520,1520,-71.5,-52.2,'Détroit de Magellan','Magellan trouve un passage vers le Pacifique.','d',7,'m'],
[1522,1522,-6.3,36.8,'Premier tour du monde','La Victoria rentre en Espagne avec Elcano : le premier tour du monde est bouclé (1519-1522).','d',7,'e',1],
[1535,1535,-71.2,46.8,'Jacques Cartier au Canada','Cartier remonte le Saint-Laurent jusqu’à Hochelaga (Montréal).','d',8,'m'],
[1568,1568,159.4,-8.0,'Mendaña aux Salomon','L’Espagnol Mendaña arrive aux îles Salomon.','d',9,'o'],
[1606,1606,166.9,-15.2,'Quirós au Vanuatu','Quirós croit avoir trouvé le continent austral, à Espiritu Santo.','d',9,'o'],
[1642,1643,171.5,-43.3,'Abel Tasman','Le Hollandais Tasman longe la Tasmanie et la Nouvelle-Zélande.','d',10,'o'],
[1768,1768,-149.5,-17.6,'Bougainville à Tahiti','Le Français Bougainville séjourne à Tahiti (avril 1768).','d',11,'o'],
[1770,1770,151.2,-34.0,'Cook en Australie','James Cook longe la côte est de l’Australie (1770).','d',12,'o'],
[1779,1779,-155.9,19.5,'Mort de Cook','James Cook est tué à Hawaï (14 février 1779).','d',12,'o'],
[1785,1785,-4.5,48.4,'Départ de La Pérouse','L’expédition de La Pérouse quitte Brest (1er août 1785).','d',13,'e'],
[1788,1788,166.9,-11.7,'Naufrage de La Pérouse','Les navires de La Pérouse font naufrage à Vanikoro (îles Salomon).','d',13,'o',1],
/* Histoire de la Nouvelle-Calédonie */
[1500,1774,165.3,-21.0,'Le pays kanak','Clans et chefferies, 28 langues ; le pays compte plusieurs dizaines de milliers d’habitants.','c',0,'n'],
[1774,1774,164.5,-20.3,'Cook à Balade','Le 4 septembre 1774, James Cook aperçoit la Grande Terre ; le 5, il débarque à Balade. Il la nomme « Nouvelle-Calédonie ».','c',1,'n',1],
[1793,1793,164.5,-20.25,'D’Entrecasteaux à Balade','Parti à la recherche de La Pérouse, il séjourne à Balade.','c',1,'n'],
[1841,1841,167.5,-22.6,'Santaliers et baleiniers','Des marchands viennent chercher le santal à l’île des Pins et aux Loyauté.','c',1,'n'],
[1843,1843,164.45,-20.32,'Missionnaires à Balade','Mgr Douarre et les pères maristes s’installent à Balade.','c',1,'n'],
[1853,1853,164.5,-20.3,'Prise de possession','Le 24 septembre 1853, la France prend possession de la Nouvelle-Calédonie, à Balade.','c',2,'n',1],
[1854,1854,166.45,-22.27,'Fondation de Port-de-France','La ville qui deviendra Nouméa est fondée.','c',2,'n'],
[1855,1903,165.5,-21.55,'Colons libres et réserves','Des colons s’installent ; les Kanak sont regroupés dans des réserves.','c',4,'n'],
[1864,1864,166.42,-22.28,'Les premiers bagnards','Le 9 mai 1864, L’Iphigénie débarque à Nouméa les premiers forçats.','c',3,'n',1],
[1864,1864,165.9,-21.6,'Découverte du nickel','Jules Garnier découvre un minerai de nickel, la garniérite.','c',6,'n',1],
[1872,1880,166.38,-22.22,'Les déportés de la Commune','Plus de 4 000 communards, dont Louise Michel, sont déportés en Nouvelle-Calédonie.','c',3,'n'],
[1878,1879,165.83,-21.71,'Insurrection d’Ataï','Le 25 juin 1878, autour de La Foa, une grande révolte kanak éclate ; Ataï est tué le 1er septembre.','c',5,'n',1],
[1880,1880,166.16,-21.66,'La Société Le Nickel','La SLN exploite les mines de Thio, « capitale du nickel ».','c',6,'n'],
[1887,1946,165.2,-20.9,'Le régime de l’indigénat','Un règlement spécial prive les Kanak de nombreux droits, jusqu’en 1946.','c',5,'n'],
[1892,1896,166.25,-21.6,'Travailleurs venus d’Asie','Des Japonais (1892), puis des Javanais (1896), viennent travailler dans les mines et les champs.','c',6,'n'],
[1897,1897,166.43,-22.3,'Fin des convois de bagnards','Les convois s’arrêtent ; le bagne fermera en 1931.','c',3,'n'],
[1917,1917,164.9,-21.0,'La révolte de 1917','Une révolte kanak éclate dans le nord de la Grande Terre.','c',5,'n'],
[1918,1918,3.8,49.65,'Tirailleurs kanak au front','Des tirailleurs kanak et des Calédoniens combattent en France, comme à Vesles (octobre 1918).','c',7,'e',1],
[1942,1945,166.45,-22.27,'Les Américains à Nouméa','À partir de mars 1942, Nouméa devient une grande base américaine.','c',7,'n',1],
[1946,1946,166.45,-22.25,'Fin de l’indigénat','Les Kanak deviennent citoyens ; la Nouvelle-Calédonie devient un territoire d’outre-mer.','c',8,'n',1],
[1957,1957,166.44,-22.29,'Suffrage universel','Tous les adultes, kanak compris, peuvent désormais voter.','c',8,'n'],
[1988,1988,2.32,48.85,'Accords de Matignon','À Paris, après des années de violences en Nouvelle-Calédonie, un accord de paix est signé (26 juin 1988).','c',8,'n',1],
[1989,1989,166.5,-20.6,'Mort de Jean-Marie Tjibaou','Le dirigeant kanak Jean-Marie Tjibaou est assassiné à Ouvéa (4 mai 1989).','c',8,'n'],
[1998,1998,166.45,-22.27,'Accord de Nouméa','Il prévoit des transferts de compétences et des consultations (5 mai 1998).','c',8,'n',1],
[2018,2021,165.9,-21.3,'Trois consultations','En 2018, 2020 et 2021, les électeurs répondent à la question de l’indépendance ; le « non » l’emporte trois fois (la consultation de 2021 a été boycottée par les indépendantistes).','c',8,'n'],
/* Repères (hors atlas) */
[-3300,-3000,45.6,31.3,'Naissance de l’écriture','En Mésopotamie (Irak actuel), on invente l’écriture.','r',-1,'s',1],
[-2560,-2560,31.1,30.0,'Pyramide de Khéops','La plus grande pyramide d’Égypte est construite.','r',-1,'a',1],
[-2500,-2500,-1.8,51.2,'Stonehenge','Un grand cercle de pierres levées, en Angleterre.','r',-1,'e'],
[-2500,-1900,68.1,27.3,'Mohenjo-daro','Une grande ville de la civilisation de l’Indus (Pakistan actuel).','r',-1,'s'],
[-1279,-1213,32.7,25.7,'Ramsès II','Un des plus célèbres pharaons d’Égypte.','r',-1,'a'],
[-1200,-400,-94.0,18.1,'Les Olmèques','Une des premières grandes civilisations d’Amérique (Mexique).','r',-1,'m'],
[-776,-776,21.6,37.6,'Premiers Jeux olympiques','Selon la tradition, les premiers Jeux ont lieu à Olympie (Grèce).','r',-1,'e'],
[-753,-753,12.5,41.9,'Fondation de Rome','Selon la légende, Romulus fonde Rome.','r',-1,'e'],
[-221,-210,108.9,34.3,'Le premier empereur de Chine','Qin Shi Huang unifie la Chine ; une armée de terre cuite garde son tombeau.','r',-1,'s',1],
[-52,-52,4.5,47.5,'Alésia','Vercingétorix se rend à Jules César : la Gaule devient romaine.','r',-1,'e',1],
[800,800,12.4,42.1,'Charlemagne empereur','Charlemagne est couronné empereur à Rome, à Noël de l’an 800.','r',-1,'e',1],
[1100,1450,30.9,-20.3,'Grand Zimbabwe','Une ville de pierre, capitale d’un royaume d’Afrique australe.','r',-1,'a'],
[1113,1150,103.9,13.4,'Angkor Vat','Un immense temple est construit au Cambodge.','r',-1,'s'],
[1324,1324,-3.0,16.8,'Mansa Moussa','L’empereur du Mali, célèbre pour sa richesse, traverse le Sahara vers La Mecque.','r',-1,'a'],
[1325,1521,-99.1,19.4,'Tenochtitlan','La capitale des Aztèques, bâtie sur un lac (Mexique).','r',-1,'m'],
[1347,1352,10.0,47.0,'La peste noire','Une épidémie tue une grande partie des Européens.','r',-1,'e'],
[1406,1420,116.4,39.9,'La Cité interdite','Le palais des empereurs de Chine est construit à Pékin.','r',-1,'s'],
[1450,1450,-72.5,-13.2,'Machu Picchu','Une cité inca construite dans les Andes (Pérou).','r',-1,'m'],
[1455,1455,8.3,50.0,'L’imprimerie','À Mayence, Gutenberg imprime des livres avec des caractères mobiles.','r',-1,'e',1],
[1521,1521,-98.9,19.7,'Chute de Tenochtitlan','Cortés et ses alliés prennent la capitale aztèque.','r',-1,'m'],
[1532,1532,-78.5,-7.2,'Conquête de l’Empire inca','Pizarro capture l’empereur Atahualpa à Cajamarca.','r',-1,'m'],
[1632,1653,78.0,27.2,'Taj Mahal','Un empereur moghol fait construire ce tombeau en Inde.','r',-1,'s'],
[1682,1682,2.1,48.8,'Versailles','Louis XIV installe la cour au château de Versailles.','r',-1,'e'],
[1776,1776,-75.2,40.0,'Indépendance des États-Unis','À Philadelphie, les colonies anglaises déclarent leur indépendance (4 juillet 1776).','r',-1,'m',1],
[1788,1788,151.2,-33.9,'Les Britanniques à Sydney','La « First Fleet » fonde Sydney ; les Aborigènes vivaient là depuis des dizaines de milliers d’années.','r',-1,'o',1],
[1789,1789,2.35,48.85,'Révolution française','Prise de la Bastille (14 juillet) et Déclaration des droits de l’homme et du citoyen (26 août).','r',-1,'e',1],
[1804,1815,2.2,48.7,'Napoléon Ier','Napoléon est empereur des Français.','r',-1,'e'],
[1848,1848,2.4,48.9,'Abolition de l’esclavage','La France abolit l’esclavage dans ses colonies (27 avril 1848).','r',-1,'e',1],
[1865,1865,-77.0,38.9,'Fin de l’esclavage aux États-Unis','Le 13e amendement de la Constitution abolit l’esclavage.','r',-1,'m'],
[1868,1868,139.7,35.7,'L’ère Meiji','Le Japon se modernise très vite.','r',-1,'s'],
[1869,1869,32.3,30.6,'Canal de Suez','Le canal relie la Méditerranée à la mer Rouge.','r',-1,'a'],
[1871,1871,2.3,48.9,'La Commune de Paris','Une insurrection à Paris ; des milliers de communards seront déportés en Nouvelle-Calédonie.','r',-1,'e',1],
[1881,1882,2.5,48.8,'Lois Jules Ferry','L’école publique devient gratuite et laïque ; l’instruction est obligatoire de 6 à 13 ans.','r',-1,'e'],
[1914,1918,5.4,49.2,'Première Guerre mondiale','Verdun (1916) est l’une des batailles les plus meurtrières.','r',-1,'e',1],
[1939,1945,13.4,52.5,'Seconde Guerre mondiale','La guerre la plus meurtrière de l’histoire (1939-1945).','r',-1,'e',1],
[1941,1941,-157.9,21.4,'Pearl Harbor','Le Japon attaque la flotte américaine à Hawaï (7 décembre 1941).','r',-1,'o'],
[1942,1943,160.0,-9.4,'Guadalcanal','Une grande bataille de la guerre du Pacifique (îles Salomon).','r',-1,'o'],
[1945,1945,-122.4,37.8,'Création de l’ONU','À San Francisco, 50 pays signent la Charte des Nations unies.','r',-1,'m'],
[1969,1969,-80.6,28.6,'Premiers pas sur la Lune','Apollo 11 décolle de Floride ; Neil Armstrong marche sur la Lune.','r',-1,'m'],
[1989,1989,13.4,52.6,'Chute du mur de Berlin','Le 9 novembre 1989, le mur qui coupait Berlin en deux tombe.','r',-1,'e']
];
/* moments clés : [année, demi-fenêtre en années (0 = automatique), titre, texte « pendant ce temps »] */
var MOM=[
[-50000,0,'Il y a 50 000 ans','Plusieurs humanités vivent en même temps : Homo sapiens en Afrique, en Asie et en Australie, les Néandertaliens en Europe, les Dénisoviens en Asie, l’homme de Florès en Indonésie.'],
[-2560,0,'Vers 2500 av. J.-C.','Pendant qu’on construit la grande pyramide en Égypte et Stonehenge en Angleterre, la ville de Mohenjo-daro prospère près de l’Indus et des chasseurs atteignent le Groenland. Les Austronésiens vivent à Taïwan ; vers 2200 av. J.-C., ils commenceront à en partir et leurs descendants peupleront le Pacifique.'],
[-1100,0,'Vers 1100 av. J.-C.','Les premiers habitants arrivent en Nouvelle-Calédonie. À la même époque, les Lapita s’installent aussi au Vanuatu et vont bientôt atteindre les Fidji ; en Égypte, c’est la fin du temps des grands pharaons ; au Mexique vivent les Olmèques.'],
[1000,0,'Vers l’an 1000','Les Vikings atteignent l’Amérique pendant que les Polynésiens s’installent à Tahiti et approchent de Hawaï. En Nouvelle-Calédonie, la société kanak est organisée en clans et en chefferies.'],
[1492,10,'1492','Christophe Colomb arrive aux Bahamas. Au même moment, les Aztèques vivent à Tenochtitlan, les Incas dans les Andes ; en Océanie, Kanak, Tongiens et Maori naviguent et cultivent leurs terres sans savoir que des Européens approchent.'],
[1781,9,'1774 – 1789','Cook débarque à Balade (1774). Deux ans plus tard, les États-Unis déclarent leur indépendance (1776). En 1788, La Pérouse disparaît à Vanikoro et les Britanniques s’installent à Sydney. En 1789 commence la Révolution française.'],
[1865,14,'1853 – 1879','La France prend possession de la Nouvelle-Calédonie (1853) et y envoie des bagnards (1864). Pendant ce temps, l’esclavage est aboli aux États-Unis (1865), le canal de Suez est ouvert (1869) et, après la Commune de Paris (1871), des déportés arrivent à Nouméa. En 1878 éclate l’insurrection d’Ataï.'],
[1916,3,'1914 – 1918','Pendant la Première Guerre mondiale, des tirailleurs kanak et des Calédoniens combattent en France. En 1917, une révolte kanak éclate dans le nord de la Grande Terre.'],
[1943,3,'1941 – 1945','La guerre gagne le Pacifique : Pearl Harbor (1941), Guadalcanal (1942-1943). Nouméa devient une grande base américaine. En 1945, l’ONU est créée.'],
[1989,9,'1980 – 1998','Accords de Matignon (1988) ; assassinat de Jean-Marie Tjibaou (1989), l’année où tombe le mur de Berlin ; accord de Nouméa (1998).']
];
var VN={m:['monde','Peupler la Terre','#fb923c'],p:['pacifique','Vers le Pacifique','#a78bfa'],d:['decouvertes','Grandes Découvertes','#38bdf8'],c:['caledonie','Histoire de la NC','#4ade80'],r:['','Repères du programme','#e2e8f0']};
var RG=[['n','Nouvelle-Calédonie'],['o','Océanie, Pacifique'],['s','Asie'],['a','Afrique'],['e','Europe'],['m','Amériques']];
var RGN={};RG.forEach(function(r){RGN[r[0]]=r[1];});
var RANGES=[[-7000000,'Toute l’histoire',[-7000000,-2000000,-300000,-70000,-20000,-5000,-1000,1000,1500,1800,1950]],
  [-3500,'Depuis l’écriture',[-3000,-2000,-1000,1,500,1000,1500,1700,1800,1900,2000]],
  [1400,'Depuis 1400',[1400,1500,1600,1700,1750,1800,1850,1900,1950,2000]]];
var REF=2060,TO=2026;
var D=EV.map(function(a,i){return {i:i,y0:a[0],y1:a[1],lon:a[2],lat:a[3],t:a[4],x:a[5],v:a[6],ci:a[7],rg:a[8],imp:!!a[9]};});
D.sort(function(a,b){return a.y0-b.y0||a.y1-b.y1;});
var S={T:1774,ri:0,all:false,trace:true,show:{m:1,p:1,d:1,c:1,r:1},sel:null,mom:null,play:false,rot:150,wfix:0};
function fr(n){return Math.round(n).toLocaleString('fr-FR');}
function lnF(){return Math.log(REF-RANGES[S.ri][0]);}
function X(y){var a=lnF(),b=Math.log(REF-TO);return Math.max(0,Math.min(1,(a-Math.log(REF-Math.min(y,TO)))/(a-b)));}
function Y(x){var a=lnF(),b=Math.log(REF-TO);return REF-Math.exp(a-x*(a-b));}
function yr(y,short){
  y=Math.round(y);
  if(y<-10000){var n=-y,p=Math.pow(10,Math.max(0,Math.floor(Math.log(n)/Math.LN10)-1));n=Math.round(n/p)*p;
    if(n>=1000000)return (short?'':'il y a ')+(n/1000000).toLocaleString('fr-FR',{maximumFractionDigits:1})+' million'+(n>=2000000?'s':'')+' d’années';
    return (short?'':'il y a ')+fr(n)+' ans';}
  if(y<=0)return fr(Math.max(1,-y))+' av. J.-C.';
  return String(y);
}
function span(e){return e.y0===e.y1?yr(e.y0):(e.y0<-10000&&e.y1<-10000?'de '+yr(e.y0,1).replace(' ans','')+' à '+yr(e.y1,1)+' environ':yr(e.y0)+' – '+yr(e.y1));}
var PLOT={l:0,r:0};
function win(T){
  if(S.wfix)return S.wfix;
  var w=PLOT.r-PLOT.l||900,a=lnF(),b=Math.log(REF-TO);
  return Math.max(1,(REF-T)*(a-b)/w*7);
}
function state(e,T,w){if(!S.show[e.v])return 0;if(S.all)return 2;if(e.y0-w<=T&&T<=e.y1+w)return 2;if(S.trace&&e.y1+w<T)return 1;return 0;}

/* ---------- styles ---------- */
var css=[
'.sim-ov{position:fixed;inset:0;z-index:9500;background:rgba(2,8,16,.9);display:flex;align-items:center;justify-content:center;padding:10px;font-family:var(--font-body,"Lexend",system-ui,sans-serif)}',
'.sim-ov[hidden]{display:none}',
'.sim-box{background:var(--panel,#0b1a2b);color:var(--ink,#f4f0e6);border:1px solid var(--line,#24405e);border-radius:18px;width:min(1500px,100%);height:min(980px,100%);display:grid;grid-template-rows:auto minmax(0,1fr) auto auto;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.5)}',
'.sim-hd{display:flex;align-items:center;gap:14px;padding:8px 14px;border-bottom:1px solid var(--line,#24405e);flex-wrap:wrap}',
'.sim-hd h2{margin:0;font:700 20px/1.2 var(--font-display,inherit);flex:1 1 260px}',
'.sim-hd h2 small{display:block;font:400 13.5px/1.3 var(--font-body,inherit);color:var(--muted,#9fb3c8)}',
'.sim-yr{text-align:right;min-width:170px}.sim-yr b{display:block;font:800 30px/1 var(--font-display,inherit);color:#ffd166}.sim-yr small{font-size:12.5px;color:var(--muted,#9fb3c8)}',
'.sim-box button{font:600 15px var(--font-body,inherit);min-height:40px;padding:0 12px;border-radius:10px;border:1px solid var(--line,#24405e);background:var(--panel-2,#12263c);color:inherit;cursor:pointer}',
'.sim-box button:hover{border-color:#ffd166}.sim-box button[aria-pressed=true]{background:#ffd166;color:#12202e;border-color:#ffd166}',
'.sim-body{display:grid;grid-template-columns:minmax(0,1fr) 330px;min-height:0}',
'.sim-mapw{position:relative;min-height:0;min-width:0}.sim-map{position:absolute;inset:0;width:100%;height:100%;display:block;cursor:pointer;touch-action:none}',
'.sim-leg{position:absolute;left:8px;bottom:8px;display:flex;flex-wrap:wrap;gap:6px;max-width:calc(100% - 16px)}',
'.sim-box .sim-leg button{min-height:32px;font-size:13px;padding:0 10px;background:rgba(6,20,36,.85);display:flex;align-items:center;gap:6px}',
'.sim-box .sim-leg button i{width:11px;height:11px;border-radius:50%;background:var(--c);display:inline-block}',
'.sim-box .sim-leg button[aria-pressed=false]{opacity:.45}.sim-box .sim-leg button[aria-pressed=true]{background:rgba(6,20,36,.85);color:inherit;border-color:var(--c)}',
'.sim-side{border-left:1px solid var(--line,#24405e);overflow:auto;padding:10px 12px;display:flex;flex-direction:column;gap:10px}',
'.sim-side h3{margin:0;font:700 14px var(--font-body,inherit);text-transform:uppercase;letter-spacing:.05em;color:#ffd166}',
'.sim-moms{display:flex;flex-wrap:wrap;gap:6px}.sim-box .sim-moms button{min-height:34px;font-size:13.5px;padding:0 9px}',
'.sim-card{background:var(--panel-2,#12263c);border:1px solid var(--line,#24405e);border-left:5px solid var(--c,#ffd166);border-radius:12px;padding:10px 12px}',
'.sim-card h4{margin:0 0 2px;font:700 18px/1.25 var(--font-display,inherit)}.sim-card .d{font:600 13px var(--font-body,inherit);color:var(--c,#ffd166)}',
'.sim-card p{margin:6px 0 0;font-size:15.5px;line-height:1.45}.sim-card .go{margin-top:8px;background:#ffd166;color:#12202e;border-color:#ffd166;font-weight:700}',
'.sim-now ul{list-style:none;margin:6px 0 0;padding:0}.sim-now li.g{font:700 12.5px var(--font-body,inherit);color:var(--muted,#9fb3c8);margin:8px 0 2px;text-transform:uppercase;letter-spacing:.04em}',
'.sim-box .sim-now li button{width:100%;text-align:left;min-height:34px;display:flex;gap:8px;align-items:center;font-weight:500;font-size:14.5px;background:transparent;border-color:transparent;padding:2px 6px}',
'.sim-box .sim-now li button:hover{border-color:var(--line,#24405e)}.sim-now li button i{flex:none;width:10px;height:10px;border-radius:50%;background:var(--c)}.sim-now li button small{margin-left:auto;color:var(--muted,#9fb3c8);font-size:12px;white-space:nowrap}',
'.sim-ctl{display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:8px 14px;border-top:1px solid var(--line,#24405e)}.sim-ctl .sp{flex:1}',
'.sim-box .sim-ctl .pl{min-width:118px;background:#ffd166;color:#12202e;border-color:#ffd166;font-weight:700}',
'.sim-frw{position:relative;padding:0 0 6px}.sim-rg{position:absolute;left:0;top:0;height:26px;margin:0;opacity:0;cursor:pointer}',
'.sim-fr{display:block;width:100%;height:150px;touch-action:none;cursor:ew-resize}',
'.sim-tip{position:absolute;pointer-events:none;background:rgba(6,20,36,.95);border:1px solid var(--line,#24405e);border-radius:8px;padding:5px 8px;font-size:13px;max-width:260px}',
'@media (max-width:900px){.sim-ov{padding:0}.sim-box{display:flex;flex-direction:column;overflow:auto;border-radius:0;height:100%}.sim-body{display:contents}.sim-hd{order:0}.sim-mapw{order:1;flex:none}.sim-ctl{order:2}.sim-frw{order:3}.sim-side{order:4;border-left:0;border-top:1px solid var(--line,#24405e);overflow:visible}',
'.sim-map{position:relative;height:min(64vw,440px)}.sim-leg{position:static;padding:6px 8px 0}.sim-box .sim-leg button{min-height:30px;font-size:12px}.sim-fr{height:120px}.sim-yr{min-width:0}.sim-yr b{font-size:24px}.sim-hd h2 small{display:none}.sim-box .sim-ctl button{min-height:36px;font-size:13.5px;padding:0 9px}.sim-box .sim-ctl .pl{min-width:96px}.sim-ctl .sp{display:none}}'
].join('\n');

/* ---------- interface ---------- */
var ov,cv,fc,rg,elY,elW,elCard,elNow,elMom,elTip,btnPlay,BASE=null,BK='',LAST=null,raf=0,tPrev=0;
function h(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;}
function build(){
  if(ov)return;
  var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
  ov=h('div','sim-ov');ov.hidden=true;ov.setAttribute('role','dialog');ov.setAttribute('aria-modal','true');ov.setAttribute('aria-label','Tout en même temps');
  var bx=h('div','sim-box');ov.appendChild(bx);
  var hd=h('header','sim-hd'),t=h('h2','','⏳ Tout en même temps');t.appendChild(h('small','','Tous les événements des volets d’histoire sur une seule carte : déplace le curseur du temps et regarde ce qui se passe ailleurs au même moment.'));
  var yb=h('div','sim-yr');elY=h('b');elW=h('small');yb.appendChild(elY);yb.appendChild(elW);
  var x=h('button','','✕');x.type='button';x.setAttribute('aria-label','Fermer');x.onclick=close;
  hd.appendChild(t);hd.appendChild(yb);hd.appendChild(x);bx.appendChild(hd);
  var body=h('div','sim-body');var mw=h('div','sim-mapw');cv=h('canvas','sim-map');cv.setAttribute('aria-label','Carte du monde avec les événements de la période choisie');mw.appendChild(cv);
  elTip=h('div','sim-tip');elTip.hidden=true;mw.appendChild(elTip);
  var leg=h('div','sim-leg');
  Object.keys(VN).forEach(function(k){var b=h('button');b.type='button';b.style.setProperty('--c',VN[k][2]);b.appendChild(h('i'));b.appendChild(document.createTextNode(VN[k][1]));b.setAttribute('aria-pressed','true');
    b.onclick=function(){S.show[k]=S.show[k]?0:1;b.setAttribute('aria-pressed',S.show[k]?'true':'false');draw();};leg.appendChild(b);});
  mw.appendChild(leg);body.appendChild(mw);
  var sd=h('aside','sim-side');
  sd.appendChild(h('h3','','Moments clés'));elMom=h('div','sim-moms');
  MOM.forEach(function(m,i){var b=h('button','',m[2]);b.type='button';b.onclick=function(){moment(i);};elMom.appendChild(b);});
  sd.appendChild(elMom);elCard=h('div','sim-card');sd.appendChild(elCard);
  elNow=h('div','sim-now');sd.appendChild(elNow);body.appendChild(sd);bx.appendChild(body);
  var ctl=h('div','sim-ctl');
  btnPlay=h('button','pl','▶ Lecture');btnPlay.type='button';btnPlay.onclick=function(){setPlay(!S.play);};ctl.appendChild(btnPlay);
  var bp=h('button','','◀');bp.type='button';bp.title='Événement précédent';bp.setAttribute('aria-label','Événement précédent');bp.onclick=function(){jump(-1);};ctl.appendChild(bp);
  var bn=h('button','','▶');bn.type='button';bn.title='Événement suivant';bn.setAttribute('aria-label','Événement suivant');bn.onclick=function(){jump(1);};ctl.appendChild(bn);
  RANGES.forEach(function(r,i){var b=h('button','rgb',r[1]);b.type='button';b.setAttribute('aria-pressed',i===S.ri?'true':'false');b.onclick=function(){setRange(i);};ctl.appendChild(b);});
  ctl.appendChild(h('span','sp'));
  var ba=h('button','','Tout afficher');ba.type='button';ba.setAttribute('aria-pressed','false');ba.title='Afficher tous les événements de toutes les époques en même temps';
  ba.onclick=function(){S.all=!S.all;ba.setAttribute('aria-pressed',S.all?'true':'false');draw();};ctl.appendChild(ba);
  var bt=h('button','','Garder les traces');bt.type='button';bt.setAttribute('aria-pressed','true');bt.title='Laisser un petit point pour les événements passés';
  bt.onclick=function(){S.trace=!S.trace;bt.setAttribute('aria-pressed',S.trace?'true':'false');draw();};ctl.appendChild(bt);
  var bc=h('button','','🌏 Centre');bc.type='button';bc.title='Centrer la carte sur le Pacifique ou sur l’Europe et l’Afrique';
  bc.onclick=function(){S.rot=S.rot===150?10:150;BK='';draw();};ctl.appendChild(bc);
  var be=h('button','','📄 PDF');be.type='button';be.title='Enregistrer la carte de ce moment en PDF (A4 paysage)';be.onclick=exportPdf;ctl.appendChild(be);
  bx.appendChild(ctl);
  var fw=h('div','sim-frw');fc=h('canvas','sim-fr');fc.setAttribute('aria-hidden','true');
  rg=h('input','sim-rg');rg.type='range';rg.min=0;rg.max=1000;rg.step=1;rg.setAttribute('aria-label','Curseur du temps');
  rg.oninput=function(){S.mom=null;setPlay(false);S.wfix=0;setT(Y(rg.value/1000),true);};
  fw.appendChild(fc);fw.appendChild(rg);bx.appendChild(fw);
  document.body.appendChild(ov);
  /* carte : survol et clic */
  cv.addEventListener('pointermove',function(ev){var e=pick(ev);cv.style.cursor=e?'pointer':'default';
    if(e){var r=cv.getBoundingClientRect();elTip.hidden=false;elTip.innerHTML='';elTip.appendChild(h('b','',e.t));elTip.appendChild(h('div','',span(e)));
      elTip.style.left=Math.min(r.width-270,ev.clientX-r.left+14)+'px';elTip.style.top=Math.max(4,ev.clientY-r.top-10)+'px';}else elTip.hidden=true;});
  cv.addEventListener('pointerleave',function(){elTip.hidden=true;});
  cv.addEventListener('click',function(ev){var e=pick(ev);if(e)select(e);});
  /* frise : glisser pour changer d'année */
  var drag=false;
  function fx(ev){var r=fc.getBoundingClientRect(),x=(ev.clientX-r.left-PLOT.l)/(PLOT.r-PLOT.l);return Math.max(0,Math.min(1,x));}
  fc.addEventListener('pointerdown',function(ev){drag=true;fc.setPointerCapture(ev.pointerId);S.mom=null;S.wfix=0;setPlay(false);
    var e=pickFr(ev);if(e){select(e,true);}setT(Y(fx(ev)),true);});
  fc.addEventListener('pointermove',function(ev){if(drag){setT(Y(fx(ev)),true);}});
  fc.addEventListener('pointerup',function(){drag=false;});
  ov.addEventListener('keydown',function(ev){
    ev.stopPropagation();
    if(ev.key==='Escape'){ev.preventDefault();close();}
    else if(ev.target===rg)return;
    else if(ev.key===' '&&ev.target.tagName!=='BUTTON'){ev.preventDefault();setPlay(!S.play);}
    else if(ev.key==='ArrowRight'){ev.preventDefault();jump(1);}else if(ev.key==='ArrowLeft'){ev.preventDefault();jump(-1);}
  });
  window.addEventListener('resize',function(){if(!ov.hidden){BK='';draw();}});
}
function open(o){
  build();ov.hidden=false;document.body.classList.add('sim-on');
  try{var A=window.ATLAS&&window.ATLAS.api;if(A&&A.hush)A.hush();}catch(e){}
  if(o&&o.T!=null)S.T=o.T;
  BK='';requestAnimationFrame(function(){draw();rg.focus({preventScroll:true});});
}
function close(){if(!ov)return;setPlay(false);ov.hidden=true;document.body.classList.remove('sim-on');if(location.hash==='#simultane')try{history.replaceState(null,'',location.pathname+location.search);}catch(e){}}
function setT(T,user){S.T=Math.max(RANGES[S.ri][0],Math.min(TO,T));if(user)S.sel=S.sel&&state(S.sel,S.T,win(S.T))===2?S.sel:null;draw();}
function setRange(i){S.ri=i;ov.querySelectorAll('.rgb').forEach(function(b,k){b.setAttribute('aria-pressed',k===i?'true':'false');});if(S.T<RANGES[i][0])S.T=RANGES[i][0];draw();}
function setPlay(b){
  S.play=!!b;if(btnPlay)btnPlay.textContent=S.play?'⏸ Pause':'▶ Lecture';
  if(S.play){S.mom=null;S.wfix=0;if(X(S.T)>=0.999)S.T=RANGES[S.ri][0];tPrev=0;cancelAnimationFrame(raf);raf=requestAnimationFrame(tick);}
}
function tick(ts){
  if(!S.play||ov.hidden)return;
  if(tPrev){var dx=(ts-tPrev)/1000/45,x=X(S.T)+dx;if(x>=1){x=1;setPlay(false);}S.T=Y(x);draw();}
  tPrev=ts;raf=requestAnimationFrame(tick);
}
function jump(dir){
  setPlay(false);S.mom=null;S.wfix=0;var T=S.T,w=win(T),list=D.filter(function(e){return S.show[e.v]&&e.y0>=RANGES[S.ri][0];}),e=null,i;
  if(dir>0){for(i=0;i<list.length;i++)if(list[i].y0>T+0.5){e=list[i];break;}}
  else{for(i=list.length-1;i>=0;i--)if(list[i].y0<T-0.5){e=list[i];break;}}
  if(e){S.T=e.y0;S.sel=e;draw();}
}
function moment(i){var m=MOM[i];setPlay(false);var ri=0;RANGES.forEach(function(r,k){if(m[0]-Math.max(30,m[1]*2)>=r[0])ri=k;});setRange(ri);S.mom=i;S.sel=null;S.wfix=m[1]||0;S.T=m[0];draw();}
function select(e,keep){S.sel=e;S.mom=null;if(!keep&&!S.all&&state(e,S.T,win(S.T))!==2)S.T=e.y0;draw();}

/* ---------- dessin de la carte ---------- */
var THD={sea:'#0f3a5f',sea2:'#08223b',land:'#cdbb8c',coast:'rgba(60,45,15,.6)',grat:'rgba(160,210,255,.10)',ink:'#f4f0e6',sub:'#d3e6f7',halo:'rgba(6,20,36,.92)',line:'rgba(255,209,102,.35)',dark:false};
var THL={sea:'#eef5fb',sea2:'#dcebf6',land:'#f6f1e3',coast:'rgba(60,55,45,.9)',grat:'rgba(40,80,120,.15)',ink:'#12202e',sub:'#3a4b5c',halo:'rgba(255,255,255,.95)',line:'rgba(122,74,0,.45)',dark:true};
function dk(c){var n=parseInt(c.slice(1),16),r=n>>16,g=(n>>8)&255,b=n&255;return 'rgb('+[r,g,b].map(function(v){return Math.round(v*0.62);}).join(',')+')';}
function colOf(e,th){var c=VN[e.v][2];return th.dark?dk(c==='#e2e8f0'?'#64748b':c):c;}
function projFor(w,hh){return d3.geoEqualEarth().rotate([-S.rot,0]).fitExtent([[6,6],[w-6,hh-6]],{type:'Sphere'});}
var LAND=null;
function land(){if(!LAND)LAND={type:'MultiPolygon',coordinates:window.GEO.world.coordinates.concat(window.GEO.detail?window.GEO.detail.coordinates:[])};return LAND;}
function base(w,hh,dpr,th){
  var c=document.createElement('canvas');c.width=Math.round(w*dpr);c.height=Math.round(hh*dpr);var x=c.getContext('2d');x.setTransform(dpr,0,0,dpr,0,0);
  var pr=projFor(w,hh),pa=d3.geoPath(pr,x);
  var g=x.createRadialGradient(w/2,hh/2,10,w/2,hh/2,Math.max(w,hh)*0.6);g.addColorStop(0,th.sea);g.addColorStop(1,th.sea2);
  x.beginPath();pa({type:'Sphere'});x.fillStyle=g;x.fill();
  x.beginPath();pa(d3.geoGraticule().step([30,30])());x.strokeStyle=th.grat;x.lineWidth=1;x.stroke();
  x.beginPath();pa(land());x.fillStyle=th.land;x.fill();x.strokeStyle=th.coast;x.lineWidth=0.6;x.stroke();
  x.beginPath();pa({type:'Sphere'});x.strokeStyle=th.grat;x.lineWidth=1.5;x.stroke();
  return {c:c,pr:pr};
}
function drawMap(x,w,hh,o){
  o=o||{};var th=o.th||THD,T=S.T,wn=win(T),pr=o.pr,now=performance.now();
  var vis=[],dots=[];
  D.forEach(function(e){var st=state(e,T,wn);if(!st)return;var q=pr([e.lon,e.lat]);if(!q||!isFinite(q[0]))return;dots.push({e:e,q:q,st:st});});
  /* traces */
  dots.forEach(function(d){if(d.st!==1)return;x.beginPath();x.arc(d.q[0],d.q[1],2.3*(o.k||1),0,7);x.fillStyle=colOf(d.e,th);x.globalAlpha=0.5;x.fill();x.globalAlpha=1;});
  var act=dots.filter(function(d){return d.st===2;});
  /* liens « pendant ce temps » depuis l'événement choisi */
  var sel=S.sel&&act.filter(function(d){return d.e===S.sel;})[0];
  if(sel&&!S.all){x.save();x.setLineDash([5,5]);x.strokeStyle=th.line;x.lineWidth=1.4*(o.k||1);act.forEach(function(d){if(d===sel)return;x.beginPath();x.moveTo(sel.q[0],sel.q[1]);x.lineTo(d.q[0],d.q[1]);x.stroke();});x.restore();}
  act.forEach(function(d){
    var r=(d.e.imp?6.5:5)*(o.k||1)*(S.all?0.8:1),c=colOf(d.e,th);
    if(S.play&&!o.still){var ph=((now/1100)+d.e.i*0.37)%1;x.beginPath();x.arc(d.q[0],d.q[1],r+ph*12,0,7);x.strokeStyle=c;x.globalAlpha=0.6*(1-ph);x.lineWidth=2;x.stroke();x.globalAlpha=1;}
    x.beginPath();x.arc(d.q[0],d.q[1],r,0,7);x.fillStyle=c;x.fill();x.lineWidth=1.6*(o.k||1);x.strokeStyle=th.halo;x.stroke();
    if(d.e.v==='r'){x.beginPath();x.arc(d.q[0],d.q[1],r*0.42,0,7);x.fillStyle=th.halo;x.fill();}
    if(d===sel){x.beginPath();x.arc(d.q[0],d.q[1],r+5,0,7);x.strokeStyle=th.dark?'#7a4a00':'#ffd166';x.lineWidth=2.5;x.stroke();}
  });
  /* étiquettes : choisi, importants, puis les plus proches de l'année */
  var fs=(o.fs||13),boxes=[],max=o.max||(S.all?22:16),n=0;
  act.sort(function(a,b){return (b===sel)-(a===sel)||(b.e.imp-a.e.imp)||Math.abs((a.e.y0+a.e.y1)/2-T)-Math.abs((b.e.y0+b.e.y1)/2-T);});
  x.textBaseline='alphabetic';x.lineJoin='round';
  act.forEach(function(d){
    if(n>=max)return;if(S.all&&!d.e.imp&&d!==sel)return;
    var t=d.e.t,sb=span(d.e);x.font='700 '+fs+'px "Lexend","Segoe UI",system-ui,sans-serif';var tw=x.measureText(t).width;x.font='500 '+(fs-1.5)+'px "Lexend","Segoe UI",system-ui,sans-serif';var sw=x.measureText(sb).width;
    var bw=Math.max(tw,sw),bh=fs*2.2,g=9*(o.k||1),C=[[g,-fs*0.5,'left'],[-g,-fs*0.5,'right'],[0,-fs*1.9-g,'center'],[0,g+fs*0.6,'center']],k,b,ok=null;
    for(k=0;k<C.length&&!ok;k++){
      var cx=d.q[0]+C[k][0],cy=d.q[1]+C[k][1],al=C[k][2],x0=al==='left'?cx:al==='right'?cx-bw:cx-bw/2;
      b=[x0-2,cy-fs,x0+bw+2,cy+fs*1.25];
      if(b[0]<2||b[2]>w-2||b[1]<2||b[3]>hh-(o.bottom||44))continue;
      var free=true;for(var j=0;j<boxes.length;j++){var q=boxes[j];if(b[0]<q[2]&&b[2]>q[0]&&b[1]<q[3]&&b[3]>q[1]){free=false;break;}}
      if(free)ok=[cx,cy,al,b];
    }
    if(!ok)return;boxes.push(ok[3]);n++;
    x.textAlign=ok[2];x.strokeStyle=th.halo;x.lineWidth=3.5;
    x.font='700 '+fs+'px "Lexend","Segoe UI",system-ui,sans-serif';x.strokeText(t,ok[0],ok[1]);x.fillStyle=th.ink;x.fillText(t,ok[0],ok[1]);
    x.font='500 '+(fs-1.5)+'px "Lexend","Segoe UI",system-ui,sans-serif';x.strokeText(sb,ok[0],ok[1]+fs*1.1);x.fillStyle=colOf(d.e,th);x.fillText(sb,ok[0],ok[1]+fs*1.1);
  });
  return dots;
}
function draw(){
  if(!ov||ov.hidden)return;
  var w=cv.clientWidth,hh=cv.clientHeight,dpr=Math.min(2,window.devicePixelRatio||1);if(!w||!hh)return;
  if(cv.width!==Math.round(w*dpr)||cv.height!==Math.round(hh*dpr)){cv.width=Math.round(w*dpr);cv.height=Math.round(hh*dpr);}
  var key=w+'x'+hh+'x'+dpr+'x'+S.rot;if(key!==BK||!BASE){BASE=base(w,hh,dpr,THD);BK=key;}
  var x=cv.getContext('2d');x.setTransform(1,0,0,1,0,0);x.clearRect(0,0,cv.width,cv.height);x.drawImage(BASE.c,0,0);x.setTransform(dpr,0,0,dpr,0,0);
  LAST={dots:drawMap(x,w,hh,{pr:BASE.pr,fs:w<600?11.5:13,bottom:w<600?70:46}),pr:BASE.pr};
  drawFrise();side();
}
function pick(ev){
  if(!LAST)return null;var r=cv.getBoundingClientRect(),mx=ev.clientX-r.left,my=ev.clientY-r.top,best=null,bd=14*14;
  LAST.dots.forEach(function(d){if(d.st!==2&&!(d.st===1))return;var dd=(d.q[0]-mx)*(d.q[0]-mx)+(d.q[1]-my)*(d.q[1]-my);if(d.st===1)dd*=2.2;if(dd<bd){bd=dd;best=d.e;}});
  return best;
}

/* ---------- frise par région ---------- */
var FR={top:28,lane:0};
function tickLab(y){if(y<=-1000000)return fr(-y/1000000)+' M d’années';if(y<-10000)return fr(-y)+' ans';if(y<0)return fr(-y)+' av. J.-C.';if(y===1)return 'an 1';return String(y);}
function drawFrise(){
  var w=fc.clientWidth,hh=fc.clientHeight,dpr=Math.min(2,window.devicePixelRatio||1);if(!w||!hh)return;
  if(fc.width!==Math.round(w*dpr)||fc.height!==Math.round(hh*dpr)){fc.width=Math.round(w*dpr);fc.height=Math.round(hh*dpr);}
  var x=fc.getContext('2d');x.setTransform(dpr,0,0,dpr,0,0);x.clearRect(0,0,w,hh);
  var small=w<640;PLOT.l=small?92:136;PLOT.r=w-16;var pw=PLOT.r-PLOT.l,T=S.T,wn=win(T);
  rg.style.left=PLOT.l+'px';rg.style.width=pw+'px';rg.value=Math.round(X(T)*1000);
  FR.lane=(hh-FR.top-4)/RG.length;
  x.font='600 '+(small?10.5:12)+'px "Lexend","Segoe UI",system-ui,sans-serif';x.textBaseline='middle';
  RG.forEach(function(r,i){var y=FR.top+i*FR.lane;x.fillStyle=i%2?'rgba(255,255,255,.035)':'rgba(255,255,255,.07)';x.fillRect(PLOT.l,y,pw,FR.lane);x.fillStyle='#c9d7e6';x.textAlign='right';x.fillText(small?(r[0]==='n'?'Nouv.-Calédonie':r[1].replace(', Pacifique','')):r[1],PLOT.l-8,y+FR.lane/2);});
  /* graduations */
  x.textAlign='center';x.font='500 '+(small?9.5:11)+'px "Lexend","Segoe UI",system-ui,sans-serif';
  var lastX=-99;RANGES[S.ri][2].forEach(function(y){var px=PLOT.l+X(y)*pw;x.strokeStyle='rgba(200,220,240,.18)';x.beginPath();x.moveTo(px,FR.top-4);x.lineTo(px,hh-4);x.stroke();
    var lb=tickLab(y),tw=x.measureText(lb).width;if(px-tw/2<lastX+6)return;x.fillStyle='#9fb3c8';x.fillText(lb,Math.min(PLOT.r-tw/2,Math.max(PLOT.l+tw/2,px)),9);lastX=px+tw/2;});
  /* fenêtre « en même temps » */
  if(!S.all){var a=PLOT.l+X(T-wn)*pw,b=PLOT.l+X(Math.min(TO,T+wn))*pw;x.fillStyle='rgba(255,209,102,.16)';x.fillRect(a,FR.top,Math.max(2,b-a),hh-FR.top-4);}
  /* événements */
  var ri={};RG.forEach(function(r,i){ri[r[0]]=i;});
  D.forEach(function(e){
    if(!S.show[e.v]||e.y1<RANGES[S.ri][0])return;
    var x0=PLOT.l+X(e.y0)*pw,x1=PLOT.l+X(e.y1)*pw,cy=FR.top+ri[e.rg]*FR.lane+FR.lane/2,on=S.all||state(e,T,wn)===2;
    x.globalAlpha=on?1:0.42;x.fillStyle=VN[e.v][2];
    if(x1-x0>=4){x.beginPath();x.roundRect?x.roundRect(x0,cy-3.5,x1-x0,7,3.5):x.rect(x0,cy-3.5,x1-x0,7);x.fill();}
    else{x.beginPath();x.arc(x0,cy,on?4:3,0,7);x.fill();}
    if(e===S.sel){x.globalAlpha=1;x.strokeStyle='#ffd166';x.lineWidth=2;x.beginPath();x.arc((x0+Math.max(x1,x0))/2,cy,7,0,7);x.stroke();}
  });
  x.globalAlpha=1;
  /* curseur */
  var cx=PLOT.l+X(T)*pw;x.strokeStyle='#ffd166';x.lineWidth=2.5;x.beginPath();x.moveTo(cx,FR.top-6);x.lineTo(cx,hh-3);x.stroke();
  x.fillStyle='#ffd166';x.beginPath();x.moveTo(cx-7,FR.top-10);x.lineTo(cx+7,FR.top-10);x.lineTo(cx,FR.top-2);x.closePath();x.fill();
}
function pickFr(ev){
  var r=fc.getBoundingClientRect(),mx=ev.clientX-r.left,my=ev.clientY-r.top,pw=PLOT.r-PLOT.l,best=null,bd=7,ri={};
  RG.forEach(function(g,i){ri[g[0]]=i;});
  D.forEach(function(e){if(!S.show[e.v])return;var cy=FR.top+ri[e.rg]*FR.lane+FR.lane/2;if(Math.abs(my-cy)>FR.lane/2)return;
    var x0=PLOT.l+X(e.y0)*pw,x1=Math.max(x0,PLOT.l+X(e.y1)*pw),d=mx<x0?x0-mx:mx>x1?mx-x1:0;if(d<bd){bd=d;best=e;}});
  return best;
}

/* ---------- panneau ---------- */
var NOWK='';
function goChapter(e){
  var A=window.ATLAS&&window.ATLAS.api;if(!A)return;var vi=-1;A.vols().forEach(function(v,i){if(v.id===VN[e.v][0])vi=i;});if(vi<0)return;
  close();if(A.leaveHome)A.leaveHome();A.volet(vi,e.ci);if(A.play)A.play();
}
function side(){
  var T=S.T,wn=win(T);
  elY.textContent=S.all?'Toutes les époques':yr(T);
  elW.textContent=S.all?'tous les événements à la fois':(T<-10000?'(à quelques milliers d’années près)':'de '+yr(T-wn)+' à '+yr(Math.min(TO,T+wn)));
  ov.querySelectorAll('.sim-moms button').forEach(function(b,i){b.setAttribute('aria-pressed',S.mom===i?'true':'false');});
  elCard.innerHTML='';
  if(S.sel){var e=S.sel;elCard.style.setProperty('--c',VN[e.v][2]);elCard.appendChild(h('h4','',e.t));elCard.appendChild(h('div','d',span(e)+' · '+RGN[e.rg]));elCard.appendChild(h('p','',e.x));
    var vn=h('p','',e.v==='r'?'Repère du programme (hors atlas).':'Volet « '+VN[e.v][1]+' », chapitre '+(e.ci+1)+'.');vn.style.cssText='font-size:13px;color:var(--muted,#9fb3c8)';elCard.appendChild(vn);
    if(e.ci>=0){var b=h('button','go','▶ Voir le chapitre animé');b.type='button';b.onclick=function(){goChapter(e);};elCard.appendChild(b);}}
  else if(S.mom!=null){var m=MOM[S.mom];elCard.style.setProperty('--c','#ffd166');elCard.appendChild(h('h4','','Pendant ce temps… '+m[2]));elCard.appendChild(h('p','',m[3]));}
  else{elCard.style.setProperty('--c','#ffd166');elCard.appendChild(h('h4','','Comment ça marche ?'));elCard.appendChild(h('p','','Fais glisser le curseur doré de la frise, lance la lecture ou choisis un moment clé. Les points allumés sur la carte se passent à la même époque. Clique sur un point pour lire l’événement.'));}
  var act=D.filter(function(e){return state(e,T,wn)===2;}),k=act.map(function(e){return e.i;}).join(',')+'|'+(S.sel?S.sel.i:'');
  if(k===NOWK)return;NOWK=k;
  elNow.innerHTML='';elNow.appendChild(h('h3','',(S.all?'Tous les événements':'En même temps')+' ('+act.length+')'));
  var ul=h('ul');
  RG.forEach(function(r){var L=act.filter(function(e){return e.rg===r[0];});if(!L.length)return;ul.appendChild(h('li','g',r[1]));
    L.forEach(function(e){var li=h('li'),b=h('button');b.type='button';b.style.setProperty('--c',VN[e.v][2]);b.appendChild(h('i'));b.appendChild(h('span','',e.t));b.appendChild(h('small','',e.y0===e.y1?yr(e.y0,1):yr(e.y0,1)+'…'));
      if(S.sel===e)b.style.borderColor='#ffd166';b.onclick=function(){select(e,true);};li.appendChild(b);ul.appendChild(li);});});
  if(!act.length)ul.appendChild(h('li','g','Aucun événement à cette date dans l’atlas.'));
  elNow.appendChild(ul);
}

/* ---------- PDF (A4 paysage) ---------- */
function exportPdf(){
  var A=window.ATLAS&&window.ATLAS.api;if(!A||!A.pdf)return;
  var PW=1754,PH=1240,M=60,pg=document.createElement('canvas');pg.width=PW;pg.height=PH;var c=pg.getContext('2d');
  c.fillStyle='#fff';c.fillRect(0,0,PW,PH);c.fillStyle='#12202e';c.textBaseline='alphabetic';c.textAlign='left';
  c.font='700 46px "Lexend","Segoe UI",sans-serif';c.fillText('Tout en même temps : '+(S.all?'toutes les époques':yr(S.T)),M,M+40);
  c.font='400 24px "Lexend","Segoe UI",sans-serif';c.fillStyle='#3a4b5c';
  var T=S.T,wn=win(T);c.fillText(S.all?'Tous les événements de l’atlas':(S.mom!=null?MOM[S.mom][2]+' · ':'')+(T<-10000?'à quelques milliers d’années près':'de '+yr(T-wn)+' à '+yr(Math.min(TO,T+wn))),M,M+78);
  var mw=PW-2*M,mh=720,b=base(mw,mh,1,THL),mc=document.createElement('canvas');mc.width=mw;mc.height=mh;var x=mc.getContext('2d');x.drawImage(b.c,0,0);
  var dots=drawMap(x,mw,mh,{pr:b.pr,th:THL,fs:19,k:1.4,max:30,bottom:8,still:true});
  c.drawImage(mc,M,M+100);c.strokeStyle='#9aa7b4';c.lineWidth=2;c.strokeRect(M,M+100,mw,mh);
  /* liste */
  var act=dots.filter(function(d){return d.st===2;}).map(function(d){return d.e;}).sort(function(a,b){return a.y0-b.y0;});
  var y0=M+100+mh+44,col=0,cw=(PW-2*M)/3,y=y0;c.font='400 20px "Lexend","Segoe UI",sans-serif';
  if(S.mom!=null&&!S.all){c.fillStyle='#12202e';c.font='italic 400 21px "Lexend","Segoe UI",sans-serif';var words=MOM[S.mom][3].split(' '),ln='';
    words.forEach(function(wd){if(c.measureText(ln+wd).width>PW-2*M){c.fillText(ln,M,y);y+=28;ln='';}ln+=wd+' ';});c.fillText(ln,M,y);y+=40;y0=y;c.font='400 20px "Lexend","Segoe UI",sans-serif';}
  act.slice(0,3*Math.max(1,Math.floor((PH-M-30-y0)/28))).forEach(function(e){
    if(y>PH-M-30){col++;y=y0;}if(col>2)return;
    c.fillStyle=colOf(e,THL);c.beginPath();c.arc(M+col*cw+8,y-7,7,0,7);c.fill();c.fillStyle='#12202e';
    var t=(e.y0===e.y1?yr(e.y0,1):yr(e.y0,1)+'–'+yr(e.y1,1))+' · '+e.t;while(c.measureText(t).width>cw-30&&t.length>10)t=t.slice(0,-2);
    c.fillText(t,M+col*cw+22,y);y+=28;});
  c.fillStyle='#5b6b7a';c.font='400 18px "Lexend","Segoe UI",sans-serif';
  c.fillText('Atlas historique du Pacifique · « Tout en même temps » · dates approximatives pour les périodes anciennes · fond de carte Natural Earth',M,PH-48);
  c.font='400 15px "Lexend","Segoe UI",sans-serif';c.fillStyle='#8a97a3';c.fillText('© Atlas historique du Pacifique · usage en classe, pas d’usage commercial (CC BY-NC-ND 4.0)',M,PH-24);
  A.pdf('Tout-en-meme-temps-'+String(S.all?'tout':yr(S.T)).replace(/[^0-9a-zA-Z]+/g,'-')+'.pdf',[pg]);
}

/* ---------- entrées : carte du menu d'entrée, #simultane ---------- */
function addCard(){
  var tabs=document.getElementById('tabs');if(!tabs||tabs.querySelector('.sim-tab'))return;
  var b=h('button','tab sim-tab');b.type='button';b.style.setProperty('--c','#ffd166');
  var im=window.IMG&&window.IMG.carte1774;if(im){var ig=document.createElement('img');ig.alt='';ig.loading='lazy';ig.src=im.f;b.appendChild(ig);}
  var tx=h('span','tab-tx');tx.appendChild(h('span','tab-t','⏳ Tout en même temps'));tx.appendChild(h('small','','1 carte · '+D.length+' événements · toute l’histoire'));
  tx.appendChild(h('span','tab-s','Tous les événements des volets d’histoire sur une seule carte, avec un curseur du temps : ce qui se passe au même moment ailleurs dans le monde.'));
  b.appendChild(tx);b.onclick=function(){open();};
  var ref=tabs.children[4]||null;tabs.insertBefore(b,ref);
}
function init(){
  addCard();var tabs=document.getElementById('tabs');
  if(tabs&&window.MutationObserver)new MutationObserver(function(){if(!tabs.querySelector('.sim-tab'))addCard();}).observe(tabs,{childList:true});
  if(location.hash==='#simultane')setTimeout(function(){open();},250);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
window.SIMUL={open:open,close:close,data:D,moments:MOM,state:S,moment:moment,select:select,setT:setT,exportPdf:exportPdf};
})();
