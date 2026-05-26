/* ============================================================
   ALMENARA · Internationalisation engine
   Six languages: en · es · fr · de · it · ru
   Detection order: URL ?lang → localStorage → navigator → 'en'
   ============================================================ */

(function () {
  'use strict';

  const LANG_KEY      = 'almenara.lang';
  const DEFAULT_LANG  = 'en';
  const SUPPORTED     = ['en', 'es', 'fr', 'de', 'it', 'ru'];

  /* ---------- Detection ---------- */
  function detectLanguage() {
    const url = new URL(window.location.href);
    const urlLang = url.searchParams.get('lang');
    if (urlLang && SUPPORTED.includes(urlLang)) return urlLang;

    try {
      const stored = localStorage.getItem(LANG_KEY);
      if (stored && SUPPORTED.includes(stored)) return stored;
    } catch (e) { /* noop */ }

    const browser = (navigator.languages || [navigator.language || ''])
      .map((l) => l.toLowerCase().slice(0, 2));
    for (const lang of browser) {
      if (SUPPORTED.includes(lang)) return lang;
    }

    return DEFAULT_LANG;
  }

  /* ---------- Helpers ---------- */
  function getNested(obj, path) {
    return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : null), obj);
  }

  async function loadTranslations(lang) {
    try {
      const response = await fetch(`/assets/data/${lang}.json`, { cache: 'no-cache' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`[i18n] Failed to load ${lang}.json:`, error);
      if (lang !== DEFAULT_LANG) return loadTranslations(DEFAULT_LANG);
      return null;
    }
  }

  function applyTranslations(dict) {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const value = getNested(dict, key);
      if (typeof value === 'string') {
        el.textContent = value;
      }
    });

    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      // Format: data-i18n-attr="placeholder:form.email,title:form.email_hint"
      const pairs = el.getAttribute('data-i18n-attr').split(',');
      pairs.forEach((pair) => {
        const [attr, key] = pair.split(':').map((s) => s.trim());
        const value = getNested(dict, key);
        if (typeof value === 'string') el.setAttribute(attr, value);
      });
    });
  }

  function updateActiveButton(lang) {
    document.querySelectorAll('.lang-btn').forEach((btn) => {
      const isActive = btn.dataset.lang === lang;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  }

  function updateUrl(lang) {
    const url = new URL(window.location.href);
    if (lang === DEFAULT_LANG) {
      url.searchParams.delete('lang');
    } else {
      url.searchParams.set('lang', lang);
    }
    window.history.replaceState({}, '', url.toString());
  }

  /* ---------- Public API ---------- */
  async function setLanguage(lang) {
    if (!SUPPORTED.includes(lang)) lang = DEFAULT_LANG;

    const dict = await loadTranslations(lang);
    if (!dict) return;

    applyTranslations(dict);
    document.documentElement.setAttribute('lang', lang);
    updateActiveButton(lang);
    updateUrl(lang);

    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch (e) { /* noop */ }
  }

  /* ---------- Bindings ---------- */
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      if (lang) setLanguage(lang);
    });
  });

  /* ---------- Initial run ---------- */
  setLanguage(detectLanguage());

  // Expose minimal API for other modules (none yet, but reserves the namespace)
  window.Almenara = window.Almenara || {};
  window.Almenara.i18n = { setLanguage, getSupported: () => SUPPORTED.slice() };

})();
