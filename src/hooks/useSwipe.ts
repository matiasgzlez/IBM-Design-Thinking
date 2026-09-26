"use client";

import { useRef, type TouchEvent } from "react";

type Opciones = {
  onNext: () => void;
  onPrev: () => void;
  /** Cuántos píxeles hay que arrastrar para que cuente. */
  minimo?: number;
};

/**
 * Pasar de slide arrastrando el dedo. Solo cuenta el gesto horizontal: si el
 * movimiento es más vertical que horizontal, se deja pasar para que la slide
 * pueda scrollear.
 */
export function useSwipe({ onNext, onPrev, minimo = 60 }: Opciones) {
  const inicio = useRef<{ x: number; y: number } | null>(null);

  return {
    onTouchStart: (e: TouchEvent) => {
      const t = e.touches[0];
      inicio.current = { x: t.clientX, y: t.clientY };
    },
    onTouchEnd: (e: TouchEvent) => {
      if (!inicio.current) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - inicio.current.x;
      const dy = t.clientY - inicio.current.y;
      inicio.current = null;
      if (Math.abs(dx) < minimo || Math.abs(dx) < Math.abs(dy) * 1.4) return;
      if (dx < 0) onNext();
      else onPrev();
    },
  };
}
