import type { ReactNode } from 'react';

import { DocArticleLayout } from '@/components/docs/doc-article-layout';
import { docLeadClass } from '@/lib/docs-typography';
import { cn } from '@/lib/utils';

type Props = {
  title: string;
  description?: string;
  eyebrow?: string;
  /** Optional branding or illustration shown below the page description. */
  headerVisual?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function DocPage({
  title,
  description,
  eyebrow = 'Documentation',
  headerVisual,
  children,
  className,
}: Props) {
  return (
    <article className={cn('min-w-0', className)}>
      <header className="border-b border-border pb-8 md:pb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {eyebrow}
        </p>
        <h1 className="mt-3 font-sans text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-[2.35rem] md:leading-[1.12]">
          {title}
        </h1>
        {description ? <p className={cn('mt-4 max-w-2xl', docLeadClass)}>{description}</p> : null}
        {headerVisual ? <div className="mt-5 not-prose">{headerVisual}</div> : null}
      </header>
      <DocArticleLayout className="mt-8 md:mt-10">
        <div className="space-y-8">{children}</div>
      </DocArticleLayout>
    </article>
  );
}
