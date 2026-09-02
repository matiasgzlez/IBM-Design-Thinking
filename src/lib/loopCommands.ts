import type { Dispatch } from "react";
import type { ConsoleLine, ProjectAction, ProjectState } from "@/types/loop";

const HELP_TEXT = [
  "Comandos disponibles:",
  "  edt sponsor-users --recruit    reclutar usuarios reales",
  "  edt observe --in-context       observación en el contexto del usuario",
  "  edt reflect --synthesize       sintetizar los hallazgos en equipo",
  "  edt hill --write               escribir el Hill (who · what · wow)",
  "  edt make --prototype           dar forma concreta a la idea",
  "  edt playback                   playback con los stakeholders",
  "  edt loop --iterate             volver a empezar el Loop",
  "  edt status | help | clear | reset",
];

export type ExecuteResult = { success: boolean };

export function executeCommand(
  input: string,
  state: ProjectState,
  dispatch: Dispatch<ProjectAction>,
): ExecuteResult {
  const trimmed = input.trim().replace(/\s+/g, " ");
  const append = (line: ConsoleLine) => dispatch({ type: "APPEND_LINE", line });

  if (!trimmed) return { success: false };

  if (trimmed === "help" || trimmed === "edt help") {
    HELP_TEXT.forEach((text) => append({ type: "output", text }));
    return { success: true };
  }

  if (trimmed === "clear") {
    dispatch({ type: "CLEAR_CONSOLE" });
    return { success: true };
  }

  if (trimmed === "reset" || trimmed === "edt reset") {
    dispatch({ type: "RESET" });
    return { success: true };
  }

  if (trimmed === "edt status") {
    append({ type: "output", text: `fase actual: ${state.phase} · iteración ${state.iteration}` });
    append({
      type: "output",
      text: `sponsor users: ${state.sponsorUsers.length} · insights: ${state.insights.length} · prototipos: ${state.prototypes.length} · playbacks: ${state.playbacks.length}`,
    });
    append({
      type: "output",
      text: state.hill
        ? `hill: ${state.hill.who} → ${state.hill.what}`
        : "hill: todavía no está escrito",
    });
    return { success: true };
  }

  // ── OBSERVE ────────────────────────────────────────────────
  if (/^edt sponsor-users(\s|$)/.test(trimmed)) {
    if (state.sponsorUsers.length > 0) {
      append({ type: "note", text: "Ya tenés sponsor users en el equipo." });
      return { success: false };
    }
    const users = ["Ana · cajera", "Marcos · supervisor", "Lucía · soporte"];
    dispatch({ type: "RECRUIT_SPONSORS", users });
    append({ type: "output", text: "Buscando usuarios reales del proceso…" });
    users.forEach((u) => append({ type: "output", text: `  + ${u}` }));
    append({
      type: "success",
      text: "3 sponsor users sumados al equipo. No hablan por el usuario: son el usuario.",
    });
    return { success: true };
  }

  if (/^edt observe(\s|$)/.test(trimmed)) {
    if (state.sponsorUsers.length === 0) {
      append({
        type: "error",
        text: "No hay a quién observar. Primero: edt sponsor-users --recruit",
      });
      return { success: false };
    }
    const first = state.insights.length === 0;
    const insights = first
      ? [
          "Anotan los pedidos en papel antes de cargarlos",
          "Reingresan los mismos datos en 2 sistemas",
          "El 40% del turno se va en corregir errores de carga",
          "Nadie usa el buscador: no confían en el resultado",
        ]
      : [
          "El flujo nuevo se entiende, pero el paso 3 confunde",
          "Piden ver el estado sin tener que buscarlo",
        ];
    dispatch({ type: "ADD_INSIGHTS", insights });
    append({ type: "output", text: "Observando en el contexto real (sin encuestas, sin supuestos)…" });
    insights.forEach((i) => append({ type: "output", text: `  · ${i}` }));
    append({
      type: "success",
      text: `${insights.length} insights registrados. Fase: OBSERVE.`,
    });
    return { success: true };
  }

  // ── REFLECT ────────────────────────────────────────────────
  if (/^edt reflect(\s|$)/.test(trimmed)) {
    if (state.insights.length === 0) {
      append({
        type: "error",
        text: "No hay nada que sintetizar. Primero: edt observe --in-context",
      });
      return { success: false };
    }
    dispatch({ type: "SET_PHASE", phase: "reflect" });
    append({ type: "output", text: "Agrupando insights en el as-is scenario…" });
    append({ type: "output", text: "  cluster 1 · doble carga de datos" });
    append({ type: "output", text: "  cluster 2 · falta de confianza en el sistema" });
    append({
      type: "success",
      text: "El problema real no era la velocidad: era la desconfianza. Fase: REFLECT.",
    });
    return { success: true };
  }

  if (/^edt hill(\s|$)/.test(trimmed)) {
    if (state.insights.length === 0) {
      append({
        type: "error",
        text: "Un Hill sin observación es una suposición. Primero: edt observe --in-context",
      });
      return { success: false };
    }
    dispatch({
      type: "SET_HILL",
      hill: {
        who: "Una cajera de sucursal",
        what: "puede cerrar una operación sin reingresar datos",
        wow: "en menos de 30 segundos y sin pedir ayuda",
      },
    });
    append({ type: "output", text: "Escribiendo el Hill…" });
    append({ type: "output", text: "  WHO   Una cajera de sucursal" });
    append({ type: "output", text: "  WHAT  puede cerrar una operación sin reingresar datos" });
    append({ type: "output", text: "  WOW   en menos de 30 segundos y sin pedir ayuda" });
    append({
      type: "success",
      text: "Hill definido: dice a dónde llegamos, no cómo construirlo.",
    });
    return { success: true };
  }

  // ── MAKE ───────────────────────────────────────────────────
  if (/^edt make(\s|$)/.test(trimmed)) {
    if (!state.hill) {
      append({
        type: "error",
        text: "Sin Hill no sabemos hacia dónde. Primero: edt hill --write",
      });
      return { success: false };
    }
    const version = `v${state.prototypes.length + 1}`;
    dispatch({ type: "ADD_PROTOTYPE", label: version });
    append({ type: "output", text: `Construyendo prototipo ${version} (papel + clickable)…` });
    append({ type: "output", text: "  descartable · barato · testeable mañana" });
    append({
      type: "success",
      text: "Cuanto antes hacés, más rápido aprendés. Fase: MAKE.",
    });
    return { success: true };
  }

  // ── PLAYBACK ───────────────────────────────────────────────
  if (/^edt playback(\s|$)/.test(trimmed)) {
    if (state.prototypes.length === 0) {
      append({
        type: "error",
        text: "Un playback necesita algo que mostrar. Primero: edt make --prototype",
      });
      return { success: false };
    }
    const isFinal = trimmed.includes("--final");
    const label = `playback ${state.playbacks.length + 1}`;
    dispatch({ type: "ADD_PLAYBACK", label });
    append({ type: "output", text: "Contando la historia del usuario a stakeholders…" });

    if (isFinal) {
      dispatch({ type: "SHIP" });
      append({ type: "output", text: "  sponsor users: “esto sí es lo que hacemos todos los días”" });
      append({ type: "output", text: "  negocio: outcome del Hill alcanzado" });
      append({
        type: "success",
        text: "Playback final aprobado. El Loop no termina: vuelve a empezar con usuarios reales.",
      });
    } else {
      append({ type: "output", text: "  feedback: “el paso 3 no se entiende”" });
      append({ type: "output", text: "  desalineación detectada entre negocio y soporte" });
      append({
        type: "success",
        text: "Mejor descubrirlo hoy que en producción. Fase: REFLECT.",
      });
    }
    return { success: true };
  }

  // ── ITERAR ─────────────────────────────────────────────────
  if (/^edt loop(\s|$)/.test(trimmed) || /^edt iterate(\s|$)/.test(trimmed)) {
    if (state.playbacks.length === 0) {
      append({
        type: "error",
        text: "Todavía no hay feedback para iterar. Primero: edt playback",
      });
      return { success: false };
    }
    dispatch({ type: "NEXT_ITERATION" });
    append({ type: "output", text: "Volviendo al principio del Loop con lo aprendido…" });
    append({
      type: "success",
      text: `Iteración ${state.iteration + 1}. Todo es un prototipo.`,
    });
    return { success: true };
  }

  append({
    type: "error",
    text: `comando no reconocido: ${trimmed}. Escribí "help".`,
  });
  return { success: false };
}
