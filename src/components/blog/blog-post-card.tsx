import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { BlogPostMetaRow } from '@/components/blog/blog-post-meta';
import { BlogTags } from '@/components/blog/blog-tags';
import type { BlogPostMeta } from '@/lib/blog';
import { formatBlogDateShort } from '@/lib/blog';
import { blogEyebrowClass } from '@/lib/blog-typography';
import { cn } from '@/lib/utils';

type BlogPostCardProps = {
  post: BlogPostMeta;
  featured?: boolean;
};

export function BlogPostCard({ post, featured = false }: BlogPostCardProps) {
  if (featured) {
    return (
      <article className="group relative overflow-hidden rounded-2xl border border-border/80 bg-card">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,oklch(0.985_0_0/6%),transparent)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,oklch(1_0_0/5%),transparent)]"
        />
        <Link href={`/blog/${post.slug}`} className="relative block p-8 md:p-10 lg:p-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0 max-w-3xl space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className={blogEyebrowClass}>Latest</span>
                {post.tags && post.tags.length > 0 ? <BlogTags tags={post.tags.slice(0, 2)} /> : null}
              </div>
              <div className="space-y-4">
                <h2 className="font-sans text-3xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-foreground/90 md:text-4xl md:leading-[1.12]">
                  {post.title}
                </h2>
                {post.description ? (
                  <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg md:leading-[1.7]">
                    {post.description}
                  </p>
                ) : null}
              </div>
              <BlogPostMetaRow post={post} />
            </div>
            <span className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-foreground transition-transform group-hover:translate-x-0.5">
              Read article
              <ArrowRight className="size-4" strokeWidth={2} aria-hidden />
            </span>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="group h-full">
      <Link
        href={`/blog/${post.slug}`}
        className={cn(
          'flex h-full flex-col rounded-xl border border-border/80 bg-card p-6 transition-all duration-200',
          'hover:border-border hover:bg-card/80 hover:shadow-[0_12px_40px_-20px_rgba(0,0,0,0.35)]',
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <time dateTime={post.date} className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
            {formatBlogDateShort(post.date)}
          </time>
          <span className="text-xs text-muted-foreground">{post.readingTimeMinutes} min</span>
        </div>

        <div className="mt-5 flex flex-1 flex-col gap-3">
          <h2 className="font-sans text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-foreground/90">
            {post.title}
          </h2>
          {post.description ? (
            <p className="line-clamp-3 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
              {post.description}
            </p>
          ) : null}
        </div>

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-border/60 pt-5">
          {post.author ? (
            <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              {post.authorImage ? (
                <Image
                  src={post.authorImage}
                  alt=""
                  width={20}
                  height={20}
                  className="size-5 shrink-0 rounded-full object-cover ring-1 ring-border/60"
                />
              ) : null}
              {post.author}
            </span>
          ) : (
            <span />
          )}
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100">
            Read
            <ArrowRight className="size-3.5" strokeWidth={2} aria-hidden />
          </span>
        </div>
      </Link>
    </article>
  );
}
