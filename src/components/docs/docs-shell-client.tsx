'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

import { DocHeadingsProvider } from '@/components/docs/doc-headings-context';
import { DocHeadingsRail } from '@/components/docs/doc-headings-rail';
import { DocSidebar } from '@/components/docs/doc-sidebar';
import { QuickStartCompletionRedirect } from '@/components/docs/quick-start/quick-start-completion-redirect';
import { getDocTabForPath } from '@/lib/docs-navigation';
import { docsPathShowsSidebar, isDocsHome, isQuickStartPath } from '@/lib/docs-path';
import { QuickStartProgressProvider } from '@/lib/quick-start-progress-context';
import { cn } from '@/lib/utils';

type Props = {
  children: ReactNode;
};

export function DocsShellClient({ children }: Props) {
  const pathname = usePathname();
  const tab = getDocTabForPath(pathname);
  const showSidebar = docsPathShowsSidebar(pathname) && tab;
  const onHome = isDocsHome(pathname);
  const showHeadingsRail = !onHome;
  const isQuickStart = isQuickStartPath(pathname);

  const docBody = (
    <div
      className={cn(
        'flex flex-1 flex-col gap-8',
        showSidebar && 'lg:flex-row lg:gap-10 xl:gap-12',
      )}
    >
      {showSidebar && tab ? <DocSidebar tab={tab} /> : null}
      <div
        className={cn(
          'flex min-w-0 flex-1 flex-col gap-8',
          showHeadingsRail && 'lg:flex-row lg:items-start lg:gap-10 xl:gap-12',
        )}
      >
        <main className="min-w-0 flex-1">{children}</main>
        {showHeadingsRail ? <DocHeadingsRail /> : null}
      </div>
    </div>
  );

  return (
    <DocHeadingsProvider>
      <div
        className={cn(
          'mx-auto flex w-full max-w-[1488px] flex-1 flex-col',
          onHome ? 'px-0 py-0' : 'px-5 py-8 md:px-8 md:py-10',
        )}
      >
        {isQuickStart ? (
          <QuickStartProgressProvider>
            <QuickStartCompletionRedirect />
            {docBody}
          </QuickStartProgressProvider>
        ) : (
          docBody
        )}
      </div>
    </DocHeadingsProvider>
  );
}
