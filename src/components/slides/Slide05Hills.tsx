"use client";

import { motion } from "motion/react";
import SlotImage from "@/components/SlotImage";
import { EASE, T, fadeUp, stagger } from "@/lib/motion";

const parts = [
  { label: "Quién", hint: "quién es el usuario", color: "var(--color-observe)" },
  { label: "Qué", hint: "qué necesita lograr", color: "var(--color-reflect)" },
  {
    label: "Wow",
    hint: "qué haría que el resultado sea sorprendente",
    color: "var(--color-make)",
  },
];

export default function Slide05Hills() {
  return (
    <section className="relative w-screen h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] overflow-hidden px-20 pt-14 pb-12 flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="font-mono text-xl uppercase tracking-[0.22em] text-[var(--color-text-secondary)]"
      >
        The Keys · <span className="text-[var(--color-accent)]">llave 01</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: T.title, ease: EASE }}
        className="mt-3 font-black leading-[0.9] tracking-[-0.04em] text-[clamp(56px,7vw,110px)] text-[var(--color-accent)]"
      >
        Hills
      </motion.h2>

      <div className="flex-1 min-h-0 mt-8 grid grid-cols-[1.1fr_1fr] gap-14 items-center">
        {/* El texto */}
        <div className="flex flex-col gap-7">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: T.content, ease: EASE }}
            className="text-2xl text-[var(--color-text-secondary)] leading-snug"
          >
            <span className="text-[var(--color-text-primary)] font-bold">The Keys</span> son las
            tres prácticas concretas que IBM usa para escalar Design Thinking a proyectos grandes
            y equipos distribuidos.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: T.content + 0.12, ease: EASE }}
            className="text-[clamp(24px,2.4vw,34px)] leading-snug border-t border-[var(--color-divider)] pt-7"
          >
            En vez de listar funcionalidades, definen el éxito de un proyecto con una frase tipo{" "}
            <span className="font-bold text-[var(--color-accent)]">Quién / Qué / Wow</span>.
          </motion.p>

          <motion.div variants={stagger(0.55, 0.1)} initial="hidden" animate="show" className="flex flex-col gap-3">
            {parts.map(({ label, hint, color }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="flex items-baseline gap-4 border-l-[6px] pl-5 py-1"
                style={{ borderColor: color }}
              >
                <span
                  className="font-black text-3xl uppercase tracking-tight leading-none w-[110px] flex-shrink-0"
                  style={{ color }}
                >
                  {label}
                </span>
                <span className="text-xl text-[var(--color-text-secondary)] leading-snug">
                  {hint}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* La referencia: el iPod */}
        <motion.div
          initial={{ opacity: 0, x: 26 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: T.content + 0.1, ease: EASE }}
          className="h-full min-h-0 flex flex-col gap-4 justify-center"
        >
          <SlotImage
            slot="keys/hills"
            title="Un Hill no lista funcionalidades: dice qué va a lograr el usuario."
            subtitle="Hills"
            color="var(--color-accent)"
            className="h-[62%] w-full rounded-2xl border border-[var(--color-divider)] bg-[var(--color-bg-secondary)] p-4"
            zoomOnHover
          />
          <p className="text-xl text-[var(--color-text-secondary)] leading-snug">
            La referencia es el iPod de Steve Jobs:{" "}
            <span className="text-[var(--color-text-primary)] font-bold">
              “1.000 canciones en tu bolsillo”
            </span>{" "}
            — ni un GB, ni un códec, ni una batería.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
