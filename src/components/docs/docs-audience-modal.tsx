'use client';

import { ArrowRight, Briefcase, Code2 } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useId, useState } from 'react';

import { docButtonPrimary, docButtonSecondary, docKicker, docPanel, docRadius } from '@/components/docs/doc-style';
import {
  dismissDocsAudiencePrompt,
  isTechnicalDocsAudience,
  readDocsAudiencePreference,
  saveDocsAudienceProfile,
  type DocsAudienceProfile,
} from '@/lib/docs-audience';
import { cn } from '@/lib/utils';

const PARADIGM_HREF = '/docs/paradigm';
const QUICK_START_HREF = '/docs/quick-start';

const audienceOptions: {
  profile: DocsAudienceProfile;
  label: string;
  description: string;
  icon: typeof Code2;
}[] = [
  {
    profile: 'technical',
    label: 'Technical',
    description:
      'Developers, platform engineers, SREs, ML engineers, and security engineers building or operating agents.',
    icon: Code2,
  },
  {
    profile: 'non-technical',
    label: 'Non-technical',
    description:
      'Compliance, product, legal, risk, and operations leaders evaluating governance, fit, and adoption.',
    icon: Briefcase,
  },
];

type ModalStep = 'select' | 'recommend';

export function DocsAudienceModal() {
  const titleId = useId();
  const descriptionId = useId();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<ModalStep>('select');
  const [selectedProfile, setSelectedProfile] = useState<DocsAudienceProfile | null>(null);

  useEffect(() => {
    if (readDocsAudiencePreference() === null) {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (step === 'select') {
          dismissDocsAudiencePrompt();
        }
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, step]);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const handleDismiss = useCallback(() => {
    dismissDocsAudiencePrompt();
    close();
  }, [close]);

  const handleProfileSelect = useCallback((profile: DocsAudienceProfile) => {
    setSelectedProfile(profile);
    saveDocsAudienceProfile(profile);
    setStep('recommend');
  }, []);

  const handleStayOnHome = useCallback(() => {
    close();
  }, [close]);

  if (!open) {
    return null;
  }

  const technical = selectedProfile !== null && isTechnicalDocsAudience(selectedProfile);
  const recommendedHref = technical ? QUICK_START_HREF : PARADIGM_HREF;
  const recommendedLabel = technical ? 'Quick start' : 'Paradigm';

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center sm:p-6">
      <button
        type="button"
        className="absolute inset-0 cursor-default bg-black/40 backdrop-blur-sm"
        aria-label="Close"
        onClick={handleDismiss}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className={cn(docPanel, docRadius, 'relative z-[61] w-full max-w-lg shadow-xl')}
      >
        {step === 'select' ? (
          <div className="p-6 sm:p-8">
            <p className="text-xs font-medium text-muted-foreground">Welcome</p>
            <h2 id={titleId} className="mt-2 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              What best describes your role?
            </h2>
            <p id={descriptionId} className={cn(docKicker, 'mt-2 text-[15px] leading-relaxed')}>
              We will suggest a starting path through the documentation. You can change course anytime.
            </p>

            <ul className="mt-6 space-y-2">
              {audienceOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <li key={option.profile}>
                    <button
                      type="button"
                      className={cn(
                        docRadius,
                        'flex w-full cursor-pointer items-start gap-3 border border-border bg-background p-4 text-left transition-colors hover:border-foreground/25 hover:bg-muted/30',
                      )}
                      onClick={() => handleProfileSelect(option.profile)}
                    >
                      <span
                        className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-sm border border-border bg-muted/60 text-foreground"
                        aria-hidden
                      >
                        <Icon className="size-4" strokeWidth={1.5} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-medium text-foreground">{option.label}</span>
                        <span className="mt-1 block text-[13px] leading-relaxed text-muted-foreground">
                          {option.description}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <button
              type="button"
              className="mt-5 w-full cursor-pointer py-2 text-center text-sm text-muted-foreground transition-colors hover:text-foreground"
              onClick={handleDismiss}
            >
              Browse on my own
            </button>
          </div>
        ) : (
          <div className="p-6 sm:p-8">
            <p className="text-xs font-medium text-muted-foreground">Suggested path</p>
            <h2 id={titleId} className="mt-2 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {technical ? 'Start with Quick start' : 'Start with the Paradigm'}
            </h2>
            <p id={descriptionId} className={cn(docKicker, 'mt-3 text-[15px] leading-relaxed')}>
              {technical ? (
                <>
                  You are set up for a hands-on path: install the runtime, write your first manifest, publish, and run
                  an agent.
                </>
              ) : (
                <>
                  Begin with why production agents need a declared spec and how Phrony approaches governance—before
                  manifests or implementation detail.
                </>
              )}
            </p>

            <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <Link href={recommendedHref} className={docButtonPrimary} onClick={handleStayOnHome}>
                Go to {recommendedLabel}
                <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
              </Link>
              <button type="button" className={docButtonSecondary} onClick={handleStayOnHome}>
                Stay on docs home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
