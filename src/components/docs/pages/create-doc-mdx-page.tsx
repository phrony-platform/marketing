import type { ReactNode } from 'react';

import { DocPage, DocProse } from '@/components/docs';
import { compileDocMdx } from '@/lib/compile-doc-mdx';

type CreateDocMdxPageOptions = {
  headerVisual?: ReactNode;
};

export function createDocMdxPage(
  relativePath: string,
  eyebrow: string,
  options?: CreateDocMdxPageOptions,
) {
  return async function DocMdxPage() {
    const { content, frontmatter } = await compileDocMdx(relativePath);

    return (
      <DocPage
        title={frontmatter.title}
        description={frontmatter.description}
        eyebrow={eyebrow}
        headerVisual={options?.headerVisual}
      >
        <DocProse>{content}</DocProse>
      </DocPage>
    );
  };
}
