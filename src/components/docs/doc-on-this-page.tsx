'use client';

import { useEffect, useState } from 'react';

import { docLabel } from '@/components/docs/doc-style';
import { DOC_SCROLL_OFFSET_PX, scrollToDocHeading } from '@/lib/docs-scroll';
import { cn } from '@/lib/utils';

export type DocHeadingItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

type Props = {
  headings: DocHeadingItem[];
  className?: string;
};

export function DocOnThisPage({ headings, className }: Props) {
  const [activeId, setActiveId] = useState<string | null>(headings[0]?.id ?? null);

  useEffect(() => {
    if (headings.length === 0) {
      setActiveId(null);
      return;
    }

    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => element != null);

    if (elements.length === 0) {
      return;
    }

    const applyHash = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (!hash || !elements.some((element) => element.id === hash)) {
        return;
      }
      setActiveId(hash);
      requestAnimationFrame(() => scrollToDocHeading(hash));
    };

    applyHash();
    window.addEventListener('hashchange', applyHash);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) {
          return;
        }

        visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        setActiveId(visible[0].target.id);
      },
      {
        rootMargin: `-${DOC_SCROLL_OFFSET_PX}px 0px -70% 0px`,
        threshold: [0, 1],
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      window.removeEventListener('hashchange', applyHash);
      observer.disconnect();
    };
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav
      className={cn(
        'hidden w-52 shrink-0 lg:block',
        'sticky top-[calc(4rem+1px+2.75rem)] max-h-[calc(100dvh-4rem-2.75rem-2rem)] overflow-y-auto overscroll-contain scroll-compact',
        className,
      )}
      aria-label="On this page"
    >
      <p className={docLabel}>On this page</p>
      <ul className="mt-3 space-y-2 border-l border-border">
        {headings.map((heading, index) => {
          const isActive = heading.id === activeId;

          return (
            <li
              key={`${heading.id}-${index}`}
              className={cn(heading.level === 3 && 'pl-3')}
            >
              <button
                type="button"
                onClick={() => scrollToDocHeading(heading.id)}
                className={cn(
                  'block w-full cursor-pointer border-l-2 py-0.5 pl-3 text-left text-[13px] leading-snug transition-colors',
                  heading.level === 2 ? '-ml-px' : '-ml-px',
                  isActive
                    ? 'border-foreground font-medium text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground',
                )}
              >
                {heading.text}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
