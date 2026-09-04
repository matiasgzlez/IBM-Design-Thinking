"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
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
import Slide09CaseIdeo from "./slides/Slide09CaseIdeo";
import Slide10Impact from "./slides/Slide10Impact";
import Slide11Fuentes from "./slides/Slide11Fuentes";

const slides: Slide[] = [
  { id: "cover", label: "Portada", component: Slide01Cover },
  { id: "problem", label: "Por qué existe", component: Slide02Problem },
  { id: "principles", label: "Los principios", component: Slide03Principles },
  { id: "loop", label: "The Loop", component: Slide04Loop },
  { id: "hills", label: "Hills", component: Slide05Hills },
  { id: "playbacks", label: "Playbacks", component: Slide06Playbacks },
  { id: "sponsor-users", label: "Sponsor Users", component: Slide07SponsorUsers },
  { id: "roles", label: "Roles", component: Slide08Roles },
  { id: "case-ideo", label: "El ejemplo", component: Slide09CaseIdeo },
  { id: "impact", label: "Resultados", component: Slide10Impact },
  { id: "sources", label: "Fuentes y cierre", component: Slide11Fuentes },
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

  const slide = slides[currentSlide];
  const SlideComponent = slide.component;

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      <FollowerPointerCard title="Viernes de la Jungla" className="h-full w-full">
        <ProgressBar current={currentSlide} total={total} />

        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0"
          >
            <SlideComponent />
          </motion.div>
        </AnimatePresence>

        <div className="fixed bottom-6 right-8 z-40 font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-text-secondary)] pointer-events-none">
          {String(currentSlide + 1).padStart(2, "0")}
          <span className="mx-1 text-[var(--color-divider)]">/</span>
          {String(total).padStart(2, "0")}
        </div>
      </FollowerPointerCard>
    </main>
  );
}
