import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { docCardLink, docIconBox } from '@/components/docs/doc-style';
import { cn } from '@/lib/utils';

export function DocCard({
  title,
  href,
  children,
  icon: Icon,
  className,
}: {
  title: string;
  href: string;
  children: ReactNode;
  icon?: LucideIcon;
  className?: string;
}) {
  return (
    <div className={cn(docCardLink, 'group h-full cursor-default', className)}>
      {Icon ? (
        <span className={docIconBox} aria-hidden>
          <Icon className="size-4" strokeWidth={1.5} />
        </span>
      ) : null}
      <h3 className={cn('text-base font-medium', Icon && 'mt-4')}>
        <Link
          href={href}
          className="text-foreground underline-offset-4 transition-colors hover:underline"
        >
          {title}
        </Link>
      </h3>
      <div className="mt-2 flex-1 text-pretty text-[13px] leading-relaxed text-muted-foreground [&_p]:m-0">
        {children}
      </div>
    </div>
  );
}

export function DocCardGroup({
  children,
  cols = 2,
  className,
}: {
  children: ReactNode;
  cols?: 1 | 2 | 3;
  className?: string;
}) {
  const gridClass =
    cols === 1
      ? 'grid-cols-1'
      : cols === 3
        ? 'sm:grid-cols-2 lg:grid-cols-3'
        : 'sm:grid-cols-2';

  return <div className={cn('not-prose grid gap-4', gridClass, className)}>{children}</div>;
}
