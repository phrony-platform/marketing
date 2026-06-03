export const DOCS_AUDIENCE_STORAGE_KEY = 'phrony-docs-audience-v1';

export type DocsAudienceProfile = 'technical' | 'non-technical';

/** @deprecated Legacy values still read from localStorage. */
type LegacyDocsAudienceRole = 'developer' | 'compliance-officer' | 'other';

export type DocsAudiencePreference =
  | {
      profile: DocsAudienceProfile;
      selectedAt: string;
    }
  | {
      dismissed: true;
      selectedAt: string;
    };

function normalizeStoredProfile(value: string): DocsAudienceProfile | null {
  if (value === 'technical' || value === 'non-technical') {
    return value;
  }

  const legacy = value as LegacyDocsAudienceRole;
  if (legacy === 'developer') {
    return 'technical';
  }
  if (legacy === 'compliance-officer' || legacy === 'other') {
    return 'non-technical';
  }

  return null;
}

export function isTechnicalDocsAudience(profile: DocsAudienceProfile): boolean {
  return profile === 'technical';
}

export function readDocsAudiencePreference(): DocsAudiencePreference | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(DOCS_AUDIENCE_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    if (!parsed || typeof parsed.selectedAt !== 'string') {
      return null;
    }
    if (parsed.dismissed === true) {
      return { dismissed: true, selectedAt: parsed.selectedAt };
    }

    const profileValue =
      typeof parsed.profile === 'string'
        ? parsed.profile
        : typeof parsed.role === 'string'
          ? parsed.role
          : null;

    if (!profileValue) {
      return null;
    }

    const profile = normalizeStoredProfile(profileValue);
    if (!profile) {
      return null;
    }

    return { profile, selectedAt: parsed.selectedAt };
  } catch {
    return null;
  }
}

export function writeDocsAudiencePreference(preference: DocsAudiencePreference): void {
  window.localStorage.setItem(DOCS_AUDIENCE_STORAGE_KEY, JSON.stringify(preference));
}

export function saveDocsAudienceProfile(profile: DocsAudienceProfile): void {
  writeDocsAudiencePreference({ profile, selectedAt: new Date().toISOString() });
}

export function dismissDocsAudiencePrompt(): void {
  writeDocsAudiencePreference({ dismissed: true, selectedAt: new Date().toISOString() });
}
