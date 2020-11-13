"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCurveByYAxis = exports.toCurve = void 0;
const shapes_1 = require("./shapes");
const circle_lib_1 = require("./circle-lib");
/**
 * 获取以原点为圆心， -X 轴顺时针方向旋转的曲线
 * @param length
 * @param r
 */
const toCurve = (length, r) => {
    if (length < 0) {
        throw new Error('curve length can not less than 0');
    }
    if (length === 0) {
        return [
            { x: -r, y: 0 },
            { x: -r, y: 0 },
        ];
    }
    const circle = shapes_1.circleFrom({
        center: { x: 0, y: 0 },
        r,
    });
    /**
     * -X 轴顺时针转动的圆心角
     */
    const radian = length / r;
    const start = { x: -r, y: 0 };
    const end = circle_lib_1.circleEdgePoint(circle, radian);
    return [start, end];
};
exports.toCurve = toCurve;
/**
 * 按 Y 轴对称的， 原点为圆心的曲线
 * @param length
 * @param r
 */
const toCurveByYAxis = (length, r) => {
    /** 从 -X 轴到终点的长度 2πr/4 + length/2 */
    const lengthFromX = (Math.PI * r + length) / 2;
    const end = toCurve(lengthFromX, r)[1];
    const start = { x: -end.x, y: end.y };
    return [start, end];
};
exports.toCurveByYAxis = toCurveByYAxis;
exports.default = toCurve;
//# sourceMappingURL=curve-line.js.map