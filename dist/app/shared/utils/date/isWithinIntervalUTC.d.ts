import { Interval } from './types';
export declare function isWithinIntervalUTC<DateType extends Date>(date: DateType | number | string, interval: Interval<DateType>): boolean;
