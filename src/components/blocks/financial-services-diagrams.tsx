import { cn } from '@/lib/utils';

import {
  DiagramFooterLine,
  HArrow,
  SmallNode,
  VArrow,
  diagramCaption,
  diagramFrame,
  inboundLabel,
} from '@/components/blocks/sector-diagram-primitives';

/** Full-width hero: Manual | Brittle | Phrony (progression left to right). */
export function FinancialServicesHeroComparison({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        '-mx-5 border-t border-border bg-zinc-950 md:-mx-8',
        'grid grid-cols-1 divide-y divide-white/10 md:grid-cols-3 md:divide-x md:divide-y-0',
        className,
      )}
      role="img"
      aria-label="Comparison: manual handoffs and brittle API chains versus Phrony governed execution with audit trail"
    >
      <div className="flex flex-col items-center px-4 py-8 opacity-[0.72] md:px-5 md:py-10">
        <div className="flex w-full max-w-[200px] flex-col items-stretch gap-0">
          {(['Analyst', 'Reviewer', 'Committee', 'Decision'] as const).map((label, i) => (
            <div key={label} className="flex flex-col items-center">
              {i > 0 ? <VArrow muted /> : null}
              <SmallNode muted className="w-full">
                {label}
              </SmallNode>
            </div>
          ))}
        </div>
        <p className={cn(diagramCaption, 'mt-4')}>Days</p>
      </div>

      <div className="flex flex-col items-center px-4 py-8 opacity-[0.72] md:px-5 md:py-10">
        <div className="flex w-full max-w-[220px] flex-col gap-2">
          <div className="flex items-center gap-1">
            <SmallNode muted className="min-h-0 flex-1 sm:min-h-[2.25rem]">
              API
            </SmallNode>
            <HArrow muted />
            <SmallNode muted className="min-h-0 flex-1 sm:min-h-[2.25rem]">
              Rule
            </SmallNode>
          </div>
          <div className="flex items-center justify-end gap-1 pl-6">
            <HArrow muted />
            <SmallNode muted className="w-[42%] min-h-0 sm:min-h-[2.25rem]">
              API
            </SmallNode>
          </div>
          <div className="flex items-center gap-1 pl-2">
            <SmallNode muted className="min-h-0 flex-1 sm:min-h-[2.25rem]">
              Rule
            </SmallNode>
            <HArrow dashed flex className="min-w-[16px]" />
            <SmallNode muted className="w-10 min-h-0 shrink-0 border-dashed sm:min-h-[2.25rem]">
              ?
            </SmallNode>
          </div>
        </div>
        <p className={cn(diagramCaption, 'mt-4 leading-snug')}>Breaks on complex cases</p>
      </div>

      <div className="flex flex-col items-center px-4 py-8 md:px-5 md:py-10">
        <div className="w-full max-w-[220px] border border-primary/50 bg-primary/6 px-3 py-3">
          <p className="text-center font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-primary">
            Phrony — governed execution
          </p>
          <div className="mt-2 border border-white/15 bg-zinc-950/80 px-2 py-2 text-center font-mono text-[11px] font-medium text-zinc-100">
            Agent
          </div>
        </div>
        <div className="mt-4 w-full max-w-[220px] border-t border-white/20 pt-2 text-center font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-zinc-500">
          Audit trail
        </div>
        <div className={cn(diagramCaption, 'mt-3 text-zinc-400 opacity-100')}>
          <span>Minutes</span>
          <span className="mx-1.5 text-zinc-600">·</span>
          <span>Compliant</span>
        </div>
      </div>
    </div>
  );
}

export function FinancialDiagramKyc() {
  return (
    <figure className="w-full">
      <div className={diagramFrame}>
        <div className="flex flex-1 flex-col justify-center gap-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-2">
            <div className="flex items-center gap-2 sm:w-[20%] sm:flex-col sm:items-stretch sm:gap-0">
              <SmallNode muted className="w-full min-h-0 sm:min-h-[2.25rem]">
                Identity docs
              </SmallNode>
              <HArrow muted className="w-8 sm:hidden" />
            </div>
            <HArrow muted className="hidden min-h-0 w-4 shrink-0 sm:block sm:mt-3" />
            <div className="flex flex-1 flex-col items-center gap-1 sm:max-w-[34%]">
              <div className="flex w-full justify-center gap-3 sm:gap-5">
                <span className={inboundLabel}>Sanctions lists</span>
                <span className={inboundLabel}>Risk model</span>
              </div>
              <SmallNode className="w-full">KYC Agent</SmallNode>
            </div>
            <HArrow muted className="hidden min-h-0 w-4 shrink-0 sm:block sm:mt-3" />
            <div className="flex flex-col items-center gap-1 sm:w-[28%]">
              <SmallNode className="w-full">Phrony gate</SmallNode>
              <div className="flex w-full flex-col items-center">
                <VArrow muted />
                <div className="w-full border border-dotted border-zinc-500/60 px-2 py-1.5 text-center font-mono text-[10px] font-medium text-zinc-500">
                  Human review
                </div>
              </div>
            </div>
            <HArrow muted className="hidden min-h-0 w-4 shrink-0 sm:block sm:mt-3" />
            <div className="flex items-center gap-2 sm:w-[18%] sm:flex-col sm:items-stretch">
              <HArrow muted className="w-8 sm:hidden" />
              <SmallNode muted className="w-full min-h-0 sm:min-h-[2.25rem]">
                Decision
              </SmallNode>
            </div>
          </div>
        </div>
        <DiagramFooterLine label="Audit trail" ticks={5} />
      </div>
    </figure>
  );
}

export function FinancialDiagramAml() {
  return (
    <figure className="w-full">
      <div className={diagramFrame}>
        <div className="flex flex-1 flex-col items-stretch justify-center gap-4 sm:flex-row sm:gap-2">
          <div className="flex flex-col gap-2 sm:w-[44%]">
            <SmallNode muted className="min-h-0 w-full">
              Agent 1 — Transaction monitor
            </SmallNode>
            <SmallNode muted className="min-h-0 w-full">
              Agent 2 — Behavioral history
            </SmallNode>
            <SmallNode muted className="min-h-0 w-full">
              Agent 3 — Contextual risk
            </SmallNode>
          </div>
          <div className="flex justify-center sm:hidden">
            <VArrow muted />
          </div>
          <div className="hidden flex-col justify-between self-stretch py-1 sm:flex">
            <HArrow muted className="w-6" />
            <HArrow muted className="w-6" />
            <HArrow muted className="w-6" />
          </div>
          <div className="flex flex-col items-center gap-2 sm:w-[40%] sm:self-center">
            <SmallNode className="w-full max-w-[240px]">Phrony — Coordination</SmallNode>
            <div className="flex w-full max-w-[240px] items-center gap-2">
              <HArrow muted flex />
              <SmallNode muted className="min-h-0 flex-1 text-[10px] leading-snug sm:text-[11px]">
                Flagged / cleared
              </SmallNode>
            </div>
          </div>
        </div>
        <DiagramFooterLine label="Audit trail" />
      </div>
    </figure>
  );
}

export function FinancialDiagramCredit() {
  return (
    <figure className="w-full">
      <div className={diagramFrame}>
        <div className="flex flex-1 flex-col justify-center gap-4 sm:flex-row sm:items-center sm:gap-3">
          <div className="flex flex-col gap-2 sm:w-[30%]">
            <div className="flex items-center gap-2">
              <SmallNode muted className="min-h-0 flex-1">
                Applicant data
              </SmallNode>
              <HArrow muted className="hidden w-4 sm:block" />
            </div>
            <div className="flex items-center gap-2">
              <SmallNode muted className="min-h-0 flex-1">
                Market conditions
              </SmallNode>
              <HArrow muted className="hidden w-4 sm:block" />
            </div>
            <div className="flex items-center gap-2">
              <SmallNode muted className="min-h-0 flex-1">
                Credit policy
              </SmallNode>
              <HArrow muted className="hidden w-4 sm:block" />
            </div>
          </div>
          <div className="mx-auto w-full max-w-[280px] border border-primary/50 bg-primary/4 px-3 py-3 sm:mx-0 sm:w-[38%]">
            <p className="text-center font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-primary">
              Phrony — Risk parameters
            </p>
            <div className="mt-2 border border-white/12 bg-zinc-950/90 px-2 py-2 text-center font-mono text-[11px] font-medium text-zinc-100">
              Credit Agent
            </div>
          </div>
          <div className="flex items-center gap-2 sm:w-[28%]">
            <HArrow muted className="hidden w-4 sm:block" />
            <SmallNode muted className="min-h-0 flex-1 text-[10px] leading-snug sm:text-[11px]">
              Decision + reasoning trail
            </SmallNode>
          </div>
        </div>
        <DiagramFooterLine label="Audit trail" />
      </div>
    </figure>
  );
}

export function FinancialDiagramReporting() {
  return (
    <figure className="w-full">
      <div className={diagramFrame}>
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <div className="flex flex-col gap-2 sm:w-[46%]">
            {(['Trading', 'Risk', 'Ops', 'Compliance'] as const).map((s) => (
              <div key={s} className="flex items-center gap-2">
                <SmallNode muted className="min-h-0 flex-1">
                  {s}
                </SmallNode>
                <HArrow muted className="w-5 shrink-0" />
              </div>
            ))}
          </div>
          <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
              <SmallNode muted className="min-h-0 shrink-0">
                Reporting Agent
              </SmallNode>
              <HArrow muted className="w-4" />
              <SmallNode className="min-h-0 shrink-0">Phrony — Validation</SmallNode>
            </div>
            <div className="flex items-stretch gap-2 sm:border-l sm:border-white/10 sm:pl-4">
              <div className="flex flex-col justify-center gap-2">
                <HArrow muted className="w-4" />
                <HArrow muted className="w-4" />
              </div>
              <div className="flex flex-col gap-2">
                <SmallNode muted className="min-h-0">
                  DORA report
                </SmallNode>
                <SmallNode muted className="min-h-0">
                  Basel report
                </SmallNode>
              </div>
            </div>
          </div>
        </div>
        <DiagramFooterLine label="Audit trail" ticks={6} />
      </div>
    </figure>
  );
}
