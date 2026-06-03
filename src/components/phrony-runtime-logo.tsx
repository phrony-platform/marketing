import Image from 'next/image';
import type { ComponentProps } from 'react';

const LOGO_SRC = '/phrony-runtime-logo.png';

type PhronyRuntimeLogoProps = Omit<ComponentProps<typeof Image>, 'src' | 'alt' | 'width' | 'height'> & {
  /** When true, preloads the logo (use for above-the-fold header). */
  priority?: boolean;
};

/** Phrony Runtime wordmark (white on black). */
export function PhronyRuntimeLogo({ className, priority, ...props }: PhronyRuntimeLogoProps) {
  return (
    <Image
      src={LOGO_SRC}
      alt="Phrony Runtime"
      width={790}
      height={225}
      priority={priority}
      unoptimized
      className={className}
      {...props}
    />
  );
}
