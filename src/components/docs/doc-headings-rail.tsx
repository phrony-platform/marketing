'use client';

import { usePathname } from 'next/navigation';

import { useDocHeadingsOptional } from '@/components/docs/doc-headings-context';
import { DocOnThisPage } from '@/components/docs/doc-on-this-page';
import { QuickStartRailChecklist } from '@/components/docs/quick-start/quick-start-rail-checklist';
import { isDocsHome, isQuickStartPath, isSdkLanguagePath } from '@/lib/docs-path';

export function DocHeadingsRail() {
  const pathname = usePathname();
  const context = useDocHeadingsOptional();

  if (isQuickStartPath(pathname)) {
    return <QuickStartRailChecklist />;
  }

  if (isSdkLanguagePath(pathname)) {
    return null;
  }

  if (isDocsHome(pathname) || !context || context.headings.length === 0) {
    return null;
  }

  return <DocOnThisPage headings={context.headings} />;
}
