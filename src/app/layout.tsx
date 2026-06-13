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
    default: "Ghidul Românului în Olanda | Centru de Informații & Asistent AI",
    template: "%s | Ghidul Românului în Olanda"
  },
  description: "Platformă centralizată cu informații oficiale, ghiduri practice (BSN, asigurări, KVK, taxe) și asistent AI dedicat comunității române din Olanda.",
  keywords: ["Olanda", "romani in Olanda", "BSN Olanda", "KVK Olanda", "asigurare medicala Olanda", "ZZP Olanda", "asistent AI", "Belastingdienst", "Gemeente"],
  openGraph: {
    title: "Ghidul Românului în Olanda | Centru de Informații & Asistent AI",
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
    <html lang="ro" className={`${outfit.variable} ${inter.variable}`}>
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--background)" }}>
        
        {/* Global Navigation Header */}
        <header style={{
          backgroundColor: "var(--card-background)",
          borderBottom: "1px solid var(--border)",
          position: "sticky",
          top: 0,
          zIndex: 100,
          boxShadow: "var(--shadow-sm)"
        }}>
          <div className="container" style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "70px"
          }}>
            <Link href="/" id="nav-logo-link" style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontWeight: 800,
              fontSize: "1.4rem",
              color: "var(--primary)",
              fontFamily: "var(--font-outfit)",
              letterSpacing: "-0.5px"
            }}>
              <span style={{
                backgroundColor: "var(--primary)",
                color: "white",
                padding: "4px 10px",
                borderRadius: "var(--radius-sm)",
                fontSize: "1.2rem",
                fontWeight: 900
              }}>RO</span>
              <span>Ghid Olanda</span>
            </Link>
            
            <nav style={{ display: "flex", gap: "24px", alignItems: "center" }}>
              <Link href="/" id="nav-home-link" style={{
                fontWeight: 600,
                color: "var(--text-secondary)",
                fontSize: "0.95rem"
              }}>
                Ghiduri
              </Link>
              <Link href="/asistent" id="nav-assistant-link" style={{
                fontWeight: 600,
                color: "white",
                backgroundColor: "var(--primary)",
                padding: "8px 16px",
                borderRadius: "var(--radius-sm)",
                fontSize: "0.9rem",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: "var(--shadow-sm)"
              }}>
                <span>Asistent AI</span>
                <span style={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  fontSize: "0.75rem",
                  padding: "1px 6px",
                  borderRadius: "10px",
                  fontWeight: 700
                }}>Beta</span>
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Application Body */}
        <main style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          {children}
        </main>

        {/* Global Footer */}
        <footer style={{
          backgroundColor: "var(--primary-dark)",
          color: "white",
          padding: "3rem 0 2rem 0",
          marginTop: "auto",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)"
        }}>
          <div className="container">
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: "2rem",
              marginBottom: "2rem"
            }}>
              <div style={{ maxWidth: "400px" }}>
                <h3 style={{ color: "white", fontSize: "1.2rem", marginBottom: "0.75rem" }}>Ghidul Românului în Olanda</h3>
                <p style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "0.9rem" }}>
                  O platformă independentă creată pentru a ajuta comunitatea română să navigheze prin sistemul administrativ olandez. Informații sigure, clare și la îndemână.
                </p>
              </div>
              <div>
                <h4 style={{ color: "white", fontSize: "1rem", marginBottom: "0.75rem" }}>Link-uri Utile</h4>
                <ul style={{ listStyle: "none", padding: 0, fontSize: "0.9rem" }}>
                  <li style={{ marginBottom: "0.5rem" }}>
                    <Link href="/" style={{ color: "rgba(255, 255, 255, 0.7)" }}>Ghiduri & Articole</Link>
                  </li>
                  <li style={{ marginBottom: "0.5rem" }}>
                    <Link href="/asistent" style={{ color: "rgba(255, 255, 255, 0.7)" }}>Asistent Virtual AI</Link>
                  </li>
                </ul>
              </div>
            </div>
            <hr style={{ borderColor: "rgba(255, 255, 255, 0.1)", margin: "1.5rem 0" }} />
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
              fontSize: "0.85rem",
              color: "rgba(255, 255, 255, 0.5)"
            }}>
              <p>&copy; {new Date().getFullYear()} Ghid Olanda. Toate drepturile rezervate. Creat ca document de portofoliu.</p>
              <p style={{ display: "flex", gap: "12px" }}>
                <span>Informații Neoficiale</span>
                <span>•</span>
                <span>Proiect Educativ</span>
              </p>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}
