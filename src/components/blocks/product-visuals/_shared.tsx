import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

/**
 * Shared primitives for product feature page visuals.
 *
 * All visuals follow the same design language as the marketing home page:
 * dark zinc surfaces, hairline top border, sharp corners, monospace
 * for IDs/timestamps, and accent colors (emerald, sky, amber, violet, rose)
 * used sparingly at low opacity for state.
 */

const visualSurface = 'border-t border-white/10 bg-zinc-950';

export const visualHeading =
  'text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500';

export function VisualFrame({
  children,
  label,
  className,
}: {
  children: ReactNode;
  label?: string;
  className?: string;
}) {
  return (
    <figure className={cn('w-full', className)}>
      {label != null ? (
        <figcaption className={`mb-3 px-5 md:px-8 ${visualHeading}`}>{label}</figcaption>
      ) : null}
      <div className={cn(visualSurface, 'overflow-hidden')}>{children}</div>
    </figure>
  );
}

export function BetaPill({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-sm border border-amber-500/35 bg-amber-500/10 px-1.5 py-px text-[9px] font-semibold uppercase tracking-[0.14em] text-amber-300/95',
        className,
      )}
      aria-label="Beta"
    >
      BETA
    </span>
  );
}

export function NewPill({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-sm border border-sky-500/35 bg-sky-500/10 px-1.5 py-px text-[9px] font-semibold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-200',
        className,
      )}
      aria-label="New"
    >
      NEW
    </span>
  );
}

export function AgentCard({
  icon: Icon,
  title,
  role,
  tone = 'sky',
  className,
}: {
  icon: LucideIcon;
  title: string;
  role: string;
  tone?: 'sky' | 'emerald' | 'amber' | 'violet' | 'rose' | 'zinc';
  className?: string;
}) {
  const toneRing: Record<typeof tone & string, string> = {
    sky: 'border-sky-500/30 bg-sky-500/[0.07] text-sky-100',
    emerald: 'border-emerald-500/30 bg-emerald-500/[0.07] text-emerald-100',
    amber: 'border-amber-500/30 bg-amber-500/[0.07] text-amber-100',
    violet: 'border-violet-500/30 bg-violet-500/[0.07] text-violet-100',
    rose: 'border-rose-500/30 bg-rose-500/[0.07] text-rose-100',
    zinc: 'border-white/10 bg-white/[0.04] text-zinc-200',
  };
  return (
    <div
      className={cn(
        'flex min-w-0 flex-col gap-1.5 border bg-zinc-950 px-3 py-2.5 sm:px-3.5 sm:py-3',
        'border-white/10',
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <span
          className={cn(
            'flex size-7 shrink-0 items-center justify-center border',
            toneRing[tone],
          )}
          aria-hidden
        >
          <Icon className="size-3.5" strokeWidth={1.75} />
        </span>
        <span className="truncate text-[12px] font-medium text-zinc-100 sm:text-[13px]">
          {title}
        </span>
      </div>
      <p className="text-[10px] uppercase tracking-[0.14em] text-zinc-500">{role}</p>
    </div>
  );
}

export function CodeChip({
  children,
  tone = 'zinc',
  className,
}: {
  children: ReactNode;
  tone?: 'zinc' | 'emerald' | 'amber' | 'sky' | 'violet' | 'rose';
  className?: string;
}) {
  const map: Record<typeof tone & string, string> = {
    zinc: 'border-white/10 bg-white/[0.04] text-zinc-200',
    emerald: 'border-emerald-500/30 bg-emerald-500/[0.08] text-emerald-100',
    amber: 'border-amber-500/30 bg-amber-500/[0.08] text-amber-100',
    sky: 'border-sky-500/30 bg-sky-500/[0.08] text-sky-100',
    violet: 'border-violet-500/30 bg-violet-500/[0.08] text-violet-100',
    rose: 'border-rose-500/30 bg-rose-500/[0.08] text-rose-100',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center border px-1.5 py-px font-mono text-[10px] tracking-tight sm:text-[11px]',
        map[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
