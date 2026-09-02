"use client";

import { motion } from "motion/react";

const milestones = [
  {
    year: "1960s",
    title: "Raíces",
    description: "El diseño empieza a estudiarse como una forma de resolver problemas, no de decorar.",
  },
  {
    year: "1970s",
    title: "Principios formales",
    description: "Aparece como una manera distinta de pensar, con métodos propios y transferibles.",
  },
  {
    year: "1991",
    title: "David Kelley · IDEO",
    description: "Acuña el término design thinking y funda IDEO, la consultora construida sobre el método.",
  },
  {
    year: "2008",
    title: "Tim Brown · HBR",
    description: "El CEO de IDEO lo populariza en Harvard Business Review y salta del diseño al management.",
  },
  {
    year: "Hoy",
    title: "Escala empresarial",
    description: "IBM lo adapta a organizaciones grandes y lo cruza con IA e IoT: Enterprise Design Thinking.",
  },
];

export default function Slide04Origins() {
  return (
    <section className="relative w-screen h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] overflow-hidden px-20 pt-14 pb-12 flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="font-mono text-xl uppercase tracking-[0.22em] text-[var(--color-text-secondary)]"
      >
        De dónde viene · <span className="text-[var(--color-accent)]">60 años de método</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.12, ease: [0.4, 0, 0.2, 1] }}
        className="mt-4 font-black leading-[0.9] tracking-[-0.04em] text-[clamp(44px,5.5vw,80px)]"
      >
        No es una moda:{" "}
        <span className="text-[var(--color-accent)]">es una disciplina.</span>
      </motion.h2>

      <div className="relative flex-1 flex items-center">
        <div className="relative w-full">
          {/* Línea de tiempo */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformOrigin: "left" }}
            className="absolute left-0 right-0 top-7 h-[3px] bg-[var(--color-divider)]"
          />

          <div className="relative grid grid-cols-5 gap-6">
            {milestones.map(({ year, title, description }, i) => (
              <motion.div
                key={year}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.14, ease: [0.4, 0, 0.2, 1] }}
                className="flex flex-col gap-4 group"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 16,
                    delay: 0.5 + i * 0.14,
                  }}
                  className={`w-14 h-14 rounded-full flex items-center justify-center border-[3px] border-[var(--color-bg-primary)] ${
                    i === milestones.length - 1
                      ? "bg-[var(--color-accent)]"
                      : "bg-[var(--color-bg-dark)]"
                  }`}
                >
                  <span className="w-3 h-3 rounded-full bg-white" />
                </motion.span>

                <span
                  className={`font-mono text-2xl font-bold tracking-[0.1em] ${
                    i === milestones.length - 1
                      ? "text-[var(--color-accent)]"
                      : "text-[var(--color-text-primary)]"
                  }`}
                >
                  {year}
                </span>

                <h3 className="font-black text-2xl uppercase tracking-tight leading-none">
                  {title}
                </h3>

                <p className="text-xl text-[var(--color-text-secondary)] leading-snug">
                  {description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        className="font-mono text-base uppercase tracking-[0.22em] text-[var(--color-text-secondary)]"
      >
        Design thinking es el método · la innovación es el resultado
      </motion.p>
    </section>
  );
}
