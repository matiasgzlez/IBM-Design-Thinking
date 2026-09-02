"use client";

import { motion, AnimatePresence } from "motion/react";
import { Eye, Flag, Lightbulb, MessageSquare, Repeat, Users, Hammer } from "lucide-react";
import type { ProjectState } from "@/types/loop";

const PHASE_META = {
  observe: { label: "Observe", color: "var(--color-observe)", Icon: Eye },
  reflect: { label: "Reflect", color: "var(--color-reflect)", Icon: Lightbulb },
  make: { label: "Make", color: "var(--color-make)", Icon: Hammer },
} as const;

type Props = {
  state: ProjectState;
  className?: string;
};

export default function ProjectStatusPanel({ state, className = "" }: Props) {
  const { label, color, Icon } = PHASE_META[state.phase];

  const metrics = [
    { key: "sponsor", Icon: Users, label: "Sponsor users", value: state.sponsorUsers.length },
    { key: "insights", Icon: Eye, label: "Insights", value: state.insights.length },
    { key: "protos", Icon: Hammer, label: "Prototipos", value: state.prototypes.length },
    { key: "playbacks", Icon: MessageSquare, label: "Playbacks", value: state.playbacks.length },
  ];

  return (
    <div className={`bg-[var(--color-bg-primary)] px-6 py-4 flex flex-col gap-4 ${className}`}>
      {/* Fase actual */}
      <div>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">
          Fase del Loop
        </span>
        <AnimatePresence mode="wait">
          <motion.div
            key={state.phase}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="mt-2 flex items-center gap-3"
          >
            <span
              className="w-11 h-11 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: color }}
            >
              <Icon size={22} className="text-white" strokeWidth={2.2} />
            </span>
            <div>
              <span className="block font-black text-2xl uppercase leading-none" style={{ color }}>
                {label}
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
                iteración {state.iteration}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Hill */}
      <div>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-secondary)] flex items-center gap-2">
          <Flag size={13} /> Hill
        </span>
        <AnimatePresence mode="wait">
          {state.hill ? (
            <motion.div
              key="hill"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.28 }}
              className="mt-2 rounded-lg border border-[var(--color-accent)] bg-[var(--color-accent-soft)] p-3 flex flex-col gap-2"
            >
              {(["who", "what", "wow"] as const).map((k) => (
                <div key={k} className="flex gap-2 items-start">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--color-accent)] pt-1 w-10 shrink-0">
                    {k}
                  </span>
                  <span className="text-sm leading-snug text-[var(--color-text-primary)]">
                    {state.hill![k]}
                  </span>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-hill"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-2 rounded-lg border border-dashed border-[var(--color-divider)] p-3 text-sm italic text-[var(--color-text-secondary)]"
            >
              Sin Hill: el equipo no sabe hacia dónde va.
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-2 gap-3">
        {metrics.map(({ key, Icon: MetricIcon, label: metricLabel, value }) => (
          <div
            key={key}
            className="rounded-lg border border-[var(--color-divider)] px-3 py-2.5 flex items-center gap-3"
          >
            <MetricIcon size={16} className="text-[var(--color-text-secondary)] shrink-0" />
            <div className="min-w-0">
              <motion.span
                key={value}
                initial={{ scale: 1.4, color: "var(--color-accent)" }}
                animate={{ scale: 1, color: "var(--color-text-primary)" }}
                transition={{ duration: 0.35 }}
                className="block font-black text-xl leading-none"
              >
                {value}
              </motion.span>
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
                {metricLabel}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Últimos insights */}
      <div className="min-h-0 flex-1 flex flex-col">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">
          Insights del campo
        </span>
        <div className="mt-2 flex flex-col gap-1.5 overflow-y-auto">
          <AnimatePresence initial={false}>
            {state.insights.length === 0 && (
              <motion.span
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm italic text-[var(--color-text-secondary)]"
              >
                Todavía no observamos a nadie.
              </motion.span>
            )}
            {state.insights.map((insight) => (
              <motion.span
                key={insight}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className="text-sm leading-snug text-[var(--color-text-primary)] flex gap-2"
              >
                <span className="text-[var(--color-observe)] font-black">·</span>
                {insight}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {state.shipped && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg bg-[var(--color-success)] text-white px-4 py-3 flex items-center gap-3"
        >
          <Repeat size={18} />
          <span className="font-mono text-xs uppercase tracking-[0.16em] font-bold">
            Outcome alcanzado · el Loop sigue
          </span>
        </motion.div>
      )}
    </div>
  );
}
