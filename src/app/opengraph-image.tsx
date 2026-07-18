import { createOgImage, OG_CONTENT_TYPE, OG_SIZE } from '@/lib/og-image';
import { heroDescription, heroTitle } from '@/lib/hero-title';

export const alt = heroTitle;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return createOgImage({
    title: heroTitle,
    description: heroDescription,
  });
}
