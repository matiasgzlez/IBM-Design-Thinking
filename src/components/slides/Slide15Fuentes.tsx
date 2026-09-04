"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { QRCodeSVG } from "qrcode.react";
import { EASE, T, fadeUp, stagger } from "@/lib/motion";
import { groups, sourcesUrl } from "@/lib/links";

export default function Slide15Fuentes() {
  const [url, setUrl] = useState<string | null>(null);

  // La URL depende de dónde se esté presentando, así que se calcula en el cliente.
  useEffect(() => {
    setUrl(sourcesUrl());
  }, []);

  return (
    <section className="relative w-screen h-screen bg-[var(--color-bg-dark)] text-white overflow-hidden px-20 pt-14 pb-12 flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="font-mono text-xl uppercase tracking-[0.22em] text-white/50"
      >
        Para seguir · <span className="text-[var(--color-accent)]">todo en un link</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: T.title, ease: EASE }}
        className="mt-4 font-black leading-[0.9] tracking-[-0.04em] text-[clamp(38px,4.6vw,70px)]"
      >
        Escaneá y llevate{" "}
        <span className="text-[var(--color-accent)]">las fuentes y los badges.</span>
      </motion.h2>

      <div className="flex-1 min-h-0 mt-10 grid grid-cols-[380px_1fr] gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 180, damping: 18, delay: T.content }}
          className="flex flex-col items-center gap-4"
        >
          <div className="rounded-2xl bg-white p-5">
            {url ? (
              <QRCodeSVG value={url} size={300} level="M" marginSize={0} />
            ) : (
              <div className="h-[300px] w-[300px]" />
            )}
          </div>
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/40 text-center">
            Badges gratuitos de IBM · fuentes de los casos
          </span>
        </motion.div>

        <motion.div variants={stagger(0.5, 0.12)} initial="hidden" animate="show" className="flex flex-col gap-5">
          {groups.map((group) => (
            <motion.div
              key={group.title}
              variants={fadeUp}
              className="border-l-[5px] border-[var(--color-accent)] pl-6"
            >
              <h3 className="font-black text-3xl uppercase tracking-tight leading-none">
                {group.title}
              </h3>
              <p className="mt-2 text-xl text-white/60 leading-snug">{group.subtitle}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.1 }}
        className="font-mono text-base uppercase tracking-[0.2em] text-white/35"
      >
        IBM regala los badges Practitioner y Co-Creator · el link está en el QR
      </motion.p>
    </section>
  );
}
