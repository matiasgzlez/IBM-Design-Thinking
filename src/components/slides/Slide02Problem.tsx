"use client";

import { motion } from "motion/react";
import { EASE, T, fadeUp, stagger } from "@/lib/motion";

const razones = [
  {
    num: "01",
    label: "Estaba pensado para talleres chicos",
    description:
      "El método asume ocho personas alrededor de una pared con post-its. IBM necesitaba aplicarlo en una empresa de cientos de miles de personas repartidas por todo el mundo.",
  },
  {
    num: "02",
    label: "Los equipos ágiles lo leían como waterfall",
    description:
      "Para ellos era volver a una etapa larga de análisis antes de escribir la primera línea de código: exactamente lo que habían dejado atrás.",
  },
  {
    num: "03",
    label: "Chocaba con las metodologías que ya usaban",
    description:
      "Agile, DevOps y PMOM ya estaban instalados y funcionando. El método nuevo tenía que convivir con ellos, no pedir que los abandonaran.",
  },
];

export default function Slide02Problem() {
  return (
    <section className="relative w-screen h-screen bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] overflow-hidden px-20 pt-16 pb-12 flex flex-col">
      <div className="flex items-start justify-between gap-16">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: T.title, ease: EASE }}
          className="font-black leading-[0.9] tracking-[-0.04em] text-[clamp(40px,4.6vw,74px)] max-w-[60%]"
        >
          Para IBM, el Design Thinking clásico{" "}
          <span className="text-[var(--color-accent)]">no funcionaba a gran escala.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.18, ease: EASE }}
          className="flex-shrink-0 text-right"
        >
          <span className="block font-mono text-base uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">
            Enterprise Design Thinking
          </span>
          <span className="block mt-1 font-black leading-[0.85] tracking-[-0.05em] text-[clamp(52px,6.4vw,104px)] text-[var(--color-accent)]">
            2015
            <span className="text-[var(--color-text-primary)]">-</span>16
          </span>
        </motion.div>
      </div>

      <motion.div
        variants={stagger()}
        initial="hidden"
        animate="show"
        className="mt-auto grid grid-cols-3 gap-6"
      >
        {razones.map(({ num, label, description }) => (
          <motion.div
            key={num}
            variants={fadeUp}
            className="rounded-xl border border-[var(--color-divider)] p-8 bg-[var(--color-bg-primary)] hover:border-[var(--color-accent)] transition-colors flex flex-col gap-5"
          >
            <div className="flex flex-col gap-4">
              <span className="w-14 h-14 rounded-full bg-[var(--color-bg-dark)] flex items-center justify-center text-white font-black text-xl leading-none tracking-tighter">
                {num}
              </span>
              <h3 className="font-black text-3xl uppercase tracking-tight leading-[0.95]">
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
