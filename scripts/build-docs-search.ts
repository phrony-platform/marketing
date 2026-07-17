import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

import { buildDocsSearchIndex } from '../src/lib/docs-search-build';

const outputPath = join(process.cwd(), 'public/docs-search.json');

const index = buildDocsSearchIndex();
mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(index, null, 2)}\n`, 'utf8');

console.log(`Wrote ${index.items.length} search entries to ${outputPath}`);
