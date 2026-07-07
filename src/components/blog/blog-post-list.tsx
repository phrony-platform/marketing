import { BlogPostCard } from '@/components/blog/blog-post-card';
import type { BlogPostMeta } from '@/lib/blog';

export function BlogPostList({ posts }: { posts: BlogPostMeta[] }) {
  if (posts.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border/80 bg-muted/10 px-6 py-16 text-center">
        <p className="font-sans text-lg font-medium text-foreground">No posts yet</p>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          Add an MDX file under{' '}
          <code className="rounded border border-border/70 bg-muted/40 px-1.5 py-0.5 font-mono text-xs text-foreground">
            src/content/blog
          </code>{' '}
          to publish your first article.
        </p>
      </div>
    );
  }

  const [featured, ...rest] = posts;

  return (
    <div className="space-y-8">
      {featured ? <BlogPostCard post={featured} featured /> : null}
      {rest.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2">
          {rest.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
