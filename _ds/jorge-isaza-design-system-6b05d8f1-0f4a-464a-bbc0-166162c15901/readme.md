# Jorge Isaza — Design System

Sistema de diseño para **Jorge H. Isaza**, investigador y mentor en desarrollo
humano con más de 30 años creando metodologías para la sanación emocional, el
crecimiento personal y el fortalecimiento del potencial humano. Su trabajo
acompaña a las personas a superar bloqueos, transformar experiencias difíciles y
construir una vida más plena, consciente y equilibrada.

El sistema traduce esa misión a una identidad visual **cálida, humana y
serena**: un lienzo crema, tipografía display redondeada, y tarjetas de un solo
color saturado como voltaje principal. La calidez es el contrato del sistema —
nunca grises fríos, nunca un footer oscuro.

---

## Sources & provenance

- **Brief de marca:** documento de lineamientos entregado por el cliente (atmósfera
  cálida, lienzo crema, tarjetas de color saturado, display redondeada).
- **Contexto de producto:** la práctica de Jorge Isaza en desarrollo humano —
  mentorías 1:1, talleres, círculos y recursos.

No se entregó código fuente, Figma ni decks. Las pantallas del UI kit son
**recreaciones originales** construidas a partir del brief, no copias de un
producto existente.

### ⚠️ Sustituciones que requieren tu confirmación
- **Tipografías.** El brief de referencia menciona *"Plain Black"*, una fuente
  display propietaria y con licencia privada, no disponible públicamente. La
  sustituimos por **Bricolage Grotesque** (display redondeada y cálida) +
  **Hanken Grotesk** (cuerpo/UI humanista), ambas de Google Fonts y con soporte
  completo de español. **Si tienes archivos de fuente licenciados, compártelos y
  los integramos como `@font-face`.**
- **Paleta.** El brief de referencia describía una paleta tipo "Clay.com" (rosa
  intenso, teal). La adaptamos hacia tonos **terrosos y sanadores** (terracota,
  verde bosque, lavanda polvo, durazno, ocre) que encajan con un trabajo de
  desarrollo humano. Ajustable si prefieres otra dirección.
- **Logo.** El monograma "J" en `assets/logo-mark.svg` es un **placeholder**.
  Reemplázalo por el logotipo real cuando lo tengas.
- **Ilustraciones 3D / claymation.** Son *assets comisionados por página*, no
  tokens. En el UI kit usamos `image-slot` para que arrastres tus propias
  ilustraciones.

---

## Content fundamentals — cómo se escribe

**Idioma:** español (es). Cálido, cercano y profesional sin caer en lo clínico
ni en lo esotérico.

**Tono y voz.** Sereno, humano, esperanzador. Habla *de tú* a la persona
("construye tu vida", "reserva tu sesión") — nunca de usted, nunca corporativo.
La voz acompaña, no vende con presión: las CTAs invitan ("Da el primer paso",
"Reserva una sesión de escucha") en lugar de exigir.

**Léxico recurrente:** *proceso, raíz, sanar, transformar, acompañar, sostener,
calidez, consciente, bloqueo, potencial*. Verbos de movimiento suave
(acompañar, sostener, transformar) por encima de verbos de logro agresivo.

**Casing.** Sentence case en titulares y botones ("Reservar una sesión", no
"Reservar Una Sesión"). MAYÚSCULAS solo en eyebrows/labels cortos con tracking
amplio ("METODOLOGÍA", "PROGRAMAS").

**Longitud.** Titulares display cortos y memorables (≤ 14 palabras). Párrafos de
cuerpo de 1–2 frases, máximo ~46 caracteres de ancho de medida.

**Emoji:** no se usan en producto. Los íconos son tipográficos/Unicode discretos
(✓ en checklist). Ver ICONOGRAPHY.

**Ejemplos reales del sistema:**
- H1: *"Sanar la raíz para crecer de verdad"*
- Lead: *"Metodologías de desarrollo humano que ayudan a superar bloqueos,
  transformar experiencias difíciles y construir una vida más plena."*
- CTA: *"Da el primer paso hacia tu transformación hoy"*
- Eyebrow: *"30 AÑOS ACOMPAÑANDO PROCESOS"*

---

## Visual foundations

**Lienzo.** Todo se asienta sobre un **crema** (`--color-canvas` #fdf8ef). La
calidez del tinte diferencia la marca de los sitios de coaching gris-frío y es
**innegociable**. Bandas alternas usan `--color-surface-soft` (#f8f1e4).

**Color.** Seis superficies de tarjeta saturadas — terracota, verde bosque,
lavanda, durazno, ocre y crema — se **ciclan** a lo largo de la página; nunca se
repite el mismo color dos veces seguidas. Texto blanco sobre las saturaciones
oscuras (terracota, bosque), tinta oscura sobre las claras (lavanda, durazno,
ocre, crema). El contraste de color saturado contra el crema **es** la
profundidad; no se usan sombras pesadas.

**Tipografía.** *Display* (Bricolage Grotesque) a peso **600** con tracking
negativo (-1 a -2.5px) en tamaños grandes (hasta 72px) **es la voz de marca**.
El cuerpo es Hanken Grotesk 400. Mezclar las dos familias fuera de su rol es una
violación del sistema. Nunca subir el display más allá de 600 — pesos mayores se
leen ampulosos y aplanan la calidez del trazo redondeado.

**Espaciado.** Base 4px. Ritmo vertical de **96px** (`--space-section`) entre
bandas mayores. Mucho aire alrededor de titulares y tarjetas.

**Fondos.** Color plano cálido + ilustraciones 3D/claymation a sangre como
artefacto de héroe. Sin gradientes azul-violeta, sin texturas ruidosas, sin
patrones repetidos.

**Bordes y radios.** Radios generosos que acompañan el trazo redondeado:
botones/inputs 12px, tarjetas de contenido 16px, tarjetas de feature 24px, pills
9999px. Hairline cálido `--color-hairline` (#e7ddc9) de 1px en inputs y tarjetas
neutras.

**Sombras.** Prácticamente ninguna. Una sombra suave única
(`--shadow-soft`) reservada para estados elevados en hover, y solo en casos
raros. La profundidad viene del color, no de la elevación.

**Animación e interacción.** Transiciones cortas (~140ms ease) en color de
fondo, borde y texto. Sin bounces, sin loops decorativos infinitos. Hover: el
borde del slot/tab se intensifica o la superficie pasa a crema-card; los botones
primarios no cambian de color, solo el cursor. Press: sutil, sin "shrink"
agresivo.

**Imágenes.** Cálidas, hechas a mano, con tacto de arcilla/3D. Nada en blanco y
negro, nada frío. Las figuras y montañas claymation son el elemento de marca más
reconocible.

---

## Iconography

- **Sin set de íconos pesado.** El sistema es deliberadamente tipográfico y
  cromático; la voltaje visual vive en color + ilustración, no en iconitos.
- **Íconos en uso:** glifos Unicode discretos cuando hacen falta — ✓ (check en
  listas de beneficios), ✕, flechas. Se renderizan en el color del contexto.
- **Emoji:** no se usan en producto.
- **Logo / monograma:** `assets/logo-mark.svg` — placeholder de la "J" sobre
  cuadro terracota redondeado (16px). Reemplazar por el logotipo real.
- **Ilustraciones:** assets comisionados por página (no tokens). Usa
  `assets/image-slot.js` (`<image-slot>`) como placeholder donde irá una
  ilustración real.
- **Si necesitas un set de íconos de línea**, sugerimos **Lucide** (CDN,
  stroke ~1.75px) por su calidez redondeada — pendiente de confirmar contigo
  antes de adoptarlo formalmente.

---

## Index — qué hay en este sistema

### Raíz
- `styles.css` — punto de entrada global (solo `@import`). Los consumidores
  enlazan este archivo.
- `readme.md` — esta guía.
- `SKILL.md` — manifiesto para usar el sistema como Agent Skill.

### Tokens (`tokens/`)
`fonts.css` · `colors.css` · `typography.css` · `spacing.css` · `radius.css` ·
`elevation.css` — todos importados desde `styles.css`. 109 custom properties.

### Components (`components/core/`)
Primitivas React reutilizables (export nombrado PascalCase + `.d.ts` + `.prompt.md`):
- **Button** — primary · secondary · onColor · text · sm/md/lg · disabled
- **Badge** — pill cálido, variantes de marca + eyebrow uppercase
- **Input** — campo de texto, label / hint / error
- **Avatar** — redondo con imagen o iniciales
- **Card** — contenedor neutro (content / cream / soft)
- **FeatureCard** — tarjeta de un solo color saturado (elemento firma)
- **Tabs** — tabs pill de sub-navegación

### Guidelines (`guidelines/`)
Foundation specimen cards para la pestaña Design System: paletas (marca,
superficies, texto/semántico), tipografía (display, cuerpo, familias),
espaciado, radios, y marca (logo + slot de ilustración).

### UI kits (`ui_kits/`)
- **website/** — sitio de marca, recorrido interactivo: `index.html` + `TopNav`,
  `HomeScreen`, `ProgramsScreen`, `BookingScreen`, `Footer`. Home → Programas →
  Reserva con flujo de confirmación funcional.

### Assets (`assets/`)
- `logo-mark.svg` — monograma placeholder
- `image-slot.js` — componente `<image-slot>` para ilustraciones

---

## Do's & Don'ts

**Do** — lienzo crema en todo · ciclar las 6 tarjetas de color · display 600 con
tracking negativo · footer crema · ritmo de 96px · ilustraciones 3D cálidas.

**Don't** — grises fríos · 7º color de marca · display > 600 · repetir color de
tarjeta en fila · footer oscuro · gradientes azul-violeta · emoji · sombras
pesadas.
