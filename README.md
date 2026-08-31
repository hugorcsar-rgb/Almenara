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
├── 404.html · manifest.json · robots.txt · sitemap.xml
└── .htaccess               Apache: HTTPS, cabeceras, caché, tipos MIME
```

## Decisiones que conviene no deshacer

**El JavaScript va siempre en archivos aparte, nunca dentro del HTML.** El
`.htaccess` impone `script-src 'self'`, que prohíbe el código escrito dentro de
la página. Si algún día los botones dejan de responder, mirar esto antes que
ninguna otra cosa. Costó una tarde entera descubrirlo.

**Ni una conexión externa.** La tipografía Jost viaja incrustada en `site.css`
como dato codificado. Por eso `font-src` admite `data:`; sin ese permiso el
navegador la bloquea en silencio y cae a la letra del sistema. Ninguna
dirección IP de un visitante sale hacia un tercero, lo que importa cuando se
vende a contratación pública europea.

**Un solo tema: papel blanco y tinta azul noche.** No hay modo oscuro. El
ámbar queda reservado para representar la luz —la escala de eficacia, el mando
de temperatura de color, la barra de ahorro—, nunca para decorar.

**Siete idiomas, traducción completa.** El diccionario común está en `app.js`;
el de la calculadora, en `calc.js`, que se registra a través de `window.SITE`.
Al cambiar de idioma se traduce el texto, las etiquetas de accesibilidad, el
título de la pestaña, la descripción, `og:locale` y el atributo `lang`. Para
añadir una cadena: `data-i18n="mi.clave"` en el elemento y la misma clave en
los siete idiomas. Si falta en alguno, cae al inglés en vez de dejar el hueco.

**Rutas relativas.** Permiten servir el sitio desde la raíz de un dominio o
desde una subcarpeta sin tocar nada.

**La calculadora compara a iluminación equivalente**, no a igual potencia, y
descuenta nuestras propias reposiciones del ahorro de mantenimiento. Frente a
un LED moderno da un 45 %, no un 80 %. Esa honestidad es lo que la hace
defendible ante un ingeniero.

## Pendiente

- [ ] Sustituir el nombre y el dominio cuando se cierre el cambio de marca.
- [ ] Rellenar las condiciones de ensayo: buscar `[RELLENAR: FOTOMETRÍA]`.
- [ ] Rehacer `legal/` y `404.html` con el diseño nuevo. Hasta entonces piden
      la tipografía a Google y, como el `.htaccess` ya no lo permite, se ven
      con la letra del sistema.
- [ ] Fotografías reales en el apartado de aplicaciones.
- [ ] Descarga directa del informe en PDF, sin pasar por el diálogo de impresión.
- [ ] Recepción de formularios en el servidor.
