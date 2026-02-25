# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BRAID VPN marketing website (braidvpn.ru) — a Russian-language SPA for a VPN service. Built with React 19, TypeScript, Vite, and Tailwind CSS (loaded via CDN in `index.html`). Icons via `lucide-react`.

## Commands

- `npm run dev` — Start dev server on port 3000
- `npm run build` — Production build to `dist/`
- `npm run preview` — Preview production build

No linter or test runner is configured.

## Architecture

**Routing:** React Router v7 (BrowserRouter) in `App.tsx`. Three categories of routes:
- **Main pages:** `/`, `/technology`, `/pricing`, `/locations`, `/download`, `/blog`, `/blog/:articleId`
- **SEO landing pages:** `/youtube-bez-reklamy`, `/pri-blokirovkah`, `/chatgpt` — standalone pages with their own content (not from translations)
- **Platform pages:** `/android`, `/ios`, `/windows`, `/mac` — all rendered by a single `PlatformPage` component with a `platform` prop

All routes use SPA fallback — both Vercel (`vercel.json` rewrites) and Nginx (`nginx-braidvpn.conf`) are configured for this.

**Styling:** Tailwind CSS via CDN `<script>` tag in `index.html` (not PostCSS/build-time). Custom theme config (brand colors, fonts, animations) is defined inline in `index.html` under `tailwind.config`. Custom CSS classes (`.glass-panel`, `.text-glow`, `.gradient-border`, etc.) are also in `index.html <style>`. When adding new Tailwind theme values or custom CSS classes, edit `index.html` — there is no `tailwind.config.js` file.

**Content/i18n:** All site text for main pages lives in `constants/translations.ts` as a single Russian-language object exported as `content`. Accessed via `useLanguage()` hook from `contexts/LanguageContext.tsx`. The `Language` type in `types.ts` supports `'en' | 'ru'` but only Russian is implemented. SEO landing pages and platform pages contain their own hardcoded Russian text rather than using the translations system.

**Path alias:** `@/` maps to the project root (not `src/` — there is no `src/` directory). Configured in both `tsconfig.json` and `vite.config.ts`.

**Key directories:**
- `pages/` — Route-level components
- `components/` — Shared components (Navbar, Footer, Button, HeroCanvas)
- `constants/` — Translation strings
- `utils/` — Telegram click tracking via Yandex.Metrika
- `api/` — Vercel serverless function (`robots.js` — dynamic robots.txt that blocks indexing on non-production domains)

**Telegram bot link:** The CTA across the site points to `https://t.me/braidvpn_bot?start=...`. This URL is defined as a `TELEGRAM_BOT_URL` constant locally in each component that uses it (Navbar, PlatformPage, landing pages, etc.) — not centralized.

**Analytics:** Yandex.Metrika (ID: 106436554) is embedded in `index.html`. Telegram bot link clicks are auto-tracked via `utils/telegramTracking.ts`, initialized in `App.tsx` on mount.

**SEO:** `index.html` contains structured data (JSON-LD for SoftwareApplication, Organization, FAQPage, WebSite), Open Graph tags, and noscript fallback content. Sitemap at `public/sitemap.xml`.

**Environment:** `GEMINI_API_KEY` env var (in `.env.local`) is loaded via Vite's `loadEnv` and exposed as `process.env.API_KEY` and `process.env.GEMINI_API_KEY`.

## Deployment

Dual deployment setup:
- **Vercel** — configured via `vercel.json` (includes security headers and asset caching)
- **Nginx/server** — config in `nginx-braidvpn.conf`, deploy script in `deploy.sh`

Domain: `braidvpn.ru` (with www redirect)
