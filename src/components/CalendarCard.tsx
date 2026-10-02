import type { ReactNode } from 'react';
import { Bow, FlowerSprig, Tape } from './DecorativeElements';

interface CalendarCardProps {
  aside: ReactNode;
  children: ReactNode;
}

/** The ivory paper sheet on the desk that holds the pinned photo and the calendar. */
export function CalendarCard({ aside, children }: CalendarCardProps) {
  return (
    <div className="relative animate-rise">
      <div aria-hidden="true" className="sheet-under absolute inset-0" />

      <div className="sheet relative grid gap-5 p-4 pt-6 sm:p-6 sm:pt-7 lg:grid-cols-[minmax(230px,16vw)_minmax(0,1fr)] lg:gap-[3vw] lg:px-[2.5vw] lg:pb-10 lg:pt-9">
        {aside}
        {children}
      </div>

      {/* taped corner with a little bow */}
      <Tape className="absolute -right-3 -top-2 h-7 w-24 rotate-[38deg] sm:w-28" />
      <Bow className="pointer-events-none absolute right-5 top-3 hidden w-9 rotate-[18deg] text-dusty-deep/70 sm:block" />

      <FlowerSprig variant="pink" className="pointer-events-none absolute -bottom-7 -left-6 hidden w-20 rotate-[14deg] lg:block" />
    </div>
  );
}
