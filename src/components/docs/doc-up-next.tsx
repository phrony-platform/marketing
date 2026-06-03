import type { ReactNode } from 'react';

import { DocCardGroup } from '@/components/docs/doc-card';
import { docLabel } from '@/components/docs/doc-style';

export function DocUpNext({ children }: { children: ReactNode }) {
  return (
    <section className="not-prose border-t border-border pt-8" aria-labelledby="doc-up-next-heading">
      <p id="doc-up-next-heading" className={docLabel}>
        Up next
      </p>
      <DocCardGroup cols={2} className="mt-3">
        {children}
      </DocCardGroup>
    </section>
  );
}
