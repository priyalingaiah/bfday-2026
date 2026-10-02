# Our Little Calendar ♡

A small scrapbook-style memory calendar. React + Vite + TypeScript + Tailwind CSS.

## Run it

You need Node.js 18 or newer (https://nodejs.org).

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
```

## Add special dates

Everything lives in `src/data/specialDates.ts`. Dates repeat every year. The calendar matches on month + day, so they show up in 2026, 2027 and every year after.

```ts
{
  month: 6,            // 1–12
  day: 19,
  events: [            // one or more things on that day
    { title: "Our Anniversary", emoji: "❤️", type: "anniversary", icon: "heart", googleCalendar: true, photos: [] },
    { title: "My Dad's Birthday", emoji: "🎂", type: "birthday", icon: "cake", googleCalendar: true, photos: [] },
  ],
},
```

- `type`: `anniversary` | `birthday` | `celebration` (the small label under the title)
- `icon`: `heart` | `cake` (the tiny hand-drawn mark in the calendar cell)
- `googleCalendar: true`: shows "Add to Google Calendar ♡" for that event
- `emoji`: added to the Google Calendar event title, e.g. "Our Anniversary ❤️"

### One-time memories (any date)

Add a `year` and the day only shows in that year. If it falls on a yearly day, both show together.

```ts
{
  year: 2025, month: 2, day: 14,
  events: [{ title: "Our first trip", type: "memory", icon: "heart", photos: ["/photos/trip-1.jpg", "/photos/trip-2.jpg"] }],
},
```

## Add photographs

Put image files in `public/photos/` and list them on the event:

```ts
photos: ["/photos/anniversary-1.jpg", "/photos/anniversary-2.jpg"]
```

- An empty list (or a file that doesn't exist yet) shows a soft "our photo here ♡" Polaroid.
- `public/photos/hero.jpg` is the big header photo (path set in `src/data/site.ts`).
- Keep photos around 1600px on the long side (jpg or webp).
- `getSpecialDatesInMonth(month)` in `src/lib/specialDates.ts` returns a month's days in order, ready for a per-month memories page later.

## Google Calendar

```
GoogleCalendarButton  →  calendarService.addEvent(event, date)  →  activeProvider.addEvent(event)
(UI + status)            lib/calendar/calendarService.ts       lib/calendar/googleUrlProvider.ts
```

- Right now `googleUrlProvider` opens a pre-filled Google Calendar
  "event template" link: an all-day event that repeats every year. There's no login. The user presses Save.
- `lib/calendar/types.ts` defines the `CalendarProvider` interface.
- To use the real API later, write a `googleApiProvider` that implements the same
  interface (Google Identity Services OAuth with the `calendar.events` scope, then
  `events.insert` with `recurrence: ['RRULE:FREQ=YEARLY']`), and point
  `activeProvider` in `calendarService.ts` at it. No UI changes are needed.

## Theme

Every colour is a CSS variable in `src/index.css` (`:root`). Tailwind reads those
variables, so changing a value there changes it everywhere.
