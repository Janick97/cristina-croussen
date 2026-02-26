"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Was kostet eine Erstberatung?",
    answer:
      "Die Erstberatung und Analyse Ihrer finanziellen Situation ist für Sie kostenlos und unverbindlich. Ich nehme mir Zeit, Ihre individuelle Lage zu verstehen, bevor wir gemeinsam über mögliche Strategien sprechen.",
  },
  {
    question: "Wie läuft die Schadensprüfung ab?",
    answer:
      "Als aktive Kundin oder aktiver Kunde bei mir reichen Sie einfach Ihren Schadensfall über das Formular oder telefonisch ein – ich kümmere mich um alles Weitere, kontaktiere die zuständige Versicherung und begleite Sie bis zur Auszahlung. Auch als Fremdkunde können Sie meine Schadensprüfung nutzen: Laden Sie Ihren Versicherungsschein hoch, und ich prüfe Ihre Ansprüche kostenlos und unverbindlich.",
  },
  {
    question: "Für welche Versicherungen sind Sie zuständig?",
    answer:
      "Als Vermögensberaterin der DVAG decke ich ein breites Spektrum ab: Haftpflicht, Hausrat, Wohngebäude, KFZ, Berufsunfähigkeit, Rechtsschutz, Unfall, Altersvorsorge und viele weitere. Sprechen Sie mich einfach an.",
  },
  {
    question: "Kann ich auch Online-Beratung erhalten?",
    answer:
      "Selbstverständlich! Ich biete persönliche Beratung vor Ort in Heinsberg sowie Video-Calls an. Buchen Sie einfach einen Termin über mein Online-Buchungssystem.",
  },
  {
    question: "Wie unterscheidet sich die DVAG von anderen Beratungen?",
    answer:
      "Die Deutsche Vermögensberatung steht seit über 45 Jahren für ganzheitliche Finanzplanung. Statt einzelner Produkte betrachten wir Ihre gesamte finanzielle Situation und entwickeln eine maßgeschneiderte Strategie.",
  },
  {
    question: "Seit wann gibt es die DVAG?",
    answer:
      "Die Deutsche Vermögensberatung (DVAG) besteht seit über 50 Jahren und gehört zu den größten Finanzvertrieben Deutschlands.",
  },
  {
    question: "Wie kann ich einen Termin vereinbaren?",
    answer:
      "Am einfachsten über mein Online-Buchungssystem auf dieser Website, per WhatsApp an 0160 92282112 oder über das Kontaktformular. Ich melde mich zeitnah bei Ihnen.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="font-[family-name:var(--font-caveat)] text-xl text-primary">
            Häufige Fragen
          </span>
          <h2 className="mt-2 font-[family-name:var(--font-londrina)] text-4xl text-dark sm:text-5xl">
            FAQ
          </h2>
          <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-primary" />
        </motion.div>

        <div className="mt-8 space-y-3 sm:mt-12 sm:space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="overflow-hidden rounded-2xl border border-beige/30 bg-white"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="flex w-full items-center justify-between px-4 py-4 text-left transition-colors hover:bg-primary/5 sm:px-6 sm:py-5"
              >
                <span className="pr-4 font-medium text-dark">
                  {faq.question}
                </span>
                <ChevronDown
                  size={20}
                  className={`shrink-0 text-primary transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="px-4 pb-4 text-sm leading-relaxed text-dark/60 sm:px-6 sm:pb-5 sm:text-base">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
