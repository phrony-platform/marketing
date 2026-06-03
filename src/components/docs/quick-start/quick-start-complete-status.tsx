'use client';

import Link from 'next/link';

import { docButtonPrimary } from '@/components/docs/doc-style';
import { QUICK_START_STEPS } from '@/lib/quick-start-data';
import { useQuickStartProgress } from '@/lib/quick-start-progress-context';

/** Client-only progress readout and gate when the checklist is not finished. */
export function QuickStartCompleteStatus() {
  const { hydrated, completedSteps, totalSteps } = useQuickStartProgress();

  if (!hydrated) {
    return (
      <p className="mt-1 font-mono text-xs tabular-nums text-emerald-800 dark:text-emerald-300" aria-live="polite">
        …
      </p>
    );
  }

  if (completedSteps < totalSteps) {
    return (
      <div className="not-prose mt-6 space-y-4 rounded-md border border-amber-500/30 bg-amber-50/60 px-4 py-3 dark:bg-amber-950/30">
        <p className="text-sm text-foreground">
          Your browser shows {completedSteps}/{totalSteps} steps complete. Finish the checklist to confirm you are
          done, or continue below to explore the rest of the docs.
        </p>
        <Link href="/docs/quick-start" className={docButtonPrimary}>
          Continue quick start
        </Link>
        <p className="text-xs text-muted-foreground">
          {QUICK_START_STEPS.length} steps total — progress is saved locally in your browser.
        </p>
      </div>
    );
  }

  return (
    <p className="mt-1 font-mono text-xs tabular-nums text-emerald-800 dark:text-emerald-300">
      {completedSteps}/{totalSteps} steps complete
    </p>
  );
}
