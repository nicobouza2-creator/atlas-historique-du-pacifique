/* Mode Enquête : une question de départ, une hypothèse, des pages de documents (images, textes, cartes,
   tableaux, frises) avec des questions différenciées (école primaire / collège), un carnet d'indices,
   puis une conclusion et le résultat de l'enquête.
   Données : js/enq-*.js → ENQ[volet][chapitre]. Utilise ATLAS.api (engine.js). Tout marche au doigt (TBI). */
(function(){
'use strict';
var A=window.ATLAS;if(!A||!A.api)return;
var api=A.api,IMG=window.IMG||{};
var ENQ=window.ENQ=window.ENQ||{};

/* aides pour écrire les données (Q = choix, la 1re réponse est la bonne) */
window.EQ={
  Q:function(q,a,ex){return {k:'qcm',q:q,a:a,ex:ex};},
  V:function(q,ok,ex){return {k:'vf',q:q,a:!!ok,ex:ex};},
  O:function(q,a){return {k:'ordre',q:q,a:a};},
  T:function(q,w){return {k:'trou',q:q,w:w||[]};},
  R:function(q,a){return {k:'relie',q:q,a:a};},
  W:function(q,m){return {k:'libre',q:q,m:m};},
  I:function(id,cap){return {k:'img',id:id,cap:cap};},
  X:function(t,src,txt,tp){return {k:'txt',t:t,src:src,txt:txt,tp:tp};},
  M:function(cap){return {k:'map',cap:cap};},
  TB:function(t,cols,rows,src){return {k:'tab',t:t,cols:cols,rows:rows,src:src};},
  F:function(t,items){return {k:'frise',t:t,items:items};},
  P:function(t,d,p,c,i){return {t:t,d:d,p:p,c:c,i:i};},
  E:function(vol,ci,o){(ENQ[vol]=ENQ[vol]||[])[ci]=o;}
};

var css=[
'.enq-ov{position:fixed;inset:0;z-index:10000;background:rgba(2,8,16,.86);display:flex;align-items:center;justify-content:center;padding:12px;font-family:var(--font-body)}',
'.enq-box{position:relative;background:var(--panel);color:var(--ink);border:1px solid var(--line);border-radius:18px;width:min(1280px,100%);height:min(940px,100%);display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(0,0,0,.5);overflow:hidden}',
'.enq-hd{display:flex;align-items:center;gap:10px;padding:10px 16px;border-bottom:1px solid var(--line);flex-wrap:wrap}',
'.enq-hd h2{margin:0;font:700 20px/1.2 var(--font-display);flex:1 1 280px}',
'.enq-hd h2 small{display:block;font:400 14px/1.3 var(--font-body);color:var(--muted);margin-top:2px}',
'.enq-lv{font:700 13px var(--font-body);padding:5px 11px;border-radius:999px;background:var(--gold);color:#12202e;white-space:nowrap}',
'.enq-steps{display:flex;gap:5px;flex-wrap:wrap}',
'.enq-box .enq-steps button{min-width:40px;min-height:40px;padding:0 9px;border-radius:999px;font-size:15px}',
'.enq-box .enq-steps button.cur{background:var(--gold);color:#12202e;border-color:var(--gold);opacity:1}',
'.enq-box .enq-steps button.fin{border-color:#22c55e}',
'.enq-main{flex:1;min-height:0;overflow:auto;padding:14px 16px}',
'.enq-grid{display:grid;gap:16px;grid-template-columns:minmax(0,1fr)}',
'@media (min-width:900px){.enq-grid{grid-template-columns:minmax(0,1.08fr) minmax(0,1fr);align-items:start}.enq-grid>.enq-docs{position:sticky;top:0}}',
'.enq-ft{display:flex;gap:10px;align-items:center;padding:10px 16px;border-top:1px solid var(--line);flex-wrap:wrap}',
'.enq-ft .sp,.enq-hd .sp{flex:1}',
'.enq-box .go{background:var(--gold);color:#12202e;border-color:var(--gold);font-weight:700}',
'.enq-box .go:disabled{opacity:.35}',
'.enq-kick{margin:0 0 6px;font:700 13px var(--font-body);color:var(--gold);text-transform:uppercase;letter-spacing:.06em}',
'.enq-big{font:700 clamp(22px,2.6vw,32px)/1.25 var(--font-display);margin:4px 0 14px;text-wrap:balance}',
'.enq-card{background:var(--panel-2);border:1px solid var(--line);border-radius:14px;padding:14px 16px;margin-bottom:12px}',
'.enq-card p:not([class]){margin:4px 0;font-size:16px;line-height:1.5}',
'.enq-choices{display:grid;gap:10px;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));margin-top:8px}',
'.enq-choices button{text-align:left;min-height:58px;font-size:17px;font-weight:500}',
'.enq-docs{display:flex;flex-direction:column;gap:12px}',
'.enq-fig{margin:0;background:#f6f1e4;color:#1b2430;padding:8px;border-radius:6px;box-shadow:0 6px 18px rgba(0,0,0,.4)}',
'.enq-fig img{display:block;width:100%;max-height:50vh;object-fit:contain;background:#16202c;border-radius:2px;cursor:zoom-in}',
'.enq-fig figcaption{font:600 15px/1.3 var(--font-body);padding:7px 2px 1px}',
'.enq-fig figcaption small{display:block;font:400 11.5px/1.3 var(--font-body);color:#4a5563;margin-top:3px}',
'.enq-box .enq-fig button{margin-top:7px;background:#12304d;color:#fff;font-size:15px;min-height:40px}',
'.enq-zoom{position:fixed;inset:0;z-index:10003;background:rgba(2,8,16,.95);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;cursor:zoom-out;padding:2vh;color:var(--ink);font-size:17px}',
'.enq-zoom img{max-width:100%;max-height:90vh;object-fit:contain}',
'.enq-paper{background:#f6f1e4;color:#1b2430;border-radius:6px;padding:14px 18px;box-shadow:0 6px 18px rgba(0,0,0,.4);font:17px/1.6 Georgia,"Times New Roman",serif}',
'.enq-paper h4{margin:0 0 6px;font:700 18px/1.25 var(--font-display);color:#6b4100}',
'.enq-paper p{margin:6px 0}',
'.enq-paper small{display:block;font:italic 12.5px/1.35 var(--font-body);color:#5b6470;margin-top:8px}',
'.enq-tab{width:100%;border-collapse:collapse;font:16px/1.4 var(--font-body);color:#1b2430}',
'.enq-tab th{background:#e7dcc2;text-align:left;padding:7px 9px;font-weight:700}',
'.enq-tab td{padding:7px 9px;border-top:1px solid #d8ccb0;vertical-align:top}',
'.enq-frise{display:flex;flex-wrap:wrap;gap:10px 8px;margin-top:6px}',
'.enq-fr{flex:1 1 130px;border-top:6px solid #c2410c;padding:6px 4px 0;font:15px/1.3 var(--font-body)}',
'.enq-fr b{display:block;color:#9a3412;font-size:16px;margin-bottom:2px}',
'.enq-q{background:var(--panel-2);border:1px solid var(--line);border-radius:14px;padding:12px 14px;margin-bottom:12px}',
'.enq-q.done{border-color:#22c55e}',
'.enq-qt{display:flex;gap:10px;align-items:flex-start;font:600 19px/1.4 var(--font-body);margin-bottom:10px}',
'.enq-qt .n{flex:none;width:32px;height:32px;border-radius:50%;background:var(--gold);color:#12202e;display:flex;align-items:center;justify-content:center;font:700 16px var(--font-body)}',
'.enq-qt .tx{flex:1}.enq-qt .tx i{display:block;font:700 13px var(--font-body);color:var(--gold);font-style:normal;text-transform:uppercase;letter-spacing:.05em}',
'.enq-box .enq-say{flex:none;min-height:36px;padding:2px 9px;font-size:16px}',
'.enq-hint{margin:0 0 8px;font-size:14px;color:var(--muted)}',
'.enq-ans{display:grid;gap:8px}',
'.enq-ans button{text-align:left;font-weight:500;font-size:17px;display:flex;gap:10px;align-items:center;min-height:52px}',
'.enq-ans .l{flex:none;width:30px;height:30px;border-radius:50%;background:#1d3f63;display:flex;align-items:center;justify-content:center;font-weight:700}',
'.enq-box button.ok{background:#14532d;border-color:#22c55e;color:#fff;opacity:1}',
'.enq-box button.ko{background:#4c0519;border-color:#fb7185;color:#fff;opacity:1}',
'.enq-vf{display:flex;gap:10px}.enq-vf button{flex:1;font-size:19px;min-height:54px}',
'.enq-fb{margin:8px 0 0;font-size:16px;line-height:1.45}',
'.enq-fb.ok{color:#4ade80}.enq-fb.ko{color:#fda4af}',
'.enq-fb .ex{display:block;color:var(--ink);margin-top:3px}',
'.enq-slots{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:10px}',
'.enq-slot{flex:1 1 120px;min-height:52px;border:2px dashed var(--line);border-radius:10px;display:flex;align-items:center;justify-content:center;padding:6px;text-align:center;font-size:15px;color:var(--muted)}',
'.enq-slot.ok{border:2px solid #22c55e;background:rgba(34,197,94,.12);color:var(--ink);font-weight:600}',
'.enq-chips{display:flex;flex-wrap:wrap;gap:8px}',
'.enq-box .enq-chips button{background:#fff7e0;color:#12202e;border-color:var(--gold);border-radius:999px;font-size:17px}',
'.enq-chips button.gone{visibility:hidden}',
'.enq-chips button.hint{box-shadow:0 0 0 5px rgba(255,209,102,.75)}',
'.enq-sent{font-size:19px;line-height:2.1;margin:0 0 10px}',
'.enq-blank{display:inline-block;min-width:110px;border-bottom:3px solid var(--muted);text-align:center;padding:0 6px;margin:0 3px;color:var(--gold);font-weight:700;line-height:1.5}',
'.enq-blank.cur{border-color:var(--gold);background:rgba(255,209,102,.14)}',
'.enq-rel{display:grid;grid-template-columns:1fr 1fr;gap:8px 14px}',
'.enq-rel>div{display:flex;flex-direction:column;gap:8px}',
'.enq-rel button{text-align:left;font-weight:500;font-size:16px;min-height:50px}',
'.enq-rel button.sel{outline:4px solid #7cb7ff;outline-offset:1px}',
'.enq-box textarea{width:100%;min-height:100px;background:#050f1c;color:var(--ink);border:1px solid var(--line);border-radius:10px;font:17px/1.5 var(--font-body);padding:10px}',
'.enq-model{background:#0d2a1c;border:1px solid #22c55e;border-radius:10px;padding:10px 12px;margin-top:8px;font-size:16px;line-height:1.5}',
'.enq-model b{color:#4ade80}',
'.enq-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px;align-items:center}',
'.enq-ind{background:linear-gradient(135deg,#3b2a05,#5a4208);border:2px solid var(--gold);border-radius:14px;padding:12px 14px;font-size:17px;line-height:1.45;animation:enqPop .5s}',
'.enq-ind b{color:var(--gold);display:block;font:700 14px var(--font-display);text-transform:uppercase;letter-spacing:.05em;margin-bottom:3px}',
'@keyframes enqPop{from{transform:scale(.9);opacity:0}to{transform:none;opacity:1}}',
'.enq-carnet{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px}',
'.enq-carnet li{background:#2a2108;border:1px solid #6b5313;border-radius:10px;padding:9px 12px;font-size:16px;line-height:1.4}',
'.enq-carnet li span{color:var(--gold);font-weight:700;margin-right:6px}',
'.enq-carnet li.no{opacity:.5;border-style:dashed}',
'.enq-drawer{position:absolute;right:0;top:0;bottom:0;width:min(440px,100%);background:var(--panel);border-left:3px solid var(--gold);z-index:3;padding:14px;overflow:auto;box-shadow:-10px 0 30px rgba(0,0,0,.5)}',
'.enq-drawer h3{margin:0 0 10px;font:700 20px var(--font-display);display:flex;align-items:center;gap:10px}.enq-drawer h3 span{flex:1}',
'.enq-res{background:linear-gradient(135deg,#0d2a1c,#123b29);border:2px solid #22c55e;border-radius:14px;padding:14px 16px;margin:12px 0;font-size:18px;line-height:1.55;animation:enqPop .5s}',
'.enq-score{font-size:44px;text-align:center;margin:6px 0}',
'.enq-shake{animation:enqShake .4s}',
'@keyframes enqShake{0%,100%{translate:0}20%,60%{translate:-7px}40%,80%{translate:7px}}',
'.stage .enq-back{position:absolute;left:50%;top:12px;transform:translateX(-50%);z-index:8;background:var(--gold);color:#12202e;border-color:var(--gold);font-size:18px;box-shadow:0 6px 20px rgba(0,0,0,.5)}',
'.enq-dos{display:inline-flex;flex-direction:column;gap:4px;align-items:flex-start}',
'.enq-doslink{font-size:14px;color:#9fd0ff;text-decoration:underline;padding:2px 2px}',
'.enq-list{display:grid;gap:10px;grid-template-columns:repeat(auto-fill,minmax(270px,1fr))}',
'.enq-list button{text-align:left;display:flex;flex-direction:column;gap:5px;align-items:flex-start;font-weight:500;font-size:15.5px;line-height:1.35;min-height:96px}',
'.enq-list button b{font:700 15px var(--font-display);color:var(--gold)}',
'.enq-list button .st{font-size:13px;color:var(--muted)}',
'@media (max-width:700px){.enq-qt{font-size:17px}.enq-rel button{font-size:15px}.enq-ov{padding:0}.enq-box{border-radius:0;height:100%}}',
'@media (prefers-reduced-motion:reduce){.enq-ind,.enq-res{animation:none}}'
].join('\n');
var stl=document.createElement('style');stl.textContent=css;document.head.appendChild(stl);

function el(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;}
function btn(txt,cls,fn){var b=el('button',cls,txt);b.type='button';if(fn)b.addEventListener('click',fn);return b;}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t;}return a;}
function shake(e){e.classList.remove('enq-shake');void e.offsetWidth;e.classList.add('enq-shake');}
function host(){return document.fullscreenElement||document.body;}
function load(k,d){try{var v=localStorage.getItem(k);return v?JSON.parse(v):d;}catch(e){return d;}}
function save(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}
var EMO=/[\u{1F000}-\u{1FAFF}\u{2300}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}]/gu;
function say(t){
  try{var S=window.speechSynthesis;if(!S||!window.SpeechSynthesisUtterance)return;S.cancel();
    var u=new SpeechSynthesisUtterance(String(t).replace(EMO,'').replace(/≈/g,'environ ').replace(/av\. J\.-C\./g,'avant Jésus-Christ').replace(/apr\. J\.-C\./g,'après Jésus-Christ').replace(/\[|\]/g,''));
    u.lang='fr-FR';u.rate=0.9;var v=(S.getVoices()||[]).filter(function(x){return /^fr/i.test(x.lang);})[0];if(v)u.voice=v;S.speak(u);
  }catch(e){}
}
function hush(){try{window.speechSynthesis.cancel();}catch(e){}}
/* dossier PDF à imprimer (pdf/<volet>-<nn>.pdf) : enregistrement via claude.ai, ou téléchargement classique ailleurs */
var DL=null;try{if(window.claude&&typeof window.claude.use==='function')window.claude.use('downloads').then(function(d){DL=d||null;},function(){});}catch(e){}
function pad2(n){return (n<10?'0':'')+n;}
function slugify(t){return String(t).normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^A-Za-z0-9]+/g,'-').replace(/^-|-$/g,'');}
/* dossiers PDF et Word : l'hébergement des artefacts refuse l'extension .docx et limite le nombre de fichiers (512) ; l'artefact contient donc
   paquets/<format>-<volet>.txt (les dossiers du volet en base64, mis bout à bout ; outils/pack.py) et paquets/index.json, qui donne
   [début, longueur] de chaque dossier. Ailleurs (dépôt, GitHub Pages) : le fichier individuel <format>/<volet>-<nn>.<format>. */
var PIX=null;
function getPack(S,ext){if(!PIX)PIX=fetch('paquets/index.json').then(function(r){if(!r.ok)throw new Error('absent');return r.json();});
  return PIX.then(function(ix){var p=((ix[ext]||{})[S.vol]||[])[S.ci];if(!p)throw new Error('absent');
  return fetch('paquets/'+ext+'-'+S.vol+'.txt',{headers:{Range:'bytes='+p[0]+'-'+(p[0]+p[1]-1)}}).then(function(r){if(!r.ok)throw new Error('absent');
    return r.text().then(function(t){return b64(r.status===206?t:t.slice(p[0],p[0]+p[1]));});});});}
function b64(t){var s=atob(t.trim()),u=new Uint8Array(s.length);for(var i=0;i<s.length;i++)u[i]=s.charCodeAt(i);return new Blob([u]);}
var MIME={pdf:'application/pdf',docx:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'};
function dossier(S,b,ext){
  ext=ext||'pdf';
  var code=({pacifique:'P',caledonie:'NC',monde:'PT',decouvertes:'GD',geonc:'GN',nickel:'NI',mondial:'MO',emc:'EMC'}[S.vol]||'X')+'-'+pad2(S.ci+1),url=ext+'/'+S.vol+'-'+pad2(S.ci+1)+'.'+ext,name='Dossier-enquete-'+code+'-'+slugify(S.ch.short)+'.'+ext;
  var old=b.textContent;b.disabled=true;b.textContent='⏳ Préparation du dossier…';
  function done(t){b.disabled=false;b.textContent=t||old;if(t)setTimeout(function(){b.textContent=old;},4000);}
  getPack(S,ext).catch(function(){return fetch(url).then(function(r){if(!r.ok)throw new Error('absent');return r.blob();});}).then(function(blob){
    blob=new Blob([blob],{type:MIME[ext]});
    if(DL)return DL.save({filename:name,data:blob}).then(function(){done('✔ Dossier enregistré');},function(e){done(e&&e.code==='declined'?'Enregistrement annulé':'⚠ Échec, réessaie');});
    if(!window.claude){var u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download=name;a.style.display='none';document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(u);a.remove();},5000);done('✔ Dossier téléchargé');return;}
    done('⚠ Ici, utilise le lien « Ouvrir le PDF » juste en dessous');
  }).catch(function(){done('⚠ Dossier introuvable');});
}
/* lien direct (dépôt GitHub) : marche partout, y compris dans l'appli Claude sur téléphone, où l'enregistrement direct n'existe pas */
var GH='https://raw.githubusercontent.com/nicobouza2-creator/atlas-historique-du-pacifique/main/';
function dosBtn(S,cls){
  if((window.ENQ_NODOS||{})[S.vol])return el('span','enq-dos');   /* volet sans dossier imprimable pour l'instant */
  var w=el('span','enq-dos'),b=btn('📄 Dossier PDF à imprimer',cls||'',function(){dossier(S,b);});b.title='Pièces du dossier, cahiers primaire et collège, corrigé';
  var bw=btn('📝 Dossier Word (modifiable)',cls||'',function(){dossier(S,bw,'docx');});bw.title='Le même dossier au format Word (.docx), pour modifier les textes et les questions';
  var a=el('a','enq-doslink','📱 Ouvrir le PDF (téléphone, tablette) ↗');a.href=GH+'pdf/'+S.vol+'-'+pad2(S.ci+1)+'.pdf';a.target='_blank';a.rel='noopener';
  w.appendChild(b);w.appendChild(bw);w.appendChild(a);return w;
}
function zoom(src,cap){
  var z=el('div','enq-zoom'),im=document.createElement('img');im.src=src;im.alt=cap||'';z.appendChild(im);if(cap)z.appendChild(el('p','',cap));
  z.addEventListener('click',function(){z.remove();});host().appendChild(z);
}

/* ---------- Documents ---------- */
function docEl(d,S){
  var f,im,img,fc;
  if(Array.isArray(d)){f=el('div','enq-docs');d.forEach(function(x){f.appendChild(docEl(x,S));});return f;}
  if(d.k==='img'){
    im=IMG[d.id];f=el('figure','enq-fig');
    if(!im){f.appendChild(el('figcaption','','(document manquant : '+d.id+')'));return f;}
    img=document.createElement('img');img.src=im.f;img.alt=d.cap||im.c;img.addEventListener('click',function(){zoom(im.f,d.cap||im.c);});
    fc=el('figcaption','',d.cap||im.c);fc.appendChild(el('small','',im.r));f.appendChild(img);f.appendChild(fc);f._say=d.cap||im.c;return f;
  }
  if(d.k==='map'){
    f=el('figure','enq-fig');img=document.createElement('img');
    try{if(!S.snap)S.snap=api.snap(S.ci);img.src=S.snap;}catch(e){}
    var cap=d.cap||('Carte de l’atlas : « '+S.ch.short+' », à la fin de l’animation');
    img.alt=cap;img.addEventListener('click',function(){zoom(img.src,cap);});
    fc=el('figcaption','',cap);fc.appendChild(el('small','','Carte animée de l’atlas · fonds Natural Earth (domaine public)'));
    fc.appendChild(btn('▶ Voir l’animation sur la grande carte','',function(){anim(S);}));
    f.appendChild(img);f.appendChild(fc);f._say=cap;return f;
  }
  f=el('div','enq-paper');f.appendChild(el('h4','',d.t));
  if(d.k==='txt'){
    var t=(S.lvl==='p'&&d.tp)?d.tp:d.txt;
    String(t).split('\n').forEach(function(p){f.appendChild(el('p','',p));});f._say=d.t+'. '+t;
  }else if(d.k==='tab'){
    var tb=el('table','enq-tab'),tr=el('tr');
    d.cols.forEach(function(c){tr.appendChild(el('th','',c));});tb.appendChild(tr);
    d.rows.forEach(function(r){var row=el('tr');r.forEach(function(c){row.appendChild(el('td','',c));});tb.appendChild(row);});
    f.appendChild(tb);f._say=d.t+'. '+d.rows.map(function(r){return r.join(' : ');}).join('. ');
  }else if(d.k==='frise'){
    var fr=el('div','enq-frise');
    d.items.forEach(function(x){var it=el('div','enq-fr');it.appendChild(el('b','',x[0]));it.appendChild(document.createTextNode(x[1]));fr.appendChild(it);});
    f.appendChild(fr);f._say=d.t+'. '+d.items.map(function(x){return x[0]+' : '+x[1];}).join('. ');
  }
  if(d.src)f.appendChild(el('small','',d.src));
  return f;
}
function sayDocs(box){var t=[];[].forEach.call(box.querySelectorAll('.enq-fig,.enq-paper'),function(x){if(x._say)t.push(x._say);});say(t.join('. '));}

/* ---------- Questions : chaque type appelle done(trouvé du premier coup ?) une seule fois ---------- */
var QR={};
function qbox(title,n,sayTxt,kick){
  var w=el('div','enq-q'),t=el('div','enq-qt'),tx=el('span','tx');
  t.appendChild(el('span','n',String(n)));if(kick)tx.appendChild(el('i','',kick));tx.appendChild(document.createTextNode(title));t.appendChild(tx);
  var s=btn('🔊','enq-say',function(){say(sayTxt||title);});s.setAttribute('aria-label','Écouter');s.title='Écouter';t.appendChild(s);
  w.appendChild(t);return w;
}
function fb(w,ok,txt,ex){
  var p=w.querySelector('.enq-fb');if(!p){p=el('p','enq-fb');w.appendChild(p);}
  p.className='enq-fb '+(ok?'ok':'ko');p.textContent=txt;if(ex)p.appendChild(el('span','ex',ex));
}
QR.qcm=function(q,n,done){
  var L='ABCD',opts=shuffle(q.a.map(function(t,k){return {t:t,ok:k===0};}));
  var w=qbox(q.q,n,q.q+' '+opts.map(function(o,k){return 'Réponse '+L[k]+' : '+o.t;}).join('. '));
  var box=el('div','enq-ans'),bs=[],tries=0,over=false;
  opts.forEach(function(o,k){
    var b=el('button');b.type='button';b.appendChild(el('span','l',L[k]));b.appendChild(el('span','',o.t));box.appendChild(b);bs.push(b);
    b.addEventListener('click',function(){
      if(over||b.disabled)return;
      if(o.ok){over=true;b.classList.add('ok');bs.forEach(function(x){x.disabled=true;});fb(w,true,tries?'✔ Oui, c’est ça.':'✔ Bravo, du premier coup !',q.ex);done(!tries);}
      else{tries++;b.classList.add('ko');b.disabled=true;shake(b);
        if(tries>=2||tries>=opts.length-1){over=true;bs.forEach(function(x,j){x.disabled=true;if(opts[j].ok)x.classList.add('ok');});fb(w,false,'La bonne réponse est en vert.',q.ex);done(false);}
        else fb(w,false,'Pas tout à fait… Relis le document et essaie encore.');}
    });
  });
  w.appendChild(box);return w;
};
QR.vf=function(q,n,done){
  var w=qbox(q.q,n,'Vrai ou faux ? '+q.q,'Vrai ou faux ?'),r=el('div','enq-vf'),over=false,bs=[];
  [['✔ Vrai',true],['✘ Faux',false]].forEach(function(x){
    var b=btn(x[0],'',function(){
      if(over)return;over=true;bs.forEach(function(y){y.disabled=true;});
      var ok=x[1]===q.a;b.classList.add(ok?'ok':'ko');if(!ok){bs[q.a?0:1].classList.add('ok');shake(b);}
      fb(w,ok,ok?'✔ Bravo !':'Non : c’était '+(q.a?'vrai':'faux')+'.',q.ex);done(ok);
    });bs.push(b);r.appendChild(b);
  });
  w.appendChild(r);return w;
};
QR.ordre=function(q,n,done){
  var w=qbox(q.q,n,q.q),sl=el('div','enq-slots'),ch=el('div','enq-chips'),step=0,errs=0,se=0,slots=[],cs=[];
  q.a.forEach(function(t,k){var s=el('div','enq-slot',String(k+1));sl.appendChild(s);slots.push(s);});
  shuffle(q.a.map(function(t,k){return {t:t,k:k};})).forEach(function(o){
    var b=btn(o.t,'',function(){
      if(b.classList.contains('gone')||step>=q.a.length)return;
      if(o.k===step){slots[step].textContent=o.t;slots[step].classList.add('ok');b.classList.add('gone');cs.forEach(function(x){x.classList.remove('hint');});step++;se=0;
        if(step===q.a.length){fb(w,true,errs?'✔ C’est dans l’ordre.':'✔ Parfait, du premier coup !',q.ex);done(!errs);}else fb(w,true,'✔ Oui ! Et ensuite ?');}
      else{errs++;se++;shake(b);fb(w,false,'Pas encore : cherche ce qui vient avant.');if(se>=2)cs.forEach(function(x){if(x._k===step)x.classList.add('hint');});}
    });b._k=o.k;cs.push(b);ch.appendChild(b);
  });
  w.appendChild(el('p','enq-hint','Touche les étiquettes dans le bon ordre, de la première à la dernière.'));w.appendChild(sl);w.appendChild(ch);return w;
};
QR.trou=function(q,n,done,title){
  var parts=String(q.q).split(/\[([^\]]+)\]/),blanks=[],sent=el('p','enq-sent');
  parts.forEach(function(p,i){if(i%2){var s=el('span','enq-blank','?');blanks.push({t:p,el:s});sent.appendChild(s);}else sent.appendChild(document.createTextNode(p));});
  var w=qbox(title||'Complète la phrase avec les bonnes étiquettes.',n,parts.join(''));
  var seen={},words=[];blanks.map(function(b){return b.t;}).concat(q.w||[]).forEach(function(x){if(!seen[x]){seen[x]=1;words.push(x);}});
  var cur=0,errs=0,se=0,ch=el('div','enq-chips'),cs=[];
  function mark(){blanks.forEach(function(b,i){b.el.classList.toggle('cur',i===cur);});}
  shuffle(words).forEach(function(x){
    var b=btn(x,'',function(){
      if(cur>=blanks.length||b.classList.contains('gone'))return;
      if(x===blanks[cur].t){blanks[cur].el.textContent=x;cur++;se=0;cs.forEach(function(c){c.classList.remove('hint');});
        if(!blanks.slice(cur).some(function(bl){return bl.t===x;}))b.classList.add('gone');mark();
        if(cur===blanks.length){fb(w,true,errs?'✔ La phrase est complète.':'✔ Parfait, du premier coup !',q.ex);done(!errs);}else fb(w,true,'✔ Oui !');}
      else{errs++;se++;shake(b);fb(w,false,'Ce mot ne va pas dans la case en jaune.');if(se>=2)cs.forEach(function(c){if(c.textContent===blanks[cur].t)c.classList.add('hint');});}
    });cs.push(b);ch.appendChild(b);
  });
  mark();w.appendChild(sent);w.appendChild(ch);return w;
};
QR.relie=function(q,n,done){
  var w=qbox(q.q,n,q.q),g=el('div','enq-rel'),Lc=el('div'),Rc=el('div'),sel={L:null,R:null},left=q.a.length,errs=0,num=0;
  var cols=['#60a5fa','#f472b6','#34d399','#fbbf24','#a78bfa'];
  function pick(side,b){
    if(b.disabled)return;
    if(sel[side])sel[side].classList.remove('sel');sel[side]=sel[side]===b?null:b;if(sel[side])sel[side].classList.add('sel');
    if(!sel.L||!sel.R)return;
    var a=sel.L,c=sel.R;a.classList.remove('sel');c.classList.remove('sel');sel.L=sel.R=null;
    if(a._k===c._k){var col=cols[num++%cols.length];[a,c].forEach(function(x){x.disabled=true;x.classList.add('ok');x.style.borderLeft='10px solid '+col;});left--;
      if(!left){fb(w,true,errs?'✔ Tout est relié.':'✔ Parfait, du premier coup !',q.ex);done(!errs);}else fb(w,true,'✔ Bien vu !');}
    else{errs++;shake(a);shake(c);fb(w,false,'Ces deux-là ne vont pas ensemble.');}
  }
  q.a.forEach(function(p,k){var b=btn(p[0],'',function(){pick('L',b);});b._k=k;Lc.appendChild(b);});
  shuffle(q.a.map(function(p,k){return {t:p[1],k:k};})).forEach(function(o){var b=btn(o.t,'',function(){pick('R',b);});b._k=o.k;Rc.appendChild(b);});
  g.appendChild(Lc);g.appendChild(Rc);
  w.appendChild(el('p','enq-hint','Touche un élément à gauche, puis celui qui va avec à droite.'));w.appendChild(g);return w;
};
QR.libre=function(q,n,done){
  var w=qbox(q.q,n,q.q,'À toi d’écrire'),ta=el('textarea'),r=el('div','enq-row'),warned=false;
  ta.placeholder='Écris ta réponse ici…';ta.setAttribute('aria-label','Ta réponse');
  var b=btn('Voir une réponse possible','',function(){
    if(!ta.value.trim()&&!warned){warned=true;fb(w,false,'Écris d’abord quelques mots : même une idée courte compte !');return;}
    var p0=w.querySelector('.enq-fb');if(p0)p0.remove();
    b.remove();var m=el('div','enq-model');m.appendChild(el('b','','Une réponse possible : '));m.appendChild(document.createTextNode(q.m));w.appendChild(m);
    var p=el('p','enq-fb','Compare avec ta réponse. Avais-tu les idées principales ?');w.appendChild(p);
    var rr=el('div','enq-row'),y=btn('✔ J’avais l’essentiel',''),no=btn('✘ Il me manquait des idées','');
    function fin(ok){y.disabled=no.disabled=true;(ok?y:no).classList.add(ok?'ok':'ko');if(ok)ta.readOnly=true;
      p.className='enq-fb '+(ok?'ok':'ko');p.textContent=ok?'✔ Bravo !':'Pas grave : complète ta réponse avec les idées en vert.';done(ok);}
    y.addEventListener('click',function(){fin(true);});no.addEventListener('click',function(){fin(false);});
    rr.appendChild(y);rr.appendChild(no);w.appendChild(rr);
  });
  r.appendChild(b);w.appendChild(ta);w.appendChild(r);return w;
};

/* ---------- Déroulé de l'enquête ---------- */
var cur=null,LV=window.ENQ_LV||{p:'École primaire',c:'Collège'};   /* atlas du collège : deux niveaux de guidage (college.html) */
function close(){if(!cur)return;var c=cur;cur=null;hush();if(c.back)c.back.remove();c.ov.remove();}
document.addEventListener('keydown',function(e){
  if(e.key!=='Escape'||!cur)return;var z=document.querySelector('.enq-zoom');e.stopPropagation();
  if(z)z.remove();else if(cur.ov.style.display!=='none')close();
},true);
function shell(){
  close();
  var ov=el('div','enq-ov'),box=el('div','enq-box'),hd=el('div','enq-hd'),main=el('div','enq-main'),ft=el('div','enq-ft');
  ov.setAttribute('role','dialog');ov.setAttribute('aria-modal','true');ov.setAttribute('aria-label','Mode enquête');
  box.appendChild(hd);box.appendChild(main);box.appendChild(ft);ov.appendChild(box);host().appendChild(ov);
  cur={ov:ov,box:box,hd:hd,main:main,ft:ft};return cur;
}
function head(title,sub,extra){
  var hd=cur.hd;hd.innerHTML='';var h=el('h2','',title);if(sub)h.appendChild(el('small','',sub));hd.appendChild(h);
  (extra||[]).forEach(function(x){hd.appendChild(x);});
  var x=btn('✕ Fermer','',close);x.setAttribute('aria-label','Fermer l’enquête');hd.appendChild(x);
}
function foot(items){var ft=cur.ft;ft.innerHTML='';items.forEach(function(x){ft.appendChild(x||el('span','sp'));});}
function progKey(S,lv){return 'atlas-enq/'+S.vol+'/'+S.ci+'/'+lv;}

/* menu : enquêtes du volet affiché */
function menu(){
  if(window.__actStop)window.__actStop();
  var V=api.vol(),list=ENQ[V.id]||[],has=list.some(Boolean);shell();
  head('🔎 Mode enquête',V.title);
  var m=cur.main;
  if(!has){
    m.appendChild(el('p','enq-big','Pas encore d’enquête pour ce volet.'));
    m.appendChild(el('p','enq-kick','Les enquêtes existent pour :'));
    var r=el('div','enq-choices');
    api.vols().forEach(function(v,i){if((ENQ[v.id]||[]).some(Boolean))r.appendChild(btn(v.title,'',function(){api.volet(i,0);menu();}));});
    m.appendChild(r);foot([null,btn('Fermer','',close)]);return;
  }
  var ci=api.ci();
  if(list[ci]){
    var c=el('div','enq-card');c.appendChild(el('p','enq-kick','Enquête du chapitre affiché : '+(ci+1)+'. '+api.chs()[ci].short));
    c.appendChild(el('p','enq-big',list[ci].q));c.appendChild(btn('Commencer cette enquête ▶','go',function(){start(ci);}));m.appendChild(c);
  }
  m.appendChild(el('p','enq-kick','Toutes les enquêtes du volet'));
  var g=el('div','enq-list');
  list.forEach(function(e,i){
    if(!e)return;var ch=api.chs()[i],b=btn('','',function(){start(i);});
    b.appendChild(el('b','',(i+1)+'. '+ch.short));b.appendChild(el('span','',e.q));
    var st=['p','c'].map(function(lv){var s=load(progKey({vol:V.id,ci:i},lv),null);return s?(LV[lv]+' ⭐ '+s.s+'/'+s.t):null;}).filter(Boolean).join(' · ');
    b.appendChild(el('span','st',st||(ch.dates||'')));g.appendChild(b);
  });
  m.appendChild(g);foot([null,btn('Fermer','',close)]);
}

function start(ci){
  var V=api.vol();api.go(ci);
  var S={vol:V.id,ci:ci,ch:api.chs()[ci],e:ENQ[V.id][ci],lvl:load('atlas-enq-lvl','p'),hyp:-1};
  if(!cur)shell();accueil(S);
}
function reset(S){S.pg=0;S.max=0;S.dom=[];S.found=[];S.stars=0;S.tot=0;S.snap=S.snap||null;}

function accueil(S){
  head('🔎 Enquête · '+(S.ci+1)+'. '+S.ch.short,S.ch.dates);
  var m=cur.main;m.innerHTML='';m.scrollTop=0;
  m.appendChild(el('p','enq-kick','La question de l’enquête'));
  var q=el('p','enq-big',S.e.q);m.appendChild(q);
  var c1=el('div','enq-card');c1.appendChild(el('p','enq-kick','Ton niveau'));
  var seg=el('div','enq-choices');
  ['p','c'].forEach(function(lv){var b=btn((lv==='p'?'🎒 ':'🎓 ')+LV[lv],'',function(){S.lvl=lv;sync();});b._lv=lv;seg.appendChild(b);});
  c1.appendChild(seg);m.appendChild(c1);
  var c2=el('div','enq-card');c2.appendChild(el('p','enq-kick','Avant de commencer : que penses-tu ?'));
  c2.appendChild(el('p','','Choisis ton hypothèse. On vérifiera à la fin de l’enquête si tu avais vu juste !'));
  var hs=el('div','enq-choices'),hyps=S.e.h.concat(['Je ne sais pas encore']);
  hyps.forEach(function(h,i){var b=btn(h,'',function(){S.hyp=i;sync();});b._i=i;hs.appendChild(b);});
  c2.appendChild(hs);m.appendChild(c2);
  m.appendChild(el('p','enq-hint','📄 Version papier : le dossier PDF contient toutes les pièces (photos, textes, cartes, tableaux), le cahier de l’enquêteur niveau primaire, le cahier niveau collège et le corrigé. Le dossier Word (.docx) contient la même chose, à modifier librement.'));
  var go=btn('Commencer l’enquête ▶','go',function(){save('atlas-enq-lvl',S.lvl);reset(S);page(S);});
  function sync(){
    [].forEach.call(seg.children,function(b){b.setAttribute('aria-pressed',String(b._lv===S.lvl));});
    [].forEach.call(hs.children,function(b){b.setAttribute('aria-pressed',String(b._i===S.hyp));});
    go.disabled=S.hyp<0;
  }
  sync();
  foot([btn('◀ Toutes les enquêtes','',menu),btn('🔊 Écouter','',function(){say(S.e.q+'. Choisis ton hypothèse : '+hyps.join(' ? ')+' ?');}),dosBtn(S),null,go]);
}

function steps(S){
  var w=el('div','enq-steps'),N=S.e.pg.length;
  for(var i=0;i<=N;i++)(function(i){
    var b=btn(i<N?String(i+1):'🏁','',function(){if(i<=S.max){S.pg=i;page(S);}});
    b.disabled=i>S.max;if(i===S.pg)b.classList.add('cur');if(S.found[i])b.classList.add('fin');
    b.setAttribute('aria-label',i<N?'Page '+(i+1):'Conclusion');w.appendChild(b);
  })(i);
  return w;
}
function pageHead(S){head('🔎 '+S.ch.short,S.e.q,[el('span','enq-lv',(S.lvl==='p'?'🎒 ':'🎓 ')+LV[S.lvl]),steps(S)]);}
function qsOf(p,S){return (S.lvl==='p'?p.p:p.c)||p.p||p.c||[];}

function page(S){
  var N=S.e.pg.length;if(S.pg>=N){conclusion(S);return;}
  var p=S.e.pg[S.pg],m=cur.main;pageHead(S);m.innerHTML='';m.scrollTop=0;
  var next=btn(S.pg<N-1?'Page suivante ▶':'Conclure l’enquête 🏁','go',function(){S.pg++;S.max=Math.max(S.max,S.pg);page(S);});
  var dom=S.dom[S.pg];
  if(!dom){
    dom=el('div','enq-grid');
    var L=el('div','enq-docs'),R=el('div');
    var lh=el('div','enq-row');lh.style.marginTop='0';lh.appendChild(el('p','enq-kick','Document'+(Array.isArray(p.d)?'s':'')));
    var sp=el('span','sp');sp.style.flex='1';lh.appendChild(sp);
    var docs=docEl(p.d,S);lh.appendChild(btn('🔊 Lire le document','enq-say',function(){sayDocs(docs);}));
    L.appendChild(lh);L.appendChild(docs);
    R.appendChild(el('p','enq-kick','Page '+(S.pg+1)+' / '+N+' · '+p.t));
    var qs=qsOf(p,S),left=qs.length,pg=S.pg;
    qs.forEach(function(q,k){
      var w=QR[q.k](q,k+1,function(first){S.tot++;if(first)S.stars++;w.classList.add('done');left--;if(!left)found(S,pg,R);});
      R.appendChild(w);
    });
    if(!qs.length)found(S,pg,R);
    dom.appendChild(L);dom.appendChild(R);S.dom[S.pg]=dom;
  }
  m.appendChild(dom);
  next.disabled=!S.found[S.pg];S.nextBtn=next;
  foot([btn(S.pg?'◀ Page précédente':'◀ Accueil','',function(){if(S.pg){S.pg--;page(S);}else accueil(S);}),carnetBtn(S),null,next]);
}
function found(S,pg,R){
  S.found[pg]=true;var p=S.e.pg[pg];
  var c=el('div','enq-ind');c.appendChild(el('b','','🔍 Indice n° '+(pg+1)+' trouvé ! Il va dans ton carnet.'));c.appendChild(document.createTextNode(p.i));
  R.appendChild(c);if(S.pg===pg){if(S.nextBtn)S.nextBtn.disabled=false;pageHead(S);var cb=cur.ft.querySelector('.enq-cb');if(cb)cb.textContent=cbTxt(S);}
  setTimeout(function(){try{c.scrollIntoView({behavior:'smooth',block:'nearest'});}catch(e){}},60);
}
function cbTxt(S){return '📒 Carnet ('+S.found.filter(Boolean).length+' / '+S.e.pg.length+')';}
function carnetList(S){
  var ul=el('ul','enq-carnet');
  S.e.pg.forEach(function(p,i){var li=el('li',S.found[i]?'':'no');li.appendChild(el('span','','Indice '+(i+1)));li.appendChild(document.createTextNode(S.found[i]?p.i:'à trouver…'));ul.appendChild(li);});
  return ul;
}
function hypTxt(S){var h=S.e.h.concat(['Je ne sais pas encore']);return h[S.hyp]||'';}
function carnetBtn(S){
  var b=btn(cbTxt(S),'enq-cb',function(){
    var old=cur.box.querySelector('.enq-drawer');if(old){old.remove();return;}
    var d=el('div','enq-drawer'),h=el('h3');h.appendChild(el('span','','📒 Mon carnet d’enquête'));h.appendChild(btn('✕','',function(){d.remove();}));d.appendChild(h);
    d.appendChild(el('p','enq-kick','Ma question'));d.appendChild(el('p','',S.e.q));
    d.appendChild(el('p','enq-kick','Mon hypothèse de départ'));d.appendChild(el('p','','« '+hypTxt(S)+' »'));
    d.appendChild(el('p','enq-kick','Mes indices'));d.appendChild(carnetList(S));
    d.appendChild(btn('🔊 Lire mon carnet','',function(){say(S.e.pg.map(function(p,i){return S.found[i]?'Indice '+(i+1)+' : '+p.i:'';}).join('. '));}));
    cur.box.appendChild(d);
  });
  return b;
}

function conclusion(S){
  var m=cur.main,f=S.e.f;pageHead(S);m.innerHTML='';m.scrollTop=0;
  var dom=S.dom[S.pg];
  if(!dom){
    dom=el('div','enq-grid');var L=el('div','enq-docs'),R=el('div');
    var c=el('div','enq-card');c.appendChild(el('p','enq-kick','La question de l’enquête'));c.appendChild(el('p','',S.e.q));
    c.appendChild(el('p','enq-kick','Ton hypothèse de départ'));c.appendChild(el('p','','« '+hypTxt(S)+' »'));L.appendChild(c);
    L.appendChild(el('p','enq-kick','📒 Les indices de ton carnet'));L.appendChild(carnetList(S));
    R.appendChild(el('p','enq-kick','🏁 Conclusion : réponds à la question'));
    var fin=function(){result(S,R);};
    if(S.lvl==='p'){
      var w0=QR.trou({q:f.p,w:f.w},1,function(first){S.tot++;if(first)S.stars++;w0.classList.add('done');fin();},'Complète le résumé de l’enquête. Aide-toi de ton carnet.');
      R.appendChild(w0);
    }else{
      var w1=QR.qcm({q:'Quelle conclusion répond le mieux à la question de l’enquête ?',a:f.c},1,function(first){S.tot++;if(first)S.stars++;w1.classList.add('done');
        var w2=QR.libre({q:'Réponds maintenant avec tes mots, en 3 ou 4 phrases. Appuie-toi sur au moins deux documents (cite-les).',m:f.r},2,function(ok){S.tot++;if(ok)S.stars++;w2.classList.add('done');fin();});
        R.appendChild(w2);
      });
      R.appendChild(w1);
    }
    dom.appendChild(L);dom.appendChild(R);S.dom[S.pg]=dom;
  }
  m.appendChild(dom);
  foot([btn('◀ Page précédente','',function(){S.pg--;page(S);}),carnetBtn(S),null,btn('Toutes les enquêtes','',menu)]);
}
function result(S,R){
  S.found[S.e.pg.length]=true;pageHead(S);
  var box=el('div','enq-res');box.appendChild(el('p','enq-kick','✅ Résultat de l’enquête'));box.appendChild(el('p','',S.e.f.r));R.appendChild(box);
  var hc=el('div','enq-card');
  if(S.hyp<S.e.h.length){
    hc.appendChild(el('p','','Ton hypothèse de départ était : « '+S.e.h[S.hyp]+' ». Avais-tu vu juste ?'));
    var r=el('div','enq-row'),msg=el('p','enq-fb');
    r.appendChild(btn('🎯 Oui, j’avais vu juste','',function(){msg.className='enq-fb ok';msg.textContent='Bravo ! Et maintenant, tu peux le prouver avec des documents : c’est ça, une enquête.';}));
    r.appendChild(btn('🔄 Non, j’ai changé d’avis','',function(){msg.className='enq-fb ok';msg.textContent='Changer d’avis grâce aux documents, c’est exactement le travail d’un historien !';}));
    hc.appendChild(r);hc.appendChild(msg);
  }else hc.appendChild(el('p','','Tu ne savais pas au départ : maintenant, tu sais, et tu peux le prouver avec des documents !'));
  R.appendChild(hc);
  var rt=S.tot?S.stars/S.tot:0;
  R.appendChild(el('div','enq-score',(rt>=0.8?'🌟':rt>=0.5?'👍':'💪')+' '+S.stars+' / '+S.tot));
  R.appendChild(el('p','enq-hint','Étoiles = réponses trouvées du premier coup.')).style.textAlign='center';
  var k=progKey(S,S.lvl),old=load(k,null);if(!old||S.stars/S.tot>=old.s/old.t)save(k,{s:S.stars,t:S.tot});
  var row=el('div','enq-row');row.style.justifyContent='center';
  row.appendChild(btn('↺ Recommencer','',function(){S.hyp=-1;accueil(S);}));
  row.appendChild(btn(window.ENQ_LV?'Refaire en « '+LV[S.lvl==='p'?'c':'p']+' »':'Faire le niveau '+(S.lvl==='p'?'collège':'primaire'),'',function(){S.lvl=S.lvl==='p'?'c':'p';S.hyp=-1;accueil(S);}));
  var list=ENQ[S.vol],nx=-1;for(var i=S.ci+1;i<list.length;i++)if(list[i]){nx=i;break;}
  row.appendChild(dosBtn(S));
  if(nx>=0)row.appendChild(btn('Enquête suivante : '+api.chs()[nx].short+' ▶','go',function(){start(nx);}));
  R.appendChild(row);say('Bravo, enquête terminée !');
  setTimeout(function(){try{box.scrollIntoView({behavior:'smooth',block:'start'});}catch(e){}},60);
}

/* voir l'animation du chapitre sur la grande carte, puis revenir */
function anim(S){
  var c=cur;if(!c)return;c.ov.style.display='none';api.go(S.ci);api.play();
  var b=btn('↩ Revenir à l’enquête','enq-back',function(){b.remove();c.back=null;api.hush();c.ov.style.display='';});
  api.canvas().parentNode.appendChild(b);c.back=b;
}

[].forEach.call(document.querySelectorAll('[data-enq]'),function(b){b.addEventListener('click',menu);});
window.__enq=function(ci){if(ci==null)menu();else start(ci);return !!cur;};window.__enqClose=close;
})();
