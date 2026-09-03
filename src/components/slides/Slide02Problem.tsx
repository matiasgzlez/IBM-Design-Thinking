"use client";

import { motion } from "motion/react";
import { EASE, T, fadeUp, stagger } from "@/lib/motion";

const razones = [
  {
    num: "01",
    label: "Pensado para talleres chicos",
    description:
      "El método nació para reuniones presenciales de grupos chicos: un puñado de personas, un facilitador, post-its y una pared, en sesiones de unos pocos días.",
    highlight:
      "IBM necesitaba aplicarlo a cientos de miles de empleados repartidos por todo el mundo.",
  },
  {
    num: "02",
    label: "Para los ágiles, era volver al waterfall",
    description:
      "Se aplicaba como una secuencia de fases cerradas —investigar, idear, prototipar, testear— que terminaba en un taller y recién ahí pasaba el diseño a ingeniería.",
    highlight:
      "Diseño primero, construcción después: la etapa larga de análisis que los equipos ágiles querían dejar atrás.",
  },
  {
    num: "03",
    label: "Chocaba con lo que ya usaban",
    description:
      "Agile, DevOps y PMOM ya estaban instalados y corriendo en los sprints, y el método clásico no entraba en ese ritmo.",
    highlight:
      "Eso los llevó a reformular el enfoque en su propio lenguaje: así nace Enterprise Design Thinking.",
  },
];

export default function Slide02Problem() {
  return (
    <section className="relative w-screen h-screen bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] overflow-hidden px-20 pt-14 pb-12 flex flex-col">
      <div className="flex items-start justify-between gap-10">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: T.title, ease: EASE }}
          className="font-black leading-[0.9] tracking-[-0.04em] text-[clamp(38px,4.4vw,72px)] max-w-[72%]"
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
          <span className="block mt-1 font-black leading-[0.85] tracking-[-0.05em] text-[clamp(48px,5.8vw,96px)] text-[var(--color-accent)]">
            2015
            <span className="text-[var(--color-text-primary)]">-</span>16
          </span>
        </motion.div>
      </div>

      <motion.div
        variants={stagger()}
        initial="hidden"
        animate="show"
        className="my-auto grid grid-cols-3 gap-6"
      >
        {razones.map(({ num, label, description, highlight }) => (
          <motion.div
            key={num}
            variants={fadeUp}
            className="rounded-xl border border-[var(--color-divider)] p-7 bg-[var(--color-bg-primary)] hover:border-[var(--color-accent)] transition-colors flex flex-col gap-4"
          >
            <div className="flex items-center gap-4">
              <span className="w-12 h-12 flex-shrink-0 rounded-full bg-[var(--color-bg-dark)] flex items-center justify-center text-white font-black text-lg leading-none tracking-tighter">
                {num}
              </span>
              <h3 className="font-black text-[26px] uppercase tracking-tight leading-[0.95]">
                {label}
              </h3>
            </div>

            <p className="text-xl text-[var(--color-text-secondary)] leading-snug">
              {description}
            </p>

            <p className="mt-auto pt-4 border-t border-[var(--color-divider)] text-xl leading-snug font-medium">
              {highlight}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
