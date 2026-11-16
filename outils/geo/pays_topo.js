/* Étape 1 de js/pays.js : pays actuels (Natural Earth 1:50 m, domaine public, paquet npm world-atlas)
   → GeoJSON simplifié en gardant les frontières communes. node pays_topo.js <node_modules> <sortie.geojson> */
const path=require('path'),fs=require('fs'),nm=process.argv[2];
const topojson=Object.assign({},require(path.join(nm,'topojson-client')),require(path.join(nm,'topojson-simplify')));
const iso=require(path.join(nm,'i18n-iso-countries'));
let topo=JSON.parse(fs.readFileSync(path.join(nm,'world-atlas/countries-50m.json'),'utf8'));
topo=topojson.presimplify(topo);
topo=topojson.simplify(topo,0.012);           // seuil d'aire (degrés carrés) : frontières communes conservées
const fc=topojson.feature(topo,topo.objects.countries);
const SANS={'Kosovo':'XKX','N. Cyprus':'XNC','Somaliland':'XSO','Siachen Glacier':'XSG','Indian Ocean Ter.':'XIO','Ashmore and Cartier Is.':'XAC'};
fc.features.forEach(f=>{const n=f.properties.name;let c=f.id!=null?iso.numericToAlpha3(String(f.id).padStart(3,'0')):null;f.properties={c:c||SANS[n]||('X'+n.replace(/[^A-Za-z]/g,'').slice(0,4).toUpperCase()),n:n};delete f.id;});
fs.writeFileSync(process.argv[3],JSON.stringify(fc));
console.log(fc.features.length,'pays');
