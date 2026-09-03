"use client";

import { motion } from "motion/react";
import { EASE, T } from "@/lib/motion";

const lanes = [
  {
    name: "Double Diamond",
    sub: "Design Council",
    color: "var(--color-text-secondary)",
    steps: ["Descubrir", "Definir", "Idear", "Entregar"],
    muted: true,
  },
  {
    name: "TiSDD",
    sub: "Stickdorn et al.",
    color: "var(--color-text-secondary)",
    steps: ["Research", "Ideation", "Prototyping", "Implementation"],
    muted: true,
  },
  {
    name: "IBM · The Loop",
    sub: "Enterprise Design Thinking",
    color: "var(--color-accent)",
    steps: ["Observar", "Reflexionar", "Hacer", "…y otra vez"],
    muted: false,
  },
];

export default function Slide15Context() {
  return (
    <section className="relative w-screen h-screen bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] overflow-hidden px-20 pt-14 pb-12 flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="font-mono text-xl uppercase tracking-[0.22em] text-[var(--color-text-secondary)]"
      >
        Dónde encaja en la unidad ·{" "}
        <span className="text-[var(--color-accent)]">es el mismo proceso, en otro idioma</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: T.title, ease: EASE }}
        className="mt-4 font-black leading-[0.9] tracking-[-0.04em] text-[clamp(40px,5vw,74px)]"
      >
        IBM no inventó otro método:{" "}
        <span className="text-[var(--color-accent)]">tradujo el que ya existía.</span>
      </motion.h2>

      <div className="flex-1 min-h-0 flex flex-col justify-center gap-5 mt-6">
        {lanes.map((lane, li) => (
          <motion.div
            key={lane.name}
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: T.content + li * 0.14, ease: EASE }}
            className={`grid grid-cols-[240px_1fr] gap-8 items-center rounded-2xl px-8 py-5 ${
              lane.muted
                ? "bg-[var(--color-bg-primary)] border border-[var(--color-divider)]"
                : "bg-[var(--color-bg-dark)]"
            }`}
          >
            <div>
              <h3
                className={`font-black text-3xl uppercase tracking-tight leading-none ${
                  lane.muted ? "" : "text-white"
                }`}
              >
                {lane.name}
              </h3>
              <span
                className="font-mono text-sm uppercase tracking-[0.14em]"
                style={{ color: lane.muted ? "var(--color-text-secondary)" : "var(--color-accent)" }}
              >
                {lane.sub}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {lane.steps.map((step, si) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: 0.4 + li * 0.14 + si * 0.07,
                    ease: EASE,
                  }}
                  className={`rounded-lg px-4 py-3 text-center text-xl font-bold tracking-tight ${
                    lane.muted
                      ? "bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]"
                      : "bg-[var(--color-accent)] text-white"
                  }`}
                >
                  {step}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.95, ease: EASE }}
        className="mt-6 grid grid-cols-2 gap-8"
      >
        <p className="text-2xl text-[var(--color-text-secondary)] leading-snug">
          Los <span className="text-[var(--color-text-primary)] font-bold">Hills</span> son su forma de
          definir el problema: reemplazan al brief tradicional.
        </p>
        <p className="text-2xl text-[var(--color-text-secondary)] leading-snug">
          Resultó tan escalable que IBM terminó{" "}
          <span className="text-[var(--color-text-primary)] font-bold">
            vendiéndolo como servicio de consultoría
          </span>{" "}
          a clientes externos.
        </p>
      </motion.div>
    </section>
  );
}
