"use client";

import { motion } from "motion/react";

const characteristics = [
  {
    num: "01",
    label: "Marco no lineal",
    description:
      "Un framework de innovación basado en soluciones, no en el problema. Se avanza en ciclos: se vuelve atrás tantas veces como haga falta.",
  },
  {
    num: "02",
    label: "El usuario primero",
    description:
      "Innovar es hacer algo nuevo y útil a la vez. Si no le sirve a alguien real, es novedad, no innovación.",
  },
  {
    num: "03",
    label: "Iteración continua",
    items: [
      "Siempre existe una solución mejor",
      "Todo es un prototipo",
      "Se aprende haciendo, no discutiendo",
    ],
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

export default function Slide03Definition() {
  return (
    <section className="relative w-screen h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] overflow-hidden px-20 pt-14 pb-12 flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="font-mono text-xl uppercase tracking-[0.22em] text-[var(--color-text-secondary)]"
      >
        Definición · <span className="text-[var(--color-accent)]">3 características</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
        className="mt-6 font-black leading-[0.85] tracking-[-0.04em] text-[clamp(80px,10vw,150px)]"
      >
        DESIGN <span className="text-[var(--color-accent)]">THINKING</span>
      </motion.h2>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mt-10 grid grid-cols-3 gap-6"
      >
        {characteristics.map(({ num, label, description, items }) => (
          <motion.div
            key={num}
            variants={item}
            className="rounded-xl border border-[var(--color-divider)] p-8 bg-[var(--color-bg-primary)] hover:border-[var(--color-accent)] transition-colors flex flex-col gap-5"
          >
            <div className="flex flex-col gap-4">
              <span className="w-14 h-14 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white font-black text-xl leading-none tracking-tighter">
                {num}
              </span>
              <h3 className="font-black text-3xl uppercase tracking-tight leading-none">
                {label}
              </h3>
            </div>

            {description && (
              <p className="text-2xl text-[var(--color-text-secondary)] leading-snug">
                {description}
              </p>
            )}

            {items && (
              <ul className="flex flex-col gap-3">
                {items.map((it) => (
                  <li
                    key={it}
                    className="flex items-start gap-3 text-2xl text-[var(--color-text-secondary)] leading-snug"
                  >
                    <span className="text-[var(--color-accent)] font-black mt-0.5">·</span>
                    {it}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
