"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { EASE, T } from "@/lib/motion";

/** Son ganancias: sobre el fondo negro van en verde, no en el rojo del acento. */
const VERDE = "#35B45C";

function CountUp({ to, duration = 1100, delay = 0 }: { to: number; duration?: number; delay?: number }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame = 0;
    let start: number | null = null;

    const timeout = window.setTimeout(() => {
      const step = (ts: number) => {
        if (start === null) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(to * eased));
        if (progress < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    }, delay);

    return () => {
      window.clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [to, duration, delay]);

  return <>{value.toLocaleString("es-AR")}</>;
}

const metricas = [
  {
    prefix: "+",
    value: 300,
    suffix: "%",
    label: "de ROI",
    detail:
      "El retorno sobre la inversión: generó un valor de más de US$ 36 millones en los proyectos analizados.",
  },
  {
    prefix: "−",
    value: 75,
    suffix: "%",
    label: "de tiempo de entrega",
    detail:
      "Los ciclos de diseño y desarrollo pasaron de 6-8 meses a solo 3-4 meses por lanzamiento.",
  },
  {
    prefix: "×",
    value: 2,
    suffix: "",
    label: "de velocidad al mercado",
    detail:
      "Se duplicó la velocidad de salida al mercado en los equipos que integraron estas prácticas.",
  },
  {
    prefix: "+",
    value: 80,
    suffix: "%",
    label: "de los líderes",
    detail:
      "Reportó equipos más alineados, enfocados y con menor fricción en la toma de decisiones.",
  },
];

export default function Slide12Impact() {
  return (
    <section className="relative w-screen h-screen bg-[var(--color-bg-dark)] text-white overflow-hidden px-20 pt-14 pb-12 flex flex-col">
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: T.title, ease: EASE }}
        className="max-w-[92%] font-black leading-[1.02] tracking-[-0.03em] text-[clamp(28px,3.1vw,48px)]"
      >
        Un estudio independiente de{" "}
        <span style={{ color: VERDE }}>Forrester (Total Economic Impact)</span> midió
        los resultados económicos y operacionales de aplicar Enterprise Design Thinking durante un
        período de tres años.
      </motion.h2>

      <div className="flex-1 min-h-0 mt-10 grid grid-cols-4 gap-8 content-center">
        {metricas.map(({ prefix, value, suffix, label, detail }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: T.content + i * 0.12, ease: EASE }}
            className="border-t-4 pt-6 flex flex-col"
            style={{ borderColor: VERDE }}
          >
            <span className="block font-black leading-[0.85] tracking-[-0.05em] text-[clamp(44px,5.2vw,88px)]">
              <span style={{ color: VERDE }}>{prefix}</span>
              <CountUp to={value} delay={400 + i * 120} />
              <span style={{ color: VERDE }}>{suffix}</span>
            </span>

            <span className="mt-4 block font-black text-[clamp(20px,1.8vw,28px)] uppercase tracking-tight leading-none">
              {label}
            </span>

            <span className="mt-4 block text-[clamp(17px,1.4vw,21px)] leading-snug text-white/60">
              {detail}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
