import { useCallback, useState } from 'react';
import { addMonths, compareYearMonth, currentYearMonth, type YearMonth } from '../lib/date';

/** 1 = moved forward, -1 = moved back, 0 = initial render. Drives the slide direction. */
export type MonthDirection = 1 | -1 | 0;

export function useCalendarMonth() {
  const [state, setState] = useState<{ month: YearMonth; direction: MonthDirection }>(() => ({
    month: currentYearMonth(),
    direction: 0,
  }));

  const goTo = useCallback((target: YearMonth) => {
    setState((s) => {
      const diff = compareYearMonth(target, s.month);
      return diff === 0 ? s : { month: target, direction: diff > 0 ? 1 : -1 };
    });
  }, []);

  const next = useCallback(() => setState((s) => ({ month: addMonths(s.month, 1), direction: 1 })), []);
  const prev = useCallback(() => setState((s) => ({ month: addMonths(s.month, -1), direction: -1 })), []);
  const goToToday = useCallback(() => goTo(currentYearMonth()), [goTo]);

  return {
    month: state.month,
    direction: state.direction,
    isCurrentMonth: compareYearMonth(state.month, currentYearMonth()) === 0,
    next,
    prev,
    goTo,
    goToToday,
  };
}
