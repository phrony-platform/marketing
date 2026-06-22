import { NvidiaInceptionBadge } from '@/components/nvidia-inception-badge';
import { cn } from '@/lib/utils';

const INCEPTION_PROGRAM_URL = 'https://www.nvidia.com/en-us/startups/';

export function InceptionProgramLabel({ className }: { className?: string }) {
  return (
    <div className={cn('flex justify-center lg:justify-start', className)}>
      <a
        href={INCEPTION_PROGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Phrony is a member of the NVIDIA Inception Program (opens in a new tab)"
        className={cn(
          'group relative block max-w-full overflow-hidden',
          'border border-border/60 border-l-[3px] border-l-[#76b900]',
          'transition-[border-color] duration-300',
          'hover:border-border',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        )}
      >
        <span className="relative flex flex-col items-center gap-2 px-4 py-1 sm:flex-row sm:items-center sm:gap-5 sm:px-5 sm:py-1.5 lg:items-center">
          <span className="shrink-0 text-[11px] font-normal uppercase tracking-[0.2em] text-muted-foreground">
            A member of
          </span>

          <span
            className="hidden h-10 w-px shrink-0 bg-gradient-to-b from-transparent via-border to-transparent sm:block"
            aria-hidden
          />

          <NvidiaInceptionBadge className="h-14 w-auto sm:h-16 md:h-[4.5rem]" priority />
        </span>
      </a>
    </div>
  );
}
