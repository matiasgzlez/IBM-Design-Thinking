"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLoopState } from "@/hooks/useLoopState";
import { executeCommand } from "@/lib/loopCommands";
import LoopConsole from "@/components/demo/LoopConsole";
import LoopVisualization from "@/components/demo/LoopVisualization";
import ProjectStatusPanel from "@/components/demo/ProjectStatusPanel";
import HillModal from "@/components/demo/HillModal";

const PRELOADED_COMMANDS = [
  "edt sponsor-users --recruit",
  "edt observe --in-context",
  "edt reflect --synthesize",
  "edt hill --write",
  "edt make --prototype",
  "edt playback",
  "edt loop --iterate",
  "edt observe --in-context",
  "edt make --prototype",
  "edt playback --final",
];

const STEP_EXPLANATIONS = [
  "Sumamos usuarios reales al equipo. Traen el dominio que nosotros no tenemos.",
  "Los miramos trabajar en su contexto: los datos vienen del campo, no de una reunión.",
  "El equipo se junta a sintetizar: qué patrón aparece detrás de todos esos insights.",
  "Escribimos el Hill: who · what · wow. Un outcome de usuario, no una lista de features.",
  "Damos forma concreta a la idea. Prototipo descartable: se hace para aprender, no para entregar.",
  "Playback: contamos la historia a los stakeholders y aparece la desalineación.",
  "Con lo aprendido volvemos al principio. El Loop no es una fila: es un círculo.",
  "Observamos otra vez, ahora con el prototipo en la mano y usuarios usándolo.",
  "Prototipo v2: incorpora el feedback del playback y de la segunda observación.",
  "Playback final: el outcome del Hill se cumplió y el ciclo vuelve a empezar.",
];

export default function Slide09Demo() {
  const [state, dispatch] = useLoopState();
  const [preloadedIndex, setPreloadedIndex] = useState(0);
  const [showHillModal, setShowHillModal] = useState(false);

  const currentPreloadedCommand =
    preloadedIndex < PRELOADED_COMMANDS.length
      ? PRELOADED_COMMANDS[preloadedIndex]
      : null;

  const handleExecute = (command: string) => {
    const trimmed = command.trim();
    dispatch({ type: "APPEND_LINE", line: { type: "command", text: command } });

    const result = executeCommand(command, state, dispatch);

    if (result.success && /^edt hill(\s|$)/.test(trimmed)) {
      setShowHillModal(true);
    }

    if (trimmed === PRELOADED_COMMANDS[preloadedIndex]?.trim()) {
      window.setTimeout(() => {
        setPreloadedIndex((i) => i + 1);
      }, 700);
    }
  };

  const handleReset = () => {
    dispatch({ type: "RESET" });
    setPreloadedIndex(0);
    setShowHillModal(false);
  };

  return (
    <section className="relative w-screen h-screen flex flex-col bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] overflow-hidden">
      <div className="flex items-center gap-5 px-10 py-4 bg-[var(--color-bg-secondary)] border-b border-[var(--color-divider)] flex-shrink-0">
        <span className="font-mono text-base uppercase tracking-[0.22em] text-[var(--color-accent)] font-bold whitespace-nowrap">
          Paso {Math.min(preloadedIndex + 1, PRELOADED_COMMANDS.length)} / {PRELOADED_COMMANDS.length}
        </span>
        <span className="text-xl text-[var(--color-text-primary)] leading-snug flex-1">
          {STEP_EXPLANATIONS[Math.min(preloadedIndex, STEP_EXPLANATIONS.length - 1)]}
        </span>
        <button
          onClick={handleReset}
          className="flex-shrink-0 flex items-center gap-2 font-mono text-sm uppercase tracking-[0.16em] px-4 py-2 rounded-lg border border-[var(--color-divider)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
        >
          ↺ Reiniciar
        </button>
      </div>

      <div className="flex flex-shrink-0 border-b border-[var(--color-divider)] h-[42vh]">
        <LoopConsole
          onExecute={handleExecute}
          history={state.consoleHistory}
          preloadedCommand={currentPreloadedCommand}
          className="flex-1 min-w-0 h-full"
        />
        <ProjectStatusPanel
          state={state}
          className="w-[400px] border-l border-[var(--color-divider)] flex-shrink-0 h-full overflow-y-auto"
        />
      </div>

      <div className="relative flex-1 min-h-0 bg-[var(--color-bg-primary)] flex items-center justify-center">
        <motion.div
          key={state.phase}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-4 left-6 z-10 flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-[var(--color-divider)] shadow-sm"
        >
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: `var(--color-${state.phase})` }}
          />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">
            fase
          </span>
          <span
            className="font-mono text-base font-bold uppercase"
            style={{ color: `var(--color-${state.phase})` }}
          >
            {state.phase}
          </span>
        </motion.div>

        <LoopVisualization state={state} className="w-full h-full px-6 py-2" />
      </div>

      <AnimatePresence>
        {showHillModal && state.hill && (
          <HillModal
            key="hill-modal"
            hill={state.hill}
            onClose={() => setShowHillModal(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
