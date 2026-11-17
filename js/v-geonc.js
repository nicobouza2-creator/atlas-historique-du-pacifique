/* Atlas historique du Pacifique · Atlas d’histoire — Collège — © 2026 Nicolas BOUZA. Idée, conception et réalisation : Nicolas BOUZA,
   avec l’assistance de Claude (Anthropic). Licence CC BY-NC-ND 4.0. https://github.com/nicobouza2-creator/atlas-historique-du-pacifique */
/* Volet 5 — Géographie de la Nouvelle-Calédonie (globe, fort zoom) : situer, climat, population, habiter, réseaux, produire, la mer.
   Symboles de carte : mark 'mine', 'usine', 'port', 'aero', 'barrage', 'ville' ; légende [col, texte, symbole]. */
(function(){
'use strict';
var A=window.ATLAS,r=A.r,L=A.L,Pu=A.Pu,Ph=A.Ph,Sh=A.Sh,Lz=A.Lz,Rg=A.Rg;
function cam(t,lon,lat,z){return {t:t,lon:lon,lat:lat,z:z};}
function nc(t){return cam(t,165.85,-21.2,23);}

/* contours schématiques ; provinces Nord et Sud : vraie limite (Natural Earth 10 m) prolongée en mer */
var GT=[[163.3,-19.3],[164.6,-19.7],[165.6,-20.45],[166.9,-21.6],[167.25,-22.3],[167.9,-22.5],[167.8,-23],[166.2,-22.9],[164.9,-21.9],[163.4,-20.6]];
var LOY=[[166.55,-20.6,0.45],[167.25,-20.95,0.5],[167.82,-21.12,0.15],[167.95,-21.5,0.45]];
var CHAINE=window.NCG.chaine;
/* massif du Sud (péridotites) et massifs de la côte Ouest (klippes) : tracé à grands traits */
/* massifs de péridotites : contours officiels (Géorep, géologie au 1/1 000 000), le massif du Sud d’abord, puis les autres du nord au sud */
var NCG=window.NCG;
function massifs(t0,a,col){return NCG.massifs.map(function(m,i){return Rg(m[2],col||'pol',i?t0+0.4+(i-1)*0.15:t0,a,i?1.5:2);});}
var PROV=NCG.provinces;
/* tribus : les 272 tribus localisées par le gouvernement (Géorep), chacune dessinée par un petit carré d’environ 2 km */
var TRIBUS=NCG.tribus.map(function(t){var d=0.009;return [[t[0]-d,t[1]-d],[t[0]+d,t[1]-d],[t[0]+d,t[1]+d],[t[0]-d,t[1]+d]];});
/* lieux */
var P={noumea:[166.44,-22.27],pouembout:[164.9,-21.13],kone:[164.86,-21.06],voh:[164.7,-20.96],vavouto:[164.683,-21.014],koniambo:[164.793,-20.975],
  thio:[166.19,-21.62],thiom:[166.23,-21.6],kouaoua:[165.79,-21.44],kouaouam:[165.84,-21.4],nakety:[166.106,-21.54],poro:[165.7,-21.31],nepoui:[165.0,-21.33],kopeto:[165.01,-21.17],
  tiebaghi:[164.211,-20.465],poum:[164.04,-20.25],ouaco:[164.5,-20.76],goro:[166.93,-22.34],prony:[166.84,-22.33],yate:[166.88,-22.15],doniambo:[166.43,-22.25]};
function at(k,t,text,o){var p=P[k];return L(t,p[0],p[1],text,o);}

[['bourail',165.5,-21.57],['lafoa',165.83,-21.71],['koumac',164.29,-20.56],['hienghene',164.94,-20.69],['poindimie',165.33,-20.94],['we',167.26,-20.92],['tadine',167.88,-21.55],['fayaoue',166.545,-20.65],['kuto',167.43,-22.66],
 ['tontouta',166.21,-22.01],['dumbea',166.45,-22.16],['paita',166.37,-22.13],['montdore',166.58,-22.27],['canala',165.96,-21.52],['poya',165.15,-21.35],['tiwaka',165.25,-20.79]].forEach(function(d){P[d[0]]=[d[1],d[2]];});
var OUESTPL=[[164.226,-20.532],[164.318,-20.41],[164.38,-20.452],[164.42,-20.489],[164.456,-20.553],[164.547,-20.643],[164.573,-20.721],[164.616,-20.75],[164.657,-20.746],[164.713,-20.757],[164.761,-20.788],[164.84,-20.901],[164.921,-20.933],[164.962,-20.975],[165.007,-21.053],[165.023,-21.15],[165.126,-21.208],[165.192,-21.216],[165.24,-21.244],[165.276,-21.287],[165.299,-21.36],[165.369,-21.403],[165.405,-21.455],[165.511,-21.467],[165.575,-21.505],[165.625,-21.559],[165.735,-21.563],[165.794,-21.579],[165.827,-21.603],[165.941,-21.724],[166.002,-21.753],[166.093,-21.751],[166.15,-21.776],[166.224,-21.828],[166.268,-21.872],[166.304,-21.932],[166.315,-21.986],[166.337,-21.991],[166.219,-22.143],[166.218,-22.125],[166.17,-22.104],[166.161,-22.085],[166.127,-22.1],[166.115,-22.089],[166.123,-22.073],[166.112,-22.062],[166.125,-22.058],[166.145,-22.07],[166.156,-22.061],[166.151,-22.044],[166.115,-22.032],[166.117,-22.025],[166.138,-22.034],[166.148,-22.025],[166.137,-21.981],[166.142,-21.966],[166.119,-21.946],[166.072,-21.946],[166.071,-21.919],[166.058,-21.9],[166.034,-21.906],[166.035,-21.94],[166.018,-21.943],[166.0,-21.966],[165.973,-21.93],[165.932,-21.918],[165.935,-21.901],[165.906,-21.87],[165.86,-21.86],[165.82,-21.873],[165.808,-21.857],[165.82,-21.825],[165.806,-21.81],[165.782,-21.816],[165.77,-21.809],[165.752,-21.782],[165.762,-21.765],[165.749,-21.755],[165.721,-21.744],[165.7,-21.761],[165.674,-21.744],[165.667,-21.72],[165.627,-21.735],[165.602,-21.713],[165.584,-21.716],[165.531,-21.699],[165.469,-21.65],[165.453,-21.612],[165.417,-21.618],[165.282,-21.57],[165.262,-21.55],[165.257,-21.516],[165.232,-21.515],[165.227,-21.503],[165.168,-21.479],[165.148,-21.461],[165.135,-21.43],[165.112,-21.405],[165.124,-21.389],[165.114,-21.371],[165.096,-21.371],[165.083,-21.39],[165.058,-21.381],[165.04,-21.393],[165.03,-21.381],[165.051,-21.361],[165.043,-21.345],[165.026,-21.339],[165.015,-21.346],[164.987,-21.335],[164.97,-21.352],[164.948,-21.357],[164.936,-21.341],[164.944,-21.294],[164.909,-21.279],[164.894,-21.245],[164.867,-21.228],[164.859,-21.205],[164.829,-21.174],[164.832,-21.153],[164.854,-21.139],[164.858,-21.124],[164.849,-21.112],[164.832,-21.115],[164.824,-21.101],[164.802,-21.107],[164.8,-21.094],[164.828,-21.09],[164.824,-21.06],[164.789,-21.057],[164.767,-21.086],[164.751,-21.076],[164.745,-21.052],[164.719,-21.062],[164.692,-21.042],[164.69,-21.025],[164.671,-21.013],[164.653,-20.981],[164.648,-20.968],[164.666,-20.961],[164.668,-20.928],[164.65,-20.924],[164.64,-20.936],[164.58,-20.924],[164.57,-20.897],[164.525,-20.892],[164.504,-20.861],[164.461,-20.848],[164.456,-20.828],[164.432,-20.814],[164.412,-20.781],[164.374,-20.765],[164.371,-20.753],[164.392,-20.76],[164.411,-20.753],[164.416,-20.727],[164.366,-20.695],[164.319,-20.633],[164.298,-20.579],[164.275,-20.583]];   /* plaines de la côte Ouest : bande d’environ 16 km le long de la côte, de Koumac à Tontouta (schéma) */
function air(col,t0,t1,to){return r(col,t0,t1,2.2,[[166.21,-22.01],to],{step:0.8});}

var CH=[

/* 1 --------------------------------------------------------------- */
{short:'Situer et décrire la Grande Terre',col:'kan',dur:56,dates:'aujourd’hui',
 cam:[cam(0,162,-24,3.2),nc(8),nc(24),cam(31,164.85,-21.05,61),cam(41,164.85,-21.05,61),nc(48),nc(56)],
 zones:[Rg(GT,'kan',2,0.35,2),Lz(LOY,'kan',4,0.3,2)],
 routes:[
  r('ere',13,19,5,CHAINE,{}),
  r('mis',25,29,2.2,[[169.3,-20.2],[167.9,-20.75]],{straight:true,dash:true}),
  r('mis',25.5,29.5,2.2,[[169.6,-21.3],[168.4,-21.75]],{straight:true,dash:true}),
  r('mis',26,30,2.2,[[169.4,-22.5],[167.95,-22.1]],{straight:true,dash:true})
 ],
 labels:[
  L(2,165.9,-21.25,'Nouvelle-Calédonie',{nomark:true,gold:true,big:true,dy:-30,zmax:8}),
  L(2,145,-25,'Australie',{nomark:true,zmax:8}),L(2,173,-40.5,'Nouvelle-Zélande',{nomark:true,zmax:8}),
  L(2,168,-15.6,'Vanuatu',{nomark:true,zmax:8}),L(2,178.2,-17.6,'Fidji',{nomark:true,zmax:8}),
  L(3,156,-21.5,'mer de Corail',{nomark:true,zmax:8}),
  L(9,164.5,-21.75,'Grande Terre',{nomark:true,big:true,al:'right',zmin:12,zmax:50}),
  L(10,167.6,-20.75,'Îles Loyauté',{nomark:true,dx:14,al:'left',zmin:12}),
  L(10,167.47,-22.62,'Île des Pins',{dy:15,zmin:12}),
  at('noumea',11,'Nouméa',{mark:'ville',dx:-10,dy:6,al:'right',zmin:12}),
  at('pouembout',12,'Pouembout',{mark:'star',dx:-10,dy:10,al:'right',zmin:12}),
  L(16,164.77,-20.58,'Mont Panié',{sub:'1 629 m',dx:10,dy:-6,al:'left',zmin:12}),
  L(17,166.42,-21.88,'Mont Humboldt',{sub:'1 618 m',dx:-10,dy:-8,al:'right',zmin:12}),
  L(19,165.6,-21.28,'Chaîne centrale',{nomark:true,dy:-16,zmin:12,end:31}),
  L(23,164.25,-21.15,'Côte Ouest',{nomark:true,sub:'plaines, savanes',al:'right',zmin:12,zmax:30}),
  L(23,166.55,-20.85,'Côte Est',{nomark:true,sub:'vallées, forêts',al:'left',zmin:12,zmax:30}),
  L(27,169.2,-21.75,'Alizés',{nomark:true,sub:'vents d’est, humides',zmin:12,zmax:30}),
  at('kone',33,'Koné',{mark:'ville',dx:10,al:'left',zmin:26}),
  at('voh',33.5,'Voh',{mark:'ville',dx:-10,al:'right',zmin:26}),
  at('koniambo',35,'Massif du Koniambo',{nomark:true,dy:-14,zmin:26,gold:true}),
  L(36,164.6,-21.25,'Lagon',{nomark:true,zmin:26}),
  L(36.5,164.42,-21.3,'Récif barrière',{nomark:true,dy:16,zmin:26})
 ],
 pulses:[Pu(12,164.9,-21.13,'#ffd166',true)],
 ph:[
  Ph(0,'Où sommes-nous ?','La Nouvelle-Calédonie est un archipel du Pacifique Sud, en mer de Corail, à environ 1 200 km à l’est de l’Australie. Elle est juste au nord du tropique du Capricorne.','kan'),
  Ph(9,'La Grande Terre','L’île principale mesure environ 400 km de long et 50 km de large. Un lagon et un récif barrière l’entourent. Au nord-est : les îles Loyauté ; au sud : l’île des Pins.','xet'),
  Ph(14,'Une chaîne de montagnes','Une chaîne de montagnes traverse l’île du nord-ouest au sud-est. Les plus hauts sommets sont le mont Panié (1 629 m), au nord, et le mont Humboldt (1 618 m), au sud.','ere'),
  Ph(22,'Deux côtes différentes','Les alizés, des vents venus de l’est, apportent la pluie sur la côte Est : vallées étroites et forêts. La côte Ouest, plus sèche, a de larges plaines et des savanes.','mis'),
  Ph(31,'Chez nous, sur la côte Ouest','Pouembout, Koné et Voh sont dans une plaine de la côte Ouest, entre le lagon et la chaîne. Juste au-dessus se dresse le massif du Koniambo, une montagne riche en nickel.','kan'),
  Ph(45,'Lire la carte','Repère le nord, le sud, l’est et l’ouest. Nouméa est au sud-est de Pouembout. Le mont Panié est au nord-est de Pouembout.','eur')
 ],
 photos:[Sh('satnc',1,8,'tr',2),Sh('humboldt',14,21,'tr',2),Sh('coupe',22,31,'bl',-2,'contain'),Sh('savane',32,40,'tr',2),Sh('hienghene',41,48,'bl',-2)],
 legend:[['kan','Grande Terre et îles'],['ere','Chaîne centrale'],['mis','Alizés (vents d’est)',1],['eur','Ville','ville']],
 mots:[['Archipel','Groupe d’îles proches les unes des autres.'],['Relief','Les formes du terrain : montagnes, plaines, vallées.'],['Lagon','Étendue d’eau de mer peu profonde entre la côte et le récif.'],['Alizés','Vents réguliers qui soufflent de l’est, dans la zone tropicale.']],
 q:[['Comment s’appelle l’île principale ?','La Grande Terre.'],['Quels sont les deux plus hauts sommets ?','Le mont Panié (1 629 m) et le mont Humboldt (1 618 m).'],['Quelle côte reçoit le plus de pluie, et pourquoi ?','La côte Est, parce que les alizés venus de l’est apportent les nuages.'],['Dans quelle direction se trouve Nouméa quand on est à Pouembout ?','Au sud-est.']],
 wiki:['Grande Terre (Nouvelle-Calédonie)','Géographie de la Nouvelle-Calédonie','Mont Panié','Alizé']},


/* 2 --------------------------------------------------------------- */
{short:'Climat et risques naturels',col:'mis',dur:54,dates:'aujourd’hui',
 cam:[cam(0,170,-20,2.4),cam(12,170,-20,2.4),nc(16),nc(54)],
 zones:[Rg(GT,'kan',-5,0.3,0.01),Lz(LOY,'kan',-5,0.3,0.01)],
 routes:[
  r('kan',1,4,1.6,[[150,-23.44],[185,-23.44]],{straight:true,dash:true,step:1}),
  r('ame',3,12,3.4,[[171,-12],[169.5,-15.5],[167.6,-18.6],[166.4,-21.2],[165.7,-23.6],[166.5,-27.5]],{dash:true}),
  r('mis',17,21,2.2,[[169.3,-20.2],[167.9,-20.75]],{straight:true,dash:true}),r('mis',17.5,21.5,2.2,[[169.6,-21.3],[168.4,-21.75]],{straight:true,dash:true})
 ],
 labels:[
  L(1,178,-23.9,'Tropique du Capricorne',{nomark:true,al:'right',zmax:8}),
  L(2,168,-15.6,'Vanuatu',{nomark:true,zmax:8}),L(2,178.2,-17.6,'Fidji',{nomark:true,zmax:8}),
  L(5,170.8,-14.2,'Trajectoire d’un cyclone (exemple)',{nomark:true,dx:12,al:'left',zmax:8}),
  L(18,168.9,-21.75,'Alizés',{nomark:true,zmin:12}),
  L(22,166.55,-20.85,'Côte Est : la plus arrosée',{nomark:true,al:'left',zmin:12}),
  L(22.5,164.25,-21.15,'Côte Ouest : plus sèche',{nomark:true,al:'right',zmin:12}),
  at('noumea',23,'Nouméa',{mark:'ville',dx:-10,al:'right',zmin:12}),
  at('pouembout',23,'Pouembout',{mark:'star',dx:-10,dy:10,al:'right',zmin:12})
 ],
 pulses:[Pu(14,166.4,-21.2,'#fb7185',false)],
 ph:[
  Ph(0,'Un climat tropical','La Nouvelle-Calédonie est juste au nord du tropique du Capricorne. Il fait doux toute l’année, avec deux grandes saisons.','kan'),
  Ph(6,'Deux saisons','De novembre à avril, la saison chaude et humide apporte de fortes pluies : c’est aussi la saison des cyclones. De mai à septembre, c’est la saison fraîche ; elle se termine par des semaines très sèches, jusqu’en octobre.','mis'),
  Ph(12,'Les cyclones','Des cyclones peuvent arriver du nord : vents très violents, pluies énormes, inondations, coupures de routes. En mars 2021, le cyclone Niran a frappé le pays.','ame'),
  Ph(24,'Sécheresse et feux','En saison sèche, des feux de brousse brûlent chaque année forêts et savanes, le plus souvent à cause des humains. Ils abîment la biodiversité et les sols.','pol'),
  Ph(34,'D’autres risques','Tsunamis après un séisme au Vanuatu, glissements de terrain, inondations : on apprend les bons gestes. La montée de la mer menace aussi les côtes basses et les îlots.','mis'),
  Ph(44,'Se protéger','Prévoir, alerter, construire solidement, protéger les forêts : on se met moins en danger : on réduit la vulnérabilité. À l’école aussi, on s’entraîne.','eur')
 ],
 photos:[Sh('cyclonesat',4,11,'tr',2),Sh('niran',12,16,'tr',2),Sh('nirantrace',16.5,20,'tr',-2),Sh('niranapres',20.5,23.5,'tr',2),Sh('wildfirepins',24,32,'tr',2),Sh('tsunamipanneau',34,42,'bl',-2)],
 legend:[['ame','Trajectoire d’un cyclone (exemple)',1],['mis','Alizés',1],['kan','Tropique du Capricorne',1]],
 mots:[['Climat tropical','Climat chaud toute l’année, avec une saison des pluies.'],['Cyclone','Énorme tempête tropicale avec des vents de plus de 118 km/h.'],['Risque','Danger qui peut toucher des habitants et leurs biens.'],['Vulnérabilité','Fragilité d’un lieu ou d’une population face à un danger.']],
 q:[['Quelles sont les deux grandes saisons ?','La saison chaude et humide (novembre-avril) et la saison fraîche (mai-septembre), suivie de semaines très sèches jusqu’en octobre.'],['Pendant quelle saison arrivent les cyclones ?','Pendant la saison chaude.'],['Pourquoi les feux sont-ils dangereux pour la nature ?','Ils détruisent forêts, animaux et sols.'],['Que faire pour réduire un risque ?','Prévoir, alerter, construire solidement, protéger la nature, connaître les bons gestes.']],
 wiki:['Climat de la Nouvelle-Calédonie','Cyclone tropical','Cyclone Niran','Tsunami']},

/* 3 --------------------------------------------------------------- */
{short:'Où vivent les Calédoniens ?',col:'dense',dur:56,when:[2019,2025],dates:'recensement de 2025',
 cam:[nc(0),nc(16),cam(19,166.45,-22.2,86),cam(28,166.45,-22.2,86),nc(32),nc(56)],
 zones:[Rg(PROV.sud,'mis',8,0.32,2),Rg(PROV.nord,'afr',9,0.32,2),Rg(PROV.iles,'xet',10,0.4,2),Rg(NCG.grandnoumea,'dense',18,0.7,2)],
 routes:[],
 labels:[
  L(8,166.45,-21.95,'Province Sud',{nomark:true,sub:'194 978 hab.',big:true,zmax:30}),
  L(9,164.95,-20.7,'Province Nord',{nomark:true,sub:'50 947 hab.',big:true,zmax:30}),
  L(10,167.7,-20.55,'Province des îles Loyauté',{nomark:true,sub:'18 671 hab.',dx:10,al:'left',zmax:30}),
  L(19,166.6,-22.05,'Grand Nouméa',{nomark:true,gold:true,big:true,sub:'173 814 hab.',zmin:30}),
  at('noumea',20,'Nouméa',{mark:'ville',sub:'85 976 hab.',dx:-10,dy:8,al:'right',zmin:30}),
  at('dumbea',21,'Dumbéa',{mark:'ville',dx:-10,al:'right',zmin:30}),at('paita',21.5,'Païta',{mark:'ville',dx:-10,al:'right',zmin:30}),at('montdore',22,'Mont-Dore',{mark:'ville',dx:10,al:'left',zmin:30}),
  at('kone',33,'Koné',{mark:'ville',dx:10,al:'left',zmin:12}),at('bourail',33.5,'Bourail',{mark:'ville',dx:-10,al:'right',zmin:12}),
  at('koumac',34,'Koumac',{mark:'ville',dx:-10,al:'right',zmin:12}),at('we',34.5,'Wé (Lifou)',{mark:'ville',dx:10,al:'left',zmin:12}),
  at('pouembout',35,'Pouembout',{mark:'star',dx:-10,dy:10,al:'right',zmin:12})
 ],
 pulses:[Pu(19,166.45,-22.24,'#ff5d5d',true)],
 ph:[
  Ph(0,'264 596 habitants','Au recensement de 2025, le pays compte 264 596 habitants pour 18 575 km² : en moyenne 14 habitants par km². C’est peu, et la population est très mal répartie.','kan'),
  Ph(8,'Trois provinces très inégales','La province Sud compte 194 978 habitants, la province Nord 50 947 et la province des îles Loyauté 18 671.','mis'),
  Ph(18,'Le Grand Nouméa','Nouméa, Dumbéa, Mont-Dore et Païta forment le Grand Nouméa : 173 814 habitants, environ deux Calédoniens sur trois, sur une petite partie du territoire.','dense'),
  Ph(30,'Littoral et brousse','Les habitants vivent surtout près des côtes ; l’intérieur montagneux est presque vide. En dehors du Grand Nouméa, on parle de « la brousse ».','ere'),
  Ph(39,'Partir vers le Sud ?','Pendant des décennies, beaucoup de jeunes ont quitté tribus et villages pour travailler à Nouméa : c’est l’exode rural. Entre 2019 et 2025, la province Sud est la seule à avoir perdu des habitants.','afr'),
  Ph(48,'Calculer une densité','Densité = habitants ÷ surface. Province Sud : environ 28 habitants par km² ; province Nord : environ 5 ; îles Loyauté : environ 9.','eur')
 ],
 photos:[Sh('noumea',18,27,'tr',2),Sh('dumbea',27,32,'bl',-2),Sh('paita',32,38,'tr',2)],
 legend:[['mis','Province Sud'],['afr','Province Nord'],['xet','Province des îles Loyauté'],['dense','Grand Nouméa'],['eur','Ville','ville']],
 mots:[['Recensement','Comptage officiel de tous les habitants.'],['Densité','Nombre moyen d’habitants par km².'],['Agglomération','Ville et communes voisines qui forment un seul ensemble urbain.'],['Exode rural','Départ des habitants des campagnes vers la ville.']],
 q:[['Combien d’habitants compte le pays en 2025 ?','264 596.'],['Quelle province est la plus peuplée ?','La province Sud (194 978 habitants).'],['Quelle part des habitants vit dans le Grand Nouméa ?','Environ deux sur trois.'],['Comment calcule-t-on une densité ?','On divise le nombre d’habitants par la surface en km².']],
 wiki:['Démographie de la Nouvelle-Calédonie','Grand Nouméa','Exode rural','Densité de population']},

/* 4 --------------------------------------------------------------- */
{short:'Habiter : ville, brousse, tribu, îles',col:'kan',dur:58,dates:'aujourd’hui',
 cam:[cam(0,166.45,-22.22,99),cam(12,166.45,-22.22,99),cam(15,165.6,-21.62,72),cam(25,165.6,-21.62,72),cam(28,164.95,-20.75,81),cam(37,164.95,-20.75,81),cam(40,167.5,-21.1,54),cam(50,167.5,-21.1,54),nc(58)],
 zones:[Rg(GT,'kan',-5,0.3,0.01),Lz(LOY,'kan',-5,0.3,0.01),Rg(NCG.grandnoumea,'dense',1,0.6,2),Rg(OUESTPL,'neo',15,0.35,2),Rg(TRIBUS,'pap',28,0.95,1.5)],
 routes:[],
 labels:[
  at('noumea',1,'Nouméa',{mark:'ville',dx:-10,dy:8,al:'right',zmin:40}),at('dumbea',2,'Dumbéa',{mark:'ville',dx:-10,al:'right',zmin:40}),
  at('paita',2.5,'Païta',{mark:'ville',dx:-10,al:'right',zmin:40}),at('montdore',3,'Mont-Dore',{mark:'ville',dx:10,al:'left',zmin:40}),
  at('bourail',16,'Bourail',{mark:'ville',dx:-10,al:'right',zmin:30}),at('lafoa',17,'La Foa',{mark:'ville',dx:10,al:'left',zmin:30}),
  L(18,165.25,-21.4,'stations d’élevage',{nomark:true,zmin:30}),
  at('hienghene',29,'Hienghène',{mark:'ville',dx:10,al:'left',zmin:30}),
  at('we',41,'Wé (Lifou)',{mark:'ville',dx:10,al:'left',zmin:24}),at('tadine',42,'Tadine (Maré)',{mark:'ville',dx:10,al:'left',zmin:24}),at('fayaoue',42.5,'Fayaoué (Ouvéa)',{mark:'ville',dx:-10,al:'right',zmin:24}),
  at('pouembout',52,'Pouembout',{mark:'star',dx:-10,dy:10,al:'right',zmin:12})
 ],
 pulses:[],
 ph:[
  Ph(0,'Habiter la ville','À Nouméa : immeubles, embouteillages, centres commerciaux, port, université, hôpital. L’agglomération s’étale vers Dumbéa, Païta et le Mont-Dore, où se construisent de nouveaux quartiers.','dense'),
  Ph(15,'Habiter un village de brousse','Bourail, La Foa, Koumac : un bourg avec la mairie, l’école, quelques commerces, entouré de stations d’élevage et de champs. On fait souvent des kilomètres pour travailler ou aller au lycée.','ere'),
  Ph(28,'Habiter en tribu','La tribu regroupe des familles autour de la chefferie et de la grande case. On cultive le champ d’ignames, on pêche, on suit la coutume ; beaucoup partent aussi travailler ailleurs, pour la journée ou la semaine.','kan'),
  Ph(40,'Habiter une île','À Lifou, Maré ou Ouvéa, presque tout arrive par bateau ou par avion : marchandises, carburant, courrier. On y vit surtout en tribu ; le tourisme, la pêche, la vanille ou le coprah apportent des revenus.','xet'),
  Ph(50,'Et toi ?','Ville, village ou tribu, côte Est ou côte Ouest, île ou Grande Terre : chaque lieu a ses avantages et ses difficultés (distances, services, emplois, nature).','eur')
 ],
 photos:[Sh('noumeaport',1,12,'tr',2),Sh('bourail',15,25,'tr',2),Sh('poule',28,37,'tr',2),Sh('caseslifou',40,50,'tr',2)],
 legend:[['dense','Grand Nouméa (4 communes)'],['neo','Plaines d’élevage de la côte Ouest'],['pap','Tribu'],['eur','Ville ou village','ville']],
 mots:[['Habiter','Vivre dans un lieu : s’y loger, y travailler, s’y déplacer, s’y divertir.'],['Bourg','Gros village avec des services (mairie, école, commerces).'],['Tribu','Lieu de vie kanak organisé autour d’une chefferie.'],['Services','Écoles, hôpitaux, commerces, administrations utiles aux habitants.']],
 q:[['Citer un avantage et un inconvénient de la vie en ville.','Par exemple : beaucoup de services / des embouteillages.'],['Qu’y a-t-il dans un bourg de brousse ?','Une mairie, une école, quelques commerces.'],['Comment les marchandises arrivent-elles aux îles Loyauté ?','Par bateau ou par avion.'],['Où habites-tu, et quels services trouves-tu près de chez toi ?','Réponse personnelle.']],
 wiki:['Nouméa','Bourail','Tribu kanak','Lifou']},

/* 5 --------------------------------------------------------------- */
{short:'Se déplacer, être relié au monde',col:'fra',dur:60,dates:'aujourd’hui',
 cam:[nc(0),nc(14),cam(18,155,-12,1.05),cam(44,155,-12,1.05),nc(52),nc(60)],
 zones:[Rg(GT,'kan',-5,0.3,0.01),Lz(LOY,'kan',-5,0.3,0.01)],
 routes:[
  r('ere',2,8,3,NCG.rt1,{}),   /* RT1 : tracé officiel (Géorep), de Nouméa à Koumac */
  r('ere',6,9,2.4,[[164.86,-21.06],[165.02,-20.95],[165.18,-20.84],[165.25,-20.79]],{}),
  r('mis',10,14,2.4,[[166.45,-22.3],[167.0,-21.9],[167.85,-21.55]],{dash:true}),r('mis',10.5,14.5,2.4,[[166.45,-22.3],[166.9,-21.6],[167.2,-21.0]],{dash:true}),
  air('fra',19,24,[151.2,-33.9]),air('fra',19.5,24.5,[153.0,-27.4]),air('fra',20,25,[174.8,-37.0]),air('fra',20.5,25.5,[177.4,-17.75]),
  air('fra',21,26,[168.3,-17.7]),air('fra',21.5,26.5,[183.8,-13.3]),air('fra',22,27,[210.4,-17.55]),air('fra',23,29,[103.8,1.35]),air('fra',23.5,29.5,[100.75,13.69]),
  r('lap',32,37,2.4,[[166.43,-22.32],[160,-27.5],[151.25,-33.85]],{dash:true,sea:true}),r('lap',33,38,2.4,[[166.47,-22.32],[172,-20.3],[178.44,-18.14]],{dash:true,sea:true})
 ],
 labels:[
  L(4,164.8,-21.5,'RT1',{nomark:true,gold:true,zmin:12,zmax:30}),
  L(7,165.15,-20.7,'Koné–Tiwaka',{nomark:true,dx:8,al:'left',zmin:12,zmax:30}),
  at('noumea',10,'Port de Nouméa',{mark:'port',dx:-10,dy:8,al:'right',zmin:12,zmax:30}),
  at('tontouta',11,'La Tontouta',{mark:'aero',dx:-10,dy:-8,al:'right',zmin:12,zmax:30}),
  at('we',12,'Lifou',{mark:'aero',dx:10,al:'left',zmin:12,zmax:30}),
  L(20,151.2,-33.9,'Sydney',{dx:-8,al:'right',zmax:6}),L(20,153.0,-27.4,'Brisbane',{dx:-8,al:'right',zmax:6}),L(21,174.8,-37.0,'Auckland',{dx:8,al:'left',zmax:6}),
  L(21,177.4,-17.75,'Nadi (Fidji)',{dx:8,al:'left',zmax:6}),L(22,168.3,-17.7,'Port-Vila',{dy:-12,zmax:6}),L(22,183.8,-13.3,'Wallis',{dx:8,al:'left',zmax:6}),
  L(23,210.4,-17.55,'Papeete',{dx:8,al:'left',zmax:6}),L(25,103.8,1.35,'Singapour',{dx:-8,al:'right',zmax:6}),L(25.5,100.75,13.69,'Bangkok → Paris',{dx:-8,al:'right',zmax:6}),
  L(34,158,-29,'Gondwana-1 (2008)',{nomark:true,zmax:6}),L(35,173,-21.8,'Gondwana-2 (2022)',{nomark:true,zmax:6})
 ],
 pulses:[],
 ph:[
  Ph(0,'Un pays d’îles','Pour aller d’un point à un autre, il faut souvent franchir la mer ou la montagne. Être loin et dépendre des transports, c’est l’insularité.','mis'),
  Ph(3,'Les routes','La RT1 longe la côte Ouest, de Nouméa jusqu’au nord. Des routes transversales, comme Koné – Tiwaka, traversent la chaîne vers la côte Est.','ere'),
  Ph(10,'Vers les îles','Les îles Loyauté et l’île des Pins sont reliées par avion et par bateau. Presque toutes les marchandises du pays arrivent par le port de Nouméa.','mis'),
  Ph(18,'Vers le monde','L’aéroport de La Tontouta relie le pays à l’Australie, à la Nouvelle-Zélande, au Pacifique (Fidji, Vanuatu, Wallis, Tahiti) et à l’Asie. Pour aller à Paris, Aircalin passe par Bangkok ; on peut aussi changer d’avion à Singapour.','fra'),
  Ph(32,'Les câbles sous la mer','Internet arrive par des câbles de fibre optique posés au fond de l’océan : Gondwana-1 vers Sydney (2008), puis Gondwana-2 vers Fidji (2022), pour ne pas être coupé du monde si un câble casse.','lap'),
  Ph(46,'Loin, mais connecté','Sydney est à environ 3 heures d’avion, Paris à plus de 20 heures. Les transports coûtent cher : beaucoup de produits importés sont chers.','eur')
 ],
 photos:[Sh('rt1',2,9,'tr',2),Sh('noumeaport',10,17,'tr',2),Sh('tontouta',19,28,'bl',-2),Sh('cablesous',32,40,'tr',2,'contain')],
 legend:[['ere','Routes'],['mis','Liaisons vers les îles',1],['fra','Lignes aériennes internationales'],['lap','Câbles internet sous-marins',1],['mis','Aéroport','aero'],['mis','Port','port']],
 mots:[['Insularité','Situation d’un territoire entouré par la mer, qui dépend des transports.'],['Réseau','Ensemble de routes, de lignes ou de câbles reliés entre eux.'],['Câble sous-marin','Câble posé au fond de la mer qui transporte internet et le téléphone.']],
 q:[['Quelle route longe la côte Ouest ?','La RT1.'],['Par où arrivent presque toutes les marchandises ?','Par le port de Nouméa.'],['Comment internet arrive-t-il en Nouvelle-Calédonie ?','Par deux câbles sous-marins : Gondwana-1 (Sydney) et Gondwana-2 (Fidji).'],['Citer trois destinations desservies depuis La Tontouta.','Par exemple Sydney, Auckland, Nadi, Port-Vila, Wallis, Papeete, Singapour.']],
 wiki:['Aéroport international de Nouméa-La Tontouta','Aircalin','Port autonome de la Nouvelle-Calédonie','Câble sous-marin']},

/* 6 --------------------------------------------------------------- */
{short:'Produire en Nouvelle-Calédonie',col:'neo',dur:58,dates:'aujourd’hui',
 cam:[nc(0),nc(58)],
 zones:[Rg(GT,'kan',-5,0.3,0.01),Lz(LOY,'kan',-5,0.3,0.01),Rg(OUESTPL,'neo',8,0.45,2)].concat(massifs(2,0.5)),
 routes:[r('mis',40,46,2.6,[[160,-30],[164,-25.5],[166.4,-22.4]],{dash:true,sea:true}),r('mis',40.5,46.5,2.6,[[150,-14],[160,-17.5],[166.3,-22.2]],{dash:true,sea:true})],
 labels:[
  L(3,166.7,-21.95,'mines de nickel',{nomark:true,dx:8,al:'left'}),
  L(9,164.9,-21.45,'élevage, cultures',{nomark:true,sub:'plaines de l’Ouest',al:'right',dx:-6}),
  L(19,164.6,-21.75,'fermes de crevettes',{nomark:true,al:'right'}),
  L(20,163.2,-22.6,'pêche au thon au large',{nomark:true,al:'right'}),
  at('noumea',29,'Nouméa',{mark:'port',sub:'croisières',dx:-10,dy:8,al:'right'}),
  at('kuto',30,'Île des Pins',{mark:'port',dx:10,dy:6,al:'left'}),
  at('we',30.5,'Lifou',{mark:'port',sub:'vanille',dx:10,al:'left'}),
  at('fayaoue',31,'Ouvéa',{mark:'ville',sub:'coprah',dx:-10,al:'right'}),
  L(41,163.5,-25.8,'conteneurs importés',{nomark:true,al:'right',zmin:12})
 ],
 pulses:[],
 ph:[
  Ph(0,'Que produit le pays ?','Le nickel fournit l’essentiel des exportations (voir le volet « Le nickel »). Mais la plupart des Calédoniens travaillent dans d’autres activités : services, commerce, administration, agriculture, pêche, tourisme.','kan'),
  Ph(8,'Élevage et cultures','Sur les plaines de la côte Ouest, on élève des bovins dans de grandes stations. On cultive aussi fruits, légumes, igname, café et vanille.','neo'),
  Ph(18,'La mer nourrit','Des bateaux pêchent le thon au large. Sur la côte Ouest, des fermes élèvent la crevette bleue, vendue en partie au Japon et en France.','mis'),
  Ph(28,'Le tourisme','Des visiteurs viennent surtout d’Australie, de Nouvelle-Zélande et de France. Des paquebots de croisière font escale à Nouméa, à l’île des Pins, à Lifou ou à Maré ; leur nombre dépend de la situation du pays.','xet'),
  Ph(39,'Importer','Le pays importe une grande partie de sa nourriture, son carburant, ses voitures et ses objets. Les conteneurs arrivent au port de Nouméa depuis la France, la Chine, l’Australie, Singapour…','eur'),
  Ph(49,'Produire local','Pour dépendre moins des importations, on encourage l’agriculture locale, la pêche et les énergies renouvelables (soleil, vent, eau).','neo')
 ],
 photos:[Sh('savane',8,17,'tr',2),Sh('crevette',18,27,'tr',2),Sh('noumeaport',28,38,'tr',2),Sh('marche',49,57,'tr',2)],
 legend:[['neo','Élevage et cultures (plaines de l’Ouest)'],['pol','Massifs miniers'],['mis','Importations par la mer',1],['mis','Port, escale de croisière','port']],
 mots:[['Secteur d’activité','Grand domaine de travail : agriculture, industrie, services.'],['Élevage','Activité qui consiste à nourrir et faire grandir des animaux.'],['Aquaculture','Élevage d’animaux aquatiques (crevettes, huîtres, poissons).'],['Importation','Achat de produits venus d’un autre pays.']],
 q:[['Où se trouve l’élevage bovin ?','Sur les plaines de la côte Ouest.'],['Quel animal élève-t-on dans les fermes aquacoles ?','La crevette bleue.'],['Qu’importe surtout le pays ?','Nourriture, carburant, voitures, objets du quotidien.'],['Pourquoi encourager la production locale ?','Pour dépendre moins des importations.']],
 wiki:['Économie de la Nouvelle-Calédonie','Litopenaeus stylirostris','Tourisme en Nouvelle-Calédonie','Énergie en Nouvelle-Calédonie']},

/* 7 --------------------------------------------------------------- */
{short:'Un pays maritime',col:'aus',dur:58,when:[2008,2026],dates:'aujourd’hui',
 cam:[nc(0),cam(6,164.5,-21,5.2),cam(26,164.5,-21,5.2),cam(36,165.6,-21,15),cam(58,165.6,-21,15)],
 /* zones en mer : dessinées sans découpe sur les terres (contours officiels Géorep) */
 zones:[{k:'poly',ring:NCG.zee,col:'aus',a:0.32,t0:7,fade:2.5}].concat(NCG.unesco.map(function(u,i){return {k:'poly',ring:u[1],col:'xet',a:0.7,t0:38+i*0.4,fade:2,nostroke:true};})),
 routes:[],
 labels:[
  L(8,164.5,-24.2,'ZEE de la Nouvelle-Calédonie',{nomark:true,gold:true,big:true,sub:'environ 1,4 million de km²',zmax:12}),
  L(12,148,-20,'Australie',{nomark:true,zmax:12}),L(12,168.3,-15.6,'Vanuatu',{nomark:true,zmax:12}),L(12,160,-9.6,'Salomon',{nomark:true,zmax:12}),L(12,178.2,-17.6,'Fidji',{nomark:true,zmax:12}),
  L(19,158.3,-19.9,'Chesterfield',{dx:8,al:'left',zmax:12}),L(19.5,163.1,-18.4,'Entrecasteaux',{dx:8,al:'left',zmax:12}),
  L(20,171.35,-22.35,'Matthew',{dy:-12,zmax:12}),L(20.5,172.08,-22.4,'Hunter',{dy:14,zmax:12}),
  L(39,163.4,-19.2,'Lagons classés (2008)',{nomark:true,gold:true,al:'right',dx:-10,zmin:12})
 ],
 pulses:[],
 ph:[
  Ph(0,'Bien plus de mer que de terre','Autour de ses îles, la Nouvelle-Calédonie a une zone économique exclusive (ZEE) d’environ 1,4 million de km² : près de 75 fois la surface de ses terres.','aus'),
  Ph(9,'Qu’est-ce qu’une ZEE ?','Jusqu’à 200 milles marins (370 km) des côtes, un pays est seul à pouvoir exploiter les poissons et les ressources du fond de la mer. Les voisins sont l’Australie, les Salomon, le Vanuatu et Fidji.','aus'),
  Ph(18,'Des récifs lointains','Chesterfield, Entrecasteaux, Matthew et Hunter sont de petites îles sans habitants permanents, très riches en vie marine. Matthew et Hunter sont aussi revendiqués par le Vanuatu.','mis'),
  Ph(27,'Le parc naturel de la mer de Corail','Créé en 2014, il couvre toute la ZEE, sauf les eaux des provinces près des côtes : environ 1,3 million de km², l’une des plus grandes aires marines protégées du monde. Depuis 2023, 10 % sont fortement protégés.','xet'),
  Ph(37,'Le lagon','Une grande partie du lagon est inscrite au patrimoine mondial de l’UNESCO depuis 2008. Tortues, dugongs, requins et baleines à bosse y vivent ou y passent.','aus'),
  Ph(48,'Une biodiversité unique','Sur terre aussi : le cagou, un oiseau qui ne vole pas, et des milliers de plantes endémiques. Sur les 19 espèces d’araucarias du monde, 13 ne poussent qu’ici.','neo')
 ],
 photos:[Sh('chesterfield',18,26,'tr',2),Sh('lagonsat',37,44,'tr',2),Sh('dugong',44,48,'bl',-2),Sh('cagou',48,56,'tr',2)],
 legend:[['aus','Zone économique exclusive'],['xet','Lagons inscrits à l’UNESCO (2008)']],
 mots:[['ZEE','Zone économique exclusive : espace marin où un pays exploite seul les ressources.'],['Mille marin','Unité de distance en mer : 1 852 m.'],['Aire marine protégée','Espace de mer où la nature est protégée par des règles.'],['Biodiversité','Diversité des êtres vivants.']],
 q:[['Quelle est la surface de la ZEE ?','Environ 1,4 million de km² (1 386 669 km² selon le gouvernement de la Nouvelle-Calédonie).'],['Jusqu’à quelle distance des côtes s’étend une ZEE ?','200 milles marins, soit environ 370 km.'],['Quand a été créé le parc naturel de la mer de Corail ?','En 2014.'],['Quel oiseau qui ne vole pas est le symbole du pays ?','Le cagou.']],
 wiki:['Parc naturel de la mer de Corail','Zone économique exclusive','Cagou huppé','Îles Chesterfield']}
];

A.add({id:'geonc',title:'Géographie de la NC',tag:'7 chapitres · relief, climat, population, réseaux, mer',col:'xet',proj:'globe',
 sub:'La Nouvelle-Calédonie en 7 cartes : se situer, décrire le relief et le climat, savoir où vivent les habitants et comment ils habitent, se déplacer, produire, gérer un immense espace maritime.',
 frise:null,
 info:'<p><b>Géographie, cycle 3 et collège</b> : se repérer (points cardinaux, échelle), décrire un territoire (relief, climat), répartition de la population et densités, habiter (ville, brousse, tribu, îles), réseaux et insularité, activités économiques, espace maritime et biodiversité.</p><p><b>Collège, programmes adaptés</b> : 6e, thème 3 « Habiter les littoraux » (étude de cas possible en Nouvelle-Calédonie : chapitre 7) ; 5e, thème 3 « Prévenir les risques, s’adapter au changement global » (chapitre 2) ; 3e, thème 2 « Aménager la Nouvelle-Calédonie : vers le rééquilibrage » (chapitres 3 et 5, avec le chapitre 6 du volet nickel ; le programme attend un croquis).</p><p><b>Croquis</b> : l’export PDF en carte muette ou vierge donne un fond de croquis par chapitre.</p><p><b>Sources</b> : recensement 2025 (Isee, décret du 18/09/2025), DITTT (densités), parc naturel de la mer de Corail, OPT (câbles), Aircalin (programme 2026). Contours de la ZEE, des plaines et des lagons classés tracés à grands traits.</p>',
 chapters:CH});
})();
