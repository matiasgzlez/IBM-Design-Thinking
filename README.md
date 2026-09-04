# IBM Design Thinking — Viernes de la Jungla

Presentación interactiva sobre **IBM Enterprise Design Thinking** para
**Agilidad Avanzada · Unidad 1 · Design Thinking (2026)**.

Cubre por qué IBM tuvo que reinventar el método, los 3 principios, el Loop
(Observe · Reflect · Make), las 3 llaves (Hills, Playbacks, Sponsor Users), los roles,
tres casos reales para entenderlo y los resultados del estudio de Forrester.

Construida con **Next.js 15**, **Tailwind CSS v4**, **Motion** y **Lucide**.

## 📦 Stack

- Next.js 15 (App Router) + React 19
- TypeScript strict
- Tailwind CSS v4 con `@theme` en `globals.css`
- Motion (`motion/react`) para animaciones
- Fonts: Inter, Space Grotesk, JetBrains Mono (vía `next/font/google`)

## 🚀 Cómo correrlo

```bash
npm install
npm run dev
```

Abrí http://localhost:3000

### Build de producción

```bash
npm run build
npm start
```

## 🖼️ El logo

La portada y el cierre muestran el logo del grupo desde **`public/logo.png`**
(PNG con fondo transparente). Si el archivo no está, las slides se arman igual y el
logo simplemente no aparece: no rompe nada.

## 😂 Los memes del Loop

En la slide del Loop, cada fase se puede clickear para mostrar su meme a pantalla completa.
Para que aparezca alcanza con dejar el archivo en **`public/loop/`** con el nombre de la fase:

```
public/loop/observe.png
public/loop/reflect.jpg
public/loop/make.mp4
```

La slide de **Hills** tiene su propio hueco de imagen: dejá `public/keys/hills.png`
(la foto del "1000 songs in your pocket") y aparece sola; se puede clickear para verla
a pantalla completa.

En el centro del Loop se puede poner una **cara real** en lugar del pictograma: dejá
`public/loop/usuario.jpg` (cuadrada, la recorta en círculo sola).

Sirven `png`, `jpg`, `jpeg`, `webp`, `gif`, `avif` para imágenes y `mp4` o `webm` para video
(los videos arrancan solos, en loop y sin sonido). No hay que tocar código: la slide busca los
archivos al cargar, y la fase queda clickeable sólo si encontró el suyo. Para cerrar el meme,
clic o cualquier tecla.

## ⌨️ Atajos de teclado

| Tecla | Acción |
|-------|--------|
| `→` `Espacio` `PgDn` | Siguiente slide |
| `←` `PgUp` | Slide anterior |
| `Esc` | Volver al inicio |
| `F` | Toggle fullscreen |

## 🎞️ Las 13 slides

| # | Slide | Qué muestra |
|---|-------|-------------|
| 01 | Portada | Título, logo del grupo y la materia |
| 02 | Por qué existe | El Design Thinking clásico no funcionaba a gran escala |
| 03 | The Principles | Los 3 principios, cada uno con su diagrama animado |
| 04 | The Loop | El ciclo Observe · Reflect · Make (clic en cada fase → meme) |
| 05 | The Keys | Hills, Playbacks y Sponsor Users |
| 06 | Hills | El Hill del iPod partido en who / what / wow |
| 07 | Playbacks | Los 4 tipos + expectativa vs. realidad |
| 08 | Sponsor Users | Cómo no vs. cómo sí, y los 3 requisitos |
| 09 | Roles | Gerentes vs. equipo |
| 10 | El ejemplo | IDEO y Oral-B: el cepillo de mango grueso |
| 11 | Resultados | El estudio de Forrester (ROI, tiempos, alineación) |
| 12 | Fuentes | QR a /fuentes: badges de IBM, fuentes y la presentación |
| 13 | Gracias | Logo y cierre |

## 🔗 La página de fuentes y el QR

`/fuentes` es una página web común (scrollea, se ve bien en el celular) con todos los links:
las páginas de IBM, los badges gratuitos, las fuentes de los tres casos y la bibliografía de
la unidad. Arriba de todo tiene un botón para **volver a ver la presentación**.

La slide 12 muestra un QR que apunta ahí. La URL se calcula sola:

- si la presentación corre en un dominio público (o en la IP de red, `http://192.168.x.x:3000`),
  el QR apunta a **esa** URL + `/fuentes`, así que el celular de cualquiera la abre;
- si corre en `localhost` —donde ningún celular puede entrar— cae a
  [`FUENTES.md`](FUENTES.md) en GitHub, que tiene la misma lista.

Los links se editan en un solo lugar: `src/lib/links.ts`.

## 📁 Estructura

```
public/
└── logo.png                     # logo del grupo (lo usa la portada y el cierre)
src/
├── app/
│   ├── globals.css              # Tailwind v4 + @theme tokens
│   ├── layout.tsx               # Fonts + metadata
│   └── page.tsx                 # Renderiza <Presentation />
├── components/
│   ├── Presentation.tsx         # Controlador + AnimatePresence
│   ├── ProgressBar.tsx          # Barra de progreso superior
│   ├── Logo.tsx                 # Logo con precarga (no rompe si falta)
│   ├── ui/following-pointer.tsx # Cursor con el nombre del grupo
│   └── slides/                  # Slide01…Slide13 + LoopDiagram + CaseLayout
├── hooks/
│   └── useKeyboardShortcuts.ts
├── lib/
│   ├── motion.ts                # Sistema de tiempos y variantes compartidas
│   └── utils.ts
└── types/
    └── index.ts
```

## 🎨 Sistema de diseño

Moderno, minimalista, de alto contraste: blanco / negro carbón / grises con un único
acento azul IBM. Cada fase del Loop tiene su color propio.

| Token | Valor |
|-------|-------|
| `--color-bg-primary` | `#FFFFFF` |
| `--color-bg-secondary` | `#F4F4F4` |
| `--color-bg-dark` | `#0A0A0A` |
| `--color-text-primary` | `#0A0A0A` |
| `--color-text-secondary` | `#6B6B6B` |
| `--color-divider` | `#E0E0E0` |
| `--color-accent` | `#0F62FE` (IBM Blue 60) |
| `--color-observe` | `#0F62FE` |
| `--color-reflect` | `#8A3FFC` |
| `--color-make` | `#009D9A` |
| `--color-success` | `#24A148` |
| `--color-warning` | `#F1C21B` |

## 📚 Fuentes

- Apunte de cátedra — Agilidad Avanzada 2026, Unidad 1: Design Thinking
- [What is Design Thinking? — IBM Think](https://www.ibm.com/think/topics/design-thinking)
- [Enterprise Design Thinking — IBM Training](https://www.ibm.com/training/enterprise-design-thinking)
- [Enterprise Design Thinking Framework](https://www.ibm.com/training/enterprise-design-thinking/framework)
- [Design Thinking Examples — 3 Case Studies (Triangility)](https://triangility.com/design-thinking-examples-3-case-studies/)
- [A new study on Design Thinking — Forrester TEI](https://medium.com/design-ibm/a-new-study-on-design-thinking-is-great-news-for-designers-593f71b40627)

---

Hecho por **Viernes de la Jungla** 🐒
