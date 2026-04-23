# Assets — Imágenes del casino

Copiar las fotos del casino a esta carpeta con los nombres exactos:

| Archivo esperado     | Descripción                                      | Sección   |
|----------------------|--------------------------------------------------|-----------|
| `hero-slots.jpg`     | Máquinas tragamonedas con neon rojo/azul oscuro  | Hero      |
| `casino-floor.jpg`   | Piso amplio del casino (ruleta + slots + luces)  | Paso a paso |
| `poker-bar.jpg`      | Mesa de poker con bar al fondo                   | Conversión |
| `og-image.jpg`       | Imagen para redes sociales (1200 × 630 px)       | OG / SEO  |
| `favicon.ico`        | Ícono del sitio                                  | Browser   |

## Recomendaciones de optimización

Antes de subir a Vercel, comprimir las imágenes:
- Usar [Squoosh](https://squoosh.app/) o [TinyPNG](https://tinypng.com/)
- Objetivo: < 200 KB por imagen de fondo
- Formato: JPG con calidad 80–85%

## Fallback sin imágenes

El diseño funciona correctamente sin las imágenes — el CSS usa
gradientes oscuros como fallback automático. Las imágenes solo
agregan la capa visual de profundidad y ambiente.
