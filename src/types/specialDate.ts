/** What kind of day an event is — shown as a small handwritten label. */
export type EventType = 'anniversary' | 'birthday' | 'celebration' | 'memory';

/** The tiny hand-drawn mark used in the calendar cell and the memory panel. */
export type EventIcon = 'heart' | 'cake';

export interface SpecialEvent {
  /** e.g. "Our Anniversary" */
  title: string;
  type: EventType;
  icon: EventIcon;
  /** Added to the Google Calendar event title, e.g. "Our Anniversary ❤️". Defaults by icon. */
  emoji?: string;
  /** Show "Add to Google Calendar ♡" for this event (yearly, all-day). */
  googleCalendar?: boolean;
  /**
   * Photos for this event, shown as Polaroids. Files live in /public/photos,
   * so "/photos/anniversary-1.jpg" → public/photos/anniversary-1.jpg.
   * Leave empty for a soft "our photo here" placeholder.
   */
  photos: string[];
}

/** A day holding one or more events — every year, or just one year if `year` is set. */
export interface SpecialDate {
  /** 1–12 (January = 1). */
  month: number;
  /** Day of the month. 29 February only appears in leap years. */
  day: number;
  /**
   * Leave out for days that come back every year (birthdays, anniversaries).
   * Set it for a one-time memory, e.g. a trip: { year: 2025, month: 2, day: 14, … }.
   */
  year?: number;
  events: SpecialEvent[];
}
