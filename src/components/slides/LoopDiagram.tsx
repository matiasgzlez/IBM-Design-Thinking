"use client";

import { useState, useRef, type MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";

type PhaseId = "observe" | "reflect" | "make";

type Phase = {
  id: PhaseId;
  name: string;
  es: string;
  color: string;
  /* Arco del círculo (centro 450,300 · radio 190) */
  path: string;
  /* Punta de flecha al final del arco */
  arrow: { x: number; y: number; rotate: number };
  label: { x: number; y: number };
  tagline: string;
  detail: string;
};

const phases: Phase[] = [
  {
    id: "observe",
    name: "Observe",
    es: "Observar",
    color: "#0F62FE",
    path: "M 294.4 191 A 190 190 0 0 1 605.6 191",
    arrow: { x: 605.6, y: 191, rotate: 55 },
    label: { x: 450, y: 56 },
    tagline: "Sumergite en el mundo real",
    detail: "Mirá a los usuarios en su contexto · sin supuestos",
  },
  {
    id: "reflect",
    name: "Reflect",
    es: "Reflexionar",
    color: "#8A3FFC",
    path: "M 622.2 219.7 A 190 190 0 0 1 466.6 489.3",
    arrow: { x: 466.6, y: 489.3, rotate: 175 },
    label: { x: 700, y: 508 },
    tagline: "Juntense y miren adentro",
    detail: "Sintetizar, alinear y decidir el próximo paso",
  },
  {
    id: "make",
    name: "Make",
    es: "Hacer",
    color: "#009D9A",
    path: "M 433.4 489.3 A 190 190 0 0 1 277.8 219.7",
    arrow: { x: 277.8, y: 219.7, rotate: 295 },
    label: { x: 205, y: 508 },
    tagline: "Dale forma a lo abstracto",
    detail: "Cuanto antes hacés, más rápido aprendés",
  },
];

export default function LoopDiagram() {
  const [active, setActive] = useState<PhaseId | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<SVGGElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltip({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const activePhase = phases.find((p) => p.id === active);

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 900 620" className="w-full h-full" fill="none" style={{ display: "block" }}>
        {/* Halo del centro */}
        {[0, 1].map((i) => (
          <motion.circle
            key={i}
            cx={450}
            cy={300}
            r={64}
            stroke="rgba(15,98,254,0.35)"
            strokeWidth={2}
            initial={{ scale: 0.9, opacity: 0.6 }}
            animate={{ scale: [0.9, 1.5], opacity: [0.55, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 1.5, ease: "easeOut" }}
            style={{ transformOrigin: "450px 300px" }}
          />
        ))}

        {/* Usuario en el centro */}
        <motion.circle
          cx={450}
          cy={300}
          r={62}
          fill="var(--color-bg-dark)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.2 }}
          style={{ transformOrigin: "450px 300px" }}
        />
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <circle cx={450} cy={283} r={16} fill="#FFFFFF" />
          <path
            d="M 420 330 A 30 30 0 0 0 480 330"
            fill="#FFFFFF"
          />
          <text
            x={450}
            y={392}
            textAnchor="middle"
            fontSize={17}
            fontFamily="monospace"
            fontWeight={700}
            letterSpacing="0.18em"
            fill="var(--color-text-secondary)"
          >
            USUARIO
          </text>
        </motion.g>

        {/* Arcos del Loop */}
        {phases.map((phase, i) => {
          const isActive = active === phase.id;
          const dimmed = active !== null && !isActive;

          return (
            <motion.g
              key={phase.id}
              animate={{ opacity: dimmed ? 0.22 : 1 }}
              transition={{ duration: 0.22 }}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setActive(phase.id)}
              onMouseLeave={() => setActive(null)}
              onMouseMove={handleMouseMove}
            >
              {/* Zona de hover más ancha */}
              <path d={phase.path} stroke="transparent" strokeWidth={44} pointerEvents="stroke" />

              <motion.path
                d={phase.path}
                stroke={phase.color}
                strokeLinecap="round"
                initial={{ pathLength: 0, strokeWidth: 14 }}
                animate={{ pathLength: 1, strokeWidth: isActive ? 20 : 14 }}
                transition={{
                  pathLength: { duration: 0.7, delay: 0.4 + i * 0.22, ease: [0.4, 0, 0.2, 1] },
                  strokeWidth: { duration: 0.2 },
                }}
                style={{ filter: isActive ? `drop-shadow(0 0 14px ${phase.color})` : "none" }}
              />

              <g
                transform={`translate(${phase.arrow.x} ${phase.arrow.y}) rotate(${phase.arrow.rotate})`}
              >
                <motion.path
                  d="M -16 -15 L 6 0 L -16 15 Z"
                  fill={phase.color}
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 1, scale: isActive ? 1.25 : 1 }}
                  transition={{ duration: 0.3, delay: 1.1 + i * 0.22 }}
                  style={{
                    transformOrigin: "0px 0px",
                    filter: isActive ? `drop-shadow(0 0 12px ${phase.color})` : "none",
                  }}
                />
              </g>

              {/* Etiqueta */}
              <motion.g
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.9 + i * 0.22 }}
              >
                <text
                  x={phase.label.x}
                  y={phase.label.y}
                  textAnchor="middle"
                  fontSize={44}
                  fontWeight={900}
                  letterSpacing="-0.02em"
                  fill={phase.color}
                >
                  {phase.name}
                </text>
                <text
                  x={phase.label.x}
                  y={phase.label.y + 28}
                  textAnchor="middle"
                  fontSize={16}
                  fontFamily="monospace"
                  letterSpacing="0.16em"
                  fill="var(--color-text-secondary)"
                >
                  {phase.tagline.toUpperCase()}
                </text>
              </motion.g>
            </motion.g>
          );
        })}

        {/* Punto que recorre el Loop sin fin */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "450px 300px" }}
        >
          <motion.circle
            cx={450}
            cy={110}
            r={11}
            fill="var(--color-text-primary)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.6 }}
          />
        </motion.g>
      </svg>

      <AnimatePresence>
        {activePhase && (
          <motion.div
            key="tooltip"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none absolute z-10 bg-[var(--color-bg-dark)] text-white px-5 py-3 rounded-md text-lg font-mono shadow-xl whitespace-nowrap"
            style={{ top: tooltip.y + 18, left: tooltip.x + 18, transformOrigin: "top left" }}
          >
            <span style={{ color: activePhase.color }}>●</span> {activePhase.es} ·{" "}
            {activePhase.detail}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
