'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import { docLabel } from '@/components/docs/doc-style';
import type { DocTab } from '@/lib/docs-navigation';
import { isNavLinkActive } from '@/lib/docs-path';
import { cn } from '@/lib/utils';

type Props = {
  tab: DocTab;
};

export function DocSidebar({ tab }: Props) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const nav = (
    <nav className="space-y-8" aria-label={`${tab.label} topics`}>
      {tab.groups.map((group) => (
        <div key={group.group}>
          <p className={cn(docLabel, 'px-2')}>{group.group}</p>
          <ul className="mt-2 flex flex-col gap-px">
            {group.pages.map((page) => {
              const active = isNavLinkActive(pathname, page.href);
              return (
                <li key={page.href}>
                  <Link
                    href={page.href}
                    className={cn(
                      'block cursor-pointer rounded-sm px-2 py-1.5 text-sm transition-colors',
                      active
                        ? 'bg-muted font-medium text-foreground'
                        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
                    )}
                    aria-current={active ? 'page' : undefined}
                    onClick={closeMobile}
                  >
                    {page.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-3 lg:hidden">
        <p className="text-sm font-medium text-foreground">{tab.label}</p>
        <button
          type="button"
          className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X className="size-4" aria-hidden /> : <Menu className="size-4" aria-hidden />}
          Topics
        </button>
      </div>

      {mobileOpen ? (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          aria-hidden
          onClick={closeMobile}
        />
      ) : null}

      <aside
        className={cn(
          'lg:sticky lg:top-[calc(4rem+1px+2.75rem)] lg:max-h-[calc(100dvh-4rem-2.75rem-2rem)] lg:w-56 lg:shrink-0 lg:overflow-y-auto lg:overscroll-contain lg:pr-4 lg:pb-8 scroll-compact',
          mobileOpen
            ? 'fixed left-0 top-[calc(4rem+1px)] z-50 h-[calc(100dvh-4rem-1px)] w-[min(100%,20rem)] overflow-y-auto border-r border-border bg-background p-4 shadow-xl lg:static lg:h-auto lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none'
            : 'hidden lg:block',
        )}
      >
        {nav}
      </aside>
    </>
  );
}
