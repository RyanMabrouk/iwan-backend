"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSameDayUtc = isSameDayUtc;
function isSameDayUtc(date1, date2) {
    const date1UTCYear = date1.getUTCFullYear();
    const date1UTCMonth = date1.getUTCMonth();
    const date1UTCDate = date1.getUTCDate();
    const date2UTCYear = date2.getUTCFullYear();
    const date2UTCMonth = date2.getUTCMonth();
    const date2UTCDate = date2.getUTCDate();
    const isSameDay = date1UTCYear === date2UTCYear &&
        date1UTCMonth === date2UTCMonth &&
        date1UTCDate === date2UTCDate;
    return isSameDay;
}
//# sourceMappingURL=isSameDayUtc.js.map