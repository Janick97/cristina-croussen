"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Palette } from "lucide-react";
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

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
    </header>
  );
}
