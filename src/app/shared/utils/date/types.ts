export interface Interval<DateType extends Date = Date> {
  /** The start of the interval. */
  start: DateType | string;
  /** The end of the interval. */
  end: DateType | string;
}
