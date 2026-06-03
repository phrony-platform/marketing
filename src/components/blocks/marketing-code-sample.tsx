import { DocCodeBlock } from '@/components/docs/doc-code-block';

type Props = {
  /** e.g. `main.ts` — shown in the bar above the code */
  fileLabel: string;
  code: string;
  className?: string;
};

/** Bordered file header + dark panel with sugar-high JS/TS highlighting. */
export function MarketingCodeSample({ fileLabel, code, className }: Props) {
  return (
    <DocCodeBlock
      language="typescript"
      title={fileLabel}
      code={code}
      className={className}
    />
  );
}
