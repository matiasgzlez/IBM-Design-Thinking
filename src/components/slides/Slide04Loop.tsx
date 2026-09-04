"use client";

import { motion } from "motion/react";
import { EASE, T } from "@/lib/motion";
import LoopDiagram from "./LoopDiagram";

export default function Slide04Loop() {
  return (
    <section className="relative w-screen h-screen bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] overflow-hidden px-20 pt-14 pb-10 flex flex-col">
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: T.title, ease: EASE }}
        className="font-black leading-[0.92] tracking-[-0.03em] text-[clamp(40px,5vw,72px)]"
      >
        Un ciclo infinito de observar, reflexionar y{" "}
        <span className="text-[var(--color-accent)]">hacer.</span>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: T.content }}
        className="flex-1 min-h-0 mt-2"
      >
        <LoopDiagram />
      </motion.div>
    </section>
  );
}
