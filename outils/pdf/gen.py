# Assemble un dossier d'enquête PDF par enquête : couverture, ordre de mission, pièces, cahiers (primaire, collège), corrigé.
import json, sys, os, io, re
from gen_base import *
X = {}
for _m in ('extras', 'extras2', 'extras3', 'extras4', 'extras5', 'extras6'):   # extras5 = Vivre ensemble (EMC)
    try: X.update(__import__(_m).X)
    except ImportError: pass
from reportlab.platypus import BaseDocTemplate, PageTemplate, Frame, NextPageTemplate, PageBreak, KeepTogether, CondPageBreak
from reportlab.lib.pagesizes import A4

ATLAS = '/home/claude/repo/'; OUT = '/home/claude/dossiers/pdf/'; os.makedirs(OUT, exist_ok=True)
D = json.load(open('/home/claude/dossiers/data.json')); IMG = D['IMG']
W, H = A4; M = 17 * mm; FW = W - 2 * M
PREFIX = {'pacifique': 'P', 'caledonie': 'NC', 'monde': 'PT', 'decouvertes': 'GD', 'geonc': 'GN', 'nickel': 'NI', 'mondial': 'MO', 'emc': 'EMC', 'colonies': 'CO', 'guerres': 'GM', 'monde45': 'M45', 'republique': 'RF'}
COLLEGE_T = {'colonies', 'guerres', 'monde45', 'republique'}   # volets de l’atlas du collège (même liste que gen_build.COLLEGE)
def NOMT(vol): return 'Atlas d’histoire — Collège' if vol in COLLEGE_T else 'Atlas historique du Pacifique'
def code(vol, ci): return PREFIX.get(vol, 'X') + '-%02d' % (ci + 1)
def imgpath(i): return ATLAS + IMG[i]['f']

class StampLine(Flowable):
    def __init__(self, text): Flowable.__init__(self); self.text = text
    def wrap(self, w, h): self.w = w; return (w, 9 * mm)
    def draw(self): stamp(self.canv, self.w - 4 * mm, 4.5 * mm, self.text, 9, -3, anchor='r')

def form_block(e):
    rows = [[Paragraph('<b>' + esc(a) + '</b>', S('fl', 'AtkB', 10, 13, MUTED)), Paragraph(esc(b, 'Type'), S('fv', 'Type', 10.8, 15))] for a, b in e['fields']]
    t = Table(rows, colWidths=[42 * mm, FW - 42 * mm])
    t.setStyle(TableStyle([('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#eef0f2')), ('BACKGROUND', (1, 0), (1, -1), colors.white),
                           ('GRID', (0, 0), (-1, -1), 0.6, colors.HexColor('#9aa3ad')), ('BOX', (0, 0), (-1, -1), 1.4, INK),
                           ('VALIGN', (0, 0), (-1, -1), 'TOP'), ('TOPPADDING', (0, 0), (-1, -1), 6), ('BOTTOMPADDING', (0, 0), (-1, -1), 6)]))
    head = [StampLine('RECONSTITUTION PÉDAGOGIQUE')] if 'reconstitution' in e['src'].lower() else []
    return head + [Paragraph(esc(e['t']).upper(), S('ftt', 'Type', 13, 16, INK)), Spacer(1, 2 * mm), t,
                   Spacer(1, 1.5 * mm), Paragraph(esc(e['src']), ST['src'])]

def doc_flow(d, vol, ci, ch, two):
    k = d['k']; mh = 74 * mm if two else 112 * mm
    if k == 'img':
        im = IMG[d['id']]; return [Photo(imgpath(d['id']), d.get('cap') or im['c'], im['r'], mh, rng(d['id']).choice([-1.2, 0.8, 1.1, -0.7]))]
    if k == 'map':
        return [MapDoc('/home/claude/dossiers/cartes/%s-%d.jpg' % (vol, ci), d.get('cap') or 'Carte de l’atlas : « %s »' % ch['short'],
                       NOMT(vol) + ' · fonds de carte Natural Earth (domaine public), Géorep (gouvernement de la Nouvelle-Calédonie)', 118 * mm if two else 205 * mm)]
    if k == 'txt':
        src = d.get('src', '').lower()
        badge = 'PERSONNAGE FICTIF' if 'fictif' in src else ('RECONSTITUTION PÉDAGOGIQUE' if 'reconstitution' in src else '')
        out = [Sheet('archive', d['t'], d['txt'], d.get('src', ''), badge)]
        if d.get('tp'): out = [KeepTogether(out + [Spacer(1, 3 * mm), Sticky('Note de l’enquêteur : la même chose, en plus court', d['tp'])])]
        return out
    if k == 'tab': return ledger(d['t'], d['cols'], d['rows'], d.get('src'), FW)
    if k == 'frise': t_ = timeline(d['t'], d['items'], FW); return [KeepTogether(t_ if isinstance(t_, list) else [t_])]
    return []

def extra_flow(e):
    if e['kind'] == 'formulaire': return form_block(e)
    out = [Sheet(e['kind'], e['t'], e['txt'], e['src'], 'PERSONNAGE FICTIF' if 'fictif' in e['src'].lower() else '')]
    if e.get('tp'): out = [KeepTogether(out + [Spacer(1, 3 * mm), Sticky('En mots simples', e['tp'])])]
    return out

# ---------- questions sur papier ----------
def qpaper(q, n, key, corr, title=None, head=None):
    k = q['k']; fl = [Paragraph('<b>%d.</b> %s' % (n, esc(title or q['q'])), ST['q']), Spacer(1, 1.5 * mm)]
    if k == 'qcm':
        opts = list(enumerate(q['a'])); rng(key + q['q']).shuffle(opts)
        for j, (i, t) in enumerate(opts):
            fl.append(Paragraph('%s&nbsp; %s. %s' % (BOX, 'ABCD'[j], esc(t)), ST['opt']))
            if i == 0: corr.append((n, '%s. %s' % ('ABCD'[j], t)))
    elif k == 'vf':
        fl.append(Paragraph('<i>Vrai ou faux ?</i>&nbsp;&nbsp;&nbsp; %s&nbsp; Vrai &nbsp;&nbsp;&nbsp;&nbsp; %s&nbsp; Faux' % (BOX, BOX), ST['opt']))
        corr.append((n, ('Vrai' if q['a'] else 'Faux') + (' : ' + q['ex'] if q.get('ex') else '')))
    elif k == 'ordre':
        items = list(q['a']); rng(key + q['q']).shuffle(items)
        if items == q['a']: items = items[1:] + items[:1]
        fl.append(Paragraph('<i>Écris 1, 2, 3… dans les cases, du premier au dernier.</i>', ST['small']))
        for t in items: fl.append(Paragraph('<font name="DJ" size="15">▢</font>&nbsp;&nbsp;' + esc(t), ST['opt']))
        corr.append((n, ' → '.join(q['a'])))
    elif k == 'trou':
        words = re.findall(r'\[([^\]]+)\]', q['q']); bank = list(dict.fromkeys(words + list(q.get('w', []))))
        rng(key + q['q']).shuffle(bank)
        fl[0] = Paragraph('<b>%d.</b> %s' % (n, esc(title or 'Complète avec les mots de la liste.')), ST['q'])
        txt = esc(q['q']); txt = re.sub(r'\[([^\]]+)\]', '<font color="#9aa3ad">____________</font>', txt)
        fl.append(Paragraph(txt, S('tr', 'Atk', 12.5, 22, leftIndent=8 * mm)))
        t = Table([[Paragraph('<b>Mots à placer :</b> &nbsp; ' + ' &nbsp;·&nbsp; '.join(esc(x) for x in bank), ST['card'])]], colWidths=[FW - 8 * mm])
        t.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#f8f3e6')), ('BOX', (0, 0), (-1, -1), 0.6, colors.HexColor('#c9b88f'))]))
        fl += [Spacer(1, 1 * mm), t]; corr.append((n, re.sub(r'\[([^\]]+)\]', lambda m: m.group(1).upper(), q['q'])))
    elif k == 'relie':
        R = [p[1] for p in q['a']]; rng(key + q['q']).shuffle(R)
        rows = [[Paragraph(esc(a[0]), ST['card']), Paragraph('<font name="DJ">●</font>', ST['card']), '',
                 Paragraph('<font name="DJ">●</font>', ST['card']), Paragraph(esc(b), ST['card'])] for a, b in zip(q['a'], R)]
        t = Table(rows, colWidths=[52 * mm, 6 * mm, 30 * mm, 6 * mm, FW - 102 * mm])
        t.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'MIDDLE'), ('TOPPADDING', (0, 0), (-1, -1), 7), ('BOTTOMPADDING', (0, 0), (-1, -1), 7), ('LEFTPADDING', (0, 0), (0, -1), 8 * mm)]))
        fl += [Paragraph('<i>Relie chaque élément de gauche à celui qui va avec, à droite.</i>', ST['small']), t]
        corr.append((n, ' ; '.join('%s = %s' % (a, b) for a, b in q['a'])))
    elif k == 'libre':
        fl.append(Lines(4)); corr.append((n, 'Réponse possible : ' + q['m']))
    fl.append(Spacer(1, 4 * mm))
    if head is not None: fl = [head] + fl
    return [KeepTogether(fl)]

def indices_block(e, n_extra):
    rows = [[Paragraph('<b>Indice n° %d</b><br/><font size="9" color="#5b6470">pièce n° ____</font>' % (i + 1), ST['card']), Lines(2, 8 * mm)] for i in range(len(e['pg']) + 1)]
    t = Table(rows, colWidths=[34 * mm, FW - 34 * mm])
    t.setStyle(TableStyle([('BOX', (0, 0), (-1, -1), 0.8, colors.HexColor('#a8874a')), ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#d8ccb0')),
                           ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#fbf3dc')), ('VALIGN', (0, 0), (-1, -1), 'MIDDLE')]))
    return [Paragraph('Mon carnet d’indices', ST['h2']), Paragraph('Pour chaque pièce, écris en une phrase ce que tu as découvert.', ST['small']), Spacer(1, 2 * mm), t]
