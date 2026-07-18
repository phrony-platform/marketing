import type { Metadata } from 'next';

import { BlogIndexHero } from '@/components/blog/blog-index-hero';
import { BlogPostList } from '@/components/blog/blog-post-list';
import { getAllBlogPosts } from '@/lib/blog';

export const dynamic = 'force-static';

const description = 'News, updates, and engineering notes from the Phrony team.';

export const metadata: Metadata = {
  title: 'Blog',
  description,
  alternates: {
    canonical: '/blog',
    types: {
      'application/rss+xml': '/blog/feed.xml',
    },
  },
  openGraph: {
    title: 'Blog · Phrony',
    description,
    type: 'website',
    url: '/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog · Phrony',
    description,
  },
};

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <>
      <BlogIndexHero />
      <section className="mx-auto max-w-[1120px] px-5 py-12 md:px-8 md:py-16">
        <BlogPostList posts={posts} />
      </section>
    </>
  );
}
