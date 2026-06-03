import Link from 'next/link';

import {
  DocNote,
  DocPage,
  DocParagraph,
  DocProse,
  docLinkClass,
} from '@/components/docs';
import { QuickStartStartCard } from '@/components/docs/quick-start/quick-start-start-card';
import { QUICK_START_STEPS } from '@/lib/quick-start-data';

const stepOne = QUICK_START_STEPS[0]!;

export function QuickStartIndexPage() {
  return (
    <DocPage
      title="Quick start"
      description="A hands-on checklist: runtime setup, first manifest, publish and run, then tools and HITL."
      eyebrow="Quick start"
    >
      <DocProse>
        <DocNote title="This is a checklist">
          <p>
            Work through the five steps in order using the <strong className="text-foreground">checklist on the right</strong>{' '}
            (on large screens). Check off tasks as you go—progress is saved in your browser. When a step is finished,
            it shows with a checkmark. Brief concept boxes on each step page explain terms; follow the links for full
            reference docs.
          </p>
        </DocNote>

        <DocParagraph>
          You will start the runtime, write a manifest that describes your agent, hand that file to the runtime, and
          run your first session—then extend the agent with tools and human approval. Follow the steps in order
          with the open-source reference runtime and the <code>phrony</code> CLI.
        </DocParagraph>

        <QuickStartStartCard
          step={stepOne.step}
          title={stepOne.title}
          href={stepOne.href}
          summary={stepOne.summary}
        />

        <DocParagraph>
          Finished everything? Continue with the{' '}
          <Link href="/docs/paradigm" className={docLinkClass}>
            paradigm
          </Link>
          ,{' '}
          <Link href="/docs/agent-spec" className={docLinkClass}>
            agent spec
          </Link>
          , or{' '}
          <Link href="/docs/runtime" className={docLinkClass}>
            runtime reference
          </Link>
          .
        </DocParagraph>
      </DocProse>
    </DocPage>
  );
}
