import { cn } from '@/lib/utils';

/** Documentation UI tokens (neutral chrome; colored accents live on callouts and quick-start widgets). */
export const docRadius = 'rounded-md';

export const docPanel = cn(docRadius, 'border border-border bg-background');

export const docKicker = 'text-sm text-muted-foreground';

export const docLabel = 'text-xs font-medium text-muted-foreground';

export const docEyebrow = cn(
  docRadius,
  'inline-flex items-center gap-2 border border-border bg-muted/50 px-2.5 py-1',
  docLabel,
);

const docButtonBase =
  'cursor-pointer inline-flex h-10 items-center justify-center gap-2 text-sm font-medium transition-colors';

export const docButtonPrimary = cn(
  docRadius,
  docButtonBase,
  'bg-foreground px-4 text-background hover:bg-foreground/90',
);

export const docButtonSecondary = cn(
  docRadius,
  docButtonBase,
  'border border-border bg-background px-4 text-foreground hover:bg-muted/50',
);

export const docIconBox = cn(
  'flex size-8 shrink-0 items-center justify-center rounded-sm border border-border bg-muted/60 text-foreground',
);

export const docTabLink = cn(
  'relative shrink-0 cursor-pointer border-b-2 border-transparent px-3 py-2.5 text-sm transition-colors sm:px-4',
);

export const docTabLinkActive = 'border-foreground font-medium text-foreground';

export const docTabLinkInactive =
  'text-muted-foreground hover:border-border hover:text-foreground';

export const docCardLink = cn(
  docPanel,
  'flex cursor-pointer flex-col p-5 transition-colors hover:border-foreground/20 hover:bg-muted/30 sm:p-6',
);
