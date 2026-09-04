"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { EASE, T } from "@/lib/motion";

export type CaseBlock = { label: string; text: string };

type Props = {
  index?: string;
  org: string;
  year: string;
  headline: ReactNode;
  insight: string;
  blocks: [CaseBlock, CaseBlock, CaseBlock];
  result: { value: string; label: string };
  diagram: ReactNode;
};

/**
 * Plantilla compartida de los tres casos: mismo ritmo de entrada y misma
 * jerarquía en los tres, para que se lean como una serie.
 */
export default function CaseLayout({
  index,
  org,
  year,
  headline,
  insight,
  blocks,
  result,
  diagram,
}: Props) {
  return (
    <section className="relative w-screen h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] overflow-hidden px-20 pt-14 pb-12 flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="font-mono text-xl uppercase tracking-[0.22em] text-[var(--color-text-secondary)] flex items-center gap-4"
      >
        <span className="text-[var(--color-accent)] font-bold">
          {index ? `Ejemplo ${index}` : "El ejemplo"}
        </span>
        <span className="text-[var(--color-divider)]">/</span>
        <span>{org}</span>
        <span className="text-[var(--color-divider)]">/</span>
        <span>{year}</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: T.title, ease: EASE }}
        className="mt-4 font-black leading-[0.9] tracking-[-0.04em] text-[clamp(38px,4.6vw,68px)] max-w-6xl"
      >
        {headline}
      </motion.h2>

      <div className="flex-1 min-h-0 mt-6 grid grid-cols-[1fr_1.05fr] gap-10 items-center">
        {/* Diagrama */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: T.content, ease: EASE }}
          className="h-full min-h-0 flex items-center justify-center"
        >
          {diagram}
        </motion.div>

        {/* Relato */}
        <div className="flex flex-col gap-5 min-h-0">
          {blocks.map(({ label, text }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: 26 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.35 + i * 0.12, ease: EASE }}
              className="border-l-4 border-[var(--color-divider)] pl-5"
            >
              <span className="font-mono text-sm uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">
                {label}
              </span>
              <p className="mt-1 text-xl leading-snug">{text}</p>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, x: 26 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.71, ease: EASE }}
            className="border-l-4 border-[var(--color-accent)] pl-5 pr-4 bg-[var(--color-accent-soft)] py-3 rounded-r-lg"
          >
            <span className="font-mono text-sm uppercase tracking-[0.2em] text-[var(--color-accent)] font-bold">
              El insight
            </span>
            <p className="mt-1 text-xl leading-snug font-medium">{insight}</p>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9, ease: EASE }}
        className="mt-5 flex items-baseline gap-6 border-t border-[var(--color-divider)] pt-5 flex-shrink-0"
      >
        <span className="font-black leading-none tracking-[-0.04em] text-[clamp(30px,3.4vw,54px)] text-[var(--color-accent)] whitespace-nowrap">
          {result.value}
        </span>
        <span className="text-xl text-[var(--color-text-secondary)] leading-snug">
          {result.label}
        </span>
      </motion.div>
    </section>
  );
}
