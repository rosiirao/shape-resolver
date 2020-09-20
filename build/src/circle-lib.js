"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.circleEdgePoint = void 0;
const shape_formula_1 = require("./shape-formula");
const formula_resolver_1 = require("./formula-resolver");
/**
 *
 * @param circle 圆心
 * @param radians -X 轴顺时针转动的弧度
 */
function circleEdgePoint(circle, radians) {
    if (radians < 0 || radians > Math.PI * 2) {
        throw new Error('弧度参数需要大于 0 且小于 2π ');
    }
    const { center: { x, y }, dimension: { r }, } = circle;
    const { D, E, F } = shape_formula_1.getCircleFormula(circle);
    const edgeX = x - Math.cos(radians) * r;
    const quadratic = {
        A: 1,
        B: E,
        C: Math.pow(edgeX, 2) + D * edgeX + F,
    };
    const [y1, y2] = formula_resolver_1.getQuadraticSolved(quadratic);
    return radians < Math.PI
        ? { x: edgeX, y: y2 }
        : radians > Math.PI
            ? { x: edgeX, y: y1 }
            : {
                x: edgeX,
                y,
            };
}
exports.circleEdgePoint = circleEdgePoint;
//# sourceMappingURL=circle-lib.js.map