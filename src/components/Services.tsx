"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Shield,
  TrendingUp,
  CreditCard,
  Home,
  X,
  Calendar,
  MessageCircle,
} from "lucide-react";

const services = [
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
  const [selected, setSelected] = useState<string | null>(null);

  const handleWhatsApp = (title: string) => {
    const text = encodeURIComponent(
      `Hallo Cristina, ich interessiere mich für dein Angebot im Bereich „${title}" und würde gerne einen Termin vereinbaren.`
    );
    window.open(`https://wa.me/4916092282112?text=${text}`, "_blank");
  };

  const handleTermin = () => {
    setSelected(null);
    setTimeout(() => {
      document.getElementById("termin")?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

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
            Was ich für dich tun kann
          </span>
          <h2 className="mt-2 font-[family-name:var(--font-londrina)] text-4xl text-dark sm:text-5xl">
            Finanzcoaching
          </h2>
          <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-primary" />
          <p className="mx-auto mt-4 max-w-xl text-base text-dark/60">
            Dein persönlicher Fahrplan für finanzielle Klarheit — von der Absicherung bis zum Aufbau. Alles aus einer Hand, abgestimmt auf deine Situation.
          </p>
        </motion.div>

        {/* Kacheln — kompakt, hover expandiert */}
        <div className="mt-10 flex flex-col gap-4 sm:mt-16 sm:gap-6">
          {services.map((service, index) => (
            <motion.button
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              onClick={() => setSelected(service.title)}
              className="group relative overflow-hidden rounded-2xl border border-beige/40 bg-white text-left shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
            >
              {/* Gradient-Overlay beim Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 transition-all duration-300 group-hover:from-primary/5 group-hover:to-transparent" />

              <div className="relative p-5 sm:p-6">
                {/* Icon */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                  <service.icon size={24} className="text-primary" strokeWidth={1.5} />
                </div>

                {/* Titel */}
                <h3 className="mb-3 font-[family-name:var(--font-londrina)] text-2xl text-dark">
                  {service.title}
                </h3>

                {/* Beschreibung — immer sichtbar */}
                <p className="leading-relaxed text-dark/60">{service.description}</p>
                <p className="mt-4 text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Termin vereinbaren →
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            onClick={() => setSelected(null)}
          >
            <div className="absolute inset-0 bg-dark/50 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 rounded-full p-2 text-dark/40 transition-colors hover:bg-beige/30 hover:text-dark"
              >
                <X size={18} />
              </button>

              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                {(() => {
                  const Icon = services.find((s) => s.title === selected)!.icon;
                  return <Icon size={24} className="text-primary" strokeWidth={1.5} />;
                })()}
              </div>

              <h3 className="mt-4 font-[family-name:var(--font-londrina)] text-2xl text-dark">
                {selected}
              </h3>
              <p className="mt-2 text-sm text-dark/60">
                Lass uns gemeinsam schauen, was für dich im Bereich{" "}
                <strong>{selected}</strong> passt — unverbindlich und auf Augenhöhe.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={handleTermin}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20"
                >
                  <Calendar size={16} />
                  Online-Termin buchen
                </button>
                <button
                  onClick={() => handleWhatsApp(selected)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-[#25D366] py-3 text-sm font-semibold text-[#25D366] transition-all hover:bg-[#25D366] hover:text-white"
                >
                  <MessageCircle size={16} />
                  Per WhatsApp
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
