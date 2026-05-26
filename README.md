# Almenara
<div align="center">

# Almenara

**The new standard in LED efficiency.**
275+ lumens per watt. Patented. Universal compatibility.

[![License](https://img.shields.io/badge/License-MIT-0E1A2A.svg?style=flat-square)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-0E1A2A.svg?style=flat-square)]()
[![Stack](https://img.shields.io/badge/Stack-HTML_·_CSS_·_JS-6B6B6B.svg?style=flat-square)]()

</div>

---

## About

Almenara develops patented LED technology delivering more than 275 lumens per watt and over 50% energy reduction versus the current industry standard. Engineered in Madrid for original equipment manufacturers, architectural lighting partners, and infrastructure operators across Europe.

This repository contains the source code of [almenara.com](https://www.almenara.com): a static, six-language, deployment-agnostic corporate site.

## Documentation

| Document | Purpose |
|---|---|
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | Technical decisions, project structure, rationale. |
| [`DEPLOYMENT.md`](DEPLOYMENT.md) | Deployment recipes for Hostinger, Vercel, Netlify, Cloudflare Pages, VPS. |
| [`CONTRIBUTING.md`](CONTRIBUTING.md) | Conventions, commit format, workflow. |
| [`CHANGELOG.md`](CHANGELOG.md) | Versioned history of changes. |
| [`SECURITY.md`](SECURITY.md) | Vulnerability reporting policy. |

## Project structure

```
Almenara/
├── index.html
├── technology.html
├── services.html
├── applications.html
├── contact.html
├── 404.html
├── legal/
│   ├── notice.html
│   ├── privacy.html
│   └── cookies.html
├── assets/
│   ├── css/styles.css
│   ├── js/
│   │   ├── main.js
│   │   └── i18n.js
│   ├── data/
│   │   ├── en.json
│   │   ├── es.json
│   │   ├── fr.json
│   │   ├── de.json
│   │   ├── it.json
│   │   └── ru.json
│   ├── fonts/
│   └── img/
├── robots.txt
├── sitemap.xml
└── manifest.json
```

## Stack

No build step. No dependencies. No framework.

- **HTML5** — semantic, accessible (WCAG 2.2 AA target).
- **CSS3** — custom properties, fluid typography, dual theme.
- **Vanilla JavaScript** — ES2022, no transpilation.
- **Six languages** — English, Spanish, French, German, Italian, Russian.
- **Two themes** — dark (default) and light, honouring `prefers-color-scheme`.

The site is fully static and runs on any web server.

## Local preview

No installation required.

**Direct**
Open `index.html` in any browser. Translations require a local server.

**Local server** *(recommended)*

```bash
python3 -m http.server 8000
```

or

```bash
npx serve .
```

Open [`http://localhost:8000`](http://localhost:8000).

## Browser support

Modern evergreen browsers: Chrome, Firefox, Safari, Edge — last two major versions.

## Languages

| Code | Language |
|---|---|
| `en` | English |
| `es` | Español |
| `fr` | Français |
| `de` | Deutsch |
| `it` | Italiano |
| `ru` | Русский |

## License

Copyright © 2026 Almenara. All rights reserved.

Source code released under the [MIT License](LICENSE). Brand, copy, and imagery are proprietary.
