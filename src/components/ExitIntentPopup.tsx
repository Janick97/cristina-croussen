"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Calendar } from "lucide-react";

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("exit-intent-shown");
    if (alreadyShown) return;

    const show = () => {
      setVisible(true);
      sessionStorage.setItem("exit-intent-shown", "true");
      cleanup();
    };

    // Desktop: Mouse leaves window (toward close/URL bar)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) show();
    };

    // Mobile: User scrolls back up quickly (intent to leave)
    let lastScrollY = window.scrollY;
    let scrollUpDistance = 0;
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < lastScrollY) {
        scrollUpDistance += lastScrollY - currentY;
        // Trigger after scrolling 600px back up (past the initial viewport)
        if (scrollUpDistance > 600 && currentY > 200) show();
      } else {
        scrollUpDistance = 0;
      }
      lastScrollY = currentY;
    };

    const isMobile = window.matchMedia("(pointer: coarse)").matches;

    // Delay so it doesn't trigger immediately
    const timer = setTimeout(() => {
      if (isMobile) {
        window.addEventListener("scroll", handleScroll, { passive: true });
      } else {
        document.addEventListener("mouseleave", handleMouseLeave);
      }
    }, 5000);

    const cleanup = () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };

    return cleanup;
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-dark/50 p-4 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setVisible(false);
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={() => setVisible(false)}
              className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-dark/40 transition-colors hover:bg-dark/5 hover:text-dark"
              aria-label="Schließen"
            >
              <X size={18} />
            </button>

            {/* Top accent bar */}
            <div className="h-1.5 bg-gradient-to-r from-primary to-primary-dark" />

            <div className="p-8 text-center">
              <span className="font-[family-name:var(--font-caveat)] text-xl text-primary">
                Noch unsicher?
              </span>
              <h3 className="mt-2 font-[family-name:var(--font-londrina)] text-3xl text-dark">
                Lassen Sie uns sprechen
              </h3>
              <p className="mt-4 text-dark/60">
                Ein kurzes Gespräch kann viel klären. Ich berate Sie gerne
                kostenlos und unverbindlich zu Ihrer finanziellen Situation.
              </p>

              <div className="mt-8 flex flex-col gap-3">
                <a
                  href="https://www.cal.eu/cristinacroussen/15min"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setVisible(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/20"
                >
                  <Calendar size={18} />
                  Kostenlosen Termin buchen
                </a>
                <a
                  href="https://wa.me/4916092282112"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setVisible(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-dark/10 px-6 py-3.5 font-semibold text-dark transition-all hover:border-[#25D366] hover:text-[#25D366]"
                >
                  <MessageCircle size={18} />
                  Per WhatsApp schreiben
                </a>
              </div>

              <p className="mt-6 text-xs text-dark/30">
                Kostenlos & unverbindlich – kein Verkaufsgespräch
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
