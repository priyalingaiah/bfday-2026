import { useId } from 'react';
import type { MonthDirection } from '../hooks/useCalendarMonth';
import type { YearMonth } from '../lib/date';
import { CalendarGrid } from './CalendarGrid';
import { CalendarHeader } from './CalendarHeader';

interface CalendarProps {
  month: YearMonth;
  direction: MonthDirection;
  isCurrentMonth: boolean;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  /** Highlighted with a stronger rose accent (the last day opened). */
  selectedDate?: string | null;
  onOpenDate: (iso: string) => void;
}

export function Calendar({ month, direction, isCurrentMonth, onPrev, onNext, onToday, selectedDate, onOpenDate }: CalendarProps) {
  const headingId = useId();

  return (
    <section aria-labelledby={headingId} className="min-w-0">
      <CalendarHeader
        month={month}
        headingId={headingId}
        isCurrentMonth={isCurrentMonth}
        onPrev={onPrev}
        onNext={onNext}
        onToday={onToday}
      />
      <CalendarGrid month={month} direction={direction} selectedDate={selectedDate} onOpen={onOpenDate} />
    </section>
  );
}
