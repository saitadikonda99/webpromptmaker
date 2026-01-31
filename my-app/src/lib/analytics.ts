/**
 * Lightweight client-side analytics. Events are stored in localStorage only.
 * Never blocks UI; fails silently if storage is unavailable.
 */

const STORAGE_KEY = "promptforge-analytics";
const MAX_EVENTS = 200;

export interface AnalyticsEvent {
  name: string;
  timestamp: number;
  payload?: Record<string, unknown>;
}

function readEvents(): AnalyticsEvent[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AnalyticsEvent[]) : [];
  } catch {
    return [];
  }
}

function writeEvents(events: AnalyticsEvent[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch {
    // Fail silently (e.g. quota, private mode)
  }
}

/**
 * Record an event. Non-blocking; fails silently if storage unavailable.
 */
export function trackEvent(name: string, payload?: object): void {
  try {
    const events = readEvents();
    events.push({
      name,
      timestamp: Date.now(),
      payload: payload ? (payload as Record<string, unknown>) : undefined,
    });
    const trimmed = events.slice(-MAX_EVENTS);
    writeEvents(trimmed);
  } catch {
    // Never block UI
  }
}

/**
 * Return the last stored events (newest last). Empty array if none or on error.
 */
export function getAnalytics(): AnalyticsEvent[] {
  return readEvents();
}

/**
 * Clear all stored analytics events.
 */
export function clearAnalytics(): void {
  try {
    if (typeof window !== "undefined") localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Fail silently
  }
}
