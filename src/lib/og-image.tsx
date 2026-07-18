import { ImageResponse } from 'next/og';

export const OG_SIZE = {
  width: 1200,
  height: 630,
} as const;

export const OG_CONTENT_TYPE = 'image/png';

type CreateOgImageOptions = {
  title: string;
  description?: string;
  eyebrow?: string;
};

export function createOgImage({
  title,
  description,
  eyebrow = 'Phrony',
}: CreateOgImageOptions) {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#171717',
          color: '#fafafa',
          padding: '64px 72px',
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: '#a3a3a3',
          }}
        >
          {eyebrow}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 980 }}>
          <div
            style={{
              display: 'flex',
              fontSize: title.length > 70 ? 52 : 64,
              fontWeight: 650,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
            }}
          >
            {title}
          </div>
          {description ? (
            <div
              style={{
                display: 'flex',
                fontSize: 28,
                lineHeight: 1.35,
                color: '#a3a3a3',
                maxWidth: 900,
              }}
            >
              {description.length > 160 ? `${description.slice(0, 157)}…` : description}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 24,
            color: '#737373',
            letterSpacing: '-0.01em',
          }}
        >
          phrony.com
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
    },
  );
}
