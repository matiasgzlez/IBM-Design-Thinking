"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EASE } from "@/lib/motion";
import { findMedia } from "@/lib/memes";
import { preguntas, resultados } from "@/lib/quiz";

const VERDE = "#1E7A3C";

type Estado = "inicio" | "jugando" | "final";

/**
 * En el celular abre el menú de compartir —ahí está WhatsApp—; si el navegador
 * no lo soporta, descarga el archivo.
 */
async function llevarse(url: string, nombre: string): Promise<boolean> {
  const archivo = `${nombre}.png`;
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    const file = new File([blob], archivo, { type: blob.type || "image/png" });
    if (typeof navigator !== "undefined" && navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ files: [file] });
        return true;
      } catch {
        return false; // el usuario canceló
      }
    }
  } catch {
    /* sin fetch disponible: descarga directa */
  }
  const a = document.createElement("a");
  a.href = url;
  a.download = archivo;
  document.body.appendChild(a);
  a.click();
  a.remove();
  return true;
}

export default function Quiz() {
  const [estado, setEstado] = useState<Estado>("inicio");
  const [indice, setIndice] = useState(0);
  const [respuestas, setRespuestas] = useState<(number | null)[]>(() =>
    Array<number | null>(preguntas.length).fill(null),
  );
  const [stickers, setStickers] = useState<Record<string, string>>({});
  const [guardados, setGuardados] = useState<Record<string, boolean>>({});

  const actual = preguntas[indice];
  const elegida = respuestas[indice];
  const contestadas = respuestas.filter((r) => r !== null).length;
  const aciertos = respuestas.filter((r, i) => r === preguntas[i].correcta).length;
  const resultado =
    resultados.find((r) => aciertos >= r.minimo) ?? resultados[resultados.length - 1];

  // Los stickers que estén puestos en public/stickers/
  useEffect(() => {
    let cancelado = false;
    (async () => {
      for (const p of preguntas) {
        const encontrado = await findMedia(p.sticker);
        if (!cancelado && encontrado?.kind === "image") {
          setStickers((prev) => ({ ...prev, [p.sticker]: encontrado.url }));
        }
      }
    })();
    return () => {
      cancelado = true;
    };
  }, []);

  const empezar = () => {
    setEstado("jugando");
    setIndice(0);
    setRespuestas(Array<number | null>(preguntas.length).fill(null));
  };

  const responder = (i: number) => {
    if (respuestas[indice] !== null) return;
    setRespuestas((prev) => {
      const nuevas = [...prev];
      nuevas[indice] = i;
      return nuevas;
    });
  };

  const siguiente = () => {
    if (indice + 1 >= preguntas.length) {
      setEstado("final");
      return;
    }
    setIndice((i) => i + 1);
  };

  const guardar = async (slot: string, url: string) => {
    const listo = await llevarse(url, slot.split("/").pop() ?? "sticker");
    if (listo) setGuardados((prev) => ({ ...prev, [slot]: true }));
  };

  /** Se puede volver: la idea es aprender, no competir. */
  const atras = () => setIndice((i) => Math.max(0, i - 1));

  const acerto = elegida !== null && elegida === actual.correcta;
  const stickerActual = stickers[actual.sticker];

  return (
    <main className="min-h-screen w-full bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-[var(--color-divider)] z-50">
        <motion.div
          className="h-full bg-[var(--color-accent)]"
          initial={false}
          animate={{
            width:
              estado === "inicio"
                ? "0%"
                : estado === "final"
                  ? "100%"
                  : `${(contestadas / preguntas.length) * 100}%`,
          }}
          transition={{ type: "spring", stiffness: 220, damping: 30 }}
        />
      </div>

      <div className="mx-auto max-w-3xl px-6 py-12 sm:px-10 sm:py-16">
        <AnimatePresence mode="wait">
          {/* ── Inicio ── */}
          {estado === "inicio" && (
            <motion.div
              key="inicio"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.24em] text-[var(--color-accent)]">
                Viernes de la Jungla · Agilidad Avanzada
              </span>

              <h1 className="mt-4 font-black leading-[0.92] tracking-[-0.04em] text-[clamp(40px,10vw,72px)]">
                ¿Entendiste{" "}
                <span className="text-[var(--color-accent)]">IBM Design Thinking</span>?
              </h1>

              <p className="mt-6 text-xl sm:text-2xl leading-snug text-[var(--color-text-secondary)]">
                Diez situaciones para resolver aplicando el método. No alcanza con haber escuchado:
                hay que saber usarlo.
              </p>

              <p className="mt-4 text-xl sm:text-2xl leading-snug font-bold">
                Cada respuesta correcta te gana un sticker. Al final te los llevás.
              </p>

              <button
                onClick={empezar}
                className="mt-10 w-full rounded-xl bg-[var(--color-accent)] px-8 py-6 text-2xl font-black uppercase tracking-tight text-white transition-opacity hover:opacity-90 active:opacity-80"
              >
                Empezar →
              </button>

              <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:gap-6 font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
                <a href="/" className="hover:text-[var(--color-accent)]">
                  ← Ver la presentación
                </a>
                <a href="/fuentes" className="hover:text-[var(--color-accent)]">
                  Fuentes y links
                </a>
              </div>
            </motion.div>
          )}

          {/* ── Preguntas ── */}
          {estado === "jugando" && (
            <motion.div
              key={`p-${indice}`}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.28, ease: EASE }}
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-mono text-sm uppercase tracking-[0.22em] text-[var(--color-text-secondary)]">
                  Pregunta {String(indice + 1).padStart(2, "0")}{" "}
                  <span className="text-[var(--color-divider)]">/</span>{" "}
                  {String(preguntas.length).padStart(2, "0")}
                </span>
                <span className="font-mono text-sm uppercase tracking-[0.18em] font-bold" style={{ color: VERDE }}>
                  {aciertos} 🏆
                </span>
              </div>

              <h2 className="mt-4 font-black leading-[1.02] tracking-[-0.03em] text-[clamp(26px,6.4vw,42px)]">
                {actual.pregunta}
              </h2>

              <div className="mt-8 flex flex-col gap-3">
                {actual.opciones.map((opcion, i) => {
                  const esCorrecta = i === actual.correcta;
                  const respondida = elegida !== null;
                  const elegidaEsta = elegida === i;

                  let estilo = "border-[var(--color-divider)]";
                  if (respondida && (esCorrecta || elegidaEsta)) estilo = "border-transparent";
                  else if (respondida) estilo = "border-[var(--color-divider)] opacity-45";

                  return (
                    <button
                      key={opcion}
                      onClick={() => responder(i)}
                      disabled={respondida}
                      className={`rounded-xl border-2 px-6 py-5 text-left text-lg sm:text-xl leading-snug transition-colors ${estilo} ${
                        !respondida ? "hover:border-[var(--color-accent)]" : ""
                      }`}
                      style={
                        respondida && esCorrecta
                          ? { backgroundColor: VERDE, color: "#FFFFFF" }
                          : respondida && elegidaEsta
                            ? { backgroundColor: "var(--color-accent)", color: "#FFFFFF" }
                            : undefined
                      }
                    >
                      {opcion}
                    </button>
                  );
                })}
              </div>

              {indice > 0 && (
                <button
                  onClick={atras}
                  className="mt-5 font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]"
                >
                  ← Pregunta anterior
                </button>
              )}

              <AnimatePresence>
                {elegida !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="mt-7"
                  >
                    {/* El sticker ganado */}
                    {acerto && stickerActual && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.4, rotate: -18 }}
                        animate={{ opacity: 1, scale: 1, rotate: -5 }}
                        transition={{ type: "spring", stiffness: 240, damping: 13, delay: 0.15 }}
                        className="mb-6 flex items-center gap-5 rounded-2xl border-2 px-5 py-4"
                        style={{ borderColor: VERDE }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={stickerActual}
                          alt={actual.nombre || "Sticker"}
                          className="w-24 shrink-0 object-contain drop-shadow-lg"
                          draggable={false}
                        />
                        <div>
                          <span
                            className="block font-black text-xl uppercase tracking-tight leading-none"
                            style={{ color: VERDE }}
                          >
                            ¡Sticker ganado!
                          </span>
                          {actual.nombre && (
                            <span className="mt-1 block text-lg leading-snug text-[var(--color-text-secondary)]">
                              {actual.nombre}
                            </span>
                          )}

                          {/* Se lo puede llevar ahora o seguir y agarrarlos todos al final */}
                          <button
                            onClick={() => guardar(actual.sticker, stickerActual)}
                            className="mt-3 rounded-lg border-2 px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] font-bold transition-colors"
                            style={
                              guardados[actual.sticker]
                                ? { borderColor: VERDE, backgroundColor: VERDE, color: "#FFFFFF" }
                                : { borderColor: VERDE, color: VERDE }
                            }
                          >
                            {guardados[actual.sticker] ? "✓ Guardado" : "↓ Guardármelo"}
                          </button>
                        </div>
                      </motion.div>
                    )}

                    <span
                      className="font-mono text-sm uppercase tracking-[0.2em] font-bold"
                      style={{ color: acerto ? VERDE : "var(--color-accent)" }}
                    >
                      {acerto ? "✓ Correcto" : "✗ No era esa"}
                    </span>
                    <p className="mt-2 text-lg sm:text-xl leading-snug text-[var(--color-text-secondary)]">
                      {actual.explicacion}
                    </p>

                    <button
                      onClick={siguiente}
                      className="mt-6 w-full rounded-xl bg-[var(--color-bg-dark)] px-8 py-5 text-xl font-black uppercase tracking-tight text-white transition-opacity hover:opacity-90"
                    >
                      {indice + 1 >= preguntas.length ? "Ver mis stickers →" : "Siguiente →"}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ── Resultado ── */}
          {estado === "final" && (
            <motion.div
              key="final"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <span className="font-mono text-sm uppercase tracking-[0.22em] text-[var(--color-text-secondary)]">
                Tu colección
              </span>

              <div className="mt-3 flex items-baseline gap-3">
                <span
                  className="font-black leading-none tracking-[-0.05em] text-[clamp(72px,22vw,150px)]"
                  style={{ color: aciertos >= 5 ? VERDE : "var(--color-accent)" }}
                >
                  {aciertos}
                </span>
                <span className="font-black leading-none tracking-[-0.04em] text-[clamp(32px,9vw,64px)] text-[var(--color-text-secondary)]">
                  / {preguntas.length}
                </span>
              </div>

              <h2 className="mt-6 font-black leading-[0.95] tracking-[-0.03em] text-[clamp(32px,8vw,56px)]">
                {resultado.titulo}
              </h2>
              <p className="mt-4 text-xl sm:text-2xl leading-snug text-[var(--color-text-secondary)]">
                {resultado.texto}
              </p>

              {/* Los stickers */}
              {Object.keys(stickers).length > 0 && (
              <div className="mt-10">
                <span className="font-mono text-sm uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">
                  Tocá uno para guardarlo o mandarlo por WhatsApp
                </span>

                <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {preguntas.map((p, i) => {
                    const ganado = respuestas[i] === p.correcta;
                    const url = stickers[p.sticker];
                    if (!url) return null;

                    return (
                      <motion.button
                        key={p.sticker}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 + i * 0.05, ease: EASE }}
                        onClick={() => ganado && guardar(p.sticker, url)}
                        disabled={!ganado}
                        className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-colors ${
                          ganado
                            ? "border-[var(--color-divider)] hover:border-[var(--color-accent)]"
                            : "border-transparent"
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={url}
                          alt={p.nombre || `Sticker ${i + 1}`}
                          className={`w-full object-contain ${
                            ganado ? "drop-shadow-lg" : "grayscale opacity-25"
                          }`}
                          draggable={false}
                        />
                        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-secondary)] leading-tight">
                          {ganado ? p.nombre || "Ganado" : "No lo ganaste"}
                        </span>
                        {ganado && guardados[p.sticker] && (
                          <span
                            className="font-mono text-[11px] uppercase tracking-[0.14em] font-bold"
                            style={{ color: VERDE }}
                          >
                            ✓ Guardado
                          </span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
              )}

              {/* Qué falló */}
              {respuestas.some((r, i) => r !== preguntas[i].correcta) && (
                <div className="mt-10">
                  <span className="font-mono text-sm uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">
                    Para repasar
                  </span>
                  <ul className="mt-4 flex flex-col gap-4">
                    {preguntas.map((p, i) =>
                      respuestas[i] !== p.correcta ? (
                        <li key={p.pregunta} className="border-l-4 border-[var(--color-accent)] pl-5">
                          <span className="block text-lg font-bold leading-snug">{p.pregunta}</span>
                          <span className="mt-1 block text-lg leading-snug" style={{ color: VERDE }}>
                            {p.opciones[p.correcta]}
                          </span>
                        </li>
                      ) : null,
                    )}
                  </ul>
                </div>
              )}

              <button
                onClick={empezar}
                className="mt-10 w-full rounded-xl bg-[var(--color-accent)] px-8 py-6 text-2xl font-black uppercase tracking-tight text-white transition-opacity hover:opacity-90"
              >
                Jugar de nuevo
              </button>

              <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:gap-6 font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
                <a href="/" className="hover:text-[var(--color-accent)]">
                  ← Ver la presentación
                </a>
                <a href="/fuentes" className="hover:text-[var(--color-accent)]">
                  Fuentes y links
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
