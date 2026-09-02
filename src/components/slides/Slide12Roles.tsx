"use client";

import { motion } from "motion/react";
import { EASE, T } from "@/lib/motion";

const managers = [
  "Gestionar hacia resultados de usuario, no hacia funcionalidades",
  "Medir usabilidad, utilidad y deseabilidad — no solo entregas",
  "Formar equipos diversos con el expertise completo",
  "Empoderar al equipo: no frenar todo en aprobaciones",
];

const team = [
  "Construir empatía genuina con los usuarios",
  "Incluir perspectivas diversas en las decisiones críticas",
  "Tomar la iniciativa para resolver problemas",
  "Practicar la escucha empática en los conflictos",
];

export default function Slide12Roles() {
  return (
    <section className="relative w-screen h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] overflow-hidden px-20 pt-14 pb-12 flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="font-mono text-xl uppercase tracking-[0.22em] text-[var(--color-text-secondary)]"
      >
        Quién hace qué · <span className="text-[var(--color-accent)]">no alcanza con el método</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: T.title, ease: EASE }}
        className="mt-4 font-black leading-[0.9] tracking-[-0.04em] text-[clamp(40px,5vw,74px)]"
      >
        Dos responsabilidades <span className="text-[var(--color-accent)]">distintas.</span>
      </motion.h2>

      <div className="flex-1 min-h-0 mt-10 grid grid-cols-2 gap-8">
        {[
          { title: "Gerentes", items: managers, dark: true, from: -40 },
          { title: "Equipo", items: team, dark: false, from: 40 },
        ].map(({ title, items, dark, from }, col) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, x: from }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: T.content + col * 0.1, ease: EASE }}
            className={`rounded-2xl p-9 flex flex-col gap-6 ${
              dark
                ? "bg-[var(--color-bg-dark)] text-white"
                : "border border-[var(--color-divider)]"
            }`}
          >
            <h3
              className={`font-black text-5xl uppercase tracking-tight leading-none ${
                dark ? "text-white" : "text-[var(--color-accent)]"
              }`}
            >
              {title}
            </h3>

            <ul className="flex flex-col gap-4">
              {items.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.45 + col * 0.06 + i * 0.08, ease: EASE }}
                  className={`flex items-start gap-4 text-2xl leading-snug ${
                    dark ? "text-white/75" : "text-[var(--color-text-secondary)]"
                  }`}
                >
                  <span
                    className="mt-2.5 w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: dark ? "#FFFFFF" : "var(--color-accent)" }}
                  />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.95, ease: EASE }}
        className="mt-8 flex items-center gap-6"
      >
        <span className="font-mono text-base uppercase tracking-[0.2em] text-[var(--color-text-secondary)] flex-shrink-0">
          La frase que destraba un conflicto
        </span>
        <span className="text-3xl font-bold italic text-[var(--color-accent)]">
          “Help me understand…”
        </span>
      </motion.div>
    </section>
  );
}
