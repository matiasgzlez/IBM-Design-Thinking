"use client";

import { motion } from "motion/react";
import CaseLayout from "./CaseLayout";

const EASE_OUT = [0.4, 0, 0.2, 1] as const;

function Brush({
  y,
  width,
  color,
  label,
  labelColor,
  delay,
  fist,
}: {
  y: number;
  width: number;
  color: string;
  label: string;
  labelColor: string;
  delay: number;
  fist: boolean;
}) {
  const handleY = y - width / 2;

  return (
    <g>
      {/* Mango */}
      <motion.rect
        x={90}
        y={handleY}
        width={330}
        height={width}
        rx={width / 2}
        fill={color}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay, ease: EASE_OUT }}
        style={{ originX: 1 }}
      />

      {/* Cabezal */}
      <motion.rect
        x={40}
        y={y - 21}
        width={62}
        height={42}
        rx={16}
        fill={color}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: delay + 0.35, ease: EASE_OUT }}
      />
      {[0, 1, 2, 3].map((i) => (
        <motion.rect
          key={i}
          x={48 + i * 14}
          y={y - 40}
          width={8}
          height={20}
          rx={3}
          fill={color}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.25, delay: delay + 0.45 + i * 0.05, ease: EASE_OUT }}
          style={{ originY: 1 }}
        />
      ))}

      {/* Mano del chico */}
      <motion.g
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 18, delay: delay + 0.6 }}
      >
        {fist ? (
          <>
            <rect x={252} y={y - 40} width={96} height={80} rx={26} fill="#0A0A0A" opacity={0.9} />
            {[0, 1, 2].map((i) => (
              <line
                key={i}
                x1={268 + i * 26}
                y1={y - 32}
                x2={268 + i * 26}
                y2={y + 32}
                stroke="#FFFFFF"
                strokeWidth={2}
                opacity={0.25}
              />
            ))}
          </>
        ) : (
          <>
            <rect x={262} y={y - 30} width={76} height={60} rx={20} fill="#0A0A0A" opacity={0.35} />
            {[0, 1, 2].map((i) => (
              <line
                key={i}
                x1={278 + i * 22}
                y1={y - 24}
                x2={278 + i * 22}
                y2={y + 24}
                stroke="#FFFFFF"
                strokeWidth={2}
                opacity={0.25}
              />
            ))}
          </>
        )}
      </motion.g>

      <motion.text
        x={440}
        y={y + 7}
        fontSize={17}
        fontFamily="monospace"
        fontWeight="bold"
        letterSpacing="0.12em"
        fill={labelColor}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, delay: delay + 0.7, ease: EASE_OUT }}
      >
        {label}
      </motion.text>
    </g>
  );
}

function ToothbrushDiagram() {
  return (
    <svg viewBox="0 0 640 300" className="w-full h-full max-h-[420px]" fill="none">
      <Brush
        y={92}
        width={16}
        color="#C6C6C6"
        label="EL SUPUESTO"
        labelColor="var(--color-text-secondary)"
        delay={0.25}
        fist={false}
      />
      <text
        x={90}
        y={140}
        fontSize={14}
        fontFamily="monospace"
        letterSpacing="0.12em"
        fill="var(--color-text-secondary)"
      >
        mano chica → mango fino
      </text>

      <Brush
        y={222}
        width={44}
        color="var(--color-accent)"
        label="LO QUE VIERON"
        labelColor="var(--color-accent)"
        delay={0.75}
        fist
      />
      <motion.text
        x={90}
        y={280}
        fontSize={14}
        fontFamily="monospace"
        letterSpacing="0.12em"
        fill="var(--color-accent)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, delay: 1.5 }}
      >
        agarran con el puño → mango grueso
      </motion.text>
    </svg>
  );
}

export default function Slide09CaseIdeo() {
  return (
    <CaseLayout
      org="IDEO · Oral-B"
      year="1996"
      headline={
        <>
          Toda la industria hacía mangos finos.{" "}
          <span className="text-[var(--color-accent)]">Ninguno había mirado a un chico.</span>
        </>
      }
      blocks={[
        {
          label: "El encargo",
          text: "Oral-B le pidió a IDEO un cepillo de dientes para chicos que le ganara a la competencia.",
        },
        {
          label: "El supuesto de todos",
          text: "Manos chicas, mango fino. Era la regla no escrita de la categoría.",
        },
        {
          label: "Qué hicieron",
          text: "En vez de asumir, entraron a las casas de los clientes a mirar a los chicos lavarse los dientes.",
        },
      ]}
      insight="Los chicos no agarran el cepillo con los dedos: lo agarran con el puño cerrado, porque la motricidad fina todavía no está desarrollada. Con un mango grueso limpian mejor."
      result={{
        value: "18 meses",
        label:
          "Fue el cepillo infantil más vendido de Estados Unidos. El mango grueso pasó a ser el estándar de toda la industria.",
      }}
      diagram={<ToothbrushDiagram />}
    />
  );
}
