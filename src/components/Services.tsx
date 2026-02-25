"use client";

import { motion } from "framer-motion";
import {
  Shield,
  TrendingUp,
  Umbrella,
  PiggyBank,
  HeartPulse,
  Scale,
} from "lucide-react";

const services = [
  {
    icon: Shield,
    title: "Altersvorsorge",
    description:
      "Maßgeschneiderte Vorsorgekonzepte für einen sorgenfreien Ruhestand – privat und betrieblich.",
  },
  {
    icon: TrendingUp,
    title: "Vermögensaufbau",
    description:
      "Intelligente Anlagestrategien für nachhaltiges Wachstum und langfristige Vermögensbildung.",
  },
  {
    icon: Umbrella,
    title: "Versicherungen",
    description:
      "Optimaler Schutz für alle Lebenslagen – von Haftpflicht bis Wohngebäude.",
  },
  {
    icon: PiggyBank,
    title: "Sparpläne",
    description:
      "Regelmäßig Vermögen aufbauen mit individuell abgestimmten Sparplänen und Fondslösungen.",
  },
  {
    icon: HeartPulse,
    title: "Berufsunfähigkeit",
    description:
      "Sichern Sie Ihr Einkommen ab – für den Fall, dass Sie Ihren Beruf nicht mehr ausüben können.",
  },
  {
    icon: Scale,
    title: "Schadensprüfung",
    description:
      "Professionelle Prüfung und Durchsetzung Ihrer Versicherungsansprüche im Schadensfall.",
  },
];

export default function Services() {
  return (
    <section id="leistungen" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="font-[family-name:var(--font-caveat)] text-xl text-primary">
            Was ich für Sie tun kann
          </span>
          <h2 className="mt-2 font-[family-name:var(--font-londrina)] text-4xl text-dark sm:text-5xl">
            Meine Leistungen
          </h2>
          <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-primary" />
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group relative overflow-hidden rounded-2xl border border-beige/30 bg-white p-8 transition-all hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 transition-all group-hover:from-primary/5 group-hover:to-transparent" />

              <div className="relative">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <service.icon
                    size={28}
                    className="text-primary"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="mb-3 font-[family-name:var(--font-londrina)] text-2xl text-dark">
                  {service.title}
                </h3>
                <p className="leading-relaxed text-dark/60">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
