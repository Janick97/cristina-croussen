"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Palette, Phone, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "#ueber-mich", label: "Über mich" },
  { href: "#leistungen", label: "Meine Leistungen" },
  { href: "#schadenspruefung", label: "Schadensprüfung" },
  { href: "#kontakt", label: "Kontakt" },
];

const themes = {
  orange: { primary: "#FFC282", primaryLight: "#FFD6A8", primaryDark: "#E5A160", label: "Orange" },
  rosa: { primary: "#D9A397", primaryLight: "#E8C4BB", primaryDark: "#C48B7E", label: "Rosa" },
};
type ThemeKey = keyof typeof themes;

const hotlines = [
  { emoji: "🚙", label: "KFZ Schaden", numbers: ["+49 40237723448"] },
  {
    emoji: "🚙",
    label: "Schutzbrief bei Panne",
    numbers: ["+49 8955987261", "+49 8001304060"],
    note: "24h Hotline",
  },
  { emoji: "💥", label: "Haftpflicht", numbers: ["+49 40237723399"] },
  { emoji: "🏠", label: "Hausrat", numbers: ["+49 40237723238"] },
  {
    emoji: "🍀",
    label: "Haus- & Wohnungsschutzbrief",
    numbers: ["+49 8955987661"],
  },
  { emoji: "🏡", label: "Wohngebäude", numbers: ["+49 4023772-3352"] },
  { emoji: "🩹", label: "Unfall", numbers: ["+49 91113361414"] },
  {
    emoji: "💻",
    label: "Unfall Schadensmeldung online",
    link: "https://www.generali.de/service-kontakt/schaden-melden",
  },
  { emoji: "⚖️", label: "Rechtsschutz Fragen", numbers: ["+49 40237310"] },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hotlineOpen, setHotlineOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState<ThemeKey>("rosa");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const next: ThemeKey = activeTheme === "orange" ? "rosa" : "orange";
    const theme = themes[next];
    document.documentElement.style.setProperty("--color-primary", theme.primary);
    document.documentElement.style.setProperty("--color-primary-light", theme.primaryLight);
    document.documentElement.style.setProperty("--color-primary-dark", theme.primaryDark);
    setActiveTheme(next);
  };

  const otherTheme = activeTheme === "orange" ? "rosa" : "orange";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-[family-name:var(--font-londrina)] text-2xl font-bold text-dark">
              Cristina
            </span>
            <span className="font-[family-name:var(--font-caveat)] text-xl text-primary">
              Croußen
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-dark transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
            {/* Notfallhotlines - Desktop */}
            <button
              onClick={() => setHotlineOpen(true)}
              className="flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition-all hover:bg-red-100"
            >
              <Phone size={13} />
              Notfallhotlines
            </button>
            {/* Color Toggle - Desktop */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1.5 text-sm font-medium text-dark/50 transition-colors hover:text-dark"
              title={`Wechsel zu ${themes[otherTheme].label}`}
            >
              <Palette size={16} />
              <span
                className="inline-block h-4 w-4 rounded-full border border-dark/10"
                style={{ background: themes[otherTheme].primary }}
              />
            </button>
            <a
              href="https://www.cal.eu/cristinacroussen/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-dark hover:shadow-lg"
            >
              Jetzt Termin buchen
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-dark md:hidden"
            aria-label="Menü öffnen"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden bg-white shadow-lg md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.25 }}
                  className="text-base font-medium text-dark transition-colors hover:text-primary"
                >
                  {link.label}
                </motion.a>
              ))}
              {/* Notfallhotlines - Mobile */}
              <motion.button
                onClick={() => { setHotlineOpen(true); setIsOpen(false); }}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + navLinks.length * 0.05, duration: 0.25 }}
                className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition-all active:bg-red-100"
              >
                <Phone size={16} />
                Notfallhotlines
              </motion.button>
              {/* Color Toggle - Mobile */}
              <motion.button
                onClick={toggleTheme}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + navLinks.length * 0.05, duration: 0.25 }}
                className="flex items-center gap-2 text-base font-medium text-dark/50 transition-colors active:text-dark"
              >
                <Palette size={18} />
                <span>Farbe: {themes[activeTheme].label}</span>
                <span
                  className="inline-block h-5 w-5 rounded-full border border-dark/10"
                  style={{ background: themes[otherTheme].primary }}
                />
              </motion.button>
              <motion.a
                href="https://www.cal.eu/cristinacroussen/15min"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + (navLinks.length + 1) * 0.05, duration: 0.25 }}
                className="mt-2 rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-white transition-all hover:bg-primary-dark"
              >
                Jetzt Termin buchen
              </motion.a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
      {/* Notfallhotlines Modal */}
      <AnimatePresence>
        {hotlineOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
              onClick={() => setHotlineOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-4 top-[5vh] z-[101] mx-auto max-h-[90vh] max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:inset-x-auto sm:p-8"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-2xl">🚨</p>
                  <h2 className="mt-2 font-[family-name:var(--font-londrina)] text-2xl text-dark sm:text-3xl">
                    Notfallhotlines
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-dark/60">
                    Für alle Notfälle und zur schnelleren Unterstützung empfehle
                    ich dir die Hotlines unserer Spezialisten der
                    Schadensabteilungen:
                  </p>
                </div>
                <button
                  onClick={() => setHotlineOpen(false)}
                  className="ml-4 shrink-0 rounded-full p-2 text-dark/40 transition-colors hover:bg-dark/5 hover:text-dark"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mt-6 space-y-3">
                {hotlines.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-beige/30 bg-beige-light/10 p-4"
                  >
                    <p className="flex items-center gap-2 text-sm font-semibold text-dark">
                      <span>{item.emoji}</span>
                      {item.label}
                    </p>
                    {item.numbers && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {item.numbers.map((num) => (
                          <a
                            key={num}
                            href={`tel:${num.replace(/[\s-]/g, "")}`}
                            className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary-dark transition-colors hover:bg-primary/20"
                          >
                            <Phone size={13} />
                            {num}
                          </a>
                        ))}
                      </div>
                    )}
                    {item.note && (
                      <p className="mt-1.5 text-xs text-dark/40">{item.note}</p>
                    )}
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary-dark transition-colors hover:bg-primary/20"
                      >
                        <ExternalLink size={13} />
                        Zur Online-Meldung
                      </a>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={() => setHotlineOpen(false)}
                className="mt-6 w-full rounded-full bg-dark py-3 text-sm font-semibold text-white transition-colors hover:bg-dark/80"
              >
                Schließen
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
