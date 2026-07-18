import { getBlogPost } from '@/lib/blog';
import { createOgImage, OG_CONTENT_TYPE, OG_SIZE } from '@/lib/og-image';

export const alt = 'Phrony blog post';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

type ImageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Image({ params }: ImageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  return createOgImage({
    eyebrow: 'Phrony Blog',
    title: post?.title ?? 'Phrony Blog',
    description: post?.description,
  });
}
