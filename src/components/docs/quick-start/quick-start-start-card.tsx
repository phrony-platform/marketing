import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { docLabel, docRadius } from '@/components/docs/doc-style';
import { cn } from '@/lib/utils';

type Props = {
  step: number;
  title: string;
  href: string;
  summary: string;
  className?: string;
};

export function QuickStartStartCard({ step, title, href, summary, className }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        'not-prose group relative block cursor-pointer overflow-hidden border border-border/80 no-underline [&_*]:cursor-pointer [&_*]:no-underline',
        docRadius,
        'shadow-sm transition-[box-shadow,transform,border-color] duration-300',
        'hover:border-foreground/15 hover:shadow-md hover:shadow-black/5',
        'dark:border-white/10 dark:hover:border-white/20 dark:hover:shadow-black/40',
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 cursor-pointer bg-[linear-gradient(135deg,oklch(0.97_0_0)_0%,oklch(0.92_0_0)_42%,oklch(0.88_0_0)_100%)] dark:bg-[linear-gradient(135deg,oklch(0.28_0_0)_0%,oklch(0.22_0_0)_45%,oklch(0.17_0_0)_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-8 -top-12 size-48 cursor-pointer rounded-full bg-[radial-gradient(circle,oklch(1_0_0/0.55)_0%,transparent_68%)] dark:bg-[radial-gradient(circle,oklch(1_0_0/0.08)_0%,transparent_68%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-16 -left-10 size-56 cursor-pointer rounded-full bg-[radial-gradient(circle,oklch(0.75_0_0/0.2)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,oklch(0.5_0_0/0.15)_0%,transparent_70%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 cursor-pointer bg-[linear-gradient(to_bottom,oklch(1_0_0/0.35)_0%,transparent_38%,oklch(0_0_0/0.03)_100%)] dark:bg-[linear-gradient(to_bottom,oklch(1_0_0/0.06)_0%,transparent_40%,oklch(0_0_0/0.25)_100%)]"
        aria-hidden
      />

      <div className="relative z-10 flex cursor-pointer flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6">
        <div className="min-w-0 flex-1 space-y-2">
          <p className={cn(docLabel, 'text-foreground/70 dark:text-foreground/60')}>Quick start</p>
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className={cn(
                docRadius,
                'inline-flex size-8 items-center justify-center border border-foreground/10 bg-background/60 text-sm font-semibold tabular-nums text-foreground backdrop-blur-sm',
                'dark:border-white/15 dark:bg-white/5',
              )}
            >
              {step}
            </span>
            <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">{title}</h3>
          </div>
          <p className="max-w-xl text-pretty text-[13px] leading-relaxed text-muted-foreground sm:text-sm">
            {summary}
          </p>
        </div>

        <span
          className={cn(
            docRadius,
            'inline-flex shrink-0 items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium',
            'border border-foreground/15 bg-background/85 text-foreground shadow-sm backdrop-blur-sm',
            'ring-1 ring-inset ring-white/40',
            'transition-[gap,background-color,border-color] group-hover:gap-2.5 group-hover:border-foreground/25 group-hover:bg-background',
            'dark:border-white/20 dark:bg-white/12 dark:text-foreground dark:ring-white/10',
            'dark:group-hover:border-white/30 dark:group-hover:bg-white/18',
          )}
        >
          Start step {step}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} aria-hidden />
        </span>
      </div>
    </Link>
  );
}
