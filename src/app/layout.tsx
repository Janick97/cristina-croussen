import type { Metadata } from "next";
import { Londrina_Solid, Caveat, Assistant } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieBanner from "@/components/CookieBanner";
import StickyCTA from "@/components/StickyCTA";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import PageLoader from "@/components/PageLoader";
import AiChat from "@/components/AiChat";
import ScrollProgress from "@/components/ScrollProgress";

const londrina = Londrina_Solid({
  weight: ["300", "400", "900"],
  subsets: ["latin"],
  variable: "--font-londrina",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

const assistant = Assistant({
  subsets: ["latin"],
  variable: "--font-assistant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cristinacroussen.de"),
  title: "Cristina Croußen | Finanzcoach Heinsberg – Finanzberatung & Schadensprüfung",
  description:
    "Finanzcoach Heinsberg: Cristina Croußen bietet persönliche Finanzberatung, Schadensprüfung, Vermögensaufbau und Altersvorsorge. Kostenlose Erstanalyse – jetzt Termin buchen.",
  keywords: [
    "Finanzcoach Heinsberg",
    "Finanzberatung",
    "Schadensprüfung",
    "Vermögensberatung",
    "Finanzberatung Heinsberg",
    "Cristina Croußen",
    "Altersvorsorge",
    "Berufsunfähigkeit",
    "Versicherungsberatung",
  ],
  authors: [{ name: "Cristina Croußen" }],
  openGraph: {
    title: "Cristina Croußen | Finanzcoach Heinsberg – Finanzberatung",
    description:
      "Persönliche Finanzberatung & Schadensprüfung in Heinsberg. Kostenlose Erstanalyse mit Cristina Croußen – Vermögensberater Assistentin.",
    type: "website",
    locale: "de_DE",
    siteName: "Cristina Croußen Finanzberatung",
    images: [
      {
        url: "/images/profil.jpeg",
        width: 800,
        height: 1000,
        alt: "Cristina Croußen – Finanzcoach & Vermögensberater Assistentin",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="scroll-smooth">
      <body
        className={`${londrina.variable} ${caveat.variable} ${assistant.variable} antialiased`}
      >
        <PageLoader />
        <StickyCTA />
        <Header />
        <ScrollProgress />
        <main>{children}</main>
        <Footer />
        <AiChat />
        <WhatsAppButton />
        <CookieBanner />
        <ExitIntentPopup />
      </body>
    </html>
  );
}
