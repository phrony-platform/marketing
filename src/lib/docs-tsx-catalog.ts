import type { DocTabId } from '@/lib/docs-navigation';

export type DocsTsxCatalogEntry = {
  slug: string;
  title: string;
  description: string;
  tab: DocTabId;
  /** Paths relative to `src/components/docs/pages/`. */
  contentFiles: string[];
};

export const DOCS_TSX_PAGES: DocsTsxCatalogEntry[] = [
  {
    slug: 'quick-start',
    title: 'Quick start',
    description: 'Set up the runtime, write your first manifest, and publish, deploy, and run.',
    tab: 'quick-start',
    contentFiles: ['quick-start/quick-start-index.tsx'],
  },
  {
    slug: 'quick-start/setup-runtime',
    title: 'Set up the runtime',
    description: 'Start Postgres and phrony-runtime locally, then install the phrony operator CLI.',
    tab: 'quick-start',
    contentFiles: ['quick-start/setup-runtime.tsx'],
  },
  {
    slug: 'quick-start/write-manifest',
    title: 'Write your first manifest',
    description: 'Scaffold agent.yaml, customize it, and validate before you publish.',
    tab: 'quick-start',
    contentFiles: ['quick-start/write-manifest.tsx'],
  },
  {
    slug: 'quick-start/publish-deploy-run',
    title: 'Publish, deploy, and run',
    description: 'Store an immutable manifest version, activate it, and start a session.',
    tab: 'quick-start',
    contentFiles: ['quick-start/publish-deploy-run.tsx'],
  },
  {
    slug: 'quick-start/tool-binding',
    title: 'Add a tool binding',
    description: 'Declare a tool on the agent and dispatch it through an application worker.',
    tab: 'quick-start',
    contentFiles: ['quick-start/tool-binding.tsx'],
  },
  {
    slug: 'quick-start/hitl-approval',
    title: 'Human-in-the-loop approval',
    description: 'Pause sensitive tool calls until an operator approves them.',
    tab: 'quick-start',
    contentFiles: ['quick-start/hitl-approval.tsx'],
  },
  {
    slug: 'quick-start/complete',
    title: 'Quick start complete',
    description: 'Congratulations—you finished all five quick start steps.',
    tab: 'quick-start',
    contentFiles: ['quick-start/quick-start-complete.tsx'],
  },
  {
    slug: 'paradigm',
    title: 'Phrony',
    description: 'A Paradigm for Treating Agents as First-Class Primitives',
    tab: 'paradigm',
    contentFiles: ['paradigm-index.tsx'],
  },
  {
    slug: 'paradigm/why-we-need-a-spec',
    title: 'Why we need a spec',
    description: 'How agents outgrew embedded application code—and why they need a shared standard.',
    tab: 'paradigm',
    contentFiles: ['paradigm-why-spec.tsx'],
  },
  {
    slug: 'paradigm/the-paradigm',
    title: 'The paradigm',
    description:
      'What becomes possible when agents are declared, deployed, and run as first-class primitives.',
    tab: 'paradigm',
    contentFiles: ['paradigm-the-paradigm.tsx'],
  },
  {
    slug: 'agent-spec',
    title: 'Agent spec',
    description: 'The manifest format for agents, tools, and policies.',
    tab: 'agent-spec',
    contentFiles: ['agent-spec-index.tsx'],
  },
  {
    slug: 'sdks',
    title: 'SDKs',
    description: 'Client libraries for the Phrony runtime over gRPC.',
    tab: 'sdks',
    contentFiles: ['sdks/sdks-index.tsx'],
  },
  {
    slug: 'sdks/typescript',
    title: 'TypeScript SDK',
    description:
      'The @phrony/sdk client for Node.js — install, run agents and bundles, stream sessions, and register workers.',
    tab: 'sdks',
    contentFiles: [
      'sdks/typescript/typescript-sdk-page.tsx',
      'sdks/typescript/typescript-install.tsx',
      'sdks/typescript/typescript-connect.tsx',
      'sdks/typescript/typescript-run.tsx',
      'sdks/typescript/typescript-interactive-session.tsx',
      'sdks/typescript/typescript-worker.tsx',
      'sdks/typescript/typescript-runtime-client.tsx',
      'sdks/typescript/typescript-utilities.tsx',
    ],
  },
  {
    slug: 'sdks/python',
    title: 'Python SDK',
    description:
      'The phrony client for Python — install, run agents and bundles, stream sessions, and register workers.',
    tab: 'sdks',
    contentFiles: [
      'sdks/python/python-sdk-page.tsx',
      'sdks/python/python-install.tsx',
      'sdks/python/python-connect.tsx',
      'sdks/python/python-run.tsx',
      'sdks/python/python-interactive-session.tsx',
      'sdks/python/python-worker.tsx',
      'sdks/python/python-runtime-client.tsx',
      'sdks/python/python-utilities.tsx',
    ],
  },
];
