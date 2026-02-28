# Cristina Croußen — Website Dokumentation

Professionelle Website für Cristina Croußen, Finanzcoach & Vermögensberater Assistentin.

> ⚠️ KEIN DVAG-Branding! Keine Markennennung, keine Kundenzahlen der DVAG.
> Cristina ist "Vermögensberater Assistentin" (nicht "Vermögensberaterin").
> Verkauft wird: **Dienstleistung + Konzept + Strategie** — kein Produktverkauf.
> Cristina = Copilot. Kunde = Pilot. Entscheidung bleibt beim Kunden.

## Tech-Stack

| Technologie     | Version | Zweck                          |
|-----------------|---------|--------------------------------|
| Next.js         | 16.x    | Framework (App Router)         |
| React           | 19.x    | UI-Library                     |
| TypeScript      | 5.x     | Typisierung                    |
| TailwindCSS     | 4.x     | Styling (inline @theme)        |
| Framer Motion   | 12.x    | Animationen                    |
| Lucide React    | 0.575+  | Icon-Library                   |
| Nodemailer      | 8.x     | E-Mail-Versand (SMTP)          |
| Ollama (extern) | —       | KI-Chat (Self-hosted LLM)      |

## Projektstruktur

```
cristina-croussen/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root-Layout (Fonts, Meta, globale Komponenten)
│   │   ├── page.tsx                # Startseite (alle Sektionen)
│   │   ├── globals.css             # TailwindCSS @theme, Custom Scrollbar
│   │   ├── icon.svg                # Favicon ("CC" Initialen)
│   │   ├── impressum/page.tsx      # Impressum
│   │   ├── datenschutz/page.tsx    # Datenschutzerklärung (DSGVO)
│   │   └── api/
│   │       ├── contact/route.ts
│   │       ├── schadenspruefung/route.ts
│   │       └── chat/route.ts
│   ├── components/
│   │   ├── Header.tsx              # Sticky Header, Nav, CTA
│   │   ├── Hero.tsx                # Parallax-Hero mit Profilbild
│   │   ├── LifeJourney.tsx         # Lebensstationen (klickbare Karten → Modal)
│   │   ├── PartnerLogos.tsx        # Partner-Logos (kein DVAG-Logo)
│   │   ├── About.tsx               # Über mich (Profilbild + 3 Textblöcke)
│   │   ├── Counter.tsx             # 3 animierte Stats
│   │   ├── Services.tsx            # Leistungen (vertikal gestapelt)
│   │   ├── ProcessTimeline.tsx     # 5-Schritte-Prozess
│   │   ├── SchadenForm.tsx         # Schadensprüfungs-Formular
│   │   ├── Testimonials.tsx        # Kundenstimmen
│   │   ├── Terminbuchung.tsx       # Termin buchen (Cal.eu)
│   │   ├── FAQ.tsx                 # Accordion
│   │   ├── ContactForm.tsx         # Kontaktformular
│   │   ├── FeedbackForm.tsx        # Feedback
│   │   ├── Footer.tsx              # Footer
│   │   ├── AiChat.tsx              # KI-Versicherungsassistent
│   │   ├── FloatingActions.tsx     # FAB: Feedback ⭐, WhatsApp 💬, KI-Chat ✨
│   │   ├── StickyCTA.tsx           # Sticky CTA-Bar
│   │   ├── ExitIntentPopup.tsx     # Exit-Intent Popup
│   │   ├── CookieBanner.tsx        # DSGVO Cookie-Banner
│   │   ├── PageLoader.tsx          # Ladeanimation
│   │   └── ScrollProgress.tsx      # Rosa Fortschrittsbalken
│   └── lib/
│       └── mail.ts
├── public/images/
│   ├── profil.jpeg                 # Profilbild (Hero)
│   └── neu.jpeg                    # Über-mich-Bild
├── Dockerfile
├── next.config.ts
└── .env.local
```

## Seitenstruktur (Reihenfolge Startseite)

1. **Hero** — Parallax, Profilbild Desktop, CTA-Buttons
2. **LifeJourney** — Lebensstationen als klickbare Karten; Klick → Modal mit Termin/WhatsApp
3. **PartnerLogos** — Partner ohne DVAG
4. **About** — Profilbild + 3 Textblöcke (kein Heading, kein Bento Grid)
5. **Counter** — 3 Stats: 24h Reaktionszeit | 100% Weiterempfehlung | Kostenlos Erstgespräch
6. **Services** — Leistungskarten vertikal (flex-col), Klick → Modal
7. **ProcessTimeline** — 5 Schritte: Finanzanalyse → Individuelle Planung → Beratung & Konzept → Umsetzung → Dauerhafte Partnerschaft
8. **SchadenForm** — "Schon Kunde?" Toggle, Formular mit Upload
9. **Testimonials**
10. **Terminbuchung** — Cal.eu
11. **FAQ**
12. **ContactForm**
13. **FeedbackForm**

## Design-System

### Farben
- `primary`: #D9A397 (Rosa)
- `primary-light`: #E8C4BB
- `primary-dark`: #C48B7E
- `dark`: #424242
- `beige`: #BBB5AC
- `beige-light`: #D4CFC8

### Fonts (Google Fonts via next/font)
- **Cormorant Garamond** (`--font-londrina`) — Headings, SemiBold 600
  - ⚠️ CSS-Variable heißt `--font-londrina` (historisch), ist aber Cormorant Garamond!
  - Gewichte geladen: 300, 400, 600, 700 (normal + italic)
  - Alle Komponenten nutzen: `font-[family-name:var(--font-londrina)] font-semibold`
- **Caveat** (`--font-caveat`) — Script/Handschrift-Akzente
- **Assistant** (`--font-assistant`) — Body-Text

> ⚠️ WICHTIG: Niemals PowerShell `-replace` + `Set-Content` für .tsx-Dateien mit Umlauten verwenden!
> Immer Python mit `open(..., encoding='utf-8')` nutzen — sonst werden Umlaute zerstört (UTF-8 Korruption).

### Animationen
- Scroll-Reveal (`whileInView`) auf fast allen Sektionen
- Parallax im Hero
- Animierte Counter (hochzählen bei Scroll)
- Hover auf Karten (y: -4)

## Navigation (Header)

```
Über mich | Meine Leistungen | Schadensprüfung | Termin buchen | Kontakt
```

- Schadensprüfung ist in der Nav, scrollt zur SchadenForm-Sektion
- Seite öffnet immer oben — kein Auto-Scroll beim Laden (kein Hash in URL speichern!)

## About-Sektion

- Kein Bento Grid (entfernt)
- Kein Badge ("6+ Jahre Erfahrung" entfernt)
- Kein Heading ("Mein Weg" etc. entfernt)
- Nur: Profilbild links + 3 Textblöcke rechts + Zitat unten

## Counter-Sektion

- Nur 3 Felder (kein 4. Feld)
- `grid-cols-3` (zentriert, Desktop + Mobile)
- Stats: 24h Reaktionszeit | 100% Weiterempfehlung | Kostenlos Erstgespräch
- "Kostenlos" ist statischer Text (kein AnimatedNumber)

## ProcessTimeline

5 Schritte:
1. Finanzanalyse (Search)
2. Individuelle Planung (ClipboardList)
3. Beratung & Konzept (BookOpen) — NEU: Konzept-Präsentation, Kunde entscheidet
4. Umsetzung (Rocket)
5. Dauerhafte Partnerschaft (Handshake)

## E-Mail-System

- **SMTP:** smtp.strato.de, Port 587 (STARTTLS) — Port 465 von Hetzner blockiert!
- **Absender:** Kontaktformular@cristinacroussen.de
- **Empfänger:** kontakt@cristinacroussen.de
- `secure: false` + `requireTLS: true`

## KI-Chat

- Ollama: `gemma3:1b` auf Server, `gemma3:4b` lokal
- URL Server: `http://ollama:11434` (Docker-Netzwerk `coolify`)
- Nur Deutsch, nur Versicherungs-/Finanzthemen, max 3-4 Sätze

## Deployment

- **Server:** Hetzner 46.225.208.184
- **Coolify:** http://46.225.208.184:8000, Token `15|fFvEJ0u8o0xb6agYQDkgve66QxafiDPTcK2Ak3MS4f46098b`
- **App UUID:** `wwc4cwwco8w04go00k8wkwgo`
- **Branch:** main → Auto-Deploy via Coolify

### Umgebungsvariablen (Coolify)
```
SMTP_HOST=smtp.strato.de
SMTP_PORT=587
SMTP_USER=Kontaktformular@cristinacroussen.de
SMTP_PASS=Sunny!1507
OLLAMA_URL=http://ollama:11434
OLLAMA_MODEL=gemma3:1b
```

## Bekannte Probleme & Lösungen

| Problem | Ursache | Lösung |
|---------|---------|--------|
| UTF-8 Korruption in .tsx | PowerShell Set-Content zerstört Umlaute | Python mit encoding='utf-8' verwenden |
| Build schlägt fehl | Lucide-Icon existiert nicht (z.B. `Presentation`) | Verfügbare Icons prüfen (BookOpen, FileText etc.) |
| SMTP Timeout | Hetzner blockiert Port 465 | Port 587 + STARTTLS |
| Ollama antwortet nicht | Falsches Modell/Netzwerk | gemma3:1b, http://ollama:11434 |

## Kontaktdaten

- **WhatsApp:** 0160 92282112
- **E-Mail:** kontakt@cristinacroussen.de
- **Termin:** https://www.cal.eu/cristinacroussen/15min

## Offene Punkte

- Cloudflare named Tunnel (feste URL) einrichten — Login hängt noch
- FloatingActions Feedback-URL: noch Platzhalter
- About-Bild: nur `profil.jpeg` und `neu.jpeg` aktiv
