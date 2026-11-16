# Recherche Library of Congress (Prints & Photographs). Usage : loc.py [-n N] "requête" ...
import sys, json, urllib.request, urllib.parse
args = sys.argv[1:]; n = 6
if args and args[0] == '-n': n = int(args[1]); args = args[2:]
def q(s):
    u = 'https://www.loc.gov/pictures/search/?' + urllib.parse.urlencode({'q': s, 'fo': 'json', 'c': n})
    d = json.load(urllib.request.urlopen(urllib.request.Request(u, headers={'User-Agent': 'atlas-classe/1.0'}), timeout=40))
    print('##', s, d['search']['hits'])
    for r in d['results']:
        img = (r.get('image') or {}).get('full') or ''
        if not img or 'notdigitized' in img or img.endswith('.gif'): continue
        print('  ', img.split('/pnp/')[-1], '|', (r.get('created_published_date') or '')[:22], '|', (r.get('title') or '')[:105])
for s in args:
    try: q(s)
    except Exception as e: print('ERR', s, e)
