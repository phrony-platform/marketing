/** Short descriptions for agent-spec hub cards and Up next links. */
export const agentSpecPageDescriptions: Record<string, string> = {
  '/docs/agent-spec/conventions':
    'phrony.com/v1, enforced vs descriptive metadata, framework packs, bundle layout, and refs.',
  '/docs/agent-spec/resources/agent':
    'The kind: Agent document—metadata, spec, limits, output, and worked examples.',
  '/docs/agent-spec/resources/secrets':
    'Credential references—fromEnv, model binding, run-time resolution, and session encryption.',
  '/docs/agent-spec/resources/tool':
    'kind: Tool — contracts, schemas, and default policies (no endpoints).',
  '/docs/agent-spec/resources/policy':
    'Conditions, portable decision, authority_ref, and decision.runtime.',
  '/docs/agent-spec/resources/tools':
    'Agent spec.tools — logical refs, schema overrides, and policy attachment.',
  '/docs/agent-spec/resources/mcp-servers':
    'spec.mcp_servers and MCP-backed bindings — remote tools with static schemas.',
};
