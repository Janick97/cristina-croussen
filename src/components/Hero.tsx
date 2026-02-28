"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Shield, Calendar } from "lucide-react";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[70vh] items-start overflow-hidden bg-gradient-to-br from-white via-white to-beige-light/30 sm:items-center"
    >
      {/* Decorative elements */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -60]) }}
        className="absolute top-20 right-0 h-64 w-64 rounded-full bg-primary/5 blur-3xl sm:h-96 sm:w-96"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 40]) }}
        className="absolute bottom-20 left-0 h-48 w-48 rounded-full bg-beige/10 blur-3xl sm:h-64 sm:w-64"
      />

      <div className="mx-auto w-full max-w-7xl px-4 pb-6 pt-[5.5rem] sm:px-6 sm:pt-28 lg:px-8 lg:pt-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Text Content */}
          <motion.div
            style={{ y: textY, opacity }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-4 inline-block font-[family-name:var(--font-caveat)] text-lg text-primary sm:text-xl"
            >
              Finanzcoach & Vermögensberater Assistentin
            </motion.span>

            <h1 className="mb-6 font-[family-name:var(--font-londrina)] text-4xl leading-tight text-dark sm:text-5xl lg:text-7xl">
              Finanzielle Sicherheit beginnt mit{" "}
              <span className="text-primary">Klarheit.</span>
            </h1>

            <p className="mb-8 text-base leading-relaxed text-dark/70 sm:mb-10 sm:text-lg">
              Unabhängige Analyse Ihrer Situation – persönlich & transparent.
              Gemeinsam schaffen wir die Grundlage für Ihren langfristigen
              Vermögensaufbau.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4 lg:justify-start">
              <motion.a
                href="#schadenspruefung"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/20 sm:px-8 sm:py-4 sm:text-base"
              >
                <Shield size={18} />
                Schadensfall prüfen lassen
              </motion.a>
              <motion.a
                href="https://www.cal.eu/cristinacroussen/15min"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-dark/10 bg-white px-6 py-3.5 text-sm font-semibold text-dark transition-all hover:border-primary hover:text-primary hover:shadow-lg sm:px-8 sm:py-4 sm:text-base"
              >
                <Calendar size={18} />
                Kostenloses Kennenlerngespräch buchen
              </motion.a>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:mt-12 sm:gap-8 lg:justify-start">
              {["Zertifizierter Partner", "Persönliche Beratung", "Kostenlose Erstanalyse"].map(
                (badge, i) => (
                  <motion.div
                    key={badge}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="flex items-center gap-2 text-xs text-dark/50 sm:text-sm"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 sm:h-8 sm:w-8">
                      <Shield size={13} className="text-primary" />
                    </div>
                    {badge}
                  </motion.div>
                )
              )}
            </div>
          </motion.div>

          {/* Profile Image with Parallax */}
          <motion.div
            style={{ y: imageY }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="/images/profil.jpeg"
                alt="Cristina Croußen – Finanzcoach & Vermögensberater Assistentin"
                fill
                className="object-cover object-top"
                priority
                sizes="(max-width: 768px) 100vw, 448px"
              />

              {/* Decorative card */}
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/90 p-4 shadow-lg backdrop-blur-sm">
                <p className="font-[family-name:var(--font-caveat)] text-lg text-dark">
                  &ldquo;Ihre finanzielle Zukunft verdient Aufmerksamkeit.&rdquo;
                </p>
                <p className="mt-1 text-sm font-medium text-primary">
                  — Cristina Croußen
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
