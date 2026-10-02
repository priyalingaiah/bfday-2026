import { specialDates as rawSpecialDates } from '../data/specialDates';
import type { EventIcon, SpecialDate, SpecialEvent } from '../types/specialDate';
import { parseISODate, toISODate } from './date';

const keyOf = (month: number, day: number) => `${month}-${day}`;
const datedKeyOf = (year: number, month: number, day: number) => `${year}-${month}-${day}`;

// days per month in a leap year, so 29 February is accepted
const MAX_DAYS = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function isValid(entry: SpecialDate): boolean {
  const monthDayOk =
    Number.isInteger(entry.month) && entry.month >= 1 && entry.month <= 12 && entry.day >= 1 && entry.day <= MAX_DAYS[entry.month - 1];
  if (!monthDayOk) return false;
  // a one-time date must really exist in that year (no 29 Feb 2027)
  if (entry.year === undefined) return true;
  const date = new Date(entry.year, entry.month - 1, entry.day);
  return date.getMonth() === entry.month - 1;
}

function addTo(index: Map<string, SpecialDate>, key: string, entry: SpecialDate) {
  const existing = index.get(key);
  // the same day listed twice: merge the events instead of losing one
  index.set(key, existing ? { ...existing, events: [...existing.events, ...entry.events] } : entry);
}

// every-year days by month-day, one-time memories by year-month-day
const yearly = new Map<string, SpecialDate>();
const oneTime = new Map<string, SpecialDate>();

for (const entry of rawSpecialDates) {
  if (!isValid(entry)) {
    if (import.meta.env.DEV) console.warn(`[specialDates] Skipping invalid date year=${entry.year ?? 'every'} month=${entry.month} day=${entry.day}.`);
    continue;
  }
  if (entry.year === undefined) addTo(yearly, keyOf(entry.month, entry.day), entry);
  else addTo(oneTime, datedKeyOf(entry.year, entry.month, entry.day), entry);
}

function lookup(date: Date): SpecialDate | undefined {
  const every = yearly.get(keyOf(date.getMonth() + 1, date.getDate()));
  const once = oneTime.get(datedKeyOf(date.getFullYear(), date.getMonth() + 1, date.getDate()));
  if (every && once) return { ...every, events: [...every.events, ...once.events] };
  return every ?? once;
}

/** Everything that falls on this date: yearly days plus any one-time memory from that exact year. */
export function getSpecialDate(iso: string | null): SpecialDate | undefined {
  const date = iso ? parseISODate(iso) : null;
  return date ? lookup(date) : undefined;
}

/** The next (1) or previous (-1) special date from `iso`, crossing years if needed. */
export function getAdjacentSpecialDay(iso: string, direction: -1 | 1): string | undefined {
  const date = parseISODate(iso);
  if (!date || yearly.size + oneTime.size === 0) return undefined;
  // four years covers a 29 February-only calendar; one-time memories further away are found too
  const limit = yearly.size > 0 ? 366 * 4 : 366 * 50;
  for (let i = 0; i < limit; i++) {
    date.setDate(date.getDate() + direction);
    if (lookup(date)) return toISODate(date);
  }
  return undefined;
}

/**
 * All special days in a month (1–12), in day order — ready for a per-month memory collection.
 * Pass a year to include that year's one-time memories too.
 */
export function getSpecialDatesInMonth(month: number, year?: number): SpecialDate[] {
  const days = [...yearly.values(), ...[...oneTime.values()].filter((d) => d.year === year)];
  return days.filter((d) => d.month === month).sort((a, b) => a.day - b.day);
}

/** First photo of any event on the day — used as the tiny calendar thumbnail. */
export function coverPhoto(special: SpecialDate): string | undefined {
  return special.events.find((event) => event.photos.length > 0)?.photos[0];
}

/** Distinct icons for a day, in event order (June 19 → heart + cake). */
export function iconsFor(special: SpecialDate): EventIcon[] {
  return [...new Set(special.events.map((event) => event.icon))];
}

const DEFAULT_EMOJI: Record<EventIcon, string> = { heart: '❤️', cake: '🎂' };

export function emojiFor(event: SpecialEvent): string {
  return event.emoji ?? DEFAULT_EMOJI[event.icon];
}
