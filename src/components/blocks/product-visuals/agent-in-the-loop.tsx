'use client';

import { ArrowRight, Bot, GitBranch, MessagesSquare, Repeat, ShieldCheck, UserCheck } from 'lucide-react';

import { CodeChip, VisualFrame, visualHeading } from './_shared';

export function AgentInTheLoopHero() {
  return (
    <VisualFrame label="Review thread · case_2f81">
      <div className="divide-y divide-white/8 p-3 sm:p-4">
        {/* Drafting agent message */}
        <div className="pb-3 sm:pb-4">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center border border-sky-500/30 bg-sky-500/[0.08] text-sky-100">
              <Bot className="size-3.5" strokeWidth={1.75} aria-hidden />
            </span>
            <span className="text-[12px] font-medium text-zinc-100">Claims agent · A</span>
            <span className="text-zinc-600" aria-hidden>·</span>
            <span className="font-mono text-[11px] tabular-nums text-zinc-500">draft</span>
          </div>
          <div className="mt-2 ml-9 border border-white/8 bg-white/[0.02] p-3">
            <p className="text-[12px] leading-relaxed text-zinc-200">
              <span className="font-medium">Approve claim.</span> Coverage valid. Fraud score{' '}
              <span className="font-mono tabular-nums text-zinc-300">0.18</span>.
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <CodeChip tone="emerald">approve</CodeChip>
              <CodeChip>conf 0.91</CodeChip>
            </div>
          </div>
        </div>

        {/* Reviewer agent response */}
        <div className="pt-3 sm:pt-4">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center border border-amber-500/30 bg-amber-500/[0.08] text-amber-100">
              <ShieldCheck className="size-3.5" strokeWidth={1.75} aria-hidden />
            </span>
            <span className="text-[12px] font-medium text-zinc-100">Fraud agent · B</span>
            <span className="text-zinc-600" aria-hidden>·</span>
            <span className="font-mono text-[11px] tabular-nums text-zinc-500">review</span>
          </div>
          <div className="mt-2 ml-9 border border-amber-500/20 bg-amber-500/[0.04] p-3">
            <p className="text-[12px] leading-relaxed text-zinc-200">
              Agreed on coverage. Flagging history:{' '}
              <span className="font-mono text-zinc-100">3 claims in 90 days</span>. Recommend
              additional review.
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <CodeChip tone="amber">challenge</CodeChip>
              <CodeChip tone="violet">escalate_to_hitl</CodeChip>
            </div>
          </div>
        </div>
      </div>
    </VisualFrame>
  );
}

export function AgentInTheLoopMid() {
  return (
    <VisualFrame label="AITL vs HITL">
      <div className="grid grid-cols-1 divide-y divide-white/10 md:grid-cols-2 md:divide-x md:divide-y-0">
        {/* AITL path */}
        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <p className={visualHeading}>AITL · for scale</p>
            <span className="font-mono text-[11px] tabular-nums text-emerald-300/90">~ 1.4s</span>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="flex size-7 items-center justify-center border border-sky-500/30 bg-sky-500/[0.08] text-sky-100">
              <Bot className="size-3.5" strokeWidth={1.75} aria-hidden />
            </span>
            <ArrowRight className="size-3.5 text-zinc-500" aria-hidden />
            <span className="flex size-7 items-center justify-center border border-amber-500/30 bg-amber-500/[0.08] text-amber-100">
              <ShieldCheck className="size-3.5" strokeWidth={1.75} aria-hidden />
            </span>
            <ArrowRight className="size-3.5 text-zinc-500" aria-hidden />
            <CodeChip tone="emerald">decision</CodeChip>
          </div>
          <p className="mt-3 text-[11px] leading-snug text-zinc-400">
            Every case gets a review pass. No queue, no waiting.
          </p>
        </div>

        {/* HITL path */}
        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <p className={visualHeading}>HITL · for judgment</p>
            <span className="font-mono text-[11px] tabular-nums text-violet-300/90">~ 9 min</span>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="flex size-7 items-center justify-center border border-sky-500/30 bg-sky-500/[0.08] text-sky-100">
              <Bot className="size-3.5" strokeWidth={1.75} aria-hidden />
            </span>
            <ArrowRight className="size-3.5 text-zinc-500" aria-hidden />
            <span className="flex size-7 items-center justify-center border border-violet-500/30 bg-violet-500/[0.08] text-violet-100">
              <UserCheck className="size-3.5" strokeWidth={1.75} aria-hidden />
            </span>
            <ArrowRight className="size-3.5 text-zinc-500" aria-hidden />
            <CodeChip tone="emerald">decision</CodeChip>
          </div>
          <p className="mt-3 text-[11px] leading-snug text-zinc-400">
            For the calls that actually need a person. Slower, on purpose.
          </p>
        </div>
      </div>
      <p className="border-t border-white/10 px-5 py-3 text-[11px] leading-snug text-zinc-500 sm:px-6">
        Use AITL for scale. HITL for judgment. Most teams use both.
      </p>
    </VisualFrame>
  );
}

export function AgentInTheLoopBottom() {
  const patterns = [
    {
      id: 'draft-review',
      label: 'Draft & Review',
      icon: MessagesSquare,
      blurb: 'A drafts. B verifies before publish.',
    },
    {
      id: 'parallel-verify',
      label: 'Parallel Verify',
      icon: GitBranch,
      blurb: 'Two agents reason in parallel. Compare.',
    },
    {
      id: 'challenger',
      label: 'Challenger Model',
      icon: Repeat,
      blurb: 'A new model challenges the production one.',
    },
  ];
  return (
    <VisualFrame label="Common patterns">
      <ul className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {patterns.map((p) => (
          <li key={p.id} className="flex flex-col gap-2 p-4 sm:p-5">
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center border border-white/10 bg-white/[0.03] text-zinc-200">
                <p.icon className="size-3.5" strokeWidth={1.75} aria-hidden />
              </span>
              <span className="text-[12px] font-medium text-zinc-100">{p.label}</span>
            </div>
            <p className="text-[11px] leading-relaxed text-zinc-400">{p.blurb}</p>
          </li>
        ))}
      </ul>
    </VisualFrame>
  );
}
