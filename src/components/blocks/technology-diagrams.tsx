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

/** Sales-cycle hero: product → Phrony → customer; return Signed toward product */
export function TechnologyHeroSalesCycle({ className }: { className?: string }) {
  return (
    <div
      className={cn('-mx-5 border-t border-border bg-zinc-950 md:-mx-8', className)}
      role="img"
      aria-label="Product ships with Phrony governed runtime through enterprise security review; Signed closes the round trip back to product"
    >
      <div className="flex flex-col gap-8 px-4 py-8 lg:hidden">
        <div className="flex flex-col opacity-[0.82]">
          <p className="mb-2 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
            Your product
          </p>
          <div className="border border-white/15 bg-white/[0.02] p-3">
            <p className="text-center font-mono text-[10px] font-medium text-zinc-400">
              Your product
            </p>
            <div className="mt-2 border border-white/10 bg-zinc-950/80 px-2 py-1.5 text-center font-mono text-[9px] text-zinc-500">
              AI feature
            </div>
          </div>
          <div className="mt-2 flex justify-center">
            <VArrow muted />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <p className="mb-2 font-mono text-[9px] font-medium tracking-[0.08em] text-zinc-400">
            Declared. Deployed. Run.
          </p>
          <div className="w-full max-w-md border border-primary/50 bg-primary/6 px-4 py-4">
            <p className="text-center font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-primary">
              Phrony — governed runtime
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <ControlPill>Audit trails</ControlPill>
              <ControlPill>Anomaly detection</ControlPill>
              <ControlPill>Guardrails</ControlPill>
              <ControlPill>RBAC</ControlPill>
            </div>
          </div>
          <div className="mt-2 flex justify-center">
            <VArrow muted />
          </div>
        </div>
        <div className="flex flex-col opacity-[0.82]">
          <p className="mb-2 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
            Enterprise customer
          </p>
          <div className="border border-white/15 bg-white/[0.02] p-3">
            <p className="text-center font-mono text-[10px] font-medium text-zinc-400">
              Enterprise customer
            </p>
            <div className="mt-2 space-y-1.5 border-t border-white/10 pt-2 text-center font-mono text-[9px] text-zinc-500">
              <p>Procurement</p>
              <p>Security review</p>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden gap-8 px-4 py-8 lg:flex lg:flex-row lg:items-end lg:justify-between lg:gap-6 lg:px-6 lg:py-10">
        <div className="flex flex-col opacity-[0.82] lg:w-[24%] lg:max-w-[220px]">
          <p className="mb-2 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
            Your product
          </p>
          <div className="border border-white/15 bg-white/[0.02] p-3">
            <p className="text-center font-mono text-[10px] font-medium text-zinc-400">
              Your product
            </p>
            <div className="mt-2 border border-white/10 bg-zinc-950/80 px-2 py-1.5 text-center font-mono text-[9px] text-zinc-500">
              AI feature
            </div>
          </div>
          <div className="mt-3 flex justify-end">
            <HArrow muted className="w-8 lg:w-10" />
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col items-center lg:max-w-[min(100%,26rem)] lg:self-start">
          <p className="mb-2 font-mono text-[9px] font-medium tracking-[0.08em] text-zinc-400">
            Declared. Deployed. Run.
          </p>
          <div className="w-full border border-primary/50 bg-primary/6 px-4 py-4">
            <p className="text-center font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-primary sm:text-[10px]">
              Phrony — governed runtime
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <ControlPill>Audit trails</ControlPill>
              <ControlPill>Anomaly detection</ControlPill>
              <ControlPill>Guardrails</ControlPill>
              <ControlPill>RBAC</ControlPill>
            </div>
          </div>
          <div className="mt-3 flex w-full justify-center lg:justify-end">
            <HArrow muted className="w-8 lg:w-12" />
          </div>
        </div>

        <div className="flex flex-col opacity-[0.82] lg:w-[26%] lg:max-w-[240px]">
          <p className="mb-2 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
            Enterprise customer
          </p>
          <div className="flex items-start gap-2">
            <HArrow muted className="mt-8 w-5 shrink-0" />
            <div className="min-w-0 flex-1 border border-white/15 bg-white/[0.02] p-3">
              <p className="text-center font-mono text-[10px] font-medium text-zinc-400">
                Enterprise customer
              </p>
              <div className="mt-2 space-y-1.5 border-t border-white/10 pt-2 text-center font-mono text-[9px] text-zinc-500">
                <p>Procurement</p>
                <p>Security review</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 pb-8 pt-4 lg:px-8">
        <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-center gap-2 sm:flex-nowrap">
          <span className="font-mono text-[9px] text-zinc-500">Enterprise customer</span>
          <HArrow muted className="w-6 sm:flex-1 sm:max-w-[6rem]" />
          <span className="font-mono text-[9px] font-medium text-primary">Signed</span>
          <HArrow muted className="w-6 sm:flex-1 sm:max-w-[6rem]" />
          <span className="font-mono text-[9px] text-zinc-500">Your product</span>
        </div>
      </div>
    </div>
  );
}

const featuresSdk = ['AI feature 1', 'AI feature 2', 'AI feature 3'] as const;
const outputsSdk = ['Audit trail', 'Anomaly detection', 'Guardrails applied'] as const;

export function TechnologyDiagramProductFeatures() {
  return (
    <figure className="w-full">
      <div className={diagramFrame}>
        <div className="flex flex-1 flex-col gap-4 lg:hidden">
          <div className="flex flex-col border border-white/12 bg-white/[0.02] p-3">
            <p className="mb-2 text-center font-mono text-[10px] font-medium text-zinc-400">
              Your product
            </p>
            <div className="flex flex-col gap-2">
              {featuresSdk.map((f) => (
                <SmallNode muted key={f} className="min-h-0 w-full text-[10px]">
                  {f}
                </SmallNode>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <VArrow muted />
          </div>
          <div className="border border-primary/50 bg-primary/4 px-3 py-4">
            <p className="text-center font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-primary">
              Phrony — governed runtime
            </p>
          </div>
          <div className="flex justify-center">
            <VArrow muted />
          </div>
          <div className="flex flex-col gap-2">
            {outputsSdk.map((o) => (
              <SmallNode muted key={o} className="min-h-0 w-full text-[10px]">
                {o}
              </SmallNode>
            ))}
          </div>
        </div>

        <div className="hidden min-h-0 flex-1 flex-row items-stretch gap-2 lg:flex">
          <div className="flex flex-col border border-white/12 bg-white/[0.02] p-3 lg:w-[30%]">
            <p className="mb-2 text-center font-mono text-[10px] font-medium text-zinc-400">
              Your product
            </p>
            <div className="flex flex-col gap-2">
              {featuresSdk.map((f) => (
                <SmallNode muted key={f} className="min-h-0 w-full text-[10px]">
                  {f}
                </SmallNode>
              ))}
            </div>
          </div>
          <div className="flex flex-row gap-2 lg:w-[8%] lg:flex-col lg:justify-between lg:py-1">
            {featuresSdk.map((f) => (
              <div
                key={f}
                className="flex flex-1 items-center justify-center lg:flex-none lg:min-h-0"
              >
                <HArrow muted className="w-5 lg:w-6" />
              </div>
            ))}
          </div>
          <div className="flex flex-1 items-stretch justify-center lg:max-w-[13rem] lg:justify-center">
            <div className="flex w-full flex-col justify-center border border-primary/50 bg-primary/4 px-3 py-4">
              <p className="text-center font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-primary">
                Phrony — governed runtime
              </p>
            </div>
          </div>
          <div className="flex flex-row gap-2 lg:w-[8%] lg:flex-col lg:justify-between lg:py-1">
            {outputsSdk.map((o) => (
              <div
                key={o}
                className="flex flex-1 items-center justify-center lg:flex-none lg:min-h-0"
              >
                <HArrow muted className="w-5 lg:w-6" />
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-between gap-2 lg:w-[28%] lg:py-0.5">
            {outputsSdk.map((o) => (
              <SmallNode muted key={o} className="min-h-0 w-full text-[10px] sm:text-[11px]">
                {o}
              </SmallNode>
            ))}
          </div>
        </div>
        <p className="mt-3 text-center font-mono text-[9px] leading-snug text-zinc-500">
          You define what the agent can do. Phrony enforces it.
        </p>
      </div>
    </figure>
  );
}

export function TechnologyDiagramDevOpsAgents() {
  const stages = ['Code review', 'Incident triage', 'Deployment'] as const;
  const agents = ['Agent A', 'Agent B', 'Agent C'] as const;

  return (
    <figure className="w-full">
      <div className={diagramFrame}>
        <div className="flex flex-1 flex-col gap-3">
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {agents.map((a) => (
              <div key={a} className="flex flex-col items-center gap-1">
                <SmallNode muted className="min-h-0 w-full max-w-[7.5rem] text-[10px]">
                  {a}
                </SmallNode>
                <VArrow muted />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2 border border-white/10 bg-white/[0.02] px-2 py-2 sm:gap-3 sm:px-3">
            {stages.map((s) => (
              <SmallNode muted key={s} className="min-h-0 text-center text-[9px] sm:text-[10px]">
                {s}
              </SmallNode>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2 px-1 sm:px-2">
            {agents.map((_, i) => (
              <div key={i} className="flex justify-center">
                <div
                  className="h-4 w-px border-l border-dotted border-zinc-500/65 sm:h-5"
                  aria-hidden
                />
              </div>
            ))}
          </div>
          <div className="border-t-2 border-primary/45 px-2 py-1.5 text-center font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-primary">
            Phrony — RBAC boundary
          </div>
        </div>
        <DiagramFooterLine label="Action log — engineering org" />
      </div>
    </figure>
  );
}

const tenants = [
  { label: 'Customer A', env: 'Agent env A', log: 'Audit log A' },
  { label: 'Customer B', env: 'Agent env B', log: 'Audit log B' },
  { label: 'Customer C', env: 'Agent env C', log: 'Audit log C' },
] as const;

export function TechnologyDiagramMultiTenant() {
  return (
    <figure className="w-full">
      <div className={diagramFrame}>
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-3">
          <div className="flex w-full flex-col justify-center border border-primary/50 bg-primary/4 px-2.5 py-3 sm:w-[8.25rem] sm:shrink-0 sm:self-stretch">
            <p className="text-center font-mono text-[8px] font-semibold uppercase leading-snug tracking-[0.1em] text-primary sm:text-[9px]">
              Phrony — multi-tenancy model
            </p>
          </div>
          <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 sm:gap-2.5">
            {tenants.map((t) => (
              <div key={t.label} className="flex items-center gap-2">
                <HArrow muted className="w-4 shrink-0 sm:w-5" />
                <div className="flex min-w-0 flex-1 flex-col gap-2 border border-white/12 bg-white/[0.02] p-2 sm:flex-row sm:items-center sm:gap-2 sm:p-2.5">
                  <SmallNode muted className="min-h-0 flex-1 text-[10px]">
                    {t.label}
                  </SmallNode>
                  <HArrow muted className="hidden w-3 sm:block" />
                  <SmallNode muted className="min-h-0 flex-1 text-[10px]">
                    {t.env}
                  </SmallNode>
                  <HArrow muted className="w-3 shrink-0" />
                  <SmallNode muted className="min-h-0 flex-1 text-[10px]">
                    {t.log}
                  </SmallNode>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-3 text-center font-mono text-[9px] text-zinc-500">
          Build governance once. Deploy per tenant.
        </p>
      </div>
    </figure>
  );
}

export function TechnologyDiagramSalesEnablement() {
  return (
    <figure className="w-full">
      <div className={diagramFrame}>
        <div className="flex flex-1 flex-col gap-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-4">
            <SmallNode muted className="min-h-0 w-full shrink-0 text-center lg:w-[20%] lg:text-left">
              Your sales team
            </SmallNode>

            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="flex w-full items-center gap-2">
                <HArrow muted className="hidden w-4 shrink-0 sm:block" />
                <HArrow muted flex className="min-w-[1.5rem]" />
                <div className="shrink-0 border border-primary/50 bg-primary/8 px-2 py-1.5 text-center font-mono text-[8px] font-semibold uppercase leading-tight tracking-[0.06em] text-primary sm:text-[9px]">
                  Phrony — documented architecture
                </div>
                <HArrow muted flex className="min-w-[1.5rem]" />
                <HArrow muted className="hidden w-4 shrink-0 sm:block" />
              </div>
              <p className="text-center font-mono text-[9px] uppercase tracking-[0.14em] text-zinc-500">
                Hand over
              </p>
            </div>

            <div className="flex w-full shrink-0 flex-col gap-3 lg:w-[34%]">
              <div className="border border-white/12 bg-white/[0.02] p-3">
                <p className="text-center font-mono text-[10px] font-medium text-zinc-300">
                  Security team — buyer side
                </p>
                <div className="mt-2 space-y-1 text-center font-mono text-[9px] text-zinc-500">
                  <p>Compliance</p>
                  <p>Architecture review</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <HArrow muted className="w-8" />
                <SmallNode muted className="min-h-0 text-[10px] sm:text-[11px]">
                  Deal closed
                </SmallNode>
              </div>
            </div>
          </div>

          <div className="relative mt-1 border-t border-dashed border-zinc-600/40 pt-5">
            <span className="absolute -top-2 left-1/2 max-w-[90%] -translate-x-1/2 bg-zinc-950 px-2 text-center font-mono text-[8px] font-medium uppercase leading-snug tracking-[0.1em] text-zinc-600">
              Without Phrony — promise, not proof
            </span>
          </div>
        </div>
      </div>
    </figure>
  );
}
