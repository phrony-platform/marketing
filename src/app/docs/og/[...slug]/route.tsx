import '@/lib/docs-pages';

import { getDocPage } from '@/lib/docs-registry';
import { createOgImage } from '@/lib/og-image';

type RouteProps = {
  params: Promise<{ slug: string[] }>;
};

export async function GET(_request: Request, { params }: RouteProps) {
  const { slug } = await params;
  const page = getDocPage(slug);

  return createOgImage({
    eyebrow: 'Phrony Docs',
    title: page?.title ?? 'Documentation',
    description: page?.description,
  });
}
