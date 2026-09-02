"use client";

import { useState } from "react";
import { motion } from "motion/react";

const LOOP = { repeat: Infinity, repeatType: "loop" as const };

function HillsDiagram() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full" fill="none" strokeLinecap="round">
      {/* Colina */}
      <path
        d="M 20 168 C 110 168, 130 52, 200 52 C 270 52, 290 168, 380 168"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="4"
      />

      {/* Bandera en la cima */}
      <motion.g
        animate={{ opacity: [0, 1, 1, 1] }}
        transition={{ duration: 3.4, times: [0, 0.3, 0.9, 1], ...LOOP }}
      >
        <line x1="200" y1="52" x2="200" y2="14" stroke="#0F62FE" strokeWidth="4" />
        <motion.path
          d="M 200 16 L 244 26 L 200 36 Z"
          fill="#0F62FE"
          style={{
            filter: "drop-shadow(0 0 10px #0F62FE)",
            transformOrigin: "200px 26px",
          }}
          animate={{ scaleX: [1, 0.86, 1] }}
          transition={{ duration: 1.6, ...LOOP, ease: "easeInOut" }}
        />
      </motion.g>

      {/* Escalador que sube */}
      <motion.circle
        r="10"
        fill="#FFFFFF"
        style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.6))" }}
        animate={{
          cx: [40, 110, 160, 200],
          cy: [166, 130, 74, 52],
          opacity: [0, 1, 1, 1],
        }}
        transition={{ duration: 3.4, times: [0, 0.3, 0.62, 0.85], ...LOOP, ease: "easeInOut" }}
      />

      {/* WHO / WHAT / WOW */}
      {[
        { label: "WHO", x: 68, delay: 0.12 },
        { label: "WHAT", x: 200, delay: 0.3 },
        { label: "WOW", x: 332, delay: 0.48 },
      ].map(({ label, x, delay }) => (
        <motion.g
          key={label}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3.4, times: [0, delay, 0.9, 1], ...LOOP }}
        >
          <rect x={x - 34} y={178} width="68" height="20" rx="4" fill="rgba(15,98,254,0.2)" />
          <text
            x={x}
            y={192}
            textAnchor="middle"
            fontSize="12"
            fontFamily="monospace"
            fontWeight="bold"
            letterSpacing="0.14em"
            fill="#0F62FE"
          >
            {label}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}

function PlaybacksDiagram() {
  const marks = [90, 175, 260, 345];

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full" fill="none" strokeLinecap="round">
      {/* Línea de tiempo del proyecto */}
      <line x1="24" y1="120" x2="376" y2="120" stroke="rgba(255,255,255,0.22)" strokeWidth="4" />
      <circle cx="24" cy="120" r="8" fill="rgba(255,255,255,0.6)" />

      {marks.map((x, i) => (
        <g key={x}>
          <motion.line
            x1={x}
            y1="120"
            x2={x}
            y2="62"
            stroke="#8A3FFC"
            strokeWidth="3.5"
            animate={{ opacity: [0.25, 1, 0.25] }}
            transition={{ duration: 3.2, delay: i * 0.35, ...LOOP, ease: "easeInOut" }}
          />
          <motion.circle
            cx={x}
            cy="120"
            r="11"
            fill="#8A3FFC"
            style={{ filter: "drop-shadow(0 0 12px #8A3FFC)" }}
            animate={{ scale: [1, 1.35, 1] }}
            transition={{ duration: 3.2, delay: i * 0.35, ...LOOP, ease: "easeInOut" }}
          />
          <motion.rect
            x={x - 26}
            y="34"
            width="52"
            height="22"
            rx="5"
            fill="rgba(138,63,252,0.22)"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 3.2, delay: i * 0.35, ...LOOP, ease: "easeInOut" }}
          />
          <motion.text
            x={x}
            y="50"
            textAnchor="middle"
            fontSize="12"
            fontFamily="monospace"
            fontWeight="bold"
            letterSpacing="0.1em"
            fill="#8A3FFC"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 3.2, delay: i * 0.35, ...LOOP, ease: "easeInOut" }}
          >
            PB {i + 1}
          </motion.text>
        </g>
      ))}

      <text
        x="200"
        y="176"
        textAnchor="middle"
        fontSize="13"
        fontFamily="monospace"
        fill="rgba(255,255,255,0.5)"
        letterSpacing="0.1em"
      >
        alineación cada pocas semanas
      </text>
    </svg>
  );
}

function SponsorUsersDiagram() {
  const team = [
    { x: 250, y: 62 },
    { x: 320, y: 100 },
    { x: 320, y: 148 },
    { x: 250, y: 186 },
  ];

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full" fill="none" strokeLinecap="round">
      {/* Equipo */}
      <rect
        x="212"
        y="26"
        width="164"
        height="150"
        rx="14"
        stroke="rgba(255,255,255,0.28)"
        strokeWidth="3"
        fill="rgba(255,255,255,0.05)"
      />
      <text
        x="294"
        y="18"
        textAnchor="middle"
        fontSize="14"
        fontFamily="monospace"
        fontWeight="bold"
        letterSpacing="0.14em"
        fill="rgba(255,255,255,0.8)"
      >
        EQUIPO
      </text>
      {team.map((m, i) => (
        <circle key={i} cx={m.x} cy={m.y - 12} r="14" fill="rgba(255,255,255,0.55)" />
      ))}

      {/* Usuario real */}
      <circle
        cx="62"
        cy="100"
        r="24"
        fill="#009D9A"
        style={{ filter: "drop-shadow(0 0 14px #009D9A)" }}
      />
      <text
        x="62"
        y="150"
        textAnchor="middle"
        fontSize="13"
        fontFamily="monospace"
        fill="#009D9A"
        fontWeight="bold"
        letterSpacing="0.1em"
      >
        usuario real
      </text>

      {/* Se suma al equipo */}
      <motion.path
        d="M 96 100 L 200 100"
        stroke="#009D9A"
        strokeWidth="4"
        strokeDasharray="7 5"
        animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3.2, times: [0, 0.35, 0.72, 1], ...LOOP, ease: "easeInOut" }}
      />
      <motion.circle
        r="12"
        cy="100"
        fill="#009D9A"
        style={{ filter: "drop-shadow(0 0 14px #009D9A)" }}
        animate={{ cx: [96, 96, 262], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3.2, times: [0, 0.1, 0.6, 0.75], ...LOOP, ease: "easeInOut" }}
      />
      <motion.text
        x="148"
        y="82"
        textAnchor="middle"
        fontSize="13"
        fontFamily="monospace"
        fontWeight="bold"
        letterSpacing="0.12em"
        fill="#009D9A"
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3.2, times: [0, 0.2, 0.72, 1], ...LOOP }}
      >
        SE SUMA
      </motion.text>
    </svg>
  );
}

const keys = [
  {
    num: "01",
    label: "Hills",
    subtitle: "Who · What · Wow",
    description:
      "Enunciados de intención escritos como outcomes de usuario. Marcan a dónde llegar sin dictar la solución.",
    diagram: <HillsDiagram />,
    color: "#0F62FE",
  },
  {
    num: "02",
    label: "Playbacks",
    subtitle: "Alinear en el tiempo",
    description:
      "Espacios seguros para contar la historia del trabajo, recibir feedback y descubrir dónde el equipo se desalineó.",
    diagram: <PlaybacksDiagram />,
    color: "#8A3FFC",
  },
  {
    num: "03",
    label: "Sponsor Users",
    subtitle: "Usuarios reales adentro",
    description:
      "Usuarios reales o potenciales que participan del proyecto y aportan su experiencia de dominio: cierran la brecha de empatía.",
    diagram: <SponsorUsersDiagram />,
    color: "#009D9A",
  },
];

export default function Slide08Keys() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="relative w-screen h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] overflow-hidden px-20 pt-10 pb-8 flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="font-mono text-xl uppercase tracking-[0.22em] text-[var(--color-text-secondary)] flex-shrink-0"
      >
        Cómo se escala a equipos grandes · <span className="text-[var(--color-accent)]">las 3 llaves</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
        className="flex-shrink-0 mt-2 font-black tracking-[-0.03em] leading-none text-[clamp(36px,4.5vw,60px)]"
      >
        THE <span className="text-[var(--color-accent)]">KEYS</span>
      </motion.h2>

      <div className="mt-5 grid grid-cols-3 gap-6 flex-1 min-h-0">
        {keys.map(({ num, label, subtitle, description, diagram, color }, i) => (
          <motion.div
            key={num}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            initial={{ opacity: 0, y: 28 }}
            animate={{
              opacity: hovered === null ? 1 : hovered === i ? 1 : 0.42,
              y: 0,
            }}
            transition={{
              opacity: { duration: hovered !== null ? 0.1 : 0.55 },
              y: { duration: 0.55, delay: 0.28 + i * 0.12, ease: [0.4, 0, 0.2, 1] },
            }}
            className="rounded-2xl border bg-[var(--color-bg-dark)] flex flex-col overflow-hidden min-h-0"
            style={{ borderColor: color }}
          >
            <div
              className="flex-shrink-0 px-7 pt-5 pb-4 flex items-center gap-4 border-b"
              style={{ borderColor: "rgba(255,255,255,0.09)" }}
            >
              <span
                className="font-mono text-sm font-bold tracking-[0.18em]"
                style={{ color }}
              >
                {num}
              </span>
              <div className="flex-1">
                <h3 className="font-black text-4xl text-white uppercase tracking-tight leading-none">
                  {label}
                </h3>
                <span
                  className="font-mono text-sm uppercase tracking-[0.16em]"
                  style={{ color }}
                >
                  {subtitle}
                </span>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center px-6 py-4 min-h-0">
              {diagram}
            </div>

            <div className="flex-shrink-0 px-7 py-4 border-t border-[rgba(255,255,255,0.07)]">
              <p className="text-lg text-white/75 leading-snug">{description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
