# CLAUDE.md

Guía para trabajar en este repo.

## Qué es

Una presentación interactiva (no un sitio) sobre **IBM Enterprise Design Thinking**,
del grupo **Viernes de la Jungla** para Agilidad Avanzada · Unidad 1.
Se navega con el teclado, cada slide ocupa exactamente la pantalla y nunca hay scroll.

## Reglas del proyecto

1. **Nada de scroll.** `html, body { overflow: hidden }`. Cada slide es
   `w-screen h-screen ... overflow-hidden`. Si el contenido no entra, se achica el
   contenido — no se agrega scroll a la página. Ojo con las columnas altas: usar
   `min-h-0` en los hijos de un flex/grid para que no desborden sobre el pie.
2. **Un solo acento.** Azul IBM (`--color-accent: #0F62FE`) sobre blanco / negro carbón /
   grises. Las únicas excepciones son los colores de las tres fases del Loop
   (`--color-observe`, `--color-reflect`, `--color-make`) y `--color-success` /
   `--color-warning`. Siempre por token (`var(--color-…)`), nunca hardcodeado en el layout.
   Dentro de un SVG sí van los hex directos porque `filter: drop-shadow()` los necesita.
3. **Tipografía.** Títulos en `font-black` con `tracking` negativo y `clamp()` para escalar;
   eyebrows y datos en `font-mono` uppercase con `tracking-[0.22em]`.
4. **Tiempos.** Todo sale de `src/lib/motion.ts`. La regla: **la entrada de una slide
   termina antes de 1.2s**. Nadie se queda esperando frente al proyector a que aparezca
   una tarjeta. Los diagramas que cuentan un proceso pueden seguir en loop después.
5. **Tailwind v4.** No hay `tailwind.config`. Los tokens viven en el bloque `@theme` de
   `src/app/globals.css`.

## Cómo agregar una slide

1. Crear `src/components/slides/SlideNNNombre.tsx` (client component).
2. Agregar el id al union `SlideId` en `src/types/index.ts`.
3. Importarla y sumarla al array `slides` de `src/components/Presentation.tsx` (el orden del
   array es el orden de la presentación y define el contador y la barra de progreso).

Los tres casos (Airbnb, IDEO, P&G) comparten `slides/CaseLayout.tsx`: si se agrega otro caso,
usar esa plantilla para que el ritmo y la jerarquía sean iguales en todos.

## Trampas de SVG + Motion (todas costaron un bug)

- **El origen de los transforms en SVG es el centro del bounding box del propio elemento.**
  Un `animate={{ rotate: 360 }}` sobre un punto lo hace girar sobre sí mismo, no orbitar.
  Para que algo recorra una circunferencia, calcular la posición a mano con
  `useTime` + `useTransform` y animar `cx` / `cy` (ver `OrbitingDot` en `LoopDiagram.tsx`).
- **Para escalar desde un borde**, usar los props `originX` / `originY` de Motion (0-1 sobre
  el bounding box), no `transformOrigin` en px: Motion escribe el transform como atributo
  y el `transform-origin` de CSS queda ignorado.
- **No mezclar el atributo `transform` con `scale`/`rotate` animados en el mismo elemento.**
  Patrón correcto: un `<g transform="…">` estático por fuera y un `<motion.path>` adentro.
- **`x` / `y` en `animate` son traslaciones, no coordenadas.** Usar valores chicos
  (`y: 8` → `y: 0`) y dejar la posición absoluta en los atributos del elemento.
- **`preserveAspectRatio="none"` deforma todo lo que dibujes**, incluidas las puntas de flecha.
  Si algo tiene que ocupar el ancho completo y no deformarse, hacerlo con divs y bordes.
- Un SVG con `w-full h-full` se centra dentro del contenedor según su viewBox: si el viewBox
  es mucho más ancho que alto, sobra espacio vertical. Para llenar la tarjeta, subir el alto
  del viewBox y envolver el dibujo en un `<g transform="translate(0 N)">`.

## Geometría del Loop

`slides/LoopDiagram.tsx` usa tres arcos de 110° con huecos de 10°, en sentido horario:

- Observe: −145° → −35° (arriba)
- Reflect: −25° → 85° (abajo derecha)
- Make: 95° → 205° (abajo izquierda)

La punta de flecha al final de cada arco se rota `ánguloFinal + 90`. Si se cambia el centro o
el radio, recalcular los endpoints: `x = cx + r·cos(θ)`, `y = cy + r·sin(θ)`.

## Los memes del Loop

`lib/memes.ts` prueba extensiones contra `public/loop/<fase>.<ext>` (observe, reflect, make) y
`LoopDiagram` deja clickeable sólo la fase que encontró archivo. `MemeModal` se abre por encima
de todo y **come el teclado mientras está abierto** (listener en fase de captura sobre `window`),
si no las flechas pasarían la slide con el meme abierto.

## El logo

`src/components/Logo.tsx` lee `public/logo.png`. **Precarga la imagen antes de montarla**:
si el archivo no está, no renderiza nada. No usar `onError` sobre un `<img>` server-rendered,
porque el error dispara antes de que React enganche el handler y queda el ícono de imagen rota.

## Verificar cambios

```bash
npx tsc --noEmit   # typecheck
npm run build      # build de producción
```

**No correr `npm run build` con `npm run dev` levantado**: los dos escriben en `.next` y el
dev server queda servido a medias — la página muestra el HTML pero React no hidrata, así que
no anda el teclado y las slides se ven en blanco (todo lo que entra con `initial={{opacity:0}}`
se queda ahí). Parece un bug de las animaciones y no lo es. Si pasa: cortar dev, `rm -rf .next`
y volver a levantar.

### Verificar las animaciones

`--virtual-time-budget` de Chrome headless miente: a veces captura la slide antes de que
Motion arranque y parece que no se anima nada. Para revisar de verdad, sacar capturas con
tiempo real vía CDP:

1. Crear temporalmente `src/app/preview/[n]/page.tsx` que renderice la slide N suelta
   (y borrarla después).
2. Levantar Chrome con `--headless=new --remote-debugging-port=9222`.
3. Navegar, esperar N ms de reloj real y pedir `Page.captureScreenshot`.

Conviene sacar dos frames por slide (~1.2s y ~4s): el primero muestra si la entrada ya
terminó, el segundo si los diagramas en loop se ven bien en cualquier momento. Un diagrama
que queda vacío durante parte de su ciclo es un bug: el que expone puede estar parado ahí.
