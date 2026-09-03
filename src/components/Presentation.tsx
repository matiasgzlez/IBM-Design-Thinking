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
import Slide04Stages from "./slides/Slide04Stages";
import Slide05Principles from "./slides/Slide05Principles";
import Slide06Loop from "./slides/Slide06Loop";
import Slide07Keys from "./slides/Slide07Keys";
import Slide08Hills from "./slides/Slide08Hills";
import Slide09Playbacks from "./slides/Slide09Playbacks";
import Slide10SponsorUsers from "./slides/Slide10SponsorUsers";
import Slide11Roles from "./slides/Slide11Roles";
import Slide12CaseAirbnb from "./slides/Slide12CaseAirbnb";
import Slide13CaseIdeo from "./slides/Slide13CaseIdeo";
import Slide14CasePG from "./slides/Slide14CasePG";
import Slide15Impact from "./slides/Slide15Impact";
import Slide16Context from "./slides/Slide16Context";
import Slide17Closing from "./slides/Slide17Closing";
import Slide18Thanks from "./slides/Slide18Thanks";

const slides: Slide[] = [
  { id: "cover", label: "Portada", component: Slide01Cover },
  { id: "problem", label: "Por qué existe", component: Slide02Problem },
  { id: "origins", label: "De dónde viene", component: Slide03Origins },
  { id: "stages", label: "El proceso", component: Slide04Stages },
  { id: "principles", label: "Los principios", component: Slide05Principles },
  { id: "loop", label: "The Loop", component: Slide06Loop },
  { id: "keys", label: "The Keys", component: Slide07Keys },
  { id: "hills", label: "Hills", component: Slide08Hills },
  { id: "playbacks", label: "Playbacks", component: Slide09Playbacks },
  { id: "sponsor-users", label: "Sponsor Users", component: Slide10SponsorUsers },
  { id: "roles", label: "Roles", component: Slide11Roles },
  { id: "case-airbnb", label: "Caso Airbnb", component: Slide12CaseAirbnb },
  { id: "case-ideo", label: "Caso IDEO", component: Slide13CaseIdeo },
  { id: "case-pg", label: "Caso P&G", component: Slide14CasePG },
  { id: "impact", label: "Resultados", component: Slide15Impact },
  { id: "context", label: "Dónde encaja", component: Slide16Context },
  { id: "closing", label: "Cierre", component: Slide17Closing },
  { id: "thanks", label: "Gracias", component: Slide18Thanks },
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
