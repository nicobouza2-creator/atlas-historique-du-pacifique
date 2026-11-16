()=>{
function lum(c){var a=c.map(function(v){v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);});return 0.2126*a[0]+0.7152*a[1]+0.0722*a[2];}
function parse(s){var m=s.match(/rgba?\(([^)]+)\)/);if(!m)return null;var p=m[1].split(',').map(parseFloat);return {r:p[0],g:p[1],b:p[2],a:p.length>3?p[3]:1};}
function bgOf(el){var stack=[];for(var e=el;e&&e.nodeType==1;e=e.parentElement){var cs=getComputedStyle(e);var c=parse(cs.backgroundColor);if(cs.backgroundImage&&cs.backgroundImage!='none'&&!c.a)return null;if(c&&c.a>0){stack.push(c);if(c.a>=1)break;}}
 var base={r:7,g:20,b:38};for(var i=stack.length-1;i>=0;i--){var c=stack[i];base={r:c.r*c.a+base.r*(1-c.a),g:c.g*c.a+base.g*(1-c.a),b:c.b*c.a+base.b*(1-c.a)};}return base;}
function vis(el){var r=el.getBoundingClientRect(),cs=getComputedStyle(el);if(r.width<1||r.height<1||cs.visibility=='hidden'||cs.display=='none'||+cs.opacity<0.05)return false;if(r.bottom<0||r.top>innerHeight||r.right<0||r.left>innerWidth)return false;
 var x=Math.min(innerWidth-1,Math.max(0,r.left+r.width/2)),y=Math.min(innerHeight-1,Math.max(0,r.top+r.height/2));var t=document.elementFromPoint(x,y);return !!t&&(el.contains(t)||t.contains(el));}
function nm(el){return (el.id?'#'+el.id:el.tagName.toLowerCase()+(el.className&&el.className.baseVal==null?'.'+String(el.className).trim().split(/\s+/).slice(0,2).join('.'):''))+' «'+(el.textContent||el.getAttribute('aria-label')||'').trim().slice(0,28)+'»';}
var low=[],seen={},small=[],tiny=[],noname=[];
var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);var n;
while(n=w.nextNode()){var t=n.nodeValue.trim();if(!t)continue;var el=n.parentElement;if(!vis(el))continue;var cs=getComputedStyle(el);var fg=parse(cs.color),bg=bgOf(el);if(!fg||!bg)continue;
 var f={r:fg.r*fg.a+bg.r*(1-fg.a),g:fg.g*fg.a+bg.g*(1-fg.a),b:fg.b*fg.a+bg.b*(1-fg.a)};var l1=lum([f.r,f.g,f.b]),l2=lum([bg.r,bg.g,bg.b]);var cr=(Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05);var fs=parseFloat(cs.fontSize),big=fs>=24||(fs>=18.66&&+cs.fontWeight>=700);
 if(cr<(big?3:4.5)){var k=nm(el).split(' «')[0]+'|'+Math.round(cr*10);if(!seen[k]){seen[k]=1;low.push(cr.toFixed(2)+' '+fs+'px '+nm(el));}}
 if(fs<12){var k2=nm(el).split(' «')[0];if(!seen['f'+k2]){seen['f'+k2]=1;tiny.push(fs+'px '+nm(el));}}}
[].forEach.call(document.querySelectorAll('button,a[href],input,select,summary,[role=button],[tabindex]'),function(el){if(!vis(el))return;var r=el.getBoundingClientRect();
 if(r.width<44||r.height<44)small.push(Math.round(r.width)+'×'+Math.round(r.height)+' '+nm(el));
 var name=(el.textContent||'').trim()||el.getAttribute('aria-label')||el.getAttribute('title')||(el.labels&&el.labels.length&&el.labels[0].textContent.trim())||el.getAttribute('alt');if(!name)noname.push(nm(el));});
return {contraste:low.slice(0,25),petitesCibles:small.slice(0,40),nbPetites:small.length,texteMini:tiny.slice(0,20),sansNom:noname.slice(0,10),debordeX:document.documentElement.scrollWidth>innerWidth};
}
