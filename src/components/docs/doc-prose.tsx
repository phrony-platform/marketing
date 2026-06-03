import type { ReactNode } from 'react';

import { unwrapSingleMdxParagraph } from '@/lib/unwrap-single-mdx-paragraph';

import {
  docBodyClass,
  docH2Class,
  docH2SectionDividerClass,
  docH3Class,
  docH4Class,
  docInlineCodeChildClass,
  docInlineCodeClass,
  docProseLinkSelectorClass,
} from '@/lib/docs-typography';
import { getNodeText, slugify } from '@/lib/slugify';
import { cn } from '@/lib/utils';

function resolveHeadingId(id: string | undefined, children: ReactNode): string | undefined {
  const text = getNodeText(children).trim();
  if (!text) {
    return id;
  }
  return id ?? slugify(text);
}

const docProseListClass =
  '[&_ol:not(.not-prose)]:list-outside [&_ol:not(.not-prose)]:list-decimal [&_ol:not(.not-prose)]:space-y-2 [&_ol:not(.not-prose)]:overflow-visible [&_ol:not(.not-prose)]:ps-7 [&_ul:not(.not-prose)]:list-outside [&_ul:not(.not-prose)]:list-disc [&_ul:not(.not-prose)]:space-y-2 [&_ul:not(.not-prose)]:overflow-visible [&_ul:not(.not-prose)]:ps-7';

export function DocProse({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('space-y-6', docProseLinkSelectorClass, docProseListClass, className)}>
      {children}
    </div>
  );
}

export function DocH2({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  const headingId = resolveHeadingId(id, children);

  return (
    <h2 id={headingId} className={cn(docH2Class, docH2SectionDividerClass, className)}>
      {children}
    </h2>
  );
}

export function DocH3({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  const headingId = resolveHeadingId(id, children);

  return (
    <h3 id={headingId} className={cn(docH3Class, className)}>
      {children}
    </h3>
  );
}

export function DocH4({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  const headingId = resolveHeadingId(id, children);

  return (
    <h4 id={headingId} className={cn(docH4Class, className)}>
      {children}
    </h4>
  );
}

export function DocParagraph({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn(docBodyClass, docInlineCodeChildClass, className)}>{children}</p>;
}

export function DocInlineCode({ children }: { children: ReactNode }) {
  return <code className={docInlineCodeClass}>{children}</code>;
}

export function DocList({
  ordered,
  children,
  className,
}: {
  ordered?: boolean;
  children: ReactNode;
  className?: string;
}) {
  const Tag = ordered ? 'ol' : 'ul';
  return (
    <Tag
      className={cn(
        'overflow-visible',
        ordered
          ? 'list-outside list-decimal space-y-2 ps-7 marker:font-normal marker:text-muted-foreground'
          : 'list-outside list-disc space-y-2 ps-7 marker:text-muted-foreground',
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function DocListItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <li className={cn(docBodyClass, docInlineCodeChildClass, className)}>
      {unwrapSingleMdxParagraph(children, [DocParagraph])}
    </li>
  );
}
