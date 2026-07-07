import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { BlogBreadcrumb } from '@/components/blog/blog-breadcrumb';
import { BlogPostMetaRow } from '@/components/blog/blog-post-meta';
import { BlogProse } from '@/components/blog/blog-prose';
import { BlogTags } from '@/components/blog/blog-tags';
import type { BlogPostMeta } from '@/lib/blog';
import { blogLeadClass } from '@/lib/blog-typography';

export function BlogArticleLayout({
  post,
  children,
}: {
  post: BlogPostMeta;
  children: React.ReactNode;
}) {
  return (
    <article>
      <header className="border-b border-border/80">
        <div className="mx-auto max-w-[768px] px-5 py-10 md:px-8 md:py-14">
          <BlogBreadcrumb current={post.title} />
          {post.tags && post.tags.length > 0 ? <BlogTags tags={post.tags} className="mt-8" /> : null}
          <h1 className="mt-6 font-sans text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
            {post.title}
          </h1>
          {post.description ? (
            <p className={`mt-5 max-w-2xl ${blogLeadClass}`}>{post.description}</p>
          ) : null}
          <BlogPostMetaRow post={post} className="mt-8 border-t border-border/60 pt-6" />
        </div>
      </header>

      <div className="mx-auto max-w-[768px] px-5 py-12 md:px-8 md:py-16">
        <BlogProse>{children}</BlogProse>
      </div>
    </article>
  );
}

export function BlogArticleFooter() {
  return (
    <footer className="border-t border-border/80 bg-muted/10">
      <div className="mx-auto flex max-w-[768px] flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-8 md:py-12">
        <div>
          <p className="font-sans text-sm font-medium text-foreground">Continue reading</p>
          <p className="mt-1 text-sm text-muted-foreground">More updates and engineering notes from the Phrony team.</p>
        </div>
        <Link
          href="/blog"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/40"
        >
          <ArrowLeft className="size-4" strokeWidth={2} aria-hidden />
          All posts
        </Link>
      </div>
    </footer>
  );
}
