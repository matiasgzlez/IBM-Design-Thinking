"use client";

import { motion } from "motion/react";
import SlotImage from "@/components/SlotImage";
import { EASE, T } from "@/lib/motion";

const playbacks = [
  {
    num: "01",
    name: "Hills Playback",
    when: "Antes de construir",
    description:
      "Valida que los objetivos estén centrados en el usuario (Hills) y sean los correctos antes de invertir recursos en el desarrollo.",
    color: "var(--color-observe)",
  },
  {
    num: "02",
    name: "Playback Zero",
    when: "Propuesta inicial",
    description:
      "Se presenta la primera solución a los stakeholders para alinear visión, alcance y expectativas.",
    color: "var(--color-reflect)",
  },
  {
    num: "03",
    name: "Delivery Playbacks",
    when: "Cada sprint",
    description:
      "Muestran el avance real al final de cada iteración. Se repiten constantemente para recibir retroalimentación continua.",
    color: "var(--color-make)",
  },
  {
    num: "04",
    name: "Client Playbacks",
    when: "Con el cliente",
    description:
      "Recibimos el feedback directo de los usuarios o clientes clave para validar la solución en un entorno real.",
    color: "var(--color-accent)",
  },
];

export default function Slide06Playbacks() {
  return (
    <section className="relative w-screen h-screen bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] overflow-hidden px-20 pt-12 pb-10 flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="font-mono text-xl uppercase tracking-[0.22em] text-[var(--color-text-secondary)]"
      >
        The Keys · <span className="text-[var(--color-accent)]">llave 02</span>
      </motion.div>

      <div className="mt-3 grid grid-cols-[1fr_340px] gap-12 items-start">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: T.title, ease: EASE }}
            className="font-black leading-[0.9] tracking-[-0.04em] text-[clamp(46px,5.6vw,88px)] text-[var(--color-accent)]"
          >
            Playbacks
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: T.content, ease: EASE }}
            className="mt-4 text-[clamp(20px,2vw,28px)] leading-snug"
          >
            IBM define <span className="font-bold">cuatro momentos distintos</span> según lo que se
            necesita validar a tiempo para evitar correcciones costosas.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: T.content + 0.12, ease: EASE }}
            className="mt-3 text-xl text-[var(--color-text-secondary)] leading-snug max-w-4xl"
          >
            Sin playbacks, los stakeholders descubren el producto al final del proceso. Sirven para
            alinear expectativas{" "}
            <span className="text-[var(--color-text-primary)] font-bold">
              antes, durante y al final
            </span>{" "}
            de la construcción.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: T.content, ease: EASE }}
        >
          <SlotImage
            slot="keys/playbacks"
            title="Sin playbacks, el stakeholder ve el producto el día que llega la caja."
            subtitle="Playbacks"
            color="var(--color-reflect)"
            className="h-[210px] w-full"
            zoomOnHover
          />
        </motion.div>
      </div>

      {/* Los cuatro momentos sobre la línea del proyecto */}
      <div className="relative flex-1 flex items-center">
        <div className="relative w-full">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            style={{ transformOrigin: "left" }}
            className="absolute left-0 right-0 top-8 h-[3px] bg-[var(--color-divider)]"
          />

          <div className="relative grid grid-cols-4 gap-6">
            {playbacks.map(({ num, name, when, description, color }, i) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.4 + i * 0.11, ease: EASE }}
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
                      delay: 0.4 + i * 0.11,
                    }}
                    className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center border-[3px] border-[var(--color-bg-secondary)] font-black text-white text-lg"
                    style={{ backgroundColor: color }}
                  >
                    {num}
                  </motion.span>
                  {/* Los delivery playbacks se repiten */}
                  {i === 2 && (
                    <motion.span
                      className="absolute left-0 top-0 w-16 h-16 rounded-full"
                      style={{ border: `3px solid ${color}` }}
                      animate={{ scale: [1, 1.7], opacity: [0.7, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 1 }}
                    />
                  )}
                </div>

                <div>
                  <h3 className="font-black text-[clamp(26px,2.1vw,34px)] uppercase tracking-tight leading-[0.95]">
                    {name}
                  </h3>
                  <span
                    className="font-mono text-base uppercase tracking-[0.16em] font-bold"
                    style={{ color }}
                  >
                    {when}
                  </span>
                </div>

                <p className="text-[clamp(19px,1.5vw,23px)] leading-snug">
                  {description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
