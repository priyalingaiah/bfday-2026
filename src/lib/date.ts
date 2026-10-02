/** A calendar month. `month` is 0-based, matching the JS Date API. */
export interface YearMonth {
  year: number;
  month: number;
}

export interface CalendarDay {
  iso: string;
  day: number;
  inMonth: boolean;
  isToday: boolean;
}

export const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

const WEEKDAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** "Jan" … "Dec" */
export const MONTH_SHORT = MONTH_NAMES.map((name) => name.slice(0, 3));

const pad = (n: number) => String(n).padStart(2, '0');

export function toISODate(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** Parses "YYYY-MM-DD" as a local date. Returns null for malformed or impossible dates. */
export function parseISODate(iso: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return null;
  const [year, month, day] = [Number(match[1]), Number(match[2]) - 1, Number(match[3])];
  const date = new Date(year, month, day);
  return date.getMonth() === month && date.getDate() === day ? date : null;
}

export function addDays(iso: string, days: number): string {
  const date = parseISODate(iso);
  if (!date) throw new Error(`Invalid date: ${iso}`);
  date.setDate(date.getDate() + days);
  return toISODate(date);
}

export function currentYearMonth(today = new Date()): YearMonth {
  return { year: today.getFullYear(), month: today.getMonth() };
}

export function yearMonthOf(iso: string): YearMonth | null {
  const date = parseISODate(iso);
  return date ? { year: date.getFullYear(), month: date.getMonth() } : null;
}

export function addMonths({ year, month }: YearMonth, delta: number): YearMonth {
  const date = new Date(year, month + delta, 1);
  return { year: date.getFullYear(), month: date.getMonth() };
}

/** Negative if a is before b, 0 if same month, positive if after. */
export function compareYearMonth(a: YearMonth, b: YearMonth): number {
  return (a.year - b.year) * 12 + (a.month - b.month);
}

/**
 * Full weeks (Sun–Sat) covering the month, including the greyed-out
 * days of the neighbouring months. 4–6 rows depending on the month.
 */
export function getMonthGrid({ year, month }: YearMonth, today = new Date()): CalendarDay[] {
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cellCount = Math.ceil((firstWeekday + daysInMonth) / 7) * 7;
  const todayIso = toISODate(today);

  return Array.from({ length: cellCount }, (_, i) => {
    const date = new Date(year, month, 1 - firstWeekday + i);
    const iso = toISODate(date);
    return {
      iso,
      day: date.getDate(),
      inMonth: date.getMonth() === month,
      isToday: iso === todayIso,
    };
  });
}

export function formatMonthYear({ year, month }: YearMonth): string {
  return `${MONTH_NAMES[month]} ${year}`;
}

/** "14 October 2026" */
export function formatLongDate(iso: string): string {
  const date = parseISODate(iso);
  if (!date) return iso;
  return `${date.getDate()} ${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
}

/** "Wednesday, 14 October 2026" — for screen readers. */
export function formatAccessibleDate(iso: string): string {
  const date = parseISODate(iso);
  if (!date) return iso;
  return `${WEEKDAY_NAMES[date.getDay()]}, ${formatLongDate(iso)}`;
}
