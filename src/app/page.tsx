import Link from 'next/link';
import { getAllArticles } from '@/lib/kennisbank';
import KennisbankExplorer from '@/components/KennisbankExplorer';

export default function Home() {
  const articles = getAllArticles();

  return (
    <div className="flex-grow flex flex-col">
      {/* Editorial Header Section */}
      <section className="bg-surface-container-low border-b border-outline-variant py-12">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-3xl">
            <span className="inline-block bg-primary/5 text-primary border border-primary/15 px-3 py-1 rounded text-[11px] font-bold uppercase tracking-wider mb-4">
              Resursă Independentă
            </span>
            <h1 className="font-headline text-3xl sm:text-4xl font-extrabold text-transylvanian-charcoal leading-tight tracking-tight mb-4">
              Proceduri administrative și ghiduri de integrare în Olanda
            </h1>
            <p className="text-on-surface-variant text-base sm:text-lg leading-relaxed max-w-2xl">
              Informații oficiale traduse, instrucțiuni pas cu pas și repere administrative verificate de redactori umani, sprijinite de asistență digitală inteligentă.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section id="kennisbank-explorer" className="py-12 max-w-[1200px] mx-auto px-6 w-full" style={{ scrollMarginTop: '80px' }}>
        
        {/* Interactive Kennisbank Search & Grid */}
        <KennisbankExplorer initialArticles={articles} />

        {/* Call to Action for AI Assistant */}
        <div className="bg-surface-container-lowest border border-outline-variant border-l-4 border-l-accent rounded-xl p-8 mt-12 flex flex-wrap items-center justify-between gap-6 shadow-sm" id="ai-assistant-cta">
          <div className="max-w-2xl">
            <h3 className="font-headline text-primary font-bold text-xl mb-2">Cauți clarificări suplimentare sau specifice?</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Asistentul nostru virtual citește în timp real ghidurile oficiale ale platformei și te poate ajuta să parcurgi procedurile birocratice olandeze, răspunzându-ți pe loc în limba română.
            </p>
          </div>
          <Link href="/asistent" className="bg-primary hover:bg-navy-abyss text-white font-semibold px-6 py-3 rounded transition-all text-sm flex items-center gap-1.5 shadow-sm" id="cta-chat-btn">
            Întreabă Asistentul <span>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
