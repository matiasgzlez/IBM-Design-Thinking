# IBM Design Thinking

Presentación interactiva sobre **IBM Enterprise Design Thinking**, del grupo
**Viernes de la Jungla** para *Agilidad Avanzada · Unidad 1: Design Thinking* (2026).

Trece slides que se navegan con el teclado: por qué IBM tuvo que reinventar el método,
los tres principios, el Loop, las tres llaves (Hills, Playbacks, Sponsor Users), quién hace
qué, el caso de Oral-B & IDEO contado en tres actos y los resultados medidos por Forrester.

## 🚀 Cómo correrla

```bash
npm install
npm run dev
```

Abrí **http://localhost:3000**. Para presentar, apretá `F` (pantalla completa) y navegá con las flechas.

```bash
npm run build && npm start   # build de producción
```

> **No corras `npm run build` con `npm run dev` levantado**: los dos escriben en `.next` y el
> dev server queda servido a medias — la página se ve pero el teclado no responde y las slides
> aparecen en blanco. Si pasa: cortá dev, `rm -rf .next` y volvé a levantar.

## ⌨️ Atajos

| Tecla | Acción |
|-------|--------|
| `→` `Espacio` `PgDn` | Siguiente slide |
| `←` `PgUp` | Slide anterior |
| `Esc` | Volver a la portada |
| `F` | Pantalla completa |

## 🎞️ Las 14 slides

| # | Slide | Qué muestra |
|---|-------|-------------|
| 01 | Portada | Título, logo del grupo y la materia |
| 02 | Por qué existe | 2015-16: el Design Thinking clásico no funcionaba a gran escala |
| 03 | The Principles | Los 3 principios, cada uno con su meme o diagrama animado |
| 04 | The Loop | Observe · Reflect · Make — clic en cada fase abre su definición y su meme |
| 05 | Hills | Who / What / Wow con el aviso del iPod (el hover lo desarma en sus tres partes) |
| 06 | Playbacks | Los 4 momentos sobre la línea del proyecto + el meme del caballo |
| 07 | Sponsor Users | Dos líneas animadas: el usuario al final vs. el usuario desde el día uno |
| 08 | Roles | Líderes vs. equipo de trabajo |
| 09 | El caso · el encargo | Oral-B & IDEO (1996): ir a mirar a los chicos |
| 10 | El caso · el hallazgo | El problema era la motricidad, no el tamaño |
| 11 | El caso · el resultado | 18 meses como el más vendido de Estados Unidos |
| 12 | El caso · Citibank | CitiDirect BE (2014): el caso insignia de IBM en banca |
| 13 | Resultados | El estudio de Forrester, en verde porque son ganancias |
| 14 | Gracias | El logo del grupo y el cierre |

## 🖼️ Las imágenes: se cambian sin tocar código

Cada hueco de imagen busca su archivo en `public/` al cargar la slide. Alcanza con dejar el
archivo con el nombre que corresponde — sirven `png`, `jpg`, `jpeg`, `webp`, `gif`, `avif` y,
para video, `mp4` o `webm`. Para fotos conviene `jpg` (un PNG de una foto pesa cinco veces más)
y para dibujos o capturas con fondo transparente, `png`.

```
public/logo.png                    # el logo del grupo: portada y cierre

public/principios/outcomes.png     # principio 1 · el desire path
public/principios/reinvencion.png  # principio 2 · el archivo "FINAL FINAL"
public/principios/equipos.mp4      # principio 3 · video

public/loop/observe.png            # los tres memes del Loop, uno por fase
public/loop/reflect.png
public/loop/make.jpg
public/loop/usuario.jpg            # opcional: una cara real en el centro del Loop

public/keys/hills.png              # el aviso del iPod
public/keys/playbacks.png          # el caballo mitad dibujado

public/caso/observacion.jpg        # slide 09
public/caso/cepillos.png           # slide 10 · mango fino vs. mango grueso
public/caso/resultado.png          # slide 11
```

Si un archivo no está, la slide se arma igual: muestra el diagrama animado de respaldo (en los
principios y en la comparación de cepillos) o un recuadro punteado con la ruta donde va.

**Qué es interactivo y qué no:** las imágenes de los principios, del iPod y del caballo se
agrandan al pasar el mouse y quedan fijas con un clic. Las tres del caso (09, 10 y 11) son fijas
a propósito. En el Loop, el meme se abre clickeando la fase, no la imagen.

## 📁 Estructura

```
public/                          # imágenes y videos de las slides (ver arriba)
src/
├── app/
│   ├── globals.css              # Tailwind v4 + los tokens de color en @theme
│   ├── layout.tsx               # fuentes + metadata
│   ├── page.tsx                 # renderiza <Presentation />
│   └── fuentes/                 # página aparte con todos los links de referencia
├── components/
│   ├── Presentation.tsx         # el orden de las slides y la navegación
│   ├── ProgressBar.tsx          # la barra de progreso de arriba
│   ├── Logo.tsx                 # el logo, precargado para no romper si falta
│   ├── SlotImage.tsx            # los huecos de imagen (zoom, clic, respaldo)
│   ├── MemeModal.tsx            # el meme a pantalla completa
│   ├── ui/following-pointer.tsx # el cursor con el nombre del grupo
│   └── slides/                  # Slide01…Slide14 + LoopDiagram
├── hooks/useKeyboardShortcuts.ts
├── lib/
│   ├── motion.ts                # el sistema de tiempos de las animaciones
│   ├── memes.ts                 # busca los archivos de public/
│   ├── links.ts                 # las fuentes que lista /fuentes
│   └── utils.ts
└── types/index.ts
```

## 🎨 Sistema de diseño

Alto contraste, minimalista, con un solo acento: el **rojo del logo de Viernes de la Jungla**.
Las tres fases del Loop toman los otros colores del logo.

| Token | Valor | |
|-------|-------|---|
| `--color-accent` | `#CE1B1B` | el rojo del logo |
| `--color-observe` | `#1E7A3C` | verde selva |
| `--color-reflect` | `#B07800` | dorado |
| `--color-make` | `#CE1B1B` | |
| `--color-success` | `#1E7A3C` | |
| `--color-warning` | `#E8B000` | |
| `--color-bg-primary` | `#FFFFFF` | |
| `--color-bg-secondary` | `#F4F4F4` | |
| `--color-bg-dark` | `#0A0A0A` | |
| `--color-text-primary` | `#0A0A0A` | |
| `--color-text-secondary` | `#6B6B6B` | |
| `--color-divider` | `#E0E0E0` | |

Todo sale del bloque `@theme` de `src/app/globals.css`: cambiando un token cambia el deck entero.
Los tiempos de las animaciones viven en `src/lib/motion.ts`, con una regla: **la entrada de una
slide termina antes de 1,2 s**.

## 📦 Stack

Next.js 15 (App Router) · React 19 · TypeScript strict · Tailwind CSS v4 · Motion · qrcode.react
Fuentes: Inter, Space Grotesk y JetBrains Mono vía `next/font/google`.

## ☁️ Deploy

Importá el repo en Vercel y listo: detecta Next.js solo, no hace falta ninguna variable de entorno
ni configuración. Cada push a `main` redespliega.

## 📚 Fuentes

Están todas en [`FUENTES.md`](FUENTES.md) y en la página `/fuentes` del sitio: las páginas de IBM,
los badges gratuitos, el estudio de Forrester, el caso de Oral-B & IDEO y la bibliografía de la unidad.

---

Hecho por **Viernes de la Jungla** 🐒
