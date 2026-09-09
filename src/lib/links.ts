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
    title: "El ejemplo: IDEO · Oral-B",
    subtitle: "El cepillo de dientes para chicos, 1996",
    links: [
      {
        label: "El caso del cepillo infantil — dt-seminar.net",
        note: "Entraron a las casas a mirar a los chicos lavarse los dientes",
        url: "https://www.dt-seminar.net/content/summerterm2022/cases-2022/childrens-toothbrushes-design-thinking-oral-b/",
      },
      {
        label: "Cómo IDEO usa la observación para diseñar — UserTesting",
        url: "https://www.usertesting.com/blog/how-ideo-uses-customer-insights-to-design-innovative-products-users-love",
      },
      {
        label: "Design Thinking Examples: 3 Case Studies — Triangility",
        note: "De acá salió el caso, y trae otros dos: Airbnb y el Swiffer de P&G",
        url: "https://triangility.com/design-thinking-examples-3-case-studies/",
      },
      {
        label: "IDEO — Design Thinking",
        url: "https://designthinking.ideo.com/",
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

/**
 * Dónde vive el sitio cuando no estamos en localhost. Se usa para los QR: un
 * celular no puede abrir http://localhost:3000. **Actualizar después del deploy.**
 */
export const SITIO_PUBLICO = "https://ibm-design-thinking.vercel.app";

/** La URL absoluta de una ruta, sirva desde donde sirva la presentación. */
export function appUrl(path: string): string {
  if (typeof window === "undefined") return SITIO_PUBLICO + path;
  const { origin } = window.location;
  const esLocal = origin.includes("localhost") || origin.includes("127.0.0.1");
  return (esLocal ? SITIO_PUBLICO : origin) + path;
}
