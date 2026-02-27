"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, X, Palette, Phone, ExternalLink, Car, Wrench, Shield, Home, KeyRound, Building2, HeartPulse, Monitor, Scale } from "lucide-react";
import type { LucideIcon } from "lucide-react";
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

const hotlines: { icon: LucideIcon; label: string; numbers?: string[]; note?: string; link?: string }[] = [
  { icon: Car, label: "KFZ Schaden", numbers: ["+49 40237723448"] },
  {
    icon: Wrench,
    label: "Schutzbrief bei Panne",
    numbers: ["+49 8955987261", "+49 8001304060"],
    note: "24h Hotline",
  },
  { icon: Shield, label: "Haftpflicht", numbers: ["+49 40237723399"] },
  { icon: Home, label: "Hausrat", numbers: ["+49 40237723238"] },
  {
    icon: KeyRound,
    label: "Haus- & Wohnungsschutzbrief",
    numbers: ["+49 8955987661"],
  },
  { icon: Building2, label: "Wohngebäude", numbers: ["+49 4023772-3352"] },
  { icon: HeartPulse, label: "Unfall", numbers: ["+49 91113361414"] },
  {
    icon: Monitor,
    label: "Unfall Schadensmeldung online",
    link: "https://www.generali.de/service-kontakt/schaden-melden",
  },
  { icon: Scale, label: "Rechtsschutz Fragen", numbers: ["+49 40237310"] },
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
    <>
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
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden bg-white/98 shadow-lg backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03, duration: 0.2 }}
                  className="text-base font-medium text-dark transition-colors hover:text-primary"
                >
                  {link.label}
                </motion.a>
              ))}
              {/* Notfallhotlines - Mobile */}
              <motion.button
                onClick={() => { setHotlineOpen(true); setIsOpen(false); }}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.03, duration: 0.2 }}
                className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition-all active:bg-red-100"
              >
                <Phone size={16} />
                Notfallhotlines
              </motion.button>
              {/* Color Toggle - Mobile */}
              <motion.button
                onClick={toggleTheme}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (navLinks.length + 1) * 0.03, duration: 0.2 }}
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
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (navLinks.length + 2) * 0.03, duration: 0.2 }}
                className="mt-2 rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-white transition-all hover:bg-primary-dark"
              >
                Jetzt Termin buchen
              </motion.a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>

      {/* Notfallhotlines Modal — via Portal direkt im body, über allem */}
      {typeof window !== "undefined" && createPortal(
        <AnimatePresence>
          {hotlineOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ position: "fixed", inset: 0, zIndex: 9998, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
                onClick={() => setHotlineOpen(false)}
              />
              <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "flex-end", justifyContent: "center" }} className="sm:items-center sm:p-4">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="flex w-full flex-col rounded-t-3xl bg-white shadow-2xl border-t-[3px] border-x-[3px] border-[#D9A397] sm:max-w-md sm:rounded-2xl sm:border-[3px]"
                  style={{ maxHeight: "85dvh" }}
                >
                  {/* Header */}
                  <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">🚨</span>
                      <h2 className="font-[family-name:var(--font-londrina)] text-xl text-dark">
                        Notfallhotlines
                      </h2>
                    </div>
                    <button
                      onClick={() => setHotlineOpen(false)}
                      className="shrink-0 rounded-full p-2 text-dark/40 transition-colors active:bg-dark/5"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <p className="shrink-0 px-5 pt-3 pb-2 text-xs leading-relaxed text-dark/60">
                    Für alles sind Sie bei mir bestens aufgehoben. Diese Nummern sind nur für echte Notfälle – wenn ein Schaden keinen Aufschub duldet und ich nicht erreichbar bin.
                  </p>

                  {/* Scrollable list */}
                  <div className="overflow-y-auto px-4 pb-8">
                    <div className="mt-2 grid gap-2">
                      {hotlines.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50/50 px-3 py-3"
                        >
                          <item.icon size={20} color="#D9A397" className="mt-0.5 shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-dark">{item.label}</p>
                            {item.numbers && (
                              <div className="mt-1.5 flex flex-col gap-1">
                                {item.numbers.map((num) => (
                                  <a
                                    key={num}
                                    href={`tel:${num.replace(/[\s-]/g, "")}`}
                                    className="text-sm font-medium text-[#D9A397] active:opacity-70"
                                  >
                                    {num}
                                  </a>
                                ))}
                              </div>
                            )}
                            {item.note && (
                              <p className="mt-0.5 text-xs text-dark/40">{item.note}</p>
                            )}
                            {item.link && (
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-1.5 inline-flex items-center gap-1 text-sm font-medium text-[#D9A397] active:opacity-70"
                              >
                                <ExternalLink size={13} />
                                Online-Meldung
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
