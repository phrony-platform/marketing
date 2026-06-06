export type QuickStartStepId =
  | 'setup-runtime'
  | 'write-manifest'
  | 'publish-deploy-run'
  | 'tool-binding'
  | 'hitl-approval';

export type QuickStartConceptId =
  | 'runtime'
  | 'grpc'
  | 'manifest'
  | 'agent-spec'
  | 'publish'
  | 'deploy'
  | 'session'
  | 'tool'
  | 'worker'
  | 'policy'
  | 'hitl';

export type QuickStartTask = {
  id: string;
  label: string;
  hint?: string;
};

export type QuickStartStep = {
  id: QuickStartStepId;
  step: number;
  title: string;
  href: string;
  summary: string;
  tasks: QuickStartTask[];
};

export const QUICK_START_STORAGE_KEY = 'phrony-docs-quick-start-v2';

export const QUICK_START_COMPLETE_HREF = '/docs/quick-start/complete';

export const QUICK_START_STEPS: QuickStartStep[] = [
  {
    id: 'setup-runtime',
    step: 1,
    title: 'Set up the runtime',
    href: '/docs/quick-start/setup-runtime',
    summary: 'Start Postgres and the daemon, install the operator CLI, and confirm connectivity.',
    tasks: [
      { id: 'setup-runtime:stack', label: 'Start Postgres and runtime with docker compose up' },
      { id: 'setup-runtime:cli', label: 'Install the phrony operator CLI' },
      { id: 'setup-runtime:verify', label: 'Verify with phrony status' },
    ],
  },
  {
    id: 'write-manifest',
    step: 2,
    title: 'Write your first manifest',
    href: '/docs/quick-start/write-manifest',
    summary: 'Create agent.yaml and understand each section of the file.',
    tasks: [
      { id: 'write-manifest:init', label: 'Scaffold agent.yaml with phrony init' },
      {
        id: 'write-manifest:edit',
        label: 'Add secrets.openai (fromEnv) and set model provider to openai',
      },
      { id: 'write-manifest:validate', label: 'Validate with phrony agents validate' },
    ],
  },
  {
    id: 'publish-deploy-run',
    step: 3,
    title: 'Publish, deploy, and run',
    href: '/docs/quick-start/publish-deploy-run',
    summary: 'Publish an immutable version, activate it, and start a session.',
    tasks: [
      { id: 'publish-deploy-run:publish', label: 'Publish the manifest with phrony agents publish' },
      { id: 'publish-deploy-run:deploy', label: 'Activate the version with phrony agents deploy' },
      { id: 'publish-deploy-run:run', label: 'Run a session with phrony run' },
    ],
  },
  {
    id: 'tool-binding',
    step: 4,
    title: 'Add a tool binding',
    href: '/docs/quick-start/tool-binding',
    summary: 'Declare a tool on the agent and dispatch it through an application worker.',
    tasks: [
      { id: 'tool-binding:declare', label: 'Add a spec.tools binding (ref and as) plus a Tool file' },
      { id: 'tool-binding:validate', label: 'Validate and publish a new agent version' },
      {
        id: 'tool-binding:worker',
        label: 'Register a worker that implements the tool (or use the worker playground)',
        hint: 'Workers connect over the Work gRPC stream',
      },
    ],
  },
  {
    id: 'hitl-approval',
    step: 5,
    title: 'Human-in-the-loop approval',
    href: '/docs/quick-start/hitl-approval',
    summary: 'Pause risky tool calls until an operator approves them with phrony approvals.',
    tasks: [
      { id: 'hitl-approval:policy', label: 'Attach a Policy with require_approval to a tool binding' },
      { id: 'hitl-approval:trigger', label: 'Run a session that triggers the approval' },
      { id: 'hitl-approval:decide', label: 'List and approve (or reject) with phrony approvals' },
    ],
  },
];

export const QUICK_START_CONCEPTS: Record<
  QuickStartConceptId,
  { title: string; brief: string; href: string; linkLabel: string }
> = {
  runtime: {
    title: 'Runtime',
    brief:
      'The long-running server that stores manifests, runs sessions, dispatches tools, and enforces policies. Your app asks the runtime for work—it does not embed the agent loop.',
    href: '/docs/runtime',
    linkLabel: 'Runtime overview',
  },
  grpc: {
    title: 'gRPC',
    brief:
      'How the phrony CLI talks to phrony-runtime over the network—a typed RPC interface. You rarely call it directly; the CLI and SDKs do.',
    href: '/docs/runtime',
    linkLabel: 'Runtime overview',
  },
  manifest: {
    title: 'Manifest',
    brief:
      'A YAML file that describes your agent—who it is, how it should behave, and which model it uses. You edit it on your machine before the runtime ever sees it.',
    href: '/docs/agent-spec',
    linkLabel: 'Agent spec',
  },
  'agent-spec': {
    title: 'Agent spec',
    brief: 'The open format for agent, tool, policy, and secrets resources—conventions every conformant runtime understands.',
    href: '/docs/agent-spec',
    linkLabel: 'Agent spec introduction',
  },
  publish: {
    title: 'Publish',
    brief:
      'Locks a manifest snapshot in the runtime as an immutable version. Editing later means publishing a new version—not mutating the old one.',
    href: '/docs/runtime/cli/publish',
    linkLabel: 'phrony agents publish',
  },
  deploy: {
    title: 'Deploy',
    brief:
      'Chooses which published version is active for new sessions. Publish stores the snapshot; deploy switches what phrony run uses by default.',
    href: '/docs/runtime/cli/deploy',
    linkLabel: 'phrony agents deploy',
  },
  session: {
    title: 'Session',
    brief:
      'One execution of an agent from start to finish—the model loop, tool calls, policies, and trace for a single run.',
    href: '/docs/runtime/cli/run',
    linkLabel: 'phrony run',
  },
  tool: {
    title: 'Tool binding',
    brief:
      'A line in spec.tools that grants this agent permission to call a capability—optionally with a friendlier name, narrowed inputs, and extra policies.',
    href: '/docs/agent-spec/resources/tools',
    linkLabel: 'Tool bindings',
  },
  worker: {
    title: 'Application worker',
    brief:
      'A process you run that registers tool handlers on the Work gRPC stream. The runtime authorizes and routes; the worker executes your business logic.',
    href: '/docs/runtime/tool-workers',
    linkLabel: 'Tool workers',
  },
  policy: {
    title: 'Policy',
    brief:
      'Dispatch-time rules: allow, deny, or require_approval before a tool runs. Policies on a binding apply only to that tool.',
    href: '/docs/agent-spec/resources/policy',
    linkLabel: 'Policy resource',
  },
  hitl: {
    title: 'Human-in-the-loop (HITL)',
    brief:
      'When a policy requires approval, the session pauses in awaiting_approval until an operator decides with phrony approvals or the gRPC API.',
    href: '/docs/runtime/hitl',
    linkLabel: 'HITL approvals',
  },
};

export function getQuickStartStep(id: QuickStartStepId): QuickStartStep {
  const step = QUICK_START_STEPS.find((entry) => entry.id === id);
  if (!step) {
    throw new Error(`Unknown quick start step: ${id}`);
  }
  return step;
}

export function getAllQuickStartTaskIds(): string[] {
  return QUICK_START_STEPS.flatMap((step) => step.tasks.map((task) => task.id));
}

export function isStepComplete(stepId: QuickStartStepId, completedTasks: Record<string, boolean>): boolean {
  const step = getQuickStartStep(stepId);
  return step.tasks.every((task) => completedTasks[task.id]);
}

export function countCompletedSteps(completedTasks: Record<string, boolean>): number {
  return QUICK_START_STEPS.filter((step) => isStepComplete(step.id, completedTasks)).length;
}
