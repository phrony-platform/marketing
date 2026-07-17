export type DocSearchItemType = 'page' | 'heading' | 'nav';

export type DocSearchItem = {
  id: string;
  title: string;
  href: string;
  section: string;
  group?: string;
  description?: string;
  content: string;
  type: DocSearchItemType;
};

export type DocSearchIndex = {
  generatedAt: string;
  items: DocSearchItem[];
};
