import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

export interface ArticleMetadata {
  title: string;
  slug: string;
  category: string;
  summary: string;
  date: string;
}

export interface Article extends ArticleMetadata {
  contentHtml: string;
  contentRaw: string;
}

const ghiduriDirectory = path.join(process.cwd(), 'src/content/ghiduri');

// Helper to check if directory exists and create it if not (or just return empty array if empty)
function ensureDirectoryExists() {
  if (!fs.existsSync(ghiduriDirectory)) {
    fs.mkdirSync(ghiduriDirectory, { recursive: true });
  }
}

export function getAllArticles(): ArticleMetadata[] {
  ensureDirectoryExists();
  const fileNames = fs.readdirSync(ghiduriDirectory);
  const allArticlesData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(ghiduriDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the metadata section
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        category: data.category || 'General',
        summary: data.summary || '',
        date: data.date || '',
        ...data,
      } as ArticleMetadata;
    });

  // Sort articles by date or title
  return allArticlesData.sort((a, b) => (a.title > b.title ? 1 : -1));
}

export function getArticleBySlug(slug: string): Article | null {
  ensureDirectoryExists();
  const fullPath = path.join(ghiduriDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Parse markdown content to HTML
  const contentHtml = marked.parse(content) as string;

  return {
    slug,
    title: data.title || slug,
    category: data.category || 'General',
    summary: data.summary || '',
    date: data.date || '',
    contentHtml,
    contentRaw: content,
  };
}

export function getAllArticlesWithContent(): Article[] {
  ensureDirectoryExists();
  const fileNames = fs.readdirSync(ghiduriDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(ghiduriDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      const contentHtml = marked.parse(content) as string;

      return {
        slug,
        title: data.title || slug,
        category: data.category || 'General',
        summary: data.summary || '',
        date: data.date || '',
        contentHtml,
        contentRaw: content,
      };
    });
}
