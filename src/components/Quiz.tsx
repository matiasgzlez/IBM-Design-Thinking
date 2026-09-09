"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EASE } from "@/lib/motion";
import { preguntas, resultados } from "@/lib/quiz";

const VERDE = "#1E7A3C";

type Estado = "inicio" | "jugando" | "final";

export default function Quiz() {
  const [estado, setEstado] = useState<Estado>("inicio");
  const [indice, setIndice] = useState(0);
  const [elegida, setElegida] = useState<number | null>(null);
  const [respuestas, setRespuestas] = useState<number[]>([]);

  const actual = preguntas[indice];
  const aciertos = respuestas.filter((r, i) => r === preguntas[i].correcta).length;
  const resultado = resultados.find((r) => aciertos >= r.minimo) ?? resultados[resultados.length - 1];

  const empezar = () => {
    setEstado("jugando");
    setIndice(0);
    setElegida(null);
    setRespuestas([]);
  };

  const responder = (i: number) => {
    if (elegida !== null) return;
    setElegida(i);
    setRespuestas((prev) => [...prev, i]);
  };

  const siguiente = () => {
    if (indice + 1 >= preguntas.length) {
      setEstado("final");
      return;
    }
    setIndice((i) => i + 1);
    setElegida(null);
  };

  return (
    <main className="min-h-screen w-full bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      {/* Barra de progreso, igual que en la presentación */}
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
                  : `${((indice + (elegida !== null ? 1 : 0)) / preguntas.length) * 100}%`,
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
                Diez situaciones para resolver aplicando el método. No alcanza con haber
                escuchado: hay que saber usarlo. Cada respuesta te explica por qué.
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
              <span className="font-mono text-sm uppercase tracking-[0.22em] text-[var(--color-text-secondary)]">
                Pregunta {String(indice + 1).padStart(2, "0")}{" "}
                <span className="text-[var(--color-divider)]">/</span>{" "}
                {String(preguntas.length).padStart(2, "0")}
              </span>

              <h2 className="mt-4 font-black leading-[1.02] tracking-[-0.03em] text-[clamp(26px,6.4vw,42px)]">
                {actual.pregunta}
              </h2>

              <div className="mt-8 flex flex-col gap-3">
                {actual.opciones.map((opcion, i) => {
                  const esCorrecta = i === actual.correcta;
                  const respondida = elegida !== null;
                  const elegidaEsta = elegida === i;

                  let estilo = "border-[var(--color-divider)]";
                  if (respondida && esCorrecta) estilo = "border-transparent";
                  else if (respondida && elegidaEsta) estilo = "border-transparent";
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

              <AnimatePresence>
                {elegida !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="mt-7"
                  >
                    <span
                      className="font-mono text-sm uppercase tracking-[0.2em] font-bold"
                      style={{ color: elegida === actual.correcta ? VERDE : "var(--color-accent)" }}
                    >
                      {elegida === actual.correcta ? "✓ Correcto" : "✗ No era esa"}
                    </span>
                    <p className="mt-2 text-lg sm:text-xl leading-snug text-[var(--color-text-secondary)]">
                      {actual.explicacion}
                    </p>

                    <button
                      onClick={siguiente}
                      className="mt-6 w-full rounded-xl bg-[var(--color-bg-dark)] px-8 py-5 text-xl font-black uppercase tracking-tight text-white transition-opacity hover:opacity-90"
                    >
                      {indice + 1 >= preguntas.length ? "Ver resultado →" : "Siguiente →"}
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
                Tu resultado
              </span>

              <div className="mt-3 flex items-baseline gap-3">
                <span
                  className="font-black leading-none tracking-[-0.05em] text-[clamp(72px,22vw,150px)]"
                  style={{ color: aciertos >= 6 ? VERDE : "var(--color-accent)" }}
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

              {/* Qué falló */}
              {respuestas.some((r, i) => r !== preguntas[i].correcta) && (
                <div className="mt-10">
                  <span className="font-mono text-sm uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">
                    Para repasar
                  </span>
                  <ul className="mt-4 flex flex-col gap-4">
                    {preguntas.map((p, i) =>
                      respuestas[i] !== p.correcta ? (
                        <li
                          key={p.pregunta}
                          className="border-l-4 border-[var(--color-accent)] pl-5"
                        >
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
