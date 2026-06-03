import type { ComponentProps, ReactNode } from 'react';

import { cn } from '@/lib/utils';

const surfaceVariants = {
  default: 'bg-background',
  atmospheric: cn(
    'relative bg-background',
    'bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,hsl(var(--primary)/0.08),transparent_55%)]',
    'before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(to_right,hsl(var(--border)/0.35)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.35)_1px,transparent_1px)] before:bg-[length:24px_24px] before:opacity-[0.35]',
  ),
  grounded: cn(
    'relative border-t border-border bg-background',
    'before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-24 before:bg-[linear-gradient(to_right,hsl(var(--border)/0.4)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.4)_1px,transparent_1px)] before:bg-[length:20px_20px] before:opacity-[0.25] before:[mask-image:linear-gradient(to_bottom,black,transparent)]',
  ),
  muted: 'border-t border-border bg-muted/20',
} as const;

export type SectionSurfaceVariant = keyof typeof surfaceVariants;

type SectionSurfaceProps = ComponentProps<'section'> & {
  variant?: SectionSurfaceVariant;
};

export function SectionSurface({
  className,
  variant = 'default',
  ...props
}: SectionSurfaceProps) {
  return (
    <section
      className={cn('relative scroll-mt-24', surfaceVariants[variant], className)}
      {...props}
    />
  );
}

const containerWidths = {
  narrow: 'max-w-3xl',
  default: 'max-w-[1024px]',
  wide: 'max-w-full',
  bleed: 'max-w-none w-full px-0',
} as const;

export type SectionContainerWidth = keyof typeof containerWidths;

type SectionContainerProps = ComponentProps<'div'> & {
  width?: SectionContainerWidth;
};

export function SectionContainer({
  className,
  width = 'default',
  ...props
}: SectionContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full',
        width === 'bleed' ? containerWidths.bleed : cn('px-5 md:px-8', containerWidths[width]),
        className,
      )}
      {...props}
    />
  );
}

type SectionEyebrowProps = ComponentProps<'p'> & {
  children: ReactNode;
};

export function SectionEyebrow({ className, children, ...props }: SectionEyebrowProps) {
  return (
    <p
      className={cn('text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground', className)}
      {...props}
    >
      {children}
    </p>
  );
}
