# Almenara

Sitio corporativo de Almenara. Tecnología de plataforma LED, Madrid.

Producción: <https://almenaraled.com>

---

## Cómo se publica

Este repositorio es la única fuente de verdad. Cada empujón a `main` dispara el
flujo `deploy.yml`, que verifica los archivos y los sube a Hostinger por FTPS.
Tarda menos de un minuto.

No se editan archivos en el gestor de Hostinger. Si alguien lo hace, el
siguiente despliegue sobrescribe sus cambios y se pierden sin aviso.

Credenciales en *Settings → Secrets and variables → Actions*: `FTP_SERVER`,
`FTP_USERNAME` y `FTP_PASSWORD` como secretos, y `FTP_DIR` como variable.

## Estructura

```
.
├── .github/workflows/
│   ├── deploy.yml          Publicación automática en Hostinger
│   └── lighthouse.yml      Auditoría semanal de rendimiento
├── assets/
│   ├── css/
│   │   ├── site.css        Diseño de las seis páginas nuevas
│   │   └── styles.css      Antiguo: solo lo usan legal/ y 404
│   ├── js/
│   │   ├── app.js          Idiomas, desplazamiento, luz interactiva
│   │   ├── calc.js         Calculadora de ahorro e informe imprimible
│   │   ├── i18n.js         Antiguo: solo lo usan legal/ y 404
│   │   └── main.js         Antiguo: solo lo usan legal/ y 404
│   └── img/
├── legal/                  Aviso legal, privacidad, cookies (diseño antiguo)
├── index.html · technology.html · services.html
├── applications.html · calculator.html · contact.html
├── partners.html       Socios: cuatro modelos de colaboración, sin cifras
├── 404.html · manifest.json · robots.txt · sitemap.xml
└── .htaccess               Apache: HTTPS, cabeceras, caché, tipos MIME
```

## Decisiones que conviene no deshacer

**El JavaScript va siempre en archivos aparte, nunca dentro del HTML.** El
`.htaccess` impone `script-src 'self'`, que prohíbe el código escrito dentro de
la página. Si algún día los botones dejan de responder, mirar esto antes que
ninguna otra cosa. Costó una tarde entera descubrirlo.

**Ni una conexión externa.** Las dos tipografías del sistema de marca, Ibarra
Real Nova (titulares, cifras, lema) e IBM Plex Sans (texto), se sirven desde
`assets/fonts/` como archivos variables, con su licencia SIL OFL al lado.
Ninguna dirección IP de un visitante sale hacia un tercero, lo que importa
cuando se vende a contratación pública europea.

**Sistema de marca 2026: marino, marfil y oro.** Los colores son variables en
la cabecera de `site.css`; la última capa del archivo («SISTEMA DE MARCA 2026 ·
FIAT LUX») resume el manual: nunca negro, sin degradados ni brillos, esquinas
rectas, un solo bloque en marino por página (el cierre, con el rosetón en oro).
El único degradado que queda es el del mando de temperatura de color, porque
ahí el color es el dato. El lema *Fiat lux* va en el pie y no se traduce.

**Siete idiomas, traducción completa.** El diccionario común está en `app.js`;
el de la calculadora, en `calc.js`, que se registra a través de `window.SITE`.
Al cambiar de idioma se traduce el texto, las etiquetas de accesibilidad, el
título de la pestaña, la descripción, `og:locale` y el atributo `lang`. Para
añadir una cadena: `data-i18n="mi.clave"` en el elemento y la misma clave en
los siete idiomas. Si falta en alguno, cae al inglés en vez de dejar el hueco.

**Cada idioma tiene su propia dirección.** `/` es inglés; `/es/`, `/pt/`,
`/fr/`, `/de/`, `/it/` y `/ru/` son copias ya traducidas que genera
`tools/build-i18n.mjs` a partir de las páginas de la raíz y del diccionario.
Se hizo porque Google y, sobre todo, los asistentes de IA no ejecutan el
JavaScript que traducía: solo veían el inglés. **Se editan solo las páginas de
la raíz y los textos de `app.js`/`calc.js`**; el flujo `idiomas.yml` regenera
las carpetas en cada empujón. Las antiguas `?lang=xx` redirigen (301) a la
carpeta correspondiente. `llms.txt` resume la empresa para los asistentes de IA.

**Rutas relativas.** Permiten servir el sitio desde la raíz de un dominio o
desde una subcarpeta sin tocar nada.

**La calculadora compara a iluminación equivalente**, no a igual potencia, y
descuenta nuestras propias reposiciones del ahorro de mantenimiento. Frente a
un LED moderno da un 45 %, no un 80 %. Esa honestidad es lo que la hace
defendible ante un ingeniero.

**Solo cifras aprobadas, cada una con su condición.** Manda el sistema de marca
(«Almenara LED · Sistema de marca 2026», sección VII): 275 lm/W es del módulo
interior Dicrotec LED 3030; 230–235 lm/W, del exterior LED 5050; −56 % / −46 % de
kWh, frente a un módulo LED estándar a igual flujo; >100.000 h de vida nominal;
patente MX 383389; garantía de 10 años. Están retiradas «más de 275 lm/W» en
general, «más del 50 %», «275–300» y cualquier «líder». Lo que no está en esa
tabla no se publica, tampoco en `llms.txt`.

## Pendiente

- [ ] Sustituir el nombre y el dominio cuando se cierre el cambio de marca.
- [ ] Rellenar las condiciones de ensayo: buscar `[RELLENAR: FOTOMETRÍA]`.
- [x] Aplicar la identidad visual del sistema de marca (marino, marfil, oro;
      Ibarra Real Nova + IBM Plex Sans; rosetón).
- [ ] Azulejo de Talavera como separador o franja (el manual pide un motivo
      por página; hoy el único es el rosetón del cierre).
- [ ] Logotipo: el rosetón como símbolo y el wordmark en Ibarra Real Nova,
      vectorizados por un diseñador. Hoy el nombre va en texto con una estrella
      de ocho puntas.
- [ ] Revisar la sección «Certificación y reconocimientos» de la portada contra
      el sistema de marca: el marcado CE para Europa figura aún como pendiente,
      y «Verificado por terceros» pide el informe LM-79 que aún no existe.
- [x] `legal/` y `404.html` usan la misma hoja de estilos y las mismas letras.
- [ ] **Bloqueado por el manual — no publicar hasta que se cierre:**
      una cuota de «Luz como servicio» en la calculadora (falta el contrato
      tipo: cuota, plazo, quién financia, garantía de ahorro; «Lo que falta»
      n.º 7) y cualquier cifra de coste total (TCO), que el manual retiró.
- [ ] Ficha técnica, una sola fuente de verdad («Lo que falta» n.º 4): «7 W
      frente a 16 W a 2.000 lm» son 286 lm/W, y el módulo de 7,4 W da 270;
      la web publica 275. La calculadora usa 275 y despeja el LED de
      referencia de los porcentajes publicados (ver `LED_REF` en `calc.js`).
- [ ] Fotografías reales en el apartado de aplicaciones.
- [ ] Descarga directa del informe en PDF, sin pasar por el diálogo de impresión.
- [x] Recepción de formularios en el servidor (`contact.php`; copias en
      `mensajes/`, protegida).
