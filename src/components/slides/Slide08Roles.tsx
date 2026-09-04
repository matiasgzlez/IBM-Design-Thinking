"use client";

import { motion } from "motion/react";
import { EASE, T } from "@/lib/motion";

const lideres = [
  "Priorizar el valor generado para el usuario por sobre el volumen de entregas.",
  "Dar autonomía y poder de decisión al equipo, en lugar de bloquear las decisiones y ralentizar el proceso.",
  "Conformar equipos multidisciplinarios con todas las capacidades necesarias.",
  "Evaluar usabilidad, utilidad y adopción del producto por encima del cumplimiento de plazos.",
];

const equipo = [
  "Construir empatía y estar cerca del usuario mediante investigación continua y pruebas reales.",
  "Integrar y decidir con el equipo las visiones de negocio, diseño y desarrollo en cada sprint.",
  "Tomar la iniciativa para solucionar los problemas.",
  "Practicar la empatía interna entre integrantes antes de buscar culpables.",
];

export default function Slide08Roles() {
  return (
    <section className="relative w-screen h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] overflow-hidden px-20 pt-14 pb-12 flex flex-col">
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: T.title, ease: EASE }}
        className="font-black leading-[0.9] tracking-[-0.04em] text-[clamp(44px,5.4vw,84px)]"
      >
        Dos responsabilidades <span className="text-[var(--color-accent)]">distintas.</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: T.content, ease: EASE }}
        className="mt-5 max-w-6xl text-[clamp(20px,2vw,28px)] leading-snug text-[var(--color-text-secondary)]"
      >
        Enterprise Design Thinking requiere que{" "}
        <span className="text-[var(--color-text-primary)] font-bold">
          el liderazgo cambie su forma de dirigir
        </span>{" "}
        y{" "}
        <span className="text-[var(--color-text-primary)] font-bold">
          el equipo su forma de trabajar
        </span>
        .
      </motion.p>

      <div className="flex-1 min-h-0 mt-8 grid grid-cols-2 gap-8">
        {[
          { title: "Líderes", items: lideres, dark: true, from: -40 },
          { title: "Equipo de trabajo", items: equipo, dark: false, from: 40 },
        ].map(({ title, items, dark, from }, col) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, x: from }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: T.content + 0.12 + col * 0.1, ease: EASE }}
            className={`rounded-2xl p-9 flex flex-col gap-6 ${
              dark
                ? "bg-[var(--color-bg-dark)] text-white"
                : "border border-[var(--color-divider)]"
            }`}
          >
            <h3
              className={`font-black text-[clamp(34px,3.4vw,52px)] uppercase tracking-tight leading-none ${
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
                  transition={{ duration: 0.4, delay: 0.5 + col * 0.06 + i * 0.08, ease: EASE }}
                  className={`flex items-start gap-4 text-[clamp(19px,1.6vw,24px)] leading-snug ${
                    dark ? "text-white/85" : "text-[var(--color-text-primary)]"
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
    </section>
  );
}
