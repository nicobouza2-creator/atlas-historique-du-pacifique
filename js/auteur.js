/* Atlas historique du Pacifique · Atlas d'histoire — Collège
   © 2026 Nicolas BOUZA. Idée, conception et réalisation : Nicolas BOUZA, avec l'assistance de Claude (Anthropic).
   Licence CC BY-NC-ND 4.0 (https://creativecommons.org/licenses/by-nc-nd/4.0/deed.fr) : usage en classe libre en citant l'auteur,
   pas d'usage commercial, pas de version modifiée diffusée.
   auteur.js : mention d'auteur commune aux deux atlas. Elle est aussi écrite en dur dans index.html et college.html ;
   ce script la remet si elle a disparu (accueil, carte, Fiche prof) et fournit le texte aux exports (cartes, fiches, Word). */
(function(){
'use strict';
var COL=!!window.ATLAS_COLLEGE,TITRE=COL?'Atlas d’histoire — Collège':'Atlas historique du Pacifique';
var A=window.ATLAS_AUTEUR={
  nom:'Nicolas BOUZA',annee:2026,titre:TITRE,
  role:'Idée, conception et réalisation',
  long:'Idée, conception et réalisation : Nicolas BOUZA, avec l’assistance de Claude (Anthropic)',
  court:'© 2026 Nicolas BOUZA · réalisé avec l’assistance de Claude (Anthropic)',
  licence:'CC BY-NC-ND 4.0',url:'https://creativecommons.org/licenses/by-nc-nd/4.0/deed.fr',
  depot:'https://github.com/nicobouza2-creator/atlas-historique-du-pacifique',
  citer:'Nicolas BOUZA (2026), '+TITRE+', réalisé avec l’assistance de Claude (Anthropic), licence CC BY-NC-ND 4.0.'
};
A.ligne=TITRE+' · '+A.court+' · '+A.licence;
A.html='<p class="aut-line">'+TITRE+' · © 2026 <b>Nicolas BOUZA</b> — idée, conception et réalisation, avec l’assistance de Claude (Anthropic) · licence CC BY-NC-ND 4.0</p>';

function ready(f){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',f);else f();}
function make(tag,cls,html){var e=document.createElement(tag);e.className=cls;e.innerHTML=html;return e;}
function veille(){
  var st=document.getElementById('stage');
  if(st&&!st.querySelector('.sig'))st.appendChild(make('div','sig','© Nicolas BOUZA · '+TITRE)).setAttribute('aria-hidden','true');
  var hh=document.querySelector('.home-h div');
  if(hh&&!hh.querySelector('.aut-home'))hh.appendChild(make('p','aut-home',A.role+' : <b>Nicolas BOUZA</b>, avec l’assistance de Claude (Anthropic) · © 2026 · CC BY-NC-ND 4.0'));
  var fi=document.querySelector('.drawer [data-sec="fiche"]');
  if(fi&&!fi.querySelector('.aut-box'))fi.appendChild(make('div','aut-box','<b>Auteur</b><br>'+A.long+'.<br>Pour citer : '+A.citer));
}
ready(function(){veille();setInterval(veille,4000);});
try{console.log('%c'+TITRE+'%c\n'+A.long+'\n© 2026 Nicolas BOUZA · licence CC BY-NC-ND 4.0 · '+A.depot,
  'font:700 15px sans-serif;color:#ffd166','font:12px sans-serif');}catch(e){}
})();
