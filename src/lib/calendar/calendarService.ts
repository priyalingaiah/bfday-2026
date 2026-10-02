import type { SpecialEvent } from '../../types/specialDate';
import { emojiFor } from '../specialDates';
import { googleUrlProvider } from './googleUrlProvider';
import type { CalendarEvent, CalendarProvider } from './types';

/**
 * The single place the UI talks to for calendar actions.
 * To move to the real Google Calendar API later, implement a
 * `googleApiProvider` (OAuth + events.insert) and swap it in here.
 */
const activeProvider: CalendarProvider = googleUrlProvider;

/** One special event → one all-day, yearly calendar event, starting on `iso`. */
export function specialEventToCalendarEvent(event: SpecialEvent, iso: string): CalendarEvent {
  const pageUrl = typeof window !== 'undefined' ? window.location.href.split('#')[0] : '';
  return {
    title: `${event.title} ${emojiFor(event)}`,
    date: iso,
    description: pageUrl ? `From our little calendar ♡ ${pageUrl}` : undefined,
    recurrence: 'yearly',
  };
}

export const calendarService = {
  providerLabel: activeProvider.label,
  addEvent(event: SpecialEvent, iso: string) {
    return activeProvider.addEvent(specialEventToCalendarEvent(event, iso));
  },
};
