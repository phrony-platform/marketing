import type { ReactNode } from 'react';

import { docPanel } from '@/components/docs/doc-style';
import { docInlineCodeChildClass } from '@/lib/docs-typography';
import { cn } from '@/lib/utils';

export function DocTable({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('not-prose overflow-x-auto', docPanel, className)}>
      <table className="w-full min-w-[32rem] border-collapse text-left text-sm">{children}</table>
    </div>
  );
}

export function DocTableHead({ children }: { children: ReactNode }) {
  return (
    <thead className="border-b border-border bg-muted/50 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
      {children}
    </thead>
  );
}

export function DocTableBody({ children }: { children: ReactNode }) {
  return <tbody className="divide-y divide-border">{children}</tbody>;
}

export function DocTableRow({ children }: { children: ReactNode }) {
  return <tr className="transition-colors hover:bg-muted/30">{children}</tr>;
}

export function DocTableHeaderCell({ children, className }: { children: ReactNode; className?: string }) {
  return <th className={cn('px-4 py-3 font-medium', className)}>{children}</th>;
}

export function DocTableCell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <td className={cn('px-4 py-3 align-top text-muted-foreground', className)}>
      <div className={cn('text-foreground', docInlineCodeChildClass)}>
        {children}
      </div>
    </td>
  );
}
