import { useCallback, useState } from 'react';
import { BackgroundMusic } from './components/BackgroundMusic';
import { Calendar } from './components/Calendar';
import { CalendarCard } from './components/CalendarCard';
import { Hero } from './components/Hero';
import { MemoryPanel } from './components/MemoryPanel';
import { YearNavigator } from './components/YearNavigator';
import { useCalendarMonth } from './hooks/useCalendarMonth';
import { yearMonthOf } from './lib/date';
import { getAdjacentSpecialDay, getSpecialDate } from './lib/specialDates';

export default function App() {
  // selected month + year
  const calendar = useCalendarMonth();
  const { goTo } = calendar;
  // the day whose memory panel is open (null = panel closed)
  const [openDate, setOpenDate] = useState<string | null>(null);
  // the last day opened stays highlighted on the calendar
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const openSpecial = getSpecialDate(openDate);

  const openDay = useCallback((iso: string) => {
    setOpenDate(iso);
    setSelectedDate(iso);
  }, []);

  const closePanel = useCallback(() => setOpenDate(null), []);

  // browsing to another special day also moves the calendar to its month
  const navigateDay = useCallback(
    (iso: string) => {
      openDay(iso);
      const month = yearMonthOf(iso);
      if (month) goTo(month);
    },
    [goTo, openDay],
  );

  return (
    <>
      <BackgroundMusic />
      <div aria-hidden={openSpecial ? true : undefined} className="overflow-x-hidden">
        {/* a wide scrapbook spread: ~95vw on larger screens */}
        <div className="mx-auto w-full max-w-[2000px] pb-16 sm:w-[96vw] sm:pb-24 lg:w-[95vw]">
          <Hero />

          <main className="relative px-3 pt-7 sm:px-[1vw] sm:pt-9">
            <CalendarCard aside={<YearNavigator month={calendar.month} onSelect={goTo} />}>
              <Calendar
                month={calendar.month}
                direction={calendar.direction}
                isCurrentMonth={calendar.isCurrentMonth}
                onPrev={calendar.prev}
                onNext={calendar.next}
                onToday={calendar.goToToday}
                selectedDate={selectedDate}
                onOpenDate={openDay}
              />
            </CalendarCard>
          </main>
        </div>
      </div>

      {openDate && openSpecial && (
        <MemoryPanel
          date={openDate}
          special={openSpecial}
          previousDate={getAdjacentSpecialDay(openDate, -1)}
          nextDate={getAdjacentSpecialDay(openDate, 1)}
          onNavigate={navigateDay}
          onClose={closePanel}
        />
      )}
    </>
  );
}
