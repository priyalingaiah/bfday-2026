/**
 * Small hand-drawn marks. All use `currentColor`, so colour them with text-* classes.
 * Every one is decorative (aria-hidden) — meaning is always carried by real text.
 */

interface MarkProps {
  className?: string;
}

const svgProps = { 'aria-hidden': true, focusable: false } as const;

/** A slightly wobbly heart whose stroke overshoots where it closes, like a pen line. */
export function HandHeart({ className = '', filled = false }: MarkProps & { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...svgProps}>
      <path
        d="M12.2 20.4C9.3 18.3 4.2 14.6 3.5 10.3 2.9 6.7 5.3 4.3 8 4.7c2 .3 3.4 2 4 3.8.7-2.1 2.4-3.9 4.6-4 2.8-.1 4.7 2.5 4 5.7-.8 3.9-5.3 7.4-8.9 10.6"
        fill={filled ? 'currentColor' : 'none'}
        fillOpacity={filled ? 0.9 : undefined}
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Tiny calendar page with a heart — marks the dates that can go to Google Calendar. */
export function HandCalendar({ className = '' }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" {...svgProps}>
      <g stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.2 6.4c-.1-.8.5-1.4 1.3-1.4l13.1-.2c.8 0 1.4.6 1.4 1.4l.2 12.5c0 .8-.6 1.4-1.4 1.4l-13.4.2c-.8 0-1.4-.6-1.4-1.4Z" />
        <path d="M4.4 9.7l15.5-.3" />
        <path d="M8.4 3.2v3M15.6 3.1v3" />
      </g>
      <path
        d="M12 17.4c-1.6-1.1-2.9-2.2-2.8-3.5.1-1 1.4-1.4 2.7-.3 1.3-1.2 2.7-.8 2.9.2.1 1.3-1.2 2.5-2.8 3.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Little two-tier cake with one candle — marks birthdays. */
export function HandCake({ className = '' }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" {...svgProps}>
      <path d="M12 2.6c1 1.1 1 2.2 0 2.9-1-.7-1-1.8 0-2.9Z" fill="currentColor" />
      <g stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 6.6v3" />
        <path d="M5.4 13.8V11c0-.7.5-1.2 1.2-1.2h10.8c.7 0 1.2.5 1.2 1.2v2.8" />
        <path d="M4.3 14.1h15.5l-.1 5.4c0 .6-.5 1.1-1.1 1.1H5.5c-.6 0-1.1-.5-1.1-1.1Z" />
        <path d="M4.4 14.3c1.3 1.5 2.6 1.5 3.9.1 1.3 1.4 2.6 1.4 3.8 0 1.3 1.4 2.6 1.4 3.9 0 1.2 1.1 2.4 1.4 3.7.4" />
      </g>
    </svg>
  );
}

/** Four-point twinkle. */
export function Sparkle({ className = '' }: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...svgProps}>
      <path d="M12 2c.6 6 2 8.6 10 10-8 1.4-9.4 4-10 10-.6-6-2-8.6-10-10 8-1.4 9.4-4 10-10Z" fill="currentColor" />
    </svg>
  );
}

/** Thin ribbon bow. */
export function Bow({ className = '' }: MarkProps) {
  return (
    <svg viewBox="0 0 48 34" className={className} {...svgProps}>
      <g stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 14C18 4 6 2 5 9c-1 7 10 8 19 5Z" className="fill-blush-soft" />
        <path d="M24 14c6-10 18-12 19-5 1 7-10 8-19 5Z" className="fill-blush-soft" />
        <path d="M23 15c-3 6-6 11-10 15M25 15c3 6 6 11 11 14" fill="none" />
        <circle cx="24" cy="14" r="2.6" className="fill-blush" />
      </g>
    </svg>
  );
}

/** A pen line that isn't quite straight. */
export function WavyLine({ className = '' }: MarkProps) {
  return (
    <svg viewBox="0 0 120 8" preserveAspectRatio="none" className={className} fill="none" {...svgProps}>
      <path
        d="M2 5c10-3 18 2 28-1s18-2 28 1 18 2 28-1 20-2 32 1"
        stroke="currentColor"
        strokeWidth={1.2}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** Loopy arrow drawn from the note towards the calendar. */
export function CurvedArrow({ className = '' }: MarkProps) {
  return (
    <svg viewBox="0 0 100 56" className={className} fill="none" {...svgProps}>
      <g stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 6c1 24 20 40 40 36 12-2 12-15 4-15s-8 14 4 18c12 4 26 0 40-8" />
        <path d="M84 32l10 5-8 7" />
      </g>
    </svg>
  );
}
