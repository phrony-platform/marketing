import type { ReactNode } from 'react';

import { DocCodeBlock, DocH3, DocParagraph, type DocCodeLanguage } from '@/components/docs';

export function MethodExample({
  name,
  description,
  code,
  language = 'typescript',
}: {
  name: string;
  description?: ReactNode;
  code: string;
  language?: DocCodeLanguage;
}) {
  return (
    <>
      <DocH3>{name}</DocH3>
      {description ? <DocParagraph>{description}</DocParagraph> : null}
      <DocCodeBlock language={language} code={code.trim()} />
    </>
  );
}
