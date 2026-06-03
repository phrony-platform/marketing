import type { ReactNode } from 'react';

import { DocsShellClient } from '@/components/docs/docs-shell-client';
import { DocTabs } from '@/components/docs/doc-tabs';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export function DocsShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <DocTabs />
      <DocsShellClient>{children}</DocsShellClient>
      <SiteFooter />
    </div>
  );
}
