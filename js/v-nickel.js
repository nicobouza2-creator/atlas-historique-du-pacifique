/* Volet 6 — Le nickel (globe, fort zoom). Relief, massifs, mines, usines, flux, environnement.
   Symboles de carte : mark 'mine' ▲, 'usine' ■, 'port' ⚓, 'barrage', 'ville' ; légende [col, texte, symbole]. */
(function(){
'use strict';
var A=window.ATLAS,r=A.r,L=A.L,Pu=A.Pu,Ph=A.Ph,Sh=A.Sh,Lz=A.Lz,Rg=A.Rg;
function cam(t,lon,lat,z){return {t:t,lon:lon,lat:lat,z:z};}
function nc(t){return cam(t,165.85,-21.2,23);}

/* contours schématiques */
var GT=[[163.3,-19.3],[164.6,-19.7],[165.6,-20.45],[166.9,-21.6],[167.25,-22.3],[167.9,-22.5],[167.8,-23],[166.2,-22.9],[164.9,-21.9],[163.4,-20.6]];
var LOY=[[166.55,-20.6,0.45],[167.25,-20.95,0.5],[167.82,-21.12,0.15],[167.95,-21.5,0.45]];
var CHAINE=window.NCG.chaine;
/* massif du Sud (péridotites) et massifs de la côte Ouest (klippes) : tracé à grands traits */
/* massifs de péridotites : contours officiels (Géorep, géologie au 1/1 000 000), le massif du Sud d’abord, puis les autres du nord au sud */
var NCG=window.NCG;
function massifs(t0,a,col){return NCG.massifs.map(function(m,i){return Rg(m[2],col||'pol',i?t0+0.4+(i-1)*0.15:t0,a,i?1.5:2);});}
var PROV=NCG.provinces;
/* lieux */
var P={noumea:[166.44,-22.27],pouembout:[164.9,-21.13],kone:[164.86,-21.06],voh:[164.7,-20.96],vavouto:[164.683,-21.014],koniambo:[164.793,-20.975],
  thio:[166.19,-21.62],thiom:[166.23,-21.6],kouaoua:[165.79,-21.44],kouaouam:[165.84,-21.4],nakety:[166.106,-21.54],poro:[165.7,-21.31],nepoui:[165.0,-21.33],kopeto:[165.01,-21.17],
  tiebaghi:[164.211,-20.465],poum:[164.04,-20.25],ouaco:[164.5,-20.76],goro:[166.93,-22.34],prony:[166.84,-22.33],yate:[166.88,-22.15],doniambo:[166.43,-22.25]};
function at(k,t,text,o){var p=P[k];return L(t,p[0],p[1],text,o);}

var CH=[

/* 2 --------------------------------------------------------------- */
{short:'Pourquoi du nickel ici ?',col:'pol',dur:56,dates:'il y a plus de 30 millions d’années → aujourd’hui',
 cam:[nc(0),nc(16),cam(20,166.7,-22.1,65),cam(30,166.7,-22.1,65),cam(34,164.85,-21.0,72),cam(42,164.85,-21.0,72),nc(48),nc(56)],
 zones:[Rg(GT,'kan',-5,0.25,0.01)].concat(massifs(6,0.75)),
 routes:[r('mis',1,6,3,[[169.5,-19.4],[168.2,-20.1],[166.9,-20.6]],{straight:true,dash:true})],
 labels:[
  L(2,168.6,-19.3,'plaque océanique',{nomark:true,sub:'poussée vers l’ouest',zmin:12,end:10}),
  L(8,166.75,-22.08,'Massif du Sud',{nomark:true,big:true,gold:true,zmin:12}),
  L(10,164.05,-20.85,'Massifs de la côte Ouest',{nomark:true,al:'right',zmin:12,zmax:30}),
  L(21,166.85,-22.26,'Plaine des Lacs',{dx:10,al:'left',zmin:30}),
  L(22,166.42,-21.88,'Mont Humboldt',{sub:'péridotite',dx:-10,al:'right',zmin:30}),
  at('koniambo',35,'Koniambo',{dx:10,dy:-8,al:'left',zmin:30,gold:true}),
  at('kopeto',36,'Kopéto',{dx:10,al:'left',zmin:30}),
  L(36.5,164.55,-20.78,'Taom',{dx:-10,al:'right',zmin:30}),
  at('pouembout',37,'Pouembout',{mark:'star',dx:-10,dy:10,al:'right',zmin:12})
 ],
 pulses:[],
 ph:[
  Ph(0,'Une roche venue de l’océan','Il y a plus de 30 millions d’années, un morceau du fond de l’océan, très lourd et riche en métaux, a glissé par-dessus la Grande Terre. Cette roche s’appelle la péridotite.','mis'),
  Ph(7,'Un tiers de l’île','Aujourd’hui, ces roches couvrent environ un tiers de la Grande Terre : le grand massif du Sud et une série de massifs le long de la côte Ouest, comme le Koniambo.','pol'),
  Ph(18,'La pluie fabrique le minerai','Pendant des millions d’années, la pluie tropicale a lentement attaqué la roche. Le nickel s’est concentré sous la terre rouge (la latérite), dans une couche plus verte, où l’on trouve la garniérite.','pol'),
  Ph(32,'Sur les sommets','Les gisements sont souvent en haut des massifs, sur des plateaux. C’est pour cela que les mines sont en montagne, loin de la mer.','pol'),
  Ph(44,'Une immense réserve','La Nouvelle-Calédonie posséderait de 20 à 30 % des ressources mondiales de nickel (ce que contient le sol) ; la part exploitable aujourd’hui est plus faible, environ 5 % des réserves mondiales. Sur ces sols pauvres pour l’agriculture poussent des plantes uniques au monde.','kan')
 ],
 photos:[Sh('tecto',1,7,'bl',-2,'contain'),Sh('cuirasse',8,16,'tr',2),Sh('profil',18,30,'tr',2,'contain'),Sh('rochenickel',32,40,'bl',-2),Sh('garnierite',44,52,'tr',2)],
 legend:[['pol','Massifs de péridotite (roches à nickel)'],['kan','Autres terrains'],['mis','Poussée de la plaque océanique',1]],
 mots:[['Péridotite','Roche sombre venue du manteau terrestre ; elle contient un peu de nickel.'],['Latérite','Terre rouge, riche en fer, formée par la pluie tropicale.'],['Garniérite','Minerai vert, riche en nickel.'],['Gisement','Endroit où un minerai est assez abondant pour être exploité.']],
 q:[['Comment s’appelle la roche qui contient le nickel ?','La péridotite.'],['Quelle part de la Grande Terre couvre-t-elle ?','Environ un tiers.'],['Où le nickel se concentre-t-il dans le sol ?','Sous la latérite, dans une couche plus verte, avec la garniérite.'],['Pourquoi les mines sont-elles en montagne ?','Parce que les gisements sont en haut des massifs.']],
 wiki:['Péridotite','Garniérite','Latérite','Massif du Sud (Nouvelle-Calédonie)']},

/* 3 --------------------------------------------------------------- */
{short:'Les premiers métaux (1864 – 1914)',col:'ere',dur:58,when:[1864,1914],dates:'1864 – 1914',
 cam:[nc(0),cam(6,164.38,-20.38,76),cam(19,164.38,-20.38,76),cam(23,166.2,-21.65,86),cam(31,166.2,-21.65,86),cam(36,166.65,-22.05,54),cam(44,166.65,-22.05,54),nc(50),nc(58)],
 zones:[Rg(GT,'kan',-5,0.25,0.01)].concat(massifs(-5,0.3)),
 routes:[
  r('ere',25,29,2.6,[[166.15,-21.67],[166.19,-21.64],[166.23,-21.6]],{straight:true,step:0.01}),
  r('mis',36,43,3,[[166.32,-21.55],[166.75,-21.86],[167.08,-22.12],[167.15,-22.4],[166.95,-22.5],[166.62,-22.43],[166.46,-22.29]],{ship:true,sp:'vapeur'})
 ],
 labels:[
  L(7,164.48,-20.33,'Fern Hill',{mark:'mine',sub:'or, années 1870',dx:10,dy:16,al:'left',zmin:30}),
  L(8,164.42,-20.35,'Ouégoa',{mark:'ville',dx:-10,dy:10,al:'right',zmin:30}),
  L(10,164.33,-20.28,'Pilou (Diahot)',{mark:'mine',sub:'cuivre',dx:-10,dy:-8,al:'right',zmin:30}),
  L(11,164.29,-20.23,'Pam',{mark:'port',dx:-10,dy:-8,al:'right',zmin:30}),
  at('tiebaghi',14,'Tiébaghi',{mark:'mine',sub:'chrome, cobalt',dx:-10,dy:8,al:'right',zmin:30}),
  at('thio',24,'Thio',{mark:'mine',sub:'nickel, dès 1875',dx:-10,dy:6,al:'right',zmin:30,gold:true}),
  at('thiom',26,'Thio-Mission',{mark:'port',sub:'wharf, petit train',dx:10,al:'left',zmin:30}),
  at('noumea',35,'Nouméa',{mark:'ville',dx:-12,dy:10,al:'right',zmin:12}),
  at('doniambo',38,'Doniambo',{mark:'usine',sub:'1910',dx:-12,dy:-10,al:'right',zmin:12})
 ],
 pulses:[Pu(24,166.16,-21.66,'#d6a56c',true)],
 ph:[
  Ph(0,'1864 : la garniérite','Jules Garnier découvre un minerai vert de nickel. Mais au début, ce sont l’or et le cuivre qui attirent les chercheurs de métaux vers le nord.','ere'),
  Ph(6,'Or et cuivre dans le Nord','Dans les années 1870, on exploite de l’or à Fern Hill, près d’Ouégoa, et du cuivre dans la vallée du Diahot. Le petit port de Pam expédie le minerai.','kan'),
  Ph(13,'Chrome et cobalt','Le massif de Tiébaghi a fourni environ 85 % du chrome calédonien. Vers 1900, la Nouvelle-Calédonie est aussi le premier producteur mondial de cobalt.','pol'),
  Ph(22,'Thio, capitale du nickel','À partir de 1875, les mines de Thio fournissent le nickel. Un petit train descend le minerai jusqu’au wharf de Thio-Mission, où on le charge sur des bateaux.','jade'),
  Ph(35,'1910 : une usine à Nouméa','Les bateaux contournent le sud de l’île jusqu’à Nouméa. En 1910, les premiers fourneaux de Doniambo transforment une partie du minerai sur place.','eur'),
  Ph(48,'Des mines partout','De nombreuses petites mines s’ouvrent sur la Grande Terre. Le travail est très dur ; on fait venir des travailleurs d’Asie et d’Océanie (voir le volet Histoire, chapitre 7).','kan')
 ],
 photos:[Sh('fernhill',7,13,'tr',2),Sh('pilon',13,19,'bl',-2,'contain'),Sh('thio1900',22,28,'tr',2,'contain'),Sh('thiotrain',28,34,'bl',-2,'contain'),Sh('tremie',36,43,'tr',2),Sh('lemire',48,56,'tr',2,'contain')],
 legend:[['ere','Mine (or, cuivre, chrome, nickel)','mine'],['mis','Wharf, port','port'],['lap','Usine','usine'],['eur','Ville','ville'],['mis','Trajet des bateaux',1]],
 mots:[['Wharf','Quai avancé dans la mer, où l’on charge les bateaux.'],['Chrome','Métal qui sert à rendre l’acier brillant et dur.'],['Cobalt','Métal qui sert aux alliages et aux colorants bleus.'],['Ruée','Arrivée rapide de beaucoup de gens qui espèrent s’enrichir.']],
 q:[['Quel métal exploite-t-on à Fern Hill ?','De l’or.'],['Quel métal sort surtout de Tiébaghi ?','Du chrome (et du cobalt).'],['Comment le minerai de Thio arrive-t-il au bateau ?','Par un petit train jusqu’au wharf de Thio-Mission.'],['En quelle année ouvre l’usine de Doniambo ?','En 1910.']],
 wiki:['Thio','Tiébaghi','Mine de Fern Hill','Usine de Doniambo']},

/* 4 --------------------------------------------------------------- */
{short:'Où sont les mines aujourd’hui ?',col:'pol',dur:60,when:[1990,2026],dates:'aujourd’hui',
 cam:[nc(0),nc(6),cam(8,164.55,-20.7,54),cam(18,164.55,-20.7,54),cam(21,165.95,-21.5,65),cam(30,165.95,-21.5,65),cam(33,166.88,-22.3,76),cam(40,166.88,-22.3,76),nc(46),nc(60)],
 zones:[Rg(GT,'kan',-5,0.25,0.01)].concat(massifs(1,0.45)),
 routes:[],
 labels:[
  at('tiebaghi',9,'Tiébaghi',{mark:'mine',dx:-10,al:'right',zmin:12}),
  at('poum',9.5,'Poum',{mark:'mine',dx:-10,al:'right',zmin:24}),
  at('ouaco',10.5,'Ouaco',{mark:'mine',dx:-10,al:'right',zmin:24}),
  at('koniambo',11.5,'Koniambo',{mark:'mine',sub:'KNS',dx:10,dy:-6,al:'left',zmin:12}),
  at('kopeto',12.5,'Népoui-Kopéto',{mark:'mine',sub:'SLN',dx:10,al:'left',zmin:12}),
  at('pouembout',13,'Pouembout',{mark:'star',dx:-10,dy:10,al:'right',zmin:24}),
  at('poro',22,'Poro',{mark:'mine',dx:10,dy:-6,al:'left',zmin:24}),
  at('kouaoua',23,'Kouaoua',{mark:'mine',sub:'SLN',dx:10,al:'left',zmin:12}),
  at('nakety',24,'Nakéty',{mark:'mine',dx:10,al:'left',zmin:24}),
  at('thio',25,'Thio',{mark:'mine',sub:'SLN',dx:10,al:'left',zmin:12}),
  L(34,166.97,-22.29,'Goro',{mark:'mine',sub:'Prony Resources',dx:10,dy:-6,al:'left',zmin:12}),
  at('noumea',35,'Nouméa',{mark:'ville',dx:-10,al:'right',zmin:12})
 ],
 pulses:[Pu(53,166.16,-21.66,'#fb7185',true),Pu(53,165.79,-21.44,'#fb7185',true)],
 ph:[
  Ph(0,'Des mines sur toute l’île','Aujourd’hui, des mines de nickel sont ouvertes du nord au sud de la Grande Terre, presque toujours sur les massifs de péridotite.','pol'),
  Ph(8,'Sur la côte Ouest','Tiébaghi, Poum, Ouaco, le Koniambo et Népoui-Kopéto : les massifs miniers dominent les plaines de l’Ouest. Le Koniambo est juste au-dessus de Pouembout.','pol'),
  Ph(20,'Sur la côte Est','Poro, Kouaoua, Nakéty et Thio : sur la côte Est, les mines sont proches de la mer, au-dessus de vallées étroites.','pol'),
  Ph(32,'Le Grand Sud','Au sud, le plateau de Goro alimente l’usine du Sud. Son minerai est pauvre en nickel, mais très abondant.','pol'),
  Ph(43,'Qui exploite ?','La SLN (la plus ancienne, depuis 1880), la SMSP (Société minière du Sud Pacifique, contrôlée par la province Nord), KNS (Koniambo Nickel), Prony Resources et de « petits mineurs » qui vendent le minerai brut à l’étranger.','kan'),
  Ph(52,'Des mines à l’arrêt','Depuis les violences de mai 2024, sept sites de la SLN sur la côte Est, dont trois à Thio, sont inaccessibles. La SLN espère en rouvrir quatre en 2026 et ceux de Thio en 2027.','ame')
 ],
 photos:[Sh('laterit',8,16,'tr',2),Sh('panoramavoh',20,28,'bl',-2),Sh('goromine',32,40,'tr',2),Sh('casque',43,51,'bl',-2),Sh('thiocentre',52,60,'tr',2)],
 legend:[['pol','Massifs de péridotite (roches à nickel)'],['ere','Mine de nickel','mine'],['eur','Ville','ville'],['ame','Site bloqué depuis 2024']],
 mots:[['Mine à ciel ouvert','Mine creusée en surface, en gradins, et non sous terre.'],['Exploitant','Entreprise qui a le droit d’extraire le minerai.'],['Petit mineur','Entreprise qui extrait du minerai pour le vendre brut, sans usine.']],
 q:[['Citer trois mines de la côte Ouest.','Par exemple Tiébaghi, Poum, Ouaco, le Koniambo, Népoui-Kopéto.'],['Citer deux mines de la côte Est.','Par exemple Thio, Kouaoua, Nakéty, Poro.'],['Quelle est la plus ancienne société minière ?','La SLN (Société Le Nickel), créée en 1880.'],['Quelle mine est la plus proche de Pouembout ?','Le Koniambo.']],
 wiki:['Société Le Nickel','Société minière du Sud Pacifique','Koniambo Nickel','Mine à ciel ouvert']},

/* 5 --------------------------------------------------------------- */
{short:'De la montagne à la mer',col:'mis',dur:60,dates:'aujourd’hui',
 cam:[cam(0,164.78,-21.05,104),cam(16,164.78,-21.05,104),cam(19,165.85,-21.45,94),cam(24,165.85,-21.45,94),cam(29,166.4,-21.95,22),cam(46,166,-21.7,20),nc(52),nc(60)],
 zones:[Rg(GT,'kan',-5,0.25,0.01)].concat(massifs(-5,0.35)),
 routes:[
  r('ere',3,8,3.2,[[164.79,-20.98],[164.74,-20.995],[164.69,-21.01]],{straight:true,step:0.01}),
  r('mis',10,16,3,[[164.68,-21.03],[164.63,-21.08],[164.52,-21.15],[164.25,-21.32],[163.6,-21.55]],{ship:true,sp:'mineralier'}),
  r('ere',19,22,3.2,[[165.78,-21.46],[165.81,-21.43],[165.84,-21.4]],{straight:true,step:0.01}),
  r('mis',25,35,3,[[165.88,-21.37],[166.3,-21.58],[166.78,-21.86],[167.1,-22.13],[167.16,-22.42],[166.95,-22.51],[166.62,-22.44],[166.45,-22.28]],{ship:true,sp:'mineralier'}),
  r('mis',36,44,3,[[165.0,-21.37],[165.4,-21.66],[165.8,-21.95],[166.15,-22.15],[166.42,-22.25]],{ship:true,sp:'mineralier'})
 ],
 labels:[
  at('koniambo',1,'Mine du Koniambo',{mark:'mine',dx:10,dy:-8,al:'left',zmin:40}),
  at('vavouto',4,'Vavouto',{mark:'usine',sub:'usine et port',dx:-10,dy:10,al:'right',zmin:40}),
  at('voh',5,'Voh',{mark:'ville',dx:-10,al:'right',zmin:40}),
  at('kone',5.5,'Koné',{mark:'ville',dx:10,al:'left',zmin:40}),
  at('pouembout',6,'Pouembout',{mark:'star',dx:10,dy:8,al:'left',zmin:40}),
  L(12,164.5,-21.15,'passe',{nomark:true,dy:-14,zmin:40}),
  at('kouaoua',19,'Mine de Kouaoua',{mark:'mine',dx:-10,dy:8,al:'right',zmin:40}),
  at('kouaouam',21,'bord de mer',{mark:'port',dx:10,dy:-8,al:'left',zmin:40}),
  at('doniambo',30,'Doniambo',{mark:'usine',dx:-10,dy:10,al:'right',zmin:12}),
  at('nepoui',36,'Népoui',{mark:'port',dx:-10,al:'right',zmin:12}),
  at('thiom',30,'Thio',{mark:'port',dx:10,al:'left',zmin:12})
 ],
 pulses:[],
 ph:[
  Ph(0,'1. Extraire','À la mine, des pelles géantes creusent la montagne en gradins. On trie : seule la partie riche part à l’usine ; le reste (les stériles) est stocké sur place.','pol'),
  Ph(4,'2. Descendre','Au Koniambo, un convoyeur d’une dizaine de kilomètres descend le minerai jusqu’à l’usine de Vavouto. Ailleurs, des camions roulent sur des pistes de montagne.','ere'),
  Ph(10,'3. Sortir du lagon','Un chenal de plus de 4 km a été creusé dans le lagon pour que les grands navires atteignent le port de Vavouto, puis sortent par une passe du récif.','mis'),
  Ph(18,'Sur la côte Est','À Kouaoua, le minerai descend vers le bord de mer, où il est stocké avant d’être chargé. En 2026, la SLN construit une piste et quatre ponts le long de la rivière pour reprendre le transport.','ere'),
  Ph(25,'4. Vers l’usine','Des minéraliers apportent le minerai jusqu’à Doniambo. Depuis la côte Est, ils contournent le sud de la Grande Terre ; depuis Népoui, ils restent dans le lagon de la côte Ouest.','mis'),
  Ph(45,'Une géographie des flux','Mine en montagne, transport, bord de mer, bateau, usine : chaque étape a sa place. On peut tout dessiner sur un croquis, avec des flèches et une légende.','kan')
 ],
 photos:[Sh('excavatrice',0,4,'tr',2),Sh('kouaouaconv',4,10,'tr',2),Sh('vraquier',10,17,'bl',-2),Sh('thiowharf',36,44,'tr',2),Sh('chaine',45,56,'tr',2,'contain')],
 legend:[['ere','Convoyeur, piste, train'],['mis','Trajet des minéraliers',1],['ere','Mine','mine'],['mis','Port, wharf, bord de mer','port'],['lap','Usine','usine']],
 mots:[['Convoyeur','Long tapis roulant qui transporte le minerai.'],['Minéralier','Grand navire qui transporte du minerai en vrac.'],['Chenal','Passage creusé et balisé pour les bateaux.'],['Passe','Ouverture dans le récif qui permet de sortir du lagon.'],['Flux','Déplacement de marchandises ou de personnes d’un lieu à un autre.']],
 q:[['Comment le minerai du Koniambo arrive-t-il à l’usine ?','Par un convoyeur d’une dizaine de kilomètres.'],['Pourquoi a-t-on creusé un chenal à Vavouto ?','Pour que les grands navires puissent traverser le lagon jusqu’au port.'],['Quel trajet fait un minéralier entre Kouaoua et Nouméa ?','Il longe la côte Est puis contourne le sud de la Grande Terre.'],['Dans quel ordre se suivent les étapes ?','Mine, transport, bord de mer, bateau, usine.']],
 wiki:['Convoyeur','Vraquier','Kouaoua','Voh (Nouvelle-Calédonie)']},

/* 6 --------------------------------------------------------------- */
{short:'Les trois usines',col:'lap',dur:62,when:[1910,2026],dates:'1910 – aujourd’hui',
 cam:[nc(0),cam(5,166.5,-22.22,94),cam(12,166.7,-22.22,72),cam(28,166.7,-22.22,72),cam(31,164.78,-21.02,94),cam(42,164.78,-21.02,94),cam(46,148,4,1.45),cam(55,148,4,1.45),nc(62)],
 zones:[Rg(GT,'kan',-5,0.25,0.01)].concat(massifs(-5,0.3)),
 routes:[
  r('kan',13,16,2.4,[[166.88,-22.15],[166.7,-22.2],[166.55,-22.24],[166.44,-22.25]],{straight:true,dash:true,step:0.01}),
  r('mis',47,55,3,[[164.6,-20.4],[163.6,-18.5],[160.5,-12.5],[155.8,-7.6],[152.6,-4.2],[149,2],[141,14],[133,26],[128.6,32.8],[127.75,34.75]],{ship:true,sp:'mineralier'})
 ],
 labels:[
  at('noumea',4,'Nouméa',{mark:'ville',dx:10,dy:10,al:'left',zmin:30}),
  at('doniambo',6,'Doniambo',{mark:'usine',sub:'1910 · SLN · ferronickel',dx:-12,dy:-10,al:'right',zmin:12,gold:true}),
  at('yate',13,'Barrage de Yaté',{mark:'barrage',sub:'1959',dx:10,dy:-8,al:'left',zmin:30}),
  at('goro',19,'Usine du Sud',{mark:'usine',sub:'2010 · Prony Resources',dx:10,al:'left',zmin:12,gold:true}),
  at('prony',21,'Port de Prony',{mark:'port',dx:-10,dy:10,al:'right',zmin:30}),
  at('vavouto',32,'Usine du Nord (Vavouto)',{mark:'usine',sub:'2013 · KNS · à l’arrêt depuis 2024',dx:-12,dy:10,al:'right',zmin:12,gold:true}),
  at('koniambo',33,'Koniambo',{mark:'mine',dx:10,dy:-8,al:'left',zmin:30}),
  L(48,127.7,34.9,'Gwangyang (Corée du Sud)',{mark:'usine',sub:'usine SNNC, 2008',dx:12,al:'left',zmax:6}),
  L(48,165.5,-21.3,'Nouvelle-Calédonie',{nomark:true,gold:true,dx:12,dy:16,al:'left',zmax:6})
 ],
 pulses:[Pu(6,166.43,-22.25,'#b794f6',true)],
 ph:[
  Ph(0,'Transformer sur place','Transformer le minerai rapporte plus que le vendre brut. La Nouvelle-Calédonie a trois grandes usines : à Nouméa, dans le Grand Sud et dans le Nord.','lap'),
  Ph(5,'Doniambo (1910)','À Nouméa, l’usine de la SLN fond le minerai dans de grands fours électriques. Elle produit du ferronickel, un mélange de fer et de nickel. Il lui faut énormément d’électricité.','lap'),
  Ph(12,'Le barrage de Yaté (1959)','Ce barrage du Grand Sud a été construit pour fournir l’électricité de Doniambo. Son lac artificiel couvre environ 40 km².','mis'),
  Ph(18,'L’usine du Sud (2010)','Près de Goro, l’usine dissout le minerai pauvre avec de l’acide. Depuis 2021, elle s’appelle Prony Resources ; elle vend surtout un produit de nickel destiné aux batteries. Elle cherche un repreneur.','lap'),
  Ph(30,'L’usine du Nord (2013)','À Vavouto, entre Voh et Koné, la société KNS (Koniambo Nickel) coule son premier métal en avril 2013, avec le minerai du Koniambo. Faute de repreneur, l’usine est à l’arrêt depuis 2024.','lap'),
  Ph(45,'Une usine de l’autre côté du monde','En 2008, la SMSP ouvre avec un partenaire coréen l’usine SNNC, à Gwangyang, en Corée du Sud. Le minerai calédonien y voyage en minéralier.','mis')
 ],
 photos:[Sh('doniambo2',5,12,'tr',2),Sh('yate',12,18,'bl',-2),Sh('yatechantier',13,18,'tr',2,'contain'),Sh('prony',19,29,'tr',2),Sh('panoramavoh',31,42,'tr',2),Sh('ferronickel',53,60,'bl',-2)],
 legend:[['lap','Usine métallurgique','usine'],['mis','Barrage hydroélectrique','barrage'],['mis','Port','port'],['kan','Électricité vers Doniambo',1],['mis','Minerai vers la Corée du Sud',1]],
 mots:[['Métallurgie','Industrie qui transforme le minerai en métal.'],['Ferronickel','Alliage de fer et de nickel produit dans des fours.'],['Barrage hydroélectrique','Mur qui retient l’eau d’une rivière pour produire de l’électricité.']],
 q:[['Où se trouvent les trois usines ?','À Doniambo (Nouméa), près de Goro (Grand Sud) et à Vavouto (entre Voh et Koné).'],['À quoi sert le barrage de Yaté ?','À produire l’électricité de l’usine de Doniambo.'],['Pourquoi l’usine du Nord est-elle à l’arrêt ?','Son actionnaire Glencore s’est retiré en 2024 et aucun repreneur n’a encore été choisi.'],['Où se trouve l’usine SNNC ?','À Gwangyang, en Corée du Sud.']],
 wiki:['Usine de Doniambo','Barrage de Yaté','Prony Resources','Koniambo Nickel']},

/* 7 --------------------------------------------------------------- */
{short:'Le Nord, VKP et le rééquilibrage',col:'afr',dur:58,when:[1988,2026],dates:'1988 – aujourd’hui',
 cam:[nc(0),nc(10),cam(12,164.6,-20.65,54),cam(17,164.6,-20.65,54),cam(20,164.82,-21.05,112),cam(42,164.82,-21.05,112),nc(48),nc(58)],
 zones:[Rg(PROV.nord,'afr',1,0.32,2),Rg(PROV.sud,'mis',2,0.25,2),Rg(PROV.iles,'xet',3,0.35,2),Rg([164.8,-21.04,0.1],'kan',20,0.45,2)],
 routes:[
  r('afr',12,16,2.6,[[164.09,-20.29],[164.4,-20.55],[164.8,-20.97]],{dash:true}),
  r('afr',12.5,16.5,2.6,[[164.86,-20.96],[164.45,-20.52],[164.12,-20.25]],{dash:true})
 ],
 labels:[
  L(1,165.1,-20.75,'Province Nord',{nomark:true,big:true,zmax:28}),
  L(2,166.45,-22.0,'Province Sud',{nomark:true,big:true,zmax:28}),
  L(3,167.6,-20.6,'Province des îles Loyauté',{nomark:true,dx:12,al:'left',zmax:28}),
  at('noumea',2,'Nouméa',{mark:'ville',dx:-10,al:'right',zmax:28}),
  at('poum',12,'Poum',{mark:'mine',sub:'→ SLN',dx:-10,al:'right',zmin:26,zmax:40}),
  at('koniambo',12,'Koniambo',{mark:'mine',sub:'→ SMSP',dx:10,al:'left',zmin:26}),
  at('vavouto',21,'Vavouto',{mark:'usine',dx:-12,dy:10,al:'right',zmin:40}),
  at('voh',22,'Voh',{mark:'ville',dx:-10,dy:-6,al:'right',zmin:40}),
  at('kone',22.5,'Koné',{mark:'ville',sub:'chef-lieu de la province Nord',dx:12,al:'left',zmin:40}),
  at('pouembout',23,'Pouembout',{mark:'star',dx:12,dy:6,al:'left',zmin:40}),
  L(24,164.62,-21.15,'VKP',{nomark:true,gold:true,big:true,zmin:40})
 ],
 pulses:[Pu(23,164.9,-21.13,'#ffd166',true),Pu(35,164.73,-21.01,'#fb7185',true)],
 ph:[
  Ph(0,'Un pays déséquilibré','Pendant longtemps, les emplois, les écoles et les entreprises se concentrent autour de Nouméa, dans le Sud. Le Nord reste surtout rural.','mis'),
  Ph(6,'Le rééquilibrage','En 1988, les accords de Matignon créent trois provinces. La province Nord veut développer son territoire grâce au nickel.','afr'),
  Ph(12,'L’échange des massifs (1998)','Avec l’accord de Bercy, la SMSP (province Nord) obtient le riche massif du Koniambo ; la SLN reçoit en échange celui de Poum. C’était la condition posée avant de signer l’accord de Nouméa : le « préalable minier ».','afr'),
  Ph(20,'VKP grandit','Avec la construction de l’usine (2006 – 2013), Voh, Koné et Pouembout se transforment : nouveaux quartiers, commerces, services, routes. On parle de la zone VKP.','kan'),
  Ph(33,'2024 : l’usine s’arrête','Après le retrait de Glencore, l’usine est mise en sommeil puis arrêtée le 31 août 2024 : c’est le dernier jour de travail pour environ 1 200 salariés. Des repreneurs étudient le dossier.','ame'),
  Ph(45,'Habiter un territoire minier','La mine et l’usine apportent des emplois, mais quand tout dépend d’une seule activité, une crise touche toute la région. C’est une grande question pour l’avenir de VKP.','kan')
 ],
 photos:[Sh('vkpmap',20,27,'tr',2,'contain'),Sh('kone',27,33,'tr',2),Sh('konemairie',27,33,'bl',-2),Sh('pigeonnier',38,45,'tr',2),Sh('coeurvoh',46,54,'tr',2)],
 legend:[['afr','Province Nord'],['mis','Province Sud'],['xet','Province des îles Loyauté'],['kan','Zone VKP (Voh-Koné-Pouembout)'],['afr','Échange des massifs (1998)',1]],
 mots:[['Rééquilibrage','Politique qui veut mieux répartir les emplois et les services entre le Nord, les îles et le Sud.'],['Province','L’une des trois grandes collectivités du pays.'],['Préalable minier','Condition posée avant l’accord de Nouméa : donner au Nord un grand massif de nickel.'],['Mise en sommeil','Arrêt d’une usine en la gardant en état de redémarrer.']],
 q:[['Que veut dire VKP ?','Voh-Koné-Pouembout, la zone autour de l’usine du Nord.'],['Quels massifs ont été échangés en 1998 ?','Le Koniambo (pour la SMSP) contre Poum (pour la SLN).'],['Pourquoi a-t-on voulu une usine dans le Nord ?','Pour rééquilibrer le pays : créer des emplois et des services hors de Nouméa.'],['Que s’est-il passé en 2024 ?','L’usine du Nord a été arrêtée faute de repreneur.']],
 wiki:['Voh-Koné-Pouembout','Accords de Bercy','Province Nord (Nouvelle-Calédonie)','Koné']},

/* 8 --------------------------------------------------------------- */
{short:'Le nickel voyage dans le monde',col:'zh',dur:60,when:[2020,2026],dates:'aujourd’hui',
 cam:[nc(0),cam(6,145,8,1.4),cam(26,145,8,1.4),cam(30,123,-1,2.6),cam(40,123,-1,2.6),cam(44,145,8,1.4),cam(54,160,-12,1.2),cam(60,160,-12,1.2)],
 zones:[],
 routes:[
  r('zh',8,16,3,[[164.6,-20.4],[163.6,-18.5],[160.5,-12.5],[155.8,-7.6],[152.6,-4.2],[147,4],[137,17],[128,26],[123.5,30.5],[122.2,31]],{ship:true,sp:'mineralier'}),
  r('gbr',9,17,3,[[164.6,-20.4],[163.6,-18.5],[160.5,-12.5],[155.8,-7.6],[152.6,-4.2],[149,6],[144,20],[139,30],[134.5,33.2],[131.9,32.6]],{ship:true,sp:'mineralier'}),
  r('aus',10,18,3,[[164.6,-20.4],[163.6,-18.5],[160.5,-12.5],[155.8,-7.6],[152.6,-4.2],[148,5],[140,17],[132,28],[128.6,32.8],[127.75,34.75]],{ship:true,sp:'mineralier'}),
  r('lap',19,25,2.6,[[165.5,-23.3],[157,-30],[140,-38],[118,-38],[100,-25],[80,-5],[60,8],[45,14],[33,30],[20,36],[5,38],[-2,46]],{ship:true,sp:'mineralier',dash:true})
 ],
 labels:[
  L(1,165.5,-21.3,'Nouvelle-Calédonie',{nomark:true,gold:true,dx:12,dy:16,al:'left',zmax:12}),
  L(14,118.5,32,'Chine',{nomark:true,big:true,sub:'premier client du pays',zmax:6}),
  L(15,138.5,36.5,'Japon',{nomark:true,big:true,dx:10,al:'left',zmax:6}),
  L(16,127.8,37,'Corée du Sud',{nomark:true,dy:-12,zmax:6}),
  L(24,10,44,'Europe',{nomark:true,big:true,zmax:6}),
  L(31,121.5,-2.5,'Indonésie',{nomark:true,big:true,sub:'environ 60 % du nickel mondial (2024)',dy:26,zmax:8}),
  L(32,122.2,-2.8,'Morowali',{mark:'usine',dx:10,al:'left',zmin:2,zmax:8}),
  L(34,122,12.5,'Philippines',{nomark:true,sub:'autre grand producteur de minerai',zmax:8})
 ],
 pulses:[Pu(31,122.2,-2.8,'#fb7185',true),Pu(34,122,12.5,'#fb7185',true)],
 ph:[
  Ph(0,'Où part le nickel ?','Presque tout le nickel calédonien est vendu à l’étranger, surtout en Asie. En valeur, environ 9 exportations du pays sur 10 sont des produits du nickel.','zh'),
  Ph(7,'Le minerai brut','Les minéraliers emportent du minerai non transformé vers la Corée du Sud, la Chine et le Japon, où des usines le transforment.','zh'),
  Ph(19,'Les produits des usines','Le ferronickel de Doniambo et le produit de nickel de l’usine du Sud partent vers des usines d’acier et de batteries, en Asie et en Europe.','lap'),
  Ph(28,'Un concurrent géant','En quelques années, l’Indonésie est devenue le premier producteur mondial : environ 31 % du nickel du monde en 2020, environ 60 % en 2024. Son nickel coûte moins cher à produire.','ame'),
  Ph(42,'À quoi sert le nickel ?','Surtout à fabriquer l’acier inoxydable : casseroles, éviers, couverts, bâtiments. Il sert aussi aux batteries des voitures électriques et à des pièces de monnaie.','kan'),
  Ph(52,'Un marché mondial','Le prix du nickel change selon l’offre et la demande dans le monde. Quand il baisse, les mines et les usines calédoniennes perdent de l’argent.','eur')
 ],
 photos:[Sh('vraquier2',8,16,'bl',-2),Sh('indonesie',28,39,'tr',2,'contain'),Sh('morowali',31,39,'bl',-2),Sh('inox',42,48,'tr',2),Sh('batterie',47,52,'bl',-2),Sh('piece',52,58,'tr',2)],
 legend:[['zh','Minerai vers la Chine',1],['gbr','Minerai vers le Japon',1],['aus','Minerai vers la Corée du Sud',1],['lap','Produits des usines vers l’Europe',1],['ame','Grands concurrents (Indonésie, Philippines)']],
 mots:[['Exportation','Vente de marchandises à un autre pays.'],['Concurrence','Rivalité entre pays ou entreprises qui vendent le même produit.'],['Acier inoxydable','Acier qui ne rouille pas, grâce au nickel et au chrome.'],['Matière première','Produit tiré de la nature, avant transformation.']],
 q:[['Quel est le premier client de la Nouvelle-Calédonie ?','La Chine, qui achète surtout les produits des usines (ferronickel et produit de nickel pour les batteries).'],['Quel pays est le premier producteur mondial de nickel ?','L’Indonésie (environ 60 % en 2024).'],['À quoi sert surtout le nickel ?','À fabriquer de l’acier inoxydable.'],['Pourquoi une baisse du prix du nickel est-elle grave pour le pays ?','Parce que la plupart des exportations sont du nickel : mines et usines perdent de l’argent.']],
 wiki:['Nickel','Acier inoxydable','Morowali','Accumulateur lithium-ion']},

/* 9 --------------------------------------------------------------- */
{short:'Mines et environnement',col:'xet',dur:60,dates:'aujourd’hui',
 cam:[nc(0),cam(5,166.2,-21.64,83),cam(16,166.2,-21.64,83),cam(19,166.85,-22.2,79),cam(36,166.85,-22.2,79),nc(42),cam(46,165.5,-20.9,15),cam(60,165.5,-20.9,15)],
 zones:[Rg(GT,'kan',-5,0.25,0.01)].concat(massifs(-5,0.3)).concat([
  ].concat(NCG.unesco.map(function(u,i){return {k:'poly',ring:u[1],col:'aus',a:0.6,t0:46+i*0.4,fade:2,nostroke:true};}))),
 routes:[r('pol',6,10,3,[[166.12,-21.7],[166.18,-21.65],[166.24,-21.6],[166.32,-21.57]],{straight:true,step:0.01})],
 labels:[
  at('thio',5,'Thio',{mark:'mine',dx:-10,al:'right',zmin:30}),
  L(8,166.3,-21.55,'boue rouge vers le lagon',{nomark:true,dx:10,al:'left',zmin:30}),
  at('goro',20,'Usine du Sud',{mark:'usine',dx:10,al:'left',zmin:30}),
  L(21,166.98,-22.24,'rivière Kwé',{nomark:true,dx:10,al:'left',zmin:30}),
  L(23,166.88,-22.37,'creek de la Baie Nord',{nomark:true,dx:-10,dy:10,al:'right',zmin:30}),
  L(28,166.66,-22.1,'Parc de la Rivière Bleue',{sub:'maquis minier protégé',dx:-10,dy:-8,al:'right',zmin:30}),
  at('yate',30,'Lac de Yaté',{nomark:true,dx:10,dy:-10,al:'left',zmin:30}),
  L(47,163.4,-19.2,'Lagons inscrits au patrimoine mondial (2008)',{nomark:true,gold:true,al:'right',dx:-10})
 ],
 pulses:[],
 ph:[
  Ph(0,'Des montagnes ouvertes','Une mine enlève la végétation et la terre. Sur les pentes nues, la pluie emporte la terre rouge vers les rivières et le lagon : c’est l’érosion.','pol'),
  Ph(7,'Les rivières pleines de boue','Pendant longtemps, on poussait les déblais (les stériles) dans la pente. Autour de Thio et ailleurs, des rivières se sont remplies de boue rouge. Aujourd’hui, les stériles doivent être stockés et protégés.','ere'),
  Ph(18,'Le Grand Sud','Près de l’usine du Sud, des fuites d’acide ont pollué le creek de la Baie Nord en 2009 et en 2014. Les rivières, comme la Kwé, sont surveillées par un observatoire de l’environnement.','ame'),
  Ph(27,'Un trésor vivant','Sur les sols miniers pousse le maquis minier. Environ trois plantes sur quatre de Nouvelle-Calédonie ne poussent nulle part ailleurs : on les dit endémiques.','xet'),
  Ph(36,'Replanter','Après l’exploitation, on remodèle le terrain et on replante des espèces locales, cultivées en pépinière. C’est la revégétalisation : c’est long et difficile.','xet'),
  Ph(45,'Le lagon, patrimoine mondial','Depuis 2008, une grande partie des lagons calédoniens est inscrite au patrimoine mondial de l’UNESCO. Protéger le lagon, c’est aussi surveiller ce que les rivières y apportent.','aus')
 ],
 photos:[Sh('rivrouge',0,7,'tr',2),Sh('paysagesud',7,15,'bl',-2),Sh('tailings',18,26,'tr',2),Sh('maquis',27,35,'tr',2),Sh('rivbleue',36,44,'bl',-2),Sh('lagonsat',46,54,'tr',2)],
 legend:[['aus','Lagons inscrits à l’UNESCO (2008)'],['pol','Massifs de péridotite (roches à nickel)'],['ere','Mine','mine'],['lap','Usine','usine'],['pol','Terre emportée par l’érosion']],
 mots:[['Érosion','Usure du sol par la pluie, le vent ou les rivières.'],['Stériles','Roches et terres sans assez de métal, retirées pour atteindre le minerai.'],['Endémique','Qui ne vit nulle part ailleurs dans le monde.'],['Revégétalisation','Replanter une végétation sur un terrain abîmé.'],['Patrimoine mondial','Lieux protégés pour toute l’humanité par l’UNESCO.']],
 q:[['Pourquoi les rivières près des mines deviennent-elles rouges ?','Parce que la pluie emporte la terre des pentes nues (érosion).'],['Que veut dire « endémique » ?','Qui ne vit nulle part ailleurs dans le monde.'],['Depuis quand les lagons sont-ils au patrimoine mondial ?','Depuis 2008.'],['Comment répare-t-on une ancienne mine ?','On remodèle le terrain et on replante des plantes locales.']],
 wiki:['Lagons de Nouvelle-Calédonie','Maquis minier','Endémisme','Parc provincial de la Rivière Bleue']},

/* 10 -------------------------------------------------------------- */
{short:'Un pays qui vit du nickel',col:'kan',dur:56,when:[2024,2026],dates:'2024 – 2026',
 cam:[nc(0),cam(9,166.45,-22.27,104),cam(18,166.45,-22.27,104),nc(24),nc(56)],
 zones:[Rg(GT,'kan',-5,0.25,0.01)],
 routes:[],
 labels:[
  at('doniambo',10,'Doniambo',{mark:'usine',sub:'produit, avec l’aide de l’État',dx:-12,dy:-8,al:'right'}),
  at('goro',22,'Usine du Sud',{mark:'usine',sub:'tourne, cherche un repreneur',dx:10,al:'left',zmin:12}),
  at('vavouto',23,'Usine du Nord',{mark:'usine',sub:'à l’arrêt, offre de rachat en 2026',dx:-12,dy:8,al:'right',zmin:12}),
  at('thio',24,'Thio',{mark:'mine',sub:'reprise espérée en 2027',dx:10,dy:6,al:'left',zmin:12}),
  at('kouaoua',24.5,'Kouaoua',{mark:'mine',sub:'piste et ponts en travaux',dx:10,dy:-8,al:'left',zmin:12}),
  at('kopeto',25,'Népoui-Kopéto',{mark:'mine',dx:-10,dy:-8,al:'right',zmin:12}),
  at('tiebaghi',25.5,'Tiébaghi',{mark:'mine',dx:-10,al:'right',zmin:12}),
  at('pouembout',44,'Pouembout',{mark:'star',dx:-10,dy:10,al:'right',zmin:12})
 ],
 pulses:[Pu(22,166.95,-22.29,'#86efac',true),Pu(22,166.43,-22.25,'#86efac',true),Pu(23,164.73,-21.01,'#fb7185',true),Pu(24,166.16,-21.66,'#fb7185',true)],
 ph:[
  Ph(0,'Le nickel fait vivre le pays','La mine et la métallurgie font travailler des milliers de personnes, directement ou par la sous-traitance : transport, entretien, commerces.','kan'),
  Ph(9,'Une crise grave','Prix bas, électricité chère, concurrence de l’Indonésie, puis violences de mai 2024 : les usines perdent beaucoup d’argent. L’État français prête de l’argent pour les maintenir.','ame'),
  Ph(20,'Où en est-on fin 2026 ?','Doniambo produit, avec l’aide de l’État. L’usine du Sud tourne mais cherche toujours un repreneur. L’usine du Nord est à l’arrêt ; un groupe chinois a fait une offre de rachat en 2026.','eur'),
  Ph(32,'Et demain ?','Les pistes discutées : rouvrir les mines bloquées, baisser le prix de l’électricité, recycler les déchets des fours (les scories), trouver de nouveaux clients (Europe, États-Unis). La situation change vite.','kan'),
  Ph(44,'À toi, géographe','Sur une carte muette de la Nouvelle-Calédonie, place les mines, les usines, les ports et les flux. Tu verras comment le nickel organise tout le territoire.','kan')
 ],
 photos:[Sh('noumeaport',9,17,'tr',2),Sh('doniambo',10,17,'bl',-2),Sh('chaudiere',32,40,'tr',2,'contain'),Sh('chartenoumea',44,52,'tr',2,'contain')],
 legend:[['xet','Site en activité'],['ame','Site à l’arrêt ou bloqué'],['lap','Usine','usine'],['ere','Mine','mine']],
 mots:[['Économie','Ensemble des activités qui produisent et échangent des richesses.'],['Sous-traitance','Travail confié par une grande entreprise à d’autres entreprises.'],['Repreneur','Entreprise qui rachète une usine pour la faire fonctionner.'],['Diversifier','Développer d’autres activités pour ne pas dépendre d’une seule.']],
 q:[['Pourquoi dit-on que le pays dépend du nickel ?','Parce que le nickel fournit la plupart des exportations et beaucoup d’emplois.'],['Citer deux causes de la crise du nickel.','Le prix bas, l’électricité chère, la concurrence indonésienne, les violences de 2024.'],['Quelle usine est à l’arrêt en 2026 ?','L’usine du Nord, à Vavouto.'],['Que veut dire « diversifier » l’économie ?','Développer d’autres activités pour ne pas dépendre d’une seule.']],
 wiki:['Économie de la Nouvelle-Calédonie','Nickel en Nouvelle-Calédonie','Société Le Nickel','Prony Resources']}
];

A.add({id:'nickel',title:'Le nickel',tag:'9 chapitres · massifs, mines, usines, flux, VKP',col:'jade',proj:'globe',
 sub:'La géographie du nickel en 9 cartes : comprendre les roches, localiser mines, usines et ports, suivre les flux jusqu’en Asie, mesurer les effets sur l’environnement et sur la vie du pays.',
 frise:{from:1860,to:2026,lin:true,ticks:[[1864,'1864'],[1910,'1910'],[1959,'1959',1],[1988,'1988'],[1998,'1998',1],[2013,'2013'],[2024,'2024']]},
 info:'<p><b>Géographie, cycle 3 et collège</b> : localiser une ressource, lire une carte et sa légende (▲ mine, ■ usine, ⚓ port, ▬ barrage), comprendre des flux, habiter un territoire minier (VKP), environnement et développement.</p><p><b>Collège, programmes adaptés</b> : 3e, géographie, thème 2 « Aménager la Nouvelle-Calédonie : vers le rééquilibrage » (chapitre 6) ; 5e, thème 3, risques industriels, exemple en Océanie (chapitre 8).</p><p><b>Croquis</b> : l’export PDF en carte muette ou vierge donne un fond de croquis par chapitre ; « Placer les noms » et le quiz marchent aussi sur ce volet.</p><p><b>Neutralité</b> : les chapitres 6 et 9 s’en tiennent aux faits datés (accords, arrêt de l’usine du Nord, aides de l’État) et ne prennent pas position.</p><p><b>Actualité</b> : situation des usines et des mines vérifiée en novembre 2026 (Les Nouvelles Calédoniennes, SLN, SMSP, IEOM) ; elle change vite.</p><p><b>Schémas</b> : contours des massifs, des lagons classés et des trajets tracés à grands traits ; les schémas « profil du sol », « chaîne du nickel », « coupe ouest-est » et le graphique sont des documents simplifiés réalisés pour l’atlas.</p>',
 chapters:CH});
})();
