"use client";

import { motion } from "motion/react";
import LoopDiagram from "./LoopDiagram";

export default function Slide07Loop() {
  return (
    <section className="relative w-screen h-screen bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] overflow-hidden px-20 pt-12 pb-10 flex flex-col">
      <motion.span
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="font-mono text-2xl uppercase tracking-[0.28em] text-[var(--color-accent)]"
      >
        The Loop · el corazón del framework
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
        className="mt-4 font-black leading-[0.92] tracking-[-0.03em] text-[clamp(40px,5vw,72px)]"
      >
        Un ciclo infinito de observar, reflexionar y{" "}
        <span className="text-[var(--color-accent)]">hacer.</span>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex-1 min-h-0 mt-2"
      >
        <LoopDiagram />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.8 }}
        className="flex items-center justify-between font-mono text-base uppercase tracking-[0.22em] text-[var(--color-text-secondary)]"
      >
        <span>Pasá el mouse por cada fase</span>
        <span>El Loop no termina: se vuelve a empezar</span>
      </motion.div>
    </section>
  );
}
