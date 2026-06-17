import type { Metadata } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  variable: "--font-bricolage",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-hanken",
});

export const metadata: Metadata = {
  title: {
    default: "Ghid Olanda | Comunitatea ta în Olanda",
    template: "%s | Ghid Olanda",
  },
  description:
    "Platformă independentă cu informații oficiale, proceduri administrative traduse (BSN, asigurări, KVK, taxe) și asistenta AI Ana, dedicate românilor din Olanda.",
  keywords: [
    "Olanda",
    "romani in Olanda",
    "BSN Olanda",
    "KVK Olanda",
    "asigurare medicala Olanda",
    "ZZP Olanda",
    "asistent AI",
    "Belastingdienst",
    "Gemeente",
  ],
  openGraph: {
    title: "Ghid Olanda | Comunitatea ta în Olanda",
    description:
      "Informații de încredere despre viața, munca și afacerile în Olanda. Întreabă asistenta noastră AI, Ana, despre procedurile administrative.",
    locale: "ro_RO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className={`${bricolage.variable} ${hanken.variable}`}>
      <body className="flex min-h-screen flex-col bg-paper font-body text-ink">
        <SiteHeader />
        <main className="flex flex-grow flex-col">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
