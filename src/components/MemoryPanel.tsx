import { ArrowLeft } from 'lucide-react';
import { Fragment, useEffect, useId, useRef } from 'react';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { formatLongDate } from '../lib/date';
import type { SpecialDate } from '../types/specialDate';
import { HandHeart, PressedFlower, Tape, WavyLine } from './DecorativeElements';
import { EventCard } from './EventCard';

interface MemoryPanelProps {
  /** The date being viewed, YYYY-MM-DD. */
  date: string;
  special: SpecialDate;
  /** Previous / next special dates (may be in another year). */
  previousDate?: string;
  nextDate?: string;
  onNavigate: (iso: string) => void;
  onClose: () => void;
}

/**
 * The scrapbook page for one special day: the date, then every event on it
 * with its own Polaroids and Google Calendar button.
 * Nearly full screen on phones, a floating page on larger screens.
 */
export function MemoryPanel({ date, special, previousDate, nextDate, onNavigate, onClose }: MemoryPanelProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const multiple = special.events.length > 1;

  useFocusTrap(dialogRef, backRef);
  useBodyScrollLock();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
      <div aria-hidden="true" className="blossom-backdrop absolute inset-0 animate-fade-in" onClick={onClose} />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={`relative flex h-[calc(100dvh-14px)] w-full animate-memory-in flex-col sm:h-auto sm:max-h-[calc(100dvh-3rem)] sm:max-w-[600px] ${
          multiple ? 'lg:max-w-[920px]' : ''
        }`}
      >
        <Tape className="absolute -top-2.5 left-1/2 z-10 h-6 w-24 -translate-x-1/2 rotate-[2deg] sm:-top-3 sm:h-7 sm:w-28" />

        <div className="paper-texture safe-bottom relative flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden rounded-t-[26px] bg-card px-5 pt-5 shadow-panel sm:rounded-[28px] sm:px-8 sm:pt-6">
          <div className="flex items-center justify-between">
            <button
              ref={backRef}
              type="button"
              onClick={onClose}
              className="-ml-2 inline-flex items-center gap-2 rounded-full px-2 py-2 font-serif text-[17px] text-ink-soft transition hover:text-dusty-deep"
            >
              <ArrowLeft aria-hidden="true" strokeWidth={1.4} className="h-[18px] w-[18px]" />
              Back to Calendar
            </button>
            <HandHeart filled className="h-6 w-6 text-dusty" />
          </div>

          <header key={`head-${date}`} className="mt-2 flex animate-fade-in flex-col items-center text-center">
            <h2 id={titleId} className="font-serif text-[30px] font-medium leading-tight text-ink sm:text-[34px]">
              {formatLongDate(date)}
            </h2>
            <WavyLine className="mt-1.5 h-2 w-28 text-dusty/75" />
          </header>

          <div key={`events-${date}`} className={`mt-6 grid gap-y-8 sm:mt-7 ${multiple ? 'lg:grid-cols-2 lg:gap-x-12' : ''}`}>
            {special.events.map((event, i) => (
              <Fragment key={`${event.title}-${i}`}>
                {i > 0 && <WavyLine className="mx-auto h-2 w-full max-w-[260px] text-line lg:hidden" />}
                <EventCard event={event} date={date} compact={multiple} flowerSide={i % 2 ? 'left' : 'right'} />
              </Fragment>
            ))}
          </div>

          <nav aria-label="Other special days" className="mt-auto flex items-center justify-between gap-4 pt-6 font-hand text-lg text-ink-soft">
            {previousDate ? (
              <button type="button" onClick={() => onNavigate(previousDate)} className="rounded-full px-1 transition hover:text-dusty-deep">
                <span aria-hidden="true">‹ </span>
                <span className="sr-only">Previous special day, </span>
                {formatLongDate(previousDate)}
              </button>
            ) : (
              <span />
            )}
            {nextDate && (
              <button type="button" onClick={() => onNavigate(nextDate)} className="rounded-full px-1 text-right transition hover:text-dusty-deep">
                <span className="sr-only">Next special day, </span>
                {formatLongDate(nextDate)}
                <span aria-hidden="true"> ›</span>
              </button>
            )}
          </nav>
        </div>

        <PressedFlower className="pointer-events-none absolute -left-8 top-28 hidden w-16 -rotate-[24deg] sm:block" />
      </div>
    </div>
  );
}
