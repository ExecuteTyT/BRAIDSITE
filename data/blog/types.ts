export type InlineNode =
  | string
  | { type: 'b'; text: string }
  | { type: 'em'; text: string }
  | { type: 'a'; href: string; text: string };

export type ArticleSection =
  | { type: 'lead'; text: InlineNode[] | string }
  | { type: 'p'; text: InlineNode[] | string }
  | { type: 'h2'; text: string; id?: string }
  | { type: 'h3'; text: string }
  | { type: 'h4'; text: string }
  | { type: 'ul'; items: (InlineNode[] | string)[] }
  | { type: 'ol'; items: (InlineNode[] | string)[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'info'; variant?: 'default' | 'success' | 'warning'; title: string; text: string }
  | { type: 'quote'; text: string; cite?: string };

export interface Article {
  slug: string;
  title: string;
  metaDescription: string;
  keywords: string[];
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  sections: ArticleSection[];
  relatedSlugs?: string[];
}
