"use client";

import { motion } from "motion/react";
import CaseLayout from "./CaseLayout";

function Listing({
  x,
  accent,
  bars,
}: {
  x: number;
  accent: boolean;
  bars: number[];
}) {
  const stroke = accent ? "var(--color-accent)" : "var(--color-divider)";
  const photo = accent ? "var(--color-accent)" : "#D6D6D6";
  const BASE = 250;

  return (
    <g>
      <rect x={x} y={30} width={210} height={234} rx={14} stroke={stroke} strokeWidth={3} fill="#FFFFFF" />

      {/* Foto del alojamiento */}
      <rect
        x={x + 14}
        y={44}
        width={182}
        height={116}
        rx={8}
        fill={accent ? "rgba(15,98,254,0.1)" : "#F2F2F2"}
      />
      <motion.g
        initial={{ opacity: accent ? 0.2 : 0.5 }}
        animate={{ opacity: accent ? 1 : 0.5 }}
        transition={{ duration: 0.7, delay: accent ? 0.95 : 0, ease: "easeOut" }}
      >
        <circle cx={x + 58} cy={78} r={13} fill={photo} />
        <path d={`M ${x + 24} 158 L ${x + 76} 104 L ${x + 122} 158 Z`} fill={photo} />
        <path d={`M ${x + 98} 158 L ${x + 140} 118 L ${x + 182} 158 Z`} fill={photo} opacity={0.6} />
      </motion.g>

      {/* Líneas de texto de la publicación */}
      <rect x={x + 14} y={176} width={130} height={9} rx={4.5} fill="#E8E8E8" />
      <rect x={x + 14} y={192} width={92} height={9} rx={4.5} fill="#F0F0F0" />

      {/* Reservas */}
      {bars.map((h, i) => (
        <motion.rect
          key={i}
          x={x + 16 + i * 26}
          y={BASE - h}
          width={16}
          height={h}
          rx={3}
          fill={accent ? "var(--color-accent)" : "#D4D4D4"}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{
            duration: 0.5,
            delay: (accent ? 1.05 : 0.3) + i * 0.07,
            ease: [0.4, 0, 0.2, 1],
          }}
          style={{ originY: 1 }}
        />
      ))}
    </g>
  );
}

function AirbnbDiagram() {
  return (
    <svg viewBox="0 0 640 300" className="w-full h-full max-h-[420px]" fill="none">
      <Listing x={20} accent={false} bars={[10, 6, 12, 8]} />

      <motion.path
        d="M 258 145 L 352 145"
        stroke="var(--color-accent)"
        strokeWidth={4}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6, ease: "easeInOut" }}
      />
      <motion.path
        d="M 340 135 L 352 145 L 340 155"
        stroke="var(--color-accent)"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25, delay: 1.05 }}
      />
      <motion.text
        x={305}
        y={128}
        textAnchor="middle"
        fontSize={14}
        fontFamily="monospace"
        fontWeight="bold"
        letterSpacing="0.14em"
        fill="var(--color-accent)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.8 }}
      >
        FOTÓGRAFO
      </motion.text>

      <Listing x={400} accent bars={[26, 42, 60, 78]} />

      <text
        x={125}
        y={288}
        textAnchor="middle"
        fontSize={14}
        fontFamily="monospace"
        letterSpacing="0.12em"
        fill="var(--color-text-secondary)"
      >
        fotos del anfitrión
      </text>
      <text
        x={505}
        y={288}
        textAnchor="middle"
        fontSize={14}
        fontFamily="monospace"
        letterSpacing="0.12em"
        fill="var(--color-accent)"
      >
        fotos profesionales
      </text>
    </svg>
  );
}

export default function Slide10CaseAirbnb() {
  return (
    <CaseLayout
      index="01"
      org="Airbnb"
      year="2009"
      headline={
        <>
          El problema no era el producto:{" "}
          <span className="text-[var(--color-accent)]">eran las fotos.</span>
        </>
      }
      blocks={[
        {
          label: "El problema",
          text: "La plataforma estaba estancada. Los alojamientos no se alquilaban y los huéspedes no lograban imaginarse el lugar.",
        },
        {
          label: "Qué hicieron",
          text: "Los fundadores fueron a hablar cara a cara con anfitriones y huéspedes, uno por uno.",
        },
        {
          label: "La solución",
          text: "Fotógrafos profesionales para los alojamientos y una web que muestra bien esas fotos. Lo probaron primero en unas pocas ciudades.",
        },
      ]}
      insight="Casi todos los problemas venían de las malas fotos de los alojamientos. Nadie reserva lo que no puede ver."
      result={{
        value: "Miles de millones",
        label:
          "El experimento funcionó tan bien que lo escalaron a todas las ciudades: de startup estancada a marca global.",
      }}
      diagram={<AirbnbDiagram />}
    />
  );
}
