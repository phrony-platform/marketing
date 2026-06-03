'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  Bot,
  Check,
  ClipboardListIcon,
  HelpCircle,
  PauseCircle,
  UserCheck,
  X,
} from 'lucide-react';

import {
  CockpitMarketingDemoProvider,
  PREVIEW_PAYMENT_APPROVAL,
  PreviewRunStepChrome,
  PreviewUserTaskReqHitlBody,
} from '@/components/cockpit-dashboard-preview';

import { CodeChip, VisualFrame } from './_shared';

/** Same timestamp as marketing run timeline “Step 4” for consistency with cockpit preview. */
const APPROVAL_STEP_AT = new Date('2026-04-12T14:18:03.090Z');

export function HumanInTheLoopHero() {
  const reduceMotion = useReducedMotion();
  return (
    <VisualFrame label="Same case, two perspectives">
      <div className="grid grid-cols-1 divide-y divide-white/10 md:grid-cols-2 md:divide-x md:divide-y-0">
        {/* Agent view */}
        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center border border-sky-500/30 bg-sky-500/[0.08] text-sky-100">
                <Bot className="size-3.5" strokeWidth={1.75} aria-hidden />
              </span>
              <span className="text-[12px] font-medium text-zinc-100">Agent</span>
            </div>
            <CodeChip>case_2f81</CodeChip>
          </div>

          <p className="mt-4 text-[12px] leading-relaxed text-zinc-400">
            Claim from policy POL-48219 — coverage valid, history unremarkable, fraud signal mild.
          </p>

          <dl className="mt-4 grid grid-cols-2 gap-2 text-[11px]">
            <div className="border border-white/8 bg-white/[0.02] p-2">
              <dt className="text-zinc-500">Confidence</dt>
              <dd className="mt-1 font-mono tabular-nums text-zinc-200">0.62</dd>
            </div>
            <div className="border border-white/8 bg-white/[0.02] p-2">
              <dt className="text-zinc-500">Value</dt>
              <dd className="mt-1 font-mono tabular-nums text-zinc-200">€1,840</dd>
            </div>
            <div className="border border-white/8 bg-white/[0.02] p-2">
              <dt className="text-zinc-500">Risk band</dt>
              <dd className="mt-1 font-mono uppercase tracking-wide text-zinc-200">medium</dd>
            </div>
            <div className="border border-white/8 bg-white/[0.02] p-2">
              <dt className="text-zinc-500">Action</dt>
              <dd className="mt-1 inline-flex items-center gap-1 text-amber-200">
                <PauseCircle className="size-3" strokeWidth={2} aria-hidden />
                <span className="font-mono">await_review</span>
              </dd>
            </div>
          </dl>
        </div>

        {/* Connecting line on md+ */}
        <span
          className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block"
          aria-hidden
        />

        {/* Reviewer view */}
        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center border border-emerald-500/30 bg-emerald-500/[0.08] text-emerald-100">
                <UserCheck className="size-3.5" strokeWidth={1.75} aria-hidden />
              </span>
              <span className="text-[12px] font-medium text-zinc-100">Sarah · Senior Adjuster</span>
            </div>
            <CodeChip tone="emerald">routed</CodeChip>
          </div>

          <p className="mt-4 text-[12px] leading-relaxed text-zinc-400">
            Confidence below threshold (<span className="font-mono text-zinc-200">0.62</span> &lt;{' '}
            <span className="font-mono text-zinc-200">0.75</span>). Reviewer sees the full case and
            the agent&apos;s reasoning side by side.
          </p>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <motion.button
              type="button"
              whileHover={reduceMotion ? undefined : { y: -1 }}
              className="flex items-center justify-center gap-1 border border-emerald-500/30 bg-emerald-500/[0.08] px-2 py-2 text-[11px] font-medium text-emerald-100"
            >
              <Check className="size-3" strokeWidth={2.5} aria-hidden />
              Approve
            </motion.button>
            <motion.button
              type="button"
              whileHover={reduceMotion ? undefined : { y: -1 }}
              className="flex items-center justify-center gap-1 border border-rose-500/30 bg-rose-500/[0.08] px-2 py-2 text-[11px] font-medium text-rose-100"
            >
              <X className="size-3" strokeWidth={2.5} aria-hidden />
              Reject
            </motion.button>
            <motion.button
              type="button"
              whileHover={reduceMotion ? undefined : { y: -1 }}
              className="flex items-center justify-center gap-1 border border-white/15 bg-white/[0.04] px-2 py-2 text-[11px] font-medium text-zinc-200"
            >
              <HelpCircle className="size-3" strokeWidth={2} aria-hidden />
              Ask
            </motion.button>
          </div>
        </div>
      </div>
    </VisualFrame>
  );
}

export function HumanInTheLoopMid() {
  const stops = [0, 25, 50, 75, 100];
  const handleAt = 38;
  return (
    <VisualFrame label="Threshold">
      <div className="px-5 py-7 sm:px-7 sm:py-8">
        <div className="flex items-center justify-between text-[11px] text-zinc-400">
          <span>
            Auto-approve below{' '}
            <span className="font-mono text-zinc-100">€1,000</span>
          </span>
          <span>
            Route above{' '}
            <span className="font-mono text-zinc-100">€1,000</span>
          </span>
        </div>

        <div className="relative mt-5">
          <div className="h-1 w-full overflow-hidden border border-white/10 bg-white/[0.03]">
            <div
              className="h-full bg-gradient-to-r from-emerald-500/40 via-emerald-500/30 to-emerald-500/0"
              style={{ width: `${handleAt}%` }}
              aria-hidden
            />
          </div>
          {/* Tick marks */}
          <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-between">
            {stops.map((s) => (
              <span key={s} className="block h-1 w-px bg-white/15" aria-hidden />
            ))}
          </div>
          {/* Handle */}
          <div
            className="absolute -top-1.5 size-4 -translate-x-1/2 border border-emerald-400/60 bg-zinc-950 shadow-[0_0_0_4px_rgba(16,185,129,0.12)]"
            style={{ left: `${handleAt}%` }}
            aria-hidden
          />
          <div
            className="absolute mt-3 -translate-x-1/2 font-mono text-[11px] tabular-nums text-emerald-200"
            style={{ left: `${handleAt}%` }}
          >
            €1,000
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-2 text-[11px] text-zinc-400">
          <CodeChip tone="emerald">auto_approve</CodeChip>
          <span className="text-zinc-600">·</span>
          <CodeChip tone="amber">await_review</CodeChip>
          <span className="text-zinc-600">·</span>
          <span>You set the rule. Phrony enforces it.</span>
        </div>
      </div>
    </VisualFrame>
  );
}

export function HumanInTheLoopBottom() {
  return (
    <VisualFrame label="Approval request">
      <div className="flex min-h-[min(52vh,520px)] items-center justify-center p-3 sm:p-4">
        <CockpitMarketingDemoProvider interactive={false}>
          <div className="mx-auto w-full min-w-0 max-w-full md:w-1/2 bg-muted/40 rounded-md border border-border/80 p-3 text-xs wrap-break-word">
            <PreviewRunStepChrome
              stepOrderLabel="Step 4"
              typeLabel="User approval request"
              TypeIcon={ClipboardListIcon}
              tokens={312}
              startedAt={APPROVAL_STEP_AT}
              finishedAt={null}
            />
            <PreviewUserTaskReqHitlBody approval={PREVIEW_PAYMENT_APPROVAL} />
          </div>
        </CockpitMarketingDemoProvider>
      </div>
    </VisualFrame>
  );
}
