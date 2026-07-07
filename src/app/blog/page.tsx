import type { Metadata } from 'next';

import { BlogIndexHero } from '@/components/blog/blog-index-hero';
import { BlogPostList } from '@/components/blog/blog-post-list';
import { getAllBlogPosts } from '@/lib/blog';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'News, updates, and engineering notes from the Phrony team.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog · Phrony',
    description: 'News, updates, and engineering notes from the Phrony team.',
    type: 'website',
    url: '/blog',
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
