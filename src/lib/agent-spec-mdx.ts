import type { ComponentType } from 'react';

import { createDocMdxPage } from '@/components/docs/pages/create-doc-mdx-page';
import type { DocTabId } from '@/lib/docs-navigation';
import { readDocMdxFrontmatter } from '@/lib/compile-doc-mdx';
import { registerDocPage } from '@/lib/docs-registry';

import { AGENT_SPEC_MDX_PAGES } from '@/lib/docs-mdx-catalog';

export function registerAgentSpecMdxPages() {
  for (const entry of AGENT_SPEC_MDX_PAGES) {
    const meta = readDocMdxFrontmatter(entry.file);

    registerDocPage({
      slug: entry.slug,
      title: meta.title,
      description: meta.description,
      tab: 'agent-spec' as DocTabId,
      component: createDocMdxPage(entry.file, 'Agent spec') as ComponentType,
    });
  }
}
