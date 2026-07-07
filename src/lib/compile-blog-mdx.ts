import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';

import type { BlogPostFrontmatter } from '@/lib/blog';
import { blogMdxComponents } from '@/lib/blog-mdx-components';

const contentRoot = join(process.cwd(), 'src/content/blog');

export async function compileBlogMdx(slug: string) {
  const raw = readFileSync(join(contentRoot, `${slug}.mdx`), 'utf8');

  return compileMDX<BlogPostFrontmatter>({
    source: raw,
    components: blogMdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });
}
