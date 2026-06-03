/** Production Cockpit origin (signup, login, book-demo). Override per environment via NEXT_PUBLIC_COCKPIT_ORIGIN. */
export const COCKPIT_APP_ORIGIN_DEFAULT = 'https://app.phrony.com';

/**
 * Base URL for the Phrony app (Cockpit). Override with NEXT_PUBLIC_COCKPIT_ORIGIN for local dev
 * (e.g. http://localhost:3010).
 */
export function cockpitUrl(path: string): string {
  const base = (process.env.NEXT_PUBLIC_COCKPIT_ORIGIN ?? COCKPIT_APP_ORIGIN_DEFAULT).replace(
    /\/$/,
    '',
  );
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}

/** Book-a-demo form on Cockpit (production: https://app.phrony.com/book-demo). */
export function bookDemoUrl(): string {
  return cockpitUrl('/book-demo');
}
