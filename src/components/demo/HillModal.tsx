"use client";

import { motion } from "motion/react";
import { Flag } from "lucide-react";
import type { Hill } from "@/types/loop";

type Props = {
  hill: Hill;
  onClose: () => void;
};

const ROWS: { key: keyof Hill; label: string; hint: string }[] = [
  { key: "who", label: "Who", hint: "el usuario concreto, no “el cliente”" },
  { key: "what", label: "What", hint: "qué va a poder hacer" },
  { key: "wow", label: "Wow", hint: "el diferencial medible" },
];

export default function HillModal({ hill, onClose }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 12 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className="bg-white rounded-xl p-8 w-full max-w-xl shadow-2xl"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)] flex items-center justify-center">
            <Flag size={20} className="text-white" strokeWidth={2.2} />
          </div>
          <h2 className="text-2xl font-black tracking-tight">Escribir el Hill</h2>
        </div>

        <p className="text-sm text-[var(--color-text-secondary)] mb-6">
          Un enunciado de intención escrito como un outcome de usuario. Dice a dónde llegar,
          nunca cómo construirlo.
        </p>

        <div className="space-y-3 mb-7">
          {ROWS.map(({ key, label, hint }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.15 + i * 0.12 }}
            >
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-accent)] mb-1 font-bold">
                {label} <span className="text-[var(--color-text-secondary)]">· {hint}</span>
              </label>
              <div className="px-3 py-2.5 border border-[var(--color-divider)] rounded text-base font-medium">
                {hill[key]}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
            Sin solución prescrita
          </span>
          <motion.button
            type="button"
            onClick={onClose}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.6, delay: 0.7, ease: "easeInOut" }}
            className="px-6 py-3 text-base font-bold text-white bg-[var(--color-accent)] rounded hover:opacity-90 transition-opacity"
          >
            Continuar →
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
