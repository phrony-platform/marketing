import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

/** Cockpit-aligned badge variants (marketing-only; no @base-ui dependency). */
export const badgeVariants = cva(
  'inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap [&>svg]:pointer-events-none [&>svg]:size-3',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        destructive:
          'bg-destructive/10 text-destructive dark:bg-destructive/20',
        outline: 'border-border text-foreground',
        success:
          'border-emerald-600/45 bg-emerald-500/12 text-emerald-950 shadow-sm dark:border-emerald-400/40 dark:bg-emerald-500/18 dark:text-emerald-50',
        warning:
          'border-amber-600/45 bg-amber-500/12 text-amber-950 shadow-sm dark:border-amber-400/40 dark:bg-amber-500/18 dark:text-amber-50',
        info: 'border-violet-600/45 bg-violet-500/12 text-violet-950 shadow-sm dark:border-violet-400/40 dark:bg-violet-500/18 dark:text-violet-50',
        ghost: 'hover:bg-muted hover:text-muted-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export function Badge({
  className,
  variant = 'default',
  ...props
}: ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
