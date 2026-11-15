# Pièces en plus des volets déjà publiés, relues dans les PDF (extract_extras.py -> extras.json).
import json, os
X = {k: v for k, v in json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'extras.json'), encoding='utf-8')).items() if not k.startswith('emc-')}
