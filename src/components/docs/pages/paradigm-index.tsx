import { DocCard, DocCardGroup, DocH2, DocPage, DocParagraph, DocProse } from '@/components/docs';
import { docLabel } from '@/components/docs/doc-style';

export function ParadigmIndexPage() {
  return (
    <DocPage
      title="Phrony"
      description="A Paradigm for Treating Agents as First-Class Primitives"
      eyebrow="Paradigm"
    >
      <DocProse>
        <DocH2>Abstract</DocH2>
        <DocParagraph>
          Agents are a new kind of system primitive. They reason, they act on the world through tools, they consume
          budgets, they involve humans in decisions, and they evolve. Today, almost every team building them treats
          agents as a piece of application code — a function in a service, a route in an app, a script that imports a
          framework and calls a model. The agent is whatever the code in front of the model happens to be.
        </DocParagraph>
        <DocParagraph>
          This paper proposes a different way of building them. Agents should be{' '}
          <strong className="font-medium text-foreground">declared</strong> as their own artifact,{' '}
          <strong className="font-medium text-foreground">deployed</strong> to their own runtime, and{' '}
          <strong className="font-medium text-foreground">run</strong> as named, versioned, addressable entities — the
          way services, schemas, and infrastructure already are.
        </DocParagraph>
        <DocParagraph>
          The declaration is a manifest: a description of what the agent is, what tools it can use, what policies shape
          its behavior, what limits bound it, and where humans get involved. The runtime executes the manifest, mediates
          every tool call, and produces a structured record of what happened. The agent&apos;s reasoning remains
          autonomous; what becomes structured is everything around it.
        </DocParagraph>
        <DocParagraph>
          Phrony is an open specification for this paradigm and an open-core runtime that implements it.
        </DocParagraph>
      </DocProse>

      <div className="not-prose border-t border-border pt-8">
        <p className={docLabel}>Up next</p>
        <DocCardGroup cols={1} className="mt-3">
          <DocCard title="Why we need a spec" href="/docs/paradigm/why-we-need-a-spec">
            How agents outgrew embedded application code—and why they need a shared standard.
          </DocCard>
        </DocCardGroup>
      </div>
    </DocPage>
  );
}
