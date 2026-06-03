'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { docTabLink, docTabLinkActive, docTabLinkInactive } from '@/components/docs/doc-style';
import { DOC_TABS } from '@/lib/docs-navigation';
import { isDocsHome, normalizeDocsPath } from '@/lib/docs-path';
import { cn } from '@/lib/utils';

export function DocTabs() {
  const pathname = usePathname();
  const normalized = normalizeDocsPath(pathname);

  return (
    <div className="border-b border-border bg-muted/30">
      <div className="mx-auto flex w-full max-w-[1488px] gap-1 overflow-x-auto px-5 md:px-8">
        {DOC_TABS.map((tab) => {
          const isActive =
            tab.id === 'home'
              ? isDocsHome(pathname)
              : normalized === tab.href || normalized.startsWith(`${tab.href}/`);

          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={cn(
                docTabLink,
                isActive ? docTabLinkActive : docTabLinkInactive,
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
