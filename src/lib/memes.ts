/**
 * Las imágenes y memes de las slides viven en public/ y se buscan por nombre:
 * `loop/observe`, `keys/hills`, etc. Basta con dejar el archivo con cualquiera
 * de estas extensiones — la slide lo detecta sola al cargar.
 */
export type MemeSource = { url: string; kind: "image" | "video" };

/**
 * Sello por carga de página: evita que el navegador conteste con un archivo
 * viejo que ya no está en la carpeta (o que se lo pierda si lo acabás de poner).
 */
const CACHE_BUST = typeof window === "undefined" ? "" : `?v=${Date.now()}`;

const IMAGE_EXT = ["png", "jpg", "jpeg", "webp", "gif", "avif"];
const VIDEO_EXT = ["mp4", "webm"];

function probeImage(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

function probeVideo(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.onloadedmetadata = () => resolve(true);
    video.onerror = () => resolve(false);
    video.src = url;
  });
}

/** Busca el archivo de un slot probando las extensiones posibles. */
export async function findMedia(slot: string): Promise<MemeSource | null> {
  for (const ext of IMAGE_EXT) {
    const url = `/${slot}.${ext}${CACHE_BUST}`;
    if (await probeImage(url)) return { url, kind: "image" };
  }
  for (const ext of VIDEO_EXT) {
    const url = `/${slot}.${ext}${CACHE_BUST}`;
    if (await probeVideo(url)) return { url, kind: "video" };
  }
  return null;
}
