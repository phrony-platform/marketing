import type { ReactNode } from 'react';

import { blogBodyClass, blogInlineCodeChildClass } from '@/lib/blog-typography';
import { cn } from '@/lib/utils';

const blogTableBreakoutClass =
  'not-prose relative left-1/2 my-10 w-[min(1120px,calc(100vw-2.5rem))] -translate-x-1/2';

export function BlogTable({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn(blogTableBreakoutClass, 'overflow-x-auto rounded-xl border border-border/80 bg-card shadow-[0_8px_30px_-18px_rgba(0,0,0,0.35)]', className)}>
      <table className="w-full min-w-[44rem] border-collapse text-left text-[15px] leading-relaxed">{children}</table>
    </div>
  );
}

export function BlogTableHead({ children }: { children: ReactNode }) {
  return (
    <thead className="border-b border-border/80 bg-muted/40 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
      {children}
    </thead>
  );
}

export function BlogTableBody({ children }: { children: ReactNode }) {
  return <tbody className="divide-y divide-border/70">{children}</tbody>;
}

export function BlogTableRow({ children }: { children: ReactNode }) {
  return <tr className="transition-colors hover:bg-muted/20">{children}</tr>;
}

export function BlogTableHeaderCell({ children, className }: { children: ReactNode; className?: string }) {
  return <th className={cn('px-5 py-3.5 font-medium whitespace-nowrap', className)}>{children}</th>;
}

export function BlogTableCell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <td className={cn('px-5 py-3.5 align-top text-muted-foreground', className)}>
      <div className={cn(blogBodyClass, 'text-[15px] leading-relaxed', blogInlineCodeChildClass)}>{children}</div>
    </td>
  );
}
