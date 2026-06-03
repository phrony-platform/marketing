'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { AlertTriangle, Bell, ShieldAlert } from 'lucide-react';

import { CodeChip, VisualFrame, visualHeading } from './_shared';

const baselineSamples = [
  3, 4, 3, 5, 4, 3, 4, 5, 4, 3, 4, 4, 5, 3, 4, 5, 4, 3, 4, 5, 14, 5, 4, 4, 3, 4, 5, 4, 3, 4,
];

function buildPath(values: number[], width: number, height: number, padding = 6) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = Math.max(1, max - min);
  const innerW = width - padding * 2;
  const innerH = height - padding * 2;
  const stepX = innerW / (values.length - 1);
  return values
    .map((v, i) => {
      const x = padding + stepX * i;
      const y = padding + innerH - ((v - min) / range) * innerH;
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(' ');
}

export function FirewallHero() {
  const reduceMotion = useReducedMotion();
  const w = 600;
  const h = 200;
  const linePath = buildPath(baselineSamples, w, h);

  const spikeIndex = 20;
  const stepX = (w - 12) / (baselineSamples.length - 1);
  const spikeX = 6 + stepX * spikeIndex;
  const max = Math.max(...baselineSamples);
  const min = Math.min(...baselineSamples);
  const innerH = h - 12;
  const spikeY = 6 + innerH - ((baselineSamples[spikeIndex] - min) / (max - min)) * innerH;

  return (
    <VisualFrame label="Behavior baseline · claims-reviewer">
      <div className="px-4 pt-5 sm:px-6 sm:pt-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
              Tool calls / minute
            </span>
            <p className="mt-1 font-mono text-[11px] tabular-nums text-zinc-400">
              window: last 30 min · baseline ±1.5σ
            </p>
          </div>
          <CodeChip tone="amber">flagged</CodeChip>
        </div>

        <div className="relative mt-4 aspect-[3/1] w-full">
          <svg
            viewBox={`0 0 ${w} ${h}`}
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
          >
            <rect
              x={6}
              y={h * 0.45}
              width={w - 12}
              height={h * 0.25}
              fill="rgba(56,189,248,0.08)"
              stroke="rgba(56,189,248,0.18)"
              strokeDasharray="3 4"
            />
            <motion.path
              d={linePath}
              fill="none"
              stroke="rgba(165,180,252,0.85)"
              strokeWidth={1.25}
              initial={reduceMotion ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: reduceMotion ? 0 : 1.2, ease: 'easeOut' }}
            />
            <motion.circle
              cx={spikeX}
              cy={spikeY}
              r={4}
              fill="rgba(251,191,36,0.95)"
              stroke="rgba(251,191,36,0.4)"
              strokeWidth={6}
              initial={reduceMotion ? false : { opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: reduceMotion ? 0 : 0.4, delay: 0.6, ease: 'easeOut' }}
            />
          </svg>

          <div
            className="absolute -translate-x-1/2 -translate-y-[calc(100%+10px)] whitespace-nowrap"
            style={{ left: `${(spikeX / w) * 100}%`, top: `${(spikeY / h) * 100}%` }}
          >
            <span className="inline-flex items-center gap-1 border border-amber-500/40 bg-amber-500/[0.1] px-2 py-1 text-[10px] font-medium text-amber-100">
              <AlertTriangle className="size-3" strokeWidth={2} aria-hidden />
              Unusual tool sequence
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-white/10 px-4 py-3 text-[11px] text-zinc-500 sm:px-6">
        <CodeChip>baseline</CodeChip>
        <span>per-agent · learned · re-fits weekly</span>
      </div>
    </VisualFrame>
  );
}

export function FirewallMid() {
  return (
    <VisualFrame label="Rules vs Firewall">
      <div className="grid grid-cols-1 divide-y divide-white/10 md:grid-cols-2 md:divide-x md:divide-y-0">
        <div className="p-5 sm:p-6">
          <p className={visualHeading}>Rules · catch what you can name</p>
          <div className="mt-4 flex flex-col items-center">
            <FunnelSvg
              tone="sky"
              caught={['oversize.amount', 'off.hours', 'allowlist.miss', 'rate.limit']}
            />
          </div>
          <p className="mt-3 text-[11px] leading-snug text-zinc-500">
            Deterministic. Predictable. Limited to what you anticipated.
          </p>
        </div>

        <div className="p-5 sm:p-6">
          <p className={visualHeading}>Firewall · catches what you can&apos;t</p>
          <div className="mt-4 flex flex-col items-center">
            <FunnelSvg tone="amber" caught={['?']} />
          </div>
          <p className="mt-3 text-[11px] leading-snug text-zinc-500">
            Behavioral. Learns per agent. Surfaces the unknown.
          </p>
        </div>
      </div>
    </VisualFrame>
  );
}

function FunnelSvg({
  tone,
  caught,
}: {
  tone: 'sky' | 'amber';
  caught: string[];
}) {
  const accent = tone === 'sky' ? 'rgba(56,189,248,0.6)' : 'rgba(251,191,36,0.7)';
  const fill = tone === 'sky' ? 'rgba(56,189,248,0.06)' : 'rgba(251,191,36,0.06)';
  return (
    <div className="w-full max-w-[260px]">
      <svg viewBox="0 0 240 110" className="h-auto w-full">
        <path
          d="M10 10 L230 10 L150 80 L150 100 L90 100 L90 80 Z"
          fill={fill}
          stroke={accent}
          strokeWidth={1}
          strokeDasharray="3 4"
        />
      </svg>
      <ul className="-mt-3 flex flex-wrap justify-center gap-1.5">
        {caught.map((c) => (
          <li key={c}>
            <CodeChip tone={tone}>{c}</CodeChip>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FirewallBottom() {
  const events = [
    {
      t: '14:02',
      sev: 'med',
      tone: 'amber' as const,
      label: 'Agent accessed an unusual combination of tools — routed to ops for review.',
    },
    {
      t: '13:48',
      sev: 'low',
      tone: 'sky' as const,
      label: 'Tool-call cadence exceeded baseline by 1.8σ — informational.',
    },
    {
      t: '13:11',
      sev: 'high',
      tone: 'rose' as const,
      label: 'Sequence resembled prompt-injection pattern — run blocked.',
    },
  ];
  return (
    <VisualFrame label="Live incident feed">
      <ul className="divide-y divide-white/8">
        {events.map((e) => (
          <li key={`${e.t}-${e.sev}`} className="flex items-start gap-3 px-4 py-3 sm:px-5">
            <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center border border-white/10 bg-white/[0.03] text-zinc-400">
              <Bell className="size-3.5" strokeWidth={1.75} aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] tabular-nums text-zinc-100">{e.t}</span>
                <CodeChip tone={e.tone}>{e.sev}</CodeChip>
              </div>
              <p className="mt-1 text-[12px] leading-snug text-zinc-300">{e.label}</p>
            </div>
            <ShieldAlert
              className="mt-1 size-3.5 shrink-0 text-zinc-600"
              strokeWidth={1.75}
              aria-hidden
            />
          </li>
        ))}
      </ul>
    </VisualFrame>
  );
}
