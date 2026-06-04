'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import {
  CodePanelIllustration,
  YamlKeyManifest,
  YamlNumManifest,
  YamlStrManifest,
  type CodePanelLine,
} from '@/components/code-panel-illustration';
import { ManifestEditorFrame } from '@/components/manifest-editor-frame';
import { useCodePanelSize } from '@/lib/use-code-panel-size';
import { cn } from '@/lib/utils';

const manifestHighlights = [
  { id: 'model', label: 'Model', lines: [9, 10, 11] },
  { id: 'tools', label: 'Tools', lines: [12, 13, 14] },
  { id: 'policies', label: 'Policies', lines: [15, 16] },
  { id: 'limits', label: 'Limits', lines: [17, 18, 19] },
] as const;

const yamlLines: CodePanelLine[] = [
  { n: 1, node: (<><YamlKeyManifest>apiVersion</YamlKeyManifest>: <YamlStrManifest>phrony.com/v1</YamlStrManifest></>) },
  { n: 2, node: (<><YamlKeyManifest>kind</YamlKeyManifest>: <YamlStrManifest>Agent</YamlStrManifest></>) },
  { n: 3, node: (<><YamlKeyManifest>metadata</YamlKeyManifest>:</>) },
  { n: 4, indent: 1, node: (<><YamlKeyManifest>name</YamlKeyManifest>: <YamlStrManifest>triage</YamlStrManifest></>) },
  { n: 5, indent: 1, node: (<><YamlKeyManifest>namespace</YamlKeyManifest>: <YamlStrManifest>demo</YamlStrManifest></>) },
  { n: 6, indent: 1, node: (<><YamlKeyManifest>version</YamlKeyManifest>: <YamlStrManifest>1.0.0</YamlStrManifest></>) },
  { n: 7, node: (<><YamlKeyManifest>spec</YamlKeyManifest>:</>) },
  { n: 8, indent: 1, node: (<><YamlKeyManifest>purpose</YamlKeyManifest>: <YamlStrManifest>Triage incoming claims…</YamlStrManifest></>) },
  { n: 9, indent: 1, node: (<><YamlKeyManifest>model</YamlKeyManifest>:</>) },
  { n: 10, indent: 2, node: (<><YamlKeyManifest>provider</YamlKeyManifest>: <YamlStrManifest>anthropic</YamlStrManifest></>) },
  { n: 11, indent: 2, node: (<><YamlKeyManifest>name</YamlKeyManifest>: <YamlStrManifest>claude-sonnet</YamlStrManifest></>) },
  { n: 12, indent: 1, node: (<><YamlKeyManifest>tools</YamlKeyManifest>:</>) },
  { n: 13, indent: 2, node: (<>- <YamlKeyManifest>ref</YamlKeyManifest>: <YamlStrManifest>claims-db.read-claim</YamlStrManifest></>) },
  { n: 14, indent: 2, node: (<>- <YamlKeyManifest>ref</YamlKeyManifest>: <YamlStrManifest>routing.assign-queue</YamlStrManifest></>) },
  { n: 15, indent: 1, node: (<><YamlKeyManifest>policies</YamlKeyManifest>:</>) },
  { n: 16, indent: 2, node: (<>- <YamlKeyManifest>name</YamlKeyManifest>: <YamlStrManifest>route-only-known-queues</YamlStrManifest></>) },
  { n: 17, indent: 1, node: (<><YamlKeyManifest>limits</YamlKeyManifest>:</>) },
  { n: 18, indent: 2, node: (<><YamlKeyManifest>max_tokens_per_run</YamlKeyManifest>: <YamlNumManifest>20000</YamlNumManifest></>) },
  { n: 19, indent: 2, node: (<><YamlKeyManifest>max_loop_iterations</YamlKeyManifest>: <YamlNumManifest>8</YamlNumManifest></>) },
  { n: 20, indent: 1, node: (<><YamlKeyManifest>hitl</YamlKeyManifest>:</>) },
  { n: 21, indent: 2, node: (<>- <YamlKeyManifest>trigger</YamlKeyManifest>: <YamlStrManifest>tool:routing.assign-queue</YamlStrManifest></>) },
];

export function HeroManifestIllustration({ className }: { className?: string }) {
  const panelSize = useCodePanelSize();
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % manifestHighlights.length);
    }, 2800);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const active = manifestHighlights[activeIndex];

  return (
    <motion.div
      className={cn('relative w-full max-w-lg overflow-hidden overscroll-none text-left', className)}
      aria-hidden
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <ManifestEditorFrame
        subtitle="demo/triage"
        sectionLabel={active.id}
        compact={panelSize === 'compact'}
      >
        <CodePanelIllustration
          className="relative min-w-0 overflow-hidden overscroll-none"
          lines={yamlLines}
          highlightLines={active.lines}
          highlightMode="rows"
          tone="manifest"
          size={panelSize}
          showLineNumbers
        />
      </ManifestEditorFrame>
    </motion.div>
  );
}
