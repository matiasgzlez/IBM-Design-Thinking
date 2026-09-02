"use client";

import { useState } from "react";
import { motion } from "motion/react";

const stages = [
  {
    num: "01",
    title: "Empatizar",
    en: "Show empathy",
    description:
      "Entender cómo impacta la solución en la vida real del usuario y en sus circunstancias.",
  },
  {
    num: "02",
    title: "Recoger insights",
    en: "Gather insights",
    description:
      "Observar los obstáculos sin dar nada por supuesto. Investigación antes que opinión.",
  },
  {
    num: "03",
    title: "Crear ideas",
    en: "Create ideas",
    description:
      "Combinar diseño, estrategia de negocio y tecnología para definir el problema a resolver.",
  },
  {
    num: "04",
    title: "Desarrollar",
    en: "Develop in real time",
    description:
      "Prototipar, testear y experimentar en varias rondas. Barato, rápido, descartable.",
  },
  {
    num: "05",
    title: "Implementar",
    en: "Try to implement",
    description:
      "Lanzar sin dejar de testear, y reflexionar sobre los resultados obtenidos.",
  },
];

const mindsets = [
  "Ser empático",
  "Colaborar",
  "Optimismo",
  "Abrazar lo incierto",
  "Desafiar supuestos",
  "Ser creativo",
];

export default function Slide05Stages() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="relative w-screen h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] overflow-hidden px-20 pt-14 pb-10 flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="font-mono text-xl uppercase tracking-[0.22em] text-[var(--color-text-secondary)]"
      >
        El proceso · <span className="text-[var(--color-accent)]">5 etapas, ningún camino recto</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08, ease: [0.4, 0, 0.2, 1] }}
        className="mt-4 font-black leading-[0.9] tracking-[-0.04em] text-[clamp(44px,5.5vw,80px)]"
      >
        Las etapas que comparten{" "}
        <span className="text-[var(--color-accent)]">todos los frameworks.</span>
      </motion.h2>

      <div className="flex-1 flex flex-col justify-center gap-8">
        <div className="grid grid-cols-5 gap-5">
          {stages.map(({ num, title, en, description }, i) => (
            <motion.div
              key={num}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              initial={{ opacity: 0, y: 28 }}
              animate={{
                opacity: hovered === null ? 1 : hovered === i ? 1 : 0.4,
                y: 0,
              }}
              transition={{
                opacity: { duration: hovered !== null ? 0.12 : 0.5, delay: hovered !== null ? 0 : 0.18 + i * 0.07 },
                y: { duration: 0.45, delay: 0.18 + i * 0.07, ease: [0.4, 0, 0.2, 1] },
              }}
              className="rounded-xl border border-[var(--color-divider)] p-6 flex flex-col gap-4 hover:border-[var(--color-accent)] transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="w-12 h-12 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white font-black text-lg leading-none tracking-tighter">
                  {num}
                </span>
                {i < stages.length - 1 && (
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                    className="ml-auto text-2xl text-[var(--color-divider)]"
                  >
                    →
                  </motion.span>
                )}
              </div>

              <div>
                <h3 className="font-black text-3xl uppercase tracking-tight leading-none">
                  {title}
                </h3>
                <span className="font-mono text-sm uppercase tracking-[0.14em] text-[var(--color-accent)]">
                  {en}
                </span>
              </div>

              <p className="text-xl text-[var(--color-text-secondary)] leading-snug">
                {description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Flecha de retorno: el proceso no es lineal */}
        <div className="relative h-16">
          <motion.div
            initial={{ opacity: 0, scaleY: 0.5 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 0.5, delay: 0.7, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformOrigin: "top" }}
            className="absolute inset-x-0 top-2 h-10 rounded-b-[30px] border-b-2 border-l-2 border-r-2 border-dashed border-[var(--color-accent)]"
          />
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 1.15, ease: [0.4, 0, 0.2, 1] }}
            className="absolute -left-[7px] top-0 text-lg leading-none text-[var(--color-accent)]"
          >
            ▲
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, delay: 1 }}
            className="absolute left-1/2 -translate-x-1/2 top-[42px] -translate-y-1/2 bg-[var(--color-bg-primary)] px-5 font-mono text-base uppercase tracking-[0.2em] text-[var(--color-accent)]"
          >
            Volvés cuantas veces haga falta
          </motion.span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.35 }}
        className="flex items-center gap-4 flex-wrap"
      >
        <span className="font-mono text-base uppercase tracking-[0.22em] text-[var(--color-text-secondary)]">
          Mentalidades:
        </span>
        {mindsets.map((m) => (
          <span
            key={m}
            className="font-mono text-base uppercase tracking-[0.12em] px-3 py-1.5 rounded-md border border-[var(--color-divider)] text-[var(--color-text-secondary)]"
          >
            {m}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
