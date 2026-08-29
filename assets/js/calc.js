/* ==========================================================================
   CALCULADORA DE AHORRO
   Se carga solo en calculator.html. Usa el traductor de app.js a través de
   window.SITE, así que la página no tiene que repetir nada.

   EL CÁLCULO, EN UNA LÍNEA
   Se compara a iluminación equivalente, no a igual potencia: para dar los
   mismos lúmenes se necesita una potencia proporcional al cociente de
   eficacias. Si el equipo actual rinde 90 lm/W y el nuestro 275, hace falta
   90/275 = 33 % de la potencia, y el ahorro es del 67 %.

   Esto tiene una consecuencia que conviene no maquillar: frente a una
   fluorescente el ahorro sale enorme, y frente a un LED moderno sale mucho
   más modesto. Una calculadora que siempre diera un 80 % no se la creería
   nadie que sepa del oficio.
   ========================================================================== */
(function () {
  'use strict';

  /* --- Valores de referencia -------------------------------------------
     Rangos habituales de mercado, los mismos que usa la escala de la
     portada. No son máximos de laboratorio ni modelos concretos: un
     catálogo de modelos envejecería en un año y obligaría a publicar
     cifras ajenas. -------------------------------------------------------- */
  const TECNOLOGIAS = [
    { k: 'tec.inc',  ef: 15,  w: 60  },
    { k: 'tec.hal',  ef: 20,  w: 50  },
    { k: 'tec.cfl',  ef: 60,  w: 20  },
    { k: 'tec.t8',   ef: 75,  w: 36  },
    { k: 'tec.t5',   ef: 90,  w: 28  },
    { k: 'tec.mh',   ef: 90,  w: 250 },
    { k: 'tec.hps',  ef: 110, w: 150 },
    { k: 'tec.led1', ef: 100, w: 40  },
    { k: 'tec.led2', ef: 150, w: 40  }
  ];

  const LUMINARIAS = [
    { k: 'fx.1',  ef: 14,  w: 60  },
    { k: 'fx.2',  ef: 18,  w: 50  },
    { k: 'fx.3',  ef: 70,  w: 36  },
    { k: 'fx.4',  ef: 90,  w: 28  },
    { k: 'fx.5',  ef: 110, w: 40  },
    { k: 'fx.6',  ef: 100, w: 15  },
    { k: 'fx.7',  ef: 85,  w: 400 },
    { k: 'fx.8',  ef: 130, w: 150 },
    { k: 'fx.9',  ef: 80,  w: 250 },
    { k: 'fx.10', ef: 120, w: 100 },
    { k: 'fx.11', ef: 105, w: 150 },
    { k: 'fx.12', ef: 130, w: 60  }
  ];

  const HORAS = [
    { k: 'hrs.office', h: 2500 },
    { k: 'hrs.retail', h: 3600 },
    { k: 'hrs.street', h: 4100 },
    { k: 'hrs.shift',  h: 6000 },
    { k: 'hrs.always', h: 8760 }
  ];

  const LOCALES = { en:'en-GB', es:'es-ES', pt:'pt-PT', fr:'fr-FR', de:'de-DE', it:'it-IT', ru:'ru-RU' };

  /* --- Diccionario ------------------------------------------------------- */
  const D = {
    en: {
      "calc.meta.title": "Savings calculator — Almenara",
      "calc.meta.desc": "Work out what you would save by replacing your current lighting. Enter your own figures, no registration.",
      "calc.eyebrow": "Savings calculator",
      "calc.title": "Run your own numbers.",
      "calc.sub": "Comparison is made at equal light output, not at equal power: to deliver the same lumens you need a power proportional to the ratio of efficacies. Nothing is registered and no email is required.",
      "calc.s1": "What you have now",
      "calc.tab.tech": "By technology", "calc.tab.fx": "Search fixture", "calc.tab.man": "Enter figures",
      "calc.pick": "Choose", "calc.search": "Type: high bay, tube, street…", "calc.noresult": "No match. Use the third tab and enter the figures.",
      "calc.man.w": "Watts per fixture", "calc.man.lm": "Lumens per fixture",
      "calc.eff.now": "Current efficacy",
      "calc.s2": "Your installation",
      "calc.points": "Number of light points", "calc.watts": "Watts per point",
      "calc.hours": "Hours of use per year", "calc.price": "Electricity price (€/kWh)",
      "calc.s3": "Advanced",
      "calc.adv.eff": "Almenara efficacy (lm/W)",
      "calc.adv.co2": "Emission factor (kg CO₂/kWh)",
      "calc.adv.cost": "Estimated cost per point (€)",
      "calc.adv.cost_help": "Optional. Fill it in and you also get the payback period. Do not know it? We work it out in the study.",
      "calc.res": "Result",
      "calc.r.saving": "Annual saving",
      "calc.r.power": "Installed load",
      "calc.r.energy": "Annual consumption",
      "calc.r.cost": "Annual electricity bill",
      "calc.r.cut": "Power reduction",
      "calc.r.ten": "Saving over ten years",
      "calc.r.co2": "CO₂ avoided per year",
      "calc.r.payback": "Payback",
      "calc.r.lmeur": "Lumens per euro per year",
      "calc.r.wcost": "Cost per installed watt per year",
      "calc.before": "Now", "calc.after": "With Almenara",
      "calc.years": "years", "calc.tonnes": "t",
      "calc.warn": "With those figures there is no saving: the efficacy you entered is already at or above ours. The calculator does not invent a gain that is not there.",
      "calc.note": "An estimate based on electricity alone. It leaves out avoided maintenance and lamp replacement, which in high-bay and street lighting are often as large as the energy saving. Our measurement conditions and the independent test report are in the technical brief.",
      "calc.cta.title": "Send us these numbers.",
      "calc.cta.body": "We return the study with your real figures, the measurement conditions behind them and the cost per point.",
      "calc.cta.btn": "Send this calculation",
      "calc.mail.subject": "Savings calculation",
      "tec.inc":"Incandescent", "tec.hal":"Halogen", "tec.cfl":"Compact fluorescent",
      "tec.t8":"T8 fluorescent tube", "tec.t5":"T5 fluorescent tube", "tec.mh":"Metal halide",
      "tec.hps":"High-pressure sodium", "tec.led1":"First-generation LED", "tec.led2":"Current LED",
      "fx.1":"Incandescent bulb 60 W", "fx.2":"Halogen spot 50 W", "fx.3":"T8 tube 36 W",
      "fx.4":"T5 tube 28 W", "fx.5":"LED panel 600×600, 40 W", "fx.6":"LED downlight 15 W",
      "fx.7":"Metal halide high bay 400 W", "fx.8":"LED high bay 150 W", "fx.9":"Metal halide floodlight 250 W",
      "fx.10":"LED floodlight 100 W", "fx.11":"Sodium street light 150 W", "fx.12":"LED street light 60 W",
      "hrs.office":"Office · 2,500 h", "hrs.retail":"Retail · 3,600 h", "hrs.street":"Street lighting · 4,100 h",
      "hrs.shift":"Two shifts · 6,000 h", "hrs.always":"Continuous · 8,760 h"
    },

    es: {
      "calc.meta.title": "Calculadora de ahorro — Almenara",
      "calc.meta.desc": "Calcula lo que ahorrarías sustituyendo tu iluminación actual. Con tus propias cifras y sin registro.",
      "calc.eyebrow": "Calculadora de ahorro",
      "calc.title": "Echa tus propias cuentas.",
      "calc.sub": "La comparación se hace a iluminación equivalente, no a igual potencia: para dar los mismos lúmenes hace falta una potencia proporcional al cociente de eficacias. No se registra nada ni se pide correo.",
      "calc.s1": "Lo que tienes ahora",
      "calc.tab.tech": "Por tecnología", "calc.tab.fx": "Buscar luminaria", "calc.tab.man": "Meter cifras",
      "calc.pick": "Elige", "calc.search": "Escribe: campana, tubo, vial…", "calc.noresult": "Sin coincidencias. Usa la tercera pestaña y mete las cifras.",
      "calc.man.w": "Vatios por luminaria", "calc.man.lm": "Lúmenes por luminaria",
      "calc.eff.now": "Eficacia actual",
      "calc.s2": "Tu instalación",
      "calc.points": "Número de puntos de luz", "calc.watts": "Vatios por punto",
      "calc.hours": "Horas de uso al año", "calc.price": "Precio del kWh (€)",
      "calc.s3": "Avanzado",
      "calc.adv.eff": "Eficacia Almenara (lm/W)",
      "calc.adv.co2": "Factor de emisión (kg CO₂/kWh)",
      "calc.adv.cost": "Coste estimado por punto (€)",
      "calc.adv.cost_help": "Opcional. Si lo rellenas, sale además el plazo de amortización. ¿No lo conoces? Te lo calculamos en el estudio.",
      "calc.res": "Resultado",
      "calc.r.saving": "Ahorro anual",
      "calc.r.power": "Potencia instalada",
      "calc.r.energy": "Consumo anual",
      "calc.r.cost": "Factura eléctrica anual",
      "calc.r.cut": "Reducción de potencia",
      "calc.r.ten": "Ahorro a diez años",
      "calc.r.co2": "CO₂ evitado al año",
      "calc.r.payback": "Amortización",
      "calc.r.lmeur": "Lúmenes por euro y año",
      "calc.r.wcost": "Coste por vatio instalado y año",
      "calc.before": "Ahora", "calc.after": "Con Almenara",
      "calc.years": "años", "calc.tonnes": "t",
      "calc.warn": "Con esas cifras no hay ahorro: la eficacia que has metido ya iguala o supera la nuestra. La calculadora no se inventa una ganancia que no existe.",
      "calc.note": "Estimación basada solo en electricidad. Deja fuera el mantenimiento y la reposición de lámparas evitados, que en campanas industriales y alumbrado vial suelen pesar tanto como el ahorro energético. Las condiciones de medida y el informe de laboratorio independiente están en la ficha técnica.",
      "calc.cta.title": "Mándanos estos números.",
      "calc.cta.body": "Te devolvemos el estudio con tus cifras reales, las condiciones de medida que las sostienen y el coste por punto de luz.",
      "calc.cta.btn": "Enviar este cálculo",
      "calc.mail.subject": "Cálculo de ahorro",
      "tec.inc":"Incandescente", "tec.hal":"Halógena", "tec.cfl":"Fluorescente compacta",
      "tec.t8":"Tubo fluorescente T8", "tec.t5":"Tubo fluorescente T5", "tec.mh":"Halogenuros metálicos",
      "tec.hps":"Vapor de sodio de alta presión", "tec.led1":"LED de primera generación", "tec.led2":"LED actual",
      "fx.1":"Bombilla incandescente 60 W", "fx.2":"Dicroica halógena 50 W", "fx.3":"Tubo T8 de 36 W",
      "fx.4":"Tubo T5 de 28 W", "fx.5":"Panel LED 600×600, 40 W", "fx.6":"Empotrable LED 15 W",
      "fx.7":"Campana de halogenuros 400 W", "fx.8":"Campana LED 150 W", "fx.9":"Proyector de halogenuros 250 W",
      "fx.10":"Proyector LED 100 W", "fx.11":"Luminaria vial de sodio 150 W", "fx.12":"Luminaria vial LED 60 W",
      "hrs.office":"Oficina · 2.500 h", "hrs.retail":"Comercio · 3.600 h", "hrs.street":"Alumbrado vial · 4.100 h",
      "hrs.shift":"Dos turnos · 6.000 h", "hrs.always":"Continuo · 8.760 h"
    },

    pt: {
      "calc.meta.title": "Calculadora de poupança — Almenara",
      "calc.meta.desc": "Calcule o que pouparia substituindo a sua iluminação actual. Com os seus próprios números e sem registo.",
      "calc.eyebrow": "Calculadora de poupança",
      "calc.title": "Faça as suas próprias contas.",
      "calc.sub": "A comparação é feita a iluminação equivalente, não a igual potência: para dar os mesmos lúmenes é precisa uma potência proporcional ao quociente das eficácias. Nada é registado nem se pede correio.",
      "calc.s1": "O que tem agora",
      "calc.tab.tech": "Por tecnologia", "calc.tab.fx": "Procurar luminária", "calc.tab.man": "Inserir valores",
      "calc.pick": "Escolha", "calc.search": "Escreva: campânula, tubo, via…", "calc.noresult": "Sem correspondências. Use o terceiro separador e insira os valores.",
      "calc.man.w": "Watts por luminária", "calc.man.lm": "Lúmenes por luminária",
      "calc.eff.now": "Eficácia actual",
      "calc.s2": "A sua instalação",
      "calc.points": "Número de pontos de luz", "calc.watts": "Watts por ponto",
      "calc.hours": "Horas de utilização por ano", "calc.price": "Preço do kWh (€)",
      "calc.s3": "Avançado",
      "calc.adv.eff": "Eficácia Almenara (lm/W)",
      "calc.adv.co2": "Factor de emissão (kg CO₂/kWh)",
      "calc.adv.cost": "Custo estimado por ponto (€)",
      "calc.adv.cost_help": "Opcional. Se preencher, obtém também o prazo de retorno. Não sabe? Calculamo-lo no estudo.",
      "calc.res": "Resultado",
      "calc.r.saving": "Poupança anual",
      "calc.r.power": "Potência instalada",
      "calc.r.energy": "Consumo anual",
      "calc.r.cost": "Factura eléctrica anual",
      "calc.r.cut": "Redução de potência",
      "calc.r.ten": "Poupança a dez anos",
      "calc.r.co2": "CO₂ evitado por ano",
      "calc.r.payback": "Retorno do investimento",
      "calc.r.lmeur": "Lúmenes por euro e ano",
      "calc.r.wcost": "Custo por watt instalado e ano",
      "calc.before": "Agora", "calc.after": "Com a Almenara",
      "calc.years": "anos", "calc.tonnes": "t",
      "calc.warn": "Com esses valores não há poupança: a eficácia que introduziu já iguala ou supera a nossa. A calculadora não inventa um ganho que não existe.",
      "calc.note": "Estimativa baseada apenas em electricidade. Deixa de fora a manutenção e a substituição de lâmpadas evitadas, que em campânulas industriais e iluminação pública costumam pesar tanto como a poupança energética. As condições de medição e o relatório de laboratório independente constam da ficha técnica.",
      "calc.cta.title": "Envie-nos estes números.",
      "calc.cta.body": "Devolvemos o estudo com os seus valores reais, as condições de medição que os sustentam e o custo por ponto de luz.",
      "calc.cta.btn": "Enviar este cálculo",
      "calc.mail.subject": "Cálculo de poupança",
      "tec.inc":"Incandescente", "tec.hal":"Halogéneo", "tec.cfl":"Fluorescente compacta",
      "tec.t8":"Tubo fluorescente T8", "tec.t5":"Tubo fluorescente T5", "tec.mh":"Iodetos metálicos",
      "tec.hps":"Vapor de sódio de alta pressão", "tec.led1":"LED de primeira geração", "tec.led2":"LED actual",
      "fx.1":"Lâmpada incandescente 60 W", "fx.2":"Dicróica de halogéneo 50 W", "fx.3":"Tubo T8 de 36 W",
      "fx.4":"Tubo T5 de 28 W", "fx.5":"Painel LED 600×600, 40 W", "fx.6":"Encastrável LED 15 W",
      "fx.7":"Campânula de iodetos 400 W", "fx.8":"Campânula LED 150 W", "fx.9":"Projector de iodetos 250 W",
      "fx.10":"Projector LED 100 W", "fx.11":"Luminária de via, sódio 150 W", "fx.12":"Luminária de via, LED 60 W",
      "hrs.office":"Escritório · 2.500 h", "hrs.retail":"Comércio · 3.600 h", "hrs.street":"Iluminação pública · 4.100 h",
      "hrs.shift":"Dois turnos · 6.000 h", "hrs.always":"Contínuo · 8.760 h"
    },

    fr: {
      "calc.meta.title": "Calculateur d'économies — Almenara",
      "calc.meta.desc": "Calculez ce que vous économiseriez en remplaçant votre éclairage actuel. Avec vos propres chiffres et sans inscription.",
      "calc.eyebrow": "Calculateur d'économies",
      "calc.title": "Faites vos propres comptes.",
      "calc.sub": "La comparaison se fait à éclairement équivalent, non à puissance égale : pour délivrer les mêmes lumens il faut une puissance proportionnelle au rapport des efficacités. Rien n'est enregistré et aucun courriel n'est demandé.",
      "calc.s1": "Ce que vous avez aujourd'hui",
      "calc.tab.tech": "Par technologie", "calc.tab.fx": "Chercher un luminaire", "calc.tab.man": "Saisir les valeurs",
      "calc.pick": "Choisir", "calc.search": "Tapez : cloche, tube, voirie…", "calc.noresult": "Aucun résultat. Utilisez le troisième onglet et saisissez les valeurs.",
      "calc.man.w": "Watts par luminaire", "calc.man.lm": "Lumens par luminaire",
      "calc.eff.now": "Efficacité actuelle",
      "calc.s2": "Votre installation",
      "calc.points": "Nombre de points lumineux", "calc.watts": "Watts par point",
      "calc.hours": "Heures d'usage par an", "calc.price": "Prix du kWh (€)",
      "calc.s3": "Avancé",
      "calc.adv.eff": "Efficacité Almenara (lm/W)",
      "calc.adv.co2": "Facteur d'émission (kg CO₂/kWh)",
      "calc.adv.cost": "Coût estimé par point (€)",
      "calc.adv.cost_help": "Facultatif. Si vous le renseignez, vous obtenez aussi le temps de retour. Vous ne le connaissez pas ? Nous le calculons dans l'étude.",
      "calc.res": "Résultat",
      "calc.r.saving": "Économie annuelle",
      "calc.r.power": "Puissance installée",
      "calc.r.energy": "Consommation annuelle",
      "calc.r.cost": "Facture d'électricité annuelle",
      "calc.r.cut": "Réduction de puissance",
      "calc.r.ten": "Économie sur dix ans",
      "calc.r.co2": "CO₂ évité par an",
      "calc.r.payback": "Retour sur investissement",
      "calc.r.lmeur": "Lumens par euro et par an",
      "calc.r.wcost": "Coût par watt installé et par an",
      "calc.before": "Aujourd'hui", "calc.after": "Avec Almenara",
      "calc.years": "ans", "calc.tonnes": "t",
      "calc.warn": "Avec ces valeurs il n'y a pas d'économie : l'efficacité saisie égale ou dépasse déjà la nôtre. Le calculateur n'invente pas un gain qui n'existe pas.",
      "calc.note": "Estimation fondée sur la seule électricité. Elle laisse de côté la maintenance et le remplacement de lampes évités, qui pèsent souvent autant que l'économie d'énergie en cloches industrielles et en voirie. Les conditions de mesure et le rapport de laboratoire indépendant figurent dans la fiche technique.",
      "calc.cta.title": "Envoyez-nous ces chiffres.",
      "calc.cta.body": "Nous renvoyons l'étude avec vos valeurs réelles, les conditions de mesure qui les fondent et le coût par point lumineux.",
      "calc.cta.btn": "Envoyer ce calcul",
      "calc.mail.subject": "Calcul d'économies",
      "tec.inc":"Incandescence", "tec.hal":"Halogène", "tec.cfl":"Fluocompacte",
      "tec.t8":"Tube fluorescent T8", "tec.t5":"Tube fluorescent T5", "tec.mh":"Iodures métalliques",
      "tec.hps":"Sodium haute pression", "tec.led1":"LED de première génération", "tec.led2":"LED actuelle",
      "fx.1":"Ampoule à incandescence 60 W", "fx.2":"Dichroïque halogène 50 W", "fx.3":"Tube T8 de 36 W",
      "fx.4":"Tube T5 de 28 W", "fx.5":"Dalle LED 600×600, 40 W", "fx.6":"Encastré LED 15 W",
      "fx.7":"Cloche à iodures 400 W", "fx.8":"Cloche LED 150 W", "fx.9":"Projecteur à iodures 250 W",
      "fx.10":"Projecteur LED 100 W", "fx.11":"Luminaire routier sodium 150 W", "fx.12":"Luminaire routier LED 60 W",
      "hrs.office":"Bureau · 2 500 h", "hrs.retail":"Commerce · 3 600 h", "hrs.street":"Voirie · 4 100 h",
      "hrs.shift":"Deux équipes · 6 000 h", "hrs.always":"Continu · 8 760 h"
    },

    de: {
      "calc.meta.title": "Einsparrechner — Almenara",
      "calc.meta.desc": "Rechnen Sie aus, was der Austausch Ihrer Beleuchtung sparen würde. Mit Ihren eigenen Zahlen und ohne Registrierung.",
      "calc.eyebrow": "Einsparrechner",
      "calc.title": "Rechnen Sie selbst nach.",
      "calc.sub": "Verglichen wird bei gleicher Lichtmenge, nicht bei gleicher Leistung: für dieselben Lumen braucht es eine Leistung im Verhältnis der Lichtausbeuten. Nichts wird gespeichert, keine E-Mail verlangt.",
      "calc.s1": "Was Sie heute haben",
      "calc.tab.tech": "Nach Technologie", "calc.tab.fx": "Leuchte suchen", "calc.tab.man": "Werte eingeben",
      "calc.pick": "Wählen", "calc.search": "Tippen Sie: Hallenleuchte, Röhre, Straße…", "calc.noresult": "Kein Treffer. Nutzen Sie den dritten Reiter und geben Sie die Werte ein.",
      "calc.man.w": "Watt je Leuchte", "calc.man.lm": "Lumen je Leuchte",
      "calc.eff.now": "Heutige Lichtausbeute",
      "calc.s2": "Ihre Anlage",
      "calc.points": "Anzahl Lichtpunkte", "calc.watts": "Watt je Lichtpunkt",
      "calc.hours": "Betriebsstunden pro Jahr", "calc.price": "Strompreis (€/kWh)",
      "calc.s3": "Erweitert",
      "calc.adv.eff": "Lichtausbeute Almenara (lm/W)",
      "calc.adv.co2": "Emissionsfaktor (kg CO₂/kWh)",
      "calc.adv.cost": "Geschätzte Kosten je Lichtpunkt (€)",
      "calc.adv.cost_help": "Freiwillig. Wenn Sie es ausfüllen, erhalten Sie zusätzlich die Amortisationszeit. Unbekannt? Wir ermitteln sie in der Studie.",
      "calc.res": "Ergebnis",
      "calc.r.saving": "Jährliche Ersparnis",
      "calc.r.power": "Anschlussleistung",
      "calc.r.energy": "Jahresverbrauch",
      "calc.r.cost": "Jährliche Stromrechnung",
      "calc.r.cut": "Leistungsminderung",
      "calc.r.ten": "Ersparnis über zehn Jahre",
      "calc.r.co2": "Vermiedenes CO₂ pro Jahr",
      "calc.r.payback": "Amortisation",
      "calc.r.lmeur": "Lumen je Euro und Jahr",
      "calc.r.wcost": "Kosten je installiertem Watt und Jahr",
      "calc.before": "Heute", "calc.after": "Mit Almenara",
      "calc.years": "Jahre", "calc.tonnes": "t",
      "calc.warn": "Mit diesen Werten gibt es keine Ersparnis: die eingegebene Lichtausbeute erreicht oder übertrifft unsere bereits. Der Rechner erfindet keinen Gewinn, den es nicht gibt.",
      "calc.note": "Schätzung allein auf Strombasis. Vermiedene Wartung und Lampenwechsel bleiben außen vor, obwohl sie bei Hallen- und Straßenbeleuchtung oft ebenso schwer wiegen wie die Energieersparnis. Messbedingungen und der Bericht des unabhängigen Labors stehen im Datenblatt.",
      "calc.cta.title": "Schicken Sie uns diese Zahlen.",
      "calc.cta.body": "Wir liefern die Studie mit Ihren echten Werten, den zugrunde liegenden Messbedingungen und den Kosten je Lichtpunkt.",
      "calc.cta.btn": "Diese Rechnung senden",
      "calc.mail.subject": "Einsparrechnung",
      "tec.inc":"Glühlampe", "tec.hal":"Halogen", "tec.cfl":"Kompaktleuchtstofflampe",
      "tec.t8":"Leuchtstoffröhre T8", "tec.t5":"Leuchtstoffröhre T5", "tec.mh":"Halogen-Metalldampf",
      "tec.hps":"Natriumhochdruck", "tec.led1":"LED der ersten Generation", "tec.led2":"Heutige LED",
      "fx.1":"Glühlampe 60 W", "fx.2":"Halogen-Spot 50 W", "fx.3":"T8-Röhre 36 W",
      "fx.4":"T5-Röhre 28 W", "fx.5":"LED-Panel 600×600, 40 W", "fx.6":"LED-Einbauleuchte 15 W",
      "fx.7":"Metalldampf-Hallenleuchte 400 W", "fx.8":"LED-Hallenleuchte 150 W", "fx.9":"Metalldampf-Strahler 250 W",
      "fx.10":"LED-Strahler 100 W", "fx.11":"Natrium-Straßenleuchte 150 W", "fx.12":"LED-Straßenleuchte 60 W",
      "hrs.office":"Büro · 2.500 h", "hrs.retail":"Handel · 3.600 h", "hrs.street":"Straße · 4.100 h",
      "hrs.shift":"Zwei Schichten · 6.000 h", "hrs.always":"Dauerbetrieb · 8.760 h"
    },

    it: {
      "calc.meta.title": "Calcolatore di risparmio — Almenara",
      "calc.meta.desc": "Calcola quanto risparmieresti sostituendo la tua illuminazione attuale. Con i tuoi numeri e senza registrazione.",
      "calc.eyebrow": "Calcolatore di risparmio",
      "calc.title": "Fai i tuoi conti.",
      "calc.sub": "Il confronto è a illuminamento equivalente, non a pari potenza: per dare gli stessi lumen serve una potenza proporzionale al rapporto delle efficienze. Non si registra nulla e non si chiede la posta elettronica.",
      "calc.s1": "Quello che hai oggi",
      "calc.tab.tech": "Per tecnologia", "calc.tab.fx": "Cerca apparecchio", "calc.tab.man": "Inserisci i valori",
      "calc.pick": "Scegli", "calc.search": "Scrivi: campana, tubo, stradale…", "calc.noresult": "Nessun risultato. Usa la terza scheda e inserisci i valori.",
      "calc.man.w": "Watt per apparecchio", "calc.man.lm": "Lumen per apparecchio",
      "calc.eff.now": "Efficienza attuale",
      "calc.s2": "Il tuo impianto",
      "calc.points": "Numero di punti luce", "calc.watts": "Watt per punto",
      "calc.hours": "Ore di funzionamento all'anno", "calc.price": "Prezzo del kWh (€)",
      "calc.s3": "Avanzato",
      "calc.adv.eff": "Efficienza Almenara (lm/W)",
      "calc.adv.co2": "Fattore di emissione (kg CO₂/kWh)",
      "calc.adv.cost": "Costo stimato per punto (€)",
      "calc.adv.cost_help": "Facoltativo. Se lo compili ottieni anche il tempo di rientro. Non lo conosci? Lo calcoliamo nello studio.",
      "calc.res": "Risultato",
      "calc.r.saving": "Risparmio annuo",
      "calc.r.power": "Potenza installata",
      "calc.r.energy": "Consumo annuo",
      "calc.r.cost": "Bolletta elettrica annua",
      "calc.r.cut": "Riduzione di potenza",
      "calc.r.ten": "Risparmio in dieci anni",
      "calc.r.co2": "CO₂ evitata all'anno",
      "calc.r.payback": "Rientro dell'investimento",
      "calc.r.lmeur": "Lumen per euro all'anno",
      "calc.r.wcost": "Costo per watt installato all'anno",
      "calc.before": "Oggi", "calc.after": "Con Almenara",
      "calc.years": "anni", "calc.tonnes": "t",
      "calc.warn": "Con questi valori non c'è risparmio: l'efficienza inserita eguaglia o supera già la nostra. Il calcolatore non inventa un guadagno che non esiste.",
      "calc.note": "Stima basata sulla sola elettricità. Restano fuori la manutenzione e la sostituzione delle lampade evitate, che nelle campane industriali e nell'illuminazione stradale pesano spesso quanto il risparmio energetico. Le condizioni di misura e il rapporto del laboratorio indipendente sono nella scheda tecnica.",
      "calc.cta.title": "Mandaci questi numeri.",
      "calc.cta.body": "Ti restituiamo lo studio con i tuoi valori reali, le condizioni di misura che li sostengono e il costo per punto luce.",
      "calc.cta.btn": "Invia questo calcolo",
      "calc.mail.subject": "Calcolo di risparmio",
      "tec.inc":"Incandescenza", "tec.hal":"Alogena", "tec.cfl":"Fluorescente compatta",
      "tec.t8":"Tubo fluorescente T8", "tec.t5":"Tubo fluorescente T5", "tec.mh":"Ioduri metallici",
      "tec.hps":"Sodio ad alta pressione", "tec.led1":"LED di prima generazione", "tec.led2":"LED attuale",
      "fx.1":"Lampadina a incandescenza 60 W", "fx.2":"Dicroica alogena 50 W", "fx.3":"Tubo T8 da 36 W",
      "fx.4":"Tubo T5 da 28 W", "fx.5":"Pannello LED 600×600, 40 W", "fx.6":"Incasso LED 15 W",
      "fx.7":"Campana a ioduri 400 W", "fx.8":"Campana LED 150 W", "fx.9":"Proiettore a ioduri 250 W",
      "fx.10":"Proiettore LED 100 W", "fx.11":"Apparecchio stradale sodio 150 W", "fx.12":"Apparecchio stradale LED 60 W",
      "hrs.office":"Ufficio · 2.500 h", "hrs.retail":"Negozio · 3.600 h", "hrs.street":"Stradale · 4.100 h",
      "hrs.shift":"Due turni · 6.000 h", "hrs.always":"Continuo · 8.760 h"
    },

    ru: {
      "calc.meta.title": "Калькулятор экономии — Almenara",
      "calc.meta.desc": "Рассчитайте, сколько сэкономите при замене нынешнего освещения. По своим цифрам и без регистрации.",
      "calc.eyebrow": "Калькулятор экономии",
      "calc.title": "Посчитайте сами.",
      "calc.sub": "Сравнение ведётся при равной освещённости, а не при равной мощности: чтобы дать те же люмены, нужна мощность, пропорциональная отношению световых отдач. Ничего не сохраняется и почта не запрашивается.",
      "calc.s1": "Что у вас сейчас",
      "calc.tab.tech": "По технологии", "calc.tab.fx": "Найти светильник", "calc.tab.man": "Ввести значения",
      "calc.pick": "Выберите", "calc.search": "Введите: колокол, лампа, улица…", "calc.noresult": "Совпадений нет. Откройте третью вкладку и введите значения.",
      "calc.man.w": "Ватт на светильник", "calc.man.lm": "Люмен на светильник",
      "calc.eff.now": "Нынешняя световая отдача",
      "calc.s2": "Ваша установка",
      "calc.points": "Число световых точек", "calc.watts": "Ватт на точку",
      "calc.hours": "Часов работы в год", "calc.price": "Цена кВт·ч (€)",
      "calc.s3": "Дополнительно",
      "calc.adv.eff": "Световая отдача Almenara (лм/Вт)",
      "calc.adv.co2": "Коэффициент выбросов (кг CO₂/кВт·ч)",
      "calc.adv.cost": "Оценочная стоимость точки (€)",
      "calc.adv.cost_help": "Необязательно. Если заполните, получите ещё и срок окупаемости. Не знаете? Мы посчитаем это в исследовании.",
      "calc.res": "Результат",
      "calc.r.saving": "Годовая экономия",
      "calc.r.power": "Установленная мощность",
      "calc.r.energy": "Годовое потребление",
      "calc.r.cost": "Годовой счёт за электричество",
      "calc.r.cut": "Снижение мощности",
      "calc.r.ten": "Экономия за десять лет",
      "calc.r.co2": "Предотвращённый CO₂ в год",
      "calc.r.payback": "Окупаемость",
      "calc.r.lmeur": "Люмен на евро в год",
      "calc.r.wcost": "Стоимость установленного ватта в год",
      "calc.before": "Сейчас", "calc.after": "С Almenara",
      "calc.years": "лет", "calc.tonnes": "т",
      "calc.warn": "При таких значениях экономии нет: введённая световая отдача уже равна нашей или выше. Калькулятор не выдумывает выигрыш, которого нет.",
      "calc.note": "Оценка только по электроэнергии. Не учтены сэкономленное обслуживание и замена ламп, которые в промышленных и уличных светильниках часто весят столько же, сколько экономия энергии. Условия измерения и протокол независимой лаборатории приведены в техническом описании.",
      "calc.cta.title": "Пришлите нам эти цифры.",
      "calc.cta.body": "Вернём расчёт с вашими реальными значениями, условиями измерения, на которых он держится, и стоимостью световой точки.",
      "calc.cta.btn": "Отправить расчёт",
      "calc.mail.subject": "Расчёт экономии",
      "tec.inc":"Лампа накаливания", "tec.hal":"Галогенная", "tec.cfl":"Компактная люминесцентная",
      "tec.t8":"Люминесцентная трубка T8", "tec.t5":"Люминесцентная трубка T5", "tec.mh":"Металлогалогенная",
      "tec.hps":"Натриевая высокого давления", "tec.led1":"Светодиод первого поколения", "tec.led2":"Современный светодиод",
      "fx.1":"Лампа накаливания 60 Вт", "fx.2":"Галогенная дихроичная 50 Вт", "fx.3":"Трубка T8 36 Вт",
      "fx.4":"Трубка T5 28 Вт", "fx.5":"Светодиодная панель 600×600, 40 Вт", "fx.6":"Встраиваемый светодиод 15 Вт",
      "fx.7":"Металлогалогенный колокол 400 Вт", "fx.8":"Светодиодный колокол 150 Вт", "fx.9":"Металлогалогенный прожектор 250 Вт",
      "fx.10":"Светодиодный прожектор 100 Вт", "fx.11":"Уличный натриевый 150 Вт", "fx.12":"Уличный светодиодный 60 Вт",
      "hrs.office":"Офис · 2500 ч", "hrs.retail":"Торговля · 3600 ч", "hrs.street":"Улица · 4100 ч",
      "hrs.shift":"Две смены · 6000 ч", "hrs.always":"Непрерывно · 8760 ч"
    }
  };

  /* ======================================================================== */

  function arranca() {
    const raiz = document.getElementById('calc');
    if (!raiz || !window.SITE) return;

    window.SITE.addDict(D);

    function t(k) {
      const el = document.createElement('span');
      el.setAttribute('data-i18n', k);
      el.textContent = k;
      return el;
    }
    // Traduce solo el trozo del documento que se acaba de crear.
    function traducir(nodo) {
      [].forEach.call(nodo.querySelectorAll('[data-i18n]'), function (el) {
        el.textContent = txt(el.getAttribute('data-i18n'));
      });
      [].forEach.call(nodo.querySelectorAll('[data-i18n-attr]'), function (el) {
        el.getAttribute('data-i18n-attr').split('|').forEach(function (par) {
          const i = par.indexOf(':');
          if (i > 0) el.setAttribute(par.slice(0, i).trim(), txt(par.slice(i + 1).trim()));
        });
      });
    }

    // Traducción inmediata de una clave, para textos que se componen a mano
    function txt(k) {
      const l = window.SITE.lang();
      return (D[l] && D[l][k]) || (D.en && D.en[k]) || k;
    }

    /* --- Estado ---------------------------------------------------------- */
    const est = {
      efNow: 90,      // eficacia actual, lm/W
      points: 200,
      watts: 250,
      hours: 4000,
      price: 0.18,
      efNew: 275,
      co2: 0.20,
      cost: null
    };

    /* --- Construcción de la interfaz ------------------------------------- */
    function campo(claveEtiqueta, id, valor, paso, min) {
      const d = document.createElement('div');
      d.className = 'field';
      const lab = document.createElement('label');
      lab.setAttribute('for', id);
      lab.setAttribute('data-i18n', claveEtiqueta);
      lab.textContent = claveEtiqueta;
      const inp = document.createElement('input');
      inp.type = 'number';
      inp.id = id;
      inp.value = valor === null ? '' : valor;
      if (paso) inp.step = paso;
      inp.min = min === undefined ? '0' : min;
      inp.inputMode = 'decimal';
      d.appendChild(lab); d.appendChild(inp);
      return d;
    }

    raiz.innerHTML = '';

    /* Paso 1: lo que hay ahora */
    const s1 = document.createElement('section');
    s1.className = 'calc-step';
    s1.innerHTML = '<p class="band-label" data-i18n="calc.s1">calc.s1</p>';

    const tabs = document.createElement('div');
    tabs.className = 'calc-tabs';
    ['calc.tab.tech', 'calc.tab.fx', 'calc.tab.man'].forEach(function (k, i) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'calc-tab' + (i === 0 ? ' is-on' : '');
      b.dataset.panel = 'p' + i;
      b.setAttribute('data-i18n', k);
      b.textContent = k;
      tabs.appendChild(b);
    });
    s1.appendChild(tabs);

    // Panel 0 — por tecnología
    const p0 = document.createElement('div');
    p0.className = 'calc-panel is-on';
    p0.id = 'p0';
    const sel = document.createElement('select');
    sel.className = 'calc-select';
    TECNOLOGIAS.forEach(function (o, i) {
      const op = document.createElement('option');
      op.value = i;
      op.setAttribute('data-i18n', o.k);
      op.textContent = o.k;
      sel.appendChild(op);
    });
    sel.value = '5';
    p0.appendChild(sel);
    s1.appendChild(p0);

    // Panel 1 — buscador
    const p1 = document.createElement('div');
    p1.className = 'calc-panel';
    p1.id = 'p1';
    const busca = document.createElement('input');
    busca.type = 'search';
    busca.className = 'calc-search';
    busca.setAttribute('data-i18n-attr', 'placeholder:calc.search');
    const lista = document.createElement('ul');
    lista.className = 'calc-list';
    p1.appendChild(busca); p1.appendChild(lista);
    s1.appendChild(p1);

    // Panel 2 — a mano
    const p2 = document.createElement('div');
    p2.className = 'calc-panel';
    p2.id = 'p2';
    const manW = campo('calc.man.w', 'manw', 250, '1');
    const manL = campo('calc.man.lm', 'manlm', 22500, '100');
    p2.appendChild(manW); p2.appendChild(manL);
    s1.appendChild(p2);

    const efNow = document.createElement('p');
    efNow.className = 'calc-eff';
    efNow.innerHTML = '<span data-i18n="calc.eff.now">calc.eff.now</span> <strong>—</strong>';
    s1.appendChild(efNow);
    raiz.appendChild(s1);

    /* Paso 2: la instalación */
    const s2 = document.createElement('section');
    s2.className = 'calc-step';
    s2.innerHTML = '<p class="band-label" data-i18n="calc.s2">calc.s2</p>';
    const rej = document.createElement('div');
    rej.className = 'calc-grid';
    rej.appendChild(campo('calc.points', 'points', est.points, '1', '1'));
    rej.appendChild(campo('calc.watts', 'watts', est.watts, '1', '1'));
    rej.appendChild(campo('calc.hours', 'hours', est.hours, '10', '1'));
    rej.appendChild(campo('calc.price', 'price', est.price, '0.01'));
    s2.appendChild(rej);

    const chips = document.createElement('div');
    chips.className = 'calc-chips';
    HORAS.forEach(function (o) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'calc-chip';
      b.dataset.h = o.h;
      b.setAttribute('data-i18n', o.k);
      b.textContent = o.k;
      chips.appendChild(b);
    });
    s2.appendChild(chips);
    raiz.appendChild(s2);

    /* Paso 3: avanzado */
    const s3 = document.createElement('details');
    s3.className = 'calc-adv';
    const sum = document.createElement('summary');
    sum.className = 'mono';
    sum.setAttribute('data-i18n', 'calc.s3');
    sum.textContent = 'calc.s3';
    s3.appendChild(sum);
    const rej3 = document.createElement('div');
    rej3.className = 'calc-grid';
    rej3.appendChild(campo('calc.adv.eff', 'efnew', est.efNew, '1', '1'));
    rej3.appendChild(campo('calc.adv.co2', 'co2', est.co2, '0.01'));
    rej3.appendChild(campo('calc.adv.cost', 'cost', null, '1'));
    s3.appendChild(rej3);
    const ayuda = document.createElement('p');
    ayuda.className = 'calc-help';
    ayuda.setAttribute('data-i18n', 'calc.adv.cost_help');
    ayuda.textContent = 'calc.adv.cost_help';
    s3.appendChild(ayuda);
    raiz.appendChild(s3);

    /* Resultado */
    const out = document.createElement('section');
    out.className = 'calc-out';
    out.id = 'calc-out';
    raiz.appendChild(out);

    /* --- Comportamiento --------------------------------------------------- */
    function pintarLista() {
      const q = busca.value.trim().toLowerCase();
      lista.innerHTML = '';
      const hay = LUMINARIAS.filter(function (o) {
        return !q || txt(o.k).toLowerCase().indexOf(q) > -1;
      });
      if (!hay.length) {
        const li = document.createElement('li');
        li.className = 'calc-empty';
        li.textContent = txt('calc.noresult');
        lista.appendChild(li);
        return;
      }
      hay.forEach(function (o) {
        const li = document.createElement('li');
        const b = document.createElement('button');
        b.type = 'button';
        b.textContent = txt(o.k);
        b.addEventListener('click', function () {
          [].forEach.call(lista.querySelectorAll('button'), function (x) { x.classList.remove('is-on'); });
          b.classList.add('is-on');
          est.efNow = o.ef;
          document.getElementById('watts').value = o.w;
          est.watts = o.w;
          calcular();
        });
        li.appendChild(b);
        lista.appendChild(li);
      });
    }

    tabs.addEventListener('click', function (e) {
      const b = e.target.closest('.calc-tab');
      if (!b) return;
      [].forEach.call(tabs.children, function (x) { x.classList.remove('is-on'); });
      b.classList.add('is-on');
      [p0, p1, p2].forEach(function (p) { p.classList.toggle('is-on', p.id === b.dataset.panel); });
      leerEficacia();
      calcular();
    });

    function leerEficacia() {
      const activo = tabs.querySelector('.is-on').dataset.panel;
      if (activo === 'p0') {
        const o = TECNOLOGIAS[parseInt(sel.value, 10)];
        est.efNow = o.ef;
        document.getElementById('watts').value = o.w;
        est.watts = o.w;
      } else if (activo === 'p2') {
        const w = parseFloat(document.getElementById('manw').value) || 0;
        const lm = parseFloat(document.getElementById('manlm').value) || 0;
        est.efNow = w > 0 ? lm / w : 0;
        if (w > 0) { document.getElementById('watts').value = w; est.watts = w; }
      }
    }

    sel.addEventListener('change', function () { leerEficacia(); calcular(); });
    busca.addEventListener('input', pintarLista);
    ['manw', 'manlm'].forEach(function (id) {
      document.getElementById(id).addEventListener('input', function () { leerEficacia(); calcular(); });
    });
    ['points', 'watts', 'hours', 'price', 'efnew', 'co2', 'cost'].forEach(function (id) {
      document.getElementById(id).addEventListener('input', calcular);
    });
    chips.addEventListener('click', function (e) {
      const b = e.target.closest('.calc-chip');
      if (!b) return;
      [].forEach.call(chips.children, function (x) { x.classList.remove('is-on'); });
      b.classList.add('is-on');
      document.getElementById('hours').value = b.dataset.h;
      calcular();
    });

    /* --- El cálculo ------------------------------------------------------- */
    function calcular() {
      const l = window.SITE.lang();
      const loc = LOCALES[l] || 'en-GB';
      const num = function (v, d) {
        return new Intl.NumberFormat(loc, { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 }).format(v);
      };
      const eur = function (v) {
        return new Intl.NumberFormat(loc, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(v);
      };

      est.points = Math.max(1, parseFloat(document.getElementById('points').value) || 0);
      est.watts  = Math.max(1, parseFloat(document.getElementById('watts').value) || 0);
      est.hours  = Math.max(1, parseFloat(document.getElementById('hours').value) || 0);
      est.price  = Math.max(0, parseFloat(document.getElementById('price').value) || 0);
      est.efNew  = Math.max(1, parseFloat(document.getElementById('efnew').value) || 0);
      est.co2    = Math.max(0, parseFloat(document.getElementById('co2').value) || 0);
      const costTxt = document.getElementById('cost').value;
      est.cost = costTxt === '' ? null : Math.max(0, parseFloat(costTxt) || 0);

      efNow.querySelector('strong').textContent = est.efNow ? num(est.efNow, 0) + ' lm/W' : '—';

      out.innerHTML = '';
      if (!est.efNow || est.efNow >= est.efNew) {
        const p = document.createElement('p');
        p.className = 'calc-warn';
        p.textContent = txt('calc.warn');
        out.appendChild(p);
        traducir(out);
        return;
      }

      // A iluminación equivalente: misma luz, potencia proporcional al
      // cociente de eficacias.
      const ratio = est.efNow / est.efNew;
      const kwAntes = est.points * est.watts / 1000;
      const kwDesp  = kwAntes * ratio;
      const kwhAntes = kwAntes * est.hours;
      const kwhDesp  = kwDesp * est.hours;
      const eurAntes = kwhAntes * est.price;
      const eurDesp  = kwhDesp * est.price;
      const ahorro   = eurAntes - eurDesp;
      const co2      = (kwhAntes - kwhDesp) * est.co2 / 1000;
      const recorte  = (1 - ratio) * 100;
      const lm       = est.points * est.watts * est.efNow;

      const grande = document.createElement('div');
      grande.className = 'calc-hero-out';
      grande.innerHTML =
        '<p class="mono" data-i18n="calc.r.saving">calc.r.saving</p>' +
        '<p class="calc-big">' + eur(ahorro) + '</p>' +
        '<p class="calc-bar"><span style="width:' + recorte.toFixed(1) + '%"></span></p>' +
        '<p class="calc-cut mono">−' + num(recorte, 0) + ' % · <span data-i18n="calc.r.cut">calc.r.cut</span></p>';
      out.appendChild(grande);

      const tabla = document.createElement('dl');
      tabla.className = 'specs';
      function fila(clave, antes, despues) {
        const d = document.createElement('div');
        d.innerHTML = '<dt data-i18n="' + clave + '">' + clave + '</dt>' +
          '<dd>' + antes + ' <span class="calc-arrow">→</span> <em>' + despues + '</em></dd>';
        tabla.appendChild(d);
      }
      function simple(clave, valor) {
        const d = document.createElement('div');
        d.innerHTML = '<dt data-i18n="' + clave + '">' + clave + '</dt><dd><em>' + valor + '</em></dd>';
        tabla.appendChild(d);
      }
      fila('calc.r.power',  num(kwAntes, 1) + ' kW', num(kwDesp, 1) + ' kW');
      fila('calc.r.energy', num(kwhAntes) + ' kWh', num(kwhDesp) + ' kWh');
      fila('calc.r.cost',   eur(eurAntes), eur(eurDesp));
      simple('calc.r.ten', eur(ahorro * 10));
      simple('calc.r.co2', num(co2, 1) + ' ' + txt('calc.tonnes'));
      if (est.cost !== null && est.cost > 0 && ahorro > 0) {
        simple('calc.r.payback', num((est.points * est.cost) / ahorro, 1) + ' ' + txt('calc.years'));
      }
      simple('calc.r.lmeur', eurDesp > 0 ? num(lm / eurDesp) + ' lm/€' : '—');
      simple('calc.r.wcost', num(eurDesp / (kwDesp * 1000), 3) + ' €/W');
      out.appendChild(tabla);

      const nota = document.createElement('p');
      nota.className = 'specs-note';
      nota.setAttribute('data-i18n', 'calc.note');
      nota.textContent = txt('calc.note');
      out.appendChild(nota);

      // Botón que abre el correo con el cálculo ya escrito dentro.
      const cuerpo =
        txt('calc.eff.now') + ': ' + num(est.efNow) + ' lm/W\n' +
        txt('calc.points') + ': ' + num(est.points) + '\n' +
        txt('calc.watts') + ': ' + num(est.watts) + ' W\n' +
        txt('calc.hours') + ': ' + num(est.hours) + ' h\n' +
        txt('calc.price') + ': ' + est.price + '\n\n' +
        txt('calc.r.power') + ': ' + num(kwAntes, 1) + ' kW → ' + num(kwDesp, 1) + ' kW\n' +
        txt('calc.r.saving') + ': ' + eur(ahorro) + '\n' +
        txt('calc.r.ten') + ': ' + eur(ahorro * 10) + '\n' +
        txt('calc.r.co2') + ': ' + num(co2, 1) + ' t\n';

      const cta = document.createElement('div');
      cta.className = 'calc-cta';
      cta.innerHTML =
        '<h2 data-i18n="calc.cta.title">calc.cta.title</h2>' +
        '<p class="lede" data-i18n="calc.cta.body">calc.cta.body</p>';
      const a = document.createElement('a');
      a.className = 'btn btn-primary';
      a.setAttribute('data-i18n', 'calc.cta.btn');
      a.textContent = txt('calc.cta.btn');
      a.href = 'mailto:hugorcsar@gmail.com?subject=' +
        encodeURIComponent(txt('calc.mail.subject')) +
        '&body=' + encodeURIComponent(cuerpo);
      const acc = document.createElement('div');
      acc.className = 'hero-actions';
      acc.appendChild(a);
      cta.appendChild(acc);
      out.appendChild(cta);

      traducir(out);
    }

    // Al cambiar de idioma se rehace: cambian las etiquetas y también el
    // separador decimal y el formato de la moneda.
    window.SITE.onLang(function () { pintarLista(); calcular(); });

    pintarLista();
    leerEficacia();
    calcular();
    window.SITE.apply();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', arranca);
  } else {
    arranca();
  }
})();
