"use client";

import { motion } from "motion/react";
import { EASE, T } from "@/lib/motion";

const playbacks = [
  {
    num: "01",
    name: "Hills Playback",
    when: "Antes de construir",
    description: "Valida que los objetivos iniciales sean los correctos.",
    color: "var(--color-observe)",
  },
  {
    num: "02",
    name: "Playback Zero",
    when: "Primera propuesta",
    description: "Presenta la solución completa por primera vez a los stakeholders.",
    color: "var(--color-reflect)",
  },
  {
    num: "03",
    name: "Delivery Playbacks",
    when: "Cada sprint",
    description: "Revisan el avance después de cada iteración. Se repiten sin parar.",
    color: "var(--color-make)",
  },
  {
    num: "04",
    name: "Client Playbacks",
    when: "Con el cliente",
    description: "Recogen feedback directo de los clientes clave.",
    color: "var(--color-accent)",
  },
];

export default function Slide08Playbacks() {
  return (
    <section className="relative w-screen h-screen bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] overflow-hidden px-20 pt-14 pb-12 flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="font-mono text-xl uppercase tracking-[0.22em] text-[var(--color-text-secondary)]"
      >
        Llave 02 · <span className="text-[var(--color-accent)]">Playbacks</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: T.title, ease: EASE }}
        className="mt-4 font-black leading-[0.9] tracking-[-0.04em] text-[clamp(40px,5vw,74px)]"
      >
        Cuatro momentos para{" "}
        <span className="text-[var(--color-accent)]">alinear sin jerarquías.</span>
      </motion.h2>

      {/* Línea de tiempo del proyecto */}
      <div className="relative flex-1 flex items-center">
        <div className="relative w-full">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            style={{ transformOrigin: "left" }}
            className="absolute left-0 right-0 top-8 h-[3px] bg-[var(--color-divider)]"
          />

          <div className="relative grid grid-cols-4 gap-6">
            {playbacks.map(({ num, name, when, description, color }, i) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.32 + i * 0.11, ease: EASE }}
                className="flex flex-col gap-4"
              >
                <div className="relative">
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 340,
                      damping: 17,
                      delay: 0.32 + i * 0.11,
                    }}
                    className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center border-[3px] border-[var(--color-bg-secondary)] font-black text-white text-lg"
                    style={{ backgroundColor: color }}
                  >
                    {num}
                  </motion.span>
                  {/* Pulso: los delivery playbacks se repiten */}
                  {i === 2 && (
                    <motion.span
                      className="absolute left-0 top-0 w-16 h-16 rounded-full"
                      style={{ border: `3px solid ${color}` }}
                      animate={{ scale: [1, 1.7], opacity: [0.7, 0] }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: 1,
                      }}
                    />
                  )}
                </div>

                <div>
                  <h3 className="font-black text-3xl uppercase tracking-tight leading-none">
                    {name}
                  </h3>
                  <span
                    className="font-mono text-sm uppercase tracking-[0.16em] font-bold"
                    style={{ color }}
                  >
                    {when}
                  </span>
                </div>

                <p className="text-xl text-[var(--color-text-secondary)] leading-snug">
                  {description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.85, ease: EASE }}
        className="max-w-5xl text-2xl text-[var(--color-text-secondary)] leading-snug"
      >
        En los cuatro la lógica es la misma: contar la historia{" "}
        <span className="text-[var(--color-text-primary)] font-bold">
          desde la perspectiva del usuario
        </span>
        , en un espacio seguro, sin jerarquías que frenen la crítica honesta.
      </motion.p>
    </section>
  );
}
