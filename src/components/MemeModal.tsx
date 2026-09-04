"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import type { MemeSource } from "@/lib/memes";

type Props = {
  /** Etiqueta chica arriba del título: el nombre de la fase o del principio. */
  eyebrow?: string;
  title: string;
  color: string;
  /** Cuando todavía no hay archivo en public/loop/, se muestra el hueco. */
  meme: MemeSource | null;
  slot: string;
  onClose: () => void;
};

export default function MemeModal({ eyebrow, title, color, meme, slot, onClose }: Props) {
  // Mientras el meme está abierto, el teclado no navega la presentación.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      event.stopPropagation();
      if (
        event.key === "Escape" ||
        event.key === " " ||
        event.key === "Enter" ||
        event.key === "ArrowRight" ||
        event.key === "ArrowLeft"
      ) {
        event.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-black/92 backdrop-blur-sm px-16 py-12 cursor-pointer"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 14 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className="flex flex-col items-center gap-5 max-h-full"
      >
        <div className="flex flex-col items-center gap-2 text-center max-w-5xl">
          {eyebrow && (
            <span
              className="font-mono text-base uppercase tracking-[0.24em] font-bold"
              style={{ color }}
            >
              {eyebrow}
            </span>
          )}
          <h2 className="font-black text-[clamp(24px,2.6vw,40px)] leading-[1.1] tracking-tight text-white">
            {title}
          </h2>
        </div>

        {meme === null && (
          <div
            className="flex h-[54vh] w-[68vw] max-w-[1000px] flex-col items-center justify-center gap-4 rounded-2xl border-[3px] border-dashed"
            style={{ borderColor: color }}
          >
            <span
              className="font-mono text-sm uppercase tracking-[0.24em] font-bold"
              style={{ color }}
            >
              Acá va el meme
            </span>
            <span className="font-mono text-xl text-white/50">{slot}</span>
          </div>
        )}

        {meme?.kind === "image" && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={meme.url}
            alt={title}
            className="max-h-[68vh] max-w-full rounded-xl object-contain shadow-2xl"
            draggable={false}
          />
        )}

        {meme?.kind === "video" && (
          <video
            ref={(video) => {
              if (!video) return;
              video.muted = false;
              video.volume = 1;
              video.play().catch(() => {
                video.muted = true;
                void video.play().catch(() => {});
              });
            }}
            src={meme.url}
            className="max-h-[68vh] max-w-full rounded-xl object-contain shadow-2xl"
            autoPlay
            loop
            playsInline
            controls
          />
        )}

        <span className="font-mono text-sm uppercase tracking-[0.2em] text-white/40">
          Clic o cualquier tecla para volver
        </span>
      </motion.div>
    </motion.div>
  );
}
