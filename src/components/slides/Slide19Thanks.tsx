"use client";

import { motion } from "motion/react";
import Logo from "@/components/Logo";
import { EASE } from "@/lib/motion";

const lines = [
  { text: "Diseñás con el usuario,", accent: false },
  { text: "NO PARA EL USUARIO.", accent: true },
];

function CurtainLine({
  text,
  accent,
  wordOffset,
}: {
  text: string;
  accent: boolean;
  wordOffset: number;
}) {
  const words = text.split(" ");
  return (
    <div className="flex flex-wrap justify-center gap-x-6">
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.55, delay: (wordOffset + i) * 0.07, ease: EASE }}
            className={`inline-block font-black leading-none tracking-normal text-[clamp(40px,5.4vw,86px)] ${
              accent ? "text-[var(--color-accent)]" : "text-white"
            }`}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

export default function Slide19Thanks() {
  const wordCounts = lines.map((l) => l.text.split(" ").length);
  const offsets = wordCounts.reduce<number[]>((acc, _, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + wordCounts[i - 1]);
    return acc;
  }, []);

  const totalWords = wordCounts.reduce((a, b) => a + b, 0);
  const thanksDelay = totalWords * 0.07 + 0.2;

  return (
    <section className="relative w-screen h-screen bg-[var(--color-bg-dark)] text-white overflow-hidden flex flex-col items-center justify-center px-20 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 16, delay: 0.1 }}
        className="flex-1 min-h-0 flex items-center justify-center"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="h-full flex items-center"
        >
          <Logo className="max-h-[70%] object-contain" />
        </motion.div>
      </motion.div>

      <div className="flex flex-col gap-3 flex-shrink-0">
        {lines.map((line, i) => (
          <CurtainLine
            key={i}
            text={line.text}
            accent={line.accent}
            wordOffset={offsets[i]}
          />
        ))}
      </div>

      <div className="mt-8 flex flex-shrink-0">
        {"Muchas gracias.".split("").map((char, i) => (
          <span key={i} className="overflow-hidden inline-block">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.45, delay: thanksDelay + i * 0.03, ease: EASE }}
              className="inline-block font-black uppercase tracking-[0.05em] text-3xl text-white/55"
            >
              {char === " " ? " " : char}
            </motion.span>
          </span>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: thanksDelay + 0.6 }}
        className="absolute bottom-10 left-20 right-20 flex items-center justify-between font-mono text-base uppercase tracking-[0.22em] text-white/30"
      >
        <span className="text-white/60 font-bold">Viernes de la Jungla</span>
        <span>Agilidad Avanzada · Unidad 1 · 2026</span>
      </motion.div>
    </section>
  );
}
