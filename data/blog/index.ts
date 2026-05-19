import type { Article } from './types';

// Auto-discover all articles via Vite's import.meta.glob.
// Each article file must default-export an Article object.
const modules = import.meta.glob<{ default: Article }>('./articles/*.ts', { eager: true });

const registry: Record<string, Article> = {};
for (const path in modules) {
  const article = modules[path].default;
  if (article && article.slug) {
    registry[article.slug] = article;
  }
}

export const articles: Article[] = Object.values(registry).sort((a, b) => {
  // Sort by date desc — articles use Russian date format, so parse manually.
  return parseRuDate(b.date) - parseRuDate(a.date);
});

export const articleBySlug = (slug: string): Article | undefined => registry[slug];

export type { Article, ArticleSection } from './types';

const RU_MONTHS: Record<string, number> = {
  'янв': 0, 'фев': 1, 'мар': 2, 'апр': 3, 'мая': 4, 'май': 4,
  'июн': 5, 'июл': 6, 'авг': 7, 'сен': 8, 'окт': 9, 'ноя': 10, 'дек': 11,
};

function parseRuDate(s: string): number {
  // Format: "15 Янв 2026" or "10 Мая 2026"
  const parts = s.trim().split(/\s+/);
  if (parts.length !== 3) return 0;
  const day = parseInt(parts[0], 10);
  const monthKey = parts[1].toLowerCase().slice(0, 3);
  const month = RU_MONTHS[monthKey] ?? 0;
  const year = parseInt(parts[2], 10);
  return new Date(year, month, day).getTime();
}
