import type { Metadata } from "next";
import Quiz from "@/components/Quiz";

export const metadata: Metadata = {
  title: "¿Entendiste IBM Design Thinking?",
  description:
    "Diez preguntas sobre la presentación de Viernes de la Jungla — Agilidad Avanzada, Unidad 1.",
};

export default function QuizPage() {
  return <Quiz />;
}
