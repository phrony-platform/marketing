import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

import {
  DocPage,
  DocParagraph,
  DocProse,
  docLinkClass,
} from '@/components/docs';
import { docButtonPrimary, docButtonSecondary, docPanel } from '@/components/docs/doc-style';
import { QuickStartCompleteStatus } from '@/components/docs/quick-start/quick-start-complete-status';
import { QUICK_START_STEPS } from '@/lib/quick-start-data';
import { cn } from '@/lib/utils';

export function QuickStartCompletePage() {
  return (
    <DocPage
      title="You finished the quick start"
      description="All five checklist steps are done—you are ready to explore the rest of the Phrony documentation."
      eyebrow="Quick start"
    >
      <DocProse>
        <div
          className={cn(
            'not-prose flex flex-col items-center px-6 py-10 text-center',
            docPanel,
            'border-emerald-500/25 bg-emerald-50/50 dark:bg-emerald-950/20',
          )}
        >
          <CheckCircle2
            className="size-12 text-emerald-600 dark:text-emerald-400"
            strokeWidth={1.5}
            aria-hidden
          />
          <p className="mt-4 text-lg font-medium text-foreground">Congratulations!</p>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            You worked through the full quick start—runtime setup, your first manifest, publish and run, tool binding,
            and human-in-the-loop approval ({QUICK_START_STEPS.length} steps).
          </p>
          <QuickStartCompleteStatus />
        </div>

        <DocParagraph>
          Continue with the paradigm, agent spec, and runtime reference when you are ready to go deeper.
        </DocParagraph>

        <div className="not-prose flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link href="/docs" className={docButtonPrimary}>
            Back to documentation
          </Link>
          <Link href="/docs/quick-start" className={docButtonSecondary}>
            Quick start home
          </Link>
        </div>

        <DocParagraph>
          <Link href="/docs/paradigm" className={docLinkClass}>
            Paradigm
          </Link>
          {' · '}
          <Link href="/docs/agent-spec" className={docLinkClass}>
            Agent spec
          </Link>
          {' · '}
          <Link href="/docs/runtime" className={docLinkClass}>
            Runtime
          </Link>
        </DocParagraph>
      </DocProse>
    </DocPage>
  );
}
