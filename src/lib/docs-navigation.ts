import { TYPESCRIPT_SDK_NAV } from '@/lib/typescript-sdk-nav';

/** Top-level documentation areas in the site docs shell. */
export type DocTabId = 'home' | 'quick-start' | 'paradigm' | 'agent-spec' | 'runtime' | 'sdks';

export type DocExploreTabId = Exclude<DocTabId, 'home'>;

export type DocNavLink = {
  title: string;
  href: string;
  children?: DocNavLink[];
};

export type DocNavGroup = {
  group: string;
  pages: DocNavLink[];
};

export type DocTab = {
  id: DocTabId;
  label: string;
  /** Tab landing route, e.g. `/docs/paradigm`. */
  href: string;
  description: string;
  groups: DocNavGroup[];
};

export const DOC_TABS: DocTab[] = [
  {
    id: 'home',
    label: 'Home',
    href: '/docs',
    description: 'Documentation hub — overview and links to every area.',
    groups: [],
  },
  {
    id: 'quick-start',
    label: 'Quick start',
    href: '/docs/quick-start',
    description:
      'Interactive checklist: runtime setup, first manifest, publish and run, then tools and HITL.',
    groups: [
      {
        group: 'Get started',
        pages: [
          { title: 'Introduction', href: '/docs/quick-start' },
          { title: 'Set up the runtime', href: '/docs/quick-start/setup-runtime' },
          { title: 'Write your first manifest', href: '/docs/quick-start/write-manifest' },
          { title: 'Publish, deploy, and run', href: '/docs/quick-start/publish-deploy-run' },
        ],
      },
      {
        group: 'Go further',
        pages: [
          { title: 'Add a tool binding', href: '/docs/quick-start/tool-binding' },
          { title: 'Human-in-the-loop approval', href: '/docs/quick-start/hitl-approval' },
        ],
      },
    ],
  },
  {
    id: 'paradigm',
    label: 'Paradigm',
    href: '/docs/paradigm',
    description:
      'A paradigm for declaring, deploying, and running agents as first-class primitives.',
    groups: [
      {
        group: 'Introduction',
        pages: [{ title: 'Phrony', href: '/docs/paradigm' }],
      },
      {
        group: 'The problem',
        pages: [{ title: 'Why we need a spec', href: '/docs/paradigm/why-we-need-a-spec' }],
      },
      {
        group: 'The paradigm',
        pages: [{ title: 'The paradigm', href: '/docs/paradigm/the-paradigm' }],
      },
    ],
  },
  {
    id: 'agent-spec',
    label: 'Agent spec',
    href: '/docs/agent-spec',
    description: 'The manifest format—agent, tool, policy, secrets, and conventions.',
    groups: [
      {
        group: 'Overview',
        pages: [
          { title: 'Introduction', href: '/docs/agent-spec' },
          { title: 'Conventions', href: '/docs/agent-spec/conventions' },
        ],
      },
      {
        group: 'Concepts',
        pages: [
          { title: 'Agent', href: '/docs/agent-spec/resources/agent' },
          { title: 'Secrets', href: '/docs/agent-spec/resources/secrets' },
          { title: 'Tool', href: '/docs/agent-spec/resources/tool' },
          { title: 'Policy', href: '/docs/agent-spec/resources/policy' },
          { title: 'Tools', href: '/docs/agent-spec/resources/tools' },
          { title: 'Bundle', href: '/docs/agent-spec/resources/bundle' },
          { title: 'Agent delegation', href: '/docs/agent-spec/resources/agents' },
          { title: 'MCP servers', href: '/docs/agent-spec/resources/mcp-servers' },
        ],
      },
    ],
  },
  {
    id: 'runtime',
    label: 'Runtime',
    href: '/docs/runtime',
    description: 'Install and run the reference runtime, tool workers, and the operator CLI.',
    groups: [
      {
        group: 'Overview',
        pages: [{ title: 'Overview', href: '/docs/runtime' }],
      },
      {
        group: 'Tool dispatch',
        pages: [
          { title: 'Tool dispatch', href: '/docs/runtime/tool-dispatch' },
          { title: 'MCP tools', href: '/docs/runtime/mcp-tools' },
          { title: 'Human in the loop', href: '/docs/runtime/hitl' },
          { title: 'Tool workers', href: '/docs/runtime/tool-workers' },
          { title: 'Tool integrity', href: '/docs/runtime/tool-integrity' },
          { title: 'Tool durability', href: '/docs/runtime/tool-durability' },
        ],
      },
      {
        group: 'CLI',
        pages: [
          { title: 'Overview', href: '/docs/runtime/cli' },
          { title: 'init', href: '/docs/runtime/cli/init' },
          { title: 'status', href: '/docs/runtime/cli/status' },
          { title: 'validate', href: '/docs/runtime/cli/validate' },
          { title: 'diff', href: '/docs/runtime/cli/diff' },
          { title: 'publish', href: '/docs/runtime/cli/publish' },
          {
            title: 'bundle',
            href: '/docs/runtime/cli/bundle',
            children: [
              { title: 'lock', href: '/docs/runtime/cli/bundle-lock' },
              { title: 'validate', href: '/docs/runtime/cli/bundle-validate' },
              { title: 'publish', href: '/docs/runtime/cli/bundle-publish' },
              { title: 'deploy', href: '/docs/runtime/cli/bundle-deploy' },
              { title: 'versions', href: '/docs/runtime/cli/bundle-versions' },
              { title: 'active', href: '/docs/runtime/cli/bundle-active' },
              { title: 'history', href: '/docs/runtime/cli/bundle-history' },
              { title: 'run', href: '/docs/runtime/cli/bundle-run' },
              { title: 'secret-requirements', href: '/docs/runtime/cli/bundle-secret-requirements' },
            ],
          },
          { title: 'versions', href: '/docs/runtime/cli/versions' },
          { title: 'inspect', href: '/docs/runtime/cli/inspect' },
          { title: 'deprecate', href: '/docs/runtime/cli/deprecate' },
          { title: 'retire', href: '/docs/runtime/cli/retire' },
          { title: 'deploy', href: '/docs/runtime/cli/deploy' },
          { title: 'active', href: '/docs/runtime/cli/active' },
          { title: 'history', href: '/docs/runtime/cli/history' },
          { title: 'rollback', href: '/docs/runtime/cli/rollback' },
          { title: 'run', href: '/docs/runtime/cli/run' },
          { title: 'sessions', href: '/docs/runtime/cli/sessions' },
          { title: 'approvals', href: '/docs/runtime/cli/approvals' },
          { title: 'agents', href: '/docs/runtime/cli/agents' },
        ],
      },
    ],
  },
  {
    id: 'sdks',
    label: 'SDKs',
    href: '/docs/sdks',
    description: 'Client libraries for the Phrony runtime — install, connect, run agents and bundles, and register tool workers.',
    groups: [
      {
        group: 'Overview',
        pages: [{ title: 'Introduction', href: '/docs/sdks' }],
      },
      {
        group: 'TypeScript',
        pages: [...TYPESCRIPT_SDK_NAV],
      },
    ],
  },
];

function getDocTabById(id: DocTabId): DocTab | undefined {
  return DOC_TABS.find((tab) => tab.id === id);
}

export function getDocTabForPath(pathname: string): DocTab | undefined {
  const normalized = pathname.replace(/\/$/, '') || '/docs';
  if (normalized === '/docs/template') {
    return undefined;
  }
  if (normalized === '/docs') {
    return getDocTabById('home');
  }

  return DOC_TABS.find(
    (tab) => tab.id !== 'home' && (normalized === tab.href || normalized.startsWith(`${tab.href}/`)),
  );
}

function isDocExploreTab(tab: DocTab): tab is DocTab & { id: DocExploreTabId } {
  return tab.id !== 'home';
}

/** Content areas linked from the docs home (excludes the Home tab). */
export const DOC_EXPLORE_TABS = DOC_TABS.filter(isDocExploreTab);
