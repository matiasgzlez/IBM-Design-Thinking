"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

function CountUp({
  to,
  duration = 1300,
  delay = 0,
}: {
  to: number;
  duration?: number;
  delay?: number;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame = 0;
    let start: number | null = null;

    const timeout = window.setTimeout(() => {
      const step = (ts: number) => {
        if (start === null) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        // easeOutCubic
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
  { value: 2, suffix: "x", label: "más rápido al mercado", detail: "time to market" },
  { value: 300, suffix: "%", label: "de retorno de inversión", detail: "ROI" },
  { value: 75, suffix: "%", label: "más eficiencia del equipo", detail: "team efficiency" },
  { value: 500000, suffix: "+", label: "practitioners en el mundo", detail: "una lengua común" },
];

const cases = [
  {
    org: "GE Healthcare",
    story:
      "Vieron a chicos llorando dentro del resonador. Rediseñaron la máquina como una aventura: la Adventure Series.",
  },
  {
    org: "Etihad Airways",
    story:
      "Con IBM Consulting reinventaron el check-in web y los servicios digitales alrededor del viaje real del pasajero.",
  },
  {
    org: "Frito-Lay",
    story:
      "En IBM Garage entrevistaron y acompañaron a los repositores para rediseñar el sistema de ventas.",
  },
];

export default function Slide10Impact() {
  return (
    <section className="relative w-screen h-screen bg-[var(--color-bg-dark)] text-white overflow-hidden px-20 pt-14 pb-12 flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="font-mono text-xl uppercase tracking-[0.22em] text-white/50"
      >
        Impacto medido · <span className="text-[var(--color-accent)]">Forrester TEI 2018 · 2023</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.12, ease: [0.4, 0, 0.2, 1] }}
        className="mt-4 font-black leading-[0.9] tracking-[-0.04em] text-[clamp(40px,5vw,74px)]"
      >
        La empatía también{" "}
        <span className="text-[var(--color-accent)]">se mide.</span>
      </motion.h2>

      <div className="mt-10 grid grid-cols-4 gap-6">
        {metrics.map(({ value, suffix, label, detail }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 + i * 0.12, ease: [0.4, 0, 0.2, 1] }}
            className="border-t-4 border-[var(--color-accent)] pt-5"
          >
            <span className="block font-black leading-none tracking-[-0.04em] text-[clamp(48px,5.5vw,86px)]">
              <CountUp to={value} delay={500 + i * 120} />
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
        {cases.map(({ org, story }, i) => (
          <motion.div
            key={org}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 + i * 0.12, ease: [0.4, 0, 0.2, 1] }}
            className="rounded-xl border border-white/15 p-7 hover:border-[var(--color-accent)] transition-colors flex flex-col gap-3"
          >
            <h3 className="font-black text-3xl uppercase tracking-tight leading-none">
              {org}
            </h3>
            <p className="text-xl text-white/65 leading-snug">{story}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
