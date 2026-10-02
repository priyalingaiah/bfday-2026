import { useState } from 'react';
import { site } from '../data/site';
import { calendarService } from '../lib/calendar/calendarService';
import type { SpecialEvent } from '../types/specialDate';

type Status = { state: 'idle' } | { state: 'working' } | { state: 'done' } | { state: 'error'; url?: string };

interface GoogleCalendarButtonProps {
  event: SpecialEvent;
  /** The date the event starts from (it then repeats yearly). */
  date: string;
  className?: string;
}

/** A small calendar page with "31" — a quiet nod to the Google Calendar icon. */
function CalendarGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="h-[22px] w-[22px] shrink-0">
      <rect x="3.5" y="4.5" width="17" height="16" rx="2.5" className="fill-polaroid stroke-dusty-deep/70" strokeWidth={1.2} />
      <path d="M3.5 7a2.5 2.5 0 0 1 2.5-2.5h12A2.5 2.5 0 0 1 20.5 7v2.2h-17Z" className="fill-dusty/80" />
      <path d="M8 3v3M16 3v3" className="stroke-dusty-deep/80" strokeWidth={1.3} strokeLinecap="round" />
      <text x="12" y="17.6" textAnchor="middle" className="fill-dusty-deep font-serif" fontSize="8" fontWeight="600">
        31
      </text>
    </svg>
  );
}

/**
 * "Add to Google Calendar ♡" for one event. Opens Google Calendar with an
 * all-day, yearly event pre-filled — nothing is added until the user saves it.
 */
export function GoogleCalendarButton({ event, date, className = '' }: GoogleCalendarButtonProps) {
  const [status, setStatus] = useState<Status>({ state: 'idle' });

  const handleClick = async () => {
    setStatus({ state: 'working' });
    const result = await calendarService.addEvent(event, date);
    setStatus(result.ok ? { state: 'done' } : { state: 'error', url: result.url });
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <button
        type="button"
        onClick={handleClick}
        aria-label={`${site.googleCalendarLabel}: ${event.title} (every year)`}
        data-gcal
        aria-busy={status.state === 'working'}
        className="paper-texture inline-flex items-center gap-2.5 rounded-full border border-dusty/35 bg-polaroid py-2.5 pl-4 pr-5 font-serif text-[17px] font-medium text-dusty-deep shadow-cell transition duration-300 hover:-translate-y-px hover:border-dusty/60 hover:bg-blush-soft hover:shadow-lift"
      >
        <CalendarGlyph />
        <span>
          {site.googleCalendarLabel}
          <span aria-hidden="true"> ♡</span>
        </span>
      </button>

      <p aria-live="polite" className="mt-1.5 min-h-[1.5rem] text-center font-hand text-[17px] text-dusty-deep">
        {status.state === 'done' && 'opened in a new tab — just press save ♡'}
        {status.state === 'error' &&
          (status.url ? (
            <>
              your browser blocked the new tab —{' '}
              <a href={status.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                open it here
              </a>
            </>
          ) : (
            'something went wrong, please try again'
          ))}
      </p>
    </div>
  );
}
