import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getAllArticles } from '@/lib/kennisbank';

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
  const getCategoryClasses = (category: string) => {
    switch (category.toLowerCase()) {
      case 'administrativ':
        return 'bg-primary/5 text-primary border border-primary/10';
      case 'sănătate':
        return 'bg-carpathian-forest/5 text-carpathian-forest border border-carpathian-forest/10';
      case 'business':
        return 'bg-accent/5 text-accent border border-accent/10';
      default:
        return 'bg-muted-slate/5 text-muted-slate border border-outline-variant';
    }
  };

  // Get difficulty text styling
  const getDifficultyClasses = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'ușor':
        return 'text-carpathian-forest';
      case 'mediu':
        return 'text-amber-warning';
      case 'dificil':
        return 'text-tulip-crimson';
      default:
        return '';
    }
  };

  return (
    <div className="max-w-[840px] mx-auto px-6 py-10 w-full flex-grow">
      {/* Back Link */}
      <Link href="/" className="inline-flex items-center gap-2 font-semibold text-sm text-on-surface-variant hover:text-primary transition-all mb-6 group" id="back-to-home-link">
        <span className="group-hover:-translate-x-1 transition-transform">←</span> Înapoi la ghiduri
      </Link>

      {/* Article Header */}
      <header className="mb-6">
        <div className="flex items-center gap-4 mb-3 text-xs font-semibold">
          <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${getCategoryClasses(article.category)}`}>
            {article.category}
          </span>
          <span className="text-outline">
            Actualizat: {new Date(article.date).toLocaleDateString('ro-RO', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>
        <h1 className="font-headline text-3xl sm:text-4xl font-extrabold text-transylvanian-charcoal leading-tight tracking-tight mb-4" id="article-title">
          {article.title}
        </h1>
        <p className="text-on-surface-variant text-base border-l-2 border-l-accent pl-4 my-6 italic">
          {article.summary}
        </p>
      </header>

      {/* Procedural Dashboard (High Density Metadata Card) */}
      <section className="bg-surface-container border border-outline-variant border-t-4 border-t-accent rounded-xl p-5 mb-8 shadow-sm" id="procedural-dashboard">
        <div className="flex items-center gap-2 font-headline font-bold text-xs uppercase tracking-wider text-accent-dark border-b border-outline-variant pb-3 mb-4">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          <span>Fișă Procedură Administrativă</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {article.authority && (
            <div className="flex flex-col">
              <span className="text-[10px] text-outline uppercase font-bold tracking-wider mb-1">Instituție responsabilă</span>
              <span className="text-sm font-bold text-transylvanian-charcoal leading-tight">{article.authority}</span>
            </div>
          )}
          {article.cost && (
            <div className="flex flex-col">
              <span className="text-[10px] text-outline uppercase font-bold tracking-wider mb-1">Cost oficial estimat</span>
              <span className="text-sm font-bold text-transylvanian-charcoal leading-tight">{article.cost}</span>
            </div>
          )}
          {article.duration && (
            <div className="flex flex-col">
              <span className="text-[10px] text-outline uppercase font-bold tracking-wider mb-1">Timp de finalizare</span>
              <span className="text-sm font-bold text-transylvanian-charcoal leading-tight">{article.duration}</span>
            </div>
          )}
          {article.difficulty && (
            <div className="flex flex-col">
              <span className="text-[10px] text-outline uppercase font-bold tracking-wider mb-1">Grad dificultate</span>
              <span className={`text-sm font-bold leading-tight ${getDifficultyClasses(article.difficulty)}`}>
                {article.difficulty}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Article Body */}
      <article
        className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 sm:p-8 shadow-sm markdown-content"
        id="article-body-content"
        dangerouslySetInnerHTML={{ __html: formattedContentHtml }}
      />

      {/* Call to action for help */}
      <section className="bg-surface border border-outline-variant border-l-4 border-l-primary rounded-xl p-8 mt-10 flex flex-col gap-4 shadow-sm" id="detail-ai-cta">
        <h3 className="font-headline text-lg font-bold text-primary mb-0">Ai nevoie de lămuriri suplimentare?</h3>
        <p className="text-on-surface-variant text-sm leading-relaxed mb-1">
          Dacă vrei să știi mai multe detalii despre pașii descriși în ghidul „{article.title}” sau ai un caz specific, asistentul nostru AI te poate ghida gratuit în limba română.
        </p>
        <Link href={`/asistent?topic=${encodeURIComponent(article.title)}`} className="self-start font-semibold text-white bg-accent hover:bg-accent-dark px-5 py-2.5 rounded transition-all text-xs flex items-center gap-1.5 shadow-sm" id="detail-chat-btn">
          Adresează o întrebare <span>→</span>
        </Link>
      </section>
    </div>
  );
}
