export type ProductPageSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type ProductPageDefinition = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  /** Show a “BETA” pill on product visuals. */
  isBeta?: boolean;
  /** Show a “NEW” pill in the page eyebrow. */
  isNew?: boolean;
  sections: ProductPageSection[];
  /** Shown below the subheadline (for example product docs on docs.phrony.com). */
  documentation?: { label: string; href: string };
  cta?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
};

export const productPagesBySlug: Record<string, ProductPageDefinition> = {
  'multi-agent-systems': {
    slug: 'multi-agent-systems',
    metaTitle: 'Multi-Agent Systems',
    metaDescription:
      'Agents that call other agents declare them in their tools. The runtime resolves composition, records the trace, and enforces limits across the tree.',
    eyebrow: 'Multi-Agent Systems',
    headline: 'Composition is a property of the primitive.',
    subheadline:
      'Multi-agent systems are not a separate concept. An agent that calls another agent declares the target in its tools — agent-to-agent calls are tool calls, with their own manifest and envelope.',
    sections: [
      {
        title: 'The problem',
        paragraphs: [
          'Complex decisions rarely belong to a single expert. A claim touches policy, fraud, history, and precedent. But bolting together orchestrators, sub-agents, and swarms as parallel systems creates special vocabulary, duplicated governance, and traces that do not connect.',
        ],
      },
      {
        title: 'What Phrony does',
        paragraphs: [
          'You build specialists — each declared in its own manifest, deployed to the runtime, and bound to the tools it needs. When one agent calls another, the runtime resolves it like any tool call. The receiving agent runs under its own manifest. The trace spans both runs.',
        ],
      },
      {
        title: 'What you get',
        bullets: [
          'No parallel orchestration layer. Agents compose through the same tool-call model as everything else.',
          'Clear accountability. Each agent\'s contribution is visible in a single trace.',
          'Enforced limits. Depth, token budgets, and wall-clock time apply across the whole tree.',
          'Handoffs follow the same pattern. Transferring a session to another agent is a tool call.',
        ],
      },
    ],
  },

  'human-in-the-loop': {
    slug: 'human-in-the-loop',
    metaTitle: 'Human-in-the-Loop',
    metaDescription:
      'The agent handles the easy ones. Your team handles the rest. Set the line in the manifest, route the call, keep the run intact.',
    eyebrow: 'Human-in-the-Loop',
    headline: 'The agent handles the easy ones. Your team handles the rest.',
    subheadline:
      'Not every decision should be automated. The manifest declares where humans get involved — by value, confidence, risk, or tool. The runtime pauses, routes, and resumes without breaking the session.',
    sections: [
      {
        title: 'The problem',
        paragraphs: [
          'You want automation, but not at the cost of the judgment calls that should stay with your people. Today, that trade-off usually means either over-automating and hoping nothing breaks, or under-automating and losing most of the value.',
        ],
      },
      {
        title: 'What Phrony does',
        paragraphs: [
          'Human-in-the-loop triggers live in the manifest — conditions under which the runtime suspends and routes a decision to a human. When a case crosses the threshold, the runtime pauses, surfaces the task in Cockpit, and picks up again once the reviewer has signed off. The reviewer sees the full case and the agent\'s reasoning side by side.',
        ],
      },
      {
        title: 'What you get',
        bullets: [
          'You draw the line. What gets auto-approved and what does not is declared in the manifest.',
          'The right person, fast. Decisions go to the reviewer team configured for that gate.',
          'No lost context. The session resumes exactly where it paused — no replay required.',
          'Every sign-off logged. Reviewer identity, action, reason, and policy in force — appended to the evidence log.',
        ],
      },
    ],
  },

  'agent-in-the-loop': {
    slug: 'agent-in-the-loop',
    metaTitle: 'Agent-in-the-Loop',
    metaDescription:
      'Designate reviewer agents that verify, challenge, or refine another agent\'s output — every handoff recorded in the same trace.',
    eyebrow: 'Agent-in-the-Loop',
    headline: 'Let agents check each other\'s work.',
    subheadline:
      'Sometimes the right second opinion is not human. A reviewer agent is declared in the manifest like any other tool — a specialist whose job is to verify output before it is finalized.',
    sections: [
      {
        title: 'The problem',
        paragraphs: [
          'Humans are the right reviewers for the decisions that need judgment. But for the decisions that need a second pass on accuracy, speed, or consistency, routing every case to a person is slow and expensive. You need a scalable way to add a second set of eyes.',
        ],
      },
      {
        title: 'What Phrony does',
        paragraphs: [
          'Reviewer agents are first-class agents with their own manifests. A drafting agent proposes; a reviewing agent verifies. If they disagree, the case escalates to human oversight. Every handoff lives inside the same session trace — no special orchestration vocabulary.',
        ],
      },
      {
        title: 'What you get',
        bullets: [
          'Scalable second opinions. Every case can get a review pass, not just the flagged ones.',
          'Specialists reviewing specialists. A fraud agent verifies a claims decision. A compliance agent verifies a support response.',
          'Structured disagreement. When two agents do not agree, you see exactly where and why.',
          'Escalates cleanly. Disagreement routes to human review — HITL kicks in from there.',
        ],
      },
    ],
  },

  integrations: {
    slug: 'integrations',
    metaTitle: 'Tools & SDK',
    metaDescription:
      'Tool implementations stay in your application. The manifest binds to the contract; the runtime authorizes, dispatches, and records each invocation.',
    eyebrow: 'Tools & SDK',
    headline: 'Your tools. Governed by the runtime.',
    subheadline:
      'Phrony does not move your business logic into the agent. You define tools in the SDK, expose them as named handlers, and bind them in the manifest. The runtime mediates every call.',
    sections: [
      {
        title: 'The problem',
        paragraphs: [
          'Your agents are only as useful as the systems they can reach. But giving an agent direct access to your codebase scatters tool logic across imports and makes audit impossible. And if every connection is a custom build, you lose control over what agents can do with them.',
        ],
      },
      {
        title: 'What Phrony does',
        paragraphs: [
          'Developers define tools in code using the SDK — input schemas, side-effect classes, and implementations. The SDK compiles policy rules into declarative manifests. In production, SDK processes connect to the runtime, receive dispatches, execute your handlers, and return signed attestations. MCP tools dispatch to customer-operated MCP servers the same way.',
        ],
      },
      {
        title: 'What you get',
        bullets: [
          'Business logic stays in your application. The runtime governs invocation, not implementation.',
          'Scoped per agent. Each manifest declares exactly which tools an agent may bind.',
          'Signed tool attestations. Every dispatch records what ran, with implementation identity and hashes.',
          'Traceable to the artifact. Tool calls link to the approved implementation that handled them.',
        ],
      },
    ],
  },

  'embedded-agents': {
    slug: 'embedded-agents',
    metaTitle: 'Run from Applications',
    metaDescription:
      'Applications call deployed agents through the SDK. The agent lives in the runtime — your product references it, with the same guardrails on every invocation.',
    eyebrow: 'Run from Applications',
    headline: 'Your application asks. The runtime executes.',
    subheadline:
      'When your product needs an agent\'s work, it calls the SDK — and the runtime executes the deployed manifest. The application receives a result and a trace. It does not contain the agent.',
    sections: [
      {
        title: 'The idea',
        paragraphs: [
          'This is the architectural split that makes agents first-class. The runtime is where the agent exists. The application is where work is requested. Two applications that need the same agent reference the same deployed version — not two copies of the same code.',
        ],
        bullets: [
          'Invoke, do not embed. Applications call agent.run(); the loop, policies, and traces live in the runtime.',
          'Governed on every call. Guardrails, authority boundaries, and evidence apply whether the caller is a web app, a queue consumer, or a scheduled job.',
          'End-user context propagates. The runtime records who invoked the session and passes context to tool handlers for downstream authorization.',
        ],
      },
    ],
  },

  'observability-traceability': {
    slug: 'observability-traceability',
    metaTitle: 'Evidence & Traceability',
    metaDescription:
      'Append-only decision logs with hash-chained evidence. Reconstruct any session: manifest version, tool calls, attestations, and reviewer actions.',
    eyebrow: 'Evidence & Traceability',
    headline: 'Every decision, ready for the next audit.',
    subheadline:
      'When someone asks why did it do that — a regulator, a customer, your own team — the answer is a manifest version and an evidence log, not a shrug and a Slack search.',
    sections: [
      {
        title: 'The problem',
        paragraphs: [
          'AI systems make thousands of decisions a day. Most companies cannot explain any single one on demand. The logs are scattered. The reasoning is lost. Observability was something each team had to instrument — and most did not.',
        ],
      },
      {
        title: 'What Phrony does',
        paragraphs: [
          'Every run through the runtime produces structured evidence: session lifecycle, model calls, firewall evaluations, authority-boundary decisions, tool dispatches, SDK attestations, HITL pauses, and reviewer actions. Events are append-only, hash-chained, and signed. Given a session ID, Phrony reconstructs the full story.',
        ],
      },
      {
        title: 'What you get',
        bullets: [
          'Structural observability. Traces are a property of execution, not instrumentation you add.',
          'Manifest version on every run. You know exactly which declaration was in force.',
          'Evidence packets on demand. Export audit-ready records to your own storage.',
          'Traceability across evolution. An agent\'s behavior is a history of manifest versions and execution traces.',
        ],
      },
    ],
  },

  firewall: {
    slug: 'firewall',
    metaTitle: 'Firewall',
    metaDescription:
      'Declarative policy hooks before and after model and tool calls — PII exposure, prompt injection, authority boundaries, and adversarial defense.',
    eyebrow: 'Firewall',
    headline: 'Policy evaluated at every boundary.',
    subheadline:
      'Developers author firewall and authority rules through the SDK. The SDK compiles them into declarative manifests. The runtime evaluates only the manifest — it does not execute customer-defined firewall code.',
    documentation: {
      label: 'Read Firewall documentation',
      href: 'https://docs.phrony.com/firewall',
    },
    sections: [
      {
        title: 'The problem',
        paragraphs: [
          'Rules catch what you can name. Novel attack patterns, prompt injection, slow drift, and edge-case failures slip through because they were not on anyone\'s list. And when policy lives in application code, it is hard to review, version, and prove what was in force at decision time.',
        ],
      },
      {
        title: 'What Phrony does',
        paragraphs: [
          'Firewall hooks exist at four points: before model call, after model call, before tool call, and after tool call. Built-in detectors cover PII exposure, secret leakage, prompt injection, and policy bypass attempts. Custom rules compile to normalized JSON manifests that the runtime evaluates on every session.',
        ],
      },
      {
        title: 'What you get',
        bullets: [
          'Declarative and reviewable. Policy changes show up as manifest diffs, not code churn.',
          'Fail-closed for high-risk actions. Block, escalate, require approval, or terminate — your rules decide.',
          'Evidence for every evaluation. Firewall outcomes are appended to the decision log.',
          'Authority boundaries before dispatch. Tool calls are evaluated against declared limits before they leave the runtime.',
        ],
      },
    ],
  },

  security: {
    slug: 'security',
    metaTitle: 'Security',
    metaDescription:
      'Authority boundaries enforced on every tool dispatch. Credentials referenced, not embedded. Data stays in your infrastructure with Enterprise self-hosted deployment.',
    eyebrow: 'Security',
    headline: 'Your agents can only reach what the manifest allows.',
    subheadline:
      'Every AI deployment eventually hits the same question: what systems can this thing touch? The manifest gives you a clean answer — and the runtime enforces it on every action.',
    sections: [
      {
        title: 'The problem',
        paragraphs: [
          'Giving an agent access to your systems feels like handing over the keys. Most teams either give too much and lose sleep, or too little and the agent cannot do its job. Neither scales. And when security review comes around, nobody wants to answer with "we trust the prompt."',
        ],
      },
      {
        title: 'What Phrony does',
        paragraphs: [
          'The manifest declares exactly what each agent may touch — tools, credentials, operations, and conditions. The runtime evaluates authority boundaries before every tool dispatch. Credentials are referenced, not embedded in prompts. With Phrony Enterprise, the full governance stack runs in your own cloud — your data, your keys, your infrastructure.',
        ],
      },
      {
        title: 'What you get',
        bullets: [
          'Least privilege, enforced. The agent cannot drift outside the manifest boundary.',
          'Different rules for different agents. Claims, support, and compliance agents do not need the same access.',
          'Enterprise self-hosted. Deploy to AWS, Azure, or GCP in your VPC with customer-managed KMS and no vendor production access.',
          'One answer for security review. A manifest and an architecture diagram, not a promise.',
        ],
      },
    ],
  },
};

export const productPageSlugs = Object.keys(productPagesBySlug);

export function getProductPage(slug: string): ProductPageDefinition | undefined {
  return productPagesBySlug[slug];
}
