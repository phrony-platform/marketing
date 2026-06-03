import { cn } from '@/lib/utils';

import {
  DiagramFooterLine,
  HArrow,
  SmallNode,
  VArrow,
  diagramFrame,
  inboundLabel,
} from '@/components/blocks/sector-diagram-primitives';

function ControlPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="block rounded-full border border-primary/35 bg-primary/6 px-2.5 py-1 text-center font-mono text-[8px] font-medium leading-snug text-zinc-300 sm:text-[9px]">
      {children}
    </span>
  );
}

/** Full-width hero: inputs → Phrony → outputs; continuous public audit trail below */
export function PublicSectorHeroFlow({ className }: { className?: string }) {
  const inputs = ['Applications', 'Submissions', 'Claims', 'Processes'] as const;
  const outputs = [
    'Eligibility decision',
    'Evaluation record',
    'Fraud flag',
    'Compliance report',
  ] as const;

  return (
    <div
      className={cn(
        '-mx-5 border-t border-border bg-zinc-950 md:-mx-8',
        className,
      )}
      role="img"
      aria-label="Public sector inputs flow through Phrony governed execution to outputs, with a continuous public audit trail"
    >
      <div className="flex flex-col gap-10 px-4 py-8 lg:flex-row lg:items-start lg:justify-between lg:gap-8 lg:px-6 lg:py-10">
        <div className="flex flex-col gap-2 opacity-[0.82] lg:w-[24%] lg:max-w-[220px]">
          <p className="mb-1 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
            Inputs
          </p>
          {inputs.map((label) => (
            <div key={label} className="flex items-center gap-2">
              <SmallNode muted className="min-h-0 flex-1">
                {label}
              </SmallNode>
              <HArrow muted className="w-5 shrink-0" />
            </div>
          ))}
        </div>

        <div className="flex min-w-0 flex-1 flex-col items-stretch lg:max-w-[min(100%,28rem)] lg:px-2">
          <div className="w-full border border-primary/50 bg-primary/6 px-4 py-4">
            <p className="text-center font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-primary sm:text-[10px]">
              Phrony — governed execution
            </p>
            <div className="mt-3 border border-white/15 bg-zinc-950/85 px-2 py-2 text-center font-mono text-[11px] font-medium text-zinc-100">
              Agent
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <ControlPill>Decision explainable</ControlPill>
              <ControlPill>Action logged</ControlPill>
              <ControlPill>Escalation defined</ControlPill>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 opacity-[0.82] lg:w-[24%] lg:max-w-[240px]">
          <p className="mb-1 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
            Outputs
          </p>
          {outputs.map((label) => (
            <div key={label} className="flex items-center gap-2">
              <HArrow muted className="w-5 shrink-0" />
              <SmallNode muted className="min-h-0 flex-1 text-[10px] sm:text-[11px]">
                {label}
              </SmallNode>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 px-4 pb-8 pt-2 lg:px-6">
        <div className="relative w-full border-t border-white/20">
          <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-zinc-950 px-2 font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-zinc-500">
            Public audit trail
          </span>
          <div className="mt-3 grid w-full grid-cols-3 gap-2 px-1 sm:px-4">
            <div className="flex justify-between gap-0.5">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="h-1 w-px bg-zinc-500/65" aria-hidden />
              ))}
            </div>
            <div className="flex justify-center gap-3">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-1 w-px bg-zinc-500/65" aria-hidden />
              ))}
            </div>
            <div className="flex justify-between gap-0.5">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="h-1 w-px bg-zinc-500/65" aria-hidden />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FaintCaseChip() {
  return (
    <div className="min-w-0 flex-1 border border-white/[0.08] bg-white/[0.02] px-1 py-1 text-center font-mono text-[8px] font-medium text-zinc-500 opacity-70 sm:text-[9px]">
      Case
    </div>
  );
}

export function PublicSectorDiagramBenefits() {
  return (
    <figure className="w-full">
      <div className={diagramFrame}>
        <div className="flex flex-1 flex-col justify-center gap-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-2">
            <div className="flex items-center gap-2 md:w-[18%] md:flex-col md:items-stretch">
              <SmallNode muted className="w-full min-h-0 md:min-h-[2.25rem]">
                Application
              </SmallNode>
              <HArrow muted className="w-8 md:hidden" />
            </div>
            <HArrow muted className="hidden min-h-0 w-3 shrink-0 md:block md:mt-3" />
            <div className="flex flex-1 flex-col gap-2 md:max-w-[42%]">
              <div className="flex w-full flex-wrap justify-center gap-x-3 gap-y-1">
                <span className={inboundLabel}>Eligibility criteria</span>
                <span className={inboundLabel}>Supporting data</span>
              </div>
              <div className="flex flex-col items-stretch gap-2 md:flex-row md:items-end">
                <SmallNode className="w-full md:min-w-0 md:flex-1">Eligibility Agent</SmallNode>
                <div className="flex w-full gap-1 md:max-w-[9.5rem] md:shrink-0">
                  {[0, 1, 2].map((i) => (
                    <FaintCaseChip key={i} />
                  ))}
                </div>
              </div>
            </div>
            <HArrow muted className="hidden min-h-0 w-3 shrink-0 md:block md:mt-3" />
            <div className="flex flex-col items-center gap-1 md:w-[24%]">
              <SmallNode className="w-full">Phrony gate</SmallNode>
              <div className="flex w-full flex-col items-center">
                <VArrow muted />
                <div className="w-full border border-dotted border-zinc-500/60 px-2 py-1.5 text-center font-mono text-[10px] font-medium text-zinc-500">
                  Human review — edge cases
                </div>
              </div>
            </div>
            <HArrow muted className="hidden min-h-0 w-3 shrink-0 md:block md:mt-3" />
            <div className="flex items-center gap-2 md:w-[14%] md:flex-col md:items-stretch">
              <HArrow muted className="w-8 md:hidden" />
              <SmallNode muted className="w-full min-h-0 md:min-h-[2.25rem]">
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

export function PublicSectorDiagramProcurement() {
  return (
    <figure className="w-full">
      <div className={diagramFrame}>
        <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-stretch sm:gap-3">
          <div className="flex flex-col gap-2 sm:w-[40%]">
            {(['Submission 1', 'Submission 2', 'Submission 3', 'Submission 4'] as const).map(
              (s) => (
                <div key={s} className="flex items-center gap-2">
                  <SmallNode muted className="min-h-0 flex-1">
                    {s}
                  </SmallNode>
                  <HArrow muted className="w-4 shrink-0" />
                </div>
              ),
            )}
          </div>
          <div className="hidden flex-col justify-between self-stretch py-1 sm:flex">
            <HArrow muted className="w-5" />
            <HArrow muted className="w-5" />
            <HArrow muted className="w-5" />
            <HArrow muted className="w-5" />
          </div>
          <div className="flex justify-center sm:hidden">
            <VArrow muted />
          </div>
          <div className="flex flex-1 flex-col items-center gap-3 sm:w-[36%] sm:self-center">
            <div className="w-full max-w-[260px] border border-primary/50 bg-primary/4 px-3 py-3">
              <p className="text-center font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-primary">
                Phrony — scoring criteria
              </p>
              <div className="mt-2 border border-white/12 bg-zinc-950/90 px-2 py-2 text-center font-mono text-[11px] font-medium text-zinc-100">
                Screening Agent
              </div>
            </div>
            <div className="flex w-full max-w-[260px] flex-col gap-2">
              <div className="flex items-center gap-2">
                <HArrow muted flex />
                <SmallNode muted className="min-h-0 flex-1 text-[10px] sm:text-[11px]">
                  Qualified vendors
                </SmallNode>
              </div>
              <div className="flex items-center gap-2">
                <HArrow muted flex />
                <SmallNode muted className="min-h-0 flex-1 text-[10px] sm:text-[11px]">
                  Anomalies flagged
                </SmallNode>
              </div>
              <div className="flex items-center gap-2">
                <HArrow muted flex />
                <SmallNode muted className="min-h-0 flex-1 text-[10px] sm:text-[11px]">
                  Evaluation record
                </SmallNode>
              </div>
            </div>
          </div>
        </div>
        <DiagramFooterLine label="Audit trail" />
      </div>
    </figure>
  );
}

function ReasoningTrailBlock() {
  return (
    <div className="w-full max-w-[180px] border border-white/12 bg-white/[0.02] px-2 py-2">
      <p className="text-center font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-zinc-500">
        Reasoning trail
      </p>
      <div className="mt-2 flex flex-col gap-1.5">
        <div className="h-px w-full bg-zinc-600/55" aria-hidden />
        <div className="h-px w-full bg-zinc-600/55" aria-hidden />
        <div className="h-px w-full bg-zinc-600/55" aria-hidden />
      </div>
    </div>
  );
}

export function PublicSectorDiagramFraud() {
  return (
    <figure className="w-full">
      <div className={diagramFrame}>
        <div className="flex flex-1 flex-col justify-center gap-4 sm:flex-row sm:items-center sm:gap-3">
          <div className="flex flex-col gap-2 sm:w-[32%]">
            {(['Claim data', 'Behavioral patterns', 'Historical records'] as const).map((s) => (
              <div key={s} className="flex items-center gap-2">
                <SmallNode muted className="min-h-0 flex-1">
                  {s}
                </SmallNode>
                <HArrow muted className="hidden w-4 sm:block" />
              </div>
            ))}
          </div>
          <div className="hidden flex-col justify-between self-stretch py-1 sm:flex">
            <HArrow muted className="w-5" />
            <HArrow muted className="w-5" />
            <HArrow muted className="w-5" />
          </div>
          <div className="flex justify-center sm:hidden">
            <VArrow muted />
          </div>
          <div className="mx-auto flex w-full max-w-[240px] flex-col items-center gap-3 sm:mx-0 sm:w-[34%]">
            <div className="w-full border border-primary/50 bg-primary/4 px-3 py-3">
              <p className="text-center font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-primary">
                Phrony
              </p>
              <div className="mt-2 border border-white/12 bg-zinc-950/90 px-2 py-2 text-center font-mono text-[11px] font-medium text-zinc-100">
                Fraud Detection Agent
              </div>
            </div>
            <div className="flex w-full flex-col items-center gap-2">
              <HArrow muted className="w-8" />
              <SmallNode muted className="min-h-0 w-full text-[10px] sm:text-[11px]">
                Flag for investigation
              </SmallNode>
              <div className="h-3 w-px bg-zinc-500/50" aria-hidden />
              <ReasoningTrailBlock />
            </div>
          </div>
        </div>
        <DiagramFooterLine label="Audit trail" />
      </div>
    </figure>
  );
}

export function PublicSectorDiagramCompliance() {
  return (
    <figure className="w-full">
      <div className={diagramFrame}>
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex gap-3">
            <div className="relative w-2 shrink-0 self-stretch pt-1 pb-1" aria-hidden>
              <div className="absolute inset-y-2 left-1/2 w-px -translate-x-1/2 border-l border-dotted border-zinc-500/55" />
              <span className="absolute left-1/2 top-[46%] z-[1] -translate-x-1/2 -translate-y-1/2 bg-zinc-950 px-0.5 text-center font-mono text-[8px] font-medium uppercase tracking-[0.1em] text-zinc-500">
                Continuous
              </span>
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <SmallNode muted className="min-h-0 w-full max-w-[16rem]">
                Internal processes
              </SmallNode>
              <VArrow muted />
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-3">
                <SmallNode muted className="min-h-0 w-full sm:max-w-[12rem]">
                  Monitoring Agent
                </SmallNode>
                <div className="flex items-center gap-2 sm:mt-2">
                  <HArrow muted className="w-5 shrink-0" />
                  <div className="flex min-w-0 flex-col gap-2">
                    <div className="border border-primary/50 bg-primary/6 px-2 py-2 text-center">
                      <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-primary">
                        Phrony
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <HArrow muted className="w-3 shrink-0" />
                        <SmallNode muted className="min-h-0 flex-1 text-[10px] sm:text-[11px]">
                          Gaps surfaced
                        </SmallNode>
                      </div>
                      <div className="flex items-center gap-2">
                        <HArrow muted className="w-3 shrink-0" />
                        <SmallNode muted className="min-h-0 flex-1 text-[10px] sm:text-[11px]">
                          Deviations flagged
                        </SmallNode>
                      </div>
                      <VArrow muted />
                      <SmallNode muted className="min-h-0 text-[10px] leading-snug sm:text-[11px]">
                        Structured report — oversight bodies
                      </SmallNode>
                    </div>
                  </div>
                </div>
              </div>
              <VArrow muted />
              <div className="flex flex-wrap items-center gap-2">
                <SmallNode muted className="min-h-0 w-full max-w-[9.5rem] text-[10px] sm:text-[11px]">
                  Evolving legislation
                </SmallNode>
                <HArrow muted className="w-6 shrink-0" />
                <SmallNode muted className="min-h-0 flex-1">
                  Policy check
                </SmallNode>
              </div>
            </div>
          </div>
        </div>
        <DiagramFooterLine label="Audit trail" />
      </div>
    </figure>
  );
}
