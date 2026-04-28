# 📋 Task List — Web Psicología Adamna Mazú

> Implementación de los bloques definidos en `Requerimientos.md`.  
> Cada tarea respeta los patrones del proyecto: variables CSS en `:root`, clases semánticas en español (`seccion-*`, `tarjeta-*`), JS modular por archivo, y fuentes `El Messiri` / `Libre Baskerville`.

---

## FASE 0 — Preparación

- [x] **0.1** Actualizar `datos_negocio.json` con los datos reales de la profesional: ✅
  - [x] Nombre: "Lic. Adamna Mazú"
  - [x] Matrículas: M.P. 688 / M.N. 82481
  - [x] Teléfono WhatsApp: `+54 9 2966 486745`
  - [x] Email: `mazuadamna@gmail.com`
  - [x] Dirección: Río Turbio + La Plata (presencial) + Online todo el país
  - [x] Instagram: `https://www.instagram.com/ada.psicologa/`
  - [x] Campo TikTok agregado (vacío, pendiente URL del cliente)
  - [x] Facebook: campo vacío hasta confirmar con el cliente

- [ ] **0.2** Preparar imágenes en `assets/img/`:
  - [ ] Solicitar al cliente fotos profesionales (retrato + contexto laboral) → guardar en `assets/img/adamna/`
  - [ ] Solicitar fotos de talleres/charlas/eventos → guardar en `assets/img/intervenciones/`
  - [ ] Optimizar imágenes (compresión, tamaño máximo ~300KB)

- [ ] **0.3** Agregar variables CSS nuevas si son necesarias en `:root` de `styles.css`:
  - [ ] `--color-fondo-seccion-alt` para secciones con fondo alternado (si se usa)
  - [ ] `--color-acento-suave` para badges o tags (ej: especialidades)

---

## FASE 1 — Bloque 1: Presentación (Hero)

> **Archivo:** `index.html` (sección `#hero`)  
> **Archivo:** `assets/css/styles.css` (`.seccion-hero`)

- [ ] **1.1** Reestructurar el HTML del hero (`#hero`):
  - [ ] Agregar línea superior: `<p class="hero-subtitulo-superior">Psicóloga infanto-juvenil y de adultos</p>`
  - [ ] Cambiar el `<h1>` de `PSICOLOGA` → `Lic. Adamna Mazú` ⚠️ *El nombre está como `<p class="hero-name">` (L46), pero el `<h1>` sigue diciendo "PSICOLOGA"*
  - [ ] Unificar matrículas en una sola línea: `M.P. 688 | M.N. 82481` ⚠️ *Existen en L47-48 pero en líneas separadas*
  - [ ] Agregar párrafo breve de experiencia debajo de las matrículas
  - [x] Mantener el `<h2>` (Diplomada) con estilo actual ✅ *Ya existe en L52-53 con estilo inline*
  - [ ] Cambiar texto del CTA de "Contactar" → "Solicitar turno"
  - [x] Actualizar el `href` del CTA al enlace de WhatsApp o `#contacto` ✅ *Ya apunta a `#contacto` (L50)*

- [ ] **1.2** CSS para los nuevos elementos del hero:
  - [ ] Estilo `.hero-subtitulo-superior` (tipografía `--fuente-clasica`, tracking amplio, uppercase)
  - [x] Ajustar `.seccion-hero h1` si cambia el tamaño/estilo con el nuevo texto ✅ *CSS ya tiene `.seccion-hero h1` con font-size 3.5rem y color*
  - [ ] Estilo para el párrafo de experiencia (opacidad reducida, `font-size` menor)

---

## FASE 2 — Bloque 2: Validación Rápida

> **Archivo:** `index.html` (nueva sección después del hero)  
> **Archivo:** `assets/css/styles.css`

- [ ] **2.1** Crear sección `#validacion` con clase `seccion-validacion`:
  - [ ] Texto destacado: "Atención a niños, adolescentes, adultos y familias"
  - [ ] Línea de ubicación: "Presencial en Río Turbio y La Plata | Online en todo el país" ⚠️ *`#sobre-nosotros` menciona Río Turbio pero no La Plata ni Online*
  - [ ] Galería de fotos profesional (contenedor `.galeria-profesional`) ⚠️ *Existe 1 imagen en `#sobre-nosotros` pero no es galería*

- [ ] **2.2** CSS para la sección:
  - [ ] `.seccion-validacion` — padding, text-align center
  - [ ] `.galeria-profesional` — display grid/flex, gap, imágenes redondeadas
  - [ ] Responsive: 1 columna en mobile, 2-3 en desktop

---

## FASE 3 — Bloque "¿Por qué elegir este espacio?"

> **Archivo:** `index.html` (reemplaza/refactoriza `#beneficios`)  
> **Archivo:** `assets/css/styles.css`

- [ ] **3.1** Refactorizar sección `#beneficios`:
  - [ ] Cambiar título h2 a "¿Por qué elegir este espacio?" ⚠️ *Actualmente dice "Por qué elegirnos"*
  - [ ] Reemplazar las 3 tarjetas actuales por 4 tarjetas con anclas internas: ⚠️ *Hay 3 tarjetas sin links: "Profesionalismo y calidez", "Contención real", "Bienestar emocional guiado"*
    - [ ] "Profesionalismo y calidez" → `href="#sobre-mi"`
    - [ ] "Empatía real" → `href="#intervenciones"`
    - [ ] "Confidencialidad absoluta" → `href="#enfoque"`
    - [ ] "Amplia experiencia" → `href="#autoridad"`
  - [x] Cada tarjeta: icono/emoji + título + enlace (usar clase `.tarjeta-beneficio` existente) ✅ *La clase `.tarjeta-beneficio` ya existe con estilos completos*

- [ ] **3.2** CSS ajustes:
  - [ ] Agregar estilo para el enlace interno dentro de `.tarjeta-beneficio` (flecha, hover con color `--color-titulos`)
  - [ ] Ajustar grid a 4 columnas en desktop (`repeat(4, 1fr)` en media query `1201px`)

---

## FASE 4 — Bloque "Experiencia de pacientes" (Testimonios)

> **Archivo:** `index.html` (`#testimonios`)  
> **Archivo:** `assets/css/styles.css`

- [ ] **4.1** Actualizar sección `#testimonios`:
  - [ ] Cambiar título h2 a "Experiencia de pacientes" ⚠️ *Actualmente dice "Experiencias de nuestros clientes"*
  - [ ] Evaluar integración de reseñas reales desde Google Maps:
    - [ ] **Opción A:** Embed de Google Maps reviews (widget externo)
    - [x] **Opción B:** Copiar reseñas reales manualmente y mostrar con el diseño actual de `.tarjeta-testimonio` ✅ *Estructura de tarjetas funcional con 3 testimonios*
  - [ ] Actualizar textos, nombres y fotos de testimonios según datos reales
  - [ ] Reemplazar imágenes sintéticas por avatares genéricos o iniciales (si no hay fotos reales) ⚠️ *Imágenes actuales pesan ~1.3MB c/u, son sintéticas*

- [ ] **4.2** CSS (si cambia el diseño):
  - [x] ~~Badge "Reseña de Google" en cada tarjeta (opcional, clase `.badge-google`)~~ ✅ *CSS de `.tarjeta-testimonio` ya está completo con hover, comillas, estrellas, etc.*
  > **Nota:** el CSS de testimonios está completo. Solo falta actualizar el contenido.

---

## FASE 5 — Bloque 3: Sobre Mí

> **Archivo:** `index.html` (nueva sección o refactorizar `#sobre-nosotros`)  
> **Archivo:** `assets/css/styles.css`

- [ ] **5.1** Refactorizar `#sobre-nosotros` → `#sobre-mi` con clase `seccion-sobre-mi`:
  - [ ] Reemplazar texto genérico por la bio completa del Requerimientos.md ⚠️ *Texto actual es genérico: "Bienvenido a Espacio Psicológico Conexión..."*
  - [ ] Estructura del contenido:
    - [ ] Párrafo introductorio (formación UNLP + trayectoria)
    - [ ] Párrafo de enfoque integral
    - [ ] Lista de especializaciones (reutilizar patrón de lista existente):
      - violencia escolar, conflictos familiares, desarrollo infantil, convivencia en instituciones educativas
    - [ ] Párrafo de experiencia en equipos hospitalarios e investigación
    - [ ] Párrafo de formación actual (Magíster)
    - [ ] Lista final: rigurosidad profesional, escucha cercana, intervenciones respetuosas
  - [x] Mantener la imagen profesional (actualizar `src` cuando el cliente envíe la foto) ✅ *Imagen existe en `sobre_nosotros.jpeg` con contenedor `.sobre-nosotros-imagen`*

- [ ] **5.2** Eliminar la sub-sección de Horarios de esta sección:
  - [ ] Mover o eliminar el bloque de horarios (decidir si va en Contacto o se quita) ⚠️ *Horarios están actualmente dentro de `#sobre-nosotros` (L66-83)*
  - [ ] Limpiar el JS de `horarios.js` si se reubica ⚠️ *`horarios.js` tiene lógica completa de parseo y estado abierto/cerrado*

- [ ] **5.3** CSS:
  - [ ] `.seccion-sobre-mi` — layout de 2 columnas (imagen + texto) en desktop
  - [ ] Listas con estilo propio (bullets personalizados con `--color-titulos`)
  - [ ] Responsive: columna única en mobile ⚠️ *`.sobre-nosotros-imagen` ya tiene estilos responsive*

---

## FASE 6 — Bloque 4: Autoridad Profesional

> **Archivo:** `index.html` (nueva sección)  
> **Archivo:** `assets/css/styles.css`

- [ ] **6.1** Crear sección `#autoridad` con clase `seccion-autoridad`:
  - [ ] h2: "Autoridad Profesional" (o "Trayectoria Profesional")
  - [ ] 3 sub-bloques, cada uno con `<h3>` y lista `<ul>`:
    - [ ] **Formación:**
      - Lic. en Psicología — UNLP
      - Profesora de Psicología — UNLP
      - Diplomada en Psicología Infantil — AASM
      - Candidata a Magíster en Psicología Educacional
    - [ ] **Experiencia:**
      - Atención clínica a niños, adolescentes y adultos
      - Trabajo con familias
      - Psicodiagnóstico y evaluaciones psicológicas
      - Psicóloga en Hospital SAMIC El Calafate
    - [ ] **Investigación y actividad académica:**
      - Participación en proyectos de investigación en UNLP
      - Extensión universitaria en escuelas
      - Congresos nacionales e internacionales
      - Coautora de libro sobre convivencia y violencia en contextos educativos

- [ ] **6.2** CSS:
  - [ ] `.seccion-autoridad` — fondo alternado (ej: `--color-fondo-cards` o un tono suave diferente)
  - [ ] Sub-bloques en grid de 3 columnas (`contenedor-tarjetas` reutilizado o similar)
  - [ ] Estilo de lista con check o bullets temáticos
  - [ ] Responsive: stack vertical en mobile

---

## FASE 7 — Bloque 5: Servicios

> **Archivo:** `index.html` (nueva sección)  
> **Archivo:** `assets/css/styles.css`

- [ ] **7.1** Crear sección `#servicios` con clase `seccion-servicios`:
  - [ ] h2: "Servicios"
  - [ ] 5 tarjetas (reutilizar patrón `.tarjeta-beneficio` o crear `.tarjeta-servicio`):
    - [ ] **Atención clínica** — niños, adolescentes, adultos, familias
    - [ ] **Problemáticas que abordo** — conducta infantil, bullying, violencia escolar, conflictos familiares, desarrollo infantil, dificultades emocionales
    - [ ] **Evaluaciones** — psicodiagnóstico, informes, psicofísicos laborales, evaluaciones institucionales
    - [ ] **Psicología jurídica y forense** — intervenciones y evaluaciones en contextos legales
    - [ ] **Trabajo institucional** — talleres, capacitaciones, charlas, intervenciones en escuelas

- [ ] **7.2** CSS:
  - [ ] `.tarjeta-servicio` — similar a `.tarjeta-beneficio`, con icono/emoji, título y lista interna
  - [ ] Grid: 2 columnas tablet, 3 columnas desktop, 1 columna mobile
  - [ ] Hover con elevación (reutilizar `translateY(-5px)` existente)

---

## FASE 8 — Bloque 6: Enfoque de Trabajo

> **Archivo:** `index.html` (nueva sección)  
> **Archivo:** `assets/css/styles.css`

- [ ] **8.1** Crear sección `#enfoque` con clase `seccion-enfoque`:
  - [ ] h2: "Enfoque de Trabajo"
  - [ ] Lista de enfoques (5 ítems):
    - [ ] Enfoque integral: no solo el síntoma, sino el contexto
    - [ ] Perspectiva psicoanalítica (aportes de Silvia Bleichmar)
    - [ ] Enfoque de derechos humanos
    - [ ] Perspectiva socio-histórica (Lev Vygotsky)
    - [ ] Trabajo articulado con instituciones educativas
  - [ ] Bloque destacado (encuadre profesional): párrafo sobre articulación con instituciones

- [ ] **8.2** CSS:
  - [ ] `.seccion-enfoque` — fondo alternado para contraste visual
  - [ ] Lista con iconos o checks estilizados
  - [ ] Bloque de encuadre con borde izquierdo de acento (`border-left: 4px solid var(--color-titulos)`, padding)

---

## FASE 9 — Bloque 7: Recursos Profesionales

> **Archivo:** `index.html` (nueva sección)  
> **Archivo:** `assets/css/styles.css`

- [ ] **9.1** Crear sección `#recursos` con clase `seccion-recursos`:
  - [ ] h2: "Recursos Profesionales"
  - [ ] Párrafo introductorio
  - [ ] 4 botones/tarjetas que redirigen a Google Drive (links pendientes del cliente):
    - [ ] Guía sobre bullying
    - [ ] Material docente
    - [ ] Bibliografía de cursos
    - [ ] Material para psicotécnicos
  - [ ] Cada botón: usar patrón `.cta-button` existente o variante con icono de descarga

- [ ] **9.2** CSS:
  - [ ] Contenedor de botones en flex/grid centrado
  - [ ] Variante de botón con icono (📄 o SVG de documento)
  - [ ] Hover consistente con `.cta-button:hover` existente

---

## FASE 10 — Bloque 8: Intervenciones

> **Archivo:** `index.html` (nueva sección)  
> **Archivo:** `assets/css/styles.css`

- [ ] **10.1** Crear sección `#intervenciones` con clase `seccion-intervenciones`:
  - [ ] h2: "Intervenciones"
  - [ ] Texto descriptivo del Requerimientos.md
  - [ ] Galería de fotos (talleres, charlas, actividades, eventos):
    - [ ] Reutilizar patrón `.galeria-profesional` de FASE 2 o crear `.galeria-intervenciones`
    - [ ] Usar imágenes reales del cliente (pendientes)
    - [ ] Placeholder temporal con imágenes existentes en `assets/img/`

- [ ] **10.2** CSS:
  - [ ] Galería tipo grid con gap
  - [ ] Imágenes con `border-radius: var(--radio-card)` y `object-fit: cover`
  - [ ] Efecto hover sutil (scale o overlay con opacidad)
  - [ ] Responsive: 1 col mobile → 2 col tablet → 3-4 col desktop

---

## FASE 11 — Bloque 9: Cierre + Redes

> **Archivo:** `index.html` (nueva sección antes del footer)  
> **Archivo:** `assets/css/styles.css`

- [ ] **11.1** Crear sección `#cierre` con clase `seccion-cierre`:
  - [ ] Texto emocional del Requerimientos.md ("Pedir ayuda no siempre es fácil...")
  - [ ] 3 botones/enlaces:
    - [ ] "Solicitar turno" → enlace WhatsApp (`https://wa.me/2966486745`)
    - [ ] Instagram → `https://www.instagram.com/ada.psicologa/`
    - [ ] TikTok → URL pendiente del cliente
  - [ ] Reutilizar patrón `.cta-button` + `.social-icon`

- [ ] **11.2** CSS:
  - [ ] Fondo destacado (oscuro o con gradiente, similar al hero)
  - [ ] Texto centrado, tipografía serif (`--fuente-secundaria`) para el mensaje emocional
  - [ ] Botones en fila (flex, gap) — responsive a stack vertical en mobile

---

## FASE 12 — Bloque 10: Contacto (Footer)

> **Archivo:** `index.html` (`#contacto` / `<footer>`)  
> **Archivo:** `assets/css/styles.css`

- [ ] **12.1** Refactorizar el footer `#contacto`:
  - [ ] Agregar datos de contacto:
    - [x] WhatsApp con enlace ✅ *Botón flotante fijo ya enlaza a `wa.me/2966486745` (L143)*
    - [ ] Email: `mazuadamna@gmail.com` (con `mailto:`)
    - [x] Ubicación textual ✅ *Sección `#ubicacion` tiene dirección y link a Google Maps (L134-139)*
  - [ ] Integrar mapa de Google Maps (iframe embed) ⚠️ *Hay un link "VER EN MAPA" pero no iframe embebido*
  - [ ] Actualizar redes sociales:
    - [x] Instagram ✓ ✅ *Ya existe con SVG y enlace correcto a `ada.psicologa` (L152-158)*
    - [ ] TikTok (agregar icono SVG + enlace)
    - [ ] Evaluar si mantener Facebook o reemplazar ⚠️ *Facebook existe en footer con SVG (L159-165)*
  - [ ] Mover sección de Horarios aquí (si aplica, desde la decisión de FASE 5.2)

- [ ] **12.2** CSS:
  - [ ] Layout del footer en grid (columna info + columna mapa) en desktop
  - [ ] Estilo `.social-icon.tiktok` con color de marca
  - [ ] Responsive: stack vertical en mobile ⚠️ *Footer actual es simple centrado, no tiene layout grid*

---

## FASE 13 — Navegación

> **Archivo:** `index.html` (`<nav>`)  
> **Archivo:** `js/main.js` (menú móvil)

- [ ] **13.1** Actualizar links del menú de navegación:
  - [ ] Desktop (`.nav-links`): ⚠️ *Actualmente tiene: Inicio, Beneficios, Testimonios*
    - [x] Inicio → `#hero` ✅ *Ya existe*
    - [ ] Sobre Mí → `#sobre-mi`
    - [ ] Servicios → `#servicios`
    - [x] Testimonios → `#testimonios` ✅ *Ya existe*
  - [ ] Botón CTA del nav: "Solicitar turno" → enlace WhatsApp o `#contacto` ⚠️ *Botón dice "Contacto" y apunta a `#contacto`*

- [ ] **13.2** Actualizar menú móvil (`.overlay-content`): ⚠️ *Actualmente tiene: Inicio, Beneficios, Testimonios, Contacto*
  - [ ] Mismos enlaces que desktop
  - [x] Agregar link a "Contacto" ✅ *Ya existe en menú móvil (L35)*

---

## FASE 14 — Responsive y QA

- [ ] **14.1** Revisar todas las secciones nuevas en mobile (≤768px):
  - [ ] Galerías: 1 columna
  - [ ] Tarjetas: 1 columna
  - [ ] Textos: font-size legible, sin overflow horizontal
  - [ ] Hero: elementos no se superponen

- [ ] **14.2** Revisar en tablet (769px–1200px):
  - [ ] Grids en 2 columnas
  - [ ] Galerías en 2 columnas

- [ ] **14.3** Revisar en desktop (≥1201px):
  - [ ] Grids en 3-4 columnas según sección
  - [ ] Layout de 2 columnas en "Sobre Mí" y "Footer"

- [ ] **14.4** Verificar navegación:
  - [ ] Todos los anchors internos funcionan (`#sobre-mi`, `#servicios`, `#enfoque`, etc.)
  - [x] Scroll suave (`scroll-behavior: smooth` ya existe) ✅ *`html { scroll-behavior: smooth }` en CSS L62*
  - [x] Menú hamburguesa abre/cierra correctamente ✅ *`openNav()`/`closeNav()` en `main.js` funcionan*
  - [ ] Verificar con los nuevos links agregados

---

## FASE 15 — Pulido Final

- [ ] **15.1** SEO y metadatos:
  - [ ] Actualizar `<title>` → "Lic. Adamna Mazú | Psicóloga — Río Turbio y La Plata" ⚠️ *Actualmente: "Espacio Psicológico Conexión | Oficial"*
  - [ ] Agregar `<meta name="description">` con texto descriptivo
  - [ ] Quitar `<meta name="robots" content="noindex, nofollow">` cuando esté listo para producción ⚠️ *Activo en L8 — bien mientras esté en desarrollo*
  - [ ] Verificar que hay un solo `<h1>` en toda la página ✅ *Solo hay un `<h1>` (L42)*

- [ ] **15.2** Accesibilidad:
  - [x] Todos los `<img>` tienen `alt` descriptivo ✅ *Logo, sobre_nosotros, testimonios — todos tienen `alt`*
  - [ ] Links externos con `target="_blank"` tienen `rel="noopener noreferrer"` ⚠️ *Instagram y Facebook NO tienen `rel`*
  - [ ] Contraste de colores suficiente (texto sobre fondos oscuros/claros)
  - [x] Botón de WhatsApp flotante con `aria-label` ✅ *`aria-label="Contactar por WhatsApp"` en L143*

- [ ] **15.3** Performance:
  - [ ] Imágenes optimizadas (WebP si es posible, fallback JPG) ⚠️ *Testimonios pesan ~1.3MB c/u — necesitan optimización*
  - [ ] Lazy loading en imágenes fuera del viewport (`loading="lazy"`)
  - [ ] Verificar que no hay CSS/JS sin usar

- [ ] **15.4** Limpieza de código:
  - [ ] Eliminar estilos inline innecesarios del `index.html` y pasarlos a `styles.css` ⚠️ *Hay varios: L52-53 (diplomada), L61-63 (sobre-nosotros), L66-82 (horarios), L136, etc.*
  - [ ] Eliminar comentarios de debug o código muerto ⚠️ *Hay comentarios desactivados: L43, L45, L57, L65*
  - [x] Verificar consistencia de nombres de clases (todo en español, patrón `seccion-*`) ✅ *Consistente: `seccion-hero`, `seccion-beneficios`, `seccion-productos`, `seccion-ubicacion`*

---

## 🔒 Pendientes del Cliente

| Ítem | Estado |
|---|---|
| Fotos profesionales (retrato + laboral) | ⏳ Pendiente |
| Fotos de intervenciones (talleres, charlas) | ⏳ Pendiente |
| URL de TikTok | ⏳ Pendiente |
| URLs de Google Drive (4 recursos) | ⏳ Pendiente |
| Confirmar enlace de WhatsApp definitivo | ⏳ Pendiente |
| Reseñas reales de Google Maps | ⏳ Pendiente |
| Confirmar si mantener Facebook | ⏳ Pendiente |
| Confirmar si mantener sección de Horarios y dónde | ⏳ Pendiente |
