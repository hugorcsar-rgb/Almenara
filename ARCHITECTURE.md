# Architecture

This document describes the technical architecture of [almenara.com](https://www.almenara.com): the rationale behind each decision, the structure of the codebase, and the trade-offs accepted.

It is the single source of truth for technical context. Whenever a decision is made or revised, this document is updated in the same commit.

---

## Table of contents

1. [Overview](#overview)
2. [Architectural principles](#architectural-principles)
3. [Project structure](#project-structure)
4. [Design system](#design-system)
5. [Internationalisation](#internationalisation)
6. [Performance](#performance)
7. [Accessibility](#accessibility)
8. [SEO](#seo)
9. [Security](#security)
10. [Browser support](#browser-support)
11. [Trade-offs and rejected alternatives](#trade-offs-and-rejected-alternatives)
12. [Decision log](#decision-log)

---

## Overview

The site is a **static, multi-page, six-language corporate website**. It is built with HTML5, CSS3 and vanilla JavaScript. It has no build step, no dependencies, no framework, and no server-side runtime.

The deliverable is a folder of files that any standards-compliant web server can serve. There is nothing to install, nothing to compile, and nothing to maintain at the infrastructure level beyond DNS and TLS — which the hosting provider handles.

This is a deliberate decision. The website's purpose is to communicate, durably and credibly, the identity of an industrial-technology company. The architecture matches that purpose: it will work the same way in ten years, on hardware that doesn't exist yet, hosted on providers that haven't been founded yet.

---

## Architectural principles

### 1. Static-first

Every page is pre-rendered HTML. No client-side rendering, no hydration, no skeleton states. The first byte the browser receives is the final document.

**Consequence:** initial render is bounded by network latency, not by JavaScript execution. This is the highest-performance architecture available on the open web.

### 2. Zero runtime dependencies

The site has no `package.json`, no `node_modules`, no third-party JavaScript libraries. The only external resources are typography files (currently from Google Fonts; self-hosted in a future iteration).

**Consequence:** zero supply-chain risk, zero version drift, zero deprecation. The site cannot break because a dependency was unpublished.

### 3. Deployment-agnostic

The repository contains the artefact that gets served. There is no `dist/` directory, no build pipeline, no provider-specific configuration files (`vercel.json`, `netlify.toml`, etc. are explicitly avoided).

**Consequence:** the site can move between Hostinger, Vercel, Netlify, Cloudflare Pages, AWS S3, GitHub Pages, or any VPS within minutes. The hosting layer is fully fungible. See [`DEPLOYMENT.md`](DEPLOYMENT.md) for provider-specific recipes.

### 4. Progressive enhancement

The HTML works without JavaScript. JavaScript improves the experience (theme toggle, language switcher, scroll-triggered reveals) but is never required for content access or navigation.

**Consequence:** robust against script-blocking, slow connections, and outdated browsers. Crawlers index full content from the source.

### 5. Performance budget

The site enforces these targets:

| Metric | Target |
|---|---|
| Lighthouse Performance | ≥ 95 |
| Lighthouse Accessibility | 100 |
| Lighthouse Best Practices | ≥ 95 |
| Lighthouse SEO | 100 |
| Largest Contentful Paint (LCP) | < 1.5 s |
| Cumulative Layout Shift (CLS) | < 0.1 |
| Interaction to Next Paint (INP) | < 200 ms |
| Total initial transfer | < 100 KB (gzip, excluding images) |

These targets are validated automatically by Lighthouse CI on every push to `main`.

### 6. Accessibility as foundation

Compliance with [WCAG 2.2 Level AA](https://www.w3.org/WAI/WCAG22/quickref/) is a build-blocker, not a feature. All interactive elements are keyboard-navigable, all colour combinations meet contrast ratios, all images carry meaningful `alt` text, and the document structure follows a strict heading hierarchy.

---

## Project structure

```
Almenara/
│
├── index.html              # Home
├── technology.html         # The patented technology
├── services.html           # Services offered
├── applications.html       # Sectoral applications
├── contact.html            # Contact information
├── 404.html                # Not found page
│
├── legal/                  # Legal pages (EU compliance)
│   ├── notice.html         # Aviso legal
│   ├── privacy.html        # Política de privacidad
│   └── cookies.html        # Política de cookies
│
├── assets/                 # All non-HTML resources
│   ├── css/
│   │   └── styles.css      # Single stylesheet, design tokens + components
│   ├── js/
│   │   ├── main.js         # Site logic: theme, reveal, navigation
│   │   └── i18n.js         # Translation engine
│   ├── data/               # Translation source files
│   │   ├── en.json
│   │   ├── es.json
│   │   ├── fr.json
│   │   ├── de.json
│   │   ├── it.json
│   │   └── ru.json
│   ├── fonts/              # Self-hosted typography
│   └── img/                # Images, SVG patterns, favicons
│
├── robots.txt              # Crawler directives
├── sitemap.xml             # Site map for search engines
├── manifest.json           # Web app manifest (PWA-ready)
│
├── README.md               # Project overview
├── ARCHITECTURE.md         # This document
├── DEPLOYMENT.md           # Deployment recipes
├── CONTRIBUTING.md         # Contribution guidelines
├── CHANGELOG.md            # Version history
├── SECURITY.md             # Vulnerability reporting
├── LICENSE                 # MIT (source code)
│
├── .editorconfig           # Editor consistency
├── .gitattributes          # Line-ending normalisation
├── .gitignore              # Files excluded from version control
│
└── .github/                # Repository automation
    ├── workflows/
    │   ├── ci.yml          # Validation pipeline
    │   └── lighthouse.yml  # Performance audit
    ├── ISSUE_TEMPLATE/
    │   ├── bug_report.md
    │   └── feature_request.md
    ├── PULL_REQUEST_TEMPLATE.md
    ├── CODEOWNERS
    └── dependabot.yml      # Reserved for future dependency tracking
```

### Rationale for the layout

- **Flat root for content pages.** Each public page lives at a predictable path: `/technology.html`, `/services.html`. No nested URLs for top-level content. This produces clean canonical URLs and simple internal linking.
- **`legal/` is the only content subdirectory.** Legal documents are grouped because they are mandatory but not part of the marketing path. Search engines deprioritise them; visitors reach them from the footer.
- **`assets/` is rigidly partitioned.** Each resource type has its own directory. No mixed buckets, no orphan files. A new image goes in `assets/img/`, a new translation in `assets/data/`, a new icon in `assets/img/icons/`.
- **`.github/` contains all GitHub-specific configuration.** It is the only directory that is not part of the deployed site. Hosting providers ignore it.

---

## Design system

The visual language is encoded as **CSS custom properties** in `:root`. Components reference only these tokens; raw colour or pixel values inside component rules are not permitted.

### Tokens

| Category | Token | Purpose |
|---|---|---|
| **Colour** | `--bg`, `--bg-alt`, `--ink`, `--ink-soft`, `--rule`, `--accent` | Semantic roles; theme-switchable |
| **Typography** | `--font-body`, `--font-display` | Two families, no more |
| **Type scale** | `--fs-xs` … `--fs-hero` | Fluid via `clamp()` |
| **Spacing** | `--space-1` … `--space-9` | 8-point grid |
| **Motion** | `--ease`, `--dur-fast`, `--dur`, `--dur-slow` | One easing curve, three durations |
| **Layout** | `--container-max`, `--container-pad` | Maximum width and lateral padding |

### Dual theme

The site supports a dark theme (default) and a light theme. Both are defined as separate sets of custom-property values, applied via a `data-theme` attribute on the `<html>` element.

- **First visit:** the theme is resolved from `prefers-color-scheme` of the operating system.
- **Subsequent visits:** the user's last selection is read from `localStorage`.
- **Toggle:** a discreet control in the header allows manual switching. The transition is instantaneous; no animated cross-fade.

No theme is "the fallback". Both are first-class.

### Typography

| Role | Family | Weights | Notes |
|---|---|---|---|
| Body | Inter | 400, 500 | Loaded from Google Fonts initially; self-hosted in a future iteration |
| Display | Inter | 300, 400 | Same family, lighter weight, generous tracking |

A serif display family (e.g. Fraunces) may be introduced in a later iteration if a stronger editorial register is required. The decision will be recorded in [Decision log](#decision-log).

### Motion

All transitions use `cubic-bezier(0.22, 1, 0.36, 1)` and one of three durations: `180ms` (fast, micro-interactions), `280ms` (default, hover and theme), `600ms` (slow, scroll reveals). No bouncing, no overshooting, no spring physics.

---

## Internationalisation

The site is published in six languages: English, Spanish, French, German, Italian, Russian.

### Approach

Translation is performed **at the client**, by JavaScript reading a JSON file at runtime. The HTML contains English source text inside elements marked with `data-i18n="key.path"`. At load time, the translation engine looks up each key in the active language file and replaces the text.

This approach was chosen for one reason: **a single HTML document per page, regardless of language count**. Adding a seventh language requires creating one JSON file. No HTML duplication, no build step, no fan-out.

### JSON schema

Each translation file has the same key structure. Missing keys are validated by CI.

```json
{
  "nav": {
    "technology": "Tecnología",
    "services": "Servicios",
    "applications": "Aplicaciones",
    "contact": "Contacto"
  },
  "hero": {
    "title": "El nuevo estándar en eficiencia LED",
    "subtitle": "Tecnología patentada. 275+ lúmenes por vatio."
  }
}
```

### Detection and persistence

1. **First visit:** the engine inspects `navigator.languages` and selects the first match against the supported six. If no match, defaults to English.
2. **Selection:** the user's choice is persisted in `localStorage` under the key `almenara.lang`.
3. **URL:** the active language is reflected in a `?lang=xx` query parameter for shareable links.

### SEO

Each page declares `<link rel="alternate" hreflang="xx">` for every supported language, plus an `x-default` pointing to the canonical English version. This signals to search engines that the same content exists in multiple languages.

---

## Performance

### Asset strategy

- **HTML** — uncompressed source < 30 KB per page; minified by the server (gzip/brotli) to ~6 KB transfer.
- **CSS** — single `styles.css`, ~20 KB uncompressed, ~5 KB gzipped. Cached aggressively (`Cache-Control: public, max-age=31536000, immutable` once fingerprinted).
- **JS** — two files (`main.js`, `i18n.js`), combined ~8 KB uncompressed. Loaded with `defer`.
- **Fonts** — `font-display: swap` to prevent invisible text. Self-hosted in a future iteration; until then, preconnect to Google Fonts in `<head>`.
- **Images** — WebP with JPEG fallback, lazy-loaded below the fold, sized with explicit `width` and `height` attributes to prevent layout shift.

### Critical rendering path

The `<head>` contains only critical CSS and preconnect hints. JavaScript is `defer`-loaded so it does not block parsing.

---

## Accessibility

- **Target:** [WCAG 2.2 Level AA](https://www.w3.org/WAI/WCAG22/quickref/).
- **Semantic HTML:** every page uses a strict landmark structure (`header`, `nav`, `main`, `footer`) and a single `h1`.
- **Keyboard:** every interactive element is reachable in logical tab order; focus indicators are always visible and meet contrast requirements.
- **Colour contrast:** body text on background ≥ 7:1 (AAA where possible). Accent colour is never the sole indicator of state.
- **Reduced motion:** all scroll-triggered animations are disabled when `prefers-reduced-motion: reduce` is set.
- **Language attribute:** the root `<html>` element's `lang` attribute is updated by the i18n engine to reflect the active language, so screen readers pronounce content correctly.

---

## SEO

### Per-page metadata

Every page includes:

- A unique `<title>` and `<meta name="description">`.
- Open Graph tags (`og:title`, `og:type`, `og:url`, `og:image`, `og:description`).
- Twitter Card tags (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`).
- Canonical URL (`<link rel="canonical">`).
- `hreflang` alternates for all six languages plus `x-default`.

### Structured data

The home page emits a JSON-LD block declaring the `Organization` schema. The contact page emits `LocalBusiness`. The technology page emits `Product`. These improve search-result presentation and enable rich cards in Google.

### Crawler directives

- `robots.txt` allows all crawlers except `AhrefsBot`, `SemrushBot`, and `MJ12bot` (commercial scrapers).
- `sitemap.xml` enumerates every page in every language.

---

## Security

The site has no server-side runtime, no database, no user input persistence, no authentication. Its attack surface is the static file delivery itself.

- **Transport:** HTTPS enforced at the hosting layer (HSTS recommended once a permanent domain is configured).
- **Content Security Policy:** a strict CSP is set via the hosting layer's response headers, restricting script and style sources to `self` and the Google Fonts origin (until self-hosting completes).
- **Subresource Integrity:** any third-party script loaded by URL carries an `integrity` hash.
- **No client-side secrets:** the repository contains no API keys, no credentials, no tokens.

See [`SECURITY.md`](SECURITY.md) for the vulnerability reporting policy.

---

## Browser support

Modern evergreen browsers, latest two major versions:

- Chrome / Chromium 120+
- Firefox 120+
- Safari 17+ (macOS, iOS, iPadOS)
- Edge 120+

Older browsers receive an unstyled but functional document via progressive enhancement. Internet Explorer is not supported.

---

## Trade-offs and rejected alternatives

### Why not React, Vue, or Svelte?

A component framework would introduce a build step, a `package.json`, a dependency tree, and a runtime cost of 30–100 KB of JavaScript before the first paint. For a corporate site whose content does not change at the client, this cost has no return. The site's interactivity (theme toggle, language switch, scroll reveals) is achievable in fewer than 200 lines of vanilla JavaScript.

### Why not a static site generator (Astro, Eleventy, Hugo)?

A generator solves the problem of "many pages from one template". This site has nine pages. The duplication cost is lower than the cost of introducing a build tool, learning its templating syntax, and maintaining its configuration over years. If the page count exceeds twenty, this decision is revisited.

### Why not URL-based language routing (`/es/`, `/en/`)?

URL-based routing maximises SEO per language at the cost of multiplying the file count by six. For a corporate site of this scale, the gain is not worth the operational overhead. The chosen approach — single HTML with `?lang=xx` and complete `hreflang` declarations — is recognised by Google as a valid internationalisation strategy.

### Why Inter and not a more distinctive typeface?

Inter is the most legible sans-serif on screen at any size. Distinctiveness is achieved through layout, hierarchy, and restraint, not through typeface novelty. A display serif may be introduced in a later iteration for hero headlines only; the decision will be made when the visual identity is finalised.

### Why not server-rendered pages with PHP / Node / Go?

A server adds operational complexity (process management, security patches, logging, scaling) that this site does not need. Every page is content that can be expressed as a file. A file is the simplest deployable artefact.

---

## Decision log

| Date | Decision | Rationale |
|---|---|---|
| 2026-05-26 | Static HTML / CSS / JS, no framework | Maximises portability, longevity, performance. See [Trade-offs](#trade-offs-and-rejected-alternatives). |
| 2026-05-26 | Six languages via client-side JSON | Avoids HTML duplication; single source per page. |
| 2026-05-26 | Dual theme (dark default + light) | Honours user preference and brand atmosphere. |
| 2026-05-26 | Inter as sole typeface initially | Legibility-first; reassessment after identity finalised. |
| 2026-05-26 | MIT licence for code, proprietary for brand | Standard split for corporate open-source releases. |
