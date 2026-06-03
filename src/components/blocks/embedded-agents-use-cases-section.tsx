import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

const body = 'text-pretty text-base leading-relaxed text-muted-foreground md:text-lg md:leading-[28px]';

function IllustrationFrame({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        'pointer-events-none z-0 select-none border-l border-b border-white/10 bg-zinc-950/95 p-1.5',
        'rounded-bl-md shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset]',
        className,
      )}
      aria-hidden
    >
      {children}
    </div>
  );
}

/** Schematic phone — line UI, one accent “live / governed” dot in the action panel. */
function MobileAppIllustration() {
  return (
    <svg
      viewBox="0 0 160 160"
      className="h-full w-full text-zinc-500"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
    >
      <rect x="34" y="10" width="92" height="140" rx="14" className="text-zinc-500" />
      <line x1="64" y1="30" x2="96" y2="30" className="text-zinc-600" />
      <line x1="40" y1="46" x2="120" y2="46" className="text-zinc-600/80" />
      <line x1="40" y1="58" x2="110" y2="58" className="text-zinc-600/60" />
      <line x1="40" y1="70" x2="116" y2="70" className="text-zinc-600/60" />
      <line x1="40" y1="82" x2="104" y2="82" className="text-zinc-600/50" />
      <rect
        x="36"
        y="102"
        width="88"
        height="40"
        rx="6"
        className="text-zinc-500/80"
        strokeWidth={1.5}
      />
      <line x1="44" y1="112" x2="108" y2="112" className="text-zinc-500/50" />
      <line x1="44" y1="124" x2="96" y2="124" className="text-zinc-500/40" />
      <g className="text-primary" stroke="none" fill="currentColor">
        <circle cx="112" cy="120" r="3.25" />
      </g>
    </svg>
  );
}

/** Desktop split — form sketch left, recommendation rows right; one row flagged. */
function UnderwritingIllustration() {
  return (
    <svg
      viewBox="0 0 160 160"
      className="h-full w-full text-zinc-500"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
    >
      <rect x="10" y="22" width="50" height="116" rx="3" className="text-zinc-500/80" />
      <line x1="18" y1="36" x2="52" y2="36" className="text-zinc-600/60" />
      <line x1="18" y1="48" x2="48" y2="48" className="text-zinc-600/50" />
      <line x1="18" y1="60" x2="52" y2="60" className="text-zinc-600/45" />
      <line x1="18" y1="76" x2="44" y2="76" className="text-zinc-600/40" />
      <rect x="70" y="22" width="80" height="116" rx="3" className="text-zinc-500/80" />
      <g strokeWidth={1.5}>
        <circle cx="80" cy="40" r="2.5" className="text-zinc-500" fill="currentColor" stroke="none" />
        <line x1="90" y1="40" x2="142" y2="40" className="text-zinc-600/55" />
        <circle cx="80" cy="58" r="2.5" className="text-zinc-500" fill="currentColor" stroke="none" />
        <line x1="90" y1="58" x2="140" y2="58" className="text-zinc-600/50" />
        <g className="text-primary" fill="currentColor" stroke="none">
          <circle cx="80" cy="78" r="2.5" />
        </g>
        <line x1="90" y1="78" x2="138" y2="78" className="text-zinc-500/50" />
        <circle cx="80" cy="98" r="2.5" className="text-zinc-500" fill="currentColor" stroke="none" />
        <line x1="90" y1="98" x2="136" y2="98" className="text-zinc-600/45" />
        <line x1="90" y1="118" x2="132" y2="118" className="text-zinc-600/40" />
      </g>
    </svg>
  );
}

/** Stacked case rows with mono-style left rail; top row: accent = surfaced complex case. */
function ClinicalQueueIllustration() {
  return (
    <svg
      viewBox="0 0 160 160"
      className="h-full w-full text-zinc-500"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
    >
      <g className="text-zinc-500/50" strokeWidth={1.2}>
        <line x1="4" y1="24" x2="14" y2="24" />
        <line x1="4" y1="30" x2="12" y2="30" />
        <line x1="4" y1="36" x2="14" y2="36" />
        <line x1="4" y1="50" x2="11" y2="50" />
        <line x1="4" y1="56" x2="13" y2="56" />
        <line x1="4" y1="90" x2="10" y2="90" />
        <line x1="4" y1="96" x2="10" y2="96" />
      </g>
      <g className="text-zinc-500/40">
        <line x1="32" y1="46" x2="150" y2="46" />
        <line x1="32" y1="66" x2="150" y2="66" />
        <line x1="32" y1="86" x2="150" y2="86" />
        <line x1="32" y1="106" x2="150" y2="106" />
        <line x1="32" y1="126" x2="150" y2="126" />
        <line x1="32" y1="138" x2="150" y2="138" />
      </g>
      <g className="text-zinc-500/25" strokeWidth={1.2}>
        <line x1="40" y1="44" x2="72" y2="44" />
        <line x1="40" y1="64" x2="90" y2="64" />
        <line x1="40" y1="84" x2="80" y2="84" />
        <line x1="40" y1="104" x2="68" y2="104" />
        <line x1="40" y1="124" x2="86" y2="124" />
        <line x1="40" y1="136" x2="76" y2="136" />
      </g>
      <g className="text-primary" stroke="currentColor" strokeWidth={1.5}>
        <line x1="20" y1="24" x2="150" y2="24" />
        <line x1="20" y1="18" x2="20" y2="30" />
      </g>
      <g className="text-primary" fill="currentColor" stroke="none">
        <circle cx="20" cy="24" r="2" />
      </g>
    </svg>
  );
}

const caseStudies = [
  {
    id: 'fs',
    sector: 'Financial services',
    title: 'Invoked from your mobile app',
    role: 'A deployed agent your product calls — not code inside it.',
    body: 'Your app calls agent.run() when a user needs a decision. The runtime executes the deployed manifest, dispatches tools through your SDK handlers, and returns a result with a full trace. Governance applies on every call.',
    example:
      'A customer opens the app, taps "review my spending," and asks whether they can afford an upcoming bill. The agent reads their transactions, projects the month\'s outflows, confirms coverage, and offers to move money if needed — inside the app, in one interaction.',
    Illustration: MobileAppIllustration,
  },
  {
    id: 'ins',
    sector: 'Insurance',
    title: 'Invoked from your underwriting platform',
    role: 'A deployed specialist your underwriters trigger.',
    body: 'When a submission arrives, your platform calls the deployed underwriting agent. It runs under its own manifest — tools, policies, and limits declared upfront — and returns a structured recommendation with every factor logged in the evidence trail.',
    example:
      'A mid-market property submission lands in the queue. The agent checks occupancy, loss history, and geography against your guidelines, flags two concerns, and proposes terms. The underwriter tightens a deductible and binds.',
    Illustration: UnderwritingIllustration,
  },
  {
    id: 'hc',
    sector: 'Healthcare',
    title: 'Invoked from your clinical operations tool',
    role: 'A deployed agent alongside your review team.',
    body: 'Your operations tool calls a deployed prior-authorization agent. It runs in the runtime with its own manifest, pre-approves straightforward cases, and surfaces complex ones to your team with reasoning attached — every session recorded in the decision log.',
    example:
      "A prior-authorization team receives fifty requests a day. The agent reviews each one against payer policy and patient history, approves the clear cases, and surfaces three that need clinical judgment — with every factor visible.",
    Illustration: ClinicalQueueIllustration,
  },
] as const;

export function EmbeddedAgentsUseCasesSection() {
  return (
    <div className="w-full border-t border-border">
      <div className={`${'px-5 py-12 md:px-8 md:py-16'}`}>
        <h2 className="text-balance font-sans text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-[2rem] md:leading-[1.2]">
          Call deployed agents from where the decision gets made.
        </h2>
        <p className={`mt-5 max-w-3xl ${body}`}>
          Applications across mobile, underwriting, and operations call the same deployed agents through the SDK.
          The agent lives in the runtime — your systems reference it, with the same guardrails on every invocation.
        </p>
      </div>

      <div className="space-y-0 border-t border-border">
        {caseStudies.map((c, i) => {
          const I = c.Illustration;
          return (
            <article
              key={c.id}
              className={cn(
                'relative border-b border-border',
                'bg-background',
                i % 2 === 1 && 'bg-muted/15',
              )}
            >
              <div className="relative overflow-visible px-5 py-8 md:px-8 md:py-10">
                <div
                  className={cn(
                    'mb-5 h-36 w-36 shrink-0 md:absolute md:mb-0 md:-top-2 md:right-5 md:h-40 md:w-40',
                    'mx-auto md:mx-0',
                  )}
                >
                  <IllustrationFrame className="h-full w-full">
                    <I />
                  </IllustrationFrame>
                </div>
                <div
                  className={cn('relative z-10 max-w-3xl md:pr-[min(13rem,38%)]')}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {c.sector}
                  </p>
                  <h3 className="mt-2 font-sans text-lg font-semibold tracking-tight text-foreground md:text-xl">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-foreground/90 md:text-base">{c.role}</p>
                  <p className={`mt-4 ${body}`}>{c.body}</p>
                  <p className={`mt-4 ${body}`}>
                    <span className="font-medium text-foreground">Example: </span>
                    {c.example}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <p
        className="border-t border-border bg-muted/10 px-5 py-8 text-center font-sans text-sm font-medium leading-relaxed text-foreground/90 md:px-8 md:py-10 md:text-base"
      >
        Same agent, same runtime, same rules — wherever it runs.
      </p>
    </div>
  );
}
