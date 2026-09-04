"use client";

import { motion } from "motion/react";
import SlotImage from "@/components/SlotImage";
import { EASE, T, fadeUp, stagger } from "@/lib/motion";

const parts = [
  { label: "Who", es: "(quién)", hint: "quién es el usuario", color: "var(--color-observe)" },
  { label: "What", es: "(qué)", hint: "qué necesita lograr", color: "var(--color-reflect)" },
  {
    label: "Wow",
    es: "(guau)",
    hint: "qué haría que el resultado sea sorprendente",
    color: "var(--color-make)",
  },
];

/** Lo que aparece debajo del aviso del iPod cuando se agranda. */
const ipodCaption = (
  <div className="flex flex-col items-center gap-6">
    <p className="font-black text-[clamp(26px,3vw,46px)] leading-tight tracking-tight text-white">
      “1.000 canciones en tu bolsillo.”
    </p>
    <div className="flex flex-wrap items-start justify-center gap-x-10 gap-y-4">
      {[
        { label: "Who", text: "cualquiera que escucha música", color: "var(--color-observe)" },
        { label: "What", text: "llevar toda su música encima", color: "var(--color-reflect)" },
        { label: "Wow", text: "en el bolsillo", color: "var(--color-make)" },
      ].map(({ label, text, color }) => (
        <span key={label} className="flex flex-col items-center gap-1">
          <span
            className="font-black text-2xl uppercase tracking-tight leading-none"
            style={{ color }}
          >
            {label}
          </span>
          <span className="text-xl text-white/70 leading-snug">{text}</span>
        </span>
      ))}
    </div>
  </div>
);

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
            <span className="font-bold text-[var(--color-accent)]">Who / What / Wow</span>.
          </motion.p>

          <motion.div variants={stagger(0.55, 0.1)} initial="hidden" animate="show" className="flex flex-col gap-3">
            {parts.map(({ label, es, hint, color }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="flex items-baseline gap-4 border-l-[6px] pl-5 py-1"
                style={{ borderColor: color }}
              >
                <span className="w-[150px] flex-shrink-0">
                  <span
                    className="font-black text-3xl uppercase tracking-tight leading-none"
                    style={{ color }}
                  >
                    {label}
                  </span>{" "}
                  <span className="font-mono text-sm text-[var(--color-text-secondary)]">
                    {es}
                  </span>
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
          className="h-full min-h-0 flex flex-col gap-5 justify-center"
        >
          <SlotImage
            slot="keys/hills"
            title="“1.000 canciones en tu bolsillo.”"
            subtitle="Hills"
            color="var(--color-accent)"
            className="h-[58%] w-full rounded-2xl border border-[var(--color-divider)] bg-[var(--color-bg-secondary)] p-4"
            zoomOnHover
            zoomCaption={ipodCaption}
          />

          <div className="rounded-xl border border-[var(--color-divider)] bg-[var(--color-bg-secondary)] px-6 py-5">
            <span className="font-mono text-sm uppercase tracking-[0.2em] font-bold text-[var(--color-text-secondary)]">
              Así no
            </span>
            <p className="mt-2 text-xl leading-snug text-[var(--color-text-secondary)] line-through decoration-[var(--color-text-secondary)]/40">
              “Reproductor MP3 de 5 GB, disco de 1,8 pulgadas, batería de 10 horas y
              sincronización por FireWire.”
            </p>
            <p className="mt-2 text-lg leading-snug text-[var(--color-text-primary)]">
              Es una lista de funcionalidades: no dice quién es el usuario, ni qué logra, ni qué
              lo hace sorprendente.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
