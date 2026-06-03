import { DocCard, DocCardGroup, DocH2, DocInlineCode, DocPage, DocParagraph, DocProse } from '@/components/docs';
import { docLabel } from '@/components/docs/doc-style';
import { ParadigmBoldLead } from '@/components/docs/pages/paradigm-paper-shared';

export function ParadigmWhySpecPage() {
  return (
    <DocPage
      title="Why we need a spec"
      description="How agents outgrew embedded application code—and why they need a shared standard."
      eyebrow="Paradigm"
    >
      <DocProse>
        <DocH2>The state of agent building today</DocH2>
        <DocParagraph>
          The agents teams are building right now are growing up faster than the patterns around them. They started as
          wrappers over a model call — a prompt, maybe a tool, a few lines of orchestration. That early shape is still
          what most frameworks reflect. LangChain, the AI SDK, LlamaIndex, and the ecosystem around them give developers
          excellent primitives to compose agents inside an application, in the application&apos;s language, running in
          the application&apos;s process.
        </DocParagraph>
        <DocParagraph>
          This was the right shape for the early period, and it remains the right shape for many use cases. A small agent
          embedded in a feature is well served by being a small piece of code in that feature.
        </DocParagraph>
        <DocParagraph>
          But agents have grown into something larger. The agents teams are shipping today have many tools, dynamic
          loops, multi-step reasoning, sub-agents, cost envelopes, escalation paths, and a lifecycle of their own. They
          are increasingly the thing the team is building, not a helper inside something else. And they are increasingly
          long-lived: an agent that triages tickets today will be triaging tickets a year from now, with a hundred small
          evolutions in between — new tools, refined prompts, adjusted limits, new escalation rules.
        </DocParagraph>
        <DocParagraph>
          When something becomes that large and that long-lived, keeping it embedded in application code stops being a
          fit. Not because the code is wrong, but because the agent is no longer well-described as code. The interesting
          properties — what it can do, how it has evolved, what it cost last week, how often a human had to step in —
          are not properties of a function. They are properties of an entity.
        </DocParagraph>
        <DocParagraph>
          The same transition has happened many times in software. Database access was once inline SQL strings; today it
          is schemas, migrations, and ORMs. Infrastructure was once manual server provisioning; today it is declarative
          configuration deployed to a runtime. Services were once binaries on machines; today they are named, versioned,
          addressable units with their own lifecycle. In each case the previous shape was not broken — it was outgrown.
        </DocParagraph>
        <DocParagraph>Agents are at that transition.</DocParagraph>

        <DocH2>Agents as first-class primitives</DocH2>
        <DocParagraph>
          The paradigm Phrony proposes rests on a simple observation: an agent has its own identity, its own
          lifecycle, its own evolution, and its own surface area. It deserves its own treatment.
        </DocParagraph>
        <DocParagraph>That has three concrete consequences.</DocParagraph>
        <ParadigmBoldLead lead="An agent is declared, not coded.">
          The definition of the agent — what it is, what it does, what it can touch, what shapes its behavior — lives in
          a single declarative artifact. The artifact is versioned. It is reviewable. It travels through CI, exists in a
          registry, and is the thing that gets deployed. The application that calls the agent does not contain the agent;
          it references it.
        </ParadigmBoldLead>
        <ParadigmBoldLead lead="An agent is deployed, not embedded.">
          A declared agent moves through a deployment lifecycle of its own. It exists in environments. It has versions.
          It can be rolled forward, rolled back, observed, compared, retired. Two applications that need the same agent
          reference the same deployed agent, not two copies of the same code.
        </ParadigmBoldLead>
        <ParadigmBoldLead lead="An agent is run, not invoked inline.">
          When an application needs an agent&apos;s work, it asks a runtime — <DocInlineCode>agent.run()</DocInlineCode>{' '}
          — and the runtime executes the deployed manifest. The agent&apos;s loop, its tool calls, its policies, its
          limits, its escalations, its traces all live in the runtime. The application receives a result.
        </ParadigmBoldLead>
        <DocParagraph>
          This is a different mental model from &quot;agent as library function.&quot; It is the same mental model that
          infrastructure, services, and data already use. The thing being built has graduated to a level where it
          deserves its own primitive, and the paradigm recognizes that.
        </DocParagraph>

      </DocProse>

      <div className="not-prose border-t border-border pt-8">
        <p className={docLabel}>Up next</p>
        <DocCardGroup cols={1} className="mt-3">
          <DocCard title="The paradigm" href="/docs/paradigm/the-paradigm">
            What becomes possible when agents are declared, deployed, and run as first-class primitives.
          </DocCard>
        </DocCardGroup>
      </div>
    </DocPage>
  );
}
