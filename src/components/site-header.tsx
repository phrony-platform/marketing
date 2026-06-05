'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Github, Menu, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { PhronyLogo } from '@/components/phrony-logo';
import { documentationHref } from '@/lib/docs-url';
import { PHRONY_GITHUB_ORG_URL } from '@/lib/project-urls';

const mobileLinkClass =
  'block rounded-md px-2 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted';

const headerButtonBase =
  'inline-flex shrink-0 items-center justify-center rounded-md px-3 py-2 text-xs font-medium transition-colors sm:px-4 sm:text-sm';

export function SiteHeader() {
  const pathname = usePathname();
  const inDocs = pathname.startsWith('/docs');
  const [mobileOpen, setMobileOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setMobileOpen(false);
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    function onMatch() {
      if (mq.matches) {
        setMobileOpen(false);
      }
    }
    mq.addEventListener('change', onMatch);
    return () => mq.removeEventListener('change', onMatch);
  }, []);

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (!mobileOpen) {
        return;
      }
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        const target = e.target as HTMLElement;
        if (target.closest('[data-mobile-nav-trigger]')) {
          return;
        }
        setMobileOpen(false);
      }
    }
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [mobileOpen]);

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

  return (
    <header className="sticky top-0 z-50 isolate border-b border-border bg-background text-foreground">
      <div className="relative z-60 mx-auto flex h-16 w-full max-w-[1488px] items-center justify-between gap-4 bg-background px-5 md:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <Link href="/" className="flex shrink-0 items-center">
            <PhronyLogo priority className="h-6 w-auto" />
          </Link>
          {inDocs ? (
            <Link
              href={documentationHref}
              className="truncate text-sm font-medium tracking-tight text-foreground"
            >
              Documentation
            </Link>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 md:gap-3">
          <a
            href={PHRONY_GITHUB_ORG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-transparent text-foreground transition-colors hover:bg-muted"
            aria-label="GitHub"
          >
            <Github className="size-5" strokeWidth={1.75} aria-hidden />
          </a>
          {!inDocs ? (
            <Link
              href={documentationHref}
              className={`${headerButtonBase} gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 sm:gap-2`}
            >
              <BookOpen className="size-4 shrink-0" strokeWidth={1.75} aria-hidden />
              Documentation
            </Link>
          ) : null}
          <button
            type="button"
            data-mobile-nav-trigger
            className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-primary-nav"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? (
              <X className="size-5" strokeWidth={1.75} aria-hidden />
            ) : (
              <Menu className="size-5" strokeWidth={1.75} aria-hidden />
            )}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            aria-hidden
            onClick={closeMobile}
          />
          <div
            ref={panelRef}
            id="mobile-primary-nav"
            className="fixed left-0 right-0 top-[calc(4rem+1px)] z-50 border-b border-border bg-background shadow-[0_16px_48px_-12px_rgba(0,0,0,0.45)] md:hidden"
          >
            <nav
              className="max-h-[calc(100dvh-4.25rem)] overflow-y-auto overscroll-contain px-5 py-4"
              aria-label="Primary"
            >
              <ul className="flex flex-col gap-0.5">
                <li>
                  <Link href="/about" className={mobileLinkClass} onClick={closeMobile}>
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href={documentationHref}
                    className="flex items-start gap-3 rounded-md px-2 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                    onClick={closeMobile}
                  >
                    <span
                      className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border/60 bg-muted/35 text-muted-foreground"
                      aria-hidden
                    >
                      <BookOpen className="size-4" strokeWidth={1.75} />
                    </span>
                    <span className="min-w-0">
                      Documentation
                      <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                        Agent spec, runtime, and CLI guides.
                      </span>
                    </span>
                  </Link>
                </li>
                <li>
                  <a
                    href={PHRONY_GITHUB_ORG_URL}
                    className={mobileLinkClass}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobile}
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </>
      ) : null}
    </header>
  );
}
