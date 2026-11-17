/* Volet 4 — Histoire de la Nouvelle-Calédonie (globe, fort zoom). z = 19 montre tout l'archipel. */
(function(){
'use strict';
var A=window.ATLAS,r=A.r,L=A.L,Pu=A.Pu,Ph=A.Ph,Sh=A.Sh,Lz=A.Lz,Rg=A.Rg;
function ext(o,x){Object.keys(x).forEach(function(k){o[k]=x[k];});return o;}
var NC={lon:165.85,lat:-21.2,z:23};
function cam(t,lon,lat,z){return {t:t,lon:lon,lat:lat,z:z};}
function nc(t){return cam(t,NC.lon,NC.lat,NC.z);}

/* contours schématiques */
var GT=[[163.3,-19.3],[164.6,-19.7],[165.6,-20.45],[166.9,-21.6],[167.25,-22.3],[167.9,-22.5],[167.8,-23],[166.2,-22.9],[164.9,-21.9],[163.4,-20.6]];
/* aires coutumières et provinces : contours officiels (Géorep). Les limites des aires sont une donnée de travail, non officialisée. */
var AIRES=window.NCG.aires,PROV=window.NCG.provinces,NCG=window.NCG;
/* zones historiques tracées sur la côte et les communes actuelles (Géorep) : schémas, pas des limites d’époque */
var OUEST=NCG.ouest,R1878=NCG.r1878,R1917=NCG.r1917;
/* réserves vers 1900 : schéma, un petit carré d’environ 2,5 km autour de chaque tribu d’aujourd’hui de la Grande Terre (Géorep) */
var RESERVES=NCG.tribus.filter(function(t){return !((t[0]>166.3&&t[1]>-20.9)||(t[0]>166.9&&t[1]>-21.3)||(t[0]>167.6&&t[1]>-22));}).map(function(t){var d=0.012;return [[t[0]-d,t[1]-d],[t[0]+d,t[1]-d],[t[0]+d,t[1]+d],[t[0]-d,t[1]+d]];});
var LOY=[[166.55,-20.6,0.45],[167.25,-20.95,0.5],[167.82,-21.12,0.15],[167.95,-21.5,0.45]];

var CH=[

/* 1 --------------------------------------------------------------- */
{short:'Un pays kanak',col:'kan',dur:46,when:[1700,1774],dates:'avant 1774',
 cam:[cam(0,166,-21.2,14),nc(8),nc(46)],
 zones:[
  ext(Rg(GT,'kan',1,0.55,1),{t2:5,t3:7}),ext(Lz(LOY,'kan',1,0.55,1),{t2:19,t3:21}),
  Rg(AIRES['Hoot Ma Whaap'],'afr',6,0.6,1.5),Rg(AIRES['Paicî-Cèmuhi'],'aus',9,0.6,1.5),Rg(AIRES['Ajië Aro'],'lap',12,0.6,1.5),Rg(AIRES['Xârâcùù'],'pol',15,0.6,1.5),Rg(AIRES['Drubea-Kapumë'],'neo',18,0.6,1.5),
  Rg(AIRES['Iaai'],'xet',21,0.65),Rg(AIRES['Drehu'],'mis',23,0.65),Rg(AIRES['Nengone'],'pap',25,0.65)
 ],
 routes:[],
 labels:[
  L(6,164.1,-20.25,'Hoot Ma Whaap',{nomark:true,dx:-14,al:'right'}),
  L(9,165.55,-20.72,'Paicî-Cèmuhi',{nomark:true,dx:10,al:'left'}),
  L(12,165.1,-21.85,'Ajië Aro',{nomark:true,dx:-12,al:'right'}),
  L(15,166.5,-21.4,'Xârâcùù',{nomark:true,dx:10,al:'left'}),
  L(18,166.1,-22.6,'Drubea-Kapumë',{nomark:true,dx:-10,al:'right'}),
  L(21,166.55,-20.38,'Iaai (Ouvéa)',{nomark:true,dy:-12}),
  L(23,167.55,-20.85,'Drehu (Lifou)',{nomark:true,dx:8,al:'left'}),
  L(25,168.2,-21.75,'Nengone (Maré)',{nomark:true,dy:14}),
  L(10,164.9,-21.13,'Pouembout',{mark:'star',dx:-9,dy:10,al:'right'})
 ],
 pulses:[Pu(10,164.9,-21.13,'#ffd166',true)],
 ph:[
  Ph(0,'Avant 1774','Depuis près de 3 000 ans, les Kanak vivent sur la Grande Terre et dans les îles. Chaque clan a sa terre, ses ancêtres et ses chemins d’alliance.','kan'),
  Ph(6,'Huit aires coutumières','On regroupe aujourd’hui les pays kanak en huit aires coutumières : cinq sur la Grande Terre, trois aux îles Loyauté. Pouembout se trouve dans l’aire Paicî-Cèmuhi.','aus'),
  Ph(21,'Les îles','Ouvéa (Iaai), Lifou (Drehu) et Maré (Nengone) forment chacune une aire. L’île des Pins est rattachée à l’aire Drubea-Kapumë.','mis'),
  Ph(31,'28 langues','On parle 28 langues kanak. Avant l’arrivée des Européens, le pays compte plusieurs dizaines de milliers d’habitants. On cultive l’igname et le taro, on échange entre le bord de mer et la montagne.','kan')
 ],
 photos:[Sh('grandecase',1,6,'tr',2),Sh('tribu',32,39,'tr',2),Sh('fleche',39,46,'bl',-2,'contain')],
 legend:[['afr','Hoot Ma Whaap'],['aus','Paicî-Cèmuhi'],['lap','Ajië Aro'],['pol','Xârâcùù'],['neo','Drubea-Kapumë'],['xet','Iaai'],['mis','Drehu'],['pap','Nengone']],
 mots:[['Aire coutumière','Grande région kanak qui regroupe des clans et des langues proches.'],['Coutume','Ensemble des règles, des gestes et des paroles qui organisent la vie kanak.'],['Clan','Groupe de familles qui ont le même ancêtre.']],
 q:[['Combien y a-t-il d’aires coutumières ?','Huit : cinq sur la Grande Terre et trois aux îles Loyauté.'],['Dans quelle aire se trouve Pouembout ?','Dans l’aire Paicî-Cèmuhi.'],['Combien de langues kanak parle-t-on ?','28.']],
 wiki:['Aire coutumière','Langues kanak','Kanak']},

/* 2 --------------------------------------------------------------- */
{short:'Premiers contacts',col:'eur',dur:50,when:[1774,1853],dates:'1774 – 1853',
 cam:[nc(0),cam(8,165.2,-20.5,61),cam(14,165.6,-21.2,22),cam(22,167.3,-22.2,54),cam(34,166.8,-21.1,47),nc(44),nc(50)],
 zones:[Rg(GT,'kan',-5,0.35,0.01),Lz(LOY,'kan',-5,0.35,0.01)],
 routes:[
  r('eur',2,9,3.2,[[169.6,-19.9],[168.5,-20],[166.6,-19.95],[164.6,-20.1]],{ship:true,sp:'endeavour',straight:true,step:0.2}),
  r('eur',9,13,2.6,[[164.6,-20.1],[165.6,-20.6],[166.8,-21.5],[167.9,-22.3],[168,-23.2]],{ship:true,sp:'endeavour',dash:true}),
  r('fra',12,20,3,[[167.2,-23.3],[166,-22.75],[165,-22],[164,-21.1],[163.4,-20.2],[163.3,-19.3]],{ship:true,sp:'fregate'}),
  r('epi',21,27,3,[[160.5,-27.5],[164.5,-25],[166.8,-23.3],[167.3,-22.95]],{ship:true,sp:'goelette'}),
  r('mis',31,36,3,[[171.5,-21.7],[169.8,-21.5],[168.5,-21.3],[168.3,-21.45]],{ship:true,sp:'goelette',straight:true,step:0.2}),
  r('cat',36,43,3,[[168.8,-24.8],[168.2,-23.4],[167.6,-22.3],[167,-21.9],[166.3,-21.35],[165.7,-20.85],[165.2,-20.45],[164.85,-20.2]],{ship:true,sp:'troismats',straight:true,step:0.3})
 ],
 labels:[
  L(8,164.5,-20.3,'Balade',{sub:'Cook, septembre 1774',mark:'site',dx:-10,dy:-8,al:'right',gold:true}),
  L(19,163.9,-21.3,'d’Entrecasteaux',{sub:'1792',nomark:true,dx:-6,al:'right',end:30}),
  L(22.5,167.48,-22.62,'Île des Pins',{sub:'Kunié · santal, 1841',dx:10,dy:6,al:'left'}),
  L(35,167.95,-21.55,'Maré',{sub:'protestants, 1841',dx:10,dy:10,al:'left'}),
  L(36,167.25,-20.95,'Lifou',{sub:'1842',dy:-14}),
  L(43,164.5,-20.3,'Mission de Balade',{sub:'catholiques, 1843',nomark:true,dx:-10,dy:24,al:'right'})
 ],
 pulses:[Pu(8,164.5,-20.3,'#ffd166',true)],
 ph:[
  Ph(0,'4 – 5 septembre 1774','Le navigateur anglais James Cook aperçoit la Grande Terre le 4 septembre ; le 5, il débarque à Balade. Il nomme le pays « New Caledonia ». Les Kanak l’accueillent et échangent avec lui.','eur'),
  Ph(12,'1792 – 1793','Le Français d’Entrecasteaux, parti à la recherche de La Pérouse, longe la côte ouest, puis séjourne à Balade.','fra'),
  Ph(20,'1841 : santaliers et baleiniers','Des marchands viennent chercher le bois de santal, d’abord à l’île des Pins et aux Loyauté. Ils apportent du fer, des tissus, des fusils… et des maladies inconnues, qui tuent beaucoup de Kanak.','epi'),
  Ph(30,'1841 – 1843 : les missionnaires','Des enseignants protestants venus de Polynésie s’installent à Maré, puis à Lifou. En 1843, des pères maristes catholiques fondent une mission à Balade.','mis'),
  Ph(44,'Deux pays se surveillent','Protestants anglais d’un côté, catholiques français de l’autre : l’Angleterre et la France s’intéressent toutes les deux à l’archipel.','eur')
 ],
 photos:[Sh('cook',1,7,'tr',2,'contain'),Sh('hodges',7,12,'bl',-2,'contain'),Sh('baleinier',21,29,'bl',-2),Sh('douarre',37,43,'tr',2,'contain'),Sh('balade1843',44,50,'bl',-2,'contain')],
 legend:[['eur','Cook (1774)'],['fra','d’Entrecasteaux (1792)'],['epi','Santaliers (dès 1841)'],['mis','Protestants (1841)'],['cat','Catholiques (1843)']],
 mots:[['Santal','Arbre au bois parfumé, vendu très cher en Chine.'],['Missionnaire','Personne envoyée pour faire connaître sa religion.'],['Épidémie','Maladie qui touche beaucoup de personnes en même temps.']],
 q:[['Qui est le premier Européen à aborder en Nouvelle-Calédonie ?','James Cook, à Balade, en septembre 1774.'],['Que viennent chercher les santaliers ?','Du bois de santal, pour le vendre en Chine.'],['Où s’installent les premiers missionnaires ?','Les protestants à Maré et Lifou (1841–1842), les catholiques à Balade (1843).']],
 wiki:['Histoire de la Nouvelle-Calédonie','Bois de santal','Guillaume Douarre']},

/* 3 --------------------------------------------------------------- */
{short:'1853 : la prise de possession',col:'fra',dur:48,when:[1853,1864],dates:'1853 – 1864',
 cam:[nc(0),cam(6,165,-20.5,65),cam(12,165,-20.5,65),cam(19,167.1,-22.4,65),cam(24,167.1,-22.4,65),cam(30,166.6,-22.3,108),cam(35,166.6,-22.3,108),nc(40),nc(48)],
 zones:[Rg(GT,'kan',-5,0.35,0.01),Lz(LOY,'kan',-5,0.35,0.01),Rg(GT,'fra',10,0.5,3),Lz(LOY,'fra',36,0.6,2)],
 routes:[
  r('fra',2,9,3.2,[[168.5,-19.5],[166.5,-19.9],[164.7,-20.1]],{ship:true,sp:'troismats',straight:true,step:0.2}),
  r('fra',13,20,3,[[164.7,-20.1],[165.6,-20.6],[166.8,-21.5],[167.9,-22.3],[167.85,-22.75]],{ship:true,sp:'troismats'}),
  r('fra',25,31,3,[[167.85,-22.75],[167.3,-23.05],[166.7,-22.8],[166.35,-22.4]],{ship:true,sp:'troismats'})
 ],
 labels:[
  L(9,164.5,-20.3,'Balade',{sub:'24 septembre 1853',mark:'site',dx:-10,dy:-8,al:'right',gold:true}),
  L(20,167.48,-22.62,'Île des Pins',{sub:'29 septembre 1853',dx:-10,dy:8,al:'right'}),
  L(31,166.45,-22.27,'Port-de-France',{sub:'1854 · Nouméa en 1866',dx:10,dy:-8,al:'left',gold:true}),
  L(37,167.5,-20.5,'Îles Loyauté',{sub:'1864',nomark:true,dy:-10})
 ],
 pulses:[Pu(9,164.5,-20.3,'#ffd166',true),Pu(31,166.45,-22.27,'#ffd166',true)],
 ph:[
  Ph(0,'24 septembre 1853','Sur ordre de l’empereur Napoléon III, l’amiral Febvrier-Despointes prend possession de la Grande Terre, à Balade. Il veut devancer les Anglais.','fra'),
  Ph(12,'29 septembre 1853','Quelques jours plus tard, il fait de même à l’île des Pins, où un navire anglais était déjà à l’ancre.','fra'),
  Ph(24,'1854 : Port-de-France','Le capitaine Tardy de Montravel choisit une grande rade bien abritée, au sud-ouest, pour installer la capitale. Port-de-France prend le nom de Nouméa en 1866.','fra'),
  Ph(35,'1864 : les îles Loyauté','La France impose son autorité à Lifou, Maré et Ouvéa. Tout l’archipel est désormais une colonie française.','fra'),
  Ph(42,'Pourquoi cette colonie ?','La France veut une base pour ses navires dans le Pacifique, face à l’Angleterre. Elle cherche aussi une terre lointaine où envoyer ses condamnés.','eur')
 ],
 photos:[Sh('prise1853',2,9,'tr',2,'contain'),Sh('chartenoumea',31,38,'bl',-2,'contain'),Sh('lifou1864',38,46,'bl',-2,'contain')],
 legend:[['fra','Marine française (1853–1854)'],['fra','Territoire sous autorité française']],
 mots:[['Prise de possession','Acte par lequel un pays déclare qu’une terre lui appartient.'],['Colonie','Territoire dominé et exploité par un pays étranger.'],['Rade','Grand bassin naturel où les navires sont à l’abri.']],
 q:[['Que se passe-t-il le 24 septembre 1853 ?','La France prend possession de la Grande Terre, à Balade.'],['Quel était le premier nom de Nouméa ?','Port-de-France.'],['Pourquoi la France veut-elle cette colonie ?','Pour avoir une base navale dans le Pacifique et un lieu où envoyer ses condamnés.']],
 wiki:['Histoire de la Nouvelle-Calédonie','Auguste Febvrier Despointes','Nouméa']},

/* 4 --------------------------------------------------------------- */
{short:'Le bagne',col:'eur',dur:68,when:[1864,1931],dates:'1864 – 1931',
 cam:[cam(0,0,32,1),cam(6,55,-30,1),cam(12,150,-32,1.5),cam(18,166.5,-22.25,144),cam(27,166.5,-22.25,144),cam(31,167,-22.4,83),cam(40,167,-22.4,83),cam(44,165.75,-21.75,108),cam(52,165.3,-21.4,83),cam(59,165.3,-21.4,83),nc(63),nc(68)],
 zones:[],
 routes:[r('eur',1,17,3,[[-1.4,46.15],[-4.5,46.2],[-9.5,44.6],[-11.5,41],[-13,36],[-20.5,26],[-22,8],[-15,-12],[5,-34],[18,-37],[50,-42],[90,-43],[125,-43],[148,-45],[160,-37],[165.5,-27],[166.2,-22.6]],{ship:true,sp:'troismats'})],
 labels:[
  L(1,-1.4,46.2,'Île de Ré',{sub:'départ des convois à partir de 1873 (avant : Toulon)',dx:10,al:'left',end:9}),
  L(18,166.41,-22.26,'Île Nou',{sub:'pénitencier-dépôt, 1864',mark:'site',dx:-10,dy:12,al:'right',gold:true,zmin:120}),
  L(19,166.46,-22.28,'Nouméa',{dx:10,dy:12,al:'left',zmin:14}),
  L(29,166.42,-22.22,'Presqu’île Ducos',{sub:'déportés politiques',mark:'site',dx:-10,dy:-14,al:'right',zmin:120}),
  L(31,167.45,-22.62,'Île des Pins',{sub:'déportés de la Commune, 1872–1880',mark:'site',dx:-10,dy:10,al:'right'}),
  L(41,166.82,-22.32,'Prony',{sub:'coupe du bois',mark:'site',dx:10,dy:10,al:'left',zmin:30}),
  L(42,166.18,-21.93,'Camp Brun',{sub:'camp disciplinaire',mark:'site',dx:10,dy:-8,al:'left',zmin:30}),
  L(44,165.82,-21.7,'La Foa',{sub:'pénitencier agricole',mark:'site',dx:10,dy:-10,al:'left',zmin:30}),
  L(45,165.69,-21.73,'Fort Teremba',{sub:'1871',mark:'site',dx:-10,dy:10,al:'right',zmin:30}),
  L(47,165.5,-21.57,'Bourail',{sub:'concessions, 1867',mark:'site',dx:-10,dy:-8,al:'right',gold:true}),
  L(53,164.9,-21.13,'Pouembout',{sub:'centre agricole pénitentiaire, 1883',mark:'star',dx:10,dy:-8,al:'left',gold:true}),
  L(64,164.42,-20.34,'Diahot',{sub:'mines',mark:'site',dx:-10,al:'right',zmax:30})
 ],
 pulses:[Pu(18,166.41,-22.26,'#ffd166',true),Pu(53,164.9,-21.13,'#ff9ecb',true)],
 ph:[
  Ph(0,'9 mai 1864','Après quatre mois de mer, la frégate L’Iphigénie débarque à Nouméa les 250 premiers forçats. La France a décidé d’envoyer ses condamnés à l’autre bout du monde.','eur'),
  Ph(18,'L’île Nou','En face de Nouméa, l’île Nou devient le grand pénitencier. Les « transportés », condamnés aux travaux forcés, construisent les routes, les quais et les bâtiments de la colonie.','eur'),
  Ph(28,'1872 : les déportés de la Commune','Plus de 4 000 condamnés politiques arrivent après la Commune de Paris. Ils sont enfermés à la presqu’île Ducos, comme Louise Michel, ou à l’île des Pins. Des Kabyles d’Algérie, révoltés en 1871, sont déportés eux aussi.','cat'),
  Ph(41,'Des camps dans la brousse','Prony, Fort Teremba, La Foa, Bourail : les forçats coupent le bois, cultivent ou travaillent dans les mines. Les plus rebelles sont envoyés au camp disciplinaire de Camp Brun.','eur'),
  Ph(52,'Rester dans la colonie','Sa peine finie, le condamné doit rester en Nouvelle-Calédonie. Certains reçoivent une terre, une « concession », à Bourail, à La Foa ou à Pouembout, créé en 1883 comme centre agricole pénitentiaire.','kan'),
  Ph(62,'1897 – 1931 : la fin du bagne','Environ 30 000 condamnés ont été envoyés en Nouvelle-Calédonie. Les convois s’arrêtent en 1897. Le bagne ferme peu à peu ; les derniers centres pénitentiaires ferment en 1931.','eur')
 ],
 photos:[Sh('surveillant',19,27,'tr',2),Sh('forcats',22,28,'bl',-2),Sh('ducos',29,35,'tr',2,'contain'),Sh('pins_bagne',35,40,'tl',-2),Sh('teremba',45,51,'tr',2)],
 legend:[['eur','Convois de forçats (1864–1897)'],['kan','◆ Centres pénitentiaires']],
 mots:[['Bagne','Lieu où l’on envoyait les condamnés aux travaux forcés.'],['Transporté','Condamné de droit commun envoyé au bagne.'],['Déporté','Condamné politique envoyé loin de son pays.'],['Concession','Terre donnée à un ancien forçat ou à un colon pour qu’il la cultive.']],
 q:[['Quand arrivent les premiers forçats ?','Le 9 mai 1864, à bord de L’Iphigénie.'],['Qui sont les « déportés » de 1872 ?','Des condamnés politiques : les insurgés de la Commune de Paris, comme Louise Michel, et des Kabyles d’Algérie.'],['Quel lien entre le bagne et Pouembout ?','Pouembout a été créé en 1883 comme centre agricole pénitentiaire, avec des concessions pour d’anciens forçats.'],['Combien de condamnés ont été envoyés en Nouvelle-Calédonie ?','Environ 30 000, entre 1864 et 1897.']],
 wiki:['Bagne de Nouvelle-Calédonie','Île Nou','Louise Michel','Fort Teremba','Algériens du Pacifique']},

/* 5 --------------------------------------------------------------- */
{short:'Colons libres et cantonnement',col:'kan',dur:58,when:[1855,1903],dates:'1855 – 1903',
 cam:[nc(0),nc(10),cam(16,165.6,-21.6,54),cam(34,165.6,-21.6,54),nc(40),nc(58)],
 zones:[
  Rg(GT,'kan',1,0.6,1.5),Lz(LOY,'kan',1,0.6,1.5),
  Rg(OUEST,'eur',12,0.85,3,{c:[166.45,-22.27],r0:0.05,r1:3.2,d:20}),
  Rg(NCG.feillet[0],'eur',36,0.85,2),Rg(NCG.feillet[1],'eur',37,0.85,2),Rg(NCG.feillet[2],'eur',38,0.85,2),Rg(NCG.feillet[3],'eur',39,0.85,2),
  Rg(GT,'eur',47.5,0.85,3),Rg(RESERVES,'kan',49.5,0.95,2.5)
 ],
 routes:[],
 labels:[
  L(11,166.45,-22.27,'Nouméa',{dx:10,dy:12,al:'left',gold:true}),
  L(13,166.37,-22.13,'Païta',{sub:'1859 : premiers colons',dx:-10,dy:8,al:'right',zmin:24,end:36}),
  L(18,165.68,-21.69,'Moindou',{sub:'Alsaciens, 1873',dx:-10,dy:10,al:'right',zmin:24,end:36}),
  L(20,165.5,-21.57,'Bourail',{dx:-10,dy:-4,al:'right',zmin:24,end:36}),
  L(27,164.9,-21.13,'Pouembout',{mark:'star',dx:-10,dy:8,al:'right'}),
  L(36,164.7,-20.96,'Voh',{sub:'colons Feillet',dx:-10,dy:-6,al:'right'}),
  L(38,165.33,-20.94,'Poindimié',{sub:'caféiers',dx:10,dy:-6,al:'left'}),
  L(37,165.97,-21.52,'Canala',{dx:10,dy:-6,al:'left'}),
  L(48,167.5,-20.5,'Îles Loyauté',{sub:'restent entièrement kanak',nomark:true,dy:-12})
 ],
 pulses:[],
 ph:[
  Ph(0,'1855 : des terres dites « vacantes »','L’État français se déclare propriétaire de toutes les terres qu’il juge inoccupées. Pour les Kanak, aucune terre n’est vide : chaque lieu appartient à un clan.','kan'),
  Ph(10,'Les colons libres','Des familles viennent de France, d’Australie, de La Réunion, puis d’Alsace-Lorraine après 1871. Elles s’installent surtout sur la côte ouest, où l’on élève du bétail sur de grandes « stations ».','eur'),
  Ph(24,'1868 – 1876 : les réserves','L’administration regroupe les Kanak dans des « réserves » aux limites fixées. Le bétail des colons détruit les champs d’ignames et de taros.','kan'),
  Ph(34,'1895 – 1903 : le gouverneur Feillet','Il arrête les convois de forçats et fait venir environ 500 familles de France pour planter du café. Pour leur donner des terres, il réduit encore les réserves : c’est le « grand cantonnement ».','eur'),
  Ph(47,'Un pays coupé en deux','Vers 1900, les réserves ne couvrent plus qu’un dixième environ de la Grande Terre, surtout en montagne et sur la côte est. Les îles Loyauté restent entièrement kanak.','kan')
 ],
 photos:[Sh('tribu',1,9,'tr',2),Sh('cafecanala',40,47,'tr',2),Sh('stlouis',24,31,'tr',2)],
 legend:[['kan','Terres kanak ; vers 1900, les réserves (schéma autour des tribus d’aujourd’hui)'],['eur','Terres prises par la colonisation et par l’État (schéma)']],
 mots:[['Colon','Personne venue s’installer dans une colonie pour y vivre et cultiver.'],['Réserve','Terre laissée aux Kanak par l’administration coloniale ; ils ne pouvaient pas en sortir librement.'],['Cantonnement','Regroupement forcé des Kanak dans les réserves.'],['Station','Grande propriété d’élevage de bétail.']],
 q:[['Où s’installent surtout les colons ?','Sur la côte ouest, dans les plaines, et autour de Nouméa.'],['Qu’est-ce que le cantonnement ?','Le regroupement forcé des Kanak dans des réserves, pour donner leurs terres aux colons.'],['Quelle part de la Grande Terre reste aux Kanak vers 1900 ?','Environ un dixième.']],
 wiki:['Histoire de la Nouvelle-Calédonie','Paul Feillet','Tribu kanak']},

/* 6 --------------------------------------------------------------- */
{short:'Les Kanak face à la colonisation',col:'ame',dur:56,when:[1878,1921],dates:'1878 – 1921',
 cam:[cam(0,165.75,-21.7,79),cam(22,165.6,-21.6,79),nc(30),nc(38),cam(42,164.95,-20.9,83),cam(49,164.95,-20.9,83),nc(53),nc(56)],
 zones:[
  Rg(GT,'kan',-5,0.3,0.01),
  Rg(R1878,'ame',3,0.7,2,{c:[165.85,-21.72],r0:0.04,r1:1.1,d:14}),
  Rg(R1917,'ame',41,0.7,2)
 ],
 routes:[
  r('eur',13,19,1.3,[[165.97,-21.52],[165.92,-21.62],[165.85,-21.69]]),
  r('ame',24,29,2.4,[[166.43,-22.33],[166.75,-22.55],[167.1,-22.66],[167.38,-22.62]],{dash:true}),
  r('ame',24,30,2.4,[[165.42,-21.66],[165.1,-21.55],[164.6,-21.1],[164.05,-20.7],[163.75,-20.15],[163.68,-19.78]],{dash:true})
 ],
 labels:[
  L(1,165.83,-21.71,'La Foa',{sub:'25 juin 1878',dx:10,dy:8,al:'left',gold:true,zmin:24}),
  L(8,166.04,-21.87,'Boulouparis',{sub:'26 juin',dx:10,dy:8,al:'left',zmin:24}),
  L(12,165.5,-21.57,'Bourail',{dx:-10,dy:8,al:'right',zmin:24}),
  L(14,165.16,-21.35,'Poya',{sub:'septembre',dx:-10,dy:8,al:'right',zmin:24}),
  L(13,165.97,-21.52,'Canala',{dx:10,dy:-8,al:'left',zmin:24}),
  L(29,167.45,-22.62,'Île des Pins',{sub:'exil',dx:10,al:'left',zmax:30}),
  L(30,163.67,-19.72,'Belep',{sub:'exil',dx:10,al:'left',zmax:30}),
  L(42,164.87,-21.06,'Koné',{sub:'1917',dx:-10,dy:8,al:'right'}),
  L(43,164.95,-20.69,'Hienghène',{dx:10,dy:-8,al:'left'})
 ],
 pulses:[Pu(1,165.83,-21.71,'#fb7185',true)],
 ph:[
  Ph(0,'25 juin 1878','Les terres rétrécissent, le bétail saccage les champs, les lieux sacrés ne sont pas respectés. Autour de La Foa, le grand chef Ataï prend la tête d’une révolte.','ame'),
  Ph(8,'La guerre','En quelques jours, des fermes, des postes de gendarmerie et le village de Boulouparis sont attaqués. La révolte gagne Bourail, puis Poya. L’armée répond durement, avec l’aide de guerriers de Canala.','ame'),
  Ph(19,'1er septembre 1878','Ataï est tué. La guerre dure jusqu’au début de 1879. Elle fait environ 200 morts chez les Européens et sans doute plus de 1 000 chez les Kanak. Des clans entiers sont exilés à l’île des Pins et aux Belep. Leurs terres sont confisquées.','ame'),
  Ph(31,'1887 : l’indigénat','Un règlement spécial s’applique aux Kanak : interdiction de quitter la réserve sans autorisation, impôt, travail obligatoire pour l’administration et les colons.','kan'),
  Ph(40,'1917 : une nouvelle révolte','En pleine Première Guerre mondiale, alors que l’armée recrute des tirailleurs, une révolte éclate dans le Nord, de Koné et Voh jusqu’à Hienghène, Touho et Poindimié. Elle est écrasée au début de 1918.','ame'),
  Ph(50,'Un peuple qui a failli disparaître','Maladies, guerres, misère : vers 1920, il ne reste qu’environ 27 000 Kanak. Puis la population remonte.','kan')
 ],
 photos:[Sh('casse',2,8,'tr',2,'contain'),Sh('atai',20,27,'tr',2,'contain')],
 legend:[['ame','Régions révoltées (1878, 1917), tracé approximatif'],['eur','Guerriers de Canala, alliés de l’armée'],['ame','Exil',true]],
 mots:[['Insurrection','Révolte armée d’un peuple.'],['Indigénat','Règles spéciales, très dures, imposées aux Kanak de 1887 à 1946.'],['Exil','Obligation de vivre loin de sa terre.']],
 q:[['Pourquoi les Kanak se révoltent-ils en 1878 ?','On leur prend leurs terres, le bétail détruit leurs cultures, leurs lieux sacrés ne sont pas respectés.'],['Qui est Ataï ?','Un grand chef kanak de la région de La Foa, qui dirige la révolte de 1878.'],['Qu’est-ce que l’indigénat ?','Des règles spéciales imposées aux Kanak : rester dans la réserve, payer un impôt, travailler de force.']],
 wiki:['Grande révolte kanak de 1878','Ataï','Régime de l\'indigénat','Révolte kanak de 1917']},

/* 7 --------------------------------------------------------------- */
{short:'Le nickel et les travailleurs venus d’ailleurs',col:'jade',dur:60,when:[1864,1949],dates:'1864 – 1949',
 cam:[nc(0),cam(10,166,-21.5,61),cam(17,166,-21.5,61),cam(23,148,2,1.5),cam(42,148,2,1.5),nc(48),nc(60)],
 zones:[
  Rg(GT,'kan',-5,0.25,0.01)
 ].concat(NCG.massifs.map(function(m,i){return Rg(m[2],'jade',i?3.4+(i-1)*0.3:3,0.9,i?1.5:2);})),
 routes:[
  r('zh',24,31,3,[[130.5,31.5],[136,24],[146,12],[156,2],[163.5,-6],[164.5,-12.5],[164.6,-17],[164.8,-19.2],[165.6,-20.4],[166.2,-21.2],[166.28,-21.57]],{sp:'vapeur',ship:true}),
  r('ame',27,34,3,[[107,20.5],[107.8,18.6],[111,16.5],[117,19.3],[121.2,20.4],[127,15],[136,7],[147,1.5],[156,-2.5],[162.8,-7],[164.2,-12.5],[163.6,-18],[163.6,-20.6],[165,-21.9],[166.1,-22.42],[166.42,-22.3]],{sp:'vapeur',ship:true}),
  r('ned',30,37,3,[[110.4,-6.5],[119,-7.3],[125,-7],[130,-6.6],[133,-8.9],[138,-9.9],[142.3,-10.5],[150,-13],[158,-19],[163,-22.3],[165.8,-22.75],[166.4,-22.36]],{sp:'vapeur',ship:true}),
  r('lap',34,39,2.6,[[168.3,-17.9],[168.7,-20],[168.5,-22],[167.6,-22.95],[166.9,-22.62],[166.5,-22.36]],{sp:'goelette',ship:true})
 ],
 labels:[
  L(3,166.19,-21.62,'Thio',{sub:'« capitale du nickel »',dx:10,dy:-8,al:'left',gold:true,zmin:10}),
  L(5,165.77,-21.42,'Kouaoua',{dx:10,dy:-8,al:'left',zmin:24}),
  L(7,165,-21.3,'Népoui',{dx:-10,dy:8,al:'right',zmin:14}),
  L(7.5,164.79,-20.98,'Koniambo',{dx:-10,dy:-6,al:'right',zmin:14}),
  L(8,164.21,-20.45,'Tiébaghi',{sub:'chrome',dx:-10,al:'right',zmin:14}),
  L(12,166.44,-22.25,'Doniambo',{sub:'usine, 1910',dx:-10,dy:10,al:'right',zmin:14}),
  L(26,134,34,'Japon',{sub:'environ 6 000 travailleurs, dès 1892',nomark:true,dx:14,al:'left',zmax:6}),
  L(29,106.5,21,'Tonkin (Vietnam)',{sub:'environ 14 000, dès 1891',nomark:true,dx:-6,dy:-16,al:'center',zmax:6}),
  L(32,110.4,-7.2,'Java',{sub:'environ 20 000, dès 1896',nomark:true,dy:20,zmax:6}),
  L(36,168.3,-16.5,'Nouvelles-Hébrides',{sub:'dès 1865',nomark:true,dx:12,al:'left',zmax:6}),
  L(38,165.5,-21.4,'Nouvelle-Calédonie',{nomark:true,gold:true,dx:10,dy:22,al:'left',zmax:6})
 ],
 pulses:[Pu(3,166.22,-21.61,'#5eead4',true)],
 ph:[
  Ph(0,'1864 : un minerai vert','L’ingénieur Jules Garnier découvre un minerai de nickel, qu’on appellera « garniérite ». Vers 1875, c’est la ruée : des mines s’ouvrent dans les montagnes.','jade'),
  Ph(9,'1880 : la Société Le Nickel','La SLN exploite les mines de Thio, « capitale du nickel ». Le minerai descend de la montagne, puis part en bateau. En 1910, une usine ouvre à Doniambo, à Nouméa.','jade'),
  Ph(18,'On manque de bras','Les colons sont peu nombreux et les Kanak sont enfermés dans les réserves. Les sociétés minières font venir des travailleurs « sous contrat », engagés pour plusieurs années, mal payés et durement traités.','epi'),
  Ph(27,'Du Japon, du Tonkin, de Java','Des Vietnamiens du Tonkin dès 1891, des Japonais dès 1892, des Javanais dès 1896, et des Néo-Hébridais (Vanuatu). Beaucoup repartent ; d’autres restent et fondent une famille ici.','zh'),
  Ph(48,'Un pays de plusieurs peuples','Kanak, descendants de colons et de bagnards, familles d’origine asiatique ou océanienne : la population calédonienne se construit avec toutes ces arrivées.','kan')
 ],
 photos:[Sh('garnierite',1,8,'tr',2),Sh('thio',10,17,'tr',2),Sh('doniambo',12,18,'bl',-2),Sh('minejaponais',38,46,'tr',2)],
 legend:[['jade','Grands massifs miniers'],['zh','Japon'],['ame','Tonkin (Vietnam)'],['ned','Java'],['lap','Nouvelles-Hébrides (Vanuatu)']],
 mots:[['Nickel','Métal gris qui ne rouille pas ; il sert à fabriquer l’acier inoxydable.'],['Minerai','Roche qui contient un métal.'],['Travailleur sous contrat','Personne engagée loin de chez elle pour plusieurs années, sans pouvoir quitter son patron.']],
 q:[['Qui découvre le nickel calédonien, et quand ?','Jules Garnier, en 1864.'],['Pourquoi fait-on venir des travailleurs d’Asie ?','Parce que les mines manquent de main-d’œuvre.'],['De quels pays viennent-ils ?','Du Japon, du Tonkin (Vietnam), de Java (Indonésie) et des Nouvelles-Hébrides (Vanuatu).']],
 wiki:['Jules Garnier','Société Le Nickel','Chân Đăng','Thio']},

/* 8 --------------------------------------------------------------- */
{short:'Deux guerres mondiales',col:'mis',dur:58,when:[1914,1946],dates:'1914 – 1946',
 cam:[nc(0),cam(6,100,-10,1),cam(15,45,25,1.2),cam(22,45,25,1.2),cam(27,-165,-5,1),cam(34,164,-16,4),cam(40,164,-16,4),cam(44,165.8,-21.6,54),cam(58,165.8,-21.6,54)],
 zones:[],
 routes:[
  r('fra',3,16,3,[[166.2,-22.7],[158,-33],[151,-40.5],[135,-39],[113,-37],[95,-20],[78,2],[58,11.5],[45,12],[43.3,12.6],[38,20],[33.5,27.5],[32.4,31.5],[25,34],[15,37],[8,41],[5.3,43.1]],{sp:'vapeur',ship:true,nosea:true}),
  r('mis',24,33,3.2,[[-122.5,37.5],[-140,25],[-160,8],[-175,-8],[172,-18],[167.5,-23],[166.3,-22.6]],{sp:'liberty',ship:true,nosea:true}),
  r('mis',35,40,2.8,[[166.2,-22.5],[165.6,-22.2],[164.75,-21.6],[163.85,-20.65],[163.35,-19.6],[161.5,-14],[160.2,-10.2]],{sp:'liberty',ship:true,nosea:true})
 ],
 labels:[
  L(15,5.4,43.3,'Marseille',{sub:'vers le front, 1916',dx:-10,dy:-8,al:'right',end:26}),
  L(18,23.9,31.6,'Bir Hakeim',{sub:'Bataillon du Pacifique, 1942',mark:'site',dx:10,dy:10,al:'left',end:26}),
  L(25,-122.4,37.8,'États-Unis',{dx:-10,dy:-10,al:'right',end:36}),
  L(33,165.5,-21.4,'Nouvelle-Calédonie',{sub:'12 mars 1942',nomark:true,gold:true,dx:12,dy:22,al:'left',zmax:10}),
  L(39,160,-9.6,'Guadalcanal',{sub:'août 1942',dx:-10,al:'right',zmax:10}),
  L(45,166.45,-22.27,'Nouméa',{sub:'quartier général américain',dx:10,dy:12,al:'left',gold:true,zmin:14}),
  L(46,166.21,-22.02,'Tontouta',{sub:'aérodrome',mark:'site',dx:-10,dy:8,al:'right',zmin:14}),
  L(47,165.87,-21.82,'Oua Tom',{mark:'site',dx:-10,dy:8,al:'right',zmin:14}),
  L(48,165.5,-21.57,'Bourail',{sub:'soldats néo-zélandais',dx:-10,dy:8,al:'right',zmin:14}),
  L(49,164.95,-21.22,'Plaine des Gaïacs',{sub:'aérodrome, près de Pouembout',mark:'star',dx:10,dy:-10,al:'left',gold:true,zmin:14})
 ],
 pulses:[Pu(33,166.4,-22.3,'#7cb7ff',true)],
 ph:[
  Ph(0,'1914 – 1918','Environ 2 000 Calédoniens partent se battre en France, à 17 000 km. Parmi eux, plus d’un millier (1 134) de tirailleurs kanak, qui n’étaient pourtant pas citoyens. Plus de 500 soldats ne reviendront pas.','fra'),
  Ph(16,'1940 : la France libre','En septembre 1940, la Nouvelle-Calédonie choisit le camp du général de Gaulle. Le Bataillon du Pacifique se bat à Bir Hakeim, dans le désert de Libye, en 1942.','fra'),
  Ph(23,'12 mars 1942 : les Américains','Après l’attaque japonaise de Pearl Harbor, la guerre arrive dans le Pacifique. Environ 17 000 soldats américains débarquent à Nouméa en une seule journée. Le pays devient une immense base arrière pour la bataille de Guadalcanal.','mis'),
  Ph(43,'Un pays transformé','Plus d’un million de soldats passent par la Nouvelle-Calédonie. Ils construisent des routes, des hôpitaux et des aérodromes, comme Tontouta ou la Plaine des Gaïacs, près de Pouembout.','mis'),
  Ph(52,'Après la guerre, rien ne sera comme avant','Des Kanak ont travaillé pour l’armée américaine, mieux payés et mieux traités. Beaucoup n’acceptent plus l’indigénat.','kan')
 ],
 photos:[Sh('tirailleurs',4,12,'tr',2),Sh('us1942',28,36,'tr',2)],
 legend:[['fra','Soldats calédoniens vers la France (1915–1918)'],['mis','Armée américaine (1942–1946)']],
 mots:[['Tirailleur','Soldat recruté dans les colonies.'],['Base arrière','Lieu, loin des combats, où l’armée se repose, se soigne et prépare ses attaques.'],['Aérodrome','Terrain aménagé pour les avions.']],
 q:[['Combien de Calédoniens partent à la guerre de 1914–1918 ?','Environ 2 000, dont plus d’un millier (1 134) de tirailleurs kanak.'],['Que se passe-t-il le 12 mars 1942 ?','Les soldats américains débarquent à Nouméa.'],['Quel aérodrome américain se trouvait près de Pouembout ?','La Plaine des Gaïacs.']],
 wiki:['Bataillon du Pacifique','Histoire de la Nouvelle-Calédonie','Bataille de Bir Hakeim']},

/* 9 --------------------------------------------------------------- */
{short:'De 1946 à aujourd’hui',col:'kan',dur:66,when:[1946,2026],dates:'1946 – 2025',
 cam:[nc(0),cam(10,-176,-17,2),cam(20,-176,-17,2),nc(25),nc(66)],
 zones:[
  ext(Rg(GT,'kan',1,0.5,1),{t2:28,t3:31}),ext(Lz(LOY,'kan',1,0.5,1),{t2:28,t3:31}),
  Rg(PROV.nord,'afr',32,0.6,2),Rg(PROV.sud,'mis',33,0.6,2),Rg(PROV.iles,'xet',34,0.7)
 ],
 routes:[
  r('pol',11,17,3,[[-176.4,-13.6],[-179,-19.5],[172,-21.5],[167.6,-21.95]]),
  r('pol',12,18,2.6,[[-149.6,-17.7],[-165,-22.5],[178,-23.8],[167.9,-22.7]]),
  r('eur',13,19,2.6,[[150,-6],[158,-13],[164.2,-19.8]]),
  r('kan',55,61,2.6,[[165,-20.9],[165.6,-21.5],[166.25,-22.05]]),
  r('kan',55,61,2.6,[[167.2,-20.95],[166.9,-21.7],[166.6,-22.2]])
 ],
 labels:[
  L(11,-176.2,-13.3,'Wallis-et-Futuna',{dy:-14,zmax:8}),
  L(12,-149.5,-17.6,'Tahiti',{dy:-14,zmax:8}),
  L(13,150,-6,'depuis la France',{nomark:true,dy:-12,zmax:8}),
  L(18,165.5,-21.4,'Nouvelle-Calédonie',{nomark:true,gold:true,dy:26,zmax:8}),
  L(27,166.55,-20.62,'Ouvéa',{sub:'1988',dx:10,dy:-6,al:'left',end:32}),
  L(33,164.5,-20.4,'Province Nord',{sub:'Koné',nomark:true,big:true,dx:-16,al:'right'}),
  L(34,166.1,-22.55,'Province Sud',{sub:'Nouméa',nomark:true,big:true,dx:-12,al:'right'}),
  L(35,167.6,-20.5,'Province des Îles',{sub:'Lifou',nomark:true,big:true,dy:-12}),
  L(56,166.45,-22.27,'Grand Nouméa',{sub:'2 habitants sur 3',dx:10,dy:14,al:'left',gold:true})
 ],
 pulses:[Pu(56,166.45,-22.27,'#ffd166',true)],
 ph:[
  Ph(0,'1946 : tous citoyens','L’indigénat est supprimé. Les Kanak deviennent citoyens français : ils peuvent circuler, travailler où ils veulent et, peu à peu, voter. La colonie devient un territoire d’outre-mer.','kan'),
  Ph(10,'1969 – 1972 : le « boom » du nickel','Le nickel se vend très cher. Des milliers de personnes arrivent de France, de Wallis-et-Futuna et de Tahiti pour travailler. Nouméa grandit très vite.','pol'),
  Ph(22,'1984 – 1988 : les « Événements »','Une partie des habitants, surtout kanak, veut l’indépendance ; une autre veut rester dans la France. Le pays connaît des années de violences, jusqu’au drame d’Ouvéa, en 1988.','ame'),
  Ph(31,'1988 et 1998 : les accords','Jean-Marie Tjibaou et Jacques Lafleur se serrent la main : ce sont les accords de Matignon. Trois provinces sont créées. En 1998, l’accord de Nouméa reconnaît l’identité kanak et organise le partage des pouvoirs.','kan'),
  Ph(43,'2018 – 2021 : trois référendums','Trois fois, les électeurs votent pour ou contre l’indépendance. Le « non » l’emporte à chaque fois ; les indépendantistes n’ont pas participé au troisième vote. Après les graves violences de mai 2024, les discussions sur l’avenir du pays continuent.','eur'),
  Ph(54,'Aujourd’hui','La Nouvelle-Calédonie compte 264 596 habitants (recensement de 2025). Environ deux sur trois vivent dans le Grand Nouméa. Pour la première fois depuis 1946, la population a baissé entre deux recensements.','kan')
 ],
 photos:[Sh('noumea',56,64,'tr',2)],
 legend:[['afr','Province Nord'],['mis','Province Sud'],['xet','Province des îles Loyauté'],['pol','Arrivées du Pacifique (1950–1975)'],['kan','Départs vers Nouméa']],
 mots:[['Citoyen','Personne qui a les mêmes droits et les mêmes devoirs que les autres habitants de son pays, dont le droit de vote.'],['Province','L’une des trois grandes collectivités du pays : Nord, Sud, îles Loyauté.'],['Référendum','Vote où tous les électeurs répondent par oui ou par non à une question.'],['Recensement','Comptage de tous les habitants.']],
 q:[['Que change l’année 1946 pour les Kanak ?','L’indigénat est supprimé : ils deviennent citoyens.'],['Quelles sont les trois provinces ?','La province Nord, la province Sud et la province des îles Loyauté.'],['Combien d’habitants compte la Nouvelle-Calédonie en 2025 ?','264 596, dont environ deux sur trois dans le Grand Nouméa.']],
 wiki:['Accords de Matignon (1988)','Accord de Nouméa','Démographie de la Nouvelle-Calédonie','Provinces de la Nouvelle-Calédonie']}
];

A.add({id:'caledonie',title:'Histoire de la Nouvelle-Calédonie',tag:'9 chapitres · peuplement, bagne, colonisation, nickel',col:'kan',proj:'globe',
 sub:'L’histoire du pays en 9 cartes : mouvements de population, implantation européenne, centres pénitentiaires, nickel, guerres, provinces.',
 frise:{from:1700,to:2026,lin:true,ticks:[[1774,'1774'],[1853,'1853'],[1864,'1864',1],[1878,'1878'],[1917,'1917',1],[1946,'1946'],[1988,'1988'],[2025,'2025']]},
 info:'<p><b>Cycle 3, programmes adaptés à la Nouvelle-Calédonie</b> : civilisation kanak, premiers contacts, prise de possession (1853), colonisation pénale et colonisation libre, les Kanak face à la colonisation (Ataï, 1878), le nickel et les travailleurs sous contrat, les deux guerres mondiales, l’évolution du pays depuis 1945.</p><p><b>Collège, programmes adaptés</b> : 5e, thème 3 « La civilisation kanak pré-européenne » (chapitre 1) ; 4e, thème 1, premiers contacts (chapitre 2), et thème 2 « Conquêtes et sociétés coloniales : la Nouvelle-Calédonie » (chapitres 3 à 7) ; 3e, thème 1 (chapitre 8 : les deux guerres, le ralliement à la France libre en 1940) et thème 3 « La Nouvelle-Calédonie depuis 1946 : évolution politique » (chapitre 9).</p><p><b>Neutralité</b> : le dernier chapitre s’en tient aux dates et aux faits ; il ne prend pas position sur l’avenir institutionnel du pays.</p><p><b>Schémas</b> : les limites des aires coutumières, des terres de colonisation, des régions révoltées et des provinces sont tracées à grands traits. Les effectifs (forçats, travailleurs sous contrat, soldats) sont des ordres de grandeur.</p><p><b>Ancrage local</b> : Pouembout apparaît dans les chapitres 1, 4, 5 et 8 (aire Paicî-Cèmuhi, centre agricole pénitentiaire de 1883, Plaine des Gaïacs).</p>',
 chapters:CH});
})();
