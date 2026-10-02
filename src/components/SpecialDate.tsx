import { useState } from 'react';
import { formatAccessibleDate, type CalendarDay } from '../lib/date';
import { coverPhoto, iconsFor } from '../lib/specialDates';
import type { SpecialDate as SpecialDateData } from '../types/specialDate';
import { DAY_CELL_BASE } from './dayCellStyles';
import { HandHeart } from './DecorativeElements';
import { EventMark } from './Markers';
import { PhotoImage } from './PhotoImage';

interface SpecialDateProps {
  day: CalendarDay;
  special: SpecialDateData;
  /** The day opened last — gets the strongest dusty-rose accent. */
  selected: boolean;
  onOpen: (iso: string) => void;
}

function describe(day: CalendarDay, special: SpecialDateData): string {
  const titles = special.events.map((event) => event.title).join(', ');
  return `${formatAccessibleDate(day.iso)}${day.isToday ? ', today' : ''} — ${titles}. Open memories.`;
}

/** A blush date with tiny hand-drawn marks (♡ for our days, a cake for birthdays). */
export function SpecialDate({ day, special, selected, onOpen }: SpecialDateProps) {
  const [thumbLoaded, setThumbLoaded] = useState(false);
  const thumbnail = coverPhoto(special);
  const icons = iconsFor(special);

  // photo days sit a touch crooked, like prints tucked into an album
  const tilt = thumbLoaded ? (day.day % 2 ? '-rotate-[1.5deg]' : 'rotate-[1.2deg]') : '';
  const surface = thumbLoaded ? 'bg-polaroid' : 'bg-blush font-medium text-dusty-deep hover:bg-note';
  const border = selected ? 'border-dusty ring-2 ring-dusty/30' : thumbLoaded ? 'border-line' : 'border-rose-line';
  const todayRing = day.isToday && !selected ? 'ring-1 ring-dusty/40 ring-offset-2 ring-offset-card' : '';

  return (
    <button
      type="button"
      onClick={() => onOpen(day.iso)}
      aria-label={describe(day, special)}
      aria-current={selected ? 'date' : undefined}
      className={`${DAY_CELL_BASE} group border shadow-cell transition duration-300 ease-out hover:-translate-y-1 hover:shadow-lift ${tilt} ${surface} ${border} ${todayRing}`}
    >
      {thumbnail && (
        <PhotoImage
          src={thumbnail}
          alt=""
          fallback={null}
          onLoad={() => setThumbLoaded(true)}
          className={`photo-warm absolute inset-1 h-[calc(100%-0.5rem)] w-[calc(100%-0.5rem)] rounded-[5px] object-cover transition-opacity duration-500 ${
            thumbLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      <span
        aria-hidden="true"
        className={
          thumbLoaded ? 'absolute bottom-1.5 left-1.5 rounded-sm bg-polaroid/90 px-1 text-xs leading-tight text-ink sm:text-sm' : 'relative'
        }
      >
        {day.day}
      </span>

      <span
        aria-hidden="true"
        className={`absolute right-1 top-1 flex gap-0.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:rotate-[-6deg] sm:right-1.5 sm:top-1.5 ${
          thumbLoaded ? 'rounded-full bg-polaroid/90 p-0.5' : ''
        }`}
      >
        {icons.map((icon) => (
          <EventMark key={icon} icon={icon} />
        ))}
      </span>

      <HandHeart
        filled
        className="absolute bottom-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 text-dusty opacity-0 transition duration-500 group-hover:animate-heartbeat group-hover:opacity-100 group-focus-visible:opacity-100 sm:bottom-1.5"
      />
    </button>
  );
}
