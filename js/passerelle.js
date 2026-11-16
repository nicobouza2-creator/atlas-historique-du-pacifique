/* Passerelle entre les deux atlas : deux onglets en haut de l'écran d'accueil.
   Chargé par index.html (atlas du Pacifique, école primaire) et par college.html (atlas d'histoire, collège).
   Sur GitHub Pages ou en local, les deux pages sont côte à côte : lien direct.
   Dans un artefact claude.ai, une seule des deux pages est présente : l'autre atlas s'ouvre à son adresse publique, dans un nouvel onglet. */
(function(){
'use strict';
var box=document.querySelector('.home-in');if(!box)return;
var col=!!window.ATLAS_COLLEGE,h=location.hostname;
var cote=/github\.io$/.test(h)||location.protocol==='file:'||/^(localhost|127\.)/.test(h);
var base='https://nicobouza2-creator.github.io/atlas-historique-du-pacifique/';
var T=[['index.html','Atlas du Pacifique','école primaire',!col],['college.html','Atlas d’histoire','collège',col]];
var css=document.createElement('style');
css.textContent='.pas{display:flex;gap:8px;flex-wrap:wrap}'+
 '.pas a,.pas span{display:inline-flex;flex-direction:column;gap:2px;padding:8px 18px;border-radius:12px;border:2px solid var(--line);font:600 15px/1.2 var(--font-body);color:var(--muted);text-decoration:none;background:var(--panel)}'+
 '.pas small{font-weight:400;font-size:12px}'+
 '.pas span{color:var(--bg);background:var(--gold);border-color:var(--gold)}'+
 '.pas a:hover,.pas a:focus-visible{color:var(--ink);border-color:var(--gold);outline:none}';
document.head.appendChild(css);
var nav=document.createElement('nav');nav.className='pas';nav.setAttribute('aria-label','Choisir un atlas');
T.forEach(function(t){
  var e=document.createElement(t[3]?'span':'a');
  if(t[3])e.setAttribute('aria-current','page');
  else{e.href=cote?t[0]:base+t[0];if(!cote){e.target='_blank';e.rel='noopener';}}
  e.appendChild(document.createTextNode(t[1]));
  var s=document.createElement('small');s.textContent=t[2];e.appendChild(s);nav.appendChild(e);
});
box.insertBefore(nav,box.firstChild);
})();
