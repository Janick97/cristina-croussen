"use client";

import { motion } from "framer-motion";

const partners = [
  "Deutsche Vermögensberatung",
  "Generali",
  "Deutsche Bank",
  "AdvoCard",
  "PlanetHome",
  "Badenia",
];

export default function PartnerLogos() {
  return (
    <section className="border-y border-beige/20 bg-white py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-8 text-center text-sm font-medium uppercase tracking-widest text-dark/30">
          Vertrauensvolle Partnerschaften
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16">
          {partners.map((partner, index) => (
            <motion.div
              key={partner}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="flex h-12 items-center"
            >
              <span className="font-[family-name:var(--font-londrina)] text-lg text-dark/25 transition-colors hover:text-dark/50 sm:text-xl">
                {partner}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
