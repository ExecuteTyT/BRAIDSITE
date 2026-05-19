import type { LucideIcon } from 'lucide-react';

export interface LandingFaqItem {
  q: string;
  a: string;
}

export interface LandingComparisonRow {
  param: string;
  ours: string;
  others: string[];
}

export interface LandingStep {
  title: string;
  text: string;
}

export interface LandingBenefit {
  icon: string; // lucide icon name as string (resolved at render)
  title: string;
  text: string;
}

export interface LandingConfig {
  slug: string;
  path: string;
  /** Used for browser title and OG */
  title: string;
  metaDescription: string;
  keywords: string[];
  /** Schema.org breadcrumb name */
  breadcrumb: string;

  hero: {
    badge: string;
    badgeIcon?: string;
    h1: string;
    lead: string;
    primaryCta?: string;
    bullets?: string[];
  };

  /** Quick stats row under hero */
  stats?: { value: string; label: string }[];

  pain: {
    h2: string;
    intro?: string;
    items: { title: string; text: string }[];
  };

  solution: {
    h2: string;
    intro: string;
    benefits: LandingBenefit[];
  };

  howItWorks: {
    h2: string;
    intro?: string;
    steps: LandingStep[];
  };

  comparison?: {
    h2: string;
    headers: [string, string, ...string[]]; // [our column, ...others]
    rows: LandingComparisonRow[];
  };

  faq: {
    h2: string;
    items: LandingFaqItem[];
  };

  relatedLandings?: { path: string; title: string; desc: string }[];
  relatedArticles?: string[]; // article slugs

  /** Extra free-form SEO content below FAQ */
  seoBlock?: {
    h2: string;
    paragraphs: string[];
  };
}
