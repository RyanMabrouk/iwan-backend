import { startOfWeekUTC } from './startOfWeekUTC';

export function endOfWeekUTC(date: Date, weekStartsOn: number): Date {
  const start = startOfWeekUTC(date, weekStartsOn);
  const endOfWeekDate = new Date(start);
  endOfWeekDate.setUTCDate(start.getUTCDate() + 6);
  endOfWeekDate.setUTCHours(23, 59, 59, 999);
  return endOfWeekDate;
}
