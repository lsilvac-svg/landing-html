# Landing Page — Enfermería Técnica IESRP

Landing page estática (HTML + CSS + JavaScript vanilla, sin frameworks ni build step) convertida desde el prototipo original en React/Figma Make. Lista para publicar en cualquier hosting estático.

## Estructura del proyecto

```
landing-html/
├── index.html          # Toda la página (una sola landing, secciones semánticas)
├── robots.txt           # Reglas para crawlers + referencia al sitemap
├── sitemap.xml           # Sitemap XML para buscadores
├── css/
│   ├── variables.css     # Tokens de diseño: colores, tipografías, espaciados
│   ├── base.css          # Reset + estilos globales (fuente, scrollbar, etc.)
│   ├── utilities.css     # Clases reutilizables (badges, botones, ocultar/mostrar)
│   ├── header.css        # Cabecera fija
│   ├── hero.css          # Portada + formulario de captación
│   ├── bento.css         # Grid de infraestructura
│   ├── curriculum.css    # Malla curricular (tabs por año/módulo)
│   ├── gallery.css       # Galería de fotos + lightbox
│   ├── social.css        # Sección de TikTok / YouTube
│   ├── testimonials.css  # Convenios + testimonios de egresados
│   ├── faq.css           # Acordeón de preguntas frecuentes
│   ├── cta.css           # Bloque de cierre (formulario + WhatsApp)
│   ├── footer.css        # Pie de página
│   └── sticky-bar.css    # Barra fija inferior en móvil
└── js/
    ├── main.js            # Punto de entrada: inicializa todos los módulos
    ├── utils.js            # Helpers compartidos (selectores, WhatsApp)
    ├── heroForm.js         # Selector de sede + envío del formulario del hero
    ├── curriculumTabs.js   # Cambio de módulo/año en la malla curricular
    ├── gallery.js          # Lógica del lightbox (abrir, cerrar, navegar)
    ├── faqAccordion.js     # Acordeón de preguntas frecuentes
    └── stickyBar.js        # Mostrar/ocultar la barra fija en móvil al hacer scroll
```

Cada sección visual tiene **su propio archivo CSS** y, cuando necesita interacción, **su propio archivo JS**. Para modificar una sección solo hay que tocar su archivo correspondiente — no hay estilos ni lógica mezclados entre módulos.

## Cómo previsualizar localmente

Los scripts usan `<script type="module">`, por lo que los navegadores no los cargan si abres `index.html` directamente con doble clic (protocolo `file://`). Sirve la carpeta con cualquier servidor estático, por ejemplo:

```bash
npx serve landing-html
```

o con Python:

```bash
python -m http.server --directory landing-html 5500
```

Luego abre `http://localhost:5500` (o el puerto que indique la herramienta).

## Cómo publicarlo

Es un sitio 100% estático: sube el contenido de `landing-html/` a cualquier hosting (Netlify, Vercel, GitHub Pages, Cloudflare Pages, S3 + CloudFront, cPanel, etc.). No requiere build ni Node.js en producción.

## Antes de publicar — reemplazar datos de ejemplo

El contenido conserva los datos ficticios del prototipo original. Antes de salir a producción, actualiza:

- **Dominio real**: reemplaza `https://www.iesrp.edu.pe/` en `index.html` (`<link rel="canonical">`, etiquetas Open Graph), `robots.txt` y `sitemap.xml`.
- **Teléfonos y WhatsApp**: número `+51 944 123 456` / `51944123456` usado en el formulario del hero, el botón de WhatsApp y el footer (`js/heroForm.js`, `index.html`).
- **Correo y teléfono fijo** del footer (`admision@iesrp.edu.pe`, `(01) 441-6000`).
- **Direcciones de sedes**, RUC y N° de licencia MINEDU (footer).
- **Enlaces reales de TikTok/YouTube** (actualmente apuntan a `@iesrp` genérico).
- **Enlace al Libro de Reclamaciones Virtual** (footer) — hoy apunta a `/libro-de-reclamaciones.html`, que no existe; enlázalo a la plataforma real exigida por INDECOPI.
- **PDFs de temario** — los botones "Descargar temario en PDF" tienen `href="#"`; deben apuntar a los archivos reales.
- **Fotos**: todas las imágenes son de Unsplash (solo para maquetar). Cámbialas por fotografías reales del instituto antes de publicar.
- **Imagen de Open Graph** (`og:image`) — súbela y actualiza la URL.

## Comportamiento del formulario

Como es un sitio estático sin backend, el formulario del hero valida los campos obligatorios y luego abre WhatsApp con un mensaje pre-armado con los datos ingresados (`js/heroForm.js`). El bloque de cierre (`#formulario-cierre`) es ahora solo un botón directo a WhatsApp, sin formulario propio. Si más adelante se agrega un backend o un CRM, solo hay que cambiar el `submit` handler de `js/heroForm.js`.

## Notas técnicas

- Diseño mobile-first con 3 puntos de quiebre: móvil (`<640px`), tablet (`640–1023px`) y escritorio (`≥1024px`).
- Usa `color-mix()` en CSS (soportado en navegadores modernos: Chrome/Edge 111+, Safari 16.2+, Firefox 113+) para calcular tonos según el color de cada módulo curricular.
- Sin dependencias externas aparte de la fuente de Google Fonts (Plus Jakarta Sans + Inter), cargada en `css/base.css`.
- **Tipografía reducida a 3 tamaños** definidos en `css/variables.css`: `--fs-title` (títulos H1/H2), `--fs-subtitle` (subtítulos y nombres de tarjeta) y `--fs-text` (todo el resto: párrafos, botones, etiquetas, badges). Los íconos/emoji decorativos (⭐, ✕, flechas del lightbox, etc.) no forman parte de esta escala. Para cambiar el tamaño de cualquier texto del sitio, edita esas 3 variables en un solo lugar.
- **Color principal**: `--color-cyan` en `css/variables.css` controla el teal de marca (`#00afaa`) usado en badges, acentos, bordes y el banner del formulario del hero. El CTA (`--color-orange`) se retocó a un coral cálido para armonizar con ese teal.
- El header ya no tiene botones de "Llamar a Admisión" ni "Solicitar Info"; el bloque de cierre ya no tiene el botón "Solicitar llamada de admisión" — ambos se retiraron a pedido, dejando WhatsApp como la única vía de contacto directo fuera del formulario del hero.
