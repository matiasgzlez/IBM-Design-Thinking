"use client";

import { motion } from "motion/react";
import { EASE, T, fadeUp, stagger } from "@/lib/motion";

const symptoms = [
  {
    num: "01",
    label: "Nació para talleres chicos",
    description:
      "Ocho personas, una pared y post-its. IBM tenía que aplicarlo en una empresa de cientos de miles de personas repartidas por el mundo.",
  },
  {
    num: "02",
    label: "“Esto es volver al waterfall”",
    description:
      "Los equipos ágiles lo leían como una etapa larga de análisis antes de escribir código: exactamente lo que venían de sacarse de encima.",
  },
  {
    num: "03",
    label: "Chocaba con lo que ya usaban",
    description:
      "Agile, DevOps y PMOM ya estaban instalados. El método nuevo tenía que convivir con ellos, no pedir que se tiraran a la basura.",
  },
];

export default function Slide02Problem() {
  return (
    <section className="relative w-screen h-screen bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] overflow-hidden px-20 pt-14 pb-12 flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="font-mono text-xl uppercase tracking-[0.22em] text-[var(--color-text-secondary)]"
      >
        Por qué existe Enterprise Design Thinking ·{" "}
        <span className="text-[var(--color-accent)]">el método no escalaba</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: T.title, ease: EASE }}
        className="mt-6 font-black leading-[0.88] tracking-[-0.04em] text-[clamp(48px,6vw,96px)]"
      >
        El Design Thinking clásico
        <br />
        <span className="text-[var(--color-accent)]">se rompía a escala.</span>
      </motion.h2>

      <motion.div
        variants={stagger()}
        initial="hidden"
        animate="show"
        className="mt-auto grid grid-cols-3 gap-6"
      >
        {symptoms.map(({ num, label, description }) => (
          <motion.div
            key={num}
            variants={fadeUp}
            className="rounded-xl border border-[var(--color-divider)] p-8 bg-[var(--color-bg-primary)] hover:border-[var(--color-accent)] transition-colors flex flex-col gap-5"
          >
            <div className="flex flex-col gap-4">
              <span className="w-14 h-14 rounded-full bg-[var(--color-bg-dark)] flex items-center justify-center text-white font-black text-xl leading-none tracking-tighter">
                {num}
              </span>
              <h3 className="font-black text-3xl uppercase tracking-tight leading-none">
                {label}
              </h3>
            </div>
            <p className="text-2xl text-[var(--color-text-secondary)] leading-snug">
              {description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.75 }}
        className="mt-8 font-mono text-base uppercase tracking-[0.22em] text-[var(--color-text-secondary)]"
      >
        2015 · IBM lo reescribe en su propio lenguaje: resultados de negocio y equipos de ingeniería
      </motion.p>
    </section>
  );
}
