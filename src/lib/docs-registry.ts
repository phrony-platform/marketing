import type { ComponentType } from 'react';

import type { DocTabId } from '@/lib/docs-navigation';

export type DocPageMeta = {
  title: string;
  description: string;
  tab: DocTabId;
};

export type DocPageEntry = DocPageMeta & {
  /** Path segments after `/docs`, e.g. `runtime/cli/run`. */
  slug: string;
  component: ComponentType;
};

const registry = new Map<string, DocPageEntry>();

export function registerDocPage(entry: DocPageEntry) {
  registry.set(entry.slug, entry);
}

export function getDocPage(slugSegments: string[]): DocPageEntry | undefined {
  if (slugSegments.length === 0) {
    return undefined;
  }
  return registry.get(slugSegments.join('/'));
}

export function getAllDocPages(): DocPageEntry[] {
  return Array.from(registry.values()).sort((a, b) => a.slug.localeCompare(b.slug));
}

