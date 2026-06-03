import { cn } from '@/lib/utils';

import {
  DiagramFooterLine,
  HArrow,
  SmallNode,
  VArrow,
  diagramFrame,
} from '@/components/blocks/sector-diagram-primitives';

function ControlPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="block rounded-full border border-primary/35 bg-primary/6 px-2.5 py-1 text-center font-mono text-[8px] font-medium leading-snug text-zinc-300 sm:text-[9px]">
      {children}
    </span>
  );
}

/** Full-width hero: patient data | Phrony (dominant) | outputs */
export function HealthcareHeroComparison({ className }: { className?: string }) {
  const dataLabels = [
    'Clinical notes',
    'Lab results',
    'Diagnosis history',
    'Trial data',
  ] as const;
  const outputLabels = ['Documentation', 'Recommendation', 'Submission', 'Alert'] as const;

  return (
    <div
      className={cn(
        '-mx-5 border-t border-border bg-zinc-950 md:-mx-8',
        'grid grid-cols-1 divide-y divide-white/10 md:grid-cols-3 md:divide-x md:divide-y-0',
        className,
      )}
      role="img"
      aria-label="Patient data flows through Phrony governed execution to outputs, with explicit control surfaces"
    >
      <div className="flex flex-col items-center px-4 py-8 text-zinc-500 opacity-[0.82] md:px-5 md:py-10">
        <p className="mb-4 font-mono text-[9px] font-semibold uppercase tracking-[0.16em]">
          Patient data
        </p>
        <div className="flex w-full max-w-[200px] flex-col items-stretch">
          {dataLabels.map((label) => (
            <div key={label} className="flex flex-col items-center">
              <SmallNode muted className="w-full">
                {label}
              </SmallNode>
              <VArrow muted />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-stretch px-4 py-8 md:px-5 md:py-10">
        <div className="mx-auto flex min-h-[280px] w-full max-w-[260px] flex-col border border-primary/50 bg-primary/6 px-3 py-4 sm:min-h-[300px]">
          <p className="text-center font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-primary">
            Phrony — governed execution
          </p>
          <div className="mt-3 flex flex-1 flex-col justify-center gap-2">
            <ControlPill>What the agent can access</ControlPill>
            <ControlPill>What it can decide</ControlPill>
            <ControlPill>Where the clinician stays in the loop</ControlPill>
          </div>
          <div className="mt-4 border border-white/15 bg-zinc-950/85 px-2 py-2 text-center font-mono text-[11px] font-medium text-zinc-100">
            Agent
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center px-4 py-8 text-zinc-500 opacity-[0.82] md:px-5 md:py-10">
        <p className="mb-4 font-mono text-[9px] font-semibold uppercase tracking-[0.16em]">
          Outputs
        </p>
        <div className="flex w-full max-w-[200px] flex-col gap-2">
          {outputLabels.map((label) => (
            <div key={label} className="flex items-center gap-2">
              <HArrow muted className="w-5 shrink-0" />
              <SmallNode muted className="min-h-0 flex-1">
                {label}
              </SmallNode>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TraceabilityBand() {
  return (
    <div className="mt-2 w-full border-t border-white/10 pt-3">
      <p className="mb-2 text-center font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-zinc-500">
        Input-to-output traceability
      </p>
      <div className="relative flex min-h-[3.25rem] justify-between gap-1 px-1 sm:px-2">
        <div className="flex flex-1 justify-between gap-0.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-1 flex-col items-center">
              <div className="h-5 w-px border-l border-dotted border-zinc-500/55" aria-hidden />
              <span className="mt-1 h-1 w-px bg-zinc-500/60" aria-hidden />
            </div>
          ))}
        </div>
        <div className="w-4 shrink-0" aria-hidden />
        <div className="flex flex-1 justify-center gap-6 sm:gap-8">
          {[0, 1].map((i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="h-5 w-px border-l border-dotted border-zinc-500/55" aria-hidden />
              <span className="mt-1 h-1 w-px bg-zinc-500/60" aria-hidden />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function HealthcareDiagramClinicalDocs() {
  return (
    <figure className="w-full">
      <div className={diagramFrame}>
        <div className="flex flex-1 flex-col justify-center gap-3 sm:flex-row sm:items-stretch sm:gap-3">
          <div className="flex flex-col gap-2 sm:w-[32%]">
            {(['Clinical notes', 'Lab results', 'Diagnosis history'] as const).map((s) => (
              <div key={s} className="flex items-center gap-2">
                <SmallNode muted className="min-h-0 flex-1">
                  {s}
                </SmallNode>
                <HArrow muted className="w-4 shrink-0" />
              </div>
            ))}
          </div>
          <div className="mx-auto w-full max-w-[200px] border border-primary/50 bg-primary/4 px-2.5 py-2.5 sm:mx-0 sm:w-[30%]">
            <p className="text-center font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-primary">
              Phrony
            </p>
            <div className="mt-2 border border-white/12 bg-zinc-950/90 px-2 py-2 text-center font-mono text-[11px] font-medium text-zinc-100">
              Documentation Agent
            </div>
          </div>
          <div className="flex flex-col justify-center gap-2 sm:w-[28%]">
            <div className="flex items-center gap-2">
              <HArrow muted className="w-4 shrink-0" />
              <SmallNode muted className="min-h-0 flex-1">
                Documentation
              </SmallNode>
            </div>
            <div className="flex items-center gap-2">
              <HArrow muted className="w-4 shrink-0" />
              <SmallNode muted className="min-h-0 flex-1">
                Billing codes
              </SmallNode>
            </div>
          </div>
        </div>
        <TraceabilityBand />
      </div>
    </figure>
  );
}

export function HealthcareDiagramTriage() {
  return (
    <figure className="w-full">
      <div className={diagramFrame}>
        <div className="flex flex-1 flex-col justify-center gap-3 md:flex-row md:items-center md:gap-2">
          <div className="flex flex-col gap-2 md:w-[26%]">
            <div className="flex items-center gap-2">
              <SmallNode muted className="min-h-0 flex-1">
                Patient history
              </SmallNode>
              <HArrow muted className="hidden w-5 shrink-0 md:block" />
            </div>
            <div className="flex items-center gap-2">
              <SmallNode muted className="min-h-0 flex-1">
                Risk indicators
              </SmallNode>
              <HArrow muted className="hidden w-5 shrink-0 md:block" />
            </div>
          </div>
          <div className="hidden flex-col justify-center gap-5 self-stretch py-1 md:flex">
            <HArrow muted className="w-5" />
            <HArrow muted className="w-5" />
          </div>
          <div className="flex justify-center md:hidden">
            <VArrow muted />
          </div>
          <div className="flex flex-1 flex-col items-center gap-2 md:max-w-[42%]">
            <SmallNode muted className="w-full max-w-[220px]">
              Triage Agent
            </SmallNode>
            <VArrow muted />
            <SmallNode muted className="w-full max-w-[220px]">
              Structured recommendation
            </SmallNode>
            <VArrow muted />
            <div className="w-full max-w-[240px] border-2 border-primary/60 bg-primary/12 px-2 py-2 text-center">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
                Phrony HITL gate
              </p>
              <p className="mt-1.5 font-mono text-[9px] text-zinc-400">Clinician decides</p>
            </div>
            <VArrow muted />
            <SmallNode muted className="w-full max-w-[220px]">
              Clinical decision
            </SmallNode>
          </div>
        </div>
        <DiagramFooterLine label="Audit log" />
      </div>
    </figure>
  );
}

export function HealthcareDiagramRegulatory() {
  return (
    <figure className="w-full">
      <div className={diagramFrame}>
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
          <div className="flex flex-col gap-2 sm:w-[40%]">
            {(['Trial data', 'Safety data', 'Study protocols', 'Patient records'] as const).map(
              (s) => (
                <div key={s} className="flex items-center gap-2">
                  <SmallNode muted className="min-h-0 flex-1">
                    {s}
                  </SmallNode>
                  <HArrow muted className="w-5 shrink-0" />
                </div>
              ),
            )}
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <SmallNode muted className="min-h-0 shrink-0">
                Submission Agent
              </SmallNode>
              <HArrow muted className="w-5" />
              <SmallNode className="min-h-0 shrink-0">Phrony — Validation</SmallNode>
            </div>
            <div className="flex flex-wrap items-start gap-4 sm:gap-6">
              <div className="flex items-start gap-2">
                <HArrow muted className="mt-3 w-4 shrink-0" />
                <div className="flex flex-col gap-2">
                  <SmallNode muted className="min-h-0">
                    Pharmacovigilance report
                  </SmallNode>
                  <SmallNode muted className="min-h-0">
                    Regulatory filing
                  </SmallNode>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1 border-l border-dotted border-zinc-500/45 pl-4 pt-1">
                <VArrow muted />
                <SmallNode muted className="min-h-0 max-w-[12rem] border-dotted text-[10px]">
                  Gaps flagged
                </SmallNode>
              </div>
            </div>
          </div>
        </div>
        <DiagramFooterLine label="Audit log" ticks={6} />
      </div>
    </figure>
  );
}

/** Populations → Monitoring → Cross-reference → loop; Monitoring exits to Phrony */
function ContinuousMonitoringLoop() {
  return (
    <div className="relative flex w-full max-w-[240px] shrink-0 gap-2 sm:max-w-[260px]">
      <div
        className="relative w-2 shrink-0 self-stretch pt-1 pb-1"
        aria-hidden
      >
        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 border-l border-dotted border-zinc-500/55" />
        <span className="absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 bg-zinc-950 px-0.5 font-mono text-[8px] font-medium uppercase tracking-[0.12em] text-zinc-500">
          Continuous
        </span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div>
          <SmallNode muted className="min-h-0 w-full">
            Monitoring Agent
          </SmallNode>
          <p className="mt-1 font-mono text-[8px] text-zinc-500">Anomaly detection</p>
        </div>
        <VArrow muted />
        <SmallNode muted className="min-h-0 w-full">
          Cross-reference databases
        </SmallNode>
        <VArrow muted />
        <SmallNode muted className="min-h-0 w-full">
          Patient populations
        </SmallNode>
      </div>
    </div>
  );
}

export function HealthcareDiagramAdverseEvent() {
  return (
    <figure className="w-full">
      <div className={diagramFrame}>
        <div className="flex flex-1 flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-4">
          <ContinuousMonitoringLoop />
          <div className="flex flex-1 flex-col items-center justify-center gap-3 sm:flex-row sm:items-center">
            <div className="flex flex-col items-center gap-1 sm:hidden">
              <VArrow muted />
            </div>
            <HArrow muted className="hidden w-6 sm:block" />
            <div className="w-full max-w-[200px] border border-primary/50 bg-primary/6 px-2.5 py-2 text-center">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-primary">
                Phrony
              </p>
            </div>
            <HArrow muted className="w-6" />
            <SmallNode muted className="min-h-0 w-full max-w-[200px] text-[10px] sm:text-[11px]">
              Alert — human review
            </SmallNode>
          </div>
        </div>
        <DiagramFooterLine label="Audit log" />
      </div>
    </figure>
  );
}
