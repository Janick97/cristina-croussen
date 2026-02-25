"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, ChevronDown } from "lucide-react";

interface CookieConsent {
  essential: boolean;
  statistics: boolean;
  marketing: boolean;
  timestamp: string;
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<CookieConsent>({
    essential: true,
    statistics: false,
    marketing: false,
    timestamp: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("cookie-consent");
    if (!stored) {
      // Small delay so it doesn't appear instantly
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (consent: CookieConsent) => {
    const data = { ...consent, timestamp: new Date().toISOString() };
    localStorage.setItem("cookie-consent", JSON.stringify(data));
    setVisible(false);
  };

  const acceptAll = () => {
    saveConsent({ essential: true, statistics: true, marketing: true, timestamp: "" });
  };

  const acceptSelected = () => {
    saveConsent(consent);
  };

  const rejectAll = () => {
    saveConsent({ essential: true, statistics: false, marketing: false, timestamp: "" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-6"
        >
          <div className="mx-auto max-w-3xl rounded-2xl border border-beige/30 bg-white p-4 shadow-2xl sm:p-6 md:p-8">
            <div className="flex items-start gap-3 sm:gap-4">
              <Cookie size={20} className="mt-0.5 shrink-0 text-primary sm:mt-1 sm:size-6" />
              <div className="flex-1 min-w-0">
                <h3 className="font-[family-name:var(--font-londrina)] text-lg text-dark sm:text-xl">
                  Cookie-Einstellungen
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-dark/60 sm:mt-2 sm:text-sm">
                  Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf
                  unserer Website zu bieten. Sie können selbst entscheiden,
                  welche Kategorien Sie zulassen möchten.
                </p>

                {/* Details Toggle */}
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="mt-3 flex items-center gap-1 text-sm font-medium text-primary"
                >
                  Details anzeigen
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${showDetails ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {showDetails && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 space-y-3">
                        {/* Essential */}
                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked
                            disabled
                            className="h-4 w-4 rounded accent-primary"
                          />
                          <div>
                            <span className="text-sm font-medium text-dark">
                              Essenziell
                            </span>
                            <p className="text-xs text-dark/50">
                              Notwendig für die Grundfunktionen der Website.
                            </p>
                          </div>
                        </label>

                        {/* Statistics */}
                        <label className="flex cursor-pointer items-center gap-3">
                          <input
                            type="checkbox"
                            checked={consent.statistics}
                            onChange={(e) =>
                              setConsent((prev) => ({
                                ...prev,
                                statistics: e.target.checked,
                              }))
                            }
                            className="h-4 w-4 rounded accent-primary"
                          />
                          <div>
                            <span className="text-sm font-medium text-dark">
                              Statistik
                            </span>
                            <p className="text-xs text-dark/50">
                              Helfen uns zu verstehen, wie Besucher die Website
                              nutzen.
                            </p>
                          </div>
                        </label>

                        {/* Marketing */}
                        <label className="flex cursor-pointer items-center gap-3">
                          <input
                            type="checkbox"
                            checked={consent.marketing}
                            onChange={(e) =>
                              setConsent((prev) => ({
                                ...prev,
                                marketing: e.target.checked,
                              }))
                            }
                            className="h-4 w-4 rounded accent-primary"
                          />
                          <div>
                            <span className="text-sm font-medium text-dark">
                              Marketing
                            </span>
                            <p className="text-xs text-dark/50">
                              Werden verwendet, um relevante Inhalte
                              anzuzeigen.
                            </p>
                          </div>
                        </label>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Buttons */}
                <div className="mt-4 flex flex-wrap gap-2 sm:mt-6 sm:gap-3">
                  <button
                    onClick={acceptAll}
                    className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-primary-dark sm:px-6 sm:py-2.5 sm:text-sm"
                  >
                    Alle akzeptieren
                  </button>
                  {showDetails && (
                    <button
                      onClick={acceptSelected}
                      className="rounded-full border border-primary px-4 py-2 text-xs font-semibold text-primary transition-all hover:bg-primary/5 sm:px-6 sm:py-2.5 sm:text-sm"
                    >
                      Auswahl speichern
                    </button>
                  )}
                  <button
                    onClick={rejectAll}
                    className="rounded-full border border-dark/10 px-4 py-2 text-xs font-semibold text-dark/60 transition-all hover:border-dark/30 sm:px-6 sm:py-2.5 sm:text-sm"
                  >
                    Nur essenzielle
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
