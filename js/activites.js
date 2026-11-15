/* Activités élèves de l'atlas : placer les noms sur la carte, remettre les chapitres dans l'ordre, quiz noté.
   Utilise ATLAS.api (engine.js) et les mauvaises réponses QCM (facile.js).
   Tout se fait au doigt (TBI, tablette) comme à la souris : glisser OU toucher puis toucher. */
(function(){
'use strict';
var A=window.ATLAS;if(!A||!A.api)return;
var api=A.api,IMG=window.IMG||{};

var css=[
'.act-layer{position:absolute;inset:0;z-index:6;touch-action:none;font-family:var(--font-body)}',
'.act-bar{position:absolute;left:8px;right:8px;top:8px;display:flex;flex-wrap:wrap;gap:8px 12px;align-items:center;background:rgba(6,20,36,.93);border:1px solid var(--line);border-radius:12px;padding:8px 12px;color:var(--ink);font-size:17px}',
'.act-bar b{color:var(--gold)}.act-bar .sp{flex:1}',
'.act-bar button,.act-box button{font:inherit;cursor:pointer;border-radius:10px;border:1px solid var(--line);background:var(--panel-2);color:var(--ink);padding:6px 12px}',
'.act-bar label,.act-box label{font-size:15px;display:inline-flex;gap:6px;align-items:center;color:var(--muted);cursor:pointer}',
'.act-tray{position:absolute;left:8px;right:8px;bottom:8px;display:flex;flex-wrap:wrap;gap:10px;justify-content:center;padding:10px;background:rgba(6,20,36,.88);border:1px solid var(--line);border-radius:12px}',
'.act-tray:empty{display:none}',
'.act-chip{font:600 18px var(--font-body);padding:10px 16px;border-radius:999px;background:#fff7e0;color:#12202e;border:2px solid var(--gold);cursor:grab;user-select:none;-webkit-user-select:none;touch-action:none;box-shadow:0 2px 6px rgba(0,0,0,.35)}',
'.act-chip.sel{outline:4px solid #7cb7ff;outline-offset:2px}',
'.act-chip.drag{position:fixed;z-index:10001;pointer-events:none;cursor:grabbing;transform:translate(-50%,-50%) scale(1.08)}',
'.act-dot{position:absolute;width:24px;height:24px;margin:-12px 0 0 -12px;border-radius:50%;background:rgba(255,209,102,.3);border:3px solid var(--gold);box-shadow:0 0 0 3px rgba(6,20,36,.75)}',
'.act-dot.ok{background:#22c55e;border-color:#bbf7d0}',
'.act-dot.hint{animation:actBlink .6s ease-in-out infinite alternate}',
'.act-layer.nodots .act-dot:not(.ok){opacity:0}',
'.act-tag{position:absolute;transform:translate(16px,-50%);font:700 17px var(--font-body);color:#053b1a;background:#dcfce7;border:2px solid #22c55e;border-radius:8px;padding:2px 8px;white-space:nowrap;pointer-events:none}',
'.act-shake{animation:actShake .4s}',
'@keyframes actShake{0%,100%{translate:0}20%,60%{translate:-8px}40%,80%{translate:8px}}',
'@keyframes actBlink{from{transform:scale(1)}to{transform:scale(1.7);background:var(--gold)}}',
'.act-ov{position:fixed;inset:0;z-index:10000;background:rgba(2,8,16,.8);display:flex;align-items:center;justify-content:center;padding:16px;font-family:var(--font-body)}',
'.act-box{background:var(--panel);color:var(--ink);border:1px solid var(--line);border-radius:18px;width:min(1000px,100%);max-height:100%;overflow:auto;padding:18px 22px;box-shadow:0 20px 60px rgba(0,0,0,.5)}',
'.act-head{display:flex;align-items:center;gap:12px;margin-bottom:10px}',
'.act-head h2{margin:0;font:700 24px var(--font-display);flex:1}',
'.act-msg{font-size:20px;min-height:30px;margin:8px 0}',
'.act-msg.ok{color:#4ade80}.act-msg.ko{color:#fb7185}',
'.act-slots,.act-cards{display:grid;gap:10px;grid-template-columns:repeat(var(--n),minmax(0,1fr))}',
'.act-slot{min-height:150px;border:3px dashed var(--line);border-radius:14px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;padding:6px;text-align:center;font-size:28px;color:var(--line)}',
'.act-slot.ok{border:3px solid #22c55e;background:rgba(34,197,94,.12);color:var(--ink);font-size:16px;font-weight:600}',
'.act-ends{display:flex;justify-content:space-between;font-size:15px;color:var(--muted);margin:4px 0 14px}',
'.act-card{border:2px solid var(--line);border-radius:14px;background:var(--panel-2);color:var(--ink);padding:8px;display:flex;flex-direction:column;align-items:center;gap:6px;cursor:pointer;font:600 16px var(--font-body);text-align:center}',
'.act-card.gone{visibility:hidden}',
'.act-card img,.act-slot img{width:100%;height:84px;object-fit:cover;border-radius:8px;background:#0a1a2c}',
'.act-card .d,.act-slot .d{font-weight:400;font-size:14px;color:var(--gold)}',
'.act-card.hint{border-color:var(--gold);box-shadow:0 0 0 5px rgba(255,209,102,.55)}',
'.act-q{font:600 25px var(--font-body);margin:8px 0 16px;line-height:1.35}',
'.act-ans{display:grid;gap:12px}',
'.act-ans button{font:500 20px var(--font-body);text-align:left;padding:14px 18px;min-height:62px;display:flex;gap:14px;align-items:center}',
'.act-ans .l{flex:none;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;background:var(--gold);color:#12202e}',
'.act-ans button.ok{background:#14532d;border-color:#22c55e}',
'.act-ans button.ko{background:#4c0519;border-color:#fb7185}',
'.act-ans button:disabled{cursor:default;opacity:1}','.act-ans button:disabled:not(.ok):not(.ko){opacity:.5}','.act-box button,.act-bar button{flex:0 0 auto}',
'.act-row{display:flex;flex-wrap:wrap;gap:10px 16px;margin-top:14px;align-items:center}',
'.act-box .primary{background:var(--gold);color:#12202e;border-color:var(--gold);font-weight:700}',
'.act-box .big{font-size:19px;padding:12px 20px}',
'.act-score{font-size:52px;text-align:center;margin:14px 0 4px}',
'.act-toast{position:absolute;left:50%;top:12px;transform:translateX(-50%);z-index:7;background:rgba(6,20,36,.95);color:var(--ink);border:1px solid var(--line);border-radius:10px;padding:8px 14px;font-size:15px}',
'@media (max-width:700px){.act-q{font-size:20px}.act-ans button{font-size:17px}.act-slot{min-height:110px}.act-card img,.act-slot img{height:56px}.act-slots,.act-cards{grid-template-columns:repeat(var(--m),minmax(0,1fr))}}'
].join('\n');
var stl=document.createElement('style');stl.textContent=css;document.head.appendChild(stl);

function el(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;}
function btn(txt,cls,fn){var b=el('button',cls,txt);b.type='button';if(fn)b.addEventListener('click',fn);return b;}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t;}return a;}
function shake(e){e.classList.remove('act-shake');void e.offsetWidth;e.classList.add('act-shake');}
var EMO=/[\u{1F000}-\u{1FAFF}\u{2300}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}]/gu;
function say(t){
  try{var S=window.speechSynthesis;if(!S||!window.SpeechSynthesisUtterance)return;S.cancel();
    var u=new SpeechSynthesisUtterance(String(t).replace(EMO,'').replace(/≈/g,'environ ').replace(/av\. J\.-C\./g,'avant Jésus-Christ').replace(/apr\. J\.-C\./g,'après Jésus-Christ'));
    u.lang='fr-FR';u.rate=0.9;var v=(S.getVoices()||[]).filter(function(x){return /^fr/i.test(x.lang);})[0];if(v)u.voice=v;S.speak(u);
  }catch(e){}
}
function host(){return document.fullscreenElement||document.body;}
function stage(){return api.canvas().parentNode;}
function toast(m){var t=el('div','act-toast',m);stage().appendChild(t);setTimeout(function(){t.remove();},2800);}
function photoOf(c){var ps=(c.photos||[]).filter(function(p){return p&&IMG[p.id];});return ps.length?IMG[ps[0].id].f:null;}

var current=null;
function stop(){if(current){var c=current;current=null;c();}}
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&current)stop();},true);

function modal(title){
  var ov=el('div','act-ov'),box=el('div','act-box'),hd=el('div','act-head'),body=el('div');
  ov.setAttribute('role','dialog');ov.setAttribute('aria-modal','true');ov.setAttribute('aria-label',title);
  hd.appendChild(el('h2','',title));hd.appendChild(btn('✕ Fermer','',stop));
  box.appendChild(hd);box.appendChild(body);ov.appendChild(box);host().appendChild(ov);
  ov.addEventListener('click',function(e){if(e.target===ov)stop();});
  current=function(){ov.remove();try{window.speechSynthesis.cancel();}catch(e){}};
  return body;
}

/* ---------- 1. Placer les noms sur la carte ---------- */
var nomsDots=true;
function noms(){
  stop();
  var ch=api.chs()[api.ci()];
  /* lieux encore affichés à la fin du chapitre ; les noms de régions (sans point) seulement s'il manque des lieux */
  function cands(all){var seen={},o=[];(ch.labels||[]).forEach(function(l){if(!l.text||l.end||seen[l.text]||(l.nomark&&!all))return;seen[l.text]=1;o.push(l);});return o;}
  var pool=cands(false);if(pool.length<3)pool=cands(true);
  pool=shuffle(pool).sort(function(a,b){return (b.gold?1:0)-(a.gold?1:0);});
  function pts(list){return list.map(function(l){return [l.lon,l.lat];});}
  /* on garde des lieux assez éloignés les uns des autres à l'écran (points bien séparés), 6 au plus */
  function sep(list,d,max){var kept=[];list.forEach(function(l){var q=api.pt(l.lon,l.lat);if(!q||kept.length>=max)return;if(kept.every(function(k){return Math.hypot(k.q[0]-q[0],k.q[1]-q[1])>=d;}))kept.push({l:l,q:q});});return kept.map(function(k){return k.l;});}
  var all=pool;
  if(all.length>=2){api.showEnd(pts(all));pool=sep(all,64,6);}
  if(pool.length<2&&all.length>=2){api.showEnd(null);pool=sep(all,64,6);}  /* repli : vue de fin du chapitre */
  if(pool.length<2){api.release();toast('Pas assez de lieux nommés dans ce chapitre pour cette activité.');return;}
  api.showEnd(pts(pool));
  var cv=api.canvas(),st=stage();
  var layer=el('div','act-layer'+(nomsDots?'':' nodots')),bar=el('div','act-bar'),tray=el('div','act-tray');
  var msg=el('span','','Pose chaque nom sur son point.');
  var chk=el('input');chk.type='checkbox';chk.checked=nomsDots;
  var lab=el('label');lab.appendChild(chk);lab.appendChild(document.createTextNode(' Points visibles'));
  chk.addEventListener('change',function(){nomsDots=chk.checked;layer.classList.toggle('nodots',!nomsDots);});
  bar.appendChild(el('b','','Placer les noms'));bar.appendChild(msg);bar.appendChild(el('span','sp'));
  bar.appendChild(lab);var b1=btn('↺','',noms),b2=btn('✕','',stop);b1.title='Rejouer';b1.setAttribute('aria-label','Rejouer');b2.title='Fermer';b2.setAttribute('aria-label','Fermer');bar.appendChild(b1);bar.appendChild(b2);
  layer.appendChild(bar);layer.appendChild(tray);st.appendChild(layer);
  var items=pool.map(function(l){return {l:l,tries:0,done:false,dot:el('div','act-dot'),chip:el('div','act-chip',l.text),tag:null};});
  shuffle(items).forEach(function(it){tray.appendChild(it.chip);});
  /* les points ne doivent pas tomber sous la barre ou sous les étiquettes : on dézoome si besoin */
  function safe(){
    var w=cv.clientWidth,h=cv.clientHeight,top=bar.offsetHeight+24,bot=h-tray.offsetHeight-24;
    return items.every(function(it){var q=api.pt(it.l.lon,it.l.lat);return q&&q[0]>24&&q[0]<w-24&&q[1]>top&&q[1]<bot;});
  }
  for(var k=0;k<8&&!safe();k++){var c=api.camNow();api.cam({lon:c.lon,lat:c.lat,z:c.z*0.92});}
  var keep=sep(items.map(function(it){return it.l;}),44,6);
  items=items.filter(function(it){if(keep.indexOf(it.l)>=0)return true;it.chip.remove();return false;});
  if(items.length<2){layer.remove();api.release();toast('Les lieux de ce chapitre sont trop éloignés pour cette activité.');return;}
  api.hideLabels(true);if(api.avoid)api.avoid(tray);
  items.forEach(function(it){layer.insertBefore(it.dot,bar);});
  function place(){
    items.forEach(function(it){var q=api.pt(it.l.lon,it.l.lat);if(!q)return;
      it.dot.style.left=q[0]+'px';it.dot.style.top=q[1]+'px';
      if(it.tag){it.tag.style.left=q[0]+'px';it.tag.style.top=q[1]+'px';}});
  }
  place();
  var first=0,sel=null,drag=null,ghost=null;
  function say1(t,cls){msg.textContent=t;msg.style.color=cls==='ok'?'#4ade80':cls==='ko'?'#fb7185':'';}
  function select(it){
    if(sel)sel.chip.classList.remove('sel');
    sel=(sel===it)?null:it;
    if(sel){sel.chip.classList.add('sel');say1('Touche maintenant le bon point sur la carte.');}
  }
  function drop(it,cx,cy){
    var rc=cv.getBoundingClientRect(),x=cx-rc.left,y=cy-rc.top;
    if(x<0||y<0||x>rc.width||y>rc.height)return;
    var q=api.pt(it.l.lon,it.l.lat),tol=Math.max(30,Math.min(rc.width,rc.height)*0.06);
    if(q&&Math.hypot(q[0]-x,q[1]-y)<=tol){
      it.done=true;if(!it.tries)first++;
      it.dot.classList.remove('hint');it.dot.classList.add('ok');
      it.tag=el('div','act-tag',it.l.text);layer.insertBefore(it.tag,bar);
      it.chip.remove();if(sel===it)sel=null;place();
      var left=items.filter(function(x){return !x.done;}).length;
      if(!left){say1('Bravo, tout est placé ! '+first+' / '+items.length+' du premier coup.','ok');say('Bravo, tout est placé !');}
      else say1('Bravo ! Encore '+left+'.','ok');
    }else{
      it.tries++;shake(it.chip);
      if(it.tries>=2){it.dot.classList.add('hint');say1('Regarde le point qui clignote.','ko');}
      else say1('Pas là ! Essaie encore.','ko');
    }
  }
  items.forEach(function(it){
    var c=it.chip;
    c.addEventListener('pointerdown',function(e){e.preventDefault();drag={it:it,x0:e.clientX,y0:e.clientY,moved:false};try{c.setPointerCapture(e.pointerId);}catch(err){}});
    c.addEventListener('pointermove',function(e){
      if(!drag||drag.it!==it)return;
      if(!drag.moved&&Math.hypot(e.clientX-drag.x0,e.clientY-drag.y0)>6){
        drag.moved=true;if(sel){sel.chip.classList.remove('sel');sel=null;}
        ghost=c.cloneNode(true);ghost.classList.add('drag');host().appendChild(ghost);c.style.visibility='hidden';
      }
      if(drag.moved&&ghost){ghost.style.left=e.clientX+'px';ghost.style.top=e.clientY+'px';}
    });
    function end(e,ok){
      if(!drag||drag.it!==it)return;var d=drag;drag=null;
      if(ghost){ghost.remove();ghost=null;}c.style.visibility='';
      if(!ok)return;
      if(d.moved)drop(it,e.clientX,e.clientY);else select(it);
    }
    c.addEventListener('pointerup',function(e){end(e,true);});
    c.addEventListener('pointercancel',function(e){end(e,false);});
  });
  layer.addEventListener('pointerup',function(e){if(sel&&(e.target===layer||e.target.classList.contains('act-dot')))drop(sel,e.clientX,e.clientY);});
  var ro=window.ResizeObserver?new ResizeObserver(function(){requestAnimationFrame(place);}):null;if(ro)ro.observe(cv);
  var V0=api.vol(),C0=api.ci(),watch=setInterval(function(){if(api.vol()!==V0||api.ci()!==C0)stop();},400);
  current=function(){clearInterval(watch);if(ro)ro.disconnect();if(ghost)ghost.remove();layer.remove();api.release();};
}

/* ---------- 2. Remettre les chapitres dans l'ordre ---------- */
var friseDates=true,friseN=4;
function frise(){
  stop();
  var V=api.vol(),used={},cand=[];
  api.chs().forEach(function(c,i){var w=c.when&&c.when[0];if(w==null||used[w])return;used[w]=1;cand.push({c:c,i:i,w:w});});
  if(cand.length<3){toast('Pas assez de chapitres datés dans ce volet.');return;}
  var n=Math.min(friseN,cand.length);
  var pick=shuffle(cand).slice(0,n),order=pick.slice().sort(function(a,b){return a.w-b.w;});
  var body=modal('Remettre dans l’ordre : '+V.title);
  var ctl=el('div','act-row');ctl.style.marginTop='0';
  var chk=el('input');chk.type='checkbox';chk.checked=friseDates;
  var lab=el('label');lab.appendChild(chk);lab.appendChild(document.createTextNode(' Afficher les dates'));
  chk.addEventListener('change',function(){friseDates=chk.checked;frise();});
  ctl.appendChild(lab);
  [4,6].forEach(function(k){if(k<=cand.length){var b=btn(k+' cartes',k===n?'primary':'',function(){friseN=k;frise();});ctl.appendChild(b);}});
  ctl.appendChild(btn('🔊 Écouter la consigne','',function(){say('Touche les cartes, de la plus ancienne à la plus récente.');}));
  body.appendChild(ctl);
  var msg=el('p','act-msg','Touche les cartes, de la plus ancienne à la plus récente.');body.appendChild(msg);
  var slots=el('div','act-slots'),cards=el('div','act-cards');
  [slots,cards].forEach(function(g){g.style.setProperty('--n',n);g.style.setProperty('--m',Math.min(n,3));});
  var sl=[];for(var s=0;s<n;s++){var d=el('div','act-slot',String(s+1));slots.appendChild(d);sl.push(d);}
  body.appendChild(slots);
  var ends=el('div','act-ends');ends.appendChild(el('span','','◀ le plus ancien'));ends.appendChild(el('span','','le plus récent ▶'));body.appendChild(ends);
  function fill(box,it,showD){
    var src=photoOf(it.c);if(src){var im=document.createElement('img');im.src=src;im.alt='';box.appendChild(im);}
    box.appendChild(el('span','',it.c.short));if(showD&&it.c.dates)box.appendChild(el('span','d',it.c.dates));
  }
  var step=0,errs=0,stepErr=0,cardEls=[];
  pick.forEach(function(it){
    var b=el('button','act-card');b.type='button';fill(b,it,friseDates);cards.appendChild(b);cardEls.push({b:b,it:it});
    b.addEventListener('click',function(){
      if(step>=n||b.classList.contains('gone'))return;
      if(it===order[step]){
        var slot=sl[step];slot.textContent='';slot.classList.add('ok');fill(slot,it,true);
        b.classList.add('gone');cardEls.forEach(function(x){x.b.classList.remove('hint');});
        step++;stepErr=0;
        if(step===n){msg.className='act-msg ok';msg.textContent='Bravo ! La frise est complète'+(errs?' ('+errs+' erreur'+(errs>1?'s':'')+').':', sans erreur !');say('Bravo ! La frise est complète.');end();}
        else{msg.className='act-msg ok';msg.textContent='Oui ! Quelle est la suivante ?';}
      }else{
        errs++;stepErr++;shake(b);msg.className='act-msg ko';msg.textContent='Non : il y a plus ancien !';
        if(stepErr>=2)cardEls.forEach(function(x){if(x.it===order[step])x.b.classList.add('hint');});
      }
    });
  });
  body.appendChild(cards);
  function end(){var r=el('div','act-row');r.appendChild(btn('↺ Rejouer avec d’autres cartes','primary big',frise));r.appendChild(btn('Fermer','big',stop));body.appendChild(r);}
}

/* ---------- 3. Quiz noté (choix multiples) ---------- */
function qcm(){
  stop();
  var V=api.vol(),chs=api.chs(),ch=chs[api.ci()];
  function qsOf(c){return (c.q||[]).map(function(q,k){return {q:q[0],a:q[1],w:(c.qcm&&c.qcm[k])||[]};}).filter(function(x){return x.w.length>=2;});}
  var here=qsOf(ch),all=[];chs.forEach(function(c){all=all.concat(qsOf(c));});
  if(!all.length){toast('Pas de questions pour ce volet.');return;}
  var body=modal('Quiz');
  function menu(){
    body.innerHTML='';
    body.appendChild(el('p','act-q','Sur quoi veux-tu être interrogé ?'));
    var r=el('div','act-row');
    if(here.length)r.appendChild(btn('Ce chapitre : '+ch.short+' ('+here.length+' questions)','primary big',function(){run(shuffle(here),ch.short);}));
    r.appendChild(btn('Tout le volet ('+Math.min(10,all.length)+' questions)','big',function(){run(shuffle(all).slice(0,10),V.title);}));
    body.appendChild(r);
  }
  function run(list,label){
    var i=0,score=0;
    function show(){
      body.innerHTML='';var it=list[i];
      var top=el('div','act-row');top.style.marginTop='0';
      top.appendChild(el('span','','Question '+(i+1)+' / '+list.length));
      top.appendChild(el('span','','⭐ '+score));
      var opts=shuffle([{t:it.a,ok:true},{t:it.w[0]},{t:it.w[1]}]),L='ABC';
      top.appendChild(btn('🔊 Écouter','',function(){say(it.q+' '+opts.map(function(o,k){return 'Réponse '+L[k]+' : '+o.t;}).join(' '));}));
      top.appendChild(el('span','sp'));top.lastChild.style.flex='1';
      top.appendChild(el('span','',label)).style.color='var(--muted)';
      body.appendChild(top);
      body.appendChild(el('p','act-q',it.q));
      var ans=el('div','act-ans'),bs=[];
      opts.forEach(function(o,k){
        var b=el('button');b.type='button';b.appendChild(el('span','l',L[k]));b.appendChild(el('span','',o.t));ans.appendChild(b);bs.push(b);
        b.addEventListener('click',function(){
          bs.forEach(function(x){x.disabled=true;});
          if(o.ok){score++;b.classList.add('ok');msg.className='act-msg ok';msg.textContent='Bravo !';}
          else{b.classList.add('ko');bs[opts.indexOf(opts.filter(function(x){return x.ok;})[0])].classList.add('ok');msg.className='act-msg ko';msg.textContent='Non. La bonne réponse est en vert.';}
          var nx=btn(i+1<list.length?'Question suivante ▶':'Voir mon score','primary big',function(){i++;if(i<list.length)show();else fin();});
          row.appendChild(nx);nx.focus();
        });
      });
      body.appendChild(ans);
      var msg=el('p','act-msg');body.appendChild(msg);
      var row=el('div','act-row');body.appendChild(row);
    }
    function fin(){
      body.innerHTML='';var n=list.length,rt=score/n;
      body.appendChild(el('div','act-score',(rt>=0.8?'🌟':rt>=0.5?'👍':'💪')+' '+score+' / '+n));
      var m=rt>=0.8?'Excellent !':rt>=0.5?'Bien joué !':'On recommence ? Tu vas y arriver.';
      body.appendChild(el('p','act-q',m)).style.textAlign='center';say(m);
      var r=el('div','act-row');r.style.justifyContent='center';
      r.appendChild(btn('↺ Rejouer','primary big',function(){run(shuffle(list),label);}));
      r.appendChild(btn('Changer de quiz','big',menu));r.appendChild(btn('Fermer','big',stop));
      body.appendChild(r);
    }
    show();
  }
  menu();
}

var ACT={noms:noms,frise:frise,qcm:qcm};
[].forEach.call(document.querySelectorAll('[data-act]'),function(b){b.addEventListener('click',function(){var f=ACT[b.getAttribute('data-act')];if(f)f();});});
window.__act=function(k){ACT[k]();return !!current;};window.__actStop=stop;
})();
