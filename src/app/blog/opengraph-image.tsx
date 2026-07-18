import { createOgImage, OG_CONTENT_TYPE, OG_SIZE } from '@/lib/og-image';

export const alt = 'Phrony Blog';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return createOgImage({
    eyebrow: 'Phrony',
    title: 'Blog',
    description: 'News, updates, and engineering notes from the Phrony team.',
  });
}
