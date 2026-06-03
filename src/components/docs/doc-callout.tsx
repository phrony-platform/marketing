import {
  AlertCircle,
  AlertTriangle,
  Info,
  Lightbulb,
  StickyNote,
  type LucideIcon,
} from 'lucide-react';
import type { ReactNode } from 'react';

import { docLabel, docRadius } from '@/components/docs/doc-style';
import { cn } from '@/lib/utils';

type CalloutVariant = 'note' | 'info' | 'tip' | 'warning' | 'danger';

const variantMeta: Record<
  CalloutVariant,
  { label: string; icon: LucideIcon; container: string; heading: string; body: string }
> = {
  note: {
    label: 'Note',
    icon: StickyNote,
    container:
      'border-amber-200/90 bg-amber-50/90 dark:border-amber-500/35 dark:bg-amber-950/45',
    heading: 'text-amber-900 dark:text-amber-200',
    body: 'text-amber-950/85 dark:text-amber-50/90 [&_strong]:text-amber-950 dark:[&_strong]:text-amber-50',
  },
  info: {
    label: 'Info',
    icon: Info,
    container: 'border-sky-200/90 bg-sky-50/90 dark:border-sky-500/35 dark:bg-sky-950/45',
    heading: 'text-sky-900 dark:text-sky-200',
    body: 'text-sky-950/85 dark:text-sky-50/90 [&_strong]:text-sky-950 dark:[&_strong]:text-sky-50',
  },
  tip: {
    label: 'Tip',
    icon: Lightbulb,
    container:
      'border-emerald-200/90 bg-emerald-50/90 dark:border-emerald-500/35 dark:bg-emerald-950/45',
    heading: 'text-emerald-900 dark:text-emerald-200',
    body: 'text-emerald-950/85 dark:text-emerald-50/90 [&_strong]:text-emerald-950 dark:[&_strong]:text-emerald-50',
  },
  warning: {
    label: 'Warning',
    icon: AlertTriangle,
    container:
      'border-orange-200/90 bg-orange-50/90 dark:border-orange-500/35 dark:bg-orange-950/45',
    heading: 'text-orange-900 dark:text-orange-200',
    body: 'text-orange-950/85 dark:text-orange-50/90 [&_strong]:text-orange-950 dark:[&_strong]:text-orange-50',
  },
  danger: {
    label: 'Danger',
    icon: AlertCircle,
    container: 'border-red-200/90 bg-red-50/90 dark:border-red-500/35 dark:bg-red-950/45',
    heading: 'text-red-900 dark:text-red-200',
    body: 'text-red-950/85 dark:text-red-50/90 [&_strong]:text-red-950 dark:[&_strong]:text-red-50',
  },
};

const accentBorder: Record<CalloutVariant, string> = {
  note: 'border-l-amber-500 dark:border-l-amber-400',
  info: 'border-l-sky-500 dark:border-l-sky-400',
  tip: 'border-l-emerald-500 dark:border-l-emerald-400',
  warning: 'border-l-orange-500 dark:border-l-orange-400',
  danger: 'border-l-red-500 dark:border-l-red-400',
};

type Props = {
  variant?: CalloutVariant;
  title?: string;
  children: ReactNode;
  className?: string;
};

export function DocCallout({ variant = 'note', title, children, className }: Props) {
  const meta = variantMeta[variant];
  const heading = title ?? meta.label;
  const Icon = meta.icon;

  return (
    <aside
      className={cn(
        'not-prose border border-l-4',
        docRadius,
        meta.container,
        accentBorder[variant],
        'px-4 py-3.5 sm:px-5 sm:py-4',
        className,
      )}
    >
      <div className="flex items-start gap-2.5">
        <Icon className={cn('mt-0.5 size-4 shrink-0', meta.heading)} strokeWidth={2} aria-hidden />
        <div className="min-w-0 flex-1">
          <p className={cn(docLabel, meta.heading)}>{heading}</p>
          <div
            className={cn(
              'mt-2 text-[13px] leading-relaxed',
              meta.body,
              '[&_a]:cursor-pointer [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-4',
              '[&_a]:decoration-current/40 [&_a:hover]:decoration-current',
              '[&_code]:rounded-sm [&_code]:bg-black/5 [&_code]:px-1 [&_code]:py-0 [&_code]:font-mono [&_code]:text-[0.85em] dark:[&_code]:bg-white/10',
              '[&_p+p]:mt-2',
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </aside>
  );
}

export function DocNote(props: Omit<Props, 'variant'>) {
  return <DocCallout variant="note" {...props} />;
}

export function DocInfo(props: Omit<Props, 'variant'>) {
  return <DocCallout variant="info" {...props} />;
}

export function DocWarning(props: Omit<Props, 'variant'>) {
  return <DocCallout variant="warning" {...props} />;
}

export function DocDanger(props: Omit<Props, 'variant'>) {
  return <DocCallout variant="danger" {...props} />;
}
