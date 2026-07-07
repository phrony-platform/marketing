import type { Metadata } from 'next';

import { BlogShell } from '@/components/blog/blog-shell';

export const metadata: Metadata = {
  title: {
    default: 'Blog',
    template: '%s · Blog · Phrony',
  },
  description: 'News, updates, and engineering notes from the Phrony team.',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <BlogShell>{children}</BlogShell>;
}
