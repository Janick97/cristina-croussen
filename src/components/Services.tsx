"use client";

import { motion } from "framer-motion";
import {
  Compass,
  Shield,
  TrendingUp,
  CreditCard,
  Home,
} from "lucide-react";

const services = [
  {
    icon: Compass,
    title: "Finanzcoaching",
    description:
      "Dein persönlicher Fahrplan für finanzielle Klarheit — wir schauen gemeinsam wo du stehst, wo du hinwillst und wie der Weg dorthin aussieht. Du entscheidest, ich begleite.",
  },
  {
    icon: Shield,
    title: "Vermögensabsicherung",
    description:
      "Das Fundament für alles andere. Bevor wir aufbauen, sichern wir ab — Einkommensschutz, Haftung, Absicherung für Beruf und Familie …",
  },
  {
    icon: TrendingUp,
    title: "Vermögensaufbau",
    description:
      "Altersvorsorge, Sparpläne, Anlagestrategien — langfristig, nachhaltig und auf deine Situation abgestimmt …",
  },
  {
    icon: CreditCard,
    title: "Banking",
    description:
      "Girokonto, Kreditkarte, smarte Kontoführung — die richtigen Produkte zur richtigen Zeit, ohne unnötige Kosten …",
  },
  {
    icon: Home,
    title: "Finanzierungen",
    description:
      "Immobilien, Kredite, Umschuldungen — wir finden die Struktur die wirklich zu dir passt und dich nicht ausbremst …",
  },
];

export default function Services() {
  return (
    <section id="leistungen" className="bg-white py-16 sm:py-24">
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

        <div className="mt-10 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group relative overflow-hidden rounded-2xl border border-beige/30 bg-white p-6 transition-all hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 sm:p-8"
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
