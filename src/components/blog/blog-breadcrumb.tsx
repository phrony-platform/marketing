import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';

type BlogBreadcrumbProps = {
  current?: string;
  className?: string;
};

export function BlogBreadcrumb({ current, className }: BlogBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('text-sm', className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
        <li>
          <Link
            href="/blog"
            className="transition-colors hover:text-foreground"
          >
            Blog
          </Link>
        </li>
        {current ? (
          <>
            <li aria-hidden>
              <ChevronRight className="size-3.5 opacity-50" strokeWidth={2} />
            </li>
            <li className="truncate font-medium text-foreground">{current}</li>
          </>
        ) : null}
      </ol>
    </nav>
  );
}
