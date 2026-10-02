import { addDays } from '../date';
import type { CalendarEvent, CalendarProvider } from './types';

const compact = (iso: string) => iso.replace(/-/g, '');

/**
 * Google Calendar "event template" link — opens Google Calendar with the
 * event pre-filled; the user just presses Save. No OAuth required.
 */
export function buildGoogleCalendarUrl(event: CalendarEvent): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    // all-day events use an exclusive end date
    dates: `${compact(event.date)}/${compact(addDays(event.date, 1))}`,
  });
  if (event.description) params.set('details', event.description);
  if (event.recurrence === 'yearly') params.set('recur', 'RRULE:FREQ=YEARLY');
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export const googleUrlProvider: CalendarProvider = {
  id: 'google-url',
  label: 'Google Calendar',
  async addEvent(event) {
    const url = buildGoogleCalendarUrl(event);
    const tab = window.open(url, '_blank');
    if (!tab) return { ok: false, error: 'The new tab was blocked by the browser.', url };
    tab.opener = null;
    return { ok: true, url };
  },
};
