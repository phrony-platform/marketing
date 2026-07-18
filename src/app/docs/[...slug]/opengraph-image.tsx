import '@/lib/docs-pages';

import { getDocPage } from '@/lib/docs-registry';
import { createOgImage, OG_CONTENT_TYPE, OG_SIZE } from '@/lib/og-image';

export const alt = 'Phrony documentation';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

type ImageProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function Image({ params }: ImageProps) {
  const { slug } = await params;
  const page = getDocPage(slug);

  return createOgImage({
    eyebrow: 'Phrony Docs',
    title: page?.title ?? 'Documentation',
    description: page?.description,
  });
}
