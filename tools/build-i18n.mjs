/* ============================================================================
   Almenara · Generador de páginas por idioma
   ----------------------------------------------------------------------------
   POR QUÉ EXISTE. La web traduce con JavaScript. Una persona ve su idioma,
   pero Google solo indexa bien lo que viene escrito en el HTML, y los
   rastreadores de IA (ChatGPT, Claude, Perplexity) no ejecutan JavaScript
   en absoluto: veían siempre la versión inglesa y nada más. Las direcciones
   ?lang=es servían exactamente el mismo HTML que la portada, así que para un
   buscador eran copias duplicadas.

   QUÉ HACE. Lee las seis páginas de la raíz (que siguen siendo la fuente que
   se edita) y el diccionario de assets/js/app.js y calc.js, y escribe:
     /            inglés (la raíz, ajustada en su sitio)
     /es/ /pt/ /fr/ /de/ /it/ /ru/   una copia ya traducida de cada página
   Cada copia lleva su <html lang>, título, descripción, canónico, hreflang,
   og:locale y datos estructurados en su idioma. El selector de idioma pasa a
   ser un enlace de verdad a la otra versión.

   CUÁNDO EJECUTARLO. Cada vez que cambie una página o un texto del
   diccionario. El flujo .github/workflows/idiomas.yml lo hace solo en cada
   empujón a main; a mano:   cd tools && npm install && npm run build
   Es idempotente: ejecutarlo dos veces deja lo mismo.
   ========================================================================== */

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import * as cheerio from 'cheerio';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const DOMAIN = 'https://almenaraled.com';
const LANGS = ['en', 'es', 'pt', 'fr', 'de', 'it', 'ru'];
const DEFAULT = 'en';
const PAGES = ['index.html', 'technology.html', 'services.html', 'applications.html', 'calculator.html', 'contact.html'];

/* --- 1. Diccionarios --------------------------------------------------------
   Se extraen del propio código para que no haya dos copias de los textos. */

function extractObject(src, marker) {
  const start = src.indexOf(marker);
  if (start < 0) throw new Error('No encuentro ' + marker);
  let i = src.indexOf('{', start);
  let depth = 0, str = null, esc = false, comment = null;
  for (let j = i; j < src.length; j++) {
    const c = src[j], n = src[j + 1];
    if (comment === '//') { if (c === '\n') comment = null; continue; }
    if (comment === '/*') { if (c === '*' && n === '/') { comment = null; j++; } continue; }
    if (str) {
      if (esc) esc = false;
      else if (c === '\\') esc = true;
      else if (c === str) str = null;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') { str = c; continue; }
    if (c === '/' && n === '/') { comment = '//'; j++; continue; }
    if (c === '/' && n === '*') { comment = '/*'; j++; continue; }
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) return vm.runInNewContext('(' + src.slice(i, j + 1) + ')'); }
  }
  throw new Error('Objeto sin cerrar: ' + marker);
}

const appSrc = fs.readFileSync(path.join(ROOT, 'assets/js/app.js'), 'utf8');
const calcSrc = fs.readFileSync(path.join(ROOT, 'assets/js/calc.js'), 'utf8');
const I18N = extractObject(appSrc, 'const I18N = {');
const PAGES_DICT = extractObject(appSrc, 'const I18N_PAGES = {');
const CALC = extractObject(calcSrc, 'const D = {');
for (const l of LANGS) I18N[l] = Object.assign({}, I18N[l] || {}, PAGES_DICT[l] || {}, CALC[l] || {});

const t = (lang, key) => (I18N[lang] && I18N[lang][key] !== undefined ? I18N[lang][key] : I18N.en[key]);

/* --- 2. Direcciones -------------------------------------------------------- */

const pagePath = (page) => (page === 'index.html' ? '' : page);
const langDir = (lang) => (lang === DEFAULT ? '' : lang + '/');
const absUrl = (lang, page) => `${DOMAIN}/${langDir(lang)}${pagePath(page)}`;
const LOCALES = { en: 'en_GB', es: 'es_ES', pt: 'pt_PT', fr: 'fr_FR', de: 'de_DE', it: 'it_IT', ru: 'ru_RU' };
const INLANG = { en: 'en', es: 'es', pt: 'pt', fr: 'fr', de: 'de', it: 'it', ru: 'ru' };

// Una ruta relativa que no apunta a otra página traducida es un recurso
// compartido (assets, legal, contact.php…) y, desde /es/, sube un nivel.
function isRelative(u) {
  return u && !/^([a-z]+:|\/\/|\/|#|\?)/i.test(u);
}
function rebase(u, prefix) {
  if (!prefix || !isRelative(u)) return u;
  const bare = u.split(/[?#]/)[0];
  if (bare === '' || bare === './' || PAGES.includes(bare)) return u; // se queda en la carpeta del idioma
  return prefix + u;
}

/* --- 3. Datos estructurados ------------------------------------------------ */

function jsonLd(lang, page, title, desc) {
  const org = {
    '@type': 'Organization',
    '@id': `${DOMAIN}/#organization`,
    name: 'Almenara',
    url: `${DOMAIN}/`,
    logo: `${DOMAIN}/assets/img/logo.svg`,
    image: `${DOMAIN}/assets/img/og-image.jpg`,
    description: t(lang, 'meta.desc'),
    email: 'info@almenaraled.com',
    address: { '@type': 'PostalAddress', addressLocality: 'Madrid', addressCountry: 'ES' },
    knowsAbout: [
      'LED light engines', 'Luminous efficacy', 'LED retrofit', 'Energy-efficient lighting',
      'Public lighting', 'Industrial lighting', 'Architectural lighting', 'Technology licensing'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'info@almenaraled.com',
      availableLanguage: ['English', 'Spanish', 'Portuguese', 'French', 'German', 'Italian', 'Russian']
    }
  };
  const site = {
    '@type': 'WebSite',
    '@id': `${DOMAIN}/#website`,
    url: `${DOMAIN}/`,
    name: 'Almenara',
    publisher: { '@id': `${DOMAIN}/#organization` },
    inLanguage: LANGS.map((l) => INLANG[l])
  };
  const webpage = {
    '@type': page === 'contact.html' ? 'ContactPage' : 'WebPage',
    '@id': absUrl(lang, page) + '#webpage',
    url: absUrl(lang, page),
    name: title,
    description: desc,
    inLanguage: INLANG[lang],
    isPartOf: { '@id': `${DOMAIN}/#website` },
    about: { '@id': `${DOMAIN}/#organization` },
    primaryImageOfPage: `${DOMAIN}/assets/img/og-image.jpg`
  };
  const graph = [org, site, webpage];
  if (page === 'calculator.html') {
    graph.push({
      '@type': 'WebApplication',
      name: title,
      url: absUrl(lang, page),
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Any',
      inLanguage: INLANG[lang],
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
      provider: { '@id': `${DOMAIN}/#organization` }
    });
  }
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2);
}

/* --- 4. Transformación de una página -------------------------------------- */

function render(srcHtml, page, lang) {
  const $ = cheerio.load(srcHtml, { decodeEntities: false });
  const prefix = lang === DEFAULT ? '' : '../';
  const html = $('html');

  html.attr('lang', lang);
  html.attr('data-lang-static', lang);
  html.attr('data-base', prefix);

  // Texto y atributos, igual que hace app.js en el navegador
  $('[data-i18n]').each((_, el) => {
    const v = t(lang, $(el).attr('data-i18n'));
    if (v !== undefined) $(el).text(v);
  });
  $('[data-i18n-attr]').each((_, el) => {
    $(el).attr('data-i18n-attr').split('|').forEach((pair) => {
      const i = pair.indexOf(':');
      if (i < 0) return;
      const v = t(lang, pair.slice(i + 1).trim());
      if (v !== undefined) $(el).attr(pair.slice(0, i).trim(), v);
    });
  });

  // Cabecera
  const p = html.attr('data-meta-prefix') || 'meta';
  const title = t(lang, p + '.title') || $('title').text();
  const desc = t(lang, p + '.desc') || $('meta[name="description"]').attr('content');
  const url = absUrl(lang, page);
  $('title').text(title);
  $('meta[name="description"]').attr('content', desc);
  $('meta[property="og:title"], meta[name="twitter:title"]').attr('content', title);
  $('meta[property="og:description"], meta[name="twitter:description"]').attr('content', desc);
  $('meta[property="og:url"]').attr('content', url);
  $('link[rel="canonical"]').attr('href', url);

  $('meta[property="og:locale"], meta[property="og:locale:alternate"]').remove();
  let ogAnchor = $('meta[property="og:image"]');
  const ogTags = [`<meta property="og:locale" content="${LOCALES[lang]}" />`]
    .concat(LANGS.filter((l) => l !== lang).map((l) => `<meta property="og:locale:alternate" content="${LOCALES[l]}" />`));
  ogAnchor.after('\n' + ogTags.join('\n'));

  // hreflang: una dirección propia por idioma, ya sin ?lang=
  const firstAlt = $('link[rel="alternate"][hreflang]').first();
  const altHtml = LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${absUrl(l, page)}" />`)
    .concat(`<link rel="alternate" hreflang="x-default" href="${absUrl(DEFAULT, page)}" />`).join('\n');
  if (firstAlt.length) firstAlt.before(altHtml + '\n');
  else $('link[rel="canonical"]').after('\n' + altHtml);
  $('link[rel="alternate"][hreflang]').slice(LANGS.length + 1).remove();

  // Datos estructurados
  $('script[type="application/ld+json"]').remove();
  $('link[rel="manifest"]').before(`<script type="application/ld+json">\n${jsonLd(lang, page, title, desc)}\n</script>\n\n`);

  // La calculadora la añadía JavaScript al menú; ahora va escrita para que
  // los rastreadores la encuentren. app.js ve que ya existe y no la duplica.
  const calcLink = () => `<a href="calculator.html" data-i18n="nav.calc">${t(lang, 'nav.calc') || 'Calculator'}</a>`;
  const nav = $('.site-nav').first();
  if (nav.length && !nav.find('a[href="calculator.html"]').length) {
    const last = nav.children('a').last();
    if (last.length) last.before(calcLink() + '\n      ');
  }
  const pie = $('.footer-top .footer-links').first();
  if (pie.length && !pie.find('a[href="calculator.html"]').length) {
    const last = pie.children('a').last();
    if (last.length) last.before(calcLink() + '\n        ');
  }

  // Rutas de recursos compartidos
  if (prefix) {
    $('[href]').each((_, el) => { $(el).attr('href', rebase($(el).attr('href'), prefix)); });
    $('[src]').each((_, el) => { $(el).attr('src', rebase($(el).attr('src'), prefix)); });
    $('[action]').each((_, el) => { $(el).attr('action', rebase($(el).attr('action'), prefix)); });
    $('[srcset]').each((_, el) => {
      const v = $(el).attr('srcset').split(',').map((s) => {
        const parts = s.trim().split(/\s+/);
        parts[0] = rebase(parts[0], prefix);
        return parts.join(' ');
      }).join(', ');
      $(el).attr('srcset', v);
    });
  }

  // Selector de idioma: botones → enlaces rastreables a la otra versión
  $('.lang-btn').each((_, el) => {
    const b = $(el);
    const l = b.attr('data-lang');
    const target = (lang === DEFAULT ? '' : '../') + langDir(l) + pagePath(page);
    const a = $(`<a class="lang-btn" data-lang="${l}" lang="${l}" hreflang="${l}"></a>`);
    a.attr('href', target === '' ? './' : target);
    if (l === lang) a.attr('aria-current', 'true');
    a.attr('aria-pressed', String(l === lang));
    a.text(b.text());
    b.replaceWith(a);
  });

  let out = $.html()
    .replace(/^<!DOCTYPE html>(?!\n)/i, '<!DOCTYPE html>\n')
    .replace(/-->(<html)/, '-->\n$1')
    .replace(/\n[ \t]*\n(?:[ \t]*\n)+/g, '\n\n');
  if (lang !== DEFAULT) {
    out = out.replace('<!DOCTYPE html>', '<!DOCTYPE html>\n<!-- GENERADO por tools/build-i18n.mjs a partir de /' + page + '. No lo edites: se sobrescribe. -->');
  }
  return out;
}

/* --- 5. Ejecutar ---------------------------------------------------------- */

const faltan = {};
for (const page of PAGES) {
  const file = path.join(ROOT, page);
  const src = fs.readFileSync(file, 'utf8');
  for (const lang of LANGS) {
    const out = render(src, page, lang);
    const dest = lang === DEFAULT ? file : path.join(ROOT, lang, page);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, out);
    // Aviso de claves sin traducir (caen al inglés)
    if (lang !== DEFAULT) {
      const $ = cheerio.load(src);
      $('[data-i18n]').each((_, el) => {
        const k = $(el).attr('data-i18n');
        if (!I18N[lang] || I18N[lang][k] === undefined) (faltan[lang] = faltan[lang] || new Set()).add(k);
      });
    }
  }
}

/* --- 6. Mapa del sitio ---------------------------------------------------- */

const prio = { 'index.html': '1.0', 'technology.html': '0.9', 'calculator.html': '0.9', 'services.html': '0.8', 'applications.html': '0.8', 'contact.html': '0.7' };
const hoy = new Date().toISOString().slice(0, 10);
let xml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- GENERADO por tools/build-i18n.mjs. Cada página en sus siete idiomas, cada una
     con su propia dirección y la lista completa de alternativas. -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;
for (const page of PAGES) {
  for (const lang of LANGS) {
    xml += `  <url>\n    <loc>${absUrl(lang, page)}</loc>\n    <lastmod>${hoy}</lastmod>\n`;
    for (const l of LANGS) xml += `    <xhtml:link rel="alternate" hreflang="${l}" href="${absUrl(l, page)}"/>\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${absUrl(DEFAULT, page)}"/>\n`;
    xml += `    <priority>${prio[page]}</priority>\n  </url>\n`;
  }
}
xml += '</urlset>\n';
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), xml);

console.log(`Generadas ${PAGES.length} páginas × ${LANGS.length} idiomas = ${PAGES.length * LANGS.length}.`);
for (const [l, s] of Object.entries(faltan)) console.log(`  ${l}: ${s.size} textos sin traducir (salen en inglés): ${[...s].slice(0, 8).join(', ')}${s.size > 8 ? '…' : ''}`);
