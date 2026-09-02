# CLAUDE.md

Guía para trabajar en este repo.

## Qué es

Una presentación interactiva (no un sitio) sobre **IBM Enterprise Design Thinking**.
Se navega con el teclado, cada slide ocupa exactamente la pantalla y nunca hay scroll.

## Reglas del proyecto

1. **Nada de scroll.** `html, body { overflow: hidden }`. Cada slide es
   `w-screen h-screen ... overflow-hidden`. Si el contenido no entra, se achica el
   contenido — no se agrega scroll a la página.
2. **Un solo acento.** Azul IBM (`--color-accent: #0F62FE`) sobre blanco / negro carbón / grises.
   Las únicas excepciones son los colores de las tres fases del Loop
   (`--color-observe`, `--color-reflect`, `--color-make`) y `--color-success` / `--color-warning`.
   Los colores se usan siempre por token (`var(--color-…)`), nunca hardcodeados en el layout.
   Dentro de un SVG sí se usan los hex directos porque `filter: drop-shadow()` los necesita.
3. **Tipografía.** Títulos en `font-black` con `tracking` negativo y `clamp()` para escalar;
   eyebrows y datos en `font-mono` uppercase con `tracking-[0.22em]`.
4. **Animación.** Todo con `motion/react`. Entrada estándar: `initial={{opacity:0, y:20}}` →
   `animate={{opacity:1, y:0}}` con `ease: [0.4, 0, 0.2, 1]`. Los grupos de tarjetas usan
   `variants` con `staggerChildren`. Los diagramas que se repiten en loop usan
   `repeat: Infinity` con `times` para controlar las etapas.
5. **Tailwind v4.** No hay `tailwind.config`. Los tokens viven en el bloque `@theme` de
   `src/app/globals.css`.

## Cómo agregar una slide

1. Crear `src/components/slides/SlideNNNombre.tsx` (client component).
2. Agregar el id al union `SlideId` en `src/types/index.ts`.
3. Importarla y sumarla al array `slides` de `src/components/Presentation.tsx` (el orden del
   array es el orden de la presentación y define el contador y la barra de progreso).

## Trampas conocidas de SVG + Motion

- **No mezclar el atributo `transform` con `scale`/`rotate` animados en el mismo elemento.**
  El transform CSS que escribe Motion pisa el atributo. Patrón correcto: un `<g transform="…">`
  estático por fuera y un `<motion.path>` adentro con `style={{ transformOrigin: "0px 0px" }}`.
- **`x` / `y` en `animate` son traslaciones, no coordenadas.** Usar valores chicos (`y: 8` → `y: 0`)
  y dejar la posición absoluta en los atributos `x` / `y` del elemento.
- Para animar posición absoluta en SVG, animar `cx` / `cy` (Motion los trata como atributos).

## Geometría del Loop

Los dos diagramas circulares (`slides/LoopDiagram.tsx` y `demo/LoopVisualization.tsx`) usan
tres arcos de 110° con huecos de 10°, en sentido horario:

- Observe: −145° → −35° (arriba)
- Reflect: −25° → 85° (abajo derecha)
- Make: 95° → 205° (abajo izquierda)

La punta de flecha al final de cada arco se rota `ánguloFinal + 90`. Si se cambia el centro o el
radio, hay que recalcular los endpoints: `x = cx + r·cos(θ)`, `y = cy + r·sin(θ)`.

## La demo (slide 09)

Simula un Loop completo con una consola falsa:

- `src/lib/loopCommands.ts` — intérprete: valida el orden (no se puede prototipar sin Hill, no se
  puede hacer un playback sin prototipo) y escribe el output en la consola.
- `src/hooks/useLoopState.ts` — reducer con el estado del proyecto (fase, iteración, insights,
  Hill, prototipos, playbacks, artefactos).
- `Slide09Demo.tsx` — orquesta: `PRELOADED_COMMANDS` autoescribe el comando de cada paso y
  `STEP_EXPLANATIONS` narra qué está pasando arriba.

Si se agrega un comando, hay que sumarlo en los tres lugares: intérprete, tipo de acción del
reducer y (si va en el recorrido guiado) los arrays de la slide.

## Verificar cambios

```bash
npx tsc --noEmit   # typecheck
npm run build      # build de producción
```

Para revisar una slide visualmente sin ir clickeando: levantar `npm run dev` y crear
temporalmente una ruta `src/app/preview/[n]/page.tsx` que renderice el componente suelto
(borrarla después). Las animaciones con delay pueden no llegar a correr en capturas headless:
no es un bug de la slide.
