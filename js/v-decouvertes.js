/* Volet 3 — Le temps des Grandes Découvertes : une carte par navigateur (planisphère). */
(function(){
'use strict';
var A=window.ATLAS,r=A.r,L=A.L,Pu=A.Pu,Ph=A.Ph,Sh=A.Sh,Lz=A.Lz,Rg=A.Rg;
function cat(){var o=[],i,j;for(i=0;i<arguments.length;i++){var a=arguments[i];for(j=(i?1:0);j<a.length;j++)o.push(a[j]);}return o;}
var S={ship:true},SS={ship:true,straight:true,step:0.25},D={dash:true,thin:true};

/* ---------- régions ---------- */
var EUROPE=[[-10,36],[-10,44],[-6,51],[-8,58],[4,59],[12,57],[22,60],[32,60],[42,56],[42,47],[30,45],[29,40.5],[23,36],[15,36.5],[5,43],[-1,36.5]];
var OTTOMAN=[[16,45],[22,46],[28,45.5],[29,41.5],[34,42.3],[40,41.5],[44,40],[42.5,37.2],[36,36],[30,36],[26.5,36.5],[23,36.2],[20,39.5],[19,42]];
var BRESIL_E=[[-46.6,-1],[-35,-4.5],[-34.5,-8],[-38.5,-13.5],[-39,-18],[-41,-22.5],[-46.6,-24.6]];
var EMP_ESP1=[[-117,32.5],[-106,31.5],[-97.5,27.5],[-97.5,19],[-88,21.8],[-87,15.5],[-83,10],[-77,7.5],[-72,12.3],[-62,10.8],[-60,8],[-68,1],[-76,-3],[-69,-15],[-63,-20],[-65,-33],[-71.5,-38],[-74.5,-37],[-70.5,-18.5],[-76.5,-13.8],[-81.5,-5],[-80,1],[-78,7],[-85,10],[-94,15.5],[-105,19.5],[-110,23.5]];
var EMP_ESP2=[[-85.2,23.5],[-74,21],[-68,19.7],[-65,18.7],[-65.5,17.6],[-78.5,17.5],[-85,21]];
var EMP_POR=[[-50,0],[-35,-4.5],[-34.5,-8],[-38.5,-13.5],[-39,-18],[-41,-22.5],[-48.5,-26],[-50,-23],[-44,-17],[-42,-6]];

/* ---------- tracés ---------- */
var ZH_A=[[121.9,31.3],[123,30],[122.6,26.5],[119.9,24.3],[117,21.5],[112.5,17.5],[110.2,13.5],[108.8,9.5],[106,5],[104.9,2.3],[104.6,1.5],[104.3,1.3],[104,1.22],[103.75,1.17],[103.4,1.1],[102.15,1.95],[100.3,3.9],[98.6,5.2],[97.4,5.9],[95,6.3],[90,6.5],[84,6.2],[81.6,5.6],[80,5.6],[78.5,6.6],[76.9,7.8],[75.7,9.8],[75.4,11.2]];
var ZH_B=[[75.4,11.2],[73.2,14.5],[70,18.5],[66,22],[61.5,24.5],[58.8,25.2],[57,25.9],[56.6,26.55],[56.65,26.9]];
var ZH_C=[[75.4,11.2],[70,13.5],[62,14],[54.5,14.2],[48,12.4],[45.1,12.45],[43.9,12.3],[43.3,12.5],[43,13.2],[42.4,13.9],[41,16.5],[39.6,19.5],[38.95,21.4]];
var ZH_D=[[78.5,6.6],[73.3,7.6],[66,5],[57,3],[50,2.3],[45.6,1.75],[44.3,0.6],[42.8,-0.7],[41.3,-2.2],[40.35,-3.25]];
var P_M=[[-9.5,38.6],[-13,35.8],[-16.3,33.5],[-17.55,32.65]];
var P_A=[[-9.5,38.6],[-10,36],[-10,33.5],[-10.6,31],[-11.2,29.3],[-13.3,28.1],[-14.75,26.3],[-16.6,24],[-17.5,21.2],[-17.3,18.5],[-17.95,14.9]];
var P_B=[[-17.95,14.9],[-17.6,12.3],[-16.7,10.5],[-14.4,8.2],[-12,6.3],[-9.3,4.3],[-7.4,3.9],[-4,4.5],[-1.4,4.6],[2,4.6],[4.6,3.6],[6.3,2.4],[7.05,0.95],[7.6,-0.3],[8,-1.5],[9,-3.2],[10.9,-5.5],[11.8,-6.2],[12.4,-9.5],[12,-12.5],[11.3,-15.5],[11.2,-17.6],[12.4,-20.3],[13.5,-21.8]];
var DIAS=[[13.5,-21.8],[13.9,-25],[14.6,-28.5],[14.2,-32],[15.5,-36.8],[19.5,-38],[22.2,-36],[22.4,-34.5],[24.5,-34.6],[26.2,-34.25],[27.3,-33.8]];
var DIAS_R=[[27.3,-33.8],[25,-34.7],[21.5,-35.3],[19.5,-35.3],[18.3,-34.8],[17.2,-33],[15.5,-29]];
var COL1=[[-7,37],[-8.5,35.5],[-12,32.8],[-15.5,30],[-17.4,28.75],[-17.6,28.12],[-20,27.9],[-30,27.5],[-40,27],[-50,26.3],[-60,25.6],[-68,24.9],[-73,24.4],[-74.3,24.1]];
var COL1B=[[-74.3,24.1],[-73.5,23.6],[-73.32,22.8],[-73.5,22],[-74,21.5],[-74.7,21.1],[-75.6,21.4],[-74.8,20.85],[-74.1,20.6],[-73.5,20.35],[-72.5,20.35],[-72.15,20]];
var COL1R=[[-72.15,20],[-70.5,20.4],[-68.3,20.6],[-64,24],[-58,29.5],[-48,35],[-36,37.5],[-27,37.2],[-25.1,36.6],[-20,37.6],[-13,38.3],[-9.6,38.6],[-9.9,37.5],[-9.3,36.7],[-7,37]];
var COL2=[[-6.5,36.4],[-9,34],[-14.5,30.2],[-17.4,28.75],[-17.6,28.12],[-25,23],[-38,18],[-50,16.3],[-58,16.3],[-60.8,16.5]];
var COL3=[[-6.5,36.4],[-10,32],[-17.5,25],[-21.8,17.5],[-22.2,14.8],[-24,13.5],[-35,10.2],[-48,9],[-57,9.6],[-60.6,9.9]];
var COL4=[[-6.5,36.4],[-10,32],[-18.8,27.4],[-30,20],[-45,16],[-56,14.4],[-60.6,14.25],[-61.05,14.25],[-63,14.6],[-68,16.4],[-73,17],[-78,16.9],[-82,16.6],[-85.2,16.75],[-84,16.25],[-82.9,15.6],[-82.2,14],[-82.3,12],[-82.5,10.5],[-81.6,9.7],[-80.3,9.6],[-79.7,9.8]];
var GAMA=[[-9.5,38.6],[-11.5,35],[-14.5,31.5],[-19.3,28],[-21.5,22],[-21.6,17.5],[-22,15.8],[-23.3,14.5],[-20.5,10],[-18.5,6],[-19.5,1],[-24,-6],[-28.5,-14],[-30,-22],[-26,-29.5],[-14,-33],[0,-33],[10,-32.5],[16.9,-32.5],[17.2,-33.2],[17.6,-34.3],[18.6,-35.1],[20,-35.3],[22.3,-34.5],[25.5,-34.6],[28.6,-33.3],[31.6,-29.9],[33.6,-26.5],[36.2,-23.6],[37,-20],[39.6,-17.5],[40.6,-16.3],[41.1,-15.1],[41.3,-11],[40.7,-8],[40.2,-5],[39.95,-4.1],[40.35,-3.2],[42.6,-2.6],[46,0.5],[55,6],[65,8.5],[72,9.1],[75.2,10.3],[75.4,11.2]];
var CAB_A=[[-9.5,38.6],[-12,34.5],[-15,31],[-19.3,28],[-21.8,22],[-21.5,17.5],[-22.3,15],[-25,8],[-28.5,0],[-32,-8],[-35.5,-13.5],[-38.6,-16.5]];
var CAB_B=[[-38.6,-16.5],[-36,-22],[-28,-30],[-12,-36],[5,-38],[17,-37.3],[22,-36.3],[27,-35],[31.5,-31.5],[34.5,-27],[36.8,-23],[38,-19.5],[40.6,-16.3],[41.1,-15.1],[41.3,-11],[40.4,-9],[40.7,-7],[40.35,-3.2],[42.6,-2.6],[46,0.5],[55,6],[65,8.5],[72,9.1],[75.2,10.3],[75.4,11.2],[75.9,10]];
var VES_A=[[-9.5,38.6],[-12,34.5],[-15,31],[-19.3,28],[-19.5,22],[-18.2,16.5],[-17.95,14.75],[-20,9],[-25,2],[-30.5,-3],[-34.6,-5.2]];
var VES_B=[[-34.6,-5.2],[-34.3,-8.5],[-35.2,-10.5],[-36.6,-11.8],[-38.1,-13.3],[-38.4,-16.5],[-38.5,-19.5],[-40.2,-22],[-41.6,-23.4],[-43.1,-23.3]];
var VES_C=[[-43.1,-23.3],[-45.5,-25.3],[-47.4,-28.5],[-50,-32.5],[-53.5,-36.5],[-57.5,-41],[-61.5,-46],[-64.5,-50]];
var PATAG=[[-55,-37.2],[-58,-40.5],[-61.5,-43.5],[-64.3,-46.8],[-66.4,-48.6],[-67.3,-49.4]];
var MAG1=cat([[-6.6,36.6],[-9.5,34.3],[-13.5,31.5],[-16.5,30],[-18.6,29.3],[-19.2,27.5],[-20.5,22],[-21.2,16],[-19.5,9.5],[-21,4],[-26,-2.5],[-31.5,-8],[-35.5,-14],[-38.5,-19.5],[-40.5,-22.6],[-43,-23.35],[-45.5,-25.6],[-47.5,-28.5],[-50.5,-33],[-54,-36],[-55.6,-35.6],[-55,-37.2]],PATAG);
var STRAIT=[[-67.3,-49.4],[-68.1,-50.8],[-68.2,-52],[-68.3,-52.5],[-69,-52.52],[-69.6,-52.5],[-70,-52.62],[-70.35,-52.72],[-70.6,-53.1],[-70.75,-53.6],[-71.2,-53.98],[-72,-53.75],[-73,-53.3],[-73.9,-52.98],[-74.6,-52.7],[-75.4,-52.5]];
var MAG3=[[-75.4,-52.5],[-77.5,-49],[-78.5,-43],[-80,-36],[-85,-29],[-98,-22],[-118,-16.5],[-138.5,-14.3],[-152,-10.9],[-163,-2],[-172,6],[178,11.5],[168,13.2],[155,13.3],[145.25,13.3],[136,12.6],[128.5,11.2],[126.1,10.75]];
var MAG4=[[126.1,10.75],[125.42,10.4],[125.4,10],[125.35,9.75],[124.9,9.75],[124.68,10.12],[124.4,10.4],[124.12,10.42]];
var MAG5=[[124.12,10.42],[123.72,9.8],[123.9,9.3],[123.6,8.8],[121.5,8.6],[119.5,8.6],[118.2,8],[117.3,7.65],[116.3,7.3],[115,5.75],[114.9,5.25],[116.2,7.45],[117.4,7.7],[119.5,7.4],[121.5,7],[122.05,6.82],[123.5,6.4],[125,5.4],[125.7,5],[126.6,3.5],[126.8,1.6],[127.15,0.72]];
var ELC=[[127.15,0.72],[126.9,-0.9],[126.6,-2.75],[125.6,-3.4],[125.7,-5.2],[125.5,-7.2],[125.32,-8.3],[124.75,-8.7],[124,-8.95],[123,-9.9],[122.4,-10.6],[121,-12.2],[112,-17],[98,-24.5],[84,-33],[77.9,-37.4],[60,-39.5],[40,-39],[25,-37.2],[19,-35.6],[17.5,-34.5],[12,-27],[3,-14],[-7,-2],[-15,6],[-20.5,11.5],[-23.2,14.5],[-25.8,14.6],[-28.5,19],[-31,30],[-27.5,36.2],[-23.5,36.3],[-15,36.6],[-9.5,36.3],[-6.6,36.6]];
var CAR1=[[-2.1,48.85],[-3.5,49.2],[-5.6,48.95],[-10,49.2],[-20,49.8],[-35,49.8],[-46,49.3],[-52.4,48.95]];
var CAR1B=[[-52.4,48.95],[-52.8,49.9],[-54.2,50.6],[-55.05,51.75],[-55.9,51.8],[-56.4,51.58],[-56.85,51.38],[-57.4,51.25],[-58.6,50.4],[-59.7,48.9],[-60.4,47.95],[-61,48.15],[-62.4,48],[-63.3,47.05],[-63.9,47.5],[-63.9,48.2],[-63.9,48.7],[-63,48.9],[-61.4,49],[-61.3,49.5],[-62.5,49.95]];
var CAR2=[[-57.4,51.25],[-59.5,50.3],[-61.5,50],[-63.5,50],[-65.5,49.8],[-67,49.2],[-68.3,48.75],[-69.3,48.2],[-69.9,47.7],[-70.5,47.2],[-71,46.9],[-71.9,46.6],[-72.6,46.3],[-73.2,45.95],[-73.5,45.6]];
var MEN1=[[-77.4,-12.1],[-90,-13.5],[-110,-13.5],[-130,-13],[-140,-12.3],[-150,-10.9],[-158,-8.1],[-166,-7.6],[-172,-7.2],[-179,-6.8],[177.3,-6.7],[168,-6.2],[161.5,-6],[160.2,-7.5],[159.95,-7.7]];
var MEN2=[[-81.4,-5.3],[-95,-8],[-115,-10],[-130,-10.4],[-137.8,-10.25],[-139.6,-10.25],[-150,-10.9],[-166,-10.4],[-178,-10.2],[172,-10.5],[168,-10.75],[166.45,-10.75]];
var MEN2B=[[166.45,-10.75],[166.9,-9.3],[164,-4],[158,5],[150,11],[140,13],[127,13.2]];
var QUI=[[-77.4,-12.1],[-90,-17],[-110,-21.5],[-128,-24],[-136,-21],[-141.2,-17.8],[-150,-13.5],[-161.1,-9.6],[-172,-9.9],[178,-10.2],[170,-10.1],[167.6,-9.7],[167.75,-11.3],[167.2,-12.6],[167,-13.3],[166.98,-13.9],[166.9,-14.4],[166.85,-14.75],[166.9,-15]];
var TOR=[[166.85,-14.5],[166.3,-14.45],[166.1,-15.2],[165,-17],[163,-20.4],[160.5,-19],[157,-15],[155.2,-12.1],[154.3,-11.9],[152.5,-11.7],[151,-11.3],[150.2,-10.95],[148.3,-10.5],[146.8,-9.9],[145.6,-8.9],[144.2,-9.3],[143,-9.9],[142.6,-10.45],[141,-10.3],[139,-9.4],[137.2,-8.9],[135.2,-7.6],[133,-6.6],[131,-5.2],[130.6,-5]];
var SUNDA=[[106.8,-5.85],[106.2,-5.7],[105.95,-5.78],[105.67,-6.15],[104.95,-6.3],[104,-7.3]];
var TAS1=cat(SUNDA,[[104,-7.3],[98,-10.5],[85,-14],[70,-17.3],[62,-18.8],[58.1,-20.2]]);
var TAS2=[[58.1,-20.2],[58.5,-26],[62,-36],[72,-45.5],[88,-48.5],[105,-47.5],[125,-45],[138,-43.5],[144.5,-42.5]];
var TAS3=[[144.5,-42.5],[145.2,-43.7],[146.3,-44.1],[147.6,-43.95],[148.4,-43.4],[148.3,-42.85],[150,-42.6],[158,-42.4],[166,-42.3],[170.4,-42.35]];
var TAS4=[[170.4,-42.35],[171.2,-41.3],[172.2,-40.3],[173.3,-40.4],[173.4,-39.5],[173.9,-37.8],[173.6,-36.2],[172.3,-34.75],[172.45,-34.3],[172.9,-33.7],[176,-29],[-178.5,-24],[-175.75,-21.3],[-175.6,-20.6],[-175.15,-20.25],[-176.5,-18.5],[-178.6,-16.6],[-179.55,-16],[179.95,-15.45],[176,-13.5],[168,-8.5],[160.5,-4.6],[155.3,-2.9],[153.6,-2.2],[151,-0.8],[146.5,-0.6],[143.5,-0.6],[141.5,-2.1],[138,-0.9],[134.5,0.1],[131.2,0.9]];
var BOU1=[[-5.2,48.3],[-8.5,45.5],[-12,40],[-15.5,34.5],[-19.3,28.5],[-22,22],[-26.6,17.5],[-28.5,8],[-29.5,-2],[-33,-10],[-37.5,-19],[-44,-27],[-50.5,-33.3],[-54,-36],[-55.9,-35.4]];
var BOU_M=[[-55.9,-35.4],[-56,-40],[-57.2,-46],[-57.3,-51.4]];
var BOU2=cat([[-55.9,-35.4],[-55,-37.2]],PATAG);
var BOU3=[[-75.4,-52.5],[-79,-48],[-84,-40],[-92,-31],[-105,-24.5],[-122,-20.5],[-134,-18.9],[-139,-18.4],[-143.5,-17.9],[-146.5,-17.6],[-149,-17.5]];
var BOU4=[[-149,-17.5],[-149.2,-17.15],[-152,-15.9],[-160,-15.2],[-168.5,-14.85],[-171,-14.8],[-174,-14.8],[-178.1,-14.75],[176,-15],[171,-15],[168.8,-14.9],[168.2,-14.65],[167.7,-15.05],[167.45,-15.8],[167.2,-15.825],[166.95,-15.83],[164,-15.6],[156,-15.4],[149.5,-15.3],[149.3,-13.5],[151,-12.3],[153,-12],[154.9,-11.75],[155.6,-10],[155.9,-8.3],[156,-7.5],[156.28,-6.85],[156.4,-6.35],[156,-6],[155.5,-5.5],[154.95,-4.9],[154.3,-4.4],[153.3,-4.8]];
var BOU5=[[153.3,-4.8],[154.3,-3.6],[151,-0.9],[143.5,-0.6],[134.5,0.2],[129.6,0.5],[127.8,-2.7],[125.3,-4.5],[121,-7.2],[113.6,-6.4],[106.8,-5.8],[105.7,-6.1],[104.9,-6.3],[104,-7.3],[90,-12],[72,-17],[58.2,-20],[52,-26],[40,-33],[27,-36],[18.5,-35.3],[8,-20],[-8,-10],[-14.5,-7.7],[-20,5],[-26,18],[-28,30],[-24,38],[-14,45],[-6.5,48.9],[-2.1,48.85]];
var CK1A=[[-4.3,50.1],[-7,47.5],[-11,43],[-15,36],[-17.8,32.4],[-20,27.5],[-21.5,20],[-21.6,15],[-25.5,4],[-31,-8],[-37.5,-19],[-40.5,-22.8],[-41.8,-23.6],[-43,-23.6],[-48,-31],[-56,-41],[-62,-49.5],[-63.3,-54.4],[-66,-56.4],[-72,-57.2],[-82,-54],[-95,-45],[-115,-33],[-130,-22],[-138.8,-19.3],[-143,-18.6],[-149.4,-17.25]];
var CK1B=[[-149.4,-17.25],[-150.6,-17.2],[-151.8,-18.5],[-152.25,-22.5],[-150.5,-28],[-149,-33],[-152,-39.5],[-165,-39.5],[-178,-39],[178.7,-38.8],[179,-37.5],[177,-36.9],[176.1,-36],[175.2,-35.4],[173.6,-34],[171.7,-33.9],[171.9,-35.2],[172.8,-36.5],[173.5,-38.5],[173.3,-39.6],[174.55,-40.75],[174.5,-41.2],[174.75,-41.6],[174.5,-42.3],[173.5,-43.95],[172,-45.2],[171,-46.6],[169,-47.6],[167,-47.4],[166,-46],[166.2,-45.2],[167.5,-44.3],[169.2,-43.4],[171,-41.7],[172.1,-40.3],[168,-39.3],[158,-38.3],[150.7,-37.8],[150.75,-36],[151.5,-34],[153.3,-31],[153.95,-28],[153.8,-25],[152.6,-22.8],[150.6,-21.2],[149.6,-19.9],[147.3,-18.6],[146.5,-17.3],[145.75,-16.2],[145.5,-15.35],[145.8,-14.9],[145.2,-14],[144.6,-13.6],[143.9,-12.6],[143.5,-11.4],[142.95,-10.5],[142.5,-10.35],[141.8,-10.4],[141,-10.7],[136,-9.6],[130,-10],[126,-10.2],[123,-11.3],[121.9,-10.85],[118,-10.7],[114,-9.6],[108,-8.4],[105.4,-7.2],[104.9,-6.55],[105.67,-6.15],[105.95,-5.78],[106.3,-5.75],[106.8,-5.85]];
var CK2=[[18.2,-34.6],[18,-40],[25,-52],[33,-60],[39.5,-66.8],[55,-63],[80,-60],[110,-60],[140,-58],[158,-52],[165.3,-46.4],[166.1,-45.6],[165.8,-46.3],[167,-47.5],[170,-48.5],[-178,-55],[-150,-64],[-125,-67],[-107,-71.1],[-101,-62],[-100,-48],[-104,-36],[-109.1,-27.6],[-118,-20],[-130,-13],[-138.6,-10.2],[-142,-13.5],[-145.6,-15.6],[-149.4,-17.25],[-152.3,-15.9],[-160,-18.6],[-169.5,-18.5],[-175,-20.1],[-178,-20.4],[179,-20.3],[175,-19],[170.5,-16.3],[168.9,-15.3],[168.65,-16],[168.9,-16.9],[169,-17.8],[169.75,-18.8],[169.95,-19.3],[169.6,-19.9],[168.5,-20],[166.6,-19.95],[164.6,-20.1],[165.6,-20.6],[166.8,-21.5],[167.9,-22.3],[168,-23],[168.2,-28.8],[171.5,-36],[173.3,-39.6],[174.55,-40.75],[174.5,-41.2],[174.75,-41.6],[178,-45],[-160,-54],[-120,-55.5],[-90,-54.5],[-76,-56],[-67,-56.7]];
var CK3=[[-149.4,-17.25],[-150.2,-16.8],[-151,-10.7],[-153.5,-5],[-157,2.2],[-158.5,12],[-159.75,21.7],[-160.5,21.6],[-161,23],[-155,31],[-140,41],[-128,45.2],[-124.6,44.8],[-125.6,47],[-127.3,49.4],[-129.3,50.4],[-132.3,52.4],[-134.2,54.3],[-136.5,56.5],[-138.5,58.3],[-142,59.5],[-145.3,59.3],[-147.5,59],[-150,57.3],[-152.2,56.3],[-155.5,55.2],[-158.5,54.3],[-161,53.9],[-164,53.7],[-165.15,54.33],[-166.2,55.3],[-168.3,58.5],[-168.2,60.5],[-167.3,62.3],[-167.6,64.2],[-167.6,65],[-168.45,65.7],[-168,67.2],[-167.6,68.6],[-165,69.7],[-162.5,70.7]];
var CK3R=[[-162.5,70.7],[-168,68],[-168.45,65.7],[-167.6,64.5],[-167.5,61.5],[-167.5,57],[-165.15,54.33],[-163,50],[-158,35],[-155,24],[-154.5,20.2],[-154.4,19.3],[-155.6,18.6],[-156.2,19.45]];
var LP1=[[-5.2,48.3],[-9,45],[-13,40],[-16,35],[-17.9,32.3],[-19.5,28],[-22,26],[-26.5,18],[-28.5,6],[-31,-5],[-35,-14],[-40,-22],[-45,-26],[-48.1,-27.7],[-49.5,-33],[-55,-40],[-60.5,-47.5],[-63.3,-54.4],[-66,-56.6],[-73,-57],[-78.5,-52],[-78,-44],[-75,-38.5],[-73.7,-36.75]];
var LP2=[[-73.7,-36.75],[-80,-34.5],[-95,-30.5],[-109.15,-27.45],[-112,-22],[-125,-8],[-140,7],[-150,16],[-154.3,20.6],[-155.7,20.47],[-156.4,20.5],[-156.9,20.3],[-158.6,21],[-159,23],[-156,35],[-147,48],[-139.5,57],[-137.9,58.5]];
var LP3=[[-137.9,58.5],[-137.3,57],[-135.8,55.3],[-134.3,53.5],[-131.5,51],[-128.5,47.5],[-126,43],[-124.8,39.5],[-123.4,37.5],[-122.3,36.7]];
var LP4=[[-122.3,36.7],[-130,33],[-145,28.5],[-160,25],[-175,22.5],[170,20.8],[155,20.5],[146,21.2],[135,21.3],[125,21.3],[122,21.55],[120.5,21.5],[118,21.5],[114.5,21.6],[113.9,21.6]];
var LP5=[[113.9,21.6],[116,19.5],[118.8,16.5],[119.9,14.6],[120.35,14.25]];
var LP6=[[120.35,14.25],[119.6,16.3],[119.9,19],[120.4,20.7],[122.4,22.5],[122.5,24.5],[123.7,27],[125,30.5],[126.6,32.5],[128.3,33.3],[129.85,34.35],[131,36.2],[133.5,39.5],[136.2,42.5],[137.3,44.8],[139.6,47.3],[141.3,49.8],[141.1,51.4]];
var LP7=[[141.1,51.4],[141.5,49.5],[141.5,47.3],[141.6,46.3],[142,45.72],[143,45.6],[146,46.2],[149,46.75],[151.25,46.55],[153.5,47],[156.5,49.2],[158.6,51.2],[159.4,52.5],[158.9,52.85]];
var LP8=[[158.9,52.85],[161,48],[165,36],[170,22],[176,8],[-178,-3],[-172.5,-11],[-170.3,-14],[-170.9,-14.1],[-171.6,-14.45],[-172.9,-14.3],[-173.5,-15.6],[-174.6,-18.2],[-175.3,-18.8],[-175.9,-21],[-178,-25],[172,-28.3],[168.3,-28.8],[160,-30.5],[153,-33.6],[151.4,-34]];
var LP9=[[151.4,-34],[156,-30],[160.5,-25],[162.6,-21.8],[162.2,-18.3],[164.5,-14],[165.8,-12.3],[166.65,-11.85]];

var CH=[

/* 1 --------------------------------------------------------------- */
{short:'Pourquoi partir ?',col:'epi',dur:52,when:[1400,1460],dates:'1400 – 1460',
 cam:[{t:0,lon:45,lat:28,z:0.85},{t:14,lon:62,lat:24,z:0.8},{t:27,lon:28,lat:39,z:1.6},{t:36,lon:28,lat:39,z:1.6},{t:41,lon:8,lat:40,z:1.45},{t:52,lon:8,lat:40,z:1.45}],
 zones:[Rg(EUROPE,'eur',1,0.3,2),Rg(OTTOMAN,'ott',27,0.6,2)],
 routes:[
  r('epi',6,15,3,[[127.4,0.8],[118,-5],[108,-4.5],[104.5,1.2],[100,4.5],[95,6.3],[86,6],[80.5,5.5],[76,10],[75.5,11.3]]),
  r('epi',12,21,3,[[75.5,11.3],[66,14],[55,13.5],[47,12.3],[43.4,12.6],[40,18],[35.5,25.5],[32.6,29.9],[30,31.2]]),
  r('epi',19,25,3,[[30,31.4],[26,34.5],[20,36.5],[18.5,40],[15,43.5],[12.6,45.3]]),
  r('sand',8,24,2.6,[[108.9,34.3],[103.8,36],[94.7,40.1],[80,41],[67,39.7],[59,37.5],[51.4,35.7],[44.4,33.3],[38,36.5],[33,39],[29.2,41]],{dash:true})
 ],
 labels:[
  L(1,10,49,'Europe',{nomark:true,big:true,end:26}),
  L(6,127.4,0.8,'Moluques',{sub:'îles aux épices',dx:-10,dy:14,al:'right'}),
  L(8,110,32,'Chine',{sub:'soie, porcelaine',nomark:true,dy:-14}),
  L(14,75.8,11.25,'Calicut',{sub:'poivre',dx:10,dy:10,al:'left'}),
  L(20,29.9,31.2,'Alexandrie',{dx:-8,dy:12,al:'right'}),
  L(24,12.3,45.4,'Venise',{dx:-10,dy:-8,al:'right',gold:true}),
  L(27,28.97,41,'Constantinople',{sub:'prise en 1453',dx:10,dy:-12,al:'left',gold:true}),
  L(29,35,38.8,'Empire ottoman',{nomark:true,big:true}),
  L(41,-9.1,38.7,'Lisbonne',{dx:-10,al:'right',gold:true}),
  L(42,-6,37.4,'Séville',{dx:10,dy:8,al:'left',gold:true})
 ],
 pulses:[Pu(27,28.97,41,'#c084fc'),Pu(41,-9.1,38.7,'#ffd166',true)],
 ph:[
  Ph(0,'Vers 1400','Les Européens connaissent l’Europe, le nord de l’Afrique et une partie de l’Asie. Ils ignorent l’Amérique et le Pacifique. À cette époque, chaque peuple connaît surtout sa propre région du monde.','eur'),
  Ph(6,'Les épices et la soie','Le poivre, la cannelle, les clous de girofle et la soie viennent d’Asie. Ils passent de marchand en marchand, par la mer et par les caravanes. À Venise, ils valent une fortune.','epi'),
  Ph(26,'1453 : Constantinople','Les Ottomans prennent Constantinople. Ils contrôlent désormais les routes vers l’Asie. Les marchandises coûtent encore plus cher.','ott'),
  Ph(37,'Chercher une autre route','Le Portugal et l’Espagne veulent atteindre l’Asie par la mer, sans intermédiaires. Ils ont de nouveaux outils : la caravelle, la boussole, l’astrolabe et de meilleures cartes.','por'),
  Ph(46,'Trois raisons de partir','L’or et les épices, la volonté de répandre la religion chrétienne, et la curiosité pour un monde encore inconnu.','esp')
 ],
 photos:[Sh('framauro',1,6,'bl',-2,'contain'),Sh('epices',7,14,'tl',-2),Sh('constantinople',28,36,'bl',-2,'contain'),Sh('caravelle',38,45,'tr',2,'contain'),Sh('astrolabe',46,52,'tr',2,'contain')],
 legend:[['epi','Route maritime des épices'],['sand','Routes de la soie (caravanes)',true],['ott','Empire ottoman']],
 mots:[['Épices','Plantes parfumées venues d’Asie (poivre, cannelle, girofle), très chères en Europe.'],['Caravelle','Navire léger à voiles, capable de remonter contre le vent.'],['Astrolabe','Instrument qui mesure la hauteur du Soleil ou d’une étoile, pour connaître sa latitude.'],['Portulan','Carte marine du Moyen Âge, qui montre les côtes et les ports.']],
 q:[['Pourquoi les épices coûtent-elles si cher en Europe ?','Elles viennent de très loin et passent par beaucoup d’intermédiaires.'],['Que change la prise de Constantinople en 1453 ?','Les Ottomans contrôlent les routes vers l’Asie : les Européens cherchent un autre chemin, par la mer.'],['Cite deux outils qui aident les navigateurs.','La caravelle, la boussole, l’astrolabe, le portulan.']],
 wiki:['Grandes découvertes','Route des épices','Chute de Constantinople','Caravelle']},

/* 2 --------------------------------------------------------------- */
{short:'Zheng He',col:'zh',dur:52,when:[1405,1433],dates:'1405 – 1433',
 cam:[{t:0,lon:117,lat:25,z:1.6},{t:10,lon:108,lat:12,z:1.3},{t:22,lon:88,lat:8,z:1.1},{t:34,lon:68,lat:10,z:0.9},{t:52,lon:78,lat:12,z:0.85}],
 zones:[],
 routes:[
  r('zh',3,24,3.4,ZH_A,S),
  r('zh',25,32,3,ZH_B,S),
  r('zh',27,37,3,ZH_C,S),
  r('zh',31,41,3,ZH_D,S)
 ],
 labels:[
  L(1,118.8,32.05,'Nankin',{sub:'capitale des Ming',dx:-10,al:'right',gold:true}),
  L(9,109.2,13.8,'Champa',{dx:-10,al:'right'}),
  L(15,102.25,2.2,'Malacca',{dx:8,dy:-10,al:'left'}),
  L(21,80.7,7.6,'Ceylan',{nomark:true,dy:-2}),
  L(24,75.8,11.25,'Calicut',{dx:10,dy:-8,al:'left'}),
  L(32,56.4,27,'Ormuz',{dy:-12}),
  L(34,45,12.8,'Aden',{dx:-6,dy:-12,al:'right'}),
  L(37,39.8,21.4,'La Mecque',{dx:10,al:'left'}),
  L(38,45.3,2.05,'Mogadiscio',{dx:-10,al:'right'}),
  L(41,40.1,-3.2,'Malindi',{sub:'une girafe pour l’empereur',dx:-10,dy:6,al:'right'})
 ],
 pulses:[Pu(1,118.8,32.05,'#ff8a8a'),Pu(24,75.8,11.25,'#ff8a8a'),Pu(41,40.1,-3.2,'#ff8a8a')],
 ph:[
  Ph(0,'1405 : la flotte des trésors','Bien avant les Européens, l’empereur de Chine Yongle envoie une flotte immense sur l’océan Indien. Son amiral s’appelle Zheng He.','zh'),
  Ph(8,'Des navires géants','Sept expéditions, de 1405 à 1433. Jusqu’à 300 navires et 27 000 hommes à chaque voyage. Les plus grandes jonques sont bien plus longues que les caravelles.','zh'),
  Ph(20,'De port en port','Champa, Malacca, Ceylan, Calicut : la flotte montre la puissance de la Chine, échange des cadeaux et ramène des ambassadeurs.','zh'),
  Ph(30,'Jusqu’en Arabie et en Afrique','Les navires atteignent Ormuz, Aden, La Mecque et la côte est de l’Afrique. Ils en rapportent une girafe pour l’empereur.','zh'),
  Ph(43,'1433 : la Chine s’arrête','Après le dernier voyage, la Chine arrête ces expéditions, jugées trop chères. Soixante ans plus tard, les Portugais arriveront dans le même océan.','zh')
 ],
 photos:[Sh('zhenghe',9,18,'bl',-2),Sh('girafe',42,51,'tr',2,'contain')],
 legend:[['zh','Voyages de Zheng He (1405–1433)']],
 mots:[['Jonque','Grand navire chinois à voiles.'],['Amiral','Chef d’une flotte de navires.'],['Ambassadeur','Personne envoyée par un souverain auprès d’un autre souverain.']],
 q:[['Qui explore l’océan Indien avant les Portugais ?','L’amiral chinois Zheng He, de 1405 à 1433.'],['Jusqu’où vont ses navires ?','Jusqu’en Arabie et sur la côte est de l’Afrique.'],['Pourquoi les voyages chinois s’arrêtent-ils ?','L’empire les juge trop chers et choisit de se replier.']],
 wiki:['Zheng He']},

/* 3 --------------------------------------------------------------- */
{short:'Les Portugais et Bartolomeu Dias',col:'por',dur:56,when:[1415,1488],dates:'1415 – 1488',
 cam:[{t:0,lon:-12,lat:33,z:2.0},{t:10,lon:-14,lat:22,z:1.5},{t:24,lon:0,lat:4,z:1.1},{t:36,lon:16,lat:-26,z:1.5},{t:46,lon:20,lat:-33,z:2.4},{t:52,lon:5,lat:2,z:0.75},{t:56,lon:5,lat:2,z:0.75}],
 zones:[],
 routes:[
  r('por',2,7,2.6,P_M,S),
  r('por',4,14,3.2,P_A,S),
  r('por',14,29,3.2,P_B,S),
  r('por',30,42,3.4,DIAS,S),
  r('kan',45,50,3,DIAS_R,S)
 ],
 labels:[
  L(1,-9.1,38.7,'Lisbonne',{dx:10,al:'left',gold:true}),
  L(6,-16.9,32.7,'Madère',{sub:'1420',dx:-10,al:'right'}),
  L(8,-27,38.5,'Açores',{sub:'1427',dy:-14}),
  L(10,-14.42,26.13,'Cap Bojador',{sub:'1434',dx:10,al:'left'}),
  L(14,-17.5,14.7,'Cap-Vert',{sub:'1444',dx:10,al:'left'}),
  L(21,-1.35,5.08,'Elmina',{sub:'1482 : comptoir de l’or',dy:-18}),
  L(26,12.3,-6.07,'Fleuve Congo',{sub:'1482',dx:10,al:'left'}),
  L(29,13.95,-21.77,'Cap Cross',{sub:'1486',dx:10,al:'left'}),
  L(40,22.15,-34.18,'Mossel Bay',{sub:'février 1488',dy:-18,zmin:1.3}),
  L(42,27.1,-33.5,'Fin du voyage',{sub:'mars 1488',dx:10,dy:-8,al:'left',zmin:1.3}),
  L(47,18.47,-34.36,'Cap de Bonne-Espérance',{sub:'1488',dx:-10,dy:10,al:'right',gold:true})
 ],
 pulses:[Pu(10,-14.42,26.13,'#4ade80'),Pu(21,-1.35,5.08,'#ffd166'),Pu(47,18.47,-34.36,'#ffd166',true)],
 ph:[
  Ph(0,'1415 – 1460 : Henri le Navigateur','Le prince Henri du Portugal envoie chaque année des navires un peu plus loin le long de l’Afrique. Madère, les Açores, puis le cap Bojador, que les marins croyaient infranchissable.','por'),
  Ph(12,'1444 – 1486 : toujours plus au sud','Cap-Vert, golfe de Guinée, fleuve Congo. Les Portugais bâtissent des comptoirs. Ils rapportent de l’or… et des hommes et des femmes réduits en esclavage.','por'),
  Ph(29,'1487 : Bartolomeu Dias','Dias part de Lisbonne avec trois navires. Au sud de l’Afrique, une tempête le pousse au large pendant treize jours.','por'),
  Ph(37,'1488 : le cap est passé','Quand il retrouve la côte, elle file vers l’est : il a contourné l’Afrique sans le voir ! Son équipage, épuisé, refuse d’aller plus loin.','por'),
  Ph(45,'Le cap de Bonne-Espérance','Au retour, Dias découvre le grand cap. Selon la tradition, il le nomme « cap des Tempêtes », et le roi Jean II préfère « Bonne-Espérance » : la route de l’Inde est ouverte.','kan')
 ],
 photos:[Sh('sagres',1,9,'tr',2,'contain'),Sh('caravelle',15,23,'tr',2,'contain'),Sh('padrao',38,45,'tl',-2)],
 legend:[['por','Navigateurs portugais (1415–1488)'],['kan','Retour de Dias (1488)']],
 mots:[['Comptoir','Port fortifié où des marchands étrangers font du commerce.'],['Cap','Pointe de terre qui avance dans la mer.'],['Esclave','Personne privée de liberté, achetée et vendue comme une marchandise.']],
 q:[['Quel prince organise les premières expéditions portugaises ?','Henri le Navigateur.'],['Que réussit Bartolomeu Dias en 1488 ?','Il contourne l’Afrique par le sud : il passe le cap de Bonne-Espérance.'],['Pourquoi ce cap est-il si important ?','Il prouve qu’on peut passer de l’océan Atlantique à l’océan Indien : la route maritime de l’Inde est ouverte.']],
 wiki:['Henri le Navigateur','Bartolomeu Dias','Cap de Bonne-Espérance']},

/* 4 --------------------------------------------------------------- */
{short:'Christophe Colomb',col:'esp',dur:64,when:[1492,1504],dates:'1492 – 1504',
 cam:[{t:0,lon:-12,lat:34,z:1.9},{t:8,lon:-30,lat:30,z:1.0},{t:20,lon:-62,lat:26,z:1.3},{t:27,lon:-74,lat:21.8,z:3.6},{t:38,lon:-73,lat:21.5,z:3.6},{t:46,lon:-45,lat:28,z:0.85},{t:52,lon:-48,lat:22,z:0.8},{t:64,lon:-48,lat:22,z:0.8}],
 zones:[],
 routes:[
  r('esp',3,24,3.4,COL1,S),
  r('esp',25,37,3,COL1B,SS),
  r('esp',38,47,2.8,COL1R,{ship:true,dash:true}),
  r('kan',49,56,2.2,COL2,{ship:true,dash:true,thin:true}),
  r('kan',51,58,2.2,COL3,{ship:true,dash:true,thin:true}),
  r('kan',53,61,2.2,COL4,{ship:true,dash:true,thin:true})
 ],
 labels:[
  L(1,-6.9,37.2,'Palos',{sub:'3 août 1492',dx:10,al:'left',gold:true}),
  L(7,-15.6,28,'Canaries',{nomark:true,dx:14,dy:10,al:'left',end:48}),
  L(22,-74.5,24.05,'Guanahani',{sub:'12 octobre 1492',dx:10,dy:-12,al:'left',gold:true}),
  L(29,-78.5,21.8,'Cuba',{nomark:true,zmin:2}),
  L(33,-70.5,17.9,'Hispaniola',{nomark:true,dy:14,zmin:2}),
  L(35,-72.2,19.76,'La Navidad',{sub:'Noël 1492',mark:'site',dx:8,dy:14,al:'left',zmin:2}),
  L(43,-25.1,36.97,'Açores',{dy:-14,end:50}),
  L(54,-61.5,16.2,'Guadeloupe',{sub:'1493',dx:10,dy:-10,al:'left',zmax:2}),
  L(56,-61.2,10.4,'Trinité',{sub:'1498',dx:10,dy:8,al:'left',zmax:2}),
  L(59,-79.6,9.4,'Panama',{sub:'1503',dx:-8,dy:14,al:'right',zmax:2}),
  L(52,-74.5,24.05,'Bahamas',{sub:'1492',dx:-10,dy:-10,al:'right',zmax:2,nomark:true})
 ],
 pulses:[Pu(22,-74.5,24.05,'#ffd166',true)],
 ph:[
  Ph(0,'3 août 1492','Le Génois Christophe Colomb part de Palos, en Espagne, avec trois navires : la Santa María, la Pinta et la Niña. Les rois d’Espagne, Isabelle et Ferdinand, paient le voyage.','esp'),
  Ph(8,'Atteindre l’Asie par l’ouest','Colomb sait que la Terre est ronde, comme tous les savants de son temps. Mais il la croit bien plus petite. Il pense atteindre le Japon et la Chine en quelques semaines.','esp'),
  Ph(18,'12 octobre 1492','Après 36 jours de mer depuis les Canaries, une île apparaît : Guanahani, aux Bahamas. Colomb l’appelle San Salvador. Il se croit en Asie et nomme les habitants « Indiens ».','esp'),
  Ph(28,'Cuba et Hispaniola','Il explore Cuba, puis Hispaniola (Haïti). La Santa María s’échoue à Noël. Avec son bois, 39 marins bâtissent un fort : La Navidad.','esp'),
  Ph(38,'Mars 1493 : le retour','Colomb rentre par les Açores et Lisbonne. Il rapporte de l’or, des perroquets et des habitants des îles, les Taïnos, emmenés de force.','esp'),
  Ph(48,'Quatre voyages, 1492 – 1504','Colomb retourne trois fois en Amérique : Petites Antilles, Venezuela, Amérique centrale. Il meurt en 1506 sans savoir qu’il a atteint un continent inconnu des Européens.','kan'),
  Ph(57,'Pour les Taïnos, une catastrophe','Travail forcé, violences et maladies venues d’Europe : en quelques dizaines d’années, les Taïnos disparaissent presque tous.','ame')
 ],
 photos:[Sh('colomb',1,8,'tr',2,'contain'),Sh('santamaria',9,17,'bl',-2),Sh('landing',19,26,'bl',-2),Sh('lacosa',49,57,'bl',-2,'contain')],
 legend:[['esp','1er voyage (1492–1493)'],['kan','2e, 3e et 4e voyages (1493–1504)',true]],
 mots:[['Taïnos','Habitants des Grandes Antilles à l’arrivée de Colomb.'],['« Indiens »','Nom donné par erreur aux habitants de l’Amérique : Colomb se croyait en Inde.'],['Nouveau Monde','Nom donné par les Européens à l’Amérique, qu’ils ne connaissaient pas.']],
 q:[['Que cherche Christophe Colomb en partant vers l’ouest ?','Une route maritime vers l’Asie (Japon, Chine, Inde) et ses richesses.'],['Où arrive-t-il le 12 octobre 1492 ?','Sur une île des Bahamas, Guanahani, qu’il appelle San Salvador.'],['Peut-on dire que Colomb a « découvert » l’Amérique ?','Des millions de personnes y vivaient déjà. C’est une découverte pour les Européens seulement, et une catastrophe pour les Taïnos.']],
 wiki:['Christophe Colomb','Premier voyage de Christophe Colomb','Taïnos']},

/* 5 --------------------------------------------------------------- */
{short:'Vasco de Gama',col:'por',dur:58,when:[1497,1499],dates:'1497 – 1499',
 cam:[{t:0,lon:-12,lat:32,z:1.6},{t:10,lon:-18,lat:5,z:0.95},{t:22,lon:0,lat:-25,z:0.95},{t:32,lon:30,lat:-25,z:1.4},{t:42,lon:55,lat:0,z:1.1},{t:50,lon:35,lat:5,z:0.6},{t:58,lon:35,lat:5,z:0.6}],
 zones:[],
 routes:[r('por',2,46,3.4,GAMA,S)],
 labels:[
  L(1,-9.1,38.7,'Lisbonne',{sub:'8 juillet 1497',dx:10,al:'left',gold:true}),
  L(9,-23.6,15,'Cap-Vert',{dx:-10,al:'right'}),
  L(26,18,-32.7,'Baie de Sainte-Hélène',{sub:'novembre 1497',dx:-10,dy:-10,al:'right',end:40}),
  L(28,18.47,-34.36,'Cap de Bonne-Espérance',{dx:-8,dy:14,al:'right'}),
  L(31,31,-29.9,'Natal',{sub:'Noël 1497',dx:10,al:'left'}),
  L(35,40.7,-15,'Mozambique',{dx:10,al:'left'}),
  L(38,40.12,-3.22,'Malindi',{sub:'un pilote pour l’Inde',dx:-10,al:'right'}),
  L(46,75.8,11.25,'Calicut',{sub:'20 mai 1498',dx:-10,dy:-10,al:'right',gold:true})
 ],
 pulses:[Pu(28,18.47,-34.36,'#4ade80'),Pu(46,75.8,11.25,'#ffd166',true)],
 ph:[
  Ph(0,'8 juillet 1497','Vasco de Gama quitte Lisbonne avec quatre navires et environ 170 hommes. Sa mission : atteindre l’Inde en contournant l’Afrique.','por'),
  Ph(8,'Le grand détour par le large','Pour trouver de bons vents, il s’éloigne de l’Afrique et fait une immense boucle dans l’Atlantique : trois mois sans voir la terre.','por'),
  Ph(23,'Novembre 1497 – avril 1498','Il passe le cap de Bonne-Espérance, puis remonte la côte est de l’Afrique. Il y découvre de riches villes marchandes : Mozambique, Mombasa, Malindi.','por'),
  Ph(37,'Un pilote de l’océan Indien','À Malindi, un pilote qui connaît la mousson guide la flotte. En 23 jours, elle traverse l’océan Indien.','por'),
  Ph(45,'20 mai 1498 : Calicut','Les Portugais arrivent en Inde, au pays du poivre. La route maritime des épices est ouverte. Mais seuls deux navires et une cinquantaine d’hommes rentrent à Lisbonne, en 1499.','kan')
 ],
 photos:[Sh('gama',1,8,'tr',2,'contain'),Sh('calicut',46,55,'bl',-2)],
 legend:[['por','Vasco de Gama (1497–1498)']],
 mots:[['Mousson','Vent de l’océan Indien qui change de sens selon la saison.'],['Pilote','Marin qui connaît la route et guide le navire.']],
 q:[['Quelle route Vasco de Gama ouvre-t-il ?','La route maritime de l’Europe à l’Inde, par le sud de l’Afrique.'],['Qui l’aide à traverser l’océan Indien ?','Un pilote embarqué à Malindi, qui connaît les vents de mousson.'],['Pourquoi dit-on que le voyage a coûté cher en vies ?','Sur environ 170 hommes, une cinquantaine seulement rentrent au Portugal.']],
 wiki:['Vasco de Gama','Route des Indes']},

/* 6 --------------------------------------------------------------- */
{short:'Cabral et le partage du monde',col:'por',dur:52,when:[1494,1501],dates:'1494 – 1501',
 cam:[{t:0,lon:-32,lat:14,z:0.7},{t:12,lon:-30,lat:8,z:0.8},{t:23,lon:-32,lat:-8,z:1.4},{t:32,lon:-28,lat:-12,z:1.2},{t:42,lon:25,lat:-12,z:0.7},{t:52,lon:18,lat:-6,z:0.56}],
 zones:[
  {k:'mer',lon:-46.6,lat0:-58,lat1:62,col:'eur',a:0.9,t0:3,fade:2},
  Rg(BRESIL_E,'por',25,0.6,2)
 ],
 routes:[r('por',13,26,3.4,CAB_A,S),r('por',32,48,3.2,CAB_B,S)],
 labels:[
  L(4,-46.6,-44,'Ligne de Tordesillas (1494)',{nomark:true,dx:8,al:'left'}),
  L(6,-70,22,'À l’Espagne',{nomark:true,big:true,end:24}),
  L(7,-24,12,'Au Portugal',{nomark:true,big:true,end:24}),
  L(13,-9.1,38.7,'Lisbonne',{sub:'9 mars 1500',dx:10,al:'left',gold:true}),
  L(26,-39.06,-16.45,'Porto Seguro',{sub:'22 avril 1500',dx:-10,al:'right',gold:true}),
  L(27,-52,-8,'Brésil',{nomark:true,big:true}),
  L(38,18.47,-34.36,'Tempête',{sub:'4 navires perdus',dx:-8,dy:16,al:'right'}),
  L(47,75.8,11.25,'Calicut',{dx:-10,dy:-8,al:'right'}),
  L(48.5,76.24,9.96,'Cochin',{dx:10,dy:8,al:'left'})
 ],
 pulses:[Pu(26,-39.06,-16.45,'#ffd166',true)],
 ph:[
  Ph(0,'1494 : le traité de Tordesillas','Avec l’accord du pape, l’Espagne et le Portugal se partagent le monde à découvrir. Une ligne imaginaire traverse l’Atlantique : l’ouest pour l’Espagne, l’est pour le Portugal.','eur'),
  Ph(12,'Mars 1500 : Pedro Álvares Cabral','Treize navires partent pour l’Inde sur la route de Vasco de Gama. Pour trouver les vents, la flotte s’écarte très loin vers l’ouest.','por'),
  Ph(23,'22 avril 1500 : le Brésil','Cabral aperçoit une terre inconnue. Elle est à l’est de la ligne : il en prend possession pour le Portugal. Voilà pourquoi on parle portugais au Brésil.','por'),
  Ph(32,'Vers l’Inde','La flotte repart. Une tempête coule quatre navires près du cap de Bonne-Espérance : Bartolomeu Dias y meurt. Cabral atteint Calicut, puis Cochin, et rentre chargé d’épices en 1501.','por'),
  Ph(46,'Et les autres peuples ?','Personne n’a demandé leur avis aux habitants de ces terres. La France et l’Angleterre refusent aussi ce partage.','kan')
 ],
 photos:[Sh('tordesillas',2,10,'tr',2,'contain'),Sh('cantino',13,21,'bl',-2,'contain'),Sh('cabral',24,31,'tr',2)],
 legend:[['por','Cabral (1500–1501)'],['eur','Ligne de Tordesillas (1494)',true]],
 mots:[['Traité','Accord écrit entre des États.'],['Prendre possession','Déclarer qu’une terre appartient désormais à son roi.'],['Colonie','Territoire dominé et exploité par un pays étranger.']],
 q:[['Que décide le traité de Tordesillas ?','Le partage des terres à découvrir entre l’Espagne (à l’ouest de la ligne) et le Portugal (à l’est).'],['Pourquoi parle-t-on portugais au Brésil ?','La côte du Brésil se trouve à l’est de la ligne : Cabral en prend possession pour le Portugal en 1500.'],['Qui n’a pas été consulté ?','Les habitants de ces terres, ni les autres royaumes d’Europe.']],
 wiki:['Traité de Tordesillas','Pedro Álvares Cabral']},

/* 7 --------------------------------------------------------------- */
{short:'Amerigo Vespucci',col:'por',dur:46,when:[1501,1507],dates:'1501 – 1507',
 cam:[{t:0,lon:-20,lat:22,z:0.95},{t:10,lon:-30,lat:0,z:1.1},{t:22,lon:-42,lat:-17,z:1.7},{t:31,lon:-52,lat:-32,z:1.2},{t:38,lon:-35,lat:10,z:0.7},{t:46,lon:-35,lat:10,z:0.7}],
 zones:[],
 routes:[r('por',2,14,3.2,VES_A,S),r('por',14,26,3.2,VES_B,S),r('por',26,33,2.8,VES_C,{ship:true,dash:true})],
 labels:[
  L(1,-9.1,38.7,'Lisbonne',{sub:'mai 1501',dx:10,al:'left',gold:true}),
  L(14,-35.3,-5.5,'Cap São Roque',{sub:'août 1501',dx:-10,al:'right'}),
  L(19,-38.5,-13,'Baie de Tous-les-Saints',{sub:'1er novembre',dx:-10,al:'right',zmin:1}),
  L(26,-43.2,-22.9,'Rio de Janeiro',{sub:'1er janvier 1502',dx:-10,al:'right',gold:true}),
  L(32,-64.5,-50,'Jusqu’où ?',{sub:'peut-être la Patagonie',nomark:true,dx:12,al:'left'}),
  L(39,6.95,48.28,'Saint-Dié',{sub:'1507 : « America »',dx:10,dy:-8,al:'left',gold:true})
 ],
 pulses:[Pu(39,6.95,48.28,'#ffd166',true)],
 ph:[
  Ph(0,'1501 : un Florentin au service du Portugal','Amerigo Vespucci embarque sur une flotte portugaise chargée d’explorer la terre trouvée par Cabral.','por'),
  Ph(10,'Une côte sans fin','Pendant des mois, les navires longent la côte vers le sud. On nomme les lieux d’après le calendrier : baie de Tous-les-Saints le 1er novembre, « Rio de Janeiro » (rivière de janvier) le 1er janvier 1502.','por'),
  Ph(25,'Jusqu’où est-il allé ?','Vespucci dit avoir navigué très loin au sud, peut-être jusqu’en Patagonie. Les historiens en discutent encore.','por',true),
  Ph(32,'« Un Nouveau Monde »','Pour Vespucci, cette terre est trop grande pour être l’Asie : c’est un continent inconnu. Colomb, lui, s’était cru en Asie jusqu’à sa mort.','kan'),
  Ph(38,'1507 : America','À Saint-Dié, dans les Vosges, le cartographe Martin Waldseemüller dessine une carte du monde. Il y écrit « America », en l’honneur d’Amerigo. Le nom est resté.','kan')
 ],
 photos:[Sh('vespucci',1,8,'tr',2,'contain'),Sh('waldsee',39,46,'bl',-2,'contain')],
 legend:[['por','Vespucci (1501–1502)'],['por','Trajet incertain',true]],
 mots:[['Continent','Très grande étendue de terre entourée d’océans.'],['Cartographe','Personne qui dessine des cartes.']],
 q:[['Qu’a compris Amerigo Vespucci ?','Que les terres atteintes à l’ouest ne sont pas l’Asie, mais un continent inconnu des Européens.'],['D’où vient le nom « Amérique » ?','Du prénom d’Amerigo Vespucci, écrit sur une carte dessinée à Saint-Dié en 1507.']],
 wiki:['Amerigo Vespucci','Planisphère de Waldseemüller']},

/* 8 --------------------------------------------------------------- */
{short:'Magellan et Elcano',col:'esp',dur:80,when:[1519,1522],dates:'1519 – 1522',
 cam:[{t:0,lon:-10,lat:32,z:1.5},{t:8,lon:-28,lat:5,z:0.9},{t:18,lon:-55,lat:-35,z:1.3},{t:25,lon:-71,lat:-52,z:4.2},{t:31,lon:-73,lat:-53,z:4.2},{t:37,lon:-120,lat:-18,z:0.75},{t:45,lon:150,lat:10,z:1.0},{t:50,lon:125,lat:9,z:3.2},{t:54,lon:122,lat:5,z:1.9},{t:60,lon:122,lat:4,z:1.7},{t:66,lon:70,lat:-22,z:0.75},{t:72,lon:5,lat:-5,z:0.8},{t:76,lon:70,lat:-5,z:0.43},{t:80,lon:70,lat:-5,z:0.43}],
 zones:[],
 routes:[
  r('esp',2,22,3.4,MAG1,S),
  r('esp',23,31,3,STRAIT,SS),
  r('esp',32,47,3.4,MAG3,S),
  r('esp',47,51,3,MAG4,SS),
  r('esp',53,59,2.6,MAG5,{ship:true,dash:true}),
  r('kan',61,75,3.4,ELC,S)
 ],
 labels:[
  L(1,-6.35,36.78,'Sanlúcar',{sub:'20 septembre 1519',dx:10,al:'left',gold:true,end:60}),
  L(13,-43.2,-22.9,'Rio de Janeiro',{sub:'décembre 1519',dx:-10,al:'right',end:36}),
  L(21,-67.7,-49.3,'Puerto San Julián',{sub:'hivernage, mutinerie',dx:10,dy:-8,al:'left',end:36}),
  L(27,-71.5,-52.2,'Détroit de Magellan',{sub:'octobre – novembre 1520',nomark:true,dy:-30,gold:true}),
  L(35,-125,-25,'Océan « Pacifique »',{nomark:true,big:true,end:46}),
  L(45,144.75,13.45,'Guam',{sub:'6 mars 1521',dy:-16,end:62}),
  L(50,123.97,10.3,'Mactan',{sub:'27 avril 1521 : mort de Magellan',dx:-10,dy:-10,al:'right',gold:true}),
  L(56,114.9,5,'Brunei',{dx:-10,al:'right',zmin:1.2}),
  L(59,127.4,0.7,'Moluques',{sub:'novembre 1521',dx:10,dy:8,al:'left',gold:true}),
  L(68,18.47,-34.36,'Cap de Bonne-Espérance',{sub:'mai 1522',dx:10,dy:12,al:'left'}),
  L(72,-23.6,15,'Cap-Vert',{sub:'juillet 1522',dx:-10,al:'right'}),
  L(75,-6.35,36.78,'Sanlúcar',{sub:'retour : 6 septembre 1522',dx:10,dy:-8,al:'left',gold:true})
 ],
 pulses:[Pu(50,123.97,10.3,'#fb7185',true),Pu(59,127.4,0.7,'#e8b04a'),Pu(75,-6.35,36.78,'#ffd166',true)],
 ph:[
  Ph(0,'20 septembre 1519','Fernand de Magellan est portugais, mais il navigue pour le roi d’Espagne Charles Quint. Il part avec 5 navires et environ 240 hommes. Son but : atteindre les Moluques, les îles aux épices, par l’ouest.','esp'),
  Ph(10,'Chercher un passage','Il longe l’Amérique du Sud à la recherche d’un passage vers l’autre océan. L’hiver l’arrête en Patagonie. Des capitaines se révoltent : Magellan écrase la mutinerie.','esp'),
  Ph(23,'Octobre – novembre 1520 : le détroit','Il trouve enfin le passage, tout au sud. Il faut 38 jours pour traverser ce labyrinthe de près de 600 km. Un navire a fait naufrage, un autre a déserté.','esp'),
  Ph(32,'Un océan immense','Magellan le trouve calme et l’appelle « Pacifique ». La traversée dure plus de trois mois, presque sans rien à manger. Beaucoup de marins meurent du scorbut.','esp'),
  Ph(45,'Mars – avril 1521 : les Philippines','À Cebu, Magellan s’allie à un roi et se mêle d’une guerre locale. Le 27 avril 1521, il est tué sur l’île de Mactan par les guerriers du chef Lapu-Lapu.','ame'),
  Ph(53,'Novembre 1521 : les Moluques','Les survivants errent des mois, puis atteignent enfin les îles aux épices. Ils remplissent les cales de clous de girofle.','epi'),
  Ph(61,'Le retour d’Elcano','Le Basque Juan Sebastián Elcano ramène le dernier navire, la Victoria, par l’océan Indien et le cap de Bonne-Espérance, en évitant les ports portugais.','kan'),
  Ph(73,'6 septembre 1522 : le premier tour du monde','Trois ans après le départ, 18 hommes rentrent en Espagne, sur 240. Ils ont prouvé par l’expérience que la Terre est ronde et que tous les océans communiquent.','kan')
 ],
 photos:[Sh('magellan',1,8,'tr',2,'contain'),Sh('detroit',24,31,'bl',-2),Sh('victoria',62,70,'tr',2,'contain'),Sh('elcano',73,80,'tl',-2,'contain')],
 legend:[['esp','Magellan (1519–1521)'],['esp','Après la mort de Magellan',true],['kan','Retour d’Elcano (1522)']],
 mots:[['Détroit','Passage étroit de mer entre deux terres.'],['Scorbut','Maladie grave due au manque de fruits et de légumes frais.'],['Mutinerie','Révolte de marins contre leur chef.']],
 q:[['Magellan a-t-il fait le tour du monde ?','Non : il meurt aux Philippines en 1521. C’est Elcano qui termine le voyage avec la Victoria.'],['Pourquoi a-t-il appelé cet océan « Pacifique » ?','Parce qu’il l’a trouvé calme pendant sa traversée.'],['Combien de marins rentrent en Espagne en 1522 ?','18, sur environ 240 au départ, et un seul navire sur cinq.'],['Qu’a prouvé ce voyage ?','Qu’on peut faire le tour de la Terre par la mer : elle est ronde et ses océans communiquent.']],
 wiki:['Fernand de Magellan','Juan Sebastián Elcano','Détroit de Magellan']},

/* 9 --------------------------------------------------------------- */
{short:'Jacques Cartier',col:'fra',dur:54,when:[1534,1536],dates:'1534 – 1536',
 cam:[{t:0,lon:-6,lat:48.5,z:2.6},{t:8,lon:-30,lat:49,z:1.3},{t:16,lon:-58,lat:49.8,z:4.6},{t:31,lon:-62,lat:49,z:4.6},{t:40,lon:-68,lat:48,z:5.0},{t:48,lon:-66,lat:48.6,z:3.6},{t:54,lon:-66,lat:48.6,z:3.6}],
 zones:[],
 routes:[r('fra',2,13,3.4,CAR1,S),r('fra',13,31,3,CAR1B,SS),r('kan',34,46,3,CAR2,{ship:true,straight:true,step:0.25,river:true})],
 labels:[
  L(1,-2.03,48.65,'Saint-Malo',{sub:'20 avril 1534',dx:10,dy:8,al:'left',gold:true}),
  L(13,-56,48.6,'Terre-Neuve',{nomark:true}),
  L(18,-56.6,51.9,'Détroit de Belle-Isle',{nomark:true,dy:-12,zmin:3}),
  L(26,-64.48,48.83,'Gaspé',{sub:'24 juillet 1534 : une croix',dx:-10,dy:-10,al:'right',gold:true}),
  L(29,-63,49.5,'Anticosti',{nomark:true,zmin:3}),
  L(42,-71.2,46.8,'Stadaconé (Québec)',{sub:'septembre 1535',dx:10,dy:-8,al:'left'}),
  L(45,-73.55,45.5,'Hochelaga (Montréal)',{sub:'octobre 1535',dx:10,dy:12,al:'left'}),
  L(38,-67.5,49.6,'Fleuve Saint-Laurent',{nomark:true,dy:-16,zmin:3})
 ],
 pulses:[Pu(26,-64.48,48.83,'#ffd166',true),Pu(45,-73.55,45.5,'#ffd166')],
 ph:[
  Ph(0,'20 avril 1534','Le roi de France François Ier refuse le partage du monde entre Espagnols et Portugais. Il envoie le Malouin Jacques Cartier chercher, au nord, un passage vers l’Asie… et de l’or.','fra'),
  Ph(8,'Vingt jours pour traverser','Deux navires, 61 hommes. Poussé par de bons vents, Cartier atteint Terre-Neuve en vingt jours seulement.','fra'),
  Ph(16,'Le golfe du Saint-Laurent','Il fait le tour du golfe. Il rencontre des Micmacs, puis des Iroquoiens du Saint-Laurent venus pêcher, avec leur chef Donnacona.','fra'),
  Ph(25,'24 juillet 1534 : Gaspé','Cartier plante une croix de neuf mètres au nom du roi de France. Donnacona proteste. Cartier emmène pourtant deux de ses fils en France.','fra'),
  Ph(33,'1535 : le deuxième voyage','Guidé par les deux jeunes Iroquoiens, Cartier remonte un immense fleuve : le Saint-Laurent. Il atteint Stadaconé (Québec), puis Hochelaga (Montréal).','kan'),
  Ph(46,'Un hiver terrible','Les navires sont pris dans la glace. Le scorbut tue 25 marins. Les Iroquoiens sauvent les autres avec une tisane de conifère. Le mot « Canada » vient de leur langue : « kanata », le village.','kan')
 ],
 photos:[Sh('cartier',1,8,'tr',2,'contain'),Sh('saintlaurent',38,46,'bl',-2,'contain')],
 legend:[['fra','1er voyage (1534)'],['kan','2e voyage (1535–1536)']],
 mots:[['Iroquoiens','Peuple amérindien de la vallée du Saint-Laurent.'],['Golfe','Grande avancée de la mer dans les terres.'],['Passage du Nord-Ouest','Route maritime vers l’Asie par le nord de l’Amérique, cherchée pendant des siècles.']],
 q:[['Quel roi envoie Jacques Cartier, et pourquoi ?','François Ier : il veut un passage vers l’Asie et de l’or, et refuse le partage de Tordesillas.'],['Que fait Cartier à Gaspé en 1534 ?','Il plante une croix : il prend possession du pays au nom du roi de France.'],['D’où vient le mot « Canada » ?','Du mot iroquoien « kanata », qui veut dire village.']],
 wiki:['Jacques Cartier','Donnacona']},

/* 10 -------------------------------------------------------------- */
{short:'Mendaña, Quirós et Torres',col:'esp',dur:62,when:[1567,1606],dates:'1567 – 1606',
 cam:[{t:0,lon:-100,lat:-12,z:0.9},{t:10,lon:-150,lat:-10,z:0.8},{t:17,lon:164,lat:-9,z:2.4},{t:21,lon:164,lat:-9,z:2.4},{t:26,lon:-150,lat:-10,z:0.75},{t:36,lon:167,lat:-13,z:3.2},{t:42,lon:167,lat:-14,z:3.2},{t:48,lon:157,lat:-14,z:1.9},{t:62,lon:152,lat:-11,z:1.6}],
 zones:[],
 routes:[
  r('esp',2,16,3.2,MEN1,S),
  r('ned',21,31,3,MEN2,S),
  r('ned',31,36,2.4,MEN2B,{ship:true,dash:true,thin:true}),
  r('ame',30,41,3,QUI,S),
  r('fra',43,58,3.2,TOR,S)
 ],
 labels:[
  L(1,-77.15,-12.05,'Callao (Pérou)',{dx:10,al:'left',gold:true}),
  L(16,159.4,-8,'Santa Isabel',{sub:'février 1568',dx:-10,al:'right'}),
  L(17,160.5,-9.6,'Îles Salomon',{nomark:true,big:true,dy:16,zmin:2}),
  L(25,-138.7,-10.5,'Marquises',{sub:'1595',dy:-16}),
  L(31,165.9,-10.7,'Santa Cruz',{sub:'1595 : mort de Mendaña',dx:10,dy:-12,al:'left'}),
  L(41,166.9,-15.2,'Espiritu Santo',{sub:'mai 1606',dx:10,dy:6,al:'left',gold:true}),
  L(47,165.5,-21.4,'Nouvelle-Calédonie',{sub:'pas vue !',dx:10,dy:8,al:'left',zmin:1.5}),
  L(52,146,-6.5,'Nouvelle-Guinée',{nomark:true,zmin:1.2}),
  L(54,135,-24,'Australie',{sub:'pas vue non plus',nomark:true,big:true,zmin:1.2}),
  L(56,142.3,-10.2,'Détroit de Torres',{sub:'1606',dx:-4,dy:-18,gold:true})
 ],
 pulses:[Pu(41,166.9,-15.2,'#ffd166',true),Pu(56,142.3,-10.2,'#ffd166')],
 ph:[
  Ph(0,'1567 : l’or du roi Salomon','Au Pérou, les Espagnols rêvent d’îles pleines d’or, quelque part à l’ouest. Álvaro de Mendaña part de Callao avec deux navires.','esp'),
  Ph(10,'1568 : les îles Salomon','Après 80 jours de mer, il atteint Santa Isabel. Il n’y trouve pas d’or, et les affrontements avec les habitants se multiplient. Il repart.','esp'),
  Ph(21,'1595 : le second voyage','Mendaña revient avec quatre navires pour fonder une colonie. Il passe par les Marquises, mais ne retrouve pas « ses » îles. Il meurt à Santa Cruz. Sa femme, Isabel Barreto, prend le commandement et conduit la flotte jusqu’à Manille.','ned'),
  Ph(31,'1606 : Quirós au Vanuatu','Son ancien pilote, Pedro Fernández de Quirós, repart chercher le grand continent du Sud. Il aborde une grande île du Vanuatu et croit l’avoir trouvé : il la nomme « Austrialia del Espíritu Santo ».','ame'),
  Ph(43,'1606 : Torres','Séparé de Quirós, Luis Váez de Torres descend vers 21° sud sans voir de terre : il passe à l’ouest de la Nouvelle-Calédonie sans la remarquer. Puis il longe la Nouvelle-Guinée.','fra'),
  Ph(54,'Un détroit oublié','Torres franchit le passage entre la Nouvelle-Guinée et l’Australie. L’Espagne garde ses cartes secrètes : ce détroit ne portera son nom que 160 ans plus tard.','fra')
 ],
 photos:[Sh('quiros',32,40,'bl',-2,'contain')],
 legend:[['esp','Mendaña (1567–1568)'],['ned','Mendaña et Barreto (1595)'],['ame','Quirós (1605–1606)'],['fra','Torres (1606)']],
 mots:[['Terra Australis','Grand continent que les savants imaginaient au sud du globe.'],['Mélanésie','Région du Pacifique : Nouvelle-Guinée, Salomon, Vanuatu, Nouvelle-Calédonie, Fidji.']],
 q:[['Pourquoi les îles Salomon portent-elles ce nom ?','Les Espagnols espéraient y trouver l’or du roi Salomon.'],['Quel nom du Vanuatu vient de l’expédition de Quirós ?','Espiritu Santo, la plus grande île.'],['Quel navigateur passe près de la Nouvelle-Calédonie sans la voir, en 1606 ?','Torres.']],
 wiki:['Álvaro de Mendaña','Pedro Fernandes de Queirós','Luis Váez de Torres','Isabel Barreto']},

/* 11 -------------------------------------------------------------- */
{short:'Abel Tasman',col:'ned',dur:54,when:[1642,1643],dates:'1642 – 1643',
 cam:[{t:0,lon:100,lat:-8,z:1.3},{t:8,lon:78,lat:-22,z:0.9},{t:18,lon:120,lat:-40,z:0.9},{t:25,lon:150,lat:-42,z:2.4},{t:32,lon:171,lat:-40,z:2.6},{t:40,lon:-178,lat:-20,z:1.6},{t:48,lon:150,lat:-22,z:0.75},{t:54,lon:150,lat:-22,z:0.75}],
 zones:[],
 routes:[r('ned',2,10,3.2,TAS1,S),r('ned',10,23,3.2,TAS2,S),r('ned',24,31,3.2,TAS3,S),r('ned',32,50,3.2,TAS4,S)],
 labels:[
  L(1,106.8,-6.1,'Batavia (Jakarta)',{sub:'14 août 1642',dx:10,dy:10,al:'left',gold:true}),
  L(10,57.5,-20.2,'Île Maurice',{dx:-10,al:'right',end:30}),
  L(23,146.5,-42,'Terre de Van Diemen',{sub:'novembre 1642 (Tasmanie)',nomark:true,dy:-30}),
  L(31,171.5,-43.3,'Nouvelle-Zélande',{sub:'décembre 1642',nomark:true,dx:14,dy:10,al:'left'}),
  L(33,172.8,-40.7,'Baie des Meurtriers',{mark:'site',dx:10,dy:-10,al:'left',zmin:2}),
  L(40,-175.2,-21.2,'Tonga',{sub:'janvier 1643',dx:10,al:'left'}),
  L(42,178,-17.8,'Fidji',{dx:-10,dy:10,al:'right'}),
  L(46,134,-25,'Australie',{sub:'contournée sans être vue',nomark:true,big:true})
 ],
 pulses:[Pu(33,172.8,-40.7,'#fb7185')],
 ph:[
  Ph(0,'14 août 1642','La Compagnie hollandaise des Indes orientales domine le commerce des épices. Depuis Batavia, elle envoie Abel Tasman chercher le continent du Sud et de nouveaux marchés.','ned'),
  Ph(9,'Un grand détour par le sud','Tasman passe par l’île Maurice, puis descend très bas, là où soufflent de puissants vents d’ouest. Il file vers l’est.','ned'),
  Ph(19,'Novembre 1642 : la Tasmanie','Il aperçoit une terre et la nomme « Terre de Van Diemen ». On l’appelle aujourd’hui Tasmanie. Il fait tout le tour de l’Australie… sans jamais la voir.','ned'),
  Ph(28,'Décembre 1642 : la Nouvelle-Zélande','Premier Européen à voir ces îles, il mouille dans une baie. Des Maoris attaquent une chaloupe : quatre marins sont tués. Tasman repart sans débarquer.','ned'),
  Ph(38,'1643 : Tonga et Fidji','Il est bien accueilli aux Tonga, traverse les dangereux récifs des Fidji et rentre à Batavia par le nord de la Nouvelle-Guinée.','ned'),
  Ph(47,'Un échec pour la Compagnie','Ni or, ni épices, ni nouveaux clients : les marchands sont déçus. Mais les cartes du Pacifique sud commencent à se remplir.','kan')
 ],
 photos:[Sh('tasman',1,8,'tr',2,'contain'),Sh('gilsemans',29,37,'bl',-2,'contain'),Sh('tasmanmap',47,54,'tl',-2,'contain')],
 legend:[['ned','Abel Tasman (1642–1643)']],
 mots:[['Compagnie des Indes','Grande entreprise de commerce qui possède ses navires, ses comptoirs et même ses soldats.'],['Maoris','Peuple polynésien d’Aotearoa (Nouvelle-Zélande).']],
 q:[['Pour qui Tasman navigue-t-il ?','Pour la Compagnie hollandaise des Indes orientales.'],['Quelles terres est-il le premier Européen à voir ?','La Tasmanie, la Nouvelle-Zélande, les Tonga et les Fidji.'],['Pourquoi son voyage est-il jugé décevant ?','Il ne rapporte ni or, ni épices, ni nouveaux marchés.']],
 wiki:['Abel Tasman','Compagnie néerlandaise des Indes orientales']},

/* 12 -------------------------------------------------------------- */
{short:'Bougainville',col:'fra',dur:68,when:[1766,1769],dates:'1766 – 1769',
 cam:[{t:0,lon:-12,lat:40,z:1.3},{t:8,lon:-35,lat:-10,z:0.8},{t:18,lon:-65,lat:-48,z:1.5},{t:26,lon:-120,lat:-25,z:0.8},{t:33,lon:-152,lat:-17,z:2.6},{t:41,lon:176,lat:-15,z:1.6},{t:46,lon:166,lat:-15.5,z:3.4},{t:52,lon:156,lat:-10,z:2.0},{t:58,lon:100,lat:-8,z:0.7},{t:63,lon:60,lat:0,z:0.43},{t:68,lon:60,lat:0,z:0.43}],
 zones:[],
 routes:[
  r('fra',2,14,3.4,BOU1,S),
  r('fra',13,17,2.2,BOU_M,{ship:true,dash:true,thin:true}),
  r('fra',15,20,3.2,BOU2,S),
  r('fra',20,23,3,STRAIT,SS),
  r('fra',23,33,3.4,BOU3,S),
  r('fra',36,55,3.2,BOU4,S),
  r('fra',56,66,2.4,BOU5,D)
 ],
 labels:[
  L(1,-4.5,48.4,'Brest',{sub:'5 décembre 1766',dx:10,al:'left',gold:true,end:60}),
  L(13,-56.2,-34.9,'Montevideo',{dx:-10,al:'right',end:40}),
  L(16,-59,-51.7,'Malouines',{sub:'rendues à l’Espagne',dx:12,al:'left',end:40}),
  L(22,-71,-53.4,'Détroit de Magellan',{nomark:true,dy:-22,end:40}),
  L(33,-149.4,-17.65,'Tahiti',{sub:'avril 1768',dx:-10,dy:12,al:'right',gold:true}),
  L(39,-171,-13.9,'Samoa',{dy:-12}),
  L(45,168,-15.5,'Grandes Cyclades',{sub:'mai 1768 (Vanuatu)',dx:10,dy:-14,al:'left'}),
  L(47,165.5,-21.4,'Nouvelle-Calédonie',{sub:'pas vue',dx:10,dy:8,al:'left',zmin:1.5}),
  L(49,148,-15.5,'Grande Barrière',{sub:'demi-tour, juin 1768',nomark:true,dx:-10,al:'right',zmin:1.2}),
  L(54,155.3,-6.2,'Île Bougainville',{nomark:true,dx:-14,al:'right',zmin:1.5}),
  L(60,106.8,-6.1,'Batavia',{dy:14}),
  L(62,57.5,-20.2,'Île de France (Maurice)',{dx:10,dy:8,al:'left'}),
  L(66,-2.03,48.65,'Saint-Malo',{sub:'16 mars 1769',dx:10,dy:-8,al:'left',gold:true})
 ],
 pulses:[Pu(33,-149.4,-17.65,'#ffd166',true)],
 ph:[
  Ph(0,'Décembre 1766','Louis-Antoine de Bougainville quitte Brest sur la frégate La Boudeuse. Louis XV lui confie le premier tour du monde français. À bord : un astronome et un naturaliste, Philibert Commerson.','fra'),
  Ph(9,'Une expédition de savants','On ne cherche plus seulement de l’or et des épices. On veut mesurer, dessiner, décrire les plantes, les animaux et les peuples. C’est le siècle des Lumières.','fra'),
  Ph(18,'Le détroit de Magellan','Il faut 52 jours pour le franchir. Puis c’est le Pacifique, et le labyrinthe des Tuamotu, que Bougainville nomme « archipel Dangereux ».','fra'),
  Ph(31,'Avril 1768 : Tahiti','Neuf jours d’escale seulement, mais son récit fera rêver toute l’Europe. Un Tahitien, Ahutoru, embarque pour découvrir la France.','fra'),
  Ph(41,'Mai 1768 : le Vanuatu','Bougainville traverse l’archipel, qu’il nomme « Grandes Cyclades ». Plus à l’ouest, les récifs de la Grande Barrière l’obligent à faire demi-tour : il ne verra ni l’Australie, ni la Nouvelle-Calédonie.','fra'),
  Ph(51,'Les Salomon et le retour','Il longe une île qui porte aujourd’hui son nom. L’équipage, affamé, mange les rats du bord. Puis Batavia, l’île de France (Maurice) et Saint-Malo, le 16 mars 1769.','fra'),
  Ph(62,'Une femme autour du monde','L’aide de Commerson, déguisée en homme, s’appelait Jeanne Barret. C’est la première femme à avoir fait le tour du monde. Et le bougainvillier, découvert au Brésil, porte le nom du capitaine.','kan')
 ],
 photos:[Sh('bougainville',1,8,'tr',2,'contain'),Sh('boudeuse',10,17,'tr',2),Sh('barret',62,68,'tl',-2,'contain'),Sh('bougainvillier',62,68,'bl',2)],
 legend:[['fra','Bougainville (1766–1769)'],['fra','Retour',true]],
 mots:[['Frégate','Navire de guerre rapide, à trois mâts.'],['Naturaliste','Savant qui étudie les plantes, les animaux et les roches.'],['Lumières','Mouvement du XVIIIe siècle : des savants et des philosophes veulent tout connaître et tout expliquer par la raison.']],
 q:[['Quelle est la nouveauté du voyage de Bougainville ?','C’est le premier tour du monde français, et une expédition scientifique avec des savants à bord.'],['Qui est Jeanne Barret ?','La première femme à avoir fait le tour du monde, embarquée déguisée en homme.'],['Pourquoi Bougainville ne voit-il pas la Nouvelle-Calédonie ?','Il passe au nord, par le Vanuatu, puis fait demi-tour devant la Grande Barrière de corail.']],
 wiki:['Louis-Antoine de Bougainville','Jeanne Barret','Ahutoru']},

/* 13 -------------------------------------------------------------- */
{short:'James Cook',col:'eur',dur:76,when:[1768,1779],dates:'1768 – 1779',
 cam:[{t:0,lon:-40,lat:10,z:0.6},{t:8,lon:-120,lat:-30,z:0.7},{t:14,lon:-165,lat:-28,z:1.2},{t:20,lon:168,lat:-38,z:1.8},{t:28,lon:150,lat:-22,z:1.3},{t:33,lon:90,lat:-48,z:0.7},{t:39,lon:-160,lat:-45,z:0.56},{t:46,lon:168,lat:-20,z:2.8},{t:52,lon:168,lat:-21,z:2.8},{t:57,lon:-158,lat:15,z:0.7},{t:66,lon:-160,lat:42,z:0.85},{t:72,lon:-170,lat:5,z:0.45},{t:76,lon:-170,lat:5,z:0.45}],
 zones:[],
 routes:[
  r('eur',2,13,3.2,CK1A,S),
  r('eur',13,31,3,CK1B,S),
  r('gbr',33,53,2.8,CK2,S),
  r('kan',55,67,3,CK3,S),
  r('kan',67,72,2.6,CK3R,S)
 ],
 labels:[
  L(1,-4.15,50.35,'Plymouth',{sub:'août 1768',dx:10,al:'left',end:12}),
  L(13,-149.4,-17.65,'Tahiti',{sub:'1769 : passage de Vénus',dx:10,dy:-8,al:'left'}),
  L(20,172,-42.5,'Nouvelle-Zélande',{sub:'1769–1770 : cartographiée',nomark:true,dx:16,dy:10,al:'left',end:33}),
  L(26,151.2,-34,'Botany Bay',{sub:'avril 1770',dx:-10,al:'right',end:44}),
  L(35,39.5,-66.6,'Cercle polaire',{sub:'janvier 1773',dy:16,end:45}),
  L(41,-107,-71.1,'71° sud',{sub:'janvier 1774 : record',dy:16}),
  L(43,-109.4,-27.1,'Île de Pâques',{dy:-14,zmax:2}),
  L(48,164.5,-20.3,'Balade',{sub:'septembre 1774',dx:-10,dy:-10,al:'right',gold:true}),
  L(49,165.7,-21.6,'Nouvelle-Calédonie',{nomark:true,gold:true,dx:-14,dy:22,al:'right',zmin:2}),
  L(51,167.95,-29.03,'Île Norfolk',{dx:10,al:'left',zmin:2}),
  L(59,-157.4,1.9,'Île Christmas',{sub:'Noël 1777',dx:10,al:'left',zmax:2}),
  L(63,-126.6,49.6,'Nootka',{sub:'1778',dx:10,al:'left',zmax:2}),
  L(66,-168.5,65.8,'Détroit de Béring',{sub:'août 1778',dx:-10,al:'right',zmax:2}),
  L(71,-155.9,19.5,'Hawaï',{sub:'mort de Cook, 14 février 1779',dx:10,dy:8,al:'left',gold:true})
 ],
 pulses:[Pu(48,164.5,-20.3,'#ffd166',true),Pu(71,-155.9,19.5,'#fb7185',true)],
 ph:[
  Ph(0,'1768 : un marin et des savants','L’Anglais James Cook, fils de paysan devenu capitaine, part sur l’Endeavour. Mission officielle : observer à Tahiti le passage de Vénus devant le Soleil. Mission secrète : chercher le continent du Sud.','eur'),
  Ph(11,'1769 – 1770 : premier voyage','Guidé par le Tahitien Tupaia, il fait le tour de la Nouvelle-Zélande et dresse sa carte. Puis il longe toute la côte est de l’Australie et en prend possession pour l’Angleterre.','eur'),
  Ph(24,'Un navire sans scorbut','Cook impose la propreté, la choucroute et des produits frais à chaque escale. Presque aucun marin ne meurt du scorbut : c’est une révolution.','eur'),
  Ph(33,'1772 – 1775 : deuxième voyage','Il est le premier à franchir le cercle polaire antarctique et descend jusqu’à 71° sud, dans les glaces. Il prouve que le grand continent du Sud, riche et tempéré, n’existe pas.','gbr'),
  Ph(46,'Septembre 1774 : la Nouvelle-Calédonie','Venant du Vanuatu, Cook aborde à Balade. Il est bien accueilli par les Kanak. Les montagnes lui rappellent l’Écosse : il nomme l’île « New Caledonia ».','gbr'),
  Ph(55,'1776 – 1779 : troisième voyage','Il cherche un passage entre le Pacifique et l’Atlantique par le nord. Il atteint Hawaï, longe l’Amérique jusqu’à l’Alaska, mais les glaces l’arrêtent après le détroit de Béring.','kan'),
  Ph(68,'14 février 1779','De retour à Hawaï, une dispute éclate à propos d’une chaloupe volée. Cook est tué sur la plage de Kealakekua. Grâce à lui, la carte du Pacifique est presque complète.','kan')
 ],
 photos:[Sh('cook',1,8,'tr',2,'contain'),Sh('endeavour',12,19,'tr',2,'contain'),Sh('resolution',34,41,'tr',2),Sh('carte1774',47,53,'bl',-2,'contain'),Sh('hodges',47,53,'tr',2,'contain')],
 legend:[['eur','1er voyage (1768–1771)'],['gbr','2e voyage (1772–1775)'],['kan','3e voyage (1776–1779)']],
 mots:[['Passage de Vénus','Moment rare où la planète Vénus passe devant le Soleil. Le mesurer aidait à calculer la distance entre la Terre et le Soleil.'],['Cartographier','Dessiner la carte d’un lieu.']],
 q:[['Combien de grands voyages James Cook a-t-il faits dans le Pacifique ?','Trois, entre 1768 et 1779.'],['Que prouve son deuxième voyage ?','Que le grand continent du Sud imaginé par les savants n’existe pas : il n’y a que l’Antarctique, glacé.'],['Quel lien avec la Nouvelle-Calédonie ?','Cook aborde à Balade en septembre 1774 et donne son nom au pays.']],
 wiki:['James Cook','Tupaia']},

/* 14 -------------------------------------------------------------- */
{short:'La Pérouse',col:'fra',dur:72,when:[1785,1788],dates:'1785 – 1788',
 cam:[{t:0,lon:-10,lat:38,z:1.2},{t:8,lon:-50,lat:-30,z:0.75},{t:15,lon:-95,lat:-30,z:0.8},{t:23,lon:-140,lat:28,z:0.7},{t:31,lon:-160,lat:30,z:0.7},{t:38,lon:128,lat:28,z:1.3},{t:44,lon:142,lat:44,z:1.8},{t:50,lon:170,lat:15,z:0.7},{t:58,lon:165,lat:-24,z:1.6},{t:65,lon:165,lat:-18,z:2.6},{t:72,lon:165,lat:-18,z:2.6}],
 zones:[],
 routes:[
  r('fra',2,14,3.2,LP1,S),
  r('fra',14,26,3.2,LP2,S),
  r('fra',26,30,3,LP3,S),
  r('fra',30,36,3.2,LP4,S),
  r('fra',36,38,3,LP5,S),
  r('fra',38,44,3,LP6,S),
  r('fra',44,48,3,LP7,S),
  r('fra',48,59,3.2,LP8,S),
  r('fra',61,67,2.8,LP9,{ship:true,dash:true})
 ],
 labels:[
  L(1,-4.5,48.4,'Brest',{sub:'1er août 1785',dx:10,al:'left',gold:true}),
  L(14,-73.05,-36.8,'Concepción (Chili)',{dx:10,al:'left',end:30}),
  L(17,-109.4,-27.1,'Île de Pâques',{sub:'avril 1786',dy:16,end:34}),
  L(21,-156.4,20.6,'Maui (Hawaï)',{dx:-10,al:'right',end:40}),
  L(26,-137.6,58.6,'Port des Français',{sub:'juillet 1786 (Alaska)',dx:10,al:'left',end:40}),
  L(30,-121.9,36.6,'Monterey',{dx:10,al:'left',end:40}),
  L(36,113.55,22.2,'Macao',{sub:'janvier 1787',dx:-10,al:'right'}),
  L(38,120.9,14.5,'Manille',{dx:10,dy:8,al:'left',zmin:1}),
  L(44,142,45.7,'Détroit de La Pérouse',{sub:'août 1787',dx:10,dy:14,al:'left',gold:true}),
  L(48,158.65,53,'Kamtchatka',{sub:'septembre 1787',dx:-10,dy:-10,al:'right'}),
  L(54,-171,-14.1,'Samoa',{sub:'décembre 1787',dy:-16}),
  L(59,151.25,-34,'Botany Bay',{sub:'janvier 1788',dx:-10,al:'right'}),
  L(62,165.5,-21.4,'Nouvelle-Calédonie',{nomark:true,dx:14,dy:10,al:'left',zmin:1.4}),
  L(67,166.9,-11.65,'Vanikoro',{sub:'naufrage, 1788',dx:10,dy:-10,al:'left',gold:true})
 ],
 pulses:[Pu(67,166.9,-11.65,'#fb7185',true)],
 ph:[
  Ph(0,'1er août 1785','Louis XVI, passionné de géographie, veut compléter l’œuvre de Cook. Il envoie Jean-François de La Pérouse avec deux frégates, La Boussole et L’Astrolabe, et une quinzaine de savants et d’artistes.','fra'),
  Ph(10,'1786 : de l’île de Pâques à l’Alaska','Cap Horn, Chili, île de Pâques, Hawaï, puis l’Alaska. Dans une baie, 21 marins se noient. La Pérouse descend ensuite jusqu’à la Californie.','fra'),
  Ph(30,'1787 : les côtes d’Asie','Macao, Manille, puis des côtes mal connues des Européens : Corée, Japon, Tartarie. Il découvre le détroit qui porte son nom, entre Sakhaline et le Japon.','fra'),
  Ph(44,'Septembre 1787 : le Kamtchatka','La Pérouse confie ses journaux à Barthélemy de Lesseps. Celui-ci traverse toute la Russie pour les rapporter à Versailles : un an de voyage !','fra'),
  Ph(49,'Samoa, puis Botany Bay','Aux Samoa, douze hommes sont tués, dont le commandant de L’Astrolabe. En janvier 1788, La Pérouse arrive en Australie en même temps que les premiers colons anglais. Il y envoie ses dernières lettres.','fra'),
  Ph(60,'1788 : disparus','Il comptait explorer les côtes de la Nouvelle-Calédonie. On ne le reverra jamais. Avant de mourir, Louis XVI aurait demandé : « A-t-on des nouvelles de M. de La Pérouse ? »','fra',true),
  Ph(67,'Vanikoro','Quarante ans plus tard, on retrouve les épaves aux îles Salomon : les deux frégates se sont brisées sur le récif de Vanikoro. Parti à sa recherche, d’Entrecasteaux a exploré les côtes de la Nouvelle-Calédonie en 1792–1793.','kan')
 ],
 photos:[Sh('louis16',1,9,'tr',2,'contain'),Sh('laperouse',10,17,'tr',2,'contain'),Sh('vanikoro',67,72,'tl',-2,'contain')],
 legend:[['fra','La Pérouse (1785–1788)'],['fra','Dernier trajet, inconnu',true]],
 mots:[['Expédition scientifique','Voyage organisé pour observer, mesurer et décrire.'],['Récif','Barrière de corail ou de rochers à fleur d’eau.'],['Épave','Restes d’un navire naufragé.']],
 q:[['Quel roi organise l’expédition de La Pérouse ?','Louis XVI.'],['Comment les journaux de bord sont-ils arrivés en France ?','La Pérouse les envoie à chaque grande escale. Depuis le Kamtchatka, Lesseps les rapporte en traversant la Russie.'],['Où l’expédition a-t-elle disparu ?','Sur le récif de Vanikoro, aux îles Salomon, en 1788.'],['Quel lien avec la Nouvelle-Calédonie ?','La Pérouse voulait l’explorer. D’Entrecasteaux, parti à sa recherche, en a reconnu les côtes en 1792–1793.']],
 wiki:['Jean-François de La Pérouse','Expédition de La Pérouse','Vanikoro','Antoine Bruny d\'Entrecasteaux']},

/* 15 -------------------------------------------------------------- */
{short:'Bilan : le monde change',col:'kan',dur:62,when:[1488,1600],dates:'1400 – 1600',
 cam:[{t:0,lon:10,lat:8,z:0.43},{t:62,lon:10,lat:8,z:0.43}],
 zones:[
  {k:'mer',lon:-46.6,lat0:-58,lat1:62,col:'eur',a:0.9,t0:16,fade:2},
  Rg(EMP_ESP1,'esp',48,0.55,3),Rg(EMP_ESP2,'esp',48,0.55,3),Rg(EMP_POR,'por',48,0.6,3)
 ],
 routes:[
  r('zh',2,8,2.4,cat(ZH_A,ZH_C),{}),
  r('zh',5,8,2.4,ZH_D,{}),
  r('por',9,14,2.4,cat(P_A,P_B,DIAS),{}),
  r('esp',14,19,2.6,COL1,{}),
  r('por',19,25,2.4,GAMA,{}),
  r('por',24,29,2,CAB_A,{dash:true}),
  r('esp',29,37,2.8,cat(MAG1,STRAIT,MAG3,MAG4),{}),
  r('kan',36,42,2.8,cat(MAG5,ELC),{}),
  r('fra',42,45,2.4,CAR1,{})
 ],
 labels:[
  L(7,96,16,'Zheng He',{sub:'1405–1433',nomark:true}),
  L(14,2,-18,'Dias',{sub:'1488',nomark:true}),
  L(19,-45,31,'Colomb',{sub:'1492',nomark:true}),
  L(25,62,-2,'Vasco de Gama',{sub:'1498',nomark:true}),
  L(29,-25,-12,'Cabral',{sub:'1500',nomark:true}),
  L(37,-128,-8,'Magellan',{sub:'1519–1521',nomark:true}),
  L(42,80,-40,'Elcano',{sub:'1522',nomark:true}),
  L(45,-32,54,'Cartier',{sub:'1534',nomark:true}),
  L(17,-46.6,-50,'Tordesillas',{nomark:true,dx:8,al:'left'})
 ],
 pulses:[],
 ph:[
  Ph(0,'Avant : des mondes séparés','Vers 1400, les grandes civilisations se connaissent mal. L’Amérique et l’Océanie vivent sans contact avec l’Europe, l’Afrique et l’Asie.','eur'),
  Ph(9,'1488 – 1522 : trente-quatre ans','De Dias à Elcano, une seule génération de marins relie tous les océans. Les cartes du monde changent complètement.','por'),
  Ph(29,'Le monde devient un','Pour la première fois, des navires font le tour de la Terre. Plantes, animaux, marchandises, idées… et maladies circulent d’un continent à l’autre.','esp'),
  Ph(40,'L’échange colombien','L’Europe reçoit le maïs, la pomme de terre, la tomate, le cacao. L’Amérique reçoit le blé, le cheval, la canne à sucre. Elle reçoit aussi la variole et la rougeole, qui tuent des millions d’Amérindiens.','neo'),
  Ph(48,'Des empires et des esclaves','Espagnols et Portugais conquièrent d’immenses territoires. Pour exploiter les mines et les plantations, ils déportent des millions d’Africains réduits en esclavage : c’est la traite atlantique.','ame'),
  Ph(56,'Découvertes… ou rencontres ?','Ces terres étaient habitées depuis des milliers d’années. Aujourd’hui, les historiens préfèrent parler de « mise en contact » des différentes parties du monde.','kan')
 ],
 photos:[Sh('mercator',1,8,'bl',-2,'contain'),Sh('crops',41,47,'bl',-2)],
 legend:[['zh','Zheng He'],['por','Dias, Gama, Cabral'],['esp','Colomb, Magellan'],['kan','Elcano'],['fra','Cartier'],['eur','Ligne de Tordesillas',true]],
 mots:[['Échange colombien','Circulation de plantes, d’animaux et de maladies entre l’Amérique et le reste du monde après 1492.'],['Traite atlantique','Commerce d’êtres humains : des Africains sont déportés en Amérique pour y être esclaves.'],['Empire colonial','Ensemble des territoires conquis par un pays hors de chez lui.'],['Mondialisation','Mise en relation de toutes les parties du monde.']],
 q:[['Cite trois plantes venues d’Amérique.','Le maïs, la pomme de terre, la tomate (et aussi le cacao, le haricot, le piment).'],['Pourquoi tant d’Amérindiens meurent-ils après 1492 ?','À cause des violences, du travail forcé et surtout des maladies venues d’Europe, contre lesquelles ils n’étaient pas protégés.'],['Pourquoi peut-on discuter le mot « découvertes » ?','Parce que ces terres étaient déjà habitées et connues de leurs habitants.']],
 wiki:['Échange colombien','Traite atlantique','Grandes découvertes']}
];

var SPK=[{sps:{0:'boutre',1:'boutre'}},{sp:'jonque'},{sp:'caravelle'},{sp:'nao',sps:{2:'caravelle'}},{sp:'nao'},{sp:'nao'},{sp:'caravelle'},{sp:'nao'},{sp:'nef'},{sp:'galion'},{sp:'flute'},{sp:'fregate'},{sp:'endeavour'},{sp:'fregate'}];
CH.forEach(function(c,i){var x=SPK[i]||{};if(x.sp)c.sp=x.sp;if(x.sps)c.sps=x.sps;});
A.add({id:'decouvertes',title:'Les Grandes Découvertes',tag:'15 chapitres · une par navigateur, 1400 – 1790',col:'esp',proj:'plan',
 sub:'Le temps des Grandes Découvertes : une carte par navigateur, de Zheng He à La Pérouse.',
 frise:{from:1400,to:1800,lin:true,ticks:[[1400,'1400'],[1450,'1450',1],[1500,'1500'],[1550,'1550',1],[1600,'1600'],[1650,'1650',1],[1700,'1700'],[1750,'1750',1],[1800,'1800']]},
 info:'<p><b>Collège, 5e, histoire</b> : thème 4 du programme adapté à la Nouvelle-Calédonie (thème 3 du programme national) « Transformations de l’Europe et ouverture sur le monde aux XVIe et XVIIe siècles » : le monde au temps de Charles Quint et Soliman le Magnifique (chapitres 1 à 9 et bilan).</p><p><b>Collège, 4e, histoire, programme adapté</b> : thème 1, « Les voyages d’exploration des Européens dans le Pacifique » (chapitres 12 à 14 : Bougainville, Cook, La Pérouse).</p><p><b>Lycée, 2de</b> : « L’ouverture atlantique : les conséquences de la découverte du “Nouveau Monde” » (chapitres 4 à 8 et bilan). À vérifier dans le programme en vigueur.</p><p><b>Cycle 3, Nouvelle-Calédonie</b> : le temps des explorateurs dans le Pacifique, de Mendaña à La Pérouse (chapitres 10 à 14), en lien avec le chapitre 10 du volet Pacifique.</p><p><b>Pour décentrer le regard</b> : Zheng He (chapitre 2), le point de vue des Taïnos (chapitre 4), le bilan (chapitre 15).</p><p><b>En classe</b> : passe en « Mercator » pour montrer la carte des marins (1569) et la comparer au globe ; mesure une traversée avec « Mesurer » pour estimer sa durée à la voile ; affiche « Équateur, tropiques… » pour travailler les repères.</p>',
 chapters:CH});
})();
