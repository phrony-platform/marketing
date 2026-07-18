import { createOgImage, OG_CONTENT_TYPE, OG_SIZE } from '@/lib/og-image';

export const alt = 'Phrony Documentation';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return createOgImage({
    eyebrow: 'Phrony',
    title: 'Documentation',
    description:
      'Paradigm, agent spec, and runtime guides for declaring, deploying, and running agents.',
  });
}
