'use client';

import { Command } from 'cmdk';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Fuse from 'fuse.js';
import { ArrowRight, FileText, Hash, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { docLabel, docPanel, docRadius } from '@/components/docs/doc-style';
import type { DocSearchIndex, DocSearchItem } from '@/lib/docs-search-types';
import { cn } from '@/lib/utils';

const MAX_RESULTS = 12;

const backdropTransition = { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const };
const panelTransition = { duration: 0.24, ease: [0.22, 1, 0.36, 1] as const };

const overlayVariants = {
  open: {
    transition: { when: 'beforeChildren' as const },
  },
  closed: {
    transition: { when: 'afterChildren' as const, duration: 0.32 },
  },
};

const backdropVariants = {
  open: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
  },
  closed: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    backdropFilter: 'blur(0px)',
    WebkitBackdropFilter: 'blur(0px)',
  },
};

const panelVariants = {
  open: { opacity: 1, y: 0, scale: 1 },
  closed: { opacity: 0, y: -12, scale: 0.97 },
};

function ResultIcon({ type }: { type: DocSearchItem['type'] }) {
  if (type === 'heading') {
    return <Hash className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.75} aria-hidden />;
  }
  return <FileText className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.75} aria-hidden />;
}

type DocsSearchDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DocsSearchDialog({ open, onOpenChange }: DocsSearchDialogProps) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState<DocSearchIndex | null>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadIndex() {
      try {
        const response = await fetch('/docs-search.json', { cache: 'no-store' });
        if (!response.ok) {
          throw new Error('Failed to load docs search index');
        }
        const data = (await response.json()) as DocSearchIndex;
        if (!cancelled) {
          setIndex(data);
          setLoadError(false);
        }
      } catch {
        if (!cancelled) {
          setLoadError(true);
        }
      }
    }

    void loadIndex();
    return () => {
      cancelled = true;
    };
  }, []);

  const fuse = useMemo(() => {
    if (!index) {
      return null;
    }

    return new Fuse(index.items, {
      keys: [
        { name: 'title', weight: 0.45 },
        { name: 'content', weight: 0.35 },
        { name: 'description', weight: 0.15 },
        { name: 'section', weight: 0.05 },
      ],
      threshold: 0.38,
      ignoreLocation: true,
      minMatchCharLength: 2,
    });
  }, [index]);

  const results = useMemo(() => {
    const trimmed = query.trim();
    if (!fuse || !trimmed) {
      return [];
    }

    return fuse.search(trimmed).slice(0, MAX_RESULTS).map((result) => result.item);
  }, [fuse, query]);

  const close = useCallback(() => {
    onOpenChange(false);
    setQuery('');
  }, [onOpenChange]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [close, open]);

  const handleSelect = useCallback(
    (href: string) => {
      close();
      router.push(href);
    },
    [close, router],
  );

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="docs-search"
          className="fixed inset-0 z-[70] flex items-start justify-center p-4 pt-[12vh] sm:p-6"
          variants={overlayVariants}
          initial={reduceMotion ? false : 'closed'}
          animate="open"
          exit="closed"
        >
          <motion.button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label="Close search"
            onClick={close}
            variants={backdropVariants}
            transition={backdropTransition}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search documentation"
            className={cn(docPanel, docRadius, 'relative z-[71] w-full max-w-3xl overflow-hidden shadow-2xl')}
            variants={panelVariants}
            transition={panelTransition}
          >
            <Command shouldFilter={false} className="flex max-h-[min(70vh,32rem)] flex-col bg-background">
              <div className="flex items-center gap-3 border-b border-border px-4">
                <Search className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.75} aria-hidden />
                <Command.Input
                  value={query}
                  onValueChange={setQuery}
                  placeholder="Search documentation..."
                  className="h-12 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                  autoFocus
                />
                <kbd className="hidden rounded border border-border bg-muted/50 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline">
                  esc
                </kbd>
              </div>

              <Command.List className="max-h-[min(58vh,26rem)] overflow-y-auto overscroll-contain p-2">
                {loadError ? (
                  <div className="px-3 py-8 text-center text-sm text-muted-foreground">
                    Search index unavailable. Run <code className="text-foreground">pnpm build:docs-search</code>.
                  </div>
                ) : null}

                {!loadError && !index ? (
                  <div className="px-3 py-8 text-center text-sm text-muted-foreground">Loading search index...</div>
                ) : null}

                {!loadError && index && !query.trim() ? (
                  <div className="px-3 py-8 text-center text-sm text-muted-foreground">
                    Search pages, sections, and CLI commands across the docs.
                  </div>
                ) : null}

                {!loadError && index && query.trim() && results.length === 0 ? (
                  <Command.Empty className="px-3 py-8 text-center text-sm text-muted-foreground">
                    No results for &ldquo;{query.trim()}&rdquo;.
                  </Command.Empty>
                ) : null}

                {results.map((item) => (
                  <Command.Item
                    key={item.id}
                    value={item.id}
                    onSelect={() => handleSelect(item.href)}
                    className="flex cursor-pointer items-start gap-3 rounded-sm px-3 py-2.5 text-left outline-none aria-selected:bg-muted"
                  >
                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-sm border border-border bg-muted/40">
                      <ResultIcon type={item.type} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="truncate text-sm font-medium text-foreground">{item.title}</span>
                        <span className={cn(docLabel, 'shrink-0 rounded border border-border px-1.5 py-0.5')}>
                          {item.section}
                        </span>
                      </span>
                      {(item.group || item.description) && (
                        <span className="mt-1 block truncate text-xs text-muted-foreground">
                          {item.group}
                          {item.group && item.description ? ' · ' : ''}
                          {item.description}
                        </span>
                      )}
                    </span>
                    <ArrowRight className="mt-1 size-4 shrink-0 text-muted-foreground" strokeWidth={1.75} aria-hidden />
                  </Command.Item>
                ))}
              </Command.List>

              <div className="flex items-center justify-between border-t border-border px-4 py-2 text-[11px] text-muted-foreground">
                <span>Type to search</span>
                <span className="hidden sm:inline">
                  <kbd className="rounded border border-border bg-muted/50 px-1.5 py-0.5 font-medium">↑</kbd>
                  <kbd className="ml-1 rounded border border-border bg-muted/50 px-1.5 py-0.5 font-medium">↓</kbd>
                  <span className="mx-1.5">to navigate</span>
                  <kbd className="rounded border border-border bg-muted/50 px-1.5 py-0.5 font-medium">enter</kbd>
                  <span className="mx-1.5">to open</span>
                </span>
              </div>
            </Command>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

type DocsSearchTriggerProps = {
  className?: string;
};

export function DocsSearchTrigger({ className }: DocsSearchTriggerProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== 'k' || !(event.metaKey || event.ctrlKey)) {
        return;
      }

      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT')
      ) {
        return;
      }

      event.preventDefault();
      setOpen(true);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          docRadius,
          'flex h-9 w-full min-w-0 items-center gap-2 border border-border bg-background px-3 text-sm text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground',
          className,
        )}
        aria-label="Search documentation"
      >
        <Search className="size-4 shrink-0" strokeWidth={1.75} aria-hidden />
        <span className="flex-1 text-left">Search docs...</span>
        <kbd className="hidden rounded border border-border bg-muted/50 px-1.5 py-0.5 text-[10px] font-medium sm:inline">
          ⌘K
        </kbd>
      </button>
      <DocsSearchDialog open={open} onOpenChange={setOpen} />
    </>
  );
}

export function DocsSearchIconButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          'inline-flex size-9 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
          className,
        )}
        aria-label="Search documentation"
      >
        <Search className="size-5" strokeWidth={1.75} aria-hidden />
      </button>
      <DocsSearchDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
