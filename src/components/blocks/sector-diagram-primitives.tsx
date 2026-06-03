import { cn } from '@/lib/utils';

/** Shared frame size for sector use-case diagrams (banking, insurance, etc.). */
export const diagramFrame =
  'flex min-h-[200px] w-full flex-col border border-white/10 bg-zinc-950 p-4 sm:min-h-[220px] sm:p-5';

export const diagramCaption =
  'font-mono text-center text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-500';

const mutedTone = 'border-white/[0.12] bg-white/[0.03] text-zinc-500';

export const inboundLabel = 'font-mono text-[9px] font-medium text-zinc-500 sm:text-[10px]';

export function SmallNode({
  children,
  className,
  muted,
}: {
  children: React.ReactNode;
  className?: string;
  muted?: boolean;
}) {
  return (
    <div
      className={cn(
        'max-w-full truncate border px-2 py-1.5 text-center font-mono text-[10px] font-medium leading-tight sm:min-h-[2.25rem] sm:text-[11px] sm:leading-snug',
        muted ? mutedTone : 'border-primary/45 bg-primary/8 text-zinc-100',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function VArrow({ muted }: { muted?: boolean }) {
  return (
    <div
      className={cn('mx-auto h-3 w-px shrink-0', muted ? 'bg-zinc-600/50' : 'bg-zinc-500/40')}
      aria-hidden
    />
  );
}

export function HArrow({
  className,
  dashed,
  muted,
  flex,
}: {
  className?: string;
  dashed?: boolean;
  muted?: boolean;
  flex?: boolean;
}) {
  if (dashed) {
    return (
      <div
        className={cn(
          'h-0 shrink-0 border-t border-dashed border-zinc-500/70',
          flex ? 'min-w-[12px] flex-1' : 'w-6 sm:w-8',
          className,
        )}
        aria-hidden
      />
    );
  }
  return (
    <div
      className={cn(
        'h-px shrink-0',
        flex ? 'min-w-[8px] flex-1' : 'w-6 sm:w-8',
        muted ? 'bg-zinc-600/45' : 'bg-zinc-500/50',
        className,
      )}
      aria-hidden
    />
  );
}

export function DiagramFooterLine({
  label,
  ticks,
  className,
}: {
  label: string;
  ticks?: number;
  className?: string;
}) {
  return (
    <div className={cn('mt-auto w-full pt-3', className)}>
      <div className="relative border-t border-white/15">
        <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-zinc-950 px-1.5 font-mono text-[9px] font-medium uppercase tracking-[0.16em] text-zinc-500">
          {label}
        </span>
        {ticks != null && ticks > 0 ? (
          <div className="mt-2 flex justify-between px-0.5">
            {Array.from({ length: ticks }).map((_, i) => (
              <span key={i} className="h-1 w-px bg-zinc-500/60" aria-hidden />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
