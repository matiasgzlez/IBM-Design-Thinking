"use client";

import { motion } from "motion/react";
import { EASE, T, fadeUp, stagger } from "@/lib/motion";

const STEPS = [140, 340, 540, 740];

function UserGlyph({ x, y, color, scale = 1 }: { x: number; y: number; color: string; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <circle cx={0} cy={-9} r={8} fill={color} />
      <path d="M -13 12 A 13 13 0 0 1 13 12 Z" fill={color} />
    </g>
  );
}

function SponsorUserDiagram() {
  return (
    <svg viewBox="0 0 880 300" className="w-full h-full" fill="none">
      {/* ── Cómo no ── */}
      <text
        x={0}
        y={22}
        fontSize={15}
        fontFamily="monospace"
        letterSpacing="0.16em"
        fill="var(--color-text-secondary)"
      >
        ASÍ NO · EL USUARIO APARECE AL FINAL A “VALIDAR”
      </text>
      <line x1={20} y1={78} x2={800} y2={78} stroke="var(--color-divider)" strokeWidth={4} strokeLinecap="round" />
      {STEPS.map((x, i) => (
        <circle key={x} cx={x} cy={78} r={11} fill="#C6C6C6" />
      ))}
      <motion.g
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.1, ease: EASE }}
      >
        <UserGlyph x={800} y={78} color="#8D8D8D" />
        <circle cx={828} cy={62} r={13} fill="#DA1E28" />
        <path d="M 823 57 L 833 67 M 833 57 L 823 67" stroke="#FFFFFF" strokeWidth={2.5} strokeLinecap="round" />
      </motion.g>

      {/* ── Cómo sí ── */}
      <text
        x={0}
        y={186}
        fontSize={15}
        fontFamily="monospace"
        letterSpacing="0.16em"
        fill="var(--color-make)"
      >
        ASÍ SÍ · PARTICIPA DESDE EL PRIMER DÍA
      </text>
      <motion.line
        x1={20}
        y1={242}
        x2={800}
        y2={242}
        stroke="var(--color-make)"
        strokeWidth={4}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
      />
      {STEPS.map((x, i) => (
        <motion.g
          key={x}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 340, damping: 18, delay: 0.5 + i * 0.12 }}
        >
          <circle cx={x} cy={242} r={11} fill="var(--color-make)" />
          <UserGlyph x={x} y={206} color="var(--color-make)" scale={0.85} />
        </motion.g>
      ))}
      <motion.g
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 340, damping: 18, delay: 1 }}
      >
        <circle cx={800} cy={242} r={13} fill="var(--color-success)" />
        <path d="M 794 242 L 798 247 L 807 237" stroke="#FFFFFF" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />
      </motion.g>
    </svg>
  );
}

const requisitos = [
  {
    num: "01",
    label: "Representativo",
    description: "Tiene que ser del usuario objetivo real, no el que estaba disponible.",
  },
  {
    num: "02",
    label: "Interesado de verdad",
    description: "Le importa el resultado. No está “prestado” para una entrevista.",
  },
  {
    num: "03",
    label: "Disponible siempre",
    description: "Colabora de forma continua durante todo el proyecto, no solo al final.",
  },
];

export default function Slide07SponsorUsers() {
  return (
    <section className="relative w-screen h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] overflow-hidden px-20 pt-14 pb-12 flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="font-mono text-xl uppercase tracking-[0.22em] text-[var(--color-text-secondary)]"
      >
        Llave 03 · <span className="text-[var(--color-accent)]">Sponsor Users</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: T.title, ease: EASE }}
        className="mt-4 font-black leading-[0.9] tracking-[-0.04em] text-[clamp(40px,5vw,74px)]"
      >
        Usuarios reales dentro del equipo,{" "}
        <span className="text-[var(--color-accent)]">desde el día uno.</span>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: T.content }}
        className="flex-1 min-h-0 my-6"
      >
        <SponsorUserDiagram />
      </motion.div>

      <motion.div
        variants={stagger(1.2, 0.1)}
        initial="hidden"
        animate="show"
        className="grid grid-cols-3 gap-6"
      >
        {requisitos.map(({ num, label, description }) => (
          <motion.div
            key={num}
            variants={fadeUp}
            className="rounded-xl border border-[var(--color-divider)] p-6 flex flex-col gap-3 hover:border-[var(--color-make)] transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="w-11 h-11 rounded-full bg-[var(--color-make)] flex items-center justify-center text-white font-black leading-none">
                {num}
              </span>
              <h3 className="font-black text-2xl uppercase tracking-tight leading-none">
                {label}
              </h3>
            </div>
            <p className="text-xl text-[var(--color-text-secondary)] leading-snug">
              {description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.6 }}
        className="mt-6 font-mono text-base uppercase tracking-[0.2em] text-[var(--color-text-secondary)]"
      >
        Al menos <span className="text-[var(--color-accent)] font-bold">un Sponsor User por cada Hill</span>
      </motion.p>
    </section>
  );
}
