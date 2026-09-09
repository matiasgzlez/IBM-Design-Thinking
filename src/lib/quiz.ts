/**
 * Las preguntas del juego que abre el QR del cierre. No preguntan qué dijimos
 * en la presentación: plantean una situación y hay que aplicar el método.
 * Cuatro opciones cada una, así el azar rinde 25% y no 33%.
 */
export type Pregunta = {
  pregunta: string;
  opciones: string[];
  correcta: number;
  explicacion: string;
  /** Archivo en public/stickers/. Se gana al responder bien. */
  sticker: string;
  /** A quién representa el sticker: es el chiste. */
  nombre: string;
};

export const preguntas: Pregunta[] = [
  {
    pregunta:
      "Un equipo escribió: “El usuario puede exportar reportes en PDF, Excel y CSV desde el panel”. ¿Por qué esto todavía no es un Hill?",
    opciones: [
      "Porque no aclara en qué sprint se entrega",
      "Porque describe lo que hace el sistema, no lo que logra el usuario ni qué lo hace sorprendente",
      "Porque debería nombrar la tecnología que se va a usar",
      "Ya es un Hill: nombra al usuario y lo que puede hacer",
    ],
    correcta: 1,
    explicacion:
      "Un Hill se escribe como un outcome: quién, qué logra y el wow. Ese texto es una lista de formatos de exportación.",
    sticker: "stickers/01",
    nombre: "Sponsor User de la parrilla",
  },
  {
    pregunta: "Un equipo definió nueve Hills para un proyecto de seis meses. ¿Qué le dirías?",
    opciones: [
      "Que son demasiados: IBM recomienda un máximo de tres, el resto del esfuerzo va a la Foundation",
      "Que están bien mientras cada uno tenga su Sponsor User",
      "Que le faltan: cuantos más objetivos, más claro el rumbo",
      "Que los divida en Hills chicos, uno por sprint",
    ],
    correcta: 0,
    explicacion:
      "Con nueve objetivos “prioritarios” no hay ninguno. El resto del trabajo es Foundation: mantenimiento y base.",
    sticker: "stickers/02",
    nombre: "Modo pileta",
  },
  {
    pregunta:
      "Para un sistema de gestión de guardias médicas, el equipo sumó como Sponsor User al gerente de sistemas del hospital. ¿Cuál es el problema?",
    opciones: [
      "Ninguno: es quien mejor conoce la infraestructura del hospital",
      "Que debería haber al menos dos personas, no una",
      "Que no es representativo: el usuario final es quien arma y cubre las guardias, no quien administra los sistemas",
      "Que un gerente no puede participar de sesiones de diseño",
    ],
    correcta: 2,
    explicacion:
      "El Sponsor User tiene que ser un usuario final real. El gerente aporta contexto, pero no vive el problema todos los días.",
    sticker: "stickers/03",
    nombre: "Playback aprobado por Vero",
  },
  {
    pregunta:
      "El equipo juntó cuarenta notas de campo, las agrupó en cuatro patrones y decidió por dónde arrancar. ¿En qué parte del Loop está?",
    opciones: ["Observe", "Reflect", "Make", "Todavía en ninguna: eso es previo al Loop"],
    correcta: 1,
    explicacion:
      "Observe es salir a mirar; Reflect es lo que pasa después: integrar lo aprendido y definir los próximos pasos.",
    sticker: "stickers/04",
    nombre: "Modo reflexión",
  },
  {
    pregunta:
      "El gerente aprueba personalmente cada cambio de diseño antes de que el equipo lo implemente. ¿Qué principio se está rompiendo?",
    opciones: [
      "Foco en los resultados del usuario",
      "Reinvención incansable",
      "Ninguno: es su responsabilidad como líder",
      "Equipos diversos y empoderados",
    ],
    correcta: 3,
    explicacion:
      "El liderazgo habilita: arma el equipo y le da autoridad para decidir. Aprobar todo lo convierte en un cuello de botella.",
    sticker: "stickers/05",
    nombre: "El comité de las hamburguesas",
  },
  {
    pregunta:
      "El tablero del equipo muestra “32 funcionalidades entregadas este trimestre”. Según EDT, ¿qué debería estar midiendo?",
    opciones: [
      "Cuánto mejoró el usuario en aquello que venía a hacer",
      "La cantidad de sprints cerrados en fecha",
      "Los defectos reportados por release",
      "La cantidad de features respecto de la competencia",
    ],
    correcta: 0,
    explicacion:
      "“No nos miden por las funcionalidades que entregamos, sino por qué tan bien resolvemos las necesidades de nuestros usuarios.”",
    sticker: "stickers/06",
    nombre: "Minoli modo TED talk",
  },
  {
    pregunta:
      "Si IDEO se hubiera quedado en la oficina y hubiera mandado una encuesta a los padres, ¿qué se habría perdido?",
    opciones: [
      "El precio que las familias estaban dispuestas a pagar",
      "Los colores que prefieren los chicos",
      "El puño: nadie declara cómo agarra un cepillo, eso solo se descubre mirando",
      "La cantidad de veces por día que se lavan los dientes",
    ],
    correcta: 2,
    explicacion:
      "Observe existe justamente para eso: hay comportamiento que el usuario no sabe que tiene y por lo tanto nunca te va a contar.",
    sticker: "stickers/07",
    nombre: "",
  },
  {
    pregunta:
      "Terminaron el tercer sprint y quieren mostrar el avance real a los stakeholders. ¿Qué momento corresponde?",
    opciones: ["Hills Playback", "Playback Zero", "Client Playback", "Delivery Playback"],
    correcta: 3,
    explicacion:
      "El Hills Playback valida los objetivos antes de construir y el Playback Zero presenta la primera propuesta. Los Delivery se repiten sprint a sprint.",
    sticker: "stickers/08",
    nombre: "",
  },
  {
    pregunta:
      "Antes de construir un flujo nuevo, el equipo quiere saber si funciona. ¿Qué haría Enterprise Design Thinking?",
    opciones: [
      "Un documento de especificación funcional aprobado por todas las áreas",
      "Un prototipo rápido y descartable puesto frente a usuarios reales",
      "Esperar al final del sprint y mostrar la versión terminada",
      "Una reunión con los referentes de cada área para consensuar el flujo",
    ],
    correcta: 1,
    explicacion:
      "Make: dar forma tangible para validar. Cuanto antes hacés, más rápido aprendés — y más barato sale equivocarse.",
    sticker: "stickers/09",
    nombre: "",
  },
  {
    pregunta:
      "El producto salió, las métricas son buenas y el equipo quiere cerrar el proyecto. ¿Qué diría el principio de reinvención incansable?",
    opciones: [
      "Que hay que congelar el diseño para no romper lo que ya funciona",
      "Que el proyecto puede cerrarse y el equipo pasar al siguiente",
      "Que conviene esperar seis meses y recién ahí revisar",
      "Que lo entregado sigue siendo un prototipo: la próxima iteración empieza ahora",
    ],
    correcta: 3,
    explicacion:
      "Ningún producto está terminado. Cada entrega es una hipótesis en evolución que se vuelve a poner a prueba.",
    sticker: "stickers/10",
    nombre: "",
  },
];

/** El mensaje según cómo le fue. */
export const resultados = [
  {
    minimo: 10,
    titulo: "Diez de diez.",
    texto: "Te llevaste la colección completa. No te queda nada por repasar.",
  },
  {
    minimo: 8,
    titulo: "Sos un Sponsor User.",
    texto: "No solo entendiste el método: sabés aplicarlo a una situación que no viste antes.",
  },
  {
    minimo: 5,
    titulo: "Tenés el Loop.",
    texto: "Lo esencial está. Repasá las tres llaves —Hills, Playbacks y Sponsor Users— y quedás.",
  },
  {
    minimo: 0,
    titulo: "Volvé a Observe.",
    texto: "Todo es un prototipo, también esto: date otra vuelta por la presentación y probá de nuevo.",
  },
];
