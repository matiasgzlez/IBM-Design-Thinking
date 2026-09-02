"use client";

import { useEffect, useState } from "react";

type Props = {
  className?: string;
  alt?: string;
};

/**
 * Logo de Viernes de la Jungla. Vive en public/logo.png.
 * Se precarga antes de montarlo: si el archivo todavía no está, la slide se
 * arma igual y no aparece el ícono de imagen rota.
 */
export default function Logo({ className = "", alt = "Viernes de la Jungla" }: Props) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => setSrc("/logo.png");
    img.src = "/logo.png";
  }, []);

  if (!src) return null;

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className} draggable={false} />;
}
