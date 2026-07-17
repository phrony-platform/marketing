'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import { docLabel } from '@/components/docs/doc-style';
import type { DocNavLink, DocTab } from '@/lib/docs-navigation';
import { DOC_SCROLL_OFFSET_PX, scrollToDocHeading } from '@/lib/docs-scroll';
import { isNavBranchActive, isNavLinkActive, isSdkLanguagePath } from '@/lib/docs-path';
import { resolveDocSidebarGroupPages } from '@/lib/typescript-sdk-nav';
import { cn } from '@/lib/utils';

type Props = {
  tab: DocTab;
};

function navLinkClassName(active: boolean) {
  return cn(
    'block w-full cursor-pointer rounded-sm px-2 py-1.5 text-left text-sm transition-colors',
    active
      ? 'bg-muted font-medium text-foreground'
      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
  );
}

function getHrefHash(href: string): string | undefined {
  const hash = href.split('#')[1];
  return hash || undefined;
}

function DocSidebarNavItem({
  page,
  pathname,
  activeHash,
  onNavigate,
  depth = 0,
}: {
  page: DocNavLink;
  pathname: string;
  activeHash: string;
  onNavigate: () => void;
  depth?: number;
}) {
  const hasChildren = (page.children?.length ?? 0) > 0;
  const branchActive = isNavBranchActive(pathname, page, activeHash);
  const linkActive = isNavLinkActive(pathname, page.href, activeHash);
  const [expanded, setExpanded] = useState(branchActive);
  const hash = getHrefHash(page.href);

  useEffect(() => {
    if (branchActive) {
      setExpanded(true);
    }
  }, [branchActive, pathname]);

  const handleHashClick = () => {
    if (hash) {
      scrollToDocHeading(hash);
    }
    onNavigate();
  };

  if (!hasChildren) {
    if (hash) {
      return (
        <li>
          <button
            type="button"
            className={navLinkClassName(linkActive)}
            style={depth > 0 ? { paddingLeft: `${depth * 0.75 + 0.5}rem` } : undefined}
            aria-current={linkActive ? 'true' : undefined}
            onClick={handleHashClick}
          >
            {page.title}
          </button>
        </li>
      );
    }

    return (
      <li>
        <Link
          href={page.href}
          className={navLinkClassName(linkActive)}
          style={depth > 0 ? { paddingLeft: `${depth * 0.75 + 0.5}rem` } : undefined}
          aria-current={linkActive ? 'page' : undefined}
          onClick={onNavigate}
        >
          {page.title}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <div
        className={cn(
          'flex cursor-pointer items-stretch gap-px rounded-sm transition-colors hover:bg-muted/50',
          branchActive && !linkActive && 'bg-muted/30',
        )}
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
        onClick={() => setExpanded((open) => !open)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setExpanded((open) => !open);
          }
        }}
      >
        <Link
          href={page.href}
          className={cn(navLinkClassName(linkActive), 'min-w-0 flex-1 hover:bg-transparent')}
          aria-current={linkActive ? 'page' : undefined}
          onClick={(event) => {
            event.stopPropagation();
            onNavigate();
          }}
        >
          {page.title}
        </Link>
        <span
          className={cn(
            'inline-flex shrink-0 items-center justify-center px-1.5 text-muted-foreground',
            branchActive && 'text-foreground',
          )}
          aria-hidden
        >
          <ChevronDown className={cn('size-4 transition-transform', expanded ? 'rotate-180' : 'rotate-0')} />
        </span>
      </div>
      {expanded ? (
        <ul className="mt-px flex flex-col gap-px border-l border-border/70 ml-3 pl-1">
          {page.children?.map((child) => (
            <DocSidebarNavItem
              key={child.href}
              page={child}
              pathname={pathname}
              activeHash={activeHash}
              onNavigate={onNavigate}
              depth={depth + 1}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

const SDK_SECTION_IDS = [
  'install',
  'connect',
  'run',
  'interactive-session',
  'worker',
  'runtime-client',
  'utilities',
];

export function DocSidebar({ tab }: Props) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('');
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

  useEffect(() => {
    const readHash = () => setActiveHash(window.location.hash.replace(/^#/, ''));

    readHash();
    window.addEventListener('hashchange', readHash);
    return () => window.removeEventListener('hashchange', readHash);
  }, [pathname]);

  useEffect(() => {
    if (!isSdkLanguagePath(pathname)) {
      return;
    }

    const elements = SDK_SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (element): element is HTMLElement => element != null,
    );

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) {
          return;
        }

        visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        setActiveHash(visible[0].target.id);
      },
      {
        rootMargin: `-${DOC_SCROLL_OFFSET_PX}px 0px -70% 0px`,
        threshold: [0, 1],
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [pathname]);

  const nav = (
    <nav className="space-y-8" aria-label={`${tab.label} topics`}>
      {tab.groups.map((group) => (
        <div key={group.group}>
          <p className={cn(docLabel, 'px-2')}>{group.group}</p>
          <ul className="mt-2 flex flex-col gap-px">
            {resolveDocSidebarGroupPages(tab.id, group, pathname).map((page) => (
              <DocSidebarNavItem
                key={page.href}
                page={page}
                pathname={pathname}
                activeHash={activeHash ? `#${activeHash}` : ''}
                onNavigate={closeMobile}
              />
            ))}
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
