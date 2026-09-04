"use client";

import { motion } from "motion/react";
import SlotImage from "@/components/SlotImage";
import { EASE, T } from "@/lib/motion";

export default function Slide09CasoEncargo() {
  return (
    <section className="relative w-screen h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] overflow-hidden px-20 pt-12 pb-10 flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="font-mono text-xl uppercase tracking-[0.22em] text-[var(--color-text-secondary)]"
      >
        El ejemplo · <span className="text-[var(--color-accent)]">el caso pionero</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: T.title, ease: EASE }}
        className="mt-3 font-black leading-[0.9] tracking-[-0.04em] text-[clamp(46px,5.6vw,88px)]"
      >
        Oral-B &amp; IDEO{" "}
        <span className="text-[var(--color-accent)]">(1996)</span>
      </motion.h2>

      <div className="flex-1 min-h-0 mt-8 grid grid-cols-[1.15fr_1fr] gap-12 items-center">
        <div className="flex flex-col gap-6">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: T.content, ease: EASE }}
            className="text-[clamp(21px,1.9vw,28px)] leading-snug"
          >
            En 1996 todavía no existía el marco de IBM, pero este caso fue{" "}
            <span className="font-bold">el pionero en aplicar el corazón del método</span>.
            Oral-B quería un cepillo infantil para liderar el mercado y le pidió el diseño a IDEO.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: T.content + 0.12, ease: EASE }}
            className="text-[clamp(21px,1.9vw,28px)] leading-snug text-[var(--color-text-secondary)]"
          >
            Lo primero que dijo el equipo de IDEO fue que necesitaban{" "}
            <span className="text-[var(--color-text-primary)] font-bold">
              ver a los chicos cepillándose los dientes
            </span>
            . Los ejecutivos de Oral-B pensaron que era un pedido absurdo: “¿de verdad es
            necesario?”.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: T.content + 0.24, ease: EASE }}
            className="border-l-[6px] border-[var(--color-accent)] bg-[var(--color-accent-soft)] rounded-r-xl px-7 py-5"
          >
            <span className="font-mono text-sm uppercase tracking-[0.2em] font-bold text-[var(--color-accent)]">
              Y ahí apareció lo que cambió todo
            </span>
            <p className="mt-2 text-[clamp(22px,2.1vw,32px)] leading-snug font-medium">
              Los chicos agarran el cepillo de una forma totalmente distinta a la de los adultos.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 26 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: T.content + 0.1, ease: EASE }}
          className="h-full min-h-0 flex items-center"
        >
          <SlotImage
            slot="caso/observacion"
            title="IDEO fue a mirar a los chicos lavarse los dientes."
            subtitle="Oral-B & IDEO · 1996"
            color="var(--color-accent)"
            className="h-[78%] w-full"
            zoomOnHover
          />
        </motion.div>
      </div>
    </section>
  );
}
