/** Provider-agnostic description of an all-day calendar event. */
export interface CalendarEvent {
  title: string;
  /** All-day event date, YYYY-MM-DD. */
  date: string;
  description?: string;
  recurrence: 'yearly' | 'none';
}

export type AddEventResult =
  | { ok: true; url?: string }
  | { ok: false; error: string; url?: string };

/**
 * Anything that can put an event in a calendar.
 * Today: a URL-template provider (no login). Next phase: an OAuth/API provider.
 */
export interface CalendarProvider {
  id: string;
  label: string;
  addEvent(event: CalendarEvent): Promise<AddEventResult>;
}
