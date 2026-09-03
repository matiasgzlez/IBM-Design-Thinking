"use client";

import { motion } from "motion/react";

const LOOP = { repeat: Infinity, repeatType: "loop" as const };

function OutcomesDiagram() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" fill="none" strokeLinecap="round">
      <g transform="translate(0 50)">
      {/* Objetivo */}
      <circle cx="300" cy="100" r="62" stroke="rgba(255,255,255,0.16)" strokeWidth="3" />
      <circle cx="300" cy="100" r="38" stroke="rgba(255,255,255,0.28)" strokeWidth="3" />
      <motion.circle
        cx="300"
        cy="100"
        r="14"
        fill="#0F62FE"
        style={{ filter: "drop-shadow(0 0 14px #0F62FE)" }}
        animate={{ scale: [1, 1.18, 1] }}
        transition={{ duration: 1.8, ...LOOP, ease: "easeInOut" }}
      />

      {/* Usuario */}
      <circle cx="70" cy="100" r="16" fill="rgba(255,255,255,0.85)" />
      <text
        x="70"
        y="146"
        textAnchor="middle"
        fontSize="13"
        fontFamily="monospace"
        fill="rgba(255,255,255,0.5)"
        letterSpacing="0.1em"
      >
        usuario
      </text>

      {/* Trayecto hacia el outcome */}
      <motion.path
        d="M 96 100 L 232 100"
        stroke="#0F62FE"
        strokeWidth="4"
        strokeDasharray="7 5"
        style={{ filter: "drop-shadow(0 0 8px #0F62FE)" }}
        animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3, times: [0, 0.4, 0.75, 1], ...LOOP, ease: "easeInOut" }}
      />
      <motion.circle
        r="9"
        cy="100"
        fill="#0F62FE"
        style={{ filter: "drop-shadow(0 0 12px #0F62FE)" }}
        animate={{ cx: [96, 96, 286], opacity: [0, 1, 1] }}
        transition={{ duration: 3, times: [0, 0.08, 0.62], ...LOOP, ease: "easeInOut" }}
      />

      <text
        x="164"
        y="80"
        textAnchor="middle"
        fontSize="14"
        fontFamily="monospace"
        fill="#0F62FE"
        fontWeight="bold"
        letterSpacing="0.12em"
      >
        OUTCOME
      </text>
      <text
        x="300"
        y="182"
        textAnchor="middle"
        fontSize="13"
        fontFamily="monospace"
        fill="rgba(255,255,255,0.5)"
        letterSpacing="0.1em"
      >
        su objetivo cumplido
      </text>
      </g>
    </svg>
  );
}

function ReinventionDiagram() {
  const versions = [
    { x: 70, r: 15, label: "v1" },
    { x: 170, r: 21, label: "v2" },
    { x: 280, r: 28, label: "v3" },
  ];

  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" fill="none" strokeLinecap="round">
      <g transform="translate(0 50)">
      <line x1="30" y1="150" x2="370" y2="150" stroke="rgba(255,255,255,0.16)" strokeWidth="3" />

      {versions.map((v, i) => (
        <g key={v.label}>
          <motion.circle
            cx={v.x}
            cy="100"
            r={v.r}
            fill="rgba(138,63,252,0.2)"
            stroke="#8A3FFC"
            strokeWidth="3"
            style={{ filter: "drop-shadow(0 0 10px rgba(138,63,252,0.7))" }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.4 + i * 0.22 }}
          />
          <motion.text
            x={v.x}
            y="106"
            textAnchor="middle"
            fontSize="14"
            fontFamily="monospace"
            fontWeight="bold"
            fill="#FFFFFF"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.55 + i * 0.22 }}
          >
            {v.label}
          </motion.text>
        </g>
      ))}

      {/* Flecha infinita */}
      <motion.path
        d="M 340 100 C 372 100, 372 40, 330 40 L 90 40"
        stroke="#8A3FFC"
        strokeWidth="3.5"
        strokeDasharray="7 5"
        animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.4, times: [0, 0.5, 0.8, 1], ...LOOP, repeatDelay: 0.6, delay: 1.1 }}
      />
      <text
        x="200"
        y="182"
        textAnchor="middle"
        fontSize="13"
        fontFamily="monospace"
        fill="rgba(255,255,255,0.5)"
        letterSpacing="0.1em"
      >
        todo es un prototipo
      </text>
      </g>
    </svg>
  );
}

function TeamsDiagram() {
  const members = [
    { x: 200, y: 44, color: "#0F62FE" },
    { x: 290, y: 96, color: "#8A3FFC" },
    { x: 290, y: 152, color: "#009D9A" },
    { x: 110, y: 152, color: "#F1C21B" },
    { x: 110, y: 96, color: "#24A148" },
  ];

  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" fill="none" strokeLinecap="round">
      <g transform="translate(0 50)">
      {members.map((m, i) =>
        members.slice(i + 1).map((o, j) => (
          <motion.line
            key={`${i}-${j}`}
            x1={m.x}
            y1={m.y}
            x2={o.x}
            y2={o.y}
            stroke="rgba(255,255,255,0.16)"
            strokeWidth="2"
            animate={{ opacity: [0.2, 0.75, 0.2] }}
            transition={{
              duration: 2.6,
              delay: (i + j) * 0.16,
              ...LOOP,
              ease: "easeInOut",
            }}
          />
        )),
      )}

      {members.map((m, i) => (
        <motion.circle
          key={`${m.x}-${m.y}`}
          cx={m.x}
          cy={m.y}
          r="17"
          fill={m.color}
          style={{ filter: `drop-shadow(0 0 12px ${m.color})` }}
          animate={{ scale: [1, 1.16, 1] }}
          transition={{ duration: 2.2, delay: i * 0.22, ...LOOP, ease: "easeInOut" }}
        />
      ))}

      <text
        x="200"
        y="192"
        textAnchor="middle"
        fontSize="13"
        fontFamily="monospace"
        fill="rgba(255,255,255,0.5)"
        letterSpacing="0.1em"
      >
        diversidad + autonomía para decidir
      </text>
      </g>
    </svg>
  );
}

const principles = [
  {
    num: "01",
    label: "Foco en los resultados del usuario",
    en: "A focus on user outcomes",
    description:
      "No se miden por las funcionalidades que entregan, sino por qué tan bien resuelven las necesidades reales del usuario.",
    quote:
      "No nos miden por las funcionalidades que entregamos. Nos miden por qué tan bien resolvemos las necesidades de nuestros usuarios.",
    diagram: <OutcomesDiagram />,
  },
  {
    num: "02",
    label: "Reinvención incansable",
    en: "Restless reinvention",
    description:
      "Ninguna solución es definitiva: todo lo que se entrega es una versión más, lista para volver a cambiar.",
    quote: "Ningún producto está terminado: todo funciona como un prototipo en iteración constante.",
    diagram: <ReinventionDiagram />,
  },
  {
    num: "03",
    label: "Equipos diversos y empoderados",
    en: "Diverse empowered teams",
    description:
      "Equipos multidisciplinarios con autonomía para decidir, que primero generan empatía entre ellos y después con los usuarios.",
    quote: "Empatía: primero entre nosotros, después con nuestros usuarios.",
    diagram: <TeamsDiagram />,
  },
];

export default function Slide04Principles() {
  return (
    <section className="relative w-screen h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] overflow-hidden px-20 pt-10 pb-8 flex flex-col">
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08, ease: [0.4, 0, 0.2, 1] }}
        className="flex-shrink-0 font-black tracking-[-0.035em] leading-[0.95] text-[clamp(34px,4.2vw,58px)]"
      >
        Los <span className="text-[var(--color-accent)]">3 principios</span> del Enterprise Design Thinking
      </motion.h2>

      <div className="mt-5 grid grid-cols-3 gap-6 flex-1 min-h-0">
        {principles.map(({ num, label, en, description, quote, diagram }, i) => (
          <motion.div
            key={num}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.28 + i * 0.12, ease: [0.4, 0, 0.2, 1] }}
            className="rounded-2xl border border-[rgba(255,255,255,0.18)] bg-[var(--color-bg-dark)] flex flex-col overflow-hidden min-h-0"
          >
            <div className="flex-shrink-0 px-7 pt-5 pb-4 flex items-center gap-4 border-b border-[rgba(255,255,255,0.07)]">
              <span className="font-mono text-sm font-bold tracking-[0.18em] text-[var(--color-accent)]">
                {num}
              </span>
              <div className="flex-1">
                <h3 className="font-black text-[26px] text-white uppercase tracking-tight leading-[0.95]">
                  {label}
                </h3>
                <span className="font-mono text-sm uppercase tracking-[0.14em] text-[var(--color-accent)]">
                  {en}
                </span>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center px-6 py-4 min-h-0">
              {diagram}
            </div>

            <div className="flex-shrink-0 px-7 py-4 border-t border-[rgba(255,255,255,0.07)] flex flex-col gap-3">
              <p className="text-lg text-white leading-snug">{description}</p>
              <p className="text-base text-white/55 leading-snug italic border-l-2 border-[var(--color-accent)] pl-3">
                “{quote}”
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
