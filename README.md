# IBM Design Thinking — Enterprise Design Thinking

Presentación interactiva sobre **IBM Enterprise Design Thinking**: los 3 principios, el Loop
(Observe · Reflect · Make) y las 3 llaves (Hills, Playbacks, Sponsor Users).
Construida con **Next.js 15**, **Tailwind CSS v4**, **Motion** y **Lucide**.

## 📦 Stack

- Next.js 15 (App Router) + React 19
- TypeScript strict
- Tailwind CSS v4 con `@theme` en `globals.css`
- Motion (`motion/react`) para animaciones
- Lucide React para iconografía
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

## ⌨️ Atajos de teclado

| Tecla | Acción |
|-------|--------|
| `→` `Espacio` `PgDn` | Siguiente slide |
| `←` `PgUp` | Slide anterior |
| `Esc` | Volver al inicio |
| `F` | Toggle fullscreen |

## 🖥️ Demo en vivo (slide 09)

Una consola simulada (`edt`) recorre un Loop completo. El comando de cada paso se autoescribe:
solo hay que apretar Enter. También se puede escribir a mano.

```
edt sponsor-users --recruit    sumar usuarios reales al equipo
edt observe --in-context       observar sin supuestos
edt reflect --synthesize       sintetizar los hallazgos
edt hill --write               escribir el Hill (who · what · wow)
edt make --prototype           prototipar para aprender
edt playback                   alinear con stakeholders
edt loop --iterate             volver a empezar
edt status | help | clear | reset
```

## 📁 Estructura

```
src/
├── app/
│   ├── globals.css              # Tailwind v4 + @theme tokens
│   ├── layout.tsx               # Fonts + metadata
│   └── page.tsx                 # Renderiza <Presentation />
├── components/
│   ├── Presentation.tsx         # Controlador + AnimatePresence
│   ├── ProgressBar.tsx          # Barra de progreso superior
│   ├── demo/                    # Simulador del Loop (slide 09)
│   │   ├── LoopConsole.tsx
│   │   ├── LoopVisualization.tsx
│   │   ├── ProjectStatusPanel.tsx
│   │   └── HillModal.tsx
│   ├── ui/following-pointer.tsx
│   └── slides/
│       ├── Slide01Cover.tsx
│       ├── Slide02Problem.tsx
│       ├── Slide03Definition.tsx
│       ├── Slide04Origins.tsx
│       ├── Slide05Stages.tsx
│       ├── Slide06Principles.tsx
│       ├── Slide07Loop.tsx      # + LoopDiagram.tsx (gráfico principal)
│       ├── Slide08Keys.tsx
│       ├── Slide09Demo.tsx
│       ├── Slide10Impact.tsx
│       ├── Slide11Closing.tsx
│       └── Slide12Thanks.tsx
├── hooks/
│   ├── useKeyboardShortcuts.ts
│   ├── useLoopState.ts          # reducer del proyecto simulado
│   └── useTypewriter.ts
├── lib/
│   ├── loopCommands.ts          # intérprete de comandos `edt`
│   └── utils.ts
└── types/
    ├── index.ts
    └── loop.ts
```

## 🎨 Sistema de diseño

Moderno, minimalista, de alto contraste: blanco / negro carbón / grises con un único acento azul IBM.
Cada fase del Loop tiene su color propio.

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

- [What is Design Thinking? — IBM Think](https://www.ibm.com/think/topics/design-thinking)
- [Enterprise Design Thinking — IBM Training](https://www.ibm.com/training/enterprise-design-thinking)
- [Enterprise Design Thinking Framework](https://www.ibm.com/training/enterprise-design-thinking/framework)
