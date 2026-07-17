import type { ComponentProps, ReactElement, ReactNode } from 'react';
import { Children, isValidElement } from 'react';
import Link from 'next/link';

import { BlogExpandableImage } from '@/components/blog/blog-expandable-image';
import { DocCallout, DocCodeBlock, DocInfo, DocNote } from '@/components/docs';
import {
  BlogH2,
  BlogH3,
  BlogH4,
  BlogInlineCode,
  BlogList,
  BlogListItem,
  BlogParagraph,
} from '@/components/blog/blog-prose';
import {
  BlogTable,
  BlogTableBody,
  BlogTableCell,
  BlogTableHead,
  BlogTableHeaderCell,
  BlogTableRow,
} from '@/components/blog/blog-table';
import { normalizeDocCodeLanguage } from '@/lib/doc-code-language';
import { blogLinkClass } from '@/lib/blog-typography';
import { cn } from '@/lib/utils';

function isMeaningfulNode(node: ReactNode): boolean {
  return !(typeof node === 'string' && node.trim() === '');
}

function MdxLink({ href, children, ...props }: ComponentProps<'a'>) {
  if (!href) {
    return <a {...props}>{children}</a>;
  }

  const isInternal = href.startsWith('/') && !href.startsWith('//');

  if (isInternal) {
    return (
      <Link href={href} className={blogLinkClass} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={blogLinkClass} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

function extractCode(child: ReactNode): { language: string; code: string } {
  if (!isValidElement(child)) {
    return { language: 'text', code: '' };
  }

  const props = child.props as { className?: string; children?: ReactNode };
  const className = props.className ?? '';
  const match = /language-([\w-]+)/.exec(className);
  const language = match?.[1] ?? 'text';
  const code = String(props.children ?? '').replace(/\n$/, '');

  return { language, code };
}

function MdxPre({ children }: { children?: ReactNode }) {
  const child = Children.only(children) as ReactElement;
  const { language, code } = extractCode(child);

  return (
    <div className="not-prose relative left-1/2 my-10 w-[min(1120px,calc(100vw-2.5rem))] -translate-x-1/2">
      <DocCodeBlock language={normalizeDocCodeLanguage(language)} code={code} />
    </div>
  );
}

function MdxCode({ children, className, ...props }: ComponentProps<'code'>) {
  if (className?.includes('language-')) {
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  }

  return <BlogInlineCode {...props}>{children}</BlogInlineCode>;
}

function MdxBlockquote({ children, className }: ComponentProps<'blockquote'>) {
  return (
    <blockquote
      className={cn(
        'my-10 border-l-[3px] border-foreground/15 py-1 pl-6 font-sans text-[18px] italic leading-[1.75] text-muted-foreground',
        className,
      )}
    >
      {children}
    </blockquote>
  );
}

function MdxImg({ src, alt, title }: ComponentProps<'img'>) {
  if (!src || typeof src !== 'string') {
    return null;
  }

  if (src.startsWith('/')) {
    return <BlogExpandableImage src={src} alt={alt} title={title} />;
  }

  return (
    <figure className="my-10 overflow-hidden rounded-xl border border-border/80">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt ?? ''} title={title} className="h-auto w-full" loading="lazy" />
      {alt ? (
        <figcaption className="border-t border-border/60 bg-muted/15 px-4 py-3 text-center text-sm text-muted-foreground">
          {alt}
        </figcaption>
      ) : null}
    </figure>
  );
}

// MDX wraps standalone images in <p>; MdxImg renders <figure>, which is invalid inside <p>.
function MdxParagraph({ children, className }: ComponentProps<'p'>) {
  const nodes = Children.toArray(children).filter(isMeaningfulNode);
  if (nodes.length === 1 && isValidElement(nodes[0]) && nodes[0].type === MdxImg) {
    return nodes[0];
  }

  return <BlogParagraph className={className}>{children}</BlogParagraph>;
}

export const blogMdxComponents = {
  Note: DocNote,
  Info: DocInfo,
  Tip: (props: ComponentProps<typeof DocCallout>) => <DocCallout variant="tip" {...props} />,
  h2: BlogH2,
  h3: BlogH3,
  h4: BlogH4,
  p: MdxParagraph,
  ul: ({ children, className }: ComponentProps<'ul'>) => <BlogList className={className}>{children}</BlogList>,
  ol: ({ children, className }: ComponentProps<'ol'>) => (
    <BlogList ordered className={className}>
      {children}
    </BlogList>
  ),
  li: BlogListItem,
  a: MdxLink,
  pre: MdxPre,
  code: MdxCode,
  blockquote: MdxBlockquote,
  img: MdxImg,
  table: BlogTable,
  thead: BlogTableHead,
  tbody: BlogTableBody,
  tr: BlogTableRow,
  th: BlogTableHeaderCell,
  td: BlogTableCell,
};
