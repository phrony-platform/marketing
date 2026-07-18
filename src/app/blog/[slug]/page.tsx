import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { BlogArticleFooter, BlogArticleLayout } from '@/components/blog/blog-article-layout';
import { BlogPostJsonLd } from '@/components/blog/blog-post-json-ld';
import { getBlogPost, getBlogPostSlugs } from '@/lib/blog';
import { compileBlogMdx } from '@/lib/compile-blog-mdx';
import { PHRONY_DOCS_ORIGIN } from '@/lib/project-urls';

export const dynamic = 'force-static';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getBlogPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return { title: 'Not found' };
  }

  const url = `/blog/${post.slug}`;
  const imageUrl = `/blog/${post.slug}/opengraph-image`;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url,
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
      tags: post.tags,
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const { content } = await compileBlogMdx(slug);
  const url = `${PHRONY_DOCS_ORIGIN}/blog/${post.slug}`;
  const imageUrl = `${PHRONY_DOCS_ORIGIN}/blog/${post.slug}/opengraph-image`;

  return (
    <>
      <BlogPostJsonLd post={post} url={url} imageUrl={imageUrl} />
      <BlogArticleLayout post={post}>{content}</BlogArticleLayout>
      <BlogArticleFooter />
    </>
  );
}
