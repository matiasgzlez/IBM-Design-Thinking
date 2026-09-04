import type { Metadata } from "next";
import { groups } from "@/lib/links";

export const metadata: Metadata = {
  title: "Fuentes · IBM Design Thinking",
  description:
    "Links de referencia de la presentación de Viernes de la Jungla — Agilidad Avanzada, Unidad 1.",
};

export default function FuentesPage() {
  return (
    <main className="min-h-screen w-full bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] px-6 py-12 sm:px-10 md:px-16 lg:px-24">
      <div className="mx-auto max-w-3xl">
        <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.24em] text-[var(--color-accent)]">
          Viernes de la Jungla · Agilidad Avanzada · Unidad 1
        </span>

        <h1 className="mt-4 font-black leading-[0.92] tracking-[-0.04em] text-[clamp(38px,9vw,64px)]">
          Fuentes y <span className="text-[var(--color-accent)]">links</span>
        </h1>

        <p className="mt-5 text-lg sm:text-xl text-[var(--color-text-secondary)] leading-snug">
          Todo lo que usamos para armar la presentación sobre IBM Enterprise Design Thinking,
          más los links para sacar los badges gratuitos de IBM.
        </p>

        {/* Volver a la presentación */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="/"
            className="flex-1 rounded-xl bg-[var(--color-accent)] px-6 py-5 text-white transition-opacity hover:opacity-90"
          >
            <span className="block font-mono text-xs uppercase tracking-[0.2em] text-white/70">
              Volver a verla
            </span>
            <span className="mt-1 block text-xl font-bold leading-snug">
              La presentación completa →
            </span>
          </a>
          <a
            href="https://github.com/matiasgzlez/IBM-Design-Thinking"
            target="_blank"
            rel="noreferrer"
            className="flex-1 rounded-xl border border-[var(--color-divider)] px-6 py-5 transition-colors hover:border-[var(--color-accent)]"
          >
            <span className="block font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">
              El código
            </span>
            <span className="mt-1 block text-xl font-bold leading-snug">
              Repositorio en GitHub →
            </span>
          </a>
        </div>

        {groups.map((group) => (
          <section key={group.title} className="mt-12">
            <h2 className="font-black text-2xl sm:text-3xl uppercase tracking-tight leading-none">
              {group.title}
            </h2>
            <p className="mt-1.5 font-mono text-xs sm:text-sm uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
              {group.subtitle}
            </p>

            <ul className="mt-6 flex flex-col gap-3">
              {group.links.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-xl border border-[var(--color-divider)] px-5 py-4 transition-colors hover:border-[var(--color-accent)] active:border-[var(--color-accent)]"
                  >
                    <span className="block text-lg sm:text-xl font-medium leading-snug">
                      {link.label}
                    </span>
                    {link.note && (
                      <span className="mt-1 block text-base text-[var(--color-text-secondary)] leading-snug">
                        {link.note}
                      </span>
                    )}
                    <span className="mt-2 block font-mono text-xs text-[var(--color-accent)] break-all">
                      {link.url.replace(/^https?:\/\//, "")}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <footer className="mt-16 border-t border-[var(--color-divider)] pt-6 font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">
          Viernes de la Jungla · 2026
        </footer>
      </div>
    </main>
  );
}
