/* ============================================================
   ALMENARA · Main site script
   - Theme toggle (dark/light) with persistence
   - Scroll-triggered reveal of sections
   - Respects prefers-reduced-motion
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Theme toggle ---------- */
  const THEME_KEY = 'almenara.theme';
  const root = document.documentElement;
  const toggleBtn = document.querySelector('[data-theme-toggle]');

  function getTheme() {
    return root.getAttribute('data-theme') || 'dark';
  }

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      /* localStorage unavailable */
    }
    // Update meta theme-color for mobile browser chrome
    const meta = document.querySelector('meta[name="theme-color"]:not([media])');
    if (meta) {
      meta.setAttribute('content', theme === 'dark' ? '#0E1A2A' : '#F4F0E8');
    }
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      setTheme(getTheme() === 'dark' ? 'light' : 'dark');
    });
  }

  // React to system preference changes when no explicit choice was made
  if (window.matchMedia) {
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    mq.addEventListener('change', (e) => {
      try {
        if (!localStorage.getItem(THEME_KEY)) {
          setTheme(e.matches ? 'light' : 'dark');
        }
      } catch (err) { /* noop */ }
    });
  }

  /* ---------- Scroll reveal ---------- */
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length > 0) {
    if (reducedMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach((el) => el.classList.add('is-visible'));
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
      );
      revealEls.forEach((el) => observer.observe(el));
    }
  }

})();
