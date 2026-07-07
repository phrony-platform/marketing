import { cn } from '@/lib/utils';

export function BlogTags({ tags, className }: { tags: string[]; className?: string }) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <ul className={cn('flex flex-wrap gap-2', className)}>
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-md border border-border/80 bg-muted/25 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
