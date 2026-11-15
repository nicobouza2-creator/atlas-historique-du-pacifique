var V=ATLAS.api.vols(),n=0;
for(var vi=0;vi<V.length;vi++)for(var ci=0;ci<V[vi].chapters.length;ci++){window.__go(vi,ci,V[vi].chapters[ci].dur*0.5);window.__go(vi,ci,-1);n++;}
return {chapters:n,vols:V.map(function(v){return v.id;}),check:window.__check().length};
