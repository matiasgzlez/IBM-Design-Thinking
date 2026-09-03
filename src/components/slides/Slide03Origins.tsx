"use client";

import { motion } from "motion/react";
import { EASE, T } from "@/lib/motion";

const milestones = [
  {
    year: "1960s",
    title: "Raíces",
    description:
      "El diseño empieza a estudiarse como una forma de resolver problemas, no de decorar.",
  },
  {
    year: "1970s",
    title: "Se vuelve un método",
    description:
      "Se escriben sus principios y se empieza a enseñar. Deja de depender del talento de un diseñador y pasa a ser un proceso que cualquier equipo puede aprender, repetir y aplicar a problemas que no son de diseño.",
  },
  {
    year: "1991",
    title: "David Kelley · IDEO",
    description:
      "Kelley funda IDEO, una consultora de diseño e innovación que crea productos para otras empresas, y acuña el término design thinking: el método pasa a ser lo que se vende.",
  },
  {
    year: "2008",
    title: "Tim Brown · HBR",
    description:
      "El CEO de IDEO publica el artículo Design Thinking en Harvard Business Review y lo explica en el idioma de los gerentes. Deja de ser cosa de diseñadores: las empresas empiezan a usarlo para resolver problemas de negocio.",
  },
  {
    year: "2015-16",
    title: "IBM · Enterprise",
    description:
      "IBM lo reformula junto a Kelley y Brown para que funcione en una empresa gigante: nace Enterprise Design Thinking.",
    highlight: true,
  },
];

export default function Slide03Origins() {
  return (
    <section className="relative w-screen h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] overflow-hidden px-20 pt-14 pb-12 flex flex-col">
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: T.title, ease: EASE }}
        className="font-black leading-[0.9] tracking-[-0.04em] text-[clamp(44px,5.4vw,86px)]"
      >
        ¿Cómo es la <span className="text-[var(--color-accent)]">línea del tiempo?</span>
      </motion.h2>

      <div className="relative flex-1 flex items-center">
        <div className="relative w-full">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            style={{ transformOrigin: "left" }}
            className="absolute left-0 right-0 top-7 h-[3px] bg-[var(--color-divider)]"
          />

          <div className="relative grid grid-cols-5 gap-6 items-start">
            {milestones.map(({ year, title, description, highlight }, i) => (
              <motion.div
                key={year}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.3 + i * 0.1, ease: EASE }}
                className="flex flex-col gap-4"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 340,
                    damping: 17,
                    delay: 0.3 + i * 0.1,
                  }}
                  className={`w-14 h-14 rounded-full flex items-center justify-center border-[3px] border-[var(--color-bg-primary)] ${
                    highlight ? "bg-[var(--color-accent)]" : "bg-[var(--color-bg-dark)]"
                  }`}
                >
                  <span className="w-3 h-3 rounded-full bg-white" />
                </motion.span>

                <span
                  className={`font-mono text-2xl font-bold tracking-[0.06em] ${
                    highlight ? "text-[var(--color-accent)]" : "text-[var(--color-text-primary)]"
                  }`}
                >
                  {year}
                </span>

                <h3 className="font-black text-2xl uppercase tracking-tight leading-[0.95]">
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
    </section>
  );
}
