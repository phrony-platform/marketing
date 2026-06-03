#!/usr/bin/env node
/**
 * Copies agent-spec MDX from the documentation repo into marketing and rewrites doc links.
 * Run from marketing/: node scripts/sync-agent-spec-mdx.mjs
 */
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const marketingRoot = join(__dirname, '..');
const sourceRoot = join(marketingRoot, '..', '..', 'documentation', 'agent-spec');
const targetRoot = join(marketingRoot, 'src', 'content', 'agent-spec');

const SKIP_FILES = new Set(['index.mdx']);

const EXTENSION_SURFACES_MERMAID = /```mermaid\nflowchart TB\n  subgraph portable \[Portable description\][\s\S]*?```/;

function rewriteLinks(content) {
  return content
    .replace(/\]\(\/agent-spec/g, '](/docs/agent-spec')
    .replace(/\]\(\/paradigm/g, '](/docs/paradigm')
    .replace(/\]\(\/runtime/g, '](/docs/runtime')
    .replace(/href="\/agent-spec/g, 'href="/docs/agent-spec')
    .replace(/href="\/paradigm/g, 'href="/docs/paradigm')
    .replace(/href="\/runtime/g, 'href="/docs/runtime')
    .replace(EXTENSION_SURFACES_MERMAID, '<ExtensionSurfacesIllustration />');
}

function copyMdxFiles(dir, base = '') {
  for (const entry of readdirSync(dir)) {
    const sourcePath = join(dir, entry);
    const rel = base ? `${base}/${entry}` : entry;

    if (statSync(sourcePath).isDirectory()) {
      copyMdxFiles(sourcePath, rel);
      continue;
    }

    if (!entry.endsWith('.mdx') || SKIP_FILES.has(entry)) {
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
