"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArticleMetadata } from '@/lib/kennisbank';

interface KennisbankExplorerProps {
  initialArticles: ArticleMetadata[];
}

export default function KennisbankExplorer({ initialArticles }: KennisbankExplorerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toate');

  // Extract unique categories dynamically
  const categories = ['Toate', ...Array.from(new Set(initialArticles.map((a) => a.category)))];

  // Filter logic
  const filteredArticles = initialArticles.filter((article) => {
    const matchesCategory = selectedCategory === 'Toate' || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
    <div className="flex flex-col gap-6">
      {/* Search & Filter Section */}
      <div className="flex flex-col gap-4">
        <div className="relative w-full flex items-center">
          <span className="absolute left-4 text-outline pointer-events-none flex items-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <input
            type="text"
            id="kennisbank-search-input"
            className="w-full pl-11 pr-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary text-sm shadow-sm transition-all"
            placeholder="Caută proceduri administrative... (de ex. BSN, asigurare, KVK)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              id={`cat-btn-${category.toLowerCase().replace(/\s+/g, '-')}`}
              className={`px-4 py-1.5 text-xs font-semibold rounded border transition-all cursor-pointer ${
                selectedCategory === category
                  ? 'bg-primary border-primary text-white shadow-sm'
                  : 'bg-surface-container-lowest border-outline-variant text-on-surface-variant hover:border-outline hover:text-primary'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <article
              key={article.slug}
              className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col hover:border-outline hover:shadow-md transition-all"
              id={`article-card-${article.slug}`}
            >
              <div className="flex justify-between items-center mb-3">
                <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${getCategoryClasses(article.category)}`}>
                  {article.category}
                </span>
              </div>
              
              <h3 className="font-headline text-lg font-bold text-transylvanian-charcoal mb-2 leading-snug">
                {article.title}
              </h3>
              
              <p className="text-on-surface-variant text-sm mb-5 flex-grow leading-relaxed">
                {article.summary}
              </p>
              
              {/* Procedural Metadata Grid (High density) */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 py-3.5 border-t border-b border-dashed border-outline-variant bg-surface/40 rounded-lg px-4 mb-5 -mx-6 text-xs">
                {article.authority && (
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] text-outline uppercase font-bold tracking-wider mb-0.5">Instituție:</span>
                    <span className="font-semibold text-transylvanian-charcoal truncate" title={article.authority}>
                      {article.authority}
                    </span>
                  </div>
                )}
                {article.cost && (
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] text-outline uppercase font-bold tracking-wider mb-0.5">Cost oficial:</span>
                    <span className="font-semibold text-transylvanian-charcoal truncate">
                      {article.cost}
                    </span>
                  </div>
                )}
                {article.duration && (
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] text-outline uppercase font-bold tracking-wider mb-0.5">Timp de lucru:</span>
                    <span className="font-semibold text-transylvanian-charcoal truncate">
                      {article.duration}
                    </span>
                  </div>
                )}
                {article.difficulty && (
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] text-outline uppercase font-bold tracking-wider mb-0.5">Dificultate:</span>
                    <span className={`font-semibold truncate ${getDifficultyClasses(article.difficulty)}`}>
                      {article.difficulty}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center text-xs mt-auto font-medium">
                <span className="text-outline">
                  Ref: {new Date(article.date).toLocaleDateString('ro-RO', {
                    year: 'numeric',
                    month: 'short'
                  })}
                </span>
                <Link
                  href={`/ghid/${article.slug}`}
                  className="font-bold text-accent hover:text-accent-dark transition-colors flex items-center gap-0.5"
                  id={`read-link-${article.slug}`}
                >
                  Vezi procedura <span>→</span>
                </Link>
              </div>
            </article>
          ))
        ) : (
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-10 text-center col-span-full shadow-sm" id="search-no-results">
            <h3 className="font-headline font-bold text-lg text-primary">Nu am găsit nicio procedură</h3>
            <p className="mt-1.5 text-on-surface-variant text-sm">
              Încearcă alți termeni de căutare sau folosește asistentul AI de mai jos pentru ghidare.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
