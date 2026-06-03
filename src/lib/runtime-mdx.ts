import { createElement, type ComponentType } from 'react';

import { PhronyRuntimeLogo } from '@/components/phrony-runtime-logo';
import { createDocMdxPage } from '@/components/docs/pages/create-doc-mdx-page';
import type { DocTabId } from '@/lib/docs-navigation';
import { readDocMdxFrontmatter } from '@/lib/compile-doc-mdx';
import { registerDocPage } from '@/lib/docs-registry';

const RUNTIME_MDX_PAGES = [
  { slug: 'runtime', file: 'runtime/index.mdx' },
  { slug: 'runtime/tool-dispatch', file: 'runtime/tool-dispatch.mdx' },
  { slug: 'runtime/mcp-tools', file: 'runtime/mcp-tools.mdx' },
  { slug: 'runtime/hitl', file: 'runtime/hitl.mdx' },
  { slug: 'runtime/tool-workers', file: 'runtime/tool-workers.mdx' },
  { slug: 'runtime/tool-integrity', file: 'runtime/tool-integrity.mdx' },
  { slug: 'runtime/tool-durability', file: 'runtime/tool-durability.mdx' },
  { slug: 'runtime/cli', file: 'runtime/cli/index.mdx' },
  { slug: 'runtime/cli/init', file: 'runtime/cli/init.mdx' },
  { slug: 'runtime/cli/status', file: 'runtime/cli/status.mdx' },
  { slug: 'runtime/cli/validate', file: 'runtime/cli/validate.mdx' },
  { slug: 'runtime/cli/diff', file: 'runtime/cli/diff.mdx' },
  { slug: 'runtime/cli/publish', file: 'runtime/cli/publish.mdx' },
  { slug: 'runtime/cli/versions', file: 'runtime/cli/versions.mdx' },
  { slug: 'runtime/cli/inspect', file: 'runtime/cli/inspect.mdx' },
  { slug: 'runtime/cli/deprecate', file: 'runtime/cli/deprecate.mdx' },
  { slug: 'runtime/cli/retire', file: 'runtime/cli/retire.mdx' },
  { slug: 'runtime/cli/deploy', file: 'runtime/cli/deploy.mdx' },
  { slug: 'runtime/cli/active', file: 'runtime/cli/active.mdx' },
  { slug: 'runtime/cli/history', file: 'runtime/cli/history.mdx' },
  { slug: 'runtime/cli/rollback', file: 'runtime/cli/rollback.mdx' },
  { slug: 'runtime/cli/run', file: 'runtime/cli/run.mdx' },
  { slug: 'runtime/cli/sessions', file: 'runtime/cli/sessions.mdx' },
  { slug: 'runtime/cli/approvals', file: 'runtime/cli/approvals.mdx' },
  { slug: 'runtime/cli/agents', file: 'runtime/cli/agents.mdx' },
] as const;

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
