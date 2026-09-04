/**
 * Fuentes de la presentación. Esta lista es la que se muestra en /fuentes y la
 * que apunta el QR de la anteúltima slide.
 */
export type Link = { label: string; note?: string; url: string };
export type LinkGroup = { title: string; subtitle: string; links: Link[] };

export const groups: LinkGroup[] = [
  {
    title: "IBM Enterprise Design Thinking",
    subtitle: "El framework, los principios, el Loop y las Keys",
    links: [
      {
        label: "¿Qué es Design Thinking? — IBM Think",
        url: "https://www.ibm.com/think/topics/design-thinking",
      },
      {
        label: "Enterprise Design Thinking — IBM Training",
        url: "https://www.ibm.com/training/enterprise-design-thinking",
      },
      {
        label: "El framework: principios, Loop y Keys",
        note: "De acá salen los 3 principios, el Loop y las 3 llaves",
        url: "https://www.ibm.com/training/enterprise-design-thinking/framework",
      },
      {
        label: "Badges y certificaciones gratuitas",
        note: "Practitioner (introductorio) y Co-Creator",
        url: "https://www.ibm.com/design/thinking/page/badges/",
      },
      {
        label: "El estudio de Forrester (Total Economic Impact)",
        note: "ROI +300%, −75% de tiempo de diseño, 2× time to market",
        url: "https://medium.com/design-ibm/a-new-study-on-design-thinking-is-great-news-for-designers-593f71b40627",
      },
      {
        label: "IBM Design Thinking Model — Designorate",
        url: "https://www.designorate.com/ibm-design-thinking/",
      },
      {
        label: "Adaptation and Adoption at Scale — This is Design Thinking",
        note: "Por qué el método clásico no escalaba en IBM",
        url: "https://thisisdesignthinking.net/2019/07/ibm-design-thinking-adaptation-adoption-at-scale/",
      },
    ],
  },
  {
    title: "Los tres ejemplos",
    subtitle: "Airbnb, IDEO y P&G",
    links: [
      {
        label: "Los tres casos juntos — Triangility",
        url: "https://triangility.com/design-thinking-examples-3-case-studies/",
      },
      {
        label: "Airbnb: How Design Thinking Transformed Airbnb — First Round Review",
        note: "Contado por Joe Gebbia, cofundador",
        url: "https://review.firstround.com/how-design-thinking-transformed-airbnb-from-failing-startup-to-billion-dollar-business/",
      },
      {
        label: "Airbnb: “Do Things That Don't Scale” — Paul Graham",
        note: "El mentor que los mandó a Nueva York con una cámara",
        url: "https://paulgraham.com/ds.html",
      },
      {
        label: "IDEO: cómo usa la observación para diseñar — UserTesting",
        url: "https://www.usertesting.com/blog/how-ideo-uses-customer-insights-to-design-innovative-products-users-love",
      },
      {
        label: "IDEO · Oral-B: el caso del cepillo infantil",
        note: "1996 · observaron a chicos reales lavándose los dientes",
        url: "https://www.dt-seminar.net/content/summerterm2022/cases-2022/childrens-toothbrushes-design-thinking-oral-b/",
      },
      {
        label: "P&G · Swiffer: “A pet project that went big” — The Boston Globe",
        note: "18 casas filmadas en Cincinnati y Boston con la consultora Continuum",
        url: "https://www.bostonglobe.com/business/2016/03/22/product-development-race-goes-swiffer/ddjA1UKErXX33B2Vx1rdsJ/story.html",
      },
      {
        label: "P&G · Swiffer: A Chain of Innovation — paper académico",
        url: "https://www.researchgate.net/publication/262574898_A_Chain_of_Innovation_The_Creation_of_Swiffer",
      },
    ],
  },
  {
    title: "La unidad",
    subtitle: "Agilidad Avanzada 2026 · Unidad 1: Design Thinking",
    links: [
      {
        label: "Design Council — Framework for Innovation (Double Diamond)",
        url: "https://www.designcouncil.org.uk/our-resources/framework-for-innovation/",
      },
      {
        label: "This is Service Design Doing — métodos",
        note: "Stickdorn et al.",
        url: "https://www.thisisservicedesigndoing.com/methods",
      },
      {
        label: "IDEO — Design Thinking",
        url: "https://designthinking.ideo.com/",
      },
      {
        label: "Design Kit — IDEO.org",
        url: "https://www.designkit.org/",
      },
    ],
  },
];

const SOURCES_PATH = "/fuentes";

/** Si presentás desde localhost el celular no puede entrar: cae al repo. */
export const PUBLIC_FALLBACK =
  "https://github.com/matiasgzlez/IBM-Design-Thinking/blob/main/FUENTES.md";

export function sourcesUrl(): string {
  if (typeof window === "undefined") return PUBLIC_FALLBACK;
  const { origin } = window.location;
  const isLocal = origin.includes("localhost") || origin.includes("127.0.0.1");
  return isLocal ? PUBLIC_FALLBACK : origin + SOURCES_PATH;
}
