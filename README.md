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

## ⌨️ Atajos de teclado

| Tecla | Acción |
|-------|--------|
| `→` `Espacio` `PgDn` | Siguiente slide |
| `←` `PgUp` | Slide anterior |
| `Esc` | Volver al inicio |
| `F` | Toggle fullscreen |

## 🎞️ Las 19 slides

| # | Slide | Qué muestra |
|---|-------|-------------|
| 01 | Portada | Título, logo del grupo y la pregunta que abre |
| 02 | Por qué existe | El Design Thinking clásico se rompía a escala |
| 03 | Qué es | Marco no lineal, usuario primero, iteración continua |
| 04 | De dónde viene | Timeline 1960s → Kelley/IDEO → Brown/HBR → IBM 2015-16 |
| 05 | El proceso | Las 5 etapas + la flecha de que nunca es lineal |
| 06 | The Principles | Los 3 principios, cada uno con su diagrama animado |
| 07 | The Loop | El ciclo Observe · Reflect · Make (interactivo al hover) |
| 08 | The Keys | Hills, Playbacks y Sponsor Users |
| 09 | Hills | Who / What / Wow con el ejemplo real de IBM |
| 10 | Playbacks | Los 4 tipos sobre la línea de tiempo del proyecto |
| 11 | Sponsor Users | Cómo no vs. cómo sí, y los 3 requisitos |
| 12 | Roles | Gerentes vs. equipo |
| 13 | Caso Airbnb | Las fotos eran el problema |
| 14 | Caso IDEO | El cepillo de mango grueso |
| 15 | Caso P&G | El Swiffer y el paso de más |
| 16 | Resultados | El estudio de Forrester (ROI, tiempos, alineación) |
| 17 | Dónde encaja | Double Diamond y TiSDD ↔ el Loop |
| 18 | Cierre | Los tres bloques para recordar + certificaciones |
| 19 | Gracias | Logo y cierre |

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
│   └── slides/                  # Slide01…Slide19 + LoopDiagram + CaseLayout
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
