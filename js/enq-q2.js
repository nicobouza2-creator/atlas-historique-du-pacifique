/* Atlas historique du Pacifique · Atlas d’histoire — Collège — © 2026 Nicolas BOUZA. Idée, conception et réalisation : Nicolas BOUZA,
   avec l’assistance de Claude (Anthropic). Licence CC BY-NC-ND 4.0. https://github.com/nicobouza2-creator/atlas-historique-du-pacifique */
/* Enquêtes — questions « école primaire » ajoutées le 16/11/2026 pour varier les types (33 enquêtes n'avaient que des QCM
   et des vrai/faux ; 4 pages n'avaient qu'une question). Types : texte à trous (T ; les trous se remplissent dans l'ordre, donc jamais deux trous interchangeables), relier (R), remise en ordre (O).
   A(volet, n° de chapitre à partir de 0, titre de la page, question) : la page est retrouvée par son titre.
   Titre introuvable : noté dans window.__q2miss (doit rester vide — vérifié par outils/tests). À charger après les enq-<volet>.js. */
(function(){
'use strict';
var EQ=window.EQ,ENQ=window.ENQ;if(!EQ||!ENQ)return;
var T=EQ.T,R=EQ.R,O=EQ.O,miss=window.__q2miss=[];
function norm(s){return String(s).replace(/\s+/g,' ').trim();}
function A(v,ci,titre,q){
  var E=(ENQ[v]||[])[ci],p=null;
  if(E)E.pg.forEach(function(x){if(norm(x.t)===norm(titre))p=x;});
  if(!p){miss.push(v+'-'+ci+' : '+titre);return;}
  if(!(p.p||[]).some(function(x){return x.q===q.q;}))(p.p=p.p||[]).push(q);
}
/* ── Vers le Pacifique et la Nouvelle-Calédonie ── */
A('pacifique',2,'Des mots qui se ressemblent',R('Relie chaque langue à sa façon de dire « deux ».',[['malais','dua'],['malgache','roa'],['hawaïen','lua']]));
A('pacifique',2,'Ce qu’il y a dans les pirogues',T('Dans leurs pirogues, les Austronésiens emportent des plantes, comme le [taro] et l’[igname], et des animaux, comme le [cochon].',['blé','cheval']));
A('pacifique',5,'L’arrivée',T('Vers 1100 av. J.-C., des pirogues [lapita] venues du [Vanuatu] arrivent sur une terre [vide].',['Japon','peuplée']));
A('pacifique',5,'Les fouilles de Foué',R('Relie ce que les archéologues ont trouvé à ce que cela nous apprend.',[['des morceaux de poterie','ils fabriquaient des pots décorés'],['des arêtes de poissons','ils pêchaient'],['des os de tortues','ils chassaient les tortues']]));
A('pacifique',6,'Au sommet du toit',R('Relie chaque mot à ce qu’il désigne.',[['la grande case','la case du chef'],['la flèche faîtière','la sculpture au sommet du toit'],['la tarodière','le champ de taro irrigué']]));
A('pacifique',6,'Cultiver les vallées',T('On cultive le [taro] dans des tarodières irriguées, et aussi l’[igname].',['riz','blé']));
A('pacifique',8,'Trois siècles de liens',T('Vers [1750], des Wallisiens arrivent à Ouvéa. En 1841, Tataïo et Taniela, venus de [Samoa], arrivent à [Maré].',['1492','Tahiti','Nouméa']));
/* ── Histoire de la Nouvelle-Calédonie ── */
A('caledonie',0,'Une terre de langues',R('Relie chaque aire coutumière à l’une de ses langues.',[['Paicî-Cèmuhi','paicî'],['Ajië Aro','ajië'],['Iaai (Ouvéa)','iaai']]));
A('caledonie',0,'Le pilou, une grande fête d’échanges',T('Le pilou est une grande [fête]. On y échange des [ignames], des semences, des nattes et des objets précieux.',['guerre','voitures']));
A('caledonie',1,'Des visiteurs de plus en plus nombreux',R('Relie chaque visiteur à sa date.',[['Cook à Balade','1774'],['d’Entrecasteaux','1793'],['la mission de Balade','1843']]));
A('caledonie',3,'Le bagne en dates',O('Remets dans l’ordre.',['Les premiers forçats débarquent à Nouméa','Les déportés de la Commune arrivent','Pouembout devient un centre pénitentiaire','Les convois de condamnés s’arrêtent']));
A('caledonie',3,'Les déportés de la Commune',T('En 1872, plus de 4 000 déportés de la [Commune] de Paris arrivent. Parmi eux, il y a Louise [Michel].',['Révolution','Bonaparte']));
A('caledonie',4,'Les colons libres',R('Relie chaque groupe de colons à son époque.',[['colons de La Réunion','années 1860'],['Alsaciens et Lorrains','après la guerre de 1870-1871'],['colons du gouverneur Feillet','1894 – 1902']]));
A('caledonie',4,'Les réserves',T('Vers 1900, les réserves ne couvrent plus qu’un [dixième] environ de la [Grande Terre].',['moitié','lagon']));
A('caledonie',5,'La guerre de 1878',T('La révolte éclate en [1878] autour de [La Foa]. Le grand chef [Ataï] est tué.',['1917','Nouméa','Cook']));
A('caledonie',7,'1914–1918 : partir à 17 000 km',T('Environ [2 000] Calédoniens partent se battre en France, à [17 000] km. Plus de [500] ne reviendront pas.',['100','50']));
A('caledonie',7,'1942 : les Américains',O('Remets dans l’ordre.',['La guerre de 1914 est déclarée','Le pays rejoint le général de Gaulle','Les soldats américains débarquent']));
A('caledonie',8,'De 1946 au nickel',R('Relie chaque date à son événement.',[['1946','fin de l’indigénat'],['1988','accords de Matignon'],['1998','accord de Nouméa']]));
/* ── Peupler la Terre ── */
A('monde',0,'Toumaï et Lucy',R('Relie chaque fossile au pays où on l’a trouvé.',[['Toumaï','Tchad'],['Lucy','Éthiopie']]));
A('monde',0,'Hors d’Afrique, très tôt',T('Homo erectus quitte l’[Afrique] à pied. On retrouve ses traces en Géorgie, en Chine, à [Java] et en Espagne.',['Amérique','Tahiti']));
A('monde',3,'Un os minuscule, une grande découverte',R('Relie chaque humanité à la région où elle vivait.',[['les Néandertaliens','Europe et Asie de l’Ouest'],['les Dénisoviens','Asie, de la Sibérie au Tibet']]));
A('monde',3,'Denny, enfant de deux humanités',T('Denny vivait il y a 90 000 ans. Sa mère était [néandertalienne] et son père [dénisovien].',['sapiens','erectus']));
A('monde',6,'Le premier blé',T('Vers 9500 av. J.-C., au [Proche-Orient], on sème du [blé] et de l’orge. On élève des chèvres et des [moutons].',['Pacifique','riz','chevaux']));
A('monde',6,'Une agriculture inventée plusieurs fois',R('Relie chaque région à une plante qu’on y a domestiquée.',[['Croissant fertile','le blé'],['Chine','le riz'],['Mésoamérique','le maïs'],['Nouvelle-Guinée','le taro']]));
/* ── Les Grandes Découvertes ── */
A('decouvertes',1,'Deux flottes face à face',R('Relie chaque chef à sa flotte.',[['Zheng He (1405)','jusqu’à 300 navires'],['Colomb (1492)','3 navires']]));
A('decouvertes',1,'La Chine s’arrête',T('En [1433], la Chine arrête ces voyages, jugés trop [chers]. Les [Portugais] arriveront dans l’océan Indien 60 ans plus tard.',['1492','courts','Français']));
A('decouvertes',3,'Le journal de bord',T('Le 12 octobre [1492], Colomb arrive à Guanahani. Il se croit aux [Indes] et appelle les habitants « [Indiens] ».',['1789','Japon']));
A('decouvertes',3,'Quatre voyages',O('Remets les voyages de Colomb dans l’ordre.',['Bahamas, Cuba, Hispaniola','Guadeloupe et Petites Antilles','Trinité et côte du Venezuela','Amérique centrale (Panama)']));
A('decouvertes',7,'Le récit d’un survivant',O('Remets dans l’ordre.',['Magellan part d’Espagne','Il trouve un passage au sud de l’Amérique','La flotte traverse le Pacifique']));
A('decouvertes',7,'Le bilan',T('Au départ, il y a [5] navires et environ 240 hommes. Au retour, il reste [1] navire et [18] hommes.',['3','100']));
A('decouvertes',11,'Le capitaine et sa frégate',T('En [1766], Bougainville part sur La [Boudeuse] avec un astronome et un [naturaliste].',['1492','Victoria','soldat']));
A('decouvertes',11,'Une femme autour du monde',R('Relie chaque personne à ce qu’elle a fait.',[['Bougainville','commande l’expédition'],['Jeanne Barret','première femme connue à faire le tour du monde'],['Ahutoru','le Tahitien qui part pour la France']]));
A('decouvertes',12,'Trois voyages',R('Relie chaque voyage à l’une de ses étapes.',[['1768 – 1771','la côte est de l’Australie'],['1772 – 1775','la Nouvelle-Calédonie'],['1776 – 1779','Hawaï']]));
A('decouvertes',12,'Balade, septembre 1774',T('En septembre [1774], Cook aborde à [Balade]. Il nomme l’île « New [Caledonia] ».',['1492','Nouméa','Zealand']));
A('decouvertes',14,'Une nouvelle image du monde',T('En moins d’un [siècle], les cartes montrent presque tout le globe : tous les [océans] sont reliés.',['jour','déserts']));
A('decouvertes',14,'L’échange colombien',T('De l’Amérique viennent le [maïs] et la [pomme de terre]. Vers l’Amérique partent le [cheval] et des maladies comme la variole.',['chameau','banquise']));
/* ── Géographie de la Nouvelle-Calédonie ── */
A('geonc',1,'Deux saisons',R('Relie chaque saison à son risque.',[['saison chaude et humide (novembre à avril)','les cyclones'],['saison fraîche et sèche (mai à septembre)','les feux de brousse']]));
A('geonc',1,'Se préparer',T('Pour réduire les risques, il faut prévoir, [alerter], construire [solidement] et s’entraîner.',['oublier','vite']));
A('geonc',2,'Le recensement de 2025',O('Range les provinces, de la plus peuplée à la moins peuplée.',['Province Sud','Province Nord','Province des îles Loyauté']));
A('geonc',2,'Le Grand Nouméa',T('Le Grand Nouméa regroupe Nouméa, Dumbéa, Mont-Dore et [Païta]. Environ [2] Calédoniens sur 3 y vivent.',['Koné','1']));
A('geonc',3,'Habiter en tribu',T('En tribu, on trouve la [chefferie], la grande [case] et le champ d’[ignames].',['mairie','tour','blé']));
A('geonc',3,'Habiter une île',R('Relie chaque lieu de vie à ce qu’on y trouve.',[['la ville','beaucoup de services et des embouteillages'],['le village de brousse','un bourg et des élevages autour'],['la tribu','la chefferie et le champ d’ignames'],['l’île','tout arrive par bateau ou par avion']]));
A('geonc',4,'Les lignes aériennes',O('Range les destinations, de la plus proche à la plus lointaine.',['Port-Vila (Vanuatu)','Sydney (Australie)','Paris']));
A('geonc',4,'Des câbles au fond de la mer',T('Le câble Gondwana-1 relie le pays à [Sydney] depuis 2008. Le câble Gondwana-2 le relie à [Fidji] depuis 2022.',['Paris','Tokyo']));
A('geonc',5,'La terre et la mer nourrissent',T('Sur la côte Ouest, on élève du [bétail]. En mer, on pêche le [thon]. On élève aussi la [crevette] bleue.',['saumon','chameau']));
A('geonc',5,'Les touristes',R('Relie les visiteurs à ce qu’ils viennent voir.',[['Australiens et Néo-Zélandais','le lagon, les îles, la plongée'],['Français de métropole','la famille, les paysages, la culture kanak'],['passagers des paquebots','Nouméa ou une île, pour une journée']]));
/* ── Le nickel ── */
A('nickel',0,'La pluie fabrique le minerai',O('Remets dans l’ordre.',['La péridotite recouvre la Grande Terre','La pluie tropicale attaque la roche','Le nickel se concentre sous la terre rouge']));
A('nickel',0,'Où sont les massifs ?',T('Les péridotites couvrent un [tiers] de la Grande Terre. Les gisements sont sur les [sommets].',['dixième','plages']));
A('nickel',4,'Le barrage de Yaté',T('Le barrage de [Yaté] (1959) fournit l’[électricité] de l’usine de Doniambo.',['Koné','essence']));
A('nickel',4,'Deux usines récentes',R('Relie chaque usine à son lieu.',[['Doniambo','Nouméa'],['l’usine du Sud','près de Goro'],['l’usine du Nord','Vavouto, entre Voh et Koné']]));
A('nickel',6,'Le minéralier',T('Le minerai brut part vers la Corée du Sud, la [Chine] et le [Japon].',['France','Brésil']));
A('nickel',6,'Un concurrent géant',T('L’[Indonésie] produisait 31 % du nickel mondial en 2020, et environ [60] % en 2024.',['Australie','10']));
A('nickel',7,'Le Grand Sud sous surveillance',O('Remets dans l’ordre.',['Première fuite d’acide dans le creek de la Baie Nord','Nouvelle fuite d’acide dans le même creek','Un observatoire surveille les rivières']));
A('nickel',7,'Un trésor vivant',T('Dans le maquis minier, environ [3] plantes sur 4 sont [endémiques] : elles n’existent nulle part ailleurs.',['1','communes']));
A('nickel',8,'Où en est-on fin 2026 ?',R('Relie chaque usine à sa situation fin 2026.',[['Doniambo','produit, avec l’aide de l’État'],['l’usine du Sud','cherche un repreneur'],['l’usine du Nord','à l’arrêt']]));
A('nickel',8,'Et demain ?',T('Pour l’avenir, on parle d’une électricité moins [chère], de [recycler] et de trouver de nouveaux [clients].',['rare','jeter','volcans']));
/* ── Le monde et la mondialisation ── */
A('mondial',3,'Foyers et déserts humains',T('Les trois grands foyers de peuplement sont l’Asie de l’[Est], l’Asie du [Sud] et l’[Europe].',['Antarctique','Ouest']));
A('mondial',3,'Serrés ou dispersés ?',O('Range du plus serré au plus dispersé (habitants par km²).',['Bangladesh','France','Nouvelle-Calédonie','Australie']));
A('mondial',4,'Le palmarès des géants',O('Range ces villes, de la plus peuplée à la moins peuplée.',['Jakarta','Dacca','Tokyo']));
A('mondial',4,'Ce qui attire en ville',T('Les emplois, les écoles et les hôpitaux attirent en [ville]. Mais il y a aussi des [embouteillages].',['brousse','lagons']));
A('mondial',7,'Les carrefours du ciel',T('Un grand aéroport qui relie tous les continents s’appelle un [hub]. Exemples : [Dubaï], Singapour, Londres, Atlanta.',['wharf','Pouembout']));
A('mondial',7,'Touristes et migrants',R('Relie.',[['les touristes internationaux','environ 1,4 milliard d’arrivées en 2024'],['les migrants','environ 300 millions de personnes']]));
A('mondial',9,'Une carte en couleurs',T('L’IDH tient compte de la [santé], de l’[éducation] et du niveau de [vie].',['météo','taille','mer']));
A('mondial',9,'Deux pays, deux vies',R('Relie chaque pays à son espérance de vie.',[['la Suisse','plus de 80 ans'],['le Niger','environ 60 ans']]));
A('mondial',10,'La mer monte',T('La mer est montée d’environ [20] cm depuis 1900 : l’eau se [dilate] en chauffant et les [glaces] fondent.',['200','gèle','roches']));
A('mondial',10,'Coraux et solutions',R('Relie chaque échelle à une action.',[['dans le monde','brûler moins de charbon, de pétrole et de gaz'],['chez nous','protéger les mangroves et les récifs']]));
/* ── Vivre ensemble (EMC) ── */
A('emc',4,'27 avril 1848',T('Le 27 avril [1848], la France abolit l’[esclavage], « un attentat contre la [dignité] humaine ».',['1789','école','richesse']));
A('emc',4,'Dans le Pacifique, et se souvenir',O('Remets les abolitions dans l’ordre.',['Royaume-Uni','France','États-Unis','Brésil']));
A('emc',6,'L’école laïque (1882)',T('En 1881-1882, l’école publique devient [gratuite] et laïque. L’instruction devient [obligatoire].',['payante','interdite']));
A('emc',6,'Des exceptions',R('Relie chaque territoire au texte qui s’y applique.',[['Alsace et Moselle','Concordat de 1801'],['Guyane','ordonnance de 1828'],['Nouvelle-Calédonie','décrets Mandel']]));
})();
