"use client";

import { motion } from "motion/react";

const symptoms = [
  {
    num: "01",
    label: "Brecha de empatía",
    description:
      "Decidimos por el usuario sin haberlo visto nunca trabajar. Diseñamos para el usuario que imaginamos, no para el que existe.",
  },
  {
    num: "02",
    label: "Equipos desalineados",
    description:
      "Cada área optimiza su propio objetivo. Nadie comparte una definición de éxito, así que el proyecto avanza en cuatro direcciones.",
  },
  {
    num: "03",
    label: "Se mide lo que se entrega",
    description:
      "El tablero muestra features cerradas, no problemas resueltos. Entregamos a tiempo algo que a nadie le sirve.",
  },
];

const container = {
  hidden: {},
  show: { transition: { delayChildren: 0.5, staggerChildren: 0.12 } },
};

const item = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const } },
};

export default function Slide02Problem() {
  return (
    <section className="relative w-screen h-screen bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] overflow-hidden px-20 pt-14 pb-12 flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="font-mono text-xl uppercase tracking-[0.22em] text-[var(--color-text-secondary)]"
      >
        El problema · <span className="text-[var(--color-accent)]">antes del método</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
        className="mt-6 font-black leading-[0.88] tracking-[-0.04em] text-[clamp(52px,6.5vw,104px)]"
      >
        No fallamos al construir.
        <br />
        <span className="text-[var(--color-accent)]">Fallamos al entender.</span>
      </motion.h2>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mt-auto grid grid-cols-3 gap-6"
      >
        {symptoms.map(({ num, label, description }) => (
          <motion.div
            key={num}
            variants={item}
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
    </section>
  );
}
