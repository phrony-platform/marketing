import { AgentSpecIndexPage } from '@/components/docs/pages/agent-spec-index';
import { registerAgentSpecMdxPages } from '@/lib/agent-spec-mdx';
import { ParadigmIndexPage } from '@/components/docs/pages/paradigm-index';
import { ParadigmTheParadigmPage } from '@/components/docs/pages/paradigm-the-paradigm';
import { ParadigmWhySpecPage } from '@/components/docs/pages/paradigm-why-spec';
import { QuickStartIndexPage } from '@/components/docs/pages/quick-start/quick-start-index';
import { QuickStartCompletePage } from '@/components/docs/pages/quick-start/quick-start-complete';
import { QuickStartHitlApprovalPage } from '@/components/docs/pages/quick-start/hitl-approval';
import { QuickStartPublishDeployRunPage } from '@/components/docs/pages/quick-start/publish-deploy-run';
import { QuickStartSetupRuntimePage } from '@/components/docs/pages/quick-start/setup-runtime';
import { QuickStartToolBindingPage } from '@/components/docs/pages/quick-start/tool-binding';
import { QuickStartWriteManifestPage } from '@/components/docs/pages/quick-start/write-manifest';
import { registerRuntimeMdxPages } from '@/lib/runtime-mdx';
import { registerDocPage } from '@/lib/docs-registry';

registerDocPage({
  slug: 'quick-start',
  title: 'Quick start',
  description: 'Set up the runtime, write your first manifest, and publish, deploy, and run.',
  tab: 'quick-start',
  component: QuickStartIndexPage,
});

registerDocPage({
  slug: 'quick-start/setup-runtime',
  title: 'Set up the runtime',
  description: 'Start Postgres and phrony-runtime locally, then install the phrony operator CLI.',
  tab: 'quick-start',
  component: QuickStartSetupRuntimePage,
});

registerDocPage({
  slug: 'quick-start/write-manifest',
  title: 'Write your first manifest',
  description: 'Scaffold agent.yaml, customize it, and validate before you publish.',
  tab: 'quick-start',
  component: QuickStartWriteManifestPage,
});

registerDocPage({
  slug: 'quick-start/publish-deploy-run',
  title: 'Publish, deploy, and run',
  description: 'Store an immutable manifest version, activate it, and start a session.',
  tab: 'quick-start',
  component: QuickStartPublishDeployRunPage,
});

registerDocPage({
  slug: 'quick-start/tool-binding',
  title: 'Add a tool binding',
  description: 'Declare a tool on the agent and dispatch it through an application worker.',
  tab: 'quick-start',
  component: QuickStartToolBindingPage,
});

registerDocPage({
  slug: 'quick-start/hitl-approval',
  title: 'Human-in-the-loop approval',
  description: 'Pause sensitive tool calls until an operator approves them.',
  tab: 'quick-start',
  component: QuickStartHitlApprovalPage,
});

registerDocPage({
  slug: 'quick-start/complete',
  title: 'Quick start complete',
  description: 'Congratulations—you finished all five quick start steps.',
  tab: 'quick-start',
  component: QuickStartCompletePage,
});

registerDocPage({
  slug: 'paradigm',
  title: 'Phrony',
  description: 'A Paradigm for Treating Agents as First-Class Primitives',
  tab: 'paradigm',
  component: ParadigmIndexPage,
});

registerDocPage({
  slug: 'paradigm/why-we-need-a-spec',
  title: 'Why we need a spec',
  description: 'How agents outgrew embedded application code—and why they need a shared standard.',
  tab: 'paradigm',
  component: ParadigmWhySpecPage,
});

registerDocPage({
  slug: 'paradigm/the-paradigm',
  title: 'The paradigm',
  description:
    'What becomes possible when agents are declared, deployed, and run as first-class primitives.',
  tab: 'paradigm',
  component: ParadigmTheParadigmPage,
});

registerDocPage({
  slug: 'agent-spec',
  title: 'Agent spec',
  description: 'The manifest format for agents, tools, and policies.',
  tab: 'agent-spec',
  component: AgentSpecIndexPage,
});

registerAgentSpecMdxPages();
registerRuntimeMdxPages();
