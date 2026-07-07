import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import matter from 'gray-matter';

const contentRoot = join(process.cwd(), 'src/content/blog');

export type BlogPostFrontmatter = {
  title: string;
  description: string;
  /** ISO date string, e.g. `2026-07-08`. */
  date: string;
  author?: string;
  tags?: string[];
  /** When true, the post is omitted from the index and static routes in production. */
  draft?: boolean;
};

export type BlogPostMeta = BlogPostFrontmatter & {
  slug: string;
  readingTimeMinutes: number;
};

function isProduction() {
  return process.env.NODE_ENV === 'production';
}

function getReadingTimeMinutes(body: string): number {
  const words = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]+`/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 220));
}

function parsePostFile(filename: string): BlogPostMeta | null {
  if (!filename.endsWith('.mdx')) {
    return null;
  }

  const slug = filename.replace(/\.mdx$/, '');
  const raw = readFileSync(join(contentRoot, filename), 'utf8');
  const { data, content } = matter(raw);

  const post: BlogPostMeta = {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ''),
    date: String(data.date ?? ''),
    author: data.author ? String(data.author) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
    draft: Boolean(data.draft),
    readingTimeMinutes: getReadingTimeMinutes(content),
  };

  if (!post.date) {
    throw new Error(`Blog post "${filename}" is missing required frontmatter field: date`);
  }

  return post;
}

export function getAllBlogPosts(): BlogPostMeta[] {
  let filenames: string[];

  try {
    filenames = readdirSync(contentRoot);
  } catch {
    return [];
  }

  return filenames
    .map(parsePostFile)
    .filter((post): post is BlogPostMeta => post !== null)
    .filter((post) => !(isProduction() && post.draft))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getBlogPost(slug: string): BlogPostMeta | undefined {
  return getAllBlogPosts().find((post) => post.slug === slug);
}

export function getBlogPostSlugs(): string[] {
  return getAllBlogPosts().map((post) => post.slug);
}

export function formatBlogDate(date: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T12:00:00.000Z`));
}

export function formatBlogDateShort(date: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T12:00:00.000Z`));
}

export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}
