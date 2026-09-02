"use client";

import { motion } from "motion/react";

const titleWords = ["DESIGN THINKING", "/ NO ES UNA ETAPA.", "/ ES CÓMO TRABAJA EL EQUIPO."];

const chips = [
  { label: "Observe", from: { x: -200, y: 0 }, color: "var(--color-observe)" },
  { label: "Reflect", from: { x: 200, y: 0 }, color: "var(--color-reflect)" },
  { label: "Make", from: { x: 0, y: -200 }, color: "var(--color-make)" },
  { label: "Y otra vez", from: { x: 0, y: 200 }, color: "var(--color-bg-dark)" },
];

export default function Slide11Closing() {
  return (
    <section className="relative w-screen h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] overflow-hidden px-20 pt-14 pb-20 flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="font-mono text-xl uppercase tracking-[0.22em]"
      >
        <span className="text-[var(--color-text-secondary)]">Cierre · </span>
        <span className="text-[var(--color-accent)]">Volvemos al inicio</span>
      </motion.div>

      <h2 className="mt-6 font-black leading-[0.9] tracking-[-0.04em] text-[clamp(44px,6vw,96px)] flex flex-col">
        {titleWords.map((word, i) => (
          <motion.span
            key={word}
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.2 + i * 0.2, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
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

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
        className="mt-8 max-w-5xl text-3xl text-[var(--color-text-secondary)] leading-snug"
      >
        Tres principios, un Loop y tres llaves para que un equipo grande{" "}
        <span className="text-[var(--color-text-primary)] font-bold">
          se alinee alrededor del usuario
        </span>
        .
      </motion.p>

      <div className="mt-10 flex flex-wrap gap-5">
        {chips.map((chip, i) => (
          <motion.span
            key={chip.label}
            initial={{ opacity: 0, x: chip.from.x, y: chip.from.y }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 1.3 + i * 0.1,
            }}
            style={{ backgroundColor: chip.color }}
            className="inline-flex items-center gap-4 text-white pl-5 pr-8 py-5 rounded-lg uppercase tracking-[0.18em] text-3xl font-black"
          >
            <span className="shrink-0 w-12 h-12 rounded-full bg-white/25 flex items-center justify-center text-white text-2xl font-black leading-none">
              ✓
            </span>
            {chip.label}
          </motion.span>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 2.0 }}
        className="mt-auto flex items-center justify-between font-mono text-base uppercase tracking-[0.22em] text-[var(--color-text-secondary)]"
      >
        <span>Enterprise Design Thinking · IBM</span>
        <span>Badge Practitioner → IBM SkillsBuild</span>
      </motion.div>
    </section>
  );
}
