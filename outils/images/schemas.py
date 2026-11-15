#!/usr/bin/env python3
"""Schémas maison de l'atlas (volet Géographie du nickel) : img/profil.jpg, chaine.jpg, indonesie.jpg, coupe.jpg (960 x 720).
Usage : python3 schemas.py  (écrit les quatre JPEG dans le dossier courant)."""
from PIL import Image, ImageDraw, ImageFont
import math, random

FD = '/usr/share/fonts/truetype/dejavu/'
def F(sz, b=False): return ImageFont.truetype(FD + ('DejaVuSans-Bold.ttf' if b else 'DejaVuSans.ttf'), sz)
INK = (24, 32, 44); W, H = 960, 720

def canvas(title, sub=None):
    im = Image.new('RGB', (W, H), (250, 247, 238)); d = ImageDraw.Draw(im)
    d.text((32, 22), title, font=F(34, True), fill=INK)
    if sub: d.text((32, 66), sub, font=F(19), fill=(80, 90, 104))
    return im, d

def arrow(d, a, b, col=INK, w=5, head=16):
    d.line([a, b], fill=col, width=w)
    ang = math.atan2(b[1] - a[1], b[0] - a[0])
    p1 = (b[0] - head * math.cos(ang - 0.45), b[1] - head * math.sin(ang - 0.45))
    p2 = (b[0] - head * math.cos(ang + 0.45), b[1] - head * math.sin(ang + 0.45))
    d.polygon([b, p1, p2], fill=col)

def ctext(d, xy, t, f, col=INK):
    w = d.textlength(t, font=f); d.text((xy[0] - w / 2, xy[1]), t, font=f, fill=col)

def profil():
    im, d = canvas("Pourquoi le nickel est-il là ?", "Coupe d'un sol sur péridotite (schéma, pas à l'échelle)")
    x0, x1 = 60, 560
    layers = [("Cuirasse de fer", "presque pas de nickel", (110, 52, 34), 120, 160),
              ("Latérite (terre rouge)", "≈ 1 à 1,5 % de nickel", (205, 92, 50), 160, 330),
              ("Saprolite à garniérite", "≈ 2 à 3 % de nickel : le plus riche", (150, 170, 90), 330, 470),
              ("Péridotite (roche mère)", "≈ 0,25 % de nickel", (58, 82, 70), 470, 660)]
    random.seed(4)
    for name, sub, col, y0, y1 in layers:
        d.rectangle([x0, y0, x1, y1], fill=col, outline=INK, width=3)
        for _ in range(60 if y0 >= 330 else 25):
            x = random.randint(x0 + 8, x1 - 8); y = random.randint(y0 + 6, y1 - 6); r = random.randint(2, 6)
            c2 = tuple(min(255, max(0, v + random.randint(-30, 30))) for v in col)
            d.ellipse([x - r, y - r, x + r, y + r], fill=c2)
        yy = (y0 + y1) / 2
        d.line([(x1, yy), (x1 + 30, yy)], fill=INK, width=3)
        d.text((x1 + 40, yy - 28), name, font=F(23, True), fill=INK)
        d.text((x1 + 40, yy + 4), sub, font=F(20), fill=(60, 70, 84))
    for x in range(x0 + 10, x1, 38):
        d.line([(x, 120), (x - 6, 100)], fill=(46, 110, 60), width=4); d.line([(x, 120), (x + 7, 102)], fill=(46, 110, 60), width=4)
    for x in range(90, 540, 60):
        d.line([(x, 92), (x - 6, 108)], fill=(40, 110, 200), width=3)
    arrow(d, (110, 170), (110, 440), (30, 100, 200), 6, 20)
    d.text((124, 250), "L'eau de pluie\nemporte le nickel\nvers le bas", font=F(19, True), fill=(250, 250, 250), spacing=4)
    d.text((32, 674), "Épaisseur : de quelques mètres à plus de 40 m. Sources : IRD, Atlas de la Nouvelle-Calédonie.", font=F(16), fill=(80, 90, 104))
    im.save('profil.jpg', quality=88)

def chaine():
    im, d = canvas("Du massif au client : la chaîne du nickel", "Chaque étape a sa place sur la carte")
    boxes = [("1. La mine", "à ciel ouvert, en gradins,\nen haut des massifs", (205, 92, 50)),
             ("2. Le transport", "camions, pistes,\nconvoyeur (Koniambo)", (230, 170, 40)),
             ("3. Le bord de mer", "stock de minerai,\nwharf, chalands", (120, 140, 160)),
             ("4. Le minéralier", "grand navire qui sort\ndu lagon par une passe", (40, 90, 140)),
             ("5. L'usine", "fours (Doniambo,\nVavouto) ou acide\n(usine du Sud)", (112, 72, 232)),
             ("6. Le client", "acier inoxydable,\nbatteries (Asie, Europe)", (46, 140, 90))]
    pos = [(40, 120), (350, 120), (660, 120), (660, 420), (350, 420), (40, 420)]
    bw, bh = 260, 220
    for (t, s, col), (x, y) in zip(boxes, pos):
        d.rounded_rectangle([x, y, x + bw, y + bh], 18, fill=(255, 255, 255), outline=col, width=6)
        d.rounded_rectangle([x, y, x + bw, y + 56], 18, fill=col)
        d.rectangle([x, y + 36, x + bw, y + 56], fill=col)
        ctext(d, (x + bw / 2, y + 12), t, F(24, True), (255, 255, 255))
        d.multiline_text((x + 18, y + 78), s, font=F(19), fill=INK, spacing=6)
    for k in range(4): d.rectangle([110 + k * 14, 320 - k * 14, 230 - k * 14, 334 - k * 14], fill=(205, 92, 50), outline=INK)
    d.rectangle([420, 290, 500, 320], fill=(230, 170, 40), outline=INK, width=2); d.rectangle([500, 300, 530, 320], fill=(230, 170, 40), outline=INK, width=2)
    for cx in (440, 485, 520): d.ellipse([cx - 10, 316, cx + 10, 336], fill=INK)
    d.polygon([(700, 330), (760, 286), (820, 330)], fill=(176, 92, 52), outline=INK)
    d.polygon([(690, 600), (900, 600), (880, 625), (710, 625)], fill=(40, 44, 52), outline=INK)
    d.rectangle([700, 575, 730, 600], fill=(240, 236, 226), outline=INK)
    d.rectangle([400, 585, 520, 625], fill=(112, 72, 232), outline=INK, width=2); d.rectangle([490, 545, 505, 585], fill=(112, 72, 232), outline=INK, width=2)
    d.ellipse([100, 570, 150, 620], fill=(200, 205, 210), outline=INK, width=3); d.rectangle([170, 575, 230, 620], fill=(46, 140, 90), outline=INK, width=3); d.rectangle([190, 566, 210, 575], fill=INK)
    for a, b in [((300, 230), (350, 230)), ((610, 230), (660, 230)), ((790, 340), (790, 420)), ((660, 530), (610, 530)), ((350, 530), (300, 530))]:
        arrow(d, a, b, INK, 6, 18)
    d.text((32, 676), "Schéma simplifié. Une partie du minerai part sans être transformée ici (minerai brut exporté).", font=F(16), fill=(80, 90, 104))
    im.save('chaine.jpg', quality=88)

def indonesie():
    im, d = canvas("Un concurrent géant : l'Indonésie", "Part de l'Indonésie dans la production mondiale de nickel")
    base = 600; top = 170; x = 180
    for an, v in [("2020", 31), ("2024", 60)]:
        h = (base - top) * v / 100
        d.rectangle([x, top, x + 200, base], fill=(225, 228, 232), outline=INK, width=2)
        d.rectangle([x, base - h, x + 200, base], fill=(196, 48, 43), outline=INK, width=3)
        ctext(d, (x + 100, base - h - 46), f"≈ {v} %", F(34, True))
        ctext(d, (x + 100, base + 14), an, F(28, True))
        x += 340
    d.text((740, 250), "barre entière =\ntoute la production\ndu monde", font=F(18), fill=(80, 90, 104), spacing=4)
    d.line([(150, base), (860, base)], fill=INK, width=3)
    d.text((32, 668), "Sources : S&P Global Market Intelligence, IRIS (2026). La Nouvelle-Calédonie produit beaucoup moins.", font=F(16), fill=(80, 90, 104))
    im.save('indonesie.jpg', quality=88)

def coupe():
    im, d = canvas("La Grande Terre en coupe, d'ouest en est", "Schéma, pas à l'échelle (l'île fait environ 50 km de large)")
    d.rectangle([0, 470, W, 640], fill=(120, 180, 220))
    prof = [(0, 470), (70, 470), (110, 455), (230, 440), (330, 420), (400, 330), (450, 240), (500, 200), (545, 230), (600, 300), (650, 380),
            (700, 430), (760, 455), (800, 470), (W, 470), (W, 640), (0, 640)]
    d.polygon(prof, fill=(205, 186, 140), outline=INK)
    d.polygon([(250, 438), (290, 380), (330, 365), (360, 380), (375, 424), (330, 420)], fill=(176, 72, 40), outline=INK)
    d.text((236, 336), "massif minier", font=F(18, True), fill=(140, 50, 20))
    for xr in (40, 900): d.rectangle([xr, 462, xr + 18, 474], fill=(240, 240, 230), outline=INK)
    d.text((10, 486), "récif", font=F(16), fill=INK); d.text((872, 486), "récif", font=F(16), fill=INK)
    d.text((60, 520), "LAGON", font=F(20, True), fill=(20, 60, 100)); d.text((820, 520), "LAGON", font=F(20, True), fill=(20, 60, 100))
    for x in range(120, 240, 34): d.line([(x, 452), (x, 432)], fill=(110, 120, 60), width=4); d.ellipse([x - 9, 420, x + 9, 436], fill=(150, 160, 90))
    for x in range(600, 780, 26):
        d.line([(x, 420 + (x - 600) * 0.2), (x, 395 + (x - 600) * 0.2)], fill=(30, 90, 40), width=5)
        d.ellipse([x - 13, 378 + (x - 600) * 0.2, x + 13, 404 + (x - 600) * 0.2], fill=(40, 130, 60))
    for cx in (620, 720, 820):
        d.ellipse([cx - 50, 130, cx + 50, 180], fill=(200, 205, 215), outline=INK)
        for k in range(5): d.line([(cx - 30 + k * 15, 186), (cx - 38 + k * 15, 216)], fill=(40, 110, 200), width=3)
    arrow(d, (930, 110), (770, 110), (40, 110, 200), 6, 20); d.text((700, 70), "alizés (vent d'est)", font=F(19, True), fill=(40, 110, 200))
    ctext(d, (500, 160), "Chaîne centrale", F(22, True)); d.line([(500, 188), (500, 205)], fill=INK, width=3)
    d.multiline_text((40, 190), "CÔTE OUEST\nplaines, savanes,\nélevage, plus sec", font=F(20, True), fill=INK, spacing=5)
    d.multiline_text((690, 260), "CÔTE EST\nvallées étroites,\nforêts, très pluvieux", font=F(20, True), fill=INK, spacing=5)
    d.text((32, 670), "Ouest", font=F(22, True), fill=INK); d.text((W - 90, 670), "Est", font=F(22, True), fill=INK)
    arrow(d, (130, 684), (W - 110, 684), INK, 3, 14)
    im.save('coupe.jpg', quality=88)

if __name__ == '__main__':
    profil(); chaine(); indonesie(); coupe(); print('ok')
