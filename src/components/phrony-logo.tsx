import Image from 'next/image';
import type { ComponentProps } from 'react';

const LOGO_SRC = '/phrony-logo-dark.svg';

type PhronyLogoProps = Omit<ComponentProps<typeof Image>, 'src' | 'alt'> & {
  /** When true, preloads the logo (use for above-the-fold header). */
  priority?: boolean;
};

/** Phrony wordmark for dark UI (white fills). */
export function PhronyLogo({ className, priority, ...props }: PhronyLogoProps) {
  return (
    <Image
      src={LOGO_SRC}
      alt="Phrony"
      width={550}
      height={137}
      priority={priority}
      unoptimized
      className={className}
      {...props}
    />
  );
}
