/* ==========================================================================
   Almenara — comportamiento de la página
   Este archivo va aparte del index.html a propósito: algunos servidores
   bloquean el código escrito dentro de la propia página por seguridad.
   Ruta obligatoria:  assets/js/app.js
   ========================================================================== */

/* --- Arranque: se ejecuta antes de pintar, para evitar el parpadeo -------- */
(function () {
  try {
    var t = localStorage.getItem('site.theme');
    if (!t) t = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', t);
    var p = new URLSearchParams(location.search).get('lang');
    var l = p || localStorage.getItem('site.lang') || (navigator.language || 'en').slice(0, 2).toLowerCase();
    if (['en','es','pt','fr','de','it','ru'].indexOf(l) === -1) l = 'en';
    document.documentElement.setAttribute('lang', l);
  } catch (e) {}
})();

/* --- Resto: espera a que el documento esté construido -------------------- */
document.addEventListener('DOMContentLoaded', function () {
  /* ==========================================================================
     DICCIONARIO DE IDIOMAS
     Cada clave se corresponde con un atributo data-i18n del documento.
     Para añadir texto nuevo: pon data-i18n="mi.clave" en el elemento y añade
     "mi.clave" a los seis idiomas. Si falta una clave en un idioma, cae al
     inglés en vez de dejar el hueco en blanco.
     ========================================================================== */
  const I18N = {
    en: {
      "meta.title": "Almenara — 275 lumens per watt, on any luminaire",
      "meta.desc": "A patented LED platform delivering over 275 lumens per watt and more than 50% energy reduction. Retrofit-ready, engineered and certified in Europe.",
      "meta.locale": "en_GB",
      "a11y.skip": "Skip to content", "a11y.home": "Almenara — home", "a11y.primary": "Main",
      "a11y.lang": "Choose language", "a11y.theme": "Switch between light and dark", "a11y.footer": "Footer",
      "nav.tech": "Technology", "nav.services": "Services", "nav.apps": "Applications", "nav.contact": "Contact",
      "hero.eyebrow": "LED platform technology · Madrid",
      "hero.title_a": "275 lumens per watt,", "hero.title_b": "on any luminaire.",
      "hero.sub": "A patented LED platform for manufacturers, lighting designers and infrastructure operators. It fits new luminaires and replaces the source in existing ones.",
      "hero.cta1": "Request the technical brief", "hero.cta2": "See where it is installed",
      "scale.label": "Luminous efficacy · lumens per watt", "scale.axis": "Scale 0 – 300 lm/W",
      "scale.inc": "Incandescent", "scale.fluo": "Fluorescent", "scale.mh": "Metal halide",
      "scale.led": "Commercial LED", "scale.self": "Almenara",
      "scale.note": "Comparison values are typical market ranges for each technology, not laboratory maxima. Our measurement conditions — colour temperature, colour rendering index, and whether the figure is taken at the module or at the complete luminaire with driver — are stated in full in the technical brief, together with the independent LM-79 report.",
      "metrics.aria": "Key figures", "metrics.efficacy": "Lumens per watt", "metrics.energy": "Energy consumption",
      "metrics.compat_v": "Universal", "metrics.compat_l": "Luminaire compatibility",
      "metrics.patent_v": "Worldwide", "metrics.patent_l": "Patent portfolio",
      "plat.label": "The platform",
      "plat.title": "One light engine, every fixture you already sell.",
      "plat.body": "We do not make luminaires. We make the light engine that goes inside them — and licence it to the manufacturers, lighting studios and infrastructure operators who do. It integrates into new products and replaces the source in installed ones, without redrawing the specification.",
      "plat.cta": "Read the technical brief →",
      "adv.label": "Why it is worth the switch",
      "adv.1t": "Efficacy above the commercial ceiling",
      "adv.1b": "More than 275 lm/W, against the 130 to 200 lm/W that current commercial luminaires deliver. The same light for roughly half the connected load.",
      "adv.2t": "A patent you can build a product line on",
      "adv.2b": "A worldwide portfolio protecting the optical and thermal architecture, so a licensee is not exposed on the technology it builds into its catalogue.",
      "adv.3t": "No respecification",
      "adv.3b": "It fits the luminaires already on the market. Existing photometric distribution, existing housings, existing installation. The project does not have to be drawn again.",
      "adv.4t": "European from design to certificate",
      "adv.4b": "Designed in Madrid, certified in Europe, supplied from Europe. Documentation ready for public procurement files.",
      "app.label": "Where it is installed",
      "app.title": "Any spectrum, any format, any scale.",
      "app.body": "From hospitality and architectural lighting to industry and public infrastructure. Where the installed load is high and the hours of use are long, the saving is largest.",
      "app.1": "Hospitality", "app.2": "Industry", "app.3": "Architecture", "app.4": "Public infrastructure",
      "cert.label": "Certification and awards", "cert.title": "Verified by third parties.",
      "cert.1": "European Union approval certificate",
      "cert.2": "Portuguese national recognition for energy saving",
      "cert.3": "National Energy Saving Prize — IBM offices retrofit, Mexico City",
      "cert.note": "Copies of every certificate and the awarding body for each are included in the technical brief.",
      "cta.label": "Next step",
      "cta.title": "Send us the fixture. We will send back the numbers.",
      "cta.body": "Tell us the luminaire you make or operate and the hours it runs. We return the efficacy comparison, the projected saving and the test conditions behind it, so your own engineers can check the claim.",
      "cta.btn": "Start the conversation", "cta.alt": "Download the technical brief",
      "foot.tagline": "Patented LED platform technology. Madrid.",
      "foot.legal1": "Legal notice", "foot.legal2": "Privacy", "foot.legal3": "Cookies",
      "foot.rights": "© 2026 Almenara · Madrid"
    },

    es: {
      "meta.title": "Almenara — 275 lúmenes por vatio, en cualquier luminaria",
      "meta.desc": "Plataforma LED patentada que supera los 275 lúmenes por vatio y reduce el consumo más de un 50 %. Apta para instalaciones existentes, diseñada y certificada en Europa.",
      "meta.locale": "es_ES",
      "a11y.skip": "Saltar al contenido", "a11y.home": "Almenara — inicio", "a11y.primary": "Principal",
      "a11y.lang": "Elegir idioma", "a11y.theme": "Alternar entre tema claro y oscuro", "a11y.footer": "Pie de página",
      "nav.tech": "Tecnología", "nav.services": "Servicios", "nav.apps": "Aplicaciones", "nav.contact": "Contacto",
      "hero.eyebrow": "Tecnología de plataforma LED · Madrid",
      "hero.title_a": "275 lúmenes por vatio,", "hero.title_b": "en cualquier luminaria.",
      "hero.sub": "Plataforma LED patentada para fabricantes, estudios de iluminación y operadores de infraestructuras. Se integra en luminarias nuevas y sustituye la fuente de luz en las ya instaladas.",
      "hero.cta1": "Solicitar la ficha técnica", "hero.cta2": "Ver dónde está instalada",
      "scale.label": "Eficacia luminosa · lúmenes por vatio", "scale.axis": "Escala 0 – 300 lm/W",
      "scale.inc": "Incandescente", "scale.fluo": "Fluorescente", "scale.mh": "Halogenuros metálicos",
      "scale.led": "LED comercial", "scale.self": "Almenara",
      "scale.note": "Los valores de comparación son rangos habituales de mercado para cada tecnología, no máximos de laboratorio. Nuestras condiciones de medida —temperatura de color, índice de reproducción cromática y si la cifra corresponde al módulo o a la luminaria completa con su equipo de alimentación— figuran íntegras en la ficha técnica, junto con el informe LM-79 de laboratorio independiente.",
      "metrics.aria": "Cifras principales", "metrics.efficacy": "Lúmenes por vatio", "metrics.energy": "Consumo eléctrico",
      "metrics.compat_v": "Universal", "metrics.compat_l": "Compatibilidad con luminarias",
      "metrics.patent_v": "Mundial", "metrics.patent_l": "Cartera de patentes",
      "plat.label": "La plataforma",
      "plat.title": "Un solo motor de luz para todas las luminarias que ya vendes.",
      "plat.body": "No fabricamos luminarias: fabricamos el motor de luz que llevan dentro y lo cedemos bajo licencia a quienes sí las fabrican, proyectan u operan. Se integra en productos nuevos y sustituye la fuente en los ya instalados sin necesidad de rehacer el proyecto luminotécnico.",
      "plat.cta": "Leer la ficha técnica →",
      "adv.label": "Por qué compensa el cambio",
      "adv.1t": "Eficacia por encima del techo comercial",
      "adv.1b": "Más de 275 lm/W frente a los 130-200 lm/W que rinden hoy las luminarias comerciales. La misma luz con aproximadamente la mitad de potencia instalada.",
      "adv.2t": "Una patente sobre la que construir catálogo",
      "adv.2b": "Cartera de patentes de alcance mundial que protege la arquitectura óptica y térmica; el licenciatario no queda expuesto en la tecnología que incorpora a su gama.",
      "adv.3t": "Sin rehacer la especificación",
      "adv.3b": "Encaja en las luminarias que ya están en el mercado: misma distribución fotométrica, misma carcasa, misma instalación. No hay que volver a dibujar el proyecto.",
      "adv.4t": "Europea desde el diseño hasta el certificado",
      "adv.4b": "Diseñada en Madrid, certificada en Europa y suministrada desde Europa. Documentación preparada para expedientes de contratación pública.",
      "app.label": "Dónde está instalada",
      "app.title": "Cualquier espectro, cualquier formato, cualquier escala.",
      "app.body": "Desde la hostelería y la iluminación arquitectónica hasta la industria y la infraestructura pública. Donde la potencia instalada es alta y las horas de uso son muchas, el ahorro es mayor.",
      "app.1": "Hostelería", "app.2": "Industria", "app.3": "Arquitectura", "app.4": "Infraestructura pública",
      "cert.label": "Certificación y reconocimientos", "cert.title": "Verificada por terceros.",
      "cert.1": "Certificado de homologación de la Unión Europea",
      "cert.2": "Reconocimiento nacional portugués al ahorro energético",
      "cert.3": "Premio Nacional de Ahorro Energético — reforma de las oficinas de IBM en Ciudad de México",
      "cert.note": "En la ficha técnica se adjuntan copia de cada certificado y el organismo que lo otorga.",
      "cta.label": "Siguiente paso",
      "cta.title": "Mándanos la luminaria. Te devolvemos los números.",
      "cta.body": "Dinos qué luminaria fabricas u operas y cuántas horas funciona. Te devolvemos la comparación de eficacia, el ahorro previsto y las condiciones de ensayo que lo sostienen, para que tus propios ingenieros puedan comprobarlo.",
      "cta.btn": "Empezar la conversación", "cta.alt": "Descargar la ficha técnica",
      "foot.tagline": "Tecnología de plataforma LED patentada. Madrid.",
      "foot.legal1": "Aviso legal", "foot.legal2": "Privacidad", "foot.legal3": "Cookies",
      "foot.rights": "© 2026 Almenara · Madrid"
    },

    pt: {
      "meta.title": "Almenara — 275 lúmenes por watt, em qualquer luminária",
      "meta.desc": "Plataforma LED patenteada que ultrapassa os 275 lúmenes por watt e reduz o consumo em mais de 50 %. Compatível com instalações existentes, concebida e certificada na Europa.",
      "meta.locale": "pt_PT",
      "a11y.skip": "Saltar para o conteúdo", "a11y.home": "Almenara — página inicial", "a11y.primary": "Principal",
      "a11y.lang": "Escolher idioma", "a11y.theme": "Alternar entre tema claro e escuro", "a11y.footer": "Rodapé",
      "nav.tech": "Tecnologia", "nav.services": "Serviços", "nav.apps": "Aplicações", "nav.contact": "Contacto",
      "hero.eyebrow": "Tecnologia de plataforma LED · Madrid",
      "hero.title_a": "275 lúmenes por watt,", "hero.title_b": "em qualquer luminária.",
      "hero.sub": "Uma plataforma LED patenteada para fabricantes, projectistas de iluminação e operadores de infraestruturas. Integra-se em luminárias novas e substitui a fonte de luz nas já instaladas.",
      "hero.cta1": "Pedir a ficha técnica", "hero.cta2": "Ver onde está instalada",
      "scale.label": "Eficácia luminosa · lúmenes por watt", "scale.axis": "Escala 0 – 300 lm/W",
      "scale.inc": "Incandescente", "scale.fluo": "Fluorescente", "scale.mh": "Iodetos metálicos",
      "scale.led": "LED comercial", "scale.self": "Almenara",
      "scale.note": "Os valores de comparação correspondem a intervalos correntes de mercado para cada tecnologia, não a máximos de laboratório. As nossas condições de medição — temperatura de cor, índice de restituição cromática e se o valor é medido no módulo ou na luminária completa com alimentador — constam na íntegra da ficha técnica, juntamente com o relatório LM-79 de laboratório independente.",
      "metrics.aria": "Valores principais", "metrics.efficacy": "Lúmenes por watt", "metrics.energy": "Consumo eléctrico",
      "metrics.compat_v": "Universal", "metrics.compat_l": "Compatibilidade com luminárias",
      "metrics.patent_v": "Mundial", "metrics.patent_l": "Carteira de patentes",
      "plat.label": "A plataforma",
      "plat.title": "Um só motor de luz para todas as luminárias que já vende.",
      "plat.body": "Não fabricamos luminárias: fabricamos o motor de luz que elas levam dentro e licenciamo-lo a quem as fabrica, projecta ou opera. Integra-se em produtos novos e substitui a fonte de luz nas instalações existentes sem refazer o projecto luminotécnico.",
      "plat.cta": "Ler a ficha técnica →",
      "adv.label": "Porque compensa mudar",
      "adv.1t": "Eficácia acima do tecto comercial",
      "adv.1b": "Mais de 275 lm/W, contra os 130 a 200 lm/W que as luminárias comerciais rendem hoje. A mesma luz com cerca de metade da potência instalada.",
      "adv.2t": "Uma patente sobre a qual construir gama",
      "adv.2b": "Carteira de patentes de alcance mundial que protege a arquitectura óptica e térmica: o licenciado não fica exposto na tecnologia que integra no seu catálogo.",
      "adv.3t": "Sem refazer a especificação",
      "adv.3b": "Encaixa nas luminárias já disponíveis no mercado: mesma distribuição fotométrica, mesma caixa, mesma instalação. O projecto não tem de ser redesenhado.",
      "adv.4t": "Europeia do desenho ao certificado",
      "adv.4b": "Concebida em Madrid, certificada na Europa e fornecida a partir da Europa. Documentação preparada para processos de contratação pública.",
      "app.label": "Onde está instalada",
      "app.title": "Qualquer espectro, qualquer formato, qualquer escala.",
      "app.body": "Da hotelaria e da iluminação arquitectónica à indústria e às infraestruturas públicas. Onde a potência instalada é elevada e as horas de funcionamento são muitas, a poupança é maior.",
      "app.1": "Hotelaria", "app.2": "Indústria", "app.3": "Arquitectura", "app.4": "Infraestruturas públicas",
      "cert.label": "Certificação e distinções", "cert.title": "Verificada por terceiros.",
      "cert.1": "Certificado de homologação da União Europeia",
      "cert.2": "Reconhecimento nacional português pela poupança de energia",
      "cert.3": "Prémio Nacional de Poupança Energética — remodelação dos escritórios da IBM, Cidade do México",
      "cert.note": "Na ficha técnica juntam-se cópia de cada certificado e a entidade que o atribui.",
      "cta.label": "Passo seguinte",
      "cta.title": "Envie-nos a luminária. Devolvemos-lhe os números.",
      "cta.body": "Diga-nos que luminária fabrica ou opera e quantas horas funciona. Devolvemos a comparação de eficácia, a poupança prevista e as condições de ensaio que a sustentam, para que os seus próprios engenheiros possam verificá-la.",
      "cta.btn": "Iniciar a conversa", "cta.alt": "Descarregar a ficha técnica",
      "foot.tagline": "Tecnologia de plataforma LED patenteada. Madrid.",
      "foot.legal1": "Aviso legal", "foot.legal2": "Privacidade", "foot.legal3": "Cookies",
      "foot.rights": "© 2026 Almenara · Madrid"
    },
    fr: {
      "meta.title": "Almenara — 275 lumens par watt, sur tout luminaire",
      "meta.desc": "Plateforme LED brevetée dépassant 275 lumens par watt et réduisant la consommation de plus de 50 %. Compatible avec les installations existantes, conçue et certifiée en Europe.",
      "meta.locale": "fr_FR",
      "a11y.skip": "Aller au contenu", "a11y.home": "Almenara — accueil", "a11y.primary": "Principal",
      "a11y.lang": "Choisir la langue", "a11y.theme": "Basculer entre thème clair et sombre", "a11y.footer": "Pied de page",
      "nav.tech": "Technologie", "nav.services": "Services", "nav.apps": "Applications", "nav.contact": "Contact",
      "hero.eyebrow": "Technologie de plateforme LED · Madrid",
      "hero.title_a": "275 lumens par watt,", "hero.title_b": "sur tout luminaire.",
      "hero.sub": "Une plateforme LED brevetée destinée aux fabricants, aux concepteurs lumière et aux exploitants d'infrastructures. Elle s'intègre aux luminaires neufs et remplace la source dans ceux déjà installés.",
      "hero.cta1": "Demander la fiche technique", "hero.cta2": "Voir les installations",
      "scale.label": "Efficacité lumineuse · lumens par watt", "scale.axis": "Échelle 0 – 300 lm/W",
      "scale.inc": "Incandescence", "scale.fluo": "Fluorescent", "scale.mh": "Iodures métalliques",
      "scale.led": "LED du marché", "scale.self": "Almenara",
      "scale.note": "Les valeurs de comparaison correspondent aux plages courantes du marché pour chaque technologie, et non à des maxima de laboratoire. Nos conditions de mesure — température de couleur, indice de rendu des couleurs, et mesure prise au module ou au luminaire complet avec son driver — figurent intégralement dans la fiche technique, avec le rapport LM-79 d'un laboratoire indépendant.",
      "metrics.aria": "Chiffres clés", "metrics.efficacy": "Lumens par watt", "metrics.energy": "Consommation électrique",
      "metrics.compat_v": "Universelle", "metrics.compat_l": "Compatibilité luminaires",
      "metrics.patent_v": "Mondial", "metrics.patent_l": "Portefeuille de brevets",
      "plat.label": "La plateforme",
      "plat.title": "Un seul moteur de lumière pour tous vos luminaires.",
      "plat.body": "Nous ne fabriquons pas de luminaires : nous fabriquons le moteur de lumière qu'ils abritent et le concédons sous licence à ceux qui les fabriquent, les conçoivent ou les exploitent. Il s'intègre aux produits neufs et remplace la source dans les installations existantes sans refaire l'étude d'éclairage.",
      "plat.cta": "Lire la fiche technique →",
      "adv.label": "Pourquoi le changement vaut la peine",
      "adv.1t": "Une efficacité au-dessus du plafond commercial",
      "adv.1b": "Plus de 275 lm/W, contre les 130 à 200 lm/W qu'atteignent aujourd'hui les luminaires du marché. La même lumière pour environ la moitié de la puissance installée.",
      "adv.2t": "Un brevet sur lequel bâtir une gamme",
      "adv.2b": "Un portefeuille mondial protégeant l'architecture optique et thermique : le licencié n'est pas exposé sur la technologie qu'il intègre à son catalogue.",
      "adv.3t": "Aucune reprise de la spécification",
      "adv.3b": "Compatible avec les luminaires déjà commercialisés : même distribution photométrique, même carter, même installation. Le projet n'est pas à redessiner.",
      "adv.4t": "Européenne, de la conception au certificat",
      "adv.4b": "Conçue à Madrid, certifiée en Europe, fournie depuis l'Europe. Documentation prête pour les dossiers de marchés publics.",
      "app.label": "Où elle est installée",
      "app.title": "Tout spectre, tout format, toute échelle.",
      "app.body": "De l'hôtellerie et de l'éclairage architectural à l'industrie et aux infrastructures publiques. Là où la puissance installée est forte et les heures d'usage nombreuses, l'économie est la plus grande.",
      "app.1": "Hôtellerie", "app.2": "Industrie", "app.3": "Architecture", "app.4": "Infrastructures publiques",
      "cert.label": "Certification et distinctions", "cert.title": "Vérifiée par des tiers.",
      "cert.1": "Certificat d'homologation de l'Union européenne",
      "cert.2": "Reconnaissance nationale portugaise pour les économies d'énergie",
      "cert.3": "Prix national des économies d'énergie — rénovation des bureaux IBM, Mexico",
      "cert.note": "La fiche technique contient une copie de chaque certificat et l'organisme qui l'a délivré.",
      "cta.label": "Étape suivante",
      "cta.title": "Envoyez-nous le luminaire. Nous vous renvoyons les chiffres.",
      "cta.body": "Indiquez-nous le luminaire que vous fabriquez ou exploitez et ses heures de fonctionnement. Nous renvoyons la comparaison d'efficacité, l'économie prévue et les conditions d'essai qui la fondent, pour que vos propres ingénieurs puissent la vérifier.",
      "cta.btn": "Engager la conversation", "cta.alt": "Télécharger la fiche technique",
      "foot.tagline": "Technologie de plateforme LED brevetée. Madrid.",
      "foot.legal1": "Mentions légales", "foot.legal2": "Confidentialité", "foot.legal3": "Cookies",
      "foot.rights": "© 2026 Almenara · Madrid"
    },

    de: {
      "meta.title": "Almenara — 275 Lumen pro Watt, in jeder Leuchte",
      "meta.desc": "Patentierte LED-Plattform mit über 275 Lumen pro Watt und mehr als 50 % weniger Verbrauch. Nachrüstbar, in Europa entwickelt und zertifiziert.",
      "meta.locale": "de_DE",
      "a11y.skip": "Zum Inhalt springen", "a11y.home": "Almenara — Startseite", "a11y.primary": "Haupt",
      "a11y.lang": "Sprache wählen", "a11y.theme": "Zwischen hellem und dunklem Thema wechseln", "a11y.footer": "Fußbereich",
      "nav.tech": "Technologie", "nav.services": "Leistungen", "nav.apps": "Anwendungen", "nav.contact": "Kontakt",
      "hero.eyebrow": "LED-Plattformtechnologie · Madrid",
      "hero.title_a": "275 Lumen pro Watt,", "hero.title_b": "in jeder Leuchte.",
      "hero.sub": "Eine patentierte LED-Plattform für Hersteller, Lichtplaner und Infrastrukturbetreiber. Sie geht in neue Leuchten ein und ersetzt das Leuchtmittel in bestehenden.",
      "hero.cta1": "Datenblatt anfordern", "hero.cta2": "Einsatzbereiche ansehen",
      "scale.label": "Lichtausbeute · Lumen pro Watt", "scale.axis": "Skala 0 – 300 lm/W",
      "scale.inc": "Glühlampe", "scale.fluo": "Leuchtstofflampe", "scale.mh": "Halogen-Metalldampf",
      "scale.led": "Handelsübliche LED", "scale.self": "Almenara",
      "scale.note": "Die Vergleichswerte sind marktübliche Bereiche der jeweiligen Technologie, keine Laborhöchstwerte. Unsere Messbedingungen — Farbtemperatur, Farbwiedergabeindex sowie die Frage, ob am Modul oder an der kompletten Leuchte samt Betriebsgerät gemessen wurde — stehen vollständig im Datenblatt, zusammen mit dem LM-79-Bericht eines unabhängigen Labors.",
      "metrics.aria": "Kennzahlen", "metrics.efficacy": "Lumen pro Watt", "metrics.energy": "Stromverbrauch",
      "metrics.compat_v": "Universell", "metrics.compat_l": "Leuchtenkompatibilität",
      "metrics.patent_v": "Weltweit", "metrics.patent_l": "Patentportfolio",
      "plat.label": "Die Plattform",
      "plat.title": "Ein Lichtmodul für alle Leuchten, die Sie bereits verkaufen.",
      "plat.body": "Wir bauen keine Leuchten, sondern das Lichtmodul darin — und lizenzieren es an jene, die Leuchten herstellen, planen oder betreiben. Es lässt sich in neue Produkte integrieren und ersetzt die Lichtquelle in bestehenden Anlagen, ohne die Lichtplanung neu aufzusetzen.",
      "plat.cta": "Datenblatt lesen →",
      "adv.label": "Warum sich der Wechsel lohnt",
      "adv.1t": "Ausbeute oberhalb der Marktgrenze",
      "adv.1b": "Über 275 lm/W gegenüber den 130 bis 200 lm/W heutiger Marktleuchten. Dasselbe Licht bei etwa der halben Anschlussleistung.",
      "adv.2t": "Ein Patent, auf dem sich eine Produktlinie aufbauen lässt",
      "adv.2b": "Ein weltweites Portfolio schützt die optische und thermische Architektur; der Lizenznehmer trägt kein Risiko bei der Technologie, die er in sein Sortiment aufnimmt.",
      "adv.3t": "Keine neue Spezifikation",
      "adv.3b": "Passt in bereits erhältliche Leuchten: gleiche Lichtverteilung, gleiches Gehäuse, gleiche Montage. Das Projekt muss nicht neu geplant werden.",
      "adv.4t": "Europäisch, vom Entwurf bis zum Zertifikat",
      "adv.4b": "In Madrid entwickelt, in Europa zertifiziert, aus Europa geliefert. Unterlagen sind für Vergabeakten der öffentlichen Hand vorbereitet.",
      "app.label": "Wo sie installiert ist",
      "app.title": "Jedes Spektrum, jedes Format, jeder Maßstab.",
      "app.body": "Von Hotellerie und Architekturbeleuchtung bis zu Industrie und öffentlicher Infrastruktur. Wo die installierte Leistung hoch und die Betriebsstunden zahlreich sind, fällt die Ersparnis am größten aus.",
      "app.1": "Hotellerie", "app.2": "Industrie", "app.3": "Architektur", "app.4": "Öffentliche Infrastruktur",
      "cert.label": "Zertifizierung und Auszeichnungen", "cert.title": "Von Dritten geprüft.",
      "cert.1": "Zulassungsbescheinigung der Europäischen Union",
      "cert.2": "Portugiesische nationale Auszeichnung für Energieeinsparung",
      "cert.3": "Nationaler Energiesparpreis — Sanierung der IBM-Büros, Mexiko-Stadt",
      "cert.note": "Das Datenblatt enthält Kopien aller Zertifikate und die jeweils ausstellende Stelle.",
      "cta.label": "Nächster Schritt",
      "cta.title": "Schicken Sie uns die Leuchte. Wir schicken die Zahlen zurück.",
      "cta.body": "Nennen Sie uns die Leuchte, die Sie herstellen oder betreiben, und ihre Betriebsstunden. Wir liefern den Ausbeutevergleich, die erwartete Einsparung und die zugrunde liegenden Prüfbedingungen, damit Ihre eigenen Ingenieure nachrechnen können.",
      "cta.btn": "Gespräch beginnen", "cta.alt": "Datenblatt herunterladen",
      "foot.tagline": "Patentierte LED-Plattformtechnologie. Madrid.",
      "foot.legal1": "Impressum", "foot.legal2": "Datenschutz", "foot.legal3": "Cookies",
      "foot.rights": "© 2026 Almenara · Madrid"
    },

    it: {
      "meta.title": "Almenara — 275 lumen per watt, su qualsiasi apparecchio",
      "meta.desc": "Piattaforma LED brevettata che supera i 275 lumen per watt e riduce i consumi di oltre il 50 %. Adatta agli impianti esistenti, progettata e certificata in Europa.",
      "meta.locale": "it_IT",
      "a11y.skip": "Vai al contenuto", "a11y.home": "Almenara — pagina iniziale", "a11y.primary": "Principale",
      "a11y.lang": "Scegli la lingua", "a11y.theme": "Alterna tema chiaro e scuro", "a11y.footer": "Piè di pagina",
      "nav.tech": "Tecnologia", "nav.services": "Servizi", "nav.apps": "Applicazioni", "nav.contact": "Contatti",
      "hero.eyebrow": "Tecnologia di piattaforma LED · Madrid",
      "hero.title_a": "275 lumen per watt,", "hero.title_b": "su qualsiasi apparecchio.",
      "hero.sub": "Una piattaforma LED brevettata per produttori, progettisti illuminotecnici e gestori di infrastrutture. Si integra negli apparecchi nuovi e sostituisce la sorgente in quelli già installati.",
      "hero.cta1": "Richiedi la scheda tecnica", "hero.cta2": "Guarda dove è installata",
      "scale.label": "Efficienza luminosa · lumen per watt", "scale.axis": "Scala 0 – 300 lm/W",
      "scale.inc": "Incandescenza", "scale.fluo": "Fluorescente", "scale.mh": "Ioduri metallici",
      "scale.led": "LED commerciale", "scale.self": "Almenara",
      "scale.note": "I valori di confronto sono intervalli tipici di mercato per ciascuna tecnologia, non massimi di laboratorio. Le nostre condizioni di misura — temperatura di colore, indice di resa cromatica e se il dato è rilevato sul modulo o sull'apparecchio completo di alimentatore — sono riportate per intero nella scheda tecnica, insieme al rapporto LM-79 di laboratorio indipendente.",
      "metrics.aria": "Dati principali", "metrics.efficacy": "Lumen per watt", "metrics.energy": "Consumo elettrico",
      "metrics.compat_v": "Universale", "metrics.compat_l": "Compatibilità con gli apparecchi",
      "metrics.patent_v": "Mondiale", "metrics.patent_l": "Portafoglio brevetti",
      "plat.label": "La piattaforma",
      "plat.title": "Un solo motore di luce per tutti gli apparecchi che già vendi.",
      "plat.body": "Non produciamo apparecchi: produciamo il motore di luce che contengono e lo concediamo in licenza a chi li fabbrica, li progetta o li gestisce. Si integra nei prodotti nuovi e sostituisce la sorgente in quelli installati senza rifare il progetto illuminotecnico.",
      "plat.cta": "Leggi la scheda tecnica →",
      "adv.label": "Perché conviene cambiare",
      "adv.1t": "Efficienza oltre il tetto commerciale",
      "adv.1b": "Oltre 275 lm/W contro i 130-200 lm/W degli apparecchi oggi in commercio. La stessa luce con circa metà della potenza installata.",
      "adv.2t": "Un brevetto su cui costruire una gamma",
      "adv.2b": "Un portafoglio mondiale che protegge l'architettura ottica e termica: il licenziatario non resta esposto sulla tecnologia che inserisce a catalogo.",
      "adv.3t": "Nessuna nuova specifica",
      "adv.3b": "Si adatta agli apparecchi già sul mercato: stessa distribuzione fotometrica, stesso corpo, stessa installazione. Il progetto non va ridisegnato.",
      "adv.4t": "Europea dal progetto al certificato",
      "adv.4b": "Progettata a Madrid, certificata in Europa, fornita dall'Europa. Documentazione pronta per i fascicoli di gara pubblica.",
      "app.label": "Dove è installata",
      "app.title": "Qualsiasi spettro, qualsiasi formato, qualsiasi scala.",
      "app.body": "Dall'ospitalità e dall'illuminazione architettonica all'industria e alle infrastrutture pubbliche. Dove la potenza installata è alta e le ore di funzionamento sono molte, il risparmio è maggiore.",
      "app.1": "Ospitalità", "app.2": "Industria", "app.3": "Architettura", "app.4": "Infrastrutture pubbliche",
      "cert.label": "Certificazioni e riconoscimenti", "cert.title": "Verificata da terzi.",
      "cert.1": "Certificato di omologazione dell'Unione Europea",
      "cert.2": "Riconoscimento nazionale portoghese per il risparmio energetico",
      "cert.3": "Premio Nazionale per il Risparmio Energetico — riqualificazione degli uffici IBM, Città del Messico",
      "cert.note": "Nella scheda tecnica sono allegate copia di ogni certificato e l'ente che lo rilascia.",
      "cta.label": "Passo successivo",
      "cta.title": "Mandaci l'apparecchio. Ti rimandiamo i numeri.",
      "cta.body": "Dicci quale apparecchio produci o gestisci e quante ore funziona. Ti restituiamo il confronto di efficienza, il risparmio previsto e le condizioni di prova che lo sostengono, perché i tuoi ingegneri possano verificarlo.",
      "cta.btn": "Avvia la conversazione", "cta.alt": "Scarica la scheda tecnica",
      "foot.tagline": "Tecnologia di piattaforma LED brevettata. Madrid.",
      "foot.legal1": "Note legali", "foot.legal2": "Privacy", "foot.legal3": "Cookie",
      "foot.rights": "© 2026 Almenara · Madrid"
    },

    ru: {
      "meta.title": "Almenara — 275 люмен на ватт в любом светильнике",
      "meta.desc": "Запатентованная светодиодная платформа: свыше 275 люмен на ватт и снижение потребления более чем на 50 %. Подходит для действующих установок, разработана и сертифицирована в Европе.",
      "meta.locale": "ru_RU",
      "a11y.skip": "Перейти к содержанию", "a11y.home": "Almenara — главная", "a11y.primary": "Основное",
      "a11y.lang": "Выбрать язык", "a11y.theme": "Переключить светлую и тёмную тему", "a11y.footer": "Нижний колонтитул",
      "nav.tech": "Технология", "nav.services": "Услуги", "nav.apps": "Применение", "nav.contact": "Контакты",
      "hero.eyebrow": "Светодиодная платформа · Мадрид",
      "hero.title_a": "275 люмен на ватт —", "hero.title_b": "в любом светильнике.",
      "hero.sub": "Запатентованная светодиодная платформа для производителей, светодизайнеров и операторов инфраструктуры. Встраивается в новые светильники и заменяет источник света в уже установленных.",
      "hero.cta1": "Запросить техническое описание", "hero.cta2": "Посмотреть объекты",
      "scale.label": "Световая отдача · люмен на ватт", "scale.axis": "Шкала 0 – 300 лм/Вт",
      "scale.inc": "Лампа накаливания", "scale.fluo": "Люминесцентная", "scale.mh": "Металлогалогенная",
      "scale.led": "Серийные светодиоды", "scale.self": "Almenara",
      "scale.note": "Значения для сравнения — типичные рыночные диапазоны каждой технологии, а не лабораторные максимумы. Наши условия измерения (цветовая температура, индекс цветопередачи, а также измерялся ли модуль или светильник целиком с драйвером) полностью изложены в техническом описании вместе с протоколом LM-79 независимой лаборатории.",
      "metrics.aria": "Ключевые показатели", "metrics.efficacy": "Люмен на ватт", "metrics.energy": "Потребление энергии",
      "metrics.compat_v": "Полная", "metrics.compat_l": "Совместимость со светильниками",
      "metrics.patent_v": "Мировой", "metrics.patent_l": "Патентный портфель",
      "plat.label": "Платформа",
      "plat.title": "Один световой модуль для всех светильников вашего каталога.",
      "plat.body": "Мы не выпускаем светильники — мы делаем световой модуль внутри них и передаём его по лицензии тем, кто светильники производит, проектирует или эксплуатирует. Он встраивается в новые изделия и заменяет источник света в действующих установках без переработки светотехнического проекта.",
      "plat.cta": "Читать техническое описание →",
      "adv.label": "Почему переход оправдан",
      "adv.1t": "Отдача выше рыночного потолка",
      "adv.1b": "Свыше 275 лм/Вт против 130–200 лм/Вт у сегодняшних серийных светильников. Тот же свет примерно при половине установленной мощности.",
      "adv.2t": "Патент, на котором можно строить линейку",
      "adv.2b": "Портфель патентов мирового охвата защищает оптическую и тепловую архитектуру: лицензиат не несёт риска по технологии, которую вводит в свой каталог.",
      "adv.3t": "Без переработки спецификации",
      "adv.3b": "Подходит к светильникам, уже представленным на рынке: та же кривая силы света, тот же корпус, тот же монтаж. Проект переделывать не нужно.",
      "adv.4t": "Европейская от разработки до сертификата",
      "adv.4b": "Разработано в Мадриде, сертифицировано в Европе, поставляется из Европы. Документация готова для конкурсных процедур.",
      "app.label": "Где установлена",
      "app.title": "Любой спектр, любой формат, любой масштаб.",
      "app.body": "От гостиничного дела и архитектурного освещения до промышленности и общественной инфраструктуры. Там, где установленная мощность велика, а часы работы длинны, экономия наибольшая.",
      "app.1": "Гостиницы", "app.2": "Промышленность", "app.3": "Архитектура", "app.4": "Общественная инфраструктура",
      "cert.label": "Сертификация и награды", "cert.title": "Подтверждено третьими сторонами.",
      "cert.1": "Сертификат соответствия Европейского союза",
      "cert.2": "Национальное признание Португалии за энергосбережение",
      "cert.3": "Национальная премия за энергосбережение — реконструкция офисов IBM, Мехико",
      "cert.note": "В техническом описании приложены копии всех сертификатов с указанием выдавшего органа.",
      "cta.label": "Следующий шаг",
      "cta.title": "Пришлите светильник — вернём расчёт.",
      "cta.body": "Сообщите, какой светильник вы производите или эксплуатируете и сколько часов он работает. Мы вернём сравнение световой отдачи, ожидаемую экономию и условия испытаний, лежащие в её основе, чтобы ваши инженеры могли всё проверить.",
      "cta.btn": "Начать разговор", "cta.alt": "Скачать техническое описание",
      "foot.tagline": "Запатентованная светодиодная платформа. Мадрид.",
      "foot.legal1": "Правовая информация", "foot.legal2": "Конфиденциальность", "foot.legal3": "Файлы cookie",
      "foot.rights": "© 2026 Almenara · Мадрид"
    }
  };

  /* ==========================================================================
     MOTOR DE TRADUCCIÓN
     Traduce texto, atributos, el título de la pestaña, la descripción, el
     idioma del documento y el estado del selector. Guarda la elección y la
     refleja en la dirección (?lang=xx) para que el enlace sea compartible.
     ========================================================================== */
  const LANGS = ['en', 'es', 'pt', 'fr', 'de', 'it', 'ru'];

  function t(lang, key) {
    const dict = I18N[lang] || I18N.en;
    return dict[key] !== undefined ? dict[key] : I18N.en[key];
  }

  function setMeta(selector, value) {
    const el = document.head.querySelector(selector);
    if (el && value) el.setAttribute('content', value);
  }

  function applyLang(lang, push) {
    if (LANGS.indexOf(lang) === -1) lang = 'en';

    document.documentElement.setAttribute('lang', lang);

    // Texto
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const v = t(lang, el.getAttribute('data-i18n'));
      if (v !== undefined) el.textContent = v;
    });

    // Atributos: data-i18n-attr="aria-label:clave|title:otra.clave"
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split('|').forEach(function (pair) {
        const i = pair.indexOf(':');
        if (i < 0) return;
        const attr = pair.slice(0, i).trim();
        const v = t(lang, pair.slice(i + 1).trim());
        if (v !== undefined) el.setAttribute(attr, v);
      });
    });

    // Cabecera del documento
    document.title = t(lang, 'meta.title');
    setMeta('meta[name="description"]', t(lang, 'meta.desc'));
    setMeta('meta[property="og:title"]', t(lang, 'meta.title'));
    setMeta('meta[property="og:description"]', t(lang, 'meta.desc'));
    setMeta('meta[property="og:locale"]', t(lang, 'meta.locale'));
    setMeta('meta[name="twitter:title"]', t(lang, 'meta.title'));
    setMeta('meta[name="twitter:description"]', t(lang, 'meta.desc'));

    // Selector
    document.querySelectorAll('.lang-btn').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
    });

    try { localStorage.setItem('site.lang', lang); } catch (e) {}

    if (push) {
      const url = new URL(location.href);
      url.searchParams.set('lang', lang);
      history.replaceState(null, '', url);
    }
  }

  function initialLang() {
    const p = new URLSearchParams(location.search).get('lang');
    if (p && LANGS.indexOf(p) > -1) return p;
    try {
      const s = localStorage.getItem('site.lang');
      if (s && LANGS.indexOf(s) > -1) return s;
    } catch (e) {}
    const n = (navigator.language || 'en').slice(0, 2).toLowerCase();
    return LANGS.indexOf(n) > -1 ? n : 'en';
  }

  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () { applyLang(btn.dataset.lang, true); });
  });

  applyLang(initialLang(), false);

  /* --- Tema --------------------------------------------------------------- */
  document.querySelector('[data-theme-toggle]').addEventListener('click', function () {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('site.theme', next); } catch (e) {}
  });

  /* --- Apariciones al desplazar ------------------------------------------- */
  (function () {
    const items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px' });
    items.forEach(function (el) { io.observe(el); });
  })();
});
