import type { ComponentType } from "react";

export type SlideId =
  | "cover"
  | "problem"
  | "principles"
  | "loop"
  | "keys"
  | "hills"
  | "playbacks"
  | "sponsor-users"
  | "roles"
  | "case-ideo"
  | "impact"
  | "sources"
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
