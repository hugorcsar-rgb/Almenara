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
     Diccionario de las páginas interiores.
     Se fusiona con el de la portada en app.js. Mismas reglas: si una clave
     falta en un idioma, cae al inglés en lugar de dejar el hueco vacío.
     ========================================================================== */
  const I18N_PAGES = {

    en: {
      "tech.meta.title": "Technology — Almenara",
      "tech.meta.desc": "The patented optical and thermal architecture behind the Almenara LED platform.",
      "tech.eyebrow": "Technology",
      "tech.title": "Light without the heat penalty.",
      "tech.sub": "A conventional LED loses more than half its electrical input as heat at the emitting surface, which caps both output and lifetime. Our architecture moves that load away from the diode so it can run near its thermodynamic optimum.",
      "tech.principle.label": "The principle",
      "tech.principle.title": "More light, less heat, same fixture.",
      "tech.principle.body": "The gain comes from the optical and thermal path, not from exotic materials or a new luminaire. That is what makes it retrofittable: the host fixture, its housing and its photometric distribution stay as they are.",
      "tech.specs.label": "Specifications",
      "tech.specs.title": "Standard platform values.",
      "tech.specs.body": "Custom configurations on request. Figures marked in amber are the ones a specifier will want the test report for; ask us and we send it.",
      "tech.spec.efficacy": "Luminous efficacy",
      "tech.spec.energy": "Energy reduction against standard",
      "tech.spec.compat": "Compatibility",
      "tech.spec.compat_v": "Universal · retrofit-ready",
      "tech.spec.temp": "Operating temperature",
      "tech.spec.cct": "Colour temperature",
      "tech.spec.cct_v": "2700 K – 6500 K, configurable",
      "tech.spec.cri": "Colour rendering index",
      "tech.spec.life": "Lifetime",
      "tech.spec.beam": "Beam angle",
      "tech.spec.beam_v": "Configurable",
      "tech.spec.cert": "Certification",
      "tech.specs.note": "Efficacy and colour rendering are linked: the highest efficacy figure and the highest rendering figure are not obtained in the same configuration. The technical brief states which value belongs to which, along with the measurement conditions and the independent laboratory report.",
      "tech.patent.label": "Patent",
      "tech.patent.title": "Protected worldwide.",
      "tech.patent.body": "The portfolio covers the optical and thermal architecture through method, device and manufacturing claims. Granted in the European Union, the United States and Mexico, with further jurisdictions pending.",
      "tech.cta.label": "Next step",
      "tech.cta.title": "Put it in your own catalogue.",
      "tech.cta.body": "For manufacturers and lighting studios evaluating the platform for a product line.",
      "tech.cta.btn": "Request the technical brief",

      "serv.meta.title": "Services — Almenara",
      "serv.meta.desc": "Four ways to work with Almenara: module supply, retrofit engineering, custom development and technical advisory.",
      "serv.eyebrow": "Services",
      "serv.title": "Four ways to work with us.",
      "serv.sub": "From supplying a component to engineering the whole luminaire. The technology adapts to how you buy, not the other way around.",
      "serv.list.label": "What we do",
      "serv.1t": "Module supply",
      "serv.1b": "For manufacturers integrating the platform into their own luminaires. Standard form factors and bespoke geometries, delivered as drop-in modules with the full datasheet and certification file.",
      "serv.2t": "Retrofit engineering",
      "serv.2b": "Upgrading installations already in service without replacing the fixture. Designed for commercial, industrial and public estates where the fleet runs into the thousands of points.",
      "serv.3t": "Custom development",
      "serv.3b": "The whole luminaire engineered around the platform, from specification to prototype to certified production unit. Minimum order quantity applies.",
      "serv.4t": "Technical advisory",
      "serv.4b": "For architects, lighting designers and infrastructure operators sizing a large upgrade. Photometric studies, lifecycle costing and retrofit feasibility, with no obligation to buy anything afterwards.",
      "serv.cta.label": "Next step",
      "serv.cta.title": "Scope your project in an hour.",
      "serv.cta.body": "Every engagement starts with a technical call. No commitment and no sales pitch: engineers answering engineers.",
      "serv.cta.btn": "Request a call",

      "apps.meta.title": "Applications — Almenara",
      "apps.meta.desc": "Where the Almenara platform is installed: hospitality, architecture, industry, retail, public infrastructure and premium residential.",
      "apps.eyebrow": "Applications",
      "apps.title": "Where it is installed.",
      "apps.sub": "Any spectrum, any format, any scale. The saving is largest where the installed load is high and the hours are long.",
      "apps.list.label": "Six sectors",
      "apps.1t": "Hospitality",
      "apps.1b": "Hotels, restaurants, spas. Warm spectra and faithful rendering in spaces where light is part of what the guest is paying for.",
      "apps.2t": "Architecture",
      "apps.2b": "Museums, cultural institutions, listed buildings. Light that respects the material, with control over the ultraviolet and infrared that damages it.",
      "apps.3t": "Industry",
      "apps.3b": "Factories, logistics centres, processing plants. High-bay fittings running continuously, where every watt saved multiplies by thousands of hours.",
      "apps.4t": "Retail",
      "apps.4b": "Flagship stores, showrooms, galleries. Rendering that holds across the whole range and stays consistent between production batches and over time.",
      "apps.5t": "Public infrastructure",
      "apps.5b": "Roads, tunnels, civic buildings. Long-life modules sized for minimum maintenance over a twenty-five-year horizon and for European procurement files.",
      "apps.6t": "Premium residential",
      "apps.6b": "Private houses, yachts, estates. Custom geometries integrated into the architecture, specified by designers who treat light as a material.",
      "apps.cta.label": "Next step",
      "apps.cta.title": "Your sector is not on the list.",
      "apps.cta.body": "The platform has gone into contexts none of these six describe. If lighting is critical to your operation, tell us about it.",
      "apps.cta.btn": "Open a conversation",

      "cont.meta.title": "Contact — Almenara",
      "cont.meta.desc": "Contact Almenara for partnership enquiries, technical questions and project proposals. Madrid.",
      "cont.eyebrow": "Contact",
      "cont.title": "Tell us what you are lighting.",
      "cont.sub": "For partnership enquiries, technical questions and project proposals. We answer within one working day.",
      "cont.form.label": "Write to us",
      "cont.office": "Office",
      "cont.office_v": "Madrid, Spain",
      "cont.email": "Email",
      "cont.hours": "Hours",
      "cont.hours_v": "Monday to Friday · 09:00 – 18:00 CET",
      "cont.f.name": "Name",
      "cont.f.company": "Company",
      "cont.f.role": "Role",
      "cont.f.email": "Email",
      "cont.f.message": "Message",
      "cont.f.message_ph": "The luminaire you make or operate, and roughly how many hours a year it runs.",
      "cont.f.submit": "Send message",
      "cont.f.note": "This opens your email client with the message ready to send. A direct form is coming once the contact infrastructure is in place."
    },

    es: {
      "tech.meta.title": "Tecnología — Almenara",
      "tech.meta.desc": "La arquitectura óptica y térmica patentada que sostiene la plataforma LED de Almenara.",
      "tech.eyebrow": "Tecnología",
      "tech.title": "Luz sin la penalización del calor.",
      "tech.sub": "Un LED convencional disipa en forma de calor más de la mitad de la energía que recibe, y lo hace en la propia superficie emisora, lo que limita a la vez el flujo y la vida útil. Nuestra arquitectura aleja esa carga térmica del diodo para que trabaje cerca de su óptimo termodinámico.",
      "tech.principle.label": "El principio",
      "tech.principle.title": "Más luz, menos calor, la misma luminaria.",
      "tech.principle.body": "La ganancia proviene del camino óptico y térmico, no de materiales exóticos ni de una luminaria nueva. Eso es justamente lo que permite sustituir la fuente en instalaciones existentes: la carcasa y la distribución fotométrica se quedan como estaban.",
      "tech.specs.label": "Especificaciones",
      "tech.specs.title": "Valores de la plataforma estándar.",
      "tech.specs.body": "Configuraciones a medida bajo petición. Las cifras marcadas en ámbar son aquellas cuyo informe de ensayo pedirá un proyectista; solicítalo y te lo enviamos.",
      "tech.spec.efficacy": "Eficacia luminosa",
      "tech.spec.energy": "Reducción de consumo frente al estándar",
      "tech.spec.compat": "Compatibilidad",
      "tech.spec.compat_v": "Universal · apta para reforma",
      "tech.spec.temp": "Temperatura de trabajo",
      "tech.spec.cct": "Temperatura de color",
      "tech.spec.cct_v": "2700 K – 6500 K, configurable",
      "tech.spec.cri": "Índice de reproducción cromática",
      "tech.spec.life": "Vida útil",
      "tech.spec.beam": "Ángulo de apertura",
      "tech.spec.beam_v": "Configurable",
      "tech.spec.cert": "Certificación",
      "tech.specs.note": "Eficacia y reproducción cromática están ligadas: la cifra máxima de eficacia y la máxima de reproducción no se obtienen en la misma configuración. La ficha técnica precisa qué valor corresponde a cuál, junto con las condiciones de medida y el informe del laboratorio independiente.",
      "tech.patent.label": "Patente",
      "tech.patent.title": "Protegida en todo el mundo.",
      "tech.patent.body": "La cartera cubre la arquitectura óptica y térmica mediante reivindicaciones de método, de dispositivo y de fabricación. Concedida en la Unión Europea, los Estados Unidos y México, con otras jurisdicciones en tramitación.",
      "tech.cta.label": "Siguiente paso",
      "tech.cta.title": "Llévala a tu propio catálogo.",
      "tech.cta.body": "Para fabricantes y estudios de iluminación que estudian incorporar la plataforma a una gama.",
      "tech.cta.btn": "Solicitar la ficha técnica",

      "serv.meta.title": "Servicios — Almenara",
      "serv.meta.desc": "Cuatro formas de trabajar con Almenara: suministro de módulos, reforma de instalaciones, desarrollo a medida y asesoría técnica.",
      "serv.eyebrow": "Servicios",
      "serv.title": "Cuatro formas de trabajar con nosotros.",
      "serv.sub": "Desde suministrar un componente hasta desarrollar la luminaria entera. La tecnología se adapta a cómo compras tú, y no al revés.",
      "serv.list.label": "Qué hacemos",
      "serv.1t": "Suministro de módulos",
      "serv.1b": "Para fabricantes que integran la plataforma en sus propias luminarias. Formatos estándar y geometrías a medida, entregados como módulos listos para montar, con ficha técnica y expediente de certificación completos.",
      "serv.2t": "Reforma de instalaciones",
      "serv.2b": "Mejora de instalaciones ya en servicio sin sustituir la luminaria. Pensada para patrimonios comerciales, industriales y públicos donde el parque se cuenta por miles de puntos de luz.",
      "serv.3t": "Desarrollo a medida",
      "serv.3b": "La luminaria completa desarrollada en torno a la plataforma: de la especificación al prototipo y de ahí a la unidad de producción certificada. Sujeto a pedido mínimo.",
      "serv.4t": "Asesoría técnica",
      "serv.4b": "Para arquitectos, proyectistas de iluminación y operadores de infraestructuras que dimensionan una renovación grande. Estudios fotométricos, coste de ciclo de vida y viabilidad de la reforma, sin obligación de comprar nada después.",
      "serv.cta.label": "Siguiente paso",
      "serv.cta.title": "Dimensiona tu proyecto en una hora.",
      "serv.cta.body": "Toda colaboración empieza por una llamada técnica. Sin compromiso y sin discurso comercial: ingenieros respondiendo a ingenieros.",
      "serv.cta.btn": "Solicitar una llamada",

      "apps.meta.title": "Aplicaciones — Almenara",
      "apps.meta.desc": "Dónde está instalada la plataforma Almenara: hostelería, arquitectura, industria, comercio, infraestructura pública y residencial de alta gama.",
      "apps.eyebrow": "Aplicaciones",
      "apps.title": "Dónde está instalada.",
      "apps.sub": "Cualquier espectro, cualquier formato, cualquier escala. El ahorro es mayor allí donde la potencia instalada es alta y las horas de uso, muchas.",
      "apps.list.label": "Seis sectores",
      "apps.1t": "Hostelería",
      "apps.1b": "Hoteles, restaurantes, balnearios. Espectros cálidos y reproducción fiel en espacios donde la luz forma parte de lo que el huésped está pagando.",
      "apps.2t": "Arquitectura",
      "apps.2b": "Museos, instituciones culturales, edificios protegidos. Luz que respeta el material, con control del ultravioleta y del infrarrojo que lo degradan.",
      "apps.3t": "Industria",
      "apps.3b": "Fábricas, centros logísticos, plantas de proceso. Campanas de gran altura en funcionamiento continuo, donde cada vatio ahorrado se multiplica por miles de horas.",
      "apps.4t": "Comercio",
      "apps.4b": "Tiendas insignia, salas de exposición, galerías. Reproducción cromática que se sostiene en toda la gama y se mantiene constante entre lotes de fabricación y a lo largo del tiempo.",
      "apps.5t": "Infraestructura pública",
      "apps.5b": "Carreteras, túneles, edificios civiles. Módulos de larga vida dimensionados para un mantenimiento mínimo en un horizonte de veinticinco años y para expedientes de contratación europeos.",
      "apps.6t": "Residencial de alta gama",
      "apps.6b": "Viviendas privadas, embarcaciones, fincas. Geometrías a medida integradas en la arquitectura, prescritas por diseñadores que tratan la luz como un material más.",
      "apps.cta.label": "Siguiente paso",
      "apps.cta.title": "Tu sector no está en la lista.",
      "apps.cta.body": "La plataforma ha llegado a contextos que ninguno de estos seis describe. Si la iluminación es crítica para tu explotación, cuéntanoslo.",
      "apps.cta.btn": "Abrir una conversación",

      "cont.meta.title": "Contacto — Almenara",
      "cont.meta.desc": "Contacta con Almenara para acuerdos de colaboración, consultas técnicas y propuestas de proyecto. Madrid.",
      "cont.eyebrow": "Contacto",
      "cont.title": "Cuéntanos qué estás iluminando.",
      "cont.sub": "Para acuerdos de colaboración, consultas técnicas y propuestas de proyecto. Respondemos en un día laborable.",
      "cont.form.label": "Escríbenos",
      "cont.office": "Oficina",
      "cont.office_v": "Madrid, España",
      "cont.email": "Correo electrónico",
      "cont.hours": "Horario",
      "cont.hours_v": "De lunes a viernes · 09:00 – 18:00 CET",
      "cont.f.name": "Nombre",
      "cont.f.company": "Empresa",
      "cont.f.role": "Cargo",
      "cont.f.email": "Correo electrónico",
      "cont.f.message": "Mensaje",
      "cont.f.message_ph": "La luminaria que fabricas u operas, y cuántas horas al año funciona aproximadamente.",
      "cont.f.submit": "Enviar mensaje",
      "cont.f.note": "Esto abre tu gestor de correo con el mensaje preparado. Habrá un formulario directo en cuanto esté configurada la infraestructura de contacto."
    },

    pt: {
      "tech.meta.title": "Tecnologia — Almenara",
      "tech.meta.desc": "A arquitectura óptica e térmica patenteada que sustenta a plataforma LED da Almenara.",
      "tech.eyebrow": "Tecnologia",
      "tech.title": "Luz sem a penalização do calor.",
      "tech.sub": "Um LED convencional dissipa em calor mais de metade da energia que recebe, e fá-lo na própria superfície emissora, o que limita ao mesmo tempo o fluxo e a vida útil. A nossa arquitectura afasta essa carga térmica do díodo para que trabalhe perto do seu óptimo termodinâmico.",
      "tech.principle.label": "O princípio",
      "tech.principle.title": "Mais luz, menos calor, a mesma luminária.",
      "tech.principle.body": "O ganho vem do percurso óptico e térmico, não de materiais exóticos nem de uma luminária nova. É precisamente isso que permite substituir a fonte em instalações existentes: a caixa e a distribuição fotométrica ficam como estavam.",
      "tech.specs.label": "Especificações",
      "tech.specs.title": "Valores da plataforma padrão.",
      "tech.specs.body": "Configurações à medida mediante pedido. Os valores assinalados a âmbar são aqueles cujo relatório de ensaio um projectista irá pedir; solicite-o e enviamos.",
      "tech.spec.efficacy": "Eficácia luminosa",
      "tech.spec.energy": "Redução de consumo face ao padrão",
      "tech.spec.compat": "Compatibilidade",
      "tech.spec.compat_v": "Universal · apta para remodelação",
      "tech.spec.temp": "Temperatura de funcionamento",
      "tech.spec.cct": "Temperatura de cor",
      "tech.spec.cct_v": "2700 K – 6500 K, configurável",
      "tech.spec.cri": "Índice de restituição cromática",
      "tech.spec.life": "Vida útil",
      "tech.spec.beam": "Ângulo de abertura",
      "tech.spec.beam_v": "Configurável",
      "tech.spec.cert": "Certificação",
      "tech.specs.note": "Eficácia e restituição cromática estão ligadas: o valor máximo de eficácia e o máximo de restituição não se obtêm na mesma configuração. A ficha técnica precisa que valor corresponde a qual, juntamente com as condições de medição e o relatório do laboratório independente.",
      "tech.patent.label": "Patente",
      "tech.patent.title": "Protegida em todo o mundo.",
      "tech.patent.body": "A carteira cobre a arquitectura óptica e térmica através de reivindicações de método, de dispositivo e de fabrico. Concedida na União Europeia, nos Estados Unidos e no México, com outras jurisdições em curso.",
      "tech.cta.label": "Passo seguinte",
      "tech.cta.title": "Leve-a para o seu catálogo.",
      "tech.cta.body": "Para fabricantes e ateliês de iluminação que avaliam integrar a plataforma numa gama.",
      "tech.cta.btn": "Pedir a ficha técnica",

      "serv.meta.title": "Serviços — Almenara",
      "serv.meta.desc": "Quatro formas de trabalhar com a Almenara: fornecimento de módulos, remodelação de instalações, desenvolvimento à medida e consultoria técnica.",
      "serv.eyebrow": "Serviços",
      "serv.title": "Quatro formas de trabalhar connosco.",
      "serv.sub": "Desde fornecer um componente até desenvolver a luminária inteira. A tecnologia adapta-se à forma como compra, e não ao contrário.",
      "serv.list.label": "O que fazemos",
      "serv.1t": "Fornecimento de módulos",
      "serv.1b": "Para fabricantes que integram a plataforma nas suas próprias luminárias. Formatos padrão e geometrias à medida, entregues como módulos prontos a montar, com ficha técnica e processo de certificação completos.",
      "serv.2t": "Remodelação de instalações",
      "serv.2b": "Melhoria de instalações já em serviço sem substituir a luminária. Pensada para patrimónios comerciais, industriais e públicos onde o parque se conta aos milhares de pontos de luz.",
      "serv.3t": "Desenvolvimento à medida",
      "serv.3b": "A luminária completa desenvolvida em torno da plataforma: da especificação ao protótipo e daí à unidade de produção certificada. Sujeito a quantidade mínima de encomenda.",
      "serv.4t": "Consultoria técnica",
      "serv.4b": "Para arquitectos, projectistas de iluminação e operadores de infraestruturas que dimensionam uma renovação de grande escala. Estudos fotométricos, custo do ciclo de vida e viabilidade da remodelação, sem obrigação de comprar seja o que for.",
      "serv.cta.label": "Passo seguinte",
      "serv.cta.title": "Dimensione o seu projecto numa hora.",
      "serv.cta.body": "Toda a colaboração começa por uma chamada técnica. Sem compromisso e sem discurso comercial: engenheiros a responder a engenheiros.",
      "serv.cta.btn": "Pedir uma chamada",

      "apps.meta.title": "Aplicações — Almenara",
      "apps.meta.desc": "Onde está instalada a plataforma Almenara: hotelaria, arquitectura, indústria, comércio, infraestruturas públicas e residencial de gama alta.",
      "apps.eyebrow": "Aplicações",
      "apps.title": "Onde está instalada.",
      "apps.sub": "Qualquer espectro, qualquer formato, qualquer escala. A poupança é maior onde a potência instalada é elevada e as horas de funcionamento são muitas.",
      "apps.list.label": "Seis sectores",
      "apps.1t": "Hotelaria",
      "apps.1b": "Hotéis, restaurantes, termas. Espectros quentes e restituição fiel em espaços onde a luz faz parte daquilo que o hóspede está a pagar.",
      "apps.2t": "Arquitectura",
      "apps.2b": "Museus, instituições culturais, edifícios classificados. Luz que respeita o material, com controlo do ultravioleta e do infravermelho que o degradam.",
      "apps.3t": "Indústria",
      "apps.3b": "Fábricas, centros logísticos, unidades de processo. Campânulas de grande altura em funcionamento contínuo, onde cada watt poupado se multiplica por milhares de horas.",
      "apps.4t": "Comércio",
      "apps.4b": "Lojas emblemáticas, salas de exposição, galerias. Restituição cromática que se mantém em toda a gama e é constante entre lotes de fabrico e ao longo do tempo.",
      "apps.5t": "Infraestruturas públicas",
      "apps.5b": "Estradas, túneis, edifícios públicos. Módulos de longa duração dimensionados para manutenção mínima num horizonte de vinte e cinco anos e para processos de contratação europeus.",
      "apps.6t": "Residencial de gama alta",
      "apps.6b": "Habitações privadas, embarcações, quintas. Geometrias à medida integradas na arquitectura, prescritas por designers que tratam a luz como mais um material.",
      "apps.cta.label": "Passo seguinte",
      "apps.cta.title": "O seu sector não está na lista.",
      "apps.cta.body": "A plataforma chegou a contextos que nenhum destes seis descreve. Se a iluminação é crítica para a sua exploração, conte-nos.",
      "apps.cta.btn": "Abrir uma conversa",

      "cont.meta.title": "Contacto — Almenara",
      "cont.meta.desc": "Contacte a Almenara para acordos de parceria, questões técnicas e propostas de projecto. Madrid.",
      "cont.eyebrow": "Contacto",
      "cont.title": "Diga-nos o que está a iluminar.",
      "cont.sub": "Para acordos de parceria, questões técnicas e propostas de projecto. Respondemos no prazo de um dia útil.",
      "cont.form.label": "Escreva-nos",
      "cont.office": "Escritório",
      "cont.office_v": "Madrid, Espanha",
      "cont.email": "Correio electrónico",
      "cont.hours": "Horário",
      "cont.hours_v": "De segunda a sexta · 09:00 – 18:00 CET",
      "cont.f.name": "Nome",
      "cont.f.company": "Empresa",
      "cont.f.role": "Cargo",
      "cont.f.email": "Correio electrónico",
      "cont.f.message": "Mensagem",
      "cont.f.message_ph": "A luminária que fabrica ou opera, e quantas horas por ano funciona aproximadamente.",
      "cont.f.submit": "Enviar mensagem",
      "cont.f.note": "Isto abre o seu gestor de correio com a mensagem pronta a enviar. Haverá um formulário directo assim que a infraestrutura de contacto estiver configurada."
    },

    fr: {
      "tech.meta.title": "Technologie — Almenara",
      "tech.meta.desc": "L'architecture optique et thermique brevetée qui soutient la plateforme LED d'Almenara.",
      "tech.eyebrow": "Technologie",
      "tech.title": "De la lumière sans la pénalité thermique.",
      "tech.sub": "Une LED classique dissipe en chaleur plus de la moitié de l'énergie reçue, et cela sur la surface émettrice elle-même, ce qui limite à la fois le flux et la durée de vie. Notre architecture éloigne cette charge thermique de la diode pour qu'elle travaille près de son optimum thermodynamique.",
      "tech.principle.label": "Le principe",
      "tech.principle.title": "Plus de lumière, moins de chaleur, le même luminaire.",
      "tech.principle.body": "Le gain vient du chemin optique et thermique, non de matériaux exotiques ni d'un luminaire neuf. C'est précisément ce qui permet de remplacer la source dans les installations existantes : le carter et la distribution photométrique restent tels quels.",
      "tech.specs.label": "Spécifications",
      "tech.specs.title": "Valeurs de la plateforme standard.",
      "tech.specs.body": "Configurations sur mesure sur demande. Les valeurs signalées en ambre sont celles dont un prescripteur réclamera le rapport d'essai ; demandez-le et nous l'envoyons.",
      "tech.spec.efficacy": "Efficacité lumineuse",
      "tech.spec.energy": "Réduction de consommation par rapport au standard",
      "tech.spec.compat": "Compatibilité",
      "tech.spec.compat_v": "Universelle · apte à la rénovation",
      "tech.spec.temp": "Température de fonctionnement",
      "tech.spec.cct": "Température de couleur",
      "tech.spec.cct_v": "2700 K – 6500 K, configurable",
      "tech.spec.cri": "Indice de rendu des couleurs",
      "tech.spec.life": "Durée de vie",
      "tech.spec.beam": "Angle d'ouverture",
      "tech.spec.beam_v": "Configurable",
      "tech.spec.cert": "Certification",
      "tech.specs.note": "Efficacité et rendu des couleurs sont liés : la valeur maximale d'efficacité et celle de rendu ne s'obtiennent pas dans la même configuration. La fiche technique précise quelle valeur correspond à laquelle, avec les conditions de mesure et le rapport du laboratoire indépendant.",
      "tech.patent.label": "Brevet",
      "tech.patent.title": "Protégée dans le monde entier.",
      "tech.patent.body": "Le portefeuille couvre l'architecture optique et thermique par des revendications de procédé, de dispositif et de fabrication. Délivré dans l'Union européenne, aux États-Unis et au Mexique, d'autres juridictions étant en cours.",
      "tech.cta.label": "Étape suivante",
      "tech.cta.title": "Intégrez-la à votre catalogue.",
      "tech.cta.body": "Pour les fabricants et les agences de conception lumière qui étudient l'intégration de la plateforme dans une gamme.",
      "tech.cta.btn": "Demander la fiche technique",

      "serv.meta.title": "Services — Almenara",
      "serv.meta.desc": "Quatre façons de travailler avec Almenara : fourniture de modules, rénovation d'installations, développement sur mesure et conseil technique.",
      "serv.eyebrow": "Services",
      "serv.title": "Quatre façons de travailler avec nous.",
      "serv.sub": "De la fourniture d'un composant au développement du luminaire entier. La technologie s'adapte à votre façon d'acheter, et non l'inverse.",
      "serv.list.label": "Ce que nous faisons",
      "serv.1t": "Fourniture de modules",
      "serv.1b": "Pour les fabricants qui intègrent la plateforme dans leurs propres luminaires. Formats standard et géométries sur mesure, livrés en modules prêts à monter, avec fiche technique et dossier de certification complets.",
      "serv.2t": "Rénovation d'installations",
      "serv.2b": "Amélioration d'installations déjà en service sans remplacer le luminaire. Conçue pour les patrimoines commerciaux, industriels et publics dont le parc se compte en milliers de points lumineux.",
      "serv.3t": "Développement sur mesure",
      "serv.3b": "Le luminaire complet développé autour de la plateforme : de la spécification au prototype, puis à l'unité de production certifiée. Quantité minimale de commande applicable.",
      "serv.4t": "Conseil technique",
      "serv.4b": "Pour les architectes, les concepteurs lumière et les exploitants d'infrastructures qui dimensionnent une rénovation de grande ampleur. Études photométriques, coût du cycle de vie et faisabilité de la rénovation, sans obligation d'achat ensuite.",
      "serv.cta.label": "Étape suivante",
      "serv.cta.title": "Cadrez votre projet en une heure.",
      "serv.cta.body": "Toute collaboration commence par un appel technique. Sans engagement et sans discours commercial : des ingénieurs qui répondent à des ingénieurs.",
      "serv.cta.btn": "Demander un appel",

      "apps.meta.title": "Applications — Almenara",
      "apps.meta.desc": "Où la plateforme Almenara est installée : hôtellerie, architecture, industrie, commerce, infrastructures publiques et résidentiel haut de gamme.",
      "apps.eyebrow": "Applications",
      "apps.title": "Où elle est installée.",
      "apps.sub": "Tout spectre, tout format, toute échelle. L'économie est la plus forte là où la puissance installée est élevée et les heures d'usage nombreuses.",
      "apps.list.label": "Six secteurs",
      "apps.1t": "Hôtellerie",
      "apps.1b": "Hôtels, restaurants, spas. Spectres chauds et rendu fidèle dans des espaces où la lumière fait partie de ce que le client paie.",
      "apps.2t": "Architecture",
      "apps.2b": "Musées, institutions culturelles, bâtiments classés. Une lumière qui respecte la matière, avec maîtrise de l'ultraviolet et de l'infrarouge qui la dégradent.",
      "apps.3t": "Industrie",
      "apps.3b": "Usines, centres logistiques, sites de production. Cloches de grande hauteur en marche continue, où chaque watt économisé se multiplie par des milliers d'heures.",
      "apps.4t": "Commerce",
      "apps.4b": "Boutiques phares, salles d'exposition, galeries. Un rendu qui tient sur toute la gamme et reste constant d'un lot de fabrication à l'autre et dans le temps.",
      "apps.5t": "Infrastructures publiques",
      "apps.5b": "Routes, tunnels, bâtiments publics. Modules de longue durée dimensionnés pour une maintenance minimale sur un horizon de vingt-cinq ans et pour les dossiers de marchés publics européens.",
      "apps.6t": "Résidentiel haut de gamme",
      "apps.6b": "Résidences privées, yachts, domaines. Géométries sur mesure intégrées à l'architecture, prescrites par des concepteurs qui traitent la lumière comme un matériau.",
      "apps.cta.label": "Étape suivante",
      "apps.cta.title": "Votre secteur n'est pas dans la liste.",
      "apps.cta.body": "La plateforme est allée dans des contextes qu'aucun de ces six ne décrit. Si l'éclairage est critique pour votre exploitation, parlez-nous-en.",
      "apps.cta.btn": "Ouvrir une conversation",

      "cont.meta.title": "Contact — Almenara",
      "cont.meta.desc": "Contactez Almenara pour des accords de partenariat, des questions techniques et des propositions de projet. Madrid.",
      "cont.eyebrow": "Contact",
      "cont.title": "Dites-nous ce que vous éclairez.",
      "cont.sub": "Pour les accords de partenariat, les questions techniques et les propositions de projet. Nous répondons sous un jour ouvré.",
      "cont.form.label": "Écrivez-nous",
      "cont.office": "Bureau",
      "cont.office_v": "Madrid, Espagne",
      "cont.email": "Courriel",
      "cont.hours": "Horaires",
      "cont.hours_v": "Du lundi au vendredi · 09:00 – 18:00 CET",
      "cont.f.name": "Nom",
      "cont.f.company": "Société",
      "cont.f.role": "Fonction",
      "cont.f.email": "Courriel",
      "cont.f.message": "Message",
      "cont.f.message_ph": "Le luminaire que vous fabriquez ou exploitez, et son nombre d'heures de fonctionnement annuel approximatif.",
      "cont.f.submit": "Envoyer le message",
      "cont.f.note": "Ceci ouvre votre logiciel de messagerie avec le message prêt à partir. Un formulaire direct arrivera dès que l'infrastructure de contact sera en place."
    },

    de: {
      "tech.meta.title": "Technologie — Almenara",
      "tech.meta.desc": "Die patentierte optische und thermische Architektur hinter der LED-Plattform von Almenara.",
      "tech.eyebrow": "Technologie",
      "tech.title": "Licht ohne den Wärmeaufschlag.",
      "tech.sub": "Eine herkömmliche LED gibt mehr als die Hälfte der aufgenommenen Energie als Wärme ab, und zwar an der leuchtenden Fläche selbst, was Lichtstrom und Lebensdauer zugleich begrenzt. Unsere Architektur führt diese Wärmelast von der Diode weg, damit sie nahe ihrem thermodynamischen Optimum arbeitet.",
      "tech.principle.label": "Das Prinzip",
      "tech.principle.title": "Mehr Licht, weniger Wärme, dieselbe Leuchte.",
      "tech.principle.body": "Der Gewinn stammt aus dem optischen und thermischen Pfad, nicht aus exotischen Werkstoffen oder einer neuen Leuchte. Genau das macht den Austausch in bestehenden Anlagen möglich: Gehäuse und Lichtverteilung bleiben, wie sie sind.",
      "tech.specs.label": "Technische Daten",
      "tech.specs.title": "Werte der Standardplattform.",
      "tech.specs.body": "Sonderkonfigurationen auf Anfrage. Die bernsteinfarben markierten Werte sind jene, zu denen ein Fachplaner den Prüfbericht verlangen wird; fordern Sie ihn an und wir senden ihn zu.",
      "tech.spec.efficacy": "Lichtausbeute",
      "tech.spec.energy": "Verbrauchsminderung gegenüber dem Standard",
      "tech.spec.compat": "Kompatibilität",
      "tech.spec.compat_v": "Universell · nachrüstbar",
      "tech.spec.temp": "Betriebstemperatur",
      "tech.spec.cct": "Farbtemperatur",
      "tech.spec.cct_v": "2700 K – 6500 K, konfigurierbar",
      "tech.spec.cri": "Farbwiedergabeindex",
      "tech.spec.life": "Lebensdauer",
      "tech.spec.beam": "Abstrahlwinkel",
      "tech.spec.beam_v": "Konfigurierbar",
      "tech.spec.cert": "Zertifizierung",
      "tech.specs.note": "Lichtausbeute und Farbwiedergabe hängen zusammen: Der höchste Ausbeutewert und der höchste Wiedergabewert werden nicht in derselben Konfiguration erreicht. Das Datenblatt gibt an, welcher Wert zu welcher gehört, samt Messbedingungen und dem Bericht des unabhängigen Labors.",
      "tech.patent.label": "Patent",
      "tech.patent.title": "Weltweit geschützt.",
      "tech.patent.body": "Das Portfolio deckt die optische und thermische Architektur über Verfahrens-, Vorrichtungs- und Herstellungsansprüche ab. Erteilt in der Europäischen Union, den Vereinigten Staaten und Mexiko, weitere Länder in Bearbeitung.",
      "tech.cta.label": "Nächster Schritt",
      "tech.cta.title": "Nehmen Sie sie in Ihr Sortiment auf.",
      "tech.cta.body": "Für Hersteller und Lichtplanungsbüros, die die Plattform für eine Produktlinie prüfen.",
      "tech.cta.btn": "Datenblatt anfordern",

      "serv.meta.title": "Leistungen — Almenara",
      "serv.meta.desc": "Vier Wege der Zusammenarbeit mit Almenara: Modullieferung, Sanierung bestehender Anlagen, Sonderentwicklung und technische Beratung.",
      "serv.eyebrow": "Leistungen",
      "serv.title": "Vier Wege der Zusammenarbeit.",
      "serv.sub": "Von der Lieferung einer Komponente bis zur Entwicklung der ganzen Leuchte. Die Technologie richtet sich danach, wie Sie einkaufen, nicht umgekehrt.",
      "serv.list.label": "Was wir tun",
      "serv.1t": "Modullieferung",
      "serv.1b": "Für Hersteller, die die Plattform in ihre eigenen Leuchten einbauen. Standardformate und Sondergeometrien, geliefert als einbaufertige Module mit vollständigem Datenblatt und Zertifizierungsunterlagen.",
      "serv.2t": "Sanierung bestehender Anlagen",
      "serv.2b": "Aufwertung von Anlagen im Betrieb, ohne die Leuchte zu tauschen. Gedacht für gewerbliche, industrielle und öffentliche Bestände, deren Lichtpunkte in die Tausende gehen.",
      "serv.3t": "Sonderentwicklung",
      "serv.3b": "Die komplette Leuchte rund um die Plattform entwickelt: von der Spezifikation über den Prototyp bis zur zertifizierten Serieneinheit. Mindestbestellmenge erforderlich.",
      "serv.4t": "Technische Beratung",
      "serv.4b": "Für Architekten, Lichtplaner und Infrastrukturbetreiber, die eine große Sanierung auslegen. Lichttechnische Studien, Lebenszykluskosten und Machbarkeit der Nachrüstung, ohne anschließende Kaufverpflichtung.",
      "serv.cta.label": "Nächster Schritt",
      "serv.cta.title": "Ihr Projekt in einer Stunde ausgelegt.",
      "serv.cta.body": "Jede Zusammenarbeit beginnt mit einem technischen Gespräch. Ohne Verpflichtung und ohne Verkaufsrede: Ingenieure antworten Ingenieuren.",
      "serv.cta.btn": "Gespräch anfragen",

      "apps.meta.title": "Anwendungen — Almenara",
      "apps.meta.desc": "Wo die Almenara-Plattform installiert ist: Hotellerie, Architektur, Industrie, Handel, öffentliche Infrastruktur und gehobenes Wohnen.",
      "apps.eyebrow": "Anwendungen",
      "apps.title": "Wo sie installiert ist.",
      "apps.sub": "Jedes Spektrum, jedes Format, jeder Maßstab. Die Ersparnis fällt dort am größten aus, wo die installierte Leistung hoch und die Betriebsstunden zahlreich sind.",
      "apps.list.label": "Sechs Bereiche",
      "apps.1t": "Hotellerie",
      "apps.1b": "Hotels, Restaurants, Thermen. Warme Spektren und getreue Wiedergabe in Räumen, in denen das Licht Teil dessen ist, wofür der Gast bezahlt.",
      "apps.2t": "Architektur",
      "apps.2b": "Museen, Kulturbauten, denkmalgeschützte Gebäude. Licht, das den Werkstoff schont, mit Kontrolle über die schädigende UV- und Infrarotstrahlung.",
      "apps.3t": "Industrie",
      "apps.3b": "Werke, Logistikzentren, Prozessanlagen. Hallenleuchten im Dauerbetrieb, wo sich jedes eingesparte Watt mit Tausenden von Stunden multipliziert.",
      "apps.4t": "Handel",
      "apps.4b": "Flagship-Stores, Ausstellungsräume, Galerien. Eine Wiedergabe, die über das ganze Sortiment trägt und zwischen Fertigungslosen wie über die Zeit konstant bleibt.",
      "apps.5t": "Öffentliche Infrastruktur",
      "apps.5b": "Straßen, Tunnel, Verwaltungsbauten. Langlebige Module, ausgelegt auf minimale Wartung über einen Horizont von fünfundzwanzig Jahren und auf europäische Vergabeakten.",
      "apps.6t": "Gehobenes Wohnen",
      "apps.6b": "Privathäuser, Yachten, Anwesen. Sondergeometrien, in die Architektur eingebettet, ausgeschrieben von Gestaltern, die Licht als Werkstoff behandeln.",
      "apps.cta.label": "Nächster Schritt",
      "apps.cta.title": "Ihre Branche steht nicht auf der Liste.",
      "apps.cta.body": "Die Plattform ist in Zusammenhängen gelandet, die keiner dieser sechs beschreibt. Wenn Licht für Ihren Betrieb entscheidend ist, erzählen Sie es uns.",
      "apps.cta.btn": "Gespräch eröffnen",

      "cont.meta.title": "Kontakt — Almenara",
      "cont.meta.desc": "Kontaktieren Sie Almenara für Partnerschaften, technische Fragen und Projektanfragen. Madrid.",
      "cont.eyebrow": "Kontakt",
      "cont.title": "Sagen Sie uns, was Sie beleuchten.",
      "cont.sub": "Für Partnerschaften, technische Fragen und Projektanfragen. Wir antworten innerhalb eines Werktags.",
      "cont.form.label": "Schreiben Sie uns",
      "cont.office": "Büro",
      "cont.office_v": "Madrid, Spanien",
      "cont.email": "E-Mail",
      "cont.hours": "Zeiten",
      "cont.hours_v": "Montag bis Freitag · 09:00 – 18:00 MEZ",
      "cont.f.name": "Name",
      "cont.f.company": "Unternehmen",
      "cont.f.role": "Funktion",
      "cont.f.email": "E-Mail",
      "cont.f.message": "Nachricht",
      "cont.f.message_ph": "Die Leuchte, die Sie herstellen oder betreiben, und ungefähr wie viele Stunden im Jahr sie läuft.",
      "cont.f.submit": "Nachricht senden",
      "cont.f.note": "Dies öffnet Ihr E-Mail-Programm mit der fertigen Nachricht. Ein direktes Formular folgt, sobald die Kontaktinfrastruktur eingerichtet ist."
    },

    it: {
      "tech.meta.title": "Tecnologia — Almenara",
      "tech.meta.desc": "L'architettura ottica e termica brevettata alla base della piattaforma LED di Almenara.",
      "tech.eyebrow": "Tecnologia",
      "tech.title": "Luce senza il pedaggio del calore.",
      "tech.sub": "Un LED convenzionale dissipa in calore più della metà dell'energia che riceve, e lo fa sulla superficie emittente stessa, il che limita insieme il flusso e la durata. La nostra architettura allontana quel carico termico dal diodo perché lavori vicino al proprio ottimo termodinamico.",
      "tech.principle.label": "Il principio",
      "tech.principle.title": "Più luce, meno calore, lo stesso apparecchio.",
      "tech.principle.body": "Il guadagno nasce dal percorso ottico e termico, non da materiali esotici né da un apparecchio nuovo. È proprio questo che consente di sostituire la sorgente negli impianti esistenti: il corpo e la distribuzione fotometrica restano come sono.",
      "tech.specs.label": "Specifiche",
      "tech.specs.title": "Valori della piattaforma standard.",
      "tech.specs.body": "Configurazioni su misura su richiesta. I valori segnati in ambra sono quelli di cui un progettista chiederà il rapporto di prova; richiedilo e te lo inviamo.",
      "tech.spec.efficacy": "Efficienza luminosa",
      "tech.spec.energy": "Riduzione dei consumi rispetto allo standard",
      "tech.spec.compat": "Compatibilità",
      "tech.spec.compat_v": "Universale · adatta alla riqualificazione",
      "tech.spec.temp": "Temperatura di esercizio",
      "tech.spec.cct": "Temperatura di colore",
      "tech.spec.cct_v": "2700 K – 6500 K, configurabile",
      "tech.spec.cri": "Indice di resa cromatica",
      "tech.spec.life": "Durata",
      "tech.spec.beam": "Angolo di apertura",
      "tech.spec.beam_v": "Configurabile",
      "tech.spec.cert": "Certificazione",
      "tech.specs.note": "Efficienza e resa cromatica sono legate: il valore massimo di efficienza e quello massimo di resa non si ottengono nella stessa configurazione. La scheda tecnica precisa quale valore corrisponde a quale, insieme alle condizioni di misura e al rapporto del laboratorio indipendente.",
      "tech.patent.label": "Brevetto",
      "tech.patent.title": "Protetta in tutto il mondo.",
      "tech.patent.body": "Il portafoglio copre l'architettura ottica e termica con rivendicazioni di metodo, di dispositivo e di fabbricazione. Concesso nell'Unione Europea, negli Stati Uniti e in Messico, con altre giurisdizioni in corso.",
      "tech.cta.label": "Passo successivo",
      "tech.cta.title": "Portala nel tuo catalogo.",
      "tech.cta.body": "Per produttori e studi di illuminazione che valutano di integrare la piattaforma in una gamma.",
      "tech.cta.btn": "Richiedi la scheda tecnica",

      "serv.meta.title": "Servizi — Almenara",
      "serv.meta.desc": "Quattro modi di lavorare con Almenara: fornitura di moduli, riqualificazione di impianti, sviluppo su misura e consulenza tecnica.",
      "serv.eyebrow": "Servizi",
      "serv.title": "Quattro modi di lavorare con noi.",
      "serv.sub": "Dalla fornitura di un componente allo sviluppo dell'apparecchio intero. La tecnologia si adatta al modo in cui acquisti, non il contrario.",
      "serv.list.label": "Cosa facciamo",
      "serv.1t": "Fornitura di moduli",
      "serv.1b": "Per produttori che integrano la piattaforma nei propri apparecchi. Formati standard e geometrie su misura, consegnati come moduli pronti al montaggio, con scheda tecnica e fascicolo di certificazione completi.",
      "serv.2t": "Riqualificazione di impianti",
      "serv.2b": "Miglioramento di impianti già in servizio senza sostituire l'apparecchio. Pensata per patrimoni commerciali, industriali e pubblici il cui parco si conta in migliaia di punti luce.",
      "serv.3t": "Sviluppo su misura",
      "serv.3b": "L'apparecchio completo sviluppato attorno alla piattaforma: dalla specifica al prototipo, fino all'unità di produzione certificata. Soggetto a quantitativo minimo d'ordine.",
      "serv.4t": "Consulenza tecnica",
      "serv.4b": "Per architetti, progettisti illuminotecnici e gestori di infrastrutture che dimensionano una riqualificazione estesa. Studi fotometrici, costo del ciclo di vita e fattibilità dell'intervento, senza obbligo di acquisto successivo.",
      "serv.cta.label": "Passo successivo",
      "serv.cta.title": "Dimensiona il progetto in un'ora.",
      "serv.cta.body": "Ogni collaborazione inizia con una chiamata tecnica. Senza impegno e senza discorso commerciale: ingegneri che rispondono a ingegneri.",
      "serv.cta.btn": "Richiedi una chiamata",

      "apps.meta.title": "Applicazioni — Almenara",
      "apps.meta.desc": "Dove è installata la piattaforma Almenara: ospitalità, architettura, industria, retail, infrastrutture pubbliche e residenziale di alta gamma.",
      "apps.eyebrow": "Applicazioni",
      "apps.title": "Dove è installata.",
      "apps.sub": "Qualsiasi spettro, qualsiasi formato, qualsiasi scala. Il risparmio è maggiore dove la potenza installata è alta e le ore di funzionamento sono molte.",
      "apps.list.label": "Sei settori",
      "apps.1t": "Ospitalità",
      "apps.1b": "Alberghi, ristoranti, centri termali. Spettri caldi e resa fedele in spazi dove la luce fa parte di ciò che l'ospite sta pagando.",
      "apps.2t": "Architettura",
      "apps.2b": "Musei, istituzioni culturali, edifici vincolati. Luce che rispetta il materiale, con controllo dell'ultravioletto e dell'infrarosso che lo degradano.",
      "apps.3t": "Industria",
      "apps.3b": "Stabilimenti, centri logistici, impianti di processo. Campane di grande altezza in funzionamento continuo, dove ogni watt risparmiato si moltiplica per migliaia di ore.",
      "apps.4t": "Retail",
      "apps.4b": "Negozi di punta, showroom, gallerie. Resa cromatica che tiene su tutta la gamma e resta costante tra lotti di produzione e nel tempo.",
      "apps.5t": "Infrastrutture pubbliche",
      "apps.5b": "Strade, gallerie, edifici civici. Moduli a lunga durata dimensionati per una manutenzione minima su un orizzonte di venticinque anni e per i fascicoli di gara europei.",
      "apps.6t": "Residenziale di alta gamma",
      "apps.6b": "Abitazioni private, imbarcazioni, tenute. Geometrie su misura integrate nell'architettura, prescritte da progettisti che trattano la luce come un materiale.",
      "apps.cta.label": "Passo successivo",
      "apps.cta.title": "Il tuo settore non è in elenco.",
      "apps.cta.body": "La piattaforma è arrivata in contesti che nessuno di questi sei descrive. Se l'illuminazione è critica per la tua attività, raccontacelo.",
      "apps.cta.btn": "Aprire una conversazione",

      "cont.meta.title": "Contatti — Almenara",
      "cont.meta.desc": "Contatta Almenara per accordi di partnership, domande tecniche e proposte di progetto. Madrid.",
      "cont.eyebrow": "Contatti",
      "cont.title": "Raccontaci che cosa stai illuminando.",
      "cont.sub": "Per accordi di partnership, domande tecniche e proposte di progetto. Rispondiamo entro un giorno lavorativo.",
      "cont.form.label": "Scrivici",
      "cont.office": "Sede",
      "cont.office_v": "Madrid, Spagna",
      "cont.email": "Posta elettronica",
      "cont.hours": "Orario",
      "cont.hours_v": "Da lunedì a venerdì · 09:00 – 18:00 CET",
      "cont.f.name": "Nome",
      "cont.f.company": "Azienda",
      "cont.f.role": "Ruolo",
      "cont.f.email": "Posta elettronica",
      "cont.f.message": "Messaggio",
      "cont.f.message_ph": "L'apparecchio che produci o gestisci, e all'incirca quante ore all'anno funziona.",
      "cont.f.submit": "Invia il messaggio",
      "cont.f.note": "Si apre il tuo programma di posta con il messaggio pronto da inviare. Ci sarà un modulo diretto non appena l'infrastruttura di contatto sarà configurata."
    },

    ru: {
      "tech.meta.title": "Технология — Almenara",
      "tech.meta.desc": "Запатентованная оптическая и тепловая архитектура, лежащая в основе светодиодной платформы Almenara.",
      "tech.eyebrow": "Технология",
      "tech.title": "Свет без тепловой платы.",
      "tech.sub": "Обычный светодиод рассеивает в виде тепла более половины полученной энергии, причём на самой излучающей поверхности, что ограничивает и световой поток, и срок службы. Наша архитектура отводит эту тепловую нагрузку от кристалла, чтобы он работал вблизи термодинамического оптимума.",
      "tech.principle.label": "Принцип",
      "tech.principle.title": "Больше света, меньше тепла, тот же светильник.",
      "tech.principle.body": "Выигрыш даёт оптический и тепловой тракт, а не экзотические материалы или новый светильник. Именно это позволяет заменить источник света в действующих установках: корпус и кривая силы света остаются прежними.",
      "tech.specs.label": "Технические данные",
      "tech.specs.title": "Значения серийной платформы.",
      "tech.specs.body": "Особые конфигурации по запросу. Значения, выделенные янтарным, — те, по которым проектировщик запросит протокол испытаний; попросите, и мы его пришлём.",
      "tech.spec.efficacy": "Световая отдача",
      "tech.spec.energy": "Снижение потребления против стандарта",
      "tech.spec.compat": "Совместимость",
      "tech.spec.compat_v": "Универсальная · пригодна для замены",
      "tech.spec.temp": "Рабочая температура",
      "tech.spec.cct": "Цветовая температура",
      "tech.spec.cct_v": "2700 K – 6500 K, настраиваемая",
      "tech.spec.cri": "Индекс цветопередачи",
      "tech.spec.life": "Срок службы",
      "tech.spec.beam": "Угол раскрытия",
      "tech.spec.beam_v": "Настраиваемый",
      "tech.spec.cert": "Сертификация",
      "tech.specs.note": "Световая отдача и цветопередача связаны между собой: наибольшая отдача и наибольшая цветопередача не достигаются в одной и той же конфигурации. В техническом описании указано, какое значение к какой относится, вместе с условиями измерения и протоколом независимой лаборатории.",
      "tech.patent.label": "Патент",
      "tech.patent.title": "Защищена по всему миру.",
      "tech.patent.body": "Портфель охватывает оптическую и тепловую архитектуру через притязания на способ, устройство и производство. Выдан в Европейском союзе, Соединённых Штатах и Мексике, прочие юрисдикции в работе.",
      "tech.cta.label": "Следующий шаг",
      "tech.cta.title": "Внесите её в свой каталог.",
      "tech.cta.body": "Для производителей и светотехнических бюро, рассматривающих платформу для продуктовой линейки.",
      "tech.cta.btn": "Запросить техническое описание",

      "serv.meta.title": "Услуги — Almenara",
      "serv.meta.desc": "Четыре формы работы с Almenara: поставка модулей, модернизация установок, разработка под заказ и техническое консультирование.",
      "serv.eyebrow": "Услуги",
      "serv.title": "Четыре формы работы с нами.",
      "serv.sub": "От поставки компонента до разработки светильника целиком. Технология подстраивается под то, как вы закупаете, а не наоборот.",
      "serv.list.label": "Чем мы занимаемся",
      "serv.1t": "Поставка модулей",
      "serv.1b": "Для производителей, встраивающих платформу в собственные светильники. Типовые форматы и геометрия под заказ, поставляются как готовые к установке модули с полным техническим описанием и сертификационным делом.",
      "serv.2t": "Модернизация установок",
      "serv.2b": "Улучшение действующих установок без замены светильника. Рассчитано на торговые, промышленные и государственные объекты, где парк исчисляется тысячами световых точек.",
      "serv.3t": "Разработка под заказ",
      "serv.3b": "Светильник целиком, разработанный вокруг платформы: от технического задания к прототипу и далее к сертифицированному серийному образцу. Действует минимальный объём заказа.",
      "serv.4t": "Техническое консультирование",
      "serv.4b": "Для архитекторов, светодизайнеров и операторов инфраструктуры, рассчитывающих масштабную модернизацию. Светотехнические расчёты, стоимость жизненного цикла и оценка выполнимости — без обязательства что-либо покупать потом.",
      "serv.cta.label": "Следующий шаг",
      "serv.cta.title": "Оценим проект за час.",
      "serv.cta.body": "Любое сотрудничество начинается с технического разговора. Без обязательств и без продающих речей: инженеры отвечают инженерам.",
      "serv.cta.btn": "Запросить разговор",

      "apps.meta.title": "Применение — Almenara",
      "apps.meta.desc": "Где установлена платформа Almenara: гостиницы, архитектура, промышленность, торговля, общественная инфраструктура и жильё высокого класса.",
      "apps.eyebrow": "Применение",
      "apps.title": "Где она установлена.",
      "apps.sub": "Любой спектр, любой формат, любой масштаб. Экономия наибольшая там, где установленная мощность велика, а часы работы длинны.",
      "apps.list.label": "Шесть отраслей",
      "apps.1t": "Гостиницы",
      "apps.1b": "Отели, рестораны, термы. Тёплые спектры и достоверная цветопередача там, где свет входит в то, за что платит гость.",
      "apps.2t": "Архитектура",
      "apps.2b": "Музеи, учреждения культуры, охраняемые здания. Свет, щадящий материал, с контролем ультрафиолета и инфракрасного излучения, которые его разрушают.",
      "apps.3t": "Промышленность",
      "apps.3b": "Заводы, логистические центры, технологические установки. Светильники большой высоты в непрерывной работе, где каждый сэкономленный ватт умножается на тысячи часов.",
      "apps.4t": "Торговля",
      "apps.4b": "Флагманские магазины, шоурумы, галереи. Цветопередача, выдерживающая весь ассортимент и остающаяся постоянной между партиями и во времени.",
      "apps.5t": "Общественная инфраструктура",
      "apps.5b": "Дороги, тоннели, административные здания. Долговечные модули, рассчитанные на минимальное обслуживание в горизонте двадцати пяти лет и на европейские конкурсные процедуры.",
      "apps.6t": "Жильё высокого класса",
      "apps.6b": "Частные дома, яхты, усадьбы. Геометрия под заказ, встроенная в архитектуру, назначаемая проектировщиками, для которых свет — такой же материал.",
      "apps.cta.label": "Следующий шаг",
      "apps.cta.title": "Вашей отрасли в списке нет.",
      "apps.cta.body": "Платформа попадала в условия, которые не описывает ни одна из этих шести. Если освещение критично для вашей работы, расскажите нам.",
      "apps.cta.btn": "Начать разговор",

      "cont.meta.title": "Контакты — Almenara",
      "cont.meta.desc": "Свяжитесь с Almenara по вопросам партнёрства, техническим вопросам и проектным предложениям. Мадрид.",
      "cont.eyebrow": "Контакты",
      "cont.title": "Расскажите, что вы освещаете.",
      "cont.sub": "По вопросам партнёрства, техническим вопросам и проектным предложениям. Отвечаем в течение одного рабочего дня.",
      "cont.form.label": "Напишите нам",
      "cont.office": "Офис",
      "cont.office_v": "Мадрид, Испания",
      "cont.email": "Электронная почта",
      "cont.hours": "Часы работы",
      "cont.hours_v": "С понедельника по пятницу · 09:00 – 18:00 CET",
      "cont.f.name": "Имя",
      "cont.f.company": "Компания",
      "cont.f.role": "Должность",
      "cont.f.email": "Электронная почта",
      "cont.f.message": "Сообщение",
      "cont.f.message_ph": "Какой светильник вы производите или эксплуатируете и примерно сколько часов в год он работает.",
      "cont.f.submit": "Отправить сообщение",
      "cont.f.note": "Откроется ваша почтовая программа с готовым сообщением. Прямая форма появится, как только будет настроена контактная инфраструктура."
    }
  };

  /* ==========================================================================
     MOTOR DE TRADUCCIÓN
     Traduce texto, atributos, el título de la pestaña, la descripción, el
     idioma del documento y el estado del selector. Guarda la elección y la
     refleja en la dirección (?lang=xx) para que el enlace sea compartible.
     ========================================================================== */
  const LANGS = ['en', 'es', 'pt', 'fr', 'de', 'it', 'ru'];

  // Un solo diccionario por idioma: lo común —cabecera, pie, accesibilidad—
  // vive en I18N; lo propio de cada página, en I18N_PAGES.
  Object.keys(I18N).forEach(function (lang) {
    if (I18N_PAGES[lang]) Object.assign(I18N[lang], I18N_PAGES[lang]);
  });

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
    // data-meta-prefix en <html> dice qué claves usar: "meta" en la portada,
    // "tech.meta" en tecnología, "serv.meta" en servicios, y así.
    const p = document.documentElement.getAttribute('data-meta-prefix') || 'meta';
    const titulo = t(lang, p + '.title');
    const desc = t(lang, p + '.desc');

    document.title = titulo;
    setMeta('meta[name="description"]', desc);
    setMeta('meta[property="og:title"]', titulo);
    setMeta('meta[property="og:description"]', desc);
    setMeta('meta[property="og:locale"]', t(lang, 'meta.locale'));
    setMeta('meta[name="twitter:title"]', titulo);
    setMeta('meta[name="twitter:description"]', desc);

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

  /* ========================================================================
     DESPLAZAMIENTO
     Cinco comportamientos que comparten un mismo hilo: la luz avanza contigo.
     Todo se apaga si el sistema pide movimiento reducido.
     ======================================================================== */
  (function () {
    const mq = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    const quieto = !!(mq && mq.matches);
    const raiz = document.documentElement;

    /* --- Halo y barra de progreso: se insertan desde aquí para no tener que
       tocar el HTML de las cinco páginas. -------------------------------- */
    const aura = document.createElement('div');
    aura.className = 'aura';
    aura.setAttribute('aria-hidden', 'true');
    document.body.insertBefore(aura, document.body.firstChild);

    const barra = document.createElement('div');
    barra.className = 'scroll-progress';
    barra.setAttribute('aria-hidden', 'true');
    document.body.insertBefore(barra, document.body.firstChild);

    /* --- 1. Entradas escalonadas ---------------------------------------- */
    // Estas rejillas reciben la clase que escalona a sus hijos. Se marca
    // desde JavaScript para no repetirla en cada página.
    const rejillas = '.metrics, .adv-grid, .app-grid, .sectors, .services, .specs, .cert-list, .hero-actions';
    document.querySelectorAll(rejillas).forEach(function (el) {
      el.classList.add('stagger');
    });

    const bloques = document.querySelectorAll('.reveal');
    if (quieto || !('IntersectionObserver' in window)) {
      bloques.forEach(function (el) { el.classList.add('is-in'); });
    } else {
      const io = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
        });
      }, { rootMargin: '0px 0px -14% 0px', threshold: 0.05 });
      bloques.forEach(function (el) { io.observe(el); });
    }

    // La cabecera de página no espera a nada: entra sola al cargar.
    const primera = document.querySelector('.page-head, .hero');
    if (primera) {
      primera.querySelectorAll('.stagger').forEach(function (el) {
        el.closest('.band, section').classList.add('is-in');
      });
    }

    /* --- 2. Contadores --------------------------------------------------- */
    // Las cifras cuentan hacia arriba al entrar en pantalla. Solo las que
    // son números: "Universal" o "Mundial" se dejan como están.
    function contar(el) {
      const texto = el.textContent;
      const m = texto.match(/^(\D*)(\d+)(.*)$/s);
      if (!m) return;
      const antes = m[1], destino = parseInt(m[2], 10), despues = m[3];
      if (!isFinite(destino) || destino === 0) return;
      const t0 = performance.now(), dur = 1100;
      (function paso(t) {
        const p = Math.min(1, (t - t0) / dur);
        // desaceleración: rápido al principio, se posa al final
        const e = 1 - Math.pow(1 - p, 3);
        el.textContent = antes + Math.round(destino * e) + despues;
        if (p < 1) requestAnimationFrame(paso);
      })(t0);
    }

    if (!quieto && 'IntersectionObserver' in window) {
      const cifras = document.querySelectorAll('.metric-value');
      const io2 = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (e) {
          if (!e.isIntersecting) return;
          io2.unobserve(e.target);
          // el nodo de texto está mezclado con <span> de unidades: solo el primero
          const nodo = e.target.firstChild;
          if (nodo && nodo.nodeType === 3 && /\d/.test(nodo.textContent)) {
            const envoltura = document.createElement('span');
            envoltura.textContent = nodo.textContent;
            e.target.replaceChild(envoltura, nodo);
            contar(envoltura);
          }
        });
      }, { threshold: 0.6 });
      cifras.forEach(function (el) { io2.observe(el); });
    }

    /* --- 3. Progreso y halo ---------------------------------------------- */
    // Si el navegador admite líneas de tiempo de desplazamiento, el CSS ya se
    // encarga y esto no hace falta: va fuera del hilo principal y no da tirones.
    const nativo = typeof CSS !== 'undefined' && CSS.supports &&
                   CSS.supports('animation-timeline', 'scroll()');
    const cabecera = document.querySelector('.site-header');
    let pendiente = false;

    function alDesplazar() {
      const y = window.scrollY || 0;
      const alto = raiz.scrollHeight - window.innerHeight;
      const p = alto > 0 ? Math.min(1, y / alto) : 0;

      if (!nativo && !quieto) {
        barra.style.setProperty('--progress', p.toFixed(4));
        raiz.style.setProperty('--aura', p.toFixed(4));
      }
      if (cabecera) cabecera.classList.toggle('is-scrolled', y > 40);
      pendiente = false;
    }

    window.addEventListener('scroll', function () {
      if (!pendiente) { pendiente = true; requestAnimationFrame(alDesplazar); }
    }, { passive: true });
    alDesplazar();

    /* --- 4. Anclas suaves con la cabecera descontada --------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (ev) {
        const destino = document.querySelector(a.getAttribute('href'));
        if (!destino) return;
        ev.preventDefault();
        destino.scrollIntoView({ behavior: quieto ? 'auto' : 'smooth', block: 'start' });
        destino.setAttribute('tabindex', '-1');
        destino.focus({ preventScroll: true });
      });
    });
  })();
});
