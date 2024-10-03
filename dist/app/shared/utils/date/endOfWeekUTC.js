"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endOfWeekUTC = endOfWeekUTC;
const startOfWeekUTC_1 = require("./startOfWeekUTC");
function endOfWeekUTC(date, weekStartsOn) {
    const start = (0, startOfWeekUTC_1.startOfWeekUTC)(date, weekStartsOn);
    const endOfWeekDate = new Date(start);
    endOfWeekDate.setUTCDate(start.getUTCDate() + 6);
    endOfWeekDate.setUTCHours(23, 59, 59, 999);
    return endOfWeekDate;
}
//# sourceMappingURL=endOfWeekUTC.js.map