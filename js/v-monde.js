/* Atlas historique du Pacifique · Atlas d’histoire — Collège — © 2026 Nicolas BOUZA. Idée, conception et réalisation : Nicolas BOUZA,
   avec l’assistance de Claude (Anthropic). Licence CC BY-NC-ND 4.0. https://github.com/nicobouza2-creator/atlas-historique-du-pacifique */
/* Volet 1 — Peupler la Terre (planisphère). Caméra : z = 0.42 montre le monde entier. */
(function(){
'use strict';
var A=window.ATLAS,r=A.r,L=A.L,Pu=A.Pu,Ph=A.Ph,Sh=A.Sh,Lz=A.Lz,Rg=A.Rg,AFRICA=A.K.AFRICA;
function ext(o,x){Object.keys(x).forEach(function(k){o[k]=x[k];});return o;}

/* contours schématiques des régions */
var EURASIE_SUD=[[-9,36],[-9,44],[10,47],[30,47],[45,44],[60,42],[80,38],[100,42],[118,42],[124,38],[122,28],[116,20],[110,8],[116,-9],[104,-8],[96,5],[90,20],[78,6],[70,20],[58,24],[50,28],[44,12],[36,22],[33,30],[20,36],[10,37]];
var NEAN=[[-10,36],[-10,48],[-2,52],[10,53],[25,52],[45,50],[65,48],[88,52],[90,47],[70,38],[55,34],[40,31],[34,31],[30,36],[22,36],[14,37],[0,37]];
var NEAN_EU=[[-10,36],[-10,44],[-5,49],[2,51.5],[10,53],[22,52],[36,50],[44,46],[48,40],[40,36.5],[30,36],[22,36],[15,37],[8,43],[-1,36.5]];
var ASIE_SUD=[[33,31],[36,37],[48,38],[62,37],[75,36],[88,30],[100,30],[112,34],[122,32],[122,22],[110,17],[109,10],[119,5],[127,-8],[117,-10],[103,-8],[95,5],[92,20],[86,19],[80,5],[72,18],[66,24],[58,22],[52,14],[43,11],[40,16],[35,26]];
var ASIE_NORD=[[48,38],[50,56],[70,60],[100,58],[125,54],[140,48],[142,36],[131,31],[122,32],[112,34],[100,30],[88,30],[75,36],[62,37]];
var SAHUL=[[112,-22],[114,-36],[130,-33],[140,-39],[150,-39],[154,-27],[146,-17],[152,-10],[147,-5],[140,-1.5],[131,-0.5],[130,-5],[136,-10],[128,-13],[120,-18]];
var EUROPE=[[-10,36],[-10,44],[-6,51],[-8,58],[4,59],[12,57],[22,60],[32,60],[42,56],[42,47],[30,45],[29,40.5],[23,36],[15,36.5],[5,43],[-1,36.5]];
var GLACE_EU=[[-10,53],[-4,52],[4,53.5],[12,52.5],[22,53.5],[34,56],[46,60],[56,66],[60,72],[40,75],[18,76],[0,70],[-12,62]];
var GLACE_ALPES=[[5.5,45],[9,47.3],[14,47.5],[14,46.2],[9,45.6],[6.5,44.3]];
var GLACE_LAU=[[-116,50],[-104,45.5],[-92,41],[-82,40],[-73,41],[-64,45],[-56,51],[-60,58],[-64,66],[-75,74],[-95,79],[-118,77],[-128,71],[-124,64],[-119,58]];
var GLACE_COR=[[-152,61.5],[-141,59.5],[-134,55],[-128,49.5],[-122,47],[-116,48.5],[-118,55],[-124,61],[-136,64.5],[-147,64]];
var GLACE_GAP=[[-118,49],[-114,49.5],[-117,57],[-123,64],[-128,66],[-126,61],[-120,55]];
var SIBERIE=[[100,50],[100,72],[140,74],[180,70],[-170,66],[178,62],[160,58],[142,52],[125,50]];
var AMERIQUES=[[-169,66],[-157,72],[-125,71],[-90,74],[-60,60],[-52,47],[-64,43],[-78,24],[-58,12],[-48,0],[-33,-6],[-38,-15],[-53,-34],[-64,-42],[-63,-56],[-76,-54],[-74,-40],[-70,-19],[-82,-5],[-78,7],[-90,12],[-106,20],[-118,32],[-126,42],[-135,57],[-153,57],[-166,54]];
var F_CROISSANT=[[34,30.5],[35.5,36.5],[38,38.6],[42,38.6],[45.5,37],[47.5,34],[48.5,31],[46.5,31],[44.5,34.5],[41,36.3],[37.5,35.8],[36.5,33],[35.8,30.2]];
var F_CHINE=[[104,27],[107,35.5],[112,39.5],[118.5,38.5],[122,31.5],[119.5,26.5],[111,25.5]];
var F_MESO=[[-105,22],[-98,23],[-91.5,19],[-88,15.5],[-91.5,13.8],[-97,15.5],[-105,19]];
var F_GUINEE=[[137,-3.4],[141,-3.6],[146,-5.2],[148,-7.5],[145,-7.6],[140,-6.2],[137,-4.6]];
var F_ANDES=[[-80,-4],[-76,-4],[-68,-13],[-64,-18],[-66,-23],[-70,-22],[-76,-14.5],[-81,-6.5]];
var F_SAHEL=[[-16,12.5],[-12,17],[0,17.5],[15,16.5],[30,15.5],[37,13],[35,9.5],[20,9.5],[5,9.8],[-10,9.5]];
var F_USA=[[-92,33.5],[-91,40],[-84,41.5],[-80,38.5],[-82,34],[-88,32.5]];
var P_ASIE_EST=[[100,22],[104,33],[110,40],[120,42],[126,43],[131,42.5],[142,45.5],[146,43],[141,34],[131,30.5],[123,24],[121,21.5],[110,18],[105,20]];
var P_ASIE_SUD=[[66,24],[71,35],[78,33],[84,28.5],[90,27.5],[93,24],[92,20.5],[88,21],[82,15],[80.5,7],[79,5.5],[76,7.5],[72,19],[68,22.5]];
var P_GUINEE=[[-8,4],[-9,9],[0,12.5],[9,13.5],[13,10],[10,3.5],[2,5.5]];
var P_NIL=[[29.5,31.6],[32.5,31.6],[33.5,24],[32,22],[30,24]];
var P_USA=[[-90,41],[-88,45],[-76,45.5],[-69,44],[-74,38.5],[-78,35],[-85,37]];
var P_BRESIL=[[-52,-25],[-48,-19.5],[-41,-19],[-39,-13],[-34.5,-7],[-36,-11],[-40,-22.5],[-47,-26]];
var P_JAVA=[[105,-5.7],[115,-6.4],[115,-9],[105.3,-7.6]];
var P_MEXIQUE=[[-104,21],[-98,22],[-95.5,18.5],[-99,17],[-104,19]];
var V_SAHARA=[[-16,18],[-13,28],[-5,32],[10,32.5],[25,31],[33,28],[36,20],[30,15.5],[15,15],[0,16]];
var V_SIBERIE=[[60,62],[75,72],[105,78],[140,74],[170,70],[178,64],[160,58],[130,56],[105,57],[80,58]];
var V_NORD=[[-165,62],[-160,71],[-125,71],[-95,76],[-70,80],[-25,82],[-20,70],[-42,59.5],[-55,52],[-62,58],[-80,52.5],[-95,57],[-110,58],[-130,60],[-150,62]];
var V_AMAZONIE=[[-74,-2],[-70,4],[-58,3.5],[-51,-1],[-52,-9],[-63,-12.5],[-72,-9]];
var V_AUSTRALIE=[[115.5,-22.5],[122,-19.5],[134,-17.5],[142,-21],[144,-29],[137,-31],[127,-30.5],[117,-29]];
var V_TIBET=[[78,31],[80,36],[92,38.5],[101,36],[99,29.5],[90,28.2]];
var NCM=[[165.6,-21.3,2.0],[167.2,-20.9,0.7],[168.0,-21.5,0.6],[166.5,-20.55,0.5],[167.5,-22.6,0.5]];

var DENI=[[76,43],[80,49],[84,53.5],[95,53],[108,53.5],[120,53.5],[130,49],[135,46],[131,42],[125,39.5],[122,36],[122,30],[122.3,25.4],[121.8,21.8],[120,22],[113,21],[111,18],[108,18],[106,17],[102,17],[100,19],[97,23],[93,27],[88,28.5],[82,31],[78,34.5],[75,38]];
var DENI_SUD=[[95,6],[99,14],[105,15.5],[109,12],[116,8],[119,11],[124,14],[127,8],[131,-1],[141,-2.5],[141,-9],[128,-10],[116,-10.5],[105,-8],[95,3]];
var CH=[

/* 1 --------------------------------------------------------------- */
{short:'Avant nous : les premiers humains',col:'ere',dur:44,when:[-7000000,-400000],dates:'il y a 7 millions d’années à 400 000 ans',
 cam:[{t:0,lon:22,lat:8,z:0.95},{t:10,lon:40,lat:20,z:0.8},{t:30,lon:58,lat:24,z:0.62},{t:44,lon:58,lat:24,z:0.62}],
 zones:[
  Rg(AFRICA,'ere',2,0.5,2),
  Rg(EURASIE_SUD,'ere',15,0.42,2,{c:[36,30],r0:2,r1:95,d:17}),
  Rg(NEAN,'nean',33,0.55,2.5)
 ],
 routes:[
  r('ere',10,22,3,[[36,5],[35,18],[34,29],[37,35],[44.3,41.2]]),
  r('ere',17,30,3,[[38,33],[52,32],[66,29],[78,24],[92,23],[100,16],[103,5],[108,-4],[110.8,-7.3]]),
  r('ere',23,32,2.6,[[96,22],[106,29],[112,35],[115.8,39.6]]),
  r('ere',21,30,2.6,[[38,37],[29,40.5],[20,44],[10,44.5],[2,43],[-3.4,42.3]])
 ],
 labels:[
  L(1,17,16,'Toumaï (Tchad)',{sub:'environ 7 millions d’années',mark:'site',dx:-10,al:'right'}),
  L(4,40.5,11.1,'Lucy (Éthiopie)',{sub:'environ 3,2 millions d’années',mark:'site',dx:10,al:'left'}),
  L(21.5,44.3,41.3,'Dmanissi (Géorgie)',{sub:'environ 1,8 million d’années',mark:'site',dx:10,dy:-8,al:'left'}),
  L(29.5,110.8,-7.4,'Java',{sub:'+ de 1 million d’années',mark:'site',dy:16}),
  L(31.5,115.9,39.7,'Zhoukoudian (Chine)',{sub:'environ 700 000 ans',mark:'site',dx:10,dy:-6,al:'left'}),
  L(30,-3.5,42.35,'Atapuerca (Espagne)',{sub:'+ de 1 million d’années',mark:'site',dy:-26}),
  L(35,20,49.5,'Néandertaliens',{nomark:true,big:true}),
  L(36,84.7,51.4,'Denisova (Sibérie)',{mark:'site',dy:-14})
 ],
 pulses:[Pu(1,17,16,'#ffd166'),Pu(4,40.5,11.1,'#ffd166'),Pu(22,44.3,41.3,'#ffd166')],
 ph:[
  Ph(0,'Il y a 7 à 3 millions d’années','Les plus vieux ancêtres connus des humains vivent en Afrique. Toumaï et Lucy en font partie. Lucy marche déjà debout.','ere'),
  Ph(9,'Il y a environ 2 millions d’années','Homo erectus apparaît en Afrique. Il taille des outils de pierre. Plus tard, il apprend à maîtriser le feu (il y a plus de 700 000 ans).','ere'),
  Ph(18,'La première sortie d’Afrique','Des groupes d’Homo erectus quittent l’Afrique à pied. On a retrouvé leurs traces en Géorgie, en Chine, à Java et en Espagne.','ere'),
  Ph(33,'Il y a environ 400 000 à 40 000 ans','En Europe et en Asie vivent ensuite d’autres humains : les Néandertaliens à l’ouest, les Dénisoviens à l’est. Ce ne sont pas encore des Homo sapiens.','nean')
 ],
 photos:[Sh('toumai',1,8,'bl',-2),Sh('lucy',4,12,'tr',2,'contain'),Sh('biface',12,19,'bl',-2,'contain'),Sh('dmanisi',21,29,'bl',-2),Sh('neandertal',34,44,'tl',2)],
 legend:[['ere','Premiers humains (Homo erectus)'],['nean','Néandertaliens']],
 mots:[['Préhistoire','Très longue période avant l’invention de l’écriture.'],['Homo erectus','« Homme debout » : espèce humaine disparue, la première à quitter l’Afrique.'],['Biface','Outil de pierre taillé sur ses deux faces.']],
 q:[['Sur quel continent vivaient les plus vieux ancêtres des humains ?','En Afrique.'],['Quelle espèce humaine quitte l’Afrique la première ?','Homo erectus, il y a environ 2 millions d’années.'],['Qui vivait en Europe avant Homo sapiens ?','Les Néandertaliens.']],
 wiki:['Homo erectus','Lucy (australopithèque)','Homme de Néandertal'],
 src:[['Homo erectus — Australian Museum','https://australian.museum/learn/science/human-evolution/homo-erectus/'],['Atapuerca : les plus anciens Européens — CENIEH, Espagne (communiqué)','https://www.cenieh.es/en/press/news/atapuerca-rewrites-history-europes-first-inhabitants'],['Dmanisi, crâne d’Homo erectus — Nature News (2013)','https://www.nature.com/articles/nature.2013.13972.pdf']]},

/* 2 --------------------------------------------------------------- */
{short:'Homo sapiens, né en Afrique',col:'afr',dur:40,when:[-300000,-75000],dates:'il y a 300 000 à 75 000 ans',
 cam:[{t:0,lon:20,lat:4,z:0.95},{t:24,lon:22,lat:6,z:0.95},{t:32,lon:28,lat:14,z:1.1},{t:40,lon:28,lat:14,z:1.1}],
 zones:[Rg(AFRICA,'afr',2,0.6,1,{c:[20,3],r0:1,r1:52,d:9})],
 routes:[r('afr',29,35,2.6,[[32,25],[33.5,29.5],[35,32.5]],{dash:true})],
 labels:[L(31,37,37.5,'Proche-Orient',{nomark:true}),
  L(4,-8.9,31.9,'Jebel Irhoud (Maroc)',{sub:'environ 300 000 ans',mark:'site',dx:10,dy:-6,al:'left'}),
  L(7,26.07,-28.77,'Florisbad (Afrique du Sud)',{sub:'environ 260 000 ans',mark:'site',dx:10,dy:-6,al:'left'}),
  L(9,35.9,5.4,'Omo (Éthiopie)',{sub:'environ 230 000 ans',mark:'site',dx:10,al:'left'}),
  L(21,21.2,-34.4,'Blombos',{sub:'ocre gravée, environ 75 000 ans',mark:'site',dx:-10,dy:8,al:'right'}),
  L(31,35,32.7,'Misliya et Qafzeh',{sub:'environ 180 000 et 100 000 ans',mark:'site',dx:10,dy:-8,al:'left'})
 ],
 pulses:[Pu(4,-8.9,31.9,'#ffd166'),Pu(7,26.07,-28.77,'#ffd166'),Pu(9,35.9,5.4,'#ffd166'),Pu(21,21.2,-34.4,'#ffd166')],
 ph:[
  Ph(0,'Il y a environ 300 000 ans','Notre espèce, Homo sapiens, apparaît en Afrique. Ses plus vieux fossiles viennent du Maroc, d’Afrique du Sud et d’Éthiopie.','afr'),
  Ph(12,'Un continent entier','Homo sapiens ne naît pas en un seul endroit. Des groupes vivent dans toute l’Afrique. Ils se rencontrent et se mélangent.','afr'),
  Ph(20,'Il y a environ 100 000 à 75 000 ans','Ils fabriquent des outils fins et des perles en coquillage. À Blombos, ils gravent des dessins sur de l’ocre.','afr'),
  Ph(29,'Des premières sorties','Quelques groupes sortent déjà d’Afrique et atteignent le Proche-Orient. Mais ils ne vont pas plus loin.','afr',true)
 ],
 photos:[Sh('irhoud',4,12,'tr',2),Sh('omo',12,20,'tr',2),Sh('perles',21,29,'tr',2)],
 legend:[['afr','Homo sapiens']],
 mots:[['Homo sapiens','Notre espèce. Tous les humains d’aujourd’hui sont des Homo sapiens.'],['Fossile','Reste très ancien d’un être vivant, conservé dans la roche.'],['Ocre','Roche colorée (rouge, jaune) utilisée pour peindre et décorer.']],
 q:[['Depuis combien de temps notre espèce existe-t-elle ?','Depuis environ 300 000 ans.'],['Où sont nés les premiers Homo sapiens ?','En Afrique, dans plusieurs régions du continent.'],['Que montrent les objets trouvés à Blombos ?','Que ces humains décoraient et dessinaient déjà : ocre gravée, perles en coquillage.']],
 wiki:['Homo sapiens','Djebel Irhoud','Grotte de Blombos'],
 src:[['Jebel Irhoud : les plus anciens Homo sapiens connus — Institut Max-Planck d’anthropologie évolutive (2017)','https://www.eva.mpg.de/fileadmin/content_files/human_evolution/Homo_Sapiens_presskit/pdf/English_PressRelease_Irhoud.pdf'],['Omo Kibish : restes humains de plus de 230 000 ans — Université de Cambridge (2022)','https://www.cam.ac.uk/stories/homosapiens'],['Misliya : une mâchoire de 177 000 à 194 000 ans — Université de Tel-Aviv (2018)','https://english.tau.ac.il/node/2269'],['Blombos : des perles de coquillage de 75 000 ans — communiqué (EurekAlert)','https://www.eurekalert.org/news-releases/897266']]},

/* 3 --------------------------------------------------------------- */
{short:'La grande sortie d’Afrique',col:'afr',dur:50,when:[-70000,-38000],dates:'il y a 70 000 à 38 000 ans',
 cam:[{t:0,lon:42,lat:14,z:1.0},{t:10,lon:62,lat:18,z:0.9},{t:22,lon:95,lat:10,z:0.8},{t:36,lon:105,lat:10,z:0.62},{t:50,lon:105,lat:10,z:0.62}],
 zones:[
  {k:'shelf',c:[116,-4],r:48,col:'sand',a:0.85,t0:16,fade:3},
  Rg(AFRICA,'afr',-5,0.5,0.01),
  Rg(ASIE_SUD,'afr',5,0.5,2,{c:[44,13],r0:2,r1:110,d:25}),
  Rg(SAHUL,'afr',30,0.5,3),
  Rg(ASIE_NORD,'afr',38,0.42,4)
 ],
 routes:[
  r('afr',3,31,3.6,[[42.5,12.3],[47,15],[56,20],[62,25],[68,24.5],[73,18],[78,9],[82,16],[90,22],[96,17],[99,9],[103,2],[108,-3],[114,-7.5],[120,-8.8],[125.5,-9.5],[131,-12.5],[136,-20],[143,-33]]),
  r('afr',8,24,3,[[33,29],[36,33],[44,36],[58,37],[70,40],[80,45],[86,50]]),
  r('afr',22,27,2.6,[[124.2,-9.6],[126.5,-10.6],[129,-11.8],[130.6,-12.3]],{straight:true,step:0.3}),
  r('afr',27,33,2.6,[[131,-12],[135,-8],[141,-5.5]]),
  r('afr',38,45,3,[[103,12],[107,20],[112,27],[116,34],[116,39.5]]),
  r('afr',42,48,2.6,[[117,38],[124,38],[129,34],[136,35.5]])
 ],
 labels:[L(1,21,3,'Afrique',{nomark:true}),L(9,46,22,'Arabie',{nomark:true}),L(15,78,21,'Inde',{nomark:true}),
  L(2,43.3,12.6,'Bab-el-Mandeb',{sub:'détroit de la mer Rouge',dx:-10,dy:10,al:'right',end:15}),
  L(11,36,33.5,'Proche-Orient',{nomark:true,dy:-12,end:26}),
  L(19,108,0,'Sunda',{sub:'Asie du Sud-Est réunie',nomark:true}),
  L(29,134,-24,'Sahul',{sub:'Australie + Nouvelle-Guinée',nomark:true}),
  L(30,132.9,-12.5,'Madjedbebe',{sub:'environ 65 000 ans ?',mark:'site',dx:-10,dy:-8,al:'right'}),
  L(32,143.1,-33.7,'Lac Mungo',{sub:'environ 42 000 ans',mark:'site',dx:10,al:'left'}),
  L(24,84.7,51.4,'Denisova',{mark:'site',dy:-14}),
  L(45,115.9,39.7,'Tianyuan (Chine)',{sub:'environ 40 000 ans',mark:'site',dx:-10,dy:-8,al:'right'}),
  L(48,137,35.5,'Japon',{sub:'environ 38 000 ans',dx:10,dy:8,al:'left'})
 ],
 pulses:[Pu(3,43.3,12.6,'#f59e0b'),Pu(32,143.1,-33.7,'#ffd166'),Pu(45,115.9,39.7,'#ffd166')],
 ph:[
  Ph(0,'Il y a environ 70 000 à 60 000 ans','Cette fois, un groupe d’Homo sapiens quitte l’Afrique pour de bon. Les humains d’Europe, d’Asie, d’Océanie et d’Amérique descendent surtout de lui.','afr'),
  Ph(9,'Des rencontres','En chemin, ils croisent d’autres humains : les Néandertaliens, puis les Dénisoviens. Ils ont des enfants ensemble. Beaucoup d’entre nous portent encore un peu de leur ADN.','nean'),
  Ph(18,'Le long des côtes','La mer est plus basse qu’aujourd’hui. Ils avancent par l’Inde et l’Asie du Sud-Est, alors réunie en un grand continent : Sunda.','sand'),
  Ph(28,'Il y a plus de 50 000 ans','Il faut traverser des bras de mer pour atteindre Sahul : l’Australie et la Nouvelle-Guinée. C’est l’une des plus vieilles traversées en mer connues.','afr'),
  Ph(38,'Il y a environ 45 000 à 38 000 ans','D’autres groupes remontent vers le nord : Sibérie, Chine, puis Japon.','afr')
 ],
 photos:[Sh('babel',3,10,'bl',-2),Sh('mungo',31,38,'bl',-2)],
 legend:[['afr','Homo sapiens'],['sand','Terres à sec quand la mer était basse']],
 mots:[['Migration','Déplacement d’un groupe qui part vivre ailleurs.'],['ADN','« Notice » présente dans chacune de nos cellules, héritée de nos parents. Elle garde la trace de nos ancêtres.'],['Sunda et Sahul','Deux grands continents de l’époque glaciaire : l’Asie du Sud-Est réunie, et l’Australie reliée à la Nouvelle-Guinée.']],
 q:[['Par où Homo sapiens quitte-t-il l’Afrique ?','Par le nord-est : la mer Rouge et le Proche-Orient.'],['Comment sait-on que sapiens a rencontré Néandertal ?','Grâce à l’ADN : beaucoup d’humains en portent encore un petit morceau.'],['Pourquoi l’Australie est-elle une étape difficile ?','Il faut traverser la mer : aucun passage à pied, même quand la mer est basse.']],
 wiki:['Origine africaine de l\'homme moderne','Sahul','Homme de Denisova'],
 src:[['Human occupation of northern Australia by 65,000 years ago (Madjedbebe) — Australian National University (Nature, 2017)','https://researchportalplus.anu.edu.au/en/publications/human-occupation-of-northern-australia-by-65000-years-ago/'],['Mungo Man et Mungo Lady : 40 000 à 42 000 ans — National Museum of Australia','https://digital-classroom.nma.gov.au/node/190'],['Les non-Africains descendent d’une seule sortie d’Afrique (50 000 à 72 000 ans) — Science News (2016)','https://www.sciencenews.org/article/single-exodus-africa-gave-rise-todays-non-africans'],['Tianyuan : l’ADN d’un homme de 40 000 ans — Institut Max-Planck (2013)','https://www.eurekalert.org/news-releases/774536']]},

/* 3 bis ------------------------------------------------------------ */
{short:'Plusieurs humanités : qui a rencontré qui ?',col:'deni',dur:78,when:[-400000,-40000],dates:'il y a 400 000 à 40 000 ans',
 cam:[{t:0,lon:75,lat:12,z:0.6},{t:9,lon:75,lat:12,z:0.6},{t:11,lon:42,lat:46,z:1.15},{t:17,lon:42,lat:46,z:1.15},{t:19,lon:106,lat:36,z:1.15},{t:24,lon:106,lat:30,z:1.1},{t:26,lon:112,lat:20,z:1.0},
      {t:28,lon:118,lat:3,z:1.7},{t:34,lon:118,lat:3,z:1.7},{t:36,lon:88,lat:46,z:1.4},{t:42,lon:88,lat:46,z:1.4},{t:44,lon:45,lat:28,z:1.2},{t:50,lon:45,lat:28,z:1.2},
      {t:52,lon:112,lat:8,z:0.85},{t:59,lon:112,lat:8,z:0.85},{t:61,lon:75,lat:12,z:0.6},{t:78,lon:75,lat:12,z:0.6}],
 zones:[
  Rg(AFRICA,'afr',1,0.45,2),
  ext(Rg(NEAN,'nean',3,0.55,2),{t2:60,t3:63}),ext(Rg(NEAN,'nean',61,0.4,2),{}),
  ext(Rg(DENI,'deni',4,0.55,2),{t2:60,t3:63}),ext(Rg(DENI,'deni',61,0.4,2),{}),
  ext(Rg(DENI_SUD,'deni',24,0.25,2),{t2:60,t3:63}),
  ext(Rg([27.7,-26.0,3.2],'ere',5,0.75,1.5),{t2:60,t3:63}),Rg([27.7,-26.0,3.2],'ere',61,0.4,2),
  ext(Rg([111,-7.3,3],'ere',6,0.75,1.5),{t2:60,t3:63}),Rg([111,-7.3,3],'ere',61,0.4,2),
  ext(Rg([121.2,-8.6,1.9],'flo',7,0.85,1.5),{t2:60,t3:63}),Rg([121.2,-8.6,1.9],'flo',61,0.45,2),
  ext(Rg([121.3,16.6,2.3],'flo',7,0.85,1.5),{t2:60,t3:63}),Rg([121.3,16.6,2.3],'flo',61,0.45,2),
  Rg(SAHUL,'afr',55,0.4,2.5)
 ],
 routes:[
  r('afr',43,47,3.2,[[31,26],[32.6,30],[34.8,32.2],[37,35]]),
  r('afr',46,57,3.2,[[37,35],[45,33.5],[52,30],[58,27],[64,25.5],[70,23],[75,15],[80,10],[85,20],[92,22],[98,13],[101,4],[105,-2],[112,-7],[119,-8.7],[124,-9.6]]),
  r('afr',48,56,2.6,[[44,37],[58,38.5],[70,41],[80,46],[85,50.5]]),
  r('afr',56,58.5,2.6,[[124.2,-9.6],[126.5,-10.6],[129,-11.8],[130.6,-12.3]],{straight:true,step:0.3}),
  r('afr',57,60,2.6,[[131,-12],[136,-8],[142,-5.8]])
 ],
 labels:[
  L(1,20,3,'Homo sapiens',{sub:'depuis environ 300 000 ans',nomark:true,big:true}),
  L(3,22,48.5,'Néandertaliens',{sub:'environ 400 000 → 40 000 ans',nomark:true,big:true}),
  L(4,104,43,'Dénisoviens',{sub:'environ 300 000 → 50 000 ans au moins',nomark:true,big:true}),
  L(5,27.7,-26.0,'Homo naledi',{sub:'environ 335 000 → 236 000 ans',mark:'site',dx:10,al:'left'}),
  L(6,111,-7.3,'Homo erectus (Java)',{sub:'jusqu’à environ 110 000 ans',mark:'site',dx:-10,dy:12,al:'right'}),
  L(7,120.45,-8.55,'Homo floresiensis (Florès)',{sub:'environ 1 m · disparu il y a 50 000 ans',mark:'site',dx:10,dy:14,al:'left'}),
  L(7,121.8,17.7,'Homo luzonensis (Luçon)',{sub:'environ 50 000 ans et avant',mark:'site',dx:-10,dy:-4,al:'right'}),
  L(11,6.95,51.23,'Vallée de Neander (Allemagne)',{sub:'premier fossile reconnu, 1856',mark:'site',dx:-10,al:'right',zmin:0.9}),
  L(12,44.2,36.8,'Shanidar (Irak)',{sub:'environ 70 000 à 45 000 ans',mark:'site',dx:10,dy:6,al:'left',zmin:0.9}),
  L(14,84.68,51.4,'Altaï (Sibérie)',{sub:'Néandertaliens et Dénisoviens',dx:10,dy:-8,al:'left',end:18}),
  L(19,84.68,51.4,'Grotte de Denisova',{sub:'un os de doigt, 2010',mark:'site',dx:10,dy:-8,al:'left'}),
  L(20,102.57,35.45,'Xiahe (plateau du Tibet)',{sub:'mâchoire, environ 160 000 ans',mark:'site',dx:-10,al:'right',zmin:0.9}),
  L(21,126.6,45.75,'Harbin (Chine)',{sub:'crâne, environ 146 000 ans',mark:'site',dx:10,al:'left',zmin:0.9}),
  L(22,119.5,23.5,'Penghu (Taïwan)',{sub:'mâchoire',mark:'site',dx:10,dy:6,al:'left',zmin:0.9}),
  L(23,102.7,25,'Bianfu (Yunnan)',{sub:'os et outils, étudiés en 2026',mark:'site',dx:-10,dy:8,al:'right',zmin:0.9}),
  L(24,108,1,'Dénisoviens ?',{sub:'connus seulement par l’ADN',nomark:true,end:60}),
  L(36,84.68,51.4,'Denny, environ 90 000 ans',{sub:'mère néandertalienne, père dénisovien',nomark:true,dx:10,dy:26,al:'left',zmin:1.2}),
  L(46,36,33,'Proche-Orient',{sub:'rencontre sapiens–Néandertaliens',mark:'site',dx:-10,dy:10,al:'right',zmin:0.9}),
  L(54,91,29.7,'Tibet',{sub:'un gène dénisovien aide à vivre en altitude',mark:'site',dx:-10,dy:10,al:'right',zmin:0.7}),
  L(56,142,-5.8,'Océanie',{sub:'des gènes dénisoviens contre des maladies',mark:'site',dx:10,dy:-6,al:'left',zmin:0.7}),
  L(69,0,61,'En Europe',{sub:'traces néandertaliennes',nomark:true}),
  L(70,118,30,'En Asie',{sub:'traces néandertaliennes et dénisoviennes',nomark:true}),
  L(71,148,-25,'En Océanie',{sub:'traces néandertaliennes et dénisoviennes',nomark:true}),
  L(72,22,-12,'En Afrique',{sub:'la plus grande diversité humaine du monde',nomark:true})
 ],
 pulses:[Pu(36,84.68,51.4,'#ff7ab6'),Pu(46,36,33,'#ff7ab6'),Pu(54,91,29.7,'#ff7ab6'),Pu(55,127,-3,'#ff7ab6'),Pu(56,142,-5.8,'#ff7ab6')],
 ph:[
  Ph(0,'Il y a environ 300 000 ans','Homo sapiens n’est pas seul sur Terre. Plusieurs sortes d’humains vivent en même temps, chacune dans sa région : au moins six.','afr'),
  Ph(10,'Les Néandertaliens','Ils vivent en Europe et jusqu’en Sibérie, d’environ 400 000 à 40 000 ans. Bien adaptés au froid, ils chassent, font du feu, soignent leurs blessés et enterrent leurs morts.','nean'),
  Ph(18,'Les Dénisoviens','On les découvre en 2010, grâce à l’ADN d’un petit os de doigt trouvé dans une grotte de Sibérie. Depuis, on a retrouvé un crâne, des mâchoires et des dents, du Tibet jusqu’à Taïwan.','deni'),
  Ph(27,'Les humains des îles d’Asie','Sur l’île de Florès vit l’homme de Florès (Homo floresiensis) : environ 1 m de haut, jusqu’à il y a environ 50 000 ans. Aux Philippines vit l’homme de Luçon. À Java, Homo erectus survit jusqu’à il y a environ 110 000 ans.','flo'),
  Ph(35,'Des cousins qui se rencontrent','Dans la grotte de Denisova, on a trouvé l’os d’une fille d’environ 90 000 ans, « Denny » : sa mère était néandertalienne, son père dénisovien. Comme ils pouvaient avoir des enfants ensemble, certains savants les voient comme des sous-espèces d’une même grande famille.','mix'),
  Ph(43,'Il y a environ 50 000 à 43 000 ans','Sorti d’Afrique depuis longtemps, Homo sapiens rencontre les Néandertaliens au Proche-Orient. Ils ont des enfants ensemble. C’est pour cela que beaucoup d’humains portent encore un peu d’ADN néandertalien.','mix'),
  Ph(51,'En Asie et en Océanie','Plus à l’est, sapiens rencontre plusieurs groupes de Dénisoviens. Leurs gènes ont aidé les habitants du Tibet à vivre en altitude, et ceux d’Océanie à résister à certaines maladies.','deni'),
  Ph(60,'Il y a environ 40 000 ans : il ne reste que nous','Les autres humains disparaissent peu à peu. On ne sait pas exactement pourquoi : changements de climat, petits groupes isolés, arrivée de sapiens… sans doute un peu tout cela.','afr',true),
  Ph(68,'Une seule humanité','Tous les humains d’aujourd’hui sont des Homo sapiens. Partout sur Terre, chacun porte de petites traces de ces rencontres anciennes. Elles ne rendent personne meilleur ni moins bon : elles racontent seulement le chemin de nos ancêtres.','afr')
 ],
 photos:[Sh('neandertal',11,17,'tr',2),Sh('xiahe',20,26,'bl',-2,'contain'),Sh('flores',28,34,'tr',2,'contain')],
 legend:[['afr','Homo sapiens'],['nean','Néandertaliens'],['deni','Dénisoviens'],['flo','Humains des îles (Florès, Luçon)'],['ere','Autres humains anciens (Homo erectus, Homo naledi)'],['mix','Lieux de rencontre']],
 mots:[['Espèce','Groupe d’êtres vivants qui se ressemblent et peuvent avoir ensemble des petits, capables à leur tour d’avoir des petits.'],['Sous-espèce','Partie d’une espèce un peu différente des autres, parce qu’elle a vécu longtemps à part.'],['Métissage','Quand deux groupes humains différents ont des enfants ensemble.']],
 q:[['Combien de sortes d’humains vivaient sur Terre il y a 300 000 ans ?','Plusieurs, au moins six : Homo sapiens, les Néandertaliens, les Dénisoviens, Homo erectus, Homo naledi, puis les humains de Florès et de Luçon.'],
    ['Comment a-t-on découvert les Dénisoviens ?','Grâce à l’ADN d’un petit os de doigt trouvé dans une grotte de Sibérie, en 2010.'],
    ['Qui était Denny ?','Une fille d’il y a environ 90 000 ans : sa mère était néandertalienne, son père dénisovien.'],
    ['Les traces d’ADN de ces anciens cousins rendent-elles certains humains supérieurs aux autres ?','Non. Tous les humains d’aujourd’hui sont des Homo sapiens : ces traces racontent seulement les rencontres de nos ancêtres.']],
 wiki:['Homme de Denisova','Homme de Néandertal','Homo floresiensis','Homo luzonensis','Homo naledi'],
 src:[['Le crâne de Harbin identifié comme dénisovien (Science et Cell, 2025) — Science News','https://www.sciencenews.org/article/skull-first-denisovan-human-cousin'],['Bianfu (Yunnan) : os et outils dénisoviens, Nature (septembre 2026) — Académie chinoise des sciences','https://english.cas.cn/newsroom/research-news/202609/t20260906_1192641.shtml'],['Homo floresiensis — Australian Museum','https://australian.museum/learn/science/human-evolution/homo-floresiensis/'],['Denny : mère néandertalienne, père dénisovien — Institut Max-Planck (2018)','https://www.eurekalert.org/news-releases/596455'],['Néandertaliens et Homo sapiens : le métissage, il y a environ 47 000 ans — Institut Max-Planck (2024)','https://www.eva.mpg.de/press/news/press-kits/2024/2024-12-12-1041-unraveling-human-history/']]},

/* 4 --------------------------------------------------------------- */
{short:'L’Europe : Néandertal, la glace, les grottes',col:'nean',dur:54,when:[-45000,-10000],dates:'il y a 45 000 à 10 000 ans',
 cam:[{t:0,lon:27,lat:43,z:1.9},{t:10,lon:17,lat:46,z:2.2},{t:24,lon:7,lat:47,z:2.5},{t:33,lon:10,lat:51,z:1.9},{t:54,lon:10,lat:51,z:1.9}],
 zones:[
  {k:'shelf',c:[2,54],r:9,col:'sand',a:0.85,t0:32,fade:3,t2:46,t3:51},
  ext(Rg(NEAN_EU,'nean',0,0.55,1),{t2:15,t3:22}),
  Rg(NEAN_EU,'afr',6,0.5,2,{c:[30,41],r0:1,r1:42,d:16}),
  {k:'poly',ring:GLACE_EU,col:'ice',a:0.9,t0:31,fade:3,t2:45,t3:50},
  {k:'poly',ring:GLACE_ALPES,col:'ice',a:0.9,t0:31,fade:3,t2:45,t3:50}
 ],
 routes:[
  r('afr',4,13,3.2,[[36,35],[33,38],[29.5,40.6],[26.5,42.3],[25.4,43]]),
  r('afr',12,21,3,[[25.4,43],[21,45],[17,47.5],[12,48.5],[9.8,48.4]]),
  r('afr',19,26,3,[[9.8,48.4],[6,47.5],[4.4,44.6],[1.4,45]]),
  r('afr',14,26,2.6,[[26,41.5],[21,41],[16,43.5],[12,44.5],[7,44],[3,43],[-1,43],[-4,43.3]]),
  r('afr',46,52,2.6,[[2,46.5],[3,50],[6,54],[10,57]]),
  r('afr',46,52,2.6,[[20,46.5],[20,51],[22,56]])
 ],
 labels:[
  L(1,13,50.2,'Néandertaliens',{nomark:true,big:true,end:19}),
  L(12,25.43,42.95,'Bacho Kiro (Bulgarie)',{sub:'environ 45 000 ans',mark:'site',dx:10,dy:8,al:'left'}),
  L(20,9.8,48.4,'Jura souabe',{sub:'flûtes et statuettes, environ 40 000 ans',mark:'site',dx:10,dy:-10,al:'left'}),
  L(24,4.42,44.39,'Chauvet',{sub:'environ 36 000 ans',mark:'site',dx:10,dy:6,al:'left',gold:true}),
  L(26,1.17,45.05,'Lascaux',{sub:'environ 20 000 ans',mark:'site',dx:-10,dy:-6,al:'right',gold:true}),
  L(27,-4.12,43.38,'Altamira',{mark:'site',dx:-8,dy:12,al:'right'}),
  L(33,22,63,'Calotte de glace',{nomark:true,big:true,end:46}),
  L(35,3,55.2,'Doggerland',{sub:'aujourd’hui sous la mer',nomark:true,end:48})
 ],
 pulses:[Pu(12,25.43,42.95,'#ffd166'),Pu(24,4.42,44.39,'#ffd166'),Pu(26,1.17,45.05,'#ffd166')],
 ph:[
  Ph(0,'Il y a environ 45 000 ans','Homo sapiens entre en Europe par le sud-est. Les Néandertaliens y vivent depuis plus de 300 000 ans.','afr'),
  Ph(12,'Il y a environ 40 000 ans','Les deux humanités se croisent pendant quelques milliers d’années. Puis les Néandertaliens disparaissent. On ne sait pas exactement pourquoi.','nean',true),
  Ph(22,'Il y a environ 36 000 à 20 000 ans','Homo sapiens peint et grave dans les grottes : Chauvet, Lascaux, Altamira. Il sculpte l’ivoire et fabrique des flûtes.','afr'),
  Ph(31,'Il y a environ 20 000 ans : le grand froid','Une énorme calotte de glace recouvre le nord de l’Europe. La mer est très basse : on peut aller à pied jusqu’en Angleterre. Les humains se replient vers le sud.','ice'),
  Ph(45,'Il y a environ 15 000 à 10 000 ans','Le climat se réchauffe. La glace fond, la mer remonte, et les chasseurs repartent vers le nord.','afr')
 ],
 photos:[Sh('neandertal',2,10,'tr',2),Sh('lionman',13,21,'tr',2,'contain'),Sh('chauvet',23,30,'tr',2),Sh('lascaux',26,31,'bl',-2)],
 legend:[['afr','Homo sapiens'],['nean','Néandertaliens'],['ice','Glace (il y a 20 000 ans)'],['sand','Terres à sec à cette époque']],
 mots:[['Néandertalien','Humain d’une espèce disparue, qui vivait en Europe et en Asie de l’Ouest.'],['Art pariétal','Peintures et gravures faites sur les parois des grottes.'],['Glaciation','Période très froide : la glace recouvre de grandes régions et la mer baisse.'],['Chasseur-cueilleur','Personne qui se nourrit en chassant, en pêchant et en cueillant, sans cultiver.']],
 q:[['Qui vivait en Europe avant l’arrivée d’Homo sapiens ?','Les Néandertaliens.'],['Cite deux grottes ornées et leur âge.','Chauvet (environ 36 000 ans) et Lascaux (environ 20 000 ans).'],['Pourquoi pouvait-on aller à pied en Angleterre il y a 20 000 ans ?','L’eau était retenue dans la glace : la mer était beaucoup plus basse.']],
 wiki:['Homme de Néandertal','Grotte Chauvet','Grotte de Lascaux','Doggerland'],
 src:[['La grotte Chauvet-Pont d’Arc et les grottes ornées d’Ardèche — ministère de la Culture','https://www.culture.gouv.fr/Media/medias-creation-rapide/la-grotte-chauvet-pont-d-arc-et-les-grottes-ornees-d-ardeche.pdf'],['Lascaux : les datations des figures — ministère de la Culture','https://archeologie.culture.gouv.fr/lascaux/en/dating-figures-lascaux'],['Bacho Kiro : les plus anciens Homo sapiens d’Europe, environ 45 000 ans — Institut Max-Planck (2020)','https://www.mpg.de/14778668/the-oldest-upper-paleolithic-homo-sapiens-in-europe'],['La disparition des Néandertaliens vers 40 000 ans — Nature (2014)','https://www.nature.com/articles/512242a']]},

/* 5 --------------------------------------------------------------- */
{short:'À la conquête de l’Amérique',col:'ame',dur:54,when:[-32000,-12000],dates:'il y a 32 000 à 12 000 ans',
 cam:[{t:0,lon:150,lat:62,z:1.3},{t:10,lon:-168,lat:62,z:1.4},{t:22,lon:-125,lat:48,z:1.0},{t:34,lon:-98,lat:22,z:0.72},{t:46,lon:-88,lat:5,z:0.6},{t:54,lon:-88,lat:5,z:0.6}],
 zones:[
  {k:'shelf',c:[-172,64],r:15,col:'sand',a:0.9,t0:3,fade:3,t2:47,t3:52},
  Rg(SIBERIE,'afr',0,0.5,1),
  Rg(AMERIQUES,'ame',12,0.5,2,{c:[-166,65],r0:3,r1:150,d:34}),
  {k:'poly',ring:GLACE_LAU,col:'ice',a:0.9,t0:6,fade:3,t2:46,t3:53},
  {k:'poly',ring:GLACE_COR,col:'ice',a:0.9,t0:6,fade:3,t2:46,t3:53},
  {k:'poly',ring:GLACE_GAP,col:'ice',a:0.9,t0:6,fade:3,t2:28,t3:33,nostroke:true}
 ],
 routes:[
  r('afr',2,10,3,[[134,70],[150,68.5],[168,66.5],[-178,65.5],[-168,65]]),
  r('ame',15,40,3.4,[[-166,62],[-162,57.5],[-152,57],[-140,58.5],[-135,55],[-130,50],[-126,44],[-123,37],[-118,32],[-112,25],[-106,20],[-98,15.5],[-90,13],[-84,9],[-79,6],[-80.5,-2],[-80,-8],[-76,-14],[-71,-19],[-71.5,-30],[-73.5,-38],[-73.5,-41.5]]),
  r('kan',31,39,3,[[-148,65],[-138,63.5],[-126,60.5],[-119,56],[-114,51],[-108,45],[-104,38],[-103.3,34.6]]),
  r('ame',38,46,2.6,[[-104,36],[-95,35],[-86,36],[-79,37]]),
  r('ame',39,49,2.6,[[-78,5],[-70,2],[-62,-3],[-54,-10],[-47,-16],[-44,-19.5]]),
  r('ame',41,49,2.6,[[-73.5,-41.5],[-71,-47],[-70,-53]])
 ],
 labels:[
  L(1,133.4,70.7,'Yana (Sibérie)',{sub:'environ 32 000 ans',mark:'site',dx:10,dy:10,al:'left',end:20}),
  L(4,-172,63,'Béringie',{sub:'pont de terre',nomark:true,big:true,gold:true,end:47}),
  L(8,-96,61,'Calottes de glace',{nomark:true,big:true,end:46}),
  L(22,-106.3,32.8,'White Sands',{sub:'21 000 à 23 000 ans',mark:'site',dx:-10,dy:8,al:'right',gold:true}),
  L(36,-103.3,34.3,'Clovis',{sub:'environ 13 000 ans',mark:'site',dx:10,dy:-10,al:'left'}),
  L(40,-73.2,-41.5,'Monte Verde (Chili)',{sub:'environ 14 500 ans',mark:'site',dx:-10,al:'right'}),
  L(48,-43.9,-19.6,'Lagoa Santa (Brésil)',{sub:'environ 11 500 ans',mark:'site',dx:10,al:'left'}),
  L(49,-69,-54.2,'Terre de Feu',{dx:10,dy:6,al:'left'})
 ],
 pulses:[Pu(22,-106.3,32.8,'#ffd166'),Pu(36,-103.3,34.3,'#ffd166'),Pu(40,-73.2,-41.5,'#ffd166')],
 ph:[
  Ph(0,'Il y a environ 32 000 ans','Des chasseurs vivent déjà dans le grand nord de la Sibérie. Devant eux : la Béringie, un pont de terre entre l’Asie et l’Amérique.','afr'),
  Ph(8,'Il y a environ 25 000 à 20 000 ans','La mer est basse, mais deux immenses calottes de glace barrent la route de l’Amérique. Des groupes restent longtemps isolés en Béringie.','ice'),
  Ph(18,'La route de la côte','Les premiers arrivants longent sans doute la côte du Pacifique, à pied et en bateau. À White Sands, des empreintes de pas datent de 23 000 à 21 000 ans.','ame',true),
  Ph(30,'Il y a environ 14 000 à 13 000 ans','La glace fond. Un couloir s’ouvre entre les deux calottes. Les chasseurs de mammouths « Clovis » se répandent en Amérique du Nord.','kan'),
  Ph(40,'Jusqu’au bout du continent','En quelques milliers d’années, les humains atteignent le sud du Chili, le Brésil et la Terre de Feu. Puis la mer remonte : la Béringie disparaît sous l’eau.','ame')
 ],
 photos:[Sh('whitesands',19,28,'bl',-2),Sh('clovis',31,39,'tr',2,'contain')],
 legend:[['ame','Route de la côte'],['kan','Couloir libre de glace'],['ice','Calottes de glace'],['sand','Béringie (à sec à cette époque)'],['afr','Depuis la Sibérie, par la Béringie']],
 mots:[['Béringie','Terre aujourd’hui sous la mer, qui reliait la Sibérie à l’Alaska pendant la glaciation.'],['Calotte glaciaire','Immense couche de glace, épaisse de plusieurs kilomètres, posée sur un continent.'],['Amérindiens','Descendants des premiers habitants de l’Amérique.']],
 q:[['Par où les premiers humains arrivent-ils en Amérique ?','Par la Béringie, entre la Sibérie et l’Alaska.'],['Pourquoi les empreintes de White Sands sont-elles importantes ?','Elles montrent que des humains étaient en Amérique il y a plus de 20 000 ans, plus tôt qu’on ne le pensait.'],['Quel est le dernier continent atteint à pied par Homo sapiens ?','L’Amérique.']],
 wiki:['Premier peuplement de l\'Amérique','Béringie','Culture Clovis'],
 src:[['Les empreintes de White Sands ont bien 21 000 à 23 000 ans — USGS (2023)','https://www.usgs.gov/news/national-news-release/study-confirms-age-oldest-fossil-human-footprints-north-america'],['Le couloir libre de glace n’était pas praticable avant 12 600 ans — Université de Cambridge (Nature, 2016)','https://www.cam.ac.uk/research/news/textbook-story-of-how-humans-populated-america-is-biologically-unviable-study-finds'],['Monte Verde (Chili) : un site de 14 000 ans, sans pointes Clovis — Discover Magazine','https://www.discovermagazine.com/monte-verde-our-earliest-evidence-of-humans-living-in-south-america-40124']]},

/* 6 --------------------------------------------------------------- */
{short:'Les premiers paysans',col:'neo',dur:58,when:[-9500,-2500],dates:'de 9500 à 2500 av. J.-C. environ',
 cam:[{t:0,lon:40,lat:32,z:1.7},{t:16,lon:40,lat:33,z:1.7},{t:24,lon:25,lat:18,z:0.46},{t:41,lon:25,lat:18,z:0.46},{t:46,lon:22,lat:40,z:1.3},{t:51,lon:22,lat:40,z:1.3},{t:55,lon:118,lat:28,z:1.6},{t:58,lon:118,lat:28,z:1.6}],
 zones:[
  Rg(F_CROISSANT,'neo',3,0.75,2),
  Rg(F_CHINE,'neo',24,0.75,2),Rg(F_MESO,'neo',27,0.75,2),Rg(F_GUINEE,'neo',30,0.8,2),Rg(F_ANDES,'neo',33,0.75,2),Rg(F_SAHEL,'neo',36,0.75,2),Rg(F_USA,'neo',38.5,0.75,2),
  Rg(EUROPE,'neo',43,0.3,3,{c:[36,36],r0:3,r1:42,d:8})
 ],
 routes:[
  r('kan',42,50,2.6,[[33,37],[27,38.5],[22,40],[16,41.5],[10,43],[4.5,43.4]]),
  r('kan',43,51,2.6,[[28,41],[24,44],[19,46.5],[13,48.5],[7,49],[2.5,48.8]]),
  r('kan',42,48,2.4,[[35,31],[32.5,29.5],[31.2,26]]),
  r('kan',42,50,2.4,[[46,34],[55,32],[62,30],[67.5,29]]),
  r('aus',52,57,2.6,[[116,28],[119,25.6],[120.9,24]])
 ],
 labels:[
  L(3,41,37,'Croissant fertile',{sub:'blé, orge, mouton · vers 9500 av. J.-C.',nomark:true,big:true,gold:true,dy:-34}),
  L(6,38.92,37.22,'Göbekli Tepe',{mark:'site',dx:-10,dy:10,al:'right',zmin:1.2,end:19}),
  L(8,35.44,31.87,'Jéricho',{mark:'site',dx:-10,al:'right',zmin:1.2,end:19}),
  L(24,113,33,'Chine',{sub:'riz, millet, porc · vers 7000 av. J.-C.',nomark:true,dy:-24,zmax:1.5}),
  L(27,-98,19,'Mésoamérique',{sub:'maïs, courge · vers 7000 av. J.-C.',nomark:true,dy:-18,zmax:1.2}),
  L(30,142,-6,'Nouvelle-Guinée',{sub:'taro, banane · vers 5000 av. J.-C.',nomark:true,dy:16,zmax:1.5}),
  L(33,-72,-14,'Andes',{sub:'pomme de terre, lama · vers 5000 av. J.-C.',nomark:true,dx:14,dy:10,al:'left',zmax:1.2}),
  L(36,10,13,'Sahel',{sub:'mil, sorgho · vers 3000 av. J.-C.',nomark:true,dy:20,zmax:1.2}),
  L(38.5,-87,37,'Est de l’Amérique du Nord',{sub:'tournesol · vers 2500 av. J.-C.',nomark:true,dy:-18,zmax:1.2}),
  L(48,3,46.5,'France',{sub:'vers 5800 av. J.-C.',nomark:true,zmin:1,zmax:1.5}),
  L(55,121,23.8,'Taïwan',{sub:'riz, millet · vers 3500 av. J.-C.',dx:10,al:'left',zmin:1.5})
 ],
 pulses:[Pu(3,40,36,'#a3e635')],
 ph:[
  Ph(0,'Vers 9500 av. J.-C. : le Croissant fertile','Au Proche-Orient, des chasseurs-cueilleurs se mettent à semer du blé et de l’orge. Ils élèvent des chèvres et des moutons. Ils bâtissent les premiers villages.','neo'),
  Ph(12,'Une « révolution » très lente','On appelle ce changement le Néolithique. Il dure des milliers d’années. On produit sa nourriture, on polit la pierre, on fabrique des poteries.','neo'),
  Ph(22,'Ailleurs, sans se connaître','L’agriculture est inventée plusieurs fois, dans des régions qui s’ignorent : riz en Chine, maïs en Amérique, taro en Nouvelle-Guinée, mil en Afrique.','neo'),
  Ph(41,'Les paysans se déplacent','L’agriculture se répand avec des familles de paysans qui migrent. Partie du Proche-Orient, elle atteint le sud de la France vers 5800 av. J.-C.','kan'),
  Ph(51,'Un lien avec le Pacifique','De Chine, des cultivateurs gagnent Taïwan. Leurs descendants, les Austronésiens, peupleront le Pacifique jusqu’à la Nouvelle-Calédonie.','aus')
 ],
 photos:[Sh('gobekli',4,11,'tl',-2),Sh('ble',12,20,'tl',-2,'contain'),Sh('teosinte',27,34,'bl',-2,'contain'),Sh('carnac',44,50,'bl',-2)],
 legend:[['neo','Foyers d’invention de l’agriculture'],['kan','Diffusion par les migrations de paysans'],['aus','Austronésiens : de Taïwan vers le Pacifique']],
 mots:[['Néolithique','« Âge de la pierre nouvelle » : époque où les humains deviennent agriculteurs et éleveurs.'],['Domestiquer','Transformer peu à peu une plante ou un animal sauvage pour le cultiver ou l’élever.'],['Sédentaire','Qui vit toute l’année au même endroit. Le contraire de nomade.'],['Foyer','Région où une invention apparaît avant de se répandre.']],
 q:[['Où l’agriculture apparaît-elle en premier ?','Dans le Croissant fertile, au Proche-Orient, vers 9500 av. J.-C.'],['L’agriculture a-t-elle été inventée une seule fois ?','Non : plusieurs fois, dans des régions qui ne se connaissaient pas (Chine, Amérique, Nouvelle-Guinée, Afrique…).'],['Quelle plante a été domestiquée en Nouvelle-Guinée, tout près de chez nous ?','Le taro (et la banane).']],
 wiki:['Néolithique','Révolution néolithique','Croissant fertile','Ancien site agricole de Kuk'],
 src:[['Göbekli Tepe, environ 9600-8200 av. J.-C. — UNESCO, Centre du patrimoine mondial','https://whc.unesco.org/document/160485'],['Site agricole ancien de Kuk (Papouasie-Nouvelle-Guinée) : taro, banane, igname — UNESCO, Centre du patrimoine mondial','https://whc.unesco.org/en/list/887']]},

/* 7 --------------------------------------------------------------- */
{short:'Les dernières terres',col:'late',dur:62,when:[-2500,1300],dates:'de 2500 av. J.-C. à 1300 apr. J.-C. environ',
 cam:[{t:0,lon:-100,lat:64,z:0.95},{t:11,lon:-70,lat:66,z:0.95},{t:16,lon:-25,lat:60,z:1.25},{t:24,lon:-28,lat:58,z:1.25},{t:29,lon:80,lat:-10,z:0.95},{t:37,lon:75,lat:-12,z:0.95},{t:42,lon:-170,lat:-15,z:0.7},{t:50,lon:-170,lat:-15,z:0.7},{t:55,lon:15,lat:-5,z:0.6},{t:62,lon:15,lat:-5,z:0.6}],
 zones:[
  {k:'land',pts:[[-40,72]],col:'late',a:0.5,t0:8,fade:3},
  {k:'land',pts:[[-18,65]],col:'eur',a:0.65,t0:17,fade:2},
  {k:'land',pts:[[47,-19]],col:'aus',a:0.65,t0:34,fade:2},
  Lz(NCM,'lap',41,0.7),
  {k:'land',pts:[[171,-43.5],[176,-39]],col:'pol',a:0.65,t0:48,fade:2},
  Rg([0,-90,26],'vide',54,0.6,3)
 ],
 routes:[
  r('late',2,11,3,[[-166,65.5],[-156,70.5],[-135,69.5],[-115,69],[-98,69.5],[-85,71.5],[-76,76],[-68,78],[-55,76.5]]),
  r('eur',13,19,3,[[5.2,60.6],[-1.5,61.8],[-7.5,62.9],[-14,63],[-20,63.1],[-23.5,63.7]],{ship:true}),
  r('eur',19,22,3,[[-23.5,63.7],[-31,62.8],[-39,60.3],[-44,59.2],[-46.8,60.2]],{ship:true}),
  r('eur',21.5,24,2.6,[[-46.8,60.2],[-50.5,58],[-54,54.5],[-55,52]],{ship:true}),
  r('aus',25,35,3.2,[[114.5,-4.3],[109.5,-5],[106.3,-5.6],[105.95,-5.78],[105.67,-6.15],[104.95,-6.3],[104,-7.3],[95,-9],[80,-11],[65,-13],[53,-14.5],[50.7,-15.2]],{boat:true}),
  r('afr',31,35,2.6,[[40.9,-14.9],[43.5,-15.4],[45.9,-15.4]],{boat:true}),
  r('lap',38,43,3,[[151.5,-6],[154.6,-4.6],[160.7,-6.4],[165.3,-11.4],[165.9,-13.5],[165.8,-17],[164.5,-19.7]],{boat:true}),
  r('pol',42,46,3,[[-172.3,-13.2],[-166,-18],[-160,-20.4],[-155,-19.5],[-149.9,-17.2]],{boat:true}),
  r('pol',45,49,2.6,[[-149.9,-17.2],[-146,-12],[-146,0],[-152,10],[-155.9,19.2]],{boat:true}),
  r('pol',45,49,2.6,[[-149.9,-17.2],[-142,-21],[-122,-25.5],[-109.7,-27]],{boat:true}),
  r('pol',46,50,2.6,[[-160,-20.4],[-170,-26],[-179,-31],[178.5,-35.5],[177.2,-37.4]],{boat:true})
 ],
 labels:[
  L(2,-166,65.6,'Détroit de Béring',{dy:16,end:13}),
  L(9,-42,73,'Groenland',{sub:'atteint vers 2500 av. J.-C.',nomark:true}),
  L(14,5.2,60.5,'Norvège',{dx:10,al:'left',end:27}),
  L(18,-18.5,64.9,'Islande',{sub:'vers 874',nomark:true,end:27}),
  L(22,-46.5,60.4,'Colonie viking',{sub:'986',dx:-8,dy:16,al:'right',end:27}),
  L(23.5,-55.5,51.6,'L’Anse aux Meadows',{sub:'vers l’an 1000',mark:'site',dx:-10,al:'right',end:27}),
  L(26,114.5,-3.4,'Bornéo',{dy:-14,end:52}),
  L(34,43.5,-20.5,'Madagascar',{sub:'il y a 1 000 à 1 500 ans',nomark:true,al:'right'}),
  L(41,165.5,-21.3,'Nouvelle-Calédonie',{sub:'vers 1100 av. J.-C.',gold:true,dx:-9,dy:16,al:'right'}),
  L(48,-155.5,19.6,'Hawaï',{sub:'vers 1000–1250',dx:-10,al:'right'}),
  L(48,-109.4,-27.1,'Rapa Nui',{dy:-14}),
  L(49,173.5,-41,'Aotearoa',{sub:'vers 1250–1300',dx:12,al:'left'}),
  L(54,55.5,-21.1,'La Réunion',{sub:'peuplée en 1663',dx:10,dy:14,al:'left'}),
  L(55,-16.9,32.7,'Madère',{sub:'1420',dx:-8,al:'right'}),
  L(56,60,-76,'Antarctique',{sub:'aucun habitant permanent',nomark:true,big:true})
 ],
 pulses:[Pu(23.5,-55.5,51.6,'#ffd166'),Pu(34,47,-19,'#2dd4bf'),Pu(41,165.5,-21,'#ffd166',true)],
 ph:[
  Ph(0,'Vers 2500 av. J.-C. : le Grand Nord','Il reste des terres vides, difficiles à atteindre. Des chasseurs venus de Sibérie s’installent dans l’Arctique, jusqu’au Groenland. Les ancêtres des Inuits, venus d’Alaska, arriveront bien plus tard : au Canada vers l’an 1000, au Groenland vers 1200–1300.','late'),
  Ph(12,'874 – 1000 : les Vikings','Des marins de Norvège peuplent l’Islande, encore presque vide, puis le sud du Groenland. Vers l’an 1000, ils campent en Amérique : 500 ans avant Christophe Colomb.','eur'),
  Ph(25,'Il y a 1 000 à 1 500 ans : Madagascar','La grande île est peuplée très tard, par des Austronésiens venus de Bornéo, à plus de 6 000 km de là. Des Africains les rejoignent depuis la côte voisine.','aus',true),
  Ph(38,'De 1100 av. J.-C. à 1300 environ : le Pacifique','Les Lapita, puis les Polynésiens, peuplent les îles une à une. Aotearoa (la Nouvelle-Zélande) est la dernière grande terre habitée, vers 1250–1300.','pol'),
  Ph(52,'Des îles vides jusqu’aux Grandes Découvertes','Madère, les Açores, La Réunion ou Maurice n’avaient aucun habitant avant l’arrivée des Européens. L’Antarctique n’a toujours pas d’habitants permanents.','vide')
 ],
 photos:[Sh('anse',14,23,'bl',-2),Sh('viking',17,24,'tr',2),Sh('mada',26,35,'tl',-2),Sh('hokulea',39,45,'tr',2),Sh('moai',45,51,'bl',-2)],
 legend:[['late','Peuples de l’Arctique'],['eur','Vikings'],['aus','Austronésiens'],['pol','Lapita et Polynésiens'],['lap','Lapita (vers la Nouvelle-Calédonie)'],['afr','Depuis l’Afrique, vers Madagascar']],
 mots:[['Inuits','Peuple de l’Arctique (Alaska, Canada, Groenland).'],['Vikings','Marins et guerriers scandinaves du Moyen Âge.'],['Terre inhabitée','Terre où aucun humain ne vit.']],
 q:[['Quelle est la dernière grande terre peuplée par les humains ?','Aotearoa (la Nouvelle-Zélande), vers 1250–1300.'],['D’où viennent les premiers habitants de Madagascar ?','De Bornéo, en Asie du Sud-Est : ce sont des Austronésiens, comme les Lapita.'],['Qui atteint l’Amérique 500 ans avant Christophe Colomb ?','Les Vikings, vers l’an 1000.']],
 wiki:['Colonisation viking des Amériques','Histoire de Madagascar','Peuplement de l\'Océanie','L\'Anse aux Meadows'],
 src:[['Quand la Nouvelle-Zélande a-t-elle été peuplée ? (vers 1250-1300) — Te Ara, encyclopédie de la Nouvelle-Zélande','https://teara.govt.nz/en/when-was-new-zealand-first-settled'],['Les Thulé, ancêtres des Inuits, venus d’Alaska vers l’an 1000 — Musée canadien de l’histoire','https://www.historymuseum.ca/cmc/vmnf/premieres_nations/en/inuit/description.html'],['Peupler Madagascar : pas de preuve avant le milieu du Ier millénaire apr. J.-C. — Université d’Oxford, archéologie','https://www.arch.ox.ac.uk/node/884041'],['Les Malgaches : une ascendance venue du sud-est de Bornéo et d’Afrique — ScienceDaily (2016)','https://www.sciencedaily.com/releases/2016/07/160705183132.htm'],['Les Vikings à L’Anse aux Meadows en 1021 (étude publiée dans Nature) — Euronews (2021)','https://www.euronews.com/2021/10/22/the-vikings-settled-in-north-america-500-years-before-christopher-colombus-study-reveals']]},

/* 8 --------------------------------------------------------------- */
{short:'Aujourd’hui : 8 milliards d’humains',col:'dense',dur:54,when:[1800,2026],dates:'de 1800 à aujourd’hui',
 cam:[{t:0,lon:60,lat:18,z:0.46},{t:6,lon:60,lat:18,z:0.46},{t:10,lon:95,lat:28,z:0.85},{t:17,lon:95,lat:28,z:0.85},{t:22,lon:30,lat:18,z:0.46},{t:54,lon:30,lat:18,z:0.46}],
 zones:[
  Rg(P_ASIE_EST,'dense',6,0.72,2),Rg(P_ASIE_SUD,'dense',8,0.72,2),Rg(EUROPE,'dense',12,0.72,2),
  Rg(P_GUINEE,'dense',19,0.55,2),Rg(P_NIL,'dense',20,0.6,2),Rg(P_USA,'dense',21,0.55,2),Rg(P_BRESIL,'dense',22,0.55,2),Rg(P_JAVA,'dense',23,0.7,2),Rg(P_MEXIQUE,'dense',24,0.55,2),
  Rg(V_SAHARA,'vide',28,0.6,2),Rg(V_SIBERIE,'vide',29,0.6,2),Rg(V_NORD,'vide',30,0.6,2),Rg(V_AMAZONIE,'vide',31,0.6,2),Rg(V_AUSTRALIE,'vide',32,0.6,2),Rg(V_TIBET,'vide',33,0.6,2),Rg([0,-90,26],'vide',34,0.6,2),
  Lz(NCM,'kan',47,0.9)
 ],
 routes:[],
 labels:[
  L(6,124,31,'Asie de l’Est',{sub:'environ 1,6 milliard',nomark:true,big:true,al:'left'}),
  L(8,79,22,'Asie du Sud',{sub:'environ 2 milliards',nomark:true,big:true}),
  L(12,14,50,'Europe',{sub:'environ 750 millions',nomark:true,big:true}),
  L(19,3,8,'Golfe de Guinée',{nomark:true,dy:20,zmax:0.7}),
  L(20,33,14.5,'Vallée du Nil',{nomark:true,zmax:0.7}),
  L(21,-78,41,'Nord-Est des États-Unis',{nomark:true,dy:-16,zmax:0.7}),
  L(22,-44,-20,'Sud-Est du Brésil',{nomark:true,dx:14,al:'left',zmax:0.7}),
  L(23,110,-7.6,'Java',{nomark:true,dy:14,zmax:0.7}),
  L(28,8,24,'Sahara',{nomark:true,zmax:0.7}),
  L(29,105,66,'Sibérie',{nomark:true,zmax:0.7}),
  L(30,-100,66,'Grand Nord',{nomark:true,zmax:0.7}),
  L(31,-62,-4,'Amazonie',{nomark:true,zmax:0.7}),
  L(32,131,-25,'Désert australien',{nomark:true,zmax:0.7,end:45}),
  L(33,88,34,'Himalaya',{nomark:true,zmax:0.7}),
  L(47,165.5,-21.3,'Nouvelle-Calédonie',{sub:'environ 265 000 habitants',gold:true,dx:-10,dy:16,al:'right'})
 ],
 pulses:[Pu(47,165.5,-21.3,'#ffd166',true)],
 ph:[
  Ph(0,'Aujourd’hui','Nous sommes plus de 8 milliards d’humains. Mais nous ne sommes pas répartis partout de la même façon.','dense'),
  Ph(6,'Trois grands foyers de peuplement','L’Asie de l’Est, l’Asie du Sud et l’Europe rassemblent plus de la moitié de l’humanité. L’Inde et la Chine comptent chacune plus de 1,4 milliard d’habitants.','dense'),
  Ph(18,'Des foyers secondaires','D’autres régions sont très peuplées : le golfe de Guinée, la vallée du Nil, le nord-est des États-Unis, le sud-est du Brésil, l’île de Java.','dense'),
  Ph(27,'Des « déserts humains »','Trop froid, trop sec, trop haut ou couvert de forêt dense : très peu de monde vit dans le Sahara, le Grand Nord, l’Amazonie ou l’Himalaya.','vide'),
  Ph(38,'Une croissance très rapide','1 milliard d’humains vers 1800, 2 milliards en 1927, 4 en 1974, 8 en 2022. Près d’un humain sur deux vit aujourd’hui dans une ville.','dense'),
  Ph(46,'Et chez nous ?','La Nouvelle-Calédonie compte environ 265 000 habitants (recensement de 2025) : environ 14 par km². C’est très peu, comparé à l’île de Java : plus de 1 000 habitants par km².','kan')
 ],
 photos:[Sh('nuit',1,6,'bl',-2,'contain'),Sh('shibuya',11,17,'bl',-2),Sh('sahara',36,45,'bl',-2)],
 legend:[['dense','Fortes densités de population'],['vide','« Déserts humains »']],
 mots:[['Densité de population','Nombre d’habitants par km².'],['Foyer de peuplement','Région où vivent beaucoup d’habitants.'],['Désert humain','Région presque vide d’habitants.'],['Contrainte','Ce qui rend la vie difficile : froid, sécheresse, altitude, forêt dense.']],
 q:[['Quels sont les trois grands foyers de peuplement du monde ?','L’Asie de l’Est, l’Asie du Sud et l’Europe.'],['Pourquoi le Sahara ou le Grand Nord sont-ils presque vides ?','À cause des contraintes naturelles : sécheresse, froid.'],['Combien d’humains la Terre compte-t-elle ?','Plus de 8 milliards (le cap a été franchi en 2022).']],
 wiki:['Population mondiale','Densité de population','Foyer de peuplement'],
 src:[['Notre population mondiale : 8 milliards d’humains le 15 novembre 2022 — Nations unies','https://www.un.org/en/global-issues/population'],['World Urbanization Prospects 2025 : les villes abritent 45 % des 8,2 milliards d’humains — ONU DESA','https://www.un.org/development/desa/pd/node/4442'],['La Nouvelle-Calédonie compte 264 596 habitants en 2025 (recensement ISEE-Insee) — Outremers 360','https://outremers360.com/bassin-pacifique-appli/demographie-la-nouvelle-caledonie-compte-264-596-habitants-en-2025-cest-6-800-en-moins-en-six-ans'],['Populations de référence de Nouvelle-Calédonie de 2009 à 2025 — Insee','https://www.insee.fr/fr/statistiques/2122859']]}
];

var SPK={2:{sps:{2:'radeau'}},3:{sps:{3:'radeau'}},7:{sp:'balancier',sps:{0:'drakkar',1:'drakkar',2:'drakkar',4:'boutre',6:'polynesien',7:'polynesien',8:'polynesien',9:'polynesien'}}};
CH.forEach(function(c,i){var x=SPK[i]||{};if(x.sp)c.sp=x.sp;if(x.sps)c.sps=x.sps;});
A.add({id:'monde',title:'Peupler la Terre',tag:'9 chapitres · des premiers humains à aujourd’hui',col:'afr',proj:'plan',
 sub:'Comment les humains ont peuplé toute la planète : 9 chapitres, de l’Afrique aux dernières îles.',
 frise:{from:-7000000,to:2026,ref:2100,ticks:[[-7000000,'7 millions d’années'],[-2000000,'2 millions',1],[-300000,'300 000 ans'],[-70000,'70 000',1],[-20000,'20 000 ans'],[-9500,'9500 av. J.-C.',1],[-1100,'1100 av. J.-C.'],[1000,'an 1000',1],[2022,'2022']]},
 info:'<p><b>Collège, 6e, histoire</b> : thème 1 « La longue histoire de l’humanité et des migrations » : les débuts de l’humanité (chapitres 1 à 6, dont le chapitre 4 sur les différentes espèces humaines et leurs rencontres), la « révolution » néolithique (chapitre 7).</p><p><b>Collège, 6e, géographie</b> : « Le monde habité », la répartition de la population mondiale et ses dynamiques (chapitre 9).</p><p><b>Cycle 3, Nouvelle-Calédonie</b> : ce volet replace le peuplement austronésien du pays dans l’histoire du monde (chapitres 7 et 8), avant le volet « Vers le Pacifique ».</p><p><b>En classe</b> : passe en « Globe » pour montrer que la Béringie relie deux continents ; compare « Planisphère » et « Mercator » pour faire voir que le Groenland n’a pas la même taille selon la carte ; mesure la traversée Bornéo – Madagascar avec l’outil « Mesurer ».</p><p><b>Chapitre 4 (espèces humaines)</b> : message à faire passer : tous les humains d’aujourd’hui sont des Homo sapiens. Les traces d’ADN néandertalien ou dénisovien racontent des rencontres anciennes, elles ne classent ni ne hiérarchisent personne. Les zones sont schématiques ; la recherche évolue vite (fossiles dénisoviens du Yunnan publiés en 2026).</p>',
 chapters:CH});
})();
