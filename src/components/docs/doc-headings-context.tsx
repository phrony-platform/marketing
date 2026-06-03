'use client';

import { usePathname } from 'next/navigation';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import type { DocHeadingItem } from '@/components/docs/doc-on-this-page';

function collectHeadings(root: HTMLElement): DocHeadingItem[] {
  const used = new Set<string>();
  const items: DocHeadingItem[] = [];

  for (const element of root.querySelectorAll('h2[id], h3[id]')) {
    const baseId = element.id;
    if (!baseId) {
      continue;
    }

    let id = baseId;
    if (used.has(id)) {
      let suffix = 2;
      while (used.has(`${baseId}-${suffix}`)) {
        suffix += 1;
      }
      id = `${baseId}-${suffix}`;
      element.id = id;
    }

    used.add(id);
    items.push({
      id,
      text: (element.textContent ?? '').trim(),
      level: element.tagName === 'H2' ? 2 : 3,
    });
  }

  return items;
}

type DocHeadingsContextValue = {
  headings: DocHeadingItem[];
  setContentRoot: (node: HTMLDivElement | null) => void;
};

const DocHeadingsContext = createContext<DocHeadingsContextValue | null>(null);

export function DocHeadingsProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [contentRoot, setContentRootState] = useState<HTMLDivElement | null>(null);
  const [headings, setHeadings] = useState<DocHeadingItem[]>([]);

  const setContentRoot = useCallback((node: HTMLDivElement | null) => {
    setContentRootState(node);
  }, []);

  useEffect(() => {
    if (!contentRoot) {
      setHeadings([]);
      return;
    }

    const update = () => setHeadings(collectHeadings(contentRoot));

    update();

    const observer = new MutationObserver(update);
    observer.observe(contentRoot, { childList: true, subtree: true, characterData: true });

    return () => observer.disconnect();
  }, [contentRoot, pathname]);

  const value = useMemo(() => ({ headings, setContentRoot }), [headings, setContentRoot]);

  return <DocHeadingsContext.Provider value={value}>{children}</DocHeadingsContext.Provider>;
}

export function useDocHeadings() {
  const context = useContext(DocHeadingsContext);
  if (!context) {
    throw new Error('useDocHeadings must be used within DocHeadingsProvider');
  }
  return context;
}

export function useDocHeadingsOptional() {
  return useContext(DocHeadingsContext);
}
