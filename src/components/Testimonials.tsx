"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sabine M.",
    text: "Cristina hat sich wirklich Zeit genommen, meine Situation zu verstehen. Die Beratung war transparent und ohne Druck. Endlich fühle ich mich finanziell sicher.",
    rating: 5,
  },
  {
    name: "Thomas K.",
    text: "Nach einem Wasserschaden wusste ich nicht weiter. Cristina hat alles übernommen und die Versicherung hat schnell gezahlt. Absolute Empfehlung!",
    rating: 5,
  },
  {
    name: "Anna L.",
    text: "Professionell, persönlich und immer erreichbar. So stelle ich mir eine gute Finanzberatung vor. Danke, Cristina!",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="bg-gradient-to-br from-dark to-dark/95 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="font-[family-name:var(--font-caveat)] text-xl text-primary-light">
            Erfahrungen
          </span>
          <h2 className="mt-2 font-[family-name:var(--font-londrina)] text-4xl text-white sm:text-5xl">
            Das sagen meine Kunden
          </h2>
          <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-primary" />
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative rounded-2xl bg-white/5 p-8 backdrop-blur-sm"
            >
              <Quote
                size={32}
                className="absolute top-6 right-6 text-primary/20"
              />
              <div className="mb-4 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-primary text-primary"
                  />
                ))}
              </div>
              <p className="leading-relaxed text-white/70">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <p className="mt-6 font-semibold text-white">
                {testimonial.name}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
