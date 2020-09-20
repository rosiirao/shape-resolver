"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuadraticSolved = exports.getLineSolved = void 0;
function getLineSolved({ A: a, B: b, C: c }, x) {
    return -(a * x + c) / b;
}
exports.getLineSolved = getLineSolved;
function getQuadraticSolved({ A: a, B: b, C: c, }) {
    const deltaSqrt = Math.sqrt(Math.pow(b, 2) - 4 * a * c);
    const doubleOfA = 2 * a;
    return [(-deltaSqrt - b) / doubleOfA, (deltaSqrt - b) / doubleOfA];
}
exports.getQuadraticSolved = getQuadraticSolved;
//# sourceMappingURL=formula-resolver.js.map