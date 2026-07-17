export type DocsMdxCatalogEntry = {
  slug: string;
  file: string;
};

export const AGENT_SPEC_MDX_PAGES: DocsMdxCatalogEntry[] = [
  { slug: 'agent-spec/conventions', file: 'agent-spec/conventions.mdx' },
  { slug: 'agent-spec/resources/agent', file: 'agent-spec/resources/agent.mdx' },
  { slug: 'agent-spec/resources/secrets', file: 'agent-spec/resources/secrets.mdx' },
  { slug: 'agent-spec/resources/tool', file: 'agent-spec/resources/tool.mdx' },
  { slug: 'agent-spec/resources/policy', file: 'agent-spec/resources/policy.mdx' },
  { slug: 'agent-spec/resources/tools', file: 'agent-spec/resources/tools.mdx' },
  { slug: 'agent-spec/resources/bundle', file: 'agent-spec/resources/bundle.mdx' },
  { slug: 'agent-spec/resources/agents', file: 'agent-spec/resources/agents.mdx' },
  { slug: 'agent-spec/resources/mcp-servers', file: 'agent-spec/resources/mcp-servers.mdx' },
];

export const RUNTIME_MDX_PAGES: DocsMdxCatalogEntry[] = [
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
  { slug: 'runtime/cli/bundle', file: 'runtime/cli/bundle.mdx' },
  { slug: 'runtime/cli/bundle-lock', file: 'runtime/cli/bundle-lock.mdx' },
  { slug: 'runtime/cli/bundle-validate', file: 'runtime/cli/bundle-validate.mdx' },
  { slug: 'runtime/cli/bundle-publish', file: 'runtime/cli/bundle-publish.mdx' },
  { slug: 'runtime/cli/bundle-deploy', file: 'runtime/cli/bundle-deploy.mdx' },
  { slug: 'runtime/cli/bundle-versions', file: 'runtime/cli/bundle-versions.mdx' },
  { slug: 'runtime/cli/bundle-active', file: 'runtime/cli/bundle-active.mdx' },
  { slug: 'runtime/cli/bundle-history', file: 'runtime/cli/bundle-history.mdx' },
  { slug: 'runtime/cli/bundle-run', file: 'runtime/cli/bundle-run.mdx' },
  { slug: 'runtime/cli/bundle-secret-requirements', file: 'runtime/cli/bundle-secret-requirements.mdx' },
];
