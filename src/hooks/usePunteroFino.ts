"use client";

import { useEffect, useState } from "react";

/**
 * true solo cuando hay mouse de verdad. En un celular no tiene sentido el
 * cursor personalizado ni los efectos de hover.
 */
export function usePunteroFino() {
  const [fino, setFino] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setFino(mq.matches);
    const alCambiar = (e: MediaQueryListEvent) => setFino(e.matches);
    mq.addEventListener("change", alCambiar);
    return () => mq.removeEventListener("change", alCambiar);
  }, []);

  return fino;
}
