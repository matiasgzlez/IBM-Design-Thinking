"use client";

import { motion } from "motion/react";
import SlotImage from "@/components/SlotImage";
import { EASE, T, fadeUp, stagger } from "@/lib/motion";

const OBSERVE = "var(--color-observe)";
const REFLECT = "var(--color-reflect)";
const MAKE = "var(--color-make)";

/** El Hill del primer iPod, partido en sus tres piezas. */
const ipod = [
  { key: "who", text: "Cualquiera que escucha música", color: OBSERVE },
  { key: "what", text: "puede llevar toda su música encima", color: REFLECT },
  { key: "wow", text: "en el bolsillo", color: MAKE },
];

const parts = [
  { key: "who", label: "Who", hint: "el usuario específico", color: OBSERVE },
  { key: "what", label: "What", hint: "qué va a poder lograr", color: REFLECT },
  { key: "wow", label: "Wow", hint: "el diferencial que sorprende", color: MAKE },
];

export default function Slide07Hills() {
  return (
    <section className="relative w-screen h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] overflow-hidden px-20 pt-14 pb-10 flex flex-col">
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: T.title, ease: EASE }}
        className="font-black leading-[0.9] tracking-[-0.04em] text-[clamp(38px,4.6vw,70px)]"
      >
        Kennedy no pidió una lista de tareas:{" "}
        <span className="text-[var(--color-accent)]">pidió llegar a la Luna.</span>
      </motion.h2>

      {/* El Hill del iPod: la imagen y la frase partida en tres */}
      <div className="mt-8 flex-1 min-h-0 grid grid-cols-[440px_1fr] gap-8 items-stretch">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: T.content, ease: EASE }}
        >
          <SlotImage
            slot="keys/hills"
            title="1000 songs in your pocket"
            subtitle="El Hill del primer iPod"
            color="var(--color-accent)"
            className="h-full"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: T.content + 0.1, ease: EASE }}
          className="rounded-2xl bg-[var(--color-bg-dark)] px-10 py-8 flex flex-col justify-center gap-5"
        >
          <span className="font-mono text-sm uppercase tracking-[0.2em] text-white/40">
            Apple, 2001 · “1000 songs in your pocket”
          </span>

          <p className="text-[clamp(26px,2.9vw,44px)] font-bold leading-[1.15] tracking-tight flex flex-wrap gap-x-3">
            {ipod.map((seg, i) => (
              <motion.span
                key={seg.key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.45 + i * 0.18, ease: EASE }}
                className="relative inline-block"
                style={{ color: seg.color }}
              >
                {seg.text}
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.35, delay: 0.6 + i * 0.18, ease: EASE }}
                  style={{ backgroundColor: seg.color, transformOrigin: "left" }}
                  className="absolute left-0 -bottom-1 h-[3px] w-full block"
                />
              </motion.span>
            ))}
          </p>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.1 }}
            className="text-lg text-white/60 leading-snug"
          >
            No dice cuántos GB, ni qué códec, ni cuánta batería. Dice{" "}
            <span className="text-white font-semibold">qué va a lograr el usuario</span> — y eso
            deja al equipo libre para resolver el cómo.
          </motion.span>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.25 }}
            className="font-mono text-sm leading-snug text-white/35 border-t border-white/10 pt-4"
          >
            Así lo escribe IBM: “A GMU-based sales leader can assemble an agile response team in
            under 24 hours without management involvement.”
          </motion.span>
        </motion.div>
      </div>

      {/* Las tres partes */}
      <motion.div
        variants={stagger(1.2, 0.1)}
        initial="hidden"
        animate="show"
        className="mt-8 grid grid-cols-3 gap-6"
      >
        {parts.map((part) => (
          <motion.div
            key={part.key}
            variants={fadeUp}
            className="rounded-xl border border-[var(--color-divider)] p-6 flex items-baseline gap-4"
            style={{ borderLeftWidth: 6, borderLeftColor: part.color }}
          >
            <h3
              className="font-black text-3xl uppercase tracking-tight leading-none"
              style={{ color: part.color }}
            >
              {part.label}
            </h3>
            <p className="text-xl text-[var(--color-text-secondary)] leading-snug">{part.hint}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.5 }}
        className="mt-6 font-mono text-base uppercase tracking-[0.2em] text-[var(--color-text-secondary)]"
      >
        Máximo <span className="text-[var(--color-accent)] font-bold">3 Hills</span> por proyecto ·
        el resto del esfuerzo va a la Foundation
      </motion.p>
    </section>
  );
}
