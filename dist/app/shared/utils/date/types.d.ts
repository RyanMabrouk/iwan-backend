export interface Interval<DateType extends Date = Date> {
    start: DateType | string;
    end: DateType | string;
}
