'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { QUICK_START_COMPLETE_HREF } from '@/lib/quick-start-data';
import { isQuickStartPath, normalizeDocsPath } from '@/lib/docs-path';
import { useQuickStartProgress } from '@/lib/quick-start-progress-context';

/** Navigates to the completion page when the user finishes the last checklist step. */
export function QuickStartCompletionRedirect() {
  const pathname = usePathname();
  const router = useRouter();
  const { hydrated, completedSteps, totalSteps } = useQuickStartProgress();
  const previousSteps = useRef<number | null>(null);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    const path = normalizeDocsPath(pathname);
    if (path === QUICK_START_COMPLETE_HREF || !isQuickStartPath(pathname)) {
      previousSteps.current = completedSteps;
      return;
    }

    const prev = previousSteps.current;
    previousSteps.current = completedSteps;

    if (prev !== null && prev < totalSteps && completedSteps >= totalSteps) {
      router.push(QUICK_START_COMPLETE_HREF);
    }
  }, [hydrated, completedSteps, totalSteps, pathname, router]);

  return null;
}
