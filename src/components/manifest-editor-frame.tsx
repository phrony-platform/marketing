import type { ReactNode } from 'react';
import { FileCode } from 'lucide-react';

import { stepIllustrationMeta } from '@/components/blocks/step-illustration-ui';
import { cn } from '@/lib/utils';

export function ManifestEditorFrame({
  children,
  filename = 'agent.yaml',
  subtitle,
  sectionLabel,
}: {
  children: ReactNode;
  filename?: string;
  subtitle?: string;
  sectionLabel?: string;
}) {
  return (
    <div className="overflow-hidden rounded-sm border border-border/80 bg-background">
      <div className="flex items-center justify-between gap-3 border-b border-border/80 bg-muted/20 px-4 py-2.5 sm:px-5 sm:py-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <FileCode className="size-4 shrink-0 text-muted-foreground sm:size-[18px]" strokeWidth={1.75} aria-hidden />
          <span className="truncate font-mono text-sm text-foreground sm:text-base">{filename}</span>
          {subtitle ? (
            <span className="hidden truncate font-mono text-xs text-muted-foreground sm:inline sm:text-sm">
              {subtitle}
            </span>
          ) : null}
        </div>
        {sectionLabel ? (
          <span className={cn(stepIllustrationMeta, 'shrink-0 normal-case tracking-normal text-foreground/80')}>
            {sectionLabel}
          </span>
        ) : null}
      </div>
      <div className="px-3 py-4 sm:px-4 sm:py-5 md:px-5">{children}</div>
    </div>
  );
}
