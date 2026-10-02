import type { SpecialDate } from '../types/specialDate';

/**
 * Every special day lives here — and only here. Without a `year` they repeat
 * every year: June 19 is highlighted in 2026, 2027, …
 * With a `year` they are a one-time memory, shown only on that exact date.
 *
 * To add a day:   copy a block, change month (1–12) and day.
 * Two things on one day: put both in the same `events` list (see June 19).
 * Wording:        titles are read by Rahul, so write them from his side —
 *                 "My Mom's Birthday" = his mom, "Priya's Birthday" = yours.
 * To add photos:  drop files in public/photos and list them, e.g.
 *                 photos: ['/photos/anniversary-1.jpg', '/photos/anniversary-2.jpg']
 *
 * A one-time memory with photos (any date, not just the ones below):
 *   {
 *     year: 2025, month: 2, day: 14,
 *     events: [{ title: 'Our first trip', type: 'memory', icon: 'heart', photos: ['/photos/trip-1.jpg'] }],
 *   },
 */
export const specialDates: SpecialDate[] = [
  {
    month: 6,
    day: 19,
    events: [
      { title: 'Our Anniversary', emoji: '❤️', type: 'anniversary', icon: 'heart', googleCalendar: true, photos: [] },
      { title: "My Dad's Birthday", emoji: '🎂', type: 'birthday', icon: 'cake', googleCalendar: true, photos: [] },
    ],
  },
  {
    month: 6,
    day: 30,
    events: [{ title: "My Mom's Birthday", emoji: '🎂', type: 'birthday', icon: 'cake', googleCalendar: true, photos: [] }],
  },
  {
    month: 8,
    day: 1,
    events: [{ title: "Girlfriend's Day", emoji: '♡', type: 'celebration', icon: 'heart', googleCalendar: true, photos: [] }],
  },
  {
    month: 9,
    day: 4,
    events: [
      { title: "My Parents' Anniversary", emoji: '❤️', type: 'anniversary', icon: 'heart', googleCalendar: true, photos: [] },
    ],
  },
  {
    month: 10,
    day: 3,
    events: [{ title: "Boyfriend's Day", emoji: '❤️', type: 'celebration', icon: 'heart', googleCalendar: true, photos: [] }],
  },
  {
    month: 11,
    day: 1,
    events: [{ title: 'My Birthday', emoji: '🎂', type: 'birthday', icon: 'cake', googleCalendar: true, photos: [] }],
  },
  {
    month: 11,
    day: 21,
    events: [{ title: "Priya's Birthday", emoji: '🎂', type: 'birthday', icon: 'cake', googleCalendar: true, photos: [] }],
  },

  // ---------- one-time memories (only on that exact date) ----------
  {
    year: 2024,
    month: 5,
    day: 5,
    events: [{ title: 'Our First IV', type: 'memory', icon: 'heart', photos: ['/photos/may5-1.jpeg', '/photos/may5-2.jpeg'] }],
  },
  {
    year: 2025,
    month: 5,
    day: 10,
    events: [
      {
        title: 'Our Second IV & First Pic Together',
        type: 'memory',
        icon: 'heart',
        photos: ['/photos/may10-2025-1.jpeg', '/photos/may10-2025-2.jpeg'],
      },
    ],
  },
  {
    year: 2025,
    month: 5,
    day: 23,
    events: [
      { title: 'Our First Proper Selfie', type: 'memory', icon: 'heart', photos: ['/photos/may23-2025-1.jpeg', '/photos/may23-2025-2.jpeg'] },
    ],
  },
  {
    year: 2025,
    month: 7,
    day: 28,
    events: [{ title: 'Our First Matching Dress', type: 'memory', icon: 'heart', photos: ['/photos/july282025-1.jpeg'] }],
  },
  {
    year: 2025,
    month: 7,
    day: 29,
    events: [{ title: 'Our First Fight IRL', type: 'memory', icon: 'heart', photos: ['/photos/july292025-1.jpeg'] }],
  },
  {
    year: 2025,
    month: 9,
    day: 13,
    events: [
      {
        title: 'Our First Onam',
        type: 'memory',
        icon: 'heart',
        photos: [
          '/photos/sept13-1.jpeg',
          '/photos/sept13-2.jpeg',
          '/photos/sept13-3.jpeg',
          '/photos/sept13-4.jpeg',
          '/photos/sept13-5.jpeg',
          '/photos/sept13-6.jpeg',
          '/photos/sept13-7.jpeg',
        ],
      },
    ],
  },
  {
    year: 2025,
    month: 10,
    day: 10,
    events: [
      { title: 'Our First Hug & Kiss', type: 'memory', icon: 'heart', photos: ['/photos/oct10-1.jpeg', '/photos/oct10-2.jpeg'] },
    ],
  },
  {
    year: 2025,
    month: 11,
    day: 8,
    events: [
      { title: 'Our First Intense Day at the Lab', type: 'memory', icon: 'heart', photos: ['/photos/nov8-1.jpeg', '/photos/nov8-2.jpeg'] },
    ],
  },
  {
    year: 2026,
    month: 5,
    day: 16,
    events: [
      {
        title: 'Our First Trip to Chennai Together',
        type: 'memory',
        icon: 'heart',
        photos: ['/photos/may16-1.jpeg', '/photos/may16-2.jpeg', '/photos/may16-3.jpeg', '/photos/may16-4.jpeg'],
      },
    ],
  },
  {
    year: 2026,
    month: 8,
    day: 19,
    events: [{ title: 'Treat for Getting Placed', type: 'memory', icon: 'heart', photos: ['/photos/aug19-1.jpeg'] }],
  },
  {
    year: 2026,
    month: 9,
    day: 19,
    events: [{ title: 'A Random Day', type: 'memory', icon: 'heart', photos: ['/photos/sept19-1.jpeg'] }],
  },
];
