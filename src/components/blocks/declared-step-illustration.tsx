'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { useReducedMotion } from 'framer-motion';

import { stepTypeCursor } from '@/components/blocks/step-illustration-ui';
import {
  CodePanelIllustration,
  YamlKeyManifest,
  YamlNumManifest,
  YamlStrManifest,
  type CodePanelLine,
} from '@/components/code-panel-illustration';
import { ManifestEditorFrame } from '@/components/manifest-editor-frame';

const TYPE_MS = 24;
const HOLD_MS = 2000;

type ConditionExample = {
  field: string;
  op: string;
  value: string;
  valueIsNum?: boolean;
};

const POLICY_CONDITIONS: ConditionExample[] = [
  { field: 'amount_eur', op: 'gt', value: '1000', valueIsNum: true },
  { field: 'account_tier', op: 'eq', value: 'premium' },
  { field: 'country', op: 'in', value: '["DE", "FR", "NL"]' },
  { field: 'risk_score', op: 'gte', value: '75', valueIsNum: true },
  { field: 'merchant_id', op: 'matches', value: '^M-[0-9]+$' },
];

const STATIC_PREFIX: CodePanelLine[] = [
  { n: 1, node: (<><YamlKeyManifest>apiVersion</YamlKeyManifest>: <YamlStrManifest>phrony.com/v1</YamlStrManifest></>) },
  { n: 2, node: (<><YamlKeyManifest>kind</YamlKeyManifest>: <YamlStrManifest>Agent</YamlStrManifest></>) },
  { n: 3, node: (<><YamlKeyManifest>metadata</YamlKeyManifest>:</>) },
  { n: 4, indent: 1, node: (<><YamlKeyManifest>name</YamlKeyManifest>: <YamlStrManifest>payment-assistant</YamlStrManifest></>) },
  { n: 5, indent: 1, node: (<><YamlKeyManifest>namespace</YamlKeyManifest>: <YamlStrManifest>bank</YamlStrManifest></>) },
  { n: 6, indent: 1, node: (<><YamlKeyManifest>version</YamlKeyManifest>: <YamlStrManifest>1.0.0</YamlStrManifest></>) },
  { n: 7, node: (<><YamlKeyManifest>spec</YamlKeyManifest>:</>) },
  { n: 8, indent: 1, node: (<><YamlKeyManifest>purpose</YamlKeyManifest>: <YamlStrManifest>Process retail payment requests</YamlStrManifest></>) },
  { n: 9, indent: 1, node: (<><YamlKeyManifest>tools</YamlKeyManifest>:</>) },
  { n: 10, indent: 2, node: (<>- <YamlKeyManifest>ref</YamlKeyManifest>: <YamlStrManifest>bank.submit-payment@^1.0</YamlStrManifest></>) },
  { n: 11, indent: 3, node: (<><YamlKeyManifest>as</YamlKeyManifest>: <YamlStrManifest>submit_payment</YamlStrManifest></>) },
  { n: 12, indent: 1, node: (<><YamlKeyManifest>policies</YamlKeyManifest>:</>) },
  { n: 13, indent: 2, node: (<>- <YamlKeyManifest>name</YamlKeyManifest>: <YamlStrManifest>large-payment-approval</YamlStrManifest></>) },
  { n: 14, indent: 3, node: (<><YamlKeyManifest>scope</YamlKeyManifest>: <YamlStrManifest>tool:submit_payment</YamlStrManifest></>) },
  { n: 15, indent: 3, node: (<><YamlKeyManifest>conditions</YamlKeyManifest>:</>) },
];

const STATIC_SUFFIX: CodePanelLine[] = [
  { n: 19, indent: 3, node: (<><YamlKeyManifest>decision</YamlKeyManifest>:</>) },
  { n: 20, indent: 4, node: (<><YamlKeyManifest>type</YamlKeyManifest>: <YamlStrManifest>require_approval</YamlStrManifest></>) },
];

const HIGHLIGHT_LINES = [12, 13, 14, 15, 16, 17, 18, 19, 20] as const;

type TypedLine = 'field' | 'op' | 'value';

type TypedProgress = Record<TypedLine, number>;

const EMPTY_PROGRESS: TypedProgress = { field: 0, op: 0, value: 0 };

function YamlCursor() {
  return <span className={stepTypeCursor} aria-hidden />;
}

function TypedYamlValue({
  value,
  typedLen,
  valueIsNum,
  showCursor,
}: {
  value: string;
  typedLen: number;
  valueIsNum?: boolean;
  showCursor?: boolean;
}) {
  const partial = value.slice(0, typedLen);

  return (
    <>
      {valueIsNum ? <YamlNumManifest>{partial}</YamlNumManifest> : <YamlStrManifest>{partial}</YamlStrManifest>}
      {showCursor ? <YamlCursor /> : null}
    </>
  );
}

function buildConditionLines(
  condition: ConditionExample,
  progress: TypedProgress,
  activeLine: TypedLine | null,
): CodePanelLine[] {
  return [
    {
      n: 16,
      indent: 4,
      node: (
        <>
          <YamlKeyManifest>field</YamlKeyManifest>:{' '}
          {progress.field > 0 ? (
            <TypedYamlValue
              value={condition.field}
              typedLen={progress.field}
              showCursor={activeLine === 'field'}
            />
          ) : activeLine === 'field' ? (
            <YamlCursor />
          ) : null}
        </>
      ),
    },
    {
      n: 17,
      indent: 4,
      node: (
        <>
          <YamlKeyManifest>op</YamlKeyManifest>:{' '}
          {progress.op > 0 ? (
            <TypedYamlValue value={condition.op} typedLen={progress.op} showCursor={activeLine === 'op'} />
          ) : activeLine === 'op' ? (
            <YamlCursor />
          ) : null}
        </>
      ),
    },
    {
      n: 18,
      indent: 4,
      node: (
        <>
          <YamlKeyManifest>value</YamlKeyManifest>:{' '}
          {progress.value > 0 ? (
            <TypedYamlValue
              value={condition.value}
              typedLen={progress.value}
              valueIsNum={condition.valueIsNum}
              showCursor={activeLine === 'value'}
            />
          ) : activeLine === 'value' ? (
            <YamlCursor />
          ) : null}
        </>
      ),
    },
  ];
}

export function DeclaredStepIllustration({ active }: { active: boolean }) {
  const reduceMotion = useReducedMotion();
  const [conditionIndex, setConditionIndex] = useState(0);
  const [progress, setProgress] = useState<TypedProgress>(EMPTY_PROGRESS);
  const [activeLine, setActiveLine] = useState<TypedLine | null>(null);

  useEffect(() => {
    if (!active) {
      setConditionIndex(0);
      setProgress(EMPTY_PROGRESS);
      setActiveLine(null);
      return;
    }

    if (reduceMotion) {
      const condition = POLICY_CONDITIONS[0]!;
      setConditionIndex(0);
      setProgress({
        field: condition.field.length,
        op: condition.op.length,
        value: condition.value.length,
      });
      setActiveLine(null);
      return;
    }

    let alive = true;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const delay = (ms: number) =>
      new Promise<void>((resolve) => {
        timer = setTimeout(() => {
          timer = null;
          resolve();
        }, ms);
      });

    const typeLine = async (line: TypedLine, text: string) => {
      setActiveLine(line);
      for (let i = 1; i <= text.length && alive; i++) {
        setProgress((current) => ({ ...current, [line]: i }));
        await delay(TYPE_MS);
      }
    };

    void (async () => {
      let index = 0;

      while (alive) {
        const condition = POLICY_CONDITIONS[index]!;
        setConditionIndex(index);
        setProgress(EMPTY_PROGRESS);
        setActiveLine('field');

        await typeLine('field', condition.field);
        if (!alive) {
          return;
        }

        await typeLine('op', condition.op);
        if (!alive) {
          return;
        }

        await typeLine('value', condition.value);
        if (!alive) {
          return;
        }

        setActiveLine(null);
        await delay(HOLD_MS);
        if (!alive) {
          return;
        }

        index = (index + 1) % POLICY_CONDITIONS.length;
      }
    })();

    return () => {
      alive = false;
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [active, reduceMotion]);

  const condition = POLICY_CONDITIONS[conditionIndex]!;

  const lines = useMemo(
    () => [
      ...STATIC_PREFIX,
      ...buildConditionLines(condition, progress, activeLine),
      ...STATIC_SUFFIX,
    ],
    [condition, progress, activeLine],
  );

  return (
    <ManifestEditorFrame subtitle="bank/payment-assistant" sectionLabel="policies">
      <CodePanelIllustration
        className="relative min-w-0"
        lines={lines}
        highlightLines={HIGHLIGHT_LINES}
        highlightMode="rows"
        tone="manifest"
        nowrap
        size="lg"
        showLineNumbers
      />
    </ManifestEditorFrame>
  );
}
