import type { ReactNode } from 'react';
import { FileCode } from 'lucide-react';

import { stepIllustrationMeta } from '@/components/blocks/step-illustration-ui';
import { cn } from '@/lib/utils';

export function ManifestEditorFrame({
  children,
  filename = 'agent.yaml',
  subtitle,
  sectionLabel,
  compact = false,
  fillHeight = false,
}: {
  children: ReactNode;
  filename?: string;
  subtitle?: string;
  sectionLabel?: string;
  /** Tighter chrome for narrow viewports (pairs with `compact` code panel size). */
  compact?: boolean;
  /** Stretch the code body to fill a flex parent (for viewport-focused panels). */
  fillHeight?: boolean;
}) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-sm border border-border/80 bg-background',
        fillHeight && 'flex h-full min-h-0 flex-col',
      )}
    >
      <div
        className={cn(
          'flex items-center justify-between gap-2 border-b border-border/80 bg-muted/20 sm:gap-3',
          compact ? 'px-3 py-2' : 'px-4 py-2.5 sm:px-5 sm:py-3',
        )}
      >
        <div className="flex min-w-0 items-center gap-2 sm:gap-2.5">
          <FileCode
            className={cn('shrink-0 text-muted-foreground', compact ? 'size-3.5' : 'size-4 sm:size-[18px]')}
            strokeWidth={1.75}
            aria-hidden
          />
          <span
            className={cn(
              'truncate font-mono text-foreground',
              compact ? 'text-xs' : 'text-sm sm:text-base',
            )}
          >
            {filename}
          </span>
          {subtitle ? (
            <span
              className={cn(
                'hidden truncate font-mono text-muted-foreground sm:inline',
                compact ? 'text-[10px]' : 'text-xs sm:text-sm',
              )}
            >
              {subtitle}
            </span>
          ) : null}
        </div>
        {sectionLabel ? (
          <span
            className={cn(
              stepIllustrationMeta,
              'shrink-0 normal-case tracking-normal text-foreground/80',
              compact && 'text-[10px]',
            )}
          >
            {sectionLabel}
          </span>
        ) : null}
      </div>
      <div
        className={cn(
          compact ? 'px-2.5 py-2.5 sm:px-3 sm:py-3' : 'px-3 py-4 sm:px-4 sm:py-5 md:px-5',
          fillHeight && 'flex min-h-0 flex-1 flex-col',
        )}
      >
        {children}
      </div>
    </div>
  );
}
