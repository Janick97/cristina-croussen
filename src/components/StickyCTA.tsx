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
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-50 border-b border-primary/10 bg-white/95 backdrop-blur-md shadow-sm"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6 lg:px-8">
            <p className="hidden text-sm text-dark/70 sm:block">
              <span className="font-semibold text-dark">Kostenlose Erstberatung</span>
              {" "}– Lassen Sie uns über Ihre finanzielle Zukunft sprechen.
            </p>
            <p className="text-sm font-semibold text-dark sm:hidden">
              Kostenlose Erstberatung sichern
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://www.cal.eu/cristinacroussen/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-lg"
              >
                <Calendar size={16} />
                <span className="hidden sm:inline">Termin buchen</span>
                <span className="sm:hidden">Termin</span>
              </a>
              <button
                onClick={() => setDismissed(true)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-dark/30 transition-colors hover:bg-dark/5 hover:text-dark/60"
                aria-label="Schließen"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
