import Image from 'next/image';
import { Calendar, Clock, User } from 'lucide-react';

import type { BlogPostMeta } from '@/lib/blog';
import { formatBlogDate, formatReadingTime } from '@/lib/blog';
import { blogMetaClass } from '@/lib/blog-typography';
import { cn } from '@/lib/utils';

type BlogPostMetaRowProps = {
  post: BlogPostMeta;
  className?: string;
  showReadingTime?: boolean;
};

export function BlogPostMetaRow({ post, className, showReadingTime = true }: BlogPostMetaRowProps) {
  return (
    <div className={cn('flex flex-wrap items-center gap-x-4 gap-y-2', blogMetaClass, className)}>
      <span className="inline-flex items-center gap-1.5">
        <Calendar className="size-3.5 shrink-0 opacity-70" strokeWidth={2} aria-hidden />
        <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
      </span>
      {post.author ? (
        <span className="inline-flex items-center gap-2">
          {post.authorImage ? (
            <Image
              src={post.authorImage}
              alt=""
              width={24}
              height={24}
              className="size-6 shrink-0 rounded-full object-cover ring-1 ring-border/60"
            />
          ) : (
            <User className="size-3.5 shrink-0 opacity-70" strokeWidth={2} aria-hidden />
          )}
          <span>{post.author}</span>
        </span>
      ) : null}
      {showReadingTime ? (
        <span className="inline-flex items-center gap-1.5">
          <Clock className="size-3.5 shrink-0 opacity-70" strokeWidth={2} aria-hidden />
          <span>{formatReadingTime(post.readingTimeMinutes)}</span>
        </span>
      ) : null}
    </div>
  );
}
