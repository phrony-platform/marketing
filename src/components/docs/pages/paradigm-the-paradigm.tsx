import {
  DocCodeBlock,
  DocH2,
  DocInlineCode,
  DocList,
  DocPage,
  DocParagraph,
  DocProse,
} from '@/components/docs';
import { ParadigmBoldLead, claimsManifestYaml } from '@/components/docs/pages/paradigm-paper-shared';

export function ParadigmTheParadigmPage() {
  return (
    <DocPage
      title="The paradigm"
      description="What becomes possible when agents are declared, deployed, and run as first-class primitives."
      eyebrow="Paradigm"
    >
      <DocProse>
        <DocH2>What becomes possible</DocH2>
        <DocParagraph>
          Treating agents as first-class primitives makes several things structural rather than ad-hoc.
        </DocParagraph>
        <ParadigmBoldLead lead="Structure.">
          The agent has a defined shape. Its tools, policies, limits, and escalation paths exist in one place rather than
          being scattered across imports, conditionals, environment variables, and comments. A new team member reading the
          manifest understands the agent. A reviewer evaluating a change sees the change in context.
        </ParadigmBoldLead>
        <ParadigmBoldLead lead="Observability.">
          Because every run goes through the runtime, every run produces the same kind of record: which manifest version
          executed, which inputs it received, which tools it called with which arguments, which policies shaped the
          call, which humans were involved, what it cost, what it returned. Observability is not something each team
          builds — it is a property of the paradigm.
        </ParadigmBoldLead>
        <ParadigmBoldLead lead="Traceability.">
          An agent&apos;s behavior is a history of manifest versions and execution traces. &quot;Why did the agent do this
          in March?&quot; has an answer: this manifest version was deployed, this trace was produced. The agent&apos;s
          evolution is recorded, not reconstructed from git archaeology.
        </ParadigmBoldLead>
        <ParadigmBoldLead lead="Monitoring.">
          A deployed agent is a named entity with metrics. Run counts. Failure rates. Cost per run. Tool usage.
          Escalation frequency. The same monitoring posture an organization has for services applies to agents.
        </ParadigmBoldLead>
        <ParadigmBoldLead lead="Evolution.">
          Manifest changes are diffs. A new tool added, a limit raised, a policy refined — each shows up as a
          reviewable change to a defined artifact, comparable across versions. Improvements compound rather than being
          lost in code churn.
        </ParadigmBoldLead>
        <ParadigmBoldLead lead="Reuse.">
          Tools and policies are declared once and referenced. An agent that needs a new capability binds to an existing
          tool rather than reimplementing it. Two agents that share a policy reference the same policy. The substrate
          accumulates.
        </ParadigmBoldLead>
        <DocParagraph>
          None of these properties are absent from well-disciplined teams today. The paradigm&apos;s contribution is to
          make them structural — properties of how agents are built rather than habits that have to be maintained.
        </DocParagraph>

        <DocH2>The manifest</DocH2>
        <DocParagraph>
          A manifest declares an agent. It is the artifact that captures everything the agent is, in a form that a person
          can read, a system can validate, and a runtime can execute.
        </DocParagraph>
        <DocParagraph>A manifest declares, at minimum:</DocParagraph>
        <ParadigmBoldLead lead="Identity and purpose.">
          A name, a version, an owner, and a stated purpose. The purpose grounds the rest of the manifest: it is what
          the declared capabilities exist to serve.
        </ParadigmBoldLead>
        <ParadigmBoldLead lead="Model.">
          The model the agent uses, with its parameters.
        </ParadigmBoldLead>
        <ParadigmBoldLead lead="Tools.">
          The set of tools the agent has. Each binding is explicit and references a tool by stable identifier. The
          agent&apos;s tool surface is the set of tools the manifest declares.
        </ParadigmBoldLead>
        <ParadigmBoldLead lead="Policies.">
          The rules that shape how tools are used. A policy might require approval before a high-impact action, redact
          sensitive content from model inputs, restrict an argument to a known set of values, or apply a budget to a class
          of tools. Policies attach to specific tools, to groups of tools, or to the agent as a whole.
        </ParadigmBoldLead>
        <ParadigmBoldLead lead="Limits.">
          The envelope of an execution. Maximum tokens. Maximum loop iterations. Maximum wall-clock time. Maximum cost.
          Limits define what a single run is permitted to consume.
        </ParadigmBoldLead>
        <ParadigmBoldLead lead="Human-in-the-loop triggers.">
          The conditions under which the runtime suspends and routes a decision to a human. Triggers can fire on specific
          actions, on confidence signals, or on explicit agent requests.
        </ParadigmBoldLead>
        <ParadigmBoldLead lead="Identity and credentials.">
          The agent&apos;s identity for downstream systems, and the credentials it uses to authenticate. Credentials are
          referenced, not embedded.
        </ParadigmBoldLead>
        <DocParagraph>A sketch, in YAML:</DocParagraph>
        <DocCodeBlock language="yaml" title="agent.yaml" code={claimsManifestYaml} />
        <DocParagraph>
          The point of the example is not the syntax. The point is that everything the agent is — its purpose, its
          capabilities, the rules it operates under, the limits it lives within, the humans it can reach for — lives in
          one declarative artifact.
        </DocParagraph>

        <DocH2>The runtime</DocH2>
        <DocParagraph>
          The runtime is what makes the manifest a living thing. When an application calls{' '}
          <DocInlineCode>agent.run()</DocInlineCode>, the runtime:
        </DocParagraph>
        <DocList ordered>
          <li>Loads the deployed manifest.</li>
          <li>Establishes an execution context with the declared identity, limits, and policies.</li>
          <li>
            Drives the agent loop — prompts the model, receives a tool call, evaluates it against the manifest, executes
            it (or escalates, or applies a policy), feeds the result back, and continues until the agent halts or a
            limit is reached.
          </li>
          <li>Emits a structured trace of the run.</li>
          <li>Returns the result.</li>
        </DocList>
        <DocParagraph>
          The runtime is the place where the agent exists. The application is the place that asks it for work. This
          split — runtime separate from application — is the architectural shift that makes the paradigm possible.
          Without it, the agent and the application are the same thing, and none of the first-class properties hold.
        </DocParagraph>
        <DocParagraph>Several things follow from this split.</DocParagraph>
        <ParadigmBoldLead lead="Manifests are honored uniformly.">
          Every run, from every application, in every environment, goes through the same runtime evaluating the same
          manifest. Behavior is consistent because there is one place where behavior is decided.
        </ParadigmBoldLead>
        <ParadigmBoldLead lead="Traces are complete.">
          The runtime sees every model call, every tool call, every policy evaluation, every human interaction. Traces
          are produced as a property of execution, not as instrumentation a team has to add.
        </ParadigmBoldLead>
        <ParadigmBoldLead lead="The lifecycle is real.">
          A deployed agent has versions, environments, and history. Rolling back is a deployment operation. Comparing
          versions is a diff. Retiring an agent is removing it from the registry. The runtime gives the agent a
          lifecycle the way Kubernetes gives services a lifecycle.
        </ParadigmBoldLead>
        <ParadigmBoldLead lead="Tools and policies accumulate.">
          Because tools and policies are referenced by identifier and resolved by the runtime, they exist as shared
          substrate. Adding a tool to the catalog makes it available to any agent that binds to it. Improving a policy
          improves every agent that references it.
        </ParadigmBoldLead>
        <ParadigmBoldLead lead="Application-owned tool implementations remain governed.">
          Some tools are not external APIs; they are functions inside the applications that already own the business
          logic. Phrony does not move that logic into the agent, and the runtime does not import arbitrary application
          code. Instead, selected application functions are exposed as named, versioned tool handlers. The manifest
          binds to the tool contract; the runtime authorizes, dispatches, and records each invocation; the application
          executes the handler and returns a structured result.
        </ParadigmBoldLead>
        <DocParagraph>
          This keeps application code inside the application while making its use part of the runtime execution record. A
          tool call can therefore be traced not only to an agent and manifest version, but also to the approved
          implementation artifact that handled it — for example, a signed container image digest, build provenance,
          workload identity, and optional function-level descriptor hashes. Function-level hashes are useful for review
          and comparison, but the enforceable boundary is the deployed artifact and the identity of the workload that
          executed it. In this model, tool implementation changes become visible, reviewable, and auditable without
          turning Phrony into a general application hosting platform.
        </DocParagraph>

        <DocH2>Composition</DocH2>
        <DocParagraph>
          Multi-agent systems are not a separate concept. An agent that calls another agent declares the target agent in
          its tools — agent-to-agent calls are tool calls. The runtime resolves them, the trace records them, and the
          receiving agent runs under its own manifest with its own envelope.
        </DocParagraph>
        <DocParagraph>
          This keeps the paradigm consistent. There is no special vocabulary for &quot;orchestrators&quot; or
          &quot;sub-agents&quot; or &quot;swarms.&quot; There are agents, and agents can use other agents the way they
          use any other tool. Composition is a property of the primitive, not a parallel system.
        </DocParagraph>
        <DocParagraph>
          Handoffs follow the same pattern. One agent transferring a session to another is a tool call. The trace spans
          both runs. The second agent operates under its own manifest.
        </DocParagraph>

        <DocH2>The developer experience</DocH2>
        <DocParagraph>
          The paradigm changes what a developer is responsible for, not how much they do.
        </DocParagraph>
        <DocParagraph>
          A developer building an agent works on the manifest. They iterate on prompts as versioned content. They bind
          tools from the catalog. They write policies, or reuse policies that already exist. They run the agent in a
          local or sandbox runtime — the same runtime, just unprivileged — and exercise it against fixtures. When the
          agent is ready, the manifest is deployed, and applications that need it call it through the SDK.
        </DocParagraph>
        <DocParagraph>
          What disappears from the developer&apos;s plate is everything the runtime now handles: wiring up the loop,
          managing tool dispatch, threading observability through every call, implementing escalation, enforcing limits,
          building audit records. These were never the interesting parts of building an agent. They were the parts each
          team had to rebuild because there was no shared substrate.
        </DocParagraph>
        <DocParagraph>
          What gets added is the manifest itself, as a thing to think about. The manifest is the artifact that captures
          the agent&apos;s identity. Treating it carefully is the work — and it is the same kind of care a developer
          already brings to schemas, API contracts, or service definitions. The artifact is new; the discipline is
          familiar.
        </DocParagraph>

        <DocH2>Open specification, open core</DocH2>
        <DocParagraph>
          A paradigm owned by a single vendor is not a paradigm — it is a product. For agents-as-first-class-primitives
          to be a way of building, the specification has to be open, the runtime has to be implementable by anyone, and
          manifests have to be portable across implementations.
        </DocParagraph>
        <DocParagraph>
          The Phrony specification — the manifest schema, the policy model, the runtime contract, the trace format — is
          open. Anyone can implement a conformant runtime. Anyone can build tooling against the spec. An organization
          adopting Phrony adopts a standard, not a vendor.
        </DocParagraph>
        <DocParagraph>
          The reference runtime is open source. Teams can run Phrony on their own infrastructure, on any cloud, on premise,
          in air-gapped environments — without depending on a commercial relationship.
        </DocParagraph>
        <DocParagraph>
          The commercial offering is a hosted platform: managed runtime, fleet management across many agents and
          environments, advanced authoring, enterprise integrations, retention, support. The boundary between open and
          commercial is operational maturity, not the paradigm itself.
        </DocParagraph>
        <DocParagraph>
          This is the pattern that has worked for Terraform, dbt, OpenTelemetry, and a long line of infrastructure
          standards. Each succeeded because the substrate was open and the commercial layer was the operational surface
          around it. Agents-as-first-class-primitives is, structurally, in the same category.
        </DocParagraph>

        <DocH2>What this paradigm is not</DocH2>
        <DocParagraph>A few clarifications, because the shape is easy to misread.</DocParagraph>
        <ParadigmBoldLead lead="It is not a workflow engine.">
          The manifest does not describe the agent&apos;s reasoning path. The agent decides what to do; the manifest
          describes what the agent is and what it operates within.
        </ParadigmBoldLead>
        <ParadigmBoldLead lead="It is not a framework replacement.">
          Frameworks remain useful for building tools, structuring prompts, and composing application logic around
          agents. What changes is where the agent itself lives.
        </ParadigmBoldLead>
        <ParadigmBoldLead lead="It is not a prompt registry.">
          Prompts are part of the manifest, but the manifest is the agent, not the prompt.
        </ParadigmBoldLead>
        <ParadigmBoldLead lead="It is not a vendor stack.">
          The spec is open. The runtime is open source. Manifests are portable.
        </ParadigmBoldLead>
        <ParadigmBoldLead lead="It is not for every agent.">
          A prototype, a one-off, a script — these do not benefit from being first-class. The paradigm earns its weight
          on agents that have grown into long-lived, evolving entities. Applying it to throwaway code would be its own
          mistake.
        </ParadigmBoldLead>

        <DocH2>Closing</DocH2>
        <DocParagraph>
          The way agents are built today reflects the moment they emerged in — small, embedded, library-shaped. They have
          grown past that moment. The agents teams ship now are large enough, long-lived enough, and evolving enough to
          deserve their own primitive: their own declaration, their own deployment, their own runtime, their own
          lifecycle.
        </DocParagraph>
        <DocParagraph>
          Phrony is a proposal for what that primitive looks like. A manifest that describes an agent. A runtime that
          executes it. A registry that holds it. A specification that anyone can implement. An open core that anyone can
          run.
        </DocParagraph>
        <DocParagraph>
          The paradigm is offered for adoption by teams that have looked at their agents and recognized that the thing
          they are building has outgrown the shape it currently has.
        </DocParagraph>
      </DocProse>
    </DocPage>
  );
}
