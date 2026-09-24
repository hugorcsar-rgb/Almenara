/* ============================================================================
   ALMENARA · Consentimiento y medición
   ----------------------------------------------------------------------------
   BLOQUEO PREVIO. Mientras el visitante no acepte, este archivo no pide
   absolutamente nada a Google: ni el guion de gtag, ni un píxel, ni una
   consulta de nombres. Esto no es celo de más. El artículo 22.2 de la Ley
   34/2002 exige el consentimiento *antes* de almacenar o recuperar
   información en el equipo, y la guía de cookies de la Agencia Española de
   Protección de Datos es explícita en que el mero hecho de cargar un recurso
   de un tercero ya transmite la dirección IP a ese tercero. Por eso no basta
   con el modo de consentimiento de Google, que carga el guion igualmente y
   solo renuncia a las cookies: aquí no se carga nada hasta que se pulsa.

   TRES ESTADOS. Sin decisión, se muestra el aviso y no se mide. Aceptado, se
   carga Google Analytics. Rechazado, no se carga y no se vuelve a preguntar.
   La decisión se guarda en el almacenamiento local, no en una cookie: si la
   respuesta es «no», habría sido absurdo dejar una cookie para recordarlo.

   EL CÓDIGO VA AQUÍ Y NO EN LA PÁGINA. El fragmento que entrega Google es un
   <script> escrito dentro del HTML, y el .htaccess declara script-src 'self',
   que prohíbe exactamente eso. Sacarlo a este archivo es lo que permite
   mantener la política de seguridad cerrada para todo lo demás.
   ========================================================================== */

(function () {
  'use strict';

  const MEDICION = 'G-C7X7449KQ5';
  const CLAVE = 'site.consent';

  /* --- Textos del aviso, en los siete idiomas ---------------------------- */
  const T = {
    en: {
      t: 'Measuring visits',
      b: 'We would like to use Google Analytics to find out which pages are read and how people arrive. It installs cookies and sends your IP address to Google. Nothing is loaded until you decide.',
      si: 'Accept',
      no: 'Decline',
      mas: 'Cookie policy'
    },
    es: {
      t: 'Medición de visitas',
      b: 'Nos gustaría emplear Google Analytics para saber qué páginas se leen y cómo se llega hasta aquí. Instala cookies y envía su dirección IP a Google. No se carga nada hasta que usted decida.',
      si: 'Aceptar',
      no: 'Rechazar',
      mas: 'Política de cookies'
    },
    pt: {
      t: 'Medição de visitas',
      b: 'Gostaríamos de usar o Google Analytics para saber que páginas são lidas e como se chega aqui. Instala cookies e envia o seu endereço IP para a Google. Nada é carregado até que decida.',
      si: 'Aceitar',
      no: 'Recusar',
      mas: 'Política de cookies'
    },
    fr: {
      t: 'Mesure de fréquentation',
      b: 'Nous souhaiterions utiliser Google Analytics pour savoir quelles pages sont lues et comment vous êtes arrivé ici. Il installe des cookies et transmet votre adresse IP à Google. Rien n\u2019est chargé avant votre décision.',
      si: 'Accepter',
      no: 'Refuser',
      mas: 'Politique de cookies'
    },
    de: {
      t: 'Besuchsmessung',
      b: 'Wir würden gern Google Analytics einsetzen, um zu erfahren, welche Seiten gelesen werden und wie Sie hierher gelangen. Es setzt Cookies und übermittelt Ihre IP-Adresse an Google. Vor Ihrer Entscheidung wird nichts geladen.',
      si: 'Annehmen',
      no: 'Ablehnen',
      mas: 'Cookie-Richtlinie'
    },
    it: {
      t: 'Misurazione delle visite',
      b: 'Vorremmo usare Google Analytics per sapere quali pagine vengono lette e come si arriva qui. Installa cookie e invia il suo indirizzo IP a Google. Nulla viene caricato prima della sua decisione.',
      si: 'Accetta',
      no: 'Rifiuta',
      mas: 'Informativa sui cookie'
    },
    ru: {
      t: 'Измерение посещений',
      b: 'Мы хотели бы использовать Google Analytics, чтобы знать, какие страницы читают и как сюда попадают. Он устанавливает файлы cookie и передаёт ваш IP-адрес в Google. Ничего не загружается до вашего решения.',
      si: 'Принять',
      no: 'Отклонить',
      mas: 'Политика использования файлов cookie'
    }
  };

  function idioma() {
    const l = (window.SITE && window.SITE.lang && window.SITE.lang()) ||
              document.documentElement.getAttribute('lang') || 'en';
    return T[l] ? l : 'en';
  }

  function leer() {
    try { return localStorage.getItem(CLAVE); } catch (e) { return null; }
  }

  function guardar(v) {
    try { localStorage.setItem(CLAVE, v); } catch (e) {}
  }

  /* --- Carga de Google Analytics ------------------------------------------
     Solo se llega aquí con el consentimiento dado. El guion se inyecta como
     un <script src> normal, que la política de seguridad permite porque el
     .htaccess declara googletagmanager.com en script-src. ---------------- */
  let cargado = false;

  function medir() {
    if (cargado || !MEDICION) return;
    cargado = true;

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;

    gtag('js', new Date());
    // Se declara explícitamente lo que se concede y lo que no: analítica sí,
    // publicidad no. El visitante ha aceptado medición de visitas, no
    // perfilado publicitario, y son dos cosas distintas.
    gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'granted'
    });
    gtag('config', MEDICION, { anonymize_ip: true });

    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + MEDICION;
    document.head.appendChild(s);
  }

  /* --- El aviso ------------------------------------------------------------ */
  let caja = null;

  function cerrar() {
    if (!caja) return;
    caja.classList.remove('is-on');
    const ir = caja;
    setTimeout(function () { if (ir.parentNode) ir.parentNode.removeChild(ir); }, 400);
    caja = null;
  }

  function pintar() {
    const t = T[idioma()];

    caja = document.createElement('div');
    caja.className = 'consent';
    caja.setAttribute('role', 'dialog');
    caja.setAttribute('aria-live', 'polite');
    caja.setAttribute('aria-label', t.t);

    const texto = document.createElement('div');
    texto.className = 'consent-text';
    const h = document.createElement('p');
    h.className = 'consent-t mono';
    h.textContent = t.t;
    const p = document.createElement('p');
    p.className = 'consent-b';
    p.textContent = t.b;
    const mas = document.createElement('a');
    mas.className = 'consent-more';
    mas.href = (location.pathname.indexOf('/legal/') > -1 ? '' : (document.documentElement.getAttribute('data-base') || '') + 'legal/') + 'cookies.html';
    mas.textContent = t.mas;
    texto.appendChild(h);
    texto.appendChild(p);
    texto.appendChild(mas);

    const acciones = document.createElement('div');
    acciones.className = 'consent-acts';

    const no = document.createElement('button');
    no.type = 'button';
    no.className = 'btn btn-outline';
    no.textContent = t.no;
    no.addEventListener('click', function () { guardar('no'); cerrar(); });

    const si = document.createElement('button');
    si.type = 'button';
    si.className = 'btn btn-primary';
    si.textContent = t.si;
    si.addEventListener('click', function () { guardar('si'); cerrar(); medir(); });

    // Rechazar va primero: quien no quiere ser medido no tiene por qué
    // recorrer el botón de aceptar para llegar al suyo.
    acciones.appendChild(no);
    acciones.appendChild(si);

    caja.appendChild(texto);
    caja.appendChild(acciones);
    document.body.appendChild(caja);

    requestAnimationFrame(function () {
      requestAnimationFrame(function () { caja.classList.add('is-on'); });
    });
  }

  function arrancar() {
    /* --- Si cambia de idioma con el aviso abierto -------------------------
       El aviso se pintaba una sola vez, en el idioma que hubiera al cargar.
       Un visitante que llegara en inglés y pulsara ES se quedaba leyendo en
       inglés una petición de consentimiento, que es justo donde peor sienta
       no entender lo que se firma. La suscripción va aquí y no arriba porque
       app.js publica window.SITE durante su propio arranque: cuando este
       archivo se ejecuta, todavía no existe. */
    if (window.SITE && window.SITE.onLang) {
      window.SITE.onLang(function () {
        if (!caja) return;
        const t = T[idioma()];
        caja.setAttribute('aria-label', t.t);
        caja.querySelector('.consent-t').textContent = t.t;
        caja.querySelector('.consent-b').textContent = t.b;
        caja.querySelector('.consent-more').textContent = t.mas;
        const b = caja.querySelectorAll('.consent-acts .btn');
        b[0].textContent = t.no;
        b[1].textContent = t.si;
      });
    }

    const d = leer();
    if (d === 'si') { medir(); return; }
    if (d === 'no') return;
    pintar();
  }

  /* Cuidado con esta condición. Un guion con «defer» se ejecuta cuando el
     documento ya está en estado «interactive», no en «loading»: comprobar
     solo «loading» hacía que esto arrancara en el acto, antes de que app.js
     hubiera publicado el sistema de idiomas, y el aviso salía siempre en
     inglés. Solo se arranca en el acto si la página ya está del todo
     cargada, que es el caso de un guion inyectado más tarde. */
  if (document.readyState === 'complete') {
    arrancar();
  } else {
    document.addEventListener('DOMContentLoaded', arrancar);
  }

  /* --- Cambiar de idea -----------------------------------------------------
     La página de cookies lleva un botón con este identificador. Sin una
     manera de retirar el consentimiento, dársela no valdría legalmente. */
  document.addEventListener('click', function (e) {
    const b = e.target.closest && e.target.closest('#consent-reset');
    if (!b) return;
    e.preventDefault();
    try { localStorage.removeItem(CLAVE); } catch (err) {}
    location.reload();
  });
})();
