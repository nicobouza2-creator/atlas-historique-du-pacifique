import json,subprocess,sys,urllib.parse
B="https://services1.arcgis.com/TZcrgU6CIbqWt9Qv/arcgis/rest/services/"
def get(u):
    r=subprocess.run(['curl','-s','-m','120',u],capture_output=True,text=True).stdout
    return json.loads(r)
def layers(svc):
    d=get(B+urllib.parse.quote(svc)+"/FeatureServer?f=json")
    return [(l['id'],l['name']) for l in d.get('layers',[])]
def fetch(svc,lid=0,off=0.0015,where='1=1'):
    feats=[];o=0
    while True:
        q={'where':where,'outFields':'*','outSR':'4326','f':'geojson','resultOffset':o,'resultRecordCount':1000,'geometryPrecision':5}
        if off: q['maxAllowableOffset']=off
        d=get(B+urllib.parse.quote(svc)+"/FeatureServer/%d/query?"%lid+urllib.parse.urlencode(q))
        fs=d.get('features',[]);feats+=fs
        if not d.get('properties',{}).get('exceededTransferLimit') and not d.get('exceededTransferLimit') or not fs: break
        o+=len(fs)
    return {'type':'FeatureCollection','features':feats}
if __name__=='__main__':
    svc=sys.argv[1]
    if len(sys.argv)>2 and sys.argv[2]=='layers': print(layers(svc));sys.exit()
    lid=int(sys.argv[2]) if len(sys.argv)>2 else 0
    off=float(sys.argv[3]) if len(sys.argv)>3 else 0.0015
    fc=fetch(svc,lid,off)
    json.dump(fc,open(svc+'_%d.geojson'%lid,'w'))
    print(svc,lid,len(fc['features']),'entités', list(fc['features'][0]['properties'].keys())[:10] if fc['features'] else '')
