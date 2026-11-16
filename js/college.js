/* Espace collège (college.html) : programmes adaptés à la Nouvelle-Calédonie (6e-3e), fiche séance à la trame officielle,
   séquence et évaluation, rappels de méthode, suite du chantier.
   Sources : « Programmes adaptés d’histoire et de géographie du collège pour la Nouvelle-Calédonie » (vice-rectorat),
   programme d’EMC du CP à la terminale (2024), « Livret d’accueil de l’enseignant contractuel en Histoire-Géographie et EMC » (2026),
   grille de préparation de leçon (annexe 4 du livret). Les intitulés des thèmes sont ceux des programmes. */
(function(){
'use strict';
var A=window.ATLAS;if(!A||!A.api)return;
var api=A.api;
var PAC='https://nicobouza2-creator.github.io/atlas-historique-du-pacifique/';
var VN={monde:'Peupler la Terre',pacifique:'Vers le Pacifique',decouvertes:'Grandes Découvertes',caledonie:'Histoire de la NC',geonc:'Géographie de la NC',nickel:'Le nickel',mondial:'Monde et mondialisation',emc:'Vivre ensemble',colonies:'Conquêtes et sociétés coloniales'};
/* sous-thème : [intitulé, état ('ok' | 'part' | 'todo'), ressources, adaptation NC (1), remarque]
   ressource : ['P', volet de l'atlas du Pacifique, chapitres] ou ['C', volet de cet atlas, chapitres] */
var PROG={
'6e':{
 H:[
  {t:'Thème 1 — La longue histoire de l’humanité et des migrations',s:[
   ['Les débuts de l’humanité','ok',[['P','monde','ch. 1 à 6']]],
   ['La « révolution » néolithique','ok',[['P','monde','ch. 7']]],
   ['Le peuplement du Pacifique','ok',[['P','pacifique','ch. 3 à 9'],['P','monde','ch. 8']],1],
   ['Premiers États, premières écritures','todo',[],0,'Orient ancien : Égypte ou Mésopotamie']]},
  {t:'Thème 2 — Récits fondateurs, croyances et citoyenneté dans la Méditerranée antique au Ier millénaire avant J.-C.',s:[
   ['Le monde des cités grecques','todo',[]],['Rome du mythe à l’histoire','todo',[]],['La naissance du monothéisme juif dans un monde polythéiste','todo',[]]]},
  {t:'Thème 3 — L’empire romain dans le monde antique',s:[
   ['Conquêtes, paix romaine et romanisation','todo',[]],['Des chrétiens dans l’empire','todo',[]],
   ['Les relations de l’empire romain avec les autres mondes anciens : l’ancienne route de la soie et la Chine des Han','todo',[]]]}],
 G:[
  {t:'Thème 1 — Habiter une métropole',s:[['Les métropoles et leurs habitants','part',[['P','mondial','ch. 5']]],['La ville de demain','todo',[]]]},
  {t:'Thème 2 — Habiter un espace de faible densité',s:[
   ['Habiter un espace à forte(s) contrainte(s) naturelle(s) ou/et de grande biodiversité','part',[['P','mondial','ch. 3'],['P','geonc','ch. 4']]],
   ['Habiter un espace de faible densité à vocation agricole','part',[['P','geonc','ch. 4 et 6']]]]},
  {t:'Thème 3 — Habiter les littoraux',s:[['Littoral industrialo-portuaire, littoral touristique','part',[['P','geonc','ch. 7'],['P','nickel','ch. 4']],0,'étude de cas possible en Nouvelle-Calédonie']]},
  {t:'Thème 4 — Le monde habité',s:[
   ['La répartition de la population mondiale et ses dynamiques','ok',[['P','mondial','ch. 4'],['P','monde','ch. 9']]],
   ['La variété des formes d’occupation spatiale dans le monde','part',[['P','mondial','ch. 5']]]]}],
 E:[
  {t:'Apprendre à vivre dans une société démocratique',s:[
   ['Représenter les autres et servir l’intérêt général','part',[['P','emc','ch. 1 à 3']]],
   ['Respecter des règles et en comprendre la finalité : l’exemple de la laïcité à l’École','ok',[['P','emc','ch. 7']]],
   ['Avoir des droits en tant que personne et respecter ceux des autres : l’exemple du droit à la vie privée','todo',[]]]}]},
'5e':{
 H:[
  {t:'Thème 1 — Chrétientés et islam (VIe-XIIIe siècles), des mondes en contact',s:[
   ['Byzance et l’Europe carolingienne','todo',[]],['De la naissance de l’islam à la prise de Bagdad par les Mongols : pouvoirs, sociétés, cultures','todo',[]]]},
  {t:'Thème 2 — Société, religion et pouvoir politique dans l’occident féodal (XIe-XVe siècles)',n:'Thème allégé en Nouvelle-Calédonie pour laisser la place au thème 3.',s:[
   ['L’ordre seigneurial : la formation et la domination des campagnes','todo',[]],['L’émergence d’une nouvelle société urbaine','todo',[]]]},
  {t:'Thème 3 — La civilisation kanak pré-européenne',s:[
   ['Vie économique et matérielle, organisation politique et sociale (chefferie, clans, famille, parenté), mythes et croyances','part',[['P','caledonie','ch. 1'],['P','pacifique','ch. 7 et 8']],1,'à approfondir avec un spécialiste avant d’en faire un volet']]},
  {t:'Thème 4 — Transformations de l’Europe et ouverture sur le monde aux XVIe et XVIIe siècles',s:[
   ['Le monde au temps de Charles Quint et Soliman le Magnifique','ok',[['P','decouvertes','ch. 1 à 9 et 15']]],
   ['Humanisme, réformes et conflits religieux','todo',[]],['Du Prince de la Renaissance au roi absolu (François Ier, Henri IV, Louis XIV)','todo',[]]]}],
 G:[
  {t:'Thème 1 — La question démographique et l’inégal développement',s:[
   ['La croissance démographique et ses effets','part',[['P','mondial','ch. 4'],['P','monde','ch. 9']],0,'un PMA peut être choisi en Océanie'],
   ['Répartition de la richesse et de la pauvreté dans le monde','ok',[['P','mondial','ch. 10']]]]},
  {t:'Thème 2 — Des ressources limitées, à gérer et à renouveler',s:[
   ['L’énergie, l’eau : des ressources à ménager et à mieux utiliser','todo',[]],['L’alimentation : comment nourrir une humanité en croissance démographique et aux besoins alimentaires accrus ?','todo',[]]]},
  {t:'Thème 3 — Prévenir les risques, s’adapter au changement global',s:[
   ['Le changement global et ses principaux effets géographiques régionaux','ok',[['P','mondial','ch. 11'],['P','geonc','ch. 2']],0,'étude de cas en Océanie'],
   ['Prévenir les risques industriels et technologiques','part',[['P','nickel','ch. 8']],0,'exemple possible en Océanie']]}],
 E:[
  {t:'Égalité, fraternité et solidarité',s:[
   ['Agir pour l’égalité femmes-hommes et lutter contre les discriminations','part',[['P','emc','ch. 4']]],
   ['La solidarité et ses échelles','ok',[['P','emc','ch. 8']]]]}]},
'4e':{
 H:[
  {t:'Thème 1 — Le XVIIIe siècle. Expansions, Lumières et révolutions',s:[
   ['Bourgeoisies marchandes, négoces internationaux, traites négrières et esclavage au XVIIIe siècle','part',[['P','emc','ch. 5']]],
   ['Les voyages d’exploration des Européens dans le Pacifique','ok',[['P','decouvertes','ch. 12 à 14'],['P','caledonie','ch. 2'],['P','pacifique','ch. 10']],1,'premiers contacts à partir de l’exemple calédonien'],
   ['L’Europe des Lumières : circulation des idées, despotisme éclairé et contestation de l’absolutisme','todo',[]],
   ['La Révolution française et l’Empire : nouvel ordre politique et société révolutionnée en France et en Europe','todo',[]]]},
  {t:'Thème 2 — L’Europe et le monde au XIXe siècle',s:[
   ['L’Europe de la « révolution industrielle »','todo',[]],
   ['Conquêtes et sociétés coloniales : la Nouvelle-Calédonie','ok',[['C','colonies','ch. 1 à 6'],['P','caledonie','ch. 3 à 7']],1,'la carte du monde est ici ; l’étude de cas est dans l’atlas du Pacifique']]},
  {t:'Thème 3 — Société, culture et politique dans la France du XIXe siècle',s:[
   ['Une difficile conquête : voter de 1815 à 1870','part',[['P','emc','ch. 4']]],['La Troisième République','part',[['P','emc','ch. 7']]],['Conditions féminines dans une société en mutation','todo',[]]]}],
 G:[
  {t:'Thème 1 — L’urbanisation du monde',s:[
   ['Espaces et paysages de l’urbanisation : géographie des centres et des périphéries','part',[['P','mondial','ch. 5']]],
   ['Des villes inégalement connectées aux réseaux de la mondialisation','part',[['P','mondial','ch. 5 à 7']]]]},
  {t:'Thème 2 — Les mobilités humaines transnationales',s:[['Un monde de migrants','ok',[['P','mondial','ch. 8']]],['Le tourisme et ses espaces','ok',[['P','mondial','ch. 8']]]]},
  {t:'Thème 3 — Des espaces transformés par la mondialisation',s:[
   ['Mers et Océans : un monde maritimisé','ok',[['P','mondial','ch. 6 et 7'],['P','geonc','ch. 7']]],
   ['L’adaptation du territoire des États-Unis aux nouvelles conditions de la mondialisation','todo',[]],
   ['Les dynamiques d’un grand ensemble géographique africain','todo',[]]]}],
 E:[
  {t:'Défendre les droits et les libertés',s:[
   ['L’État de droit et les libertés','part',[['P','emc','ch. 6']]],['Défendre le cadre démocratique : sécurité et défense nationale','todo',[]]]}]},
'3e':{
 H:[
  {t:'Thème 1 — L’Europe, un théâtre majeur des guerres totales (1914-1945)',s:[
   ['Civils et militaires dans la Première Guerre mondiale','part',[['P','caledonie','ch. 8']],0,'les Calédoniens dans la Grande Guerre'],
   ['Démocraties fragilisées et expériences totalitaires dans l’Europe de l’entre-deux-guerres','todo',[]],
   ['La Deuxième Guerre mondiale, une guerre d’anéantissement','part',[['P','caledonie','ch. 8']],0,'le conflit touche aussi le Pacifique'],
   ['La France défaite et occupée. Régime de Vichy, collaboration, Résistance','part',[['P','caledonie','ch. 8']],0,'ralliement des Calédoniens à la France libre dès 1940']]},
  {t:'Thème 2 — Le monde depuis 1945',s:[
   ['Décolonisations et construction de nouveaux États','todo',[],0,'exemple possible dans le Pacifique'],['Un monde bipolaire au temps de la guerre froide','todo',[]],
   ['Affirmation et mise en œuvre du projet européen','todo',[]],['Enjeux et conflits dans le monde après 1989','todo',[],0,'cas possible dans le Pacifique']]},
  {t:'Thème 3 — Françaises et Français dans une République repensée',s:[
   ['1944-1947 : refonder la République, redéfinir la démocratie','todo',[]],['La Ve République, de la République gaullienne à l’alternance et à la cohabitation','todo',[]],
   ['La Nouvelle-Calédonie depuis 1946 : évolution politique','ok',[['P','caledonie','ch. 9'],['P','emc','ch. 3']],1],
   ['Femmes et hommes dans la société des années 1950 aux années 1980 en France et en Nouvelle-Calédonie : nouveaux enjeux sociaux et culturels, réponses politiques','part',[['P','caledonie','ch. 9']]]]}],
 G:[
  {t:'Thème 1 — Dynamiques territoriales de la France contemporaine',s:[
   ['Les aires urbaines, une nouvelle géographie d’une France mondialisée','todo',[]],['Les espaces productifs et leurs évolutions','todo',[]],['Les espaces de faible densité et leurs atouts','todo',[]]]},
  {t:'Thème 2 — Pourquoi et comment aménager le territoire ?',s:[
   ['Aménager pour répondre aux inégalités croissantes entre territoires français, à toutes les échelles','todo',[]],
   ['Aménager la Nouvelle-Calédonie : vers le rééquilibrage','ok',[['P','nickel','ch. 6'],['P','geonc','ch. 3 et 5']],1,'le programme attend un croquis : export « carte muette » de l’atlas du Pacifique']]},
  {t:'Thème 3 — La France et l’Union européenne',s:[['L’Union européenne, un nouveau territoire de référence et d’appartenance','todo',[]],['La France et l’Europe dans le monde','todo',[]]]}],
 E:[
  {t:'Faire vivre la démocratie',s:[
   ['Les règles du jeu démocratique','part',[['P','emc','ch. 1 à 3']]],['Les acteurs du jeu démocratique et leur engagement (1) : l’opinion','todo',[]],
   ['Les acteurs du jeu démocratique et leur engagement (2) : l’engagement collectif','part',[['P','emc','ch. 4']]]]}]}
};
/* suite du chantier : volets d'histoire à construire, dans l'ordre proposé */
var SUITE=[
 ['fait','Conquêtes et sociétés coloniales','4e, thème 2','6 chapitres, 3 enquêtes. Pilote à critiquer avant de dérouler la suite.'],
 ['todo','Les guerres mondiales (1914-1945)','3e, thème 1','Fronts d’Europe, guerre du Pacifique, ralliement de 1940, Américains en Nouvelle-Calédonie.'],
 ['todo','Le monde depuis 1945','3e, thème 2','Décolonisations (avec un exemple du Pacifique), guerre froide, construction européenne.'],
 ['todo','La République depuis 1944','3e, thème 3','Refondation, Ve République ; la Nouvelle-Calédonie depuis 1946 existe déjà.'],
 ['todo','Révolutions et XIXe siècle','4e, thèmes 1 à 3','Traites et esclavage, Lumières, Révolution et Empire, révolution industrielle, voter au XIXe siècle.'],
 ['todo','Chrétientés, islam, Occident féodal','5e, thèmes 1 et 2','Byzance, empire carolingien, monde musulman, seigneuries et villes.'],
 ['todo','Renaissance et roi absolu','5e, thème 4','Humanisme, réformes, de François Ier à Louis XIV ; les Grandes Découvertes existent déjà.'],
 ['todo','Mondes antiques','6e, thèmes 1 à 3','Orient ancien, cités grecques, Rome, monothéismes, route de la soie.'],
 ['todo','La civilisation kanak pré-européenne','5e, thème 3','À écrire avec un spécialiste : c’est le thème où l’erreur coûterait le plus cher.'],
 ['todo','Lycée','2de à terminale','Après le collège, à partir des programmes adaptés du lycée.']
];
/* séquence de chaque volet de cet atlas */
var SEQC={colonies:{
 niv:'4e',theme:'Histoire, thème 2 « L’Europe et le monde au XIXe siècle » — sous-thème « Conquêtes et sociétés coloniales : la Nouvelle-Calédonie » (adaptation)',
 pb:'Comment les conquêtes coloniales du XIXe siècle transforment-elles le monde, et que révèle l’exemple de la Nouvelle-Calédonie sur les sociétés coloniales ?',
 duree:'5 à 6 heures : l’étude de cas calédonienne, quatre ou cinq des six séances au choix, puis l’évaluation (au collège, le programme ne fixe pas d’horaire par thème)',
 dem:'Démarche inductive : on part de l’étude de cas calédonienne (atlas du Pacifique, volet « Histoire de la Nouvelle-Calédonie », chapitres 3 à 7), puis on met en perspective à l’échelle du monde avec les cartes de ce volet. Les séances 1 à 4 peuvent aussi précéder l’étude de cas si la classe a besoin du cadre général d’abord.',
 rep:['1830 : prise d’Alger','24 septembre 1853 : prise de possession de la Nouvelle-Calédonie','1864 : premiers forçats','1878 : révolte d’Ataï','1884-1885 : conférence de Berlin','1887 : indigénat en Nouvelle-Calédonie','1914 : apogée des empires'],
 trace:['I. Pourquoi et comment les Européens conquièrent-ils le monde ? (raisons économiques, politiques, idéologiques ; moyens ; partage de l’Afrique et du Pacifique)','II. La Nouvelle-Calédonie, une colonie française (1853 : une base ; 1864 : le bagne ; colons libres et cantonnement ; le nickel)','III. Des sociétés coloniales inégalitaires et contestées (citoyens et sujets, indigénat, travail ; résistances : Ataï, 1878)'],
 eval:{
  docs:'Exercice 1 — Analyser et comprendre des documents : le discours de Jules Ferry (28 juillet 1885) et la carte des empires en 1914.',
  q1:['Identifie le document 1 : auteur, date, lieu, destinataires.','Relève deux raisons de coloniser données par l’auteur.','À l’aide de la carte, nomme les deux plus grands empires coloniaux en 1914 et un territoire de chacun dans le Pacifique.','Explique pourquoi un député comme Clemenceau s’oppose à ce discours.'],
  lang:'Exercice 2 — Maîtriser différents langages : rédige un développement construit d’une quinzaine de lignes. « À partir de l’exemple de la Nouvelle-Calédonie, décris et explique le fonctionnement d’une société coloniale au XIXe siècle. »',
  rep:'Repères : sur la frise, place 1853, 1878, 1884-1885 ; sur le planisphère, localise la Nouvelle-Calédonie, l’Algérie, l’Indochine, l’Empire des Indes.',
  att:['une courte introduction qui situe (où, quand)','la prise de possession et ses raisons','la colonisation pénitentiaire et de peuplement, le cantonnement','l’inégalité entre colons et Kanak (indigénat)','les résistances (Ataï, 1878)','un vocabulaire précis : colonie, métropole, indigénat, cantonnement'],
  grille:[['Se repérer dans le temps et dans l’espace','place moins de la moitié des repères','place la plupart des repères','place tous les repères'],
   ['Analyser et comprendre un document','recopie sans identifier','identifie le document et relève les informations','explique le document et exerce son esprit critique'],
   ['Pratiquer différents langages : écrire','quelques phrases isolées','un texte organisé mais incomplet','un texte organisé, complet, avec le vocabulaire attendu']]}
}};
window.COLLEGE={PROG:PROG,SUITE:SUITE,SEQC:SEQC,VN:VN,PAC:PAC};
})();

/* ---------- interface ---------- */
(function(){
'use strict';
var K=window.COLLEGE,A=window.ATLAS;if(!K||!A||!A.api)return;
var api=A.api,PROG=K.PROG,VN=K.VN,ov=null,state={tab:'prog',niv:'4e',ci:0};
var ST={ok:'couvert',part:'en partie',todo:'à faire'};
var CSS='.col-home{display:flex;gap:14px;align-items:center;width:100%;margin:10px 0 0;padding:14px 18px;border-radius:16px;border:2px solid var(--gold,#ffd166);background:rgba(255,209,102,.12);color:inherit;font:inherit;text-align:left;cursor:pointer;min-height:64px}'+
'.col-home b{font-size:19px;display:block}.col-home small{font-size:14.5px;opacity:.9}.col-home .ic{font-size:30px}'+
'.col-ov{position:fixed;inset:0;z-index:20000;background:#e9edf2;color:#1b2430;display:flex;flex-direction:column;font:15.5px/1.5 system-ui,-apple-system,"Segoe UI",Arial,sans-serif}'+
'.col-bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:8px 12px;background:#1f2d3d;color:#fff}.col-bar b{flex:1 1 200px;font-size:17px}'+
'.col-bar button,.col-bar select{font:600 14.5px system-ui,sans-serif;min-height:44px;padding:6px 13px;border-radius:10px;border:1px solid #5b6b7d;background:#2f4156;color:#fff;cursor:pointer}'+
'.col-bar button[aria-pressed=true]{background:#f2b632;color:#1b2430;border-color:#f2b632}.col-bar .msg{font-size:13.5px;opacity:.9;flex-basis:100%;min-height:1em}'+
'.col-scroll{flex:1;overflow:auto;padding:14px}.col-sheet,.col-sheet *{-webkit-user-select:text;user-select:text}'+
'.col-sheet{background:#fff;max-width:1060px;margin:0 auto;padding:22px 26px;border-radius:8px;box-shadow:0 2px 14px rgba(0,0,0,.15);outline:none}'+
'.col-sheet h1{font-size:23px;margin:0 0 4px}.col-sheet h2{font-size:18.5px;margin:20px 0 6px;border-bottom:2px solid #1f2d3d;padding-bottom:3px}.col-sheet h3{font-size:16px;margin:14px 0 4px}'+
'.col-sheet p{margin:6px 0}.col-sheet .sub{color:#55606d;margin:0 0 10px}.col-sheet ul{margin:4px 0 4px 20px;padding:0}.col-sheet li{margin:2px 0}'+
'.col-sheet table{width:100%;border-collapse:collapse;margin:8px 0 14px}.col-sheet td,.col-sheet th{border:1.3px solid #333;padding:7px 9px;vertical-align:top;text-align:left}'+
'.col-sheet th{background:#eef2f6}.col-sheet td.h{width:74px;font-weight:700;text-align:center;background:#f6f8fa}'+
'.col-st{display:inline-block;font-size:12.5px;font-weight:700;padding:1px 8px;border-radius:999px;margin-right:6px;white-space:nowrap}'+
'.col-st.ok{background:#c8f0cf;color:#14501c}.col-st.part{background:#ffe9a8;color:#6b4a00}.col-st.todo{background:#e3e7ec;color:#47525e}.col-st.nc{background:#1f2d3d;color:#fff}'+
'.col-sheet a,.col-sheet button.lk{color:#0b5cad;font:inherit;background:none;border:0;padding:0;text-decoration:underline;cursor:pointer}'+
'.col-res{font-size:14.5px;margin:2px 0 0}.col-rem{font-size:14px;color:#55606d}.col-lv{display:flex;gap:8px;flex-wrap:wrap;margin:8px 0 4px}'+
'.col-lv button{font:700 16px system-ui,sans-serif;min-width:64px;min-height:44px;border-radius:10px;border:2px solid #1f2d3d;background:#fff;color:#1f2d3d;cursor:pointer}.col-lv button[aria-pressed=true]{background:#1f2d3d;color:#fff}'+
'@media print{body.col-print>*:not(.col-ov){display:none!important}.col-ov{position:static;background:#fff}.col-bar{display:none}.col-scroll{overflow:visible;padding:0}.col-sheet{box-shadow:none;max-width:none;padding:0}}';
var st=document.createElement('style');st.textContent=CSS;document.head.appendChild(st);
function esc(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;');}
function li(a){return '<ul>'+(a||[]).map(function(x){return '<li>'+esc(x)+'</li>';}).join('')+'</ul>';}
function vol(){var V=api.vols(),i;for(i=0;i<V.length;i++)if(K.SEQC[V[i].id])return V[i];return V[0];}
function res(r){
  if(r[0]==='C')return '<button class="lk" data-go="'+r[1]+'">▶ '+esc(VN[r[1]]||r[1])+' ('+esc(r[2])+'), dans cet atlas</button>';
  return '<a href="'+K.PAC+'#'+r[1]+'" target="_blank" rel="noopener">Atlas du Pacifique ▸ '+esc(VN[r[1]]||r[1])+' ('+esc(r[2])+') ↗</a>';
}
function count(list){var c={ok:0,part:0,todo:0};list.forEach(function(t){t.s.forEach(function(s){c[s[1]]++;});});return c;}
function bloc(titre,list){
  var c=count(list),n=c.ok+c.part+c.todo,h='<h2>'+titre+' <span class="col-rem">— '+c.ok+' couvert'+(c.ok>1?'s':'')+', '+c.part+' en partie, '+c.todo+' à faire sur '+n+' sous-thèmes</span></h2>';
  list.forEach(function(t){
    h+='<h3>'+esc(t.t)+'</h3>'+(t.n?'<p class="col-rem">'+esc(t.n)+'</p>':'')+'<ul>';
    t.s.forEach(function(s){
      h+='<li><span class="col-st '+s[1]+'">'+ST[s[1]]+'</span>'+(s[3]?'<span class="col-st nc">adaptation NC</span>':'')+esc(s[0])+
        (s[4]?' <span class="col-rem">('+esc(s[4])+')</span>':'')+((s[2]||[]).length?'<div class="col-res">'+s[2].map(res).join(' · ')+'</div>':'')+'</li>';
    });
    h+='</ul>';
  });
  return h;
}
function tabProg(){
  var P=PROG[state.niv],h='<h1>Programmes du collège adaptés à la Nouvelle-Calédonie</h1><p class="sub">Ce que les deux atlas couvrent déjà, sous-thème par sous-thème. Intitulés des programmes officiels.</p>'+
   '<div class="col-lv">'+Object.keys(PROG).map(function(n){return '<button type="button" data-niv="'+n+'" aria-pressed="'+(n===state.niv)+'">'+n+'</button>';}).join('')+'</div>';
  h+=bloc('Histoire',P.H)+bloc('Géographie',P.G)+bloc('Enseignement moral et civique',P.E);
  h+='<p class="col-rem">Histoire et géographie : programmes adaptés (6e : cycle 3 ; 5e, 4e, 3e : cycle 4). « Chaque fois que cela est jugé opportun, l’exemple ou l’étude de cas est choisi à l’échelle locale ou régionale. » EMC : programme national de 2024, contextualisé autant que possible ; en Nouvelle-Calédonie il entre en vigueur niveau par niveau (5e en 2025, 4e en 2026, d’après le livret d’accueil 2026) : vérifier le texte en vigueur pour la 3e sur le site académique.</p>';
  return h;
}
/* fiche séance : trame de la grille de préparation de leçon (annexe 4 du livret d'accueil) */
function fiche(ci){
  var V=vol(),S=K.SEQC[V.id],C=V.chapters[ci],f=C.fs||{},prev=ci>0?V.chapters[ci-1]:null,q=C.q||[];
  var mots=(C.mots||[]).slice(0,4).map(function(m){return m[0]+' : '+m[1];});
  var h='<h1>Fiche séance — '+esc(C.short)+'</h1><p class="sub">'+esc(S.niv)+' · '+esc(C.dates||'')+' · une heure · à modifier librement (cliquez dans le texte)</p>';
  h+='<table><tr><td style="width:50%"><b>Séquence :</b> '+esc(V.title)+'<br><span class="col-rem">'+esc(S.theme)+'</span><br><br><b>Séance :</b> n° '+(ci+1)+' sur '+V.chapters.length+' — '+esc(C.short)+'</td>'+
    '<td><b>But pédagogique :</b> '+esc(f.but)+'</td></tr>'+
    '<tr><td><b>Problématique :</b> '+esc(f.pb)+'</td><td><b>Notions clés :</b>'+li(f.notions)+'</td></tr>'+
    '<tr><td><b>Méthodes :</b> '+esc(f.meth)+'</td><td><b>Compétences et savoir-faire :</b>'+li(f.comp)+'</td></tr></table>';
  h+='<table><tr><td class="h">5 à 10’</td><td colspan="2"><b>Entrée dans la leçon</b><ul>'+
    '<li><b>Rappel :</b> '+(prev?'séance précédente, « '+esc(prev.short)+' » : '+esc((prev.fs||{}).fin||''):'ce que les élèves savent déjà de la colonisation (vue au cycle 3 pour la Nouvelle-Calédonie).')+'</li>'+
    '<li><b>Accroche :</b> '+esc(f.accroche)+'</li><li><b>Problématique</b> notée au tableau : '+esc(f.pb)+'</li></ul></td></tr>'+
    '<tr><td class="h">35 à 45’</td><td style="width:52%"><b>Activités des élèves</b><ol>'+(f.act||[]).map(function(a){return '<li>'+esc(a)+'</li>';}).join('')+'</ol>'+
    '<p class="col-rem">Trois supports au plus, dont un étudié en profondeur. Différenciation : enquête en « Parcours guidé » ou « Parcours autonome », texte facile, gros texte.</p></td>'+
    '<td><b>Cours</b> (trace écrite construite avec les élèves)<p>'+esc(f.fin)+'</p><b>À noter :</b>'+li(mots)+'</td></tr></table>';
  h+='<table><tr><td class="h">5 à 10’</td><td><b>Fin de la leçon</b><ul><li><b>Réponse à la question du jour :</b> '+esc(f.fin)+'</li>'+
    '<li><b>Vérification des acquis :</b> '+q.slice(0,2).map(function(x){return esc(x[0])+' <span class="col-rem">('+esc(x[1])+')</span>';}).join(' ; ')+'</li>'+
    '<li><b>Suite :</b> '+esc(f.suite)+'</li><li><b>Travail prévu :</b> apprendre les définitions ; refaire le quiz du chapitre (Activités ▸ Quiz).</li></ul></td></tr>'+
    '<tr><td class="h"></td><td><b>Après la leçon</b><ul><li>Qu’est-ce qui a marché dans ma leçon ?</li><li>Qu’est-ce que je dois modifier ?</li></ul><br></td></tr></table>';
  return h;
}
function tabFiche(){return fiche(state.ci);}
function tabSeq(){
  var V=vol(),S=K.SEQC[V.id],e=S.eval;
  var h='<h1>Séquence — '+esc(V.title)+'</h1><p class="sub">'+esc(S.niv)+' · '+esc(S.duree)+'</p><p><b>Place dans le programme :</b> '+esc(S.theme)+'</p><p><b>Problématique de la séquence :</b> '+esc(S.pb)+'</p><p><b>Démarche :</b> '+esc(S.dem)+'</p>';
  h+='<h2>Plan de séquence</h2><table><tr><th>Séance</th><th>Problématique</th><th>Notions</th><th>Compétences travaillées</th><th>Supports</th></tr>';
  V.chapters.forEach(function(C,i){var f=C.fs||{};h+='<tr><td>'+(i+1)+'. '+esc(C.short)+'</td><td>'+esc(f.pb)+'</td><td>'+esc((f.notions||[]).join(' ; '))+'</td><td>'+esc((f.comp||[]).join(' ; '))+'</td><td>carte animée'+((window.ENQ||{})[V.id]&&window.ENQ[V.id][i]?', enquête':'')+'</td></tr>';});
  h+='</table><h2>Repères à faire construire</h2>'+li(S.rep)+'<h2>Trace écrite : un plan qui répond à la problématique</h2>'+li(S.trace)+
    '<p class="col-rem">La trace écrite se construit avec les élèves, au fil des séances. En 6e et en 5e, elle est écrite en entier au tableau ; le texte à trous reste l’exception.</p>';
  h+='<h2>Évaluation de fin de séquence</h2><p>'+esc(e.docs)+'</p><ol>'+e.q1.map(function(x){return '<li>'+esc(x)+'</li>';}).join('')+'</ol><p>'+esc(e.lang)+'</p><p>'+esc(e.rep)+'</p>'+
    '<h3>Éléments attendus dans le développement construit</h3>'+li(e.att)+'<h3>Grille par compétences</h3><table><tr><th>Compétence</th><th>Non acquis</th><th>En cours d’acquisition</th><th>Acquis</th></tr>'+
    e.grille.map(function(g){return '<tr>'+g.map(function(x){return '<td>'+esc(x)+'</td>';}).join('')+'</tr>';}).join('')+'</table>'+
    '<p class="col-rem">L’évaluation ne porte que sur ce qui a été travaillé en classe ; donner une fiche de révision avant.</p>';
  return h;
}
function tabMeth(){
  return '<h1>Rappels de méthode</h1><p class="sub">Résumé, avec nos mots, du livret d’accueil de l’enseignant contractuel en histoire-géographie et EMC (vice-rectorat de la Nouvelle-Calédonie, 2026). Le livret et les programmes restent la référence.</p>'+
  li(['Le programme d’abord : tous les chapitres des programmes adaptés se traitent, sans impasse ni hors-sujet ; l’histoire et la géographie ont le même poids.',
  'Une problématique par séquence, souvent par séance. « Quelles sont les étapes de… » n’en est pas une : il faut une vraie question, qui oblige à réfléchir.',
  'Trois ou quatre documents au plus par séance, de statuts différents (accroche, illustration, document étudié à fond, document-outil).',
  'Moins de simples relevés d’informations ; un questionnement court, qui fait confronter le document à ce que l’on sait et exercer l’esprit critique.',
  'Des consignes écrites avec des verbes de capacité : prélever, identifier, expliquer, analyser, confronter.',
  'Démarche inductive : une étude de cas (locale si possible) puis une mise en perspective ; ou l’inverse, du général vers l’exemple.',
  'Trace écrite construite avec les élèves, organisée par un plan qui répond à la problématique, avec repères, définitions, croquis ou schémas. Texte à trous : rarement.',
  'Évaluer de plusieurs façons (diagnostique, formative, formatrice, sommative) et par compétences ; seulement ce qui a été vu en classe.',
  'Différencier sans changer les connaissances visées : supports variés, questions plus ou moins guidées ; documents adaptés aux élèves « dys ».',
  'Séance type : 5 à 10 minutes d’entrée (rappel, accroche, problématique), 35 à 45 minutes d’activité, 5 à 10 minutes de fin (réponse à la question du jour, vérification, suite).'])+
  '<h2>Ressources citées par le livret</h2>'+li(['Site académique d’histoire-géographie : histoire-geo.ac-noumea.nc (programmes en vigueur, séquences)','Eduscol : programmes et ressources d’accompagnement des cycles 3 et 4','ISEE (isee.nc) et Géorep (georep.nc) pour les données sur la Nouvelle-Calédonie','Géoconfluences (glossaire), L’Histoire par l’image, Géoimage (CNES), Lumni','Institutions locales pour l’EMC : gouv.nc, congres.nc, senat-coutumier.nc, cese.nc']);
}
function tabSuite(){
  return '<h1>Suite du chantier</h1><p class="sub">Objectif : couvrir tout le programme d’histoire du collège, puis le lycée. Un volet à la fois : on critique le pilote, puis on déroule.</p><table><tr><th>État</th><th>Volet</th><th>Programme</th><th>Contenu</th></tr>'+
   K.SUITE.map(function(s){return '<tr><td><span class="col-st '+(s[0]==='fait'?'ok':'todo')+'">'+(s[0]==='fait'?'pilote publié':'à faire')+'</span></td><td><b>'+esc(s[1])+'</b></td><td>'+esc(s[2])+'</td><td>'+esc(s[3])+'</td></tr>';}).join('')+'</table>';
}
var TABS=[['prog','Programmes',tabProg],['fiche','Fiche séance',tabFiche],['seq','Séquence et évaluation',tabSeq],['meth','Méthode',tabMeth],['suite','Suite',tabSuite]];
function msg(t){if(ov)ov.querySelector('.msg').textContent=t||'';}
function wordDoc(inner,titre){
  return '﻿<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"><title>'+esc(titre)+'</title><style>body{font-family:Arial,sans-serif;font-size:11pt}h1{font-size:16pt}h2{font-size:13pt}h3{font-size:11.5pt}table{border-collapse:collapse;width:100%}td,th{border:1pt solid #000;padding:4pt 6pt;vertical-align:top}th{background:#eee}.col-rem,.sub{color:#555}.col-st{font-weight:bold}.col-lv{display:none}</style></head><body>'+inner.replace(/<button[^>]*>(.*?)<\/button>/g,'$1')+'</body></html>';
}
async function save(blob,fn){
  var d=null;try{d=window.claude&&claude.use?await claude.use('downloads'):null;}catch(e){}
  if(d){try{await d.save({filename:fn,data:blob});msg('Enregistré : '+fn);}catch(e){msg(e&&e.code=='declined'?'Téléchargement annulé.':'Téléchargement impossible dans cette vue.');}return;}
  if(window.claude){msg('Enregistrement impossible dans cette vue : ouvrez l’atlas sur un ordinateur.');return;}
  try{var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=fn;document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove();},4000);msg('Téléchargé : '+fn);}catch(e){msg('Téléchargement impossible dans cette vue.');}
}
function slug(s){return String(s).normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-zA-Z0-9]+/g,'-').replace(/^-|-$/g,'').toLowerCase().slice(0,50);}
function render(){
  var V=vol(),t=TABS.filter(function(x){return x[0]===state.tab;})[0]||TABS[0];
  var bar='<b>🎓 Espace collège</b>'+TABS.map(function(x){return '<button type="button" data-tab="'+x[0]+'" aria-pressed="'+(x[0]===t[0])+'">'+x[1]+'</button>';}).join('');
  if(t[0]==='fiche')bar+='<select data-ci aria-label="Séance">'+V.chapters.map(function(c,i){return '<option value="'+i+'"'+(i===state.ci?' selected':'')+'>'+(i+1)+'. '+esc(c.short)+'</option>';}).join('')+'</select>';
  bar+='<button type="button" data-b="word">⬇ Word</button>'+(window.claude?'':'<button type="button" data-b="print">🖨 Imprimer</button>')+'<button type="button" data-b="x" aria-label="Fermer">✕ Fermer</button><span class="msg" aria-live="polite"></span>';
  ov.querySelector('.col-bar').innerHTML=bar;
  var sh=ov.querySelector('.col-sheet');sh.innerHTML=t[2]();sh.contentEditable=(t[0]==='fiche'||t[0]==='seq')?'true':'false';ov.querySelector('.col-scroll').scrollTop=0;
}
function close(){if(ov){ov.remove();ov=null;document.body.classList.remove('col-print');}}
function open(tab,ci){
  if(tab)state.tab=tab;if(ci!=null)state.ci=ci;
  if(!ov){
    ov=document.createElement('div');ov.className='col-ov';ov.setAttribute('role','dialog');ov.setAttribute('aria-modal','true');ov.setAttribute('aria-label','Espace collège');
    ov.innerHTML='<div class="col-bar"></div><div class="col-scroll"><div class="col-sheet" spellcheck="true"></div></div>';document.body.appendChild(ov);
    ov.addEventListener('click',function(e){
      var b=e.target.closest('[data-tab],[data-niv],[data-b],[data-go]');if(!b)return;
      if(b.dataset.tab){state.tab=b.dataset.tab;render();}
      else if(b.dataset.niv){state.niv=b.dataset.niv;render();}
      else if(b.dataset.go){var V=api.vols(),i;for(i=0;i<V.length;i++)if(V[i].id===b.dataset.go){close();if(api.leaveHome)api.leaveHome();api.volet(i,0);return;}}
      else if(b.dataset.b==='x')close();
      else if(b.dataset.b==='word'){var h1=ov.querySelector('.col-sheet h1');save(new Blob([wordDoc(ov.querySelector('.col-sheet').innerHTML,h1?h1.textContent:'Espace collège')],{type:'application/msword'}),slug(h1?h1.textContent:'espace-college')+'.doc');}
      else if(b.dataset.b==='print'){document.body.classList.add('col-print');msg('Si rien ne s’ouvre (appli Claude), utilisez « Word ».');try{window.print();}catch(e2){}}
    });
    ov.addEventListener('change',function(e){if(e.target.matches('[data-ci]')){state.ci=+e.target.value;render();}});
  }
  render();
}
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&ov&&!e.target.closest('[contenteditable=true]'))close();});
/* entrées : carte de l'accueil, bouton dans « Fiche prof » */
function boutons(){
  var tabs=document.getElementById('tabs');
  if(tabs&&!document.getElementById('colHome')){
    var b=document.createElement('button');b.type='button';b.id='colHome';b.className='col-home';
    b.innerHTML='<span class="ic" aria-hidden="true">🎓</span><span><b>Espace collège</b><small>Programmes adaptés 6e-3e et ce que les atlas couvrent · fiche séance à la trame officielle · séquence et évaluation · suite du chantier</small></span>';
    b.addEventListener('click',function(){open('prog');});tabs.parentNode.insertBefore(b,tabs.nextSibling);
  }
  var sec=document.querySelector('.drawer section[data-sec=fiche]');
  if(sec&&!document.getElementById('colFiche')){
    var f=document.createElement('button');f.type='button';f.id='colFiche';f.className='tile wide';
    f.innerHTML='<span class="ti" aria-hidden="true">🎓</span><b>Fiche séance (collège)</b><small>Trame officielle : problématique, notions, compétences, déroulé. Modifiable, export Word.</small>';
    f.addEventListener('click',function(){var V=api.vol();open('fiche',V&&K.SEQC[V.id]?api.ci():0);});sec.insertBefore(f,sec.firstChild);
  }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boutons);else boutons();
K.open=open;K.close=close;K.fiche=fiche;
window.__college=function(tab,ci){open(tab,ci);return ov.querySelector('.col-sheet').innerHTML;};
})();
