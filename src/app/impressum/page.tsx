import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum | Cristina Croußen",
  description: "Impressum von Cristina Croußen, Finanzcoach & Vermögensberater Assistentin der DVAG.",
};

export default function Impressum() {
  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <a
          href="/"
          className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary-dark"
        >
          ← Zurück zur Startseite
        </a>
        <h1 className="font-[family-name:var(--font-londrina)] text-4xl text-dark sm:text-5xl">
          Impressum
        </h1>
        <div className="mt-2 h-1 w-16 rounded-full bg-primary" />

        <div className="mt-10 space-y-8 text-dark/70 leading-relaxed">
          <section>
            <h2 className="mb-3 font-[family-name:var(--font-londrina)] text-2xl text-dark">
              Angaben gemäß § 5 TMG
            </h2>
            <p>
              Cristina Croußen
              <br />
              DVAG – Deutsche Vermögensberatung
              <br />
              Hochstr. 96
              <br />
              52525 Heinsberg
              <br />
              Deutschland
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-[family-name:var(--font-londrina)] text-2xl text-dark">
              Kontakt
            </h2>
            <p>
              Telefon:{" "}
              <a href="tel:+4916092282112" className="text-primary hover:underline">
                0160 92282112
              </a>
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-[family-name:var(--font-londrina)] text-2xl text-dark">
              Berufsbezeichnung & Aufsichtsbehörde
            </h2>
            <p>
              Cristina Croußen ist als selbstständige Handelsvertreterin gemäß
              § 84 HGB für die Deutsche Vermögensberatung AG (DVAG) tätig.
            </p>
            <p className="mt-3">
              <strong>Deutsche Vermögensberatung AG</strong>
              <br />
              Andreas-Weg 1
              <br />
              60439 Frankfurt am Main
              <br />
              Deutschland
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-[family-name:var(--font-londrina)] text-2xl text-dark">
              EU-Streitschlichtung
            </h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur
              Online-Streitbeilegung (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
            </p>
            <p className="mt-3">
              Wir sind nicht bereit oder verpflichtet, an
              Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
              teilzunehmen.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-[family-name:var(--font-londrina)] text-2xl text-dark">
              Haftung für Inhalte
            </h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene
              Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
              verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
              Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
              gespeicherte fremde Informationen zu überwachen oder nach
              Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
              hinweisen.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-[family-name:var(--font-londrina)] text-2xl text-dark">
              Haftung für Links
            </h2>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf
              deren Inhalte wir keinen Einfluss haben. Deshalb können wir für
              diese fremden Inhalte auch keine Gewähr übernehmen. Für die
              Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
              oder Betreiber der Seiten verantwortlich.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
