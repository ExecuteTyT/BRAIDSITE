import type { Article, ArticleMeta } from './types';
// Article METADATA comes from a generated manifest (no bodies) → small + eager.
// Article BODIES (sections) load lazily, one chunk per article, only when an
// article page is actually opened. This keeps the main bundle lean.
import manifest from './manifest.generated.json';

interface ArticleMetaWithFile extends ArticleMeta {
  file: string;
}

const metas = manifest as ArticleMetaWithFile[];

const registry: Record<string, ArticleMeta> = {};
const fileBySlug: Record<string, string> = {};
for (const m of metas) {
  const { file, ...meta } = m;
  registry[meta.slug] = meta;
  fileBySlug[meta.slug] = file;
}

// Manifest is pre-sorted (date desc) at generation time.
export const articles: ArticleMeta[] = metas.map(({ file, ...meta }) => meta);

export const articleBySlug = (slug: string): ArticleMeta | undefined => registry[slug];

// Lazy per-article body loaders (each article file → its own dynamic chunk).
const bodyLoaders = import.meta.glob<{ default: Article }>('./articles/*.ts');

/** Load the full article (incl. sections) on demand. */
export const loadArticle = async (slug: string): Promise<Article | undefined> => {
  const file = fileBySlug[slug];
  if (!file) return undefined;
  const loader = bodyLoaders[`./articles/${file}`];
  if (!loader) return undefined;
  const mod = await loader();
  return mod.default;
};

export type { Article, ArticleMeta, ArticleSection } from './types';
