import type { LandingConfig } from './types';

const modules = import.meta.glob<{ default: LandingConfig }>(
  ['./*.ts', './games/*.ts'],
  { eager: true }
);

const registry: Record<string, LandingConfig> = {};
for (const path in modules) {
  // Skip the type/index files themselves
  if (path.endsWith('/types.ts') || path.endsWith('/index.ts')) continue;
  const cfg = modules[path].default;
  if (cfg && cfg.path) registry[cfg.path] = cfg;
}

export const landings: LandingConfig[] = Object.values(registry);
export const landingByPath = (path: string): LandingConfig | undefined => registry[path];

export type { LandingConfig } from './types';
