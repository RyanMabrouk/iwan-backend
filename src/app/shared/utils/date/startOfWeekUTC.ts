export function startOfWeekUTC(date: Date, weekStartsOn: number): Date {
  const day = date.getUTCDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  const utcDate = date.getUTCDate() - diff;
  const startOfWeekDate = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), utcDate),
  );
  startOfWeekDate.setUTCHours(0, 0, 0, 0);
  return startOfWeekDate;
}
