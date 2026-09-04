"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { QRCodeSVG } from "qrcode.react";
import Logo from "@/components/Logo";
import { EASE, T, fadeUp, stagger } from "@/lib/motion";
import { groups, sourcesUrl } from "@/lib/links";

const closing = [
  { text: "Diseñás con el usuario,", accent: false },
  { text: "no para el usuario.", accent: true },
];

export default function Slide13Fuentes() {
  const [url, setUrl] = useState<string | null>(null);

  // La URL depende de dónde se esté presentando, así que se calcula en el cliente.
  useEffect(() => {
    setUrl(sourcesUrl());
  }, []);

  return (
    <section className="relative w-screen h-screen bg-[var(--color-bg-dark)] text-white overflow-hidden px-20 pt-12 pb-10 flex flex-col">
      {/* Cierre */}
      <div className="flex items-start justify-between gap-12">
        <div>
          <motion.span
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="block font-mono text-lg uppercase tracking-[0.22em] text-white/40"
          >
            Viernes de la Jungla · Agilidad Avanzada · Unidad 1
          </motion.span>

          <h2 className="mt-3 font-black leading-[0.92] tracking-[-0.04em] text-[clamp(36px,4.4vw,68px)] flex flex-col">
            {closing.map((line, i) => (
              <motion.span
                key={line.text}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: T.title + i * 0.12, ease: EASE }}
                className={line.accent ? "text-[var(--color-accent)]" : "text-white"}
              >
                {line.text}
              </motion.span>
            ))}
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 150, damping: 16, delay: 0.2 }}
          className="flex-shrink-0"
        >
          <Logo className="max-h-[150px] object-contain" />
        </motion.div>
      </div>

      {/* El QR y lo que hay del otro lado */}
      <div className="flex-1 min-h-0 mt-8 grid grid-cols-[300px_1fr] gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 180, damping: 18, delay: T.content }}
          className="flex flex-col items-center gap-3"
        >
          <div className="rounded-2xl bg-white p-4">
            {url ? (
              <QRCodeSVG value={url} size={252} level="M" marginSize={0} />
            ) : (
              <div className="h-[252px] w-[252px]" />
            )}
          </div>
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/40 text-center leading-relaxed">
            Escaneá y llevate todo
          </span>
        </motion.div>

        <motion.div
          variants={stagger(0.45, 0.1)}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-4"
        >
          {groups.map((group) => (
            <motion.div
              key={group.title}
              variants={fadeUp}
              className="border-l-[5px] border-[var(--color-accent)] pl-6"
            >
              <h3 className="font-black text-2xl uppercase tracking-tight leading-none">
                {group.title}
              </h3>
              <p className="mt-1.5 text-lg text-white/60 leading-snug">{group.subtitle}</p>
            </motion.div>
          ))}

          <motion.p
            variants={fadeUp}
            className="mt-1 font-mono text-sm uppercase tracking-[0.18em] text-white/35"
          >
            + la presentación entera, por si la quieren volver a ver
          </motion.p>
        </motion.div>
      </div>

      {/* Muchas gracias */}
      <div className="flex items-end justify-between gap-10 border-t border-white/10 pt-6">
        <div className="flex">
          {"Muchas gracias.".split("").map((char, i) => (
            <span key={i} className="overflow-hidden inline-block">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.45, delay: 0.9 + i * 0.03, ease: EASE }}
                className="inline-block font-black uppercase tracking-[0.04em] text-[clamp(28px,3.2vw,50px)] text-white"
              >
                {char === " " ? " " : char}
              </motion.span>
            </span>
          ))}
        </div>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.4 }}
          className="font-mono text-base uppercase tracking-[0.22em] text-white/30 pb-2"
        >
          IBM regala los badges Practitioner y Co-Creator · 2026
        </motion.span>
      </div>
    </section>
  );
}
