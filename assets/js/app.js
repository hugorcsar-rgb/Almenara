/* ==========================================================================
   Almenara — comportamiento de la página
   Este archivo va aparte del index.html a propósito: algunos servidores
   bloquean el código escrito dentro de la propia página por seguridad.
   Ruta obligatoria:  assets/js/app.js
   ========================================================================== */

/* --- Arranque: se ejecuta antes de pintar, para evitar el parpadeo -------- */
(function () {
  try {
    // Un solo tema: papel blanco y tinta azul noche. El atributo se deja
    // puesto por si alguna regla antigua lo mira, pero el CSS ya no depende
    // de él, así que no hay parpadeo al cargar.
    document.documentElement.setAttribute('data-theme', 'light');
    var LS = ['en','es','pt','fr','de','it','ru'];
    var fijo = document.documentElement.getAttribute('data-lang-static');
    if (fijo) {
      // Página ya traducida en el servidor (/es/, /fr/…, o la raíz en inglés).
      // El idioma lo dice la dirección, no el navegador. Solo en la raíz, y
      // solo si el visitante no ha elegido antes el inglés, se le lleva a su
      // idioma: /technology.html → es/technology.html. Los rastreadores no
      // guardan nada y navegan en inglés, así que siempre ven la raíz.
      if (fijo === 'en' && !new URLSearchParams(location.search).get('lang')) {
        var g = null;
        try { g = localStorage.getItem('site.lang'); } catch (e) {}
        var q = g || (navigator.language || 'en').slice(0, 2).toLowerCase();
        if (q !== 'en' && LS.indexOf(q) > -1) {
          var pagina = location.pathname.split('/').pop();
          if (pagina === 'index.html') pagina = '';
          location.replace(q + '/' + pagina + location.hash);
          return;
        }
      }
      document.documentElement.setAttribute('lang', fijo);
      return;
    }
    var p = new URLSearchParams(location.search).get('lang');
    var l = p || localStorage.getItem('site.lang') || (navigator.language || 'en').slice(0, 2).toLowerCase();
    if (LS.indexOf(l) === -1) l = 'en';
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
      "meta.desc": "An LED platform delivering over 275 lumens per watt and cutting consumption by more than 50%. Suitable for existing installations.",
      "meta.locale": "en_GB",
    "a11y.menu": "Menu",
    "form.sending": "Sending…",
    "form.ok": "Message sent. We answer within one working day.",
    "form.incompleto": "Please fill in name, company, email and message.",
    "form.correo": "That email address does not look valid.",
    "form.demasiados": "Too many messages from this connection. Try again in a while.",
    "form.envio": "The message could not be sent. Write to info@almenaraled.com and we will see it.",
    "form.red": "No connection. Check yours and try again.",
    "nf.title": "This page does not exist.",
    "nf.body": "The link may be out of date, or the address mistyped. Everything else is reachable from the home page.",
    "nf.home": "Go to the home page",
    "app.1alt": "Curved corridor lit by concealed cove lighting",
    "app.3alt": "Corner of a classical building lit at night by floodlights",
    "app.4alt": "Terminal concourse with continuous linear luminaires overhead",
    "tech.figalt": "LED floodlight module switched on, mounted on its bracket",
    "serv.figalt": "Floodlight masts switched on against the evening sky",
    "apps.figalt": "Faceted dome with a point of light at each vertex",
    "tech.figcap": "The light engine",
    "serv.figcap": "Installed fleet",
    "apps.figcap": "Architectural lighting",
    "app.2alt": "Warehouse aisle with linear luminaires switched on overhead",
    "calc.meta.title": "Savings calculator — Almenara",
    "calc.meta.desc": "Work out what you would save by replacing your current lighting. Enter your own figures, no registration.",
    "calc.eyebrow": "Savings calculator",
    "calc.title": "Run your own numbers.",
    "calc.sub": "Comparison is made at equal light output, not at equal power: to deliver the same lumens you need a power proportional to the ratio of efficacies. Nothing is registered and no email is required.",
    "cont.whatsapp": "WhatsApp",
    "nav.calc": "Calculator",
    "cct.label": "Colour temperature",
      "a11y.skip": "Skip to content", "a11y.home": "Almenara — home", "a11y.primary": "Main",
      "a11y.lang": "Choose language", "a11y.theme": "Switch between light and dark", "a11y.footer": "Footer",
      "nav.tech": "Technology", "nav.services": "Services", "nav.apps": "Applications", "nav.contact": "Contact",
      "hero.eyebrow": "The latest in LED platform technology",
      "hero.title_a": "275–300 lumens per watt,", "hero.title_b": "on any luminaire.",
      "hero.sub": "LED modules for manufacturers, specifiers and infrastructure operators. They fit new luminaires and replace the light source in those already installed.",
      "hero.cta1": "Request the technical brief", "hero.cta2": "See the sectors",
      "scale.label": "Luminous efficacy · lumens per watt", "scale.axis": "Scale 0 – 300 lm/W",
      "scale.inc": "Incandescent", "scale.fluo": "Fluorescent", "scale.mh": "Metal halide",
      "scale.led": "Commercial LED", "scale.self": "Us",
      "scale.note": "Comparison values are typical market ranges for each technology, not laboratory maxima. Our measurement conditions — colour temperature, colour rendering index, and whether the figure is taken at the module or at the complete luminaire with driver — are stated in full in the technical brief, together with the independent LM-79 report.",
      "metrics.aria": "Key figures", "metrics.efficacy": "Lumens per watt", "metrics.energy": "Energy consumption",
      "metrics.compat_v": "Class A",
      "plat.label": "Us",
      "plat.title": "The change that has to happen is here.",
      "plat.body": "European energy efficiency directives project savings of more than 260 terawatt-hours a year by 2030. In lighting that means one thing only: replacing what is installed with something that delivers the same light on considerably less power. Five years ago the average efficacy sold in Europe was 85 lumens per watt; today Class A on the European energy label starts at 210. We work above that figure.",
      "plat.cta": "Request the technical brief →",
      "adv.label": "Why it is worth the switch",
      "adv.1t": "Efficacy above the commercial ceiling",
      "adv.1b": "More than 275 lm/W against the 150 to 200 lm/W that commercial luminaires deliver today. The same light on roughly half the connected load.",
      "adv.2t": "A new product that lifts your range",
      "adv.2b": "A range that adds to what you already sell without competing with it: it covers the efficacy bracket you cannot offer today and puts you ahead wherever consumption is scored.",
      "adv.3t": "No redrawing the project",
      "adv.3b": "Same photometric distribution, same housing, same installation. Nothing has to be drawn again.",
      "app.label": "Where it fits",
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
      "cta.body": "Tell us the luminaire you make or operate and the hours it runs. We return the efficacy comparison and the projected saving, for your own engineers to check.",
      "cta.btn": "Start the conversation", "cta.alt": "Download the technical brief",
      "foot.tagline": "LED platform technology.",
      "foot.legal1": "Legal notice", "foot.legal2": "Privacy", "foot.legal3": "Cookies",
      "foot.rights": "© 2026 Almenara"
    },

    es: {
      "meta.title": "Almenara — 275 lúmenes por vatio, en cualquier luminaria",
      "meta.desc": "Plataforma LED que supera los 275 lúmenes por vatio y reduce el consumo más de un 50 %. Apta para instalaciones existentes.",
      "meta.locale": "es_ES",
    "a11y.menu": "Menú",
    "form.sending": "Enviando…",
    "form.ok": "Mensaje enviado. Respondemos en un día laborable.",
    "form.incompleto": "Faltan por rellenar el nombre, la empresa, el correo o el mensaje.",
    "form.correo": "Esa dirección de correo no parece válida.",
    "form.demasiados": "Demasiados mensajes desde esta conexión. Inténtalo dentro de un rato.",
    "form.envio": "No se ha podido enviar. Escribe a info@almenaraled.com y lo veremos igual.",
    "form.red": "Sin conexión. Comprueba la tuya y vuelve a intentarlo.",
    "nf.title": "Esta página no existe.",
    "nf.body": "Puede que el enlace esté anticuado o que la dirección se haya escrito mal. Desde la página principal se llega a todo lo demás.",
    "nf.home": "Ir a la página principal",
    "app.1alt": "Pasillo curvo iluminado con luz de cornisa oculta",
    "app.3alt": "Esquina de un edificio clásico iluminada de noche con proyectores",
    "app.4alt": "Vestíbulo de una terminal con luminarias lineales continuas en el techo",
    "tech.figalt": "Módulo proyector LED encendido, montado sobre su soporte",
    "serv.figalt": "Torres de proyectores encendidas contra el cielo del atardecer",
    "apps.figalt": "Cúpula facetada con un punto de luz en cada vértice",
    "tech.figcap": "El motor de luz",
    "serv.figcap": "Parque instalado",
    "apps.figcap": "Iluminación arquitectónica",
    "app.2alt": "Pasillo de una nave logística con luminarias lineales encendidas",
    "calc.meta.title": "Calculadora de ahorro — Almenara",
    "calc.meta.desc": "Calcula lo que ahorrarías sustituyendo tu iluminación actual. Con tus propias cifras y sin registro.",
    "calc.eyebrow": "Calculadora de ahorro",
    "calc.title": "Calcula tus propias cuentas.",
    "calc.sub": "La comparación se hace a iluminación equivalente, no a igual potencia: para dar los mismos lúmenes hace falta una potencia proporcional al cociente de eficacias. No se registra nada ni se pide correo.",
    "cont.whatsapp": "WhatsApp",
    "nav.calc": "Calculadora",
    "cct.label": "Temperatura de color",
      "a11y.skip": "Saltar al contenido", "a11y.home": "Almenara — inicio", "a11y.primary": "Principal",
      "a11y.lang": "Elegir idioma", "a11y.theme": "Alternar entre tema claro y oscuro", "a11y.footer": "Pie de página",
      "nav.tech": "Tecnología", "nav.services": "Servicios", "nav.apps": "Aplicaciones", "nav.contact": "Contacto",
      "hero.eyebrow": "La última tecnología de plataforma LED",
      "hero.title_a": "275–300 lúmenes por vatio,", "hero.title_b": "en cualquier luminaria.",
      "hero.sub": "Módulos LED para fabricantes, prescriptores y operadores de infraestructuras. Se integran en luminarias nuevas y sustituyen la fuente de luz en las ya instaladas.",
      "hero.cta1": "Solicitar la ficha técnica", "hero.cta2": "Ver los sectores",
      "scale.label": "Eficacia luminosa · lúmenes por vatio", "scale.axis": "Escala 0 – 300 lm/W",
      "scale.inc": "Incandescente", "scale.fluo": "Fluorescente", "scale.mh": "Halogenuros metálicos",
      "scale.led": "LED comercial", "scale.self": "Nosotros",
      "scale.note": "Los valores de comparación son rangos habituales de mercado para cada tecnología, no máximos de laboratorio. Nuestras condiciones de medida —temperatura de color, índice de reproducción cromática y si la cifra corresponde al módulo o a la luminaria completa con su equipo de alimentación— figuran íntegras en la ficha técnica, junto con el informe LM-79 de laboratorio independiente.",
      "metrics.aria": "Cifras principales", "metrics.efficacy": "Lúmenes por vatio", "metrics.energy": "Consumo eléctrico",
      "metrics.compat_v": "Clase A",
      "plat.label": "Nosotros",
      "plat.title": "El cambio necesario está aquí.",
      "plat.body": "Las directivas europeas de eficiencia energética proyectan un ahorro de más de 260 teravatios hora anuales para 2030. En iluminación eso significa una sola cosa: sustituir lo instalado por algo que dé la misma luz con bastante menos potencia. Hace cinco años la eficacia media de venta en Europa era de 85 lúmenes por vatio; hoy la Clase A de la etiqueta energética europea empieza en 210. Nosotros trabajamos por encima de esa cifra.",
      "plat.cta": "Solicitar la ficha técnica →",
      "adv.label": "Por qué compensa el cambio",
      "adv.1t": "Eficacia por encima del techo comercial",
      "adv.1b": "Más de 275 lm/W frente a los 150-200 lm/W que rinden hoy las luminarias comerciales. La misma luz con aproximadamente la mitad de potencia instalada.",
      "adv.2t": "Un producto nuevo que eleva el catálogo",
      "adv.2b": "Una gama que se suma a lo que ya vendes sin competir con ello: cubre el tramo de eficacia que hoy no puedes ofrecer y te sitúa por delante en los concursos donde el consumo puntúa.",
      "adv.3t": "Sin rehacer el proyecto",
      "adv.3b": "Misma distribución fotométrica, misma carcasa, misma instalación. No hay que volver a dibujar nada.",
      "app.label": "Dónde encaja",
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
      "cta.body": "Dinos qué luminaria fabricas u operas y cuántas horas funciona. Te devolvemos la comparación de eficacia y el ahorro previsto, para que tus propios ingenieros lo comprueben.",
      "cta.btn": "Empezar la conversación", "cta.alt": "Descargar la ficha técnica",
      "foot.tagline": "Tecnología de plataforma LED.",
      "foot.legal1": "Aviso legal", "foot.legal2": "Privacidad", "foot.legal3": "Cookies",
      "foot.rights": "© 2026 Almenara"
    },

    pt: {
      "meta.title": "Almenara — 275 lúmenes por watt, em qualquer luminária",
      "meta.desc": "Plataforma LED que ultrapassa os 275 lúmenes por watt e reduz o consumo em mais de 50 %. Adequada a instalações existentes.",
      "meta.locale": "pt_PT",
    "a11y.menu": "Menu",
    "form.sending": "A enviar…",
    "form.ok": "Mensagem enviada. Respondemos no prazo de um dia útil.",
    "form.incompleto": "Faltam preencher o nome, a empresa, o correio ou a mensagem.",
    "form.correo": "Esse endereço de correio não parece válido.",
    "form.demasiados": "Demasiadas mensagens desta ligação. Tente daqui a pouco.",
    "form.envio": "Não foi possível enviar. Escreva para info@almenaraled.com e veremos na mesma.",
    "form.red": "Sem ligação. Verifique a sua e tente novamente.",
    "nf.title": "Esta página não existe.",
    "nf.body": "O link pode estar desactualizado ou o endereço mal escrito. A partir da página inicial chega-se a tudo o resto.",
    "nf.home": "Ir para a página inicial",
    "app.1alt": "Corredor curvo iluminado com luz de sanca oculta",
    "app.3alt": "Esquina de um edifício clássico iluminada à noite com projectores",
    "app.4alt": "Átrio de um terminal com luminárias lineares contínuas no tecto",
    "tech.figalt": "Módulo projector LED aceso, montado no seu suporte",
    "serv.figalt": "Torres de projectores acesas contra o céu do entardecer",
    "apps.figalt": "Cúpula facetada com um ponto de luz em cada vértice",
    "tech.figcap": "O motor de luz",
    "serv.figcap": "Parque instalado",
    "apps.figcap": "Iluminação arquitectónica",
    "app.2alt": "Corredor de um armazém logístico com luminárias lineares acesas",
    "calc.meta.title": "Calculadora de poupança — Almenara",
    "calc.meta.desc": "Calcule o que pouparia substituindo a sua iluminação actual. Com os seus próprios números e sem registo.",
    "calc.eyebrow": "Calculadora de poupança",
    "calc.title": "Faça as suas próprias contas.",
    "calc.sub": "A comparação é feita a iluminação equivalente, não a igual potência: para dar os mesmos lúmenes é precisa uma potência proporcional ao quociente das eficácias. Nada é registado nem se pede correio.",
    "cont.whatsapp": "WhatsApp",
    "nav.calc": "Calculadora",
    "cct.label": "Temperatura de cor",
      "a11y.skip": "Saltar para o conteúdo", "a11y.home": "Almenara — página inicial", "a11y.primary": "Principal",
      "a11y.lang": "Escolher idioma", "a11y.theme": "Alternar entre tema claro e escuro", "a11y.footer": "Rodapé",
      "nav.tech": "Tecnologia", "nav.services": "Serviços", "nav.apps": "Aplicações", "nav.contact": "Contacto",
      "hero.eyebrow": "A mais recente tecnologia de plataforma LED",
      "hero.title_a": "275–300 lúmenes por watt,", "hero.title_b": "em qualquer luminária.",
      "hero.sub": "Módulos LED para fabricantes, prescritores e operadores de infraestruturas. Integram-se em luminárias novas e substituem a fonte de luz nas já instaladas.",
      "hero.cta1": "Pedir a ficha técnica", "hero.cta2": "Ver os sectores",
      "scale.label": "Eficácia luminosa · lúmenes por watt", "scale.axis": "Escala 0 – 300 lm/W",
      "scale.inc": "Incandescente", "scale.fluo": "Fluorescente", "scale.mh": "Iodetos metálicos",
      "scale.led": "LED comercial", "scale.self": "Nós",
      "scale.note": "Os valores de comparação correspondem a intervalos correntes de mercado para cada tecnologia, não a máximos de laboratório. As nossas condições de medição — temperatura de cor, índice de restituição cromática e se o valor é medido no módulo ou na luminária completa com alimentador — constam na íntegra da ficha técnica, juntamente com o relatório LM-79 de laboratório independente.",
      "metrics.aria": "Valores principais", "metrics.efficacy": "Lúmenes por watt", "metrics.energy": "Consumo eléctrico",
      "metrics.compat_v": "Classe A",
      "plat.label": "Nós",
      "plat.title": "A mudança necessária está aqui.",
      "plat.body": "As directivas europeias de eficiência energética projectam uma poupança superior a 260 terawatt-hora por ano até 2030. Em iluminação isso significa uma só coisa: substituir o instalado por algo que dê a mesma luz com bastante menos potência. Há cinco anos a eficácia média vendida na Europa era de 85 lúmenes por watt; hoje a Classe A da etiqueta energética europeia começa nos 210. Nós trabalhamos acima desse valor.",
      "plat.cta": "Pedir a ficha técnica →",
      "adv.label": "Porque compensa mudar",
      "adv.1t": "Eficácia acima do tecto comercial",
      "adv.1b": "Mais de 275 lm/W face aos 150-200 lm/W que as luminárias comerciais rendem hoje. A mesma luz com cerca de metade da potência instalada.",
      "adv.2t": "Um produto novo que eleva o catálogo",
      "adv.2b": "Uma gama que se soma ao que já vende sem competir com isso: cobre o intervalo de eficácia que hoje não pode oferecer e coloca-o à frente nos concursos onde o consumo pontua.",
      "adv.3t": "Sem refazer o projecto",
      "adv.3b": "Mesma distribuição fotométrica, mesma caixa, mesma instalação. Não é preciso desenhar nada de novo.",
      "app.label": "Onde encaixa",
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
      "cta.body": "Diga-nos que luminária fabrica ou opera e quantas horas funciona. Devolvemos a comparação de eficácia e a poupança prevista, para que os seus engenheiros verifiquem.",
      "cta.btn": "Iniciar a conversa", "cta.alt": "Descarregar a ficha técnica",
      "foot.tagline": "Tecnologia de plataforma LED.",
      "foot.legal1": "Aviso legal", "foot.legal2": "Privacidade", "foot.legal3": "Cookies",
      "foot.rights": "© 2026 Almenara"
    },
    fr: {
      "meta.title": "Almenara — 275 lumens par watt, sur tout luminaire",
      "meta.desc": "Une plateforme LED qui dépasse 275 lumens par watt et réduit la consommation de plus de 50 %. Adaptée aux installations existantes.",
      "meta.locale": "fr_FR",
    "a11y.menu": "Menu",
    "form.sending": "Envoi…",
    "form.ok": "Message envoyé. Nous répondons sous un jour ouvré.",
    "form.incompleto": "Il manque le nom, la société, le courriel ou le message.",
    "form.correo": "Cette adresse de courriel ne semble pas valide.",
    "form.demasiados": "Trop de messages depuis cette connexion. Réessayez plus tard.",
    "form.envio": "L'envoi a échoué. Écrivez à info@almenaraled.com et nous le verrons quand même.",
    "form.red": "Pas de connexion. Vérifiez la vôtre et réessayez.",
    "nf.title": "Cette page n'existe pas.",
    "nf.body": "Le lien est peut-être périmé, ou l'adresse mal saisie. Tout le reste est accessible depuis la page d'accueil.",
    "nf.home": "Aller à la page d'accueil",
    "app.1alt": "Couloir courbe éclairé par une corniche lumineuse dissimulée",
    "app.3alt": "Angle d'un bâtiment classique éclairé la nuit par des projecteurs",
    "app.4alt": "Hall de terminal avec des luminaires linéaires continus au plafond",
    "tech.figalt": "Module projecteur LED allumé, monté sur son support",
    "serv.figalt": "Mâts de projecteurs allumés sur le ciel du soir",
    "apps.figalt": "Coupole à facettes avec un point lumineux à chaque sommet",
    "tech.figcap": "Le moteur de lumière",
    "serv.figcap": "Parc installé",
    "apps.figcap": "Éclairage architectural",
    "app.2alt": "Allée d'un entrepôt avec des luminaires linéaires allumés",
    "calc.meta.title": "Calculateur d'économies — Almenara",
    "calc.meta.desc": "Calculez ce que vous économiseriez en remplaçant votre éclairage actuel. Avec vos propres chiffres et sans inscription.",
    "calc.eyebrow": "Calculateur d'économies",
    "calc.title": "Faites vos propres comptes.",
    "calc.sub": "La comparaison se fait à éclairement équivalent, non à puissance égale : pour délivrer les mêmes lumens il faut une puissance proportionnelle au rapport des efficacités. Rien n'est enregistré et aucun courriel n'est demandé.",
    "cont.whatsapp": "WhatsApp",
    "nav.calc": "Calculateur",
    "cct.label": "Température de couleur",
      "a11y.skip": "Aller au contenu", "a11y.home": "Almenara — accueil", "a11y.primary": "Principal",
      "a11y.lang": "Choisir la langue", "a11y.theme": "Basculer entre thème clair et sombre", "a11y.footer": "Pied de page",
      "nav.tech": "Technologie", "nav.services": "Services", "nav.apps": "Applications", "nav.contact": "Contact",
      "hero.eyebrow": "La dernière technologie de plateforme LED",
      "hero.title_a": "275–300 lumens par watt,", "hero.title_b": "sur tout luminaire.",
      "hero.sub": "Modules LED pour fabricants, prescripteurs et exploitants d'infrastructures. Ils s'intègrent aux luminaires neufs et remplacent la source dans ceux déjà installés.",
      "hero.cta1": "Demander la fiche technique", "hero.cta2": "Voir les secteurs",
      "scale.label": "Efficacité lumineuse · lumens par watt", "scale.axis": "Échelle 0 – 300 lm/W",
      "scale.inc": "Incandescence", "scale.fluo": "Fluorescent", "scale.mh": "Iodures métalliques",
      "scale.led": "LED du marché", "scale.self": "Nous",
      "scale.note": "Les valeurs de comparaison correspondent aux plages courantes du marché pour chaque technologie, et non à des maxima de laboratoire. Nos conditions de mesure — température de couleur, indice de rendu des couleurs, et mesure prise au module ou au luminaire complet avec son driver — figurent intégralement dans la fiche technique, avec le rapport LM-79 d'un laboratoire indépendant.",
      "metrics.aria": "Chiffres clés", "metrics.efficacy": "Lumens par watt", "metrics.energy": "Consommation électrique",
      "metrics.compat_v": "Classe A",
      "plat.label": "Nous",
      "plat.title": "Le changement nécessaire est là.",
      "plat.body": "Les directives européennes d'efficacité énergétique projettent des économies de plus de 260 térawattheures par an à l'horizon 2030. En éclairage, cela ne signifie qu'une chose : remplacer l'existant par quelque chose qui donne la même lumière avec bien moins de puissance. Il y a cinq ans, l'efficacité moyenne vendue en Europe était de 85 lumens par watt ; aujourd'hui la Classe A de l'étiquette énergétique européenne commence à 210. Nous travaillons au-dessus de ce chiffre.",
      "plat.cta": "Demander la fiche technique →",
      "adv.label": "Pourquoi le changement vaut la peine",
      "adv.1t": "Une efficacité au-dessus du plafond commercial",
      "adv.1b": "Plus de 275 lm/W contre les 150 à 200 lm/W que délivrent aujourd'hui les luminaires du marché. La même lumière pour environ la moitié de la puissance installée.",
      "adv.2t": "Un produit neuf qui élève la gamme",
      "adv.2b": "Une gamme qui s'ajoute à ce que vous vendez déjà sans lui faire concurrence : elle couvre la plage d'efficacité que vous ne pouvez pas proposer aujourd'hui et vous place devant partout où la consommation est notée.",
      "adv.3t": "Sans refaire le projet",
      "adv.3b": "Même distribution photométrique, même carter, même installation. Il n'y a rien à redessiner.",
      "app.label": "Où elle s'adapte",
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
      "cta.body": "Indiquez-nous le luminaire que vous fabriquez ou exploitez et ses heures de fonctionnement. Nous renvoyons la comparaison d'efficacité et l'économie prévue, pour que vos ingénieurs la vérifient.",
      "cta.btn": "Engager la conversation", "cta.alt": "Télécharger la fiche technique",
      "foot.tagline": "Technologie de plateforme LED.",
      "foot.legal1": "Mentions légales", "foot.legal2": "Confidentialité", "foot.legal3": "Cookies",
      "foot.rights": "© 2026 Almenara"
    },

    de: {
      "meta.title": "Almenara — 275 Lumen pro Watt, in jeder Leuchte",
      "meta.desc": "Eine LED-Plattform mit über 275 Lumen pro Watt und mehr als 50 % weniger Verbrauch. Für bestehende Anlagen geeignet.",
      "meta.locale": "de_DE",
    "a11y.menu": "Menü",
    "form.sending": "Wird gesendet…",
    "form.ok": "Nachricht gesendet. Wir antworten innerhalb eines Werktags.",
    "form.incompleto": "Es fehlen Name, Unternehmen, E-Mail oder Nachricht.",
    "form.correo": "Diese E-Mail-Adresse sieht nicht gültig aus.",
    "form.demasiados": "Zu viele Nachrichten von dieser Verbindung. Versuchen Sie es später.",
    "form.envio": "Das Senden ist fehlgeschlagen. Schreiben Sie an info@almenaraled.com, wir sehen es trotzdem.",
    "form.red": "Keine Verbindung. Prüfen Sie Ihre und versuchen Sie es erneut.",
    "nf.title": "Diese Seite gibt es nicht.",
    "nf.body": "Der Link ist womöglich veraltet oder die Adresse falsch geschrieben. Von der Startseite aus ist alles Übrige erreichbar.",
    "nf.home": "Zur Startseite",
    "app.1alt": "Geschwungener Gang mit verdeckter Voutenbeleuchtung",
    "app.3alt": "Ecke eines klassischen Gebäudes, nachts mit Strahlern beleuchtet",
    "app.4alt": "Terminalhalle mit durchlaufenden Lichtbändern an der Decke",
    "tech.figalt": "Eingeschaltetes LED-Strahlermodul auf seiner Halterung",
    "serv.figalt": "Eingeschaltete Flutlichtmasten vor dem Abendhimmel",
    "apps.figalt": "Facettierte Kuppel mit einem Lichtpunkt an jedem Knoten",
    "tech.figcap": "Das Lichtmodul",
    "serv.figcap": "Installierter Bestand",
    "apps.figcap": "Architekturbeleuchtung",
    "app.2alt": "Lagergang mit eingeschalteten Lichtbändern",
    "calc.meta.title": "Einsparrechner — Almenara",
    "calc.meta.desc": "Rechnen Sie aus, was der Austausch Ihrer Beleuchtung sparen würde. Mit Ihren eigenen Zahlen und ohne Registrierung.",
    "calc.eyebrow": "Einsparrechner",
    "calc.title": "Rechnen Sie selbst nach.",
    "calc.sub": "Verglichen wird bei gleicher Lichtmenge, nicht bei gleicher Leistung: für dieselben Lumen braucht es eine Leistung im Verhältnis der Lichtausbeuten. Nichts wird gespeichert, keine E-Mail verlangt.",
    "cont.whatsapp": "WhatsApp",
    "nav.calc": "Rechner",
    "cct.label": "Farbtemperatur",
      "a11y.skip": "Zum Inhalt springen", "a11y.home": "Almenara — Startseite", "a11y.primary": "Haupt",
      "a11y.lang": "Sprache wählen", "a11y.theme": "Zwischen hellem und dunklem Thema wechseln", "a11y.footer": "Fußbereich",
      "nav.tech": "Technologie", "nav.services": "Leistungen", "nav.apps": "Anwendungen", "nav.contact": "Kontakt",
      "hero.eyebrow": "Die neueste LED-Plattformtechnologie",
      "hero.title_a": "275–300 Lumen pro Watt,", "hero.title_b": "in jeder Leuchte.",
      "hero.sub": "LED-Module für Hersteller, Fachplaner und Infrastrukturbetreiber. Sie gehen in neue Leuchten ein und ersetzen die Lichtquelle in bestehenden.",
      "hero.cta1": "Datenblatt anfordern", "hero.cta2": "Die Bereiche ansehen",
      "scale.label": "Lichtausbeute · Lumen pro Watt", "scale.axis": "Skala 0 – 300 lm/W",
      "scale.inc": "Glühlampe", "scale.fluo": "Leuchtstofflampe", "scale.mh": "Halogen-Metalldampf",
      "scale.led": "Handelsübliche LED", "scale.self": "Wir",
      "scale.note": "Die Vergleichswerte sind marktübliche Bereiche der jeweiligen Technologie, keine Laborhöchstwerte. Unsere Messbedingungen — Farbtemperatur, Farbwiedergabeindex sowie die Frage, ob am Modul oder an der kompletten Leuchte samt Betriebsgerät gemessen wurde — stehen vollständig im Datenblatt, zusammen mit dem LM-79-Bericht eines unabhängigen Labors.",
      "metrics.aria": "Kennzahlen", "metrics.efficacy": "Lumen pro Watt", "metrics.energy": "Stromverbrauch",
      "metrics.compat_v": "Klasse A",
      "plat.label": "Wir",
      "plat.title": "Der notwendige Wandel ist da.",
      "plat.body": "Die europäischen Energieeffizienzrichtlinien sehen bis 2030 Einsparungen von über 260 Terawattstunden im Jahr vor. In der Beleuchtung heißt das nur eines: das Installierte durch etwas ersetzen, das dieselbe Lichtmenge mit deutlich weniger Leistung liefert. Vor fünf Jahren lag die in Europa verkaufte Durchschnittsausbeute bei 85 Lumen pro Watt; heute beginnt Klasse A des europäischen Energielabels bei 210. Wir arbeiten oberhalb dieses Wertes.",
      "plat.cta": "Datenblatt anfordern →",
      "adv.label": "Warum sich der Wechsel lohnt",
      "adv.1t": "Ausbeute oberhalb der Marktgrenze",
      "adv.1b": "Über 275 lm/W gegenüber den 150 bis 200 lm/W heutiger Marktleuchten. Dasselbe Licht bei etwa der halben Anschlussleistung.",
      "adv.2t": "Ein neues Produkt, das das Sortiment hebt",
      "adv.2b": "Eine Reihe, die Ihr Sortiment ergänzt, statt ihm Konkurrenz zu machen: sie deckt den Ausbeutebereich ab, den Sie heute nicht anbieten können, und bringt Sie überall dort nach vorn, wo der Verbrauch bewertet wird.",
      "adv.3t": "Ohne das Projekt neu zu planen",
      "adv.3b": "Gleiche Lichtverteilung, gleiches Gehäuse, gleiche Montage. Es muss nichts neu gezeichnet werden.",
      "app.label": "Wo sie passt",
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
      "cta.body": "Nennen Sie uns die Leuchte, die Sie herstellen oder betreiben, und ihre Betriebsstunden. Wir liefern den Ausbeutevergleich und die erwartete Einsparung, damit Ihre Ingenieure nachrechnen.",
      "cta.btn": "Gespräch beginnen", "cta.alt": "Datenblatt herunterladen",
      "foot.tagline": "LED-Plattformtechnologie.",
      "foot.legal1": "Impressum", "foot.legal2": "Datenschutz", "foot.legal3": "Cookies",
      "foot.rights": "© 2026 Almenara"
    },

    it: {
      "meta.title": "Almenara — 275 lumen per watt, su qualsiasi apparecchio",
      "meta.desc": "Piattaforma LED che supera i 275 lumen per watt e riduce i consumi di oltre il 50 %. Adatta agli impianti esistenti.",
      "meta.locale": "it_IT",
    "a11y.menu": "Menu",
    "form.sending": "Invio…",
    "form.ok": "Messaggio inviato. Rispondiamo entro un giorno lavorativo.",
    "form.incompleto": "Mancano il nome, l'azienda, la posta o il messaggio.",
    "form.correo": "Quell'indirizzo di posta non sembra valido.",
    "form.demasiados": "Troppi messaggi da questa connessione. Riprova tra un po'.",
    "form.envio": "Non è stato possibile inviare. Scrivi a info@almenaraled.com e lo vedremo lo stesso.",
    "form.red": "Nessuna connessione. Controlla la tua e riprova.",
    "nf.title": "Questa pagina non esiste.",
    "nf.body": "Il collegamento potrebbe essere obsoleto o l'indirizzo scritto male. Dalla pagina iniziale si raggiunge tutto il resto.",
    "nf.home": "Vai alla pagina iniziale",
    "app.1alt": "Corridoio curvo illuminato con luce a gola nascosta",
    "app.3alt": "Angolo di un edificio classico illuminato di notte con proiettori",
    "app.4alt": "Atrio di un terminal con apparecchi lineari continui a soffitto",
    "tech.figalt": "Modulo proiettore LED acceso, montato sulla sua staffa",
    "serv.figalt": "Torri faro accese contro il cielo della sera",
    "apps.figalt": "Cupola sfaccettata con un punto luce a ogni vertice",
    "tech.figcap": "Il motore di luce",
    "serv.figcap": "Parco installato",
    "apps.figcap": "Illuminazione architettonica",
    "app.2alt": "Corsia di un magazzino con apparecchi lineari accesi",
    "calc.meta.title": "Calcolatore di risparmio — Almenara",
    "calc.meta.desc": "Calcola quanto risparmieresti sostituendo la tua illuminazione attuale. Con i tuoi numeri e senza registrazione.",
    "calc.eyebrow": "Calcolatore di risparmio",
    "calc.title": "Fai i tuoi conti.",
    "calc.sub": "Il confronto è a illuminamento equivalente, non a pari potenza: per dare gli stessi lumen serve una potenza proporzionale al rapporto delle efficienze. Non si registra nulla e non si chiede la posta elettronica.",
    "cont.whatsapp": "WhatsApp",
    "nav.calc": "Calcolatore",
    "cct.label": "Temperatura di colore",
      "a11y.skip": "Vai al contenuto", "a11y.home": "Almenara — pagina iniziale", "a11y.primary": "Principale",
      "a11y.lang": "Scegli la lingua", "a11y.theme": "Alterna tema chiaro e scuro", "a11y.footer": "Piè di pagina",
      "nav.tech": "Tecnologia", "nav.services": "Servizi", "nav.apps": "Applicazioni", "nav.contact": "Contatti",
      "hero.eyebrow": "L'ultima tecnologia di piattaforma LED",
      "hero.title_a": "275–300 lumen per watt,", "hero.title_b": "su qualsiasi apparecchio.",
      "hero.sub": "Moduli LED per produttori, prescrittori e gestori di infrastrutture. Si integrano negli apparecchi nuovi e sostituiscono la sorgente in quelli già installati.",
      "hero.cta1": "Richiedi la scheda tecnica", "hero.cta2": "Vedi i settori",
      "scale.label": "Efficienza luminosa · lumen per watt", "scale.axis": "Scala 0 – 300 lm/W",
      "scale.inc": "Incandescenza", "scale.fluo": "Fluorescente", "scale.mh": "Ioduri metallici",
      "scale.led": "LED commerciale", "scale.self": "Noi",
      "scale.note": "I valori di confronto sono intervalli tipici di mercato per ciascuna tecnologia, non massimi di laboratorio. Le nostre condizioni di misura — temperatura di colore, indice di resa cromatica e se il dato è rilevato sul modulo o sull'apparecchio completo di alimentatore — sono riportate per intero nella scheda tecnica, insieme al rapporto LM-79 di laboratorio indipendente.",
      "metrics.aria": "Dati principali", "metrics.efficacy": "Lumen per watt", "metrics.energy": "Consumo elettrico",
      "metrics.compat_v": "Classe A",
      "plat.label": "Noi",
      "plat.title": "Il cambiamento necessario è qui.",
      "plat.body": "Le direttive europee di efficienza energetica prevedono un risparmio di oltre 260 terawattora l'anno entro il 2030. Nell'illuminazione questo significa una cosa sola: sostituire l'installato con qualcosa che dia la stessa luce con molta meno potenza. Cinque anni fa l'efficienza media venduta in Europa era di 85 lumen per watt; oggi la Classe A dell'etichetta energetica europea parte da 210. Noi lavoriamo al di sopra di quel valore.",
      "plat.cta": "Richiedi la scheda tecnica →",
      "adv.label": "Perché conviene cambiare",
      "adv.1t": "Efficienza oltre il tetto commerciale",
      "adv.1b": "Oltre 275 lm/W contro i 150-200 lm/W degli apparecchi oggi in commercio. La stessa luce con circa metà della potenza installata.",
      "adv.2t": "Un prodotto nuovo che eleva il catalogo",
      "adv.2b": "Una gamma che si somma a quello che già vendi senza competere con esso: copre la fascia di efficienza che oggi non puoi offrire e ti mette avanti nei concorsi dove il consumo fa punteggio.",
      "adv.3t": "Senza rifare il progetto",
      "adv.3b": "Stessa distribuzione fotometrica, stesso corpo, stessa installazione. Non c'è nulla da ridisegnare.",
      "app.label": "Dove si inserisce",
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
      "cta.body": "Dicci quale apparecchio produci o gestisci e quante ore funziona. Ti restituiamo il confronto di efficienza e il risparmio previsto, perché i tuoi ingegneri lo verifichino.",
      "cta.btn": "Avvia la conversazione", "cta.alt": "Scarica la scheda tecnica",
      "foot.tagline": "Tecnologia di piattaforma LED.",
      "foot.legal1": "Note legali", "foot.legal2": "Privacy", "foot.legal3": "Cookie",
      "foot.rights": "© 2026 Almenara"
    },

    ru: {
      "meta.title": "Almenara — 275 люмен на ватт в любом светильнике",
      "meta.desc": "Светодиодная платформа: свыше 275 люмен на ватт и снижение потребления более чем на 50 %. Подходит для действующих установок.",
      "meta.locale": "ru_RU",
    "a11y.menu": "Меню",
    "form.sending": "Отправка…",
    "form.ok": "Сообщение отправлено. Отвечаем в течение одного рабочего дня.",
    "form.incompleto": "Не заполнены имя, компания, почта или сообщение.",
    "form.correo": "Этот адрес почты выглядит неверным.",
    "form.demasiados": "Слишком много сообщений с этого подключения. Попробуйте позже.",
    "form.envio": "Отправить не удалось. Напишите на info@almenaraled.com — мы всё равно увидим.",
    "form.red": "Нет соединения. Проверьте его и повторите попытку.",
    "nf.title": "Такой страницы нет.",
    "nf.body": "Возможно, ссылка устарела или адрес набран с ошибкой. С главной страницы доступно всё остальное.",
    "nf.home": "На главную страницу",
    "app.1alt": "Изогнутый коридор со скрытой карнизной подсветкой",
    "app.3alt": "Угол классического здания, освещённый ночью прожекторами",
    "app.4alt": "Зал терминала со сплошными линейными светильниками на потолке",
    "tech.figalt": "Включённый светодиодный прожекторный модуль на кронштейне",
    "serv.figalt": "Включённые мачты прожекторов на фоне вечернего неба",
    "apps.figalt": "Гранёный купол со светящейся точкой в каждом узле",
    "tech.figcap": "Световой модуль",
    "serv.figcap": "Установленный парк",
    "apps.figcap": "Архитектурное освещение",
    "app.2alt": "Проход склада с включёнными линейными светильниками",
    "calc.meta.title": "Калькулятор экономии — Almenara",
    "calc.meta.desc": "Рассчитайте, сколько сэкономите при замене нынешнего освещения. По своим цифрам и без регистрации.",
    "calc.eyebrow": "Калькулятор экономии",
    "calc.title": "Посчитайте сами.",
    "calc.sub": "Сравнение ведётся при равной освещённости, а не при равной мощности: чтобы дать те же люмены, нужна мощность, пропорциональная отношению световых отдач. Ничего не сохраняется и почта не запрашивается.",
    "cont.whatsapp": "WhatsApp",
    "nav.calc": "Калькулятор",
    "cct.label": "Цветовая температура",
      "a11y.skip": "Перейти к содержанию", "a11y.home": "Almenara — главная", "a11y.primary": "Основное",
      "a11y.lang": "Выбрать язык", "a11y.theme": "Переключить светлую и тёмную тему", "a11y.footer": "Нижний колонтитул",
      "nav.tech": "Технология", "nav.services": "Услуги", "nav.apps": "Применение", "nav.contact": "Контакты",
      "hero.eyebrow": "Новейшая светодиодная платформа",
      "hero.title_a": "275–300 люмен на ватт —", "hero.title_b": "в любом светильнике.",
      "hero.sub": "Светодиодные модули для производителей, проектировщиков и операторов инфраструктуры. Встраиваются в новые светильники и заменяют источник света в уже установленных.",
      "hero.cta1": "Запросить техническое описание", "hero.cta2": "Посмотреть отрасли",
      "scale.label": "Световая отдача · люмен на ватт", "scale.axis": "Шкала 0 – 300 лм/Вт",
      "scale.inc": "Лампа накаливания", "scale.fluo": "Люминесцентная", "scale.mh": "Металлогалогенная",
      "scale.led": "Серийные светодиоды", "scale.self": "Мы",
      "scale.note": "Значения для сравнения — типичные рыночные диапазоны каждой технологии, а не лабораторные максимумы. Наши условия измерения (цветовая температура, индекс цветопередачи, а также измерялся ли модуль или светильник целиком с драйвером) полностью изложены в техническом описании вместе с протоколом LM-79 независимой лаборатории.",
      "metrics.aria": "Ключевые показатели", "metrics.efficacy": "Люмен на ватт", "metrics.energy": "Потребление энергии",
      "metrics.compat_v": "Класс A",
      "plat.label": "О нас",
      "plat.title": "Необходимая перемена уже здесь.",
      "plat.body": "Европейские директивы по энергоэффективности предполагают экономию свыше 260 тераватт-часов в год к 2030 году. В освещении это означает только одно: заменить установленное на то, что даёт тот же свет при заметно меньшей мощности. Пять лет назад средняя продаваемая в Европе световая отдача составляла 85 люмен на ватт; сегодня класс A европейской энергетической маркировки начинается с 210. Мы работаем выше этого значения.",
      "plat.cta": "Запросить техническое описание →",
      "adv.label": "Почему переход оправдан",
      "adv.1t": "Отдача выше рыночного потолка",
      "adv.1b": "Свыше 275 лм/Вт против 150–200 лм/Вт у сегодняшних серийных светильников. Тот же свет примерно при половине установленной мощности.",
      "adv.2t": "Новый продукт, поднимающий каталог",
      "adv.2b": "Линейка, которая дополняет то, что вы уже продаёте, не конкурируя с ним: она закрывает диапазон отдачи, недоступный вам сегодня, и выводит вперёд там, где потребление идёт в зачёт.",
      "adv.3t": "Без переработки проекта",
      "adv.3b": "Та же кривая силы света, тот же корпус, тот же монтаж. Ничего перечерчивать не нужно.",
      "app.label": "Где она уместна",
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
      "cta.body": "Сообщите, какой светильник вы производите или эксплуатируете и сколько часов он работает. Вернём сравнение отдачи и ожидаемую экономию, чтобы ваши инженеры это проверили.",
      "cta.btn": "Начать разговор", "cta.alt": "Скачать техническое описание",
      "foot.tagline": "Светодиодная платформа.",
      "foot.legal1": "Правовая информация", "foot.legal2": "Конфиденциальность", "foot.legal3": "Файлы cookie",
      "foot.rights": "© 2026 Almenara"
    }
  };

  /* ==========================================================================
     Diccionario de las páginas interiores.
     Se fusiona con el de la portada en app.js. Mismas reglas: si una clave
     falta en un idioma, cae al inglés en lugar de dejar el hueco vacío.
     ========================================================================== */
  const I18N_PAGES = {

    en: {
      "nav.partners": "Partners",
      "part.meta.title": "Partners — Almenara",
      "part.meta.desc": "Partner with Almenara: technology licence, licensed manufacturing, distribution and installation of Dicrotec LED modules at 275 lm/W (indoor, LED 3030). Terms agreed with each partner.",
      "part.eyebrow": "Partners",
      "part.title": "Your luminaire, with Dicrotec technology.",
      "part.sub": "We are looking for manufacturers, distributors and installers to take Dicrotec technology to their territory. We do not make luminaires. We do not compete with our partners.",
      "part.why.label": "Why partner with us",
      "part.w1t": "275 lm/W",
      "part.w1b": "Dicrotec indoor modules, LED 3030. Above the efficacy the industry set as its target for 2035.",
      "part.w2t": "Patent MX 383389",
      "part.w2b": "Filed in 33 further countries; granted in the United States and China, among others.",
      "part.w3t": "Vision 2030",
      "part.w3b": "10% of the European LED lighting market. A declared objective, not a share already won.",
      "part.models.label": "Four ways to partner",
      "part.1t": "Technology licence",
      "part.1b": "Manufacturers who integrate Dicrotec technology into their luminaires, under their own brand and the seal “With Dicrotec technology · Almenara LED”.",
      "part.2t": "Licensed manufacturing",
      "part.2b": "Industrial groups who produce the modules in their own region, close to their customers, under licence.",
      "part.3t": "Distribution",
      "part.3b": "Distributors who sell the modules in their territory to manufacturers, installers and maintainers.",
      "part.4t": "Integration and installation",
      "part.4b": "Engineering firms and installers who carry out the work: replacing the module in public, industrial and commercial installations.",
      "part.terms.label": "Terms",
      "part.terms.title": "Each agreement, built for its market.",
      "part.terms.body": "Territory, exclusivity and economic terms are agreed with each partner. They are discussed in private. They are not published.",
      "part.steps.label": "How it starts",
      "part.s1t": "Introduce yourself",
      "part.s1b": "Who you are, where you operate and which way of partnering interests you.",
      "part.s2t": "Meeting",
      "part.s2b": "We present the technology and assess your market together.",
      "part.s3t": "Let's talk",
      "part.s3b": "Each alliance is defined with each partner. Write to us.",
      "part.s3link": "Go to contact →",
      "part.cta.label": "Next step",
      "part.cta.title": "Bring the light to your territory.",
      "part.cta.body": "Write to us with your company, your territory and the way of partnering that interests you. We answer within one working day.",
      "part.cta.btn": "Propose a partnership",

      "apps.7b": "Server halls and technical aisles. They run above the ambient temperature a standard luminaire is designed for, and heat shortens the life of the gear. Here every watt is saved twice: on the lighting and on the cooling that no longer has to remove it.",
      "apps.7t": "Data centres",
      "apps.fig2alt": "Grid of reflector lamps switched on, seen from below",
      "apps.fig2cap": "Points of light",
      "tech.principle.body": "The gain comes from a technology of our own that delivers what the industry took for impossible. And it does so without changing the luminaire: same housing, same optics, same installation.",
      "tech.meta.title": "Technology — Almenara",
      "tech.meta.desc": "High-efficacy LED modules. Four formats, with colour temperature and beam angle configurable.",
      "tech.eyebrow": "Technology",
      "tech.title": "More light per watt, without touching the luminaire.",
      "tech.principle.label": "The principle",
      "tech.principle.title": "More light, less heat, same fixture.",
      "tech.specs.title": "The range.",
      "tech.specs.body": "Colour temperature and beam angle configurable. Custom configurations on request.",
      "tech.spec.efficacy": "Luminous efficacy",
      "tech.spec.energy": "Energy reduction against standard",
      "tech.spec.compat": "Compatibility",
      "tech.spec.compat_v": "Universal · retrofit-ready",
      "tech.spec.temp": "Operating temperature",
      "tech.spec.cct": "Colour temperature",
      "tech.spec.cct_v": "Fully configurable",
      "tech.spec.cert": "Certification",
      "tech.specs.note": "The measurement conditions and the independent laboratory report are set out in the technical brief.",
      "tech.cta.label": "Next step",
      "tech.cta.title": "Put it in your own catalogue.",
      "tech.cta.body": "For manufacturers and lighting studios evaluating the platform for a product line.",
      "tech.cta.btn": "Request the technical brief",

      "serv.meta.title": "Services — Almenara",
      "serv.meta.desc": "Four ways to work with Almenara: module supply, retrofit engineering, custom development and technical advisory.",
      "serv.eyebrow": "Services",
      "serv.title": "Four ways to work with us.",
      "serv.sub": "From supplying the module to delivering light as a service. Choose the one that fits how your organisation buys.",
      "serv.list.label": "What we do",
      "serv.1t": "Module supply",
      "serv.1b": "For manufacturers integrating our modules into their own luminaires. Four standard formats and bespoke geometries, with the full datasheet and certification file.",
      "serv.2t": "Retrofit engineering",
      "serv.2b": "Replacing the light source in installations already in service, without changing the luminaire. Designed for estates running into thousands of light points.",
      "serv.3t": "Light as a service",
      "serv.3b": "No upfront investment. You pay a fee for the light and we retain ownership of the equipment, its maintenance and its recycling at end of life. In many cases the saving exceeds the fee from the first month.",
      "serv.4t": "Technical advisory",
      "serv.4b": "Photometric studies, lifecycle costing and retrofit feasibility. With no obligation to buy anything afterwards.",
      "serv.cta.label": "Next step",
      "serv.cta.title": "Scope your project in an hour.",
      "serv.cta.body": "Every engagement starts with a technical call. No commitment and no sales pitch: engineers answering engineers.",
      "serv.cta.btn": "Request a call",

      "apps.meta.title": "Applications — Almenara",
      "apps.meta.desc": "The sectors the Almenara platform is designed for: hospitality, architecture, industry, retail, public infrastructure and premium residential.",
      "apps.eyebrow": "Applications",
      "apps.title": "Where light costs money.",
      "apps.sub": "The saving grows with the installed load and the hours it runs. Industry and street lighting are the extreme cases; everything else follows.",
      "apps.list.label": "Seven sectors",
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
      "apps.cta.body": "The list is not exhaustive. If lighting is critical to your operation and none of these six describes it, tell us about it.",
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
      "cont.f.note": "Your message reaches us directly, and a copy is kept on our server so nothing is lost. We answer within one working day."
    },

    es: {
      "nav.partners": "Socios",
      "part.meta.title": "Socios — Almenara",
      "part.meta.desc": "Socios de Almenara: licencia tecnológica, fabricación bajo licencia, distribución e instalación de módulos LED Dicrotec de 275 lm/W (interior, LED 3030). Condiciones acordadas con cada socio.",
      "part.eyebrow": "Socios",
      "part.title": "Su luminaria, con tecnología Dicrotec.",
      "part.sub": "Buscamos fabricantes, distribuidores e instaladores que lleven la tecnología Dicrotec a su territorio. No fabricamos luminarias. No competimos con nuestros socios.",
      "part.why.label": "Por qué asociarse",
      "part.w1t": "275 lm/W",
      "part.w1b": "Módulos interiores Dicrotec, LED 3030. Por encima de la eficacia que la industria fijó como objetivo para 2035.",
      "part.w2t": "Patente MX 383389",
      "part.w2b": "Solicitada en 33 países más; concedida, entre otros, en EE. UU. y China.",
      "part.w3t": "Visión 2030",
      "part.w3b": "El 10% del mercado europeo de iluminación LED. Objetivo declarado, no cuota conseguida.",
      "part.models.label": "Cuatro formas de colaborar",
      "part.1t": "Licencia tecnológica",
      "part.1b": "Fabricantes que integran la tecnología Dicrotec en sus luminarias, con su marca y el sello «Con tecnología Dicrotec · Almenara LED».",
      "part.2t": "Fabricación bajo licencia",
      "part.2b": "Grupos industriales que producen los módulos en su región, cerca de sus clientes, bajo licencia.",
      "part.3t": "Distribución",
      "part.3b": "Distribuidores que venden los módulos en su territorio a fabricantes, instaladores y mantenedores.",
      "part.4t": "Integración e instalación",
      "part.4b": "Ingenierías e instaladores que ejecutan la obra: sustituir el módulo en instalaciones públicas, industriales y comerciales.",
      "part.terms.label": "Condiciones",
      "part.terms.title": "Cada acuerdo, a la medida de su mercado.",
      "part.terms.body": "Territorio, exclusividad y condiciones económicas se acuerdan con cada socio. Se tratan en privado. No se publican.",
      "part.steps.label": "Cómo empieza",
      "part.s1t": "Preséntese",
      "part.s1b": "Quién es, dónde opera y qué forma de colaborar le interesa.",
      "part.s2t": "Reunión",
      "part.s2b": "Presentamos la tecnología y valoramos juntos su mercado.",
      "part.s3t": "Hablemos",
      "part.s3b": "Cada alianza se define con cada socio. Escríbanos.",
      "part.s3link": "Ir a contacto →",
      "part.cta.label": "Siguiente paso",
      "part.cta.title": "Lleve la luz a su territorio.",
      "part.cta.body": "Escríbanos con su empresa, su territorio y la forma de colaborar que le interesa. Respondemos en un día laborable.",
      "part.cta.btn": "Proponer una alianza",

      "apps.7b": "Salas de servidores y pasillos técnicos. Trabajan por encima de la temperatura ambiente para la que se diseña una luminaria corriente, y el calor acorta la vida del equipo. Aquí cada vatio se ahorra dos veces: en la iluminación y en la refrigeración que ya no tiene que retirarlo.",
      "apps.7t": "Centros de datos",
      "apps.fig2alt": "Retícula de lámparas con reflector encendidas, vista desde abajo",
      "apps.fig2cap": "Puntos de luz",
      "tech.principle.body": "La ganancia viene de una tecnología propia que consigue lo que el sector daba por imposible. Y lo consigue sin cambiar la luminaria: misma carcasa, misma óptica, misma instalación.",
      "tech.meta.title": "Tecnología — Almenara",
      "tech.meta.desc": "Módulos LED de alta eficacia. Cuatro formatos, con temperatura de color y ángulo de apertura configurables.",
      "tech.eyebrow": "Tecnología",
      "tech.title": "Más luz por vatio, sin tocar la luminaria.",
      "tech.principle.label": "El principio",
      "tech.principle.title": "Más luz, menos calor, la misma luminaria.",
      "tech.specs.title": "La gama.",
      "tech.specs.body": "Temperatura de color y ángulo de apertura configurables. Configuraciones a medida bajo petición.",
      "tech.spec.efficacy": "Eficacia luminosa",
      "tech.spec.energy": "Reducción de consumo frente al estándar",
      "tech.spec.compat": "Compatibilidad",
      "tech.spec.compat_v": "Universal · apta para reforma",
      "tech.spec.temp": "Temperatura de trabajo",
      "tech.spec.cct": "Temperatura de color",
      "tech.spec.cct_v": "Totalmente configurable",
      "tech.spec.cert": "Certificación",
      "tech.specs.note": "Las condiciones de medida y el informe de laboratorio independiente figuran en la ficha técnica.",
      "tech.cta.label": "Siguiente paso",
      "tech.cta.title": "Llévala a tu propio catálogo.",
      "tech.cta.body": "Para fabricantes y estudios de iluminación que estudian incorporar la plataforma a una gama.",
      "tech.cta.btn": "Solicitar la ficha técnica",

      "serv.meta.title": "Servicios — Almenara",
      "serv.meta.desc": "Cuatro formas de trabajar con Almenara: suministro de módulos, reforma de instalaciones, desarrollo a medida y asesoría técnica.",
      "serv.eyebrow": "Servicios",
      "serv.title": "Cuatro formas de trabajar con nosotros.",
      "serv.sub": "Desde suministrar el módulo hasta entregar la luz como servicio. Elige la que encaje con cómo compra tu organización.",
      "serv.list.label": "Qué hacemos",
      "serv.1t": "Suministro de módulos",
      "serv.1b": "Para fabricantes que integran nuestros módulos en sus propias luminarias. Cuatro formatos estándar y geometrías a medida, con ficha técnica y expediente de certificación completos.",
      "serv.2t": "Reforma de instalaciones",
      "serv.2b": "Sustitución de la fuente de luz en instalaciones ya en servicio, sin cambiar la luminaria. Pensada para parques de miles de puntos de luz.",
      "serv.3t": "Luz como servicio",
      "serv.3b": "Sin inversión inicial. Pagas una cuota por la luz y nosotros mantenemos la propiedad del equipo, su mantenimiento y su reciclaje al final de la vida útil. En muchos casos el ahorro supera la cuota desde el primer mes.",
      "serv.4t": "Asesoría técnica",
      "serv.4b": "Estudios fotométricos, coste de ciclo de vida y viabilidad de la reforma. Sin obligación de comprar nada después.",
      "serv.cta.label": "Siguiente paso",
      "serv.cta.title": "Dimensiona tu proyecto en una hora.",
      "serv.cta.body": "Toda colaboración empieza por una llamada técnica. Sin compromiso y sin discurso comercial: ingenieros respondiendo a ingenieros.",
      "serv.cta.btn": "Solicitar una llamada",

      "apps.meta.title": "Aplicaciones — Almenara",
      "apps.meta.desc": "Los sectores para los que está pensada la plataforma Almenara: hostelería, arquitectura, industria, comercio, infraestructura pública y residencial de alta gama.",
      "apps.eyebrow": "Aplicaciones",
      "apps.title": "Donde la luz cuesta dinero.",
      "apps.sub": "El ahorro es mayor cuanta más potencia hay instalada y más horas funciona. La industria y el alumbrado público son los casos extremos; el resto va detrás.",
      "apps.list.label": "Siete sectores",
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
      "apps.cta.body": "La lista no es exhaustiva. Si la iluminación es crítica para tu explotación y ninguno de estos seis la describe, cuéntanoslo.",
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
      "cont.f.note": "Tu mensaje nos llega directamente y queda una copia en nuestro servidor, de modo que no se pierde nada. Respondemos en un día laborable."
    },

    pt: {
      "nav.partners": "Parceiros",
      "part.meta.title": "Parceiros — Almenara",
      "part.meta.desc": "Parceiros da Almenara: licença tecnológica, fabrico sob licença, distribuição e instalação de módulos LED Dicrotec de 275 lm/W (interior, LED 3030). Condições acordadas com cada parceiro.",
      "part.eyebrow": "Parceiros",
      "part.title": "A sua luminária, com tecnologia Dicrotec.",
      "part.sub": "Procuramos fabricantes, distribuidores e instaladores que levem a tecnologia Dicrotec ao seu território. Não fabricamos luminárias. Não competimos com os nossos parceiros.",
      "part.why.label": "Porquê ser parceiro",
      "part.w1t": "275 lm/W",
      "part.w1b": "Módulos interiores Dicrotec, LED 3030. Acima da eficácia que a indústria fixou como objetivo para 2035.",
      "part.w2t": "Patente MX 383389",
      "part.w2b": "Pedida em mais 33 países; concedida, entre outros, nos EUA e na China.",
      "part.w3t": "Visão 2030",
      "part.w3b": "10% do mercado europeu de iluminação LED. Objetivo declarado, não quota conquistada.",
      "part.models.label": "Quatro formas de colaborar",
      "part.1t": "Licença tecnológica",
      "part.1b": "Fabricantes que integram a tecnologia Dicrotec nas suas luminárias, com a sua marca e o selo «Com tecnologia Dicrotec · Almenara LED».",
      "part.2t": "Fabrico sob licença",
      "part.2b": "Grupos industriais que produzem os módulos na sua região, perto dos seus clientes, sob licença.",
      "part.3t": "Distribuição",
      "part.3b": "Distribuidores que vendem os módulos no seu território a fabricantes, instaladores e empresas de manutenção.",
      "part.4t": "Integração e instalação",
      "part.4b": "Empresas de engenharia e instaladores que executam a obra: substituir o módulo em instalações públicas, industriais e comerciais.",
      "part.terms.label": "Condições",
      "part.terms.title": "Cada acordo, à medida do seu mercado.",
      "part.terms.body": "Território, exclusividade e condições económicas são acordados com cada parceiro. Tratam-se em privado. Não se publicam.",
      "part.steps.label": "Como começa",
      "part.s1t": "Apresente-se",
      "part.s1b": "Quem é, onde opera e que forma de colaborar lhe interessa.",
      "part.s2t": "Reunião",
      "part.s2b": "Apresentamos a tecnologia e avaliamos juntos o seu mercado.",
      "part.s3t": "Falemos",
      "part.s3b": "Cada aliança define-se com cada parceiro. Escreva-nos.",
      "part.s3link": "Ir para contacto →",
      "part.cta.label": "Próximo passo",
      "part.cta.title": "Leve a luz ao seu território.",
      "part.cta.body": "Escreva-nos com a sua empresa, o seu território e a forma de colaborar que lhe interessa. Respondemos num dia útil.",
      "part.cta.btn": "Propor uma aliança",

      "apps.7b": "Salas de servidores e corredores técnicos. Funcionam acima da temperatura ambiente para a qual se projecta uma luminária corrente, e o calor encurta a vida do equipamento. Aqui cada watt poupa-se duas vezes: na iluminação e no arrefecimento que já não tem de o retirar.",
      "apps.7t": "Centros de dados",
      "apps.fig2alt": "Retícula de lâmpadas com reflector acesas, vista de baixo",
      "apps.fig2cap": "Pontos de luz",
      "tech.principle.body": "O ganho vem de uma tecnologia própria que consegue aquilo que o sector dava por impossível. E consegue-o sem mudar a luminária: mesma caixa, mesma óptica, mesma instalação.",
      "tech.meta.title": "Tecnologia — Almenara",
      "tech.meta.desc": "Módulos LED de alta eficácia. Quatro formatos, com temperatura de cor e ângulo de abertura configuráveis.",
      "tech.eyebrow": "Tecnologia",
      "tech.title": "Mais luz por watt, sem tocar na luminária.",
      "tech.principle.label": "O princípio",
      "tech.principle.title": "Mais luz, menos calor, a mesma luminária.",
      "tech.specs.title": "A gama.",
      "tech.specs.body": "Temperatura de cor e ângulo de abertura configuráveis. Configurações à medida mediante pedido.",
      "tech.spec.efficacy": "Eficácia luminosa",
      "tech.spec.energy": "Redução de consumo face ao padrão",
      "tech.spec.compat": "Compatibilidade",
      "tech.spec.compat_v": "Universal · apta para remodelação",
      "tech.spec.temp": "Temperatura de funcionamento",
      "tech.spec.cct": "Temperatura de cor",
      "tech.spec.cct_v": "Totalmente configurável",
      "tech.spec.cert": "Certificação",
      "tech.specs.note": "As condições de medição e o relatório de laboratório independente constam da ficha técnica.",
      "tech.cta.label": "Passo seguinte",
      "tech.cta.title": "Leve-a para o seu catálogo.",
      "tech.cta.body": "Para fabricantes e ateliês de iluminação que avaliam integrar a plataforma numa gama.",
      "tech.cta.btn": "Pedir a ficha técnica",

      "serv.meta.title": "Serviços — Almenara",
      "serv.meta.desc": "Quatro formas de trabalhar com a Almenara: fornecimento de módulos, remodelação de instalações, desenvolvimento à medida e consultoria técnica.",
      "serv.eyebrow": "Serviços",
      "serv.title": "Quatro formas de trabalhar connosco.",
      "serv.sub": "Desde fornecer o módulo até entregar a luz como serviço. Escolha a que encaixa na forma como a sua organização compra.",
      "serv.list.label": "O que fazemos",
      "serv.1t": "Fornecimento de módulos",
      "serv.1b": "Para fabricantes que integram os nossos módulos nas suas próprias luminárias. Quatro formatos padrão e geometrias à medida, com ficha técnica e processo de certificação completos.",
      "serv.2t": "Remodelação de instalações",
      "serv.2b": "Substituição da fonte de luz em instalações já em serviço, sem mudar a luminária. Pensada para parques de milhares de pontos de luz.",
      "serv.3t": "Luz como serviço",
      "serv.3b": "Sem investimento inicial. Paga uma quota pela luz e nós mantemos a propriedade do equipamento, a sua manutenção e a sua reciclagem no fim de vida. Em muitos casos a poupança supera a quota logo no primeiro mês.",
      "serv.4t": "Consultoria técnica",
      "serv.4b": "Estudos fotométricos, custo do ciclo de vida e viabilidade da remodelação. Sem obrigação de comprar nada depois.",
      "serv.cta.label": "Passo seguinte",
      "serv.cta.title": "Dimensione o seu projecto numa hora.",
      "serv.cta.body": "Toda a colaboração começa por uma chamada técnica. Sem compromisso e sem discurso comercial: engenheiros a responder a engenheiros.",
      "serv.cta.btn": "Pedir uma chamada",

      "apps.meta.title": "Aplicações — Almenara",
      "apps.meta.desc": "Os sectores para os quais foi pensada a plataforma Almenara: hotelaria, arquitectura, indústria, comércio, infraestruturas públicas e residencial de gama alta.",
      "apps.eyebrow": "Aplicações",
      "apps.title": "Onde a luz custa dinheiro.",
      "apps.sub": "A poupança é maior quanto mais potência há instalada e mais horas funciona. A indústria e a iluminação pública são os casos extremos; o resto vem atrás.",
      "apps.list.label": "Sete sectores",
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
      "apps.cta.body": "A lista não é exaustiva. Se a iluminação é crítica para a sua exploração e nenhum destes seis a descreve, conte-nos.",
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
      "cont.f.note": "A sua mensagem chega-nos directamente e fica uma cópia no nosso servidor, para que nada se perca. Respondemos no prazo de um dia útil."
    },

    fr: {
      "nav.partners": "Partenaires",
      "part.meta.title": "Partenaires — Almenara",
      "part.meta.desc": "Partenaires d'Almenara : licence technologique, fabrication sous licence, distribution et installation de modules LED Dicrotec à 275 lm/W (intérieur, LED 3030). Conditions convenues avec chaque partenaire.",
      "part.eyebrow": "Partenaires",
      "part.title": "Votre luminaire, avec la technologie Dicrotec.",
      "part.sub": "Nous recherchons des fabricants, distributeurs et installateurs pour porter la technologie Dicrotec sur leur territoire. Nous ne fabriquons pas de luminaires. Nous ne concurrençons pas nos partenaires.",
      "part.why.label": "Pourquoi devenir partenaire",
      "part.w1t": "275 lm/W",
      "part.w1b": "Modules intérieurs Dicrotec, LED 3030. Au-delà de l'efficacité que l'industrie s'est fixée comme objectif pour 2035.",
      "part.w2t": "Brevet MX 383389",
      "part.w2b": "Demandé dans 33 autres pays ; délivré, entre autres, aux États-Unis et en Chine.",
      "part.w3t": "Vision 2030",
      "part.w3b": "10 % du marché européen de l'éclairage LED. Un objectif déclaré, non une part acquise.",
      "part.models.label": "Quatre façons de collaborer",
      "part.1t": "Licence technologique",
      "part.1b": "Fabricants qui intègrent la technologie Dicrotec dans leurs luminaires, sous leur marque et avec le label « Avec la technologie Dicrotec · Almenara LED ».",
      "part.2t": "Fabrication sous licence",
      "part.2b": "Groupes industriels qui produisent les modules dans leur région, près de leurs clients, sous licence.",
      "part.3t": "Distribution",
      "part.3b": "Distributeurs qui vendent les modules sur leur territoire aux fabricants, installateurs et mainteneurs.",
      "part.4t": "Intégration et installation",
      "part.4b": "Bureaux d'études et installateurs qui réalisent l'ouvrage : remplacer le module dans des installations publiques, industrielles et commerciales.",
      "part.terms.label": "Conditions",
      "part.terms.title": "Chaque accord, à la mesure de son marché.",
      "part.terms.body": "Territoire, exclusivité et conditions économiques sont convenus avec chaque partenaire. Ils se discutent en privé. Ils ne sont pas publiés.",
      "part.steps.label": "Comment cela commence",
      "part.s1t": "Présentez-vous",
      "part.s1b": "Qui vous êtes, où vous opérez et quelle forme de collaboration vous intéresse.",
      "part.s2t": "Réunion",
      "part.s2b": "Nous présentons la technologie et évaluons ensemble votre marché.",
      "part.s3t": "Parlons-en",
      "part.s3b": "Chaque alliance se définit avec chaque partenaire. Écrivez-nous.",
      "part.s3link": "Aller au contact →",
      "part.cta.label": "Étape suivante",
      "part.cta.title": "Portez la lumière sur votre territoire.",
      "part.cta.body": "Écrivez-nous en indiquant votre entreprise, votre territoire et la forme de collaboration qui vous intéresse. Nous répondons sous un jour ouvré.",
      "part.cta.btn": "Proposer une alliance",

      "apps.7b": "Salles de serveurs et allées techniques. Elles fonctionnent au-dessus de la température ambiante pour laquelle un luminaire courant est conçu, et la chaleur abrège la vie du matériel. Ici, chaque watt est économisé deux fois : sur l'éclairage et sur le refroidissement qui n'a plus à l'évacuer.",
      "apps.7t": "Centres de données",
      "apps.fig2alt": "Grille de lampes à réflecteur allumées, vue d'en bas",
      "apps.fig2cap": "Points lumineux",
      "tech.principle.body": "Le gain vient d'une technologie qui nous est propre et qui obtient ce que le secteur tenait pour impossible. Et cela sans changer le luminaire : même carter, même optique, même installation.",
      "tech.meta.title": "Technologie — Almenara",
      "tech.meta.desc": "Modules LED à haute efficacité. Quatre formats, température de couleur et angle d'ouverture configurables.",
      "tech.eyebrow": "Technologie",
      "tech.title": "Plus de lumière par watt, sans toucher au luminaire.",
      "tech.principle.label": "Le principe",
      "tech.principle.title": "Plus de lumière, moins de chaleur, le même luminaire.",
      "tech.specs.title": "La gamme.",
      "tech.specs.body": "Température de couleur et angle d'ouverture configurables. Configurations sur mesure sur demande.",
      "tech.spec.efficacy": "Efficacité lumineuse",
      "tech.spec.energy": "Réduction de consommation par rapport au standard",
      "tech.spec.compat": "Compatibilité",
      "tech.spec.compat_v": "Universelle · apte à la rénovation",
      "tech.spec.temp": "Température de fonctionnement",
      "tech.spec.cct": "Température de couleur",
      "tech.spec.cct_v": "Entièrement configurable",
      "tech.spec.cert": "Certification",
      "tech.specs.note": "Les conditions de mesure et le rapport de laboratoire indépendant figurent dans la fiche technique.",
      "tech.cta.label": "Étape suivante",
      "tech.cta.title": "Intégrez-la à votre catalogue.",
      "tech.cta.body": "Pour les fabricants et les agences de conception lumière qui étudient l'intégration de la plateforme dans une gamme.",
      "tech.cta.btn": "Demander la fiche technique",

      "serv.meta.title": "Services — Almenara",
      "serv.meta.desc": "Quatre façons de travailler avec Almenara : fourniture de modules, rénovation d'installations, développement sur mesure et conseil technique.",
      "serv.eyebrow": "Services",
      "serv.title": "Quatre façons de travailler avec nous.",
      "serv.sub": "De la fourniture du module à la livraison de la lumière comme service. Choisissez celle qui correspond à votre façon d'acheter.",
      "serv.list.label": "Ce que nous faisons",
      "serv.1t": "Fourniture de modules",
      "serv.1b": "Pour les fabricants qui intègrent nos modules dans leurs propres luminaires. Quatre formats standard et géométries sur mesure, avec fiche technique et dossier de certification complets.",
      "serv.2t": "Rénovation d'installations",
      "serv.2b": "Remplacement de la source dans des installations déjà en service, sans changer le luminaire. Conçu pour des parcs de milliers de points lumineux.",
      "serv.3t": "La lumière comme service",
      "serv.3b": "Sans investissement initial. Vous payez un abonnement pour la lumière et nous conservons la propriété du matériel, son entretien et son recyclage en fin de vie. Dans bien des cas, l'économie dépasse l'abonnement dès le premier mois.",
      "serv.4t": "Conseil technique",
      "serv.4b": "Études photométriques, coût du cycle de vie et faisabilité de la rénovation. Sans obligation d'achat ensuite.",
      "serv.cta.label": "Étape suivante",
      "serv.cta.title": "Cadrez votre projet en une heure.",
      "serv.cta.body": "Toute collaboration commence par un appel technique. Sans engagement et sans discours commercial : des ingénieurs qui répondent à des ingénieurs.",
      "serv.cta.btn": "Demander un appel",

      "apps.meta.title": "Applications — Almenara",
      "apps.meta.desc": "Les secteurs auxquels la plateforme Almenara est destinée : hôtellerie, architecture, industrie, commerce, infrastructures publiques et résidentiel haut de gamme.",
      "apps.eyebrow": "Applications",
      "apps.title": "Là où la lumière coûte de l'argent.",
      "apps.sub": "L'économie augmente avec la puissance installée et les heures de fonctionnement. L'industrie et la voirie sont les cas extrêmes ; le reste suit.",
      "apps.list.label": "Sept secteurs",
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
      "apps.cta.body": "La liste n'est pas exhaustive. Si l'éclairage est critique pour votre exploitation et qu'aucun de ces six ne la décrit, parlez-nous-en.",
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
      "cont.f.note": "Votre message nous parvient directement et une copie reste sur notre serveur, de sorte que rien ne se perd. Nous répondons sous un jour ouvré."
    },

    de: {
      "nav.partners": "Partner",
      "part.meta.title": "Partner — Almenara",
      "part.meta.desc": "Partner von Almenara: Technologielizenz, Lizenzfertigung, Vertrieb und Installation von Dicrotec-LED-Modulen mit 275 lm/W (innen, LED 3030). Konditionen werden mit jedem Partner vereinbart.",
      "part.eyebrow": "Partner",
      "part.title": "Ihre Leuchte, mit Dicrotec-Technologie.",
      "part.sub": "Wir suchen Hersteller, Distributoren und Installateure, die die Dicrotec-Technologie in ihr Gebiet bringen. Wir stellen keine Leuchten her. Wir konkurrieren nicht mit unseren Partnern.",
      "part.why.label": "Warum Partner werden",
      "part.w1t": "275 lm/W",
      "part.w1b": "Dicrotec-Innenmodule, LED 3030. Über der Effizienz, die sich die Branche als Ziel für 2035 gesetzt hat.",
      "part.w2t": "Patent MX 383389",
      "part.w2b": "In 33 weiteren Ländern angemeldet; erteilt unter anderem in den USA und in China.",
      "part.w3t": "Vision 2030",
      "part.w3b": "10 % des europäischen Marktes für LED-Beleuchtung. Ein erklärtes Ziel, kein erreichter Anteil.",
      "part.models.label": "Vier Wege der Zusammenarbeit",
      "part.1t": "Technologielizenz",
      "part.1b": "Hersteller, die die Dicrotec-Technologie in ihre Leuchten integrieren, unter eigener Marke und mit dem Siegel „Mit Dicrotec-Technologie · Almenara LED“.",
      "part.2t": "Lizenzfertigung",
      "part.2b": "Industriegruppen, die die Module in ihrer Region fertigen, nah an ihren Kunden, unter Lizenz.",
      "part.3t": "Vertrieb",
      "part.3b": "Distributoren, die die Module in ihrem Gebiet an Hersteller, Installateure und Wartungsbetriebe verkaufen.",
      "part.4t": "Integration und Installation",
      "part.4b": "Ingenieurbüros und Installateure, die das Werk ausführen: den Modultausch in öffentlichen, industriellen und gewerblichen Anlagen.",
      "part.terms.label": "Konditionen",
      "part.terms.title": "Jede Vereinbarung, gemacht für ihren Markt.",
      "part.terms.body": "Gebiet, Exklusivität und wirtschaftliche Konditionen werden mit jedem Partner vereinbart. Sie werden vertraulich besprochen. Sie werden nicht veröffentlicht.",
      "part.steps.label": "So beginnt es",
      "part.s1t": "Stellen Sie sich vor",
      "part.s1b": "Wer Sie sind, wo Sie tätig sind und welche Form der Zusammenarbeit Sie interessiert.",
      "part.s2t": "Gespräch",
      "part.s2b": "Wir stellen die Technologie vor und bewerten gemeinsam Ihren Markt.",
      "part.s3t": "Sprechen wir",
      "part.s3b": "Jede Allianz wird mit jedem Partner festgelegt. Schreiben Sie uns.",
      "part.s3link": "Zum Kontakt →",
      "part.cta.label": "Nächster Schritt",
      "part.cta.title": "Bringen Sie das Licht in Ihr Gebiet.",
      "part.cta.body": "Schreiben Sie uns mit Ihrem Unternehmen, Ihrem Gebiet und der Form der Zusammenarbeit, die Sie interessiert. Wir antworten innerhalb eines Werktags.",
      "part.cta.btn": "Allianz vorschlagen",

      "apps.7b": "Serverräume und technische Gänge. Sie laufen oberhalb der Umgebungstemperatur, für die eine übliche Leuchte ausgelegt ist, und Wärme verkürzt die Lebensdauer der Geräte. Hier wird jedes Watt zweimal gespart: bei der Beleuchtung und bei der Kühlung, die es nicht mehr abführen muss.",
      "apps.7t": "Rechenzentren",
      "apps.fig2alt": "Raster eingeschalteter Reflektorlampen, von unten gesehen",
      "apps.fig2cap": "Lichtpunkte",
      "tech.principle.body": "Der Gewinn stammt aus einer eigenen Technologie, die leistet, was die Branche für unmöglich hielt. Und zwar ohne die Leuchte zu wechseln: gleiches Gehäuse, gleiche Optik, gleiche Montage.",
      "tech.meta.title": "Technologie — Almenara",
      "tech.meta.desc": "LED-Module mit hoher Lichtausbeute. Vier Formate, Farbtemperatur und Abstrahlwinkel konfigurierbar.",
      "tech.eyebrow": "Technologie",
      "tech.title": "Mehr Licht pro Watt, ohne die Leuchte anzurühren.",
      "tech.principle.label": "Das Prinzip",
      "tech.principle.title": "Mehr Licht, weniger Wärme, dieselbe Leuchte.",
      "tech.specs.title": "Die Reihe.",
      "tech.specs.body": "Farbtemperatur und Abstrahlwinkel konfigurierbar. Sonderkonfigurationen auf Anfrage.",
      "tech.spec.efficacy": "Lichtausbeute",
      "tech.spec.energy": "Verbrauchsminderung gegenüber dem Standard",
      "tech.spec.compat": "Kompatibilität",
      "tech.spec.compat_v": "Universell · nachrüstbar",
      "tech.spec.temp": "Betriebstemperatur",
      "tech.spec.cct": "Farbtemperatur",
      "tech.spec.cct_v": "Vollständig konfigurierbar",
      "tech.spec.cert": "Zertifizierung",
      "tech.specs.note": "Die Messbedingungen und der Bericht des unabhängigen Labors stehen im Datenblatt.",
      "tech.cta.label": "Nächster Schritt",
      "tech.cta.title": "Nehmen Sie sie in Ihr Sortiment auf.",
      "tech.cta.body": "Für Hersteller und Lichtplanungsbüros, die die Plattform für eine Produktlinie prüfen.",
      "tech.cta.btn": "Datenblatt anfordern",

      "serv.meta.title": "Leistungen — Almenara",
      "serv.meta.desc": "Vier Wege der Zusammenarbeit mit Almenara: Modullieferung, Sanierung bestehender Anlagen, Sonderentwicklung und technische Beratung.",
      "serv.eyebrow": "Leistungen",
      "serv.title": "Vier Wege der Zusammenarbeit.",
      "serv.sub": "Von der Lieferung des Moduls bis zur Bereitstellung von Licht als Dienstleistung. Wählen Sie, was zu Ihrer Beschaffung passt.",
      "serv.list.label": "Was wir tun",
      "serv.1t": "Modullieferung",
      "serv.1b": "Für Hersteller, die unsere Module in ihre eigenen Leuchten einbauen. Vier Standardformate und Sondergeometrien, mit vollständigem Datenblatt und Zertifizierungsunterlagen.",
      "serv.2t": "Sanierung bestehender Anlagen",
      "serv.2b": "Austausch der Lichtquelle in laufenden Anlagen, ohne die Leuchte zu wechseln. Gedacht für Bestände mit Tausenden von Lichtpunkten.",
      "serv.3t": "Licht als Dienstleistung",
      "serv.3b": "Ohne Anfangsinvestition. Sie zahlen eine Gebühr für das Licht, und wir behalten Eigentum, Wartung und Recycling der Anlage am Lebensende. Vielfach übersteigt die Ersparnis die Gebühr schon im ersten Monat.",
      "serv.4t": "Technische Beratung",
      "serv.4b": "Lichttechnische Studien, Lebenszykluskosten und Machbarkeit der Nachrüstung. Ohne anschließende Kaufverpflichtung.",
      "serv.cta.label": "Nächster Schritt",
      "serv.cta.title": "Ihr Projekt in einer Stunde ausgelegt.",
      "serv.cta.body": "Jede Zusammenarbeit beginnt mit einem technischen Gespräch. Ohne Verpflichtung und ohne Verkaufsrede: Ingenieure antworten Ingenieuren.",
      "serv.cta.btn": "Gespräch anfragen",

      "apps.meta.title": "Anwendungen — Almenara",
      "apps.meta.desc": "Die Bereiche, für die die Almenara-Plattform gedacht ist: Hotellerie, Architektur, Industrie, Handel, öffentliche Infrastruktur und gehobenes Wohnen.",
      "apps.eyebrow": "Anwendungen",
      "apps.title": "Wo Licht Geld kostet.",
      "apps.sub": "Die Ersparnis wächst mit der installierten Leistung und den Betriebsstunden. Industrie und Straßenbeleuchtung sind die Extremfälle; alles andere folgt.",
      "apps.list.label": "Sieben Bereiche",
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
      "apps.cta.body": "Die Liste ist nicht abschließend. Wenn Licht für Ihren Betrieb entscheidend ist und keiner dieser sechs Bereiche ihn beschreibt, erzählen Sie es uns.",
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
      "cont.f.note": "Ihre Nachricht erreicht uns direkt, und eine Kopie bleibt auf unserem Server, damit nichts verloren geht. Wir antworten innerhalb eines Werktags."
    },

    it: {
      "nav.partners": "Partner",
      "part.meta.title": "Partner — Almenara",
      "part.meta.desc": "Partner di Almenara: licenza tecnologica, produzione su licenza, distribuzione e installazione di moduli LED Dicrotec da 275 lm/W (interni, LED 3030). Condizioni concordate con ogni partner.",
      "part.eyebrow": "Partner",
      "part.title": "Il suo apparecchio, con tecnologia Dicrotec.",
      "part.sub": "Cerchiamo produttori, distributori e installatori che portino la tecnologia Dicrotec nel proprio territorio. Non produciamo apparecchi. Non competiamo con i nostri partner.",
      "part.why.label": "Perché diventare partner",
      "part.w1t": "275 lm/W",
      "part.w1b": "Moduli per interni Dicrotec, LED 3030. Oltre l'efficienza che l'industria ha fissato come obiettivo per il 2035.",
      "part.w2t": "Brevetto MX 383389",
      "part.w2b": "Richiesto in altri 33 paesi; concesso, tra gli altri, negli Stati Uniti e in Cina.",
      "part.w3t": "Visione 2030",
      "part.w3b": "Il 10% del mercato europeo dell'illuminazione LED. Obiettivo dichiarato, non quota raggiunta.",
      "part.models.label": "Quattro modi di collaborare",
      "part.1t": "Licenza tecnologica",
      "part.1b": "Produttori che integrano la tecnologia Dicrotec nei propri apparecchi, con il proprio marchio e il sigillo «Con tecnologia Dicrotec · Almenara LED».",
      "part.2t": "Produzione su licenza",
      "part.2b": "Gruppi industriali che producono i moduli nella propria regione, vicino ai clienti, su licenza.",
      "part.3t": "Distribuzione",
      "part.3b": "Distributori che vendono i moduli nel proprio territorio a produttori, installatori e manutentori.",
      "part.4t": "Integrazione e installazione",
      "part.4b": "Società di ingegneria e installatori che eseguono l'opera: sostituire il modulo in impianti pubblici, industriali e commerciali.",
      "part.terms.label": "Condizioni",
      "part.terms.title": "Ogni accordo, su misura del suo mercato.",
      "part.terms.body": "Territorio, esclusiva e condizioni economiche si concordano con ogni partner. Si discutono in privato. Non si pubblicano.",
      "part.steps.label": "Come si inizia",
      "part.s1t": "Si presenti",
      "part.s1b": "Chi è, dove opera e quale forma di collaborazione le interessa.",
      "part.s2t": "Incontro",
      "part.s2b": "Presentiamo la tecnologia e valutiamo insieme il suo mercato.",
      "part.s3t": "Parliamone",
      "part.s3b": "Ogni alleanza si definisce con ciascun partner. Ci scriva.",
      "part.s3link": "Vai ai contatti →",
      "part.cta.label": "Prossimo passo",
      "part.cta.title": "Porti la luce nel suo territorio.",
      "part.cta.body": "Ci scriva indicando la sua azienda, il suo territorio e la forma di collaborazione che le interessa. Rispondiamo entro un giorno lavorativo.",
      "part.cta.btn": "Proporre un'alleanza",

      "apps.7b": "Sale server e corsie tecniche. Lavorano al di sopra della temperatura ambiente per cui è progettato un apparecchio comune, e il calore accorcia la vita dei componenti. Qui ogni watt si risparmia due volte: sull'illuminazione e sul raffreddamento che non deve più smaltirlo.",
      "apps.7t": "Centri dati",
      "apps.fig2alt": "Griglia di lampade con riflettore accese, vista dal basso",
      "apps.fig2cap": "Punti luce",
      "tech.principle.body": "Il guadagno nasce da una tecnologia nostra che ottiene ciò che il settore dava per impossibile. E lo fa senza cambiare l'apparecchio: stesso corpo, stessa ottica, stessa installazione.",
      "tech.meta.title": "Tecnologia — Almenara",
      "tech.meta.desc": "Moduli LED ad alta efficienza. Quattro formati, con temperatura di colore e angolo di apertura configurabili.",
      "tech.eyebrow": "Tecnologia",
      "tech.title": "Più luce per watt, senza toccare l'apparecchio.",
      "tech.principle.label": "Il principio",
      "tech.principle.title": "Più luce, meno calore, lo stesso apparecchio.",
      "tech.specs.title": "La gamma.",
      "tech.specs.body": "Temperatura di colore e angolo di apertura configurabili. Configurazioni su misura su richiesta.",
      "tech.spec.efficacy": "Efficienza luminosa",
      "tech.spec.energy": "Riduzione dei consumi rispetto allo standard",
      "tech.spec.compat": "Compatibilità",
      "tech.spec.compat_v": "Universale · adatta alla riqualificazione",
      "tech.spec.temp": "Temperatura di esercizio",
      "tech.spec.cct": "Temperatura di colore",
      "tech.spec.cct_v": "Completamente configurabile",
      "tech.spec.cert": "Certificazione",
      "tech.specs.note": "Le condizioni di misura e il rapporto del laboratorio indipendente sono riportati nella scheda tecnica.",
      "tech.cta.label": "Passo successivo",
      "tech.cta.title": "Portala nel tuo catalogo.",
      "tech.cta.body": "Per produttori e studi di illuminazione che valutano di integrare la piattaforma in una gamma.",
      "tech.cta.btn": "Richiedi la scheda tecnica",

      "serv.meta.title": "Servizi — Almenara",
      "serv.meta.desc": "Quattro modi di lavorare con Almenara: fornitura di moduli, riqualificazione di impianti, sviluppo su misura e consulenza tecnica.",
      "serv.eyebrow": "Servizi",
      "serv.title": "Quattro modi di lavorare con noi.",
      "serv.sub": "Dalla fornitura del modulo alla consegna della luce come servizio. Scegli quella che si adatta a come acquista la tua organizzazione.",
      "serv.list.label": "Cosa facciamo",
      "serv.1t": "Fornitura di moduli",
      "serv.1b": "Per produttori che integrano i nostri moduli nei propri apparecchi. Quattro formati standard e geometrie su misura, con scheda tecnica e fascicolo di certificazione completi.",
      "serv.2t": "Riqualificazione di impianti",
      "serv.2b": "Sostituzione della sorgente luminosa in impianti già in servizio, senza cambiare l'apparecchio. Pensata per parchi di migliaia di punti luce.",
      "serv.3t": "Luce come servizio",
      "serv.3b": "Senza investimento iniziale. Paghi un canone per la luce e noi manteniamo la proprietà dell'impianto, la sua manutenzione e il suo riciclo a fine vita. In molti casi il risparmio supera il canone già dal primo mese.",
      "serv.4t": "Consulenza tecnica",
      "serv.4b": "Studi fotometrici, costo del ciclo di vita e fattibilità dell'intervento. Senza obbligo di acquisto successivo.",
      "serv.cta.label": "Passo successivo",
      "serv.cta.title": "Dimensiona il progetto in un'ora.",
      "serv.cta.body": "Ogni collaborazione inizia con una chiamata tecnica. Senza impegno e senza discorso commerciale: ingegneri che rispondono a ingegneri.",
      "serv.cta.btn": "Richiedi una chiamata",

      "apps.meta.title": "Applicazioni — Almenara",
      "apps.meta.desc": "I settori per cui è pensata la piattaforma Almenara: ospitalità, architettura, industria, retail, infrastrutture pubbliche e residenziale di alta gamma.",
      "apps.eyebrow": "Applicazioni",
      "apps.title": "Dove la luce costa denaro.",
      "apps.sub": "Il risparmio è tanto maggiore quanta più potenza è installata e più ore funziona. Industria e illuminazione stradale sono i casi estremi; il resto viene dopo.",
      "apps.list.label": "Sette settori",
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
      "apps.cta.body": "L'elenco non è esaustivo. Se l'illuminazione è critica per la tua attività e nessuno di questi sei la descrive, raccontacelo.",
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
      "cont.f.note": "Il tuo messaggio ci arriva direttamente e una copia resta sul nostro server, così non si perde nulla. Rispondiamo entro un giorno lavorativo."
    },

    ru: {
      "nav.partners": "Партнёрам",
      "part.meta.title": "Партнёрам — Almenara",
      "part.meta.desc": "Партнёрство с Almenara: технологическая лицензия, производство по лицензии, дистрибуция и монтаж светодиодных модулей Dicrotec 275 лм/Вт (для помещений, LED 3030). Условия согласуются с каждым партнёром.",
      "part.eyebrow": "Партнёрам",
      "part.title": "Ваш светильник — с технологией Dicrotec.",
      "part.sub": "Мы ищем производителей, дистрибьюторов и монтажные компании, которые выведут технологию Dicrotec на свою территорию. Мы не производим светильники. Мы не конкурируем с нашими партнёрами.",
      "part.why.label": "Почему стоит стать партнёром",
      "part.w1t": "275 лм/Вт",
      "part.w1b": "Модули Dicrotec для помещений, LED 3030. Выше эффективности, которую отрасль наметила как цель на 2035 год.",
      "part.w2t": "Патент MX 383389",
      "part.w2b": "Заявлен ещё в 33 странах; выдан, в частности, в США и Китае.",
      "part.w3t": "Видение 2030",
      "part.w3b": "10% европейского рынка светодиодного освещения. Заявленная цель, а не достигнутая доля.",
      "part.models.label": "Четыре формы сотрудничества",
      "part.1t": "Технологическая лицензия",
      "part.1b": "Производители, которые встраивают технологию Dicrotec в свои светильники под своей маркой и со знаком «С технологией Dicrotec · Almenara LED».",
      "part.2t": "Производство по лицензии",
      "part.2b": "Промышленные группы, которые выпускают модули в своём регионе, рядом с клиентами, по лицензии.",
      "part.3t": "Дистрибуция",
      "part.3b": "Дистрибьюторы, которые продают модули на своей территории производителям, монтажным и сервисным компаниям.",
      "part.4t": "Интеграция и монтаж",
      "part.4b": "Инжиниринговые и монтажные компании, которые выполняют работы: замену модуля на общественных, промышленных и коммерческих объектах.",
      "part.terms.label": "Условия",
      "part.terms.title": "Каждое соглашение — под свой рынок.",
      "part.terms.body": "Территория, эксклюзивность и экономические условия согласуются с каждым партнёром. Они обсуждаются конфиденциально. Они не публикуются.",
      "part.steps.label": "С чего начать",
      "part.s1t": "Представьтесь",
      "part.s1b": "Кто вы, где работаете и какая форма сотрудничества вас интересует.",
      "part.s2t": "Встреча",
      "part.s2b": "Мы представляем технологию и вместе оцениваем ваш рынок.",
      "part.s3t": "Давайте обсудим",
      "part.s3b": "Каждый альянс определяется вместе с партнёром. Напишите нам.",
      "part.s3link": "Перейти к контактам →",
      "part.cta.label": "Следующий шаг",
      "part.cta.title": "Принесите свет на свою территорию.",
      "part.cta.body": "Напишите нам, указав компанию, территорию и интересующую форму сотрудничества. Мы отвечаем в течение одного рабочего дня.",
      "part.cta.btn": "Предложить альянс",

      "apps.7b": "Серверные залы и технические проходы. Они работают выше температуры среды, на которую рассчитан обычный светильник, и тепло сокращает срок службы оборудования. Здесь каждый ватт экономится дважды: на освещении и на охлаждении, которому его больше не нужно отводить.",
      "apps.7t": "Центры обработки данных",
      "apps.fig2alt": "Сетка включённых ламп с отражателями, вид снизу",
      "apps.fig2cap": "Световые точки",
      "tech.principle.body": "Выигрыш даёт наша собственная технология, добивающаяся того, что отрасль считала невозможным. И добивается, не меняя светильник: тот же корпус, та же оптика, тот же монтаж.",
      "tech.meta.title": "Технология — Almenara",
      "tech.meta.desc": "Светодиодные модули с высокой отдачей. Четыре формата, настраиваемые цветовая температура и угол раскрытия.",
      "tech.eyebrow": "Технология",
      "tech.title": "Больше света на ватт, не трогая светильник.",
      "tech.principle.label": "Принцип",
      "tech.principle.title": "Больше света, меньше тепла, тот же светильник.",
      "tech.specs.title": "Линейка.",
      "tech.specs.body": "Цветовая температура и угол раскрытия настраиваются. Особые конфигурации по запросу.",
      "tech.spec.efficacy": "Световая отдача",
      "tech.spec.energy": "Снижение потребления против стандарта",
      "tech.spec.compat": "Совместимость",
      "tech.spec.compat_v": "Универсальная · пригодна для замены",
      "tech.spec.temp": "Рабочая температура",
      "tech.spec.cct": "Цветовая температура",
      "tech.spec.cct_v": "Полностью настраиваемая",
      "tech.spec.cert": "Сертификация",
      "tech.specs.note": "Условия измерения и протокол независимой лаборатории приведены в техническом описании.",
      "tech.cta.label": "Следующий шаг",
      "tech.cta.title": "Внесите её в свой каталог.",
      "tech.cta.body": "Для производителей и светотехнических бюро, рассматривающих платформу для продуктовой линейки.",
      "tech.cta.btn": "Запросить техническое описание",

      "serv.meta.title": "Услуги — Almenara",
      "serv.meta.desc": "Четыре формы работы с Almenara: поставка модулей, модернизация установок, разработка под заказ и техническое консультирование.",
      "serv.eyebrow": "Услуги",
      "serv.title": "Четыре формы работы с нами.",
      "serv.sub": "От поставки модуля до предоставления света как услуги. Выберите то, что подходит вашему порядку закупок.",
      "serv.list.label": "Чем мы занимаемся",
      "serv.1t": "Поставка модулей",
      "serv.1b": "Для производителей, встраивающих наши модули в собственные светильники. Четыре типовых формата и геометрия под заказ, с полным техническим описанием и сертификационным делом.",
      "serv.2t": "Модернизация установок",
      "serv.2b": "Замена источника света в действующих установках без смены светильника. Рассчитано на парки в тысячи световых точек.",
      "serv.3t": "Свет как услуга",
      "serv.3b": "Без начальных вложений. Вы платите за свет, а оборудование, его обслуживание и утилизация по окончании срока остаются за нами. Во многих случаях экономия превышает платёж уже с первого месяца.",
      "serv.4t": "Техническое консультирование",
      "serv.4b": "Светотехнические расчёты, стоимость жизненного цикла и оценка выполнимости. Без обязательства что-либо покупать.",
      "serv.cta.label": "Следующий шаг",
      "serv.cta.title": "Оценим проект за час.",
      "serv.cta.body": "Любое сотрудничество начинается с технического разговора. Без обязательств и без продающих речей: инженеры отвечают инженерам.",
      "serv.cta.btn": "Запросить разговор",

      "apps.meta.title": "Применение — Almenara",
      "apps.meta.desc": "Отрасли, для которых предназначена платформа Almenara: гостиницы, архитектура, промышленность, торговля, общественная инфраструктура и жильё высокого класса.",
      "apps.eyebrow": "Применение",
      "apps.title": "Там, где свет стоит денег.",
      "apps.sub": "Экономия тем больше, чем выше установленная мощность и дольше часы работы. Промышленность и уличное освещение — крайние случаи; остальное следом.",
      "apps.list.label": "Семь отраслей",
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
      "apps.cta.body": "Перечень не исчерпывающий. Если освещение критично для вашей работы, а ни одна из этих шести не описывает её, расскажите нам.",
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
      "cont.f.note": "Ваше сообщение приходит к нам напрямую, а копия остаётся на нашем сервере, чтобы ничего не потерялось. Отвечаем в течение одного рабочего дня."
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
    // "none" en las páginas legales: llevan título propio en español y no
    // deben heredar el de la portada al cambiar de idioma.
    const titulo = p === 'none' ? null : t(lang, p + '.title');
    const desc = p === 'none' ? null : t(lang, p + '.desc');

    if (titulo) document.title = titulo;
    if (desc) setMeta('meta[name="description"]', desc);
    if (titulo) setMeta('meta[property="og:title"]', titulo);
    if (desc) setMeta('meta[property="og:description"]', desc);
    setMeta('meta[property="og:locale"]', t(lang, 'meta.locale'));
    if (titulo) setMeta('meta[name="twitter:title"]', titulo);
    if (desc) setMeta('meta[name="twitter:description"]', desc);

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

    // Quien se haya apuntado recibe aviso del cambio de idioma: lo usa la
    // calculadora para volver a formatear las cifras con la coma o el punto
    // decimal que corresponda a cada lengua.
    (window.SITE && window.SITE._oyentes || []).forEach(function (f) {
      try { f(lang); } catch (e) {}
    });
  }

  /* --- Interfaz mínima para las piezas que se cargan aparte ---------------- */
  window.SITE = {
    _oyentes: [],
    // Añade un diccionario propio al de la web
    addDict: function (extra) {
      Object.keys(extra).forEach(function (l) {
        if (I18N[l]) Object.assign(I18N[l], extra[l]);
        else I18N[l] = extra[l];
      });
    },
    lang: function () { return document.documentElement.getAttribute('lang') || 'en'; },
    apply: function () { applyLang(window.SITE.lang(), false); },
    onLang: function (f) { window.SITE._oyentes.push(f); }
  };

  function initialLang() {
    const fijo = document.documentElement.getAttribute('data-lang-static');
    if (fijo && LANGS.indexOf(fijo) > -1) return fijo;
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
    btn.addEventListener('click', function () {
      // En las páginas ya traducidas el botón es un enlace a la otra versión:
      // se recuerda la elección y se deja que el navegador vaya.
      if (btn.tagName === 'A') {
        try { localStorage.setItem('site.lang', btn.dataset.lang); } catch (e) {}
        return;
      }
      applyLang(btn.dataset.lang, true);
    });
  });

  (function () {
    const nav = document.querySelector('.site-nav');
    if (nav && !nav.querySelector('a[href="calculator.html"]')) {
      const a = document.createElement('a');
      a.href = 'calculator.html';
      a.setAttribute('data-i18n', 'nav.calc');
      a.textContent = 'Calculator';
      nav.insertBefore(a, nav.lastElementChild);
    }
    const pie = document.querySelector('.footer-top .footer-links');
    if (pie && !pie.querySelector('a[href="calculator.html"]')) {
      const a = document.createElement('a');
      a.href = 'calculator.html';
      a.setAttribute('data-i18n', 'nav.calc');
      a.textContent = 'Calculator';
      pie.insertBefore(a, pie.lastElementChild);
    }
  })();

  applyLang(initialLang(), false);

  /* --- Tema --------------------------------------------------------------- */
  // Se retiró el modo oscuro. El botón sigue en el HTML de las seis páginas,
  // así que se elimina desde aquí: si solo se ocultara con CSS seguiría
  // estando en el orden de tabulación y los lectores de pantalla lo leerían.
  (function () {
    const b = document.querySelector('[data-theme-toggle]');
    if (b) b.remove();
    try { localStorage.removeItem('site.theme'); } catch (e) {}
  })();

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

  /* ========================================================================
     LUZ INTERACTIVA
     La página se comporta como una luminaria: tiene temperatura de color
     ajustable, el cursor la ilumina y el haz reacciona al desplazamiento.
     Nada de esto toca el HTML: se inserta desde aquí, así que las cinco
     páginas lo heredan sin modificarlas.
     ======================================================================== */
  (function () {
    const mqR = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    const quieto = !!(mqR && mqR.matches);
    const raiz = document.documentElement;

    /* --- Capas decorativas ---------------------------------------------- */
    function capa(clase, dentro) {
      const el = document.createElement('div');
      el.className = clase;
      el.setAttribute('aria-hidden', 'true');
      (dentro || document.body).insertBefore(el, (dentro || document.body).firstChild);
      return el;
    }
    const grano = capa('grain');
    const luz = capa('pointer-light');
    const hero = document.querySelector('.hero, .page-head');
    if (hero) capa('beam', hero);

    /* --- Temperatura de color -------------------------------------------
       Aproximación del color de un cuerpo negro entre 2700 K y 6500 K.
       Cinco puntos de anclaje e interpolación lineal entre ellos: suficiente
       para que la transición se lea como un atenuador real. ---------------- */
    const ANCLAS = [
      [2700, [255, 154,  60]],
      [3500, [255, 187, 110]],
      [4500, [255, 218, 170]],
      [5500, [246, 240, 235]],
      [6500, [206, 224, 255]]
    ];

    function colorDe(k) {
      for (let i = 0; i < ANCLAS.length - 1; i++) {
        const [k1, c1] = ANCLAS[i], [k2, c2] = ANCLAS[i + 1];
        if (k <= k2) {
          const t = (k - k1) / (k2 - k1);
          const c = c1.map(function (v, j) { return Math.round(v + (c2[j] - v) * t); });
          return 'rgb(' + c.join(' ') + ')';
        }
      }
      return 'rgb(' + ANCLAS[ANCLAS.length - 1][1].join(' ') + ')';
    }

    function aplicarCCT(k) {
      raiz.style.setProperty('--cct', colorDe(k));
      const salida = document.querySelector('.cct-value');
      if (salida) salida.textContent = k + ' K';
      try { localStorage.setItem('site.cct', String(k)); } catch (e) {}
    }

    // El mando vive en la escala de eficacia de la portada; si no está esa
    // sección, no se inserta nada y la web funciona igual.
    const escala = document.querySelector('.scale');
    if (escala) {
      const guardado = (function () {
        try { return parseInt(localStorage.getItem('site.cct'), 10); } catch (e) { return NaN; }
      })();
      const inicial = (guardado >= 2700 && guardado <= 6500) ? guardado : 3000;

      const caja = document.createElement('div');
      caja.className = 'cct';
      caja.innerHTML =
        '<span class="cct-label mono" data-i18n="cct.label">Colour temperature</span>' +
        '<input type="range" min="2700" max="6500" step="100" value="' + inicial + '" />' +
        '<span class="cct-value">' + inicial + ' K</span>';
      escala.appendChild(caja);

      const mando = caja.querySelector('input');
      mando.setAttribute('aria-label', 'Colour temperature');
      mando.addEventListener('input', function () { aplicarCCT(parseInt(mando.value, 10)); });
      aplicarCCT(inicial);

      // El mando se inserta después de traducir la página, así que hay que
      // volver a pasar el traductor por él o su etiqueta se quedaría en inglés.
      if (typeof applyLang === 'function') {
        applyLang(document.documentElement.getAttribute('lang') || 'en', false);
      }
    }

    if (quieto) return;

    /* --- El cursor ilumina ------------------------------------------------
       Se mueve con transform y con un pequeño retardo: la luz de una lámpara
       no salta, se arrastra. Un solo fotograma por cuadro. ------------------ */
    let px = window.innerWidth / 2, py = window.innerHeight / 2;
    let lx = px, ly = py, activo = false, corriendo = false;

    function marco() {
      lx += (px - lx) * 0.14;
      ly += (py - ly) * 0.14;
      luz.style.transform = 'translate3d(' + lx.toFixed(1) + 'px,' + ly.toFixed(1) + 'px,0)';
      if (Math.abs(px - lx) > 0.5 || Math.abs(py - ly) > 0.5) {
        requestAnimationFrame(marco);
      } else {
        corriendo = false;
      }
    }

    window.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch') return;
      px = e.clientX; py = e.clientY;
      if (!activo) { activo = true; luz.classList.add('is-on'); }
      if (!corriendo) { corriendo = true; requestAnimationFrame(marco); }
    }, { passive: true });

    document.addEventListener('pointerleave', function () {
      activo = false;
      luz.classList.remove('is-on');
    });

    /* --- El haz barre las tarjetas --------------------------------------- */
    document.querySelectorAll('.adv-grid > article, .sectors > article, .service')
      .forEach(function (t) {
        t.addEventListener('pointermove', function (e) {
          const r = t.getBoundingClientRect();
          t.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
          t.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
        }, { passive: true });
      });

    /* --- El haz se estrecha al bajar -------------------------------------- */
    const haz = document.querySelector('.beam');
    if (haz) {
      let esperando = false;
      window.addEventListener('scroll', function () {
        if (esperando) return;
        esperando = true;
        requestAnimationFrame(function () {
          const p = Math.min(1, (window.scrollY || 0) / (window.innerHeight || 800));
          haz.style.setProperty('--beam', (1 - p * 0.4).toFixed(3));
          esperando = false;
        });
      }, { passive: true });
    }
  })();

  /* ========================================================================
     FORMULARIO DE CONTACTO
     Envía sin recargar la página y avisa del resultado en el sitio. Si el
     JavaScript falla, el formulario sigue funcionando como uno de toda la
     vida: se envía al servidor y este devuelve a la página con el resultado
     en la dirección. Nunca se queda mudo.
     ======================================================================== */
  (function () {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    const aviso = form.querySelector('.form-status');
    const boton = form.querySelector('button[type="submit"]');
    const marca = form.querySelector('input[name="t"]');
    const idioma = form.querySelector('input[name="lang"]');

    // La marca de tiempo permite al servidor descartar lo que se rellena en
    // menos de tres segundos, que ninguna persona hace.
    if (marca) marca.value = String(Math.floor(Date.now() / 1000));
    if (idioma) idioma.value = window.SITE ? window.SITE.lang() : 'en';
    if (window.SITE) window.SITE.onLang(function (l) { if (idioma) idioma.value = l; });

    function decir(clave, ok) {
      if (!aviso) return;
      aviso.hidden = false;
      aviso.textContent = t(document.documentElement.getAttribute('lang') || 'en', clave);
      aviso.classList.toggle('is-ok', !!ok);
      aviso.classList.toggle('is-bad', !ok);
    }

    // Si se llegó aquí sin JavaScript, el servidor devuelve el resultado en la
    // dirección. Se muestra igual y se limpia la barra del navegador.
    (function () {
      const p = new URLSearchParams(location.search);
      if (p.has('enviado')) { decir('form.ok', true); form.reset(); }
      else if (p.has('error')) { decir('form.' + p.get('error'), false); }
      if (p.has('enviado') || p.has('error')) {
        p.delete('enviado'); p.delete('error');
        history.replaceState(null, '', location.pathname + (p.toString() ? '?' + p : ''));
      }
    })();

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (boton.disabled) return;

      boton.disabled = true;
      decir('form.sending', true);

      fetch(form.action, {
        method: 'POST',
        headers: { 'X-Requested-With': 'fetch' },
        body: new FormData(form)
      })
      .then(function (r) { return r.json().catch(function () { return { ok: r.ok, clave: 'envio' }; }); })
      .then(function (d) {
        if (d.ok) { decir('form.ok', true); form.reset(); if (marca) marca.value = String(Math.floor(Date.now()/1000)); }
        else { decir('form.' + (d.clave || 'envio'), false); }
      })
      .catch(function () { decir('form.red', false); })
      .finally(function () { boton.disabled = false; });
    });
  })();

  /* ========================================================================
     MENÚ PARA PANTALLAS ESTRECHAS
     Hasta ahora la navegación simplemente desaparecía por debajo de los 860
     píxeles y no había nada que la sustituyera: desde un móvil no se podía
     llegar a ninguna página salvo por los enlaces del pie. Esto lo arregla.

     El botón y el comportamiento se crean desde aquí para no tener que editar
     las diez páginas.
     ======================================================================== */
  (function () {
    const cabecera = document.querySelector('.site-header');
    const nav = document.querySelector('.site-nav');
    const shell = cabecera && cabecera.querySelector('.shell');
    const idiomas = document.querySelector('.lang-switcher');
    if (!cabecera || !nav || !shell) return;

    nav.id = 'menu-principal';

    const boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'nav-toggle';
    boton.setAttribute('aria-expanded', 'false');
    boton.setAttribute('aria-controls', 'menu-principal');
    boton.setAttribute('data-i18n-attr', 'aria-label:a11y.menu');
    boton.innerHTML = '<span class="nav-toggle-bar"></span>' +
                      '<span class="nav-toggle-bar"></span>' +
                      '<span class="nav-toggle-bar"></span>';
    shell.appendChild(boton);

    function abrir(si) {
      cabecera.classList.toggle('is-open', si);
      boton.setAttribute('aria-expanded', si ? 'true' : 'false');
    }

    boton.addEventListener('click', function () {
      abrir(!cabecera.classList.contains('is-open'));
    });

    // Al elegir una página, el menú se cierra solo.
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) abrir(false);
    });

    // Escape cierra, y devuelve el foco al botón: es lo que espera quien
    // navega con el teclado.
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && cabecera.classList.contains('is-open')) {
        abrir(false); boton.focus();
      }
    });

    // Tocar fuera también cierra.
    document.addEventListener('click', function (e) {
      if (!cabecera.contains(e.target)) abrir(false);
    });

    /* --- Los idiomas viven dentro del menú en pantalla estrecha ------------
       Siete botones junto al nombre no caben en 375 píxeles: se amontonan o
       se salen. Dentro del desplegable tienen sitio de sobra. ------------- */
    const estrecha = window.matchMedia ? window.matchMedia('(max-width: 1180px)') : null;
    function colocarIdiomas() {
      if (!idiomas || !estrecha) return;
      if (estrecha.matches) {
        if (idiomas.parentNode !== nav) nav.appendChild(idiomas);
      } else {
        const herramientas = cabecera.querySelector('.header-tools');
        if (herramientas && idiomas.parentNode !== herramientas) {
          herramientas.insertBefore(idiomas, herramientas.firstChild);
        }
      }
    }
    if (estrecha) {
      colocarIdiomas();
      const alCambiar = function () { abrir(false); colocarIdiomas(); };
      if (estrecha.addEventListener) estrecha.addEventListener('change', alCambiar);
      else if (estrecha.addListener) estrecha.addListener(alCambiar);
    }
  })();
});
