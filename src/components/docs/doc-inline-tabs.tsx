'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';

import { docRadius } from '@/components/docs/doc-style';
import { cn } from '@/lib/utils';

export type DocInlineTab = {
  id: string;
  label: string;
  panel: ReactNode;
};

type Props = {
  tabs: DocInlineTab[];
  defaultTabId?: string;
  className?: string;
  'aria-label'?: string;
};

export function DocInlineTabs({ tabs, defaultTabId, className, 'aria-label': ariaLabel }: Props) {
  const [activeId, setActiveId] = useState(defaultTabId ?? tabs[0]?.id ?? '');

  const active = tabs.find((tab) => tab.id === activeId) ?? tabs[0];

  if (!active) {
    return null;
  }

  return (
    <div className={cn('not-prose space-y-4', className)}>
      <div
        className={cn(
          'inline-flex max-w-full flex-wrap gap-px rounded-md border border-border bg-border p-px',
        )}
        role="tablist"
        aria-label={ariaLabel ?? 'Section tabs'}
      >
        {tabs.map((tab) => {
          const selected = tab.id === active.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              className={cn(
                docRadius,
                'cursor-pointer px-3 py-1.5 text-sm transition-colors',
                selected
                  ? 'bg-background font-medium text-foreground'
                  : 'bg-transparent text-muted-foreground hover:text-foreground',
              )}
              onClick={() => setActiveId(tab.id)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div role="tabpanel" className="min-w-0">
        {active.panel}
      </div>
    </div>
  );
}
