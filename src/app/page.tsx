import Link from 'next/link';
import { getAllArticles } from '@/lib/kennisbank';
import KennisbankExplorer from '@/components/KennisbankExplorer';
import styles from './page.module.css';

export default function Home() {
  const articles = getAllArticles();

  return (
    <div>
      {/* Hero Header Section */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>Platformă Independentă</span>
            <h1 className={styles.heroTitle} id="main-title">
              Ghidul Tău de Integrare în Olanda
            </h1>
            <p className={styles.heroSubtitle}>
              Informații oficiale traduse, ghiduri pas cu pas și răspunsuri rapide la întrebările tale administrative. Simplifică-ți tranziția și cunoaște-ți drepturile.
            </p>
            <div className={styles.heroActions}>
              <a href="#kennisbank-explorer" className={styles.primaryBtn} id="hero-browse-btn">
                Răsfoiește Ghidurile
              </a>
              <Link href="/asistent" className={styles.secondaryBtn} id="hero-ask-btn">
                Întreabă Asistentul AI
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section id="kennisbank-explorer" className={styles.sectionContainer} style={{ scrollMarginTop: '80px' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Ghiduri și Proceduri Utile</h2>
            <p className={styles.sectionSubtitle}>
              Selectează o categorie sau folosește bara de căutare pentru a găsi pașii necesari pentru demersurile tale.
            </p>
          </div>

          {/* Interactive Kennisbank Search & Grid */}
          <KennisbankExplorer initialArticles={articles} />

          {/* Call to Action for AI Assistant */}
          <div className={styles.ctaBox} id="ai-assistant-cta">
            <div className={styles.ctaText}>
              <h3 className={styles.ctaTitle}>Ai o întrebare specifică sau complexă?</h3>
              <p className={styles.ctaDescription}>
                Asistentul nostru virtual deține cunoștințe detaliate despre toate ghidurile din platformă și reglementările olandeze. Îți poate răspunde instantaneu în limba română!
              </p>
            </div>
            <Link href="/asistent" className={styles.ctaBtn} id="cta-chat-btn">
              Discută cu Asistentul AI
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
