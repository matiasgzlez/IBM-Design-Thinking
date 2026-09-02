"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { FollowerPointerCard } from "@/components/ui/following-pointer";
import type { Slide } from "@/types";
import ProgressBar from "./ProgressBar";
import Slide01Cover from "./slides/Slide01Cover";
import Slide02Problem from "./slides/Slide02Problem";
import Slide03Definition from "./slides/Slide03Definition";
import Slide04Origins from "./slides/Slide04Origins";
import Slide05Stages from "./slides/Slide05Stages";
import Slide06Principles from "./slides/Slide06Principles";
import Slide07Loop from "./slides/Slide07Loop";
import Slide08Keys from "./slides/Slide08Keys";
import Slide09Hills from "./slides/Slide09Hills";
import Slide10Playbacks from "./slides/Slide10Playbacks";
import Slide11SponsorUsers from "./slides/Slide11SponsorUsers";
import Slide12Roles from "./slides/Slide12Roles";
import Slide13CaseAirbnb from "./slides/Slide13CaseAirbnb";
import Slide14CaseIdeo from "./slides/Slide14CaseIdeo";
import Slide15CasePG from "./slides/Slide15CasePG";
import Slide16Impact from "./slides/Slide16Impact";
import Slide17Context from "./slides/Slide17Context";
import Slide18Closing from "./slides/Slide18Closing";
import Slide19Thanks from "./slides/Slide19Thanks";

const slides: Slide[] = [
  { id: "cover", label: "Portada", component: Slide01Cover },
  { id: "problem", label: "Por qué existe", component: Slide02Problem },
  { id: "definition", label: "Qué es", component: Slide03Definition },
  { id: "origins", label: "De dónde viene", component: Slide04Origins },
  { id: "stages", label: "El proceso", component: Slide05Stages },
  { id: "principles", label: "Los principios", component: Slide06Principles },
  { id: "loop", label: "The Loop", component: Slide07Loop },
  { id: "keys", label: "The Keys", component: Slide08Keys },
  { id: "hills", label: "Hills", component: Slide09Hills },
  { id: "playbacks", label: "Playbacks", component: Slide10Playbacks },
  { id: "sponsor-users", label: "Sponsor Users", component: Slide11SponsorUsers },
  { id: "roles", label: "Roles", component: Slide12Roles },
  { id: "case-airbnb", label: "Caso Airbnb", component: Slide13CaseAirbnb },
  { id: "case-ideo", label: "Caso IDEO", component: Slide14CaseIdeo },
  { id: "case-pg", label: "Caso P&G", component: Slide15CasePG },
  { id: "impact", label: "Resultados", component: Slide16Impact },
  { id: "context", label: "Dónde encaja", component: Slide17Context },
  { id: "closing", label: "Cierre", component: Slide18Closing },
  { id: "thanks", label: "Gracias", component: Slide19Thanks },
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
