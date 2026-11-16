/* Atlas historique du Pacifique · Atlas d’histoire — Collège — © 2026 Nicolas BOUZA. Idée, conception et réalisation : Nicolas BOUZA,
   avec l’assistance de Claude (Anthropic). Licence CC BY-NC-ND 4.0. https://github.com/nicobouza2-creator/atlas-historique-du-pacifique */
/* Atlas — interface simplifiée : tiroir (Lecture, Activités, Fiche prof, Réglages), flèches des chapitres,
   focus rendu à la page après un clic (pour que Espace, flèches et F marchent toujours). */
(function(){
  var dr=document.getElementById('drawer'),drT=document.getElementById('drT'),cur=null;
  var btns=[].slice.call(document.querySelectorAll('[data-drawer]'));
  var secs=[].slice.call(dr.querySelectorAll('[data-sec]'));
  function open(k){
    /* le tiroir s'ouvre sous la barre d'outils, qui reste cliquable */
    var hd=document.querySelector('.head'),top=hd?Math.max(0,Math.round(hd.getBoundingClientRect().bottom+6)):0;
    dr.style.top=top+'px';
    cur=k;dr.hidden=false;dr.classList.toggle('wide',k==='fiche');
    secs.forEach(function(s){var on=s.getAttribute('data-sec')===k;s.hidden=!on;if(on)drT.textContent=s.getAttribute('data-title');});
    btns.forEach(function(b){b.setAttribute('aria-expanded',b.getAttribute('data-drawer')===k?'true':'false');});
    dr.querySelector('.dr-b').scrollTop=0;
  }
  function close(){if(cur===null)return;cur=null;dr.hidden=true;btns.forEach(function(b){b.setAttribute('aria-expanded','false');});}
  window.ATLAS_UI={open:open,close:close};
  btns.forEach(function(b){b.addEventListener('click',function(){var k=b.getAttribute('data-drawer');if(cur===k)close();else open(k);});});
  document.getElementById('drX').addEventListener('click',close);
  ['homeBtn','fs'].forEach(function(id){var b=document.getElementById(id);if(b)b.addEventListener('click',close);});
  /* une activité ou un outil de carte choisi : on ferme le tiroir pour voir la carte */
  [].forEach.call(dr.querySelectorAll('[data-act],[data-enq],[data-tool]'),function(b){b.addEventListener('click',function(){setTimeout(close,0);});});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&cur!==null&&!document.querySelector('.act-ov,.enq-ov,.lightbox:not([hidden])')&&document.getElementById('prev-ov').hidden){e.preventDefault();close();}});
  document.addEventListener('pointerdown',function(e){
    if(cur===null)return;var t=e.target;
    if(dr.contains(t)||t.closest('.tools,.act-ov,.enq-ov,.lightbox,.prev'))return;
    close();
  },true);

  /* chapitres : flèches quand la liste dépasse */
  var wrap=document.getElementById('chipwrap'),chips=document.getElementById('chips');
  function upd(){var m=chips.scrollWidth-chips.clientWidth;wrap.classList.toggle('can-l',chips.scrollLeft>4);wrap.classList.toggle('can-r',m>4&&chips.scrollLeft<m-4);}
  chips.addEventListener('scroll',upd,{passive:true});window.addEventListener('resize',upd);
  if(window.MutationObserver)new MutationObserver(function(){setTimeout(upd,60);}).observe(chips,{childList:true});
  document.getElementById('chL').addEventListener('click',function(){chips.scrollBy({left:-chips.clientWidth*0.7,behavior:'smooth'});});
  document.getElementById('chR').addEventListener('click',function(){chips.scrollBy({left:chips.clientWidth*0.7,behavior:'smooth'});});
  setTimeout(upd,300);

  /* après un clic à la souris ou au doigt, le bouton ou la case rend le focus : les raccourcis clavier restent actifs */
  document.addEventListener('pointerup',function(){
    setTimeout(function(){
      var a=document.activeElement;
      if(!a||a===document.body||!a.matches||!a.matches('button,summary,input[type=checkbox],input[type=radio],input[type=range]'))return;
      if(a.closest('.act-ov,.enq-ov,.lightbox,.prev,.home'))return;
      a.blur();
    },0);
  },true);
})();
