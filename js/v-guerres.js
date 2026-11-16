/* Atlas du collège — volet « Les guerres mondiales (1914-1945) » (3e). Écrit dans une autre conversation, directement dans l'artefact claude.ai ;
   récupéré le 17/11/2026 depuis la version publiée (code minifié remis en forme : les noms de variables courts viennent de là).
   Même format que v-colonies.js : chapitres, étapes (ph), questions (q), fiche séance (fs). */
!function() {
    "use strict";
    var e = window.ATLAS, n = e.r, a = e.L, i = e.Pu, s = e.Ph, t = e.Rg, o = window.PAYS || {};
    function l(e, n, a, i) {
        return {
            t: e,
            lon: n,
            lat: a,
            z: i
        };
    }
    function u(e) {
        return l(e, 20, 12, .46);
    }
    function EU(e) {
        return l(e, 16, 50, 1.6);
    }
    function PA(e) {
        return l(e, 150, 8, .62);
    }
    function NC(e) {
        return l(e, 165.6, -21.2, 13);
    }
    function FR(e) {
        return l(e, 2.5, 46.6, 4.2);
    }
    function p(e, n, a, i) {
        var s = [];
        return e.split(" ").forEach(function(e) {
            o[e] && (s = s.concat(o[e]));
        }), s.length ? t(s, n, a, null == i ? .62 : i, 2) : null;
    }
    function m(e) {
        return e.filter(Boolean);
    }
    function g(e, n) {
        return e && Object.keys(n).forEach(function(a) {
            e[a] = n[a];
        }), e;
    }
    function R(e, n, a, i) {
        return t([ e ], n, a, null == i ? .62 : i, 2);
    }
    function b(e, n, a, i, s, r) {
        var t, o = [];
        for (t = 0; t < 20; t++) {
            var l = t / 20 * 2 * Math.PI, u = e + a * Math.cos(l) / Math.cos(n * Math.PI / 180), d = n + a * Math.sin(l);
            o.push([ u > 180 ? u - 360 : u < -180 ? u + 360 : u, d ]);
        }
        return {
            k: "poly",
            ring: o,
            col: i,
            a: null == r ? .6 : r,
            t0: s,
            fade: 2,
            nostroke: !0
        };
    }
    function v(e, a, i, s, r) {
        return (r = r || {}).ship = !0, r.sp = "vapeur", n(e, a, i, 3, s, r);
    }
    var AL = "fra", CE = "#5b6779", AX = "#5b6779", AXA = "#8a94a3", GB = "gbr", SU = "pol", US = "lap", JP = "zh", FL = "kan", DIC = "esp", NEU = "neo";
    var I = [ 166.44, -22.27 ];
    var SUEZ = [ [ 43.5, 12.6 ], [ 42.5, 13.5 ], [ 37.5, 21 ], [ 33.6, 27.6 ], [ 32.55, 30 ], [ 32.3, 31.5 ], [ 25, 33.6 ], [ 16, 35 ], [ 11, 37.6 ], [ 8, 40 ], [ 5.3, 43.2 ] ];
    var NCAD = [ [ 166.3, -22.5 ], [ 162, -25 ], [ 157, -30 ], [ 153.5, -36.5 ], [ 151, -43 ], [ 146.6, -45 ], [ 141, -44 ], [ 132, -41 ], [ 119, -38 ], [ 112, -33 ], [ 103, -18 ], [ 90, -6 ], [ 79.5, 5 ], [ 70, 5 ], [ 57, 10 ], [ 52, 13 ], [ 48.5, 12.9 ], [ 45, 12.2 ] ];
    var ZO = [ [ -1.78, 43.37 ], [ -1.25, 44.6 ], [ -1.2, 46.15 ], [ -2.5, 47.3 ], [ -4.7, 48 ], [ -4.6, 48.6 ], [ -3, 48.85 ], [ -1.6, 48.65 ], [ -1.6, 49.65 ], [ -.2, 49.3 ], [ .2, 49.7 ], [ 1.6, 50.2 ], [ 1.6, 50.9 ], [ 2.55, 51.09 ], [ 4.2, 50 ], [ 5.8, 49.5 ], [ 8.2, 49 ], [ 7.6, 47.6 ], [ 7, 47.4 ], [ 6.1, 46.3 ], [ 5.5, 47.1 ], [ 4.85, 46.78 ], [ 3.33, 46.56 ], [ 2.07, 47.22 ], [ .9, 47.2 ], [ .6, 46.5 ], [ .15, 45.65 ], [ -.5, 43.9 ], [ -1.2, 43.1 ] ];
    var EST42 = [ [ 22, 54.5 ], [ 24, 57.5 ], [ 28, 59.7 ], [ 31, 59.5 ], [ 33, 58 ], [ 34.5, 56.5 ], [ 36, 55.6 ], [ 36.5, 53 ], [ 37.5, 51.5 ], [ 39.5, 50 ], [ 43.5, 49 ], [ 44.5, 48.7 ], [ 45.5, 46.5 ], [ 46, 44 ], [ 44, 42.6 ], [ 39.5, 44.3 ], [ 37, 45.3 ], [ 33.5, 44.5 ], [ 30, 46.2 ], [ 26, 48 ], [ 23.5, 50.5 ] ];
    var MANDCH = [ [ 120, 40.5 ], [ 124, 40 ], [ 130.5, 42.5 ], [ 131, 45 ], [ 135, 48 ], [ 127, 50 ], [ 121, 53 ], [ 119, 50 ], [ 116, 46 ] ];
    var CHINE = [ [ 109, 21.5 ], [ 110.5, 21 ], [ 114, 22.3 ], [ 118, 24.5 ], [ 120.5, 28 ], [ 122, 31 ], [ 121, 36 ], [ 119, 39 ], [ 117, 40 ], [ 113, 40.5 ], [ 111, 38 ], [ 112, 34 ], [ 114, 30.5 ], [ 113, 28 ], [ 112, 24 ] ];
    var NGN = [ [ 141, -2.2 ], [ 141, -5.3 ], [ 144.5, -6.3 ], [ 147.9, -8 ], [ 149, -7.6 ], [ 156.5, -7.2 ], [ 156, -.8 ], [ 146, -.4 ] ];
    var FO = [ [ 2.6, 51.1 ], [ 2.9, 50.4 ], [ 2.8, 49.9 ], [ 3.4, 49.4 ], [ 4, 49.3 ], [ 5.4, 49.2 ], [ 6.7, 48.6 ], [ 7.1, 47.8 ], [ 7.3, 47.4 ] ];
    var B = [ {
        short: "1914-1918 : une guerre mondiale",
        col: "eur",
        dur: 60,
        when: [ 1914, 1918 ],
        dates: "1914 – 1918",
        proj: "plan",
        cam: [ EU(0), EU(7), l(8, 6, 49.5, 2.6), l(15, 6, 49.5, 2.6), l(16, 22, 45, 1.3), l(26, 22, 45, 1.3), l(27, 28, 52, 1.2), l(33, 28, 52, 1.2), u(35), u(45), EU(47), EU(60) ],
        zones: m([ p("FRA GBR BEL SRB MNE", AL, 2), p("RUS UKR BLR FIN EST LVA LTU MDA GEO ARM AZE", AL, 2), p("DEU AUT HUN CZE SVK SVN HRV BIH", CE, 2), p("TUR SYR IRQ JOR LBN ISR PSE", CE, 16), p("ITA", AL, 17), p("BGR", CE, 18), p("ROU", AL, 20), p("GRC PRT", AL, 21), p("USA", AL, 30), p("CAN AUS NZL ZAF IND PAK BGD MMR LKA EGY SDN NGA GHA KEN", AL, 36, .45), p("DZA TUN MAR SEN MLI GIN CIV BFA NER BEN MRT TCD CAF COG GAB MDG VNM KHM LAO NCL", AL, 36, .45), p("JPN", AL, 38, .5), g(p("RUS UKR BLR FIN EST LVA LTU MDA GEO ARM AZE", NEU, 31, .4), {}) ]),
        routes: [ n("pol", 9, 13, 2.6, FO, {
            dash: !0,
            straight: !0,
            step: 1
        }) ],
        labels: [ a(1, 18.41, 43.86, "Sarajevo", {
            mark: "site",
            gold: !0,
            sub: "28 juin 1914",
            dx: 10,
            al: "left",
            end: 16
        }), a(3, 2.35, 48.85, "France", {
            nomark: !0,
            end: 8,
            dy: -14
        }), a(3.5, 10.5, 51.5, "Empire allemand", {
            nomark: !0,
            big: !0,
            end: 15
        }), a(4, 16, 47.8, "Autriche-Hongrie", {
            nomark: !0,
            end: 15,
            dy: 14
        }), a(4.5, 37, 56, "Empire russe", {
            nomark: !0,
            big: !0,
            end: 15
        }), a(9, 4.37, 50.85, "Belgique", {
            mark: "ville",
            sub: "envahie, août 1914",
            dx: 10,
            al: "left",
            end: 15
        }), a(10, 3.5, 48.95, "La Marne", {
            mark: "site",
            gold: !0,
            sub: "septembre 1914",
            dx: -10,
            al: "right",
            end: 15
        }), a(12, 2.9, 50.2, "Front ouest", {
            nomark: !0,
            sub: "tranchées, 1914-1918",
            dx: -14,
            al: "right",
            dy: -16,
            end: 15
        }), a(11, 20.1, 53.5, "Tannenberg", {
            mark: "site",
            sub: "août 1914",
            dx: 10,
            al: "left",
            end: 26
        }), a(18, 26.4, 40.2, "Dardanelles", {
            mark: "site",
            sub: "1915",
            dx: 10,
            al: "left",
            end: 26
        }), a(22, 5.39, 49.16, "Verdun", {
            mark: "site",
            gold: !0,
            sub: "1916",
            dx: 10,
            al: "left",
            end: 34
        }), a(23, 2.7, 49.97, "Somme", {
            mark: "site",
            sub: "1916",
            dx: -10,
            al: "right",
            end: 34
        }), a(17, 12.5, 42.5, "Italie", {
            nomark: !0,
            sub: "entre en guerre en 1915",
            dx: 10,
            al: "left",
            end: 26
        }), a(28, 30.3, 59.95, "Petrograd", {
            mark: "ville",
            gold: !0,
            sub: "révolutions de 1917",
            dx: 10,
            al: "left",
            end: 34
        }), a(31, 23.7, 52.1, "Brest-Litovsk", {
            mark: "site",
            sub: "paix de mars 1918",
            dx: -10,
            al: "right",
            end: 34
        }), a(36, -98, 40, "États-Unis", {
            nomark: !0,
            sub: "en guerre en avril 1917",
            end: 46
        }), a(37, 79, 22, "Inde", {
            nomark: !0,
            sub: "1,3 million de soldats",
            end: 46
        }), a(37.5, 134, -25, "Australie", {
            nomark: !0,
            end: 46
        }), a(38, 138, 37, "Japon", {
            nomark: !0,
            sub: "allié de l’Entente",
            dx: 10,
            al: "left",
            end: 46
        }), a(39, -171.8, -13.8, "Samoa allemandes", {
            sub: "prises par la Nouvelle-Zélande, 1914",
            dx: 10,
            al: "left",
            end: 46
        }), a(39.5, 147, -6, "Nouvelle-Guinée allemande", {
            nomark: !0,
            sub: "prise par l’Australie, 1914",
            dy: 18,
            end: 46
        }), a(40, I[0], I[1], "Nouvelle-Calédonie", {
            mark: "star",
            gold: !0,
            dx: -10,
            al: "right",
            end: 46
        }), a(49, 2.9, 49.43, "Rethondes", {
            mark: "site",
            gold: !0,
            sub: "armistice, 11 novembre 1918",
            dx: 10,
            al: "left"
        }) ],
        pulses: [ i(1, 18.41, 43.86, "#ff6b57", !0), i(22, 5.39, 49.16, "#ff6b57", !0), i(49, 2.9, 49.43, "#ffd166", !0) ],
        ph: [ s(0, "28 juin 1914 : Sarajevo", "À Sarajevo, un nationaliste serbe assassine l’héritier de l’Autriche-Hongrie. Le jeu des alliances fait le reste : en août 1914, la Triple-Entente (France, Royaume-Uni, Russie) entre en guerre contre l’Allemagne et l’Autriche-Hongrie, les « Empires centraux ». Tous croient à une guerre courte.", "eur"), s(8, "1914 : la guerre de mouvement échoue", "L’armée allemande traverse la Belgique et fonce vers Paris ; elle est arrêtée sur la Marne en septembre. À l’est, les Russes sont battus à Tannenberg. Fin 1914, à l’ouest, le front s’immobilise de la mer du Nord à la Suisse : les soldats s’enterrent dans des tranchées.", "fra"), s(16, "1915-1916 : la guerre s’étend", "L’Empire ottoman rejoint les Empires centraux (fin 1914), puis la Bulgarie ; l’Italie (1915) et la Roumanie (1916) rejoignent l’Entente. Aux Dardanelles, Français, Britanniques, Australiens et Néo-Zélandais échouent face aux Ottomans (1915). En 1916, Verdun et la Somme font des centaines de milliers de morts pour quelques kilomètres.", "eur"), s(27, "1917 : l’année tournant", "En Russie, deux révolutions renversent le tsar puis portent les bolcheviks au pouvoir. La Russie sort de la guerre (paix de Brest-Litovsk, mars 1918). Mais en avril 1917, les États-Unis entrent en guerre aux côtés de l’Entente.", "pol"), s(34, "Une guerre mondiale", "La guerre est mondiale parce que les empires mobilisent leurs colonies : soldats et travailleurs viennent d’Afrique, d’Inde, d’Indochine, d’Océanie. On se bat aussi hors d’Europe : au Proche-Orient, en Afrique, et dans le Pacifique, où la Nouvelle-Zélande, l’Australie et le Japon s’emparent dès 1914 des colonies allemandes.", "ame"), s(46, "11 novembre 1918 : l’armistice", "En 1918, l’Allemagne lance une dernière offensive, puis recule face aux Alliés renforcés par les Américains et les chars. L’armistice est signé le 11 novembre 1918 à Rethondes. Environ 10 millions de soldats sont morts, dont 1,4 million de Français.", "fra") ],
        photos: [ { id: "ferdinand1914", t0: 1, t1: 8, pos: "tr", rot: 2, fit: "" }, { id: "petrograd1917", t0: 27, t1: 30, pos: "tr", rot: 2, fit: "" }, { id: "tranchee1918", t0: 30, t1: 34, pos: "bl", rot: -2, fit: "" }, { id: "senegalais1914", t0: 35, t1: 41, pos: "tr", rot: 2, fit: "" }, { id: "armistice1918", t0: 47, t1: 55, pos: "tr", rot: 2, fit: "" } ],
        legend: [ [ AL, "Entente et ses alliés" ], [ CE, "Empires centraux et leurs alliés" ], [ NEU, "Russie sortie de la guerre (1918)" ] ],
        mots: [ [ "Triple-Entente", "Alliance de la France, du Royaume-Uni et de la Russie." ], [ "Empires centraux", "L’Allemagne et l’Autriche-Hongrie, rejointes par l’Empire ottoman et la Bulgarie." ], [ "Front", "Ligne où les armées ennemies se font face." ], [ "Tranchée", "Fossé creusé par les soldats pour se protéger des tirs." ], [ "Armistice", "Accord qui arrête les combats ; ce n’est pas encore la paix." ] ],
        q: [ [ "Quel événement déclenche la guerre ?", "L’assassinat de l’héritier de l’Autriche-Hongrie à Sarajevo, le 28 juin 1914." ], [ "Pourquoi le front ouest s’immobilise-t-il fin 1914 ?", "L’offensive allemande est arrêtée sur la Marne ; les deux armées s’enterrent dans des tranchées." ], [ "Quels changements se produisent en 1917 ?", "La Russie sort de la guerre après ses révolutions ; les États-Unis entrent en guerre." ], [ "Pourquoi parle-t-on de guerre mondiale ?", "Les empires mobilisent leurs colonies et l’on combat sur plusieurs continents et océans." ] ],
        wiki: [ "Première Guerre mondiale", "Attentat de Sarajevo", "Bataille de Verdun", "Armistice de 1918" ],
        fs: {
            niv: "3e",
            pb: "Pourquoi la guerre qui éclate en 1914 devient-elle une guerre mondiale et longue ?",
            but: "Faire construire les grandes étapes de la guerre et comprendre son extension au monde par les alliances et les empires.",
            notions: [ "alliances", "front, tranchée", "guerre de mouvement, guerre de position", "armistice" ],
            comp: [ "Se repérer dans le temps : construire des repères historiques", "Se repérer dans l’espace : nommer et localiser les grands repères géographiques" ],
            meth: "Lire une carte animée ; construire une frise des étapes.",
            accroche: "Mettre la carte en pause sur l’étape 1, puis sur l’étape 5 : « Comment un assassinat dans les Balkans finit-il par toucher la Nouvelle-Calédonie ? »",
            act: [ "Carte animée en entier : compléter une frise (juin 1914, septembre 1914, 1916, 1917, novembre 1918).", "Étape « Une guerre mondiale » : relever trois preuves que la guerre n’est pas seulement européenne.", "Rédiger trois phrases : pourquoi la guerre dure-t-elle quatre ans ?" ],
            fin: "La guerre éclate en 1914 à cause du jeu des alliances. La guerre de mouvement échoue et le front se fige dans les tranchées. Elle devient mondiale avec les empires coloniaux et l’entrée des États-Unis, et se termine par l’armistice du 11 novembre 1918.",
            suite: "Lien avec la séance suivante : comment soldats et civils vivent-ils cette guerre ?"
        }
    }, {
        short: "Civils et militaires dans la guerre totale",
        col: "fra",
        dur: 60,
        when: [ 1914, 1918 ],
        dates: "1914 – 1918",
        proj: "plan",
        cam: [ l(0, 4.5, 49.5, 3), l(18, 4.5, 49.5, 3), l(20, 32, 42, 1.6), l(28, 32, 42, 1.6), u(30), u(42), NC(44), NC(60) ],
        zones: m([ R([ [ -4.7, 48 ], [ 2.55, 51.09 ], [ 6.1, 49.5 ], [ 7.6, 47.6 ], [ 4, 46 ], [ -1.2, 46.15 ] ], AL, 0, .25), p("TUR SYR IRQ", CE, 20, .45), p("ARM", AL, 21, .45), p("SEN MLI GIN CIV BFA NER BEN MRT DZA TUN MAR MDG VNM", AL, 30, .4), p("IND PAK BGD AUS NZL", GB, 30, .4), p("NCL", AL, 30, .6) ]),
        routes: [ n("pol", 2, 8, 2.4, FO, {
            dash: !0,
            straight: !0,
            step: 1
        }), v(AL, 31, 40, [ [ -17.4, 14.7 ], [ -18, 21 ], [ -13, 28 ], [ -9.5, 34 ], [ -5.6, 35.95 ], [ 0, 37.3 ], [ 5.3, 43.2 ] ], {
            nosea: !0
        }), v(GB, 32, 41, [ [ 72.8, 18.9 ], [ 62, 16 ], [ 52, 13 ] ].concat(SUEZ), {
            nosea: !0
        }), v(AL, 33, 42, NCAD.concat(SUEZ), {
            nosea: !0
        }) ],
        labels: [ a(2, 5.39, 49.16, "Verdun", {
            mark: "site",
            gold: !0,
            sub: "février-décembre 1916",
            dx: 10,
            al: "left",
            end: 19
        }), a(3, 2.7, 49.97, "Somme", {
            mark: "site",
            sub: "juillet-novembre 1916",
            dx: -10,
            al: "right",
            end: 19
        }), a(4, 2.88, 50.85, "Ypres", {
            mark: "site",
            sub: "gaz, 1915",
            dx: -10,
            al: "right",
            end: 19
        }), a(5, 3.6, 49.45, "Chemin des Dames", {
            mark: "site",
            sub: "1917",
            dx: 10,
            al: "left",
            dy: 14,
            end: 19
        }), a(11, 2.35, 48.85, "Paris", {
            mark: "ville",
            sub: "usines d’armement",
            dx: -10,
            al: "right",
            end: 19
        }), a(12, 3.06, 50.63, "Lille", {
            mark: "ville",
            sub: "occupée",
            dx: 10,
            al: "left",
            end: 19
        }), a(21, 44.5, 40.2, "Arméniens", {
            nomark: !0,
            big: !0,
            sub: "génocide, 1915-1916",
            end: 29
        }), a(22, 38.9, 35.9, "Deir ez-Zor", {
            mark: "site",
            sub: "déportations",
            dx: 10,
            al: "left",
            end: 29
        }), a(23, 28.95, 41, "Constantinople", {
            mark: "ville",
            dx: -10,
            al: "right",
            end: 29
        }), a(31, -17.44, 14.69, "Dakar", {
            mark: "port",
            sub: "tirailleurs « sénégalais »",
            dx: -10,
            al: "right",
            end: 42
        }), a(32, 72.83, 18.97, "Bombay", {
            mark: "port",
            dx: 10,
            al: "left",
            end: 42
        }), a(33, I[0], I[1], "Nouméa", {
            mark: "star",
            gold: !0,
            dx: 10,
            al: "left",
            end: 43
        }), a(35, 5.37, 43.3, "Marseille", {
            mark: "port",
            dx: 10,
            al: "left",
            end: 42
        }), a(46, 166.44, -22.27, "Nouméa", {
            mark: "port",
            sub: "départ des contingents",
            dx: -10,
            al: "right",
            zmin: 6
        }), a(48, 164.86, -21.06, "Koné", {
            mark: "site",
            sub: "1917",
            dx: -10,
            al: "right",
            zmin: 6
        }), a(49, 164.97, -20.86, "Tiamou", {
            mark: "site",
            gold: !0,
            sub: "révolte de 1917",
            dx: 10,
            al: "left",
            zmin: 6
        }), a(50, 164.95, -20.69, "Hienghène", {
            nomark: !0,
            dx: 10,
            al: "left",
            zmin: 6,
            dy: -14
        }) ],
        pulses: [ i(2, 5.39, 49.16, "#ff6b57", !0), i(49, 164.97, -20.86, "#ffd166", !0) ],
        ph: [ s(0, "Vivre et mourir dans les tranchées", "Les soldats, les « poilus », vivent dans la boue, le froid, les rats, sous les obus. Les armes nouvelles (mitrailleuses, artillerie lourde, gaz de combat dès 1915) tuent en masse. À Verdun, en 1916, plus de 300 000 soldats français et allemands meurent en dix mois.", "fra"), s(9, "Une guerre totale", "Toute la société est mobilisée. Les usines produisent des obus et des canons ; les femmes remplacent les hommes partis au front, aux champs et dans les usines d’armement (les « munitionnettes »). L’État contrôle l’économie, emprunte, censure la presse et répand une propagande contre l’ennemi.", "eur"), s(19, "Les civils, victimes de la guerre", "Les civils souffrent de l’occupation (nord de la France, Belgique), des bombardements, des pénuries. En 1915-1916, le gouvernement ottoman organise l’extermination des Arméniens : massacres et déportations vers les déserts de Syrie. Plus d’un million de personnes meurent : c’est un génocide.", "ame"), s(29, "Les soldats des empires", "Les colonies fournissent des soldats et des travailleurs : environ 600 000 soldats coloniaux pour la France, dont les tirailleurs dits « sénégalais » venus de toute l’Afrique occidentale ; plus d’un million d’Indiens pour le Royaume-Uni. Australiens et Néo-Zélandais combattent aux Dardanelles et en France.", "afr"), s(42, "Les Calédoniens dans la Grande Guerre", "Plus de 2 000 Calédoniens d’origine européenne et plus de 1 000 tirailleurs kanak partent pour l’Europe. Le bataillon mixte du Pacifique, formé en 1916, combat au Chemin des Dames (1917) et dans l’Aisne (1918). Plusieurs centaines d’hommes ne reviennent pas : les monuments aux morts des communes et des tribus portent leurs noms.", "kan"), s(51, "1917 : la guerre en Nouvelle-Calédonie", "En 1917, dans le nord de la Grande Terre, autour de Koné et de Hienghène, des Kanak se soulèvent contre le recrutement et la colonisation, derrière le chef Noël de Tiamou. La révolte est durement réprimée ; Noël est tué en 1918.", "neo") ],
        photos: [ { id: "masquegaz", t0: 2, t1: 8, pos: "tr", rot: 2, fit: "contain" }, { id: "munitionnettes", t0: 10, t1: 16, pos: "tr", rot: 2, fit: "" }, { id: "armeniens1915", t0: 20, t1: 26, pos: "tr", rot: 2, fit: "" }, { id: "senegalais1914", t0: 30, t1: 36, pos: "bl", rot: -2, fit: "" }, { id: "tirailleurs", t0: 43, t1: 49, pos: "tr", rot: 2, fit: "" } ],
        legend: [ [ AL, "Empire français" ], [ GB, "Empire britannique" ], [ CE, "Empire ottoman" ] ],
        mots: [ [ "Poilu", "Surnom des soldats français de la Grande Guerre." ], [ "Guerre totale", "Guerre qui mobilise toutes les forces d’un pays : soldats, économie, civils, esprits." ], [ "Propagande", "Information orientée pour influencer l’opinion." ], [ "Génocide", "Extermination volontaire et organisée d’un peuple." ], [ "Tirailleur", "Soldat recruté dans les colonies françaises." ] ],
        q: [ [ "Citer deux armes nouvelles de la Grande Guerre.", "Par exemple les gaz de combat, les mitrailleuses, l’artillerie lourde, les chars." ], [ "Pourquoi parle-t-on de guerre totale ?", "Parce que toute la société est mobilisée : armée, économie, femmes, propagande." ], [ "Quel peuple est victime d’un génocide en 1915-1916 ?", "Les Arméniens de l’Empire ottoman." ], [ "Où combat le bataillon mixte du Pacifique ?", "En France : au Chemin des Dames en 1917 et dans l’Aisne en 1918." ] ],
        wiki: [ "Guerre totale", "Génocide arménien", "Tirailleurs sénégalais", "Révolte kanak de 1917" ],
        fs: {
            niv: "3e",
            pb: "En quoi la Première Guerre mondiale est-elle une guerre totale, pour les soldats comme pour les civils ?",
            but: "Faire comprendre la violence de masse du conflit et la mobilisation des sociétés, en métropole, dans les colonies et en Nouvelle-Calédonie.",
            notions: [ "guerre totale", "violence de masse", "génocide", "mobilisation des empires" ],
            comp: [ "Analyser et comprendre un document : identifier le document et son point de vue particulier", "Raisonner : justifier une démarche, une interprétation" ],
            meth: "Étude de cas locale (les Calédoniens dans la guerre), puis mise en perspective (Verdun, le génocide arménien).",
            accroche: "Photographier, ou projeter, la liste du monument aux morts de la commune : « Qui sont ces hommes ? Où sont-ils morts ? »",
            act: [ "Monument aux morts de la commune (ou d’une commune voisine) : relever des noms, des dates, des lieux ; formuler des hypothèses.", "Carte animée, étapes 1 à 3 : compléter un tableau « soldats / civils » (ce qu’ils vivent, ce qu’ils subissent).", "Étape « Les Calédoniens dans la Grande Guerre » : situer les lieux de départ et de combat ; expliquer pourquoi des Kanak combattent en Europe et pourquoi d’autres se révoltent en 1917." ],
            fin: "La Première Guerre mondiale est une guerre totale : les soldats subissent une violence de masse, les civils sont mobilisés et parfois exterminés, comme les Arméniens. Les colonies, dont la Nouvelle-Calédonie, fournissent des combattants.",
            suite: "Lien avec la séance suivante : que devient l’Europe après une telle guerre ?"
        }
    }, {
        short: "Démocraties fragilisées et totalitarismes",
        col: "pol",
        dur: 60,
        when: [ 1918, 1939 ],
        dates: "1918 – 1939",
        proj: "plan",
        cam: [ EU(0), EU(8), l(9, 50, 55, 1), l(19, 50, 55, 1), l(20, 14, 45, 2.2), l(26, 14, 45, 2.2), u(27), u(32), EU(33), EU(60) ],
        zones: m([ p("FRA GBR IRL BEL NLD LUX CHE NOR SWE DNK FIN CZE SVK", AL, 2, .5), p("POL EST LVA LTU", NEU, 3, .45), p("SRB HRV SVN BIH MNE MKD", NEU, 3, .45), p("RUS UKR BLR KAZ UZB TKM KGZ TJK GEO ARM AZE", SU, 10), p("ITA", AXA, 21), p("USA", US, 28, .45), p("DEU", AX, 34), p("HUN POL ROU BGR PRT GRC", DIC, 46, .5), g(p("ESP", DIC, 47, .6), {}), p("AUT", AX, 52), p("CZE", AX, 54), g(p("SVK", AXA, 54), {}) ]),
        routes: [],
        labels: [ a(1, 2.12, 48.8, "Versailles", {
            mark: "site",
            gold: !0,
            sub: "traité, 28 juin 1919",
            dx: -10,
            al: "right",
            end: 20
        }), a(3, 19.5, 52, "Pologne", {
            nomark: !0,
            sub: "renaît en 1918",
            end: 20
        }), a(4, 17.5, 49.6, "Tchécoslovaquie", {
            nomark: !0,
            end: 20,
            dy: 14
        }), a(4.5, 19, 44.5, "Yougoslavie", {
            nomark: !0,
            end: 20
        }), a(5, 6.18, 48.7, "Alsace-Moselle", {
            nomark: !0,
            sub: "redevient française",
            dx: 10,
            al: "left",
            end: 20
        }), a(11, 37.6, 55.75, "Moscou", {
            mark: "ville",
            gold: !0,
            sub: "URSS, 1922",
            dx: 10,
            al: "left",
            end: 20
        }), a(13, 31, 49, "Ukraine", {
            nomark: !0,
            sub: "famine, 1932-1933",
            end: 20
        }), a(15, 150.8, 62, "Kolyma", {
            mark: "site",
            sub: "camps du goulag",
            dx: -10,
            al: "right",
            end: 20
        }), a(21, 12.5, 41.9, "Rome", {
            mark: "ville",
            gold: !0,
            sub: "Mussolini, 1922",
            dx: 10,
            al: "left",
            end: 27
        }), a(28, -74, 40.7, "New York", {
            mark: "ville",
            gold: !0,
            sub: "krach, octobre 1929",
            dx: 10,
            al: "left",
            end: 33
        }), a(34, 13.4, 52.5, "Berlin", {
            mark: "ville",
            gold: !0,
            sub: "Hitler au pouvoir, 1933",
            dx: 10,
            al: "left",
            end: 50
        }), a(36, 11.6, 48.1, "Munich", {
            mark: "ville",
            dx: 10,
            al: "left",
            end: 50
        }), a(37, 11.43, 48.27, "Dachau", {
            mark: "site",
            sub: "camp, 1933",
            dx: -10,
            al: "right",
            end: 50,
            dy: 12
        }), a(43, 2.35, 48.85, "Paris", {
            mark: "ville",
            sub: "Front populaire, 1936",
            dx: -10,
            al: "right",
            end: 50
        }), a(47, -2.68, 43.31, "Guernica", {
            mark: "site",
            sub: "1937",
            dx: -10,
            al: "right",
            end: 58
        }), a(47.5, -3.7, 40.4, "Espagne", {
            nomark: !0,
            sub: "guerre civile, 1936-1939",
            dy: 14,
            end: 58
        }), a(52, 16.37, 48.2, "Vienne", {
            mark: "ville",
            sub: "Anschluss, mars 1938",
            dx: 10,
            al: "left"
        }), a(53, 11.57, 48.15, "Munich", {
            mark: "site",
            sub: "accords, septembre 1938",
            dx: -10,
            al: "right",
            dy: -12
        }), a(54, 14.42, 50.08, "Prague", {
            mark: "ville",
            sub: "mars 1939",
            dx: 10,
            al: "left"
        }), a(57, 21, 52.23, "Varsovie", {
            mark: "ville",
            gold: !0,
            sub: "1er septembre 1939",
            dx: 10,
            al: "left"
        }) ],
        pulses: [ i(1, 2.12, 48.8, "#ffd166", !0), i(28, -74, 40.7, "#ff6b57", !0), i(57, 21, 52.23, "#ff6b57", !0) ],
        ph: [ s(0, "1919 : la paix des vainqueurs", "Le traité de Versailles (28 juin 1919) déclare l’Allemagne responsable de la guerre : elle rend l’Alsace-Moselle, perd des territoires et ses colonies, doit payer des réparations et réduire son armée. Beaucoup d’Allemands le vivent comme une humiliation. Sur les ruines des empires naissent de nouveaux États, souvent des démocraties fragiles.", "eur"), s(9, "L’URSS de Staline", "En 1917, les bolcheviks de Lénine prennent le pouvoir en Russie ; l’URSS naît en 1922. Staline, seul maître à partir de la fin des années 1920, impose un parti unique, la collectivisation des terres, une famine en Ukraine (1932-1933) et la terreur : des millions de personnes envoyées dans les camps du goulag ou exécutées.", "pol"), s(20, "L’Italie fasciste", "En 1922, Mussolini prend le pouvoir après la « marche sur Rome ». Le fascisme supprime les libertés, interdit les autres partis, glorifie la violence, la nation et le chef, le Duce, et embrigade la jeunesse.", "eur"), s(27, "1929 : la crise", "En octobre 1929, la Bourse de New York s’effondre. La crise gagne le monde : faillites, chômage de masse, misère. En Allemagne, il y a environ 6 millions de chômeurs en 1932. Les démocraties paraissent impuissantes ; les partis extrémistes progressent.", "ame"), s(33, "L’Allemagne nazie", "Hitler est nommé chancelier en janvier 1933. En quelques mois, il installe une dictature : parti unique, police politique (Gestapo), camps pour les opposants (Dachau). L’idéologie nazie est raciste et antisémite : les lois de Nuremberg (1935) excluent les Juifs, la « Nuit de cristal » (1938) les livre aux violences.", "eur"), s(42, "Des démocraties sous pression", "En France, des ligues d’extrême droite manifestent violemment (6 février 1934) ; en 1936, le Front populaire gagne les élections et accorde les congés payés et la semaine de 40 heures. Mais en Europe, les dictatures se multiplient. En Espagne, la guerre civile (1936-1939) porte Franco au pouvoir ; Guernica est bombardée par l’aviation allemande en 1937.", "fra"), s(50, "Vers une nouvelle guerre", "Hitler veut agrandir l’Allemagne : il annexe l’Autriche (mars 1938), obtient les Sudètes aux accords de Munich (septembre 1938), envahit la Tchécoslovaquie (mars 1939). Le 23 août 1939, il signe un pacte avec Staline. Le 1er septembre, l’Allemagne attaque la Pologne.", "eur") ],
        photos: [ { id: "versailles1919", t0: 1, t1: 8, pos: "tr", rot: 2, fit: "" }, { id: "lenine1920", t0: 10, t1: 16, pos: "tr", rot: 2, fit: "" }, { id: "crise1930", t0: 27, t1: 32, pos: "tr", rot: 2, fit: "" } ],
        legend: [ [ AL, "Démocraties" ], [ NEU, "Nouveaux États de 1918-1919" ], [ SU, "URSS (communiste)" ], [ AXA, "Italie fasciste" ], [ AX, "Allemagne nazie" ], [ DIC, "Autres régimes autoritaires (vers 1938)" ], [ US, "États-Unis" ] ],
        mots: [ [ "Totalitarisme", "Régime qui veut contrôler toute la société et chaque individu : parti unique, chef tout-puissant, terreur, propagande." ], [ "Fascisme", "Régime totalitaire de Mussolini en Italie, nationaliste et violent." ], [ "Nazisme", "Idéologie et régime d’Hitler, raciste et antisémite." ], [ "Communisme", "Projet de société sans propriété privée ; en URSS, il devient la dictature de Staline." ], [ "Goulag", "Système des camps de travail forcé en URSS." ], [ "Antisémitisme", "Haine des Juifs." ] ],
        q: [ [ "Pourquoi beaucoup d’Allemands rejettent-ils le traité de Versailles ?", "Ils le vivent comme une humiliation : l’Allemagne est déclarée responsable, perd des territoires et doit payer." ], [ "Citer trois points communs aux régimes totalitaires.", "Un parti unique, un chef tout-puissant, la terreur, la propagande, l’embrigadement de la jeunesse." ], [ "Quelles conséquences a la crise de 1929 ?", "Chômage de masse et misère ; les partis extrémistes progressent." ], [ "Citer deux étapes de l’expansion allemande avant la guerre.", "L’Anschluss (mars 1938), les Sudètes (septembre 1938), la Tchécoslovaquie (mars 1939)." ] ],
        wiki: [ "Traité de Versailles", "Totalitarisme", "Crise de 1929", "Accords de Munich" ],
        fs: {
            niv: "3e",
            pb: "Comment des régimes totalitaires s’imposent-ils en Europe entre les deux guerres, face à des démocraties fragilisées ?",
            but: "Faire caractériser les régimes totalitaires et comprendre ce qui fragilise les démocraties après 1918.",
            notions: [ "démocratie", "totalitarisme", "fascisme, nazisme, communisme stalinien", "crise économique" ],
            comp: [ "Raisonner : construire des hypothèses d’interprétation", "Pratiquer différents langages : réaliser un tableau comparatif" ],
            meth: "Comparer deux régimes (Allemagne nazie, URSS de Staline) dans un tableau, puis dégager les points communs.",
            accroche: "Carte d’Europe en 1919 puis en 1938 : « Combien de démocraties restent en 1938 ? »",
            act: [ "Carte animée : compter et nommer les démocraties en 1919 et en 1938.", "Tableau comparatif URSS / Italie / Allemagne : chef, parti, idéologie, moyens de contrôle (étapes 2, 3 et 5).", "Paragraphe argumenté : « Pourquoi ces trois régimes sont-ils qualifiés de totalitaires ? »" ],
            fin: "Après 1918, les démocraties sont fragilisées par les traités, puis par la crise de 1929. Des régimes totalitaires s’imposent : URSS de Staline, Italie fasciste, Allemagne nazie. L’expansion d’Hitler mène à la guerre en 1939.",
            suite: "Lien avec la séance suivante : la Seconde Guerre mondiale, une guerre d’anéantissement."
        }
    }, {
        short: "1939-1945 : une guerre d’anéantissement",
        col: "eur",
        dur: 60,
        when: [ 1939, 1945 ],
        dates: "1939 – 1945",
        proj: "plan",
        cam: [ EU(0), EU(11), l(12, 30, 50, 1.3), l(21, 30, 50, 1.3), l(22, 24, 51, 2), l(42, 24, 51, 2), EU(43), EU(53), u(54), u(60) ],
        zones: m([ p("GBR", GB, 0, .5), p("RUS UKR BLR KAZ GEO ARM AZE", SU, 0, .5), g(p("DEU AUT CZE", AX, 0), {
            t2: 57,
            t3: 59
        }), g(p("POL", AX, 2), {
            t2: 47,
            t3: 49
        }), g(p("NOR DNK NLD BEL LUX", AX, 7), {
            t2: 50,
            t3: 52
        }), g(R(ZO, AX, 8), {
            t2: 50,
            t3: 52
        }), g(p("ITA HUN ROU BGR FIN SVK", AXA, 10), {
            t2: 48,
            t3: 50
        }), g(p("SRB HRV SVN BIH MNE MKD GRC ALB", AX, 11), {
            t2: 51,
            t3: 53
        }), g(R(EST42, AX, 13), {
            t2: 44,
            t3: 47
        }), g(p("EST LVA LTU", AX, 13), {
            t2: 47,
            t3: 49
        }), p("USA", US, 17, .45) ]),
        routes: [ n(GB, 49, 53, 2.6, [ [ -1, 50.6 ], [ -.6, 49.4 ] ], {}), n(SU, 45, 53, 2.6, [ [ 44.5, 48.7 ], [ 37, 49 ], [ 30.5, 50.4 ], [ 24, 51 ], [ 21, 52.2 ], [ 13.4, 52.5 ] ], {
            dash: !0,
            straight: !0,
            step: 1
        }) ],
        labels: [ a(1, 21, 52.23, "Varsovie", {
            mark: "ville",
            sub: "septembre 1939",
            dx: 10,
            al: "left",
            end: 12
        }), a(7, 2.35, 48.85, "Paris", {
            mark: "ville",
            sub: "juin 1940",
            dx: -10,
            al: "right",
            end: 12
        }), a(9, -.13, 51.5, "Londres", {
            mark: "ville",
            gold: !0,
            sub: "bataille d’Angleterre, 1940",
            dx: -10,
            al: "right",
            end: 22
        }), a(13, 37.6, 55.75, "Moscou", {
            mark: "ville",
            sub: "décembre 1941",
            dx: 10,
            al: "left",
            end: 22
        }), a(14, 30.3, 59.95, "Leningrad", {
            mark: "site",
            sub: "siège, 1941-1944",
            dx: 10,
            al: "left",
            end: 22
        }), a(15, 44.5, 48.7, "Stalingrad", {
            mark: "site",
            gold: !0,
            sub: "1942-1943",
            dx: 10,
            al: "left",
            end: 55
        }), a(23, 30.45, 50.47, "Babi Yar", {
            mark: "site",
            sub: "septembre 1941",
            dx: 10,
            al: "left",
            end: 42
        }), a(25, 13.16, 52.43, "Wannsee", {
            mark: "site",
            sub: "janvier 1942",
            dx: -10,
            al: "right",
            end: 42
        }), a(33, 19.18, 50.03, "Auschwitz-Birkenau", {
            mark: "site",
            gold: !0,
            dx: -10,
            al: "right",
            end: 43
        }), a(34, 22.05, 52.63, "Treblinka", {
            mark: "site",
            dx: 10,
            al: "left",
            end: 43
        }), a(34.5, 23.6, 51.45, "Sobibor", {
            mark: "site",
            dx: 10,
            al: "left",
            end: 43
        }), a(35, 23.46, 50.38, "Belzec", {
            mark: "site",
            dx: 10,
            al: "left",
            dy: 12,
            end: 43
        }), a(35.5, 18.6, 52.2, "Chelmno", {
            mark: "site",
            dx: -10,
            al: "right",
            end: 43
        }), a(36, 22.6, 51.22, "Majdanek", {
            mark: "site",
            dx: -10,
            al: "right",
            dy: 12,
            end: 43
        }), a(37, 21, 52.23, "Ghetto de Varsovie", {
            mark: "ville",
            sub: "révolte, 1943",
            dx: -10,
            al: "right",
            dy: -12,
            end: 43
        }), a(44, 28.95, 30.83, "El Alamein", {
            mark: "site",
            sub: "novembre 1942",
            dx: 10,
            al: "left",
            end: 54
        }), a(49, -.8, 49.35, "Normandie", {
            mark: "site",
            gold: !0,
            sub: "6 juin 1944",
            dx: -10,
            al: "right",
            end: 54
        }), a(52, 13.4, 52.5, "Berlin", {
            mark: "ville",
            gold: !0,
            sub: "capitulation, 8 mai 1945",
            dx: 10,
            al: "left"
        }), a(55, 11.08, 49.45, "Nuremberg", {
            mark: "site",
            sub: "procès, 1945-1946",
            dx: 10,
            al: "left"
        }) ],
        pulses: [ i(15, 44.5, 48.7, "#ff6b57", !0), i(33, 19.18, 50.03, "#ff6b57", !0), i(52, 13.4, 52.5, "#ffd166", !0) ],
        ph: [ s(0, "1939-1940 : les victoires allemandes", "Le 1er septembre 1939, l’Allemagne envahit la Pologne, partagée avec l’URSS ; la France et le Royaume-Uni lui déclarent la guerre. Au printemps 1940, l’armée allemande écrase le Danemark, la Norvège, les Pays-Bas, la Belgique et la France. Le Royaume-Uni de Churchill résiste seul.", "eur"), s(12, "1941 : la guerre devient mondiale", "En juin 1941, Hitler attaque l’URSS ; ses armées arrivent devant Moscou et Leningrad. En décembre 1941, le Japon attaque les États-Unis à Pearl Harbor. Deux camps s’affrontent désormais sur toute la planète : les Alliés (Royaume-Uni, URSS, États-Unis) et l’Axe (Allemagne, Italie, Japon).", "pol"), s(22, "Une guerre d’anéantissement", "À l’Est, les nazis veulent détruire les peuples qu’ils jugent « inférieurs » et vider les terres pour les coloniser. Villages brûlés, civils massacrés, environ 3 millions de prisonniers soviétiques morts de faim ; Leningrad assiégée pendant près de 900 jours. L’Europe occupée est pillée et ses habitants envoyés travailler en Allemagne.", "ame"), s(30, "La Shoah", "Dès 1941, en URSS occupée, des unités mobiles fusillent les Juifs (à Babi Yar, près de Kiev, plus de 33 000 en deux jours). En janvier 1942, la conférence de Wannsee organise la « solution finale » : les Juifs de toute l’Europe sont déportés vers des centres de mise à mort, comme Auschwitz-Birkenau ou Treblinka. Environ 6 millions de Juifs sont assassinés, ainsi que des centaines de milliers de Tsiganes.", "ame"), s(43, "1942-1945 : la victoire des Alliés", "Fin 1942, l’Axe est arrêté à El Alamein et à Stalingrad, où l’armée allemande capitule en février 1943. Les Alliés débarquent en Italie (1943), en Normandie (6 juin 1944) et en Provence. L’Armée rouge avance vers Berlin. L’Allemagne capitule le 8 mai 1945.", "gbr"), s(54, "Un bilan sans précédent", "Environ 60 millions de morts, dont plus de la moitié de civils ; l’URSS en compte à elle seule plus de 20 millions. À Nuremberg (1945-1946), des dirigeants nazis sont jugés pour crimes contre l’humanité, une notion nouvelle.", "eur") ],
        photos: [ { id: "londres1945", t0: 5, t1: 11, pos: "tr", rot: 2, fit: "contain" }, { id: "normandie1944", t0: 44, t1: 51, pos: "tr", rot: 2, fit: "" }, { id: "hiroshima1945", t0: 54, t1: 60, pos: "bl", rot: -2, fit: "" } ],
        legend: [ [ AX, "Allemagne et territoires occupés" ], [ AXA, "Alliés de l’Allemagne" ], [ GB, "Royaume-Uni" ], [ SU, "URSS" ], [ US, "États-Unis" ] ],
        mots: [ [ "Axe", "Alliance de l’Allemagne, de l’Italie et du Japon." ], [ "Alliés", "Royaume-Uni, URSS, États-Unis et leurs partenaires." ], [ "Guerre d’anéantissement", "Guerre qui vise à détruire l’ennemi, y compris sa population civile." ], [ "Shoah", "Extermination des Juifs d’Europe par les nazis (environ 6 millions de morts)." ], [ "Centre de mise à mort", "Camp construit pour tuer, en masse, les déportés à leur arrivée." ], [ "Crime contre l’humanité", "Crime grave commis contre des civils en raison de ce qu’ils sont (définition de 1945)." ] ],
        q: [ [ "Quels pays forment l’Axe ?", "L’Allemagne, l’Italie et le Japon." ], [ "Pourquoi la guerre devient-elle mondiale en 1941 ?", "Hitler attaque l’URSS en juin, puis le Japon attaque les États-Unis en décembre." ], [ "Qu’est-ce que la Shoah ?", "L’extermination organisée des Juifs d’Europe par les nazis : environ 6 millions de morts." ], [ "Citer deux tournants de la guerre.", "El Alamein et Stalingrad (1942-1943), le débarquement de Normandie (1944)." ] ],
        wiki: [ "Seconde Guerre mondiale", "Shoah", "Bataille de Stalingrad", "Débarquement de Normandie" ],
        fs: {
            niv: "3e",
            pb: "Pourquoi la Seconde Guerre mondiale est-elle une guerre d’anéantissement ?",
            but: "Faire comprendre la dimension idéologique et exterminatrice de la guerre nazie, et les grandes étapes du conflit en Europe.",
            notions: [ "guerre d’anéantissement", "Shoah, génocide", "centre de mise à mort", "crime contre l’humanité" ],
            comp: [ "Analyser et comprendre un document : extraire des informations pertinentes pour répondre à une question", "Se repérer dans le temps et dans l’espace : localiser les grands repères du conflit" ],
            meth: "Carte animée puis témoignage (au choix de l’enseignant : un récit de rescapé adapté à l’âge des élèves).",
            accroche: "Carte de l’Europe fin 1942 : « Jusqu’où va la domination nazie ? Que s’y passe-t-il ? »",
            act: [ "Carte animée, étapes 1, 2 et 5 : compléter une frise (septembre 1939, juin 1940, juin et décembre 1941, février 1943, 6 juin 1944, 8 mai 1945).", "Étapes 3 et 4 : relever les preuves que la guerre vise aussi les civils.", "Carte des centres de mise à mort : localiser, puis expliquer avec ses mots ce qu’est la Shoah." ],
            fin: "La Seconde Guerre mondiale est une guerre d’anéantissement : les nazis veulent détruire des peuples entiers. La Shoah fait environ 6 millions de victimes juives. Les Alliés l’emportent en 1945, au prix d’environ 60 millions de morts.",
            suite: "Lien avec la séance suivante : la guerre dans le Pacifique."
        }
    }, {
        short: "La guerre du Pacifique",
        col: "zh",
        dur: 60,
        when: [ 1931, 1945 ],
        dates: "1931 – 1945",
        proj: "plan",
        cam: [ l(0, 125, 30, 1), l(11, 125, 30, 1), PA(12), PA(36), NC(38), NC(47), PA(48), PA(60) ],
        zones: m([ p("JPN KOR PRK TWN", JP, 0), g(b(134.5, 7.4, 2, JP, 1), {
            t2: 52,
            t3: 54
        }), g(b(151, 7, 4, JP, 1), {
            t2: 50,
            t3: 52
        }), g(b(169.6, 7.5, 3.4, JP, 1), {
            t2: 46,
            t3: 48
        }), g(b(145.7, 15.5, 2.4, JP, 1), {
            t2: 49,
            t3: 51
        }), g(R(MANDCH, JP, 4), {
            t2: 58,
            t3: 60
        }), g(R(CHINE, JP, 7, .5), {
            t2: 58,
            t3: 60
        }), p("USA", US, 13, .5), b(-157.9, 21.3, 3, US, 13), p("AUS NZL", GB, 13, .45), p("NCL", FL, 13, .6), g(p("VNM LAO KHM", JP, 17, .5), {
            t2: 58,
            t3: 60
        }), g(p("PHL", JP, 20), {
            t2: 55,
            t3: 57
        }), g(p("IDN MYS BRN SGP TLS", JP, 21), {
            t2: 57,
            t3: 59
        }), g(p("MMR", JP, 22), {
            t2: 56,
            t3: 58
        }), p("THA", AXA, 21, .45), g(R(NGN, JP, 23), {
            t2: 51,
            t3: 53
        }), g(p("SLB", JP, 24), {
            t2: 33,
            t3: 36
        }), g(b(173, 1.4, 2, JP, 24), {
            t2: 48,
            t3: 50
        }) ]),
        routes: [ n(US, 31, 35, 2.4, [ [ 166.4, -22.3 ], [ 163, -15 ], [ 160, -9.4 ] ], {
            dash: !0
        }), n(US, 49, 57, 2.6, [ [ 160, -9.4 ], [ 173, 1.4 ], [ 169.6, 7.5 ], [ 145.7, 15.2 ], [ 141.3, 24.8 ], [ 127.8, 26.3 ] ], {
            dash: !0,
            straight: !0,
            step: 1
        }) ],
        labels: [ a(1, 135, 35.5, "Japon", {
            nomark: !0,
            big: !0,
            end: 12
        }), a(2, 127.5, 37, "Corée", {
            nomark: !0,
            sub: "japonaise depuis 1910",
            dx: 10,
            al: "left",
            end: 12
        }), a(4, 123.4, 41.8, "Moukden", {
            mark: "ville",
            sub: "Mandchourie, 1931",
            dx: 10,
            al: "left",
            end: 12
        }), a(8, 118.8, 32.06, "Nankin", {
            mark: "ville",
            gold: !0,
            sub: "massacre, 1937",
            dx: 10,
            al: "left",
            end: 12
        }), a(13, -157.95, 21.35, "Pearl Harbor", {
            mark: "port",
            gold: !0,
            sub: "7 décembre 1941",
            dx: 10,
            al: "left"
        }), a(20, 120.98, 14.6, "Manille", {
            mark: "ville",
            sub: "1942",
            dx: -10,
            al: "right",
            end: 36
        }), a(21, 103.85, 1.29, "Singapour", {
            mark: "port",
            sub: "février 1942",
            dy: 16,
            end: 36
        }), a(22, 113, -2, "Indes néerlandaises", {
            nomark: !0,
            sub: "pétrole, caoutchouc",
            end: 36
        }), a(24, 147.2, -9.45, "Port Moresby", {
            mark: "port",
            sub: "menacé, 1942",
            dx: 10,
            al: "left",
            end: 36
        }), a(25, 130.85, -12.46, "Darwin", {
            mark: "ville",
            sub: "bombardée, 1942",
            dx: -10,
            al: "right",
            end: 36
        }), a(29, 155, -14, "Mer de Corail", {
            mark: "site",
            gold: !0,
            sub: "mai 1942",
            dx: 10,
            al: "left"
        }), a(30, -177.37, 28.2, "Midway", {
            mark: "site",
            gold: !0,
            sub: "juin 1942",
            dx: 10,
            al: "left"
        }), a(31, 160, -9.4, "Guadalcanal", {
            mark: "site",
            gold: !0,
            sub: "1942-1943",
            dx: 10,
            al: "left"
        }), a(32, I[0], I[1], "Nouméa", {
            mark: "star",
            gold: !0,
            sub: "base américaine",
            dx: -10,
            al: "right",
            zmax: 6
        }), a(39, 166.44, -22.27, "Nouméa", {
            mark: "port",
            gold: !0,
            sub: "QG du Pacifique Sud",
            dx: -10,
            al: "right",
            zmin: 6
        }), a(40, 166.21, -22.01, "Tontouta", {
            mark: "site",
            sub: "aérodrome",
            dx: 10,
            al: "left",
            zmin: 6
        }), a(41, 165.02, -21.25, "Plaine des Gaïacs", {
            mark: "site",
            sub: "aérodrome",
            dx: 10,
            al: "left",
            zmin: 6
        }), a(42, 164.9, -21.13, "Pouembout", {
            mark: "ville",
            dx: -10,
            al: "right",
            zmin: 6,
            dy: -10
        }), a(50, 172.98, 1.42, "Tarawa", {
            mark: "site",
            sub: "1943",
            dx: 10,
            al: "left"
        }), a(52, 145.75, 15.18, "Saipan", {
            mark: "site",
            sub: "1944",
            dx: 10,
            al: "left"
        }), a(54, 141.32, 24.78, "Iwo Jima", {
            mark: "site",
            sub: "1945",
            dx: 10,
            al: "left"
        }), a(55, 127.8, 26.3, "Okinawa", {
            mark: "site",
            sub: "avril-juin 1945",
            dx: -10,
            al: "right"
        }), a(57, 132.45, 34.39, "Hiroshima", {
            mark: "site",
            gold: !0,
            sub: "6 août 1945",
            dx: -10,
            al: "right",
            dy: -12
        }), a(58, 129.87, 32.75, "Nagasaki", {
            mark: "site",
            gold: !0,
            sub: "9 août 1945",
            dx: -10,
            al: "right",
            dy: 12
        }) ],
        pulses: [ i(13, -157.95, 21.35, "#ff6b57", !0), i(30, -177.37, 28.2, "#ffd166", !0), i(57, 132.45, 34.39, "#ff6b57", !0) ],
        ph: [ s(0, "Le Japon, une puissance impériale", "Le Japon s’est construit un empire : Taïwan (1895), la Corée (1910), les anciennes îles allemandes du Pacifique Nord (1919). En 1931, son armée occupe la Mandchourie ; en 1937, elle envahit la Chine. À Nankin, des dizaines de milliers de civils chinois sont massacrés.", "pol"), s(12, "7 décembre 1941 : Pearl Harbor", "Le Japon attaque par surprise la flotte américaine à Pearl Harbor, à Hawaï. Les États-Unis entrent en guerre contre le Japon, puis contre l’Allemagne et l’Italie.", "pol"), s(19, "1942 : un empire japonais immense", "En six mois, le Japon conquiert les Philippines, la Malaisie, Singapour, les Indes néerlandaises riches en pétrole, la Birmanie, puis une partie de la Nouvelle-Guinée et les Salomon. Darwin est bombardée ; l’Australie et la Nouvelle-Calédonie sont menacées. L’occupation japonaise est brutale : travail forcé, massacres, femmes forcées à la prostitution.", "pol"), s(28, "1942 : l’avance japonaise arrêtée", "En mai 1942, la bataille de la mer de Corail, au nord-ouest de la Nouvelle-Calédonie, bloque l’avance japonaise vers le sud. En juin, à Midway, les Américains coulent quatre porte-avions japonais. D’août 1942 à février 1943, ils reprennent Guadalcanal, aux Salomon.", "mis"), s(37, "La Nouvelle-Calédonie, base américaine", "Le 12 mars 1942, les premières troupes américaines débarquent à Nouméa. La colonie devient la grande base arrière du Pacifique Sud : quartier général de l’amiral Halsey, ports, hôpitaux, camps, aérodromes comme Tontouta et la Plaine des Gaïacs. Des dizaines de milliers de soldats y stationnent en même temps ; la société calédonienne en est durablement transformée.", "kan"), s(48, "1943-1945 : vers la capitulation du Japon", "Les Américains avancent d’île en île : Tarawa, Saipan, Iwo Jima, Okinawa, au prix de combats acharnés et des attaques suicides des kamikazes. Les villes japonaises sont bombardées. Les 6 et 9 août 1945, deux bombes atomiques détruisent Hiroshima et Nagasaki : plus de 200 000 morts d’ici la fin de 1945. L’URSS entre en guerre contre le Japon, qui capitule le 2 septembre 1945.", "pol") ],
        photos: [ { id: "pearlharbor", t0: 12, t1: 18, pos: "tr", rot: 2, fit: "" }, { id: "lexington1942", t0: 28, t1: 33, pos: "tr", rot: 2, fit: "" }, { id: "guadalcanal1943", t0: 33, t1: 37, pos: "bl", rot: -2, fit: "" }, { id: "noumea1942", t0: 37, t1: 42, pos: "tr", rot: 2, fit: "" }, { id: "troupesnc1942", t0: 42, t1: 47, pos: "bl", rot: -2, fit: "" }, { id: "hiroshima1945", t0: 50, t1: 55, pos: "tr", rot: 2, fit: "" }, { id: "missouri1945", t0: 55, t1: 60, pos: "bl", rot: -2, fit: "contain" } ],
        legend: [ [ JP, "Empire japonais (vers 1942)" ], [ AXA, "Thaïlande, alliée du Japon" ], [ US, "États-Unis" ], [ GB, "Australie et Nouvelle-Zélande" ], [ FL, "Nouvelle-Calédonie (France libre)" ] ],
        mots: [ [ "Empire japonais", "Territoires conquis par le Japon de 1895 à 1942." ], [ "Porte-avions", "Navire de guerre qui transporte des avions ; il domine la guerre du Pacifique." ], [ "Base arrière", "Territoire éloigné des combats où une armée se ravitaille, se soigne et s’entraîne." ], [ "Kamikaze", "Pilote japonais qui lance son avion chargé d’explosifs sur un navire ennemi." ], [ "Bombe atomique", "Arme nouvelle, d’une puissance immense, utilisée sur Hiroshima et Nagasaki en août 1945." ] ],
        q: [ [ "Que se passe-t-il le 7 décembre 1941 ?", "Le Japon attaque la flotte américaine à Pearl Harbor ; les États-Unis entrent en guerre." ], [ "Pourquoi la bataille de la mer de Corail concerne-t-elle la Nouvelle-Calédonie ?", "Elle arrête l’avance japonaise vers le sud, vers l’Australie et la Nouvelle-Calédonie." ], [ "Quel rôle joue la Nouvelle-Calédonie à partir de 1942 ?", "Elle devient la grande base arrière américaine du Pacifique Sud." ], [ "Comment se termine la guerre du Pacifique ?", "Après les bombes atomiques sur Hiroshima et Nagasaki, le Japon capitule le 2 septembre 1945." ] ],
        wiki: [ "Guerre du Pacifique", "Attaque de Pearl Harbor", "Bataille de la mer de Corail", "Bombardements atomiques d’Hiroshima et Nagasaki" ],
        fs: {
            niv: "3e",
            pb: "Comment la guerre du Pacifique touche-t-elle directement la Nouvelle-Calédonie ?",
            but: "Faire comprendre la dimension mondiale de la Seconde Guerre mondiale à partir du théâtre Pacifique et de l’exemple calédonien.",
            notions: [ "guerre mondiale", "base arrière", "bombe atomique" ],
            comp: [ "Se repérer dans l’espace : situer des lieux et des espaces les uns par rapport aux autres", "Raisonner : justifier une démarche, une interprétation" ],
            meth: "Changer d’échelle : du Pacifique à la Nouvelle-Calédonie.",
            accroche: "Carte du Pacifique en 1942 : « À quelle distance de Nouméa s’arrêtent les Japonais ? »",
            act: [ "Carte animée, étapes 1 à 4 : localiser Pearl Harbor, la mer de Corail, Midway, Guadalcanal ; mesurer la distance Guadalcanal – Nouméa avec l’échelle.", "Étape « La Nouvelle-Calédonie, base américaine » : relever ce que les Américains construisent ; chercher des traces dans la commune (routes, pistes, noms de lieux, souvenirs familiaux).", "Rédiger cinq lignes : « La Nouvelle-Calédonie dans la guerre du Pacifique »." ],
            fin: "De 1941 à 1945, la guerre oppose le Japon aux États-Unis et à leurs alliés dans tout le Pacifique. Menacée en 1942, la Nouvelle-Calédonie devient la grande base arrière américaine du Pacifique Sud. Le Japon capitule en septembre 1945, après les bombes atomiques.",
            suite: "Lien avec la séance suivante : pendant ce temps, que devient la France ?"
        }
    }, {
        short: "La France défaite et occupée, la Nouvelle-Calédonie libre",
        col: "fra",
        dur: 60,
        when: [ 1940, 1945 ],
        dates: "1940 – 1945",
        proj: "plan",
        cam: [ FR(0), FR(7), l(8, 0, 49, 3.4), l(13, 0, 49, 3.4), FR(14), FR(25), l(26, 60, -10, .5), l(30, 60, -10, .5), NC(31), NC(35), l(36, 20, 30, 1.6), l(45, 20, 30, 1.6), FR(46), FR(60) ],
        zones: m([ g(p("FRA", AL, 3, .35), {
            t2: 33,
            t3: 35
        }), g(R(ZO, AX, 4, .65), {
            t2: 52,
            t3: 55
        }), g(R([ [ 6.1, 49.5 ], [ 8.2, 49 ], [ 7.6, 47.6 ], [ 7, 47.4 ], [ 6.9, 48.3 ] ], AX, 5, .8), {
            t2: 56,
            t3: 58
        }), p("GBR", GB, 9, .4), p("TCD CMR COG GAB CAF", FL, 27, .55), p("PYF", FL, 28, .55), b(-149.5, -17.6, 2.6, FL, 28), p("NCL", FL, 29, .7), g(b(166, -21.4, 2.6, FL, 29, .5), {
            t2: 30,
            t3: 31
        }), g(p("FRA", AX, 47, .45), {
            t2: 52,
            t3: 55
        }) ]),
        routes: [ v(FL, 37, 43, NCAD.concat(SUEZ.slice(0, 5)), {
            nosea: !0
        }), n(GB, 51, 54, 2.6, [ [ -1, 50.6 ], [ -.6, 49.4 ] ], {}), n(US, 52, 55, 2.6, [ [ 6.5, 42.3 ], [ 6.6, 43.2 ] ], {}) ],
        labels: [ a(1, 4.94, 49.7, "Sedan", {
            mark: "site",
            sub: "mai 1940",
            dx: 10,
            al: "left",
            end: 14
        }), a(4, 2.9, 49.43, "Rethondes", {
            mark: "site",
            gold: !0,
            sub: "armistice, 22 juin 1940",
            dx: 10,
            al: "left",
            end: 14
        }), a(5, 1.5, 48.2, "Zone occupée", {
            nomark: !0,
            big: !0,
            end: 47
        }), a(5.5, 2.8, 45.2, "Zone libre", {
            nomark: !0,
            big: !0,
            end: 47
        }), a(6, 7.3, 48.6, "Alsace-Moselle", {
            nomark: !0,
            sub: "annexée de fait",
            dx: 10,
            al: "left",
            end: 47
        }), a(10, -.13, 51.5, "Londres", {
            mark: "ville",
            gold: !0,
            sub: "appel du 18 juin 1940",
            dx: -10,
            al: "right",
            end: 14
        }), a(15, 3.43, 46.13, "Vichy", {
            mark: "ville",
            gold: !0,
            sub: "gouvernement de Pétain",
            dx: 10,
            al: "left",
            end: 47
        }), a(17, .86, 47.75, "Montoire", {
            mark: "site",
            sub: "octobre 1940",
            dx: -10,
            al: "right",
            end: 25
        }), a(20, 2.29, 48.85, "Paris", {
            mark: "ville",
            sub: "rafle du Vél d’Hiv, juillet 1942",
            dx: -10,
            al: "right",
            end: 25
        }), a(21, 2.45, 48.92, "Drancy", {
            mark: "site",
            sub: "camp de transit",
            dx: 10,
            al: "left",
            end: 25
        }), a(27, 18.7, 12.1, "Tchad", {
            nomark: !0,
            sub: "26 août 1940",
            end: 31
        }), a(28, -149.57, -17.54, "Tahiti", {
            sub: "2 septembre 1940",
            dy: 16,
            end: 31
        }), a(32, 166.44, -22.27, "Nouméa", {
            mark: "star",
            gold: !0,
            sub: "19 septembre 1940",
            dx: -10,
            al: "right",
            zmin: 6
        }), a(38, 23.47, 31.6, "Bir Hakeim", {
            mark: "site",
            gold: !0,
            sub: "mai-juin 1942",
            dx: 10,
            al: "left",
            end: 46
        }), a(39, 32.4, 30.6, "Suez", {
            mark: "port",
            dx: 10,
            al: "left",
            end: 46
        }), a(48, 4.83, 45.76, "Lyon", {
            mark: "ville",
            sub: "Jean Moulin arrêté, 1943",
            dx: 10,
            al: "left",
            end: 60
        }), a(51, -.8, 49.35, "Normandie", {
            mark: "site",
            sub: "6 juin 1944",
            dx: -10,
            al: "right"
        }), a(53, 6.6, 43.2, "Provence", {
            mark: "site",
            gold: !0,
            sub: "15 août 1944",
            dx: 10,
            al: "left"
        }), a(55, 2.35, 48.85, "Paris libéré", {
            mark: "ville",
            gold: !0,
            sub: "25 août 1944",
            dx: 10,
            al: "left",
            dy: -12
        }) ],
        pulses: [ i(4, 2.9, 49.43, "#ff6b57", !0), i(32, 166.44, -22.27, "#ffd166", !0), i(55, 2.35, 48.85, "#ffd166", !0) ],
        ph: [ s(0, "Mai-juin 1940 : la défaite", "Le 10 mai 1940, l’armée allemande attaque ; elle perce le front à Sedan. Des millions de Français fuient sur les routes : c’est l’exode. Le maréchal Pétain, nouveau chef du gouvernement, signe l’armistice le 22 juin 1940 à Rethondes : la France est coupée en deux, près de 2 millions de soldats sont prisonniers.", "fra"), s(8, "18 juin 1940 : l’appel", "Depuis Londres, à la radio de la BBC, le général de Gaulle appelle les Français à refuser la défaite et à continuer le combat. Il fonde la France libre.", "gbr"), s(14, "Vichy, un régime de collaboration", "Le 10 juillet 1940, les parlementaires donnent les pleins pouvoirs à Pétain : la République disparaît, remplacée par l’« État français », installé à Vichy. Le régime est autoritaire et antisémite (statut des Juifs, octobre 1940). Il collabore avec l’occupant : sa police arrête des Juifs, comme lors de la rafle du Vél d’Hiv (juillet 1942). Environ 75 000 Juifs sont déportés de France.", "eur"), s(26, "19 septembre 1940 : la Nouvelle-Calédonie se rallie", "Dès l’été 1940, des territoires de l’empire rejoignent de Gaulle : le Tchad, le Cameroun, Tahiti. En Nouvelle-Calédonie, des Calédoniens manifestent contre Vichy ; le 19 septembre 1940, le gouverneur Henri Sautot, envoyé par la France libre, prend le pouvoir à Nouméa. La colonie est l’un des tout premiers territoires de la France libre.", "kan"), s(36, "Le Bataillon du Pacifique", "Des volontaires calédoniens et tahitiens forment le Bataillon du Pacifique, qui part en 1941. Avec les Forces françaises libres, il combat à Bir Hakeim, en Libye (mai-juin 1942), puis en Italie et en Provence en 1944.", "kan"), s(46, "Résister et libérer la France", "En novembre 1942, l’Allemagne occupe aussi la zone sud. En France, la Résistance s’organise : journaux clandestins, sabotages, maquis contre le travail obligatoire en Allemagne. Jean Moulin unifie ses mouvements (1943), avant d’être arrêté et de mourir. Les Alliés débarquent en Normandie (6 juin 1944) et en Provence (15 août) ; Paris est libéré le 25 août 1944.", "fra") ],
        photos: [ { id: "degaulle1943", t0: 8, t1: 13, pos: "tr", rot: 2, fit: "contain" }, { id: "ffl", t0: 37, t1: 44, pos: "tr", rot: 2, fit: "" }, { id: "normandie1944", t0: 48, t1: 54, pos: "bl", rot: -2, fit: "" } ],
        legend: [ [ AL, "France" ], [ AX, "Occupation allemande" ], [ GB, "Royaume-Uni" ], [ FL, "Territoires ralliés à la France libre (1940)" ], [ US, "Débarquements alliés (1944)" ] ],
        mots: [ [ "Armistice", "Accord qui arrête les combats : ici, la France vaincue accepte les conditions allemandes." ], [ "Collaboration", "Politique de coopération avec l’occupant allemand." ], [ "Régime de Vichy", "Régime autoritaire du maréchal Pétain, de 1940 à 1944 (l’« État français »)." ], [ "France libre", "Mouvement fondé par de Gaulle à Londres pour continuer la guerre." ], [ "Résistance", "Action de ceux qui luttent contre l’occupant et contre Vichy." ], [ "Ralliement", "Fait de rejoindre un camp : ici, la France libre." ] ],
        q: [ [ "Que décide l’armistice du 22 juin 1940 ?", "L’arrêt des combats ; la France est coupée en une zone occupée et une zone libre." ], [ "Que demande de Gaulle le 18 juin 1940 ?", "De refuser la défaite et de continuer le combat." ], [ "Citer deux preuves que Vichy collabore avec l’occupant.", "Le statut des Juifs, les arrestations par la police française (rafle du Vél d’Hiv), la déportation de Juifs." ], [ "Quand la Nouvelle-Calédonie rejoint-elle la France libre ?", "Le 19 septembre 1940." ] ],
        wiki: [ "Bataille de France", "Appel du 18 Juin", "Régime de Vichy", "Bataillon du Pacifique" ],
        fs: {
            niv: "3e",
            pb: "Comment les Français réagissent-ils à la défaite de 1940, en métropole et en Nouvelle-Calédonie ?",
            but: "Faire distinguer collaboration et résistance, et montrer le choix précoce de la Nouvelle-Calédonie pour la France libre.",
            notions: [ "armistice", "collaboration", "régime de Vichy", "France libre, Résistance" ],
            comp: [ "Analyser et comprendre un document : confronter un document à ce qu’on connaît par ailleurs", "Pratiquer différents langages : écrire pour construire sa pensée" ],
            meth: "Confronter deux discours de juin 1940 (Pétain le 17 juin, de Gaulle le 18 juin), puis étude de cas calédonienne.",
            accroche: "Carte de la France coupée en deux : « Qui gouverne chaque zone ? »",
            act: [ "Confronter les discours de Pétain (17 juin) et de De Gaulle (18 juin) : identifier les auteurs, relever ce que chacun propose.", "Carte animée, étapes 3 et 4 : compléter un tableau « collaborer / résister » ; expliquer le choix calédonien de septembre 1940.", "Étape « Le Bataillon du Pacifique » : localiser Bir Hakeim, la Provence ; dire pourquoi ces volontaires s’engagent." ],
            fin: "Vaincue en juin 1940, la France est occupée ; le régime de Vichy de Pétain collabore avec l’Allemagne. D’autres refusent la défaite : la France libre de De Gaulle, que la Nouvelle-Calédonie rejoint dès le 19 septembre 1940, et la Résistance intérieure. La France est libérée en 1944.",
            suite: "Évaluation de fin de séquence : voir l’Espace collège."
        }
    } ];
    e.add({
        id: "guerres",
        title: "Les guerres mondiales (1914-1945)",
        tag: "6 chapitres · XXe siècle · 3e",
        col: "eur",
        proj: "plan",
        sub: "Deux guerres totales : 1914-1918, l’entre-deux-guerres et les totalitarismes, la guerre d’anéantissement en Europe, la guerre du Pacifique, la France de Vichy et la Nouvelle-Calédonie dans la France libre.",
        frise: {
            from: 1910,
            to: 1950,
            lin: !0,
            ticks: [ [ 1910, "1910" ], [ 1914, "1914", 1 ], [ 1918, "1918", 1 ], [ 1929, "1929" ], [ 1933, "1933" ], [ 1939, "1939", 1 ], [ 1942, "1942" ], [ 1945, "1945", 1 ], [ 1950, "1950" ] ]
        },
        info: "<p><b>Collège, 3e, histoire, programme adapté à la Nouvelle-Calédonie</b> : thème 1 « L’Europe, un théâtre majeur des guerres totales (1914-1945) ». Les quatre sous-thèmes du programme sont couverts : civils et militaires dans la Première Guerre mondiale (chapitres 1 et 2), démocraties fragilisées et expériences totalitaires (chapitre 3), la Deuxième Guerre mondiale, une guerre d’anéantissement (chapitres 4 et 5), la France défaite et occupée (chapitre 6). Le Pacifique et la Nouvelle-Calédonie servent d’exemples à l’échelle locale et régionale.</p><p><b>Cartes</b> : schémas, avec les frontières des pays actuels (Natural Earth, domaine public). Les limites d’époque (empires de 1914, front de 1942, ligne de démarcation) sont simplifiées.</p><p><b>Chiffres</b> : ordres de grandeur, arrondis ; les bilans humains varient selon les sources, en particulier pour la participation calédonienne à la Grande Guerre, le génocide arménien et les victimes civiles en Asie.</p><p><b>Sujets sensibles</b> : la Shoah et les violences de masse sont présentées sans images choquantes ; l’enseignant choisit les témoignages adaptés à sa classe.</p>",
        chapters: B
    });
}();