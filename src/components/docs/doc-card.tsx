import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { isValidElement, type ReactNode } from 'react';

import { docCardLink, docIconBox } from '@/components/docs/doc-style';
import { cn } from '@/lib/utils';

export type DocCardIcon = LucideIcon | ReactNode;

function renderDocCardIcon(icon: DocCardIcon) {
  if (isValidElement(icon)) {
    return icon;
  }
  const Icon = icon as LucideIcon;
  return <Icon className="size-4" strokeWidth={1.5} />;
}

export function DocCard({
  title,
  href,
  children,
  icon,
  iconBox = true,
  className,
}: {
  title: string;
  href: string;
  children: ReactNode;
  icon?: DocCardIcon;
  iconBox?: boolean;
  className?: string;
}) {
  return (
    <Link href={href} className={cn(docCardLink, 'group h-full', className)}>
      {icon ? (
        iconBox ? (
          <span className={docIconBox} aria-hidden>
            {renderDocCardIcon(icon)}
          </span>
        ) : (
          renderDocCardIcon(icon)
        )
      ) : null}
      <h3 className={cn('text-base font-medium text-foreground', icon && 'mt-4')}>{title}</h3>
      <div className="mt-2 flex-1 text-pretty text-[13px] leading-relaxed text-muted-foreground [&_p]:m-0">
        {children}
      </div>
    </Link>
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
