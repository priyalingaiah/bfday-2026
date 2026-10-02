import { useMemo } from 'react';
import type { MonthDirection } from '../hooks/useCalendarMonth';
import { getMonthGrid, WEEKDAYS, type YearMonth } from '../lib/date';
import { CalendarDay } from './CalendarDay';

interface CalendarGridProps {
  month: YearMonth;
  direction: MonthDirection;
  selectedDate?: string | null;
  onOpen: (iso: string) => void;
}

const GRID = 'grid grid-cols-7 gap-1.5 sm:gap-2.5 lg:gap-3';

function enterAnimation(direction: MonthDirection): string {
  if (direction === 1) return 'animate-month-next';
  if (direction === -1) return 'animate-month-prev';
  return 'animate-fade-in';
}

/** Weekday labels + the day cells, computed for any month and year (leap years included). */
export function CalendarGrid({ month, direction, selectedDate, onOpen }: CalendarGridProps) {
  const days = useMemo(() => getMonthGrid(month), [month]);

  return (
    <>
      <div className={`${GRID} mb-2 sm:mb-3`} aria-hidden="true">
        {WEEKDAYS.map((weekday) => (
          <div key={weekday} className="text-center font-serif text-sm italic text-ink-soft sm:text-lg">
            <span className="sm:hidden">{weekday.slice(0, 1)}</span>
            <span className="hidden sm:inline">{weekday}</span>
          </div>
        ))}
      </div>

      <div key={`${month.year}-${month.month}`} className={`${GRID} ${enterAnimation(direction)}`}>
        {days.map((day) => (
          <CalendarDay key={day.iso} day={day} selected={day.iso === selectedDate} onOpen={onOpen} />
        ))}
      </div>
    </>
  );
}
