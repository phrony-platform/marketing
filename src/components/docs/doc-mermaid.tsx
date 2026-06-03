'use client';

import { useEffect, useId, useRef, useState } from 'react';

import { docPanel, docRadius } from '@/components/docs/doc-style';
import { cn } from '@/lib/utils';

type Props = {
  chart: string;
  className?: string;
};

export function DocMermaid({ chart, className }: Props) {
  const id = useId().replace(/:/g, '');
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      const mermaid = (await import('mermaid')).default;
      mermaid.initialize({
        startOnLoad: false,
        theme: 'neutral',
        securityLevel: 'strict',
        fontFamily: 'inherit',
      });

      const { svg: rendered } = await mermaid.render(`doc-mermaid-${id}`, chart.trim());
      if (!cancelled) {
        setSvg(rendered);
      }
    }

    void render();
    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  return (
    <div
      ref={containerRef}
      className={cn('not-prose overflow-x-auto', docPanel, docRadius, 'p-4 sm:p-5', className)}
      aria-label="Diagram"
    >
      {svg ? (
        <div className="mx-auto flex justify-center [&_svg]:max-w-full" dangerouslySetInnerHTML={{ __html: svg }} />
      ) : (
        <pre className="text-xs text-muted-foreground">{chart.trim()}</pre>
      )}
    </div>
  );
}
