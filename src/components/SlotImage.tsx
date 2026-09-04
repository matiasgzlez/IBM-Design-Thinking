"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import MemeModal from "@/components/MemeModal";
import { findMedia, type MemeSource } from "@/lib/memes";

type Props = {
  /** Ruta dentro de public/ sin extensión, por ejemplo "keys/hills". */
  slot: string;
  title: string;
  subtitle?: string;
  color: string;
  className?: string;
};

/**
 * Un hueco de imagen que se llena solo: si el archivo está en public/, lo
 * muestra (y se puede abrir a pantalla completa); si no, deja el recuadro
 * punteado con la ruta donde va.
 */
export default function SlotImage({ slot, title, subtitle, color, className = "" }: Props) {
  const [media, setMedia] = useState<MemeSource | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    findMedia(slot).then((found) => {
      if (!cancelled) setMedia(found);
    });
    return () => {
      cancelled = true;
    };
  }, [slot]);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className={`relative overflow-hidden rounded-xl cursor-pointer ${className}`}
      >
        {media?.kind === "image" && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={media.url}
            alt={title}
            className="h-full w-full object-contain"
            draggable={false}
          />
        )}

        {media?.kind === "video" && (
          <video
            src={media.url}
            className="h-full w-full object-contain"
            autoPlay
            loop
            muted
            playsInline
          />
        )}

        {media === null && (
          <div
            className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-xl border-[3px] border-dashed"
            style={{ borderColor: color }}
          >
            <span
              className="font-mono text-xs uppercase tracking-[0.22em] font-bold"
              style={{ color }}
            >
              Acá va la imagen
            </span>
            <span className="font-mono text-sm text-[var(--color-text-secondary)]">
              public/{slot}.png
            </span>
          </div>
        )}
      </div>

      <AnimatePresence>
        {open && media && (
          <MemeModal
            key="slot-modal"
            title={title}
            subtitle={subtitle}
            color={color}
            meme={media}
            slot={`public/${slot}.png`}
            onClose={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
