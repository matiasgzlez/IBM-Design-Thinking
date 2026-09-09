"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { QRCodeSVG } from "qrcode.react";
import Logo from "@/components/Logo";
import { EASE } from "@/lib/motion";
import { appUrl } from "@/lib/links";

export default function Slide14Gracias() {
  const [url, setUrl] = useState<string | null>(null);

  // Depende de dónde se esté presentando, así que se calcula en el cliente.
  useEffect(() => {
    setUrl(appUrl("/quiz"));
  }, []);

  return (
    <section className="relative w-screen h-screen bg-[var(--color-bg-dark)] text-white overflow-hidden flex flex-col items-center justify-center gap-8 px-20 pt-12 pb-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 16, delay: 0.1 }}
        className="flex-1 min-h-0 flex items-center justify-center"
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="h-full flex items-center"
        >
          <Logo className="max-h-full object-contain" />
        </motion.div>
      </motion.div>

      <div className="flex flex-shrink-0">
        {"Muchas gracias.".split("").map((char, i) => (
          <span key={i} className="overflow-hidden inline-block">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.55, delay: 0.5 + i * 0.035, ease: EASE }}
              className="inline-block font-black uppercase tracking-[0.03em] text-[clamp(34px,4.4vw,68px)] text-white"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          </span>
        ))}
      </div>

      {/* No te mandamos las slides: te dejamos esto */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.1, ease: EASE }}
        className="flex-shrink-0 flex items-center gap-8 border-t border-white/10 pt-7"
      >
        <div className="rounded-2xl bg-white p-3.5">
          {url ? (
            <QRCodeSVG value={url} size={168} level="M" marginSize={0} />
          ) : (
            <div className="h-[168px] w-[168px]" />
          )}
        </div>

        <p className="max-w-xl font-black text-[clamp(26px,2.8vw,42px)] leading-[1.05] tracking-tight">
          Escaneá y probá si entendiste.
        </p>
      </motion.div>
    </section>
  );
}
