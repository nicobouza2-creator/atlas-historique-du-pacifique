/* Atlas collège — volet « Conquêtes et sociétés coloniales » (4e, histoire, thème 2 du programme adapté à la Nouvelle-Calédonie).
   Planisphère. Les empires sont coloriés avec les pays ACTUELS (js/pays.js) : schéma, pas des frontières d’époque.
   Chaque chapitre porte aussi « fs » : les éléments de la fiche séance (trame du livret d’accueil HG-EMC), lus par js/college.js. */
(function(){
'use strict';
var A=window.ATLAS,r=A.r,L=A.L,Pu=A.Pu,Ph=A.Ph,Sh=A.Sh,Rg=A.Rg,PY=window.PAYS||{};
function cam(t,lon,lat,z){return {t:t,lon:lon,lat:lat,z:z};}
function W(t){return cam(t,20,12,0.46);}
function AF(t){return cam(t,18,2,0.9);}
function PA(t){return cam(t,172,-6,0.92);}
/* zone = un ou plusieurs pays actuels (codes ISO séparés par des espaces) ; les pays absents de pays.js sont ignorés */
function Z(codes,col,t0,al){
  var rings=[];codes.split(' ').forEach(function(c){if(PY[c])rings=rings.concat(PY[c]);});
  return rings.length?Rg(rings,col,t0,al==null?0.62:al,2):null;
}
function ZS(list){return list.filter(Boolean);}
function ext(o,x){Object.keys(x).forEach(function(k){o[k]=x[k];});return o;}
function C(lon,lat,ray,col,t0,al){return Rg([lon,lat,ray],col,t0,al==null?0.62:al,2);}
/* archipel : bulle en mer (zone non découpée sur les terres), rayon en degrés */
function B(lon,lat,ray,col,t0,al){var ring=[],i;for(i=0;i<20;i++){var a=i/20*2*Math.PI,x=lon+ray*Math.cos(a)/Math.cos(lat*Math.PI/180),y=lat+ray*Math.sin(a);ring.push([x>180?x-360:x<-180?x+360:x,y]);}return {k:'poly',ring:ring,col:col,a:al==null?0.6:al,t0:t0,fade:2,nostroke:true};}
function vap(col,t0,t1,pts,o){o=o||{};o.ship=true;o.sp='vapeur';return r(col,t0,t1,3,pts,o);}
var F='fra',GB='gbr',DE='#5b6779',BE='lap',PT='por',IT='aus',ES='esp',NL='ned',US='pol',JP='zh',IND='neo';
var NC=[165.6,-21.3];
/* routes maritimes (schémas) */
var SUEZ=[[-0.5,50.2],[-6,47.5],[-10.5,42],[-9.5,37],[-5.6,35.95],[3,37.6],[11,37.6],[16,35],[25,33.6],[32.3,31.5],[32.55,30],[33.6,27.6],[37.5,21],[42.5,13.5],[45,12.2],[52,13],[62,16],[72.5,18.9]];
var CAP=[[-0.5,50.2],[-6,47.5],[-12,40],[-18.5,27],[-20,12],[-14,-2],[-4,-16],[8,-29],[17.5,-35],[24,-36],[36,-30],[48,-20],[56,-8],[63,6],[72.5,18.9]];
var NOUMEA=[[45,12.2],[48.5,12.9],[52,13],[57,10],[70,5],[79.5,5],[90,-6],[103,-18],[112,-33],[119,-38],[132,-41],[141,-44],[146.6,-45],[151,-43],[153.5,-36.5],[157,-30],[162,-25],[166.3,-22.5]];
/* Nouvelle-Guinée : partage schématique (l’île entière est un seul pays aujourd’hui à l’est) */
var NG_DE=[[141,-2.2],[141,-5.3],[144.5,-6.3],[147.9,-8],[149,-7.6],[156.5,-7.2],[156,-0.8],[146,-0.4]];
var NG_GB=[[141,-5.3],[144.5,-6.3],[147.9,-8],[149,-7.6],[152,-10],[151.5,-12],[141,-11]];

var CH=[

/* 1 --------------------------------------------------------------- */
{short:'Pourquoi des colonies ?',col:'gbr',dur:58,when:[1815,1880],dates:'1815 – 1880',proj:'plan',
 cam:[W(0),W(16),cam(22,45,18,0.78),cam(34,45,18,0.78),W(40),W(58)],
 zones:ZS([
  C(-74,47,9,GB,2,0.5),C(149,-33,5,GB,2,0.5),Z('IND',GB,2,0.5),C(21,-33,4,GB,2,0.5),Z('CUB PRI PHL',ES,4,0.5),Z('IDN',NL,5,0.5),Z('AGO MOZ',PT,6,0.35),Z('FRA',F,7,0.45),
  C(-17.2,14.9,1.6,F,7),C(55.5,-21.1,1.2,F,7)
 ]),
 routes:[
  r(GB,18,26,2.2,CAP,{dash:true}),
  vap(GB,24,33,SUEZ,{nosea:true}),
  vap(F,34,40,NOUMEA)
 ],
 labels:[
  L(2,-74,52,'Canada',{nomark:true}),L(2.5,146,-27,'Australie',{nomark:true}),L(3,79,22,'Inde',{nomark:true,big:true}),L(3.5,22,-31,'Le Cap',{nomark:true,dy:14}),
  L(5,113,-2,'Indes néerlandaises',{nomark:true}),L(4,-79,22,'Cuba',{nomark:true,dy:-10}),
  L(10,-1,53.5,'Usines',{nomark:true,big:true,end:18,sub:'charbon, acier, textile'}),
  L(11,77,15,'coton',{nomark:true,end:18,dy:18}),L(11.5,30,27,'coton',{nomark:true,end:18}),L(12,22,-2,'caoutchouc, ivoire',{nomark:true,end:18}),
  L(12.5,26,-27,'or, diamants',{nomark:true,end:18,dy:-16}),L(13,NC[0],NC[1],'nickel',{nomark:true,end:18,dy:16}),L(13.5,-2,9,'huile de palme',{nomark:true,end:18,dy:14}),
  L(19,18.4,-34.2,'Route du Cap',{sub:'≈ 19 800 km',dx:-10,al:'right',end:34}),
  L(25,32.4,30.6,'Canal de Suez',{sub:'1869 · ≈ 11 600 km',gold:true,dx:10,al:'left',dy:-10}),
  L(27,-5.35,36.14,'Gibraltar',{mark:'port',dx:-8,al:'right',dy:10,zmin:0.6}),L(28,45.03,12.8,'Aden',{mark:'port',dy:16}),
  L(29,72.83,18.97,'Bombay',{mark:'ville',dx:10,al:'left'}),L(30,103.85,1.29,'Singapour',{mark:'port',dy:16,zmin:0.6}),
  L(36,NC[0],NC[1],'Nouméa',{mark:'star',gold:true,dx:10,al:'left',sub:'point d’appui français'}),
  L(42,2.35,48.85,'France',{nomark:true,sub:'vaincue en 1870-1871',dy:-12}),L(43,10.5,51.3,'Allemagne',{nomark:true,sub:'unifiée en 1871',dx:10,al:'left'}),L(44,12.5,42.5,'Italie',{nomark:true,sub:'unifiée en 1861-1870',dx:10,al:'left',dy:10})
 ],
 pulses:[Pu(25,32.4,30.6,'#ffd166',true)],
 ph:[
  Ph(0,'1815 : de vieux empires','Après 1815, l’Espagne et le Portugal perdent presque toute l’Amérique, devenue indépendante. Le Royaume-Uni domine les mers : il tient l’Inde, le Canada, l’Australie, Le Cap. La France ne garde que de « vieilles colonies » : Antilles, Guyane, Réunion, comptoirs du Sénégal et de l’Inde.','gbr'),
  Ph(9,'L’Europe des usines','La révolution industrielle change tout. Les usines d’Europe ont besoin de matières premières (coton, caoutchouc, huile de palme, métaux) et de clients pour leurs produits : les débouchés. Les colonies doivent fournir les unes et acheter les autres.','eur'),
  Ph(18,'La vapeur et le canal de Suez','Les navires à vapeur ne dépendent plus du vent. En 1869, le canal de Suez relie la Méditerranée à la mer Rouge : de Londres à Bombay, la route passe d’environ 19 800 km à 11 600 km. Mais un vapeur doit charger du charbon : chaque puissance veut des ports d’escale sur toutes les mers.','gbr'),
  Ph(34,'Des points d’appui jusqu’au Pacifique','Gibraltar, Aden, Singapour pour les Britanniques ; Dakar, Saïgon, Nouméa pour les Français. La Nouvelle-Calédonie, prise en 1853, sert de base maritime et militaire à la France dans le Pacifique.','fra'),
  Ph(41,'Puissance et prestige','Posséder des colonies, c’est compter parmi les grandes puissances. La France, battue par la Prusse en 1870-1871, veut retrouver son rang. L’Allemagne et l’Italie, tout juste unifiées, réclament à leur tour leur part.','eur'),
  Ph(49,'« Civiliser » : l’argument de l’époque','Beaucoup d’Européens se croient alors supérieurs aux autres peuples et prétendent leur apporter « la civilisation ». Cette idée est fausse et raciste : elle sert à justifier la conquête. Dès 1885, des députés comme Clemenceau la combattent.','ame')
 ],
 photos:[Sh('suezchantier',18,28,'tr',2),Sh('hongkong1870',28,34,'bl',-2),Sh('prise1853',35,41,'tr',2,'contain'),Sh('stanley',49,58,'bl',-2)],
 legend:[[GB,'Royaume-Uni (possessions vers 1815, schéma)'],[F,'France'],[ES,'Espagne'],[NL,'Pays-Bas'],[PT,'Portugal (côtes)']],
 mots:[['Colonie','Territoire conquis et dirigé par un État étranger, la métropole.'],['Métropole','L’État qui possède des colonies.'],['Matière première','Produit brut (coton, minerai, caoutchouc) transformé par l’industrie.'],['Débouché','Territoire où un pays vend ses produits.'],['Point d’appui','Port où une marine se ravitaille en charbon et répare ses navires.'],['Impérialisme','Politique d’un État qui cherche à dominer d’autres territoires.']],
 q:[['Citer deux besoins des usines d’Europe.','Des matières premières et des débouchés (des clients).'],['Que change le canal de Suez en 1869 ?','Il raccourcit d’environ 40 % la route de l’Europe vers l’Inde et l’Asie.'],['Pourquoi les marines veulent-elles des ports partout ?','Pour charger du charbon et réparer les navires à vapeur.'],['Quel argument de l’époque sert à justifier la conquête ?','L’idée, fausse, que les Européens seraient supérieurs et devraient « civiliser » les autres peuples.']],
 wiki:['Colonisation','Canal de Suez','Révolution industrielle','Impérialisme'],
 fs:{niv:'4e',pb:'Pourquoi les États européens se lancent-ils dans la conquête du monde au XIXe siècle ?',
  but:'Faire comprendre que la colonisation du XIXe siècle naît de l’industrialisation, de la rivalité entre États et d’une idéologie de supériorité.',
  notions:['colonie, métropole','impérialisme','débouché, matière première','point d’appui'],
  comp:['Se repérer dans l’espace : situer des lieux et des espaces les uns par rapport aux autres','Raisonner : construire des hypothèses d’interprétation'],
  meth:'Lire une carte animée et la mettre en relation avec un texte court.',
  accroche:'Projeter l’étape « La vapeur et le canal de Suez » sans le son : « Pourquoi creuser un canal dans le désert ? »',
  act:['Carte animée, étapes 1 à 4 (pause à chaque étape) : relever sur le cahier trois raisons de coloniser.','Gravure du chantier de Suez : identifier le document (nature, date), dire ce qu’il montre des moyens techniques.','Classer les raisons relevées : économiques, politiques, idéologiques (tableau à trois colonnes construit avec la classe).'],
  fin:'Les Européens colonisent pour trois séries de raisons : économiques (matières premières, débouchés), politiques (puissance, points d’appui) et idéologiques (la prétendue « mission civilisatrice »).',
  suite:'Lien avec la séance suivante : la France construit un deuxième empire colonial.'}},

/* 2 --------------------------------------------------------------- */
{short:'L’empire colonial français',col:'fra',dur:60,when:[1830,1914],dates:'1830 – 1914',proj:'plan',
 cam:[cam(0,6,34,1.25),cam(7,6,34,1.25),W(13),W(20),cam(26,60,12,0.62),cam(36,60,12,0.62),cam(42,12,8,0.9),cam(52,12,8,0.9),W(56),W(60)],
 zones:ZS([
  Z('FRA',F,0,0.5),Z('DZA',F,2),
  C(-149.5,-17.6,1.8,F,9),C(-140,-9.2,1.6,F,9),Z('NCL',F,11),
  C(-16.6,15.3,2.2,F,14),C(106.6,10.6,2,F,16),Z('KHM',F,17.5),
  Z('TUN',F,21),Z('VNM',F,23),Z('LAO',F,25),
  Z('SEN MRT MLI GIN CIV BFA NER BEN',F,29),Z('GAB COG CAF TCD',F,32),Z('MDG COM',F,34),Z('DJI',F,35),
  Z('MAR',F,44)
 ]),
 routes:[],
 labels:[
  L(2,3.06,36.75,'Alger',{mark:'ville',sub:'1830',gold:true,dy:-12,end:20}),L(4,3,29,'Algérie',{nomark:true,big:true,end:54}),
  L(9,-149.57,-17.54,'Tahiti',{sub:'protectorat, 1842',dy:16,end:20}),L(11,NC[0],NC[1],'Nouvelle-Calédonie',{mark:'star',gold:true,sub:'1853',dx:10,al:'left'}),
  L(14,-16.5,16.03,'Sénégal',{sub:'Faidherbe, 1854-1865',dx:-10,al:'right',end:26}),L(16,106.7,10.78,'Saïgon',{mark:'ville',sub:'1859',dx:10,al:'left',end:26}),
  L(21,10.18,36.8,'Tunisie',{sub:'protectorat, 1881',dx:10,al:'left',dy:-8,end:54}),L(23,105.85,21.03,'Tonkin',{sub:'1883-1885',dx:10,al:'left',end:40}),L(25,104,15.5,'Indochine',{nomark:true,big:true,sub:'Union indochinoise, 1887'}),
  L(29,-4,15,'Afrique-Occidentale française',{nomark:true,big:true,sub:'AOF, 1895'}),L(30,1.99,7.18,'Abomey',{mark:'site',sub:'Dahomey, 1894',dy:16,zmin:0.8}),
  L(32,19,-1,'Afrique-Équatoriale française',{nomark:true,sub:'AEF, 1910',end:54,dy:22}),L(34,47.5,-18.9,'Madagascar',{sub:'1895-1896',dx:10,al:'left'}),L(35,43.15,11.59,'Djibouti',{mark:'port',dx:10,al:'left',zmin:0.6,end:54}),
  L(44,-6,32,'Maroc',{sub:'protectorat, 1912',dx:-10,al:'right',gold:true})
 ],
 pulses:[Pu(2,3.06,36.75,'#7cb7ff',true),Pu(11,NC[0],NC[1],'#ffd166',true)],
 ph:[
  Ph(0,'1830 : Alger','En 1830, l’armée française prend Alger. La conquête de l’Algérie dure plus de quarante ans : l’émir Abd el-Kader résiste jusqu’en 1847, la Kabylie se soulève encore en 1871. Des colons s’installent : c’est une colonie de peuplement.','fra'),
  Ph(8,'Des îles et des ports','Sous Louis-Philippe puis Napoléon III, la marine installe la France dans le Pacifique (Tahiti en 1842, la Nouvelle-Calédonie en 1853), au Sénégal avec Faidherbe et en Cochinchine, autour de Saïgon (1859-1862).','fra'),
  Ph(20,'La République coloniale','Après 1880, la IIIe République relance les conquêtes, défendues par Jules Ferry : protectorat sur la Tunisie (1881), guerre du Tonkin (1883-1885). L’Union indochinoise naît en 1887.','fra'),
  Ph(28,'L’Afrique, de Dakar à Djibouti','Des colonnes militaires avancent vers l’intérieur du continent. Les royaumes qui résistent sont vaincus : Béhanzin au Dahomey (1894), Samory Touré (1898). Madagascar est annexée en 1896. Les territoires sont regroupés en deux fédérations : l’AOF (1895) et l’AEF (1910).','fra'),
  Ph(42,'1912 : le Maroc','Dernière grande conquête : le Maroc devient un protectorat en 1912, après deux crises avec l’Allemagne (1905 et 1911).','fra'),
  Ph(52,'1914 : le deuxième empire du monde','En 1914, l’empire colonial français couvre plus de 10 millions de km², presque vingt fois la métropole. Environ 50 millions de personnes y vivent : très peu sont citoyens.','eur')
 ],
 photos:[Sh('ferry',20,28,'tr',2,'contain'),Sh('behanzin',29,36,'bl',-2,'contain'),Sh('prise1853',10,16,'tr',2,'contain'),Sh('hautcom',52,60,'bl',-2)],
 legend:[[F,'Territoires sous domination française (frontières actuelles)']],
 mots:[['Protectorat','Territoire qui garde son souverain mais passe sous le contrôle d’une puissance étrangère.'],['Colonie de peuplement','Colonie où s’installent de nombreux habitants venus de la métropole (Algérie, Nouvelle-Calédonie).'],['Colonie d’exploitation','Colonie dont on tire surtout des produits, avec peu de colons.'],['AOF, AEF','Afrique-Occidentale et Afrique-Équatoriale françaises : deux fédérations de colonies.'],['Indochine','Ensemble formé par le Viêt Nam, le Cambodge et le Laos actuels.']],
 q:[['Par quelle conquête commence le deuxième empire colonial français ?','Par la prise d’Alger, en 1830.'],['Quelle différence entre une colonie et un protectorat ?','Dans un protectorat, le souverain local reste en place, mais la puissance étrangère contrôle le pays.'],['Citer deux chefs qui ont résisté à la conquête française.','Par exemple Abd el-Kader, Béhanzin, Samory Touré.'],['Quelle est la taille de l’empire en 1914 ?','Plus de 10 millions de km² et environ 50 millions d’habitants.']],
 wiki:['Second empire colonial français','Conquête de l’Algérie par la France','Indochine française','Afrique-Occidentale française'],
 fs:{niv:'4e',pb:'Comment la France s’est-elle constitué, en moins d’un siècle, le deuxième empire colonial du monde ?',
  but:'Faire construire les repères de la conquête française et faire confronter deux points de vue d’époque sur la colonisation.',
  notions:['colonie de peuplement, colonie d’exploitation','protectorat','empire colonial'],
  comp:['Se repérer dans le temps : ordonner des faits les uns par rapport aux autres','Analyser et comprendre un document : identifier le document et son point de vue particulier'],
  meth:'Confronter deux discours politiques (Ferry, Clemenceau, juillet 1885).',
  accroche:'Portrait de Jules Ferry déjà vu en EMC (l’école gratuite, laïque, obligatoire) : « Le même homme défend la conquête coloniale. Avec quels arguments ? »',
  act:['Carte animée, en entier : compléter une frise (1830, 1853, 1881, 1887, 1895, 1912).','Enquête, page « Ferry contre Clemenceau » : identifier chaque auteur et son point de vue, relever un argument de chacun.','Débat réglé de cinq minutes : quels arguments de Clemenceau répondent à ceux de Ferry ?'],
  fin:'De 1830 à 1914, la France conquiert un empire de plus de 10 millions de km², par les armes, en Afrique, en Asie et dans le Pacifique. Cette politique est défendue par Jules Ferry et contestée, dès 1885, par des députés comme Clemenceau.',
  suite:'Lien avec la séance suivante : en Afrique, la France n’est pas seule.'}},

/* 3 --------------------------------------------------------------- */
{short:'Le partage de l’Afrique',col:'afr',dur:60,when:[1880,1914],dates:'1880 – 1914',proj:'plan',
 cam:[AF(0),AF(9),cam(13,14,26,0.72),cam(21,14,26,0.72),AF(26),AF(60)],
 zones:ZS([
  Z('DZA',F,1,0.4),C(-16.8,15,2,F,1.5),Z('ZAF',GB,2.5,0.4),C(-1,5.8,1.6,GB,3),C(3.5,6.6,1.2,GB,3),Z('AGO MOZ',PT,4,0.25),
  Z('COD',BE,19),
  Z('TUN MRT SEN MLI GIN CIV BFA NER BEN TCD CAF COG GAB MDG DJI',F,26),Z('MAR',F,44),
  Z('EGY SDN SSD KEN UGA NGA GHA SLE GMB ZMB ZWE MWI BWA LSO SWZ XSO',GB,29),
  Z('TGO CMR NAM TZA RWA BDI',DE,32),Z('AGO MOZ GNB',PT,34),Z('ERI SOM',IT,35),Z('LBY',IT,45),Z('ESH GNQ',ES,36),
  Z('ETH LBR',IND,47,0.7)
 ]),
 routes:[
  r(F,37,42,2.4,[[-17.4,14.7],[-4,14],[10,13],[22,11],[32.1,9.9]],{dash:true,straight:true,step:1}),
  r(GB,38,43,2.4,[[31.2,30],[32.5,15.5],[32.1,9.9],[30,-3],[28,-15],[25,-26],[18.4,-33.9]],{dash:true,straight:true,step:1})
 ],
 labels:[
  L(1,3.06,36.75,'Alger',{mark:'ville',dy:-10,end:25}),L(2.5,18.42,-33.92,'Le Cap',{mark:'ville',dx:10,al:'left',end:25}),L(5,20,6,'Royaumes et peuples indépendants',{nomark:true,big:true,end:12}),
  L(14,13.4,52.5,'Berlin',{mark:'ville',gold:true,sub:'conférence, 1884-1885',dx:10,al:'left',end:24}),
  L(19,23,-3,'État indépendant du Congo',{nomark:true,sub:'à Léopold II, roi des Belges',end:45}),
  L(27,-2,17,'France',{nomark:true,big:true}),L(29,31,22,'Royaume-Uni',{nomark:true,big:true}),L(32,35,-7,'Allemagne',{nomark:true,end:45}),L(32.5,17,-22,'Allemagne',{nomark:true,end:45}),
  L(34,18,-12.5,'Portugal',{nomark:true,end:45}),L(35,46,3,'Italie',{nomark:true,dx:8,al:'left',end:45}),
  L(40,32.11,9.89,'Fachoda',{mark:'site',gold:true,sub:'1898',dx:10,al:'left'}),
  L(47,38.9,14.17,'Adoua',{mark:'site',sub:'1896',dx:10,al:'left'}),L(48,40,8,'Éthiopie',{nomark:true,big:true}),L(49,-9.4,6.4,'Liberia',{nomark:true,dx:-8,al:'right',dy:14}),
  L(51,28.35,-28.36,'Isandlwana',{mark:'site',sub:'1879',dx:10,al:'left'}),L(52,17,-21,'Herero et Nama',{nomark:true,sub:'1904-1908',dy:22})
 ],
 pulses:[Pu(14,13.4,52.5,'#ffd166',true),Pu(40,32.11,9.89,'#ff6b57',true),Pu(47,38.9,14.17,'#a3e635',true)],
 ph:[
  Ph(0,'1880 : un continent encore indépendant','Vers 1880, les Européens ne tiennent que des côtes : l’Algérie, Le Cap, des comptoirs. Environ un dixième du continent est colonisé. Ailleurs vivent des royaumes, des empires et des peuples indépendants.','afr'),
  Ph(12,'1884-1885 : la conférence de Berlin','À l’invitation du chancelier Bismarck, quatorze États se réunissent à Berlin. Aucun Africain n’est invité. Ils fixent des règles : commerce libre sur le Congo et le Niger ; pour réclamer une côte, il faut l’occuper réellement. Le bassin du Congo est confié au roi des Belges, Léopold II.','eur'),
  Ph(25,'La course','La conférence n’a pas découpé l’Afrique, mais elle accélère la conquête. En vingt ans, à coups d’expéditions militaires et de traités, les puissances se partagent le continent. Les frontières sont tracées en Europe, souvent en ligne droite, sans tenir compte des peuples.','fra'),
  Ph(37,'1898 : Fachoda','Les Français veulent relier Dakar à Djibouti, les Britanniques Le Caire au Cap. Les deux projets se croisent à Fachoda, sur le Nil. La guerre menace ; la France recule.','gbr'),
  Ph(46,'Résister','Partout, des Africains résistent. En 1896, à Adoua, l’armée de l’empereur Ménélik II bat les Italiens : l’Éthiopie reste indépendante. Les Zoulous battent les Britanniques à Isandlwana (1879). En Afrique du Sud-Ouest, l’armée allemande écrase la révolte des Herero et des Nama (1904-1908) : des dizaines de milliers de morts.','neo'),
  Ph(54,'1914 : un continent colonisé','En 1914, seuls l’Éthiopie et le Liberia sont indépendants. Environ neuf dixièmes de l’Afrique appartiennent à sept États européens.','afr')
 ],
 photos:[Sh('stanley',4,12,'tr',2),Sh('behanzin',26,33,'tr',2,'contain'),Sh('zoulou1879',46,54,'tr',2,'contain')],
 legend:[[F,'France'],[GB,'Royaume-Uni'],[DE,'Allemagne'],[BE,'Belgique (Congo)'],[PT,'Portugal'],[IT,'Italie'],[ES,'Espagne'],[IND,'États indépendants en 1914']],
 mots:[['Conférence de Berlin','Réunion de quatorze États (1884-1885) qui fixe les règles de la colonisation de l’Afrique.'],['Occupation effective','Règle de Berlin : pour réclamer un territoire, il faut y être réellement présent.'],['Traité','Accord écrit ; beaucoup de chefs africains signent sans que le texte leur soit bien traduit.'],['Résistance','Action de ceux qui refusent la conquête, par les armes ou autrement.']],
 q:[['Quelle part de l’Afrique est colonisée vers 1880 ? et en 1914 ?','Environ un dixième vers 1880, environ neuf dixièmes en 1914.'],['Qui participe à la conférence de Berlin ?','Quatorze États, presque tous européens ; aucun Africain.'],['Quels États africains restent indépendants en 1914 ?','L’Éthiopie et le Liberia.'],['Que se passe-t-il à Adoua en 1896 ?','L’armée éthiopienne de Ménélik II bat l’armée italienne.']],
 wiki:['Partage de l’Afrique','Conférence de Berlin','Crise de Fachoda','Bataille d’Adoua'],
 fs:{niv:'4e',pb:'Comment un continent presque entièrement indépendant en 1880 est-il colonisé en une génération ?',
  but:'Faire décrire et expliquer le partage de l’Afrique à partir de deux cartes et d’un texte juridique.',
  notions:['conférence de Berlin','occupation effective','résistance'],
  comp:['Se repérer dans l’espace : nommer, localiser et caractériser des espaces','Pratiquer différents langages : réaliser une production cartographique'],
  meth:'Comparer deux états d’une même carte (1880, 1914) ; compléter un croquis.',
  accroche:'Mettre la carte en pause à 1880, puis à 1914 : « Que s’est-il passé entre ces deux images ? »',
  act:['Comparer les deux cartes : décrire (qui possède quoi), formuler une hypothèse d’explication.','Enquête, page « L’Acte de Berlin » : relever la règle de l’occupation effective, dire qui est absent de la conférence.','Croquis : sur le fond de carte muet (export PDF), colorier les empires français et britannique, placer Fachoda, l’Éthiopie, le Liberia ; légende organisée.'],
  fin:'Entre 1880 et 1914, sept États européens se partagent presque toute l’Afrique. La conférence de Berlin (1884-1885) fixe les règles entre eux, sans les Africains. Des peuples résistent ; seuls l’Éthiopie et le Liberia restent indépendants.',
  suite:'Lien avec la séance suivante : le monde entier en 1914.'}},

/* 4 --------------------------------------------------------------- */
{short:'L’Empire britannique et le monde en 1914',col:'gbr',dur:58,when:[1815,1914],dates:'1815 – 1914',proj:'plan',
 cam:[W(0),W(8),cam(13,78,20,0.85),cam(20,78,20,0.85),W(25),W(58)],
 zones:ZS([
  Z('GBR IRL',GB,0,0.5),Z('IND PAK BGD MMR LKA',GB,9),Z('CAN AUS NZL ZAF',GB,21),
  Z('EGY SDN SSD KEN UGA NGA GHA SLE GMB ZMB ZWE MWI BWA LSO SWZ XSO MYS BRN GUY BLZ JAM BHS FJI SLB CYP',GB,30),Rg(NG_GB,GB,30,0.62,2),
  Z('FRA DZA TUN MAR MRT SEN MLI GIN CIV BFA NER BEN TCD CAF COG GAB MDG DJI VNM KHM LAO NCL',F,40),
  Z('TGO CMR NAM TZA RWA BDI',DE,42),Rg(NG_DE,DE,42,0.62,2),Z('COD',BE,43),Z('AGO MOZ GNB TLS',PT,43.5),Z('IDN SUR',NL,44),Z('ERI SOM LBY',IT,44.5),Z('ESH GNQ',ES,45),
  Z('PHL PRI',US,46),C(-157.5,20.6,2.4,US,46),Z('KOR PRK TWN',JP,47)
 ]),
 routes:[vap(GB,30,39,SUEZ.concat([[75,10],[80,5.4],[92,6],[98,5],[103.9,1.2],[108,8],[114,21.9]]),{nosea:true})],
 labels:[
  L(0,-2,54,'Royaume-Uni',{nomark:true,dx:-10,al:'right'}),
  L(9,79,22,'Empire des Indes',{nomark:true,big:true,sub:'à la Couronne depuis 1858'}),L(11,77.2,28.6,'Delhi',{mark:'ville',dx:10,al:'left',zmin:0.7}),L(12,88.36,22.57,'Calcutta',{mark:'ville',dx:10,al:'left',zmin:0.7}),
  L(21,-100,57,'Canada',{nomark:true,sub:'dominion, 1867'}),L(22,128,-24,'Australie',{nomark:true,sub:'1901',end:50}),L(23,172,-42,'Nouvelle-Zélande',{nomark:true,sub:'1907',dx:8,al:'left',dy:10}),L(24,24,-30,'Afrique du Sud',{nomark:true,sub:'1910',dy:16}),
  L(31,-5.35,36.14,'Gibraltar',{mark:'port',dx:-8,al:'right',dy:10,end:40}),L(32,32.4,30.6,'Suez',{mark:'port',sub:'Égypte occupée, 1882',dx:10,al:'left',dy:-10,end:40}),L(33,45.03,12.8,'Aden',{mark:'port',dy:16,end:40}),
  L(35,103.85,1.29,'Singapour',{mark:'port',sub:'1819',dy:16,end:40}),L(37,114.17,22.3,'Hong Kong',{mark:'port',sub:'1842',dx:10,al:'left',end:40}),
  L(40,2,18,'Empire français',{nomark:true,big:true}),L(44,113,-2,'Indes néerlandaises',{nomark:true}),L(46,121,13,'Philippines',{sub:'États-Unis, 1898',dx:10,al:'left',nomark:true}),
  L(47,127.5,37,'Corée',{sub:'Japon, 1910',dx:10,al:'left',nomark:true}),L(52,NC[0],NC[1],'Nouvelle-Calédonie',{mark:'star',gold:true,dx:-10,al:'right',dy:16})
 ],
 pulses:[],
 ph:[
  Ph(0,'La première puissance du monde','Le Royaume-Uni est le pays de la révolution industrielle. Sa marine, la Royal Navy, contrôle les mers. Son empire grandit pendant tout le XIXe siècle.','gbr'),
  Ph(8,'L’Inde, « joyau de la Couronne »','L’Inde est d’abord conquise par une entreprise, la Compagnie des Indes orientales. Après la grande révolte de 1857, l’État britannique la gouverne directement. En 1876, la reine Victoria devient impératrice des Indes.','gbr'),
  Ph(20,'Les dominions','Dans les colonies de peuplement, où vivent beaucoup de Britanniques, Londres accorde l’autonomie : Canada (1867), Australie (1901), Nouvelle-Zélande (1907), Afrique du Sud (1910). Les peuples premiers, Aborigènes ou Maoris, y sont dépossédés de leurs terres.','gbr'),
  Ph(29,'La route des Indes','Gibraltar, Malte, Suez, Aden, Singapour, Hong Kong : une chaîne de ports relie Londres à l’Asie. Pour protéger le canal de Suez, l’armée britannique occupe l’Égypte en 1882.','gbr'),
  Ph(39,'Les autres empires','La France a le deuxième empire. Viennent ensuite l’Allemagne, la Belgique, le Portugal, les Pays-Bas, l’Italie. Deux puissances non européennes s’y ajoutent : les États-Unis (Philippines, Hawaï, 1898) et le Japon (Taïwan en 1895, Corée en 1910).','eur'),
  Ph(50,'1914 : un monde dominé','En 1914, l’Empire britannique couvre environ 33 millions de km² et rassemble plus de 400 millions de personnes : près d’un humain sur quatre. Les rivalités coloniales (Fachoda en 1898, le Maroc en 1905 et 1911) nourrissent les tensions qui mènent à la Première Guerre mondiale.','ame')
 ],
 photos:[Sh('hongkong1870',29,39,'tr',2),Sh('suezchantier',30,36,'bl',-2),Sh('maori1880',20,28,'tr',2,'contain')],
 legend:[[GB,'Royaume-Uni'],[F,'France'],[DE,'Allemagne'],[NL,'Pays-Bas'],[PT,'Portugal'],[BE,'Belgique'],[IT,'Italie'],[ES,'Espagne'],[US,'États-Unis'],[JP,'Japon']],
 mots:[['Dominion','Colonie de peuplement britannique devenue autonome (Canada, Australie…).'],['Compagnie des Indes','Entreprise de commerce britannique qui gouverne l’Inde jusqu’en 1858.'],['Royal Navy','La marine de guerre britannique.'],['Rivalité coloniale','Concurrence entre États pour posséder des territoires.']],
 q:[['Quelle est la colonie la plus importante de l’Empire britannique ?','L’Inde, gouvernée directement par l’État britannique à partir de 1858.'],['Qu’est-ce qu’un dominion ?','Une colonie de peuplement devenue autonome, comme le Canada ou l’Australie.'],['Pourquoi les Britanniques occupent-ils l’Égypte en 1882 ?','Pour contrôler le canal de Suez, sur la route des Indes.'],['Quelles puissances non européennes ont des colonies en 1914 ?','Les États-Unis et le Japon.']],
 wiki:['Empire britannique','Raj britannique','Dominion','Empires coloniaux'],
 fs:{niv:'4e',pb:'En quoi les empires coloniaux montrent-ils, en 1914, la domination de l’Europe sur le monde ?',
  but:'Faire lire un planisphère des empires en 1914 et en faire dégager une vue d’ensemble (mise en perspective des études de cas).',
  notions:['empire colonial','dominion','rivalités coloniales'],
  comp:['Se repérer dans l’espace : nommer et localiser les grands repères géographiques','Pratiquer différents langages : écrire pour construire sa pensée'],
  meth:'Passer de l’étude de cas (Nouvelle-Calédonie, Afrique) à la généralisation : rédiger un court texte à partir d’une carte.',
  accroche:'Carte finale du chapitre : « L’empire sur lequel le soleil ne se couche jamais » : que veut dire cette expression ?',
  act:['Planisphère de 1914 : nommer les deux plus grands empires, repérer les nouveaux venus (États-Unis, Japon).','Carte animée, étape « La route des Indes » : expliquer le rôle des ports d’escale.','Rédiger cinq lignes : « En 1914, l’Europe domine le monde. » (avec deux exemples localisés et un chiffre).'],
  fin:'En 1914, quelques États, presque tous européens, dominent la plus grande partie du monde. L’Empire britannique rassemble près d’un quart de l’humanité ; l’empire français est le deuxième. Ces rivalités aggravent les tensions entre puissances.',
  suite:'Lien avec la séance suivante : le Pacifique et la Nouvelle-Calédonie dans ce partage.'}},

/* 5 --------------------------------------------------------------- */
{short:'Le Pacifique partagé',col:'kan',dur:60,when:[1840,1906],dates:'1840 – 1906',proj:'plan',
 cam:[PA(0),PA(46),cam(50,165.9,-21.3,15),cam(57,165.9,-21.3,15),PA(60)],
 zones:ZS([
  Z('AUS',GB,0,0.45),Z('IDN',NL,0,0.45),Z('PHL',ES,0,0.45),
  Z('NZL',GB,3),B(-149.5,-17.6,2.6,F,7),B(-140,-9.3,2.4,F,7.5),Z('NCL',F,10),ext(B(165.9,-21.2,3,F,10),{t2:46,t3:48}),
  Z('FJI',GB,16),B(178.6,-17.8,2.8,GB,16),Rg(NG_DE,DE,21,0.62,2),Rg(NG_GB,GB,21,0.62,2),B(169.6,7.5,3.6,DE,23),B(166.93,-0.52,1.3,DE,23),
  B(-177,-13.8,1.9,F,27),B(175.5,-2.5,4.2,GB,28),Z('SLB',GB,28.5),B(160,-9.2,4,GB,28.5,0.4),
  Z('PHL',US,31),B(144.8,13.5,1.5,US,31),B(-157.5,20.6,3.6,US,32),B(-170.4,-14.4,1.1,US,34),Z('WSM',DE,34),B(-172.5,-13.6,1.1,DE,34),
  {k:'poly',ring:[[131,7],[137,12],[143,21],[148,20.5],[147,14.5],[163.5,9],[162.5,3],[135,2.5]],col:DE,a:0.5,t0:35,fade:2,nostroke:true},
  B(-175.1,-20.3,2.4,GB,38,0.35),Z('VUT',IND,40,0.65),ext(B(168.2,-16.6,3,IND,40,0.5),{t2:46,t3:48})
 ]),
 routes:[vap(F,48,56,[[151.3,-33.9],[156,-30],[162,-25],[166.3,-22.5]])],
 labels:[
  L(0,134,-25,'Australie',{nomark:true,sub:'britannique depuis 1788'}),L(0.5,121,13,'Philippines',{nomark:true,sub:'espagnoles',end:30,dx:-8,al:'right'}),
  L(3,174.08,-35.27,'Waitangi',{mark:'site',sub:'traité, 1840',dx:10,al:'left',gold:true}),
  L(7,-149.57,-17.54,'Tahiti',{sub:'protectorat français, 1842',dy:16,end:30}),L(8,-140.1,-8.9,'Marquises',{sub:'1842',dx:10,al:'left',dy:-8,end:30}),
  L(10,NC[0],NC[1],'Nouvelle-Calédonie',{mark:'star',gold:true,sub:'24 septembre 1853',dx:-10,al:'right',dy:14,end:49}),
  L(16,178.83,-17.68,'Fidji',{sub:'britanniques, 1874',dx:10,al:'left',dy:10,end:37}),
  L(21,144.5,-4.2,'Nouvelle-Guinée allemande',{nomark:true,sub:'1884',dy:-16,end:47}),L(21.5,146,-9.8,'Papouasie britannique',{nomark:true,sub:'1884',dy:18,end:47}),
  L(23,169.6,5.9,'Marshall',{sub:'Allemagne, 1885',dx:10,al:'left',end:37}),L(27,-176.17,-13.28,'Wallis-et-Futuna',{sub:'protectorat français, 1887-1888',dx:10,al:'left',dy:-12,end:37}),
  L(28,173,1.4,'Gilbert et Ellice',{sub:'Royaume-Uni, 1892',dx:10,al:'left',dy:-10,end:37}),
  L(31,120.98,14.6,'Manille',{mark:'ville',sub:'États-Unis, 1898',dx:-10,al:'right',dy:14}),L(32,-157.86,21.3,'Hawaï',{sub:'annexé par les États-Unis, 1898',dy:-14}),
  L(34,-171.77,-13.83,'Samoa',{sub:'partagées en 1899',dx:10,al:'left',dy:12}),L(35,150,9,'Carolines, Mariannes',{nomark:true,sub:'vendues à l’Allemagne, 1899',dy:-18}),
  L(38,-175.2,-21.14,'Tonga',{sub:'royaume protégé, 1900',dx:10,al:'left',dy:14}),L(40,168.32,-17.74,'Nouvelles-Hébrides',{sub:'condominium, 1906',dx:10,al:'left',dy:-12}),
  L(51,166.44,-22.27,'Nouméa',{mark:'port',gold:true,sub:'base navale, chef-lieu',dx:-10,al:'right',zmin:6}),L(52,165.25,-21.55,'Bourail',{mark:'site',sub:'centre pénitentiaire',dx:-10,al:'right',zmin:6}),L(53,166.22,-21.61,'Thio',{mark:'mine',sub:'nickel',dx:10,al:'left',zmin:6}),L(54,164.4,-20.3,'Balade',{mark:'site',sub:'1853',dx:10,al:'left',zmin:6})
 ],
 pulses:[Pu(10,NC[0],NC[1],'#ffd166',true)],
 ph:[
  Ph(0,'Un océan convoité','Vers 1840, les Européens ne tiennent dans le Pacifique que l’Australie (britannique), les Philippines (espagnoles) et les Indes néerlandaises. Baleiniers, santaliers et missionnaires parcourent déjà les îles.','eur'),
  Ph(3,'1840-1853 : Britanniques et Français','En 1840, des chefs maoris et les Britanniques signent le traité de Waitangi : pour Londres, la Nouvelle-Zélande devient une colonie. La France réplique : protectorat sur Tahiti (1842), puis prise de possession de la Nouvelle-Calédonie, le 24 septembre 1853.','fra'),
  Ph(15,'1874-1888 : la ruée','Les Fidji sont cédées au Royaume-Uni en 1874. En 1884, l’Allemagne et le Royaume-Uni se partagent l’est de la Nouvelle-Guinée. Wallis-et-Futuna devient protectorat français en 1887-1888.','gbr'),
  Ph(30,'1898-1899 : les États-Unis et l’Allemagne','En 1898, les États-Unis battent l’Espagne : ils prennent les Philippines et Guam, et annexent Hawaï. En 1899, les Samoa sont partagées entre l’Allemagne et les États-Unis ; l’Espagne vend ses dernières îles à l’Allemagne.','pol'),
  Ph(37,'1906 : plus une île libre','Les Tonga gardent leur roi, sous protection britannique (1900). En 1906, Français et Britanniques gouvernent ensemble les Nouvelles-Hébrides, le futur Vanuatu : c’est un condominium. Tout le Pacifique est partagé.','kan'),
  Ph(47,'La Nouvelle-Calédonie, une base française','À mi-chemin entre l’Australie et Tahiti, la colonie sert de base maritime et militaire. La France y envoie des forçats à partir de 1864, y installe des colons et y exploite le nickel. Les Kanak sont repoussés dans des réserves.','fra')
 ],
 photos:[Sh('maori1880',3,10,'tr',2,'contain'),Sh('prise1853',10,16,'bl',-2,'contain'),Sh('levuka',16,24,'tr',2),Sh('blackbirding',24,30,'bl',-2),Sh('hautcom',47,54,'tr',2),Sh('forcats',54,60,'bl',-2)],
 legend:[[GB,'Royaume-Uni'],[F,'France'],[DE,'Allemagne'],[US,'États-Unis'],[NL,'Pays-Bas'],[ES,'Espagne (jusqu’en 1898-1899)'],[IND,'Condominium franco-britannique']],
 mots:[['Prise de possession','Acte par lequel un État déclare qu’une terre lui appartient.'],['Protectorat','Territoire qui garde son souverain mais passe sous le contrôle d’une puissance étrangère.'],['Condominium','Territoire gouverné par deux États à la fois.'],['Base navale','Port où stationnent et se ravitaillent des navires de guerre.'],['Annexion','Rattachement d’un territoire à un État, par la force ou par un traité.']],
 q:[['Quel traité fait de la Nouvelle-Zélande une colonie britannique ?','Le traité de Waitangi, en 1840.'],['Quand la France prend-elle possession de la Nouvelle-Calédonie ?','Le 24 septembre 1853.'],['Quelles nouvelles puissances arrivent dans le Pacifique à la fin du siècle ?','L’Allemagne (1884) et les États-Unis (1898).'],['Qu’est-ce que le condominium des Nouvelles-Hébrides ?','Un territoire gouverné à la fois par la France et le Royaume-Uni, à partir de 1906.']],
 wiki:['Colonisation de l’Océanie','Traité de Waitangi','Condominium des Nouvelles-Hébrides','Histoire de la Nouvelle-Calédonie'],
 fs:{niv:'4e',pb:'Pourquoi la France s’installe-t-elle en Nouvelle-Calédonie, et que devient le Pacifique entre 1840 et 1906 ?',
  but:'Replacer la prise de possession de 1853 dans la rivalité des puissances et montrer le rôle de base maritime et militaire de la colonie.',
  notions:['prise de possession','protectorat, condominium','base maritime et militaire'],
  comp:['Se repérer dans le temps : mettre en relation des faits d’une époque donnée','Raisonner : poser des questions à propos d’une situation historique'],
  meth:'Changer d’échelle : du Pacifique à la Nouvelle-Calédonie.',
  accroche:'Carte du Pacifique en 1840, presque vide de couleurs : « Dans soixante ans, il ne restera plus une île libre. Qui va les prendre ? »',
  act:['Carte animée : compléter un tableau « date, territoire, puissance » (six lignes).','Enquête, page « Pourquoi la Nouvelle-Calédonie ? » : relever dans le texte les raisons de la prise de possession.','Changement d’échelle : zoom final sur la Grande Terre ; localiser Nouméa, Balade, Bourail, Thio et dire à quoi sert chaque lieu.'],
  fin:'Entre 1840 et 1906, le Royaume-Uni, la France, l’Allemagne et les États-Unis se partagent tout le Pacifique. La France prend la Nouvelle-Calédonie en 1853 pour disposer d’une base face aux Britanniques ; elle en fait une colonie pénitentiaire et de peuplement.',
  suite:'Lien avec la séance suivante : comment vit-on dans une société coloniale ?'}},

/* 6 --------------------------------------------------------------- */
{short:'Sociétés coloniales : dominer, résister',col:'ame',dur:60,when:[1850,1914],dates:'1850 – 1914',proj:'plan',
 cam:[W(0),W(20),cam(25,165.9,-21.3,15),cam(34,165.9,-21.3,15),W(39),W(60)],
 zones:ZS([
  Z('DZA TUN MAR MRT SEN MLI GIN CIV BFA NER BEN TCD CAF COG GAB MDG DJI VNM KHM LAO NCL',F,0,0.45),
  Z('IND PAK BGD MMR LKA EGY SDN SSD KEN UGA NGA GHA SLE GMB ZMB ZWE MWI BWA LSO SWZ ZAF MYS FJI',GB,0,0.45),
  Z('COD',BE,0,0.45),Z('TGO CMR NAM TZA RWA BDI',DE,0,0.45),Z('AGO MOZ',PT,0,0.4),Z('IDN',NL,0,0.45),Z('ERI SOM LBY',IT,0,0.4)
 ]),
 routes:[],
 labels:[
  L(2,3,29,'Algérie',{nomark:true,sub:'indigénat, 1881'}),L(3,NC[0],NC[1],'Nouvelle-Calédonie',{mark:'star',gold:true,sub:'indigénat, 1887',dx:-10,al:'right',end:24}),
  L(10,23,-3,'Congo',{nomark:true,sub:'caoutchouc',end:22}),L(11,79,22,'Inde',{nomark:true,sub:'coton, thé',end:22}),L(12,104,15.5,'Indochine',{nomark:true,sub:'riz, hévéa',end:22,dx:10,al:'left'}),L(13,25,-28,'Afrique du Sud',{nomark:true,sub:'or, diamants',end:22,dy:16}),
  L(26,166.44,-22.27,'Nouméa',{mark:'ville',dx:-10,al:'right',zmin:6}),L(27,165.83,-21.7,'La Foa',{mark:'site',gold:true,sub:'Ataï, 1878',dx:-10,al:'right',zmin:6}),
  L(28,166.22,-21.61,'Thio',{mark:'mine',sub:'nickel',dx:10,al:'left',zmin:6}),L(29,164.9,-21.13,'Pouembout',{mark:'site',sub:'centre agricole pénitentiaire, 1883',dx:-10,al:'right',zmin:6}),L(30,165.6,-21.25,'Réserves',{nomark:true,sub:'cantonnement, 1868-1903',zmin:2,dy:-22}),
  L(41,1.5,35.3,'Abd el-Kader',{sub:'1832-1847',nomark:true,dy:-16}),L(42,-8,11,'Samory Touré',{sub:'jusqu’en 1898',nomark:true,dx:-8,al:'right'}),L(43,28.35,-28.36,'Zoulous',{sub:'1879',dx:10,al:'left',mark:'site'}),
  L(44,17,-21,'Herero, Nama',{sub:'1904-1908',nomark:true,dy:20}),L(45,36,-9,'Maji-Maji',{sub:'1905-1907',nomark:true,dx:10,al:'left'}),L(46,116.4,39.9,'Boxeurs',{sub:'Chine, 1900',mark:'site',dx:10,al:'left'}),
  L(47,NC[0],NC[1],'Ataï',{sub:'1878',mark:'star',gold:true,dx:10,al:'left',zmax:6}),L(50,77.2,28.6,'Congrès national indien',{sub:'1885',nomark:true,dy:-18})
 ],
 pulses:[Pu(27,165.83,-21.7,'#ffd166',true)],
 ph:[
  Ph(0,'Deux catégories d’habitants','Dans une colonie, tous n’ont pas les mêmes droits. Les colons venus d’Europe sont citoyens. Les colonisés, appelés « indigènes », sont des sujets : dans l’empire français, le régime de l’indigénat (Algérie en 1881, Nouvelle-Calédonie en 1887) permet de les punir sans procès, de leur imposer un impôt et du travail obligatoire.','ame'),
  Ph(9,'Exploiter','La colonie doit rapporter. Plantations, mines, ports et chemins de fer servent à exporter vers la métropole. Au Congo de Léopold II, la récolte forcée du caoutchouc s’accompagne de violences si graves qu’elles font scandale en Europe dès 1904.','afr'),
  Ph(23,'En Nouvelle-Calédonie','Ici, la colonisation est pénitentiaire (les forçats, à partir de 1864) et de peuplement (les colons libres). Les Kanak sont regroupés dans des réserves : c’est le cantonnement. Pour les mines de nickel, on fait venir des travailleurs sous contrat du Japon, du Tonkin et de Java.','kan'),
  Ph(36,'École, missions, médecine','Les colonisateurs ouvrent des écoles, des hôpitaux, des missions. Ils s’en servent pour justifier leur présence. Mais ces services touchent peu de monde : en 1914, la grande majorité des enfants colonisés ne vont pas à l’école.','mis'),
  Ph(40,'Résister','Les colonisés ne se laissent pas faire : guerres d’Abd el-Kader en Algérie, de Samory Touré en Afrique de l’Ouest, des Zoulous, révolte d’Ataï en 1878, des Maji-Maji, des Boxeurs en Chine. D’autres refusent l’impôt, fuient le travail forcé, ou écrivent et pétitionnent, comme le Congrès national indien fondé en 1885.','neo'),
  Ph(52,'Vu d’Europe','En métropole, affiches, journaux et expositions vantent l’empire. À l’Exposition universelle de Paris, en 1889, des « villages indigènes » exhibent des femmes et des hommes venus des colonies comme des curiosités. Peu de voix s’y opposent encore.','eur')
 ],
 photos:[Sh('cafecanala',9,16,'tr',2),Sh('thio1900',16,23,'bl',-2),Sh('forcats',23,29,'tr',2),Sh('atai',29,36,'bl',-2,'contain'),Sh('zoulou1879',40,48,'tr',2,'contain'),Sh('riviere1878',48,54,'bl',-2)],
 legend:[[F,'Empire français'],[GB,'Empire britannique'],[DE,'Allemagne'],[BE,'Belgique'],[PT,'Portugal'],[NL,'Pays-Bas'],[IT,'Italie']],
 mots:[['Indigénat','Ensemble de règles spéciales, très dures, appliquées aux seuls colonisés (en Nouvelle-Calédonie de 1887 à 1946).'],['Sujet','Habitant d’une colonie qui n’a pas les droits d’un citoyen.'],['Cantonnement','Regroupement forcé des Kanak dans des réserves, pour donner leurs terres aux colons.'],['Travail forcé','Travail imposé sans que la personne puisse refuser.'],['Société coloniale','Société inégalitaire où les colons dominent les colonisés.']],
 q:[['Quelle différence de statut entre un colon et un colonisé ?','Le colon est citoyen ; le colonisé est un sujet soumis à l’indigénat.'],['À quoi servent les ports et les chemins de fer des colonies ?','À exporter les produits des plantations et des mines vers la métropole.'],['Quelles sont les deux formes de colonisation en Nouvelle-Calédonie ?','La colonisation pénitentiaire (le bagne) et la colonisation de peuplement (les colons libres).'],['Citer trois formes de résistance.','La guerre, le refus de l’impôt ou du travail forcé, les pétitions et les mouvements politiques.']],
 wiki:['Régime de l’indigénat','État indépendant du Congo','Grande révolte kanak de 1878','Exposition universelle de 1889'],
 fs:{niv:'4e',pb:'Sur quelles inégalités repose une société coloniale, et comment les colonisés y répondent-ils ?',
  but:'Faire découvrir le fonctionnement d’une société coloniale à partir de l’exemple calédonien, puis le mettre en perspective.',
  notions:['société coloniale','indigénat, sujet, citoyen','cantonnement','résistance'],
  comp:['Analyser et comprendre un document : confronter un document à ce qu’on connaît par ailleurs','Pratiquer différents langages : s’approprier et utiliser un lexique spécifique en contexte'],
  meth:'Démarche inductive : étude de cas (Nouvelle-Calédonie, volet « Histoire de la Nouvelle-Calédonie », chapitres 3 à 7), puis mise en perspective à l’échelle des empires.',
  accroche:'Gravure du grand chef Ataï (1878) : « Qui est cet homme ? Pourquoi une gravure de lui à Paris ? »',
  act:['Étude de cas : enquêtes « Colons libres et cantonnement » et « Les Kanak face à la colonisation » de l’atlas du Pacifique (un groupe par page de documents).','Mise en commun : schéma au tableau « colons / colonisés » (droits, terres, travail).','Mise en perspective : carte animée de ce chapitre ; retrouver ailleurs dans le monde ce qu’on a vu en Nouvelle-Calédonie.'],
  fin:'Une société coloniale est inégalitaire : les colons sont citoyens, les colonisés sont des sujets soumis à l’indigénat, privés d’une partie de leurs terres et astreints au travail. Partout, les colonisés résistent, par les armes ou autrement.',
  suite:'Évaluation de fin de séquence : voir l’Espace collège.'}}

];

A.add({id:'colonies',title:'Conquêtes et sociétés coloniales',tag:'6 chapitres · XIXe siècle · 4e',col:'fra',proj:'plan',
 sub:'Pourquoi et comment quelques États se partagent le monde entre 1815 et 1914 : les raisons de la conquête, l’empire français, l’Afrique, l’Empire britannique, le Pacifique, les sociétés coloniales.',
 frise:{from:1800,to:1920,lin:true,ticks:[[1800,'1800'],[1815,'1815',1],[1830,'1830'],[1853,'1853',1],[1870,'1870'],[1885,'1885',1],[1900,'1900'],[1914,'1914']]},
 info:'<p><b>Collège, 4e, histoire, programme adapté à la Nouvelle-Calédonie</b> : thème 2 « L’Europe et le monde au XIXe siècle », sous-thème « Conquêtes et sociétés coloniales : la Nouvelle-Calédonie ». Le programme demande de montrer « à l’aide d’une carte » que les conquêtes renforcent la domination européenne, et d’étudier les logiques de la colonisation à partir de l’exemple calédonien : ce volet donne la carte du monde ; l’étude de cas se fait avec le volet « Histoire de la Nouvelle-Calédonie » de l’atlas du Pacifique (chapitres 3 à 7).</p><p><b>Cartes</b> : les empires sont coloriés avec les frontières des pays actuels (Natural Earth, domaine public). Ce sont des schémas : les limites d’époque étaient souvent floues ou différentes.</p><p><b>Chiffres</b> : ordres de grandeur ; pour l’empire français en 1914, les estimations de population vont de 40 à 55 millions selon les sources.</p><p><b>Vocabulaire</b> : « indigène », « civiliser », « races » sont des mots de l’époque, cités entre guillemets pour être étudiés et critiqués.</p><p><b>Images</b> : Wellcome Collection (domaine public) et Wikimedia Commons.</p>',
 chapters:CH});
})();
