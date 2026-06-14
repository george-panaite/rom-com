import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import Link from 'next/link';
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Ghid & Markt Olanda | Comunitatea ta în Olanda",
    template: "%s | Ghid & Markt Olanda"
  },
  description: "Platformă independentă cu informații oficiale, proceduri administrative traduse (BSN, asigurări, KVK, taxe) și asistent AI dedicat românilor din Olanda.",
  keywords: ["Olanda", "romani in Olanda", "BSN Olanda", "KVK Olanda", "asigurare medicala Olanda", "ZZP Olanda", "asistent AI", "Belastingdienst", "Gemeente"],
  openGraph: {
    title: "Ghid & Markt Olanda | Comunitatea ta în Olanda",
    description: "Informații de încredere despre viața, munca și afacerile în Olanda. Întreabă asistentul nostru AI despre procedurile administrative.",
    locale: "ro_RO",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className={`light ${outfit.variable} ${inter.variable}`}>
      <body className="bg-background text-on-surface font-body min-h-screen flex flex-col">
        
        {/* Global Navigation Header */}
        <header className="w-full sticky top-0 z-50 bg-surface-container-lowest border-b border-outline-variant shadow-sm">
          <div className="flex justify-between items-center px-6 max-w-[1200px] mx-auto h-16">
            <Link href="/" id="nav-logo-link" className="flex items-center gap-2.5 font-headline font-extrabold text-xl text-primary tracking-tight">
              <span className="bg-primary text-white px-2 py-0.5 rounded text-sm font-body font-black">RO</span>
              <span>Ghid Olanda</span>
            </Link>
            
            <nav className="flex gap-6 items-center">
              <Link href="/" id="nav-home-link" className="font-semibold text-on-surface-variant hover:text-primary transition-colors text-sm">
                Ghiduri
              </Link>
              <Link href="/asistent" id="nav-assistant-link" className="font-semibold text-white bg-primary hover:bg-navy-abyss px-3 py-1.5 rounded transition-all text-xs flex items-center gap-1.5 shadow-sm">
                <span>Asistent AI</span>
                <span className="bg-white/20 text-[10px] px-1 py-0.2 rounded font-bold">Beta</span>
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Application Body */}
        <main className="flex-grow flex flex-col">
          {children}
        </main>

        {/* Global Footer */}
        <footer className="bg-transylvanian-charcoal text-surface border-t border-outline/10 py-12 mt-auto text-sm">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex flex-wrap justify-between gap-10 mb-10">
              <div className="max-w-md">
                <h3 className="font-headline text-white font-bold text-lg mb-4">Ghid & Markt Olanda</h3>
                <p className="text-on-surface-variant/80 text-gray-300 leading-relaxed">
                  O platformă independentă creată pentru a ajuta comunitatea română să navigheze prin sistemul administrativ olandez. Informații sigure, clare și la îndemână, lipsite de jargon inutil.
                </p>
              </div>
              <div>
                <h4 className="font-headline text-white font-bold mb-4 uppercase tracking-wider text-xs">Link-uri Utile</h4>
                <ul className="space-y-2.5 text-gray-400">
                  <li>
                    <Link href="/" className="hover:text-white transition-colors">Ghiduri & Articole</Link>
                  </li>
                  <li>
                    <Link href="/asistent" className="hover:text-white transition-colors">Asistent Virtual AI</Link>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-between items-center gap-4 pt-6 border-t border-white/5 text-xs text-gray-500">
              <p>&copy; {new Date().getFullYear()} Ghid Olanda. Toate drepturile rezervate. Creat ca document de portofoliu.</p>
              <div className="flex gap-4">
                <span>Informații Neoficiale</span>
                <span>•</span>
                <span>Asistență AI (EU AI Act Compliant)</span>
                <span>•</span>
                <span>Proiect Educativ</span>
              </div>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}
