'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Clock, FileText, ShieldAlert, Target, Wrench } from 'lucide-react';

import { AgentCard, CodeChip, VisualFrame, visualHeading } from './_shared';

const agentSpecs = [
  { id: 'policy', label: 'Policy', role: 'Coverage check', icon: FileText, tone: 'sky' as const },
  { id: 'fraud', label: 'Fraud', role: 'Signal review', icon: ShieldAlert, tone: 'amber' as const },
  { id: 'history', label: 'History', role: 'Precedent lookup', icon: Clock, tone: 'violet' as const },
];

export function MultiAgentSystemsHero() {
  const reduceMotion = useReducedMotion();

  return (
    <VisualFrame label="Team formation">
      <div className="relative px-4 py-7 sm:px-8 sm:py-10">
        <div className="mx-auto grid max-w-3xl grid-cols-3 gap-3 sm:gap-5">
          {agentSpecs.map((agent, i) => (
            <motion.div
              key={agent.id}
              initial={reduceMotion ? false : { opacity: 0, y: -6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{
                duration: reduceMotion ? 0 : 0.4,
                delay: reduceMotion ? 0 : i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <AgentCard
                icon={agent.icon}
                title={agent.label}
                role={agent.role}
                tone={agent.tone}
              />
            </motion.div>
          ))}
        </div>

        {/* Convergence lines (SVG, drawn behind decision node) */}
        <div
          className="relative mx-auto mt-6 h-16 max-w-3xl sm:mt-8 sm:h-20"
          aria-hidden
        >
          <svg
            viewBox="0 0 600 80"
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
          >
            {[
              { x: 100, color: 'rgba(56,189,248,0.45)' },
              { x: 300, color: 'rgba(251,191,36,0.45)' },
              { x: 500, color: 'rgba(167,139,250,0.45)' },
            ].map((line, i) => (
              <motion.path
                key={line.x}
                d={`M${line.x} 0 Q${line.x} 40 300 78`}
                fill="none"
                stroke={line.color}
                strokeWidth={1}
                strokeDasharray="4 4"
                initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{
                  duration: reduceMotion ? 0 : 0.9,
                  delay: reduceMotion ? 0 : 0.25 + i * 0.08,
                  ease: 'easeOut',
                }}
              />
            ))}
          </svg>
        </div>

        <div className="-mt-2 flex justify-center">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{
              duration: reduceMotion ? 0 : 0.45,
              delay: reduceMotion ? 0 : 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex items-center gap-2 border border-emerald-500/40 bg-emerald-500/[0.08] px-3 py-2 text-emerald-100"
          >
            <Target className="size-3.5" strokeWidth={1.75} aria-hidden />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em]">Decision</span>
            <span className="text-zinc-500" aria-hidden>·</span>
            <span className="font-mono text-[11px] tabular-nums text-zinc-300">one outcome</span>
          </motion.div>
        </div>
      </div>
    </VisualFrame>
  );
}

export function MultiAgentSystemsMid() {
  return (
    <VisualFrame label="Before · With Phrony">
      <div className="grid grid-cols-1 divide-y divide-white/10 md:grid-cols-2 md:divide-x md:divide-y-0">
        {/* Before: tangled monolith */}
        <div className="p-5 sm:p-6">
          <p className={visualHeading}>Before</p>
          <div className="mt-4 flex items-center justify-center">
            <div className="relative w-full max-w-xs">
              <div className="mx-auto flex w-fit min-w-0 items-center gap-2 border border-white/10 bg-white/[0.03] px-3 py-2 text-zinc-400">
                <Wrench className="size-3.5" strokeWidth={1.75} aria-hidden />
                <span className="font-mono text-[11px] tracking-tight">monolith.agent</span>
              </div>
              <ul className="mt-4 grid grid-cols-2 gap-1.5 text-zinc-500">
                {[
                  'policy.lookup',
                  'fraud.score',
                  'history.fetch',
                  'docs.search',
                  'crm.read',
                  'crm.write',
                  'mailer.send',
                  'queue.publish',
                ].map((tool) => (
                  <li
                    key={tool}
                    className="truncate border border-white/8 bg-white/[0.02] px-1.5 py-1 font-mono text-[10px]"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[11px] leading-snug text-zinc-500">
                One agent. Eight tools. Confused generalist.
              </p>
            </div>
          </div>
        </div>

        {/* With Phrony: three specialists */}
        <div className="p-5 sm:p-6">
          <p className={visualHeading}>With Phrony</p>
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {agentSpecs.map((agent) => (
              <AgentCard
                key={agent.id}
                icon={agent.icon}
                title={agent.label}
                role={agent.role}
                tone={agent.tone}
              />
            ))}
          </div>
          <ul className="mt-4 space-y-1.5 text-[11px] leading-snug text-zinc-400">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 size-1 shrink-0 rounded-full bg-emerald-400/70" aria-hidden />
              Each specialist owns one job.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 size-1 shrink-0 rounded-full bg-emerald-400/70" aria-hidden />
              Versioned independently. Swappable.
            </li>
          </ul>
        </div>
      </div>
    </VisualFrame>
  );
}

export function MultiAgentSystemsBottom() {
  const beats = [
    { id: 'arrives', label: 'Claim arrives', tone: 'zinc' as const, code: 'sess_8f2a' },
    { id: 'policy', label: 'Policy agent checks coverage', tone: 'sky' as const, code: 'POL-48219' },
    { id: 'fraud', label: 'Fraud agent flags a signal', tone: 'amber' as const, code: 'score 0.72' },
    { id: 'decision', label: 'One decision returned', tone: 'emerald' as const, code: 'escalate' },
  ];
  return (
    <VisualFrame label="One case, four beats">
      <ol className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
        {beats.map((beat, i) => (
          <li key={beat.id} className="flex flex-col gap-2 p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-[0.16em] text-zinc-500">
                {String(i + 1).padStart(2, '0')}
              </span>
              {i < beats.length - 1 ? (
                <ArrowRight
                  className="size-3.5 text-zinc-600 sm:hidden"
                  aria-hidden
                  strokeWidth={1.75}
                />
              ) : null}
            </div>
            <p className="text-[12px] leading-snug text-zinc-200 sm:text-[13px]">{beat.label}</p>
            <div className="mt-auto pt-1">
              <CodeChip tone={beat.tone}>{beat.code}</CodeChip>
            </div>
          </li>
        ))}
      </ol>
    </VisualFrame>
  );
}
