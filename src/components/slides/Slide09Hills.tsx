"use client";

import { motion } from "motion/react";
import { EASE, T, fadeUp, stagger } from "@/lib/motion";

const segments = [
  {
    key: "who",
    label: "Who",
    hint: "el usuario específico",
    text: "A GMU-based sales leader",
    color: "var(--color-observe)",
  },
  {
    key: "what",
    label: "What",
    hint: "qué va a poder lograr",
    text: "can assemble an agile response team in under 24 hours",
    color: "var(--color-reflect)",
  },
  {
    key: "wow",
    label: "Wow",
    hint: "el diferencial que sorprende",
    text: "without management involvement",
    color: "var(--color-make)",
  },
];

export default function Slide09Hills() {
  return (
    <section className="relative w-screen h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] overflow-hidden px-20 pt-14 pb-12 flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="font-mono text-xl uppercase tracking-[0.22em] text-[var(--color-text-secondary)]"
      >
        Llave 01 · <span className="text-[var(--color-accent)]">Hills</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: T.title, ease: EASE }}
        className="mt-4 font-black leading-[0.9] tracking-[-0.04em] text-[clamp(40px,5vw,74px)]"
      >
        Kennedy no pidió una lista de tareas:{" "}
        <span className="text-[var(--color-accent)]">pidió llegar a la Luna.</span>
      </motion.h2>

      {/* El Hill de ejemplo, armado por partes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: T.content, ease: EASE }}
        className="mt-8 rounded-2xl bg-[var(--color-bg-dark)] px-10 py-8"
      >
        <span className="font-mono text-sm uppercase tracking-[0.2em] text-white/40">
          Ejemplo real de IBM
        </span>
        <p className="mt-4 text-[clamp(24px,2.6vw,40px)] font-bold leading-snug tracking-tight flex flex-wrap gap-x-3 gap-y-2">
          {segments.map((seg, i) => (
            <motion.span
              key={seg.key}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.4 + i * 0.22, ease: EASE }}
              className="relative inline-block"
              style={{ color: seg.color }}
            >
              {seg.text}
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.4, delay: 0.55 + i * 0.22, ease: EASE }}
                style={{ backgroundColor: seg.color, transformOrigin: "left" }}
                className="absolute left-0 -bottom-1 h-[3px] w-full block"
              />
            </motion.span>
          ))}
        </p>
      </motion.div>

      {/* Las tres partes */}
      <motion.div
        variants={stagger(0.9, 0.1)}
        initial="hidden"
        animate="show"
        className="mt-auto grid grid-cols-3 gap-6"
      >
        {segments.map((seg) => (
          <motion.div
            key={seg.key}
            variants={fadeUp}
            className="rounded-xl border border-[var(--color-divider)] p-6 flex items-start gap-4"
            style={{ borderLeftWidth: 6, borderLeftColor: seg.color }}
          >
            <div>
              <h3
                className="font-black text-3xl uppercase tracking-tight leading-none"
                style={{ color: seg.color }}
              >
                {seg.label}
              </h3>
              <p className="mt-2 text-xl text-[var(--color-text-secondary)] leading-snug">
                {seg.hint}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.3 }}
        className="mt-8 flex items-center justify-between font-mono text-base uppercase tracking-[0.2em] text-[var(--color-text-secondary)]"
      >
        <span>
          Máximo <span className="text-[var(--color-accent)] font-bold">3 Hills</span> por proyecto
        </span>
        <span>El resto del esfuerzo va a la Foundation: mantenimiento y trabajo de base</span>
      </motion.div>
    </section>
  );
}
