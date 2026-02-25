import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | Cristina Croußen",
  description: "Datenschutzerklärung von Cristina Croußen, Finanzcoach & Vermögensberaterin.",
};

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-[family-name:var(--font-londrina)] text-4xl text-dark sm:text-5xl">
          Datenschutzerklärung
        </h1>
        <div className="mt-2 h-1 w-16 rounded-full bg-primary" />

        <div className="mt-10 space-y-8 text-dark/70 leading-relaxed">
          {/* 1 */}
          <section>
            <h2 className="mb-3 font-[family-name:var(--font-londrina)] text-2xl text-dark">
              1. Verantwortliche Person
            </h2>
            <p>
              Verantwortlich für die Datenverarbeitung auf dieser Website:
            </p>
            <p className="mt-3">
              Cristina Croußen
              <br />
              DVAG – Deutsche Vermögensberatung
              <br />
              Hochstr. 96
              <br />
              52525 Heinsberg
              <br />
              Telefon: 0160 92282112
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="mb-3 font-[family-name:var(--font-londrina)] text-2xl text-dark">
              2. Erhebung personenbezogener Daten
            </h2>
            <p>
              Personenbezogene Daten werden auf dieser Website nur im
              technisch notwendigen Umfang erhoben. Die Verarbeitung
              personenbezogener Daten erfolgt ausschließlich auf Grundlage der
              gesetzlichen Bestimmungen (DSGVO, TMG).
            </p>
            <p className="mt-3">
              Bei jedem Zugriff auf unsere Website werden durch den
              Hosting-Provider automatisch Informationen erfasst
              (Server-Logfiles). Diese Daten sind:
            </p>
            <ul className="mt-3 list-inside list-disc space-y-1">
              <li>Browsertyp und -version</li>
              <li>Verwendetes Betriebssystem</li>
              <li>Referrer URL</li>
              <li>Hostname des zugreifenden Rechners</li>
              <li>Uhrzeit der Serveranfrage</li>
              <li>IP-Adresse (anonymisiert)</li>
            </ul>
            <p className="mt-3">
              Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
              Interesse an der technischen Bereitstellung der Website).
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="mb-3 font-[family-name:var(--font-londrina)] text-2xl text-dark">
              3. Kontaktformular & Schadensprüfung
            </h2>
            <p>
              Wenn Sie uns per Kontaktformular oder Schadensprüfungsformular
              Anfragen zukommen lassen, werden Ihre Angaben aus dem Formular
              inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks
              Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei
              uns gespeichert.
            </p>
            <p className="mt-3">
              <strong>Erhobene Daten:</strong> Name, E-Mail-Adresse,
              Telefonnummer (optional), Nachricht bzw. Schadenbeschreibung,
              Versicherungsart, hochgeladene Dokumente.
            </p>
            <p className="mt-3">
              Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung) und
              Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen).
            </p>
            <p className="mt-3">
              Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
              Speicherdauer: Bis zur vollständigen Bearbeitung Ihrer Anfrage
              bzw. bis zum Widerruf Ihrer Einwilligung.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="mb-3 font-[family-name:var(--font-londrina)] text-2xl text-dark">
              4. WhatsApp-Kontakt
            </h2>
            <p>
              Auf unserer Website bieten wir die Möglichkeit, uns über
              WhatsApp zu kontaktieren. Wenn Sie uns über WhatsApp
              kontaktieren, werden Ihre Daten gemäß den Datenschutzrichtlinien
              von WhatsApp (Meta Platforms Ireland Ltd.) verarbeitet.
            </p>
            <p className="mt-3">
              Wir weisen darauf hin, dass WhatsApp Daten in die USA
              übertragen kann. Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO
              (Ihre Einwilligung durch aktive Kontaktaufnahme).
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="mb-3 font-[family-name:var(--font-londrina)] text-2xl text-dark">
              5. Terminbuchung über externen Anbieter
            </h2>
            <p>
              Für die Online-Terminbuchung nutzen wir den Dienst Cal.com.
              Wenn Sie einen Termin buchen, werden Ihre eingegebenen Daten
              (Name, E-Mail, ggf. Telefonnummer) an Cal.com übermittelt.
            </p>
            <p className="mt-3">
              Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)
              und Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung).
            </p>
            <p className="mt-3">
              Weitere Informationen finden Sie in der Datenschutzerklärung von
              Cal.com.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="mb-3 font-[family-name:var(--font-londrina)] text-2xl text-dark">
              6. Hosting
            </h2>
            <p>
              Diese Website wird bei einem externen Hosting-Anbieter
              gehostet. Die personenbezogenen Daten, die auf dieser Website
              erfasst werden, werden auf den Servern des Hosters gespeichert.
            </p>
            <p className="mt-3">
              Der Einsatz des Hosters erfolgt im Interesse einer sicheren,
              schnellen und effizienten Bereitstellung unseres
              Online-Angebots (Art. 6 Abs. 1 lit. f DSGVO).
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="mb-3 font-[family-name:var(--font-londrina)] text-2xl text-dark">
              7. Cookies
            </h2>
            <p>
              Unsere Website verwendet Cookies. Dabei handelt es sich um
              kleine Textdateien, die auf Ihrem Endgerät gespeichert werden.
            </p>
            <p className="mt-3">
              <strong>Essenzielle Cookies:</strong> Notwendig für die
              Grundfunktionen der Website. Rechtsgrundlage: Art. 6 Abs. 1
              lit. f DSGVO.
            </p>
            <p className="mt-3">
              <strong>Statistik-Cookies:</strong> Helfen uns zu verstehen, wie
              Besucher die Website nutzen. Werden nur mit Ihrer Einwilligung
              gesetzt. Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO.
            </p>
            <p className="mt-3">
              <strong>Marketing-Cookies:</strong> Werden verwendet, um
              relevante Inhalte anzuzeigen. Werden nur mit Ihrer Einwilligung
              gesetzt. Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO.
            </p>
            <p className="mt-3">
              Sie können Ihre Cookie-Einstellungen jederzeit über den
              Cookie-Banner anpassen oder in Ihren Browsereinstellungen
              ändern.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="mb-3 font-[family-name:var(--font-londrina)] text-2xl text-dark">
              8. SSL-Verschlüsselung
            </h2>
            <p>
              Diese Seite nutzt aus Sicherheitsgründen eine
              SSL-Verschlüsselung (erkennbar an &ldquo;https://&rdquo; in der
              Adresszeile). Die Verbindung zwischen Ihrem Browser und unserem
              Server ist verschlüsselt.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="mb-3 font-[family-name:var(--font-londrina)] text-2xl text-dark">
              9. Ihre Rechte
            </h2>
            <p>
              Sie haben jederzeit das Recht auf:
            </p>
            <ul className="mt-3 list-inside list-disc space-y-1">
              <li>
                <strong>Auskunft</strong> über Ihre bei uns gespeicherten
                personenbezogenen Daten (Art. 15 DSGVO)
              </li>
              <li>
                <strong>Berichtigung</strong> unrichtiger Daten (Art. 16
                DSGVO)
              </li>
              <li>
                <strong>Löschung</strong> Ihrer Daten (Art. 17 DSGVO)
              </li>
              <li>
                <strong>Einschränkung</strong> der Verarbeitung (Art. 18
                DSGVO)
              </li>
              <li>
                <strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO)
              </li>
              <li>
                <strong>Widerspruch</strong> gegen die Verarbeitung (Art. 21
                DSGVO)
              </li>
              <li>
                <strong>Widerruf</strong> einer erteilten Einwilligung (Art.
                7 Abs. 3 DSGVO)
              </li>
            </ul>
            <p className="mt-3">
              Zur Ausübung Ihrer Rechte wenden Sie sich bitte an die oben
              genannte verantwortliche Person.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="mb-3 font-[family-name:var(--font-londrina)] text-2xl text-dark">
              10. Beschwerderecht
            </h2>
            <p>
              Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde
              über die Verarbeitung Ihrer personenbezogenen Daten zu
              beschweren.
            </p>
          </section>

          {/* 11 */}
          <section>
            <h2 className="mb-3 font-[family-name:var(--font-londrina)] text-2xl text-dark">
              11. Speicherdauer
            </h2>
            <p>
              Personenbezogene Daten werden nur so lange gespeichert, wie es
              für den jeweiligen Verarbeitungszweck erforderlich ist oder
              gesetzliche Aufbewahrungsfristen bestehen. Nach Ablauf der
              Fristen werden die Daten routinemäßig gelöscht.
            </p>
          </section>

          <section className="rounded-2xl border border-beige/30 bg-beige-light/10 p-6">
            <p className="text-sm text-dark/50">
              Stand: Februar 2026
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
