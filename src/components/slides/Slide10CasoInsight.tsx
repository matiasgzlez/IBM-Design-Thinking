"use client";

import { motion } from "motion/react";
import { EASE, T } from "@/lib/motion";

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

export default function Slide10CasoInsight() {
  return (
    <section className="relative w-screen h-screen bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] overflow-hidden px-20 pt-12 pb-10 flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="font-mono text-xl uppercase tracking-[0.22em] text-[var(--color-text-secondary)]"
      >
        El ejemplo · <span className="text-[var(--color-accent)]">qué descubrieron</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: T.title, ease: EASE }}
        className="mt-3 font-black leading-[0.92] tracking-[-0.04em] text-[clamp(40px,4.8vw,74px)]"
      >
        El problema no era el tamaño:{" "}
        <span className="text-[var(--color-accent)]">era la motricidad.</span>
      </motion.h2>

      <div className="flex-1 min-h-0 mt-8 grid grid-cols-[1.05fr_1fr] gap-12 items-center">
        <div className="flex flex-col gap-6">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: T.content, ease: EASE }}
            className="text-[clamp(21px,1.9vw,28px)] leading-snug text-[var(--color-text-secondary)]"
          >
            Hasta entonces los cepillos para niños eran{" "}
            <span className="text-[var(--color-text-primary)] font-bold">
              iguales a los de adultos, solo que más chicos
            </span>
            , y muchos padres se quejaban de que sus hijos no querían lavarse los dientes.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: T.content + 0.12, ease: EASE }}
            className="text-[clamp(21px,1.9vw,28px)] leading-snug"
          >
            Los adultos agarran el cepillo{" "}
            <span className="font-bold">con los dedos</span>, con movimientos controlados. Los
            chicos, sin la motricidad fina desarrollada, lo agarran{" "}
            <span className="font-bold text-[var(--color-accent)]">cerrando la mano como un puño</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: T.content + 0.24, ease: EASE }}
            className="border-l-[6px] border-[var(--color-accent)] bg-[var(--color-bg-primary)] rounded-r-xl px-7 py-5"
          >
            <p className="text-[clamp(22px,2.1vw,32px)] leading-snug font-medium">
              Con el mango fino el cepillo se les resbalaba. Por eso diseñaron uno con{" "}
              <span className="text-[var(--color-accent)]">cuerpo grueso y antideslizante</span>.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 26 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: T.content + 0.1, ease: EASE }}
          className="h-full min-h-0 flex items-center"
        >
          <ToothbrushDiagram />
        </motion.div>
      </div>
    </section>
  );
}
