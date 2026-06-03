'use client';

import type { LucideIcon } from 'lucide-react';
import {
  Activity,
  Brain,
  Braces,
  ChevronRight,
  ClipboardList,
  Clock,
  Coins,
  ListOrdered,
  Package,
  RefreshCw,
  Repeat,
  Shield,
  Wrench,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type StepAccentKey = 'perceive' | 'reason' | 'tool' | 'policy' | 'review';

type StepAccent = {
  chip: string;
  chipIcon: string;
  payloadIcon: string;
  payloadLabel: string;
};

const STEP_ACCENTS: Record<StepAccentKey, StepAccent> = {
  perceive: {
    chip: 'border-sky-500/25 bg-sky-500/10 text-sky-200',
    chipIcon: 'text-sky-300',
    payloadIcon: 'text-sky-300/90',
    payloadLabel: 'text-sky-200/85',
  },
  reason: {
    chip: 'border-violet-500/25 bg-violet-500/10 text-violet-200',
    chipIcon: 'text-violet-300',
    payloadIcon: 'text-violet-300/90',
    payloadLabel: 'text-violet-200/85',
  },
  tool: {
    chip: 'border-amber-500/25 bg-amber-500/10 text-amber-200',
    chipIcon: 'text-amber-300',
    payloadIcon: 'text-amber-300/90',
    payloadLabel: 'text-amber-200/85',
  },
  policy: {
    chip: 'border-emerald-500/25 bg-emerald-500/10 text-emerald-200',
    chipIcon: 'text-emerald-300',
    payloadIcon: 'text-emerald-300/90',
    payloadLabel: 'text-emerald-200/85',
  },
  review: {
    chip: 'border-rose-500/25 bg-rose-500/10 text-rose-200',
    chipIcon: 'text-rose-300',
    payloadIcon: 'text-rose-300/90',
    payloadLabel: 'text-rose-200/85',
  },
};

type MockStep = {
  ordinal: number;
  orderLabel: string;
  typeLabel: string;
  TypeIcon: LucideIcon;
  accent: StepAccentKey;
  iterRound?: number;
  tokens?: number;
  started: string;
  finished?: string;
  showApproved?: boolean;
  showRejected?: boolean;
  showEscalationRule?: boolean;
  payloads?: { label: string; icon: LucideIcon; json: unknown }[];
  toolResultRaw?: string;
  extraRow?: ReactNode;
};

const MOCK_STEPS: MockStep[] = [
  {
    ordinal: 1,
    orderLabel: 'Step 1',
    typeLabel: 'Perceive context',
    TypeIcon: Activity,
    accent: 'perceive',
    tokens: 1240,
    started: '14:02:01.042',
    finished: '14:02:01.318',
    payloads: [
      {
        label: 'Context bundle',
        icon: Braces,
        json: {
          policy_refs: ['POL-48219'],
          claim_history: { claimant_id: 'clm_9a2', rows: 12 },
        },
      },
    ],
  },
  {
    ordinal: 2,
    orderLabel: 'Step 2',
    typeLabel: 'Model reasoning',
    TypeIcon: Brain,
    accent: 'reason',
    iterRound: 2,
    tokens: 8420,
    started: '14:02:01.320',
    finished: '14:02:03.910',
    payloads: [
      {
        label: 'Reasoning',
        icon: Braces,
        json: {
          plan: ['verify coverage', 'check fraud signals', 'route if ambiguous'],
          policy_gate: 'passed',
        },
      },
    ],
  },
  {
    ordinal: 3,
    orderLabel: 'Step 3',
    typeLabel: 'Tool call',
    TypeIcon: Wrench,
    accent: 'tool',
    started: '14:02:03.912',
    finished: '14:02:04.512',
    payloads: [
      {
        label: 'Arguments',
        icon: Wrench,
        json: { tool: 'fraud_signals.check', claim_id: 'CLM-48219', window_days: 90 },
      },
    ],
    toolResultRaw: JSON.stringify(
      { score: 0.72, threshold: 0.7, factors: ['velocity', 'repair_inflation'] },
      null,
      2,
    ),
  },
  {
    ordinal: 4,
    orderLabel: 'Step 4',
    typeLabel: 'Policy check',
    TypeIcon: Shield,
    accent: 'policy',
    started: '14:02:04.514',
    finished: '14:02:04.602',
    showRejected: true,
    showEscalationRule: true,
    payloads: [
      {
        label: 'Policy outcome',
        icon: Braces,
        json: { decision: 'rejected', rule: 'escalation-rule-v3', route: 'adjuster_queue' },
      },
    ],
  },
  {
    ordinal: 5,
    orderLabel: 'Step 5',
    typeLabel: 'Human review request',
    TypeIcon: ClipboardList,
    accent: 'review',
    started: '14:02:04.604',
    finished: undefined,
    extraRow: (
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <Badge variant="warning" className="text-[10px] font-medium">
          Awaiting approval
        </Badge>
        <span className="text-muted-foreground text-[11px]">Approver slot · claims_adjuster@acme.co</span>
      </div>
    ),
  },
];

function CollapsedJsonPayload({
  label,
  icon: Icon,
  accent,
}: {
  label: string;
  icon: LucideIcon;
  accent: StepAccent;
}) {
  return (
    <div className="bg-background min-w-0 max-w-full rounded-md border border-zinc-800 shadow-xs">
      <div className="grid w-full grid-cols-[auto_1fr] items-center gap-x-2 rounded-md px-3 py-2.5 text-left leading-none">
        <span className="text-muted-foreground flex size-4 shrink-0 items-center justify-center">
          <ChevronRight className="size-4" aria-hidden />
        </span>
        <span
          className={cn(
            'flex min-w-0 items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide',
            accent.payloadLabel,
          )}
        >
          <Icon className={cn('size-3 shrink-0', accent.payloadIcon)} aria-hidden />
          {label}
        </span>
      </div>
    </div>
  );
}

function OpenToolResultRawJson({ raw, accent }: { raw: string; accent: StepAccent }) {
  return (
    <div className="bg-background min-w-0 max-w-full rounded-md border border-zinc-800 shadow-xs">
      <div className="flex items-center gap-2 px-3 py-2.5">
        <Package className={cn('size-3 shrink-0', accent.payloadIcon)} aria-hidden />
        <span
          className={cn(
            'min-w-0 text-[11px] font-medium uppercase tracking-wide',
            accent.payloadLabel,
          )}
        >
          Result (raw JSON)
        </span>
      </div>
      <div className="max-h-72 min-w-0 max-w-full overflow-auto border-t border-zinc-800 p-3">
        <pre className="text-foreground font-mono text-[11px] leading-relaxed wrap-break-word break-all whitespace-pre-wrap">
          {raw}
        </pre>
      </div>
    </div>
  );
}

function RunStepChrome({
  step,
}: {
  step: MockStep;
}) {
  const TypeIcon = step.TypeIcon;
  const accent = STEP_ACCENTS[step.accent];

  return (
    <div className="mb-3 flex min-w-0 flex-col gap-2 border-b border-border/60 pb-3">
      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <Badge
          variant="outline"
          className="gap-1 border-border/80 bg-muted/85 px-1.5 font-mono text-[11px] tabular-nums dark:bg-muted/70"
        >
          <ListOrdered className="size-3 text-muted-foreground" aria-hidden />
          {step.orderLabel}
        </Badge>
        <span
          className={cn(
            'inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[11px] font-medium',
            accent.chip,
          )}
        >
          <TypeIcon className={cn('size-3 shrink-0', accent.chipIcon)} aria-hidden />
          {step.typeLabel}
        </span>
        {step.showApproved ? (
          <Badge variant="success" className="text-[10px] font-medium">
            Approved
          </Badge>
        ) : null}
        {step.showRejected ? (
          <Badge variant="destructive" className="text-[10px] font-medium">
            Rejected
          </Badge>
        ) : null}
        {step.showEscalationRule ? (
          <Badge variant="success" className="text-[10px] font-medium">
            Escalation rule
          </Badge>
        ) : null}
        {step.iterRound != null ? (
          <span className="text-muted-foreground border-border/80 flex items-center gap-1 rounded-md border bg-background/50 px-2 py-0.5 text-[11px] tabular-nums">
            <Repeat className="size-3 shrink-0 opacity-70" aria-hidden />
            Round {step.iterRound}
          </span>
        ) : null}
        {step.tokens != null ? (
          <span className="text-muted-foreground flex items-center gap-1 text-[11px] tabular-nums">
            <Coins className="size-3 shrink-0 opacity-70" aria-hidden />
            {step.tokens.toLocaleString()} tokens
          </span>
        ) : null}
      </div>
      <div className="text-muted-foreground flex items-center gap-1.5 text-[11px] tabular-nums">
        <Clock className="size-3 shrink-0 opacity-70" aria-hidden />
        <span>
          {step.started}
          {step.finished != null ? ` → ${step.finished}` : ''}
        </span>
      </div>
      {step.extraRow}
    </div>
  );
}

function SessionHeader() {
  const reduceMotion = useReducedMotion();

  return (
    <header className="relative border-b border-border/60 bg-[#080808]">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px overflow-hidden">
        <motion.div
          className="absolute bottom-0 h-px w-[28%] max-w-[140px] bg-linear-to-r from-transparent via-primary/35 to-transparent"
          aria-hidden
          initial={reduceMotion ? false : { left: '-28%' }}
          animate={reduceMotion ? undefined : { left: ['-28%', '100%'] }}
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 4.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'linear',
                }
          }
        />
      </div>

      <div className="relative flex flex-col gap-3 px-4 py-3 md:flex-row md:items-end md:justify-between md:gap-6">
        <div className="min-w-0 space-y-1.5">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">Run trace</p>
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="font-mono text-[13px] font-medium tabular-nums tracking-tight text-zinc-100 sm:text-sm">
              sess_8f2a
            </span>
            <span className="text-zinc-600" aria-hidden>
              ·
            </span>
            <span className="text-[12px] text-zinc-400 sm:text-[13px]">claims-reviewer</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 md:justify-end">
          <div className="flex items-center gap-2 border border-white/[0.07] bg-black/40 px-2.5 py-1.5">
            <span className="inline-flex text-zinc-500" aria-hidden>
              <RefreshCw className="size-3.5" strokeWidth={1.75} />
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-500">Replay</span>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-600">Wall time</p>
            <p className="font-mono text-sm tabular-nums text-zinc-300">2.4s</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export function RunTraceMockup({
  className,
  visibleSteps,
  showHeader = true,
  showFooter = true,
}: {
  className?: string;
  visibleSteps?: number;
  showHeader?: boolean;
  showFooter?: boolean;
}) {
  const steps =
    visibleSteps != null ? MOCK_STEPS.slice(0, visibleSteps) : MOCK_STEPS;

  return (
    <div
      className={cn(
        'overflow-hidden border border-white/10 bg-zinc-950 shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset]',
        className,
      )}
      aria-hidden
    >
      {showHeader ? <SessionHeader /> : null}

      <div className="px-4 py-5 sm:px-5">
        {steps.map((step) => {
          const accent = STEP_ACCENTS[step.accent];
          return (
            <div key={step.ordinal}>
              <RunStepChrome step={step} />
              <div className="mb-6 space-y-2">
                {step.payloads?.map((p) => (
                  <CollapsedJsonPayload
                    key={p.label}
                    label={p.label}
                    icon={p.icon}
                    accent={accent}
                  />
                ))}
                {step.toolResultRaw != null ? (
                  <OpenToolResultRawJson raw={step.toolResultRaw} accent={accent} />
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      {showFooter ? (
        <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 bg-black/40 px-4 py-3">
          <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-500">Decision</span>
          <span className="border border-emerald-500/25 bg-emerald-500/8 px-2.5 py-1 font-mono text-xs text-emerald-100">
            await_hitl
          </span>
        </footer>
      ) : null}
    </div>
  );
}

