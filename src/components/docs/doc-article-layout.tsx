import type { ReactNode } from 'react';

import { DocArticleLayoutRoot } from '@/components/docs/doc-article-layout-root';

type Props = {
  children: ReactNode;
  className?: string;
};

export function DocArticleLayout({ children, className }: Props) {
  return <DocArticleLayoutRoot className={className}>{children}</DocArticleLayoutRoot>;
}
