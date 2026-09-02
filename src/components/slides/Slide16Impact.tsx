"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { EASE, T } from "@/lib/motion";

function CountUp({ to, duration = 1000, delay = 0 }: { to: number; duration?: number; delay?: number }) {
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

const metrics = [
  { value: 300, prefix: "+", suffix: "%", label: "de retorno de inversión", detail: "ROI a tres años" },
  { value: 75, prefix: "−", suffix: "%", label: "de tiempo de diseño y desarrollo", detail: "6-8 meses → 3-4 meses" },
  { value: 2, prefix: "", suffix: "×", label: "más rápido al mercado", detail: "time to market" },
  { value: 80, prefix: "+", suffix: "%", label: "de líderes con equipos más alineados", detail: "y más enfocados" },
];

const notes = [
  { head: "US$ 36 M+", text: "de valor presente neto en los proyectos analizados." },
  { head: "−50 %", text: "de defectos de software en un especialista en salud." },
  { head: "Forrester", text: "Total Economic Impact, estudio encargado por IBM sobre proyectos de tres años." },
];

export default function Slide16Impact() {
  return (
    <section className="relative w-screen h-screen bg-[var(--color-bg-dark)] text-white overflow-hidden px-20 pt-14 pb-12 flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="font-mono text-xl uppercase tracking-[0.22em] text-white/50"
      >
        Resultados · <span className="text-[var(--color-accent)]">el estudio de Forrester</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: T.title, ease: EASE }}
        className="mt-4 font-black leading-[0.9] tracking-[-0.04em] text-[clamp(40px,5vw,74px)]"
      >
        La empatía también <span className="text-[var(--color-accent)]">se mide.</span>
      </motion.h2>

      <div className="mt-10 grid grid-cols-4 gap-6">
        {metrics.map(({ value, prefix, suffix, label, detail }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: T.content + i * 0.1, ease: EASE }}
            className="border-t-4 border-[var(--color-accent)] pt-5"
          >
            <span className="block font-black leading-none tracking-[-0.04em] text-[clamp(44px,5vw,80px)]">
              <span className="text-[var(--color-accent)]">{prefix}</span>
              <CountUp to={value} delay={350 + i * 100} />
              <span className="text-[var(--color-accent)]">{suffix}</span>
            </span>
            <span className="mt-3 block text-2xl text-white/80 leading-snug">{label}</span>
            <span className="mt-1 block font-mono text-sm uppercase tracking-[0.16em] text-white/35">
              {detail}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="mt-auto grid grid-cols-3 gap-6">
        {notes.map(({ head, text }, i) => (
          <motion.div
            key={head}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.75 + i * 0.1, ease: EASE }}
            className="rounded-xl border border-white/15 p-7 hover:border-[var(--color-accent)] transition-colors flex flex-col gap-2"
          >
            <h3 className="font-black text-3xl tracking-tight leading-none text-[var(--color-accent)]">
              {head}
            </h3>
            <p className="text-xl text-white/65 leading-snug">{text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
