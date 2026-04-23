# Hyatt Casino Mendoza — Landing Page

Landing page mobile-first para captura de leads vía QR en vía pública.
Turistas internacionales (BR / US / AR) que escanean desde buses turísticos.

---

## Estructura del proyecto

```
casino-landing/
├── index.html          ← Página principal
├── css/
│   └── styles.css      ← Estilos (mobile-first, design tokens)
├── js/
│   └── main.js         ← i18n, formulario, animaciones, analytics
├── assets/
│   ├── og-image.jpg    ← Imagen Open Graph 1200×630px (agregar)
│   └── favicon.ico     ← Favicon (agregar)
└── README.md
```

---

## Subir a GitHub

### Primera vez (repositorio nuevo)

```bash
# 1. Inicializar el repositorio
cd casino-landing
git init
git branch -M main

# 2. Agregar todos los archivos
git add .
git commit -m "feat: landing page inicial"

# 3. Crear el repositorio en GitHub y conectarlo
#    (crear el repo vacío en github.com primero, sin README)
git remote add origin https://github.com/TU-USUARIO/casino-landing.git
git push -u origin main
```

### Actualizaciones posteriores

```bash
git add .
git commit -m "feat: descripción del cambio"
git push
```

---

## Desplegar en Vercel

### Opción A — Desde GitHub (recomendado, deploy automático)

1. Ir a [vercel.com](https://vercel.com) e iniciar sesión
2. Click en **Add New → Project**
3. Importar el repositorio `casino-landing` desde GitHub
4. Configuración de build:
   - **Framework Preset:** Other
   - **Build Command:** *(dejar vacío)*
   - **Output Directory:** `.` *(punto — raíz del proyecto)*
5. Click en **Deploy**

> Cada `git push` a `main` dispara un redeploy automático.

### Opción B — Vercel CLI (deploy manual)

```bash
# Instalar CLI (una sola vez)
npm install -g vercel

# Desplegar desde la carpeta del proyecto
cd casino-landing
vercel

# Seguir el asistente:
#   Set up and deploy? → Y
#   Which scope? → tu cuenta
#   Link to existing project? → N
#   Project name → casino-landing
#   In which directory is your code? → ./
#   Override settings? → N

# Para producción:
vercel --prod
```

---

## Configurar dominio personalizado (Vercel)

1. Dashboard de Vercel → tu proyecto → **Settings → Domains**
2. Agregar tu dominio (ej: `casino.tuhotel.com`)
3. Configurar en tu proveedor DNS:
   - Registro `A`: `76.76.21.21`
   - O registro `CNAME`: `cname.vercel-dns.com`

---

## Variables a personalizar antes del deploy

### 1. Número de WhatsApp

En `js/main.js`, buscar todas las ocurrencias de `wa.me/5402610000000` y reemplazar con el número real:

```
wa.me/5402610000000  →  wa.me/54XXXXXXXXXX
```

El número debe incluir código de país sin el `+`:
- Argentina: `549261XXXXXXX` (Buenos Aires: `5411XXXXXXXX`)

### 2. URL del sitio

En `index.html`, reemplazar `https://casino-mendoza.vercel.app/` con la URL real en:
- `<link rel="canonical">`
- `<meta property="og:url">`
- `<meta property="og:image">` (URL de la imagen OG)
- `<meta name="twitter:image">`

### 3. Imagen Open Graph

Agregar en `/assets/og-image.jpg`:
- Tamaño: **1200 × 630 px**
- Contenido sugerido: fachada del casino + headline + logo

---

## Conectar el formulario a un webhook

En `js/main.js`, dentro del módulo `leadForm`, descomentar y completar:

```js
await fetch('https://hooks.zapier.com/hooks/catch/XXXXX/YYYYY', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
});
```

### Opciones de webhook

| Plataforma | Cómo crear el webhook |
|---|---|
| **Zapier** | New Zap → Trigger: Webhooks by Zapier → Catch Hook |
| **Make (ex Integromat)** | New scenario → Webhooks → Custom webhook |
| **Google Sheets** | Apps Script → Web App (deploy as web app) |

Los datos que llegan al webhook son:

```json
{
  "name": "João Silva",
  "whatsapp": "+55 11 9 1234-5678",
  "lang": "pt",
  "timestamp": "2025-04-23T14:30:00.000Z",
  "source": "qr_street"
}
```

---

## Activar Analytics

### Google Analytics 4

1. Crear propiedad en [analytics.google.com](https://analytics.google.com)
2. Agregar antes de `</head>` en `index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

3. En `js/main.js`, descomentar en el módulo `analytics`:

```js
if (typeof gtag === 'function') gtag('event', eventName, payload);
```

### Meta Pixel (Facebook / Instagram Ads)

1. Agregar el snippet de Meta Pixel en `<head>`
2. Descomentar en `js/main.js`:

```js
if (typeof fbq === 'function') fbq('trackCustom', eventName, payload);
```

---

## Idiomas soportados

| Código | Idioma | Detección automática |
|---|---|---|
| `pt` | Português (BR) | `navigator.language = pt-*` |
| `en` | English | `navigator.language = en-*` |
| `es` | Español (AR) | `navigator.language = es-*` |

**Default:** `pt` (portugués) si no se detecta ningún idioma soportado.

La elección manual se guarda en `localStorage` con la key `hcm_lang`.

---

## Checklist pre-lanzamiento

- [ ] Reemplazar número de WhatsApp en `main.js`
- [ ] Reemplazar URLs del sitio en `index.html`
- [ ] Agregar imagen OG en `/assets/og-image.jpg`
- [ ] Agregar favicon en `/assets/favicon.ico`
- [ ] Conectar formulario a webhook (Zapier / Make)
- [ ] Activar Google Analytics 4
- [ ] Configurar dominio personalizado en Vercel
- [ ] Testear en dispositivos iOS y Android reales
- [ ] Verificar velocidad en [PageSpeed Insights](https://pagespeed.web.dev/)

---

**Hyatt Casino Mendoza · Juego responsable · +18**
**Primitivo de la Reta 1124, Mendoza, Argentina**
