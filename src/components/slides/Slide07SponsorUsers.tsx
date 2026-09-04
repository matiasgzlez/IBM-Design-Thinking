"use client";

import { motion } from "motion/react";
import { EASE, T, fadeUp, stagger } from "@/lib/motion";

const START = 30;
const END = 800;
const STEPS = [140, 340, 540, 740];

/** Un ciclo entero de las dos líneas, para que se puedan mirar mientras se habla. */
const CYCLE = 7;
const LOOP = { duration: CYCLE, repeat: Infinity, repeatDelay: 0.6 } as const;

/** En qué momento del ciclo el avance pasa por cada etapa. */
const passAt = (x: number) => Number((0.7 * ((x - START) / (END - START))).toFixed(3));

function UserGlyph({ x, y, color, scale = 1 }: { x: number; y: number; color: string; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <circle cx={0} cy={-9} r={8} fill={color} />
      <path d="M -13 12 A 13 13 0 0 1 13 12 Z" fill={color} />
    </g>
  );
}

/** Una línea de tiempo del proyecto que avanza sola y se reinicia. */
function Lane({
  y,
  color,
  track,
  children,
}: {
  y: number;
  color: string;
  track: string;
  children?: React.ReactNode;
}) {
  return (
    <g>
      {/* El riel completo, siempre visible */}
      <line x1={START} y1={y} x2={END} y2={y} stroke={track} strokeWidth={4} strokeLinecap="round" />
      {STEPS.map((x) => (
        <circle key={x} cx={x} cy={y} r={9} fill={track} />
      ))}

      {/* El avance del proyecto */}
      <motion.line
        x1={START}
        y1={y}
        x2={END}
        y2={y}
        stroke={color}
        strokeWidth={4}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: [0, 1, 1, 1], opacity: [1, 1, 1, 0] }}
        transition={{ ...LOOP, times: [0, 0.7, 0.94, 1], ease: "easeInOut" }}
      />

      {/* El equipo, empujando el avance */}
      <motion.circle
        cy={y}
        r={13}
        fill={color}
        initial={{ opacity: 0 }}
        animate={{ cx: [START, END, END, END], opacity: [1, 1, 1, 0] }}
        transition={{ ...LOOP, times: [0, 0.7, 0.94, 1], ease: "easeInOut" }}
      />

      {/* Las etapas que ya se cumplieron */}
      {STEPS.map((x) => {
        const p = passAt(x);
        return (
          <motion.circle
            key={x}
            cx={x}
            cy={y}
            r={11}
            fill={color}
            initial={{ scale: 0 }}
            animate={{ scale: [0, 0, 1.35, 1, 1, 0] }}
            transition={{ ...LOOP, times: [0, p, p + 0.04, p + 0.09, 0.94, 1] }}
          />
        );
      })}

      {children}
    </g>
  );
}

function SponsorUserDiagram() {
  return (
    <svg viewBox="0 0 880 300" className="w-full h-full" fill="none">
      {/* ── Así no ── */}
      <text
        x={0}
        y={22}
        fontSize={15}
        fontFamily="monospace"
        letterSpacing="0.16em"
        fill="var(--color-text-secondary)"
      >
        ASÍ NO · EL USUARIO APARECE AL FINAL SOLO PARA “APROBAR”
      </text>

      <Lane y={78} color="#8D8D8D" track="var(--color-divider)">
        {/* El usuario recién aparece cuando ya está todo hecho */}
        <motion.g
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: [0, 0, 1, 1, 0], scale: [0.6, 0.6, 1, 1, 1] }}
          transition={{ ...LOOP, times: [0, 0.72, 0.78, 0.94, 1] }}
        >
          {/* Arriba de la línea, como en la otra: si se apoya encima queda un borrón */}
          <UserGlyph x={800} y={42} color="#8D8D8D" scale={0.9} />
          <circle cx={832} cy={26} r={13} fill="#DA1E28" />
          <path d="M 827 21 L 837 31 M 837 21 L 827 31" stroke="#FFFFFF" strokeWidth={2.5} strokeLinecap="round" />
        </motion.g>
      </Lane>

      {/* ── Así sí ── */}
      <text
        x={0}
        y={186}
        fontSize={15}
        fontFamily="monospace"
        letterSpacing="0.16em"
        fill="var(--color-make)"
      >
        ASÍ SÍ · EL USUARIO CO-CREA DE PRINCIPIO A FIN
      </text>

      <Lane y={242} color="var(--color-make)" track="var(--color-divider)">
        {/* El usuario viaja con el equipo */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ x: [START, END, END, END], opacity: [1, 1, 1, 0] }}
          transition={{ ...LOOP, times: [0, 0.7, 0.94, 1], ease: "easeInOut" }}
        >
          <UserGlyph x={0} y={206} color="var(--color-make)" scale={0.9} />
        </motion.g>

        {/* Y deja su marca en cada etapa */}
        {STEPS.map((x) => {
          const p = passAt(x);
          return (
            <motion.g
              key={`u-${x}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 0, 1, 1, 0], scale: [0, 0, 1, 1, 1] }}
              transition={{ ...LOOP, times: [0, p, p + 0.05, 0.94, 1] }}
            >
              <UserGlyph x={x} y={206} color="var(--color-make)" scale={0.75} />
            </motion.g>
          );
        })}

        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 0, 1, 1, 0], scale: [0, 0, 1, 1, 1] }}
          transition={{ ...LOOP, times: [0, 0.7, 0.76, 0.94, 1] }}
        >
          <circle cx={800} cy={242} r={14} fill="var(--color-success)" />
          <path d="M 793 242 L 798 248 L 808 236" stroke="#FFFFFF" strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>
      </Lane>
    </svg>
  );
}

const requisitos = [
  {
    num: "01",
    label: "Representativo",
    description:
      "Debe ser un usuario final real del producto, no “la persona que justo estaba disponible”.",
  },
  {
    num: "02",
    label: "Interesado de verdad",
    description: "Tiene que ser alguien a quien le importa directamente la solución.",
  },
  {
    num: "03",
    label: "Disponibilidad continua",
    description:
      "Tiene que colaborar de forma activa e iterativa durante todo el proceso, no solo en la prueba final.",
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
        The Keys · llave 03 ·{" "}
        <span className="text-[var(--color-accent)]">Sponsor Users</span>
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
            <p className="text-[clamp(19px,1.5vw,23px)] leading-snug">
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
        Regla clave: al menos{" "}
        <span className="text-[var(--color-accent)] font-bold">un Sponsor User asignado a cada Hill</span>
      </motion.p>
    </section>
  );
}
