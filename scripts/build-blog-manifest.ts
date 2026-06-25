// Generates data/blog/manifest.generated.json — lightweight article metadata
// (no `sections` body) used by list pages + SEO. Keeping bodies out of this
// manifest is what lets the main bundle stay small; bodies load lazily per
// article (see data/blog/index.ts). Run automatically via the prebuild/predev
// npm hooks; the output is gitignored (always regenerated, never committed).
import fs from 'fs';
import path from 'path';
import type { Article } from '../data/blog/types';

const mods = import.meta.glob<{ default: Article }>('../data/blog/articles/*.ts', { eager: true });

const RU_MONTHS: Record<string, number> = {
  янв: 0, фев: 1, мар: 2, апр: 3, мая: 4, май: 4,
  июн: 5, июл: 6, авг: 7, сен: 8, окт: 9, ноя: 10, дек: 11,
};
function parseRuDate(s: string): number {
  const p = s.trim().split(/\s+/);
  if (p.length !== 3) return 0;
  const d = parseInt(p[0], 10);
  const m = RU_MONTHS[p[1].toLowerCase().slice(0, 3)] ?? 0;
  const y = parseInt(p[2], 10);
  return new Date(y, m, d).getTime();
}

const metas = Object.entries(mods)
  .map(([file, mod]) => {
    const { sections, ...meta } = mod.default;
    return { ...meta, file: path.basename(file) };
  })
  .sort((a, b) => parseRuDate(b.date) - parseRuDate(a.date));

const out = path.resolve(process.cwd(), 'data/blog/manifest.generated.json');
fs.writeFileSync(out, JSON.stringify(metas, null, 0) + '\n', 'utf8');
console.log(`[blog-manifest] wrote ${metas.length} article metas to ${path.relative(process.cwd(), out)}`);
