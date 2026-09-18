"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/motion";

const profes = [
  { foto: "/profes/vero.jpg", nombre: "Vero", giro: -5 },
  { foto: "/profes/majo.jpg", nombre: "Majo", giro: 3 },
  { foto: "/profes/minoli.jpg", nombre: "Minoli", giro: -2 },
];

/** Papelitos en los colores del logo. Posiciones fijas: con Math.random() el
 *  servidor y el navegador dibujarían distinto y React se queja al hidratar. */
const PAPELITOS = Array.from({ length: 26 }, (_, i) => ({
  x: (i * 37) % 100,
  demora: (i * 0.53) % 4,
  duracion: 5 + ((i * 7) % 5),
  color: ["#F0C000", "#FFFFFF", "#1E7A3C", "#0A0A0A"][i % 4],
  ancho: 8 + (i % 3) * 4,
  giro: (i * 47) % 360,
}));

export default function Slide15DiaDelProfe() {
  const palabras = ["¡Feliz", "día", "del", "profe!"];

  return (
    <section className="relative w-screen h-screen bg-[var(--color-accent)] text-white overflow-hidden flex flex-col items-center justify-center gap-10 px-20 py-12">
      {/* Papelitos cayendo */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {PAPELITOS.map((p, i) => (
          <motion.span
            key={i}
            className="absolute top-0 block rounded-[2px]"
            style={{
              left: `${p.x}%`,
              width: p.ancho,
              height: p.ancho * 0.45,
              backgroundColor: p.color,
              opacity: 0.85,
            }}
            initial={{ y: -40, rotate: p.giro }}
            animate={{ y: "110vh", rotate: p.giro + 540 }}
            transition={{
              duration: p.duracion,
              delay: 0.6 + p.demora,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* El título */}
      <div className="relative flex flex-col items-center">
        <h2 className="flex flex-wrap justify-center gap-x-6 font-black uppercase leading-[0.9] tracking-[-0.03em] text-[clamp(56px,7.4vw,124px)]">
          {palabras.map((palabra, i) => (
            <span key={palabra} className="overflow-hidden inline-block pb-2">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.09, ease: EASE }}
                className="inline-block"
              >
                {palabra}
              </motion.span>
            </span>
          ))}
        </h2>
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6, ease: EASE }}
          className="mt-2 font-mono text-2xl uppercase tracking-[0.3em] text-white/75"
        >
          (atrasado)
        </motion.span>
      </div>

      {/* Las fotos, como polaroids */}
      <div className="relative flex items-end justify-center gap-10 min-h-0">
        {profes.map(({ foto, nombre, giro }, i) => (
          <motion.figure
            key={nombre}
            initial={{ opacity: 0, y: 80, rotate: giro * 3, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, rotate: giro, scale: 1 }}
            transition={{ type: "spring", stiffness: 140, damping: 14, delay: 0.7 + i * 0.15 }}
            whileHover={{ rotate: 0, scale: 1.06, y: -8 }}
            className="m-0 bg-white p-3.5 pb-4 shadow-2xl"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={foto}
              alt={nombre}
              className="block h-[clamp(220px,34vh,380px)] w-auto aspect-[4/5] object-cover"
              draggable={false}
            />
            <figcaption className="mt-3 text-center font-black text-[clamp(22px,2vw,32px)] uppercase tracking-tight text-[var(--color-text-primary)]">
              {nombre}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
