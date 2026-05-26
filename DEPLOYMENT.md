# Deployment

This document describes how to deploy [almenara.com](https://www.almenara.com) on multiple hosting providers. Each provider section is self-contained.

The site is fully static: any provider that serves files over HTTPS can host it. The recipes below cover the providers most likely to be used, but the site is not bound to any of them.

---

## Table of contents

1. [Pre-deployment checklist](#pre-deployment-checklist)
2. [Hostinger](#hostinger) — current production host
3. [Vercel](#vercel)
4. [Netlify](#netlify)
5. [Cloudflare Pages](#cloudflare-pages)
6. [GitHub Pages](#github-pages)
7. [Generic VPS with nginx](#generic-vps-with-nginx)
8. [Required HTTP response headers](#required-http-response-headers)
9. [Custom domain configuration](#custom-domain-configuration)
10. [Migrating between providers](#migrating-between-providers)
11. [Rollback procedure](#rollback-procedure)

---

## Pre-deployment checklist

Before pushing to `main`, verify:

- [ ] All six translation files (`assets/data/*.json`) contain every key declared in the master schema.
- [ ] All internal links resolve (no 404s).
- [ ] All images have `alt`, `width`, and `height` attributes.
- [ ] `sitemap.xml` lists every public page.
- [ ] `robots.txt` does not block production crawling.
- [ ] Lighthouse scores meet the targets defined in [`ARCHITECTURE.md`](ARCHITECTURE.md#performance).
- [ ] No console errors or warnings on any page.
- [ ] No hard-coded staging URLs in the codebase.
- [ ] `CHANGELOG.md` reflects the changes about to ship.

CI runs most of these checks automatically on every pull request.

---

## Hostinger

Hostinger is the current production host. It supports automatic deployment from GitHub via OAuth on the Business plan and above.

### Initial setup

1. Sign in to [hpanel.hostinger.com](https://hpanel.hostinger.com).
2. Navigate to **Websites → Add Website → Deploy from GitHub**.
3. Authorise GitHub access if prompted, granting permission to the `Almenara` repository.
4. Select repository: `hugorcsar-rgb/Almenara`.
5. Select branch: `main`.
6. Set deployment path: `/` (root). Output directory: `/` (no build step).
7. Confirm.

Hostinger clones the repository and serves its root as the document root. Every subsequent push to `main` triggers a redeploy automatically.

### Custom domain

1. In **Domains → Add Domain**, enter the purchased domain (e.g. `almenara.com`).
2. Hostinger displays the required DNS records (A, AAAA, optionally CNAME for `www`).
3. Configure these records at the domain registrar.
4. Wait for propagation (typically 15 minutes; up to 24 hours).
5. In **SSL → Manage**, install the free Let's Encrypt certificate. Enable "Force HTTPS".

### Caching and security headers

Hostinger runs Apache. Headers are configured via `.htaccess` at the repository root. See [Required HTTP response headers](#required-http-response-headers) for the canonical configuration.

### Manual redeploy

If a deploy fails or appears stuck:

1. **Websites → [domain] → Git** in hPanel.
2. Click **Deploy** to force a fresh pull.

---

## Vercel

Vercel deploys instantly from GitHub with zero configuration for static sites.

### Initial setup

1. Sign in to [vercel.com](https://vercel.com) with the GitHub account that owns the repository.
2. **Add New → Project**.
3. Import `hugorcsar-rgb/Almenara`.
4. Framework Preset: **Other**.
5. Build Command: *(leave empty)*.
6. Output Directory: *(leave empty — Vercel serves the repository root)*.
7. **Deploy**.

Subsequent pushes to `main` deploy automatically. Pull requests receive preview URLs.

### Custom domain

1. **Project → Settings → Domains → Add**.
2. Enter the domain. Vercel displays the required DNS records.
3. Configure at the registrar.
4. HTTPS is provisioned automatically once DNS propagates.

### Headers

Create `vercel.json` at the repository root with the canonical headers. *This file is not committed to the repository by default to preserve provider-agnosticism.* Add it only if Vercel becomes the permanent host.

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "geolocation=(), microphone=(), camera=()" }
      ]
    }
  ]
}
```

---

## Netlify

### Initial setup

1. Sign in to [netlify.com](https://netlify.com) with GitHub.
2. **Add new site → Import an existing project → GitHub**.
3. Authorise and select `hugorcsar-rgb/Almenara`.
4. Branch: `main`. Build command: *(empty)*. Publish directory: *(empty or `.`)*.
5. **Deploy site**.

### Custom domain

1. **Domain settings → Add custom domain**.
2. Configure DNS at the registrar (Netlify shows the records).
3. **HTTPS → Verify DNS configuration → Provision certificate**.

### Headers

Create `_headers` at the repository root *only if Netlify becomes the permanent host*:

```
/*
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
```

---

## Cloudflare Pages

Cloudflare Pages is free, fast, and integrates with Cloudflare's edge network.

### Initial setup

1. Sign in to [dash.cloudflare.com](https://dash.cloudflare.com).
2. **Workers & Pages → Create application → Pages → Connect to Git**.
3. Authorise GitHub and select `hugorcsar-rgb/Almenara`.
4. Production branch: `main`. Framework preset: **None**. Build command: *(empty)*. Build output directory: `/`.
5. **Save and Deploy**.

### Custom domain

1. **Custom domains → Set up a custom domain**.
2. If the domain is already in Cloudflare DNS, the connection is one click.
3. HTTPS is automatic.

### Headers

Create `_headers` at the repository root (same syntax as Netlify) only if Cloudflare Pages becomes the permanent host.

---

## GitHub Pages

GitHub Pages is the simplest free option but lacks some commercial features (no custom HTTP headers via configuration file, no preview deploys for private repos on the free tier).

### Initial setup

1. Repository → **Settings → Pages**.
2. Source: **Deploy from a branch**.
3. Branch: `main`. Folder: `/ (root)`.
4. **Save**.

The site is published at `https://hugorcsar-rgb.github.io/Almenara/`.

### Custom domain

1. **Settings → Pages → Custom domain**: enter the domain.
2. Add a `CNAME` record at the registrar pointing to `hugorcsar-rgb.github.io`.
3. **Enforce HTTPS** once the certificate is issued.

GitHub Pages is documented here for completeness. For production use, prefer Hostinger, Vercel, Netlify, or Cloudflare Pages.

---

## Generic VPS with nginx

Any Linux VPS (Hetzner, OVH, DigitalOcean, AWS Lightsail) can host the site with this approximate configuration.

### nginx server block

```nginx
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name almenara.com www.almenara.com;

    root /var/www/almenara;
    index index.html;

    ssl_certificate     /etc/letsencrypt/live/almenara.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/almenara.com/privkey.pem;

    # Security headers
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "DENY" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;

    # Compression
    gzip on;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;

    # Caching
    location ~* \.(css|js|woff2|woff|ttf|jpg|jpeg|png|webp|svg|ico)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location / {
        try_files $uri $uri.html $uri/ =404;
    }

    error_page 404 /404.html;
}

server {
    listen 80;
    listen [::]:80;
    server_name almenara.com www.almenara.com;
    return 301 https://$host$request_uri;
}
```

### Deployment

Deploy by pulling from GitHub on the server:

```bash
cd /var/www/almenara
git pull origin main
```

Automate with a webhook or a cron job pulling every 5 minutes if continuous deployment is required.

---

## Required HTTP response headers

These headers are recommended on every response, regardless of host. They are summarised here as the canonical reference.

| Header | Value | Purpose |
|---|---|---|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Forces HTTPS for 2 years. Submit to [hstspreload.org](https://hstspreload.org) once stable. |
| `X-Content-Type-Options` | `nosniff` | Prevents MIME-type confusion attacks. |
| `X-Frame-Options` | `DENY` | Prevents the site from being embedded in iframes. |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Limits referrer leakage. |
| `Permissions-Policy` | `geolocation=(), microphone=(), camera=()` | Disables browser APIs not used by the site. |
| `Content-Security-Policy` | *(see below)* | Restricts script/style/image origins. |

### Content Security Policy

A conservative starting policy:

```
default-src 'self';
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com;
img-src 'self' data:;
script-src 'self';
frame-ancestors 'none';
base-uri 'self';
form-action 'self';
```

Once fonts are self-hosted, the `https://fonts.googleapis.com` and `https://fonts.gstatic.com` clauses are removed.

### Cache strategy

| Resource | `Cache-Control` |
|---|---|
| HTML | `public, max-age=0, must-revalidate` |
| CSS, JS, fonts, images | `public, max-age=31536000, immutable` |

HTML is short-cached so updates propagate; static assets are long-cached and fingerprinted by filename when content changes.

---

## Custom domain configuration

When a domain is acquired:

1. **Purchase** at any registrar (Namecheap, Cloudflare Registrar, Gandi, etc.). Cloudflare Registrar is recommended for at-cost pricing and built-in DNS.
2. **DNS records** at the registrar:
   - `A` record: `@` → IP address of the host (Hostinger / VPS).
   - `AAAA` record: `@` → IPv6 address.
   - `CNAME` record: `www` → root domain or host alias.
3. **Verify** in the hosting panel that the domain is recognised.
4. **TLS certificate**: enable Let's Encrypt or equivalent. Most hosts provision automatically.
5. **HSTS**: enable after verifying the certificate is stable for a week.
6. **Redirects**: ensure `www.almenara.com` redirects to `almenara.com` (or vice versa), and HTTP redirects to HTTPS.
7. **Sitemap and `robots.txt`**: confirm both reference the new canonical domain.
8. **Submit to search engines**: [Google Search Console](https://search.google.com/search-console), [Bing Webmaster Tools](https://www.bing.com/webmasters), [Yandex Webmaster](https://webmaster.yandex.com).

---

## Migrating between providers

Migration is engineered to be a low-risk operation. Steps for a zero-downtime move:

1. **Provision the new host** alongside the existing one. Deploy the site to a temporary URL (e.g. `*.vercel.app`). Verify functionality on the temporary URL.
2. **Configure the custom domain** on the new host but **do not yet update DNS at the registrar**.
3. **Reduce DNS TTL** at the registrar to 300 seconds, 24 hours in advance.
4. **Switch DNS records** to point to the new host. Propagation begins.
5. **Monitor** both hosts during propagation. Both serve the same content; visitors see no disruption.
6. **Confirm complete propagation** with [dnschecker.org](https://dnschecker.org) against multiple regions.
7. **Restore DNS TTL** to a comfortable value (3600 or 86400 seconds).
8. **Decommission** the old host once 48 hours have passed without anomalies.

No content migration is needed: the repository is the source of truth, and both hosts pull from the same GitHub source.

---

## Rollback procedure

If a deployment introduces a regression:

### Option 1 — Revert the offending commit

```bash
git revert <commit-sha>
git push origin main
```

The host redeploys automatically with the reverted state.

### Option 2 — Reset to a known-good tag

If multiple commits are involved:

```bash
git checkout main
git reset --hard <last-good-tag>
git push --force-with-lease origin main
```

This requires that the branch is not protected against force pushes, which it normally is. Use Option 1 in standard circumstances.

### Option 3 — Host-side rollback

Hostinger, Vercel, Netlify, and Cloudflare Pages all retain a history of past deployments. From the host's dashboard, the previous deployment can be promoted to production in one click. This is the fastest recovery and does not modify the repository.

---

*Last reviewed: 2026-05-26*
