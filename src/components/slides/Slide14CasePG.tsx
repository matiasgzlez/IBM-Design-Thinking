"use client";

import { motion } from "motion/react";
import CaseLayout from "./CaseLayout";

const EASE_OUT = [0.4, 0, 0.2, 1] as const;

function Broom({ color }: { color: string }) {
  return (
    <g>
      <rect x={-4} y={-70} width={8} height={92} rx={4} fill={color} />
      <path d="M -26 22 L 26 22 L 34 62 L -34 62 Z" fill={color} />
      {[0, 1, 2, 3].map((i) => (
        <line
          key={i}
          x1={-20 + i * 13}
          y1={26}
          x2={-24 + i * 15}
          y2={58}
          stroke="#FFFFFF"
          strokeWidth={2}
          opacity={0.35}
        />
      ))}
    </g>
  );
}

function Mop({ color }: { color: string }) {
  return (
    <g>
      <rect x={-4} y={-70} width={8} height={92} rx={4} fill={color} />
      <rect x={-32} y={22} width={64} height={26} rx={8} fill={color} />
      <path d="M -30 48 Q -20 66 -10 48 Q 0 66 10 48 Q 20 66 30 48 Z" fill={color} opacity={0.55} />
    </g>
  );
}

function SwifferDiagram() {
  return (
    <svg viewBox="0 0 640 320" className="w-full h-full max-h-[420px]" fill="none">
      {/* Paso 1 + Paso 2 */}
      <motion.g
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: [0, 1, 1, 0.45], y: 0 }}
        transition={{ duration: 2, times: [0, 0.25, 0.62, 1], delay: 0.3, ease: EASE_OUT }}
      >
        <g transform="translate(120 110)">
          <Broom color="#9E9E9E" />
        </g>
        <text
          x={120}
          y={210}
          textAnchor="middle"
          fontSize={15}
          fontFamily="monospace"
          letterSpacing="0.14em"
          fill="var(--color-text-secondary)"
        >
          PASO 1 · BARRER
        </text>

        <text
          x={230}
          y={120}
          textAnchor="middle"
          fontSize={34}
          fontWeight="900"
          fill="var(--color-divider)"
        >
          +
        </text>

        <g transform="translate(340 110)">
          <Mop color="#9E9E9E" />
        </g>
        <text
          x={340}
          y={210}
          textAnchor="middle"
          fontSize={15}
          fontFamily="monospace"
          letterSpacing="0.14em"
          fill="var(--color-text-secondary)"
        >
          PASO 2 · TRAPEAR
        </text>
      </motion.g>

      {/* Flecha de fusión */}
      <motion.path
        d="M 420 110 L 486 110"
        stroke="var(--color-accent)"
        strokeWidth={4}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.45, delay: 1.35, ease: "easeInOut" }}
      />
      <motion.path
        d="M 474 100 L 486 110 L 474 120"
        stroke="var(--color-accent)"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25, delay: 1.75 }}
      />

      {/* El Swiffer: un solo paso */}
      <motion.g
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 16, delay: 1.85 }}
      >
        <g transform="translate(550 110)">
          <Mop color="var(--color-accent)" />
        </g>
        <text
          x={550}
          y={210}
          textAnchor="middle"
          fontSize={15}
          fontFamily="monospace"
          fontWeight="bold"
          letterSpacing="0.14em"
          fill="var(--color-accent)"
        >
          UN SOLO PASO
        </text>
      </motion.g>

      <motion.g
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 2.1, ease: EASE_OUT }}
      >
        <rect x={478} y={242} width={144} height={34} rx={8} fill="var(--color-accent-soft)" />
        <text
          x={550}
          y={265}
          textAnchor="middle"
          fontSize={17}
          fontFamily="monospace"
          fontWeight="bold"
          letterSpacing="0.16em"
          fill="var(--color-accent)"
        >
          SWIFFER
        </text>
      </motion.g>
    </svg>
  );
}

export default function Slide14CasePG() {
  return (
    <CaseLayout
      index="03"
      org="Procter & Gamble"
      year="Swiffer"
      headline={
        <>
          Nadie pedía un mejor trapo:{" "}
          <span className="text-[var(--color-accent)]">pedían dejar de limpiar dos veces.</span>
        </>
      }
      blocks={[
        {
          label: "El problema",
          text: "Los procesos tradicionales de innovación de P&G solo producían mejoras incrementales, nunca un salto.",
        },
        {
          label: "Qué hicieron",
          text: "Empleados de P&G fueron a las casas a observar cómo limpiaba la gente en su rutina real.",
        },
        {
          label: "La solución",
          text: "Un producto que junta el polvo y pasa el trapo en un mismo movimiento, probado por consumidores en varias versiones.",
        },
      ]}
      insight="Limpiar el piso eran dos tareas encadenadas: primero barrer, después trapear. El problema no era ninguna de las dos: era el paso de más."
      result={{
        value: "US$ 100 M+",
        label: "de ventas en el primer año. El Swiffer redefinió toda la categoría de limpieza.",
      }}
      diagram={<SwifferDiagram />}
    />
  );
}
