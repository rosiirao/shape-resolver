"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEllipseFormula = exports.getCircleFormula = exports.getLineFormula = void 0;
require("./util/polyfill");
/**
 * y-y1=(y2-y1)/(x2-x1)×(x-x1)
 * (y-y1)x(x2-x1)=(y2-y1)*(x-x1)
 */
function getLineFormula({ x: x1, y: y1 }, { x: x2, y: y2 }) {
    return {
        A: y2 - y1,
        B: x1 - x2,
        C: x2 * y1 - x1 * y2,
    };
}
exports.getLineFormula = getLineFormula;
/**
 *  圆心为 O(a, b)
 *  (x-a)² + (y-b)² = r² => x² + y² + Dx + Ey + F = 0
 */
function getCircleFormula({ center: { x, y }, dimension: { r }, }) {
    return {
        D: -2 * x,
        E: -2 * y,
        F: Math.pow(x, 2) + Math.pow(y, 2) - Math.pow(r, 2),
    };
}
exports.getCircleFormula = getCircleFormula;
function getEllipseFormula({ center: { x, y }, dimension: { rx, ry }, }) {
    const expOfRx = Math.pow(rx, 2);
    const expOfRy = Math.pow(ry, 2);
    return {
        A: expOfRy,
        B: expOfRx,
        D: -2 * x * expOfRx,
        E: -2 * y * expOfRy,
        F: expOfRy * Math.pow(x, 2) + expOfRx * Math.pow(y, 2) - expOfRx * expOfRy,
    };
}
exports.getEllipseFormula = getEllipseFormula;
//# sourceMappingURL=shape-formula.js.map