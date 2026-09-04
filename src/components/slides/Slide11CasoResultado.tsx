"use client";

import { motion } from "motion/react";
import SlotImage from "@/components/SlotImage";
import { EASE, T } from "@/lib/motion";

export default function Slide11CasoResultado() {
  return (
    <section className="relative w-screen h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] overflow-hidden px-20 pt-12 pb-10 flex flex-col">
      <div className="flex-1 min-h-0 grid grid-cols-[1.05fr_1fr] gap-12 items-center">
        <div className="flex flex-col gap-7">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: T.title, ease: EASE }}
            className="font-black leading-[0.88] tracking-[-0.04em] text-[clamp(42px,5vw,78px)]"
          >
            Oral-B tuvo por <span className="text-[var(--color-accent)]">18 meses</span> el cepillo
            más vendido de Estados Unidos.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: T.content + 0.12, ease: EASE }}
            className="text-[clamp(22px,2.1vw,30px)] leading-snug"
          >
            Y ese mismo{" "}
            <span className="font-bold">diseño ergonómico de mango grueso</span> es el que sigue
            usando hasta el día de hoy: se volvió un{" "}
            <span className="font-bold text-[var(--color-accent)]">estándar mundial</span>.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 26 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: T.content, ease: EASE }}
          className="h-full min-h-0 flex items-center"
        >
          <SlotImage
            slot="caso/resultado"
            title="El mango grueso pasó a ser el estándar de toda la industria."
            subtitle="Oral-B & IDEO"
            color="var(--color-accent)"
            className="h-[80%] w-full"
            zoomOnHover
          />
        </motion.div>
      </div>
    </section>
  );
}
