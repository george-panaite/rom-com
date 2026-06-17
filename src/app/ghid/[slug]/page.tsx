import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug, getAllArticles } from "@/lib/kennisbank";
import { getCategoryStyle } from "@/lib/guide-style";
import { ArrowLeft, ArrowRight, ExternalLink, FileText } from "@/components/icons";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Ghidul nu a fost găsit" };
  return { title: article.title, description: article.summary };
}

/* Inline Lucide-identical icons for the callout titles (server-rendered HTML). */
const svg = (paths: string) =>
  `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
const TIP_SVG = svg(
  '<path d="M15 14c.2-1 .7-1.7 1.5-2.5C17.7 10.2 18 9 18 7.5a6 6 0 0 0-12 0c0 1.5.3 2.7 1.5 4 .8.8 1.3 1.5 1.5 2.5"/><path d="M9 18h6M10 22h4"/>'
);
const WARN_SVG = svg(
  '<path d="M10.3 3.3 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.3a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/>'
);
const NOTE_SVG = svg(
  '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>'
);

/**
 * Turns marked's `> [!TYPE]` blockquotes into Acasă callouts with a
 * coloured title row + icon. The element stays a <blockquote> so the
 * trailing </p></blockquote> remains valid; `.callout` styles it.
 */
function formatAlerts(html: string): string {
  if (!html) return "";
  const open = (variant: string, svgStr: string, label: string) =>
    `<blockquote class="callout ${variant}"><div class="ct">${svgStr} ${label}</div><p>`;
  return html
    .replace(/<blockquote>\s*<p>\s*\[!NOTE\]\s*(?:<br\s*\/?>)?/gi, open("note", NOTE_SVG, "Bun de știut"))
    .replace(/<blockquote>\s*<p>\s*\[!TIP\]\s*(?:<br\s*\/?>)?/gi, open("tip", TIP_SVG, "Sfat util"))
    .replace(/<blockquote>\s*<p>\s*\[!WARNING\]\s*(?:<br\s*\/?>)?/gi, open("warning", WARN_SVG, "Atenție"))
    .replace(/<blockquote>\s*<p>\s*\[!IMPORTANT\]\s*(?:<br\s*\/?>)?/gi, open("warning", WARN_SVG, "Important"))
    .replace(/<blockquote>\s*<p>\s*\[!CAUTION\]\s*(?:<br\s*\/?>)?/gi, open("warning", WARN_SVG, "Atenție"));
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const bodyHtml = formatAlerts(article.contentHtml);
  const { tint } = getCategoryStyle(article.category);
  const updated = article.date
    ? new Date(article.date).toLocaleDateString("ro-RO", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const fisa = [
    { l: "Instituție", v: article.authority },
    { l: "Cost oficial", v: article.cost },
    { l: "Timp", v: article.duration },
    { l: "Dificultate", v: article.difficulty },
  ].filter((c) => c.v);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.summary,
    inLanguage: "ro-RO",
    ...(article.date ? { datePublished: article.date, dateModified: article.date } : {}),
    author: { "@type": "Organization", name: "Ghid Olanda" },
    publisher: { "@type": "Organization", name: "Ghid Olanda" },
  };

  return (
    <div className="pt-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-[1180px] px-5 sm:px-7">
        <Link
          href="/"
          className="inline-flex items-center gap-[9px] text-sm font-semibold text-soft transition-[gap,color] duration-200 hover:gap-[13px] hover:text-poppy"
        >
          <ArrowLeft className="h-[17px] w-[17px]" />
          Înapoi la ghiduri
        </Link>

        {/* Header */}
        <header className="mx-auto mt-7 max-w-[730px]">
          <div className="mb-4 flex flex-wrap items-center gap-3.5">
            <span
              className={`rounded-full px-[13px] py-1.5 text-xs font-bold uppercase tracking-[0.05em] ${tint}`}
            >
              {article.category}
            </span>
            {updated && (
              <span className="text-[13px] font-semibold text-faint">
                Actualizat {updated}
              </span>
            )}
          </div>
          <h1 className="font-display text-[clamp(34px,5vw,56px)] font-extrabold leading-[1.02] tracking-[-0.025em]">
            {article.title}
          </h1>
          <p className="mt-5 text-[20px] leading-[1.5] text-soft">{article.summary}</p>
        </header>

        {/* Fișă (dossier) card */}
        {fisa.length > 0 && (
          <section className="mx-auto my-9 max-w-[730px] overflow-hidden rounded-[22px] border border-line bg-card">
            <div className="flex items-center gap-2.5 bg-pine px-6 py-[13px] text-[13px] font-bold tracking-[0.04em] text-paper">
              <FileText className="h-[17px] w-[17px]" />
              Fișă procedură
            </div>
            <div className="grid grid-cols-1 gap-px bg-line min-[561px]:grid-cols-2 min-[881px]:grid-cols-4">
              {fisa.map((cell) => (
                <div key={cell.l} className="bg-card px-[22px] py-5">
                  <div className="text-[11.5px] font-bold uppercase tracking-[0.04em] text-faint">
                    {cell.l}
                  </div>
                  <div className="mt-[7px] font-display text-[19px] font-bold leading-[1.1]">
                    {cell.v}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Body */}
        <article
          className="prose-acasa"
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />

        {/* Official sources */}
        {article.sources && article.sources.length > 0 && (
          <section className="mx-auto mt-10 max-w-[730px] border-t border-line2 pt-6">
            <div className="mb-3.5 text-xs font-bold uppercase tracking-[0.06em] text-faint">
              Surse oficiale
            </div>
            {article.sources.map((s) => (
              <a
                key={s.url}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-[11px] border-b border-line py-2.5 text-[15px] text-soft transition-[color,gap] duration-200 last:border-b-0 hover:gap-[15px] hover:text-poppy-d"
              >
                <ExternalLink className="h-4 w-4 flex-none text-pine" />
                {s.label}
              </a>
            ))}
          </section>
        )}

        {/* Ana CTA */}
        <Link
          href={`/asistent?topic=${encodeURIComponent(article.title)}`}
          className="mx-auto mt-11 flex max-w-[730px] flex-wrap items-center gap-6 rounded-[24px] bg-pine p-8 text-paper"
        >
          <span className="ana-face h-16 w-16 rounded-full text-[30px]">A</span>
          <div className="min-w-[230px] flex-1">
            <h4 className="font-display text-[23px] font-bold">Ai un caz specific?</h4>
            <p className="mt-[5px] text-[14.5px] text-white/80">
              Ana cunoaște acest ghid și îți răspunde pe loc, în limba română.
            </p>
          </div>
          <span className="btn btn-ink">
            Întreabă pe Ana
            <span className="arr">
              <ArrowRight />
            </span>
          </span>
        </Link>

        {/* Community Q&A teaser */}
        <section className="mx-auto mb-16 mt-12 max-w-[730px]">
          <span className="eyebrow eyebrow-pine">Din comunitate, în curând</span>
          <div className="mt-4 rounded-[22px] border border-line bg-card p-7 text-center">
            <p className="text-[15.5px] text-soft">
              În curând vei putea citi întrebări și răspunsuri reale de la români care au
              trecut prin aceeași procedură. Până atunci, întreab-o pe{" "}
              <Link href="/asistent" className="font-semibold text-poppy-d underline underline-offset-2">
                Ana
              </Link>
              .
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
