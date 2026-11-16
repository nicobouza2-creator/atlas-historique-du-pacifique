/* Atlas historique du Pacifique · Atlas d’histoire — Collège — © 2026 Nicolas BOUZA. Idée, conception et réalisation : Nicolas BOUZA,
   avec l’assistance de Claude (Anthropic). Licence CC BY-NC-ND 4.0. https://github.com/nicobouza2-creator/atlas-historique-du-pacifique */
/* Fiches séquences — cœur commun aux deux atlas : rendu de la fiche (trame des fiches DENC),
   fenêtre modifiable, impression / PDF, export Word. Les données viennent de SEQ.build() (un adaptateur par atlas). */
(function(){
'use strict';
var SEQ=window.SEQ=window.SEQ||{};
var COLS=['Phase','Durée','Déroulement (rôle de l’enseignant)','Activités des élèves','Modalités et matériel','Différenciation'];
function li(a){a=(a||[]).filter(Boolean);return a.length?'<ul>'+a.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>':'';}
function val(v){return Array.isArray(v)?li(v):(v||'');}
function row(k,v,blank){v=val(v);if(!v&&!blank)return '';return '<tr><th>'+k+'</th><td>'+(v||'&nbsp;')+'</td></tr>';}
/* phases : [emplacement, minutes, enseignant, élèves, modalités, différenciation] → lignes nommées selon la matière */
SEQ.phases=function(list,names){
  var out=[];
  list.forEach(function(p){
    if(!p)return;var n=names[p[0]];
    if(!n&&out.length){var o=out[out.length-1];o.d+=p[1];['ens','el','mod','dif'].forEach(function(k,i){var x=p[i+2];if(x)o[k]=o[k]?o[k]+'<br>'+x:x;});return;}
    out.push({t:n||p[0],d:p[1],ens:p[2]||'',el:p[3]||'',mod:p[4]||'',dif:p[5]||''});
  });
  return out;
};
SEQ.html=function(F){
  var h='<h1>Fiche séquence — '+F.titre+'</h1><p class="fsq-sub">'+F.disc+' · '+F.cycle+' · '+F.seances.length+' séances</p>';
  h+='<table class="fsq-chap"><tbody>'+
   row('Titre de la séquence',F.titre)+row('Cycle / niveau',F.cycle+(F.niveau?' — '+F.niveau:''))+
   row('Période',F.periode,1)+row('Nombre d’élèves',F.nb,1)+row('Durée',F.duree)+
   row('Domaine disciplinaire',F.domaine)+row('Composante',F.composante)+row('Domaines du socle',F.socle)+
   row('Compétences travaillées',F.comp)+row('Attendus et repères de progressivité',F.attendus)+
   row('Connaissances et compétences associées',F.connaissances)+row('Objectif de la séquence',F.objectif)+
   row('Objectif langagier',F.objlang)+row('Lexique',F.lexique)+row('Prérequis',F.prerequis)+
   row('Matériel et supports',F.materiel)+row('Croisements entre enseignements',F.croisements)+
   row('Démarche d’apprentissage',F.demarche)+row('Critères de réussite<br><small>L’élève a réussi s’il sait dire ou montrer que…</small>',F.criteres)+
   row('Obstacles pédagogiques',F.obstacles)+row('Différenciation',F.diff)+row('Ancrage calédonien',F.nc)+
   row('Bibliographie / sitographie',F.biblio)+'</tbody></table>';
  h+='<h2>Vue d’ensemble</h2><table class="fsq-vue"><thead><tr><th>Séance</th><th>Titre</th><th>Objectif opérationnel</th><th>Supports de l’atlas</th><th>Durée</th></tr></thead><tbody>'+
   F.seances.map(function(s,i){return '<tr><td>S'+(i+1)+'</td><td>'+s.titre+'</td><td>'+s.objop+'</td><td>'+(s.sup||'')+'</td><td>'+dur(s)+' min</td></tr>';}).join('')+'</tbody></table>';
  F.seances.forEach(function(s,i){
    h+='<h2 class="fsq-s">Séance '+(i+1)+' — '+s.titre+' <small>('+dur(s)+' min)</small></h2><table class="fsq-chap"><tbody>'+
     row('Place dans la séquence','Séance '+(i+1)+' sur '+F.seances.length)+row('Objectif opérationnel',s.objop)+row('Objectif langagier',s.objlang)+
     row('Matériel et supports',s.materiel)+row('Critères de réussite',s.crit)+'</tbody></table>'+
     '<table class="fsq-ph"><thead><tr>'+COLS.map(function(c){return '<th>'+c+'</th>';}).join('')+'</tr></thead><tbody>'+
     s.phases.map(function(p){return '<tr><td><b>'+p.t+'</b></td><td>'+p.d+' min</td><td>'+p.ens+'</td><td>'+p.el+'</td><td>'+p.mod+'</td><td>'+p.dif+'</td></tr>';}).join('')+'</tbody></table>'+
     (s.trace?'<p class="fsq-tr"><b>Trace écrite de la séance :</b> '+s.trace+'</p>':'');
  });
  h+='<h2>Trace écrite de la séquence</h2><div class="fsq-box">'+F.trace+'</div>';
  if(F.evaluation)h+='<h2>Évaluation</h2><div class="fsq-box">'+val(F.evaluation)+'</div>';
  if(F.prolong)h+='<h2>Prolongements et variantes</h2><table class="fsq-chap"><tbody>'+F.prolong.map(function(x){return row(x[0],x[1]);}).join('')+'</tbody></table>';
  if(F.annexe)h+=F.annexe;
  h+='<h2>Bilan de l’enseignant</h2><table class="fsq-chap"><tbody>'+row('Réussites','',1)+row('Difficultés','',1)+row('Suite à donner','',1)+'</tbody></table>';
  h+='<p class="fsq-foot">'+(F.pied||'')+'</p>';
  return h;
};
function dur(s){return s.phases.reduce(function(a,p){return a+p.d;},0);}
SEQ.css='.fsq-ov{position:fixed;inset:0;z-index:20000;background:#e9edf2;color:#1b2430;display:flex;flex-direction:column;font:15px/1.45 system-ui,-apple-system,"Segoe UI",Arial,sans-serif}'+
 '.fsq-bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:8px 12px;background:#1f2d3d;color:#fff}'+
 '.fsq-bar b{flex:1 1 180px;font-size:16px}.fsq-bar button,.fsq-bar select{font:600 14px system-ui,sans-serif;min-height:42px;padding:6px 12px;border-radius:10px;border:1px solid #5b6b7d;background:#2f4156;color:#fff;cursor:pointer}'+
 '.fsq-bar button.pri{background:#f2b632;color:#1b2430;border-color:#f2b632}.fsq-bar .msg{font-size:13px;opacity:.85;flex-basis:100%}'+
 '.fsq-scroll{flex:1;overflow:auto;padding:14px;-webkit-user-select:text;user-select:text}'+
 '.fsq{background:#fff;max-width:1060px;margin:0 auto;padding:22px 26px;border-radius:8px;box-shadow:0 2px 14px rgba(0,0,0,.15);outline:none;-webkit-user-select:text;user-select:text}'+
 '.fsq *{-webkit-user-select:text;user-select:text}'+
 '.fsq h1{font-size:22px;margin:0 0 2px}.fsq .fsq-sub{margin:0 0 12px;color:#55606d}.fsq h2{font-size:17px;margin:20px 0 6px;padding:5px 8px;background:#eef3f8;border-left:5px solid #2b7de0}'+
 '.fsq h2 small{font-weight:400;color:#55606d}.fsq table{border-collapse:collapse;width:100%;margin:6px 0 10px;table-layout:fixed}'+
 '.fsq th,.fsq td{border:1px solid #9aa7b5;padding:5px 7px;vertical-align:top;text-align:left;font-size:13.5px;word-wrap:break-word}'+
 '.fsq th{background:#f1f4f8}.fsq th small{font-weight:400}.fsq .fsq-chap th{width:24%}.fsq ul{margin:0;padding-left:18px}.fsq li{margin:1px 0}'+
 '.fsq .fsq-ph th:nth-child(1){width:15%}.fsq .fsq-ph th:nth-child(2){width:7%}.fsq .fsq-ph th:nth-child(3){width:24%}.fsq .fsq-ph th:nth-child(4){width:22%}.fsq .fsq-ph th:nth-child(5){width:16%}'+
 '.fsq .fsq-vue th:nth-child(1){width:7%}.fsq .fsq-vue th:nth-child(5){width:8%}.fsq .fsq-vue th:nth-child(2){width:20%}'+
 '.fsq .fsq-box{border:1px solid #9aa7b5;border-radius:6px;padding:8px 12px;background:#f7fbf7}.fsq .fsq-tr{margin:4px 0 0}.fsq .fsq-foot{font-size:12px;color:#66727f;margin-top:16px}'+
 '@media (max-width:700px){.fsq{padding:12px}.fsq table{table-layout:auto}.fsq .fsq-ph{display:block;overflow-x:auto}.fsq .fsq-ph th,.fsq .fsq-ph td{min-width:150px}.fsq .fsq-ph th:nth-child(2),.fsq .fsq-ph td:nth-child(2){min-width:60px}}'+
 '@media print{body.fsq-on>*:not(.fsq-ov){display:none!important}body.fsq-on{background:#fff!important;overflow:visible!important;height:auto!important}html{overflow:visible!important;height:auto!important;background:#fff!important}'+
 '.fsq-ov{position:static!important;display:block!important;background:#fff}.fsq-bar{display:none!important}.fsq-scroll{overflow:visible!important;padding:0}.fsq{box-shadow:none;max-width:none;padding:0}'+
 '.fsq h1{font-size:15pt}.fsq h2.exo-h{break-before:page}.fsq h2{break-after:avoid;font-size:11.5pt;margin:10pt 0 4pt}.fsq tr{break-inside:avoid}.fsq thead{display:table-header-group}.fsq th,.fsq td{font-size:8.8pt;padding:2.5pt 4pt;line-height:1.3}.fsq .fsq-box,.fsq p{font-size:9.5pt}@page{size:A4 landscape;margin:10mm}}';
var WCSS='body{font-family:Calibri,Arial,sans-serif;font-size:10.5pt}h1{font-size:16pt}h2{font-size:12.5pt;background:#eef3f8;margin-top:14pt}table{border-collapse:collapse;width:100%}'+
 'th,td{border:1px solid #777;padding:3pt 5pt;vertical-align:top;text-align:left;font-size:10pt}th{background:#f1f4f8}ul{margin:0 0 0 14pt;padding:0}.exo-p td{text-align:center;height:60pt}.exo-em{font-size:22pt}.exo-bx{border:1pt solid #333}.exo-cor{font-size:8.5pt;color:#444}'+
 '@page WordSection1{size:841.9pt 595.3pt;mso-page-orientation:landscape;margin:1.5cm}div.WordSection1{page:WordSection1}';
SEQ.word=function(inner,titre){
  inner=inner.replace(/<img[^>]*alt="([^"]*)"[^>]*>/g,'[$1]').replace(/<img[^>]*>/g,'');
  return '﻿<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"><meta name="author" content="Nicolas BOUZA"><title>'+titre+
   '</title><!--[if gte mso 9]><xml><o:DocumentProperties><o:Author>Nicolas BOUZA</o:Author><o:LastAuthor>Nicolas BOUZA</o:LastAuthor></o:DocumentProperties></xml><xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom></w:WordDocument></xml><![endif]--><style>'+WCSS+'</style></head><body><div class="WordSection1">'+inner+'</div></body></html>';
};
function slug(s){return String(s).normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-zA-Z0-9]+/g,'-').replace(/^-|-$/g,'').toLowerCase().slice(0,60);}
SEQ.slug=slug;
SEQ.save=async function(blob,fn,msg){
  var d=null;try{d=window.claude&&claude.use?await claude.use('downloads'):null;}catch(e){}
  if(d){try{await d.save({filename:fn,data:blob});msg('Enregistré : '+fn);}catch(e){msg(e&&e.code=='declined'?'Téléchargement annulé.':'Téléchargement impossible dans cette vue.');}return;}
  if(window.claude){msg('Enregistrement impossible dans cette vue (appli mobile) : ouvrez l’atlas sur un ordinateur.');return;}
  try{var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=fn;document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove();},4000);msg('Téléchargé : '+fn);}
  catch(e){msg('Téléchargement impossible dans cette vue.');}
};
/* Export vers Fiche-sequence-NC.html (Poste de pilotage) : {app:'fiche-sequence-nc',fiches:{id:fiche},seances:{}} —
   même forme que son propre export ; le cahier journal de classe sait aussi le lire (Réglages ▸ 📄). */
function fnTxt(h){var d=document.createElement('div');d.innerHTML=Array.isArray(h)?h.join('<br>'):String(h==null?'':h);
  d.querySelectorAll('br,li,p,tr,div').forEach(function(e){e.insertAdjacentText('afterend','\n');});
  return d.textContent.replace(/[ \t]+\n/g,'\n').replace(/\n{2,}/g,'\n').trim();}
function fnArr(v){return (Array.isArray(v)?v:fnTxt(v).split('\n')).map(fnTxt).filter(Boolean);}
SEQ.ficheNC=function(F){
  var n=F.seances.length,S={dec:[],mai:[],eva:[],tra:[]},EV={dec:'Diagnostique',mai:'Formative',eva:'Sommative',tra:''};
  F.seances.forEach(function(s,i){
    var pk=s.pk||(i===0?'dec':i===n-1?'eva':'mai');
    S[pk].push({titre:fnTxt(s.titre),objop:fnTxt(s.objop),objlang:fnTxt(s.objlang),duree:dur(s)+' min',
      activites:fnTxt(s.sup),demarche:'',materiel:fnArr(s.materiel),differenciation:'',eval:EV[pk],criteres:fnTxt(s.crit),trace:fnTxt(s.trace),
      phases:(s.phases||[]).map(function(p){return {t:fnTxt(p.t),d:p.d+' min',ens:fnTxt(p.ens),el:fnTxt(p.el),mod:fnTxt(p.mod),dif:fnTxt(p.dif)};})});
  });
  var cyc=(String(F.cycle||'').match(/\d/)||[''])[0],id='atlas-'+slug(F.titre)+(cyc?'-c'+cyc:''),lib={};
  lib[id]={id:id,updated:Date.now(),source:'atlas',titre:fnTxt(F.titre),classe:fnTxt(F.niveau||F.cycle),cycle:cyc,
    sels:[{selLab:{disc:fnTxt(F.disc),comp:fnTxt(F.domaine),cm:fnArr(F.comp).join(' ; ')}}],
    objectif:fnTxt(F.objectif),objlang:fnTxt(F.objlang),lexique:fnTxt(F.lexique),prerequis:fnTxt(F.prerequis),materiel:fnArr(F.materiel),
    demarche:fnTxt(F.demarche),obstacles:fnArr(F.obstacles).join('\n'),differenciation:fnTxt(F.diff),evalItems:fnArr(F.criteres),
    institutionnalisation:fnTxt(F.trace),seances:S};
  return {app:'fiche-sequence-nc',version:1,origine:'atlas',auteur:'Nicolas BOUZA',credit:'Atlas — © 2026 Nicolas BOUZA, réalisé avec l’assistance de Claude (Anthropic), CC BY-NC-ND 4.0',date:new Date().toISOString(),fiches:lib,seances:{}};
};
SEQ.close=function(){var o=document.querySelector('.fsq-ov');if(o)o.remove();document.body.classList.remove('fsq-on');};
/* SEQ.open(args…) : args passés à SEQ.build(args…, opt) ; SEQ.options = [{k,label,vals:[[v,texte]]}] (facultatif) */
SEQ.open=function(){
  var args=[].slice.call(arguments),opt=SEQ.opt=SEQ.opt||{};
  if(!document.getElementById('fsq-css')){var st=document.createElement('style');st.id='fsq-css';st.textContent=SEQ.css+(window.EXOS&&EXOS.css?EXOS.css.replace(/(^|\})(\.exo)/g,'$1.fsq $2'):'');document.head.appendChild(st);}
  SEQ.close();
  if(document.fullscreenElement&&document.exitFullscreen)try{document.exitFullscreen();}catch(e){}
  var ov=document.createElement('div');ov.className='fsq-ov';
  var os=(SEQ.options?SEQ.options.apply(null,args):[]).map(function(o){return '<select data-k="'+o.k+'" title="'+o.label+'">'+o.vals.map(function(v){return '<option value="'+v[0]+'"'+(String(opt[o.k]==null?o.def:opt[o.k])==String(v[0])?' selected':'')+'>'+v[1]+'</option>';}).join('')+'</select>';}).join('');
  ov.innerHTML='<div class="fsq-bar"><b>📋 Fiche séquence</b>'+os+(window.claude?'':'<button data-b="print" class="pri">🖨 Imprimer / PDF</button>')+(SEQ.pdf&&window.claude?'<button data-b="pdf" class="pri">⬇ PDF</button>':'')+'<button data-b="word">⬇ Word (modifiable)</button><button data-b="fnc" title="Fichier .json à importer dans Fiche séquence / séance NC (Poste de pilotage) ou dans le cahier journal">⬇ Fiche-sequence-NC</button><button data-b="x" aria-label="Fermer">✕ Fermer</button><span class="msg">Le texte est modifiable : touchez une case pour l’adapter à votre classe. Word reprend vos modifications ; le PDF est la version standard.</span></div><div class="fsq-scroll"><div class="fsq" contenteditable="true" spellcheck="false"></div></div>';
  document.body.appendChild(ov);document.body.classList.add('fsq-on');
  var box=ov.querySelector('.fsq'),msgEl=ov.querySelector('.msg'),F;
  function msg(t){msgEl.textContent=t;}
  function draw(){F=SEQ.build.apply(null,args.concat([opt]));box.innerHTML=SEQ.html(F);}
  draw();
  ov.querySelectorAll('select').forEach(function(s){s.onchange=function(){opt[s.dataset.k]=s.value;draw();};});
  ov.addEventListener('keydown',function(e){e.stopPropagation();},true);
  ov.querySelector('[data-b=x]').onclick=SEQ.close;
  var bp=ov.querySelector('[data-b=pdf]');if(bp)bp.onclick=function(){msg('Préparation du PDF…');SEQ.pdf.apply(null,args).then(function(b){return SEQ.save(new Blob([b],{type:'application/pdf'}),'fiche-sequence-'+slug(F.titre)+'.pdf',msg);},function(){msg('PDF introuvable. Utilisez Word.');});};
  var bpr=ov.querySelector('[data-b=print]');if(bpr)bpr.onclick=function(){msg('Dans la fenêtre d’impression, choisissez « Enregistrer au format PDF » pour un PDF (paysage). Si rien ne s’ouvre, utilisez Word.');try{window.print();}catch(e){}};
  ov.querySelector('[data-b=word]').onclick=function(){SEQ.save(new Blob([SEQ.word(box.innerHTML,F.titre)],{type:'application/msword'}),'fiche-sequence-'+slug(F.titre)+'.doc',msg);};
  ov.querySelector('[data-b=fnc]').onclick=function(){SEQ.save(new Blob([JSON.stringify(SEQ.ficheNC(F),null,1)],{type:'application/json'}),'fiche-sequence-nc-'+slug(F.titre)+'.json',msg);};
  return F;
};
})();

/* fiche élève de lecture-compréhension (annexe) : texte + questions ; qs = [[question, réponse, [choix] facultatif]] */
SEQ.lecture=function(titre,texte,qs,src){
  var h='<h2 class="fsq-s exo-h">Fiche élève — Je lis et je comprends</h2><p>Prénom : ………………………………… &nbsp; Date : ……………………</p><h3 style="margin:6px 0">'+titre+'</h3><div class="fsq-box" style="background:#fff;font-size:12.5pt;line-height:1.6">'+texte+'</div>'+(src?'<p style="font-size:11px;color:#555">'+src+'</p>':'');
  h+=qs.map(function(x,i){return '<p><b>'+(i+1)+'.</b> '+x[0]+(x[2]?'<br>'+x[2].map(function(c){return '☐ '+c;}).join(' &nbsp;&nbsp; '):'<br>…………………………………………………………………………………………………………………')+'</p>';}).join('');
  return h+'<p><b>'+(qs.length+1)+'.</b> Souligne dans le texte la phrase qui t’a appris quelque chose de nouveau, puis recopie-la.<br>…………………………………………………………………………………………………………………</p><p class="exo-cor"><b>Corrigé (à découper) :</b> '+qs.map(function(x,i){return (i+1)+'. '+x[1];}).join(' ')+'</p>';
};
SEQ.variantes=function(n){return ['Version courte (3 séances) : séance 1, une seule séance d’enquête sur les pages les plus parlantes, puis la séance de structuration ; l’évaluation se fait par le quiz de l’atlas.','Version ateliers tournants : trois ateliers de 15 min (écran, dossier papier avec un adulte, fiche « J’entoure, je colorie ») sur deux séances.','Classe à plusieurs niveaux : les plus jeunes font l’animation et la fiche à entourer, les plus grands l’enquête ; mise en commun ensemble.','Sans écran : dossier d’enquête imprimé, fiche de lecture et fiche à entourer suffisent ; l’animation est montrée une fois au vidéoprojecteur.','Variante de séance : remplacer la mise en commun par un exposé de deux élèves « reporters », ou par un débat à partir des hypothèses de départ.'];};
/* Fiches séquences — atlas historique : une fiche par chapitre, construite à partir du chapitre (carte animée, récit,
   mots, questions), de son enquête (pages de documents, indices, conclusion) et des phases des fiches séance DENC. */
(function(){
'use strict';
var SEQ=window.SEQ,A=window.ATLAS;if(!SEQ||!A||!A.api)return;
var api=A.api;
var NH={A:'Mise en situation / déclencheur',C:'Recherche / investigation',D:'Mise en commun',E:'Institutionnalisation / structuration',V:'Évaluation',M:'Bilan métacognitif'};
var NE={A:'Mise en situation',C:'Recherche',E:'Entraînement et trace écrite',D:'Mise en commun',V:'Évaluation',M:'Bilan métacognitif'};
var DISC={monde:'Histoire',pacifique:'Histoire',decouvertes:'Histoire',caledonie:'Histoire',geonc:'Géographie',nickel:'Géographie',mondial:'Géographie',emc:'Enseignement moral et civique'};
var DK={img:'image',txt:'texte',map:'carte',tab:'tableau',frise:'frise',entoure:'carte à entourer',colorie:'carte à colorier'};
var QK={qcm:'QCM',vf:'vrai/faux',ordre:'remise en ordre',trou:'texte à trous',relie:'relier',libre:'réponse rédigée',entoure:'entourer sur la carte',colorie:'colorier'};
function q(s){return '« '+s+' »';}
function clean(s){return String(s||'').replace(/[\[\]*]/g,'').replace(/^[^A-Za-zÀ-ÿ0-9«]+/,'');}
function docT(d){var im=d.k=='img'&&window.IMG&&IMG[d.id];return (DK[d.k]||d.k)+' '+q(d.t||d.cap||(im&&im.c)||'de fin de chapitre');}
function docs(p){return [].concat(p.d||[]).map(docT).join(' ; ');}
function qk(l){var o={};(l||[]).forEach(function(x){o[QK[x.k]||x.k]=1;});return Object.keys(o).join(', ');}
function qs(l){return (l||[]).map(function(x){return clean(x.q);}).join(' / ');}
SEQ.options=function(){var V=api.vol(),col=/^<p><b>Collège/.test(V.info||'');return [{k:'lv',label:'Niveau',def:col?'c':'p',vals:[['p','École primaire (CM1-CM2)'],['c','Collège']]}];};
SEQ.build=function(opt){
  var V=api.vol(),CHS=api.chs(),ci=api.ci(),ch=CHS[ci],E=(window.ENQ&&ENQ[V.id]||[])[ci];
  var disc=DISC[V.id]||'Histoire et géographie',emc=V.id=='emc',geo=disc=='Géographie',NM=emc?NE:NH;
  var col0=/^<p><b>Collège/.test(V.info||''),lv=(opt&&opt.lv)||(col0?'c':'p'),pr=lv=='p';
  var ph=function(l){var r=SEQ.phases(l,NM);if(emc){var i=r.findIndex(function(x){return x.t==NE.D;}),j=r.findIndex(function(x){return x.t==NE.E;});if(i>-1&&j>i){var t=r[j];r.splice(j,1);r.splice(i,0,t);}}return r;};
  var nn=String(ci+1).padStart(2,'0'),mots=(ch.mots||[]).map(function(m){return m[0];}),eras=(ch.ph||[]).map(function(p){return p.era;});
  var fac=((window.FACILE||{})[V.id]||[])[ci]||[],recit=(ch.ph||[]).map(function(p){return p.txt;});
  var prog=((V.info||'').match(/<p>(.*?)<\/p>/)||[])[1]||'';
  var prev=ci>0?CHS[ci-1]:null,leg=(ch.legend||[]).map(function(l){return l[1];});
  var lieux=(ch.labels||[]).map(function(l){return l.text;}).filter(function(x){return typeof x=='string';}).slice(0,8);
  var pg=E?E.pg:[],Q=function(p){return pr?p.p:p.c;},half=Math.ceil(pg.length/2),G=[pg.slice(0,half),pg.slice(half)];
  var lvTxt=pr?'niveau « École primaire »':'niveau « Collège »',dos='Dossier d’enquête à imprimer : '+V.id+'-'+nn+' (PDF ou Word) — pièces, cahier '+(pr?'primaire':'collège')+', corrigé';
  var S=[];
  /* S1 — carte animée */
  S.push({titre:'Découvrir : la carte animée',sup:'Carte animée du chapitre · frise',
   objop:(geo?'Décrire et localiser':'Situer dans le temps et dans l’espace')+' : '+q(ch.short)+(ch.dates?' ('+ch.dates+')':'')+' ; formuler une hypothèse'+(E?' sur la question '+q(E.q):'')+'.',
   objlang:'Raconter les étapes avec les connecteurs de temps (d’abord, puis, ensuite, enfin)'+(mots.length?' ; employer : '+mots.slice(0,3).join(', '):'')+'.',
   materiel:['Atlas au TBI : volet '+q(V.title)+', chapitre '+(ci+1)+' '+q(ch.short)+' (environ '+Math.round(ch.dur)+' s d’animation)','Frise de la classe, planisphère ou carte murale','Cahier, fond de carte'],
   crit:'L’élève situe le chapitre sur la frise'+(lieux.length?', montre sur la carte : '+lieux.slice(0,3).join(', '):'')+' et raconte au moins deux étapes dans l’ordre.',
   phases:ph([
    ['A',8,(E?'Pose la question de l’enquête : '+q(E.q)+' ':'Présente le sujet. ')+'Recueille les idées sans valider'+(E?', puis propose les trois hypothèses de l’atlas : '+E.h.map(q).join(' ; ')+'.':'.'),'Donnent leurs idées, choisissent une hypothèse et la notent.','Collectif puis individuel','Hypothèse choisie par étiquette ; reformulation par un pair.'],
    ['C',17,'Lance la carte en « Pause à chaque étape ». Étapes : '+eras.join(' → ')+'. À chaque arrêt : « Où est-on ? Quand ? Que se passe-t-il ? » avant de lire le récit.','Décrivent la carte (couleurs, flèches, légende), lisent ou écoutent le récit.','Collectif, TBI','« Texte facile », « Gros texte », « Lire à voix haute » ; un élève montre au TBI.'],
    ['D',10,'Fait raconter le chapitre sans la carte, puis la relance pour vérifier.'+(leg.length?' Fait lire la légende : '+leg.join(', ')+'.':''),'Racontent dans l’ordre, viennent montrer les lieux'+(lieux.length?' ('+lieux.join(', ')+')':'')+'.','Collectif','Images des étapes à remettre dans l’ordre.'],
    ['E',10,'Fait placer '+(ch.dates?q(ch.dates):'la période')+' sur la frise de la classe et le lieu sur la carte murale. Fait noter les mots : '+(mots.join(', ')||'ceux du récit')+'.','Complètent la frise et le fond de carte du cahier, copient les mots.','Individuel, cahier','Étiquettes à coller sur la frise ; fond de carte déjà légendé.'],
    ['M',3,'« Qu’est-ce que je savais déjà ? Qu’est-ce que la carte m’a appris ? »','Répondent à l’oral.','Collectif','']]),
   trace:'Titre, période sur la frise, lieu sur la carte, notre question et nos hypothèses.'});
  /* S2, S3 — enquête */
  if(E)G.forEach(function(g,gi){
   var o=gi?half:0,last=gi==1;
   S.push({titre:'Enquêter sur documents ('+(gi+1)+'/2)',sup:'Mode enquête, pages '+(o+1)+' à '+(o+g.length)+' · dossier PDF / Word',
    objop:'Prélever des informations dans '+g.map(function(p){return docs(p);}).join(' ; ')+'.',
    objlang:'Présenter un document (nature, auteur, date) et justifier une réponse en le citant.',
    materiel:['Mode enquête de l’atlas ('+lvTxt+')',dos],
    crit:g.map(function(p){return p.i;}),
    phases:ph([
     gi==0?['A',6,'Rappelle la question '+q(E.q)+' et les hypothèses. Présente le dossier : '+pg.length+' pages, un indice à gagner par page. Fait observer la nature des documents (image, texte, carte, tableau, frise).','Feuillettent, nomment les types de documents.','Collectif','']
          :['A',6,'Fait relire les indices des pages 1 à '+o+' et dire ce qu’il reste à prouver.','Relisent le carnet d’indices.','Collectif','Indices affichés au tableau.']
    ].concat(g.map(function(p,i){
     return ['C',Math.round(26/g.length),'Page '+(o+i+1)+' — '+q(p.t)+'. Document(s) : '+docs(p)+'. Fait d’abord présenter le document, puis répondre ('+qk(Q(p))+') : '+qs(Q(p)),'Observent ou lisent, répondent, notent l’indice : '+p.i,'Binômes, dossier papier ou tablette',pr?'Document lu par l’adulte ; questions à l’oral ; image agrandie au TBI.':'Cahier « primaire » pour les élèves en difficulté ; réponse rédigée exigée pour les autres.'];
    }),last?[
     ['D',8,'Fait relire le carnet d’indices et revenir sur les hypothèses : laquelle est confirmée, par quel document ?','Citent le document qui prouve, écartent les autres hypothèses.','Collectif','Indices affichés un par un.'],
     ['E',8,pr?'Fait compléter la conclusion (texte à trous).':'Fait rédiger la conclusion de l’enquête en quelques lignes.',pr?'Complètent : '+clean(E.f.p):'Rédigent une conclusion qui cite au moins deux documents.','Individuel',pr?'Mots à placer fournis.':'Texte à trous du niveau primaire comme appui.'],
     ['M',2,'« Quel document m’a le plus aidé ? Peut-on toujours croire un document ? »','Répondent à l’oral.','Collectif','']]
    :[['D',10,'Fait lire les indices trouvés ; demande quelles hypothèses sont déjà fragilisées.','Lisent un indice, disent ce qu’il prouve.','Collectif','Indices affichés un par un.'],
     ['M',3,'« De quoi suis-je sûr ? Que me manque-t-il ? »','Répondent à l’oral.','Collectif','']])),
    trace:last?E.f.r:'Nos premiers indices : '+g.map(function(p){return p.i;}).join(' ')});
  });
  /* S4 — structurer */
  S.push({titre:'Structurer : la carte, la frise, la leçon',sup:'Activités : Placer les noms · Où est… ? · Remettre dans l’ordre',
   objop:'Replacer les lieux et les étapes du chapitre, puis rédiger la leçon.',
   objlang:'Employer à l’écrit : '+(mots.join(', ')||'le lexique du chapitre')+'.',
   materiel:['Activités de l’atlas au TBI ou sur tablettes','Fiche élève « J’entoure, je colorie » (en annexe de cette fiche : images à entourer, code couleur, carte de fin de chapitre) ; la même activité se fait au doigt dans l’atlas (✏️)','Cahier'],
   crit:'Lieux bien placés, étapes dans l’ordre, leçon copiée sans erreur sur les mots du chapitre.',
   phases:ph([
    ['A',5,'Fait redire la réponse à la question de l’enquête. Annonce : « On range ce qu’on a appris sur la carte, sur la frise et dans la leçon. »','Rappellent la conclusion.','Collectif',''],
    ['C',17,'Lance « Placer les noms » puis « Remettre dans l’ordre ». Sur la carte papier : fait entourer '+(lieux.length?lieux.slice(0,3).join(', '):'les lieux du chapitre')+(leg.length?' et colorier la légende ('+leg.slice(0,4).join(', ')+')':'')+'.','Placent les noms au doigt, ordonnent les étapes, entourent et colorient sur leur carte.','Ateliers tournants : TBI / tablettes / carte papier','Moins de noms à placer ; carte déjà partiellement légendée ; « Où est… ? » en défi pour les plus rapides.'],
    ['D',8,'Corrige la carte au TBI (carte de fin de chapitre).','Comparent, corrigent en vert.','Collectif',''],
    ['E',13,'Construit la leçon avec la classe à partir du récit de l’atlas, la fait copier avec les mots et leur définition.','Dictent, copient, collent la carte.','Collectif puis individuel','Leçon du « Texte facile », à trous ou photocopiée.'],
    ['M',2,'« Qu’est-ce que je dois savoir refaire seul ? »','Répondent à l’oral.','Collectif','']]),
   trace:(fac.length?fac.map(clean).join(' '):recit.join(' '))});
  /* S5 — évaluer */
  S.push({titre:'Évaluer et prolonger',sup:'Quiz du chapitre · pièce en plus du dossier',
   objop:'Répondre seul aux questions du chapitre et lire un document nouveau.',
   objlang:'Répondre par une phrase complète.',
   materiel:['Quiz noté de l’atlas (tablette) ou questions sur feuille','« Pièce en plus » du dossier d’enquête'],
   crit:'Au moins '+Math.max(2,Math.ceil((ch.q||[]).length*0.7))+' réponses justes sur '+(ch.q||[]).length+' ; une information exacte tirée du document nouveau.',
   phases:ph([
    ['A',5,'Fait relire la leçon une minute, cahier fermé ensuite.','Relisent, se questionnent à deux.','Binômes',''],
    ['V',22,'Fait passer l’évaluation : '+(ch.q||[]).map(function(x){return x[0];}).join(' / ')+' Puis la « pièce en plus » du dossier, avec sa question.','Répondent seuls.','Individuel','Quiz à choix sur tablette ; questions lues par l’adulte ; temps majoré.'],
    ['D',12,'Corrige avec la carte animée : chaque réponse est montrée sur la carte.','Corrigent en vert.','Collectif, TBI',''],
    ['E',6,ci<CHS.length-1?'Ouvre sur le chapitre suivant : '+q(CHS[ci+1].short)+'.':'Fait relier ce chapitre aux précédents du volet.','Font des hypothèses sur la suite.','Collectif',''],
    ['M',3,'« Qu’est-ce qui a été facile ? difficile ? Comment ai-je appris ma leçon ? »','Remplissent le bilan.','Individuel','']]),
   trace:''});
  return {titre:ch.short+(ch.dates?' ('+ch.dates+')':''),disc:disc,cycle:pr?'Cycle 3':'Collège',niveau:pr?'CM1 – CM2':(V.id=='decouvertes'?'5e':V.id=='monde'?'6e':'6e – 5e'),periode:'',nb:'',
   duree:S.length+' séances de 45 à 50 min',domaine:emc?'Enseignement moral et civique':'Histoire et géographie',composante:disc+' — '+V.title,
   socle:['Domaine 5 — Les représentations du monde et l’activité humaine','Domaine 1 — Les langages pour penser et communiquer','Domaine 2 — Les méthodes et outils pour apprendre'].concat(emc?['Domaine 3 — La formation de la personne et du citoyen']:[]),
   comp:emc?['Respecter autrui ; acquérir et partager les valeurs de la République','Construire une culture civique','Comprendre un document, argumenter, débattre']
    :['Se repérer dans le temps : construire des repères historiques','Se repérer dans l’espace : construire des repères géographiques','Comprendre un document (nature, auteur, date, sens)','Raisonner, justifier une démarche et les choix effectués','Pratiquer différents langages : récit, carte, frise, tableau','S’informer dans le monde du numérique'],
   attendus:prog,connaissances:recit,
   objectif:(E?'Répondre à la question '+q(E.q)+' ':'Comprendre '+q(ch.short)+' ')+'à partir d’une carte animée et d’un dossier de documents ; retenir les repères ('+(ch.dates||'période')+(lieux.length?' ; '+lieux.slice(0,4).join(', '):'')+').',
   objlang:'Raconter, présenter un document, justifier en citant ; lexique du chapitre.',
   lexique:(ch.mots||[]).map(function(m){return '<b>'+m[0]+'</b> : '+m[1];}),
   prerequis:prev?'Chapitre précédent : '+q(prev.short)+'. Savoir lire une frise et la légende d’une carte.':'Savoir lire une frise et la légende d’une carte.',
   materiel:['Atlas historique du Pacifique (TBI, tablettes) : carte animée, activités, mode enquête',dos,'Frise de la classe, carte murale, cahier'],
   croisements:['Français : lecture documentaire, récit oral et écrit, lexique',geo?'Histoire : situer les faits dans le temps':'Géographie : localiser, lire une carte et sa légende','Mathématiques : lire un tableau, calculer une durée'],
   demarche:'Démarche d’enquête : déclencheur et hypothèses, carte animée, étude de documents de natures variées, mise en commun, structuration (carte, frise, leçon), évaluation.',
   criteres:(E?pg.map(function(p){return p.i;}):[]).concat(mots.length?['Il emploie à bon escient : '+mots.join(', ')+'.']:[]),
   obstacles:(E?E.h.slice(1).map(function(h){return 'Représentation initiale possible : '+q(h);}):[]).concat(['Confusion entre la date d’un document et la date des faits qu’il montre.','Lecture de la carte : échelle, sens des flèches, tracés schématiques (à dire aux élèves).','Durées longues : s’appuyer sur la frise à chaque séance.']),
   diff:['« Texte facile », « Gros texte », « Lire à voix haute », « Pause à chaque étape »','Enquête et cahiers à deux niveaux (primaire / collège)','Activités au doigt (TBI, tablette) pour les élèves gênés par l’écrit','Travail en binôme ; un adulte auprès du groupe le plus fragile pendant l’enquête'],
   nc:'',biblio:['Atlas historique du Pacifique, volet '+q(V.title)+', chapitre '+(ci+1)+' (Nicolas Bouza)'].concat(ch.wiki?['Pour le maître : '+[].concat(ch.wiki).map(function(w){return typeof w=='string'?w:(w[0]||w.t||'');}).join(', ')]:[]),
   trace:'<p>'+(fac.length&&pr?fac.map(clean).join(' '):recit.join(' '))+'</p>'+(mots.length?'<p><b>Mots à connaître :</b> '+mots.join(', ')+'.</p>':'')+(E?'<p><b>Réponse à notre question :</b> '+E.f.r+'</p>':''),
   evaluation:['Formative : carnet d’indices de l’enquête, carte légendée.','Sommative (séance '+S.length+') — questions et réponses attendues :'].concat((ch.q||[]).map(function(x){return x[0]+' → <i>'+x[1]+'</i>';})),
   pied:'Fiche générée par l’Atlas historique du Pacifique à partir du chapitre. Trame des fiches séance de la DENC (phases '+(emc?'EMC':'Histoire-Géographie')+'). Compétences et repères à vérifier dans le référentiel LSU avant saisie.',
   prolong:(function(){var P=PLUS[V.id]||PLUS0;return [['Variantes de la séquence et des séances',SEQ.variantes()],['Autres façons de travailler la notion',P.m],['Sortie ou rencontre possible',P.s],['Arts plastiques, histoire des arts',P.a],['Lecture-compréhension (français)','Fiche élève en annexe : le récit du chapitre et ses questions, à mener en séance de lecture (repérer les informations, justifier en citant le texte). Version courte : option « Texte facile » de l’atlas.']];})(),
   annexe:(window.EXOS?EXOS.sheet(V.id+'-'+ci,EXOS.mapTask?EXOS.mapTask():null):'')+SEQ.lecture(ch.short+(ch.dates?' ('+ch.dates+')':''),'<p>'+recit.join('</p><p>')+'</p>',(ch.q||[]).map(function(x){return [x[0],x[1]];}),'Récit de l’Atlas historique du Pacifique.'),
   seances:S};
};
var PLUS={
 monde:{s:['Pétroglyphes ou abri sous roche proche, avec une personne-ressource','Musée de Nouvelle-Calédonie (Nouméa), selon son ouverture','Fouille simulée dans le bac à sable de l’école'],a:['Peinture pariétale à l’ocre et au charbon sur papier kraft froissé','Mains négatives soufflées','Modelage d’une statuette'],m:['Frise géante dans le couloir, une feuille par chapitre','Planisphère au sol : les élèves marchent les migrations','Exposé « un fossile, une carte d’identité »']},
 pacifique:{s:['Centre culturel Tjibaou ou Musée maritime de Nouvelle-Calédonie (pirogues)','Site Lapita de Foué (Koné) ou rencontre avec un archéologue','Accueil à la tribu : parole d’un ancien sur l’origine du clan (faire le geste coutumier)'],a:['Décor Lapita imprimé au peigne dans l’argile','Maquette de pirogue à balancier','Tressage, motifs de tapa'],m:['Carte du Pacifique au sol, déplacement des « pirogues »','Recueil de récits d’origine auprès des familles','Jardin : planter taro et igname']},
 decouvertes:{s:['Musée maritime de Nouvelle-Calédonie (La Pérouse, navigation)','Balade (Pouébo), lieu de l’arrivée de Cook, pour les écoles du Nord','Port ou wharf : observer un bateau, ses instruments'],a:['Portulan vieilli au thé avec rose des vents','Carnet de bord illustré d’un mousse','Maquette de caravelle'],m:['Jeu de rôle : conseil du roi, « faut-il financer le voyage ? »','Défi : s’orienter avec une boussole dans la cour','Tableau comparatif des navigateurs tenu au fil des chapitres']},
 caledonie:{s:['Fort Teremba (Moindou) ou site du bagne à Nouville','Plaine des Gaïacs (Pouembout) : l’aérodrome de 1942','Mairie, monument aux morts, cimetière : relever noms et dates','Centre culturel Tjibaou ; rencontre avec un ancien'],a:['Flèche faîtière en carton sculpté','Portrait ou scène à la manière d’une gravure du XIXe siècle (encre, hachures)','Affiche pour le musée de la classe'],m:['Enquête dans les familles : « d’où vient mon nom, depuis quand ma famille vit-elle ici ? »','Frise de la commune à côté de la frise du pays','Musée de classe : objets et photos apportés, cartels rédigés']}};
var PLUS0={s:['Sortie de lecture de paysage autour de l’école (croquis, photo légendée)','Rencontre avec un élu, un professionnel ou un ancien de la commune','Mairie, wharf, mine ou exploitation proche selon le chapitre'],a:['Croquis de paysage aux crayons de couleur','Carte sensible du quartier ou de la tribu','Affiche ou maquette'],m:['Carte au sol dans la cour','Exposé en binôme à partir d’un document du dossier','Débat réglé à partir des hypothèses']};
/* PDF standard : paquets/seq-<volet>.txt + paquets/seq-index.json dans l'artefact (voir outils/pack.py), seq/<volet>-<nn>.pdf ailleurs */
var PIX=null;
SEQ.pdf=function(){
  var vol=api.vol().id,ci=api.ci(),nn=String(ci+1).padStart(2,'0');
  if(!PIX)PIX=fetch('paquets/seq-index.json').then(function(r){if(!r.ok)throw 0;return r.json();});
  return PIX.then(function(ix){var p=(ix[vol]||[])[ci];if(!p)throw 0;
    return fetch('paquets/seq-'+vol+'.txt',{headers:{Range:'bytes='+p[0]+'-'+(p[0]+p[1]-1)}}).then(function(r){if(!r.ok)throw 0;
      return r.text().then(function(t){var s=atob((r.status===206?t:t.slice(p[0],p[0]+p[1])).trim()),u=new Uint8Array(s.length);for(var i=0;i<s.length;i++)u[i]=s.charCodeAt(i);return new Blob([u]);});});})
   .catch(function(){return fetch('seq/'+vol+'-'+nn+'.pdf').then(function(r){if(!r.ok)throw 0;return r.blob();});});
};
/* bouton dans le tiroir « Fiche prof » et dans le menu des enquêtes */
function hook(){
  var sec=document.querySelector('.drawer [data-sec="fiche"]');
  if(sec&&!sec.querySelector('[data-seq]')){
    var b=document.createElement('button');b.type='button';b.className='tile wide';b.setAttribute('data-seq','1');
    b.innerHTML='<span class="ti" aria-hidden="true">📋</span><b>Fiche séquence du chapitre</b><small>5 séances détaillées (trame DENC), modifiable, à imprimer ou en Word.</small>';
    b.style.cssText='width:100%;margin:0 0 10px';b.addEventListener('click',function(){SEQ.open();});sec.insertBefore(b,sec.firstChild);
  }
}
if(document.readyState=='loading')document.addEventListener('DOMContentLoaded',hook);else hook();
/* mention d'auteur en tête et en pied de chaque fiche séquence (écran, impression, Word, PDF standard) */
(function(){var h0=SEQ.html;SEQ.html=function(F){var a=window.ATLAS_AUTEUR,l=a?a.html:'<p class="aut-line">© 2026 Nicolas BOUZA — CC BY-NC-ND 4.0</p>',h=h0(F),k=h.indexOf('</p>');
  return (k>0?h.slice(0,k+4)+l+h.slice(k+4):l+h)+l;};})();
window.__seq=function(o){return SEQ.html(SEQ.build(o||{}));};
})();
