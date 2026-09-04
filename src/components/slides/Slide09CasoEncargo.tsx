"use client";

import { motion } from "motion/react";
import SlotImage from "@/components/SlotImage";
import { EASE, T } from "@/lib/motion";

export default function Slide09CasoEncargo() {
  return (
    <section className="relative w-screen h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] overflow-hidden px-20 pt-12 pb-10 flex flex-col">
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: T.title, ease: EASE }}
        className="font-black leading-[0.9] tracking-[-0.04em] text-[clamp(46px,5.6vw,88px)]"
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
            En 1996 todavía no existía Enterprise Design Thinking, pero este caso fue{" "}
            <span className="font-bold">
              el pionero en aplicar los primeros vistazos del método de IBM
            </span>
            .
            Oral-B quería un cepillo infantil para liderar el mercado y le pidió el diseño a{" "}
            <span className="font-bold">IDEO</span>, reconocida globalmente por haber sido la
            empresa que{" "}
            <span className="font-bold">
              popularizó y sistematizó la metodología del Design Thinking
            </span>
            .
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
            . A los ejecutivos de Oral-B les pareció un pedido raro: “¿de verdad es necesario?”,
            dijeron.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: T.content + 0.24, ease: EASE }}
            className="text-[clamp(22px,2.1vw,32px)] leading-snug font-medium"
          >
            Durante las observaciones notaron algo clave: los chicos{" "}
            <span className="text-[var(--color-accent)]">
              agarran el cepillo de una forma totalmente distinta
            </span>{" "}
            a la de los adultos.
          </motion.p>
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
            interactive={false}
          />
        </motion.div>
      </div>
    </section>
  );
}
