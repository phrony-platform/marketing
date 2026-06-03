import { ArrowRight, ArrowUpRight, Layers } from 'lucide-react';
import Link from 'next/link';
import { Fragment } from 'react';

import { cn } from '@/lib/utils';

const PARADIGM_STEPS = ['Declare', 'Deploy', 'Run'] as const;

export function HeroLabels({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'mb-8 flex justify-center lg:justify-start',
        className,
      )}
    >
      <Link
        href="#how-it-works"
        className={cn(
          'group relative inline-flex max-w-full rounded-2xl p-px',
          'transition-[box-shadow,transform] duration-300 ease-out',
          'hover:-translate-y-px hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.35)]',
          'dark:hover:shadow-[0_12px_48px_-14px_rgba(255,255,255,0.14)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        )}
      >
        <span
          className="hero-paradigm-border pointer-events-none absolute inset-0 rounded-2xl opacity-90 motion-reduce:animate-none"
          aria-hidden
        />
        <span
          className={cn(
            'relative flex min-w-0 items-center gap-3 rounded-[calc(1rem-1px)] px-3.5 py-2.5 sm:gap-3.5 sm:px-4',
            'bg-background/92 backdrop-blur-md',
            'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07)]',
          )}
        >
          <span
            className={cn(
              'relative flex size-9 shrink-0 items-center justify-center rounded-xl border border-border/50',
              'bg-gradient-to-br from-foreground/[0.07] via-muted/40 to-muted/10',
              'shadow-sm',
            )}
            aria-hidden
          >
            <span className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_55%)]" />
            <Layers className="relative size-4 text-foreground/90" strokeWidth={1.5} />
          </span>

          <span className="flex min-w-0 flex-col items-start gap-1 text-left">
            <span className="hero-paradigm-title text-[13px] font-semibold leading-none tracking-tight sm:text-sm">
              A new paradigm
            </span>
            <span className="flex flex-wrap items-center gap-1 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground sm:text-[11px] sm:tracking-[0.16em]">
              {PARADIGM_STEPS.map((step, index) => (
                <Fragment key={step}>
                  {index > 0 ? (
                    <ArrowRight
                      className="size-2.5 shrink-0 text-foreground/25 motion-safe:transition-transform motion-safe:group-hover:translate-x-px"
                      aria-hidden
                    />
                  ) : null}
                  <span className="motion-safe:transition-colors motion-safe:group-hover:text-foreground/80">
                    {step}
                  </span>
                </Fragment>
              ))}
            </span>
          </span>

          <ArrowUpRight
            className={cn(
              'ms-0.5 size-4 shrink-0 text-muted-foreground/70',
              'motion-safe:transition-[color,transform] motion-safe:duration-300',
              'motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:text-foreground',
            )}
            aria-hidden
          />
        </span>
      </Link>
    </div>
  );
}
