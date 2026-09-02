import type { ComponentType } from "react";

export type SlideId =
  | "cover"
  | "problem"
  | "definition"
  | "origins"
  | "stages"
  | "principles"
  | "loop"
  | "keys"
  | "demo"
  | "impact"
  | "closing"
  | "thanks";

export interface Slide {
  id: SlideId;
  label: string;
  component: ComponentType;
}

export interface KeyboardShortcutHandlers {
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void;
}
