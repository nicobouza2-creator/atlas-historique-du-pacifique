/* « J'entoure, je colorie » — commun aux deux atlas.
   EXOS.data[clé] = {e:{q,it:[[image,étiquette,1 si à entourer]]}, c:{q,pal:[[couleur,nom]],it:[[image,étiquette,n° de couleur]]}}
   image : emoji, ou « i:nom » (image de l'atlas, résolue par EXOS.pic). À l'écran : on touche pour entourer ou colorier.
   Sur papier : EXOS.sheet(clé) donne la fiche élève (ajoutée à la fiche séquence). */
(function(){
'use strict';
var X=window.EXOS=window.EXOS||{};X.data=X.data||{};
var COL={rouge:'#e53935',bleu:'#1e88e5',vert:'#43a047',jaune:'#fdd835',orange:'#fb8c00',violet:'#8e24aa',marron:'#795548',gris:'#9e9e9e',rose:'#ec407a'};
X.COL=COL;
function pic(p,alt){
  if(!p)return '';
  if(/^i:/.test(p)){var s=X.pic?X.pic(p.slice(2)):null;return s?'<img src="'+s+'" alt="'+alt+'">':'';}
  return '<span class="exo-em">'+p+'</span>';
}
var css='.exo-ov{position:fixed;inset:0;z-index:19000;background:rgba(10,20,34,.9);display:flex;align-items:center;justify-content:center;padding:10px;font:17px/1.4 system-ui,-apple-system,"Segoe UI",Arial,sans-serif}'+
 '.exo-box{background:#fff;color:#1b2430;border-radius:18px;max-width:980px;width:100%;max-height:100%;overflow:auto;padding:16px 18px 20px;position:relative}'+
 '.exo-box h2{margin:0 52px 4px 0;font-size:21px}.exo-box .exo-q{font-weight:700;font-size:19px;margin:6px 0 10px}.exo-box .exo-n{color:#66727f;font-size:14px;margin:0}'+
 '.exo-box button{font:inherit;cursor:pointer}.exo-x{position:absolute;right:10px;top:10px;width:44px;height:44px;border-radius:50%;border:0;background:#eef1f5;font-size:18px}'+
 '.exo-g{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:12px;margin:10px 0}'+
 '.exo-t{position:relative;background:#f7f9fc;border:3px solid #d5dce5;border-radius:14px;padding:8px 6px 0;min-height:128px;display:flex;flex-direction:column;align-items:center;justify-content:space-between;overflow:hidden;color:#1b2430}'+
 '.exo-t .exo-em{font-size:52px;line-height:1.15}.exo-t img{max-width:100%;height:92px;object-fit:contain;border-radius:8px}'+
 '.exo-t .exo-l{display:block;width:calc(100% + 12px);margin:6px -6px 0;padding:6px 4px;font-weight:600;font-size:15px;background:#fff;border-top:2px solid #d5dce5}'+
 '.exo-t.txt{justify-content:center;padding:8px 6px}.exo-t.txt .exo-l{border:0;background:none;font-size:18px;margin:0;width:100%}.exo-t.txt.sel::after{bottom:4px}'+
 '.exo-t.sel::after{content:"";position:absolute;left:6px;right:6px;top:4px;bottom:44px;border:5px solid #e53935;border-radius:50%;transform:rotate(-5deg);pointer-events:none}'+
 '.exo-t.ok{border-color:#2e9e5b;background:#eaf7ee}.exo-t.ko{animation:exoshake .35s}@keyframes exoshake{25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}'+
 '.exo-pal{display:flex;flex-wrap:wrap;gap:10px;margin:6px 0}.exo-pal button{display:flex;align-items:center;gap:8px;min-height:48px;padding:6px 14px;border-radius:999px;border:3px solid #d5dce5;background:#fff;font-weight:600}'+
 '.exo-pal button.cur{border-color:#1b2430;box-shadow:0 0 0 3px #ffd166}.exo-pal i{width:26px;height:26px;border-radius:50%;display:inline-block;border:1px solid rgba(0,0,0,.3)}'+
 '.exo-bar{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-top:8px}.exo-go{min-height:50px;padding:8px 22px;border-radius:12px;border:0;background:#2b7de0;color:#fff;font-weight:700}'+
 '.exo-msg{font-weight:700;flex:1 1 200px}.exo-msg.good{color:#1e7b45}.exo-msg.bad{color:#b3261e}';
X.has=function(k){return !!X.data[k];};
X.open=function(key){
  var D=X.data[key];if(!D)return;
  if(!document.getElementById('exo-css')){var st=document.createElement('style');st.id='exo-css';st.textContent=css;document.head.appendChild(st);}
  X.close();
  var ov=document.createElement('div');ov.className='exo-ov';ov.innerHTML='<div class="exo-box"></div>';document.body.appendChild(ov);
  ov.addEventListener('click',function(e){if(e.target===ov)X.close();});
  var box=ov.firstChild,steps=[D.e&&'e',D.c&&'c'].filter(Boolean),si=0,errs=0;
  function step(){
    var k=steps[si],d=D[k],col=null,state=d.it.map(function(){return k=='e'?0:-1;});
    box.innerHTML='<button class="exo-x" aria-label="Fermer">✕</button><h2>'+(k=='e'?'✏️ J’entoure':'🖍️ Je colorie')+'</h2><p class="exo-n">Exercice '+(si+1)+' sur '+steps.length+(k=='e'?' — touche une image pour l’entourer, touche encore pour effacer.':' — choisis une couleur, puis touche les étiquettes.')+'</p><p class="exo-q">'+d.q+'</p>'+
     (k=='c'?'<div class="exo-pal">'+d.pal.map(function(p,i){return '<button data-p="'+i+'"><i style="background:'+COL[p[0]]+'"></i>'+p[0]+' : '+p[1]+'</button>';}).join('')+'</div>':'')+
     '<div class="exo-g">'+d.it.map(function(t,i){return '<button class="exo-t'+(pic(t[0],t[1])?'':' txt')+'" data-i="'+i+'">'+pic(t[0],t[1])+'<span class="exo-l">'+t[1]+'</span></button>';}).join('')+'</div>'+
     '<div class="exo-bar"><span class="exo-msg"></span><button class="exo-go" data-b="v">Vérifier</button></div>';
    var msg=box.querySelector('.exo-msg'),tiles=[].slice.call(box.querySelectorAll('.exo-t'));
    box.querySelector('.exo-x').onclick=X.close;
    [].forEach.call(box.querySelectorAll('.exo-pal button'),function(b){b.onclick=function(){col=+b.dataset.p;[].forEach.call(box.querySelectorAll('.exo-pal button'),function(x){x.classList.toggle('cur',x===b);});};});
    tiles.forEach(function(t,i){t.onclick=function(){
      t.classList.remove('ok','ko');
      if(k=='e'){state[i]=state[i]?0:1;t.classList.toggle('sel',!!state[i]);}
      else{if(col==null){msg.className='exo-msg bad';msg.textContent='Choisis d’abord une couleur.';return;}state[i]=col;var l=t.classList.contains('txt')?t:t.querySelector('.exo-l');l.style.background=COL[d.pal[col][0]];l.style.color=/jaune|orange/.test(d.pal[col][0])?'#1b2430':'#fff';t.style.borderColor=COL[d.pal[col][0]];}
      msg.textContent='';
    };});
    box.querySelector('[data-b=v]').onclick=function(){
      var bad=0,miss=0;
      tiles.forEach(function(t,i){
        var want=k=='e'?(d.it[i][2]?1:0):d.it[i][2],got=state[i];
        if(k=='e'){if(got&&!want){bad++;state[i]=0;t.classList.remove('sel');t.classList.add('ko');}else if(!got&&want)miss++;else if(got)t.classList.add('ok');}
        else{if(got<0)miss++;else if(got!=want){bad++;state[i]=-1;var l=t.classList.contains('txt')?t:t.querySelector('.exo-l');l.style.background='';l.style.color='';t.style.borderColor='';t.classList.add('ko');}else t.classList.add('ok');}
      });
      if(!bad&&!miss){
        msg.className='exo-msg good';var last=si==steps.length-1;msg.textContent='Bravo, tout est juste !'+(last&&errs?' ('+errs+' essai'+(errs>1?'s':'')+' en plus)':'');
        var b=box.querySelector('[data-b=v]');b.textContent=last?'Terminer':'Suite ▶';b.onclick=function(){if(last){X.close();if(X.done)X.done(key,errs);}else{si++;step();}};
      }else{errs++;msg.className='exo-msg bad';msg.textContent=(bad?bad+' erreur'+(bad>1?'s':'')+' effacée'+(bad>1?'s':'')+'. ':'')+(miss?'Il en manque '+miss+'.':'Essaie encore.');}
    };
  }
  step();
};
X.close=function(){var o=document.querySelector('.exo-ov');if(o)o.remove();};
/* fiche élève imprimable (HTML) ; extra = bloc ajouté par l'atlas (carte, par exemple) */
function grid(it,box){
  var h='<table class="exo-p"><tbody>',i,j;
  for(i=0;i<it.length;i+=4){h+='<tr>';for(j=i;j<i+4;j++)h+=it[j]?'<td>'+pic(it[j][0],it[j][1])+'<div class="exo-pl">'+(box?'<span class="exo-bx">&nbsp;&nbsp;&nbsp;&nbsp;</span> ':'')+it[j][1]+'</div></td>':'<td class="exo-vide"></td>';h+='</tr>';}
  return h+'</tbody></table>';
}
X.sheet=function(key,extra){
  var D=X.data[key];if(!D&&!extra)return '';
  var n=0,h='<h2 class="fsq-s exo-h">Fiche élève — J’entoure, je colorie</h2><p>Prénom : ………………………………… &nbsp; Date : ……………………</p>',cor=[];
  if(D&&D.e){n++;h+='<p><b>'+n+'. Entoure.</b> '+D.e.q+'</p>'+grid(D.e.it);cor.push(n+'. À entourer : '+D.e.it.filter(function(t){return t[2];}).map(function(t){return t[1];}).join(', ')+'.');}
  if(D&&D.c){n++;h+='<p><b>'+n+'. Colorie.</b> '+D.c.q+'</p><p>Légende : '+D.c.pal.map(function(p){return '<span class="exo-bx">&nbsp;&nbsp;&nbsp;&nbsp;</span> '+p[0]+' = '+p[1];}).join(' &nbsp;&nbsp; ')+'</p>'+grid(D.c.it,1);
    cor.push(n+'. '+D.c.pal.map(function(p,i){return p[0]+' : '+D.c.it.filter(function(t){return t[2]==i;}).map(function(t){return t[1];}).join(', ');}).join(' ; ')+'.');}
  if(extra){n++;h+=extra.html.replace('{n}',n);if(extra.cor)cor.push(n+'. '+extra.cor);}
  return h+'<p class="exo-cor"><b>Corrigé (à découper) :</b> '+cor.join(' ')+'</p>';
};
X.css='.exo-p{table-layout:fixed}.exo-p td{text-align:center;vertical-align:bottom;height:92px;font-size:13px}.exo-p td.exo-vide{border:0}.exo-p img{max-height:70px;max-width:95%}.exo-p .exo-em{font-size:34px}'+
 '.exo-pl{font-weight:600;margin-top:3px}.exo-bx{display:inline-block;border:1.5px solid #333;min-width:18px}.exo-cor{font-size:11.5px;color:#444;border-top:1px dashed #888;padding-top:6px;margin-top:14px}.exo-map{max-width:100%;max-height:150mm;display:block;margin:6px auto;border:1px solid #999}';
})();
/* « J'entoure, je colorie » — contenus de l'atlas historique (volets d'histoire : un exercice à entourer et un code couleur par chapitre).
   Clé : <volet>-<n° de chapitre à partir de 0>. Image « i:nom » = image de l'atlas (IMG). */
(function(){
'use strict';
var X=window.EXOS,A=window.ATLAS;if(!X||!A||!A.api)return;
var api=A.api;
X.pic=function(n){var im=window.IMG&&IMG[n];return im?im.f:null;};
function E(id,eq,ei,cq,pal,ci){X.data[id]={e:{q:eq,it:ei.map(T)},c:{q:cq,pal:pal,it:ci.map(T)}};}
function T(s){var a=s.split('|');return [a[2]||'',a[0],+a[1]];}   /* « étiquette|valeur|image » */
/* ── Peupler la Terre ── */
E('monde-0','Entoure ce que savait faire Homo erectus.',['tailler des bifaces|1|i:biface','faire du feu|1|🔥','marcher debout|1|🚶','cultiver le blé|0|🌾','écrire|0|✍️','naviguer à la voile|0|⛵'],
 'Colorie en vert ce qui a été trouvé en Afrique, en orange ce qui a été trouvé hors d’Afrique.',[['vert','en Afrique'],['orange','hors d’Afrique']],['Toumaï (Tchad)|0|i:toumai','Lucy (Éthiopie)|0|i:lucy','Dmanissi (Géorgie)|1|i:dmanisi','Java|1','Atapuerca (Espagne)|1']);
E('monde-1','Entoure les lieux d’Afrique où l’on a trouvé de très vieux Homo sapiens.',['Jebel Irhoud (Maroc)|1|i:irhoud','Omo (Éthiopie)|1|i:omo','Florisbad (Afrique du Sud)|1','Lascaux (France)|0','Taïwan|0','Lac Mungo (Australie)|0'],
 'Colorie en jaune ce que faisaient déjà ces Homo sapiens, en gris ce qui n’existait pas encore.',[['jaune','existe déjà'],['gris','n’existe pas encore']],['perles en coquillage|0|🐚','ocre gravée|0','outils de pierre|0|🪨','poterie|1|🏺','écriture|1|✍️','champs cultivés|1|🌾']);
E('monde-2','Entoure les régions atteintes à pied quand la mer était basse.',['Proche-Orient|1','Sunda (Asie du Sud-Est)|1','Chine|1','Sahul (Australie)|0','Madagascar|0','Nouvelle-Zélande|0'],
 'Colorie en marron là où l’on arrive à pied, en bleu là où il faut traverser la mer.',[['marron','à pied'],['bleu','par la mer']],['Proche-Orient|0','Sunda|0','Chine|0','Sahul (Australie, Nouvelle-Guinée)|1|🛶']);
E('monde-3','Entoure les humains qui vivent encore aujourd’hui.',['Homo sapiens|1','Néandertaliens|0|i:neandertal','Dénisoviens|0|i:xiahe','Homo floresiensis|0','Homo erectus|0'],
 'Colorie en bleu ceux qui vivaient en Europe et dans l’ouest de l’Asie, en vert ceux qui vivaient en Asie de l’Est et dans ses îles.',[['bleu','Europe et ouest de l’Asie'],['vert','Asie de l’Est et îles']],['Néandertaliens|0','Dénisoviens|1','Homo floresiensis (Florès)|1','Homo luzonensis (Luçon)|1','Homo erectus de Java|1']);
E('monde-4','Entoure les grottes ornées.',['Chauvet|1|i:chauvet','Lascaux|1','Altamira|1','Doggerland|0','la calotte de glace|0|🧊'],
 'Colorie en jaune les œuvres d’art, en gris les outils.',[['jaune','œuvre d’art'],['gris','outil']],['les lions de Chauvet|0|i:chauvet','l’Homme-lion|0|i:lionman','les peintures de Lascaux|0','le biface|1|i:biface','la sagaie|1']);
E('monde-5','Entoure les passages qui ont permis d’entrer en Amérique.',['la Béringie|1','la route de la côte|1','le couloir libre de glace|1','le détroit de Magellan|0','le canal de Panama|0'],
 'Colorie en bleu les sites d’Amérique du Nord, en vert ceux d’Amérique du Sud.',[['bleu','Amérique du Nord'],['vert','Amérique du Sud']],['White Sands|0|i:whitesands','Clovis|0|i:clovis','Monte Verde (Chili)|1','Lagoa Santa (Brésil)|1','Terre de Feu|1']);
E('monde-6','Entoure les plantes domestiquées par les premiers paysans.',['le blé|1|i:ble','le maïs|1|i:teosinte','le riz|1|🍚','le taro|1','le mammouth|0|🦣','le silex|0|🪨'],
 'Colorie chaque plante de la couleur de son foyer d’origine.',[['jaune','Croissant fertile'],['orange','Chine'],['vert','Amérique'],['rouge','Nouvelle-Guinée']],['le blé|0|i:ble','le riz|1|🍚','le maïs|2|🌽','le taro|3','la banane|3|🍌']);
E('monde-7','Entoure les peuples qui ont atteint par la mer des terres encore inhabitées.',['les Polynésiens|1|i:hokulea','les Austronésiens à Madagascar|1|i:mada','les Vikings en Islande|1','les Romains|0','les Égyptiens|0'],
 'Colorie en bleu les terres du Pacifique, en vert celles de l’océan Indien, en gris celles de l’Atlantique Nord.',[['bleu','Pacifique'],['vert','océan Indien'],['gris','Atlantique Nord']],['Aotearoa|0','Hawaï|0','Madagascar|1','Islande|2','Groenland|2']);
E('monde-8','Entoure les grands foyers de peuplement.',['Asie de l’Est|1|i:shibuya','Asie du Sud|1','Europe|1','Sahara|0|i:sahara','Antarctique|0|🧊','Amazonie|0|🌳'],
 'Colorie en rouge les lieux très peuplés, en jaune les lieux presque vides.',[['rouge','très peuplé'],['jaune','presque vide']],['Tokyo|0|i:shibuya','vallée du Nil|0','Java|0','Sahara|1|i:sahara','Groenland|1']);
/* ── Vers le Pacifique et la Nouvelle-Calédonie ── */
E('pacifique-0','Entoure le continent où est née notre espèce.',['Afrique|1','Europe|0','Asie|0','Océanie|0','Amérique|0'],
 'Colorie en vert les lieux où l’on a trouvé de très vieux fossiles d’Homo sapiens, en gris les autres.',[['vert','très vieux fossiles'],['gris','peuplé bien plus tard']],['Jebel Irhoud (Maroc)|0|i:irhoud','Omo (Éthiopie)|0|i:omo','Nouvelle-Calédonie|1','Tahiti|1']);
E('pacifique-1','Entoure les terres qui formaient Sahul quand la mer était basse.',['Australie|1','Nouvelle-Guinée|1','Afrique|0','Nouvelle-Calédonie|0','Taïwan|0'],
 'Colorie en marron les terres de Sunda (côté Asie), en orange celles de Sahul (côté Australie).',[['marron','Sunda'],['orange','Sahul']],['Java|0','Bornéo|0','Australie|1','Nouvelle-Guinée|1']);
E('pacifique-2','Entoure ce que les Austronésiens emportent dans leurs pirogues.',['le taro|1|i:taro','l’igname|1|i:igname','le bananier|1|🍌','le cochon|1|🐖','le cheval|0|🐎','le blé|0|🌾'],
 'Colorie en jaune le point de départ, en vert les étapes, en gris ce qui n’est pas sur leur route.',[['jaune','départ'],['vert','étape'],['gris','pas sur la route']],['Taïwan|0','Philippines|1','archipel Bismarck|1','Hawaï|2']);
E('pacifique-3','Entoure les archipels atteints par les Lapita.',['Vanuatu|1','Nouvelle-Calédonie|1','Fidji|1','Tonga|1','Samoa|1','Hawaï|0','Aotearoa|0','Rapa Nui|0'],
 'Colorie en orange les archipels de Mélanésie, en bleu ceux de Polynésie.',[['orange','Mélanésie'],['bleu','Polynésie']],['Vanuatu|0','Nouvelle-Calédonie|0','Fidji|0','Tonga|1','Samoa|1']);
E('pacifique-4','Entoure les trois pointes du triangle polynésien.',['Hawaï|1','Rapa Nui (île de Pâques)|1','Aotearoa (Nouvelle-Zélande)|1','Tahiti|0','Fidji|0','Nouvelle-Calédonie|0'],
 'Colorie en jaune les repères des navigateurs polynésiens, en gris ce qu’ils n’avaient pas.',[['jaune','repère des navigateurs'],['gris','ils ne l’avaient pas']],['les étoiles|0|i:croixsud','la houle|0|🌊','les oiseaux|0|🐦','la boussole|1|🧭','le GPS|1|📱']);
E('pacifique-5','Entoure ce que fabriquaient les premiers arrivants, les Lapita.',['la poterie décorée|1|🏺','l’herminette en pierre|1|i:herminette','le fusil|0','la pièce de monnaie|0|🪙','le livre|0|📕'],
 'Colorie en vert les lieux de la Grande Terre, en bleu les îles.',[['vert','Grande Terre'],['bleu','île']],['Foué (Koné)|0','Pouembout|0','île des Pins|1|i:lagon','Lifou|1','Maré|1']);
E('pacifique-6','Entoure ce qui appartient à la société kanak ancienne.',['la grande case|1|i:grandecase','la flèche faîtière|1|i:fleche','la tarodière|1','la chefferie|1','le château fort|0|🏰','l’usine|0|🏭'],
 'Colorie en vert les cultures, en marron les constructions.',[['vert','culture'],['marron','construction']],['la tarodière|0','le billon d’ignames|0','la grande case|1|i:grandecase','la flèche faîtière|1|i:fleche']);
E('pacifique-7','Entoure les îles Loyauté.',['Lifou (Drehu)|1','Maré (Nengone)|1','Ouvéa (Iaai)|1','île des Pins|0','Anatom (Vanuatu)|0','Grande Terre|0'],
 'Colorie en vert ce qu’on échangeait entre les îles avant les Européens, en gris ce qui n’existait pas encore ici.',[['vert','échangé'],['gris','pas encore là']],['le jade|0|i:herminette','les ignames|0','les coquillages|0|🐚','les fusils|1','les pièces de monnaie|1|🪙']);
E('pacifique-8','Entoure les archipels d’où viennent ces arrivants.',['Wallis (Uvea)|1','Tonga|1','Samoa|1','Taïwan|0','Hawaï|0','Australie|0'],
 'Colorie en bleu ce qui vient des Wallisiens et des Tongiens, en violet ce qui vient des enseignants samoans.',[['bleu','Wallisiens et Tongiens'],['violet','enseignants samoans (1841-1842)']],['la langue fagauvea à Ouvéa|0','des clans venus de Wallis|0','les premiers temples protestants|1|i:fayaoue','la London Missionary Society|1']);
E('pacifique-9','Entoure ce que viennent chercher les santaliers et les baleiniers.',['le bois de santal|1|🪵','l’huile de baleine|1|🐋','l’or|0','le nickel|0','les épices|0'],
 'Colorie en bleu les explorateurs et les commerçants, en violet les protestants, en orange les catholiques.',[['bleu','explorateurs et commerçants'],['violet','protestants'],['orange','catholiques']],['James Cook|0|i:cook','les santaliers|0','les baleiniers|0|i:baleinier','la LMS à Maré et Lifou|1','Mgr Douarre à Balade|2|i:douarre']);
/* ── Les Grandes Découvertes ── */
E('decouvertes-0','Entoure ce qui aide les marins du XVe siècle.',['la caravelle|1|i:caravelle','l’astrolabe|1|i:astrolabe','la boussole|1|🧭','le portulan|1|🗺️','le moteur|0|⚙️','le GPS|0|📱'],
 'Colorie en orange les villes d’Europe, en vert les lieux d’Asie.',[['orange','Europe'],['vert','Asie']],['Lisbonne|0','Venise|0','Calicut|1','les Moluques|1','la Chine|1']);
E('decouvertes-1','Entoure les lieux atteints par Zheng He.',['Malacca|1','Ceylan|1','Calicut|1','Ormuz|1','Mogadiscio|1','Lisbonne|0','l’Amérique|0'],
 'Colorie en vert les lieux d’Asie, en jaune ceux d’Arabie, en marron ceux d’Afrique.',[['vert','Asie'],['jaune','Arabie'],['marron','Afrique']],['Malacca|0','Calicut|0','Aden|1','La Mecque|1','Mogadiscio|2']);
E('decouvertes-2','Entoure les étapes des Portugais le long de l’Afrique.',['cap Bojador|1','Elmina|1','fleuve Congo|1','Mossel Bay|1','Calicut|0','Brésil|0'],
 'Colorie en bleu les îles de l’Atlantique, en marron les lieux de la côte africaine.',[['bleu','île de l’Atlantique'],['marron','côte de l’Afrique']],['Madère|0','les Açores|0','Elmina|1','fleuve Congo|1','Mossel Bay|1']);
E('decouvertes-3','Entoure les îles atteintes par Christophe Colomb.',['Guanahani|1','Cuba|1','Hispaniola|1','Guadeloupe|1','le Japon|0','l’Inde|0'],
 'Colorie en vert ce que Colomb croyait, en rouge ce qui était vrai.',[['vert','ce que Colomb croyait'],['rouge','la réalité']],['« Je suis arrivé en Asie. »|0','« Les habitants sont des Indiens. »|0','C’est un continent inconnu des Européens.|1','Les habitants sont les Taïnos.|1']);
E('decouvertes-4','Entoure les étapes de Vasco de Gama.',['cap de Bonne-Espérance|1','Mozambique|1','Malindi|1','Calicut|1','Brésil|0','Cuba|0'],
 'Colorie en orange l’Europe, en marron l’Afrique, en vert l’Inde.',[['orange','Europe'],['marron','Afrique'],['vert','Inde']],['Lisbonne|0','Natal|1','Mozambique|1','Malindi|1','Calicut|2']);
E('decouvertes-5','Entoure les deux royaumes qui se partagent le monde à Tordesillas.',['l’Espagne|1','le Portugal|1','la France|0','l’Angleterre|0','les habitants des terres partagées|0'],
 'Colorie en jaune ce qui revient à l’Espagne (à l’ouest de la ligne), en vert ce qui revient au Portugal (à l’est).',[['jaune','à l’Espagne'],['vert','au Portugal']],['Cuba|0','le Mexique|0','la côte du Brésil|1','l’Afrique|1','l’Inde|1']);
E('decouvertes-6','Entoure les lieux longés par Vespucci.',['cap São Roque|1','baie de Tous-les-Saints|1','Rio de Janeiro|1','Calicut|0','le Japon|0'],
 'Colorie en vert l’idée de Colomb, en rouge l’idée de Vespucci.',[['vert','idée de Colomb'],['rouge','idée de Vespucci']],['« Ces terres sont l’Asie. »|0','« Ces terres sont un Nouveau Monde. »|1','le mot « America » sur la carte de 1507|1|i:waldsee']);
E('decouvertes-7','Entoure les dangers du voyage de Magellan.',['le scorbut|1','la mutinerie|1','les tempêtes|1|🌊','la faim|1','la panne de moteur|0|⚙️','les embouteillages|0|🚗'],
 'Colorie en bleu ce qui se passe avant la mort de Magellan, en orange ce qui se passe après.',[['bleu','avant'],['orange','après']],['le détroit de Magellan|0|i:detroit','la traversée du Pacifique|0','l’arrivée aux Moluques|1','le retour d’Elcano|1|i:victoria']);
E('decouvertes-8','Entoure les lieux explorés par Jacques Cartier.',['Terre-Neuve|1','Gaspé|1','Stadaconé (Québec)|1','Hochelaga (Montréal)|1','le Brésil|0','Tahiti|0'],
 'Colorie en bleu le premier voyage (1534), en rouge le deuxième (1535-1536).',[['bleu','1er voyage'],['rouge','2e voyage']],['Gaspé|0','détroit de Belle-Isle|0','Stadaconé|1','Hochelaga|1']);
E('decouvertes-9','Entoure les archipels de Mélanésie rencontrés par les Espagnols.',['îles Salomon|1','Santa Cruz|1','Espiritu Santo (Vanuatu)|1','Marquises|0','Hawaï|0'],
 'Colorie en bleu ce qu’atteint Mendaña, en vert ce qu’atteint Quirós, en orange ce que franchit Torres.',[['bleu','Mendaña'],['vert','Quirós'],['orange','Torres']],['îles Salomon|0','Marquises|0','Espiritu Santo|1|i:quiros','le détroit entre la Nouvelle-Guinée et l’Australie|2']);
E('decouvertes-10','Entoure les terres vues par Tasman.',['Terre de Van Diemen (Tasmanie)|1','Nouvelle-Zélande|1','Tonga|1','Fidji|1','Nouvelle-Calédonie|0','Tahiti|0'],
 'Colorie en vert ce que Tasman rapporte, en rouge ce qu’il ne rapporte pas.',[['vert','il le rapporte'],['rouge','il ne le rapporte pas']],['des cartes nouvelles|0|i:tasmanmap','des dessins des Maoris|0|i:gilsemans','de l’or|1','des épices|1']);
E('decouvertes-11','Entoure les étapes de Bougainville.',['les Malouines|1','le détroit de Magellan|1','Tahiti|1','Samoa|1','les Grandes Cyclades (Vanuatu)|1','la Nouvelle-Calédonie|0','Hawaï|0'],
 'Colorie en bleu ce qui concerne le navire, en vert ce qui concerne la science.',[['bleu','le navire'],['vert','la science']],['La Boudeuse|0|i:boudeuse','la frégate|0','le naturaliste Commerson|1','le bougainvillier|1|i:bougainvillier','Jeanne Barret, botaniste|1']);
E('decouvertes-12','Entoure les lieux où James Cook est passé.',['Tahiti|1','Nouvelle-Zélande|1','Botany Bay|1','Balade|1|i:hodges','île de Pâques|1','Madagascar|0'],
 'Colorie en bleu le premier voyage, en vert le deuxième, en rouge le troisième.',[['bleu','1er voyage (1768-1771)'],['vert','2e voyage (1772-1775)'],['rouge','3e voyage (1776-1779)']],['le passage de Vénus à Tahiti|0','Botany Bay|0|i:endeavour','Balade (1774)|1|i:carte1774','71° sud|1','la mort de Cook à Hawaï|2']);
E('decouvertes-13','Entoure les escales de La Pérouse.',['Concepción (Chili)|1','île de Pâques|1','Maui (Hawaï)|1','Monterey|1','Macao|1','Calicut|0','Le Cap|0'],
 'Colorie en bleu les escales d’Amérique, en vert celles d’Asie, en orange celles du Pacifique.',[['bleu','Amérique'],['vert','Asie'],['orange','Pacifique']],['Concepción|0','Monterey|0','Macao|1','Manille|1','île de Pâques|2','Vanikoro (le naufrage)|2|i:vanikoro']);
E('decouvertes-14','Entoure les plantes venues d’Amérique.',['le maïs|1|i:crops','la pomme de terre|1|🥔','la tomate|1|🍅','le cacao|1|🍫','le blé|0|🌾','le riz|0|🍚'],
 'Colorie chaque navigateur de la couleur du pays qui l’envoie.',[['bleu','Portugal'],['jaune','Espagne'],['rouge','France'],['vert','Chine']],['Dias|0','Vasco de Gama|0','Cabral|0','Colomb|1','Magellan|1','Cartier|2','Zheng He|3']);
/* ── Histoire de la Nouvelle-Calédonie ── */
E('caledonie-0','Entoure les aires coutumières des îles Loyauté.',['Iaai|1','Drehu|1','Nengone|1','Paicî-Cèmuhî|0','Xârâcùù|0','Ajië-Arhö|0'],
 'Colorie en vert les aires de la Grande Terre, en bleu celles des îles Loyauté.',[['vert','Grande Terre'],['bleu','îles Loyauté']],['Hoot ma Whaap|0','Paicî-Cèmuhî|0','Drubea-Kapumë|0','Drehu|1','Nengone|1']);
E('caledonie-1','Entoure ceux qui arrivent en Nouvelle-Calédonie entre 1774 et 1853.',['James Cook|1|i:cook','d’Entrecasteaux|1','les santaliers|1','les missionnaires|1|i:douarre','les forçats|0','les soldats américains|0'],
 'Colorie en bleu les explorateurs, en marron les commerçants, en violet les protestants, en orange les catholiques.',[['bleu','explorateur'],['marron','commerçant'],['violet','protestant'],['orange','catholique']],['Cook|0','d’Entrecasteaux|0','les santaliers|1','les baleiniers|1|i:baleinier','Maré et Lifou (1841)|2','Balade (1843)|3|i:balade1843']);
E('caledonie-2','Entoure les lieux où la France prend possession en 1853.',['Balade|1','île des Pins|1','îles Loyauté|0','Wallis|0','Tahiti|0'],
 'Colorie en bleu ce qui se passe en 1853, en vert en 1854, en orange en 1864.',[['bleu','1853'],['vert','1854'],['orange','1864']],['la prise de possession à Balade|0','la prise de possession à l’île des Pins|0','la fondation de Port-de-France|1','les îles Loyauté sous autorité française|2|i:lifou1864']);
E('caledonie-3','Entoure les lieux du bagne.',['île Nou|1','presqu’île Ducos|1|i:ducos','île des Pins|1|i:pins_bagne','fort Teremba|1|i:teremba','Prony|1','Lifou|0','Hienghène|0'],
 'Colorie en rouge ce qui concerne les transportés (condamnés de droit commun), en bleu les déportés (condamnés politiques).',[['rouge','transportés'],['bleu','déportés']],['les forçats de l’île Nou|0|i:forcats','les chantiers de Nouméa|0','les communards à Ducos|1|i:ducos','les communards à l’île des Pins|1']);
E('caledonie-4','Entoure les villages de colonisation de la côte ouest.',['Païta|1','Moindou|1','Bourail|1','Pouembout|1','Voh|1','Lifou|0','Maré|0'],
 'Colorie en vert les terres laissées aux Kanak, en orange les terres prises pour la colonisation.',[['vert','terres kanak'],['orange','terres de colonisation']],['les réserves|0','les îles Loyauté|0','les plaines de la côte ouest|1','les stations d’élevage|1|🐄']);
E('caledonie-5','Entoure les régions de la révolte de 1878.',['La Foa|1','Boulouparis|1','Bourail|1','Poya|1','Lifou|0','Nouméa|0'],
 'Colorie en rouge ce qui concerne 1878, en violet ce qui concerne 1917.',[['rouge','1878'],['violet','1917']],['La Foa|0','Boulouparis|0','le grand chef Ataï|0|i:atai','Koné|1','Hienghène|1']);
E('caledonie-6','Entoure les pays d’où viennent les travailleurs sous contrat.',['Japon|1','Tonkin (Vietnam)|1','Java|1','Nouvelles-Hébrides (Vanuatu)|1','Brésil|0','Canada|0'],
 'Colorie en marron les mines, en gris l’usine.',[['marron','mine'],['gris','usine']],['Thio|0|i:thio','Kouaoua|0','Tiébaghi|0','Koniambo|0','Doniambo|1|i:doniambo']);
E('caledonie-7','Entoure les aérodromes américains de Nouvelle-Calédonie.',['Tontouta|1','Plaine des Gaïacs|1','Oua Tom|1','Bir Hakeim|0','Marseille|0','Guadalcanal|0'],
 'Colorie en bleu la Première Guerre mondiale, en vert la Seconde.',[['bleu','1914-1918'],['vert','1939-1945']],['les tirailleurs partent pour la France|0','l’arrivée à Marseille|0','Bir Hakeim|1','les Américains à Nouméa|1|i:us1942','Guadalcanal|1']);
E('caledonie-8','Entoure les trois provinces.',['province Nord|1','province Sud|1','province des îles Loyauté|1','province Ouest|0','Wallis-et-Futuna|0','Tahiti|0'],
 'Colorie chaque lieu de la couleur de sa province.',[['vert','province Nord'],['rouge','province Sud'],['bleu','îles Loyauté']],['Pouembout|0','Koné|0','Nouméa|1|i:noumea','Ouvéa|2','Lifou|2']);
/* carte de fin de chapitre : à entourer, pour la fiche élève */
X.mapTask=function(){
  var ch=api.chs()[api.ci()],lieux=(ch.labels||[]).map(function(l){return l.text;}).filter(function(t){return typeof t=='string'&&t.length<28;}).slice(0,3),leg=(ch.legend||[]).map(function(l){return l[1];});
  if(!lieux.length)return null;var src='';try{src=api.snap(api.ci(),{labels:true,dark:false});}catch(e){}
  return {html:'<p><b>{n}. Sur la carte.</b> Entoure en rouge : '+lieux.join(', ')+'.'+(leg.length?' Puis écris sous la carte ce que montre chaque couleur de la légende.':'')+'</p>'+(src?'<img class="exo-map" src="'+src+'" alt="Carte de fin de chapitre du dossier d’enquête">':'<p>[Carte de fin de chapitre du dossier d’enquête]</p>'),
   cor:'Lieux à entourer : '+lieux.join(', ')+'.'+(leg.length?' Légende : '+leg.join(' ; ')+'.':'')};
};
X.key=function(){return api.vol().id+'-'+api.ci();};
/* bouton dans le tiroir « Activités » */
function hook(){
  var tiles=document.querySelector('.drawer [data-sec="act"] .tiles');
  if(tiles&&!tiles.querySelector('[data-exo]')){
    var b=document.createElement('button');b.type='button';b.className='tile';b.setAttribute('data-exo','1');
    b.innerHTML='<span class="ti" aria-hidden="true">✏️</span><b>J’entoure, je colorie</b><small>Deux exercices au doigt (volets d’histoire).</small>';
    b.addEventListener('click',function(){var k=X.key();if(X.has(k)){var x=document.getElementById('drX');if(x)x.click();X.open(k);}else{b.querySelector('small').textContent='Pas encore d’exercice pour ce chapitre.';}});
    tiles.insertBefore(b,tiles.querySelector('[data-enq]'));
  }
}
if(document.readyState=='loading')document.addEventListener('DOMContentLoaded',hook);else hook();
})();
