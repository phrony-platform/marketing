import { createElement, type ComponentType } from 'react';

import { PhronyRuntimeLogo } from '@/components/phrony-runtime-logo';
import { createDocMdxPage } from '@/components/docs/pages/create-doc-mdx-page';
import type { DocTabId } from '@/lib/docs-navigation';
import { readDocMdxFrontmatter } from '@/lib/compile-doc-mdx';
import { registerDocPage } from '@/lib/docs-registry';

import { RUNTIME_MDX_PAGES } from '@/lib/docs-mdx-catalog';

export function registerRuntimeMdxPages() {
  for (const entry of RUNTIME_MDX_PAGES) {
    const meta = readDocMdxFrontmatter(entry.file);
    const isOverview = entry.slug === 'runtime';

    registerDocPage({
      slug: entry.slug,
      title: meta.title,
      description: meta.description,
      tab: 'runtime' as DocTabId,
      component: createDocMdxPage(entry.file, 'Runtime', {
        headerVisual: isOverview
          ? createElement(PhronyRuntimeLogo, {
              priority: true,
              className: 'h-auto w-full',
            })
          : undefined,
      }) as ComponentType,
    });
  }
}
