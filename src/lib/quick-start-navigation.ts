import { QUICK_START_COMPLETE_HREF, QUICK_START_STEPS } from '@/lib/quick-start-data';

export function getQuickStartNextHref(stepIndex: number): string | null {
  if (stepIndex < 0 || stepIndex >= QUICK_START_STEPS.length - 1) {
    return QUICK_START_COMPLETE_HREF;
  }
  return QUICK_START_STEPS[stepIndex + 1]!.href;
}

export function getQuickStartNextLabel(stepIndex: number): string {
  if (stepIndex < 0 || stepIndex >= QUICK_START_STEPS.length - 1) {
    return 'You are all set';
  }
  const next = QUICK_START_STEPS[stepIndex + 1]!;
  return `Step ${next.step}: ${next.title}`;
}
