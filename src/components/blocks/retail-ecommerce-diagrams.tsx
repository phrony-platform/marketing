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

/** Two-panel hero: fragmented tools vs single Phrony surface */
export function RetailHeroComparison({ className }: { className?: string }) {
  const fragmented = [
    'Support AI',
    'Personalisation AI',
    'Pricing AI',
    'Inventory AI',
  ] as const;
  const unified = ['Support', 'Personalisation', 'Pricing', 'Inventory'] as const;

  return (
    <div
      className={cn(
        '-mx-5 border-t border-border bg-zinc-950 md:-mx-8',
        'grid grid-cols-1 divide-y divide-white/10 md:grid-cols-2 md:divide-x md:divide-y-0',
        className,
      )}
      role="img"
      aria-label="Fragmented retail AI tools versus one Phrony governed platform with a single audit surface"
    >
      <div className="flex flex-col px-4 py-8 opacity-[0.72] md:px-6 md:py-10">
        <p className="mb-4 font-mono text-[9px] font-medium tracking-[0.08em] text-zinc-500">
          Different tool per use case
        </p>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {fragmented.map((label) => (
            <div key={label} className="border border-white/15 bg-white/[0.02] p-2.5">
              <SmallNode muted className="min-h-0 w-full text-[9px] sm:text-[10px]">
                {label}
              </SmallNode>
            </div>
          ))}
        </div>
        <div className={cn(diagramCaption, 'mt-5 max-w-[16rem] text-left normal-case leading-snug')}>
          No visibility. Brand risk.
        </div>
      </div>

      <div className="flex flex-col px-4 py-8 md:px-6 md:py-10">
        <p className="mb-4 font-mono text-[9px] font-medium tracking-[0.08em] text-primary">
          One platform
        </p>
        <div className="border border-primary/50 bg-primary/6 px-3 py-4 sm:px-4">
          <p className="text-center font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-primary sm:text-[10px]">
            Phrony — governed execution
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2 sm:gap-3">
            {unified.map((label) => (
              <SmallNode key={label} className="min-h-0 w-[calc(50%-0.25rem)] max-w-[7.5rem] text-[9px] sm:w-auto sm:max-w-none sm:text-[10px]">
                {label}
              </SmallNode>
            ))}
          </div>
          <div className="relative mt-5 border-t border-white/20 pt-3">
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-zinc-950 px-2 font-mono text-[8px] font-medium uppercase tracking-[0.14em] text-zinc-500">
              One audit surface
            </span>
            <div className="mt-2 flex justify-between px-1">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="h-1 w-px bg-zinc-500/60" aria-hidden />
              ))}
            </div>
          </div>
        </div>
        <div className={cn(diagramCaption, 'mt-5 text-left normal-case leading-snug text-zinc-400 opacity-100')}>
          Connected. Visible. On-brief.
        </div>
      </div>
    </div>
  );
}

export function RetailDiagramCustomerService() {
  return (
    <figure className="w-full">
      <div className={diagramFrame}>
        <div className="flex flex-1 flex-col justify-center gap-4 sm:flex-row sm:items-start sm:gap-3">
          <div className="flex items-center gap-2 sm:w-[22%] sm:flex-col sm:items-stretch">
            <SmallNode muted className="w-full min-h-0 sm:min-h-[2.25rem]">
              Customer query
            </SmallNode>
            <HArrow muted className="w-8 sm:hidden" />
          </div>
          <HArrow muted className="hidden min-h-0 w-4 shrink-0 sm:block sm:mt-6" />
          <div className="mx-auto w-full max-w-[320px] border border-primary/50 bg-primary/4 px-3 py-3 sm:mx-0 sm:flex-1">
            <p className="text-center font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-primary">
              Phrony — allowed scope
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-x-2 gap-y-1 sm:gap-x-3">
              <span className={inboundLabel}>Return policy</span>
              <span className={inboundLabel}>Order data</span>
              <span className={inboundLabel}>Product information</span>
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
        <p className="mt-3 text-center font-mono text-[9px] text-zinc-500">Same policy. Every case.</p>
      </div>
    </figure>
  );
}

export function RetailDiagramPersonalisation() {
  return (
    <figure className="w-full">
      <div className={diagramFrame}>
        <div className="flex flex-1 flex-col justify-center gap-4 sm:flex-row sm:items-center sm:gap-3">
          <div className="flex flex-col gap-2 sm:w-[30%]">
            <div className="flex items-center gap-2">
              <SmallNode muted className="min-h-0 flex-1">
                Customer behaviour
              </SmallNode>
              <HArrow muted className="hidden w-4 sm:block" />
            </div>
            <div className="flex items-center gap-2">
              <SmallNode muted className="min-h-0 flex-1">
                Purchase history
              </SmallNode>
              <HArrow muted className="hidden w-4 sm:block" />
            </div>
            <div className="flex items-center gap-2">
              <SmallNode muted className="min-h-0 flex-1">
                Product catalogue
              </SmallNode>
              <HArrow muted className="hidden w-4 sm:block" />
            </div>
          </div>
          <div className="hidden flex-col justify-between self-stretch py-1 sm:flex">
            <HArrow muted className="w-5" />
            <HArrow muted className="w-5" />
            <HArrow muted className="w-5" />
          </div>
          <div className="flex justify-center sm:hidden">
            <VArrow muted />
          </div>
          <div className="mx-auto w-full max-w-[280px] border border-primary/50 bg-primary/4 px-3 py-3 sm:mx-0 sm:w-[38%]">
            <p className="text-center font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-primary">
              Phrony — content &amp; data-use boundaries
            </p>
            <div className="mt-2 border border-white/12 bg-zinc-950/90 px-2 py-2 text-center font-mono text-[11px] font-medium text-zinc-100">
              Personalisation Agent
            </div>
          </div>
          <div className="flex items-center gap-2 sm:w-[28%]">
            <HArrow muted className="hidden w-4 sm:block" />
            <SmallNode muted className="min-h-0 flex-1 text-[10px] sm:text-[11px]">
              Personalised session
            </SmallNode>
          </div>
        </div>
        <p className="mt-3 text-center font-mono text-[9px] text-zinc-500">On-brief. Every session.</p>
      </div>
    </figure>
  );
}

function WarehouseFeed() {
  return (
    <div className="flex items-center gap-1">
      <SmallNode muted className="min-h-0 max-w-[7.5rem] px-1.5 py-1 text-[8px] sm:max-w-[8.5rem] sm:text-[9px]">
        Warehouse systems
      </SmallNode>
      <HArrow muted className="w-3 shrink-0 sm:w-4" />
    </div>
  );
}

export function RetailDiagramInventory() {
  return (
    <figure className="w-full">
      <div className={diagramFrame}>
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex w-full max-w-[380px] flex-col gap-3">
            <WarehouseFeed />
            <div className="flex gap-2">
              <div className="relative flex w-2 shrink-0 justify-center pt-1" aria-hidden>
                <div className="absolute bottom-2 top-2 w-px border-l border-dotted border-zinc-500/55" />
                <span className="relative z-[1] mt-8 bg-zinc-950 px-0.5 text-center font-mono text-[8px] font-medium uppercase tracking-[0.1em] text-zinc-500">
                  Continuous
                </span>
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <SmallNode muted className="min-h-0 w-full">
                  Stock levels
                </SmallNode>
                <VArrow muted />
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-2">
                  <SmallNode muted className="min-h-0 w-full sm:max-w-[11rem]">
                    Inventory Agent
                  </SmallNode>
                  <div className="flex items-center gap-2 sm:mt-2">
                    <HArrow muted className="w-5 shrink-0" />
                    <div className="w-full max-w-[200px] border border-primary/50 bg-primary/6 px-2.5 py-2 text-center sm:max-w-[160px]">
                      <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-primary">
                        Phrony
                      </p>
                    </div>
                    <HArrow muted className="w-4 shrink-0" />
                    <div className="flex min-w-0 flex-col gap-2">
                      <SmallNode muted className="min-h-0 text-[10px] sm:text-[11px]">
                        Stockout risk flagged
                      </SmallNode>
                      <SmallNode muted className="min-h-0 text-[10px] sm:text-[11px]">
                        Overstock risk flagged
                      </SmallNode>
                    </div>
                  </div>
                </div>
                <VArrow muted />
                <SmallNode muted className="min-h-0 w-full">
                  Demand prediction
                </SmallNode>
                <VArrow muted />
                <SmallNode muted className="min-h-0 w-full">
                  Fulfillment coordination
                </SmallNode>
              </div>
            </div>
            <div className="flex justify-end">
              <WarehouseFeed />
            </div>
          </div>
        </div>
        <p className="mt-3 text-center font-mono text-[9px] text-zinc-500">
          Anomaly detection — before it costs you
        </p>
        <DiagramFooterLine label="Audit log" />
      </div>
    </figure>
  );
}

export function RetailDiagramPricing() {
  return (
    <figure className="w-full">
      <div className={diagramFrame}>
        <div className="flex flex-1 flex-col justify-center gap-4 lg:flex-row lg:items-start lg:gap-3">
          <div className="flex flex-col gap-2 lg:w-[30%]">
            {(['Demand signals', 'Inventory levels', 'Competitive data'] as const).map((s) => (
              <div key={s} className="flex items-center gap-2">
                <SmallNode muted className="min-h-0 flex-1">
                  {s}
                </SmallNode>
                <HArrow muted className="hidden w-4 lg:block" />
              </div>
            ))}
          </div>
          <div className="hidden flex-col justify-between self-stretch py-1 lg:flex">
            <HArrow muted className="w-5" />
            <HArrow muted className="w-5" />
            <HArrow muted className="w-5" />
          </div>
          <div className="flex justify-center lg:hidden">
            <VArrow muted />
          </div>
          <div className="relative mx-auto w-full max-w-[280px] lg:mx-0 lg:w-[34%]">
            <div className="border border-primary/50 bg-primary/4 px-3 py-3">
              <p className="text-center font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-primary">
                Phrony — margin floors &amp; commercial rules
              </p>
              <div className="mt-2 border border-white/12 bg-zinc-950/90 px-2 py-2 text-center font-mono text-[11px] font-medium text-zinc-100">
                Pricing Agent
              </div>
            </div>
            <div className="relative mt-4 border-t border-white/20 pt-3">
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-zinc-950 px-2 font-mono text-[8px] font-medium uppercase tracking-[0.12em] text-zinc-500">
                Rule enforcement
              </span>
              <div className="relative mt-2 flex justify-between px-2">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span key={i} className="h-1 w-px bg-zinc-500/55" aria-hidden />
                ))}
                <div
                  className="pointer-events-none absolute bottom-full left-[42%] mb-px h-16 w-px border-l border-dashed border-zinc-500/65 sm:h-[4.5rem]"
                  aria-hidden
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 lg:mt-8 lg:w-[20%] lg:self-center">
            <HArrow muted className="hidden w-4 lg:block" />
            <SmallNode muted className="min-h-0 flex-1 text-[10px] lg:text-[11px]">
              Price update
            </SmallNode>
          </div>
        </div>
        <DiagramFooterLine label="Audit log" />
      </div>
    </figure>
  );
}
