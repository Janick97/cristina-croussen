"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, X } from "lucide-react";

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past the hero section (~100vh)
      setVisible(window.scrollY > window.innerHeight);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          className="fixed top-[80px] left-0 right-0 z-40 border-b border-primary/10 bg-white/95 backdrop-blur-md shadow-sm"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 sm:py-2.5 lg:px-8">
            <p className="hidden text-sm text-dark/70 sm:block">
              <span className="font-semibold text-dark">Kostenlose Erstberatung</span>
              {" "}– Lassen Sie uns über Ihre finanzielle Zukunft sprechen.
            </p>
            <p className="text-xs font-semibold text-dark sm:hidden">
              Kostenlose Erstberatung sichern
            </p>

            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href="https://www.cal.eu/cristinacroussen/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-lg sm:gap-2 sm:px-5 sm:py-2 sm:text-sm"
              >
                <Calendar size={14} />
                <span className="hidden sm:inline">Termin buchen</span>
                <span className="sm:hidden">Termin</span>
              </a>
              <button
                onClick={() => setDismissed(true)}
                className="flex h-7 w-7 items-center justify-center rounded-full text-dark/30 transition-colors hover:bg-dark/5 hover:text-dark/60 sm:h-8 sm:w-8"
                aria-label="Schließen"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
