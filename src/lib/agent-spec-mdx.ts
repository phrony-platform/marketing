import type { ComponentType } from 'react';

import { createDocMdxPage } from '@/components/docs/pages/create-doc-mdx-page';
import type { DocTabId } from '@/lib/docs-navigation';
import { readDocMdxFrontmatter } from '@/lib/compile-doc-mdx';
import { registerDocPage } from '@/lib/docs-registry';

const AGENT_SPEC_MDX_PAGES = [
  { slug: 'agent-spec/conventions', file: 'agent-spec/conventions.mdx' },
  { slug: 'agent-spec/resources/agent', file: 'agent-spec/resources/agent.mdx' },
  { slug: 'agent-spec/resources/secrets', file: 'agent-spec/resources/secrets.mdx' },
  { slug: 'agent-spec/resources/tool', file: 'agent-spec/resources/tool.mdx' },
  { slug: 'agent-spec/resources/policy', file: 'agent-spec/resources/policy.mdx' },
  { slug: 'agent-spec/resources/tools', file: 'agent-spec/resources/tools.mdx' },
  { slug: 'agent-spec/resources/bundle', file: 'agent-spec/resources/bundle.mdx' },
  { slug: 'agent-spec/resources/agents', file: 'agent-spec/resources/agents.mdx' },
  { slug: 'agent-spec/resources/mcp-servers', file: 'agent-spec/resources/mcp-servers.mdx' },
] as const;

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
