"use client";

import { motion } from "framer-motion";
import { Search, ClipboardList, Rocket, Handshake, BookOpen } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Finanzanalyse",
    description:
      "Im ersten Gespräch lernen wir uns kennen. Wir analysieren deine aktuelle Situation, deine Ziele und Wünsche.",
  },
  {
    icon: ClipboardList,
    step: "02",
    title: "Individuelle Planung",
    description:
      "Basierend auf unserem Gespräch entwickle ich eine maßgeschneiderte Strategie.",
  },
  {
    icon: BookOpen,
    step: "03",
    title: "Beratung & Konzept",
    description:
      "Ich präsentiere dir dein persönliches Konzept. Du bekommst einen klaren Überblick und entscheidest direkt im Termin – oder spätestens innerhalb von 2 Tagen bequem per Online-Unterschrift.",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Umsetzung",
    description:
      "Wir setzen gemeinsam die passende Lösung um.",
  },
  {
    icon: Handshake,
    step: "05",
    title: "Dauerhafte Partnerschaft",
    description:
      "Ich begleite dich langfristig und stehe dir als Ansprechpartnerin zur Seite.",
  },
];

export default function ProcessTimeline() {
  return (
    <section className="bg-beige-light/10 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="font-[family-name:var(--font-caveat)] text-xl text-primary">
            Schritt für Schritt
          </span>
          <h2 className="mt-2 font-[family-name:var(--font-londrina)] font-semibold text-4xl text-dark sm:text-5xl">
            So arbeiten wir zusammen
          </h2>
          <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-primary" />
        </motion.div>

        <div className="relative mt-12 sm:mt-16">
          {/* Connecting line (desktop only) */}
          <div className="absolute top-[52px] left-0 right-0 hidden h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent lg:block" />

          {/* Mobile: vertical timeline list */}
          <div className="flex flex-col gap-6 sm:hidden">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                {/* Vertical connector */}
                <div className="flex flex-col items-center">
                  <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary shadow-md shadow-primary/20">
                    <step.icon size={20} className="text-white" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="mt-2 w-0.5 flex-1 bg-primary/15" style={{ minHeight: "2rem" }} />
                  )}
                </div>
                <div className="pb-2 pt-1">
                  <span className="font-[family-name:var(--font-caveat)] text-sm text-primary/60">
                    Schritt {step.step}
                  </span>
                  <h3 className="font-[family-name:var(--font-londrina)] font-semibold text-xl text-dark">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-dark/60">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tablet: 2-column grid */}
          <div className="hidden gap-6 sm:grid sm:grid-cols-2 lg:hidden">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
                className="relative text-center"
              >
                <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-primary/10" />
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/20">
                    <step.icon size={20} className="text-white" />
                  </div>
                </div>
                <span className="font-[family-name:var(--font-caveat)] text-base text-primary/60">
                  Schritt {step.step}
                </span>
                <h3 className="mt-1 font-[family-name:var(--font-londrina)] font-semibold text-xl text-dark">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-dark/60">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Desktop: 4-column grid */}
          <div className="hidden lg:grid lg:grid-cols-4 lg:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative text-center"
              >
                <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-primary/10" />
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/20">
                    <step.icon size={24} className="text-white" />
                  </div>
                </div>
                <span className="font-[family-name:var(--font-caveat)] text-lg text-primary/60">
                  Schritt {step.step}
                </span>
                <h3 className="mt-1 font-[family-name:var(--font-londrina)] font-semibold text-2xl text-dark">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-dark/60">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
