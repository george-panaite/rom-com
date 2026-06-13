import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getAllArticles } from '@/lib/kennisbank';
import styles from './page.module.css';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generates static paths for all articles at build time
export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// Generate metadata dynamically for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) {
    return {
      title: 'Ghidul nu a fost găsit',
    };
  }

  return {
    title: article.title,
    description: article.summary,
  };
}

// Helper to format blockquotes with alerts like > [!WARNING] into specific CSS classes
function formatAlerts(html: string): string {
  if (!html) return '';
  return html
    .replace(/<blockquote>\s*<p>\s*\[!NOTE\]\s*(?:<br\s*\/?>)?/gi, '<blockquote class="alert-note"><p>')
    .replace(/<blockquote>\s*<p>\s*\[!TIP\]\s*(?:<br\s*\/?>)?/gi, '<blockquote class="alert-tip"><p>')
    .replace(/<blockquote>\s*<p>\s*\[!WARNING\]\s*(?:<br\s*\/?>)?/gi, '<blockquote class="alert-warning"><p>')
    .replace(/<blockquote>\s*<p>\s*\[!CAUTION\]\s*(?:<br\s*\/?>)?/gi, '<blockquote class="alert-caution"><p>');
}

export default async function ArticlePage({ params }: PageProps) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  const formattedContentHtml = formatAlerts(article.contentHtml);

  // Get specific styling class for categories
  const getCategoryClass = (category: string) => {
    switch (category.toLowerCase()) {
      case 'administrativ':
        return styles.catAdministrativ;
      case 'sănătate':
        return styles.catSănătate;
      case 'business':
        return styles.catBusiness;
      default:
        return styles.catGeneral;
    }
  };

  return (
    <div className="container" style={{ flexGrow: 1 }}>
      <div className={styles.pageContainer}>
        {/* Back Link */}
        <Link href="/" className={styles.backLink} id="back-to-home-link">
          <span>←</span> Înapoi la ghiduri
        </Link>

        {/* Article Header */}
        <header className={styles.articleHeader}>
          <div className={styles.metaInfo}>
            <span className={`${styles.categoryBadge} ${getCategoryClass(article.category)}`}>
              {article.category}
            </span>
            <span className={styles.date}>
              Actualizat la:{' '}
              {new Date(article.date).toLocaleDateString('ro-RO', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
          <h1 className={styles.articleTitle} id="article-title">{article.title}</h1>
          <p className={styles.summary}>{article.summary}</p>
        </header>

        {/* Article Body */}
        <article className={`${styles.articleBody} markdown-content`} id="article-body-content"
          dangerouslySetInnerHTML={{ __html: formattedContentHtml }}
        />

        {/* Call to action for help */}
        <section className={styles.assistBox} id="detail-ai-cta">
          <h3 className={styles.assistTitle}>Mai ai întrebări pe această temă?</h3>
          <p className={styles.assistText}>
            Asistentul nostru virtual te poate ajuta cu clarificări suplimentare. Îți poate explica procedurile în detaliu sau te poate ghida către alți pași necesari integrării tale.
          </p>
          <Link href={`/asistent?topic=${encodeURIComponent(article.title)}`} className={styles.assistBtn} id="detail-chat-btn">
            Întreabă Asistentul AI
          </Link>
        </section>
      </div>
    </div>
  );
}
