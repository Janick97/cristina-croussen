import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-beige/20 bg-white py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <span className="font-[family-name:var(--font-londrina)] text-xl font-bold text-dark">
                Cristina
              </span>
              <span className="font-[family-name:var(--font-caveat)] text-lg text-primary">
                Croußen
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-dark/50">
              Finanzcoach & Vermögensberater Assistentin
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-dark/40">
              Navigation
            </h4>
            <nav className="flex flex-col gap-2">
              <a href="#ueber-mich" className="text-sm text-dark/60 transition-colors hover:text-primary">
                Über mich
              </a>
              <a href="#schadenspruefung" className="text-sm text-dark/60 transition-colors hover:text-primary">
                Schadensprüfung
              </a>
              <a href="#termin" className="text-sm text-dark/60 transition-colors hover:text-primary">
                Termin buchen
              </a>
              <a href="#kontakt" className="text-sm text-dark/60 transition-colors hover:text-primary">
                Kontakt
              </a>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-dark/40">
              Rechtliches
            </h4>
            <nav className="flex flex-col gap-2">
              <Link href="/impressum" className="text-sm text-dark/60 transition-colors hover:text-primary">
                Impressum
              </Link>
              <Link href="/datenschutz" className="text-sm text-dark/60 transition-colors hover:text-primary">
                Datenschutz
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-12 border-t border-beige/20 pt-6 text-center text-sm text-dark/40">
          &copy; {new Date().getFullYear()} Cristina Croußen. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
}
