import React from 'react';

export type Language = 'en' | 'ru';

export enum PricingTier {
  MONTHLY = 'MONTHLY',
  SIX_MONTHS = 'SIX_MONTHS',
  YEARLY = 'YEARLY',
}

export interface NavItem {
  label: string;
  path: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}

export interface Location {
  country: string;
  flag: string;
  useCase: string;
  icon: React.ComponentType<any>;
  latency: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
}