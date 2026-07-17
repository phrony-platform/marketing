import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import matter from 'gray-matter';

import { AGENT_SPEC_MDX_PAGES, RUNTIME_MDX_PAGES } from '@/lib/docs-mdx-catalog';
import { DOC_TABS, type DocNavLink } from '@/lib/docs-navigation';
import { DOCS_TSX_PAGES } from '@/lib/docs-tsx-catalog';
import type { DocSearchIndex, DocSearchItem } from '@/lib/docs-search-types';
import { slugify } from '@/lib/slugify';

const contentRoot = join(process.cwd(), 'src/content');
const tsxContentRoot = join(process.cwd(), 'src/components/docs/pages');

type ExtractedHeading = {
  level: 2 | 3;
  text: string;
  id: string;
};

function collapseWhitespace(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function stripHtmlTags(value: string): string {
  return collapseWhitespace(value.replace(/<[^>]+>/g, ' '));
}

function stripMarkdownLinks(value: string): string {
  return value.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
}

function stripMarkdown(raw: string): string {
  let text = raw;
  text = text.replace(/```[\s\S]*?```/g, ' ');
  text = text.replace(/`([^`]+)`/g, '$1');
  text = text.replace(/^#{1,6}\s+/gm, '');
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  text = text.replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1');
  text = text.replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, '$1');
  text = text.replace(/<[^>]+>/g, ' ');
  text = text.replace(/^\s*[-*+]\s+/gm, '');
  text = text.replace(/^\s*\d+\.\s+/gm, '');
  text = text.replace(/\|/g, ' ');
  return collapseWhitespace(text);
}

function extractMdxHeadings(raw: string): ExtractedHeading[] {
  const headings: ExtractedHeading[] = [];

  for (const line of raw.split('\n')) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (!match) {
      continue;
    }

    const text = collapseWhitespace(stripMarkdownLinks(match[2]));
    if (!text) {
      continue;
    }

    headings.push({
      level: match[1].length === 2 ? 2 : 3,
      text,
      id: slugify(text),
    });
  }

  return headings;
}

function extractTsxHeadings(source: string): ExtractedHeading[] {
  const headings: ExtractedHeading[] = [];
  const pattern = /<DocH([23])(?:\s+id=(?:"([^"]*)"|{`([^`]*)`}))?>([\s\S]*?)<\/DocH\1>/g;

  for (const match of source.matchAll(pattern)) {
    const level = Number(match[1]) as 2 | 3;
    const explicitId = match[2] ?? match[3];
    const text = stripHtmlTags(match[4]);
    if (!text) {
      continue;
    }

    headings.push({
      level,
      text,
      id: explicitId ?? slugify(text),
    });
  }

  return headings;
}

function extractTsxParagraphText(source: string): string {
  const paragraphs: string[] = [];
  const pattern = /<DocParagraph>([\s\S]*?)<\/DocParagraph>/g;

  for (const match of source.matchAll(pattern)) {
    const text = stripHtmlTags(match[1]);
    if (text) {
      paragraphs.push(text);
    }
  }

  return collapseWhitespace(paragraphs.join(' '));
}

function docsHref(slug: string): string {
  return `/docs/${slug}`;
}

function getTabLabel(tabId: string): string {
  return DOC_TABS.find((tab) => tab.id === tabId)?.label ?? tabId;
}

function addItem(items: DocSearchItem[], item: DocSearchItem) {
  const existing = items.find((entry) => entry.id === item.id);
  if (existing) {
    existing.content = collapseWhitespace(`${existing.content} ${item.content}`);
    return;
  }
  items.push(item);
}

function addPageWithHeadings(
  items: DocSearchItem[],
  {
    slug,
    title,
    description,
    section,
    group,
    body,
    headings,
    href = docsHref(slug),
  }: {
    slug: string;
    title: string;
    description: string;
    section: string;
    group?: string;
    body: string;
    headings: ExtractedHeading[];
    href?: string;
  },
) {
  const content = collapseWhitespace([title, description, body, ...headings.map((heading) => heading.text)].join(' '));

  addItem(items, {
    id: `page:${slug}`,
    title,
    href,
    section,
    group,
    description,
    content,
    type: 'page',
  });

  for (const heading of headings) {
    addItem(items, {
      id: `heading:${slug}:${heading.id}`,
      title: heading.text,
      href: `${href}#${heading.id}`,
      section,
      group,
      description: title,
      content: collapseWhitespace([heading.text, title, description, body].join(' ')),
      type: 'heading',
    });
  }
}

function flattenNavLinks(
  links: DocNavLink[],
  section: string,
  group: string,
  items: DocSearchItem[],
) {
  for (const link of links) {
    addItem(items, {
      id: `nav:${link.href}`,
      title: link.title,
      href: link.href,
      section,
      group,
      content: collapseWhitespace([link.title, section, group].join(' ')),
      type: 'nav',
    });

    if (link.children?.length) {
      flattenNavLinks(link.children, section, group, items);
    }
  }
}

function buildNavItems(): DocSearchItem[] {
  const items: DocSearchItem[] = [];

  for (const tab of DOC_TABS) {
    if (tab.id === 'home') {
      addItem(items, {
        id: 'nav:/docs',
        title: 'Documentation home',
        href: '/docs',
        section: 'Home',
        content: collapseWhitespace([tab.label, tab.description].join(' ')),
        type: 'nav',
      });
      continue;
    }

    addItem(items, {
      id: `nav:${tab.href}`,
      title: tab.label,
      href: tab.href,
      section: tab.label,
      description: tab.description,
      content: collapseWhitespace([tab.label, tab.description].join(' ')),
      type: 'nav',
    });

    for (const group of tab.groups) {
      flattenNavLinks(group.pages, tab.label, group.group, items);
    }
  }

  return items;
}

function buildMdxItems(): DocSearchItem[] {
  const items: DocSearchItem[] = [];
  const pages = [...AGENT_SPEC_MDX_PAGES, ...RUNTIME_MDX_PAGES];

  for (const page of pages) {
    const raw = readFileSync(join(contentRoot, page.file), 'utf8');
    const { data, content } = matter(raw);
    const title = String(data.title ?? '');
    const description = String(data.description ?? '');
    const headings = extractMdxHeadings(content);
    const body = stripMarkdown(content);
    const tabId = page.slug.startsWith('agent-spec') ? 'agent-spec' : 'runtime';

    addPageWithHeadings(items, {
      slug: page.slug,
      title,
      description,
      section: getTabLabel(tabId),
      body,
      headings,
    });
  }

  return items;
}

function buildTsxItems(): DocSearchItem[] {
  const items: DocSearchItem[] = [];

  for (const page of DOCS_TSX_PAGES) {
    const headings: ExtractedHeading[] = [];
    const bodyParts: string[] = [];

    for (const relativePath of page.contentFiles) {
      const source = readFileSync(join(tsxContentRoot, relativePath), 'utf8');
      headings.push(...extractTsxHeadings(source));
      bodyParts.push(extractTsxParagraphText(source));
    }

    addPageWithHeadings(items, {
      slug: page.slug,
      title: page.title,
      description: page.description,
      section: getTabLabel(page.tab),
      body: collapseWhitespace(bodyParts.join(' ')),
      headings,
    });
  }

  return items;
}

export function buildDocsSearchIndex(): DocSearchIndex {
  const items: DocSearchItem[] = [];

  for (const batch of [buildNavItems(), buildMdxItems(), buildTsxItems()]) {
    for (const item of batch) {
      addItem(items, item);
    }
  }

  return {
    generatedAt: new Date().toISOString(),
    items,
  };
}
