"use client";

import { motion } from "motion/react";
import Logo from "@/components/Logo";
import { EASE } from "@/lib/motion";

const titleLines = ["IBM", "DESIGN", "THINKING"];

export default function Slide01Cover() {
  return (
    <section className="relative w-screen min-h-[100dvh] sm:h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] overflow-hidden px-6 sm:px-20 py-10 pb-24 sm:py-14 flex flex-col">
      <motion.span
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="font-mono text-sm sm:text-xl uppercase tracking-[0.28em] text-[var(--color-accent)]"
      >
        Agilidad Avanzada · Unidad 1 · Design Thinking
      </motion.span>

      <div className="flex-1 min-h-0 flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
        <h1 className="font-black leading-[0.82] tracking-[-0.045em] flex flex-col flex-shrink-0 self-stretch sm:self-auto">
          {titleLines.map((line, i) => (
            <motion.span
              key={line}
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: i * 0.09, ease: EASE }}
              className={
                i === 0
                  ? "text-[clamp(52px,13vw,90px)] sm:text-[clamp(70px,9vw,150px)] text-[var(--color-accent)]"
                  : "text-[clamp(52px,13vw,90px)] sm:text-[clamp(70px,9vw,150px)]"
              }
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.82 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 140, damping: 16, delay: 0.25 }}
          className="flex-1 min-w-0 h-full flex items-center justify-center"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="h-full w-full flex items-center justify-center"
          >
            <Logo className="max-h-[70%] max-w-[70%] object-contain drop-shadow-2xl" />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="font-mono text-sm sm:text-xl uppercase tracking-[0.22em] font-bold text-[var(--color-text-primary)]"
      >
        Viernes de la Jungla
      </motion.div>
    </section>
  );
}
