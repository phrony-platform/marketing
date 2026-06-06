import type { LucideIcon } from 'lucide-react';
import { Bot, KeyRound, Link2, Package, Server, ShieldCheck, Workflow, Wrench } from 'lucide-react';

import { DocCard, DocCardGroup, DocPage, DocParagraph, DocProse } from '@/components/docs';
import { docLabel } from '@/components/docs/doc-style';
import { agentSpecPageDescriptions } from '@/lib/agent-spec-page-meta';
import { DOC_TABS } from '@/lib/docs-navigation';

const agentSpecPageIcons: Record<string, LucideIcon> = {
  '/docs/agent-spec/resources/agent': Bot,
  '/docs/agent-spec/resources/secrets': KeyRound,
  '/docs/agent-spec/resources/tool': Wrench,
  '/docs/agent-spec/resources/policy': ShieldCheck,
  '/docs/agent-spec/resources/tools': Link2,
  '/docs/agent-spec/resources/bundle': Package,
  '/docs/agent-spec/resources/agents': Workflow,
  '/docs/agent-spec/resources/mcp-servers': Server,
};

const agentSpecSections =
  DOC_TABS.find((tab) => tab.id === 'agent-spec')?.groups.filter((group) => group.group !== 'Overview') ??
  [];

export function AgentSpecIndexPage() {
  return (
    <DocPage
      title="Agent spec"
      description="The manifest format—agent, tool, policy, secrets, and conventions."
      eyebrow="Agent spec"
    >
      <DocProse>
        <DocParagraph>
          The Phrony Agent Spec is an open standard for production agents. Declare an agent in a versioned manifest;
          a compliant runtime loads it on every run, enforces what it allows, and emits a structured trace.
        </DocParagraph>
      </DocProse>

      <div className="not-prose space-y-10">
        {agentSpecSections.map((section) => (
          <section key={section.group}>
            <p className={docLabel}>{section.group}</p>
            <DocCardGroup className="mt-3">
              {section.pages.map((page) => (
                <DocCard
                  key={page.href}
                  title={page.title}
                  href={page.href}
                  icon={agentSpecPageIcons[page.href]}
                >
                  {agentSpecPageDescriptions[page.href] ??
                    'Reference for this manifest resource or convention.'}
                </DocCard>
              ))}
            </DocCardGroup>
          </section>
        ))}
      </div>
    </DocPage>
  );
}
