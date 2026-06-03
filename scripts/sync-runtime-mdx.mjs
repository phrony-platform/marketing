#!/usr/bin/env node
/**
 * Copies runtime MDX from the documentation repo into marketing and rewrites doc links.
 * Run from marketing/: node scripts/sync-runtime-mdx.mjs
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const marketingRoot = join(__dirname, '..');
const sourceRoot = join(marketingRoot, '..', '..', 'documentation', 'runtime');
const targetRoot = join(marketingRoot, 'src', 'content', 'runtime');

function rewriteLinks(content) {
  return content
    .replace(/\]\(\/runtime/g, '](/docs/runtime')
    .replace(/\]\(\/agent-spec/g, '](/docs/agent-spec')
    .replace(/\]\(\/paradigm/g, '](/docs/paradigm')
    .replace(/\]\(\/quick-start/g, '](/docs/quick-start')
    .replace(/href="\/runtime/g, 'href="/docs/runtime')
    .replace(/href="\/agent-spec/g, 'href="/docs/agent-spec')
    .replace(/href="\/paradigm/g, 'href="/docs/paradigm')
    .replace(/href="\/quick-start/g, 'href="/docs/quick-start');
}

function copyMdxFiles(dir, base = '') {
  for (const entry of readdirSync(dir)) {
    const sourcePath = join(dir, entry);
    const rel = base ? `${base}/${entry}` : entry;

    if (statSync(sourcePath).isDirectory()) {
      copyMdxFiles(sourcePath, rel);
      continue;
    }

    if (!entry.endsWith('.mdx')) {
      continue;
    }

    const targetPath = join(targetRoot, rel);
    mkdirSync(dirname(targetPath), { recursive: true });
    const raw = readFileSync(sourcePath, 'utf8');
    writeFileSync(targetPath, rewriteLinks(raw), 'utf8');
    console.log(`synced ${relative(marketingRoot, targetPath)}`);
  }
}

if (!existsSync(sourceRoot)) {
  console.error(`Source not found: ${sourceRoot}`);
  process.exit(1);
}

mkdirSync(targetRoot, { recursive: true });
copyMdxFiles(sourceRoot);
console.log('Done.');
