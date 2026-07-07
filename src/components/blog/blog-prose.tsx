import type { ReactNode } from 'react';

import { getNodeText, slugify } from '@/lib/slugify';
import {
  blogBodyClass,
  blogH2Class,
  blogH2DividerClass,
  blogH3Class,
  blogH4Class,
  blogInlineCodeChildClass,
  blogInlineCodeClass,
  blogProseLinkSelectorClass,
} from '@/lib/blog-typography';
import { unwrapSingleMdxParagraph } from '@/lib/unwrap-single-mdx-paragraph';
import { cn } from '@/lib/utils';

function resolveHeadingId(id: string | undefined, children: ReactNode): string | undefined {
  const text = getNodeText(children).trim();
  if (!text) {
    return id;
  }
  return id ?? slugify(text);
}

const blogProseListClass =
  '[&_ol:not(.not-prose)]:list-outside [&_ol:not(.not-prose)]:list-decimal [&_ol:not(.not-prose)]:space-y-3 [&_ol:not(.not-prose)]:overflow-visible [&_ol:not(.not-prose)]:ps-6 [&_ul:not(.not-prose)]:list-outside [&_ul:not(.not-prose)]:list-disc [&_ul:not(.not-prose)]:space-y-3 [&_ul:not(.not-prose)]:overflow-visible [&_ul:not(.not-prose)]:ps-6';

export function BlogProse({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'space-y-7',
        blogProseLinkSelectorClass,
        blogProseListClass,
        '[&_p:first-of-type]:text-[19px] [&_p:first-of-type]:leading-[1.75] [&_p:first-of-type]:text-foreground/90 md:[&_p:first-of-type]:text-[20px]',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function BlogH2({
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
    <h2 id={headingId} className={cn(blogH2Class, blogH2DividerClass, className)}>
      {children}
    </h2>
  );
}

export function BlogH3({
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
    <h3 id={headingId} className={cn(blogH3Class, 'mt-10 first:mt-0', className)}>
      {children}
    </h3>
  );
}

export function BlogH4({
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
    <h4 id={headingId} className={cn(blogH4Class, 'mt-8 first:mt-0', className)}>
      {children}
    </h4>
  );
}

export function BlogParagraph({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn(blogBodyClass, blogInlineCodeChildClass, className)}>{children}</p>;
}

export function BlogInlineCode({ children }: { children: ReactNode }) {
  return <code className={blogInlineCodeClass}>{children}</code>;
}

export function BlogList({
  ordered,
  children,
  className,
}: {
  ordered?: boolean;
  children?: ReactNode;
  className?: string;
}) {
  const Tag = ordered ? 'ol' : 'ul';
  return (
    <Tag
      className={cn(
        'overflow-visible',
        ordered
          ? 'list-outside list-decimal space-y-3 ps-6 marker:font-normal marker:text-muted-foreground'
          : 'list-outside list-disc space-y-3 ps-6 marker:text-muted-foreground',
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function BlogListItem({ children, className }: { children?: ReactNode; className?: string }) {
  return (
    <li className={cn(blogBodyClass, blogInlineCodeChildClass, className)}>
      {unwrapSingleMdxParagraph(children, [BlogParagraph])}
    </li>
  );
}
