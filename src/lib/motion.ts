import type { Transition, Variants } from "motion/react";

/**
 * Sistema de tiempos de la presentación.
 * Regla: toda la entrada de una slide termina antes de 1.2s — el que expone no
 * puede quedarse esperando a que aparezca el contenido.
 */
export const EASE = [0.4, 0, 0.2, 1] as const;

export const T = {
  eyebrow: 0,
  title: 0.08,
  content: 0.22,
  footer: 0.5,
} as const;

export const ease = (duration: number = 0.5, delay: number = 0): Transition => ({
  duration,
  delay,
  ease: EASE,
});

/** Entrada estándar: sube y aparece. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

/** Contenedor de grillas de tarjetas. */
export const stagger = (
  delayChildren: number = T.content,
  staggerChildren: number = 0.09,
): Variants => ({
  hidden: {},
  show: { transition: { delayChildren, staggerChildren } },
});

/** Loop infinito para los diagramas de fondo. */
export const LOOP = { repeat: Infinity, repeatType: "loop" as const };
