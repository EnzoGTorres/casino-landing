/**
 * DREAMS PLAZA CASINO — main.js
 * ─────────────────────────────────────────────────────────────
 * Módulos:
 *   1. NAV        — Sticky con backdrop blur en scroll
 *   2. SCROLL     — Smooth scroll para links de ancla
 *   3. ANIMATIONS — Fade-in por IntersectionObserver
 *   4. WAPP FLOAT — Botón flotante de WhatsApp
 *   5. ANALYTICS  — Tracking de CTAs (GA4 + Meta Pixel listo)
 *   6. BOOTSTRAP  — Inicialización principal
 */

'use strict';

/* ─────────────────────────────────────────────────────────────
   ENTORNO — solo loguear en desarrollo
   ───────────────────────────────────────────────────────────── */
const IS_DEV = (
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1' ||
  window.location.hostname.endsWith('.local')
);

const devLog = (...args) => { if (IS_DEV) console.log('[DP]', ...args); };


/* ═════════════════════════════════════════════════════════════
   1. NAV — Sticky con backdrop blur al salir del hero
   ─────────────────────────────────────────────────────────────
   Agrega la clase .nav--scrolled cuando el hero deja de estar
   visible. El CSS hace el resto (blur + fondo oscuro).
*/
const nav = (() => {

  function init() {
    const navEl  = document.getElementById('nav');
    const heroEl = document.getElementById('hero');
    if (!navEl || !heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => navEl.classList.toggle('nav--scrolled', !entry.isIntersecting),
      { threshold: 0.15 }
    );

    observer.observe(heroEl);
    devLog('Nav observer listo');
  }

  return { init };

})();


/* ═════════════════════════════════════════════════════════════
   2. SCROLL SUAVE — Para todos los links de ancla internos
   ─────────────────────────────────────────────────────────────
   Respeta la variable scroll-padding-top del CSS (espacio para nav).
*/
const smoothScroll = (() => {

  function init() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const id     = link.getAttribute('href');
        const target = document.querySelector(id);
        if (!target) return;

        e.preventDefault();

        /* Usa scrollIntoView con behavior smooth — el scroll-padding-top
           del CSS maneja el espacio del nav automáticamente */
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        /* Actualiza la URL sin saltar */
        history.pushState(null, '', id);
      });
    });

    devLog('Smooth scroll listo');
  }

  return { init };

})();


/* ═════════════════════════════════════════════════════════════
   3. ANIMATIONS — Fade-in escalonado por IntersectionObserver
   ─────────────────────────────────────────────────────────────
   Observa todos los elementos con:
     - [data-animate]         → fade-up genérico
     - .event-card            → tarjetas de eventos
     - .gastro-card           → tarjetas de gastronomía
     - .poker__content        → bloque de poker
     - .gallery-instagram     → link de instagram
     - .gastro-cta            → CTA de gastronomía
     - .cta-final__content    → bloque CTA final

   Agrega .is-visible cuando entran en viewport.
   El CSS maneja la transición.
*/
const animations = (() => {

  const SELECTORS = [
    '[data-animate]',
    '.event-card',
    '.gastro-card',
    '.poker__content',
    '.gallery-instagram',
    '.gastro-cta',
    '.cta-final__content',
  ].join(', ');

  function init() {
    /* Saltar animaciones si el usuario lo prefiere */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll(SELECTORS).forEach((el) => {
        el.classList.add('is-visible');
      });
      return;
    }

    if (!('IntersectionObserver' in window)) {
      /* Fallback: mostrar todo sin animación */
      document.querySelectorAll(SELECTORS).forEach((el) => {
        el.classList.add('is-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold:   0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    document.querySelectorAll(SELECTORS).forEach((el) => observer.observe(el));
    devLog('Animations observer listo');
  }

  return { init };

})();


/* ═════════════════════════════════════════════════════════════
   4. WHATSAPP FLOTANTE — Aparece al bajar 300px
   ─────────────────────────────────────────────────────────────
   El botón se revela suavemente después de que el usuario
   hace scroll y ya no ve el CTA del hero.
*/
const wappFloat = (() => {

  const THRESHOLD = 300; // px desde top

  function init() {
    const el = document.getElementById('wappFloat');
    if (!el) return;

    let visible = false;

    const onScroll = () => {
      const shouldShow = window.scrollY > THRESHOLD;
      if (shouldShow === visible) return;
      visible = shouldShow;
      el.classList.toggle('wapp-float--visible', visible);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); /* chequear estado inicial */

    devLog('WhatsApp float listo');
  }

  return { init };

})();


/* ═════════════════════════════════════════════════════════════
   5. ANALYTICS — Tracking de CTAs
   ─────────────────────────────────────────────────────────────
   Para activar Google Analytics 4:
     1. Agregar en <head>:
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        </script>
     2. Descomentar la línea gtag() más abajo.

   Para activar Meta Pixel (Instagram/Facebook retargeting):
     1. Agregar el snippet oficial de Meta Pixel en <head>.
     2. Descomentar la línea fbq() más abajo.
*/
const analytics = (() => {

  function track(eventName, payload = {}) {
    devLog(`[analytics] ${eventName}`, payload);

    // ── Google Analytics 4 ──────────────────────────────────
    // if (typeof gtag === 'function') {
    //   gtag('event', eventName, payload);
    // }

    // ── Meta Pixel ──────────────────────────────────────────
    // if (typeof fbq === 'function') {
    //   fbq('trackCustom', eventName, payload);
    // }
  }

  function initCTATracking() {
    document.querySelectorAll('[data-event]').forEach((el) => {
      el.addEventListener('click', () => {
        track(el.dataset.event, {
          section: el.closest('section, header')?.id ?? 'unknown',
        });
      });
    });
  }

  return { track, initCTATracking };

})();


/* ═════════════════════════════════════════════════════════════
   6. BOOTSTRAP — Inicialización principal
*/
document.addEventListener('DOMContentLoaded', () => {

  nav.init();
  smoothScroll.init();
  animations.init();
  wappFloat.init();
  analytics.initCTATracking();

  devLog('Dreams Plaza Casino — iniciado correctamente ✓');

});
