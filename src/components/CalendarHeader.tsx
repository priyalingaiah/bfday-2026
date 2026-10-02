import { ChevronLeft, ChevronRight } from 'lucide-react';
import { addMonths, formatMonthYear, type YearMonth } from '../lib/date';
import { WavyLine } from './DecorativeElements';
import { IconButton } from './IconButton';

interface CalendarHeaderProps {
  month: YearMonth;
  headingId: string;
  isCurrentMonth: boolean;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

export function CalendarHeader({ month, headingId, isCurrentMonth, onPrev, onNext, onToday }: CalendarHeaderProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full items-center justify-between gap-3 sm:justify-center sm:gap-8">
        <IconButton label={`Previous month, ${formatMonthYear(addMonths(month, -1))}`} onClick={onPrev}>
          <ChevronLeft aria-hidden="true" strokeWidth={1.6} className="h-5 w-5" />
        </IconButton>

        <div className="flex flex-col items-center sm:w-[340px]">
          <h2
            id={headingId}
            aria-live="polite"
            className="text-center font-serif text-[32px] font-medium leading-none tracking-tight text-ink sm:text-[46px] lg:text-[50px]"
          >
            {formatMonthYear(month)}
          </h2>
          <WavyLine className="mt-1.5 h-2 w-24 text-dusty/80 sm:w-32" />
        </div>

        <IconButton label={`Next month, ${formatMonthYear(addMonths(month, 1))}`} onClick={onNext}>
          <ChevronRight aria-hidden="true" strokeWidth={1.6} className="h-5 w-5" />
        </IconButton>
      </div>

      <div className="flex h-8 items-center">
        {!isCurrentMonth && (
          <button
            type="button"
            onClick={onToday}
            className="rounded-full px-3 font-hand text-lg text-dusty-deep underline-offset-4 transition hover:underline"
          >
            back to this month <span aria-hidden="true">♡</span>
          </button>
        )}
      </div>
    </div>
  );
}
