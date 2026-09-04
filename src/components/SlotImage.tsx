"use client";

import { useEffect, useState, type ReactNode } from "react";
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
  /** Qué mostrar mientras no haya archivo (por ejemplo, el diagrama animado). */
  fallback?: ReactNode;
  /** Al pasar el mouse, la agranda al centro de la pantalla. */
  zoomOnHover?: boolean;
};

/**
 * Un hueco de imagen que se llena solo: si el archivo está en public/, lo
 * muestra (y se puede abrir a pantalla completa); si no, deja el recuadro
 * punteado con la ruta donde va.
 */
export default function SlotImage({
  slot,
  title,
  subtitle,
  color,
  className = "",
  fallback,
  zoomOnHover = false,
}: Props) {
  const [media, setMedia] = useState<MemeSource | null>(null);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

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
        onClick={() => media && setOpen(true)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`relative overflow-hidden rounded-xl ${media ? "cursor-pointer" : ""} ${className}`}
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

        {media === null &&
          (fallback ?? (
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
          ))}
      </div>

      {/* Al pasar el mouse se agranda al centro; el overlay no recibe eventos
          para que el hover no parpadee. */}
      <AnimatePresence>
        {zoomOnHover && hovered && media?.kind === "image" && !open && (
          <motion.div
            key="zoom"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center bg-black/92 backdrop-blur-sm px-16 py-10"
          >
            <motion.img
              src={media.url}
              alt={title}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="max-h-[80vh] max-w-full rounded-2xl object-contain shadow-2xl"
              draggable={false}
            />
          </motion.div>
        )}
      </AnimatePresence>

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
