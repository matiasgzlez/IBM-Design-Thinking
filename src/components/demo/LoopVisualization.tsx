"use client";

import { motion, AnimatePresence } from "motion/react";
import type { LoopPhase, ProjectState } from "@/types/loop";

const CX = 300;
const CY = 190;
const R = 115;
const ARTIFACT_R = 156;

const PHASES: {
  id: LoopPhase;
  name: string;
  color: string;
  path: string;
  arrow: { x: number; y: number; rotate: number };
  center: number;
  label: { x: number; y: number };
}[] = [
  {
    id: "observe",
    name: "OBSERVE",
    color: "#0F62FE",
    path: `M 205.8 124.1 A ${R} ${R} 0 0 1 394.2 124.1`,
    arrow: { x: 394.2, y: 124.1, rotate: 55 },
    center: -90,
    label: { x: 300, y: 34 },
  },
  {
    id: "reflect",
    name: "REFLECT",
    color: "#8A3FFC",
    path: `M 404.2 141.4 A ${R} ${R} 0 0 1 310 304.6`,
    arrow: { x: 310, y: 304.6, rotate: 175 },
    center: 30,
    label: { x: 470, y: 330 },
  },
  {
    id: "make",
    name: "MAKE",
    color: "#009D9A",
    path: `M 290 304.6 A ${R} ${R} 0 0 1 195.8 141.4`,
    arrow: { x: 195.8, y: 141.4, rotate: 295 },
    center: 150,
    label: { x: 130, y: 330 },
  },
];

function polar(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CX + radius * Math.cos(rad), y: CY + radius * Math.sin(rad) };
}

type Props = {
  state: ProjectState;
  className?: string;
};

export default function LoopVisualization({ state, className = "" }: Props) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 600 380" className="w-full h-full" fill="none" style={{ display: "block" }}>
        {PHASES.map((phase) => {
          const isActive = state.phase === phase.id;
          const items = state.artifacts.filter((a) => a.phase === phase.id);

          return (
            <g key={phase.id}>
              {/* Arco de la fase */}
              <motion.path
                d={phase.path}
                stroke={phase.color}
                strokeLinecap="round"
                animate={{
                  strokeWidth: isActive ? 16 : 9,
                  opacity: isActive ? 1 : 0.32,
                }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                style={{ filter: isActive ? `drop-shadow(0 0 12px ${phase.color})` : "none" }}
              />

              <g
                transform={`translate(${phase.arrow.x} ${phase.arrow.y}) rotate(${phase.arrow.rotate})`}
              >
                <motion.path
                  d="M -12 -11 L 5 0 L -12 11 Z"
                  fill={phase.color}
                  animate={{ opacity: isActive ? 1 : 0.32, scale: isActive ? 1.15 : 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ transformOrigin: "0px 0px" }}
                />
              </g>

              {/* Nombre de la fase */}
              <motion.text
                x={phase.label.x}
                y={phase.label.y}
                textAnchor="middle"
                fontSize={22}
                fontWeight={900}
                letterSpacing="0.04em"
                fill={phase.color}
                animate={{ opacity: isActive ? 1 : 0.35 }}
                transition={{ duration: 0.3 }}
              >
                {phase.name}
              </motion.text>

              {/* Artefactos que se acumulan alrededor del Loop */}
              <AnimatePresence>
                {items.map((item, i) => {
                  const spread = 15;
                  const angle = phase.center + (i - (items.length - 1) / 2) * spread;
                  const { x, y } = polar(angle, ARTIFACT_R);
                  return (
                    <motion.circle
                      key={item.id}
                      cx={x}
                      cy={y}
                      r={8}
                      fill={phase.color}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 320, damping: 18 }}
                      style={{
                        transformOrigin: `${x}px ${y}px`,
                        filter: `drop-shadow(0 0 8px ${phase.color})`,
                      }}
                    />
                  );
                })}
              </AnimatePresence>
            </g>
          );
        })}

        {/* Centro: el usuario y la iteración */}
        <circle cx={CX} cy={CY} r={64} fill="var(--color-bg-dark)" />
        <circle cx={CX} cy={CY - 14} r={14} fill="#FFFFFF" />
        <path d={`M ${CX - 26} ${CY + 26} A 26 26 0 0 0 ${CX + 26} ${CY + 26}`} fill="#FFFFFF" />
        <AnimatePresence mode="wait">
          <motion.text
            key={state.iteration}
            x={CX}
            y={CY + 88}
            textAnchor="middle"
            fontSize={13}
            fontFamily="monospace"
            letterSpacing="0.16em"
            fill="var(--color-text-secondary)"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            LOOP {state.iteration}
          </motion.text>
        </AnimatePresence>
      </svg>
    </div>
  );
}
