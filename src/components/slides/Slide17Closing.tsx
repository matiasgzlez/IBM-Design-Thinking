"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/motion";

const titleWords = ["IBM DESIGN THINKING", "/ NO ES UNA ETAPA.", "/ ES CÓMO TRABAJA EL EQUIPO."];

const summary = [
  {
    title: "3 Principios",
    items: ["Foco en outcomes de usuario", "Equipos diversos y empoderados", "Reinvención incansable"],
    color: "var(--color-accent)",
  },
  {
    title: "The Loop",
    items: ["Observar", "Reflexionar", "Hacer — y otra vez"],
    color: "var(--color-reflect)",
  },
  {
    title: "The Keys",
    items: ["Hills · quién, qué, wow", "Playbacks · alinear sin jerarquías", "Sponsor Users · desde el día uno"],
    color: "var(--color-make)",
  },
];

export default function Slide17Closing() {
  return (
    <section className="relative w-screen h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] overflow-hidden px-20 pt-14 pb-12 flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="font-mono text-xl uppercase tracking-[0.22em]"
      >
        <span className="text-[var(--color-text-secondary)]">Cierre · </span>
        <span className="text-[var(--color-accent)]">para recordar</span>
      </motion.div>

      <h2 className="mt-5 font-black leading-[0.9] tracking-[-0.04em] text-[clamp(38px,4.8vw,78px)] flex flex-col">
        {titleWords.map((word, i) => (
          <motion.span
            key={word}
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.1 + i * 0.14, duration: 0.5, ease: EASE }}
            className={
              i === titleWords.length - 1
                ? "text-[var(--color-accent)]"
                : "text-[var(--color-text-primary)]"
            }
          >
            {word}
          </motion.span>
        ))}
      </h2>

      <div className="mt-auto grid grid-cols-3 gap-6">
        {summary.map(({ title, items, color }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 + i * 0.12, ease: EASE }}
            className="rounded-xl border-l-[6px] border border-[var(--color-divider)] p-7 flex flex-col gap-4"
            style={{ borderLeftColor: color }}
          >
            <h3
              className="font-black text-4xl uppercase tracking-tight leading-none"
              style={{ color }}
            >
              {title}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-2xl text-[var(--color-text-secondary)] leading-snug"
                >
                  <span className="font-black mt-0.5" style={{ color }}>
                    ·
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1 }}
        className="mt-8 flex items-center justify-between font-mono text-base uppercase tracking-[0.22em] text-[var(--color-text-secondary)]"
      >
        <span>
          Certificaciones gratis:{" "}
          <span className="text-[var(--color-accent)] font-bold">Practitioner</span> y{" "}
          <span className="text-[var(--color-accent)] font-bold">Co-Creator</span>
        </span>
        <span>Viernes de la Jungla · Agilidad Avanzada 2026</span>
      </motion.div>
    </section>
  );
}
