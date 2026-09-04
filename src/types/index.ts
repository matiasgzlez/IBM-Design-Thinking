import type { ComponentType } from "react";

export type SlideId =
  | "cover"
  | "problem"
  | "origins"
  | "principles"
  | "loop"
  | "keys"
  | "hills"
  | "playbacks"
  | "sponsor-users"
  | "roles"
  | "case-airbnb"
  | "case-ideo"
  | "case-pg"
  | "impact"
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
