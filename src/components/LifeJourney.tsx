"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import {
  GraduationCap,
  Home,
  Building2,
  Baby,
  Briefcase,
  RefreshCw,
  Sunset,
  X,
  Calendar,
  MessageCircle,
} from "lucide-react";

const stations = [
  {
    icon: GraduationCap,
    title: "Berufsstart",
    desc: "Ich fange an zu arbeiten",
    detail: "Jetzt ist der beste Zeitpunkt — Berufsunfähigkeit, erste Altersvorsorge, Haftpflicht …",
    hook: "Was brauchst du wirklich für deinen Start?",
    color: "bg-[#f5e6e3]",
    iconColor: "#D9A397",
  },
  {
    icon: Home,
    title: "Erstes Zuhause",
    desc: "Ich ziehe aus oder zusammen",
    detail: "Hausrat, Haftpflicht, gemeinsame Absicherung …",
    hook: "Was verändert sich für dich — und was sollte jetzt abgesichert sein?",
    color: "bg-[#e8f0e8]",
    iconColor: "#5a9e6f",
  },
  {
    icon: Building2,
    title: "Immobilie",
    desc: "Ich kaufe oder baue",
    detail: "Baufinanzierung, Wohngebäude, Risikolebensversicherung …",
    hook: "Lass uns gemeinsam prüfen, was dein Eigentum wirklich absichert.",
    color: "bg-[#e8edf5]",
    iconColor: "#6b8fc9",
  },
  {
    icon: Baby,
    title: "Familie",
    desc: "Ich bekomme Kinder",
    detail: "Risikoschutz, Krankenversicherung, Kinderabsicherung …",
    hook: "Was braucht deine Familie, wenn es darauf ankommt?",
    color: "bg-[#fdf0e0]",
    iconColor: "#e5a84b",
  },
  {
    icon: Briefcase,
    title: "Selbstständigkeit",
    desc: "Ich mache mich selbstständig",
    detail: "Krankenversicherung, Haftpflicht, Einkommensabsicherung …",
    hook: "Welche Strategie passt zu deinem Weg als Selbstständiger?",
    color: "bg-[#f0e8f5]",
    iconColor: "#9b6bc9",
  },
  {
    icon: RefreshCw,
    title: "Neustart",
    desc: "Ich möchte Verträge prüfen",
    detail: "Bestehende Verträge, Lücken aufdecken, Kosten optimieren …",
    hook: "Wann hast du zuletzt geprüft, ob deine Verträge noch zu dir passen?",
    color: "bg-[#e5f5f0]",
    iconColor: "#3dada8",
  },
  {
    icon: Sunset,
    title: "Altersvorsorge",
    desc: "Ich will früh für später vorsorgen",
    detail: "Private Rente, Kapitalaufbau, Vermögensplanung …",
    hook: "Je früher du anfängst, desto mehr arbeitet dein Geld für dich.",
    color: "bg-[#fde8e3]",
    iconColor: "#d97c6e",
  },
];

export default function LifeJourney() {
  const [selected, setSelected] = useState<(typeof stations)[0] | null>(null);

  const handleTermin = () => {
    setSelected(null);
    setTimeout(() => document.getElementById("termin")?.scrollIntoView({ behavior: "smooth" }), 200);
  };

  const handleWhatsApp = (title: string) => {
    const text = encodeURIComponent(`Hallo Cristina, ich bin gerade in der Lebensphase „${title}" und würde gerne einen Termin vereinbaren.`);
    window.open(`https://wa.me/4916092282112?text=${text}`, "_blank");
    setSelected(null);
  };

  return (
    <section className="overflow-hidden bg-[#fdfaf9] py-10 sm:py-16">
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
                  onClick={() => setSelected(s)}
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
                    className={`w-full rounded-2xl border border-transparent p-3 transition-all duration-300 group-hover:border-primary/20 group-hover:shadow-md ${s.color}`}
                  >
                    {/* Immer sichtbar: Titel + kurze Beschreibung */}
                    <p className="text-xs font-bold text-dark">{s.title}</p>
                    <p className="mt-0.5 text-[11px] leading-tight text-dark/60">{s.desc}</p>

                    {/* Hover-Expand: Detail + Hook — grid trick für smooth height */}
                    <div className="grid transition-all duration-300 ease-out [grid-template-rows:0fr] group-hover:[grid-template-rows:1fr]">
                      <div className="overflow-hidden">
                        <p className="mt-2 text-[10px] leading-tight text-dark/50">
                          {s.detail}
                        </p>
                        <p className="mt-1.5 text-[10px] leading-tight italic text-primary/70">
                          {s.hook}
                        </p>
                      </div>
                    </div>
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
                  onClick={() => setSelected(s)}
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
                    <p className="mt-1 text-[11px] italic text-primary/70">{s.hook}</p>
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
              onClick={handleTermin}
              className="font-semibold text-primary underline underline-offset-2 hover:text-primary-dark"
            >
              einfach melden
            </button>
            , ich finde die richtige Lösung.
          </p>
        </motion.div>
      </div>

      {/* Modal */}
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
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute right-4 top-4 rounded-full p-2 text-dark/40 transition-colors hover:bg-beige/30 hover:text-dark"
            >
              <X size={18} />
            </button>

            {/* Icon */}
            <div
              className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${selected.color}`}
            >
              <selected.icon size={24} color={selected.iconColor} strokeWidth={1.5} />
            </div>

            <h3 className="font-[family-name:var(--font-londrina)] text-2xl text-dark">
              {selected.title}
            </h3>
            <p className="mt-1 text-sm text-dark/60">{selected.desc}</p>
            <p className="mt-3 text-sm italic text-primary/80">{selected.hook}</p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleTermin}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20"
              >
                <Calendar size={16} />
                Online-Termin buchen
              </button>
              <button
                onClick={() => handleWhatsApp(selected.title)}
                className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-[#25D366] py-3 text-sm font-semibold text-[#25D366] transition-all hover:bg-[#25D366] hover:text-white"
              >
                <MessageCircle size={16} />
                Per WhatsApp
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
