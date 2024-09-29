import { Interval } from './types';

export function isWithinIntervalUTC<DateType extends Date>(
  date: DateType | number | string,
  interval: Interval<DateType>,
): boolean {
  const utcDate = new Date(date);
  const [utcStartTime, utcEndTime] = [
    new Date(interval.start),
    new Date(interval.end),
  ].sort((a, b) => a.getTime() - b.getTime());

  const time = utcDate.getTime();
  return time >= utcStartTime.getTime() && time <= utcEndTime.getTime();
}
