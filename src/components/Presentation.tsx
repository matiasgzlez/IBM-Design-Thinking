"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { FollowerPointerCard } from "@/components/ui/following-pointer";
import type { Slide } from "@/types";
import ProgressBar from "./ProgressBar";
import Slide01Cover from "./slides/Slide01Cover";
import Slide02Problem from "./slides/Slide02Problem";
import Slide03Origins from "./slides/Slide03Origins";
import Slide04Principles from "./slides/Slide04Principles";
import Slide05Loop from "./slides/Slide05Loop";
import Slide06Keys from "./slides/Slide06Keys";
import Slide07Hills from "./slides/Slide07Hills";
import Slide08Playbacks from "./slides/Slide08Playbacks";
import Slide09SponsorUsers from "./slides/Slide09SponsorUsers";
import Slide10Roles from "./slides/Slide10Roles";
import Slide11CaseAirbnb from "./slides/Slide11CaseAirbnb";
import Slide12CaseIdeo from "./slides/Slide12CaseIdeo";
import Slide13CasePG from "./slides/Slide13CasePG";
import Slide14Impact from "./slides/Slide14Impact";
import Slide15Thanks from "./slides/Slide15Thanks";

const slides: Slide[] = [
  { id: "cover", label: "Portada", component: Slide01Cover },
  { id: "problem", label: "Por qué existe", component: Slide02Problem },
  { id: "origins", label: "De dónde viene", component: Slide03Origins },
  { id: "principles", label: "Los principios", component: Slide04Principles },
  { id: "loop", label: "The Loop", component: Slide05Loop },
  { id: "keys", label: "The Keys", component: Slide06Keys },
  { id: "hills", label: "Hills", component: Slide07Hills },
  { id: "playbacks", label: "Playbacks", component: Slide08Playbacks },
  { id: "sponsor-users", label: "Sponsor Users", component: Slide09SponsorUsers },
  { id: "roles", label: "Roles", component: Slide10Roles },
  { id: "case-airbnb", label: "Caso Airbnb", component: Slide11CaseAirbnb },
  { id: "case-ideo", label: "Caso IDEO", component: Slide12CaseIdeo },
  { id: "case-pg", label: "Caso P&G", component: Slide13CasePG },
  { id: "impact", label: "Resultados", component: Slide14Impact },
  { id: "thanks", label: "Gracias", component: Slide15Thanks },
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
