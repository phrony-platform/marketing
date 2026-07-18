import { getAllBlogPosts } from '@/lib/blog';
import { PHRONY_DOCS_ORIGIN } from '@/lib/project-urls';

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export const dynamic = 'force-static';

export function GET() {
  const posts = getAllBlogPosts();
  const feedUrl = `${PHRONY_DOCS_ORIGIN}/blog/feed.xml`;
  const blogUrl = `${PHRONY_DOCS_ORIGIN}/blog`;

  const items = posts
    .map((post) => {
      const url = `${PHRONY_DOCS_ORIGIN}/blog/${post.slug}`;
      const pubDate = new Date(`${post.date}T12:00:00.000Z`).toUTCString();
      const categories = (post.tags ?? [])
        .map((tag) => `      <category>${escapeXml(tag)}</category>`)
        .join('\n');

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.description)}</description>
${categories}
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Phrony Blog</title>
    <link>${blogUrl}</link>
    <description>News, updates, and engineering notes from the Phrony team.</description>
    <language>en-us</language>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
