"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractNameFromErrorMessage = extractNameFromErrorMessage;
function extractNameFromErrorMessage(errorMessage) {
    const regex = /Key \(([^)]+)\)=\(([^)]+)\) already exists\./;
    const match = errorMessage.match(regex);
    return match ? match[1] : null;
}
//# sourceMappingURL=extractNameFromErrorMessage.js.map