# Contributing

This document defines the conventions and workflow for changing the [almenara.com](https://www.almenara.com) source code.

The project is small enough to be edited entirely through the GitHub web interface for most changes. Larger refactors benefit from a local clone, but neither path is required.

---

## Table of contents

1. [Getting started](#getting-started)
2. [Branching strategy](#branching-strategy)
3. [Commit conventions](#commit-conventions)
4. [Pull request process](#pull-request-process)
5. [Code style](#code-style)
6. [Common tasks](#common-tasks)
7. [Quality checks](#quality-checks)
8. [Reporting issues](#reporting-issues)

---

## Getting started

### Via GitHub web *(recommended for content changes and small edits)*

1. Navigate to the file to edit.
2. Click the pencil icon to enter edit mode.
3. Make changes.
4. At the bottom, select **Create a new branch**, name it according to the [branching convention](#branching-strategy), and **Propose changes**.
5. Open a pull request from the new branch into `main`.

### Via local clone *(for larger changes)*

```bash
git clone https://github.com/hugorcsar-rgb/Almenara.git
cd Almenara
git checkout -b feat/short-description
# edit files
git add .
git commit -m "feat(scope): short description"
git push origin feat/short-description
```

Then open a pull request in GitHub.

No installation is required to preview locally; see [`README.md`](README.md#local-preview).

---

## Branching strategy

The repository follows a simple trunk-based model.

- **`main`** is always in a deployable state. Every commit to `main` triggers a production deployment.
- **Feature branches** are short-lived and named with a prefix indicating the type of change:

| Prefix | Use |
|---|---|
| `feat/` | New feature or section (`feat/contact-form`) |
| `fix/` | Bug fix (`fix/lang-switcher-mobile`) |
| `docs/` | Documentation only (`docs/update-deployment`) |
| `style/` | Visual or CSS-only changes (`style/refine-typography`) |
| `refactor/` | Code restructuring without behaviour change (`refactor/i18n-engine`) |
| `chore/` | Tooling, configuration, dependencies (`chore/update-dependabot`) |
| `ci/` | Continuous integration changes (`ci/add-lighthouse-check`) |

Branch names are lowercase with hyphens. They are deleted after merge.

**`main` is protected**: direct pushes are not permitted. All changes go through pull requests, which require passing CI to be merged.

---

## Commit conventions

Commits follow the [Conventional Commits](https://www.conventionalcommits.org/) specification. The format is:

```
type(scope): short description

[optional longer body]

[optional footer with breaking-change notice or issue reference]
```

### Allowed types

| Type | Use |
|---|---|
| `feat` | A new feature, section, or capability |
| `fix` | A bug fix |
| `docs` | Documentation only |
| `style` | Whitespace, formatting, missing semicolons (not visual design) |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `perf` | Performance improvement |
| `test` | Adding or correcting tests |
| `build` | Build system, deployment configuration |
| `ci` | Continuous integration configuration |
| `chore` | Other maintenance (no production code change) |
| `revert` | Reverts a previous commit |

### Scope

The scope is optional but recommended. Common scopes:

- `i18n`, `home`, `technology`, `services`, `applications`, `contact`, `legal`
- `design-system`, `css`, `js`, `seo`, `a11y`, `perf`
- `deploy`, `docs`, `repo`

### Examples

```
feat(i18n): add Russian translations
fix(lang-switcher): preserve active language after page change
docs(architecture): document dual-theme rationale
style(home): refine hero spacing on small viewports
refactor(i18n): extract language detection into pure function
perf(images): convert hero images to WebP
ci: add Lighthouse audit on pull requests
chore(repo): update .gitignore for editor backups
```

### What not to do

- ❌ `Update file.` *(no type, no scope, no information)*
- ❌ `fix stuff` *(no scope, vague description)*
- ❌ `Various improvements` *(non-specific)*
- ❌ Mixed commits combining unrelated changes — split them.

---

## Pull request process

1. **Open the pull request** with a descriptive title that matches the commit convention.
2. **Fill in the template** (`.github/PULL_REQUEST_TEMPLATE.md`): what changed, why, screenshots if visual.
3. **Link the issue** the PR addresses, if any (`Closes #42`).
4. **Wait for CI** to complete. All checks must pass:
   - HTML validation
   - CSS lint
   - JavaScript lint
   - Translation key consistency
   - Broken link check
   - Lighthouse thresholds
5. **Self-review** the diff before requesting external review.
6. **Merge with squash** to keep `main` history linear and readable.
7. **Delete the branch** after merge.

For single-maintainer projects, self-reviewed PRs are acceptable provided CI passes and the change is clearly described.

---

## Code style

### General

- **Indentation:** 2 spaces, no tabs.
- **Line endings:** LF (Unix). Enforced by `.gitattributes`.
- **File encoding:** UTF-8.
- **Trailing whitespace:** removed.
- **Final newline:** required.

These are enforced by `.editorconfig`.

### HTML

- Lowercase tags and attributes.
- Self-closing tags use `/>` (`<img />`, `<br />`).
- Attribute order: `class`, `id`, `data-*`, role/ARIA, `src`/`href`, `alt`/`title`, others.
- Every interactive element has an accessible name (text, `aria-label`, or `aria-labelledby`).
- One `<h1>` per page.
- Comments mark major section boundaries (`<!-- Hero -->`, `<!-- Footer -->`).

### CSS

- **Tokens first:** raw colours, sizes, or durations inside component rules are forbidden. Reference a `--custom-property` from `:root`.
- **Mobile-first** media queries: base styles target small screens, `min-width` queries layer additional rules.
- **Class naming:** descriptive and component-scoped (`hero`, `hero-subtitle`, `metric-value`). No utility soup.
- **Selectors:** avoid IDs for styling. Avoid `!important` except for explicit override layers.
- **Specificity:** keep selectors flat (one or two levels).
- **Section comments:** divide the stylesheet with banner comments matching the table of contents in the file.

### JavaScript

- **ES2022+**, vanilla, no transpilation.
- **Modules:** `<script type="module">` for `main.js` and `i18n.js`.
- **`const` by default**, `let` only when reassignment is needed. Never `var`.
- **Strict equality:** `===` and `!==`. No `==`.
- **Arrow functions** for short, non-method functions. Named `function` for top-level definitions to aid stack traces.
- **No global pollution:** every script wraps its code in a module or an IIFE.
- **Comments:** explain *why*, not *what*. The code shows what.
- **Naming:** `camelCase` for variables and functions, `UPPER_SNAKE_CASE` for constants, `PascalCase` for constructors/classes.

### Markdown

- One sentence per line in long-form documents (improves diff readability).
- ATX-style headings (`#`, not underline).
- Reference-style links for repeated URLs.
- Code fences use language hints (` ```js`, ` ```css`, ` ```bash`).

---

## Common tasks

### Edit existing text content

1. Identify which page contains the text.
2. Open the page's HTML to find the element and its `data-i18n="key.path"` attribute.
3. Open `assets/data/<language>.json` and update the value under that key.
4. Repeat for every language (six in total).
5. CI will flag any missing keys.

### Add a new translation key

1. In the HTML, add `data-i18n="section.new_key"` to the element.
2. Add `"new_key": "..."` under the relevant section in **all six** language files.
3. Commit with `feat(i18n): add <key> across all languages`.

### Add a new language

1. Create `assets/data/<lang>.json` mirroring the existing schema.
2. Translate every key.
3. Add the language to `LANGUAGES` in `assets/js/i18n.js`.
4. Add a button in the language switcher in every HTML page.
5. Update `<link rel="alternate" hreflang="<lang>">` in every `<head>`.
6. Update [`README.md`](README.md) language table.
7. Commit with `feat(i18n): add <language> translation`.

### Add a new page

1. Duplicate an existing top-level page (`technology.html` is the cleanest template).
2. Update `<title>`, `<meta>` tags, canonical URL, and `hreflang` block.
3. Add the new section to `sitemap.xml`.
4. Add a navigation link in the header of every page.
5. Translate the new keys in all six language files.
6. Commit with `feat(<page-name>): add page`.

### Modify the design system

Changes to colour, spacing, or typography are made **only** in the `:root` block of `assets/css/styles.css`. Component rules consume the tokens. Never override a token inside a component.

After any token change, run a visual review against all pages in both themes.

### Add images

1. Optimise the image: max 1920 px wide, WebP with JPEG fallback, < 200 KB.
2. Place under `assets/img/` with a descriptive lowercase-hyphenated name.
3. Reference with explicit `width` and `height` attributes to prevent layout shift.
4. Always include meaningful `alt` text.
5. Use `loading="lazy"` for images below the fold.

---

## Quality checks

Before opening a pull request, verify locally:

- [ ] HTML validates ([validator.w3.org](https://validator.w3.org)).
- [ ] CSS validates ([jigsaw.w3.org](https://jigsaw.w3.org/css-validator/)).
- [ ] No console errors or warnings.
- [ ] All six languages render without missing keys.
- [ ] Both themes render correctly.
- [ ] Lighthouse scores meet targets (see [`ARCHITECTURE.md`](ARCHITECTURE.md#performance)).
- [ ] Keyboard navigation reaches every interactive element.
- [ ] Page works with JavaScript disabled (content readable, navigation functional).

CI runs equivalent automated checks on every pull request.

---

## Reporting issues

For bugs, use the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md). Include browser, version, theme, language, and reproduction steps.

For feature ideas, use the [feature request template](.github/ISSUE_TEMPLATE/feature_request.md).

For security vulnerabilities, **do not** open a public issue. Follow the [security policy](SECURITY.md).

---

*Thank you for contributing to Almenara.*
