import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MONTH_SHORT, currentYearMonth, formatMonthYear, type YearMonth } from '../lib/date';
import { getSpecialDatesInMonth } from '../lib/specialDates';
import { HandCake, HandHeart, Tape } from './DecorativeElements';

/** What a month holds: birthdays/anniversaries get a cake, our memories a heart. */
function monthMarks(month: number, year: number) {
  const events = getSpecialDatesInMonth(month, year).flatMap((day) => day.events);
  return {
    celebrations: events.some((e) => e.type === 'birthday' || e.type === 'anniversary'),
    memories: events.some((e) => e.type === 'memory' || e.type === 'celebration'),
  };
}

interface YearNavigatorProps {
  /** The month the calendar is showing. */
  month: YearMonth;
  onSelect: (month: YearMonth) => void;
}

/** A little pink note with the whole year on it — jump to any month or year in one click. */
export function YearNavigator({ month, onSelect }: YearNavigatorProps) {
  const { year } = month;
  const today = currentYearMonth();

  return (
    <nav aria-label="Jump to a month" className="relative lg:pt-4">
      <div className="note-paper relative mx-auto max-w-[460px] -rotate-1 px-4 pb-4 pt-6 lg:mx-0 lg:max-w-none lg:-rotate-[2deg] lg:px-6 lg:pb-7 lg:pt-9">
        <Tape variant="rose" className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 -rotate-[5deg] lg:h-7 lg:w-24" />

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => onSelect({ year: year - 1, month: month.month })}
            aria-label={`Previous year, ${year - 1}`}
            title={`${year - 1}`}
            className="rounded-full p-1.5 text-dusty-deep/80 transition hover:bg-blush-soft/70 hover:text-dusty-deep"
          >
            <ChevronLeft aria-hidden="true" strokeWidth={1.6} className="h-5 w-5" />
          </button>
          <p aria-live="polite" className="font-hand text-[30px] leading-none text-dusty-deep lg:text-[36px]">
            {year}
          </p>
          <button
            type="button"
            onClick={() => onSelect({ year: year + 1, month: month.month })}
            aria-label={`Next year, ${year + 1}`}
            title={`${year + 1}`}
            className="rounded-full p-1.5 text-dusty-deep/80 transition hover:bg-blush-soft/70 hover:text-dusty-deep"
          >
            <ChevronRight aria-hidden="true" strokeWidth={1.6} className="h-5 w-5" />
          </button>
        </div>

        <ul className="mt-3 grid grid-cols-6 gap-1 lg:mt-5 lg:grid-cols-3 lg:gap-x-1.5 lg:gap-y-2">
          {MONTH_SHORT.map((name, i) => {
            const target = { year, month: i };
            const active = i === month.month;
            const isNow = year === today.year && i === today.month;
            const { celebrations, memories } = monthMarks(i + 1, year);
            const marks = [celebrations && 'birthdays or anniversaries', memories && 'our memories'].filter(Boolean).join(' and ');
            return (
              <li key={name}>
                <button
                  type="button"
                  onClick={() => onSelect(target)}
                  aria-label={`${formatMonthYear(target)}${marks ? `, has ${marks}` : ''}${isNow ? ', this month' : ''}`}
                  aria-current={active ? 'date' : undefined}
                  className={`relative flex h-10 w-full items-center justify-center rounded-lg font-hand text-[19px] transition duration-300 lg:h-11 lg:text-[21px] ${
                    active
                      ? 'bg-dusty-deep/90 text-polaroid shadow-cell'
                      : 'text-ink hover:-translate-y-px hover:bg-blush-soft/80 hover:text-dusty-deep'
                  } ${isNow && !active ? 'underline decoration-dusty/60 decoration-wavy underline-offset-4' : ''}`}
                >
                  {name}
                  {(celebrations || memories) && (
                    <span
                      aria-hidden="true"
                      className={`absolute right-0.5 top-0.5 flex gap-px lg:right-1 lg:top-1 ${active ? 'text-polaroid/90' : 'text-dusty-deep'}`}
                    >
                      {celebrations && <HandCake className="h-3.5 w-3.5 lg:h-4 lg:w-4" />}
                      {memories && <HandHeart filled className="h-3 w-3 lg:h-3.5 lg:w-3.5" />}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
