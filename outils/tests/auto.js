window.__auto=function(vi,ci,lvl){
  var api=ATLAS.api,vol=api.vols()[vi].id;api.volet(vi,ci);window.__enq(ci);
  var box=document.querySelector('.enq-box'),log=[],e=ENQ[vol][ci];
  function B(t,r){return [].slice.call((r||box).querySelectorAll('button')).find(function(b){return b.textContent.trim()===t&&!b.disabled;});}
  function ck(b,what){if(!b){log.push('bouton introuvable : '+what);return false;}b.click();return true;}
  function answer(w,q){
    if(!w){log.push('bloc question absent : '+q.q);return;}
    if(q.k==='qcm')ck([].slice.call(w.querySelectorAll('.enq-ans button')).find(function(b){return b.lastChild.textContent===q.a[0];}),q.a[0]);
    else if(q.k==='vf')ck(B(q.a?'✔ Vrai':'✘ Faux',w),'vf');
    else if(q.k==='ordre')q.a.forEach(function(t){ck(B(t,w.querySelector('.enq-chips')),t);});
    else if(q.k==='trou')(q.q.match(/\[([^\]]+)\]/g)||[]).forEach(function(s){ck(B(s.slice(1,-1),w.querySelector('.enq-chips')),s);});
    else if(q.k==='relie'){var c=w.querySelector('.enq-rel').children;q.a.forEach(function(p){ck(B(p[0],c[0]),p[0]);ck(B(p[1],c[1]),p[1]);});}
    else if(q.k==='libre'){w.querySelector('textarea').value='réponse test';ck(B('Voir une réponse possible',w),'voir');ck(B('✔ J’avais l’essentiel',w),'essentiel');}
    if(!w.classList.contains('done'))log.push('non validée : '+(q.q||'').slice(0,50));
  }
  ck([].slice.call(box.querySelectorAll('.enq-choices button')).find(function(b){return b.textContent.indexOf(lvl==='p'?'🎒':'🎓')===0;}),'niveau');
  ck(box.querySelectorAll('.enq-choices')[1].children[0],'hypothèse');
  ck(B('Commencer l’enquête ▶'),'commencer');
  e.pg.forEach(function(p,pi){
    var qs=(lvl==='p'?p.p:p.c)||p.p||p.c||[],ws=box.querySelectorAll('.enq-main .enq-q');
    if(ws.length!==qs.length)log.push('p'+pi+' : '+ws.length+' blocs pour '+qs.length+' questions');
    qs.forEach(function(q,k){answer(ws[k],q);});
    if(!box.querySelector('.enq-docs').children.length)log.push('p'+pi+' sans document');
    ck(B(pi<e.pg.length-1?'Page suivante ▶':'Conclure l’enquête 🏁'),'suivant p'+pi);
  });
  var ws=box.querySelectorAll('.enq-main .enq-q');
  if(lvl==='p')answer(ws[0],{k:'trou',q:e.f.p});
  else{answer(ws[0],{k:'qcm',a:e.f.c,q:'conclusion'});ws=box.querySelectorAll('.enq-main .enq-q');answer(ws[1],{k:'libre',q:'rédaction'});}
  var txt=box.innerText,res=!!box.querySelector('.enq-res');window.__enqClose();
  return {log:log,end:res,tail:txt.slice(-160)};
};
