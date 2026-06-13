"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArticleMetadata } from '@/lib/kennisbank';
import styles from './KennisbankExplorer.module.css';

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
    <div className={styles.explorerContainer}>
      {/* Search & Filter Section */}
      <div className={styles.searchSection}>
        <div className={styles.searchInputWrapper}>
          <input
            type="text"
            id="kennisbank-search-input"
            className={styles.searchInput}
            placeholder="Caută în ghiduri... (de ex. BSN, asigurare, KVK)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Buttons */}
        <div className={styles.categoriesList}>
          {categories.map((category) => (
            <button
              key={category}
              id={`cat-btn-${category.toLowerCase().replace(/\s+/g, '-')}`}
              className={`${styles.categoryButton} ${
                selectedCategory === category ? styles.categoryActive : ''
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className={styles.articleGrid}>
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <article key={article.slug} className={styles.articleCard} id={`article-card-${article.slug}`}>
              <span className={`${styles.cardCategory} ${getCategoryClass(article.category)}`}>
                {article.category}
              </span>
              <h3 className={styles.cardTitle}>{article.title}</h3>
              <p className={styles.cardSummary}>{article.summary}</p>
              <div className={styles.cardFooter}>
                <span className={styles.cardDate}>
                  {new Date(article.date).toLocaleDateString('ro-RO', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <Link href={`/ghid/${article.slug}`} className={styles.cardLink} id={`read-link-${article.slug}`}>
                  Citește ghidul <span>→</span>
                </Link>
              </div>
            </article>
          ))
        ) : (
          <div className={styles.noResults} id="search-no-results">
            <h3>Nu am găsit niciun ghid</h3>
            <p style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
              Încearcă alte cuvinte cheie sau întreabă asistentul nostru AI despre această temă.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
