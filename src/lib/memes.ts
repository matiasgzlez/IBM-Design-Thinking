/**
 * Los memes de cada fase del Loop viven en public/loop/.
 * Basta con dejar el archivo con el nombre de la fase — observe, reflect o make —
 * y cualquiera de estas extensiones. La slide lo detecta sola al cargar.
 */
export type MemeSource = { url: string; kind: "image" | "video" };

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

/** Busca el meme de una fase probando las extensiones posibles. */
export async function findMeme(name: string): Promise<MemeSource | null> {
  for (const ext of IMAGE_EXT) {
    const url = `/loop/${name}.${ext}`;
    if (await probeImage(url)) return { url, kind: "image" };
  }
  for (const ext of VIDEO_EXT) {
    const url = `/loop/${name}.${ext}`;
    if (await probeVideo(url)) return { url, kind: "video" };
  }
  return null;
}
