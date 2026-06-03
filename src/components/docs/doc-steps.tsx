import type { ReactNode } from 'react';

import { docBodyClass, docInlineCodeChildClass } from '@/lib/docs-typography';
import { cn } from '@/lib/utils';

export function DocSteps({ children }: { children: ReactNode }) {
  return (
    <ol
      className={cn(
        'not-prose list-none ps-0 [counter-reset:doc-step] space-y-8',
        docBodyClass,
      )}
    >
      {children}
    </ol>
  );
}

export function DocStep({ title, children }: { title: string; children: ReactNode }) {
  return (
    <li className={cn('relative ps-10 [counter-increment:doc-step]', docInlineCodeChildClass)}>
      <span
        className="absolute left-0 top-0.5 flex size-7 items-center justify-center rounded-full border border-border bg-muted/40 font-mono text-xs font-medium text-foreground before:content-[counter(doc-step)]"
        aria-hidden
      />
      <p className="font-medium text-foreground">{title}</p>
      <div className="mt-3 space-y-3 [&_pre]:mt-3">{children}</div>
    </li>
  );
}
