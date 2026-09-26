"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { useSwipe } from "@/hooks/useSwipe";
import { usePunteroFino } from "@/hooks/usePunteroFino";
import { FollowerPointerCard } from "@/components/ui/following-pointer";
import type { Slide } from "@/types";
import ProgressBar from "./ProgressBar";
import Slide01Cover from "./slides/Slide01Cover";
import Slide02Problem from "./slides/Slide02Problem";
import Slide03Principles from "./slides/Slide03Principles";
import Slide04Loop from "./slides/Slide04Loop";
import Slide05Hills from "./slides/Slide05Hills";
import Slide06Playbacks from "./slides/Slide06Playbacks";
import Slide07SponsorUsers from "./slides/Slide07SponsorUsers";
import Slide08Roles from "./slides/Slide08Roles";
import Slide09CasoCitibank from "./slides/Slide09CasoCitibank";
import Slide10Impact from "./slides/Slide10Impact";
import Slide11Gracias from "./slides/Slide11Gracias";

const slides: Slide[] = [
  { id: "cover", label: "Portada", component: Slide01Cover },
  { id: "problem", label: "Por qué existe", component: Slide02Problem },
  { id: "principles", label: "Los principios", component: Slide03Principles },
  { id: "loop", label: "The Loop", component: Slide04Loop },
  { id: "hills", label: "Hills", component: Slide05Hills },
  { id: "playbacks", label: "Playbacks", component: Slide06Playbacks },
  { id: "sponsor-users", label: "Sponsor Users", component: Slide07SponsorUsers },
  { id: "roles", label: "Roles", component: Slide08Roles },
  { id: "caso-citibank", label: "El caso · Citibank", component: Slide09CasoCitibank },
  { id: "impact", label: "Resultados", component: Slide10Impact },
  { id: "gracias", label: "Gracias", component: Slide11Gracias },
];

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const total = slides.length;

  const onNext = useCallback(() => {
    setCurrentSlide((c) => Math.min(c + 1, total - 1));
  }, [total]);

  const onPrev = useCallback(() => {
    setCurrentSlide((c) => Math.max(c - 1, 0));
  }, []);

  const onReset = useCallback(() => {
    setCurrentSlide(0);
  }, []);

  useKeyboardShortcuts({ onNext, onPrev, onReset });
  const swipe = useSwipe({ onNext, onPrev });
  const punteroFino = usePunteroFino();

  const slide = slides[currentSlide];
  const SlideComponent = slide.component;

  const contenido = (
    <>
      <ProgressBar current={currentSlide} total={total} />

      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          className="absolute inset-0 overflow-y-auto overscroll-contain sm:overflow-hidden"
        >
          <SlideComponent />
        </motion.div>
      </AnimatePresence>

      {/* En el celular no hay teclado: se pasa con el dedo o con estos botones */}
      <div className="fixed bottom-4 left-4 right-4 z-40 flex items-center justify-between sm:hidden">
        <button
          onClick={onPrev}
          disabled={currentSlide === 0}
          aria-label="Slide anterior"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-bg-dark)]/80 text-lg text-white ring-1 ring-white/25 backdrop-blur-sm transition-opacity disabled:opacity-25"
        >
          ←
        </button>
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
          {String(currentSlide + 1).padStart(2, "0")}
          <span className="mx-1 text-[var(--color-divider)]">/</span>
          {String(total).padStart(2, "0")}
        </span>
        <button
          onClick={onNext}
          disabled={currentSlide === total - 1}
          aria-label="Slide siguiente"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-bg-dark)]/80 text-lg text-white ring-1 ring-white/25 backdrop-blur-sm transition-opacity disabled:opacity-25"
        >
          →
        </button>
      </div>

      <div className="fixed bottom-6 right-8 z-40 hidden font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-text-secondary)] pointer-events-none sm:block">
        {String(currentSlide + 1).padStart(2, "0")}
        <span className="mx-1 text-[var(--color-divider)]">/</span>
        {String(total).padStart(2, "0")}
      </div>
    </>
  );

  return (
    <main
      {...swipe}
      className="relative h-[100dvh] w-screen overflow-hidden bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]"
    >
      {punteroFino ? (
        <FollowerPointerCard title="Viernes de la Jungla" className="h-full w-full">
          {contenido}
        </FollowerPointerCard>
      ) : (
        <div className="h-full w-full">{contenido}</div>
      )}
    </main>
  );
}
