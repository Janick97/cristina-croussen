"use client";

import { useState } from "react";
import { Palette } from "lucide-react";

const themes = {
  orange: {
    primary: "#FFC282",
    primaryLight: "#FFD6A8",
    primaryDark: "#E5A160",
    label: "Orange",
  },
  rosa: {
    primary: "#D9A397",
    primaryLight: "#E8C4BB",
    primaryDark: "#C48B7E",
    label: "Rosa",
  },
};

type ThemeKey = keyof typeof themes;

export default function ColorToggle() {
  const [active, setActive] = useState<ThemeKey>("orange");

  const toggle = () => {
    const next: ThemeKey = active === "orange" ? "rosa" : "orange";
    const theme = themes[next];
    document.documentElement.style.setProperty("--color-primary", theme.primary);
    document.documentElement.style.setProperty("--color-primary-light", theme.primaryLight);
    document.documentElement.style.setProperty("--color-primary-dark", theme.primaryDark);
    setActive(next);
  };

  const other = active === "orange" ? "rosa" : "orange";

  return (
    <button
      onClick={toggle}
      className="fixed top-24 right-4 z-[60] flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-semibold text-dark shadow-lg border border-beige/30 transition-all hover:shadow-xl sm:right-6"
    >
      <Palette size={16} />
      <span className="hidden sm:inline">Wechsel zu</span>
      <span
        className="inline-block h-4 w-4 rounded-full border border-dark/10"
        style={{ background: themes[other].primary }}
      />
      <span>{themes[other].label}</span>
    </button>
  );
}
