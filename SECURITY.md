# Security Policy

The Almenara website is a static site. It has no server-side runtime, no database, no user authentication, and no input persistence. Its attack surface is small but not zero: malicious dependencies, unsafe inline content, misconfigured response headers, and supply-chain risks all apply.

This document describes how to report a security issue responsibly.

## Supported versions

Only the version currently deployed to [almenara.com](https://www.almenara.com) is supported. Previous releases are not maintained.

| Version | Supported |
|---|---|
| Latest `main` | ✅ |
| Any other | ❌ |

## Reporting a vulnerability

If you believe you have discovered a security vulnerability in this repository or in the deployed site, **do not open a public issue**. Public disclosure before a fix is in place puts users at risk.

Use one of the following private channels, in order of preference:

### 1. GitHub Security Advisories *(preferred)*

1. Navigate to the **Security** tab of this repository.
2. Click **Report a vulnerability**.
3. Provide a clear description, reproduction steps, and impact assessment.

This channel is encrypted, scoped to maintainers only, and allows coordinated disclosure with a tracked timeline.

### 2. Email

Send the report to `security@almenara.com` *(to be configured upon domain acquisition)*. Until then, contact via the email listed on the contact page of the site.

If sensitive details are involved, request a PGP key before sending.

## What to include

A useful report contains:

- A clear description of the vulnerability.
- Step-by-step reproduction instructions.
- The affected page, browser, and version.
- An assessment of impact (information disclosure, defacement, account compromise, etc.).
- Suggested remediation, if known.

## Response timeline

| Stage | Target |
|---|---|
| Acknowledgement of report | 48 hours |
| Initial assessment | 7 days |
| Patch development for confirmed issues | 30 days |
| Public disclosure (after patch) | Coordinated with reporter |

For critical vulnerabilities (active exploitation, data exposure), these timelines are compressed.

## Out of scope

The following are not considered security vulnerabilities and will be closed without action:

- Missing HTTP headers that do not lead to a concrete attack scenario.
- Self-XSS that requires the victim to paste arbitrary content into the browser console.
- Vulnerabilities in third-party services (Google Fonts, hosting provider) that are out of our control — report those upstream.
- Reports requiring physical access, root access, or already-compromised devices.
- Use of outdated browsers no longer supported by their vendors.

## Recognition

Reporters who follow this policy and act in good faith are acknowledged in the [`CHANGELOG.md`](CHANGELOG.md) entry of the release that fixes the issue, unless anonymity is requested.

There is no bug bounty programme at this time.

---

*Last updated: 2026-05-26*
