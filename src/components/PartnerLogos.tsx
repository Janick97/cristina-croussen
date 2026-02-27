"use client";

import { motion } from "framer-motion";

const partners = [
  "Generali",
  "Deutsche Bank",
  "AdvoCard",
  "PlanetHome",
  "Badenia",
];

export default function PartnerLogos() {
  return (
    <section className="border-y border-beige/20 bg-white py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-dark/30 sm:mb-8 sm:text-sm">
          Vertrauensvolle Partnerschaften
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-10 md:gap-16">
          {partners.map((partner, index) => (
            <motion.div
              key={partner}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="flex h-10 items-center sm:h-12"
            >
              <span className="font-[family-name:var(--font-londrina)] text-sm text-dark/25 transition-colors hover:text-dark/50 sm:text-lg md:text-xl">
                {partner}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
