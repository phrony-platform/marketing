import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { docRadius } from '@/components/docs/doc-style';
import {
  QUICK_START_CONCEPTS,
  type QuickStartConceptId,
} from '@/lib/quick-start-data';
import { cn } from '@/lib/utils';

type Props = {
  concept: QuickStartConceptId;
  className?: string;
};

export function QuickStartConcept({ concept, className }: Props) {
  const entry = QUICK_START_CONCEPTS[concept];

  return (
    <aside
      className={cn(
        'not-prose border border-blue-200/90 border-l-4 border-l-blue-500 bg-blue-50/80 dark:border-blue-500/35 dark:bg-blue-950/40',
        docRadius,
        'px-4 py-3.5 sm:px-5 sm:py-4',
        className,
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-blue-900 dark:text-blue-200">
        Concept · {entry.title}
      </p>
      <p className="mt-2 text-[13px] leading-relaxed text-blue-950/90 dark:text-blue-50/90">{entry.brief}</p>
      <Link
        href={entry.href}
        className="mt-3 inline-flex cursor-pointer items-center gap-1 text-[13px] font-medium text-blue-900 underline underline-offset-4 hover:no-underline dark:text-blue-100"
      >
        {entry.linkLabel}
        <ArrowRight className="size-3.5" strokeWidth={2} aria-hidden />
      </Link>
    </aside>
  );
}
