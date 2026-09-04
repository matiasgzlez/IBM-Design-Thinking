"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion, useTime, useTransform } from "motion/react";
import MemeModal from "@/components/MemeModal";
import { findMedia, type MemeSource } from "@/lib/memes";

type PhaseId = "observe" | "reflect" | "make";

type Phase = {
  id: PhaseId;
  name: string;
  es: string;
  color: string;
  /* Arco del círculo (centro 450,300 · radio 190) */
  path: string;
  /* Punto donde arranca el arco, para redondear la punta */
  start: { x: number; y: number };
  /* Punta de flecha al final del arco */
  arrow: { x: number; y: number; rotate: number };
  label: { x: number; y: number };
  tagline: string;
  detail: string;
};

const CX = 450;
const CY = 300;
const R = 190;

const phases: Phase[] = [
  {
    id: "observe",
    name: "Observe",
    es: "Observar",
    color: "#0F62FE",
    path: `M 294.4 191 A ${R} ${R} 0 0 1 605.6 191`,
    start: { x: 294.4, y: 191 },
    arrow: { x: 605.6, y: 191, rotate: 55 },
    label: { x: 450, y: 56 },
    tagline: "Sumergite en el mundo real",
    detail: "Investigar y entender el problema en profundidad",
  },
  {
    id: "reflect",
    name: "Reflect",
    es: "Reflexionar",
    color: "#8A3FFC",
    path: `M 622.2 219.7 A ${R} ${R} 0 0 1 466.6 489.3`,
    start: { x: 622.2, y: 219.7 },
    arrow: { x: 466.6, y: 489.3, rotate: 175 },
    label: { x: 700, y: 508 },
    tagline: "Juntense y miren adentro",
    detail: "Integrar lo aprendido y armar un plan de acción",
  },
  {
    id: "make",
    name: "Make",
    es: "Hacer",
    color: "#009D9A",
    path: `M 433.4 489.3 A ${R} ${R} 0 0 1 277.8 219.7`,
    start: { x: 433.4, y: 489.3 },
    arrow: { x: 277.8, y: 219.7, rotate: 295 },
    label: { x: 205, y: 508 },
    tagline: "Dale forma a lo abstracto",
    detail: "Prototipos y resultados que alimentan la próxima observación",
  },
];

/**
 * Motion aplica los transforms de SVG con el origen en el centro del bounding
 * box del propio elemento, así que un `rotate` haría girar al equipo sobre sí
 * mismo. Calculamos la posición sobre la circunferencia a mano.
 */
function OrbitingTeam() {
  const time = useTime();
  const angle = useTransform(time, (t) => (t / 12000) * Math.PI * 2 - Math.PI / 2);
  const x = useTransform(angle, (a) => CX + R * Math.cos(a));
  const y = useTransform(angle, (a) => CY + R * Math.sin(a));

  return (
    <motion.g
      style={{ x, y }}
      pointerEvents="none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.9 }}
    >
      <circle r={21} fill="var(--color-bg-secondary)" />
      <circle r={21} fill="none" stroke="var(--color-text-primary)" strokeWidth={2.5} />
      {/* Un equipo: dos personas */}
      <g transform="translate(-6 0)">
        <circle cx={0} cy={-6} r={4.6} fill="var(--color-text-primary)" />
        <path d="M -7.5 7 A 7.5 7.5 0 0 1 7.5 7 Z" fill="var(--color-text-primary)" />
      </g>
      <g transform="translate(6 0)">
        <circle cx={0} cy={-6} r={4.6} fill="var(--color-text-primary)" />
        <path d="M -7.5 7 A 7.5 7.5 0 0 1 7.5 7 Z" fill="var(--color-text-primary)" />
      </g>
    </motion.g>
  );
}

export default function LoopDiagram() {
  const [active, setActive] = useState<PhaseId | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [memes, setMemes] = useState<Partial<Record<PhaseId, MemeSource>>>({});
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [openPhase, setOpenPhase] = useState<PhaseId | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Busca los memes que estén puestos en public/loop/
  useEffect(() => {
    let cancelled = false;
    (async () => {
      for (const phase of phases) {
        const found = await findMedia(`loop/${phase.id}`);
        if (!cancelled && found) {
          setMemes((prev) => ({ ...prev, [phase.id]: found }));
        }
      }
      // La cara del usuario en el centro, si está puesta
      const user = await findMedia("loop/usuario");
      if (!cancelled && user?.kind === "image") setUserPhoto(user.url);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleMouseMove = (e: MouseEvent<SVGGElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltip({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const activePhase = phases.find((p) => p.id === active);
  const openedPhase = phases.find((p) => p.id === openPhase);
  const openedMeme = openPhase ? memes[openPhase] : undefined;

  const width = containerRef.current?.clientWidth ?? 0;
  const flip = width > 0 && tooltip.x > width - 460;

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 900 620" className="w-full h-full" fill="none" style={{ display: "block" }}>
        {/* Halo del centro */}
        {[0, 1].map((i) => (
          <motion.circle
            key={i}
            cx={CX}
            cy={CY}
            r={64}
            stroke="rgba(15,98,254,0.35)"
            strokeWidth={2}
            pointerEvents="none"
            initial={{ scale: 0.9, opacity: 0.6 }}
            animate={{ scale: [0.9, 1.5], opacity: [0.55, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 1.5, ease: "easeOut" }}
          />
        ))}

        {/* Usuario en el centro */}
        <motion.circle
          cx={CX}
          cy={CY}
          r={62}
          fill="var(--color-bg-dark)"
          pointerEvents="none"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 240, damping: 18, delay: 0.1 }}
        />
        <motion.g
          pointerEvents="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.35 }}
        >
          {userPhoto ? (
            <>
              <defs>
                <clipPath id="loop-user-clip">
                  <circle cx={CX} cy={CY} r={62} />
                </clipPath>
              </defs>
              <image
                href={userPhoto}
                x={CX - 62}
                y={CY - 62}
                width={124}
                height={124}
                clipPath="url(#loop-user-clip)"
                preserveAspectRatio="xMidYMid slice"
              />
              <circle cx={CX} cy={CY} r={62} fill="none" stroke="var(--color-bg-dark)" strokeWidth={3} />
            </>
          ) : (
            <>
              <circle cx={CX} cy={283} r={16} fill="#FFFFFF" />
              <path d="M 420 330 A 30 30 0 0 0 480 330" fill="#FFFFFF" />
            </>
          )}
          <text
            x={CX}
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
              onClick={() => setOpenPhase(phase.id)}
            >
              {/* Zona de hover más ancha */}
              <path d={phase.path} stroke="transparent" strokeWidth={54} pointerEvents="stroke" />

              {/* Punta redondeada del arranque */}
              <motion.circle
                cx={phase.start.x}
                cy={phase.start.y}
                r={isActive ? 10 : 7}
                fill={phase.color}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.25 + i * 0.14 }}
              />

              <motion.path
                d={phase.path}
                stroke={phase.color}
                strokeLinecap="butt"
                initial={{ pathLength: 0, strokeWidth: 14 }}
                animate={{ pathLength: 1, strokeWidth: isActive ? 20 : 14 }}
                transition={{
                  pathLength: { duration: 0.55, delay: 0.25 + i * 0.14, ease: [0.4, 0, 0.2, 1] },
                  strokeWidth: { duration: 0.2 },
                }}
                style={{ filter: isActive ? `drop-shadow(0 0 14px ${phase.color})` : "none" }}
              />

              {/* Punta de flecha: base pegada al final del arco */}
              <g transform={`translate(${phase.arrow.x} ${phase.arrow.y}) rotate(${phase.arrow.rotate})`}>
                <motion.path
                  d="M -7 -15 L 20 0 L -7 15 Z"
                  fill={phase.color}
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 1, scale: isActive ? 1.2 : 1 }}
                  transition={{ duration: 0.3, delay: 0.7 + i * 0.14 }}
                  style={{ filter: isActive ? `drop-shadow(0 0 12px ${phase.color})` : "none" }}
                />
              </g>

              {/* Etiqueta */}
              <motion.g
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.6 + i * 0.14 }}
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
              </motion.g>
            </motion.g>
          );
        })}

        {/* El equipo recorre el Loop sin fin */}
        <OrbitingTeam />
      </svg>

      {/* Tooltip: dos renglones y siempre dentro de la slide */}
      <AnimatePresence>
        {activePhase && (
          <motion.div
            key="tooltip"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.14 }}
            className="pointer-events-none absolute z-10 w-[380px] bg-[var(--color-bg-dark)] text-white px-5 py-4 rounded-lg shadow-xl"
            style={{
              top: tooltip.y + 30,
              left: flip ? undefined : tooltip.x + 26,
              right: flip ? Math.max(0, (containerRef.current?.clientWidth ?? 0) - tooltip.x + 26) : undefined,
              transformOrigin: flip ? "top right" : "top left",
            }}
          >
            <span
              className="block font-black text-xl uppercase tracking-tight leading-none"
              style={{ color: activePhase.color }}
            >
              {activePhase.es}
            </span>
            <span className="mt-1.5 block font-mono text-sm leading-snug text-white/75">
              {activePhase.detail}
            </span>
            <span className="mt-2.5 block font-mono text-xs uppercase tracking-[0.18em] text-white/45">
              ▶ Clic para ver el meme
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {openedPhase && (
          <MemeModal
            key="meme"
            title={openedPhase.name}
            subtitle={openedPhase.tagline}
            color={openedPhase.color}
            meme={openedMeme ?? null}
            slot={`public/loop/${openedPhase.id}.png`}
            onClose={() => setOpenPhase(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
