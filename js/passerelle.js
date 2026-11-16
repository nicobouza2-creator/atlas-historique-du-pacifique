/* Atlas historique du Pacifique · Atlas d’histoire — Collège — © 2026 Nicolas BOUZA. Idée, conception et réalisation : Nicolas BOUZA,
   avec l’assistance de Claude (Anthropic). Licence CC BY-NC-ND 4.0. https://github.com/nicobouza2-creator/atlas-historique-du-pacifique */
/* Passerelle entre les deux atlas : deux onglets en haut de l'écran d'accueil.
   Chargé par index.html (atlas du Pacifique, école primaire) et par college.html (atlas d'histoire, collège).
   Sur GitHub Pages ou en local, les deux pages sont côte à côte : lien direct.
   Dans un artefact claude.ai, une seule des deux pages est présente : l'autre atlas s'ouvre dans son propre artefact (public), dans un nouvel onglet.
   Si un artefact est recréé, son adresse change : la corriger dans le tableau T ci-dessous. */
(function(){
'use strict';
var box=document.querySelector('.home-in');if(!box)return;
var col=!!window.ATLAS_COLLEGE,h=location.hostname;
var cote=/github\.io$/.test(h)||location.protocol==='file:'||/^(localhost|127\.)/.test(h);
/* page voisine, adresse de l'artefact, titre, public, atlas affiché ? */
var T=[['index.html','https://claude.ai/artifact/1v3RsmHASiQxNK43ve5bN1','Atlas du Pacifique','école primaire',!col],
       ['college.html','https://claude.ai/artifact/EzMc6cKW4aYizEdYC8JxWe','Atlas d’histoire','collège',col]];
var css=document.createElement('style');
css.textContent='.pas{display:flex;gap:8px;flex-wrap:wrap}'+
 '.pas a,.pas span{display:inline-flex;flex-direction:column;gap:2px;padding:8px 18px;border-radius:12px;border:2px solid var(--line);font:600 15px/1.2 var(--font-body);color:var(--muted);text-decoration:none;background:var(--panel)}'+
 '.pas small{font-weight:400;font-size:12px}'+
 '.pas span{color:var(--bg);background:var(--gold);border-color:var(--gold)}'+
 '.pas a:hover,.pas a:focus-visible{color:var(--ink);border-color:var(--gold);outline:none}';
document.head.appendChild(css);
var nav=document.createElement('nav');nav.className='pas';nav.setAttribute('aria-label','Choisir un atlas');
T.forEach(function(t){
  var e=document.createElement(t[4]?'span':'a');
  if(t[4])e.setAttribute('aria-current','page');
  else{e.href=cote?t[0]:t[1];if(!cote){e.target='_blank';e.rel='noopener';e.title='S’ouvre dans un nouvel onglet';}}
  e.appendChild(document.createTextNode(t[2]+(t[4]||cote?'':' ↗')));
  var s=document.createElement('small');s.textContent=t[3];e.appendChild(s);nav.appendChild(e);
});
box.insertBefore(nav,box.firstChild);
})();
