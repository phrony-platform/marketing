import type { ReactNode } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';

import { docLabel, docPanel, docRadius } from '@/components/docs/doc-style';
import { cn } from '@/lib/utils';

type FlowVariant = 'default' | 'policy' | 'runtime' | 'worker';

type FailureVariant = 'queue' | 'wait' | 'unknown' | 'hitl';

const failureVariantClass: Record<FailureVariant, { card: string; outcome: string }> = {
  queue: {
    card: 'border-sky-500/30 bg-sky-50/50 dark:border-sky-500/35 dark:bg-sky-950/30',
    outcome: 'border-sky-500/25 bg-sky-500/10 text-sky-950 dark:text-sky-100',
  },
  wait: {
    card: 'border-amber-500/30 bg-amber-50/50 dark:border-amber-500/35 dark:bg-amber-950/30',
    outcome: 'border-amber-500/25 bg-amber-500/10 text-amber-950 dark:text-amber-100',
  },
  unknown: {
    card: 'border-orange-500/30 bg-orange-50/50 dark:border-orange-500/35 dark:bg-orange-950/30',
    outcome: 'border-orange-500/25 bg-orange-500/10 text-orange-950 dark:text-orange-100',
  },
  hitl: {
    card: 'border-rose-500/30 bg-rose-50/50 dark:border-rose-500/35 dark:bg-rose-950/30',
    outcome: 'border-rose-500/25 bg-rose-500/10 text-rose-950 dark:text-rose-100',
  },
};

const variantClass: Record<FlowVariant, string> = {
  default: 'border-border bg-background text-foreground',
  policy: 'border-amber-500/35 bg-amber-50/80 text-amber-950 dark:border-amber-500/40 dark:bg-amber-950/40 dark:text-amber-50',
  runtime: 'border-foreground/25 bg-foreground/[0.04] font-medium text-foreground',
  worker: 'border-border bg-muted/30 text-foreground',
};

function FlowStep({
  label,
  children,
  variant = 'default',
}: {
  label: string;
  children: ReactNode;
  variant?: FlowVariant;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5 sm:flex-row sm:items-start sm:gap-3">
      <span className={cn(docLabel, 'shrink-0 pt-1.5 sm:w-16')}>{label}</span>
      <div
        className={cn(
          docRadius,
          'min-w-0 flex-1 border px-3 py-2 font-mono text-[12px] leading-relaxed sm:text-[13px]',
          variantClass[variant],
        )}
      >
        {children}
      </div>
    </div>
  );
}

function DownArrow() {
  return (
    <div className="flex justify-center py-0.5 sm:pl-16">
      <ArrowDown className="size-3.5 text-muted-foreground" strokeWidth={1.5} aria-hidden />
    </div>
  );
}

function ConceptFigure({
  title,
  children,
  'aria-label': ariaLabel,
}: {
  title: string;
  children: ReactNode;
  'aria-label': string;
}) {
  return (
    <figure className={cn('not-prose', docPanel, docRadius, 'p-4 sm:p-5')} aria-label={ariaLabel}>
      <p className={cn(docLabel, 'mb-4')}>{title}</p>
      {children}
    </figure>
  );
}

export function ToolDispatchPolicyCheckIllustration() {
  return (
    <ConceptFigure title="Policy check (before dispatch)" aria-label="Policy check before tool dispatch">
      <div className="mx-auto max-w-lg">
        <FlowStep label="Model" variant="default">
          <span className="text-muted-foreground">wants</span>{' '}
          <span className="text-foreground">send_alert</span>
          <span className="text-muted-foreground">(severity: 4, audience_size: 50000)</span>
        </FlowStep>
        <DownArrow />
        <FlowStep label="Policy" variant="policy">
          severity &gt; 3 → <span className="font-semibold">require_approval</span>
        </FlowStep>
        <DownArrow />
        <FlowStep label="Runtime" variant="runtime">
          session → <span className="font-semibold">awaiting_approval</span>
          <p className="mt-1.5 font-sans text-[11px] font-normal text-muted-foreground">
            No worker invoked yet
          </p>
        </FlowStep>
      </div>
    </ConceptFigure>
  );
}

function FailureModeRow({
  name,
  cause,
  outcome,
  variant,
}: {
  name: string;
  cause: string;
  outcome: string;
  variant: FailureVariant;
}) {
  const styles = failureVariantClass[variant];

  return (
    <div className={cn(docRadius, 'border p-3 sm:p-3.5', styles.card)}>
      <p className="text-sm font-medium text-foreground">{name}</p>
      <div className="mt-2 flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
        <p className="min-w-0 flex-1 font-mono text-[12px] leading-relaxed text-muted-foreground sm:text-[13px]">
          {cause}
        </p>
        <ArrowRight className="hidden size-3.5 shrink-0 text-muted-foreground sm:block" strokeWidth={1.5} aria-hidden />
        <p
          className={cn(
            docRadius,
            'shrink-0 border px-2.5 py-1.5 font-mono text-[11px] leading-snug sm:text-[12px]',
            styles.outcome,
          )}
        >
          {outcome}
        </p>
      </div>
    </div>
  );
}

const failureModes = [
  {
    name: 'No handler',
    cause: 'No worker registered for weather.get-forecast@1.0.0',
    outcome: 'Queued → fail or escalate',
    variant: 'queue' as const,
  },
  {
    name: 'Capacity exhausted',
    cause: 'Workers exist but all busy',
    outcome: 'FIFO wait → fail or escalate',
    variant: 'wait' as const,
  },
  {
    name: 'Lease expired',
    cause: 'Worker stopped heartbeating mid-call',
    outcome: 'Outcome may be unknown',
    variant: 'unknown' as const,
  },
  {
    name: 'Indeterminate',
    cause: 'Worker died after starting alert send',
    outcome: 'HITL — no silent retry',
    variant: 'hitl' as const,
  },
];

export function ToolDispatchFailureModesIllustration() {
  return (
    <ConceptFigure
      title="Four routing outcomes (not one generic “dispatch failed”)"
      aria-label="Tool dispatch failure modes"
    >
      <div className="grid gap-3">
        {failureModes.map((mode) => (
          <FailureModeRow key={mode.name} {...mode} />
        ))}
      </div>
    </ConceptFigure>
  );
}

export function ToolDispatchInvokeIllustration() {
  return (
    <ConceptFigure title="Dispatch (after approval)" aria-label="Tool dispatch to worker and back">
      <div className="mx-auto max-w-lg space-y-2">
        <FlowStep label="Runtime" variant="runtime">
          invoke(worker, call_id=
          <span className="text-foreground">run_abc:turn1:0</span>, args={'{ severity: 4, audience_size: 50000 }'})
        </FlowStep>
        <DownArrow />
        <FlowStep label="Worker" variant="worker">
          result({'{'} alert_id: &quot;a-99&quot;, status: &quot;sent&quot; {'}'})
        </FlowStep>
        <DownArrow />
        <FlowStep label="Runtime" variant="runtime">
          append <span className="text-foreground">tool_result</span> to history → model continues
        </FlowStep>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2 border-t border-dashed border-border pt-4 font-mono text-[11px] text-muted-foreground sm:text-xs">
        <span className={cn(docRadius, 'border border-border bg-muted/25 px-2 py-1')}>Runtime</span>
        <ArrowRight className="size-3 shrink-0" strokeWidth={1.5} aria-hidden />
        <span className={cn(docRadius, 'border border-border bg-muted/25 px-2 py-1')}>Worker</span>
        <ArrowRight className="size-3 shrink-0" strokeWidth={1.5} aria-hidden />
        <span className={cn(docRadius, 'border border-border bg-muted/25 px-2 py-1')}>Runtime</span>
        <ArrowRight className="size-3 shrink-0" strokeWidth={1.5} aria-hidden />
        <span className={cn(docRadius, 'border border-border bg-muted/25 px-2 py-1')}>Model</span>
      </div>
    </ConceptFigure>
  );
}
