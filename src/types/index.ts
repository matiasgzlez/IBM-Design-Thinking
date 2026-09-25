import type { ComponentType } from "react";

export type SlideId =
  | "cover"
  | "problem"
  | "principles"
  | "loop"
  | "hills"
  | "playbacks"
  | "sponsor-users"
  | "roles"
  | "caso-encargo"
  | "caso-insight"
  | "caso-resultado"
  | "caso-citibank"
  | "impact"
  | "gracias";

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
