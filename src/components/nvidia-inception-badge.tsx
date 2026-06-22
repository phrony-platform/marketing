import Image from 'next/image';
import type { ComponentProps } from 'react';

const BADGE_SRC = '/nvidia-inception-program-badge-rgb-for-screen.svg';
const INCEPTION_PROGRAM_URL = 'https://www.nvidia.com/en-us/startups/';

type NvidiaInceptionBadgeProps = Omit<ComponentProps<typeof Image>, 'src' | 'alt' | 'width' | 'height'> & {
  priority?: boolean;
};

/** Official NVIDIA Inception Program member badge (RGB, for screen). */
export function NvidiaInceptionBadge({ className, priority, ...props }: NvidiaInceptionBadgeProps) {
  return (
    <Image
      src={BADGE_SRC}
      alt="NVIDIA Inception Program member"
      width={501}
      height={216}
      priority={priority}
      unoptimized
      className={className}
      {...props}
    />
  );
}

export function NvidiaInceptionBadgeLink({
  className,
  badgeClassName = 'h-9 w-auto',
}: {
  className?: string;
  badgeClassName?: string;
}) {
  return (
    <a
      href={INCEPTION_PROGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label="Phrony is a member of the NVIDIA Inception Program (opens in a new tab)"
    >
      <NvidiaInceptionBadge className={badgeClassName} />
    </a>
  );
}
