'use client';

import {
  Bot,
  Check,
  Cloud,
  Database,
  FileText,
  Lock,
  Mail,
  MessageSquare,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';

import { cn } from '@/lib/utils';

import { CodeChip, VisualFrame } from './_shared';

type RingNode = {
  label: string;
  icon: LucideIcon;
  allowed: boolean;
};

const ringNodes: RingNode[] = [
  { label: 'CRM', icon: Database, allowed: true },
  { label: 'Docs', icon: FileText, allowed: true },
  { label: 'Mail', icon: Mail, allowed: false },
  { label: 'Slack', icon: MessageSquare, allowed: true },
  { label: 'S3', icon: Cloud, allowed: false },
  { label: 'DB write', icon: Database, allowed: false },
];

export function SecurityHero() {
  const radius = 110;
  const cx = 180;
  const cy = 130;
  return (
    <VisualFrame label="Permission map · claims-reviewer">
      <div className="relative">
        <svg
          viewBox="0 0 360 260"
          className="block h-auto w-full"
          role="img"
          aria-label="Permission map showing scoped access from a single agent to multiple tools"
        >
          {/* Lines from center to nodes */}
          {ringNodes.map((node, i) => {
            const angle = (Math.PI * 2 * i) / ringNodes.length - Math.PI / 2;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;
            return (
              <line
                key={`line-${node.label}`}
                x1={cx}
                y1={cy}
                x2={x}
                y2={y}
                stroke={node.allowed ? 'rgba(16,185,129,0.6)' : 'rgba(244,63,94,0.55)'}
                strokeWidth={node.allowed ? 1 : 1}
                strokeDasharray={node.allowed ? '0' : '4 4'}
              />
            );
          })}
          {/* Center agent */}
          <g>
            <rect
              x={cx - 26}
              y={cy - 26}
              width={52}
              height={52}
              fill="rgba(15,23,42,1)"
              stroke="rgba(56,189,248,0.4)"
            />
          </g>
          {/* Outer ring nodes (rendered as foreignObject for icons + labels) */}
          {ringNodes.map((node, i) => {
            const angle = (Math.PI * 2 * i) / ringNodes.length - Math.PI / 2;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;
            return (
              <g key={`node-${node.label}`} transform={`translate(${x - 30} ${y - 22})`}>
                <rect
                  width={60}
                  height={44}
                  fill="rgba(9,9,11,1)"
                  stroke={node.allowed ? 'rgba(16,185,129,0.4)' : 'rgba(244,63,94,0.35)'}
                />
              </g>
            );
          })}
        </svg>

        {/* Overlay for icons/labels (HTML on top of svg lines) */}
        <div className="pointer-events-none absolute inset-0">
          {/* Center agent badge */}
          <div
            className="absolute flex size-[52px] -translate-x-1/2 -translate-y-1/2 items-center justify-center"
            style={{ left: `${(cx / 360) * 100}%`, top: `${(cy / 260) * 100}%` }}
          >
            <div className="flex size-full items-center justify-center text-sky-200">
              <Bot className="size-5" strokeWidth={1.75} aria-hidden />
            </div>
          </div>
          {ringNodes.map((node, i) => {
            const angle = (Math.PI * 2 * i) / ringNodes.length - Math.PI / 2;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;
            return (
              <div
                key={`label-${node.label}`}
                className="absolute flex h-11 w-[60px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-0.5"
                style={{ left: `${(x / 360) * 100}%`, top: `${(y / 260) * 100}%` }}
              >
                <node.icon
                  className={cn(
                    'size-3.5',
                    node.allowed ? 'text-emerald-300' : 'text-rose-300/80',
                  )}
                  strokeWidth={1.75}
                  aria-hidden
                />
                <span
                  className={cn(
                    'flex items-center gap-0.5 font-mono text-[10px] uppercase tracking-wide',
                    node.allowed ? 'text-zinc-300' : 'text-zinc-500',
                  )}
                >
                  {!node.allowed ? <Lock className="size-2.5" strokeWidth={2} aria-hidden /> : null}
                  {node.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-white/10 px-4 py-3 text-[11px] text-zinc-500 sm:px-6">
        <span className="inline-flex items-center gap-1 text-emerald-300">
          <Check className="size-3" strokeWidth={2.5} aria-hidden />
          allowed
        </span>
        <span className="text-zinc-600" aria-hidden>·</span>
        <span className="inline-flex items-center gap-1 text-rose-300">
          <Lock className="size-3" strokeWidth={2} aria-hidden />
          blocked & logged
        </span>
        <span className="ml-auto">enforced on every action</span>
      </div>
    </VisualFrame>
  );
}

export function SecurityMid() {
  const qa = [
    {
      q: 'What systems can the agent access?',
      a: 'Permission map, per agent.',
    },
    {
      q: 'What happens if it tries something it shouldn\u2019t?',
      a: 'Blocked at the runtime, logged in the record.',
    },
    {
      q: 'Who approved this access?',
      a: 'Role-based, reviewable, versioned.',
    },
    {
      q: 'How do credentials get there?',
      a: 'Secret manager, scoped per connector. Never in a prompt.',
    },
  ];
  return (
    <VisualFrame label="What security review actually asks">
      <ul className="divide-y divide-white/8">
        {qa.map((row) => (
          <li key={row.q} className="grid grid-cols-1 gap-2 px-4 py-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-4 sm:px-5">
            <p className="text-[12px] leading-snug text-zinc-300">&ldquo;{row.q}&rdquo;</p>
            <span className="hidden text-zinc-600 sm:block" aria-hidden>
              →
            </span>
            <p className="text-[12px] leading-snug text-zinc-100">{row.a}</p>
          </li>
        ))}
      </ul>
    </VisualFrame>
  );
}

const compliance = [
  { label: 'SOC 2 Type II', status: 'in-progress' as const },
  { label: 'ISO 27001', status: 'in-progress' as const },
  { label: 'GDPR', status: 'achieved' as const },
  { label: 'EU AI Act', status: 'aligned' as const },
];

export function SecurityBottom() {
  return (
    <VisualFrame label="Compliance posture">
      <ul className="grid grid-cols-2 divide-x divide-y divide-white/10 sm:grid-cols-4 sm:divide-y-0">
        {compliance.map((c) => (
          <li key={c.label} className="flex flex-col items-start gap-2 p-4 sm:p-5">
            <span className="flex size-7 items-center justify-center border border-white/10 bg-white/[0.03] text-zinc-300">
              <ShieldCheck className="size-3.5" strokeWidth={1.75} aria-hidden />
            </span>
            <p className="text-[12px] font-medium text-zinc-100">{c.label}</p>
            {c.status === 'achieved' ? (
              <CodeChip tone="emerald">
                <span className="inline-flex items-center gap-1">
                  <Check className="size-3" strokeWidth={2.5} aria-hidden /> achieved
                </span>
              </CodeChip>
            ) : c.status === 'aligned' ? (
              <CodeChip tone="sky">aligned</CodeChip>
            ) : (
              <CodeChip tone="amber">in progress</CodeChip>
            )}
          </li>
        ))}
      </ul>
    </VisualFrame>
  );
}
