import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';

import { docMdxComponents } from '@/lib/mdx-components';

const contentRoot = join(process.cwd(), 'src/content');

export type DocMdxFrontmatter = {
  title: string;
  description: string;
};

export function readDocMdxFrontmatter(relativePath: string): DocMdxFrontmatter {
  const raw = readFileSync(join(contentRoot, relativePath), 'utf8');
  const { data } = matter(raw);

  return {
    title: String(data.title ?? ''),
    description: String(data.description ?? ''),
  };
}

export async function compileDocMdx(relativePath: string) {
  const raw = readFileSync(join(contentRoot, relativePath), 'utf8');

  return compileMDX<DocMdxFrontmatter>({
    source: raw,
    components: docMdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });
}
