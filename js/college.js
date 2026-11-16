/* Espace collège : programmes adaptés 6e-3e, fiche séance (trame du livret d'accueil HG-EMC), séquence et évaluation, méthode, suite.
   Version reprise le 17/11/2026 de l'artefact publié, où une autre conversation avait ajouté les trois volets de 3e
   (code minifié remis en forme ; l'ancienne version commentée est dans l'historique git, commit 6ad1ef7). */
!function() {
    "use strict";
    var e = window.ATLAS;
    if (e && e.api) {
        e.api;
        window.COLLEGE = {
            PROG: {
                "6e": {
                    H: [ {
                        t: "Thème 1 — La longue histoire de l’humanité et des migrations",
                        s: [ [ "Les débuts de l’humanité", "ok", [ [ "P", "monde", "ch. 1 à 6" ] ] ], [ "La « révolution » néolithique", "ok", [ [ "P", "monde", "ch. 7" ] ] ], [ "Le peuplement du Pacifique", "ok", [ [ "P", "pacifique", "ch. 3 à 9" ], [ "P", "monde", "ch. 8" ] ], 1 ], [ "Premiers États, premières écritures", "todo", [], 0, "Orient ancien : Égypte ou Mésopotamie" ] ]
                    }, {
                        t: "Thème 2 — Récits fondateurs, croyances et citoyenneté dans la Méditerranée antique au Ier millénaire avant J.-C.",
                        s: [ [ "Le monde des cités grecques", "todo", [] ], [ "Rome du mythe à l’histoire", "todo", [] ], [ "La naissance du monothéisme juif dans un monde polythéiste", "todo", [] ] ]
                    }, {
                        t: "Thème 3 — L’empire romain dans le monde antique",
                        s: [ [ "Conquêtes, paix romaine et romanisation", "todo", [] ], [ "Des chrétiens dans l’empire", "todo", [] ], [ "Les relations de l’empire romain avec les autres mondes anciens : l’ancienne route de la soie et la Chine des Han", "todo", [] ] ]
                    } ],
                    G: [ {
                        t: "Thème 1 — Habiter une métropole",
                        s: [ [ "Les métropoles et leurs habitants", "part", [ [ "P", "mondial", "ch. 5" ] ] ], [ "La ville de demain", "todo", [] ] ]
                    }, {
                        t: "Thème 2 — Habiter un espace de faible densité",
                        s: [ [ "Habiter un espace à forte(s) contrainte(s) naturelle(s) ou/et de grande biodiversité", "part", [ [ "P", "mondial", "ch. 3" ], [ "P", "geonc", "ch. 4" ] ] ], [ "Habiter un espace de faible densité à vocation agricole", "part", [ [ "P", "geonc", "ch. 4 et 6" ] ] ] ]
                    }, {
                        t: "Thème 3 — Habiter les littoraux",
                        s: [ [ "Littoral industrialo-portuaire, littoral touristique", "part", [ [ "P", "geonc", "ch. 7" ], [ "P", "nickel", "ch. 4" ] ], 0, "étude de cas possible en Nouvelle-Calédonie" ] ]
                    }, {
                        t: "Thème 4 — Le monde habité",
                        s: [ [ "La répartition de la population mondiale et ses dynamiques", "ok", [ [ "P", "mondial", "ch. 4" ], [ "P", "monde", "ch. 9" ] ] ], [ "La variété des formes d’occupation spatiale dans le monde", "part", [ [ "P", "mondial", "ch. 5" ] ] ] ]
                    } ],
                    E: [ {
                        t: "Apprendre à vivre dans une société démocratique",
                        s: [ [ "Représenter les autres et servir l’intérêt général", "part", [ [ "P", "emc", "ch. 1 à 3" ] ] ], [ "Respecter des règles et en comprendre la finalité : l’exemple de la laïcité à l’École", "ok", [ [ "P", "emc", "ch. 7" ] ] ], [ "Avoir des droits en tant que personne et respecter ceux des autres : l’exemple du droit à la vie privée", "todo", [] ] ]
                    } ]
                },
                "5e": {
                    H: [ {
                        t: "Thème 1 — Chrétientés et islam (VIe-XIIIe siècles), des mondes en contact",
                        s: [ [ "Byzance et l’Europe carolingienne", "todo", [] ], [ "De la naissance de l’islam à la prise de Bagdad par les Mongols : pouvoirs, sociétés, cultures", "todo", [] ] ]
                    }, {
                        t: "Thème 2 — Société, religion et pouvoir politique dans l’occident féodal (XIe-XVe siècles)",
                        n: "Thème allégé en Nouvelle-Calédonie pour laisser la place au thème 3.",
                        s: [ [ "L’ordre seigneurial : la formation et la domination des campagnes", "todo", [] ], [ "L’émergence d’une nouvelle société urbaine", "todo", [] ] ]
                    }, {
                        t: "Thème 3 — La civilisation kanak pré-européenne",
                        s: [ [ "Vie économique et matérielle, organisation politique et sociale (chefferie, clans, famille, parenté), mythes et croyances", "part", [ [ "P", "caledonie", "ch. 1" ], [ "P", "pacifique", "ch. 7 et 8" ] ], 1, "à approfondir avec un spécialiste avant d’en faire un volet" ] ]
                    }, {
                        t: "Thème 4 — Transformations de l’Europe et ouverture sur le monde aux XVIe et XVIIe siècles",
                        s: [ [ "Le monde au temps de Charles Quint et Soliman le Magnifique", "ok", [ [ "P", "decouvertes", "ch. 1 à 9 et 15" ] ] ], [ "Humanisme, réformes et conflits religieux", "todo", [] ], [ "Du Prince de la Renaissance au roi absolu (François Ier, Henri IV, Louis XIV)", "todo", [] ] ]
                    } ],
                    G: [ {
                        t: "Thème 1 — La question démographique et l’inégal développement",
                        s: [ [ "La croissance démographique et ses effets", "part", [ [ "P", "mondial", "ch. 4" ], [ "P", "monde", "ch. 9" ] ], 0, "un PMA peut être choisi en Océanie" ], [ "Répartition de la richesse et de la pauvreté dans le monde", "ok", [ [ "P", "mondial", "ch. 10" ] ] ] ]
                    }, {
                        t: "Thème 2 — Des ressources limitées, à gérer et à renouveler",
                        s: [ [ "L’énergie, l’eau : des ressources à ménager et à mieux utiliser", "todo", [] ], [ "L’alimentation : comment nourrir une humanité en croissance démographique et aux besoins alimentaires accrus ?", "todo", [] ] ]
                    }, {
                        t: "Thème 3 — Prévenir les risques, s’adapter au changement global",
                        s: [ [ "Le changement global et ses principaux effets géographiques régionaux", "ok", [ [ "P", "mondial", "ch. 11" ], [ "P", "geonc", "ch. 2" ] ], 0, "étude de cas en Océanie" ], [ "Prévenir les risques industriels et technologiques", "part", [ [ "P", "nickel", "ch. 8" ] ], 0, "exemple possible en Océanie" ] ]
                    } ],
                    E: [ {
                        t: "Égalité, fraternité et solidarité",
                        s: [ [ "Agir pour l’égalité femmes-hommes et lutter contre les discriminations", "part", [ [ "P", "emc", "ch. 4" ] ] ], [ "La solidarité et ses échelles", "ok", [ [ "P", "emc", "ch. 8" ] ] ] ]
                    } ]
                },
                "4e": {
                    H: [ {
                        t: "Thème 1 — Le XVIIIe siècle. Expansions, Lumières et révolutions",
                        s: [ [ "Bourgeoisies marchandes, négoces internationaux, traites négrières et esclavage au XVIIIe siècle", "part", [ [ "P", "emc", "ch. 5" ] ] ], [ "Les voyages d’exploration des Européens dans le Pacifique", "ok", [ [ "P", "decouvertes", "ch. 12 à 14" ], [ "P", "caledonie", "ch. 2" ], [ "P", "pacifique", "ch. 10" ] ], 1, "premiers contacts à partir de l’exemple calédonien" ], [ "L’Europe des Lumières : circulation des idées, despotisme éclairé et contestation de l’absolutisme", "todo", [] ], [ "La Révolution française et l’Empire : nouvel ordre politique et société révolutionnée en France et en Europe", "todo", [] ] ]
                    }, {
                        t: "Thème 2 — L’Europe et le monde au XIXe siècle",
                        s: [ [ "L’Europe de la « révolution industrielle »", "todo", [] ], [ "Conquêtes et sociétés coloniales : la Nouvelle-Calédonie", "ok", [ [ "C", "colonies", "ch. 1 à 6" ], [ "P", "caledonie", "ch. 3 à 7" ] ], 1, "la carte du monde est ici ; l’étude de cas est dans l’atlas du Pacifique" ] ]
                    }, {
                        t: "Thème 3 — Société, culture et politique dans la France du XIXe siècle",
                        s: [ [ "Une difficile conquête : voter de 1815 à 1870", "part", [ [ "P", "emc", "ch. 4" ] ] ], [ "La Troisième République", "part", [ [ "P", "emc", "ch. 7" ] ] ], [ "Conditions féminines dans une société en mutation", "todo", [] ] ]
                    } ],
                    G: [ {
                        t: "Thème 1 — L’urbanisation du monde",
                        s: [ [ "Espaces et paysages de l’urbanisation : géographie des centres et des périphéries", "part", [ [ "P", "mondial", "ch. 5" ] ] ], [ "Des villes inégalement connectées aux réseaux de la mondialisation", "part", [ [ "P", "mondial", "ch. 5 à 7" ] ] ] ]
                    }, {
                        t: "Thème 2 — Les mobilités humaines transnationales",
                        s: [ [ "Un monde de migrants", "ok", [ [ "P", "mondial", "ch. 8" ] ] ], [ "Le tourisme et ses espaces", "ok", [ [ "P", "mondial", "ch. 8" ] ] ] ]
                    }, {
                        t: "Thème 3 — Des espaces transformés par la mondialisation",
                        s: [ [ "Mers et Océans : un monde maritimisé", "ok", [ [ "P", "mondial", "ch. 6 et 7" ], [ "P", "geonc", "ch. 7" ] ] ], [ "L’adaptation du territoire des États-Unis aux nouvelles conditions de la mondialisation", "todo", [] ], [ "Les dynamiques d’un grand ensemble géographique africain", "todo", [] ] ]
                    } ],
                    E: [ {
                        t: "Défendre les droits et les libertés",
                        s: [ [ "L’État de droit et les libertés", "part", [ [ "P", "emc", "ch. 6" ] ] ], [ "Défendre le cadre démocratique : sécurité et défense nationale", "todo", [] ] ]
                    } ]
                },
                "3e": {
                    H: [ {
                        t: "Thème 1 — L’Europe, un théâtre majeur des guerres totales (1914-1945)",
                        s: [ [ "Civils et militaires dans la Première Guerre mondiale", "ok", [ [ "C", "guerres", "ch. 1 et 2" ], [ "P", "caledonie", "ch. 8" ] ], 1, "les Calédoniens dans la Grande Guerre, la révolte de 1917" ], [ "Démocraties fragilisées et expériences totalitaires dans l’Europe de l’entre-deux-guerres", "ok", [ [ "C", "guerres", "ch. 3" ] ] ], [ "La Deuxième Guerre mondiale, une guerre d’anéantissement", "ok", [ [ "C", "guerres", "ch. 4 et 5" ], [ "P", "caledonie", "ch. 8" ] ], 1, "la guerre du Pacifique, la base américaine" ], [ "La France défaite et occupée. Régime de Vichy, collaboration, Résistance", "ok", [ [ "C", "guerres", "ch. 6" ], [ "P", "caledonie", "ch. 8" ] ], 1, "ralliement des Calédoniens à la France libre dès 1940" ] ]
                    }, {
                        t: "Thème 2 — Le monde depuis 1945",
                        s: [ [ "Décolonisations et construction de nouveaux États", "ok", [ [ "C", "monde45", "ch. 3 et 4" ] ], 1, "les indépendances océaniennes, le Vanuatu (1980), les territoires français" ], [ "Un monde bipolaire au temps de la guerre froide", "ok", [ [ "C", "monde45", "ch. 1 et 2" ] ], 1, "le Pacifique, terrain d’essais nucléaires" ], [ "Affirmation et mise en œuvre du projet européen", "ok", [ [ "C", "monde45", "ch. 5" ] ], 1, "la Nouvelle-Calédonie, PTOM associé à l’Union" ], [ "Enjeux et conflits dans le monde après 1989", "ok", [ [ "C", "monde45", "ch. 6" ] ], 1, "Bougainville, rivalités et montée des eaux dans le Pacifique" ] ]
                    }, {
                        t: "Thème 3 — Françaises et Français dans une République repensée",
                        s: [ [ "1944-1947 : refonder la République, redéfinir la démocratie", "ok", [ [ "C", "republique", "ch. 1" ] ], 1, "citoyenneté des Kanak et fin de l’indigénat (1946)" ], [ "La Ve République, de la République gaullienne à l’alternance et à la cohabitation", "ok", [ [ "C", "republique", "ch. 2 et 3" ] ] ], [ "La Nouvelle-Calédonie depuis 1946 : évolution politique", "ok", [ [ "C", "republique", "ch. 6" ], [ "P", "caledonie", "ch. 9" ], [ "P", "emc", "ch. 3" ] ], 1 ], [ "Femmes et hommes dans la société des années 1950 aux années 1980 en France et en Nouvelle-Calédonie : nouveaux enjeux sociaux et culturels, réponses politiques", "ok", [ [ "C", "republique", "ch. 4 et 5" ], [ "P", "caledonie", "ch. 9" ] ], 1, "la société calédonienne, le boom du nickel, Mélanésia 2000" ] ]
                    } ],
                    G: [ {
                        t: "Thème 1 — Dynamiques territoriales de la France contemporaine",
                        s: [ [ "Les aires urbaines, une nouvelle géographie d’une France mondialisée", "todo", [] ], [ "Les espaces productifs et leurs évolutions", "todo", [] ], [ "Les espaces de faible densité et leurs atouts", "todo", [] ] ]
                    }, {
                        t: "Thème 2 — Pourquoi et comment aménager le territoire ?",
                        s: [ [ "Aménager pour répondre aux inégalités croissantes entre territoires français, à toutes les échelles", "todo", [] ], [ "Aménager la Nouvelle-Calédonie : vers le rééquilibrage", "ok", [ [ "P", "nickel", "ch. 6" ], [ "P", "geonc", "ch. 3 et 5" ] ], 1, "le programme attend un croquis : export « carte muette » de l’atlas du Pacifique" ] ]
                    }, {
                        t: "Thème 3 — La France et l’Union européenne",
                        s: [ [ "L’Union européenne, un nouveau territoire de référence et d’appartenance", "todo", [] ], [ "La France et l’Europe dans le monde", "todo", [] ] ]
                    } ],
                    E: [ {
                        t: "Faire vivre la démocratie",
                        s: [ [ "Les règles du jeu démocratique", "part", [ [ "P", "emc", "ch. 1 à 3" ] ] ], [ "Les acteurs du jeu démocratique et leur engagement (1) : l’opinion", "todo", [] ], [ "Les acteurs du jeu démocratique et leur engagement (2) : l’engagement collectif", "part", [ [ "P", "emc", "ch. 4" ] ] ] ]
                    } ]
                }
            },
            SUITE: [ [ "fait", "Conquêtes et sociétés coloniales", "4e, thème 2", "6 chapitres, 6 enquêtes avec leurs dossiers PDF et Word, mode facile, quiz, une soixantaine d’images.", "pilote publié" ], [ "fait", "Les guerres mondiales (1914-1945)", "3e, thème 1", "6 chapitres : 1914-1918, guerre totale (Calédoniens, 1917), totalitarismes, guerre d’anéantissement et Shoah, Pacifique, Vichy et France libre. Enquêtes et PDF à venir." ], [ "fait", "Le monde depuis 1945", "3e, thème 2", "6 chapitres : guerre froide en deux temps (essais nucléaires dans le Pacifique), décolonisations en Asie-Afrique puis dans le Pacifique (Vanuatu), construction européenne (la Nouvelle-Calédonie, PTOM), conflits depuis 1989 (Bougainville). Enquêtes et PDF à venir." ], [ "fait", "La République depuis 1944", "3e, thème 3", "6 chapitres : Libération et citoyenneté de 1946, République gaullienne, alternances et cohabitations, société des Trente Glorieuses, femmes et hommes (avec la Nouvelle-Calédonie), la Nouvelle-Calédonie depuis 1946. Enquêtes et PDF à venir." ], [ "todo", "Révolutions et XIXe siècle", "4e, thèmes 1 à 3", "Traites et esclavage, Lumières, Révolution et Empire, révolution industrielle, voter au XIXe siècle." ], [ "todo", "Chrétientés, islam, Occident féodal", "5e, thèmes 1 et 2", "Byzance, empire carolingien, monde musulman, seigneuries et villes." ], [ "todo", "Renaissance et roi absolu", "5e, thème 4", "Humanisme, réformes, de François Ier à Louis XIV ; les Grandes Découvertes existent déjà." ], [ "todo", "Mondes antiques", "6e, thèmes 1 à 3", "Orient ancien, cités grecques, Rome, monothéismes, route de la soie." ], [ "todo", "La civilisation kanak pré-européenne", "5e, thème 3", "À écrire avec un spécialiste : c’est le thème où l’erreur coûterait le plus cher." ], [ "todo", "Lycée", "2de à terminale", "Après le collège, à partir des programmes adaptés du lycée." ] ],
            SEQC: {
                republique: {
                    niv: "3e",
                    nopdf: 1,
                    rappel: "la défaite de 1940, Vichy et la France libre (thème 1), la guerre d’Algérie et les décolonisations (thème 2).",
                    theme: "Histoire, thème 3 « Françaises et Français dans une République repensée » — les quatre sous-thèmes (programme adapté)",
                    pb: "Comment la République se transforme-t-elle depuis 1944, dans ses institutions comme dans sa société, en France et en Nouvelle-Calédonie ?",
                    duree: "10 à 12 heures : six séances d’une à deux heures, puis l’évaluation (au collège, le programme ne fixe pas d’horaire par thème)",
                    dem: "Deux temps. D’abord les institutions, dans l’ordre chronologique (séances 1 à 3 : Libération, Ve République, alternances et cohabitations). Puis la société (séances 4 et 5), avec un changement d’échelle vers la Nouvelle-Calédonie, et enfin l’évolution politique calédonienne (séance 6), à compléter avec l’atlas du Pacifique (« Histoire de la Nouvelle-Calédonie », chapitre 9) et l’EMC. La séance 6 demande une attention particulière : les faits sont présentés sans jugement, les mémoires des familles respectées.",
                    rep: [ "21 avril 1944 : droit de vote des femmes", "1945 : création de la Sécurité sociale", "1946 : IVe République ; fin de l’indigénat, les Kanak deviennent citoyens", "1958 : Constitution de la Ve République", "1962 : élection du président au suffrage universel direct", "Mai 1968", "1969-1972 : boom du nickel", "1974 : majorité à 18 ans", "1975 : loi Veil ; festival Mélanésia 2000", "10 mai 1981 : première alternance", "1984-1988 : les Événements en Nouvelle-Calédonie", "1986 : première cohabitation", "26 juin 1988 : accords de Matignon", "5 mai 1998 : accord de Nouméa", "2018, 2020, 2021 : trois référendums sur l’indépendance" ],
                    trace: [ "I. Refonder la République (1944-1947) : Libération et GPRF ; vote des femmes ; Sécurité sociale ; IVe République ; citoyenneté outre-mer et fin de l’indigénat", "II. La Ve République : la République gaullienne (1958-1969) ; alternance (1981) et cohabitations ; décentralisation et quinquennat", "III. Une société transformée (1950-1980) : Trente Glorieuses, consommation, immigration, crise ; femmes et hommes, nouvelles lois ; la société calédonienne et le boom du nickel", "IV. La Nouvelle-Calédonie depuis 1946 : de la citoyenneté à la revendication indépendantiste ; les Événements ; les accords de Matignon et de Nouméa ; les référendums" ],
                    eval: {
                        docs: "Exercice 1 — Analyser et comprendre des documents : un extrait de la Constitution de 1958 sur le président de la République et le schéma des institutions de la Ve République.",
                        q1: [ "Identifie le document 1 : nature, date.", "Relève trois pouvoirs du président de la République.", "Explique ce qui change avec le référendum de 1962.", "Montre que le président est au cœur des institutions de la Ve République." ],
                        lang: "Exercice 2 — Maîtriser différents langages : rédige un développement construit d’une quinzaine de lignes. « Montre que la place des femmes dans la société française change des années 1950 aux années 1980. »",
                        rep: "Repères : sur la frise, place 1944, 1946, 1958, 1968, 1981, 1988, 1998 ; sur la carte de la Nouvelle-Calédonie, localise Nouméa, Hienghène, Ouvéa et les trois provinces.",
                        att: [ "une courte introduction qui situe (France, années 1950 à 1980)", "le point de départ : droit de vote (1944) mais modèle de la « femme au foyer »", "le travail des femmes et la loi de 1965", "les grandes lois : contraception (1967), loi Veil (1975), égalité professionnelle (1983)", "les inégalités qui demeurent (salaires, politique)", "un vocabulaire précis : égalité, féminisme, majorité civile, mixité" ],
                        grille: [ [ "Se repérer dans le temps et dans l’espace", "place moins de la moitié des repères", "place la plupart des repères", "place tous les repères" ], [ "Analyser et comprendre un document", "recopie sans identifier", "identifie les documents et relève les informations", "explique les documents et les relie à ses connaissances" ], [ "Pratiquer différents langages : écrire", "quelques phrases isolées", "un texte organisé mais incomplet", "un texte organisé, complet, avec le vocabulaire attendu" ] ]
                    }
                },
                monde45: {
                    niv: "3e",
                    nopdf: 1,
                    rappel: "la Seconde Guerre mondiale et son bilan (thème 1), les empires coloniaux (vus en 4e).",
                    theme: "Histoire, thème 2 « Le monde depuis 1945 » — les quatre sous-thèmes (programme adapté)",
                    pb: "Comment le monde se transforme-t-il depuis 1945, entre guerre froide, décolonisations, construction européenne et nouveaux conflits, et quelle place y tient le Pacifique ?",
                    duree: "10 à 12 heures : six séances d’une à deux heures, puis l’évaluation (au collège, le programme ne fixe pas d’horaire par thème)",
                    dem: "La guerre froide sert de fil directeur (séances 1 et 2), puis viennent les décolonisations (séances 3 et 4), l’Europe (séance 5) et le monde depuis 1989 (séance 6). Chaque séance change d’échelle vers le Pacifique : essais nucléaires, indépendances océaniennes et Vanuatu, statut de PTOM de la Nouvelle-Calédonie, Bougainville. L’évolution politique de la Nouvelle-Calédonie depuis 1946 est traitée au thème 3.",
                    rep: [ "1945 : création de l’ONU", "1947-1991 : guerre froide", "1948-1949 : blocus de Berlin", "1954-1962 : guerre d’Algérie", "1955 : conférence de Bandung", "1957 : traités de Rome", "1961 : construction du mur de Berlin", "1962 : crise de Cuba ; indépendance des Samoa", "1966-1996 : essais nucléaires français en Polynésie", "30 juillet 1980 : indépendance du Vanuatu", "9 novembre 1989 : chute du mur de Berlin", "1991 : fin de l’URSS", "1992 : traité de Maastricht", "11 septembre 2001 : attentats aux États-Unis", "2002 : l’euro en pièces et en billets", "24 février 2022 : invasion de l’Ukraine par la Russie" ],
                    trace: [ "I. Un monde bipolaire (1947-1991) : deux blocs et leurs crises ; détente et tensions ; le Pacifique, terrain d’essais nucléaires ; la fin de l’URSS", "II. Décolonisations et nouveaux États : Asie et Afrique (Inde, Indochine, Algérie, Bandung) ; le Pacifique (Samoa, Vanuatu, libre association, territoires français)", "III. Le projet européen : des Six à l’Union européenne à 27 ; la Nouvelle-Calédonie, PTOM associé", "IV. Le monde depuis 1989 : génocides, terrorisme, monde multipolaire ; conflits et enjeux du Pacifique" ],
                    eval: {
                        docs: "Exercice 1 — Analyser et comprendre des documents : la carte des indépendances du Pacifique (chapitre 4, étape 3) et un court texte sur l’indépendance du Vanuatu en 1980, choisi par l’enseignant.",
                        q1: [ "Identifie les deux documents : nature, sujet, date.", "À l’aide de la carte, nomme trois États devenus indépendants dans le Pacifique et leur ancienne puissance.", "Explique ce qu’était le condominium des Nouvelles-Hébrides.", "Montre que la décolonisation du Pacifique est surtout négociée, mais pas toujours paisible." ],
                        lang: "Exercice 2 — Maîtriser différents langages : rédige un développement construit d’une quinzaine de lignes. « Montre que le monde est divisé en deux blocs de 1947 à 1991. »",
                        rep: "Repères : sur la frise, place 1945, 1947, 1962, 1980, 1989, 1991, 2001 ; sur le planisphère, localise Berlin, Cuba, la Corée, le Viêt Nam, l’Algérie, Moruroa, le Vanuatu.",
                        att: [ "une courte introduction qui situe (1947-1991, le monde entier)", "deux blocs opposés : États-Unis et URSS, deux modèles, deux alliances (OTAN, pacte de Varsovie)", "des crises sans affrontement direct : Berlin, Corée, Cuba", "la course aux armements, jusque dans le Pacifique (essais nucléaires)", "la fin : chute du mur (1989) et fin de l’URSS (1991)", "un vocabulaire précis : guerre froide, bloc, rideau de fer, dissuasion" ],
                        grille: [ [ "Se repérer dans le temps et dans l’espace", "place moins de la moitié des repères", "place la plupart des repères", "place tous les repères" ], [ "Analyser et comprendre un document", "recopie sans identifier", "identifie les documents et relève les informations", "explique les documents et les relie à ses connaissances" ], [ "Pratiquer différents langages : écrire", "quelques phrases isolées", "un texte organisé mais incomplet", "un texte organisé, complet, avec le vocabulaire attendu" ] ]
                    }
                },
                guerres: {
                    niv: "3e",
                    nopdf: 1,
                    rappel: "ce que les élèves savent de la colonisation et des empires en 1914 (vu en 4e).",
                    theme: "Histoire, thème 1 « L’Europe, un théâtre majeur des guerres totales (1914-1945) » — les quatre sous-thèmes (programme adapté)",
                    pb: "Pourquoi les deux guerres mondiales sont-elles des guerres totales, et comment touchent-elles la Nouvelle-Calédonie ?",
                    duree: "10 à 12 heures : six séances d’une à deux heures, puis l’évaluation (au collège, le programme ne fixe pas d’horaire par thème)",
                    dem: "Chronologique, avec à chaque fois un changement d’échelle : de l’Europe et du monde vers le Pacifique et la Nouvelle-Calédonie (monuments aux morts, révolte de 1917, base américaine, ralliement de 1940). L’atlas du Pacifique (volet « Histoire de la Nouvelle-Calédonie », chapitre 8) sert d’étude de cas complémentaire.",
                    rep: [ "1914-1918 : Première Guerre mondiale", "11 novembre 1918 : armistice", "1917 : révolte kanak dans le nord de la Grande Terre", "1917 : révolution russe", "1922 : Mussolini au pouvoir", "1933 : Hitler au pouvoir", "1939-1945 : Seconde Guerre mondiale", "18 juin 1940 : appel du général de Gaulle", "19 septembre 1940 : ralliement de la Nouvelle-Calédonie à la France libre", "1942 : base américaine en Nouvelle-Calédonie", "6 juin 1944 : débarquement de Normandie", "8 mai 1945 : capitulation allemande", "6 et 9 août 1945 : Hiroshima et Nagasaki" ],
                    trace: [ "I. 1914-1918, une guerre totale (alliances et étapes ; soldats et civils ; génocide des Arméniens ; les Calédoniens et la révolte de 1917)", "II. L’entre-deux-guerres : démocraties fragilisées et totalitarismes (Versailles ; URSS, Italie, Allemagne ; crise de 1929 ; marche à la guerre)", "III. 1939-1945, une guerre d’anéantissement (étapes ; guerre à l’Est ; Shoah ; guerre du Pacifique et base américaine en Nouvelle-Calédonie)", "IV. La France défaite et occupée (Vichy et la collaboration ; France libre et ralliement calédonien ; Résistance et Libération)" ],
                    eval: {
                        docs: "Exercice 1 — Analyser et comprendre des documents : l’appel du 18 juin 1940 du général de Gaulle et un extrait de la proclamation du ralliement de la Nouvelle-Calédonie (septembre 1940).",
                        q1: [ "Identifie le document 1 : auteur, date, lieu, moyen de diffusion.", "Relève deux raisons pour lesquelles de Gaulle refuse la défaite.", "Explique ce qui se passe en Nouvelle-Calédonie le 19 septembre 1940.", "Montre que la Nouvelle-Calédonie répond à l’appel de De Gaulle." ],
                        lang: "Exercice 2 — Maîtriser différents langages : rédige un développement construit d’une quinzaine de lignes. « Montre que la Seconde Guerre mondiale est une guerre d’anéantissement. »",
                        rep: "Repères : sur la frise, place 1914, 1918, 1939, 1940, 1945 ; sur le planisphère, localise Verdun, Stalingrad, Auschwitz-Birkenau, Pearl Harbor, Hiroshima, Nouméa.",
                        att: [ "une courte introduction qui situe (1939-1945, Europe et Pacifique)", "la volonté des nazis de détruire des peuples (guerre à l’Est, civils massacrés)", "la Shoah : environ 6 millions de Juifs assassinés, centres de mise à mort", "des violences dans le Pacifique (Nankin, Hiroshima et Nagasaki)", "un bilan : environ 60 millions de morts, majorité de civils", "un vocabulaire précis : génocide, Shoah, crime contre l’humanité" ],
                        grille: [ [ "Se repérer dans le temps et dans l’espace", "place moins de la moitié des repères", "place la plupart des repères", "place tous les repères" ], [ "Analyser et comprendre un document", "recopie sans identifier", "identifie le document et relève les informations", "explique le document et le relie à ses connaissances" ], [ "Pratiquer différents langages : écrire", "quelques phrases isolées", "un texte organisé mais incomplet", "un texte organisé, complet, avec le vocabulaire attendu" ] ]
                    }
                },
                colonies: {
                    niv: "4e",
                    theme: "Histoire, thème 2 « L’Europe et le monde au XIXe siècle » — sous-thème « Conquêtes et sociétés coloniales : la Nouvelle-Calédonie » (adaptation)",
                    pb: "Comment les conquêtes coloniales du XIXe siècle transforment-elles le monde, et que révèle l’exemple de la Nouvelle-Calédonie sur les sociétés coloniales ?",
                    duree: "5 à 6 heures : l’étude de cas calédonienne, quatre ou cinq des six séances au choix, puis l’évaluation (au collège, le programme ne fixe pas d’horaire par thème)",
                    dem: "Démarche inductive : on part de l’étude de cas calédonienne (atlas du Pacifique, volet « Histoire de la Nouvelle-Calédonie », chapitres 3 à 7), puis on met en perspective à l’échelle du monde avec les cartes de ce volet. Les séances 1 à 4 peuvent aussi précéder l’étude de cas si la classe a besoin du cadre général d’abord.",
                    rep: [ "1830 : prise d’Alger", "24 septembre 1853 : prise de possession de la Nouvelle-Calédonie", "1864 : premiers forçats", "1878 : révolte d’Ataï", "1884-1885 : conférence de Berlin", "1887 : indigénat en Nouvelle-Calédonie", "1914 : apogée des empires" ],
                    trace: [ "I. Pourquoi et comment les Européens conquièrent-ils le monde ? (raisons économiques, politiques, idéologiques ; moyens ; partage de l’Afrique et du Pacifique)", "II. La Nouvelle-Calédonie, une colonie française (1853 : une base ; 1864 : le bagne ; colons libres et cantonnement ; le nickel)", "III. Des sociétés coloniales inégalitaires et contestées (citoyens et sujets, indigénat, travail ; résistances : Ataï, 1878)" ],
                    eval: {
                        docs: "Exercice 1 — Analyser et comprendre des documents : le discours de Jules Ferry (28 juillet 1885) et la carte des empires en 1914.",
                        q1: [ "Identifie le document 1 : auteur, date, lieu, destinataires.", "Relève deux raisons de coloniser données par l’auteur.", "À l’aide de la carte, nomme les deux plus grands empires coloniaux en 1914 et un territoire de chacun dans le Pacifique.", "Explique pourquoi un député comme Clemenceau s’oppose à ce discours." ],
                        lang: "Exercice 2 — Maîtriser différents langages : rédige un développement construit d’une quinzaine de lignes. « À partir de l’exemple de la Nouvelle-Calédonie, décris et explique le fonctionnement d’une société coloniale au XIXe siècle. »",
                        rep: "Repères : sur la frise, place 1853, 1878, 1884-1885 ; sur le planisphère, localise la Nouvelle-Calédonie, l’Algérie, l’Indochine, l’Empire des Indes.",
                        att: [ "une courte introduction qui situe (où, quand)", "la prise de possession et ses raisons", "la colonisation pénitentiaire et de peuplement, le cantonnement", "l’inégalité entre colons et Kanak (indigénat)", "les résistances (Ataï, 1878)", "un vocabulaire précis : colonie, métropole, indigénat, cantonnement" ],
                        grille: [ [ "Se repérer dans le temps et dans l’espace", "place moins de la moitié des repères", "place la plupart des repères", "place tous les repères" ], [ "Analyser et comprendre un document", "recopie sans identifier", "identifie le document et relève les informations", "explique le document et exerce son esprit critique" ], [ "Pratiquer différents langages : écrire", "quelques phrases isolées", "un texte organisé mais incomplet", "un texte organisé, complet, avec le vocabulaire attendu" ] ]
                    }
                }
            },
            VN: {
                monde: "Peupler la Terre",
                pacifique: "Vers le Pacifique",
                decouvertes: "Grandes Découvertes",
                caledonie: "Histoire de la NC",
                geonc: "Géographie de la NC",
                nickel: "Le nickel",
                mondial: "Monde et mondialisation",
                emc: "Vivre ensemble",
                colonies: "Conquêtes et sociétés coloniales",
                guerres: "Les guerres mondiales"
            },
            PAC: "https://nicobouza2-creator.github.io/atlas-historique-du-pacifique/"
        };
    }
}(), function() {
    "use strict";
    var e = window.COLLEGE, t = window.ATLAS;
    if (e && t && t.api) {
        var o = t.api, i = e.PROG, n = e.VN, a = null, s = {
            tab: "prog",
            niv: "4e",
            ci: 0
        }, r = {
            ok: "couvert",
            part: "en partie",
            todo: "à faire"
        }, l = document.createElement("style");
        l.textContent = '.col-home{display:flex;gap:14px;align-items:center;width:100%;margin:10px 0 0;padding:14px 18px;border-radius:16px;border:2px solid var(--gold,#ffd166);background:rgba(255,209,102,.12);color:inherit;font:inherit;text-align:left;cursor:pointer;min-height:64px}.col-home b{font-size:19px;display:block}.col-home small{font-size:14.5px;opacity:.9}.col-home .ic{font-size:30px}.col-ov{position:fixed;inset:0;z-index:20000;background:#e9edf2;color:#1b2430;display:flex;flex-direction:column;font:15.5px/1.5 system-ui,-apple-system,"Segoe UI",Arial,sans-serif}.col-bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:8px 12px;background:#1f2d3d;color:#fff}.col-bar b{flex:1 1 200px;font-size:17px}.col-bar button,.col-bar select{font:600 14.5px system-ui,sans-serif;min-height:44px;padding:6px 13px;border-radius:10px;border:1px solid #5b6b7d;background:#2f4156;color:#fff;cursor:pointer}.col-bar button[aria-pressed=true]{background:#f2b632;color:#1b2430;border-color:#f2b632}.col-bar .msg{font-size:13.5px;opacity:.9;flex-basis:100%;min-height:1em}.col-scroll{flex:1;overflow:auto;padding:14px}.col-sheet,.col-sheet *{-webkit-user-select:text;user-select:text}.col-sheet{background:#fff;max-width:1060px;margin:0 auto;padding:22px 26px;border-radius:8px;box-shadow:0 2px 14px rgba(0,0,0,.15);outline:none}.col-sheet h1{font-size:23px;margin:0 0 4px}.col-sheet h2{font-size:18.5px;margin:20px 0 6px;border-bottom:2px solid #1f2d3d;padding-bottom:3px}.col-sheet h3{font-size:16px;margin:14px 0 4px}.col-sheet p{margin:6px 0}.col-sheet .sub{color:#55606d;margin:0 0 10px}.col-sheet ul{margin:4px 0 4px 20px;padding:0}.col-sheet li{margin:2px 0}.col-sheet table{width:100%;border-collapse:collapse;margin:8px 0 14px}.col-sheet td,.col-sheet th{border:1.3px solid #333;padding:7px 9px;vertical-align:top;text-align:left}.col-sheet th{background:#eef2f6}.col-sheet td.h{width:74px;font-weight:700;text-align:center;background:#f6f8fa}.col-st{display:inline-block;font-size:12.5px;font-weight:700;padding:1px 8px;border-radius:999px;margin-right:6px;white-space:nowrap}.col-st.ok{background:#c8f0cf;color:#14501c}.col-st.part{background:#ffe9a8;color:#6b4a00}.col-st.todo{background:#e3e7ec;color:#47525e}.col-st.nc{background:#1f2d3d;color:#fff}.col-sheet a,.col-sheet button.lk{color:#0b5cad;font:inherit;background:none;border:0;padding:0;text-decoration:underline;cursor:pointer}.col-res{font-size:14.5px;margin:2px 0 0}.col-rem{font-size:14px;color:#55606d}.col-lv{display:flex;gap:8px;flex-wrap:wrap;margin:8px 0 4px}.col-lv button{font:700 16px system-ui,sans-serif;min-width:64px;min-height:44px;border-radius:10px;border:2px solid #1f2d3d;background:#fff;color:#1f2d3d;cursor:pointer}.col-lv button[aria-pressed=true]{background:#1f2d3d;color:#fff}@media print{body.col-print>*:not(.col-ov){display:none!important}.col-ov{position:static;background:#fff}.col-bar{display:none}.col-scroll{overflow:visible;padding:0}.col-sheet{box-shadow:none;max-width:none;padding:0}}', 
        document.head.appendChild(l);
        var c = [ [ "prog", "Programmes", function() {
            var e = i[s.niv], t = '<h1>Programmes du collège adaptés à la Nouvelle-Calédonie</h1><p class="sub">Ce que les deux atlas couvrent déjà, sous-thème par sous-thème. Intitulés des programmes officiels.</p><div class="col-lv">' + Object.keys(i).map(function(e) {
                return '<button type="button" data-niv="' + e + '" aria-pressed="' + (e === s.niv) + '">' + e + "</button>";
            }).join("") + "</div>";
            return t += h("Histoire", e.H) + h("Géographie", e.G) + h("Enseignement moral et civique", e.E), 
            t += '<p class="col-rem">Histoire et géographie : programmes adaptés (6e : cycle 3 ; 5e, 4e, 3e : cycle 4). « Chaque fois que cela est jugé opportun, l’exemple ou l’étude de cas est choisi à l’échelle locale ou régionale. » EMC : programme national de 2024, contextualisé autant que possible ; en Nouvelle-Calédonie il entre en vigueur niveau par niveau (5e en 2025, 4e en 2026, d’après le livret d’accueil 2026) : vérifier le texte en vigueur pour la 3e sur le site académique.</p>';
        } ], [ "fiche", "Fiche séance", function() {
            return f(s.ci);
        } ], [ "seq", "Séquence et évaluation", function() {
            var t = p(), o = e.SEQC[t.id], i = o.eval, n = "<h1>Séquence — " + u(t.title) + '</h1><p class="sub">' + u(o.niv) + " · " + u(o.duree) + "</p><p><b>Place dans le programme :</b> " + u(o.theme) + "</p><p><b>Problématique de la séquence :</b> " + u(o.pb) + "</p><p><b>Démarche :</b> " + u(o.dem) + "</p>";
            return n += "<h2>Plan de séquence</h2><table><tr><th>Séance</th><th>Problématique</th><th>Notions</th><th>Compétences travaillées</th><th>Supports</th></tr>", 
            t.chapters.forEach(function(e, o) {
                var i = e.fs || {};
                n += "<tr><td>" + (o + 1) + ". " + u(e.short) + "</td><td>" + u(i.pb) + "</td><td>" + u((i.notions || []).join(" ; ")) + "</td><td>" + u((i.comp || []).join(" ; ")) + "</td><td>carte animée" + ((window.ENQ || {})[t.id] && window.ENQ[t.id][o] ? ", enquête" : "") + "</td></tr>";
            }), n += "</table><h2>Repères à faire construire</h2>" + d(o.rep) + "<h2>Trace écrite : un plan qui répond à la problématique</h2>" + d(o.trace) + '<p class="col-rem">La trace écrite se construit avec les élèves, au fil des séances. En 6e et en 5e, elle est écrite en entier au tableau ; le texte à trous reste l’exception.</p>', 
            n += "<h2>Évaluation de fin de séquence</h2><p>" + u(i.docs) + "</p><ol>" + i.q1.map(function(e) {
                return "<li>" + u(e) + "</li>";
            }).join("") + "</ol><p>" + u(i.lang) + "</p><p>" + u(i.rep) + "</p><h3>Éléments attendus dans le développement construit</h3>" + d(i.att) + "<h3>Grille par compétences</h3><table><tr><th>Compétence</th><th>Non acquis</th><th>En cours d’acquisition</th><th>Acquis</th></tr>" + i.grille.map(function(e) {
                return "<tr>" + e.map(function(e) {
                    return "<td>" + u(e) + "</td>";
                }).join("") + "</tr>";
            }).join("") + '</table><p class="col-rem">L’évaluation ne porte que sur ce qui a été travaillé en classe ; donner une fiche de révision avant.</p>';
        } ], [ "meth", "Méthode", function() {
            return '<h1>Rappels de méthode</h1><p class="sub">Résumé, avec nos mots, du livret d’accueil de l’enseignant contractuel en histoire-géographie et EMC (vice-rectorat de la Nouvelle-Calédonie, 2026). Le livret et les programmes restent la référence.</p>' + d([ "Le programme d’abord : tous les chapitres des programmes adaptés se traitent, sans impasse ni hors-sujet ; l’histoire et la géographie ont le même poids.", "Une problématique par séquence, souvent par séance. « Quelles sont les étapes de… » n’en est pas une : il faut une vraie question, qui oblige à réfléchir.", "Trois ou quatre documents au plus par séance, de statuts différents (accroche, illustration, document étudié à fond, document-outil).", "Moins de simples relevés d’informations ; un questionnement court, qui fait confronter le document à ce que l’on sait et exercer l’esprit critique.", "Des consignes écrites avec des verbes de capacité : prélever, identifier, expliquer, analyser, confronter.", "Démarche inductive : une étude de cas (locale si possible) puis une mise en perspective ; ou l’inverse, du général vers l’exemple.", "Trace écrite construite avec les élèves, organisée par un plan qui répond à la problématique, avec repères, définitions, croquis ou schémas. Texte à trous : rarement.", "Évaluer de plusieurs façons (diagnostique, formative, formatrice, sommative) et par compétences ; seulement ce qui a été vu en classe.", "Différencier sans changer les connaissances visées : supports variés, questions plus ou moins guidées ; documents adaptés aux élèves « dys ».", "Séance type : 5 à 10 minutes d’entrée (rappel, accroche, problématique), 35 à 45 minutes d’activité, 5 à 10 minutes de fin (réponse à la question du jour, vérification, suite)." ]) + "<h2>Ressources citées par le livret</h2>" + d([ "Site académique d’histoire-géographie : histoire-geo.ac-noumea.nc (programmes en vigueur, séquences)", "Eduscol : programmes et ressources d’accompagnement des cycles 3 et 4", "ISEE (isee.nc) et Géorep (georep.nc) pour les données sur la Nouvelle-Calédonie", "Géoconfluences (glossaire), L’Histoire par l’image, Géoimage (CNES), Lumni", "Institutions locales pour l’EMC : gouv.nc, congres.nc, senat-coutumier.nc, cese.nc" ]);
        } ], [ "suite", "Suite", function() {
            return '<h1>Suite du chantier</h1><p class="sub">Objectif : couvrir tout le programme d’histoire du collège, puis le lycée. Un volet à la fois : on critique le pilote, puis on déroule.</p><table><tr><th>État</th><th>Volet</th><th>Programme</th><th>Contenu</th></tr>' + e.SUITE.map(function(e) {
                return '<tr><td><span class="col-st ' + ("fait" === e[0] ? "ok" : "todo") + '">' + ("fait" === e[0] ? e[4] || "publié" : "à faire") + "</span></td><td><b>" + u(e[1]) + "</b></td><td>" + u(e[2]) + "</td><td>" + u(e[3]) + "</td></tr>";
            }).join("") + "</table>";
        } ] ];
        document.addEventListener("keydown", function(e) {
            "Escape" === e.key && a && !e.target.closest("[contenteditable=true]") && q();
        }), "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", L) : L(), 
        e.open = x, e.close = q, e.fiche = f, window.__college = function(e, t) {
            return x(e, t), a.querySelector(".col-sheet").innerHTML;
        };
    }
    function u(e) {
        return String(null == e ? "" : e).replace(/&/g, "&amp;").replace(/</g, "&lt;");
    }
    function d(e) {
        return "<ul>" + (e || []).map(function(e) {
            return "<li>" + u(e) + "</li>";
        }).join("") + "</ul>";
    }
    function P() {
        return o.vols().filter(function(t) {
            return e.SEQC[t.id];
        });
    }
    function p() {
        var t, i = P();
        for (t = 0; t < i.length; t++) if (i[t].id === s.vid) return i[t];
        var c = o.vol && o.vol();
        if (c && e.SEQC[c.id]) return c;
        for (t = 0; t < i.length; t++) if ("colonies" === i[t].id) return i[t];
        return i[0] || o.vols()[0];
    }
    function m(t) {
        return "C" === t[0] ? '<button class="lk" data-go="' + t[1] + '">▶ ' + u(n[t[1]] || t[1]) + " (" + u(t[2]) + "), dans cet atlas</button>" : '<a href="' + e.PAC + "#" + t[1] + '" target="_blank" rel="noopener">Atlas du Pacifique ▸ ' + u(n[t[1]] || t[1]) + " (" + u(t[2]) + ") ↗</a>";
    }
    function h(e, t) {
        var o = function(e) {
            var t = {
                ok: 0,
                part: 0,
                todo: 0
            };
            return e.forEach(function(e) {
                e.s.forEach(function(e) {
                    t[e[1]]++;
                });
            }), t;
        }(t), i = o.ok + o.part + o.todo, n = "<h2>" + e + ' <span class="col-rem">— ' + o.ok + " couvert" + (o.ok > 1 ? "s" : "") + ", " + o.part + " en partie, " + o.todo + " à faire sur " + i + " sous-thèmes</span></h2>";
        return t.forEach(function(e) {
            n += "<h3>" + u(e.t) + "</h3>" + (e.n ? '<p class="col-rem">' + u(e.n) + "</p>" : "") + "<ul>", 
            e.s.forEach(function(e) {
                n += '<li><span class="col-st ' + e[1] + '">' + r[e[1]] + "</span>" + (e[3] ? '<span class="col-st nc">adaptation NC</span>' : "") + u(e[0]) + (e[4] ? ' <span class="col-rem">(' + u(e[4]) + ")</span>" : "") + ((e[2] || []).length ? '<div class="col-res">' + e[2].map(m).join(" · ") + "</div>" : "") + "</li>";
            }), n += "</ul>";
        }), n;
    }
    function f(t) {
        var o = p(), i = e.SEQC[o.id], n = o.chapters[t], a = n.fs || {}, s = t > 0 ? o.chapters[t - 1] : null, r = n.q || [], l = (n.mots || []).slice(0, 4).map(function(e) {
            return e[0] + " : " + e[1];
        }), c = "<h1>Fiche séance — " + u(n.short) + '</h1><p class="sub">' + u(i.niv) + " · " + u(n.dates || "") + " · une heure · à modifier librement (cliquez dans le texte)</p>";
        return c += '<table><tr><td style="width:50%"><b>Séquence :</b> ' + u(o.title) + '<br><span class="col-rem">' + u(i.theme) + "</span><br><br><b>Séance :</b> n° " + (t + 1) + " sur " + o.chapters.length + " — " + u(n.short) + "</td><td><b>But pédagogique :</b> " + u(a.but) + "</td></tr><tr><td><b>Problématique :</b> " + u(a.pb) + "</td><td><b>Notions clés :</b>" + d(a.notions) + "</td></tr><tr><td><b>Méthodes :</b> " + u(a.meth) + "</td><td><b>Compétences et savoir-faire :</b>" + d(a.comp) + "</td></tr></table>", 
        c += '<table><tr><td class="h">5 à 10’</td><td colspan="2"><b>Entrée dans la leçon</b><ul><li><b>Rappel :</b> ' + (s ? "séance précédente, « " + u(s.short) + " » : " + u((s.fs || {}).fin || "") : u(i.rappel || "ce que les élèves savent déjà de la colonisation (vue au cycle 3 pour la Nouvelle-Calédonie).")) + "</li><li><b>Accroche :</b> " + u(a.accroche) + "</li><li><b>Problématique</b> notée au tableau : " + u(a.pb) + '</li></ul></td></tr><tr><td class="h">35 à 45’</td><td style="width:52%"><b>Activités des élèves</b><ol>' + (a.act || []).map(function(e) {
            return "<li>" + u(e) + "</li>";
        }).join("") + '</ol><p class="col-rem">Trois supports au plus, dont un étudié en profondeur. Différenciation : enquête en « Parcours guidé » ou « Parcours autonome », texte facile, gros texte.</p></td><td><b>Cours</b> (trace écrite construite avec les élèves)<p>' + u(a.fin) + "</p><b>À noter :</b>" + d(l) + "</td></tr></table>", 
        c += '<table><tr><td class="h">5 à 10’</td><td><b>Fin de la leçon</b><ul><li><b>Réponse à la question du jour :</b> ' + u(a.fin) + "</li><li><b>Vérification des acquis :</b> " + r.slice(0, 2).map(function(e) {
            return u(e[0]) + ' <span class="col-rem">(' + u(e[1]) + ")</span>";
        }).join(" ; ") + "</li><li><b>Suite :</b> " + u(a.suite) + '</li><li><b>Travail prévu :</b> apprendre les définitions ; refaire le quiz du chapitre (Activités ▸ Quiz).</li></ul></td></tr><tr><td class="h"></td><td><b>Après la leçon</b><ul><li>Qu’est-ce qui a marché dans ma leçon ?</li><li>Qu’est-ce que je dois modifier ?</li></ul><br></td></tr></table>';
    }
    function b(e) {
        a && (a.querySelector(".msg").textContent = e || "");
    }
    async function g(e, t) {
        var o = null;
        try {
            o = window.claude && claude.use ? await claude.use("downloads") : null;
        } catch (e) {}
        if (o) try {
            await o.save({
                filename: t,
                data: e
            }), b("Enregistré : " + t);
        } catch (e) {
            b(e && "declined" == e.code ? "Téléchargement annulé." : "Téléchargement impossible dans cette vue.");
        } else if (window.claude) b("Enregistrement impossible dans cette vue : ouvrez l’atlas sur un ordinateur."); else try {
            var i = document.createElement("a");
            i.href = URL.createObjectURL(e), i.download = t, document.body.appendChild(i), i.click(), 
            setTimeout(function() {
                URL.revokeObjectURL(i.href), i.remove();
            }, 4e3), b("Téléchargé : " + t);
        } catch (e) {
            b("Téléchargement impossible dans cette vue.");
        }
    }
    function v() {
        var e = p(), t = c.filter(function(e) {
            return e[0] === s.tab;
        })[0] || c[0], o = "<b>🎓 Espace collège</b>" + c.map(function(e) {
            return '<button type="button" data-tab="' + e[0] + '" aria-pressed="' + (e[0] === t[0]) + '">' + e[1] + "</button>";
        }).join("");
        ("fiche" === t[0] || "seq" === t[0]) && P().length > 1 && (o += '<select data-vid aria-label="Séquence">' + P().map(function(t) {
            return '<option value="' + t.id + '"' + (t.id === e.id ? " selected" : "") + ">" + u(t.title) + "</option>";
        }).join("") + "</select>"), "fiche" === t[0] && (o += '<select data-ci aria-label="Séance">' + e.chapters.map(function(e, t) {
            return '<option value="' + t + '"' + (t === s.ci ? " selected" : "") + ">" + (t + 1) + ". " + u(e.short) + "</option>";
        }).join("") + "</select>"), o += (("fiche" === t[0] || "seq" === t[0]) && !window.COLLEGE.SEQC[e.id].nopdf ? '<button type="button" data-b="pdf" title="Version d’origine, sans vos modifications">⬇ PDF</button>' : "") + '<button type="button" data-b="word" title="Avec vos modifications">⬇ Word</button>' + (window.claude ? "" : '<button type="button" data-b="print">🖨 Imprimer</button>') + '<button type="button" data-b="x" aria-label="Fermer">✕ Fermer</button><span class="msg" aria-live="polite"></span>', 
        a.querySelector(".col-bar").innerHTML = o;
        var i = a.querySelector(".col-sheet");
        i.innerHTML = t[2](), i.contentEditable = "fiche" === t[0] || "seq" === t[0] ? "true" : "false", 
        a.querySelector(".col-scroll").scrollTop = 0;
    }
    function q() {
        a && (a.remove(), a = null, document.body.classList.remove("col-print"));
    }
    function x(e, t) {
        e && (s.tab = e), null != t && (s.ci = t), a || ((a = document.createElement("div")).className = "col-ov", 
        a.setAttribute("role", "dialog"), a.setAttribute("aria-modal", "true"), a.setAttribute("aria-label", "Espace collège"), 
        a.innerHTML = '<div class="col-bar"></div><div class="col-scroll"><div class="col-sheet" spellcheck="true"></div></div>', 
        document.body.appendChild(a), a.addEventListener("click", function(e) {
            var t, i, n, r = e.target.closest("[data-tab],[data-niv],[data-b],[data-go]");
            if (r) if (r.dataset.tab) s.tab = r.dataset.tab, v(); else if (r.dataset.niv) s.niv = r.dataset.niv, 
            v(); else if (r.dataset.go) {
                var l, c = o.vols();
                for (l = 0; l < c.length; l++) if (c[l].id === r.dataset.go) return q(), o.leaveHome && o.leaveHome(), 
                void o.volet(l, 0);
            } else if ("x" === r.dataset.b) q(); else if ("word" === r.dataset.b) {
                var d = a.querySelector(".col-sheet h1");
                g(new Blob([ (i = a.querySelector(".col-sheet").innerHTML, n = d ? d.textContent : "Espace collège", 
                '\ufeff<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"><title>' + u(n) + "</title><style>body{font-family:Arial,sans-serif;font-size:11pt}h1{font-size:16pt}h2{font-size:13pt}h3{font-size:11.5pt}table{border-collapse:collapse;width:100%}td,th{border:1pt solid #000;padding:4pt 6pt;vertical-align:top}th{background:#eee}.col-rem,.sub{color:#555}.col-st{font-weight:bold}.col-lv{display:none}</style></head><body>" + i.replace(/<button[^>]*>(.*?)<\/button>/g, "$1") + "</body></html>") ], {
                    type: "application/msword"
                }), (t = d ? d.textContent : "espace-college", String(t).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "").toLowerCase().slice(0, 50) + ".doc"));
            } else if ("pdf" === r.dataset.b) !function() {
                var e = p(), t = "seq" === s.tab ? e.chapters.length : s.ci, o = "fiche-" + e.id + "-" + ("seq" === s.tab ? "sequence" : ("0" + (t + 1)).slice(-2)) + ".pdf";
                b("Préparation du PDF…"), fetch("paquets/fiches-index.json").then(function(e) {
                    if (!e.ok) throw 0;
                    return e.json();
                }).then(function(o) {
                    var i = (o[e.id] || [])[t];
                    if (!i) throw 0;
                    return fetch("paquets/fiches-" + e.id + ".txt", {
                        headers: {
                            Range: "bytes=" + i[0] + "-" + (i[0] + i[1] - 1)
                        }
                    }).then(function(e) {
                        if (!e.ok) throw 0;
                        return e.text().then(function(t) {
                            for (var o = atob((206 === e.status ? t : t.slice(i[0], i[0] + i[1])).trim()), n = new Uint8Array(o.length), a = 0; a < o.length; a++) n[a] = o.charCodeAt(a);
                            return new Blob([ n ], {
                                type: "application/pdf"
                            });
                        });
                    });
                }).catch(function() {
                    return fetch("fiches/" + e.id + "-" + ("0" + (t + 1)).slice(-2) + ".pdf").then(function(e) {
                        if (!e.ok) throw 0;
                        return e.blob();
                    });
                }).then(function(e) {
                    g(e, o);
                }).catch(function() {
                    b("PDF introuvable : utilisez « Word ».");
                });
            }(); else if ("print" === r.dataset.b) {
                document.body.classList.add("col-print"), b("Si rien ne s’ouvre (appli Claude), utilisez « Word ».");
                try {
                    window.print();
                } catch (e) {}
            }
        }), a.addEventListener("change", function(e) {
            e.target.matches("[data-ci]") && (s.ci = +e.target.value, v()), e.target.matches("[data-vid]") && (s.vid = e.target.value, 
            s.ci = 0, v());
        })), v();
    }
    function L() {
        var t = document.getElementById("tabs");
        if (t && !document.getElementById("colHome")) {
            var i = document.createElement("button");
            i.type = "button", i.id = "colHome", i.className = "col-home", i.innerHTML = '<span class="ic" aria-hidden="true">🎓</span><span><b>Espace collège</b><small>Programmes adaptés 6e-3e et ce que les atlas couvrent · fiche séance à la trame officielle · séquence et évaluation · suite du chantier</small></span>', 
            i.addEventListener("click", function() {
                x("prog");
            }), t.parentNode.insertBefore(i, t.nextSibling);
        }
        var n = document.querySelector(".drawer section[data-sec=fiche]");
        if (n && !document.getElementById("colFiche")) {
            var a = document.createElement("button");
            a.type = "button", a.id = "colFiche", a.className = "tile wide", a.innerHTML = '<span class="ti" aria-hidden="true">🎓</span><b>Fiche séance (collège)</b><small>Trame officielle : problématique, notions, compétences, déroulé. Modifiable, export Word.</small>', 
            a.addEventListener("click", function() {
                var t = o.vol();
                x("fiche", t && e.SEQC[t.id] ? o.ci() : 0);
            }), n.insertBefore(a, n.firstChild);
        }
    }
}();