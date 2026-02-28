"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  GraduationCap,
  Home,
  Building2,
  Baby,
  Briefcase,
  RefreshCw,
  Sunset,
} from "lucide-react";

const stations = [
  {
    icon: GraduationCap,
    title: "Berufsstart",
    desc: "Ich fange an zu arbeiten",
    detail: "Berufsunfähigkeit, erste Altersvorsorge, Haftpflicht",
    color: "bg-[#f5e6e3]",
    iconColor: "#D9A397",
  },
  {
    icon: Home,
    title: "Erstes Zuhause",
    desc: "Ich ziehe aus oder zusammen",
    detail: "Hausrat, Haftpflicht, gemeinsame Absicherung",
    color: "bg-[#e8f0e8]",
    iconColor: "#5a9e6f",
  },
  {
    icon: Building2,
    title: "Immobilie",
    desc: "Ich kaufe oder baue",
    detail: "Baufinanzierung, Wohngebäude, Risikolebensversicherung",
    color: "bg-[#e8edf5]",
    iconColor: "#6b8fc9",
  },
  {
    icon: Baby,
    title: "Familie",
    desc: "Ich bekomme Kinder",
    detail: "Risikoschutz, Krankenversicherung, Kinderabsicherung",
    color: "bg-[#fdf0e0]",
    iconColor: "#e5a84b",
  },
  {
    icon: Briefcase,
    title: "Selbstständigkeit",
    desc: "Ich mache mich selbstständig",
    detail: "Krankenversicherung, Haftpflicht, Einkommensabsicherung",
    color: "bg-[#f0e8f5]",
    iconColor: "#9b6bc9",
  },
  {
    icon: RefreshCw,
    title: "Neustart",
    desc: "Ich möchte Verträge prüfen",
    detail: "Kostenloser Check — was zahle ich wirklich?",
    color: "bg-[#e5f5f0]",
    iconColor: "#3dada8",
  },
  {
    icon: Sunset,
    title: "Ruhestand",
    desc: "Ich plane meinen Ruhestand",
    detail: "Private Rente, Kapitalauszahlung, Vermögensplanung",
    color: "bg-[#fde8e3]",
    iconColor: "#d97c6e",
  },
];

function scrollToTermin() {
  document.getElementById("termin")?.scrollIntoView({ behavior: "smooth" });
}

export default function LifeJourney() {
  const lineRef = useRef<HTMLDivElement>(null);

  return (
    <section className="overflow-hidden bg-[#fdfaf9] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="font-[family-name:var(--font-caveat)] text-xl text-primary">
            Für jeden Lebensabschnitt
          </span>
          <h2 className="mt-2 font-[family-name:var(--font-londrina)] text-4xl text-dark sm:text-5xl">
            Wo stehst du gerade?
          </h2>
          <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-primary" />
          <p className="mx-auto mt-4 max-w-xl text-base text-dark/60">
            Klick auf deinen Lebensabschnitt — ich zeige dir, was jetzt wirklich wichtig ist.
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="relative mt-16 hidden lg:block">
          {/* Linie */}
          <div className="absolute left-0 right-0 top-[52px] h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <div className="grid grid-cols-7 gap-3">
            {stations.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.button
                  key={s.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ y: -6, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={scrollToTermin}
                  className="group flex flex-col items-center text-center"
                >
                  {/* Icon bubble */}
                  <div
                    className={`relative z-10 mb-4 flex h-[52px] w-[52px] items-center justify-center rounded-full border-4 border-[#fdfaf9] shadow-md transition-shadow group-hover:shadow-lg ${s.color}`}
                  >
                    <Icon size={24} color={s.iconColor} strokeWidth={1.8} />
                  </div>

                  {/* Connector dot */}
                  <div className="mb-3 h-1.5 w-1.5 rounded-full bg-primary/40" />

                  <div
                    className={`w-full rounded-2xl border border-transparent p-3 transition-all group-hover:border-primary/20 group-hover:shadow-md ${s.color}`}
                  >
                    <p className="text-xs font-bold text-dark">{s.title}</p>
                    <p className="mt-0.5 text-[11px] leading-tight text-dark/60">{s.desc}</p>
                    <p className="mt-2 text-[10px] leading-tight text-dark/40 opacity-0 transition-opacity group-hover:opacity-100">
                      {s.detail}
                    </p>
                    <p className="mt-2 text-[10px] font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      Termin buchen →
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Mobile Timeline — vertikal */}
        <div className="relative mt-12 lg:hidden">
          {/* Vertikale Linie */}
          <div className="absolute bottom-0 left-[27px] top-0 w-0.5 bg-gradient-to-b from-transparent via-primary/30 to-transparent" />

          <div className="flex flex-col gap-3">
            {stations.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.button
                  key={s.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={scrollToTermin}
                  className="group flex items-center gap-4 rounded-2xl border border-transparent p-3 text-left transition-all active:border-primary/20 active:shadow-md"
                >
                  {/* Icon */}
                  <div
                    className={`relative z-10 flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full shadow-md ${s.color}`}
                  >
                    <Icon size={26} color={s.iconColor} strokeWidth={1.8} />
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <p className="text-sm font-bold text-dark">{s.title}</p>
                    <p className="text-xs text-dark/60">{s.desc}</p>
                    <p className="mt-0.5 text-[11px] text-dark/40">{s.detail}</p>
                  </div>

                  {/* Arrow */}
                  <span className="shrink-0 text-primary opacity-50 transition-opacity group-active:opacity-100">→</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 text-center"
        >
          <p className="text-sm text-dark/50">
            Nichts dabei? Kein Problem —{" "}
            <button
              onClick={scrollToTermin}
              className="font-semibold text-primary underline underline-offset-2 hover:text-primary-dark"
            >
              einfach melden
            </button>
            , ich finde die richtige Lösung.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
