'use client';

import { useEffect, useState } from 'react';

import type { CodePanelSize } from '@/components/code-panel-illustration';

/** Viewports below Tailwind `sm` (640px) use the compact code panel metrics. */
const COMPACT_MEDIA_QUERY = '(max-width: 639px)';

/** Responsive `CodePanelSize` for hero-scale illustrations (compact on narrow viewports). */
export function useCodePanelSize(): CodePanelSize {
  const [size, setSize] = useState<CodePanelSize>('default');

  useEffect(() => {
    const mq = window.matchMedia(COMPACT_MEDIA_QUERY);
    function onChange() {
      setSize(mq.matches ? 'compact' : 'default');
    }
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return size;
}
