'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Check } from 'lucide-react';

import { docLabel, docRadius } from '@/components/docs/doc-style';
import {
  QUICK_START_COMPLETE_HREF,
  QUICK_START_STEPS,
  getQuickStartStep,
  type QuickStartStepId,
} from '@/lib/quick-start-data';
import { isNavLinkActive, normalizeDocsPath } from '@/lib/docs-path';
import { useQuickStartProgress } from '@/lib/quick-start-progress-context';
import { cn } from '@/lib/utils';

const railClass =
  'hidden w-52 shrink-0 lg:block sticky top-[calc(4rem+1px+2.75rem)] max-h-[calc(100dvh-4rem-2.75rem-2rem)] overflow-y-auto overscroll-contain scroll-compact';

export function QuickStartRailChecklist() {
  const pathname = usePathname();
  const normalized = normalizeDocsPath(pathname);
  const { hydrated, isStepDone, completedSteps, totalSteps, resetProgress } = useQuickStartProgress();

  const currentStep = QUICK_START_STEPS.find((step) => isNavLinkActive(pathname, step.href));
  const stepPercent =
    totalSteps === 0 ? 0 : Math.round((completedSteps / totalSteps) * 100);

  return (
    <nav className={railClass} aria-label="Quick start checklist">
      <p className={docLabel}>Checklist</p>

      <div className="mt-3 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-muted-foreground">
            {hydrated ? (
              <>
                {completedSteps}/{totalSteps} steps
              </>
            ) : (
              '…'
            )}
          </span>
          <span className="font-mono text-[11px] tabular-nums text-muted-foreground">{stepPercent}%</span>
        </div>
        <div className={cn('h-1 overflow-hidden bg-muted', docRadius)} aria-hidden>
          <div
            className={cn('h-full bg-emerald-600 transition-[width] duration-300 dark:bg-emerald-500', docRadius)}
            style={{ width: hydrated ? `${stepPercent}%` : '0%' }}
          />
        </div>
      </div>

      <ol className="mt-4 space-y-1 border-l border-border">
        {QUICK_START_STEPS.map((step) => {
          const done = hydrated && isStepDone(step.id);
          const isCurrent = normalized === step.href;
          const isIntro = normalized === '/docs/quick-start';

          return (
            <li key={step.id}>
              <Link
                href={step.href}
                className={cn(
                  'block cursor-pointer border-l-2 py-1 pl-3 text-[13px] leading-snug transition-colors',
                  isCurrent
                    ? 'border-foreground font-medium text-foreground'
                    : done
                      ? 'border-transparent text-muted-foreground'
                      : 'border-transparent text-muted-foreground hover:text-foreground',
                )}
                aria-current={isCurrent ? 'page' : undefined}
              >
                <span className="flex items-start gap-2">
                  <StepMarker done={done} step={step.step} />
                  <span className={cn('min-w-0', done && !isCurrent && 'line-through')}>{step.title}</span>
                </span>
              </Link>

              {isCurrent && !isIntro ? (
                <ul className="mb-2 ml-5 mt-1.5 space-y-1 border-l border-border/80 pl-3">
                  {step.tasks.map((task) => (
                    <li
                      key={task.id}
                      className={cn(
                        'py-0.5 text-[12px] leading-snug',
                        done ? 'text-muted-foreground line-through' : 'text-foreground/90',
                      )}
                    >
                      {task.label}
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ol>

      {currentStep && normalized !== '/docs/quick-start' ? (
        <RailStepActions stepId={currentStep.id} />
      ) : null}

      {hydrated && completedSteps >= totalSteps ? (
        <Link
          href={QUICK_START_COMPLETE_HREF}
          className="mt-4 block text-[13px] font-medium text-emerald-800 underline underline-offset-4 hover:no-underline dark:text-emerald-300"
        >
          You finished — view summary
        </Link>
      ) : null}

      {hydrated && completedSteps > 0 ? (
        <button
          type="button"
          onClick={resetProgress}
          className="mt-4 cursor-pointer text-[11px] text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          Reset progress
        </button>
      ) : null}
    </nav>
  );
}

function StepMarker({ done, step }: { done: boolean; step: number }) {
  return (
    <span
      className={cn(
        'mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border text-[10px] font-semibold tabular-nums',
        done
          ? 'border-emerald-600 bg-emerald-600 text-white dark:border-emerald-500 dark:bg-emerald-500'
          : 'border-border bg-background text-muted-foreground',
      )}
      aria-hidden
    >
      {done ? <Check className="size-2.5" strokeWidth={3} /> : step}
    </span>
  );
}

function RailStepActions({ stepId }: { stepId: QuickStartStepId }) {
  const router = useRouter();
  const step = getQuickStartStep(stepId);
  const { setStepComplete, isStepDone, hydrated } = useQuickStartProgress();
  const done = hydrated && isStepDone(stepId);

  const handleToggleStep = () => {
    if (!done) {
      const willCompleteAll = QUICK_START_STEPS.every((entry) =>
        entry.id === stepId ? true : isStepDone(entry.id),
      );
      setStepComplete(stepId, true);
      if (willCompleteAll) {
        router.push(QUICK_START_COMPLETE_HREF);
      }
      return;
    }
    setStepComplete(stepId, false);
  };

  return (
    <div className="mt-4 space-y-2 border-t border-border pt-4">
      <button
        type="button"
        disabled={!hydrated}
        onClick={handleToggleStep}
        className={cn(
          'w-full cursor-pointer rounded-md border px-2.5 py-1.5 text-left text-xs font-medium transition-colors',
          done
            ? 'border-emerald-200/80 bg-emerald-50/80 text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-950/40 dark:text-emerald-100'
            : 'border-border bg-muted/30 text-foreground hover:bg-muted/50',
        )}
      >
        {done ? 'Step complete' : 'Mark step complete'}
      </button>
      <p className="text-[11px] leading-snug text-muted-foreground">
        Step {step.step} of {QUICK_START_STEPS.length}
      </p>
    </div>
  );
}
