"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shapes_1 = require("./shapes");
const circle_lib_1 = require("./circle-lib");
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
    const w = length / r;
    const start = { x: -r, y: 0 };
    const end = circle_lib_1.circleEdgePoint(circle, w);
    return [start, end];
};
exports.default = toCurve;
//# sourceMappingURL=curve-line.js.map