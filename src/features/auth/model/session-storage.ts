import type { UserProfile } from "@/shared/types/domain";

interface StoredSession {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: UserProfile | null;
}

const SESSION_KEY = "template-app:session";

/** Save session data to localStorage */
export function saveSession(session: StoredSession): void {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    // localStorage may be unavailable (private browsing, quota exceeded)
  }
}

/** Load session data from localStorage. Returns null if not found or invalid. */
export function loadSession(): StoredSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredSession;
    if (!parsed.accessToken || !parsed.refreshToken) return null;
    return parsed;
  } catch {
    return null;
  }
}

/** Clear session data from localStorage */
export function clearSession(): void {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    // best effort
  }
}

export type { StoredSession };
