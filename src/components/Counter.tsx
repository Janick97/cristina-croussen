"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, Award, ThumbsUp } from "lucide-react";

const stats = [
  { icon: Clock, value: 24, suffix: "h", label: "Reaktionszeit" },
  { icon: Award, value: 6, suffix: "+", label: "Jahre Erfahrung" },
  { icon: ThumbsUp, value: 100, suffix: "%", label: "Weiterempfehlung" },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function Counter() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-primary to-primary-dark py-12 sm:py-16">
      {/* Decorative circles */}
      <div className="absolute -top-12 -left-12 h-48 w-48 rounded-full bg-white/5" />
      <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-white/5" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <stat.icon size={24} className="mx-auto mb-2 text-white/80 sm:mb-3 sm:size-7" />
              <div className="font-[family-name:var(--font-londrina)] text-3xl text-white sm:text-4xl md:text-5xl">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-1 text-xs text-white/70 sm:mt-2 sm:text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
