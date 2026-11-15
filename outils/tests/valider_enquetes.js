const fs=require('fs'),repo=process.argv[2];global.window={};
require(repo+'/js/img.js');const IMG=window.IMG;var ENQ={};
window.EQ={Q:(q,a,ex)=>({k:'qcm',q,a,ex}),V:(q,ok,ex)=>({k:'vf',q,a:!!ok,ex}),O:(q,a)=>({k:'ordre',q,a}),T:(q,w)=>({k:'trou',q,w:w||[]}),R:(q,a)=>({k:'relie',q,a}),W:(q,m)=>({k:'libre',q,m}),I:(id,cap)=>({k:'img',id,cap}),X:(t,src,txt,tp)=>({k:'txt',t,src,txt,tp}),M:c=>({k:'map',cap:c}),TB:(t,cols,rows,src)=>({k:'tab',t,cols,rows,src}),F:(t,items)=>({k:'frise',t,items}),P:(t,d,p,c,i)=>({t,d,p,c,i}),E:(v,ci,o)=>{(ENQ[v]=ENQ[v]||[])[ci]=o;}};
let err=0;const bad=m=>{err++;console.log('  ✗ '+m);};
for(const v of process.argv.slice(3)){eval(fs.readFileSync(repo+'/js/enq-'+v+'.js','utf8'));const L=ENQ[v];
 console.log(v,L.length,'enquêtes');
 L.forEach((e,ci)=>{const at='['+v+' '+ci+']';if(!e){bad(at+' vide');return;}
  if(!e.q||e.h.length<2)bad(at+' q/h');
  e.pg.forEach((p,pi)=>{const ds=Array.isArray(p.d)?p.d:[p.d];
   ds.forEach(d=>{if(!d||!d.k)bad(at+' p'+pi+' doc');else if(d.k==='img'&&!IMG[d.id])bad(at+' image absente '+d.id);
    if(d&&d.k==='tab')d.rows.forEach(r=>{if(r.length!==d.cols.length)bad(at+' tableau colonnes');});
    if(d&&d.k==='txt'&&!d.tp)bad(at+' texte sans version primaire');});
   if(!p.i)bad(at+' p'+pi+' indice');
   ['p','c'].forEach(lv=>{const qs=p[lv];if(!qs||!qs.length)bad(at+' p'+pi+' '+lv+' vide');
    (qs||[]).forEach(q=>{if(q.k==='qcm'&&(q.a.length<2||new Set(q.a).size!==q.a.length))bad(at+' qcm '+q.q);
     if(q.k==='ordre'&&q.a.length<2)bad(at+' ordre');if(q.k==='relie'&&q.a.some(x=>x.length!==2))bad(at+' relie');
     if(q.k==='libre'&&!q.m)bad(at+' libre sans modèle');});});});
  const f=e.f;if(!f||!/\[/.test(f.p)||!f.w||f.c.length!==3||!f.r)bad(at+' conclusion');
  const words=(f.p.match(/\[([^\]]+)\]/g)||[]).map(s=>s.slice(1,-1));if(words.some(w=>f.w.includes(w)))bad(at+' intrus = mot attendu');
 });}
console.log(err?err+' erreur(s)':'OK, aucune erreur');
