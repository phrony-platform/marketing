'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';

import { docButtonPrimary, docButtonSecondary } from '@/components/docs/doc-style';
import { QUICK_START_COMPLETE_HREF, QUICK_START_STEPS } from '@/lib/quick-start-data';
import type { QuickStartStepId } from '@/lib/quick-start-data';
import { getQuickStartNextHref, getQuickStartNextLabel } from '@/lib/quick-start-navigation';
import { useQuickStartProgress } from '@/lib/quick-start-progress-context';
import { cn } from '@/lib/utils';

type Props = {
  stepId: QuickStartStepId;
  className?: string;
};

/** Prev link plus mark-complete / next — tasks live in the right rail. */
export function QuickStartStepPanel({ stepId, className }: Props) {
  const router = useRouter();
  const { hydrated, isStepDone, setStepComplete, completedSteps, totalSteps } = useQuickStartProgress();
  const done = hydrated && isStepDone(stepId);

  const stepIndex = QUICK_START_STEPS.findIndex((entry) => entry.id === stepId);
  const prev = stepIndex > 0 ? QUICK_START_STEPS[stepIndex - 1] : null;
  const nextHref = stepIndex >= 0 ? getQuickStartNextHref(stepIndex) : null;
  const nextLabel = stepIndex >= 0 ? getQuickStartNextLabel(stepIndex) : null;
  const allStepsDone = hydrated && completedSteps >= totalSteps;

  const handleMarkComplete = () => {
    const willCompleteAll =
      QUICK_START_STEPS.every((step) => (step.id === stepId ? true : isStepDone(step.id))) &&
      !isStepDone(stepId);
    setStepComplete(stepId, true);
    if (willCompleteAll) {
      router.push(QUICK_START_COMPLETE_HREF);
    }
  };

  return (
    <nav
      className={cn(
        'not-prose flex flex-col gap-3 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between',
        className,
      )}
      aria-label="Quick start steps"
    >
      {prev ? (
        <Link href={prev.href} className={docButtonSecondary}>
          ← Step {prev.step}: {prev.title}
        </Link>
      ) : (
        <Link href="/docs/quick-start" className={docButtonSecondary}>
          ← Quick start home
        </Link>
      )}

      <div className="flex flex-col items-stretch gap-2 sm:items-end">
        {!done ? (
          <button
            type="button"
            disabled={!hydrated}
            onClick={handleMarkComplete}
            className={docButtonPrimary}
          >
            Mark step complete
          </button>
        ) : (
          <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-3">
            <p className="flex shrink-0 items-center justify-center gap-1.5 text-sm font-medium text-emerald-800 dark:text-emerald-300 sm:justify-end">
              <Check className="size-4 shrink-0" strokeWidth={2.5} aria-hidden />
              Step complete
            </p>
            {nextHref ? (
              <Link href={nextHref} className={allStepsDone ? docButtonPrimary : docButtonSecondary}>
                {nextLabel}
                {allStepsDone ? '' : ' →'}
              </Link>
            ) : null}
          </div>
        )}
      </div>
    </nav>
  );
}
