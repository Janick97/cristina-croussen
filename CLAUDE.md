# Cristina Croußen — Website Dokumentation

Professionelle Website für Cristina Croußen, Finanzcoach & Vermögensberaterin bei der DVAG (Deutsche Vermögensberatung).

## Tech-Stack

| Technologie        | Version   | Zweck                              |
|--------------------|-----------|------------------------------------|
| Next.js            | 16.x      | Framework (App Router)             |
| React              | 19.x      | UI-Library                         |
| TypeScript         | 5.x       | Typisierung                        |
| TailwindCSS        | 4.x       | Styling (inline @theme)            |
| Framer Motion      | 12.x      | Animationen                        |
| Lucide React       | 0.575+    | Icon-Library                       |
| Nodemailer         | 8.x       | E-Mail-Versand (SMTP)              |
| Ollama (extern)    | —         | KI-Chat (Self-hosted LLM)          |

## Projektstruktur

```
cristina-croussen/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root-Layout (Fonts, Meta, globale Komponenten)
│   │   ├── page.tsx                # Startseite (alle Sektionen)
│   │   ├── globals.css             # TailwindCSS @theme, Custom Scrollbar, Selection
│   │   ├── icon.svg                # Favicon ("CC" Initialen)
│   │   ├── impressum/page.tsx      # Impressum (ohne § 34d GewO)
│   │   ├── datenschutz/page.tsx    # Datenschutzerklärung (DSGVO-konform)
│   │   └── api/
│   │       ├── contact/route.ts    # Kontaktformular → E-Mail
│   │       ├── schadenspruefung/route.ts # Schadensprüfung → E-Mail
│   │       └── chat/route.ts       # KI-Chat → Ollama API
│   ├── components/
│   │   ├── Header.tsx              # Sticky Header mit Logo, Nav, CTA
│   │   ├── Hero.tsx                # Parallax-Hero mit Profilbild
│   │   ├── PartnerLogos.tsx        # Partner-Logos (6 Stück)
│   │   ├── About.tsx               # Über mich (Bento Grid + Typewriter-Zitat)
│   │   ├── Counter.tsx             # Animierte Zahlen (4 Stats)
│   │   ├── Services.tsx            # Leistungen (6 Karten)
│   │   ├── ProcessTimeline.tsx     # 5-Schritte-Prozess
│   │   ├── SchadenForm.tsx         # Schadensprüfungs-Formular
│   │   ├── Testimonials.tsx        # Kundenstimmen
│   │   ├── Terminbuchung.tsx       # Termin buchen (Cal.eu Link)
│   │   ├── FAQ.tsx                 # Häufige Fragen (Accordion)
│   │   ├── ContactForm.tsx         # Kontaktformular
│   │   ├── Footer.tsx              # Footer mit Navigation + Rechtliches
│   │   ├── AiChat.tsx              # KI-Versicherungsassistent
│   │   ├── WhatsAppButton.tsx      # Floating WhatsApp-Button
│   │   ├── StickyCTA.tsx           # Sticky CTA-Bar (beim Scrollen)
│   │   ├── ExitIntentPopup.tsx     # Exit-Intent Popup
│   │   ├── CookieBanner.tsx        # DSGVO Cookie-Banner
│   │   ├── PageLoader.tsx          # Ladeanimation
│   │   └── ScrollProgress.tsx      # Rosa Fortschrittsbalken unter Nav
│   └── lib/
│       └── mail.ts                 # Nodemailer SMTP-Transporter
├── public/
│   └── images/
│       ├── profil.jpeg             # Profilbild (Hero-Bereich)
│       ├── neu.jpeg                # Über-mich-Bild (aktuell verwendet)
│       ├── privat.jpeg             # Alternatives Bild (nicht aktiv)
│       └── profi.jpeg              # Alternatives Bild (nicht aktiv)
├── Dockerfile                      # Multi-Stage Docker Build (node:20-alpine)
├── next.config.ts                  # output: "standalone" für Docker
├── .env.local                      # Lokale Umgebungsvariablen
└── package.json
```

## Seitenstruktur (Reihenfolge auf Startseite)

1. **Hero** — Parallax-Hero mit Profilbild (nur Desktop), CTA-Buttons, Trust-Badges
2. **PartnerLogos** — Deutsche Vermögensberatung, Generali, Deutsche Bank, AdvoCard, PlanetHome, Badenia
3. **About** — Persönlicher Bereich mit Bento Grid (6 Fun-Fact-Karten), Profilbild, Typewriter-Zitat
4. **Counter** — 8 Mio+ DVAG Kunden, 24h Reaktionszeit, 6+ Jahre Erfahrung, 100% Weiterempfehlung
5. **Services** — Altersvorsorge, Vermögensaufbau, Versicherungen, Sparpläne, Berufsunfähigkeit, Schadensprüfung
6. **ProcessTimeline** — 5 Schritte: Erstgespräch → Analyse → Strategie → Umsetzung → Partnerschaft
7. **SchadenForm** — Formular mit Versicherungsart-Auswahl, Dokument-Upload, E-Mail-Versand
8. **Testimonials** — Kundenstimmen (statisch)
9. **Terminbuchung** — Weiterleitung zu Cal.eu (https://www.cal.eu/cristinacroussen/15min)
10. **FAQ** — Häufige Fragen als Accordion
11. **ContactForm** — Kontaktformular mit E-Mail-Versand

## Globale Komponenten (im Layout)

- **Header** — Sticky, transparent → blur bei Scroll. Nav: Über mich, Schadensprüfung, Kontakt. CTA: "Jetzt Termin buchen"
- **ScrollProgress** — Rosa Fortschrittsbalken unter der Navigation (top: 80px)
- **Footer** — Navigation, Rechtliches (Impressum, Datenschutz), Copyright
- **AiChat** — KI-Versicherungsassistent (Button unten links), Fullscreen auf Mobile
- **WhatsAppButton** — Floating Button unten rechts (0160 92282112)
- **StickyCTA** — Sticky CTA-Bar beim Runterscrollen
- **ExitIntentPopup** — Desktop: Maus verlässt Fenster; Mobile: 600px Zurückscrollen. 1x pro Session
- **CookieBanner** — DSGVO Cookie-Opt-in
- **PageLoader** — Ladeanimation beim ersten Laden

## Design-System

### Farben (TailwindCSS @theme)
- `primary`: #D9A397 (Rosa/Rosé)
- `primary-light`: #E8C4BB
- `primary-dark`: #C48B7E
- `dark`: #424242 (Textfarbe)
- `beige`: #BBB5AC
- `beige-light`: #D4CFC8
- `background`: #ffffff

### Fonts (Google Fonts)
- **Londrina Solid** (`--font-londrina`) — Headings, große Texte
- **Caveat** (`--font-caveat`) — Script/Akzent-Font (Ersatz für Biro Script Plus)
- **Assistant** (`--font-assistant`) — Body-Text, Standard-Schrift

### Animationen
- Scroll-Reveal (whileInView) auf fast allen Sektionen
- Parallax-Effekt im Hero (useScroll + useTransform)
- Typewriter-Effekt im About-Zitat (Desktop: width 0→auto, Mobile: fade-in)
- Animierte Counter (Zahlen zählen hoch bei Scroll)
- Hover-Effekte auf Karten (y: -4), Buttons (scale)
- Exit-Intent Popup mit Backdrop-Blur

## E-Mail-System

### Konfiguration
- **SMTP-Server:** smtp.strato.de
- **Port:** 587 (STARTTLS) — Port 465 wird von Hetzner blockiert!
- **Absender:** Kontaktformular@cristinacroussen.de
- **Empfänger:** kontakt@cristinacroussen.de
- **Lib:** `src/lib/mail.ts` (Nodemailer mit createTransport)

### Wichtig
- Lokal in `.env.local`: `SMTP_PORT=465` (funktioniert lokal)
- Auf dem Server (Coolify): `SMTP_PORT=587` (Hetzner blockiert 465)
- `secure: false` + `requireTLS: true` für STARTTLS

### API-Endpunkte
- `POST /api/contact` — Kontaktformular (JSON: name, email, telefon, nachricht, datenschutz)
- `POST /api/schadenspruefung` — Schadensprüfung (FormData: name, email, telefon, versicherungsart, beschreibung, dokumente, datenschutz)

## KI-Chat (Versicherungs-Assistent)

### Konfiguration
- **LLM:** Ollama mit `gemma3:1b` Modell (auf Server)
- **Lokal in .env.local:** `OLLAMA_MODEL=gemma3:4b` (leistungsstärker)
- **Auf Server:** `OLLAMA_MODEL=gemma3:1b` (ressourcenschonend)
- **Ollama URL lokal:** `http://localhost:11434`
- **Ollama URL Server:** `http://ollama:11434` (Docker-Netzwerk `coolify`)
- **API-Route:** `src/app/api/chat/route.ts`

### System-Prompt
Der KI-Assistent kennt alle gängigen Versicherungsarten (Haftpflicht, Hausrat, Wohngebäude, KFZ, BU, Rechtsschutz, Unfall, Reise, Altersvorsorge) und kann erklären, welche Versicherung welchen Schadensfall abdeckt. Bei konkreten Fällen verweist er auf persönliche Beratung mit Cristina.

### Regeln
- Antwortet nur auf Deutsch
- Nur Versicherungs-/Finanzthemen
- Kurze Antworten (max. 3-4 Sätze pro Punkt)
- Verweist bei konkreten Fällen auf persönliche Beratung
- Keine rechtsverbindlichen Aussagen

## Deployment

### Server
- **Hetzner Server:** 46.225.208.184
- **Coolify:** http://46.225.208.184:8000
- **GitHub Repo:** github.com/Janick97/cristina-croussen (privat, Deploy Key)
- **Branch:** main

### Docker
- Multi-Stage Build: deps → builder → runner
- Node 20 Alpine, Standalone-Output
- Port 3000

### Umgebungsvariablen (Coolify)
```
SMTP_HOST=smtp.strato.de
SMTP_PORT=587                    # NICHT 465!
SMTP_USER=Kontaktformular@cristinacroussen.de
SMTP_PASS=Sunny!1507
OLLAMA_URL=http://ollama:11434   # Docker-Netzwerk
OLLAMA_MODEL=gemma3:1b           # Nicht 4b!
```

### Deploy-Prozess
1. Code pushen nach `main`
2. In Coolify manuell "Deploy" klicken
3. Nach Deploy prüfen ob Ollama noch im `coolify` Docker-Netzwerk ist

## Bekannte Probleme & Lösungen

| Problem | Ursache | Lösung |
|---------|---------|--------|
| SMTP Timeout auf Server | Hetzner blockiert Port 465 | Port 587 + STARTTLS verwenden |
| Ollama antwortet nicht | Falsches Modell oder Netzwerk | `OLLAMA_MODEL=gemma3:1b`, URL `http://ollama:11434` |
| About-Bild wird nicht angezeigt | `fill` Prop ohne Container-Höhe | Explizite `width`/`height` Props verwenden |
| Typewriter bricht auf Mobile | `whiteSpace: nowrap` verhindert Umbruch | Separate Mobile- (fade-in) und Desktop-Variante (typewriter) |
| DNS-Fehler beim Deploy | Docker kann github.com nicht auflösen | Erneut deployen (temporär) |

## Kontaktdaten (Cristina)

- **Telefon/WhatsApp:** 0160 92282112
- **E-Mail:** kontakt@cristinacroussen.de
- **Terminbuchung:** https://www.cal.eu/cristinacroussen/15min
- **Position:** Finanzcoach & Vermögensberaterin | DVAG

## Offene Punkte

- Domain einrichten + HTTPS
- § 34d GewO im Impressum ergänzen (wenn registriert)
- Profilbilder aufräumen (nur `profil.jpeg` und `neu.jpeg` werden aktuell verwendet)
