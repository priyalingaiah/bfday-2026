import { formatAccessibleDate, type CalendarDay as Day } from '../lib/date';
import { getSpecialDate } from '../lib/specialDates';
import { DAY_CELL_BASE } from './dayCellStyles';
import { SpecialDate } from './SpecialDate';

interface CalendarDayProps {
  day: Day;
  selected?: boolean;
  onOpen: (iso: string) => void;
}

/** One cell: greyed out (other month), plain, or a special date. */
export function CalendarDay({ day, selected = false, onOpen }: CalendarDayProps) {
  if (!day.inMonth) {
    return (
      <div aria-hidden="true" className={`${DAY_CELL_BASE} text-ink-faint/70`}>
        {day.day}
      </div>
    );
  }

  const special = getSpecialDate(day.iso);
  if (special) return <SpecialDate day={day} special={special} selected={selected} onOpen={onOpen} />;

  return (
    <div className={`${DAY_CELL_BASE} border border-line bg-card text-ink shadow-cell ${day.isToday ? 'ring-1 ring-dusty/35' : ''}`}>
      <span className="sr-only">
        {formatAccessibleDate(day.iso)}
        {day.isToday ? ', today' : ''}
      </span>
      <span aria-hidden="true">{day.day}</span>
      {day.isToday && <span aria-hidden="true" className="absolute bottom-1.5 h-1 w-1 rounded-full bg-dusty sm:bottom-2" />}
    </div>
  );
}
