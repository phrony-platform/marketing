import type { LucideIcon } from 'lucide-react';
import { FileOutput, Fingerprint, Layers } from 'lucide-react';

import { docIconBox, docLabel, docPanel, docRadius } from '@/components/docs/doc-style';
import { cn } from '@/lib/utils';

const parts: {
  title: string;
  field: string;
  question: string;
  detail: string;
  icon: LucideIcon;
}[] = [
  {
    title: 'Identity',
    field: 'metadata',
    question: 'Who is this?',
    detail: 'Name, namespace, version, ownership, and governance labels.',
    icon: Fingerprint,
  },
  {
    title: 'Behavior envelope',
    field: 'spec',
    question: 'What may it do?',
    detail: 'Purpose, instructions, model, tools, policies, and run limits.',
    icon: Layers,
  },
  {
    title: 'Output contract',
    field: 'output',
    question: 'What shape is the answer?',
    detail: 'Free text or JSON validated against a schema.',
    icon: FileOutput,
  },
];

export function AgentPartsIllustration() {
  return (
    <figure
      className={cn('not-prose grid gap-3 sm:grid-cols-3', docPanel, docRadius, 'p-3 sm:p-4')}
      aria-label="The three parts of an Agent manifest"
    >
      {parts.map((part) => {
        const Icon = part.icon;
        return (
          <div
            key={part.field}
            className={cn(docRadius, 'flex flex-col border border-border bg-muted/20 p-4')}
          >
            <span className={docIconBox} aria-hidden>
              <Icon className="size-4" strokeWidth={1.5} />
            </span>
            <p className="mt-4 text-sm font-medium text-foreground">{part.title}</p>
            <p className={cn(docLabel, 'mt-1 font-mono normal-case tracking-normal')}>{part.field}</p>
            <p className="mt-3 text-sm text-foreground">{part.question}</p>
            <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-muted-foreground">{part.detail}</p>
          </div>
        );
      })}
    </figure>
  );
}
