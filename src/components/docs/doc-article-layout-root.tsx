'use client';

import { type ReactNode } from 'react';

import { useDocHeadingsOptional } from '@/components/docs/doc-headings-context';
import { cn } from '@/lib/utils';

type Props = {
  children: ReactNode;
  className?: string;
};

/** Client wrapper that registers article content for the on-this-page heading rail. */
export function DocArticleLayoutRoot({ children, className }: Props) {
  const headingsContext = useDocHeadingsOptional();

  const setRef = (node: HTMLDivElement | null) => {
    headingsContext?.setContentRoot(node);
  };

  return (
    <div
      ref={headingsContext ? setRef : undefined}
      className={cn('doc-article-body min-w-0 max-w-3xl', className)}
    >
      {children}
    </div>
  );
}
