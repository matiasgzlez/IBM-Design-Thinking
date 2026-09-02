"use client";

import { useReducer } from "react";
import type { Artifact, ProjectAction, ProjectState } from "@/types/loop";

export const initialProjectState: ProjectState = {
  phase: "observe",
  iteration: 1,
  sponsorUsers: [],
  insights: [],
  prototypes: [],
  playbacks: [],
  hill: null,
  artifacts: [],
  consoleHistory: [],
  shipped: false,
};

function artifact(phase: Artifact["phase"], label: string, seed: number): Artifact {
  return { id: `${phase}-${seed}-${label}`, phase, label };
}

function projectReducer(state: ProjectState, action: ProjectAction): ProjectState {
  switch (action.type) {
    case "SET_PHASE":
      return { ...state, phase: action.phase };

    case "RECRUIT_SPONSORS":
      return {
        ...state,
        phase: "observe",
        sponsorUsers: [...state.sponsorUsers, ...action.users],
        artifacts: [
          ...state.artifacts,
          ...action.users.map((u, i) =>
            artifact("observe", u, state.artifacts.length + i),
          ),
        ],
      };

    case "ADD_INSIGHTS":
      return {
        ...state,
        phase: "observe",
        insights: [...state.insights, ...action.insights],
        artifacts: [
          ...state.artifacts,
          ...action.insights.map((ins, i) =>
            artifact("observe", ins, state.artifacts.length + i),
          ),
        ],
      };

    case "SET_HILL":
      return {
        ...state,
        phase: "reflect",
        hill: action.hill,
        artifacts: [
          ...state.artifacts,
          artifact("reflect", "hill", state.artifacts.length),
        ],
      };

    case "ADD_PROTOTYPE":
      return {
        ...state,
        phase: "make",
        prototypes: [...state.prototypes, action.label],
        artifacts: [
          ...state.artifacts,
          artifact("make", action.label, state.artifacts.length),
        ],
      };

    case "ADD_PLAYBACK":
      return {
        ...state,
        phase: "reflect",
        playbacks: [...state.playbacks, action.label],
        artifacts: [
          ...state.artifacts,
          artifact("reflect", action.label, state.artifacts.length),
        ],
      };

    case "NEXT_ITERATION":
      return { ...state, phase: "observe", iteration: state.iteration + 1 };

    case "SHIP":
      return { ...state, shipped: true };

    case "APPEND_LINE":
      return { ...state, consoleHistory: [...state.consoleHistory, action.line] };

    case "CLEAR_CONSOLE":
      return { ...state, consoleHistory: [] };

    case "RESET":
      return { ...initialProjectState, consoleHistory: [] };

    default:
      return state;
  }
}

export function useLoopState() {
  return useReducer(projectReducer, initialProjectState);
}
