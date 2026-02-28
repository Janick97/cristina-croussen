"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";


const quoteLines = [
  "Ich dachte immer, ich sei Team Risiko –",
  "bis ich erkannt habe: Ja, aber nur mit der richtigen Absicherung.",
];

function TypewriterQuote() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="relative mt-8 pl-10 sm:pl-20">
      <span className="absolute top-[-20px] left-0 font-serif text-[120px] leading-none text-primary/25 sm:top-[-30px] sm:text-[200px]">
        &ldquo;
      </span>

      {/* Mobile: simple fade-in with word wrap */}
      <div className="relative font-[family-name:var(--font-caveat)] text-lg leading-snug text-dark/80 sm:hidden">
        {quoteLines.map((line, i) => (
          <motion.p
            key={i}
            className="-mt-0.5"
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.4 }}
          >
            {line}
          </motion.p>
        ))}
      </div>

      {/* Desktop: typewriter effect */}
      <div className="relative hidden font-[family-name:var(--font-caveat)] leading-snug text-dark/80 sm:block sm:text-xl md:text-2xl">
        {quoteLines.map((line, i) => (
          <p key={i} className="-mt-0.5 overflow-hidden">
            <motion.span
              className="inline-block"
              initial={{ width: 0 }}
              animate={isInView ? { width: "auto" } : { width: 0 }}
              transition={{
                duration: 0.8,
                delay: i * 0.6,
                ease: "easeOut",
              }}
              style={{ whiteSpace: "nowrap", overflow: "hidden", display: "inline-block" }}
            >
              {line}
            </motion.span>
            {isInView && (
              <motion.span
                className="inline-block w-[2px] h-[1em] bg-primary/60 align-middle ml-0.5"
                initial={{ opacity: 1 }}
                animate={{ opacity: [1, 0] }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.6,
                }}
                style={{
                  display: i === quoteLines.length - 1 ? "inline-block" : "none",
                }}
              />
            )}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="ueber-mich" className="overflow-hidden bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="font-[family-name:var(--font-caveat)] text-xl text-primary">
            Die Person hinter der Beratung
          </span>
          <h2 className="mt-2 font-[family-name:var(--font-londrina)] text-4xl text-dark sm:text-5xl">
            Über mich
          </h2>
          <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-primary" />
        </motion.div>

        {/* Main Content: Image + Intro */}
        <div className="mt-12 grid items-center gap-10 sm:mt-16 lg:grid-cols-5 lg:gap-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative mx-auto w-full max-w-xs lg:col-span-2 lg:max-w-none"
          >
            <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-3xl shadow-xl">
              <Image
                src="/images/neu.jpeg"
                alt="Cristina Croußen"
                width={384}
                height={384}
                className="h-auto w-full object-cover"
                style={{ objectPosition: "center 20%" }}
                sizes="(max-width: 768px) 320px, 384px"
              />
            </div>

          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <h3 className="font-[family-name:var(--font-londrina)] text-2xl text-dark sm:text-3xl">
              Cristina Croußen
            </h3>
            <p className="mt-1 text-sm font-medium tracking-wide text-primary">
              Finanzcoach & Vermögensberater Assistentin
            </p>

            <p className="mt-6 text-base leading-relaxed text-dark/70 sm:text-lg">
              Mit kaufmännischer Ausbildung und kontinuierlicher Weiterbildung
              im Finanzbereich helfe ich dir, ein solides Fundament für deine
              Zukunft zu bauen. Schon als Kind faszinierte mich die Welt der
              Finanzen — ich lernte früh, wie wichtig finanzielle Klarheit für
              selbstbewusste Entscheidungen ist. Daraus ist mein Beruf
              geworden. Und meine Leidenschaft.
            </p>

            <p className="mt-4 text-base leading-relaxed text-dark/70 sm:text-lg">
              Gute Beratung beginnt dort, wo man den Menschen hinter den
              Zahlen versteht. Deshalb nehme ich mir Zeit, deine individuelle
              Situation wirklich kennenzulernen – bevor wir gemeinsam die
              passende Strategie entwickeln.
            </p>

            <p className="mt-4 text-base leading-relaxed text-dark/70 sm:text-lg">
              Deine Träume gehören dir — ich helfe dir, sie zu verwirklichen.
              Ob du bereits weißt wohin du willst oder noch nach Klarheit
              suchst: Ich bin nicht der Fahrer, ich bin dein Copilot. Ich
              zeige dir die blinden Flecken, die man alleine leicht übersieht,
              und mache den Weg transparent — damit du selbstbewusst und mit
              einem starken Fundament im Rücken entscheiden kannst. Das Tempo
              bestimmst du.
            </p>

            <TypewriterQuote />
          </motion.div>
        </div>


      </div>
    </section>
  );
}
