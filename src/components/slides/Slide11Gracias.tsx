"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { QRCodeSVG } from "qrcode.react";
import Logo from "@/components/Logo";
import { EASE } from "@/lib/motion";
import { appUrl } from "@/lib/links";

export default function Slide11Gracias() {
  const [url, setUrl] = useState<string | null>(null);

  const [qr, setQr] = useState(300);

  // Depende de dónde se esté presentando, así que se calcula en el cliente.
  useEffect(() => {
    setUrl(appUrl("/quiz"));
    setQr(Math.min(300, window.innerWidth - 120));
  }, []);

  return (
    <section className="relative w-screen min-h-[100dvh] sm:h-screen bg-[var(--color-bg-dark)] text-white overflow-hidden flex flex-col items-center justify-center gap-8 px-6 sm:px-20 pt-10 sm:pt-12 pb-24 sm:pb-10">
      {/* Lo que se llevan: el juego */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 170, damping: 18, delay: 0.15 }}
        className="flex-1 min-h-0 flex flex-col items-center justify-center gap-6"
      >
        <div className="rounded-3xl bg-white p-5">
          {url ? (
            <QRCodeSVG value={url} size={qr} level="M" marginSize={0} />
          ) : (
            <div style={{ height: qr, width: qr }} />
          )}
        </div>

        <p className="font-black text-[clamp(26px,3vw,46px)] leading-[1.05] tracking-tight text-center">
          Escaneá y probá si entendiste.
        </p>

        {/* Si ya estás en el celular, el QR no sirve de nada: se entra tocando. */}
        <a
          href="/quiz"
          className="sm:hidden rounded-full bg-[var(--color-accent)] px-7 py-3 font-mono text-sm uppercase tracking-[0.18em] font-bold text-white"
        >
          Abrir el quiz
        </a>
      </motion.div>

      {/* El cierre */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6, ease: EASE }}
        className="flex-shrink-0 flex flex-col sm:flex-row items-center gap-5 sm:gap-10 border-t border-white/10 pt-7"
      >
        <Logo className="h-[110px] w-auto object-contain" />

        <div className="flex">
          {"Muchas gracias.".split("").map((char, i) => (
            <span key={i} className="overflow-hidden inline-block">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.5, delay: 0.85 + i * 0.03, ease: EASE }}
                className="inline-block font-black uppercase tracking-[0.03em] text-[clamp(30px,3.6vw,56px)] text-white"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
