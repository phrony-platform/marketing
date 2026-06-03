import type { ComponentProps, ReactElement, ReactNode } from 'react';
import { Children, isValidElement } from 'react';
import Link from 'next/link';

import {
  DocCallout,
  DocCard,
  DocCardGroup,
  DocCodeBlock,
  DocDanger,
  DocH2,
  DocH3,
  DocH4,
  DocInfo,
  DocInlineCode,
  DocList,
  DocListItem,
  DocNote,
  DocParagraph,
  DocTable,
  DocTableBody,
  DocTableCell,
  DocTableHead,
  DocTableHeaderCell,
  DocTableRow,
  DocWarning,
} from '@/components/docs';
import { AgentPartsIllustration } from '@/components/docs/agent-spec/agent-parts-illustration';
import { ExtensionSurfacesIllustration } from '@/components/docs/agent-spec/extension-surfaces-illustration';
import {
  ToolDispatchFailureModesIllustration,
  ToolDispatchInvokeIllustration,
  ToolDispatchPolicyCheckIllustration,
} from '@/components/docs/runtime/tool-dispatch-concept-illustrations';
import { DocStep, DocSteps } from '@/components/docs/doc-steps';
import { DocUpNext } from '@/components/docs/doc-up-next';
import { DocMermaid } from '@/components/docs/doc-mermaid';
import type { DocCodeLanguage } from '@/lib/doc-code-language';
import { docLinkClass } from '@/lib/docs-typography';
import { unwrapSingleMdxParagraph } from '@/lib/unwrap-single-mdx-paragraph';

function MdxLink({ href, children, ...props }: ComponentProps<'a'>) {
  if (!href) {
    return <a {...props}>{children}</a>;
  }

  const isInternal = href.startsWith('/') && !href.startsWith('//');

  if (isInternal) {
    return (
      <Link href={href} className={docLinkClass} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={docLinkClass} target="_blank" rel="noopener noreferrer" {...props}>
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

  if (language === 'mermaid') {
    return <DocMermaid chart={code} />;
  }

  return <DocCodeBlock language={language as DocCodeLanguage} code={code} />;
}

function MdxCode({ children, className, ...props }: ComponentProps<'code'>) {
  if (className?.includes('language-')) {
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  }

  return <DocInlineCode {...props}>{children}</DocInlineCode>;
}

function MdxCardGroup({
  cols,
  children,
  className,
}: {
  cols?: 1 | 2 | 3;
  children: ReactNode;
  className?: string;
}) {
  return (
    <DocCardGroup cols={cols ?? 2} className={className}>
      {children}
    </DocCardGroup>
  );
}

function MdxCard({ title, href, children }: { title: string; href: string; children: ReactNode }) {
  return (
    <DocCard title={title} href={href}>
      {unwrapSingleMdxParagraph(children, [DocParagraph])}
    </DocCard>
  );
}

export const docMdxComponents = {
  Note: DocNote,
  Info: DocInfo,
  Warning: DocWarning,
  Danger: DocDanger,
  Tip: (props: ComponentProps<typeof DocCallout>) => <DocCallout variant="tip" {...props} />,
  Card: MdxCard,
  CardGroup: MdxCardGroup,
  UpNext: DocUpNext,
  Steps: DocSteps,
  Step: DocStep,
  h2: DocH2,
  h3: DocH3,
  h4: DocH4,
  p: DocParagraph,
  ul: ({ children, className }: ComponentProps<'ul'>) => <DocList className={className}>{children}</DocList>,
  ol: ({ children, className }: ComponentProps<'ol'>) => (
    <DocList ordered className={className}>
      {children}
    </DocList>
  ),
  li: DocListItem,
  a: MdxLink,
  pre: MdxPre,
  code: MdxCode,
  table: DocTable,
  thead: DocTableHead,
  tbody: DocTableBody,
  tr: DocTableRow,
  th: DocTableHeaderCell,
  td: DocTableCell,
  ExtensionSurfacesIllustration,
  AgentPartsIllustration,
  ToolDispatchPolicyCheckIllustration,
  ToolDispatchInvokeIllustration,
  ToolDispatchFailureModesIllustration,
};
