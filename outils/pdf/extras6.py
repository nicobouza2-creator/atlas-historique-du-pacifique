# Pièces supplémentaires des dossiers d'enquête de l'atlas du collège, volet « Conquêtes et sociétés coloniales » :
# une par enquête + sa question (parcours guidé qp, parcours autonome qc). Fiches de l'atlas, sans personnage inventé.
def Q(q, a): return {'k': 'qcm', 'q': q, 'a': a}
def V(q, ok): return {'k': 'vf', 'q': q, 'a': ok}
def W(q, m): return {'k': 'libre', 'q': q, 'm': m}

X = {
'colonies-1': dict(kind='fiche', t='Fiche : colonie ou protectorat ?', src='Fiche de l’atlas.',
 txt="Dans une colonie, la France gouverne directement : un gouverneur nommé par Paris dirige le territoire. C'est le cas de la Nouvelle-Calédonie ou de la Cochinchine.\nDans un protectorat, le souverain reste en place : le bey à Tunis, le sultan au Maroc, l'empereur en Annam. Mais un résident français décide de l'essentiel : l'armée, les impôts, les relations avec les autres pays.\nDans les deux cas, les habitants ne choisissent pas ceux qui les gouvernent.",
 qp=Q('Dans un protectorat, qui décide de l’essentiel ?', ['Le résident français', 'Le souverain local, seul', 'Les habitants, par un vote']),
 qc=W('Explique la différence entre une colonie et un protectorat, avec un exemple de chaque.', 'Dans une colonie (Nouvelle-Calédonie, Cochinchine), la France gouverne directement par un gouverneur. Dans un protectorat (Tunisie, Maroc, Annam), le souverain reste en place, mais un résident français décide de l’essentiel. Dans les deux cas, les habitants ne décident pas.')),
'colonies-2': dict(kind='fiche', t='Fiche : des frontières tracées à la règle', src='Fiche de l’atlas.',
 txt="Regarde la frontière entre l'Égypte et la Libye, ou entre l'Algérie et le Mali : de longues lignes droites.\nElles ont été tracées en Europe, sur des cartes, par des diplomates qui ne connaissaient pas le terrain. Ils ont souvent suivi un méridien ou un parallèle.\nRésultat : des peuples se retrouvent coupés en deux par une frontière ; d'autres, qui ne s'entendaient pas, sont réunis dans la même colonie. La plupart de ces frontières sont devenues celles des États africains d'aujourd'hui.",
 qp=V('Les frontières de l’Afrique ont été tracées par les Africains eux-mêmes.', 0),
 qc=W('Pourquoi tant de frontières africaines sont-elles des lignes droites ? Quelle conséquence pour les peuples ?', 'Elles ont été tracées en Europe, sur des cartes, sans tenir compte du terrain ni des habitants. Des peuples sont coupés en deux ; d’autres, parfois rivaux, sont réunis dans la même colonie, puis dans le même État.')),
'colonies-4': dict(kind='fiche', t='Fiche : à combien de temps de la France ?', src='Fiche de l’atlas ; durées données en ordre de grandeur.',
 txt="Vers 1860, un voilier met environ quatre mois pour aller de France en Nouvelle-Calédonie, en contournant l'Afrique par le cap de Bonne-Espérance.\nAprès l'ouverture du canal de Suez (1869), avec les paquebots à vapeur, le voyage dure moins de deux mois dans les années 1880.\nLe courrier, les ordres du gouvernement et les renforts mettent donc des semaines à arriver. Sur place, le gouverneur décide presque seul.",
 qp=Q('Vers 1860, combien de temps dure le voyage de France en Nouvelle-Calédonie en voilier ?', ['Environ quatre mois', 'Une semaine', 'Deux ans']),
 qc=W('Quelle conséquence cette distance a-t-elle sur la façon de gouverner la colonie ?', 'Les ordres de Paris mettent des semaines ou des mois à arriver : le gouverneur, sur place, décide presque seul, et la métropole contrôle peu ce qui se passe dans la colonie.')),
}
