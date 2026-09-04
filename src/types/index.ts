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
  | "case-ideo"
  | "impact"
  | "sources";

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
