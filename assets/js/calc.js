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
      "calc.pdf.step": "One more step",
      "calc.pdf.open": "Open the dialogue",
      "calc.pdf.never": "Do not show this again",
      "calc.pdf.safari": "In the window that opens, use the <strong>PDF</strong> menu at the bottom left and choose <strong>Save as PDF</strong>.",
      "calc.pdf.chrome": "In the window that opens, at <strong>Destination</strong>, choose <strong>Save as PDF</strong> and then Save.",
      "calc.pdf.firefox": "In the window that opens, at <strong>Printer</strong>, choose <strong>Save to PDF</strong>.",
      "calc.pdf.mobile": "Your device will offer to share the document. Choose <strong>Save to Files</strong> or your usual folder.",
      "calc.pdf.hint": "The report opens in the print dialogue, where you save it as a PDF.",
      "report.mexcl": "The estimate covers electricity only; avoided maintenance is not included.",
      "report.mincl": "The maintenance saving counts the difference in interventions, with our own replacements already deducted.",
      "calc.r.perpoint": "Annual cost per light point",
      "calc.adv.dep": "Flux depreciation of current fixtures (%)",
      "calc.adv.loss": "Control gear losses (%)",
      "calc.adv.life": "Current lamp life (h)",
      "calc.adv.mcost": "Cost of one intervention per point (€)",
      "calc.adv.mhelp": "Fill in the last two and the maintenance saving appears. Our own replacements are subtracted: we count the difference, not the whole of it.",
      "calc.r.energysave": "Energy saving",
      "calc.r.maintsave": "Maintenance saving",
      "calc.r.total": "Total annual saving",
      "calc.r.effreal": "Effective efficacy in service",
      "report.assump": "The current installation is evaluated with market reference values, not with a measurement on site.",
      "calc.pdf.btn": "Save as PDF",
      "report.title": "Savings estimate",
      "report.sub": "Estimate based on the figures supplied by the client",
      "report.inputs": "Figures supplied",
      "report.result": "Result",
      "report.method": "Method",
      "report.methodbody": "Comparison at equal light output: to deliver the same lumens, the required power is proportional to the ratio of efficacies. The current installation is evaluated with market reference values, not with a measurement on site.",
      "report.date": "Date",
      "report.by": "Prepared by",
      "report.disc": "Non-binding estimate. Measurement conditions and the independent laboratory report are supplied with the technical brief.",
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
      "calc.pdf.step": "Un paso más",
      "calc.pdf.open": "Abrir el diálogo",
      "calc.pdf.never": "No volver a mostrar esto",
      "calc.pdf.safari": "En la ventana que se abre, usa el menú <strong>PDF</strong> de abajo a la izquierda y elige <strong>Guardar como PDF</strong>.",
      "calc.pdf.chrome": "En la ventana que se abre, en <strong>Destino</strong>, elige <strong>Guardar como PDF</strong> y luego Guardar.",
      "calc.pdf.firefox": "En la ventana que se abre, en <strong>Impresora</strong>, elige <strong>Guardar en PDF</strong>.",
      "calc.pdf.mobile": "Tu dispositivo te ofrecerá compartir el documento. Elige <strong>Guardar en Archivos</strong> o la carpeta que uses.",
      "calc.pdf.hint": "El informe se abre en el diálogo de impresión, donde lo guardas como PDF.",
      "report.mexcl": "La estimación contempla solo electricidad; no incluye el mantenimiento evitado.",
      "report.mincl": "El ahorro de mantenimiento cuenta la diferencia de intervenciones, ya descontadas nuestras propias reposiciones.",
      "calc.r.perpoint": "Coste anual por punto de luz",
      "calc.adv.dep": "Depreciación de flujo del equipo actual (%)",
      "calc.adv.loss": "Pérdidas del equipo auxiliar (%)",
      "calc.adv.life": "Vida de la lámpara actual (h)",
      "calc.adv.mcost": "Coste de una intervención por punto (€)",
      "calc.adv.mhelp": "Rellena las dos últimas y aparece el ahorro de mantenimiento. Se descuentan nuestras propias reposiciones: se cuenta la diferencia, no el total.",
      "calc.r.energysave": "Ahorro energético",
      "calc.r.maintsave": "Ahorro de mantenimiento",
      "calc.r.total": "Ahorro anual total",
      "calc.r.effreal": "Eficacia efectiva en servicio",
      "report.assump": "La instalación actual se evalúa con valores de referencia de mercado, no con una medición en campo.",
      "calc.pdf.btn": "Guardar como PDF",
      "report.title": "Estimación de ahorro",
      "report.sub": "Estimación a partir de las cifras aportadas por el cliente",
      "report.inputs": "Cifras aportadas",
      "report.result": "Resultado",
      "report.method": "Método",
      "report.methodbody": "Comparación a iluminación equivalente: para dar los mismos lúmenes, la potencia necesaria es proporcional al cociente de eficacias. La instalación actual se evalúa con valores de referencia de mercado, no con una medición en campo.",
      "report.date": "Fecha",
      "report.by": "Elaborado por",
      "report.disc": "Estimación sin valor contractual. Las condiciones de medida y el informe de laboratorio independiente se entregan con la ficha técnica.",
      "calc.meta.title": "Calculadora de ahorro — Almenara",
      "calc.meta.desc": "Calcula lo que ahorrarías sustituyendo tu iluminación actual. Con tus propias cifras y sin registro.",
      "calc.eyebrow": "Calculadora de ahorro",
      "calc.title": "Calcula tus propias cuentas.",
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
      "calc.pdf.step": "Mais um passo",
      "calc.pdf.open": "Abrir a caixa",
      "calc.pdf.never": "Não mostrar novamente",
      "calc.pdf.safari": "Na janela que abre, use o menu <strong>PDF</strong> em baixo à esquerda e escolha <strong>Guardar como PDF</strong>.",
      "calc.pdf.chrome": "Na janela que abre, em <strong>Destino</strong>, escolha <strong>Guardar como PDF</strong> e depois Guardar.",
      "calc.pdf.firefox": "Na janela que abre, em <strong>Impressora</strong>, escolha <strong>Guardar em PDF</strong>.",
      "calc.pdf.mobile": "O seu aparelho oferecerá partilhar o documento. Escolha <strong>Guardar em Ficheiros</strong> ou a pasta que usa.",
      "calc.pdf.hint": "O relatório abre na caixa de impressão, onde o guarda como PDF.",
      "report.mexcl": "A estimativa considera apenas electricidade; não inclui a manutenção evitada.",
      "report.mincl": "A poupança de manutenção conta a diferença de intervenções, já descontadas as nossas próprias substituições.",
      "calc.r.perpoint": "Custo anual por ponto de luz",
      "calc.adv.dep": "Depreciação de fluxo do equipamento actual (%)",
      "calc.adv.loss": "Perdas do equipamento auxiliar (%)",
      "calc.adv.life": "Vida da lâmpada actual (h)",
      "calc.adv.mcost": "Custo de uma intervenção por ponto (€)",
      "calc.adv.mhelp": "Preencha as duas últimas e surge a poupança de manutenção. Descontam-se as nossas próprias substituições: conta-se a diferença, não o total.",
      "calc.r.energysave": "Poupança energética",
      "calc.r.maintsave": "Poupança de manutenção",
      "calc.r.total": "Poupança anual total",
      "calc.r.effreal": "Eficácia efectiva em serviço",
      "report.assump": "A instalação actual é avaliada com valores de referência de mercado, não com uma medição no local.",
      "calc.pdf.btn": "Guardar como PDF",
      "report.title": "Estimativa de poupança",
      "report.sub": "Estimativa a partir dos valores fornecidos pelo cliente",
      "report.inputs": "Valores fornecidos",
      "report.result": "Resultado",
      "report.method": "Método",
      "report.methodbody": "Comparação a iluminação equivalente: para dar os mesmos lúmenes, a potência necessária é proporcional ao quociente das eficácias. A instalação actual é avaliada com valores de referência de mercado, não com uma medição no local.",
      "report.date": "Data",
      "report.by": "Elaborado por",
      "report.disc": "Estimativa sem valor contratual. As condições de medição e o relatório de laboratório independente são entregues com a ficha técnica.",
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
      "calc.pdf.step": "Une étape de plus",
      "calc.pdf.open": "Ouvrir la fenêtre",
      "calc.pdf.never": "Ne plus afficher ceci",
      "calc.pdf.safari": "Dans la fenêtre qui s'ouvre, utilisez le menu <strong>PDF</strong> en bas à gauche et choisissez <strong>Enregistrer en PDF</strong>.",
      "calc.pdf.chrome": "Dans la fenêtre qui s'ouvre, à <strong>Destination</strong>, choisissez <strong>Enregistrer au format PDF</strong>, puis Enregistrer.",
      "calc.pdf.firefox": "Dans la fenêtre qui s'ouvre, à <strong>Imprimante</strong>, choisissez <strong>Enregistrer dans un fichier PDF</strong>.",
      "calc.pdf.mobile": "Votre appareil proposera de partager le document. Choisissez <strong>Enregistrer dans Fichiers</strong> ou votre dossier habituel.",
      "calc.pdf.hint": "Le rapport s'ouvre dans la fenêtre d'impression, où vous l'enregistrez en PDF.",
      "report.mexcl": "L'estimation ne porte que sur l'électricité ; la maintenance évitée n'est pas incluse.",
      "report.mincl": "L'économie de maintenance compte la différence d'interventions, nos propres remplacements étant déjà déduits.",
      "calc.r.perpoint": "Coût annuel par point lumineux",
      "calc.adv.dep": "Dépréciation du flux des luminaires actuels (%)",
      "calc.adv.loss": "Pertes de l'appareillage (%)",
      "calc.adv.life": "Durée de vie de la lampe actuelle (h)",
      "calc.adv.mcost": "Coût d'une intervention par point (€)",
      "calc.adv.mhelp": "Renseignez les deux dernières et l'économie de maintenance apparaît. Nos propres remplacements sont déduits : on compte la différence, non la totalité.",
      "calc.r.energysave": "Économie d'énergie",
      "calc.r.maintsave": "Économie de maintenance",
      "calc.r.total": "Économie annuelle totale",
      "calc.r.effreal": "Efficacité effective en service",
      "report.assump": "L'installation actuelle est évaluée avec des valeurs de référence du marché, non avec une mesure sur site.",
      "calc.pdf.btn": "Enregistrer en PDF",
      "report.title": "Estimation d'économies",
      "report.sub": "Estimation à partir des valeurs fournies par le client",
      "report.inputs": "Valeurs fournies",
      "report.result": "Résultat",
      "report.method": "Méthode",
      "report.methodbody": "Comparaison à éclairement équivalent : pour délivrer les mêmes lumens, la puissance nécessaire est proportionnelle au rapport des efficacités. L'installation actuelle est évaluée avec des valeurs de référence du marché, non avec une mesure sur site.",
      "report.date": "Date",
      "report.by": "Établi par",
      "report.disc": "Estimation sans valeur contractuelle. Les conditions de mesure et le rapport de laboratoire indépendant sont fournis avec la fiche technique.",
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
      "calc.pdf.step": "Noch ein Schritt",
      "calc.pdf.open": "Dialog öffnen",
      "calc.pdf.never": "Nicht mehr anzeigen",
      "calc.pdf.safari": "Im Fenster, das sich öffnet, das Menü <strong>PDF</strong> unten links benutzen und <strong>Als PDF sichern</strong> wählen.",
      "calc.pdf.chrome": "Im Fenster, das sich öffnet, unter <strong>Ziel</strong> die Option <strong>Als PDF speichern</strong> wählen und dann Speichern.",
      "calc.pdf.firefox": "Im Fenster, das sich öffnet, unter <strong>Drucker</strong> die Option <strong>In PDF speichern</strong> wählen.",
      "calc.pdf.mobile": "Ihr Gerät bietet an, das Dokument zu teilen. Wählen Sie <strong>In Dateien sichern</strong> oder Ihren üblichen Ordner.",
      "calc.pdf.hint": "Der Bericht öffnet sich im Druckdialog, wo Sie ihn als PDF sichern.",
      "report.mexcl": "Die Schätzung betrifft nur Strom; vermiedene Wartung ist nicht enthalten.",
      "report.mincl": "Die Wartungsersparnis zählt die Differenz der Eingriffe, unsere eigenen Austausche sind bereits abgezogen.",
      "calc.r.perpoint": "Jahreskosten je Lichtpunkt",
      "calc.adv.dep": "Lichtstromrückgang der heutigen Leuchten (%)",
      "calc.adv.loss": "Verluste des Betriebsgeräts (%)",
      "calc.adv.life": "Lebensdauer der heutigen Lampe (h)",
      "calc.adv.mcost": "Kosten eines Eingriffs je Lichtpunkt (€)",
      "calc.adv.mhelp": "Füllen Sie die letzten beiden aus, und die Wartungsersparnis erscheint. Unsere eigenen Austausche werden abgezogen: gezählt wird die Differenz, nicht das Ganze.",
      "calc.r.energysave": "Energieersparnis",
      "calc.r.maintsave": "Wartungsersparnis",
      "calc.r.total": "Gesamte Jahresersparnis",
      "calc.r.effreal": "Tatsächliche Ausbeute im Betrieb",
      "report.assump": "Die heutige Anlage wird mit Marktreferenzwerten bewertet, nicht mit einer Messung vor Ort.",
      "calc.pdf.btn": "Als PDF sichern",
      "report.title": "Einsparschätzung",
      "report.sub": "Schätzung auf Grundlage der vom Kunden genannten Werte",
      "report.inputs": "Genannte Werte",
      "report.result": "Ergebnis",
      "report.method": "Methode",
      "report.methodbody": "Vergleich bei gleicher Lichtmenge: für dieselben Lumen verhält sich die nötige Leistung wie das Verhältnis der Lichtausbeuten. Die heutige Anlage wird mit Marktreferenzwerten bewertet, nicht mit einer Messung vor Ort.",
      "report.date": "Datum",
      "report.by": "Erstellt von",
      "report.disc": "Unverbindliche Schätzung. Messbedingungen und der Bericht des unabhängigen Labors werden mit dem Datenblatt geliefert.",
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
      "calc.pdf.step": "Ancora un passo",
      "calc.pdf.open": "Aprire la finestra",
      "calc.pdf.never": "Non mostrare più",
      "calc.pdf.safari": "Nella finestra che si apre, usa il menu <strong>PDF</strong> in basso a sinistra e scegli <strong>Salva come PDF</strong>.",
      "calc.pdf.chrome": "Nella finestra che si apre, in <strong>Destinazione</strong>, scegli <strong>Salva come PDF</strong> e poi Salva.",
      "calc.pdf.firefox": "Nella finestra che si apre, in <strong>Stampante</strong>, scegli <strong>Salva in PDF</strong>.",
      "calc.pdf.mobile": "Il dispositivo proporrà di condividere il documento. Scegli <strong>Salva su File</strong> o la cartella che usi.",
      "calc.pdf.hint": "Il rapporto si apre nella finestra di stampa, dove lo salvi come PDF.",
      "report.mexcl": "La stima riguarda la sola elettricità; non include la manutenzione evitata.",
      "report.mincl": "Il risparmio di manutenzione conta la differenza di interventi, già scontate le nostre sostituzioni.",
      "calc.r.perpoint": "Costo annuo per punto luce",
      "calc.adv.dep": "Decadimento di flusso degli apparecchi attuali (%)",
      "calc.adv.loss": "Perdite dell'alimentatore (%)",
      "calc.adv.life": "Durata della lampada attuale (h)",
      "calc.adv.mcost": "Costo di un intervento per punto (€)",
      "calc.adv.mhelp": "Compila le ultime due e appare il risparmio di manutenzione. Si scontano le nostre sostituzioni: si conta la differenza, non il totale.",
      "calc.r.energysave": "Risparmio energetico",
      "calc.r.maintsave": "Risparmio di manutenzione",
      "calc.r.total": "Risparmio annuo totale",
      "calc.r.effreal": "Efficienza effettiva in servizio",
      "report.assump": "L'impianto attuale è valutato con valori di riferimento di mercato, non con una misura in campo.",
      "calc.pdf.btn": "Salva come PDF",
      "report.title": "Stima di risparmio",
      "report.sub": "Stima a partire dai valori forniti dal cliente",
      "report.inputs": "Valori forniti",
      "report.result": "Risultato",
      "report.method": "Metodo",
      "report.methodbody": "Confronto a illuminamento equivalente: per dare gli stessi lumen, la potenza necessaria è proporzionale al rapporto delle efficienze. L'impianto attuale è valutato con valori di riferimento di mercato, non con una misura in campo.",
      "report.date": "Data",
      "report.by": "Redatto da",
      "report.disc": "Stima priva di valore contrattuale. Le condizioni di misura e il rapporto del laboratorio indipendente sono forniti con la scheda tecnica.",
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
      "calc.pdf.step": "Ещё один шаг",
      "calc.pdf.open": "Открыть окно",
      "calc.pdf.never": "Больше не показывать",
      "calc.pdf.safari": "В открывшемся окне нажмите меню <strong>PDF</strong> слева внизу и выберите <strong>Сохранить в PDF</strong>.",
      "calc.pdf.chrome": "В открывшемся окне в поле <strong>Принтер</strong> выберите <strong>Сохранить как PDF</strong>, затем Сохранить.",
      "calc.pdf.firefox": "В открывшемся окне в поле <strong>Принтер</strong> выберите <strong>Сохранить в PDF</strong>.",
      "calc.pdf.mobile": "Устройство предложит поделиться документом. Выберите <strong>Сохранить в «Файлы»</strong> или нужную папку.",
      "calc.pdf.hint": "Отчёт открывается в окне печати, где вы сохраняете его в PDF.",
      "report.mexcl": "Оценка учитывает только электроэнергию; сэкономленное обслуживание не включено.",
      "report.mincl": "Экономия на обслуживании считает разницу в числе выездов, наши собственные замены уже вычтены.",
      "calc.r.perpoint": "Годовая стоимость световой точки",
      "calc.adv.dep": "Спад светового потока нынешних светильников (%)",
      "calc.adv.loss": "Потери пускорегулирующей аппаратуры (%)",
      "calc.adv.life": "Срок службы нынешней лампы (ч)",
      "calc.adv.mcost": "Стоимость одного выезда на точку (€)",
      "calc.adv.mhelp": "Заполните два последних поля — появится экономия на обслуживании. Наши собственные замены вычитаются: считается разница, а не весь объём.",
      "calc.r.energysave": "Экономия энергии",
      "calc.r.maintsave": "Экономия на обслуживании",
      "calc.r.total": "Общая годовая экономия",
      "calc.r.effreal": "Фактическая отдача в работе",
      "report.assump": "Нынешняя установка оценивается по рыночным справочным значениям, а не по замеру на объекте.",
      "calc.pdf.btn": "Сохранить в PDF",
      "report.title": "Оценка экономии",
      "report.sub": "Оценка по данным, предоставленным клиентом",
      "report.inputs": "Исходные данные",
      "report.result": "Результат",
      "report.method": "Метод",
      "report.methodbody": "Сравнение при равной освещённости: чтобы дать те же люмены, требуемая мощность пропорциональна отношению световых отдач. Нынешняя установка оценивается по рыночным справочным значениям, а не по замеру на объекте.",
      "report.date": "Дата",
      "report.by": "Подготовил",
      "report.disc": "Оценка не имеет договорной силы. Условия измерения и протокол независимой лаборатории передаются вместе с техническим описанием.",
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

  let intentos = 0;
  function arranca() {
    const raiz = document.getElementById('calc');
    if (!raiz) return;
    // Si app.js todavía no ha publicado su interfaz, se reintenta un momento
    // después en vez de rendirse sin decir nada.
    if (!window.SITE) {
      if (intentos++ < 20) setTimeout(arranca, 50);
      return;
    }

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
      cost: null,
      dep: 0,        // depreciación de flujo del equipo actual, %
      loss: 0,       // pérdidas del equipo auxiliar, %
      life: null,    // vida de la lámpara actual, horas
      mcost: null    // coste de una intervención por punto, €
    };
    // Vida declarada de nuestro módulo. De aquí sale la resta que impide
    // apuntarse un ahorro de mantenimiento que no corresponde.
    const VIDA_NUESTRA = 100000;

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
    tabs.setAttribute('role', 'tablist');
    ['calc.tab.tech', 'calc.tab.fx', 'calc.tab.man'].forEach(function (k, i) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'calc-tab' + (i === 0 ? ' is-on' : '');
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      b.setAttribute('aria-controls', 'p' + i);
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
    p0.setAttribute('role', 'tabpanel');
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
    p1.setAttribute('role', 'tabpanel');
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
    p2.setAttribute('role', 'tabpanel');
    let vatiosTocados = false;   // si el visitante escribe los suyos, mandan
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
    rej3.appendChild(campo('calc.adv.dep', 'dep', 0, '1'));
    rej3.appendChild(campo('calc.adv.loss', 'loss', 0, '1'));
    rej3.appendChild(campo('calc.adv.life', 'life', null, '1000'));
    rej3.appendChild(campo('calc.adv.mcost', 'mcost', null, '5'));
    s3.appendChild(rej3);
    ['calc.adv.cost_help', 'calc.adv.mhelp'].forEach(function (k) {
      const p = document.createElement('p');
      p.className = 'calc-help';
      p.setAttribute('data-i18n', k);
      p.textContent = k;
      s3.appendChild(p);
    });
    raiz.appendChild(s3);

    /* Resultado */
    const out = document.createElement('section');
    out.className = 'calc-out';
    out.id = 'calc-out';
    // Quien no ve la pantalla debe enterarse de que hay cifras nuevas.
    out.setAttribute('aria-live', 'polite');
    out.setAttribute('aria-atomic', 'false');
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
          if (!vatiosTocados) { document.getElementById('watts').value = o.w; est.watts = o.w; }
          calcular();
        });
        li.appendChild(b);
        lista.appendChild(li);
      });
    }

    tabs.addEventListener('click', function (e) {
      const b = e.target.closest('.calc-tab');
      if (!b) return;
      [].forEach.call(tabs.children, function (x) {
        x.classList.remove('is-on');
        x.setAttribute('aria-selected', 'false');
      });
      b.classList.add('is-on');
      b.setAttribute('aria-selected', 'true');
      [p0, p1, p2].forEach(function (p) { p.classList.toggle('is-on', p.id === b.dataset.panel); });
      leerEficacia();
      calcular();
    });

    function leerEficacia() {
      const activo = tabs.querySelector('.is-on').dataset.panel;
      if (activo === 'p0') {
        const o = TECNOLOGIAS[parseInt(sel.value, 10)];
        est.efNow = o.ef;
        if (!vatiosTocados) { document.getElementById('watts').value = o.w; est.watts = o.w; }
      } else if (activo === 'p2') {
        const w = parseFloat(document.getElementById('manw').value) || 0;
        const lm = parseFloat(document.getElementById('manlm').value) || 0;
        est.efNow = w > 0 ? lm / w : 0;
        if (w > 0 && !vatiosTocados) { document.getElementById('watts').value = w; est.watts = w; }
      }
    }

    sel.addEventListener('change', function () { leerEficacia(); calcular(); });
    busca.addEventListener('input', pintarLista);
    ['manw', 'manlm'].forEach(function (id) {
      document.getElementById(id).addEventListener('input', function () {
        leerEficacia();
        calcularPronto();
      });
    });
    // Escribir "1000" disparaba cuatro recálculos completos. Se espera a que
    // el visitante levante los dedos del teclado.
    let temporizador = null;
    function calcularPronto() {
      clearTimeout(temporizador);
      temporizador = setTimeout(calcular, 140);
    }
    ['points', 'watts', 'hours', 'price', 'efnew', 'co2', 'cost',
     'dep', 'loss', 'life', 'mcost'].forEach(function (id) {
      document.getElementById(id).addEventListener('input', calcularPronto);
    });
    document.getElementById('watts').addEventListener('input', function () { vatiosTocados = true; });

    chips.addEventListener('click', function (e) {
      const b = e.target.closest('.calc-chip');
      if (!b) return;
      [].forEach.call(chips.children, function (x) { x.classList.remove('is-on'); });
      b.classList.add('is-on');
      document.getElementById('hours').value = b.dataset.h;
      calcular();
    });

    /* --- El cálculo ------------------------------------------------------- */
    // El documento imprimible cuesta unos dos mil caracteres de HTML. Antes se
    // rehacía con cada tecla; ahora solo se guarda la receta y se compone en el
    // momento de imprimir. La página deja de trabajar mientras escribes.
    let ultimoInforme = null;

    /* --- Dónde está el «Guardar como PDF» --------------------------------
       No está en el mismo sitio en cada navegador: en Safari es un menú abajo
       a la izquierda, en Chrome está arriba en «Destino». Decir solo «elige
       guardar como PDF» no ayuda a nadie. --------------------------------- */
    function claveNavegador() {
      const ua = navigator.userAgent;
      if (/iPhone|iPad|Android/i.test(ua)) return 'calc.pdf.mobile';
      if (/Firefox\//.test(ua)) return 'calc.pdf.firefox';
      if (/Safari\//.test(ua) && !/Chrome|Chromium|Edg\//.test(ua)) return 'calc.pdf.safari';
      return 'calc.pdf.chrome';
    }

    function imprimir() {
      prepararInforme();

      // El navegador toma el título de la pestaña como nombre del archivo. Sin
      // esto, el cliente se lleva un PDF llamado "Calculadora de ahorro".
      const titulo = document.title;
      const f = new Date();
      const iso = f.getFullYear() + '-' +
                  String(f.getMonth() + 1).padStart(2, '0') + '-' +
                  String(f.getDate()).padStart(2, '0');
      document.title = 'Almenara — ' + txt('report.title') + ' — ' + iso;

      function restaurar() {
        document.title = titulo;
        window.removeEventListener('afterprint', restaurar);
      }
      window.addEventListener('afterprint', restaurar);
      // Safari en Mac no siempre dispara afterprint: red de seguridad.
      setTimeout(restaurar, 4000);

      window.print();
    }

    function mostrarPaso() {
      const previo = document.querySelector('.pdf-step');
      if (previo) previo.remove();

      const caja = document.createElement('div');
      caja.className = 'pdf-step';
      caja.setAttribute('role', 'status');
      caja.innerHTML =
        '<p class="pdf-step-t mono">' + txt('calc.pdf.step') + '</p>' +
        '<p class="pdf-step-b">' + txt(claveNavegador()) + '</p>';

      const seguir = document.createElement('button');
      seguir.type = 'button';
      seguir.className = 'btn btn-primary';
      seguir.textContent = txt('calc.pdf.open');
      seguir.addEventListener('click', function () {
        if (nunca.querySelector('input').checked) {
          try { localStorage.setItem('site.pdfhint', 'ok'); } catch (e) {}
        }
        caja.remove();
        imprimir();
      });

      const nunca = document.createElement('label');
      nunca.className = 'pdf-step-never';
      nunca.innerHTML = '<input type="checkbox" /> <span>' + txt('calc.pdf.never') + '</span>';

      const pie = document.createElement('div');
      pie.className = 'pdf-step-foot';
      pie.appendChild(seguir);
      pie.appendChild(nunca);
      caja.appendChild(pie);

      out.querySelector('.calc-cta').insertBefore(caja, out.querySelector('.calc-cta .hero-actions'));
      seguir.focus();
    }

    function prepararInforme() {
      const previo = document.querySelector('.print-doc');
      if (previo) previo.remove();
      if (ultimoInforme) out.appendChild(ultimoInforme());
    }
    window.addEventListener('beforeprint', prepararInforme);

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
      const opcional = function (id) {
        const v = document.getElementById(id).value;
        return v === '' ? null : Math.max(0, parseFloat(v) || 0);
      };
      est.cost  = opcional('cost');
      est.life  = opcional('life');
      est.mcost = opcional('mcost');
      est.dep   = Math.min(60, Math.max(0, parseFloat(document.getElementById('dep').value)  || 0));
      est.loss  = Math.min(40, Math.max(0, parseFloat(document.getElementById('loss').value) || 0));

      efNow.querySelector('strong').textContent = est.efNow
        ? (num(est.efNow, 1) + ' lm/W' +
           (est.dep > 0 ? '  →  ' + num(est.efNow * (1 - est.dep / 100), 1) + ' lm/W' : ''))
        : '—';

      out.innerHTML = '';
      if (!est.efNow || est.efNow * (1 - est.dep / 100) >= est.efNew) {
        const p = document.createElement('p');
        p.className = 'calc-warn';
        p.textContent = txt('calc.warn');
        out.appendChild(p);
        ultimoInforme = null;
        traducir(out);
        return;
      }

      // Eficacia efectiva: una lámpara vieja da menos luz de la que dice su
      // etiqueta, así que la depreciación de flujo se descuenta aquí.
      const efReal = est.efNow * (1 - est.dep / 100);

      // Potencia real absorbida: el equipo auxiliar consume por encima de la
      // potencia nominal de la lámpara. Un balasto magnético hace que una
      // campana de 250 W tire de 280.
      const wReal = est.watts * (1 + est.loss / 100);

      // A iluminación equivalente: los mismos lúmenes que se están dando hoy
      // de verdad, con una potencia proporcional al cociente de eficacias.
      const lm       = est.points * est.watts * efReal;
      const kwAntes  = est.points * wReal / 1000;
      const kwDesp   = lm / est.efNew / 1000;
      const ratio    = kwAntes > 0 ? kwDesp / kwAntes : 1;
      const kwhAntes = kwAntes * est.hours;
      const kwhDesp  = kwDesp * est.hours;
      const eurAntes = kwhAntes * est.price;
      const eurDesp  = kwhDesp * est.price;
      const ahorroE  = eurAntes - eurDesp;
      const co2      = (kwhAntes - kwhDesp) * est.co2 / 1000;
      const recorte  = (1 - ratio) * 100;

      // Mantenimiento. No se cuenta el total de intervenciones evitadas, sino
      // la diferencia: nuestro módulo también se sustituye algún día, solo que
      // mucho más tarde. Restar nuestras propias reposiciones es lo que hace
      // que esta cifra se sostenga delante de un ingeniero.
      let ahorroM = 0;
      if (est.life && est.mcost) {
        const propias  = est.hours / VIDA_NUESTRA;
        const actuales = est.hours / est.life;
        ahorroM = Math.max(0, est.points * (actuales - propias) * est.mcost);
      }
      const ahorro = ahorroE + ahorroM;

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
      if (ahorroM > 0) {
        simple('calc.r.energysave', eur(ahorroE));
        simple('calc.r.maintsave', eur(ahorroM));
        simple('calc.r.total', eur(ahorro));
      }
      simple('calc.r.ten', eur(ahorro * 10));
      simple('calc.r.co2', num(co2, 1) + ' ' + txt('calc.tonnes'));
      if (est.cost !== null && est.cost > 0 && ahorro > 0) {
        simple('calc.r.payback', num((est.points * est.cost) / ahorro, 1) + ' ' + txt('calc.years'));
      }
      // Antes y después, no solo el después: por sí solas estas dos cifras
      // no dependían de la instalación del visitante y no decían nada.
      if (eurAntes > 0 && eurDesp > 0) {
        fila('calc.r.lmeur', num(lm / eurAntes) + ' lm/€', num(lm / eurDesp) + ' lm/€');
      }
      // El coste por vatio instalado es horas × precio: sale idéntico antes y
      // después, así que no se compara. Se deja como dato de planificación.
      simple('calc.r.wcost', num(eurAntes / (kwAntes * 1000), 3) + ' €/W');
      // Esta sí depende de todo y es la que mira quien gestiona el edificio.
      fila('calc.r.perpoint', eur(eurAntes / est.points), eur(eurDesp / est.points));
      out.appendChild(tabla);

      const nota = document.createElement('p');
      nota.className = 'specs-note';
      nota.textContent = txt('report.methodbody') + ' ' +
        (ahorroM > 0 ? txt('report.mincl') : txt('report.mexcl'));
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

      /* --- El documento imprimible ---------------------------------------
         No se ve en pantalla. Al imprimir, la hoja de estilos oculta la web
         entera y deja solo esto: una hoja en negro sobre blanco con membrete.
         El visitante elige «Guardar como PDF» en el propio diálogo del
         navegador, así que no hace falta ninguna librería externa, que
         además el .htaccess no permitiría cargar. -------------------------- */
      const fecha = new Intl.DateTimeFormat(loc, { day: 'numeric', month: 'long', year: 'numeric' })
        .format(new Date());

      function filasHTML(pares) {
        return pares.map(function (p) {
          return '<tr><th>' + p[0] + '</th><td>' + p[1] + '</td></tr>';
        }).join('');
      }

      ultimoInforme = function () {
        const doc = document.createElement('article');
        doc.className = 'print-doc';
        doc.innerHTML =
        '<header class="pd-head">' +
          '<p class="pd-brand">Almenara</p>' +
          '<p class="pd-meta">' + txt('report.date') + ': ' + fecha + '</p>' +
        '</header>' +

        '<h1 class="pd-title">' + txt('report.title') + '</h1>' +
        '<p class="pd-sub">' + txt('report.sub') + '</p>' +

        '<p class="pd-big-label">' + txt('calc.r.saving') + '</p>' +
        '<p class="pd-big">' + eur(ahorro) + '</p>' +

        '<h2 class="pd-h2">' + txt('report.inputs') + '</h2>' +
        '<div class="pd-facts">' + [
          [txt('calc.eff.now'), num(est.efNow, 1) + ' lm/W'],
          [txt('calc.points'), num(est.points)],
          [txt('calc.watts'), num(est.watts) + ' W'],
          [txt('calc.hours'), num(est.hours) + ' h'],
          [txt('calc.price'), est.price + ' €/kWh'],
          [txt('calc.adv.eff'), num(est.efNew) + ' lm/W']
        ].concat(
          est.dep > 0 ? [[txt('calc.r.effreal'), num(efReal, 1) + ' lm/W']] : []
        ).concat(
          est.loss > 0 ? [[txt('calc.adv.loss'), num(est.loss) + ' %']] : []
        ).map(function (p) {
          return '<div><dt>' + p[0] + '</dt><dd>' + p[1] + '</dd></div>';
        }).join('') + '</div>' +

        '<h2 class="pd-h2">' + txt('report.result') + '</h2>' +
        '<table class="pd-table">' + filasHTML([
          [txt('calc.r.power'), num(kwAntes, 1) + ' kW → ' + num(kwDesp, 1) + ' kW'],
          [txt('calc.r.energy'), num(kwhAntes) + ' kWh → ' + num(kwhDesp) + ' kWh'],
          [txt('calc.r.cost'), eur(eurAntes) + ' → ' + eur(eurDesp)],
          [txt('calc.r.cut'), '−' + num(recorte, 0) + ' %'],
          [txt('calc.r.ten'), eur(ahorro * 10)],
          [txt('calc.r.co2'), num(co2, 1) + ' ' + txt('calc.tonnes')]
        ].concat(
          ahorroM > 0
            ? [[txt('calc.r.energysave'), eur(ahorroE)],
               [txt('calc.r.maintsave'), eur(ahorroM)],
               [txt('calc.r.total'), eur(ahorro)]]
            : []
        ).concat(
          (est.cost !== null && est.cost > 0 && ahorro > 0)
            ? [[txt('calc.r.payback'), num((est.points * est.cost) / ahorro, 1) + ' ' + txt('calc.years')]]
            : []
        )) + '</table>' +

        '<div class="pd-bars">' +
          '<div class="pd-bar"><span class="pd-bar-l">' + txt('calc.before') + '</span>' +
            '<span class="pd-bar-t"><i style="width:100%"></i></span>' +
            '<span class="pd-bar-v">' + num(kwAntes, 1) + ' kW</span></div>' +
          '<div class="pd-bar is-new"><span class="pd-bar-l">' + txt('calc.after') + '</span>' +
            '<span class="pd-bar-t"><i style="width:' + (ratio * 100).toFixed(1) + '%"></i></span>' +
            '<span class="pd-bar-v">' + num(kwDesp, 1) + ' kW</span></div>' +
        '</div>' +

        '<h2 class="pd-h2">' + txt('report.method') + '</h2>' +
        '<p class="pd-note">' + txt('report.methodbody') + ' ' +
          (ahorroM > 0 ? txt('report.mincl') : txt('report.mexcl')) + '</p>' +

        '<footer class="pd-foot">' +
          '<p><strong>' + txt('report.by') + '</strong> Almenara · Madrid<br />' +
          'hugorcsar@gmail.com · +52 55 3910 2832<br />' +
          'almenaraled.com</p>' +
          '<p class="pd-disc">' + txt('report.disc') + '</p>' +
        '</footer>';
        return doc;
      };

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
      const pdf = document.createElement('button');
      pdf.type = 'button';
      pdf.className = 'btn btn-outline';
      pdf.setAttribute('data-i18n', 'calc.pdf.btn');
      pdf.textContent = txt('calc.pdf.btn');
      pdf.addEventListener('click', function () {
        // Quien ya sabe dónde está el destino no necesita que se lo repitan.
        let visto = false;
        try { visto = localStorage.getItem('site.pdfhint') === 'ok'; } catch (e) {}
        if (visto) { imprimir(); return; }
        mostrarPaso();
      });

      const acc = document.createElement('div');
      acc.className = 'hero-actions';
      acc.appendChild(pdf);
      acc.appendChild(a);
      cta.appendChild(acc);
      const pista = document.createElement('p');
      pista.className = 'calc-hint';
      pista.setAttribute('data-i18n', 'calc.pdf.hint');
      pista.textContent = txt('calc.pdf.hint');
      cta.appendChild(pista);
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

  // Con los scripts aplazados, cuando este archivo se ejecuta el documento ya
  // no está en estado "loading", sino en "interactive". Comprobar solo eso hacía
  // que la calculadora arrancase antes de que app.js hubiera preparado
  // window.SITE, no encontrara el traductor y se detuviera en silencio.
  // Ahora se espera al final de la lectura salvo que ya haya terminado del todo.
  if (document.readyState === 'complete') {
    arranca();
  } else {
    document.addEventListener('DOMContentLoaded', arranca);
  }
})();
