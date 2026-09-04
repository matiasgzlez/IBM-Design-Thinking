"use client";

import { motion } from "motion/react";
import Logo from "@/components/Logo";
import { EASE } from "@/lib/motion";

export default function Slide13Gracias() {
  return (
    <section className="relative w-screen h-screen bg-[var(--color-bg-dark)] text-white overflow-hidden flex flex-col items-center justify-center gap-10 px-20 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 16, delay: 0.1 }}
        className="flex-1 min-h-0 flex items-center justify-center"
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="h-full flex items-center"
        >
          <Logo className="max-h-full object-contain" />
        </motion.div>
      </motion.div>

      <div className="flex flex-shrink-0">
        {"Muchas gracias.".split("").map((char, i) => (
          <span key={i} className="overflow-hidden inline-block">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.55, delay: 0.5 + i * 0.035, ease: EASE }}
              className="inline-block font-black uppercase tracking-[0.03em] text-[clamp(40px,5.4vw,84px)] text-white"
            >
              {char === " " ? " " : char}
            </motion.span>
          </span>
        ))}
      </div>
    </section>
  );
}
