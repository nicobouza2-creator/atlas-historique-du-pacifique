/* Atlas historique du Pacifique · Atlas d’histoire — Collège — © 2026 Nicolas BOUZA. Idée, conception et réalisation : Nicolas BOUZA,
   avec l’assistance de Claude (Anthropic). Licence CC BY-NC-ND 4.0. https://github.com/nicobouza2-creator/atlas-historique-du-pacifique */
/* Volet 7 — Le monde et la mondialisation (planisphère). Repères, reliefs, climats, population, villes, flux, inégalités, climat, NC dans le monde. */
(function(){
'use strict';
var A=window.ATLAS,r=A.r,L=A.L,Pu=A.Pu,Ph=A.Ph,Sh=A.Sh,Lz=A.Lz,Rg=A.Rg;
function cam(t,lon,lat,z){return {t:t,lon:lon,lat:lat,z:z};}
function W(t){return cam(t,20,12,0.46);}
function WP(t){return cam(t,150,5,0.46);}
/* bandes de latitude (deux moitiés pour éviter l’antiméridien) */
function band(a,b){var out=[],h,lo;for(h=0;h<2;h++){var ring=[],l0=h?0:-180,l1=h?180:0;for(lo=l0;lo<=l1;lo+=10)ring.push([lo,a]);for(lo=l1;lo>=l0;lo-=10)ring.push([lo,b]);out.push(ring);}return out;}
function bandZ(a,b,col,t0,al){return band(a,b).map(function(rg){return Rg(rg,col,t0,al,2);});}
function line(t0,t1,lat,col){return r(col||'kan',t0,t1,1.6,[[-180,lat],[-60,lat],[60,lat],[180,lat]],{straight:true,dash:true,step:3,nohead:true});}
var NC=[165.6,-21.3];
function ship(col,t0,t1,pts,o){o=o||{};o.ship=true;o.sp=o.sp||'conteneurs';return r(col,t0,t1,3,pts,o);}
var ASIE_EUROPE=[[121.8,31],[123,25],[118,18],[109,10],[104.2,1.3],[103,1.5],[101.5,2.6],[99.5,4.7],[95,6],[80,6],[60,13],[48,12],[43.4,12.6],[41.5,15.2],[38.8,20],[36.6,24.2],[34.4,27.4],[33.2,28.8],[32.5,30.2],[32.3,31.4],[26,33.8],[20,34.6],[14.5,35.3],[11.3,37.4],[6,38],[1,37.3],[-2,36.1],[-5.6,36],[-10,37],[-11,42],[-8,46],[-6.3,48.6],[-2,50],[1.5,51],[4,52]];
var PAC=[[121.8,31],[126,29.2],[132,30.2],[137,32.4],[160,38],[-170,40],[-140,38],[-118.3,33.7]];
var ATL=[[4,52],[1.5,51],[-2,50],[-6.3,48.6],[-30,45],[-60,41],[-74,40.5]];
var PANAMA=[[-74,40.5],[-72,31],[-71,24],[-73.8,20],[-76,15],[-79.9,9.4],[-79.6,8.9],[-79.3,7.8],[-80.8,6.2],[-85,5.5],[-100,10],[-107,17],[-111,22],[-116,27.5],[-118.3,33.7]];

var CH=[

/* 1 --------------------------------------------------------------- */
{short:'Se repérer sur la planète',col:'eur',dur:54,dates:'repères',proj:'plan',
 cam:[W(0),W(54)],
 zones:[],
 routes:[line(8,11,0,'pol'),line(10,13,23.44,'afr'),line(10.5,13.5,-23.44,'afr'),line(12,15,66.56,'mis'),line(12.5,15.5,-66.56,'mis'),
  r('eur',16,19,1.6,[[0,-85],[0,0],[0,85]],{straight:true,dash:true,step:3,nohead:true})],
 labels:[
  L(1,19,8,'AFRIQUE',{nomark:true,big:true}),L(1.5,18,52,'EUROPE',{nomark:true,big:true}),L(2,92,46,'ASIE',{nomark:true,big:true}),
  L(2.5,-100,45,'AMÉRIQUE DU NORD',{nomark:true,big:true}),L(3,-60,-14,'AMÉRIQUE DU SUD',{nomark:true,big:true}),L(3.5,134,-25,'OCÉANIE',{nomark:true,big:true}),L(4,40,-78,'ANTARCTIQUE',{nomark:true,big:true}),
  L(5,-150,0,'OCÉAN PACIFIQUE',{nomark:true,gold:true}),L(5.5,-30,25,'OCÉAN ATLANTIQUE',{nomark:true,gold:true}),L(6,78,-22,'OCÉAN INDIEN',{nomark:true,gold:true}),
  L(6.5,0,80,'OCÉAN ARCTIQUE',{nomark:true,gold:true}),L(7,-90,-62,'OCÉAN AUSTRAL',{nomark:true,gold:true}),
  L(9,-160,2.5,'Équateur (0°)',{nomark:true,al:'left'}),L(11,-160,26,'Tropique du Cancer',{nomark:true,al:'left'}),L(11.5,-160,-21,'Tropique du Capricorne',{nomark:true,al:'left'}),
  L(13,-160,69,'Cercle polaire arctique',{nomark:true,al:'left'}),L(17,2,-50,'Méridien de Greenwich (0°)',{nomark:true,al:'left'}),
  L(22,NC[0],NC[1],'Nouvelle-Calédonie',{mark:'star',sub:'environ 21° S, 165° E',dx:10,al:'left',gold:true})
 ],
 pulses:[Pu(22,NC[0],NC[1],'#ffd166',true)],
 ph:[
  Ph(0,'Continents et océans','Environ 71 % de la surface de la Terre est couverte d’océans. Les terres forment six continents : Afrique, Amérique, Antarctique, Asie, Europe et Océanie.','eur'),
  Ph(8,'Les grandes lignes','L’équateur coupe la Terre en deux hémisphères, Nord et Sud. Entre les deux tropiques, c’est la zone chaude ; au-delà des cercles polaires, les zones froides.','afr'),
  Ph(16,'Latitude et longitude','La latitude se compte depuis l’équateur (vers le nord ou le sud) ; la longitude depuis le méridien de Greenwich (vers l’est ou l’ouest). Ensemble, elles donnent l’adresse d’un lieu.','eur'),
  Ph(22,'Et nous ?','La Nouvelle-Calédonie est dans l’hémisphère Sud, en Océanie, dans l’océan Pacifique, vers 21° de latitude sud et 165° de longitude est : de l’autre côté de la Terre par rapport à la France.','kan'),
  Ph(36,'Le plus grand océan','Le Pacifique est le plus grand océan : il couvre environ un tiers de la planète, plus que toutes les terres réunies.','mis')
 ],
 photos:[Sh('planisphere',1,8,'tr',2),Sh('equateur',8,16,'bl',-2),Sh('greenwich',16,22,'tr',2)],
 legend:[['pol','Équateur',1],['afr','Tropiques',1],['mis','Cercles polaires',1],['eur','Méridien de Greenwich',1]],
 mots:[['Continent','Très grande étendue de terre.'],['Hémisphère','Moitié de la Terre (Nord ou Sud, Est ou Ouest).'],['Latitude','Distance en degrés entre un lieu et l’équateur.'],['Longitude','Distance en degrés entre un lieu et le méridien de Greenwich.']],
 q:[['Combien y a-t-il de continents ?','Six : Afrique, Amérique, Antarctique, Asie, Europe, Océanie.'],['Quel est le plus grand océan ?','L’océan Pacifique.'],['Dans quel hémisphère est la Nouvelle-Calédonie ?','Dans l’hémisphère Sud.'],['Quelle ligne sépare les hémisphères Nord et Sud ?','L’équateur.']],
 wiki:['Continent','Océan','Latitude','Méridien de Greenwich'],
 src:[['Introduction to the Oceans — NOAA (JetStream)','https://www.noaa.gov/jetstream/ocean'],['New Caledonia — Encyclopaedia Britannica (situation, latitudes et longitudes)','https://www.britannica.com/place/New-Caledonia-French-unique-collectivity-Pacific-Ocean'],['Carte générale de la Nouvelle-Calédonie (distances) — IEOM','https://www.ieom.fr/IMG/pdf/17140_nc_generale-3.pdf']]},

/* 2 --------------------------------------------------------------- */
{short:'Les grands reliefs et fleuves',col:'ere',dur:52,dates:'repères',proj:'plan',
 cam:[W(0),W(52)],
 zones:[Rg([86,30,8],'ere',2,0.55,2),Rg([-70,-20,6],'ere',3,0.5,2),Rg([-112,44,7],'ere',4,0.5,2),Rg([10,46,2.5],'ere',5,0.55,2),Rg([37.3,-3.1,1.5],'ere',6,0.6,2)],
 routes:[
  r('mis',18,23,3,[[33,0],[32.5,9],[32.5,15.6],[33,22],[31,30],[31.2,31.5]],{river:true}),
  r('mis',19,24,3,[[-73,-4.5],[-65,-3.5],[-58,-3],[-51,-1],[-49,0]],{river:true}),
  r('mis',20,25,3,[[91,33],[101,28],[106,29.5],[112,30.5],[117,31],[121.8,31.4]],{river:true}),
  r('mis',21,26,3,[[-95,47],[-91,42],[-90,36],[-91,31],[-89.3,29]],{river:true}),
  r('mis',22,27,3,[[26,-11],[24.5,0],[18,2],[16,-3],[12.4,-6]],{river:true}),
  r('mis',23,28,3,[[79,30],[82,26],[86,25.3],[88.5,24],[90.5,22.5]],{river:true})
 ],
 labels:[
  L(2,86.9,27.99,'Everest (8 849 m)',{mark:'star',sub:'Himalaya',dx:10,al:'left',gold:true}),
  L(3,-70,-32.65,'Aconcagua (6 961 m)',{mark:'star',sub:'cordillère des Andes',dx:10,al:'left'}),
  L(4,-112,44,'Rocheuses',{nomark:true,big:true}),L(5,6.86,45.83,'Mont Blanc',{mark:'star',sub:'Alpes',dx:-10,al:'right'}),
  L(6,37.35,-3.07,'Kilimandjaro (5 895 m)',{mark:'star',dx:10,al:'left'}),
  L(19,30,18,'Nil',{nomark:true,dx:-8,al:'right'}),L(20,-60,-1,'Amazone',{nomark:true,dy:-12}),L(21,108,33,'Yangzi',{nomark:true,dy:-12}),
  L(22,-93,38,'Mississippi',{nomark:true,dx:-8,al:'right'}),L(23,22,1.8,'Congo',{nomark:true,dy:-12}),L(24,84,27.5,'Gange',{nomark:true,dy:-12}),
  L(34,164.77,-20.58,'Mont Panié (1 629 m)',{mark:'star',dx:10,al:'left'})
 ],
 pulses:[],
 ph:[
  Ph(0,'Les plus hautes montagnes','L’Himalaya, en Asie, porte l’Everest (8 849 m), le plus haut sommet du monde. Les Andes, en Amérique du Sud, forment la plus longue chaîne de montagnes.','ere'),
  Ph(10,'Montagnes jeunes','Les Rocheuses, les Andes, les Alpes ou l’Himalaya sont des montagnes « jeunes » : hautes et pointues, elles sont nées quand les plaques de la Terre se sont rapprochées.','ere'),
  Ph(18,'Les grands fleuves','Le Nil et l’Amazone mesurent plus de 6 000 km. L’Amazone transporte le plus d’eau du monde. Le Yangzi, le Mississippi, le Congo et le Gange sont aussi de très grands fleuves.','mis'),
  Ph(30,'Des fleuves pour vivre','Depuis toujours, les humains s’installent près des fleuves : eau, agriculture, transport. Le delta du Nil ou la plaine du Gange sont très peuplés.','neo'),
  Ph(40,'À notre échelle','Le mont Panié (1 629 m) est 5 fois moins haut que l’Everest. Les rivières calédoniennes sont courtes, car l’île est étroite.','kan')
 ],
 photos:[Sh('everest',2,10,'tr',2),Sh('andes',10,18,'bl',-2),Sh('nil',18,26,'tr',2),Sh('amazone',26,33,'bl',-2)],
 legend:[['ere','Grandes chaînes de montagnes'],['mis','Grands fleuves']],
 mots:[['Chaîne de montagnes','Suite de montagnes reliées entre elles.'],['Altitude','Hauteur d’un lieu au-dessus du niveau de la mer.'],['Fleuve','Cours d’eau qui se jette dans la mer.'],['Delta','Embouchure d’un fleuve divisée en plusieurs bras.']],
 q:[['Quel est le plus haut sommet du monde ?','L’Everest (8 849 m), dans l’Himalaya.'],['Quelle est la plus longue chaîne de montagnes ?','La cordillère des Andes.'],['Quel fleuve transporte le plus d’eau ?','L’Amazone.'],['Pourquoi les humains s’installent-ils près des fleuves ?','Pour l’eau, l’agriculture et le transport.']],
 wiki:['Everest','Cordillère des Andes','Nil','Amazone (fleuve)'],
 src:[['Mount Everest — Encyclopaedia Britannica (8 849 m)','https://www.britannica.com/place/Mount-Everest'],['Amazon River — Encyclopaedia Britannica (longueur, débit)','https://www.britannica.com/place/Amazon-River'],['Longest continental mountain range (Andes) — Guinness World Records','https://www.guinnessworldrecords.com/world-records/longest-continental-mountain-range'],['Nueva altura oficial del Aconcagua (6 960,8 m, IGN argentin, 2012) — RPP','https://rpp.pe/lima/actualidad/nueva-altura-oficial-del-cerro-aconcagua-es-de-69608-metros-noticia-518097'],['Carte générale de la Nouvelle-Calédonie (mont Panié, 1 629 m) — IEOM','https://www.ieom.fr/IMG/pdf/17140_nc_generale-3.pdf']]},

/* 3 --------------------------------------------------------------- */
{short:'Climats et grands milieux',col:'afr',dur:56,dates:'repères',proj:'plan',
 cam:[W(0),W(56)],
 zones:bandZ(-23.44,23.44,'afr',2,0.22).concat(bandZ(23.44,66.56,'neo',5,0.18)).concat(bandZ(-66.56,-23.44,'neo',5.5,0.18)).concat(bandZ(66.56,89,'mis',8,0.25)).concat(bandZ(-89,-66.56,'mis',8.5,0.25)).concat([
  Rg([-62,-4,9],'flo',16,0.65,2),Rg([22,0,6],'flo',16.5,0.65,2),Rg([113,0,6],'flo',17,0.65,2),
  Rg([13,23,9],'sand',24,0.7,2),Rg([47,22,6],'sand',24.5,0.7,2),Rg([133,-25,8],'sand',25,0.7,2),Rg([105,43,6],'sand',25.5,0.7,2),Rg([21,-23,4],'sand',26,0.7,2),Rg([-70,-23,3],'sand',26.5,0.7,2)]),
 routes:[],
 labels:[
  L(2,-30,-5,'zone chaude',{nomark:true,big:true}),L(5,-30,45,'zone tempérée',{nomark:true,big:true}),L(5.5,-30,-45,'zone tempérée',{nomark:true,big:true}),
  L(8,-30,75,'zone froide',{nomark:true,big:true}),L(8.5,60,-70,'zone froide',{nomark:true,big:true}),
  L(16,-62,-4,'Amazonie',{nomark:true}),L(16.5,22,0,'forêt du Congo',{nomark:true}),L(17,113,0,'Indonésie',{nomark:true}),
  L(24,13,23,'Sahara',{nomark:true,big:true}),L(25,133,-25,'désert australien',{nomark:true}),L(25.5,105,43,'Gobi',{nomark:true}),L(26.5,-70,-23,'Atacama',{nomark:true,dx:-8,al:'right'}),
  L(36,NC[0],NC[1],'Nouvelle-Calédonie : climat tropical',{mark:'star',dx:10,al:'left',gold:true})
 ],
 pulses:[],
 ph:[
  Ph(0,'Trois grandes zones','Plus on s’éloigne de l’équateur, plus il fait froid : zone chaude entre les tropiques, zones tempérées au milieu, zones froides près des pôles.','afr'),
  Ph(14,'Les forêts équatoriales','Près de l’équateur, il fait chaud et il pleut toute l’année : immenses forêts d’Amazonie, du Congo et d’Indonésie, très riches en espèces.','flo'),
  Ph(22,'Les déserts','Le Sahara, l’Arabie, l’Australie, le Gobi, l’Atacama : il y pleut très peu. Les déserts chauds sont souvent vers les tropiques.','sand'),
  Ph(30,'Savanes, prairies, taïga, banquise','Entre forêt et désert, la savane ; dans les zones tempérées, forêts et prairies ; plus au nord, la taïga ; près des pôles, la toundra et la glace.','neo'),
  Ph(40,'Un climat, des milieux','Le climat (températures, pluies) façonne les milieux : la végétation, les animaux et la façon dont les humains habitent et cultivent.','eur')
 ],
 photos:[Sh('foretequat',14,22,'tr',2),Sh('sahara2',22,30,'bl',-2),Sh('savaneafr',30,36,'tr',2),Sh('taiga',36,42,'bl',-2),Sh('banquise',42,50,'tr',2)],
 legend:[['afr','Zone chaude'],['neo','Zones tempérées'],['mis','Zones froides'],['flo','Forêts équatoriales'],['sand','Grands déserts']],
 mots:[['Climat','Temps qu’il fait en moyenne sur de nombreuses années.'],['Milieu','Ensemble formé par le climat, le relief, la végétation et les êtres vivants.'],['Désert','Lieu où il pleut très peu.'],['Forêt équatoriale','Forêt dense, chaude et humide toute l’année.']],
 q:[['Où se trouve la zone chaude ?','Entre les deux tropiques.'],['Citer deux grands déserts.','Par exemple le Sahara, le désert australien, le Gobi, l’Atacama.'],['Où trouve-t-on les grandes forêts équatoriales ?','En Amazonie, dans le bassin du Congo et en Indonésie.'],['Quel est le climat de la Nouvelle-Calédonie ?','Tropical.']],
 wiki:['Climat','Forêt tropicale humide','Sahara','Biome'],
 src:[['Le climat en Nouvelle-Calédonie (saisons) — Météo-France Nouvelle-Calédonie','https://meteo.nc/fr/node/569750'],['Mission Biomes — NASA Science (forêt, désert, toundra)','https://science.nasa.gov/kids/earth/mission-biomes/']]},

/* 4 --------------------------------------------------------------- */
{short:'8,2 milliards : où vivent les humains ?',col:'dense',dur:54,when:[2025,2026],dates:'2025',proj:'plan',
 cam:[W(0),W(54)],
 zones:[Rg([115,32,12],'dense',4,0.72,2),Rg([80,22,10],'dense',6,0.72,2),Rg([12,49,9],'dense',8,0.72,2),Rg([110,-7,4],'dense',9,0.7,2),Rg([6,8,5],'dense',10,0.7,2),Rg([31,28,2.5],'dense',10.5,0.7,2),Rg([-77,40,6],'dense',11,0.6,2),Rg([-46,-22,5],'dense',11.5,0.6,2),
  Rg([10,22,10],'vide',22,0.55,2),Rg([105,62,16],'vide',22.5,0.55,2),Rg([-62,-5,8],'vide',23,0.55,2),Rg([130,-25,10],'vide',23.5,0.55,2),Rg([-100,62,12],'vide',24,0.55,2),Rg([-40,74,8],'vide',24.5,0.55,2)],
 routes:[],
 labels:[
  L(4,115,32,'Asie de l’Est',{nomark:true,big:true}),L(6,80,22,'Asie du Sud',{nomark:true,big:true}),L(8,12,49,'Europe',{nomark:true,big:true}),
  L(9,110,-7,'Java',{nomark:true,dy:14}),L(10,6,8,'golfe de Guinée',{nomark:true,dy:14}),L(10.5,31,28,'vallée du Nil',{nomark:true,dx:8,al:'left'}),
  L(11,-77,40,'nord-est des États-Unis',{nomark:true,dy:14}),
  L(22,10,22,'Sahara',{nomark:true}),L(22.5,105,62,'Sibérie',{nomark:true}),L(23,-62,-5,'Amazonie',{nomark:true}),L(23.5,130,-25,'intérieur de l’Australie',{nomark:true}),
  L(24,-100,62,'Grand Nord canadien',{nomark:true}),L(24.5,-40,74,'Groenland',{nomark:true}),
  L(36,NC[0],NC[1],'Nouvelle-Calédonie : 264 596 hab.',{mark:'star',dx:10,al:'left',gold:true})
 ],
 pulses:[],
 ph:[
  Ph(0,'8,2 milliards d’humains','En 2025, la Terre compte plus de 8,2 milliards d’habitants. Mais ils sont très inégalement répartis.','dense'),
  Ph(4,'Trois grands foyers','L’Asie de l’Est, l’Asie du Sud et l’Europe concentrent une grande partie des humains. Plus de la moitié de l’humanité vit en Asie.','dense'),
  Ph(9,'D’autres foyers','Java, le golfe de Guinée, la vallée du Nil, le nord-est des États-Unis, le sud-est du Brésil : là aussi, les densités sont fortes.','dense'),
  Ph(22,'Les « déserts humains »','Trop sec, trop froid, trop humide ou trop montagneux : le Sahara, la Sibérie, l’Amazonie, l’intérieur de l’Australie et le Grand Nord sont presque vides.','vide'),
  Ph(32,'Près des côtes et des fleuves','Beaucoup d’humains vivent près des côtes, des fleuves et dans les plaines, où l’on peut cultiver, commercer et se déplacer facilement.','eur'),
  Ph(42,'La Nouvelle-Calédonie','264 596 habitants : environ 30 000 fois moins que la Terre entière. Comme ailleurs, la population se concentre sur le littoral.','kan')
 ],
 photos:[Sh('nuitterre',1,9,'tr',2),Sh('densite',9,20,'bl',-2,'contain'),Sh('tokyo',4,9,'bl',-2),Sh('banquise',22,30,'tr',2)],
 legend:[['dense','Foyers de peuplement'],['vide','Régions presque vides']],
 mots:[['Foyer de peuplement','Région où vivent beaucoup d’habitants.'],['Désert humain','Région presque vide d’habitants.'],['Densité','Nombre moyen d’habitants par km².'],['Littoral','Zone située au bord de la mer.']],
 q:[['Combien d’humains vivent sur Terre en 2025 ?','Plus de 8,2 milliards.'],['Quels sont les trois grands foyers de peuplement ?','L’Asie de l’Est, l’Asie du Sud et l’Europe.'],['Citer deux déserts humains.','Par exemple le Sahara, la Sibérie, l’Amazonie, le Groenland.'],['Pourquoi ces régions sont-elles presque vides ?','Parce qu’il y fait trop sec, trop froid, trop humide ou que le relief est trop difficile.']],
 wiki:['Population mondiale','Densité de population','Foyer de peuplement','Œcoumène'],
 src:[['World Population Prospects 2024 : résumé des résultats (8,2 milliards en 2024) — ONU, Division de la population (2024)','https://www.un.org/sustainabledevelopment/blog/2024/07/press-release-wpp2024/'],['World Urbanization Prospects 2025 : 8,2 milliards d’habitants, 45 % en ville — ONU DAES (2025)','https://www.un.org/sustainabledevelopment/blog/2025/11/press-release-wup2025/'],['Populations de référence de Nouvelle-Calédonie de 2009 à 2025 (recensement 2025) — Insee (2025)','https://www.insee.fr/fr/statistiques/2122859'],['Population density (people per sq. km of land area) — Banque mondiale','https://data.worldbank.org/indicator/EN.POP.DNST']]},

/* 5 --------------------------------------------------------------- */
{short:'Un monde de villes',col:'dense',dur:52,when:[2025,2026],dates:'2025',proj:'plan',
 cam:[W(0),W(8),cam(12,105,20,1.0),cam(28,105,20,1.0),W(32),W(52)],
 zones:[],
 routes:[],
 labels:[
  L(13,106.85,-6.2,'Jakarta',{mark:'ville',sub:'environ 42 millions',dx:10,al:'left',gold:true}),L(14,90.4,23.8,'Dacca',{mark:'ville',sub:'environ 37 à 40 millions',dx:-10,al:'right'}),
  L(15,139.7,35.7,'Tokyo',{mark:'ville',sub:'environ 33 millions',dx:10,al:'left'}),L(16,77.2,28.6,'New Delhi',{mark:'ville',dx:-10,al:'right'}),
  L(17,121.5,31.2,'Shanghai',{mark:'ville',dx:10,al:'left'}),L(18,113.3,23.1,'Canton',{mark:'ville',dx:10,dy:8,al:'left'}),L(19,120.98,14.6,'Manille',{mark:'ville',dx:10,al:'left'}),
  L(20,88.36,22.57,'Calcutta',{mark:'ville',dx:-10,dy:10,al:'right'}),L(21,126.98,37.57,'Séoul',{mark:'ville',dx:10,al:'left'}),
  L(33,31.24,30.04,'Le Caire',{mark:'ville',dx:10,al:'left'}),L(34,-46.6,-23.5,'São Paulo',{mark:'ville',dx:10,al:'left'}),L(34.5,-99.1,19.4,'Mexico',{mark:'ville',dx:-10,al:'right'}),
  L(35,-74,40.7,'New York',{mark:'ville',dx:10,al:'left'}),L(35.5,3.4,6.5,'Lagos',{mark:'ville',dx:10,al:'left'}),L(36,2.35,48.85,'Paris',{mark:'ville',dx:10,al:'left'}),
  L(36.5,-0.12,51.5,'Londres',{mark:'ville',dx:-10,al:'right'}),L(37,151.2,-33.9,'Sydney',{mark:'ville',dx:10,al:'left'}),L(37.5,NC[0]+0.8,-22.27,'Nouméa',{mark:'ville',dx:10,al:'left'})
 ],
 pulses:[Pu(13,106.85,-6.2,'#ff5d5d',true)],
 ph:[
  Ph(0,'De plus en plus de citadins','Selon l’ONU (2025), près de la moitié des humains vivent dans des villes, et beaucoup d’autres dans des petites villes. En 1950, c’était un humain sur cinq. Avec la façon de compter de chaque pays, plus de la moitié des humains sont des citadins depuis 2007 : 58 % en 2025.','dense'),
  Ph(10,'Les géants d’Asie','Les plus grandes agglomérations sont Jakarta (environ 42 millions d’habitants), Dacca et Tokyo. Neuf des dix plus grandes sont en Asie ; Le Caire est la seule hors d’Asie.','dense'),
  Ph(24,'33 mégapoles','On compte 33 villes de plus de 10 millions d’habitants : les mégapoles. Beaucoup sont au bord de la mer ou d’un grand fleuve.','dense'),
  Ph(32,'Métropoles mondiales','New York, Londres, Paris, Tokyo ou Shanghai commandent l’économie du monde : sièges d’entreprises, bourses, universités, grands aéroports.','eur'),
  Ph(42,'Vivre en ville','Emplois, écoles, hôpitaux attirent les habitants. Mais il y a aussi des embouteillages, de la pollution et des quartiers pauvres, les bidonvilles.','ame')
 ],
 photos:[Sh('jakarta',10,18,'tr',2),Sh('dhaka',18,24,'bl',-2),Sh('lecaire',32,38,'tr',2),Sh('bidonville',42,50,'tr',2)],
 legend:[['eur','Grande agglomération','ville']],
 mots:[['Agglomération','Ville-centre et banlieues qui forment un seul ensemble.'],['Mégapole','Agglomération de plus de 10 millions d’habitants.'],['Métropole','Grande ville qui commande une région ou le monde.'],['Bidonville','Quartier d’habitations précaires, sans tous les services.']],
 q:[['Quelle est la plus grande agglomération du monde selon l’ONU (2025) ?','Jakarta, en Indonésie.'],['Sur quel continent sont la plupart des mégapoles ?','En Asie.'],['Qu’est-ce qu’une mégapole ?','Une agglomération de plus de 10 millions d’habitants.'],['Citer un avantage et un problème des grandes villes.','Par exemple : des emplois et des services / des embouteillages, la pollution.']],
 wiki:['Mégapole','Jakarta','Urbanisation','Bidonville'],
 src:[['World Urbanization Prospects 2025 : 45 % des humains en ville, 33 mégapoles, Jakarta première — ONU DAES (2025)','https://www.un.org/sustainabledevelopment/blog/2025/11/press-release-wup2025/'],['WUP 2025, dix messages clés (58 % d’urbains selon les définitions nationales, Dacca 37 millions) — ONU, Division de la population (2025)','https://www.un.org/development/desa/pd/sites/www.un.org.development.desa.pd/files/undesa_pd_2024_key_messages_wup_2025.pdf'],['Latest urbanization data reveal world’s most populous cities — UN DESA Voice (décembre 2025)','https://desapublications.un.org/un-desa-voice/feature/december-2025/latest-urbanization-data-reveal-worlds-most-populous-cities'],['World Urbanization Prospects 2018 : Highlights (2007 : les urbains dépassent les ruraux) — ONU DAES (2018)','https://digitallibrary.un.org/record/3828520/files/WUP2018-Highlights.pdf']]},

/* 6 --------------------------------------------------------------- */
{short:'Les routes de la mer',col:'mis',dur:60,dates:'aujourd’hui',proj:'plan',
 cam:[W(0),W(60)],
 zones:[],
 routes:[ship('mis',3,15,ASIE_EUROPE),ship('aus',8,16,PAC),ship('gbr',10,16,ATL),ship('lap',12,20,PANAMA),
  ship('zh',30,36,[[121.8,31],[130,10],[141,3],[152,-1],[160,-4.5],[164,-14],[166.4,-22.4]],{}),ship('fra',31,38,[[4,52],[1.5,51],[-2,50],[-6.3,48.6],[-8,46],[-11,42],[-10,37],[-14,30],[-20,10],[-10,-20],[20,-36],[60,-38],[110,-37],[132,-39.5],[142,-43],[149,-44.5],[156,-37],[163,-28],[166.4,-22.4]],{})],
 labels:[
  L(4,121.8,31,'Shanghai',{mark:'port',sub:'1er port à conteneurs',dx:10,al:'left',gold:true}),L(5,103.8,1.3,'Singapour',{mark:'port',dx:-10,dy:10,al:'right'}),
  L(6,121.6,29.9,'Ningbo',{mark:'port',dx:10,dy:8,al:'left'}),L(14,4,52,'Rotterdam',{mark:'port',sub:'1er port d’Europe',dx:10,al:'left'}),
  L(16,-118.3,33.7,'Los Angeles',{mark:'port',dx:-10,al:'right'}),L(16.5,-74,40.5,'New York',{mark:'port',dx:10,al:'left'}),
  L(20,101,3.5,'détroit de Malacca',{nomark:true,dx:-10,dy:-12,al:'right'}),L(21,43.4,12.6,'Bab-el-Mandeb',{nomark:true,dx:10,al:'left'}),
  L(22,32.4,30.5,'canal de Suez (1869)',{nomark:true,dx:10,al:'left'}),L(23,-79.7,9.1,'canal de Panama (1914)',{nomark:true,dx:10,al:'left'}),
  L(24,56.3,26.5,'Ormuz',{nomark:true,dx:10,al:'left'}),L(25,-5.6,36,'Gibraltar',{nomark:true,dx:-10,al:'right'}),
  L(32,166.43,-22.27,'Nouméa',{mark:'port',dx:10,al:'left'})
 ],
 pulses:[Pu(20,101,3.5,'#ffd166',false),Pu(21,43.4,12.6,'#ffd166',false),Pu(22,32.4,30.5,'#ffd166',false),Pu(23,-79.7,9.1,'#ffd166',false)],
 ph:[
  Ph(0,'La mer, autoroute du monde','Plus de 80 % des marchandises échangées dans le monde voyagent par la mer. Une grande route relie l’Asie à l’Europe par le détroit de Malacca et le canal de Suez.','mis'),
  Ph(8,'Le conteneur','Depuis les années 1950, on transporte les objets dans des boîtes en métal de taille standard : les conteneurs. Les plus grands porte-conteneurs en portent plus de 20 000.','mis'),
  Ph(18,'Détroits et canaux','Malacca, Bab-el-Mandeb, Ormuz, Gibraltar ; les canaux de Suez (1869) et de Panama (1914) raccourcissent les trajets. Si l’un d’eux est bloqué, le commerce mondial ralentit.','afr'),
  Ph(26,'Les ports géants','Shanghai est le premier port à conteneurs du monde, devant Singapour et Ningbo. En Europe, Rotterdam est le premier. La plupart des très grands ports sont en Chine.','zh'),
  Ph(32,'Jusqu’à Nouméa','Les conteneurs arrivent à Nouméa depuis l’Asie et l’Europe, souvent après un transbordement dans un grand port (Singapour, Australie…).','fra')
 ],
 photos:[Sh('porteconteneurs',3,10,'tr',2),Sh('conteneurs',10,16,'bl',-2),Sh('suez',18,24,'tr',2),Sh('panama',24,28,'bl',-2),Sh('shanghaiport',26,32,'tr',2),Sh('rotterdam',32,38,'bl',-2)],
 legend:[['mis','Route Asie – Europe',1],['aus','Route transpacifique',1],['gbr','Route transatlantique',1],['lap','Par le canal de Panama',1],['mis','Grand port','port']],
 mots:[['Conteneur','Grande boîte en métal de taille standard pour transporter des marchandises.'],['Détroit','Bras de mer étroit entre deux terres.'],['Canal','Voie d’eau creusée par les humains.'],['Transbordement','Passage des conteneurs d’un navire à un autre.']],
 q:[['Quelle part des marchandises voyage par la mer ?','Plus de 80 %.'],['Quel est le premier port à conteneurs du monde ?','Shanghai.'],['Quels canaux raccourcissent les routes maritimes ?','Le canal de Suez et le canal de Panama.'],['Que se passe-t-il si un détroit est bloqué ?','Les navires doivent faire un détour : le commerce ralentit et les prix montent.']],
 wiki:['Conteneur','Canal de Suez','Canal de Panama','Port de Shanghai'],
 src:[['Review of Maritime Transport : environ 80 % du volume du commerce mondial de marchandises passe par la mer — CNUCED','https://unctad.org/topic/transport-and-trade-logistics/review-of-maritime-transport'],['Review of Maritime Transport 2025 : le transport maritime porte plus de 80 % des marchandises — ONU Info (2025)','https://news.un.org/en/story/2025/09/1165939'],['Histoire du canal de Panama (ouverture le 15 août 1914) — Autorité du canal de Panama','https://www.pancanal.com/en/history/'],['Blockage of the Suez Canal, March 2021 (Ever Given, 23-29 mars) — PortEconomics','https://porteconomicsmanagement.org/suez-canal-blockage-2021/'],['Shanghai dépasse 55 millions d’EVP en 2025 (Singapour 44,7 ; Ningbo-Zhoushan 43) — The Maritime Executive (2026)','https://www.maritime-executive.com/article/shanghai-exceeds-55-million-teu-in-container-throughput-for-2025'],['Suez Canal (inauguré le 17 novembre 1869) — History.com','https://www.history.com/topics/suez-canal']]},

/* 7 --------------------------------------------------------------- */
{short:'Internet : les câbles sous la mer',col:'lap',dur:50,dates:'aujourd’hui',proj:'plan',
 cam:[W(0),W(36),cam(40,165,-22,4.5),cam(50,165,-22,4.5)],
 zones:[],
 routes:[
  r('lap',3,9,2.6,[[-74,40.5],[-50,45],[-20,50],[-5,50]],{dash:true,sea:true,nohead:true}),r('lap',4,10,2.6,[[-74,40.5],[-40,30],[-9,38.7]],{dash:true,sea:true,nohead:true}),
  r('lap',5,12,2.6,[[-122,37],[-150,30],[-180,32],[150,33],[140,35]],{dash:true,sea:true,nohead:true}),
  r('lap',6,13,2.6,[[103.8,1.3],[103,1.5],[101.5,2.6],[99.5,4.7],[95,6],[85,5.2],[80,5],[60,13],[48,12],[43.4,12.6],[42.9,13.3],[42.4,14.3],[40.5,16.6],[38.8,20],[36.6,24.2],[34.4,27.4],[33.2,28.8],[32.5,30],[26,33.8],[20,34.6],[14.5,35.3],[11.3,37.4],[7,38.8],[5.5,42],[5.4,43.3]],{dash:true,sea:true,nohead:true}),
  r('lap',7,13,2.6,[[151.2,-33.9],[175,-37],[-160,0],[-122,37]],{dash:true,sea:true,nohead:true}),
  r('lap',8,13,2.6,[[-43,-23.5],[-39,-20.5],[-35,-12],[-31,-5],[-27,5],[-23,15],[-20,22],[-19.5,28.5],[-14,34],[-10.2,38.5],[-9,38.7]],{dash:true,sea:true,nohead:true}),
  r('lap',9,13,2.6,[[18.4,-34],[15,-31],[11,-24],[10,-14],[7,-3],[3.4,5.5],[-3,3.8],[-9,4],[-15,9],[-18.5,13],[-17.8,14.7]],{dash:true,sea:true,nohead:true}),
  r('lap',41,45,2.8,[[166.43,-22.32],[160,-27.5],[151.25,-33.85]],{dash:true,sea:true,nohead:true}),r('lap',42,46,2.8,[[166.47,-22.32],[172,-20.3],[178.44,-18.14]],{dash:true,sea:true,nohead:true})
 ],
 labels:[L(10,-35,47,'câbles transatlantiques',{nomark:true}),L(11,-170,36,'câbles transpacifiques',{nomark:true}),L(12,70,8,'Asie – Europe',{nomark:true}),
  L(41,157,-29,'Gondwana-1 (2008)',{nomark:true}),L(42,173,-21.6,'Gondwana-2 (2022)',{nomark:true}),L(41,166.44,-22.3,'Nouméa',{mark:'ville',dx:-10,al:'right'})],
 pulses:[],
 ph:[
  Ph(0,'Internet passe sous la mer','Presque toutes les données qui voyagent entre les continents (messages, vidéos, sites) passent par des centaines de câbles posés au fond des océans, et non par les satellites.','lap'),
  Ph(14,'Un câble, c’est quoi ?','Un câble sous-marin contient des fibres optiques, fines comme un cheveu, qui transportent la lumière. Des bateaux spéciaux les déroulent sur des milliers de kilomètres.','lap'),
  Ph(24,'Les centres de données','Les données sont stockées dans d’immenses bâtiments remplis d’ordinateurs, les centres de données, surtout en Amérique du Nord, en Europe et en Asie.','eur'),
  Ph(32,'Des régions moins bien reliées','Les grandes routes relient l’Amérique du Nord, l’Europe et l’Asie. Beaucoup de petites îles n’ont qu’un seul câble : s’il casse, elles sont coupées du monde.','ame'),
  Ph(40,'Et chez nous ?','La Nouvelle-Calédonie est reliée à Sydney par Gondwana-1 (2008) et à Fidji par Gondwana-2 (2022). Avec deux câbles, une coupure ne la prive plus d’internet.','kan')
 ],
 photos:[Sh('cablesous',14,20,'tr',2,'contain'),Sh('cablenavire',20,24,'bl',-2),Sh('datacenter',24,32,'tr',2),Sh('fibre',32,40,'bl',-2)],
 legend:[['lap','Grands câbles sous-marins (exemples)',1]],
 mots:[['Fibre optique','Fil de verre très fin qui transporte des informations sous forme de lumière.'],['Câble sous-marin','Câble posé au fond de la mer pour relier les continents.'],['Centre de données','Bâtiment qui stocke des milliers d’ordinateurs et de données.'],['Connecté','Relié à un réseau, comme internet.']],
 q:[['Par où passent la plupart des données entre continents ?','Par des câbles sous-marins.'],['Que contient un câble sous-marin ?','Des fibres optiques qui transportent la lumière.'],['Pourquoi les petites îles sont-elles fragiles ?','Elles n’ont souvent qu’un câble : s’il casse, elles sont coupées.'],['Combien de câbles relient la Nouvelle-Calédonie ?','Deux : Gondwana-1 (Sydney) et Gondwana-2 (Fidji).']],
 wiki:['Câble sous-marin','Fibre optique','Centre de données','Internet'],
 src:[['Submarine Cable FAQ : plus de 1,5 million de km de câbles en service, pourquoi pas les satellites — TeleGeography (2026)','https://www2.telegeography.com/submarine-cable-faqs-frequently-asked-questions'],['Do Submarine Cables Account For Over 99% of Intercontinental Data Traffic? — TeleGeography (2023)','https://resources.telegeography.com/2023-mythbusting-part-3'],['Mise en service des câbles sous-marins Gondwana-2 et Picot-2 (25 août 2022) — OPT-NC','https://office.opt.nc/fr/media/fichier/mise-en-service-des-cables-sous-marins-gondwana-2-et-picot-2'],['Sécurisation de l’Internet calédonien : Gondwana-1 relie Nouméa à Sydney depuis 2008 — OPT-NC (2019)','https://office.opt.nc/fr/media/fichier/securisation-de-l-internet-caledonien']]},

/* 8 --------------------------------------------------------------- */
{short:'Voyager et migrer',col:'fra',dur:56,dates:'aujourd’hui',proj:'plan',
 cam:[W(0),W(56)],
 zones:[],
 routes:[
  r('fra',3,9,2.2,[[55.4,25.25],[2.5,49]],{step:1}),r('fra',3.5,9.5,2.2,[[55.4,25.25],[103.9,1.35]],{step:1}),r('fra',4,10,2.2,[[55.4,25.25],[151.2,-33.9]],{step:1}),
  r('fra',4.5,10.5,2.2,[[-0.45,51.47],[-73.8,40.6]],{step:1}),r('fra',5,11,2.2,[[139.8,35.55],[-118.4,33.9]],{step:1}),r('fra',5.5,11.5,2.2,[[103.9,1.35],[166.21,-22.01]],{step:1}),
  r('ame',22,28,3.4,[[-99,20],[-100,28],[-98,35]],{taper:true}),r('ame',22.5,28.5,3.4,[[78,22],[65,24],[55,25]],{taper:true}),
  r('ame',23,29,3.4,[[0,12],[5,25],[8,38],[10,46]],{taper:true}),r('ame',23.5,29.5,3.4,[[38,35],[33,38],[20,45],[12,50]],{taper:true}),
  r('ame',24,30,3.4,[[121,14],[100,20],[60,25]],{taper:true}),r('ame',30,36,3,[[-176.2,-13.3],[175,-17],[166.4,-22.25]],{taper:true})
 ],
 labels:[L(3,55.4,25.25,'Dubaï',{mark:'aero',dx:10,al:'left'}),L(4,103.9,1.35,'Singapour',{mark:'aero',dx:-10,dy:10,al:'right'}),L(4.5,-0.45,51.47,'Londres',{mark:'aero',dx:-10,al:'right'}),
  L(5,-84.4,33.6,'Atlanta',{mark:'aero',dx:10,al:'left'}),
  L(23,-102,32,'Mexique → États-Unis',{nomark:true,dx:-8,al:'right'}),L(24,62,30,'Asie du Sud → pays du Golfe',{nomark:true}),L(25,4,30,'Afrique → Europe',{nomark:true,dx:-8,al:'right'}),
  L(31,-176.2,-13.3,'Wallis-et-Futuna → Nouvelle-Calédonie',{nomark:true,dx:8,al:'left'})],
 pulses:[],
 ph:[
  Ph(0,'Le ciel des avions','De grands aéroports « carrefours » (Dubaï, Singapour, Londres, Atlanta…) relient tous les continents. On fait le tour de la Terre en moins de deux jours.','fra'),
  Ph(12,'Le tourisme','En 2024, il y a eu environ 1,4 milliard d’arrivées de touristes internationaux. Ils visitent surtout l’Europe, l’Asie et l’Amérique du Nord.','xet'),
  Ph(20,'Les migrations','Environ 300 millions de personnes vivent dans un autre pays que celui où elles sont nées. Elles partent pour travailler, étudier, fuir une guerre ou une catastrophe.','ame'),
  Ph(30,'Dans le Pacifique','Les Wallisiens et les Futuniens sont plus nombreux en Nouvelle-Calédonie qu’à Wallis-et-Futuna. Beaucoup d’Océaniens partent aussi vers la Nouvelle-Zélande et l’Australie.','kan'),
  Ph(42,'Un monde de mobilités','Touristes, étudiants, travailleurs, réfugiés : jamais les humains n’ont autant voyagé. Mais tous n’ont pas la même liberté de circuler.','eur')
 ],
 photos:[Sh('aeroportdubai',1,9,'tr',2),Sh('avion',9,14,'bl',-2),Sh('touristes',12,20,'tr',2)],
 legend:[['fra','Grandes lignes aériennes (exemples)'],['ame','Grandes routes des migrations (exemples)'],['fra','Grand aéroport','aero']],
 mots:[['Aéroport carrefour','Grand aéroport où l’on change d’avion (en anglais : hub).'],['Tourisme','Voyage pour le loisir, hors de chez soi.'],['Migrant','Personne qui s’installe dans un autre pays ou une autre région.'],['Réfugié','Personne qui a dû fuir son pays à cause d’une guerre ou de persécutions.']],
 q:[['Combien d’arrivées de touristes internationaux en 2024 ?','Environ 1,4 milliard.'],['Combien de migrants internationaux dans le monde ?','Environ 300 millions.'],['Pourquoi migre-t-on ?','Pour travailler, étudier, fuir une guerre ou une catastrophe.'],['Quelle communauté océanienne est plus nombreuse en Nouvelle-Calédonie que chez elle ?','Les Wallisiens et Futuniens.']],
 wiki:['Tourisme','Migration humaine','Aéroport international de Dubaï','Wallisiens et Futuniens'],
 src:[['World Tourism Barometer : 1,4 milliard d’arrivées de touristes internationaux en 2024 — ONU Tourisme','https://www.untourism.int/node/14904'],['International Migrant Stock 2024 : 304 millions de migrants internationaux (3,7 % de la population mondiale) — ONU DAES, relayé par Destatis','https://www.destatis.de/EN/Themes/Countries-Regions/International-Statistics/Data-Topic/Population-Labour-Social-Issues/DemographyMigration/Migrants.html'],['Rapport annuel Wallis-et-Futuna 2021 : émigration vers la Nouvelle-Calédonie dès le début des années 1970, 22 520 personnes de communauté wallisienne ou futunienne en 2019 — IEOM','https://www.ieom.fr/IMG/rapport_annuel_ieom_wallis-et-futuna_2021/index-20.html'],['Populations légales des circonscriptions de Wallis-et-Futuna en 2023 (11 151 habitants) — Insee','https://www.insee.fr/fr/statistiques/7756933']]},

/* 9 --------------------------------------------------------------- */
{short:'Un téléphone fait le tour du monde',col:'zh',dur:56,dates:'aujourd’hui',proj:'plan',
 cam:[W(0),W(56)],
 zones:[],
 routes:[
  r('sand',6,11,2.8,[[25.5,-11],[60,-15],[100,10],[118,24]],{dash:true}),r('sand',7,12,2.8,[[-69,-23.5],[-120,-10],[-180,10],[118,24]],{dash:true}),r('sand',7.5,12.5,2.8,[[121,-30],[118,24]],{dash:true}),
  r('lap',14,19,2.8,[[121,24.8],[118,24]],{straight:true}),r('lap',14.5,19.5,2.8,[[127,37.5],[118,24]],{}),r('lap',15,20,2.8,[[139.7,35.7],[118,24]],{}),
  r('zh',22,30,3.2,[[114,22.5],[60,25],[10,48]],{}),r('zh',22.5,30.5,3.2,[[114,22.5],[-170,40],[-100,40]],{}),r('zh',23,31,3.2,[[114,22.5],[140,-10],[166.4,-22.3]],{})
 ],
 labels:[L(2,-122,37.4,'Conception (Californie, Corée…)',{mark:'usine',dx:10,al:'left'}),
  L(6,25.5,-11,'cobalt (RD Congo)',{mark:'mine',dx:10,al:'left'}),L(7,-69,-23.5,'lithium (Chili)',{mark:'mine',dx:-10,al:'right'}),L(7.5,121,-30,'lithium (Australie)',{mark:'mine',dx:10,al:'left'}),
  L(8,110,41.8,'terres rares (Chine)',{mark:'mine',dx:-10,al:'right'}),
  L(14,121,24.8,'puces (Taïwan)',{mark:'usine',dx:10,al:'left'}),L(14.5,127,37.5,'écrans (Corée du Sud)',{mark:'usine',dx:10,al:'left'}),
  L(18,114,22.5,'Assemblage (Chine, Inde, Vietnam)',{mark:'usine',dx:-10,dy:12,al:'right',gold:true}),
  L(27,166.44,-22.27,'vendu partout, jusqu’à Nouméa',{mark:'ville',dx:10,al:'left'})],
 pulses:[],
 ph:[
  Ph(0,'Inventé ici…','Un téléphone est souvent conçu en Californie, en Corée du Sud ou en Chine, par une firme transnationale : une entreprise installée dans de nombreux pays.','zh'),
  Ph(6,'…avec des métaux du monde entier','Sa batterie contient du lithium (Australie, Chili) et du cobalt, dont plus des deux tiers viennent de République démocratique du Congo. Les terres rares viennent surtout de Chine.','sand'),
  Ph(13,'…des pièces d’Asie','Les puces les plus fines sont fabriquées à Taïwan, les écrans en Corée du Sud, d’autres pièces au Japon ou en Chine.','lap'),
  Ph(20,'…assemblé et vendu partout','Le téléphone est assemblé en Chine, en Inde ou au Vietnam, puis expédié par avion ou porte-conteneurs vers tous les continents.','zh'),
  Ph(32,'Une chaîne mondiale','Chaque étape se fait là où c’est le moins cher ou le plus efficace : c’est la mondialisation. Mais les mines et les usines posent des questions de conditions de travail et d’environnement.','ame'),
  Ph(44,'Recycler','Un vieux téléphone contient des métaux précieux. Le rapporter dans un point de collecte permet de les récupérer.','neo')
 ],
 photos:[Sh('smartphone',1,6,'tr',2),Sh('cobalt',6,12,'bl',-2),Sh('lithium',12,16,'tr',2),Sh('puce',14,20,'bl',-2),Sh('usinechine',20,28,'tr',2)],
 legend:[['sand','Matières premières',1],['lap','Composants'],['zh','Produit fini vers le monde'],['ere','Mine','mine'],['lap','Usine, centre de conception','usine']],
 mots:[['Mondialisation','Mise en relation de toutes les régions du monde par les échanges.'],['Firme transnationale','Grande entreprise présente dans de nombreux pays.'],['Composant','Pièce qui entre dans la fabrication d’un objet.'],['Chaîne de production','Suite des étapes pour fabriquer un produit.']],
 q:[['Où est souvent assemblé un téléphone ?','En Chine, en Inde ou au Vietnam.'],['D’où vient l’essentiel du cobalt ?','De République démocratique du Congo.'],['Qu’est-ce qu’une firme transnationale ?','Une grande entreprise présente dans de nombreux pays.'],['Pourquoi recycler un vieux téléphone ?','Pour récupérer ses métaux et éviter la pollution.']],
 wiki:['Mondialisation','Entreprise multinationale','Cobalt','Smartphone'],
 src:[['Mineral Commodity Summaries 2026 : cobalt (Congo-Kinshasa, 73 % de la production mondiale) — USGS (2026)','https://pubs.usgs.gov/periodicals/mcs2026/mcs2026-cobalt.pdf'],['Mineral Commodity Summaries 2026 : lithium (Australie, Chine, Chili) — USGS (2026)','https://pubs.usgs.gov/periodicals/mcs2026/mcs2026-lithium.pdf'],['Mineral Commodity Summaries 2026 : terres rares (Chine, 270 000 t extraites) — USGS (2026)','https://pubs.usgs.gov/periodicals/mcs2026/mcs2026-rare-earths.pdf'],['Bayan Obo, Mongolie-Intérieure : gisement géant de terres rares (Bulletin 2143) — USGS','https://pubs.usgs.gov/bul/b2143/intro.html']]},

/* 10 -------------------------------------------------------------- */
{short:'Un monde inégal',col:'ame',dur:52,dates:'aujourd’hui',proj:'plan',
 cam:[W(0),W(52)],
 zones:[Rg([-100,45,18],'neo',4,0.45,2),Rg([10,52,12],'neo',4.5,0.45,2),Rg([138,37,5],'neo',5,0.45,2),Rg([134,-26,12],'neo',5.5,0.45,2),Rg([172,-41,4],'neo',6,0.45,2),
  Rg([5,14,9],'ame',12,0.5,2),Rg([22,5,9],'ame',12.5,0.5,2),Rg([40,5,6],'ame',13,0.5,2),Rg([70,32,4],'ame',13.5,0.45,2)],
 routes:[],
 labels:[L(4,-100,45,'Amérique du Nord',{nomark:true}),L(4.5,10,52,'Europe',{nomark:true}),L(5,138,37,'Japon',{nomark:true,dx:8,al:'left'}),L(5.5,134,-26,'Australie',{nomark:true}),
  L(12,5,14,'Sahel',{nomark:true,big:true}),L(12.5,22,5,'Afrique centrale',{nomark:true}),
  L(30,NC[0],NC[1],'Nouvelle-Calédonie',{mark:'star',dx:10,al:'left',gold:true})],
 pulses:[],
 ph:[
  Ph(0,'Mesurer le développement','L’indice de développement humain (IDH) combine trois choses : la santé (espérance de vie), l’éducation (années d’école) et le niveau de vie (revenu).','eur'),
  Ph(4,'Les pays les plus développés','Parmi les premiers : des pays d’Europe du Nord, la Suisse, l’Australie, le Japon, le Canada. On y vit longtemps, presque tous les enfants vont à l’école.','neo'),
  Ph(12,'Les pays les moins développés','En bas du classement : surtout des pays d’Afrique subsaharienne, comme ceux du Sahel. Guerres, sécheresses et pauvreté y rendent la vie difficile.','ame'),
  Ph(22,'Des inégalités partout','Dans un même pays, il y a des quartiers riches et des bidonvilles, des villes équipées et des campagnes isolées.','eur'),
  Ph(30,'Et la Nouvelle-Calédonie ?','Le niveau de vie moyen y est élevé pour le Pacifique, mais les inégalités entre habitants et entre provinces restent fortes.','kan'),
  Ph(40,'Agir','Écoles, centres de santé, eau potable, électricité : l’aide entre pays et les politiques publiques cherchent à réduire ces inégalités.','neo')
 ],
 photos:[Sh('idh',1,12,'tr',2,'contain'),Sh('ecole_afrique',12,20,'bl',-2),Sh('bidonville',22,30,'tr',2)],
 legend:[['neo','IDH très élevé (exemples)'],['ame','IDH faible (exemples)']],
 mots:[['Développement','Amélioration des conditions de vie : santé, éducation, revenus.'],['IDH','Indice de développement humain : note de 0 à 1 calculée par l’ONU.'],['Espérance de vie','Nombre moyen d’années qu’un bébé peut espérer vivre.'],['Inégalité','Différence injuste de conditions de vie.']],
 q:[['Quelles sont les trois mesures de l’IDH ?','La santé, l’éducation et le niveau de vie.'],['Où sont les pays au plus fort IDH ?','En Europe du Nord, en Amérique du Nord, au Japon, en Australie…'],['Où sont les pays au plus faible IDH ?','Surtout en Afrique subsaharienne.'],['Y a-t-il des inégalités dans les pays riches ?','Oui : entre quartiers, entre villes et campagnes.']],
 wiki:['Indice de développement humain','Pays en développement','Sahel','Inégalités de revenus'],
 src:[['Human Development Report 2025 : tableau de l’IDH (Islande 1re, Suisse 2e, Niger 188e) — PNUD (2025)','https://hdr.undp.org/sites/default/files/2025_HDR/HDR25_Statistical_Annex_HDI_Table.pdf'],['En 2020, un Calédonien sur cinq est en situation de pauvreté ; niveau de vie médian deux fois plus élevé en province Sud qu’aux Îles — ISEE','https://isee.nc/sites/default/files/2025-11/pauvrete2020-synthese.pdf'],['Rapport annuel économique 2025 Nouvelle-Calédonie : PIB par habitant proche de celui de la Nouvelle-Zélande, loin devant les autres îles du Pacifique — IEOM (2026)','https://www.ieom.fr/IMG/pdf/rapport_annuel_nc_2025_-_bd2.pdf']]},

/* 11 -------------------------------------------------------------- */
{short:'Le climat change : le Pacifique en première ligne',col:'pol',dur:54,when:[2015,2026],dates:'aujourd’hui',proj:'plan',
 cam:[W(0),W(10),WP(14),cam(24,175,-10,1.4),cam(54,175,-10,1.4)],
 zones:[Rg([-40,75,10],'ice',3,0.6,2),Rg([0,-78,20],'ice',3.5,0.5,2)],
 routes:[],
 labels:[L(3,-40,75,'fonte des glaces',{nomark:true}),
  L(25,179.2,-8.5,'Tuvalu',{mark:'ville',sub:'environ 10 000 hab.',dx:10,al:'left',gold:true}),L(26,173,1.4,'Kiribati',{mark:'ville',dx:10,al:'left'}),
  L(27,171.4,7.1,'îles Marshall',{mark:'ville',dx:10,al:'left'}),L(28,147,-18.5,'Grande Barrière de corail',{nomark:true,dx:-8,al:'right'}),
  L(29,NC[0],NC[1],'Nouvelle-Calédonie',{mark:'star',dx:10,al:'left'})],
 pulses:[Pu(25,179.2,-8.5,'#ff6b57',true),Pu(26,173,1.4,'#ff6b57',true)],
 ph:[
  Ph(0,'La Terre se réchauffe','En brûlant du charbon, du pétrole et du gaz, les humains rejettent des gaz à effet de serre. La planète se réchauffe, les glaciers et les glaces des pôles fondent.','pol'),
  Ph(10,'La mer monte','En chauffant, l’eau des océans prend plus de place, et elle reçoit l’eau des glaces : le niveau de la mer monte (environ 20 cm depuis 1900). Les côtes basses sont menacées.','mis'),
  Ph(20,'Les atolls en danger','Tuvalu, Kiribati ou les îles Marshall dépassent à peine la mer. En 2023, Tuvalu et l’Australie ont signé un traité : chaque année, jusqu’à 280 Tuvaluans peuvent s’installer en Australie.','pol'),
  Ph(32,'Coraux et cyclones','Une eau trop chaude fait blanchir les coraux. On craint aussi des cyclones plus violents et des sécheresses plus fortes.','ame'),
  Ph(42,'Agir à deux échelles','Le monde s’est fixé des objectifs (accord de Paris, 2015) pour limiter le réchauffement. Localement, on s’adapte : protéger les mangroves et les récifs, construire loin du rivage, économiser l’énergie.','neo')
 ],
 photos:[Sh('banquise',1,10,'tr',2),Sh('funafuti',20,30,'tr',2),Sh('blanchiment',32,40,'tr',2),Sh('digue',42,50,'bl',-2)],
 legend:[['ice','Glaces qui fondent'],['pol','États insulaires très menacés','ville']],
 mots:[['Réchauffement climatique','Hausse des températures moyennes de la Terre causée par les activités humaines.'],['Gaz à effet de serre','Gaz qui retiennent la chaleur autour de la Terre.'],['Atoll','Île basse en forme d’anneau, formée par des coraux.'],['S’adapter','Changer sa façon de vivre pour faire face à un nouveau danger.']],
 q:[['Pourquoi le niveau de la mer monte-t-il ?','L’eau chauffe et prend plus de place, et les glaces fondent.'],['Quels pays du Pacifique sont les plus menacés ?','Les atolls : Tuvalu, Kiribati, îles Marshall.'],['Que prévoit le traité entre Tuvalu et l’Australie ?','Jusqu’à 280 Tuvaluans par an peuvent s’installer en Australie.'],['Citer une façon de s’adapter.','Protéger mangroves et récifs, construire loin du rivage, économiser l’énergie.']],
 wiki:['Réchauffement climatique','Élévation du niveau de la mer','Tuvalu','Accord de Paris sur le climat'],
 src:[['AR6, Résumé pour les décideurs : niveau de la mer + 0,20 m entre 1901 et 2018 — GIEC (2021)','https://www.ipcc.ch/report/ar6/wg1/downloads/report/IPCC_AR6_WGI_SPM.pdf'],['Entry into force of historic Australia-Tuvalu Falepili Union (traité signé en novembre 2023, 280 Tuvaluans par an) — Premier ministre d’Australie (2024)','https://www.pm.gov.au/media/entry-force-historic-australia-tuvalu-falepili-union'],['L’Accord de Paris (adopté le 12 décembre 2015, 195 Parties) — Nations unies','https://www.un.org/en/climatechange/paris-agreement'],['Tuvalu : chiffres clés (population, superficie 26 km²) — Communauté du Pacifique (SPC), Division des statistiques','https://sdd.spc.int/tv']]},

/* 12 -------------------------------------------------------------- */
{short:'La Nouvelle-Calédonie dans la mondialisation',col:'kan',dur:56,dates:'aujourd’hui',proj:'plan',
 cam:[WP(0),WP(56)],
 zones:[],
 routes:[
  r('zh',4,11,3.2,[[166.4,-22.3],[164,-14],[160,-4.5],[152,-1],[141,3],[130,12],[125,22],[122.3,30.8]],{sea:true}),r('gbr',5,12,2.6,[[166.4,-22.3],[164,-14],[160,-4.5],[152,-1],[148,8],[145,18],[141,26],[137,30.5],[134.5,33]],{sea:true}),r('aus',5.5,12.5,2.6,[[166.4,-22.3],[164,-14],[160,-4.5],[152,-1],[145,10],[137,20],[131,26],[128.6,30.6],[127.6,33.1],[127.7,34.4]],{sea:true}),
  r('fra',16,24,3.2,[[2.3,48.9],[30,30],[70,10],[110,-5],[150,-15],[166.4,-22.3]],{}),r('fra',17,24,2.6,[[118,30],[140,0],[166.4,-22.3]],{}),
  r('fra',17.5,24,2.6,[[151,-34],[166.4,-22.3]],{}),r('fra',18,24,2.6,[[103.8,1.3],[140,-12],[166.4,-22.3]],{})
 ],
 labels:[L(1,166.4,-22.3,'Nouvelle-Calédonie',{mark:'star',dx:10,al:'left',gold:true}),
  L(10,118,32,'Chine',{nomark:true,big:true,sub:'premier client'}),L(11,138,36.5,'Japon',{nomark:true,dx:8,al:'left'}),L(12,128,38,'Corée du Sud',{nomark:true,dy:-12}),
  L(20,2.3,48.9,'France',{nomark:true,big:true,sub:'premier fournisseur'}),L(21,151,-34,'Australie',{nomark:true,dx:-8,al:'right'}),L(22,103.8,1.3,'Singapour',{nomark:true,dx:-8,al:'right'})],
 pulses:[],
 ph:[
  Ph(0,'Vendre au monde','La Nouvelle-Calédonie vend surtout des produits du nickel, en grande partie en Asie : la Chine est son premier client ; la Corée du Sud, le Japon et Taïwan en achètent aussi.','zh'),
  Ph(14,'Acheter au monde','Elle achète beaucoup : nourriture, carburant, voitures, machines, médicaments. La France est son premier fournisseur, puis Singapour, l’Australie, la Chine…','fra'),
  Ph(26,'Toujours reliée','Le port de Nouméa reçoit les conteneurs, La Tontouta les avions, Gondwana-1 et 2 les données d’internet : sans ces portes d’entrée, le pays serait isolé.','mis'),
  Ph(36,'Un petit pays dans un grand monde','Le prix mondial du nickel, la concurrence de l’Indonésie, le prix du pétrole ou une crise en Asie ont des effets directs ici : c’est cela, la mondialisation.','eur'),
  Ph(46,'Changer d’échelle','Pour comprendre un lieu, on change d’échelle : la tribu ou le quartier, la commune, la Nouvelle-Calédonie, le Pacifique, le monde.','kan')
 ],
 photos:[Sh('noumeaport',26,34,'tr',2),Sh('tontouta',30,36,'bl',-2),Sh('conteneurs',14,22,'tr',2)],
 legend:[['zh','Exportations (surtout nickel) vers l’Asie'],['fra','Importations']],
 mots:[['Exportation','Vente de produits à l’étranger.'],['Importation','Achat de produits à l’étranger.'],['Échelle','Taille de l’espace étudié : locale, régionale, mondiale.']],
 q:[['Quel est le premier client de la Nouvelle-Calédonie ?','La Chine.'],['Quel est son premier fournisseur ?','La France.'],['Citer trois portes d’entrée vers le monde.','Le port de Nouméa, l’aéroport de La Tontouta, les câbles internet.'],['Comment une crise mondiale peut-elle toucher le pays ?','Par le prix du nickel, du pétrole, ou la concurrence.']],
 wiki:['Mondialisation','Économie de la Nouvelle-Calédonie','Commerce international','Échelle (géographie)'],
 src:[['Rapport annuel 2025, Nouvelle-Calédonie : commerce extérieur (nickel 90 % des exportations, principaux clients et fournisseurs) — IEOM (2026)','https://www.ieom.fr/IMG/pdf/rapport_annuel_nc_2025_-_bd2.pdf'],['Synthèse annuelle 2025 : « L’économie calédonienne peine à se redresser » (cours du nickel au plus bas en cinq ans) — IEOM (2026)','https://www.ieom.fr/IMG/pdf/synthese_annuelle_nc_2025.pdf'],['Mineral Commodity Summaries 2026 : nickel (Indonésie 2,6 Mt sur 3,9 Mt produites en 2025 ; Nouvelle-Calédonie 0,14 Mt) — USGS (2026)','https://pubs.usgs.gov/periodicals/mcs2026/mcs2026-nickel.pdf'],['Port de Nouméa : l’activité en net recul en 2024 (61 950 conteneurs EVP) — Les Nouvelles Calédoniennes (2025)','https://www.lnc.nc/article/port-de-noumea-l-activite-en-net-recul-en-2024-plombee-par-les-emeutes'],['Sécurisation de l’internet calédonien : câbles Gondwana-1 et Gondwana-2 — OPT-NC (2019)','https://office.opt.nc/fr/media/fichier/securisation-de-l-internet-caledonien']]}
];

A.add({id:'mondial',title:'Le monde et la mondialisation',tag:'12 chapitres · repères, milieux, population, flux, inégalités, climat',col:'mis',proj:'plan',
 sub:'Le monde en 12 cartes : se repérer, reliefs et climats, où vivent les humains, villes géantes, routes maritimes, câbles, voyages et migrations, mondialisation d’un objet, inégalités, climat qui change, et la place de la Nouvelle-Calédonie.',
 frise:null,
 info:'<p><b>Géographie, cycle 3 et collège</b> : repères (continents, océans, lignes imaginaires), grands ensembles de relief et fleuves, climats et milieux, répartition de la population, métropoles, mondialisation (flux, interfaces, firmes transnationales), inégalités de développement, changement climatique, changement d’échelle.</p><p><b>Collège</b> : 6e, thème 4 « Le monde habité » (chapitre 4) ; 5e, thème 1 (chapitres 4 et 10) et thème 3 (chapitre 11) ; 4e, thèmes 1 à 3 (chapitres 5 à 8).</p><p><b>Croquis</b> : exportez la carte muette ou vierge en PDF pour faire compléter un planisphère.</p><p><b>Sources</b> : ONU (World Urbanization Prospects 2025), DNV/Menon et classements portuaires 2024-2025, OPT, IEOM (partenaires commerciaux), traité Falepili (Australie-Tuvalu, 2023). Zones et routes tracées à grands traits ; chiffres arrondis.</p>',
 chapters:CH});
})();
