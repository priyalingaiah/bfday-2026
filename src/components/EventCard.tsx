import type { SpecialEvent } from '../types/specialDate';
import { GoogleCalendarButton } from './GoogleCalendarButton';
import { EventMark } from './Markers';
import { PolaroidGallery } from './PolaroidGallery';

interface EventCardProps {
  event: SpecialEvent;
  /** The date being viewed, YYYY-MM-DD. */
  date: string;
  compact?: boolean;
  flowerSide?: 'left' | 'right';
}

/** One event on a special day: its title, its Polaroids and its calendar button. */
export function EventCard({ event, date, compact = false, flowerSide }: EventCardProps) {
  return (
    <article className="flex w-full min-w-0 flex-col items-center">
      <header className="flex flex-col items-center text-center">
        <h3 className="flex items-center gap-2 font-serif text-[23px] font-medium leading-tight text-dusty-deep sm:text-[26px]">
          <EventMark icon={event.icon} size="md" className="shrink-0 transition-transform duration-500 hover:rotate-[-8deg] hover:scale-110" />
          {event.title}
        </h3>
      </header>

      {/* no photos yet → no empty placeholder, just the title and button */}
      {event.photos.length > 0 && <PolaroidGallery photos={event.photos} label={event.title} compact={compact} flowerSide={flowerSide} />}

      {event.googleCalendar && <GoogleCalendarButton event={event} date={date} className={event.photos.length > 0 ? 'mt-7' : 'mt-5'} />}
    </article>
  );
}
