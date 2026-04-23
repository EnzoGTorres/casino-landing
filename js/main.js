/**
 * CASINO DEL HYATT MENDOZA — main.js
 * ─────────────────────────────────────────────────────────────
 * Módulos:
 *   1. TRANSLATIONS  — Diccionario centralizado PT / EN / ES
 *   2. i18n          — Detección automática + aplicación al DOM
 *   3. langSwitcher  — Selector manual de idioma
 *   4. leadForm      — Captura de leads + feedback
 *   5. animations    — Fade-in por scroll
 *   6. analytics     — Tracking de CTAs
 *   7. BOOTSTRAP     — Inicialización principal
 *
 * data-attributes reconocidos en HTML:
 *   data-i18n="key"                  → textContent
 *   data-i18n-html="key"             → innerHTML
 *   data-i18n-placeholder="key"      → attr placeholder
 *   data-i18n-href="key"             → attr href
 *   data-i18n-aria-label="key"       → attr aria-label
 *   data-i18n-attr="attrName:key"    → atributo genérico
 *   data-i18n-title="key"            → document.title
 *   data-i18n-meta-description="key" → <meta name="description"> content
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

function devLog(...args) {
  if (IS_DEV) console.log(...args);
}


/* ─────────────────────────────────────────────────────────────
   STORAGE — wrapper seguro para localStorage
   (falla silenciosamente en modo privado / cookies bloqueadas)
   ───────────────────────────────────────────────────────────── */
const storage = {
  get(key) {
    try { return localStorage.getItem(key); }
    catch { return null; }
  },
  set(key, value) {
    try { localStorage.setItem(key, value); }
    catch { /* ignorado */ }
  },
};


/* ═════════════════════════════════════════════════════════════
   1. TRANSLATIONS — Diccionario centralizado
   ─────────────────────────────────────────────────────────────
   Estructura de keys:
     page.*         → metadatos del documento
     brand.*        → marca
     hero.*         → sección hero
     how.*          → sección "cómo funciona"
     convert.*      → sección de conversión
     form.*         → formulario de captura
     footer.*       → pie de página
*/
const TRANSLATIONS = {

  /* ─── PORTUGUÉS (default) ─── */
  pt: {
    'page.title':             'Casino del Hyatt Mendoza — Ganhe crédito grátis!',
    'page.description':       'Jogue no Casino del Hyatt Mendoza. Carregue crédito com QR, Pix ou carteira digital. A 1 minuto de você.',

    'brand.name':             'Casino del Hyatt Mendoza',

    'hero.eyebrow':           'A 1 minuto de você',
    'hero.headline':          'Jogue no Casino del Hyatt Mendoza',
    'hero.subheadline':       'Nas nossas máquinas, carregue crédito com QR, Pix ou carteira digital',
    'hero.cta':               'GANHAR CRÉDITO',
    'hero.cta.ariaLabel':     'Ganhar crédito grátis pelo WhatsApp',
    'hero.trust':             '✓ QR Code · ✓ Pix · ✓ Carteira digital',
    'hero.whatsappUrl':       'https://wa.me/5402610000000?text=Quero+meu+crédito+grátis',

    'how.title':              'Como funciona?',
    'how.step1.heading':      'Entre no casino',
    'how.step1.body':         'A 1 minuto a pé. Nossa equipe te recebe na entrada.',
    'how.step2.heading':      'Carregue crédito na máquina',
    'how.step2.body':         'Use QR Code, Pix ou carteira digital direto na tela da máquina. Sem dinheiro em espécie.',
    'how.step3.heading':      'Jogue e divirta-se',
    'how.step3.body':         'Slots, roleta e muito mais. Mendoza te espera!',

    'convert.title':          'Pronto para jogar?',
    'convert.body':           'Fale conosco agora pelo WhatsApp e reserve seu crédito grátis.',
    'convert.cta':            'Falar no WhatsApp',
    'convert.cta.ariaLabel':  'Abrir WhatsApp para falar conosco',
    'convert.whatsappUrl':    'https://wa.me/5402610000000?text=Quero+meu+crédito+grátis',
    'convert.divider':        'ou deixe seu contato',

    'form.name.label':        'Nome',
    'form.name.placeholder':  'Seu nome',
    'form.phone.label':       'WhatsApp',
    'form.phone.placeholder': '+55 11 9 0000-0000',
    'form.submit':            'Quero meu crédito',
    'form.success':           '✓ Recebemos seu contato! Falaremos em instantes.',

    'footer.legal':           'Casino del Hyatt Mendoza · Jogo responsável · +18',
    'footer.address':         'Primitivo de la Reta 1124, Mendoza, Argentina',
  },

  /* ─── INGLÉS ─── */
  en: {
    'page.title':             'Casino del Hyatt Mendoza — Get your free credits!',
    'page.description':       'Play at Casino del Hyatt Mendoza. Load credits with QR, Pix or digital wallet. 1 minute from you.',

    'brand.name':             'Casino del Hyatt Mendoza',

    'hero.eyebrow':           '1 minute from you',
    'hero.headline':          'Play at Casino del Hyatt Mendoza',
    'hero.subheadline':       'At our machines, load credits with QR, Pix or digital wallet',
    'hero.cta':               'GET FREE CREDIT',
    'hero.cta.ariaLabel':     'Get free credit via WhatsApp',
    'hero.trust':             '✓ QR Code · ✓ Pix · ✓ Digital wallet',
    'hero.whatsappUrl':       'https://wa.me/5402610000000?text=I+want+my+free+credits',

    'how.title':              'How does it work?',
    'how.step1.heading':      'Come in',
    'how.step1.body':         '1 minute on foot. Our team welcomes you at the entrance.',
    'how.step2.heading':      'Load credits at the machine',
    'how.step2.body':         'Use QR Code, Pix or digital wallet right on the machine screen. No cash needed.',
    'how.step3.heading':      'Play and have fun',
    'how.step3.body':         'Slots, roulette and much more. Mendoza awaits you!',

    'convert.title':          'Ready to play?',
    'convert.body':           'Chat with us now on WhatsApp and claim your free credit.',
    'convert.cta':            'Chat on WhatsApp',
    'convert.cta.ariaLabel':  'Open WhatsApp to chat with us',
    'convert.whatsappUrl':    'https://wa.me/5402610000000?text=I+want+my+free+credits',
    'convert.divider':        'or leave your contact',

    'form.name.label':        'Name',
    'form.name.placeholder':  'Your name',
    'form.phone.label':       'WhatsApp',
    'form.phone.placeholder': '+1 555 000-0000',
    'form.submit':            'Claim my free credit',
    'form.success':           "✓ We got your info! We'll be in touch shortly.",

    'footer.legal':           'Casino del Hyatt Mendoza · Responsible gambling · +18',
    'footer.address':         'Primitivo de la Reta 1124, Mendoza, Argentina',
  },

  /* ─── ESPAÑOL ─── */
  es: {
    'page.title':             'Casino del Hyatt Mendoza — ¡Obtené tu crédito gratis!',
    'page.description':       'Viví el Casino del Hyatt Mendoza. Cargá crédito con QR, Pix o billetera virtual. A 1 minuto de donde estás.',

    'brand.name':             'Casino del Hyatt Mendoza',

    'hero.eyebrow':           'A 1 minuto de donde estás',
    'hero.headline':          'Viví el Casino del Hyatt Mendoza',
    'hero.subheadline':       'En nuestras máquinas, cargá crédito con QR, Pix o billetera virtual',
    'hero.cta':               'OBTENER CRÉDITO',
    'hero.cta.ariaLabel':     'Obtener crédito gratis por WhatsApp',
    'hero.trust':             '✓ QR Code · ✓ Pix · ✓ Billetera virtual',
    'hero.whatsappUrl':       'https://wa.me/5402610000000?text=Quiero+mi+crédito+gratis',

    'how.title':              '¿Cómo funciona?',
    'how.step1.heading':      'Entrá al casino',
    'how.step1.body':         'A 1 minuto caminando. Nuestro equipo te recibe en la entrada.',
    'how.step2.heading':      'Cargá crédito en la máquina',
    'how.step2.body':         'Usá QR Code, Pix o billetera virtual directo en la pantalla de la máquina. Sin efectivo.',
    'how.step3.heading':      'Jugá y divertite',
    'how.step3.body':         'Slots, ruleta y mucho más. ¡Mendoza te espera!',

    'convert.title':          '¿Listo para jugar?',
    'convert.body':           'Hablanos ahora por WhatsApp y reservá tu crédito gratis.',
    'convert.cta':            'Hablar por WhatsApp',
    'convert.cta.ariaLabel':  'Abrir WhatsApp para hablar con nosotros',
    'convert.whatsappUrl':    'https://wa.me/5402610000000?text=Quiero+mi+crédito+gratis',
    'convert.divider':        'o dejá tu contacto',

    'form.name.label':        'Nombre',
    'form.name.placeholder':  'Tu nombre',
    'form.phone.label':       'WhatsApp',
    'form.phone.placeholder': '+54 9 261 000-0000',
    'form.submit':            'Quiero mi crédito',
    'form.success':           '✓ ¡Recibimos tu contacto! Te escribimos en instantes.',

    'footer.legal':           'Casino del Hyatt Mendoza · Juego responsable · +18',
    'footer.address':         'Primitivo de la Reta 1124, Mendoza, Argentina',
  },
};


/* ═════════════════════════════════════════════════════════════
   2. i18n — Detección y aplicación al DOM
   ───────────────────────────────────────────────────────────── */
const i18n = (() => {

  const STORAGE_KEY = 'hcm_lang';
  const SUPPORTED   = ['pt', 'en', 'es'];
  const DEFAULT     = 'pt';

  const LOCALE_MAP = { pt: 'pt-BR', en: 'en', es: 'es-AR' };

  /* detect()
   * Prioridad: localStorage → navigator.languages[] → DEFAULT
   */
  function detect() {
    const saved = storage.get(STORAGE_KEY);
    if (saved && SUPPORTED.includes(saved)) return saved;

    const langs = Array.from(navigator.languages || [navigator.language || '']);
    for (const lang of langs) {
      const code = lang.split('-')[0].toLowerCase();
      if (SUPPORTED.includes(code)) return code;
    }

    return DEFAULT;
  }

  /* apply(lang)
   * Aplica todas las traducciones al DOM en un solo recorrido por tipo.
   */
  function apply(lang) {
    const dict = TRANSLATIONS[lang] ?? TRANSLATIONS[DEFAULT];

    _applyTextContent(dict);
    _applyInnerHTML(dict);
    _applyAttribute('placeholder', '[data-i18n-placeholder]', 'i18nPlaceholder', dict);
    _applyAttribute('href',        '[data-i18n-href]',        'i18nHref',        dict);
    _applyAttribute('aria-label',  '[data-i18n-aria-label]',  'i18nAriaLabel',   dict);
    _applyGenericAttr(dict);
    _applyDocumentTitle(dict);
    _applyMetaDescription(dict);

    document.documentElement.setAttribute('lang', LOCALE_MAP[lang] ?? lang);
    storage.set(STORAGE_KEY, lang);
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  }

  /* current() — idioma activo */
  function current() {
    const saved = storage.get(STORAGE_KEY);
    return (saved && SUPPORTED.includes(saved)) ? saved : detect();
  }

  /* t(key) — traducción en el idioma activo, para uso en JS */
  function t(key) {
    const dict = TRANSLATIONS[current()] ?? TRANSLATIONS[DEFAULT];
    return _get(dict, key) ?? key;
  }

  /* ── Privadas ─────────────────────────────────────────────── */

  function _applyTextContent(dict) {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const val = _get(dict, el.dataset.i18n);
      if (val !== null) el.textContent = val;
    });
  }

  function _applyInnerHTML(dict) {
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const val = _get(dict, el.dataset.i18nHtml);
      if (val !== null) el.innerHTML = val;
    });
  }

  function _applyAttribute(attrName, selector, dataKey, dict) {
    document.querySelectorAll(selector).forEach((el) => {
      const val = _get(dict, el.dataset[dataKey]);
      if (val !== null) el.setAttribute(attrName, val);
    });
  }

  function _applyGenericAttr(dict) {
    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      const raw      = el.dataset.i18nAttr ?? '';
      const colonIdx = raw.indexOf(':');
      if (colonIdx === -1) return;
      const attr = raw.slice(0, colonIdx).trim();
      const key  = raw.slice(colonIdx + 1).trim();
      const val  = _get(dict, key);
      if (val !== null && attr) el.setAttribute(attr, val);
    });
  }

  function _applyDocumentTitle(dict) {
    const el = document.querySelector('[data-i18n-title]');
    if (!el) return;
    const val = _get(dict, el.dataset.i18nTitle);
    if (val !== null) document.title = val;
  }

  function _applyMetaDescription(dict) {
    const el = document.querySelector('[data-i18n-meta-description]');
    if (!el) return;
    const val = _get(dict, el.dataset.i18nMetaDescription);
    if (val !== null) el.setAttribute('content', val);
  }

  function _get(dict, key) {
    if (!key) return null;
    if (key in dict) return dict[key];
    if (IS_DEV) console.warn(`[i18n] Key no encontrada: "${key}"`);
    return null;
  }

  return { detect, apply, current, t, SUPPORTED };

})();


/* ═════════════════════════════════════════════════════════════
   3. langSwitcher — Selector manual de idioma
   ───────────────────────────────────────────────────────────── */
const langSwitcher = (() => {

  function init() {
    const buttons = document.querySelectorAll('.lang-btn[data-lang]');

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        if (!i18n.SUPPORTED.includes(lang)) return;
        _setActive(buttons, lang);
        i18n.apply(lang);
      });
    });
  }

  function sync(lang) {
    _setActive(document.querySelectorAll('.lang-btn[data-lang]'), lang);
  }

  function _setActive(buttons, activeLang) {
    buttons.forEach((btn) => {
      const active = btn.dataset.lang === activeLang;
      btn.classList.toggle('lang-btn--active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
  }

  return { init, sync };

})();


/* ═════════════════════════════════════════════════════════════
   4. leadForm — Captura de leads
   ───────────────────────────────────────────────────────────── */
const leadForm = (() => {

  function init() {
    const form    = document.getElementById('leadForm');
    const success = document.getElementById('formSuccess');
    const submit  = form?.querySelector('[type="submit"]');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      /* Estado de carga */
      _setLoading(submit, true);

      const payload = {
        name:      form.elements['name'].value.trim(),
        whatsapp:  form.elements['whatsapp'].value.trim(),
        lang:      i18n.current(),
        timestamp: new Date().toISOString(),
        source:    'qr_street',
      };

      /* ── TODO: conectar a webhook ────────────────────────────
         Descomentar y reemplazar la URL cuando esté disponible:

         try {
           await fetch('https://hooks.zapier.com/hooks/catch/XXXXX', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify(payload),
           });
         } catch (err) {
           if (IS_DEV) console.error('[leadForm] Error al enviar:', err);
         }
      ────────────────────────────────────────────────────────── */
      devLog('[leadForm] Lead:', payload);

      /* Feedback visual */
      form.reset();
      _setLoading(submit, false);

      if (success) {
        success.textContent = i18n.t('form.success');
        success.hidden = false;
        success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      analytics.track('form_submit', { lang: payload.lang });
    });
  }

  function _setLoading(btn, isLoading) {
    if (!btn) return;
    btn.classList.toggle('btn--loading', isLoading);
    btn.disabled = isLoading;
  }

  return { init };

})();


/* ═════════════════════════════════════════════════════════════
   5. animations — Fade-in por scroll
   ───────────────────────────────────────────────────────────── */
const animations = (() => {

  function init() {
    /* Saltar si el usuario prefiere movimiento reducido */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll('.step, .section--convert').forEach((el) => {
      observer.observe(el);
    });
  }

  return { init };

})();


/* ═════════════════════════════════════════════════════════════
   6. analytics — Tracking de CTAs
   ───────────────────────────────────────────────────────────── */
const analytics = (() => {

  /* track(eventName, payload)
   *
   * Para activar Google Analytics 4:
   *   Agregar en <head>: <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX"></script>
   *   Descomentar la línea gtag() de abajo.
   *
   * Para activar Meta Pixel:
   *   Agregar el snippet de Meta Pixel en <head>.
   *   Descomentar la línea fbq() de abajo.
   */
  function track(eventName, payload = {}) {
    devLog(`[analytics] ${eventName}`, payload);
    // if (typeof gtag === 'function') gtag('event', eventName, payload);
    // if (typeof fbq === 'function')  fbq('trackCustom', eventName, payload);
  }

  function initCTATracking() {
    document.querySelectorAll('[data-event]').forEach((el) => {
      el.addEventListener('click', () => {
        track(el.dataset.event, { lang: i18n.current() });
      });
    });
  }

  return { track, initCTATracking };

})();


/* ═════════════════════════════════════════════════════════════
   7. BOOTSTRAP
   ───────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  const lang = i18n.detect();
  i18n.apply(lang);
  langSwitcher.sync(lang);
  langSwitcher.init();
  leadForm.init();
  animations.init();
  analytics.initCTATracking();

  devLog(`[app] Iniciado en idioma: ${lang}`);

});
