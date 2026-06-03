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

/** Decision tree fragment: 1 → 2 → 4 leaves, one path dashed to Edge case. */
function RigidWorkflowTree() {
  return (
    <div className="flex w-full max-w-[218px] flex-col items-center">
      <SmallNode muted className="w-[5.5rem] min-h-0 text-[10px]">
        Condition
      </SmallNode>
      <VArrow muted />
      <div className="flex w-full justify-between gap-3">
        <div className="flex min-w-0 flex-1 flex-col items-center gap-1">
          <SmallNode muted className="w-full min-h-0 text-[9px] sm:text-[10px]">
            Arm 1
          </SmallNode>
          <VArrow muted />
          <div className="flex w-full gap-1">
            <SmallNode muted className="min-h-0 flex-1 px-1 py-1 text-[9px]">
              Case
            </SmallNode>
            <SmallNode muted className="min-h-0 flex-1 px-1 py-1 text-[9px]">
              Case
            </SmallNode>
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col items-center gap-1">
          <SmallNode muted className="w-full min-h-0 text-[9px] sm:text-[10px]">
            Arm 2
          </SmallNode>
          <VArrow muted />
          <div className="flex w-full flex-col items-stretch gap-1">
            <SmallNode muted className="min-h-0 w-full text-[9px]">
              Case
            </SmallNode>
            <div className="flex w-full items-center gap-0.5">
              <HArrow dashed flex className="min-w-0" />
            </div>
            <SmallNode muted className="min-h-0 w-full border-dashed text-[9px]">
              Edge case
            </SmallNode>
          </div>
        </div>
      </div>
    </div>
  );
}

export function InsuranceHeroComparison({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        '-mx-5 border-t border-border bg-zinc-950 md:-mx-8',
        'grid grid-cols-1 divide-y divide-white/10 md:grid-cols-3 md:divide-x md:divide-y-0',
        className,
      )}
      role="img"
      aria-label="Comparison: human rule chains and rigid decision trees versus Phrony policy-bound execution with run tree"
    >
      <div className="flex flex-col items-center px-4 py-8 opacity-[0.72] md:px-5 md:py-10">
        <div className="flex w-full max-w-[200px] flex-col items-stretch gap-0">
          {(['Adjuster', 'Checklist', 'Supervisor', 'Decision'] as const).map((label, i) => (
            <div key={label} className="flex flex-col items-center">
              {i > 0 ? <VArrow muted /> : null}
              <SmallNode muted className="w-full">
                {label}
              </SmallNode>
            </div>
          ))}
        </div>
        <p className={cn(diagramCaption, 'mt-4')}>Days</p>
        <p className={cn(diagramCaption, 'mt-1 normal-case tracking-normal opacity-90')}>
          Inconsistent
        </p>
      </div>

      <div className="flex flex-col items-center px-4 py-8 opacity-[0.72] md:px-5 md:py-10">
        <RigidWorkflowTree />
        <p className={cn(diagramCaption, 'mt-4 max-w-[14rem] leading-snug')}>
          Breaks on anything unexpected
        </p>
      </div>

      <div className="flex flex-col items-center px-4 py-8 md:px-5 md:py-10">
        <div className="w-full max-w-[220px] border border-primary/50 bg-primary/6 px-3 py-3">
          <p className="text-center font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-primary">
            Phrony — policy-bound execution
          </p>
          <div className="mt-2 border border-white/15 bg-zinc-950/80 px-2 py-2 text-center font-mono text-[11px] font-medium text-zinc-100">
            Agent
          </div>
        </div>
        <div className="mt-4 w-full max-w-[220px] border-t border-white/20 pt-2 text-center font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-zinc-500">
          Run tree
        </div>
        <div className={cn(diagramCaption, 'mt-3 text-zinc-400 opacity-100')}>
          <span>Minutes</span>
          <span className="mx-1.5 text-zinc-600">·</span>
          <span>Explainable</span>
        </div>
      </div>
    </div>
  );
}

export function InsuranceDiagramClaims() {
  return (
    <figure className="w-full">
      <div className={diagramFrame}>
        <div className="flex flex-1 flex-col justify-center gap-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-3">
            <div className="flex items-center gap-2 md:w-[18%] md:flex-col md:items-stretch">
              <SmallNode muted className="w-full min-h-0 md:min-h-[2.25rem]">
                Incoming claim
              </SmallNode>
              <HArrow muted className="w-8 md:hidden" />
            </div>
            <HArrow muted className="hidden min-h-0 w-3 shrink-0 md:block md:mt-3" />
            <div className="flex flex-1 flex-col items-center gap-1 md:max-w-[30%]">
              <div className="flex w-full flex-wrap justify-center gap-x-2 gap-y-1 md:gap-x-3">
                <span className={inboundLabel}>Policy terms</span>
                <span className={inboundLabel}>Fraud signals</span>
                <span className={inboundLabel}>Claim history</span>
              </div>
              <SmallNode className="w-full">Claims Agent</SmallNode>
            </div>
            <HArrow muted className="hidden min-h-0 w-3 shrink-0 md:block md:mt-3" />
            <div className="flex flex-col items-stretch gap-2 md:w-[22%]">
              <SmallNode className="w-full">Phrony gate</SmallNode>
            </div>
            <div className="flex flex-1 flex-col justify-center gap-2 md:min-w-0 md:max-w-[32%]">
              <div className="flex items-center gap-2">
                <HArrow muted className="w-5 shrink-0 md:w-6" />
                <SmallNode muted className="min-h-0 flex-1">
                  Approve
                </SmallNode>
              </div>
              <div className="flex items-center gap-2">
                <HArrow muted className="w-5 shrink-0 md:w-6" />
                <SmallNode muted className="min-h-0 flex-1">
                  Reject
                </SmallNode>
              </div>
              <div className="flex items-center gap-2">
                <HArrow dashed className="w-5 shrink-0 md:w-6" />
                <SmallNode muted className="min-h-0 flex-1 border-dotted">
                  Escalate
                </SmallNode>
              </div>
            </div>
          </div>
        </div>
        <DiagramFooterLine label="Reasoning log" ticks={5} />
      </div>
    </figure>
  );
}

export function InsuranceDiagramUnderwriting() {
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
                Risk factors
              </SmallNode>
              <HArrow muted className="hidden w-4 sm:block" />
            </div>
            <div className="flex items-center gap-2">
              <SmallNode muted className="min-h-0 flex-1">
                Market conditions
              </SmallNode>
              <HArrow muted className="hidden w-4 sm:block" />
            </div>
          </div>
          <div className="mx-auto w-full max-w-[280px] border border-primary/50 bg-primary/4 px-3 py-3 sm:mx-0 sm:w-[38%]">
            <p className="text-center font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-primary">
              Phrony — Risk appetite
            </p>
            <div className="mt-2 border border-white/12 bg-zinc-950/90 px-2 py-2 text-center font-mono text-[11px] font-medium text-zinc-100">
              Underwriting Agent
            </div>
          </div>
          <div className="flex items-center gap-2 sm:w-[28%]">
            <HArrow muted className="hidden w-4 sm:block" />
            <SmallNode muted className="min-h-0 flex-1 text-[10px] leading-snug sm:text-[11px]">
              Decision + weighted factors
            </SmallNode>
          </div>
        </div>
        <DiagramFooterLine label="Reasoning log" />
      </div>
    </figure>
  );
}

export function InsuranceDiagramSupport() {
  return (
    <figure className="w-full">
      <div className={diagramFrame}>
        <div className="flex flex-1 flex-col justify-center gap-4 sm:flex-row sm:items-start sm:gap-3">
          <div className="flex items-center gap-2 sm:w-[22%] sm:flex-col sm:items-stretch">
            <SmallNode muted className="w-full min-h-0 sm:min-h-[2.25rem]">
              Policyholder query
            </SmallNode>
            <HArrow muted className="w-8 sm:hidden" />
          </div>
          <HArrow muted className="hidden min-h-0 w-4 shrink-0 sm:block sm:mt-6" />
          <div className="mx-auto w-full max-w-[320px] border border-primary/50 bg-primary/4 px-3 py-3 sm:mx-0 sm:flex-1">
            <p className="text-center font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-primary">
              Phrony — allowed scope
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1">
              <span className={inboundLabel}>Policy documents</span>
              <span className={inboundLabel}>Knowledge base</span>
            </div>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-2">
              <div className="flex min-w-0 flex-1 flex-col items-center gap-2">
                <SmallNode className="w-full">Support Agent</SmallNode>
                <div className="flex w-full flex-col items-center">
                  <VArrow muted />
                  <div className="w-full border border-dotted border-zinc-500/60 px-2 py-1.5 text-center font-mono text-[10px] font-medium text-zinc-500">
                    Human handoff
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 sm:mt-1 sm:shrink-0 sm:self-start">
                <HArrow muted className="w-6" />
                <SmallNode muted className="min-h-0 w-full min-w-[4.5rem] sm:w-auto">
                  Answer
                </SmallNode>
              </div>
            </div>
          </div>
        </div>
        <DiagramFooterLine label="Reasoning log" />
      </div>
    </figure>
  );
}

function MiniRunTreeArtifact() {
  const twig = (
    <>
      <VArrow muted />
      <div className="flex justify-center gap-1">
        <span className="border border-white/12 bg-white/[0.02] px-1 py-px font-mono text-[8px] text-zinc-500">
          step
        </span>
        <span className="border border-white/12 bg-white/[0.02] px-1 py-px font-mono text-[8px] text-zinc-500">
          step
        </span>
      </div>
    </>
  );
  return (
    <div className="mt-auto w-full border-t border-white/15 pt-3">
      <div className="flex flex-col items-center gap-2">
        <div className="border border-white/15 bg-white/[0.02] px-2 py-1 font-mono text-[9px] text-zinc-400">
          session
        </div>
        <VArrow muted />
        <div className="flex w-full max-w-[280px] justify-between gap-1 sm:gap-2">
          <div className="flex flex-col items-center gap-0.5">
            <span className="border border-white/12 px-1.5 py-0.5 font-mono text-[8px] text-zinc-500">
              agent 1
            </span>
            {twig}
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <span className="border border-white/12 px-1.5 py-0.5 font-mono text-[8px] text-zinc-500">
              agent 2
            </span>
            <VArrow muted />
            <span className="border border-white/12 bg-white/[0.02] px-1 py-px font-mono text-[8px] text-zinc-500">
              step
            </span>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <span className="border border-white/12 px-1.5 py-0.5 font-mono text-[8px] text-zinc-500">
              agent 3
            </span>
            {twig}
          </div>
        </div>
        <p className="max-w-[18rem] text-center font-mono text-[9px] leading-snug text-zinc-500">
          Run tree — what each agent did, and why
        </p>
      </div>
    </div>
  );
}

export function InsuranceDiagramInvestigation() {
  return (
    <figure className="w-full">
      <div className={diagramFrame}>
        <div className="flex flex-1 flex-col items-stretch justify-center gap-4 sm:flex-row sm:gap-2">
          <div className="flex flex-col gap-2 sm:w-[44%]">
            <SmallNode muted className="min-h-0 w-full">
              Agent 1 — Claim assessment
            </SmallNode>
            <SmallNode muted className="min-h-0 w-full">
              Agent 2 — Fraud detection
            </SmallNode>
            <SmallNode muted className="min-h-0 w-full">
              Agent 3 — Precedent retrieval
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
            <SmallNode className="w-full max-w-[240px]">Phrony — Governed session</SmallNode>
            <div className="flex w-full max-w-[240px] items-center gap-2">
              <HArrow muted flex />
              <SmallNode muted className="min-h-0 flex-1 text-[10px] leading-snug sm:text-[11px]">
                Investigation outcome
              </SmallNode>
            </div>
          </div>
        </div>
        <MiniRunTreeArtifact />
      </div>
    </figure>
  );
}
