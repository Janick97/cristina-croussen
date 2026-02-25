"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, Video, Coffee } from "lucide-react";

export default function Terminbuchung() {
  return (
    <section id="termin" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="font-[family-name:var(--font-caveat)] text-xl text-primary">
            Kostenlos & unverbindlich
          </span>
          <h2 className="mt-2 font-[family-name:var(--font-londrina)] text-4xl text-dark sm:text-5xl">
            Kennenlerntermin buchen
          </h2>
          <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-primary" />
          <p className="mx-auto mt-6 max-w-2xl text-lg text-dark/70">
            In einem persönlichen Erstgespräch lernen wir uns kennen und
            analysieren gemeinsam Ihre finanzielle Situation.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <div className="rounded-2xl border border-beige/30 p-6">
              <Clock size={28} className="mb-3 text-primary" />
              <h3 className="font-[family-name:var(--font-londrina)] text-xl text-dark">
                15 Minuten
              </h3>
              <p className="mt-2 text-sm text-dark/60">
                Ein kurzes Kennenlerngespräch, in dem wir Ihre Situation
                besprechen.
              </p>
            </div>
            <div className="rounded-2xl border border-beige/30 p-6">
              <Video size={28} className="mb-3 text-primary" />
              <h3 className="font-[family-name:var(--font-londrina)] text-xl text-dark">
                Online oder vor Ort
              </h3>
              <p className="mt-2 text-sm text-dark/60">
                Flexibel per Video-Call oder persönlich in Heinsberg.
              </p>
            </div>
            <div className="rounded-2xl border border-beige/30 p-6">
              <Coffee size={28} className="mb-3 text-primary" />
              <h3 className="font-[family-name:var(--font-londrina)] text-xl text-dark">
                Unverbindlich
              </h3>
              <p className="mt-2 text-sm text-dark/60">
                Kein Druck, kein Verkauf – einfach ein offenes Gespräch.
              </p>
            </div>
          </motion.div>

          {/* Cal.com Embed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="overflow-hidden rounded-3xl border border-beige/30 bg-white shadow-lg">
              <div className="bg-gradient-to-r from-primary/10 to-beige-light/30 px-6 py-4">
                <div className="flex items-center gap-2">
                  <Calendar size={20} className="text-primary" />
                  <span className="font-semibold text-dark">
                    Termin auswählen
                  </span>
                </div>
              </div>
              <div className="p-2">
                <iframe
                  src="https://www.cal.eu/cristinacroussen/15min"
                  className="h-[600px] w-full rounded-2xl border-0"
                  title="Terminbuchung"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
