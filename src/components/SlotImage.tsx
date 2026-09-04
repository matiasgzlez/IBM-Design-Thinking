"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import MemeModal from "@/components/MemeModal";
import { findMedia, type MemeSource } from "@/lib/memes";

/**
 * Intenta reproducir con sonido. Los navegadores solo lo permiten si ya hubo
 * una interacción en la página (un clic o una tecla, que en una presentación
 * siempre pasó); si lo bloquean, cae a reproducir en silencio.
 */
function playWithSound(video: HTMLVideoElement | null) {
  if (!video) return;
  video.muted = false;
  video.volume = 1;
  video.play().catch(() => {
    video.muted = true;
    void video.play().catch(() => {});
  });
}

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
  /** Lo que se muestra debajo de la imagen agrandada. */
  zoomCaption?: ReactNode;
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
  zoomCaption,
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
        {zoomOnHover && hovered && media && !open && (
          <motion.div
            key="zoom"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="pointer-events-none fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-black/92 backdrop-blur-sm px-16 py-10"
          >
            {media.kind === "image" ? (
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
            ) : (
              <motion.video
                ref={playWithSound}
                src={media.url}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                className={`${zoomCaption ? "max-h-[52vh]" : "max-h-[80vh]"} max-w-full rounded-2xl object-contain shadow-2xl`}
                autoPlay
                loop
                playsInline
              />
            )}

            {zoomCaption && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.12 }}
                className="max-w-6xl text-center"
              >
                {zoomCaption}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && media && (
          <MemeModal
            key="slot-modal"
            eyebrow={subtitle}
            title={title}
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
