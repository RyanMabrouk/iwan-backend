"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWithinIntervalUTC = isWithinIntervalUTC;
function isWithinIntervalUTC(date, interval) {
    const utcDate = new Date(date);
    const [utcStartTime, utcEndTime] = [
        new Date(interval.start),
        new Date(interval.end),
    ].sort((a, b) => a.getTime() - b.getTime());
    const time = utcDate.getTime();
    return time >= utcStartTime.getTime() && time <= utcEndTime.getTime();
}
//# sourceMappingURL=isWithinIntervalUTC.js.map