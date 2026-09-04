"use client";

import { motion } from "motion/react";
import SlotImage from "@/components/SlotImage";
import { EASE, T } from "@/lib/motion";

/** Un cepillo dibujado, mientras no haya foto en public/caso/. */
function Brush({ thick, color, delay }: { thick: boolean; color: string; delay: number }) {
  const width = thick ? 44 : 16;
  const y = 60;

  return (
    <svg viewBox="0 0 520 120" className="h-full w-full" fill="none">
      {/* Mango */}
      <motion.rect
        x={90}
        y={y - width / 2}
        width={330}
        height={width}
        rx={width / 2}
        fill={color}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay, ease: EASE }}
        style={{ originX: 1 }}
      />

      {/* Cabezal y cerdas */}
      <motion.g
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: delay + 0.3, ease: EASE }}
      >
        <rect x={40} y={y - 21} width={62} height={42} rx={16} fill={color} />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={48 + i * 14} y={y - 40} width={8} height={20} rx={3} fill={color} />
        ))}
      </motion.g>

      {/* La mano: dedos o puño */}
      <motion.g
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 18, delay: delay + 0.45 }}
      >
        {thick ? (
          <rect x={252} y={y - 40} width={96} height={80} rx={26} fill="#0A0A0A" opacity={0.9} />
        ) : (
          <rect x={262} y={y - 30} width={76} height={60} rx={20} fill="#0A0A0A" opacity={0.3} />
        )}
      </motion.g>
    </svg>
  );
}

const cepillos = [
  {
    slot: "caso/mango-fino",
    label: "Mango fino",
    note: "el que había: un cepillo de adulto más chico",
    color: "var(--color-text-secondary)",
    fallback: <Brush thick={false} color="#C6C6C6" delay={0.35} />,
  },
  {
    slot: "caso/mango-grueso",
    label: "Mango grueso",
    note: "el que diseñó IDEO: grueso y antideslizante",
    color: "var(--color-accent)",
    fallback: <Brush thick color="var(--color-accent)" delay={0.6} />,
  },
];

export default function Slide10CasoInsight() {
  return (
    <section className="relative w-screen h-screen bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] overflow-hidden px-20 pt-14 pb-12 flex flex-col">
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: T.title, ease: EASE }}
        className="font-black leading-[0.92] tracking-[-0.04em] text-[clamp(44px,5.4vw,84px)]"
      >
        El problema de fondo era{" "}
        <span className="text-[var(--color-accent)]">la motricidad.</span>
      </motion.h2>

      <div className="flex-1 min-h-0 mt-10 grid grid-cols-[1.05fr_1fr] gap-14 items-center">
        <div className="flex flex-col gap-7">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: T.content, ease: EASE }}
            className="text-[clamp(21px,2vw,30px)] leading-snug"
          >
            Hasta entonces los cepillos para niños eran{" "}
            <span className="font-bold">iguales a los de adultos, solo que más chicos</span> (mango
            más fino), y muchos padres se quejaban de que sus hijos no querían lavarse los dientes.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: T.content + 0.14, ease: EASE }}
            className="text-[clamp(21px,2vw,30px)] leading-snug"
          >
            Con el mango fino el cepillo se les resbalaba. Por eso IDEO diseñó uno con{" "}
            <span className="font-bold text-[var(--color-accent)]">
              mango más grueso y antideslizante
            </span>
            .
          </motion.p>
        </div>

        <div className="h-full min-h-0 flex flex-col justify-center gap-8">
          {cepillos.map(({ slot, label, note, color, fallback }, i) => (
            <motion.div
              key={slot}
              initial={{ opacity: 0, x: 26 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: T.content + 0.1 + i * 0.12, ease: EASE }}
              className="flex flex-col gap-2"
            >
              <SlotImage
                slot={slot}
                title={label}
                subtitle={note}
                color={color}
                className="h-[150px] w-full"
                fallback={fallback}
                zoomOnHover
              />
              <span className="font-mono text-base uppercase tracking-[0.16em]" style={{ color }}>
                {label} · <span className="normal-case tracking-normal">{note}</span>
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
