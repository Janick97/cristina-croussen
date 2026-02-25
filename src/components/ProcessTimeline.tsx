"use client";

import { motion } from "framer-motion";
import { PhoneCall, ClipboardList, Lightbulb, Rocket, Handshake } from "lucide-react";

const steps = [
  {
    icon: PhoneCall,
    step: "01",
    title: "Erstgespräch",
    description:
      "Wir lernen uns kennen und besprechen Ihre aktuelle finanzielle Situation und Ihre Ziele.",
  },
  {
    icon: ClipboardList,
    step: "02",
    title: "Analyse",
    description:
      "Ich analysiere Ihre bestehenden Verträge, Versicherungen und Vorsorge auf Optimierungspotenzial.",
  },
  {
    icon: Lightbulb,
    step: "03",
    title: "Strategie",
    description:
      "Gemeinsam entwickeln wir einen individuellen Plan, der perfekt auf Ihre Lebenssituation passt.",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Umsetzung",
    description:
      "Ich begleite Sie bei der Umsetzung und stehe Ihnen auch langfristig als Ansprechpartnerin zur Seite.",
  },
  {
    icon: Handshake,
    step: "05",
    title: "Partnerschaft",
    description:
      "Meine Beratung endet nicht nach dem Abschluss. Ich begleite Sie langfristig durch alle Lebensphasen und passe Ihre Strategie an neue Situationen an.",
  },
];

export default function ProcessTimeline() {
  return (
    <section className="bg-beige-light/10 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="font-[family-name:var(--font-caveat)] text-xl text-primary">
            So läuft es ab
          </span>
          <h2 className="mt-2 font-[family-name:var(--font-londrina)] text-4xl text-dark sm:text-5xl">
            Ihr Weg zur finanziellen Klarheit
          </h2>
          <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-primary" />
        </motion.div>

        <div className="relative mt-16">
          {/* Connecting line (desktop) */}
          <div className="absolute top-24 left-0 right-0 hidden h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent lg:block" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative text-center"
              >
                {/* Step number circle */}
                <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-primary/10" />
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/20">
                    <step.icon size={24} className="text-white" />
                  </div>
                </div>

                <span className="font-[family-name:var(--font-caveat)] text-lg text-primary/60">
                  Schritt {step.step}
                </span>
                <h3 className="mt-1 font-[family-name:var(--font-londrina)] text-2xl text-dark">
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
