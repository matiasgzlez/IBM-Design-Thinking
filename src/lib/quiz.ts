/**
 * Las preguntas del juego que abre el QR del cierre. Salen todas de algo que
 * se dijo en la presentación: si alguien la siguió, las contesta.
 */
export type Pregunta = {
  pregunta: string;
  opciones: string[];
  correcta: number;
  explicacion: string;
};

export const preguntas: Pregunta[] = [
  {
    pregunta: "¿Por qué IBM tuvo que reinventar el Design Thinking clásico?",
    opciones: [
      "Porque estaba pensado para talleres chicos y no escalaba a una empresa de cientos de miles de personas",
      "Porque era demasiado caro de aplicar",
      "Porque los usuarios no querían participar de las entrevistas",
    ],
    correcta: 0,
    explicacion:
      "Además, los equipos ágiles lo leían como volver al waterfall: una etapa larga de análisis antes de escribir código.",
  },
  {
    pregunta: "Las tres fases del Loop son…",
    opciones: [
      "Planificar, ejecutar y medir",
      "Observar, reflexionar y hacer",
      "Investigar, diseñar y entregar",
    ],
    correcta: 1,
    explicacion:
      "Y no terminan nunca: lo que sale de Hacer vuelve a alimentar la próxima observación.",
  },
  {
    pregunta: "Un Hill se escribe con tres partes. ¿Cuáles?",
    opciones: ["Problema, solución y métrica", "Qué, cómo y cuándo", "Who, what y wow"],
    correcta: 2,
    explicacion:
      "Quién es el usuario, qué va a poder lograr y qué haría que el resultado sea sorprendente.",
  },
  {
    pregunta: "¿Cuál de estas frases es un Hill?",
    opciones: [
      "“Reproductor MP3 de 5 GB, batería de 10 horas y sincronización por FireWire”",
      "“1.000 canciones en tu bolsillo”",
      "“Rediseñar la app de música para el tercer trimestre”",
    ],
    correcta: 1,
    explicacion:
      "La primera es una lista de funcionalidades y la tercera es una tarea con fecha. Solo la del medio dice qué logra el usuario.",
  },
  {
    pregunta: "¿Para qué sirven los Playbacks?",
    opciones: [
      "Para alinear expectativas con los stakeholders antes, durante y al final de la construcción",
      "Para medir la velocidad del equipo en cada sprint",
      "Para dejar grabadas las reuniones y poder repasarlas",
    ],
    correcta: 0,
    explicacion:
      "Sin playbacks, el stakeholder ve el producto el día que llega la caja — y ahí ya es tarde para corregir.",
  },
  {
    pregunta: "De los cuatro tipos de Playback, ¿cuál se repite en cada sprint?",
    opciones: ["El Hills Playback", "El Playback Zero", "Los Delivery Playbacks"],
    correcta: 2,
    explicacion:
      "El Hills Playback valida los objetivos antes de construir y el Playback Zero muestra la primera propuesta. Los Delivery se repiten sin parar.",
  },
  {
    pregunta: "Un Sponsor User es…",
    opciones: [
      "Alguien del equipo que representa al usuario en las reuniones",
      "El cliente que paga el proyecto",
      "Un usuario real que participa del proyecto desde el día uno",
    ],
    correcta: 2,
    explicacion:
      "La regla de IBM: al menos un Sponsor User asignado a cada Hill. Y no aparece al final solo para aprobar.",
  },
  {
    pregunta: "En el caso de Oral-B e IDEO, ¿qué descubrieron al observar a los chicos?",
    opciones: [
      "Que agarran el cepillo con el puño, porque todavía no tienen desarrollada la motricidad fina",
      "Que preferían los cepillos de colores llamativos",
      "Que necesitaban cepillos todavía más chicos",
    ],
    correcta: 0,
    explicacion:
      "Por eso el mango grueso y antideslizante: fue el más vendido de Estados Unidos por 18 meses y hoy es el estándar.",
  },
  {
    pregunta: "En Enterprise Design Thinking, ¿qué le toca al liderazgo?",
    opciones: [
      "Diseñar la solución y bajarla al equipo para que la construya",
      "Habilitar: dar autonomía, armar equipos diversos y medir outcomes en vez de entregas",
      "Aprobar cada decisión del equipo antes de que avance",
    ],
    correcta: 1,
    explicacion:
      "El equipo ejecuta: construye empatía con el usuario, integra las visiones y toma la iniciativa.",
  },
  {
    pregunta: "Según el estudio de Forrester, ¿cuánto se redujo el tiempo de diseño y desarrollo?",
    opciones: ["Un 25%", "Un 50%", "Un 75%"],
    correcta: 2,
    explicacion:
      "Los ciclos pasaron de 6-8 meses a 3-4 meses por lanzamiento, con un ROI de más del 300%.",
  },
];

export const resultados = [
  {
    minimo: 9,
    titulo: "Sos un Sponsor User.",
    texto: "Entendiste el método completo: los principios, el Loop y las tres llaves.",
  },
  {
    minimo: 6,
    titulo: "Tenés el Loop.",
    texto: "Lo esencial está. Repasá las llaves —Hills, Playbacks y Sponsor Users— y quedás.",
  },
  {
    minimo: 0,
    titulo: "Volvé a Observe.",
    texto: "Todo es un prototipo, también esto: date otra vuelta por la presentación y probá de nuevo.",
  },
];
