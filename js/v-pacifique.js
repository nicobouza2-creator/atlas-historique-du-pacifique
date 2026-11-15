/* Volet 2 — Vers le Pacifique et la Nouvelle-Calédonie */
(function(){
'use strict';
var A=window.ATLAS,CO=A.CO,r=A.r,L=A.L,Pu=A.Pu,Ph=A.Ph,Sh=A.Sh,Lz=A.Lz,Rg=A.Rg,AFRICA=A.K.AFRICA,TRI=A.K.TRI;
var NCM=[[165.6,-21.3,2.0],[167.2,-20.9,0.7],[168.0,-21.5,0.6],[166.5,-20.55,0.5],[167.5,-22.6,0.5]];
var VANM=[[167,-15.6,2.2],[168.3,-17.7,1.5],[169.2,-19,1.5],[169.8,-20.1,1.0]];
var FIJM=[[178,-17.8,1.8],[179.2,-16.6,1.2],[-179.9,-16.8,1.5]];
var TONM=[[-175.2,-21.2,1.2],[-174.9,-19.8,1.2],[-173.9,-18.6,1.2]];
var SAMM=[[-171.7,-13.8,1.6]];
var LOYM=[[167.2,-20.9,0.7],[168.0,-21.5,0.6],[167.5,-22.6,0.5]];

var CH=[

/* 1 --------------------------------------------------------------- */
{short:'Berceau africain',col:'afr',dur:26,
 cam:[{t:0,lon:12,lat:8,z:1.0},{t:9,lon:22,lat:6,z:1.7},{t:26,lon:22,lat:6,z:1.7}],
 zones:[
  {k:'land',pts:[[20,5]],mask:AFRICA,col:'afr',a:0.6,t0:2,fade:0.5,grow:{c:[20,3],r0:1,r1:52,d:8}},
  {k:'land',pts:[[47,-19]],col:'afr',a:0.6,t0:8,fade:1.5}
 ],
 routes:[],
 labels:[
  L(1.5,20,2,'Afrique',{big:true,nomark:true}),
  L(11,-8.9,31.9,'Jebel Irhoud (Maroc)',{sub:'≈ 300 000 ans',mark:'site',dx:10,dy:-6,al:'left'}),
  L(14,35.9,5.4,'Omo (Éthiopie)',{sub:'≈ 230 000 ans',mark:'site',dx:-10,dy:-6,al:'right'})
 ],
 pulses:[Pu(11,-8.9,31.9,'#ffd166'),Pu(14,35.9,5.4,'#ffd166')],
 ph:[
  Ph(0,'Notre planète','Tout commence en Afrique. C’est le berceau de l’humanité.','#a8bdd0'),
  Ph(4,'Il y a ≈ 300 000 ans','Les plus vieux Homo sapiens connus ont été trouvés au Maroc et en Éthiopie.','afr'),
  Ph(17,'Pendant très longtemps…','Nos ancêtres vivent en Afrique. Un jour, un petit groupe part vers l’est.','afr')
 ],
 photos:[Sh('irhoud',10,20,'bl',-2),Sh('omo',14,24,'br',2)],
 legend:[['afr','Homo sapiens (Afrique)']]},

/* 2 --------------------------------------------------------------- */
{short:'Sortie d’Afrique',col:'afr',dur:40,
 cam:[{t:0,lon:30,lat:12,z:1.4},{t:7,lon:58,lat:14,z:1.7},{t:15,lon:92,lat:8,z:1.8},{t:25,lon:118,lat:-4,z:2.0},{t:40,lon:126,lat:-8,z:1.9}],
 zones:[
  {k:'land',pts:[[20,5]],mask:AFRICA,col:'afr',a:0.6,t0:-5,fade:0.01},
  {k:'shelf',c:[116,-4],r:48,col:'sand',a:0.85,t0:12,fade:3,t2:31,t3:36}
 ],
 routes:[
  r('#f59e0b',3,24,3.6,[[42,11],[47,15],[56,20],[66,25],[73,17],[78,9],[92,11],[100,6],[107,-1],[113,-3],[119,-8.5],[125,-10],[132,-12.5],[136,-20]]),
  r('#f59e0b',18,24,2.6,[[113,-3],[119,-1],[127,0],[134,-2.5],[141,-5]]),
  r('#f59e0b',12,22,2.6,[[99,12],[104,19],[110,24],[117,25],[121.2,24]])
 ],
 labels:[
  L(4,45,10,'Corne de l’Afrique',{dx:10,dy:14,al:'left',end:12}),
  L(14,108,-1,'Sunda',{sub:'Asie du Sud-Est réunie',nomark:true,dx:0,dy:0,al:'center',end:36}),
  L(21,137,-23,'Australie',{sub:'+ de 50 000 ans',dy:16,al:'center'}),
  L(22,141,-5,'Nouvelle-Guinée',{dx:-9,dy:-14,al:'right'}),
  L(22.5,135,-12,'Sahul',{sub:'Australie + Nouvelle-Guinée',nomark:true,dx:0,dy:-6,al:'center',end:36})
 ],
 pulses:[Pu(23,136,-20,'#f59e0b'),Pu(23,141,-5,'#f59e0b')],
 ph:[
  Ph(0,'Il y a ≈ 70 000 ans','Un petit groupe quitte l’Afrique. Il avance le long des côtes : Arabie, Inde, puis Asie du Sud-Est.','afr'),
  Ph(12,'Pendant la glaciation','La glace retient l’eau : la mer est 120 m plus basse. L’Asie du Sud-Est devient un grand continent (Sunda). L’Australie et la Nouvelle-Guinée sont réunies (Sahul).','sand'),
  Ph(21,'Il y a plus de 50 000 ans','Il reste quelques bras de mer à traverser, sans doute sur des radeaux. Les premiers humains arrivent à Sahul.','afr'),
  Ph(32,'Puis la mer remonte','La glace fond et la mer monte. Les terres se découpent en îles. Les habitants de Sahul y restent très longtemps.','sand')
 ],
 photos:[Sh('babel',6,15,'tr',2),Sh('mungo',27,37,'bl',-2)],
 legend:[['afr','Sortie d’Afrique (≈ 70 000 ans)'],['sand','Terres exondées (mer ≈ −120 m)']]},

/* 3 --------------------------------------------------------------- */
{short:'Les Austronésiens',col:'aus',dur:36,
 cam:[{t:0,lon:124,lat:14,z:2.3},{t:12,lon:128,lat:6,z:2.4},{t:24,lon:141,lat:-1,z:2.7},{t:36,lon:146,lat:-4,z:2.7}],
 zones:[
  {k:'land',pts:[[121,24]],col:'aus',a:0.6,t0:4,fade:1.5},
  {k:'land',cen:[150.5,-5],rad:3.6,col:'aus',a:0.6,t0:24,fade:2}
 ],
 routes:[
  r('#2dd4bf',6,26,3.6,[[121.3,24],[122.4,20.5],[123.8,17.5],[125.6,13.8],[126.6,11],[127.2,7.5],[127.8,4.5],[130.5,1.8],[134,-0.2],[138.5,-1.0],[143,-2.6],[147,-4.0],[149.7,-4.9]],{boat:true})
 ],
 labels:[
  L(4,121.3,24,'Taïwan',{sub:'départ ≈ 2200 av. J.-C.',dx:-9,dy:-6,al:'right'}),
  L(12,122,13,'Philippines',{dx:-9,dy:0,al:'right',end:30}),
  L(25,150.5,-5.2,'Archipel Bismarck',{sub:'≈ 1350 av. J.-C.',dx:-9,dy:-24,al:'right',gold:true}),
  L(22,141,-5.5,'Nouvelle-Guinée',{dx:-6,dy:14,al:'center'})
 ],
 pulses:[Pu(4,121.3,24,'#2dd4bf'),Pu(25,150.5,-5.2,'#2dd4bf')],
 ph:[
  Ph(0,'≈ 2200 av. J.-C.','Des paysans-marins quittent Taïwan, où leurs ancêtres, venus de Chine, vivaient depuis plus d’un millier d’années. Ils parlent des langues « austronésiennes ».','aus'),
  Ph(10,'En pirogue à balancier','Dans les pirogues : taro, igname, banane, cochons, chiens et poules.','aus'),
  Ph(24,'≈ 1400 – 1300 av. J.-C.','Ils arrivent près de la Nouvelle-Guinée. Des Papous y vivent déjà depuis très longtemps. Les groupes se rencontrent et se mélangent.','aus')
 ],
 photos:[Sh('carteaustro',1,11,'bl',-2,'contain'),Sh('pirogue',11,19,'tr',2),Sh('taro',19,24,'bl',-2),Sh('igname',24,29,'tl',2),Sh('banane',29,36,'tl',-2)],
 legend:[['aus','Austronésiens (départ de Taïwan ≈ 2200 av. J.-C.)']]},

/* 4 --------------------------------------------------------------- */
{short:'Les Lapita',col:'lap',dur:44,
 cam:[{t:0,lon:147,lat:-7,z:2.6},{t:8,lon:160,lat:-12,z:2.8},{t:18,lon:172,lat:-17,z:3.2},{t:30,lon:-178,lat:-17,z:3.4},{t:44,lon:-178,lat:-16,z:3.0}],
 zones:[
  {k:'land',cen:[150.5,-5],rad:3.6,col:'aus',a:0.6,t0:-5,fade:0.01},
  Lz(VANM,'lap',14,0.55),Lz(NCM,'lap',19,0.55),Lz(FIJM,'lap',23,0.55),Lz(TONM,'lap',27,0.55),Lz(SAMM,'lap',32,0.55)
 ],
 routes:[
  r('#b794f6',3,13,3.6,[[150,-5.3],[151.2,-6.1],[153.0,-5.8],[154.6,-4.8],[157.2,-5.5],[160.7,-6.6],[163.3,-8.9],[165.3,-11.6],[167,-14.2],[168.5,-16.4],[168.8,-17.5]],{boat:true}),
  r('#b794f6',13,19,3.2,[[168.8,-17.5],[166.8,-18.6],[165.4,-19.4],[164.4,-19.85]],{boat:true}),
  r('#b794f6',14,23,3.2,[[168.8,-17.5],[172,-17.0],[176,-17.6],[178,-17.8]],{boat:true}),
  r('#b794f6',22,28,3.0,[[178,-17.8],[-179.5,-19.5],[-175.5,-21.0]],{boat:true}),
  r('#b794f6',27,33,3.0,[[-175.5,-21.0],[-174.8,-17.5],[-172.2,-14.2]],{boat:true})
 ],
 labels:[
  L(3,150,-5.5,'Bismarck',{sub:'≈ 1350 av. J.-C.',dx:-9,dy:-24,al:'right',end:14}),
  L(14,168,-16,'Vanuatu',{sub:'≈ 1100–1000 av. J.-C.',dx:10,dy:-8,al:'left'}),
  L(19,165.8,-21.5,'Nouvelle-Calédonie',{sub:'≈ 1100 av. J.-C.',dx:-9,dy:20,al:'right',gold:true}),
  L(23,178,-17.8,'Fidji',{sub:'≈ 1000 av. J.-C.',dx:0,dy:-16,al:'center'}),
  L(27,-175.2,-21.2,'Tonga',{sub:'≈ 900 av. J.-C.',dx:0,dy:18,al:'center'}),
  L(32,-171.7,-13.8,'Samoa',{sub:'≈ 800 av. J.-C.',dx:0,dy:-16,al:'center'})
 ],
 pulses:[Pu(14,168.8,-17.5,'#b794f6'),Pu(19,165.5,-21,'#ffd166',true),Pu(23,178,-17.8,'#b794f6'),Pu(27,-175.2,-21.2,'#b794f6'),Pu(32,-171.7,-13.8,'#b794f6')],
 ph:[
  Ph(0,'≈ 1350 av. J.-C.','Les Lapita fabriquent des poteries décorées de petits points. Ils partent de l’archipel Bismarck.','lap'),
  Ph(12,'≈ 1100 – 1000 av. J.-C.','En quelques générations, ils traversent la haute mer jusqu’à la Nouvelle-Calédonie et au Vanuatu. Personne n’y vivait.','lap'),
  Ph(23,'≈ 1000 à 800 av. J.-C.','Ils vont aussi à Fidji, Tonga et Samoa. Leurs descendants créeront la culture polynésienne.','lap')
 ],
 photos:[Sh('lapitapot',6,16,'tr',2),Sh('lapitatesson',24,34,'bl',-2),Sh('croixsud',36,44,'tr',2)],
 legend:[['lap','Lapita (≈ 1600 à 800 av. J.-C.)'],['aus','Austronésiens']]},

/* 5 --------------------------------------------------------------- */
{short:'Les Polynésiens',col:'pol',dur:42,
 cam:[{t:0,lon:-172,lat:-15,z:3.4},{t:9,lon:-160,lat:-15,z:1.9},{t:20,lon:-150,lat:-5,z:1.25},{t:34,lon:-165,lat:-8,z:1.05},{t:42,lon:-165,lat:-8,z:1.05}],
 zones:[
  Lz(FIJM,'lap',-5,0.55,0.01),Lz(TONM,'lap',-5,0.55,0.01),Lz(SAMM,'lap',-5,0.55,0.01),
  Lz([[-149.4,-17.65,1.0]],'pol',11,0.6),Lz([[-156.5,20.3,4]],'pol',19,0.6),Lz([[-109.4,-27.1,0.6]],'pol',20,0.6),Lz([[173,-41,7]],'pol',21,0.6),
  {k:'poly',ring:TRI,col:'pol',a:0.5,t0:29,fade:3}
 ],
 routes:[
  r('#ff6b57',4,11,6.4,[[-172,-13.8],[-166,-18],[-160,-21.2],[-155,-19.5],[-149.5,-17.5]],{taper:true,amp:0.8,freq:1.5}),
  r('#ff6b57',5,12,3.8,[[-172,-13.8],[-171.5,-9],[-165,-5],[-158,1.5]],{taper:true,amp:1.0,freq:2,phase:2}),
  r('#ff6b57',11,13,3.6,[[-149.5,-17.5],[-146,-16],[-141,-18.5]],{taper:true,amp:0.5,freq:1}),
  r('#ff6b57',11,19,5.2,[[-149.5,-17.5],[-145,-12],[-140,-9],[-146,0],[-152,10],[-155.5,19.6]],{taper:true,amp:1.6,freq:2}),
  r('#ff6b57',12,20,5.2,[[-149.5,-17.5],[-142,-21],[-135,-23.2],[-122,-25.5],[-109.4,-27.1]],{taper:true,amp:1.4,freq:2.5,phase:Math.PI}),
  r('#ff6b57',13,21,5.2,[[-160,-21.2],[-170,-26],[-179,-31],[177,-37],[173.5,-40.5]],{taper:true,amp:1.4,freq:2,phase:1})
 ],
 labels:[
  L(1,-171.7,-13.8,'Samoa',{dx:0,dy:-14,al:'center',end:10}),
  L(1,-175.2,-21.2,'Tonga',{dx:0,dy:16,al:'center',end:10}),
  L(12,-149.5,-17.5,'Tahiti',{sub:'≈ 1000–1100',dx:0,dy:18,al:'center'}),
  L(19.5,-155.5,19.6,'Hawaï',{sub:'≈ 1000–1250',dx:12,dy:0,al:'left'}),
  L(20.5,-109.4,-27.1,'Rapa Nui',{dx:0,dy:-16,al:'center'}),
  L(21.5,173.5,-40.5,'Aotearoa',{sub:'≈ 1250–1300',dx:12,dy:4,al:'left'}),
  L(31,-135,-4,'Le triangle polynésien',{nomark:true,big:true,dx:0,dy:0,al:'center'})
 ],
 pulses:[Pu(12,-149.5,-17.5,'#ff6b57'),Pu(19.5,-155.5,19.6,'#ff6b57'),Pu(20.5,-109.4,-27.1,'#ff6b57'),Pu(21.5,173.5,-40.5,'#ff6b57')],
 ph:[
  Ph(0,'≈ 800 av. J.-C. à 800 apr. J.-C.','À Tonga et Samoa, les descendants des Lapita créent la culture polynésienne. Ils restent là très longtemps.','pol'),
  Ph(9,'≈ 1000 à 1100 apr. J.-C.','Puis ils repartent vers l’est, sur de grandes pirogues doubles. Ils se guident avec les étoiles, les vagues et les oiseaux.','pol'),
  Ph(19,'≈ 1000 à 1300 apr. J.-C.','Ils atteignent Hawaï, Rapa Nui et Aotearoa (Nouvelle-Zélande) : parmi les dernières terres peuplées au monde.','pol',true),
  Ph(29,'Le triangle polynésien','Hawaï, Rapa Nui et Aotearoa forment un immense triangle : des milliers de kilomètres d’océan.','pol')
 ],
 photos:[Sh('croixsud',3,13,'tr',2),Sh('pirogue',13,22,'bl',-2),Sh('hokulea',23,32,'tr',2),Sh('moai',32,42,'bl',-2)],
 legend:[['pol','Polynésiens (≈ 800 à 1250)'],['lap','Lapita']]},

/* 6 --------------------------------------------------------------- */
{short:'Nouvelle-Calédonie : les premiers arrivants',col:'kan',dur:46,lagoon:6,
 cam:[{t:0,lon:168,lat:-17.5,z:6.5},{t:10,lon:166.2,lat:-20.6,z:13},{t:22,lon:165.0,lat:-21.1,z:24},{t:34,lon:165.6,lat:-21.2,z:19},{t:46,lon:166.3,lat:-21.6,z:12}],
 zones:[
  Lz(VANM,'lap',-5,0.5,0.01),
  Lz(NCM,'lap',16,0.5,2)
 ],
 routes:[
  r('#b794f6',3,14,3.4,[[168.3,-17.7],[166.7,-18.8],[165.3,-19.5],[164.3,-19.85]],{boat:true,step:0.4}),
  r('#b794f6',14,20,3.0,[[164.3,-19.85],[163.8,-20.1],[163.92,-20.45],[164.1,-20.75],[164.45,-20.95],[164.69,-21.02]],{boat:true,straight:true,step:0.08}),
  r('#b794f6',8,22,3.0,[[169.3,-19.5],[169.0,-21.2],[168.2,-22.3],[167.5,-22.55]],{boat:true,step:0.4})
 ],
 labels:[
  L(1,168.3,-17.7,'Vanuatu',{dx:10,dy:-4,al:'left',end:26}),
  L(3,165.4,-21.5,'Nouvelle-Calédonie',{big:true,nomark:true,gold:true,dx:-6,dy:-24,al:'center',zmax:15,end:12}),
  L(17,164.85,-21.04,'Foué (Koné)',{sub:'poterie Lapita ≈ 1000 av. J.-C.',mark:'site',dx:-10,dy:-4,al:'right',zmin:14}),
  L(22,164.9,-21.13,'Pouembout',{mark:'star',dx:10,dy:12,al:'left',zmin:14}),
  L(20,167.5,-22.65,'Île des Pins',{dx:0,dy:16,al:'center',zmin:9}),
  L(24,167.2,-20.9,'Lifou',{dx:0,dy:-12,al:'center',zmin:9,end:46}),
  L(24,168.0,-21.5,'Maré',{dx:10,dy:6,al:'left',zmin:9,end:46})
 ],
 pulses:[Pu(14,164.3,-19.85,'#b794f6'),Pu(20,164.8,-21.0,'#ffd166',true)],
 ph:[
  Ph(0,'≈ 1100 av. J.-C.','Des pirogues Lapita, venues du nord par le Vanuatu, arrivent en Nouvelle-Calédonie. Personne n’y avait jamais vécu.','lap'),
  Ph(10,'Au bord du lagon','Ils s’installent près des plages. Ils pêchent, ramassent des coquillages et plantent taro, igname et banane.','lap'),
  Ph(22,'Foué, près de Koné','Les archéologues y ont trouvé des tessons de poterie Lapita et des tombes très anciennes. C’est tout près de Pouembout !','kan'),
  Ph(34,'Un pays qui se construit','Avec ceux qui arriveront ensuite, ils sont à l’origine de la société kanak.','kan')
 ],
 photos:[Sh('lapitapot',4,13,'tr',2),Sh('lagon',13,21,'bl',-2),Sh('lapitatesson',22,30,'tr',2),Sh('herminette',31,39,'bl',-2),Sh('petro',39,46,'tr',2)],
 legend:[['lap','Lapita (≈ 1100 av. J.-C.)'],['jade','Lagon']]},

/* 7 --------------------------------------------------------------- */
{short:'Nouvelles vagues et société kanak',col:'pap',dur:42,lagoon:0,
 cam:[{t:0,lon:158,lat:-11,z:3.6},{t:12,lon:164,lat:-17,z:6.5},{t:24,lon:165.8,lat:-21,z:10.5},{t:42,lon:166,lat:-21.2,z:10.5}],
 zones:[
  Lz(VANM,'lap',-5,0.45,0.01),
  Lz(NCM,'lap',-5,0.45,0.01),
  Lz(NCM,'kan',26,0.5,4)
 ],
 routes:[
  r('#f472b6',3,20,3.4,[[150,-5.3],[151.2,-6.1],[153.0,-5.8],[154.6,-4.8],[157.2,-5.5],[160.7,-6.6],[163.3,-8.9],[165.3,-11.6],[167,-14.2],[168.5,-16.4],[168.8,-17.8],[167.9,-19.3],[165.5,-19.9]],{boat:true,dash:true})
 ],
 labels:[
  L(2,150.5,-5.5,'Bismarck',{dx:-9,dy:-14,al:'right',end:14}),
  L(10,168.3,-17.7,'Vanuatu',{dx:10,dy:-4,al:'left'}),
  L(18,167.4,-22.9,'Nouvelle-Calédonie',{gold:true,nomark:true,big:true,dx:0,dy:0,al:'left'})
 ],
 pulses:[],
 ph:[
  Ph(0,'≈ 500 av. J.-C. et après','L’ADN ancien du Vanuatu montre l’arrivée de nouveaux groupes, venus du nord. Ils se mélangent aux Lapita. Les poteries changent.','pap',true),
  Ph(14,'Et en Nouvelle-Calédonie ?','Elle reçoit sans doute aussi de nouveaux groupes venus de Mélanésie. Les chercheurs cherchent encore les dates et les routes : ces flèches sont des hypothèses.','pap',true),
  Ph(26,'Les siècles passent','La société kanak prend forme : clans, chefferies, grandes cases, tarodières irriguées dans les vallées.','kan'),
  Ph(36,'Une société qui s’organise','Chaque clan a sa terre, ses ancêtres et ses alliés. On voyage en pirogue et on échange entre vallées et îles.','kan')
 ],
 photos:[Sh('tribu',22,29,'tr',2),Sh('grandecase',29,35,'bl',-2),Sh('fleche',35,42,'tr',2)],
 legend:[['pap','Nouvelles vagues (hypothèse)',true],['kan','Société kanak']]},

/* 8 --------------------------------------------------------------- */
{short:'Les Xetiwan et les îles voisines',col:'xet',dur:46,lagoon:0,
 cam:[{t:0,lon:167.6,lat:-21,z:11},{t:12,lon:167.4,lat:-21.3,z:18},{t:46,lon:167.4,lat:-21.3,z:18}],
 zones:[
  Lz(NCM,'kan',-5,0.35,0.01),
  Lz([[169.8,-20.1,1.0]],'xet',4,0.55),
  Lz(LOYM,'xet',20,0.45,3)
 ],
 routes:[
  r('#86efac',7,17,3.4,[[169.8,-20.3],[168.9,-20.95],[167.9,-21.15],[167.5,-21.3],[167.2,-21.25]],{boat:true,dash:true,straight:true,step:0.1}),
  r('#86efac',20,25,3.0,[[167.4,-21.3],[167.7,-21.45],[167.8,-21.55]],{boat:true,dash:true,straight:true,step:0.05}),
  r('#86efac',24,30,3.0,[[167.2,-21.3],[167.3,-22.0],[167.4,-22.5]],{boat:true,dash:true,straight:true,step:0.1}),
  r('#86efac',32,38,2.4,[[169.8,-20.4],[169.3,-21.5],[168.3,-22.4],[167.6,-22.6]],{boat:true,dash:true,straight:true,step:0.1}),
  r('#5eead4',38,43,2.6,[[165.55,-20.95],[166.3,-21.0],[166.9,-20.95]],{dash:true,straight:true,step:0.1})
 ],
 labels:[
  L(3,169.8,-20.2,'Anatom (Vanuatu)',{dx:0,dy:-14,al:'center'}),
  L(8,167.24,-20.85,'Lifou (Drehu)',{dx:-8,dy:-12,al:'right'}),
  L(19,168.0,-21.5,'Maré (Nengone)',{dx:12,dy:2,al:'left'}),
  L(23,167.5,-22.65,'Île des Pins (Kwényï)',{dx:0,dy:17,al:'center'}),
  L(12,167.15,-21.12,'Lössi, sud de Lifou',{mark:'site',dx:-9,dy:12,al:'right',sub:'clans « Xetiwan »',zmin:14}),
  L(14,166.55,-20.55,'Ouvéa (Iaai)',{dx:-10,dy:-8,al:'right',end:46}),
  L(36,165.55,-21.1,'Grande Terre',{dx:-8,dy:0,al:'right',end:46})
 ],
 pulses:[Pu(10,167.15,-21.12,'#86efac')],
 ph:[
  Ph(0,'Des îles reliées par la mer','Les Kanak ne vivent pas isolés. Grande Terre, Loyauté, île des Pins et Vanuatu sont reliés par les pirogues, les alliances et les échanges.','xet'),
  Ph(7,'Les Xetiwan','À Lifou, « Xetiwan » veut dire « dont on ignore l’origine ». Selon l’ethnologue Jean Guiart, ces clans viendraient d’Anatom (Vanuatu), peut-être de souche polynésienne.','xet',true),
  Ph(20,'Des clans qui voyagent','Selon cette tradition, des chefferies de Maré et de l’île des Pins viendraient de clans de Lifou. Une légende de l’île des Pins parle aussi d’une femme venue d’Anatom.','xet',true),
  Ph(38,'Le cycle du jade','Du jade de Grande Terre voyage vers les îles. On échange aussi des ignames, des coquillages… et des alliances.','jade')
 ],
 photos:[Sh('pirogue2',4,14,'tr',2),Sh('loyaute1870',16,26,'bl',-2,'contain'),Sh('herminette',37,46,'tr',2)],
 legend:[['xet','Origine Anatom → Loyauté (hypothèse)',true],['jade','Échanges de jade (schéma)',true]]},

/* 9 --------------------------------------------------------------- */
{short:'Tongiens, Wallisiens et Samoans',col:'pol',dur:52,
 cam:[{t:0,lon:-178,lat:-17,z:3.6},{t:6,lon:178.5,lat:-18,z:4.3},{t:20,lon:172,lat:-19.5,z:6},{t:30,lon:168,lat:-20.8,z:15},{t:52,lon:167.6,lat:-21.0,z:15}],
 zones:[
  Lz(FIJM,'lap',-5,0.4,0.01),Lz(TONM,'pol',-5,0.55,0.01),Lz(SAMM,'pol',-5,0.55,0.01),Lz([[-176.15,-13.3,0.4],[-178.1,-14.28,0.4]],'pol',-5,0.6,0.01),
  Lz(VANM,'lap',-5,0.35,0.01),Lz(NCM,'kan',-5,0.35,0.01)
 ],
 routes:[
  r('#ff6b57',5,15,3.4,[[-176.2,-13.3],[-178,-16.5],[180,-18.5],[175,-20.2],[172,-20.7],[170,-20.75],[168.5,-20.55],[167.0,-20.45],[166.8,-20.5]],{boat:true,dash:true,step:0.4}),
  r('#ff6b57',16,25,3.0,[[-175.2,-21.2],[-178.8,-22.3],[177,-22.2],[172,-22.0],[168.4,-22.0],[167.6,-21.7],[167.2,-21.3]],{boat:true,dash:true,step:0.4}),
  r('#ff6b57',22,30,3.0,[[-175.2,-21.4],[-178.8,-22.6],[177,-22.4],[172,-22.2],[169.3,-22.1],[168.3,-21.8],[168.15,-21.7]],{boat:true,dash:true,step:0.4}),
  r('#7cb7ff',32,41,3.6,[[-171.8,-13.9],[-175,-16.6],[179.5,-19.6],[176,-20.6],[172,-21.0],[169.5,-21.1],[168.5,-21.2],[167.95,-21.35]],{boat:true,step:0.4}),
  r('#7cb7ff',43,47,2.6,[[167.9,-21.3],[167.55,-21.2],[167.35,-21.15]],{boat:true,straight:true,step:0.05})
 ],
 labels:[
  L(2,-176.2,-13.3,'Wallis (Uvea)',{dx:0,dy:-14,al:'center'}),
  L(2,-175.2,-21.2,'Tonga',{dx:0,dy:16,al:'center'}),
  L(2,-171.8,-13.9,'Samoa',{dx:0,dy:16,al:'center'}),
  L(18,166.5,-20.55,'Ouvéa',{sub:'≈ 1750',dx:-10,dy:-12,al:'right',zmin:10}),
  L(18,167.24,-20.95,'Lifou',{dx:0,dy:-12,al:'center',zmin:10}),
  L(18,168.0,-21.55,'Maré',{dx:12,dy:8,al:'left',zmin:10})
 ],
 pulses:[Pu(15,166.8,-20.5,'#ff6b57'),Pu(25,167.2,-21.3,'#ff6b57'),Pu(30,168.15,-21.7,'#ff6b57'),Pu(41,167.95,-21.35,'#7cb7ff')],
 ph:[
  Ph(0,'Les cousins de l’Ouest polynésien','Entre le XVIe et le début du XIXe siècle, selon les traditions orales, des pirogues de Wallis, Futuna, Tonga et Samoa abordent les îles Loyauté.','pol',true),
  Ph(6,'≈ 1750 : les Wallisiens à Ouvéa','Des pirogues de Wallis (Uvea) arrivent à Ouvéa. On y parle encore leur langue, le fagauvea.','pol',true),
  Ph(16,'Des Tongiens à Lifou et à Maré','À Lifou, des « gens de Tonga » s’installent dans la baie de Mu. À Maré, sept Tongiens arrivent vers 1836.','pol',true),
  Ph(32,'1841 : des enseignants samoans','La London Missionary Society envoie des enseignants polynésiens. Les Samoans Tataïo et Taniela s’installent à Maré en 1841. Fao arrive à Lifou en 1842.','mis'),
  Ph(44,'Des liens déjà là','Grâce à ces liens anciens, les nouveaux venus sont bien accueillis. La religion protestante se répand vite aux Loyauté.','mis')
 ],
 photos:[Sh('pirogue',3,12,'tr',2),Sh('fayaoue',44,52,'tr',2)],
 legend:[['pol','Wallisiens et Tongiens (traditions)',true],['mis','Enseignants samoans (LMS, 1841–42)']]},

/* 10 -------------------------------------------------------------- */
{short:'Explorateurs, santaliers et missionnaires',col:'eur',dur:58,
 cam:[{t:0,lon:169,lat:-21.5,z:6},{t:10,lon:166.5,lat:-21.3,z:9.5},{t:24,lon:166.8,lat:-21.8,z:8.5},{t:38,lon:166,lat:-21.5,z:9},{t:58,lon:166.4,lat:-21.2,z:8}],
 zones:[Lz(NCM,'kan',-5,0.3,0.01),Lz(VANM,'lap',-5,0.25,0.01)],
 routes:[
  r('#e8edf2',4,20,3.2,[[169.3,-19.6],[167.6,-19.75],[166,-19.85],[165.0,-20.0],[164.85,-20.18],[165.3,-20.5],[165.8,-20.95],[166.1,-21.4],[166.75,-21.8],[167.2,-22.1],[167.8,-22.6],[168.4,-23.4],[168.8,-24.5]],{boat:true,straight:true,step:0.3}),
  r('#e8edf2',22,28,2.8,[[171,-24.8],[169.5,-23.7],[168.2,-22.9],[167.5,-22.6]],{boat:true,straight:true,step:0.2}),
  r('#7cb7ff',30,36,3.0,[[171.5,-21.7],[169.8,-21.5],[168.5,-21.3],[168.0,-21.4]],{boat:true,straight:true,step:0.2}),
  r('#ff9ecb',38,46,3.2,[[168.8,-24.8],[168.2,-23.4],[167.6,-22.3],[167.0,-21.9],[166.3,-21.35],[165.7,-20.85],[165.2,-20.45],[164.85,-20.2]],{boat:true,straight:true,step:0.3})
 ],
 labels:[
  L(2,169.3,-19.5,'Tanna (Vanuatu)',{dx:8,dy:-12,al:'left',zmin:6,end:16}),
  L(14,164.5,-20.3,'Balade',{mark:'site',dx:-9,dy:-4,al:'right'}),
  L(22,167.5,-22.65,'Île des Pins',{dx:0,dy:16,al:'center'}),
  L(30,168.0,-21.5,'Maré',{dx:12,dy:6,al:'left'}),
  L(30,167.24,-20.9,'Lifou',{dx:0,dy:-12,al:'center'}),
  L(50,166.46,-22.27,'Nouméa',{sub:'fondée en 1854',dx:10,dy:2,al:'left',gold:true})
 ],
 pulses:[Pu(20,164.9,-20.3,'#e8edf2'),Pu(46,164.9,-20.35,'#ff9ecb'),Pu(52,164.9,-20.3,'#ffd166',true)],
 ph:[
  Ph(0,'4 – 5 septembre 1774','Le capitaine britannique James Cook aperçoit la Grande Terre le 4 septembre et débarque le lendemain à Balade. Il l’appelle « Nouvelle-Calédonie », car elle lui rappelle l’Écosse.','eur'),
  Ph(12,'Cook longe la côte','Il passe devant l’île des Pins, nommée ainsi à cause de ses grands pins colonnaires. Puis il repart vers la Nouvelle-Zélande.','eur'),
  Ph(21,'≈ 1840 : baleiniers et santaliers','Des bateaux viennent chasser la baleine et chercher du santal pour la Chine. Ils échangent des haches, des fusils et des tissus.','eur'),
  Ph(30,'1840 – 1842 : missionnaires protestants','La London Missionary Society envoie des enseignants polynésiens à Maré et à Lifou. Des missionnaires européens suivront.','mis'),
  Ph(38,'1843 : missionnaires catholiques','Mgr Douarre et les Maristes s’installent à Balade. D’autres missions suivent.','cat'),
  Ph(48,'1853 – 1864','Le 24 septembre 1853, la France prend possession de la Grande Terre, à Balade. Les îles Loyauté sont rattachées en 1864.','eur')
 ],
 photos:[Sh('cook',1,8,'tl',-2),Sh('hodges',8,16,'tr',2),Sh('baleinier',20,27,'tr',2),Sh('pins1840',27,34,'bl',-2),Sh('douarre',36,42,'bl',-2),Sh('balade1843',42,48,'tr',2),Sh('lifou1864',50,58,'bl',-2)],
 legend:[['eur','Explorateurs et commerçants'],['mis','Protestants (LMS)'],['cat','Catholiques (Maristes)']]}
];
/* compléments : dates, frise, fiche (mots-clés, questions, liens) */
var X=[
{when:[-300000,-70000],dates:'il y a 300 000 à 70 000 ans',
 mots:[['Homo sapiens','Notre espèce : tous les humains d’aujourd’hui.'],['Fossile','Reste très ancien d’un être vivant, conservé dans la roche.']],
 q:[['Sur quel continent sont apparus les premiers Homo sapiens ?','En Afrique, il y a environ 300 000 ans.'],['Où a-t-on trouvé leurs plus vieux fossiles ?','Au Maroc (Jebel Irhoud) et en Éthiopie (Omo).']],
 wiki:['Homo sapiens','Djebel Irhoud']},
{when:[-70000,-50000],dates:'il y a 70 000 à 50 000 ans',
 mots:[['Glaciation','Période très froide : une partie de l’eau de la Terre est gelée et la mer baisse.'],['Sunda et Sahul','Deux grands continents de l’époque glaciaire : l’Asie du Sud-Est réunie, et l’Australie reliée à la Nouvelle-Guinée.']],
 q:[['Pourquoi pouvait-on presque aller à pied jusqu’en Australie ?','La mer était environ 120 m plus basse : beaucoup d’îles étaient reliées entre elles.'],['Depuis combien de temps des humains vivent-ils en Australie ?','Depuis plus de 50 000 ans.']],
 wiki:['Sahul','Sundaland']},
{when:[-2200,-1350],dates:'≈ 2200 à 1350 av. J.-C.',
 mots:[['Austronésiens','Peuples de marins et de paysans partis de Taïwan. Leurs langues se ressemblent, de Madagascar à l’île de Pâques.'],['Pirogue à balancier','Pirogue équilibrée par un flotteur placé sur le côté.']],
 q:[['D’où partent les Austronésiens ?','De Taïwan, vers 2200 av. J.-C.'],['Qu’emportent-ils dans leurs pirogues ?','Des plantes (taro, igname, banane) et des animaux (cochons, chiens, poules).']],
 wiki:['Langues austronésiennes','Pirogue à balancier']},
{when:[-1350,-800],dates:'≈ 1350 à 800 av. J.-C.',
 mots:[['Lapita','Nom d’un site proche de Koné, en Nouvelle-Calédonie, donné à ces potiers-navigateurs.'],['Archéologue','Chercheur qui étudie les traces laissées par les humains du passé.']],
 q:[['À quoi reconnaît-on une poterie Lapita ?','À ses décors faits de petits points imprimés.'],['Qui vivait en Nouvelle-Calédonie avant les Lapita ?','Personne : ce sont les premiers habitants.']],
 wiki:['Lapita']},
{when:[-800,1300],dates:'≈ 800 av. J.-C. à 1300 apr. J.-C.',
 mots:[['Triangle polynésien','Immense partie du Pacifique entre Hawaï, Rapa Nui (île de Pâques) et Aotearoa (Nouvelle-Zélande).'],['Navigation aux étoiles','Se diriger en mer en observant les étoiles, les vagues et les oiseaux.']],
 q:[['Quels sont les trois sommets du triangle polynésien ?','Hawaï, Rapa Nui (île de Pâques) et Aotearoa (Nouvelle-Zélande).'],['Comment les Polynésiens se repéraient-ils en mer ?','Avec les étoiles, les vagues et les oiseaux.']],
 wiki:['Triangle polynésien','Peuplement de l\'Océanie']},
{when:[-1100,-900],dates:'≈ 1100 av. J.-C.',
 mots:[['Lagon','Étendue de mer peu profonde entre la côte et le récif.'],['Tesson','Morceau de poterie cassée.']],
 q:[['D’où viennent les premiers habitants de la Nouvelle-Calédonie ?','Du nord, par le Vanuatu : ce sont des Lapita arrivés en pirogue vers 1100 av. J.-C.'],['Quelle trace des Lapita trouve-t-on près de Koné ?','Des tessons de poterie décorée et des tombes anciennes, à Foué.']],
 wiki:['Histoire de la Nouvelle-Calédonie','Lapita']},
{when:[-500,1000],dates:'≈ 500 av. J.-C. à l’an 1000',
 mots:[['Clan','Groupe de familles qui ont le même ancêtre.'],['Chefferie','Ensemble de clans réunis autour d’un chef.'],['Tarodière','Champ en terrasses, arrosé par des canaux, où l’on cultive le taro.']],
 q:[['Que nous apprend l’ADN ancien trouvé au Vanuatu ?','Que de nouveaux groupes sont arrivés après les Lapita et se sont mélangés à eux.'],['Cite deux éléments de la société kanak.','Les clans, les chefferies, les grandes cases, les tarodières…']],
 wiki:['Kanak','Grande case']},
{when:[1200,1700],dates:'avant l’arrivée des Européens',
 mots:[['Tradition orale','Histoire transmise par la parole, de génération en génération.'],['Échange','Donner une chose pour en recevoir une autre.']],
 q:[['Que veut dire « Xetiwan » à Lifou ?','« Dont on ignore l’origine ».'],['Qu’échangeait-on entre la Grande Terre et les îles ?','Du jade, des ignames, des coquillages… et des alliances.']],
 wiki:['Îles Loyauté','Lifou']},
{when:[1550,1842],dates:'XVIe siècle à 1842',
 mots:[['Fagauvea','Langue polynésienne parlée à Ouvéa, venue de Wallis.'],['Missionnaire','Personne envoyée pour faire connaître sa religion.']],
 q:[['Pourquoi parle-t-on une langue polynésienne à Ouvéa ?','Parce que des Wallisiens s’y sont installés vers 1750.'],['Qui sont les premiers enseignants protestants à Maré, en 1841 ?','Des Samoans, envoyés par la London Missionary Society.']],
 wiki:['Fagauvea','London Missionary Society']},
{when:[1774,1864],dates:'1774 – 1864',
 mots:[['Santalier','Marchand qui venait chercher le bois de santal.'],['Prise de possession','Acte par lequel un pays déclare qu’une terre lui appartient.']],
 q:[['Qui donne son nom à la Nouvelle-Calédonie, et quand ?','James Cook, en septembre 1774.'],['Que se passe-t-il le 24 septembre 1853 ?','La France prend possession de la Grande Terre, à Balade.']],
 wiki:['James Cook','Histoire de la Nouvelle-Calédonie']}
];
CH.forEach(function(c,i){var x=X[i]||{};Object.keys(x).forEach(function(k){c[k]=x[k];});});

var SPK={7:{sp:'kanak'},8:{sp:'polynesien',sps:{3:'goelette',4:'goelette'}},9:{sp:'goelette',sps:{0:'endeavour',3:'troismats'}}};
CH.forEach(function(c,i){var x=SPK[i]||{sp:'balancier'};if(x.sp)c.sp=x.sp;if(x.sps)c.sps=x.sps;});
A.add({id:'pacifique',title:'Vers le Pacifique et la Nouvelle-Calédonie',tag:'10 chapitres · de l’Afrique à Balade',col:'lap',proj:'globe',
 sub:'De l’Afrique à la Nouvelle-Calédonie : 10 chapitres, avec de vraies photos et documents.',
 frise:{from:-300000,to:1864,ref:2100,ticks:[[-300000,'300 000 ans'],[-70000,'70 000 ans'],[-10000,'10 000 ans',1],[-3000,'3000 av. J.-C.'],[-1100,'1100 av. J.-C.',1],[1,'an 1',1],[1000,'an 1000'],[1774,'1774']]},
 info:'<p><b>Cycle 3, programmes adaptés à la Nouvelle-Calédonie</b> : traces d’une occupation humaine ancienne, peuplement austronésien, civilisation kanak, premiers contacts (explorateurs, santaliers, missionnaires), prise de possession.</p><p><b>Collège, 6e</b> : thème 1 d’histoire, « La longue histoire de l’humanité et des migrations ».</p><p><b>En classe</b> : coche « Pause à chaque étape » pour commenter chaque phase ; décoche « Noms des lieux » pour interroger sur une carte muette ; le jeu « où est… ? » réutilise les lieux du chapitre.</p>',
 chapters:CH});
})();
