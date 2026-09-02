export type LoopPhase = "observe" | "reflect" | "make";

export type ConsoleLine = {
  type: "command" | "output" | "success" | "error" | "note";
  text: string;
};

export type Artifact = {
  id: string;
  phase: LoopPhase;
  label: string;
};

export interface Hill {
  who: string;
  what: string;
  wow: string;
}

export interface ProjectState {
  phase: LoopPhase;
  iteration: number;
  sponsorUsers: string[];
  insights: string[];
  prototypes: string[];
  playbacks: string[];
  hill: Hill | null;
  artifacts: Artifact[];
  consoleHistory: ConsoleLine[];
  shipped: boolean;
}

export type ProjectAction =
  | { type: "SET_PHASE"; phase: LoopPhase }
  | { type: "RECRUIT_SPONSORS"; users: string[] }
  | { type: "ADD_INSIGHTS"; insights: string[] }
  | { type: "SET_HILL"; hill: Hill }
  | { type: "ADD_PROTOTYPE"; label: string }
  | { type: "ADD_PLAYBACK"; label: string }
  | { type: "NEXT_ITERATION" }
  | { type: "SHIP" }
  | { type: "APPEND_LINE"; line: ConsoleLine }
  | { type: "CLEAR_CONSOLE" }
  | { type: "RESET" };
