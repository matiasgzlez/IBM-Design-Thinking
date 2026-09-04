"use client";

import { motion } from "motion/react";
import SlotImage from "@/components/SlotImage";
import { EASE, T, fadeUp, stagger } from "@/lib/motion";

const bloques = [
  {
    label: "El desafío",
    texto: (
      <>
        La plataforma global de banca corporativa de Citi procesaba{" "}
        <span className="font-bold">billones de dólares por día</span>, pero su interfaz era
        extremadamente compleja, rígida y burocrática para los tesoreros corporativos.
      </>
    ),
  },
  {
    label: "Cómo aplicaron EDT",
    texto: (
      <>
        Citi lo aplicó junto a IBM: talleres con usuarios finales —
        <span className="font-bold text-[var(--color-accent)]">Sponsor Users</span>— para
        identificar los puntos de dolor, y{" "}
        <span className="font-bold text-[var(--color-accent)]">Hills</span> enfocados en la
        velocidad y la usabilidad móvil.
      </>
    ),
  },
  {
    label: "El resultado",
    texto: (
      <>
        Convirtieron una herramienta financiera compleja en una experiencia intuitiva:{" "}
        <span className="font-bold">
          bajó drásticamente el tiempo para ejecutar las transacciones clave
        </span>{" "}
        y se multiplicó la adopción digital.
      </>
    ),
  },
];

export default function Slide12CasoCitibank() {
  return (
    <section className="relative w-screen h-screen bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] overflow-hidden px-20 pt-14 pb-12 flex flex-col">
      <div className="flex items-start justify-between gap-12">
        <div>
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="font-mono text-xl uppercase tracking-[0.22em] text-[var(--color-text-secondary)]"
          >
            Un ejemplo más actual ·{" "}
            <span className="text-[var(--color-accent)] font-bold">2014</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: T.title, ease: EASE }}
            className="mt-3 font-black leading-[0.9] tracking-[-0.04em] text-[clamp(44px,5.4vw,84px)]"
          >
            Citibank <span className="text-[var(--color-accent)]">CitiDirect BE</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: T.content, ease: EASE }}
          className="flex-shrink-0 w-[300px]"
        >
          <SlotImage
            slot="caso/citibank"
            title="Citibank · CitiDirect BE"
            subtitle="2014"
            color="var(--color-accent)"
            className="h-[110px] w-full"
            interactive={false}
          />
        </motion.div>
      </div>

      <motion.div
        variants={stagger(T.content + 0.1, 0.12)}
        initial="hidden"
        animate="show"
        className="my-auto grid grid-cols-3 gap-8"
      >
        {bloques.map(({ label, texto }) => (
          <motion.div
            key={label}
            variants={fadeUp}
            className="rounded-2xl border border-[var(--color-divider)] bg-[var(--color-bg-primary)] p-8 flex flex-col gap-4"
          >
            <span className="font-mono text-sm uppercase tracking-[0.2em] font-bold text-[var(--color-accent)]">
              {label}
            </span>
            <p className="text-[clamp(19px,1.6vw,24px)] leading-snug">{texto}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.9 }}
        className="text-lg leading-snug text-[var(--color-text-secondary)] max-w-6xl"
      >
        Se lanzó globalmente en 2014, después de un proceso de co-creación e investigación que
        arrancó entre 2012 y 2013. Fue{" "}
        <span className="text-[var(--color-text-primary)] font-bold">
          el caso insignia que la propia IBM empezó a usar
        </span>{" "}
        para demostrar la efectividad de su metodología en la banca corporativa a gran escala.
      </motion.p>
    </section>
  );
}
