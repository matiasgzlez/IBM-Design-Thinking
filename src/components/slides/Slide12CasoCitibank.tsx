"use client";

import { motion } from "motion/react";
import SlotImage from "@/components/SlotImage";
import { EASE, T, fadeUp, stagger } from "@/lib/motion";

const bloques = [
  {
    key: "desafio",
    texto: (
      <>
        La plataforma global de banca corporativa de Citi procesaba{" "}
        <span className="font-bold">billones de dólares por día</span>, pero su interfaz era
        extremadamente compleja y difícil de usar para sus usuarios: los tesoreros corporativos.
      </>
    ),
  },
  {
    key: "edt",
    texto: (
      <>
        Citibank llamó a IBM para trabajar juntos. Trajeron tesoreros y clientes corporativos
        reales como{" "}
        <span className="font-bold text-[var(--color-accent)]">Sponsor Users</span>, hicieron{" "}
        <span className="font-bold" style={{ color: "var(--color-observe)" }}>Observe</span> directo
        para entender el flujo diario de trabajo y plantearon{" "}
        <span className="font-bold text-[var(--color-accent)]">Hills</span> enfocados en la
        velocidad y la usabilidad móvil.
      </>
    ),
  },
  {
    key: "resultado",
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
            Un ejemplo más actual
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: T.title, ease: EASE }}
            className="mt-3 font-black leading-[0.9] tracking-[-0.04em] text-[clamp(44px,5.4vw,84px)]"
          >
            Citibank <span className="text-[var(--color-accent)]">(2014)</span>
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
            title="Citibank"
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
        {bloques.map(({ key, texto }) => (
          <motion.div
            key={key}
            variants={fadeUp}
            className="rounded-2xl border border-[var(--color-divider)] bg-[var(--color-bg-primary)] p-8 flex items-center"
          >
            <p className="text-[clamp(20px,1.7vw,26px)] leading-snug">{texto}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.85, ease: EASE }}
        className="border-t-4 border-[var(--color-accent)] pt-6 text-[clamp(22px,2vw,30px)] leading-snug"
      >
        Fue el <span className="font-bold">caso más famoso e insignia</span>: la propia IBM empezó a
        usarlo como ejemplo para demostrar la efectividad de su metodología en la banca corporativa
        y en empresas a gran escala.
      </motion.p>

    </section>
  );
}
