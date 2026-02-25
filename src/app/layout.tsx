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
import ColorToggle from "@/components/ColorToggle";

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
  title: "Cristina Croußen | Finanzcoach & Vermögensberaterin",
  description:
    "Unabhängige Finanzberatung & Vermögensaufbau mit Cristina Croußen. Schadensprüfung, persönliche Beratung und langfristige Finanzplanung in Heinsberg.",
  keywords: [
    "Finanzberatung",
    "Vermögensberatung",
    "Heinsberg",
    "DVAG",
    "Schadensprüfung",
    "Finanzcoach",
    "Cristina Croußen",
  ],
  authors: [{ name: "Cristina Croußen" }],
  openGraph: {
    title: "Cristina Croußen | Finanzcoach & Vermögensberaterin",
    description:
      "Unabhängige Finanzberatung & Vermögensaufbau – persönlich & transparent.",
    type: "website",
    locale: "de_DE",
    siteName: "Cristina Croußen Finanzberatung",
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
        <ColorToggle />
      </body>
    </html>
  );
}
