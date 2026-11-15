# Éléments visuels des dossiers d'enquête (reportlab) : polices, styles, pièces, questions papier.
import re, zlib, random
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.platypus import Flowable, Paragraph, Table, TableStyle, Spacer
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from PIL import Image as PILImage

F = '/home/claude/fonts/'
FONTS = [('Atk', 'AtkinsonHyperlegible-Regular.ttf'), ('AtkB', 'AtkinsonHyperlegible-Bold.ttf'), ('AtkI', 'AtkinsonHyperlegible-Italic.ttf'),
         ('Type', 'SpecialElite.ttf'), ('Fell', 'IMFeFCrm28P.ttf'), ('FellI', 'IMFeFCit28P.ttf'), ('Hand', 'PatrickHand-Regular.ttf'),
         ('Stamp', 'BlackOpsOne-Regular.ttf')]
for n, f in FONTS: pdfmetrics.registerFont(TTFont(n, F + f))
DJ_PATH = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
pdfmetrics.registerFont(TTFont('DJ', DJ_PATH))
from reportlab.lib.fonts import addMapping
addMapping('Atk', 0, 0, 'Atk'); addMapping('Atk', 1, 0, 'AtkB'); addMapping('Atk', 0, 1, 'AtkI'); addMapping('Atk', 1, 1, 'AtkB')

INK = colors.HexColor('#1b2430'); BROWN = colors.HexColor('#6b4100'); RED = colors.HexColor('#b3261e')
MUTED = colors.HexColor('#5b6470'); KRAFT = colors.HexColor('#c9a46a'); PAPER = colors.HexColor('#fbf8f1')
EMO = re.compile('[\U0001F000-\U0001FAFF⌀-➿⬀-⯿️‍]')

def clean(t, font='Atk'):
    t = EMO.sub('', str(t)).replace(' ', ' ').strip()
    if font == 'Fell': t = t.replace('≈', 'environ ')
    return t
from fontTools.ttLib import TTFont as _FT
CM = {n: set(_FT(F + f).getBestCmap()) for n, f in FONTS if n != 'Stamp'}
DJCM = set(_FT(DJ_PATH).getBestCmap())
def esc(t, font='Atk'):
    s = clean(t, font).replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;'); cm = CM.get(font, CM['Atk'])
    return ''.join(ch if ord(ch) in cm or ord(ch) < 128 else ('<font name="DJ">%s</font>' % ch if ord(ch) in DJCM else ch) for ch in s)
BOX = '<font name="DJ">☐</font>'
def rng(key): return random.Random(zlib.crc32(key.encode('utf-8')))

def S(name, font='Atk', size=11.5, lead=None, color=INK, **kw):
    return ParagraphStyle(name, fontName=font, fontSize=size, leading=lead or size * 1.38, textColor=color, **kw)
ST = {
    'body': S('body'), 'small': S('small', size=9, color=MUTED), 'q': S('q', 'AtkB', 12),
    'opt': S('opt', size=11.5, leftIndent=8 * mm), 'h1': S('h1', 'AtkB', 18, color=INK, spaceAfter=4),
    'h2': S('h2', 'AtkB', 13.5, color=BROWN, spaceBefore=8, spaceAfter=4, keepWithNext=1), 'type': S('type', 'Type', 10.6, 15.5),
    'hand': S('hand', 'Hand', 13.2, 19.84), 'fell': S('fell', 'Fell', 13.2, 18.5), 'card': S('card', 'Atk', 11.5, 16),
    'src': S('src', 'AtkI', 8.6, 11, MUTED), 'cap': S('cap', 'AtkB', 10.5, 13), 'sticky': S('sticky', 'Hand', 12.6, 16),
}

class Anchor(Flowable):
    """Note la page où il apparaît (sommaire en deux passes)."""
    def __init__(self, key, book): Flowable.__init__(self); self.key, self.book = key, book
    def wrap(self, w, h): return (0, 0)
    def draw(self): self.book[self.key] = self.canv.getPageNumber()

class PieceTag(Flowable):
    def __init__(self, n, title, note=''):
        Flowable.__init__(self); self.n, self.title, self.note = n, title, note
    def wrap(self, w, h):
        self.w = w; self.p = Paragraph(esc(self.title), S('pt', 'AtkB', 13.5, 16))
        self.ph = self.p.wrap(w - 52 * mm, 40 * mm)[1]; self.h = max(15 * mm, self.ph + 6 * mm); return (w, self.h)
    def draw(self):
        c = self.canv; h = self.h; y = h / 2
        c.setFillColor(colors.HexColor('#e8cf96')); c.setStrokeColor(colors.HexColor('#a8874a')); c.setLineWidth(0.8)
        p = c.beginPath(); p.moveTo(6 * mm, y - 5.5 * mm); p.lineTo(44 * mm, y - 5.5 * mm); p.lineTo(44 * mm, y + 5.5 * mm)
        p.lineTo(6 * mm, y + 5.5 * mm); p.lineTo(1 * mm, y + 2 * mm); p.lineTo(1 * mm, y - 2 * mm); p.close(); c.drawPath(p, fill=1, stroke=1)
        c.setFillColor(colors.white); c.circle(5 * mm, y, 1.3 * mm, fill=1, stroke=1)
        c.setStrokeColor(colors.HexColor('#8a6d3b')); c.setLineWidth(0.6); c.bezier(5 * mm, y, 2 * mm, y + 6 * mm, -2 * mm, y + 3 * mm, -3 * mm, y + 7 * mm)
        c.setFillColor(INK); c.setFont('Stamp', 12.5); c.drawString(8.5 * mm, y - 1.6 * mm, 'PIÈCE N° %d' % self.n)
        self.p.drawOn(c, 50 * mm, y - self.ph / 2 + 1)
        c.setStrokeColor(colors.HexColor('#d8ccb0')); c.setLineWidth(0.6); c.line(50 * mm, 1, self.w, 1)

class Photo(Flowable):
    """Photo tirée sur papier, scotchée, avec légende et crédit."""
    def __init__(self, path, cap, cred, maxh=105 * mm, rot=0):
        Flowable.__init__(self); self.path, self.cap, self.cred, self.maxh, self.rot = path, cap, cred, maxh, rot
        im = PILImage.open(path); self.ar = im.width / im.height
    def wrap(self, w, h):
        iw = min(w * 0.86, self.maxh * self.ar); ih = iw / self.ar
        if ih > self.maxh: ih = self.maxh; iw = ih * self.ar
        self.iw, self.ih, self.w = iw, ih, w
        self.pc = Paragraph(esc(self.cap) + '<br/><font name="AtkI" size="8.3" color="#5b6470">' + esc(self.cred) + '</font>', ST['cap'])
        self.pch = self.pc.wrap(iw, 50 * mm)[1]; self.h = ih + self.pch + 16 * mm; return (w, self.h)
    def draw(self):
        c = self.canv; fw = self.iw + 8 * mm; fh = self.ih + self.pch + 11 * mm; x = (self.w - fw) / 2; y = 2.5 * mm
        c.saveState(); c.translate(x + fw / 2, y + fh / 2); c.rotate(self.rot); c.translate(-fw / 2, -fh / 2)
        c.setFillColor(colors.HexColor('#00000022', hasAlpha=True)); c.rect(1.4 * mm, -1.4 * mm, fw, fh, fill=1, stroke=0)
        c.setFillColor(colors.white); c.setStrokeColor(colors.HexColor('#d9d4c7')); c.rect(0, 0, fw, fh, fill=1, stroke=1)
        c.drawImage(self.path, 4 * mm, self.pch + 7 * mm, self.iw, self.ih)
        self.pc.drawOn(c, 4 * mm, 3.5 * mm)
        c.setFillColor(colors.HexColor('#f3e39acc', hasAlpha=True))
        for tx, a in [(-3 * mm, 32), (fw - 13 * mm, -32)]:
            c.saveState(); c.translate(tx + 8 * mm, fh - 1 * mm); c.rotate(a); c.rect(-9 * mm, -2.8 * mm, 18 * mm, 5.6 * mm, fill=1, stroke=0); c.restoreState()
        c.restoreState()

class Sheet(Flowable):
    """Document papier : carnet, lettre, tapuscrit, fiche, officiel, archive."""
    def __init__(self, kind, title, text, src='', badge=''):
        Flowable.__init__(self); self.kind, self.title, self.text, self.src, self.badge = kind, title, text, src, badge
    def wrap(self, w, h):
        k = self.kind; self.w = w; pad = 9 * mm; left = pad + (10 * mm if k == 'carnet' else 0)
        st = {'carnet': ST['hand'], 'lettre': ST['fell'], 'tapuscrit': ST['type'], 'officiel': ST['type']}.get(k, ST['card'])
        font = st.fontName; self.left = left; iw = w - left - pad
        self.ps = [Paragraph(esc(p, font), st) for p in str(self.text).split('\n') if p.strip()]
        self.hs = [p.wrap(iw, 300 * mm)[1] for p in self.ps]
        self.pt = Paragraph(esc(self.title), S('st', 'AtkB', 12.5, 15, BROWN if k != 'fiche' else INK)); self.th = self.pt.wrap(iw, 40 * mm)[1]
        self.psrc = Paragraph(esc(self.src), ST['src']); self.sh = self.psrc.wrap(iw, 30 * mm)[1] if self.src else 0
        gap = 3.2 * mm; self.h = 9 * mm + self.th + 4 * mm + sum(self.hs) + gap * (len(self.ps) - 1) + (self.sh + 4 * mm) + 7 * mm
        self.gap = gap; return (w, self.h)
    def draw(self):
        c = self.canv; k = self.kind; w, h = self.w, self.h
        bg = {'lettre': '#f2e4c4', 'carnet': '#fdfcf5', 'tapuscrit': '#ffffff', 'officiel': '#ffffff', 'fiche': '#ffffff', 'archive': '#f6f1e4'}.get(k, '#ffffff')
        c.setFillColor(colors.HexColor('#00000018', hasAlpha=True)); c.rect(1.5 * mm, -1.5 * mm, w, h, fill=1, stroke=0)
        c.setFillColor(colors.HexColor(bg)); c.setStrokeColor(colors.HexColor('#d6ccb4')); c.setLineWidth(0.6); c.rect(0, 0, w, h, fill=1, stroke=1)
        if k == 'carnet':
            c.setStrokeColor(colors.HexColor('#b9d3ee')); y = h - 16 * mm
            while y > 4 * mm: c.line(4 * mm, y, w - 3 * mm, y); y -= 7 * mm
            c.setStrokeColor(colors.HexColor('#e7a1a1')); c.line(self.left - 3 * mm, 2, self.left - 3 * mm, h - 2)
            c.setFillColor(colors.white); c.setStrokeColor(colors.HexColor('#9aa3ad'))
            y = h - 9 * mm
            while y > 6 * mm: c.circle(5 * mm, y, 1.8 * mm, fill=1, stroke=1); y -= 11 * mm
        elif k == 'fiche':
            c.setFillColor(colors.HexColor('#dbe9f6')); c.rect(0, h - self.th - 11 * mm, w, self.th + 11 * mm, fill=1, stroke=0)
            c.setStrokeColor(colors.HexColor('#e29a9a')); c.line(0, h - self.th - 11 * mm, w, h - self.th - 11 * mm)
        elif k == 'lettre':
            c.setStrokeColor(colors.HexColor('#b08a5a55', hasAlpha=True)); c.setLineWidth(2.2); c.circle(w - 22 * mm, 20 * mm, 11 * mm, stroke=1, fill=0)
        elif k in ('tapuscrit', 'officiel'):
            c.setFillColor(colors.HexColor('#3a5a80' if k == 'officiel' else '#9aa3ad')); c.rect(0, 0, 2.2 * mm, h, fill=1, stroke=0)
        y = h - 8 * mm - self.th; self.pt.drawOn(c, self.left, y); y -= 4 * mm
        for p, ph in zip(self.ps, self.hs):
            y -= ph; p.drawOn(c, self.left, y); y -= self.gap
        if self.src: self.psrc.drawOn(c, self.left, 5.5 * mm)
        if self.badge: stamp(c, w - 8 * mm, h - 7 * mm, self.badge, 8.5, -6, anchor='r')

def stamp(c, x, y, text, size=11, rot=-8, col=RED, anchor='c'):
    c.saveState(); c.translate(x, y); c.rotate(rot); c.setFont('Stamp', size); tw = c.stringWidth(text, 'Stamp', size)
    x0 = {'c': -tw / 2, 'r': -tw, 'l': 0}[anchor]; c.setStrokeColor(col); c.setFillColor(col); c.setLineWidth(1.4)
    c.roundRect(x0 - 2.2 * mm, -size * 0.45, tw + 4.4 * mm, size * 1.45, 1.5 * mm, stroke=1, fill=0)
    c.drawString(x0, -size * 0.12, text); c.restoreState()

class Sticky(Flowable):
    def __init__(self, title, text, width=110 * mm): Flowable.__init__(self); self.title, self.text, self.width = title, text, width
    def wrap(self, w, h):
        self.p = Paragraph('<font name="AtkB" size="10">' + esc(self.title) + '</font><br/>' + esc(self.text, 'Hand').replace('\n', '<br/>'), ST['sticky'])
        self.ph = self.p.wrap(self.width - 12 * mm, 200 * mm)[1]; self.h = self.ph + 14 * mm; self.w = w; return (w, self.h)
    def draw(self):
        c = self.canv; x = self.w - self.width - 2 * mm; c.saveState(); c.translate(x, 2 * mm); c.rotate(1.2)
        c.setFillColor(colors.HexColor('#00000020', hasAlpha=True)); c.rect(1.2 * mm, -1.2 * mm, self.width, self.ph + 10 * mm, fill=1, stroke=0)
        c.setFillColor(colors.HexColor('#fff1a0')); c.rect(0, 0, self.width, self.ph + 10 * mm, fill=1, stroke=0)
        self.p.drawOn(c, 6 * mm, 5 * mm); c.restoreState()

class Lines(Flowable):
    def __init__(self, n=3, step=9 * mm): Flowable.__init__(self); self.n, self.step = n, step
    def wrap(self, w, h): self.w = w; return (w, self.n * self.step + 2 * mm)
    def draw(self):
        c = self.canv; c.setStrokeColor(colors.HexColor('#b8c2cc')); c.setLineWidth(0.6)
        for i in range(self.n): y = (i + 0.3) * self.step; c.line(8 * mm, y, self.w, y)

def ledger(title, cols, rows, src, w):
    data = [[Paragraph('<b>' + esc(x) + '</b>', ST['card']) for x in cols]] + [[Paragraph(esc(x), ST['card']) for x in r] for r in rows]
    n = len(cols); cw = [w * 0.34] + [(w * 0.66) / (n - 1)] * (n - 1) if n > 1 else [w]
    t = Table(data, colWidths=cw, repeatRows=1)
    t.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#e7dcc2')), ('BACKGROUND', (0, 1), (-1, -1), colors.HexColor('#f8f3e6')),
                           ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#c9b88f')), ('VALIGN', (0, 0), (-1, -1), 'TOP'),
                           ('TOPPADDING', (0, 0), (-1, -1), 5), ('BOTTOMPADDING', (0, 0), (-1, -1), 5)]))
    return [Paragraph(esc(title), S('lt', 'AtkB', 12.5, 15, BROWN, keepWithNext=1)), Spacer(1, 3 * mm), t, Spacer(1, 1.5 * mm), Paragraph(esc(src or ''), ST['src'])]

def timeline(title, items, w):
    data = [[Paragraph('<b>' + esc(d) + '</b>', S('fd', 'AtkB', 12, 15, RED)), Paragraph(esc(t), ST['card'])] for d, t in items]
    t = Table(data, colWidths=[34 * mm, w - 34 * mm])
    t.setStyle(TableStyle([('LINEBEFORE', (1, 0), (1, -1), 2.2, colors.HexColor('#c2410c')), ('VALIGN', (0, 0), (-1, -1), 'TOP'),
                           ('LEFTPADDING', (1, 0), (1, -1), 10), ('TOPPADDING', (0, 0), (-1, -1), 6), ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
                           ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#f8f3e6'))]))
    return [Paragraph(esc(title), S('ft', 'AtkB', 12.5, 15, BROWN)), Spacer(1, 3 * mm), t]
