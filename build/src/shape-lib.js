"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOverlap = exports.getCrossPoint = void 0;
const formula_resolver_1 = require("./formula-resolver");
const shape_formula_1 = require("./shape-formula");
const shapes_1 = require("./shapes");
function getLineCircleIntersection(line, Circle) {
    return getLineEllipseIntersection(line, Object.assign({ A: 1, B: 1 }, Circle));
}
function getLineEllipseIntersection(line, { A: a2, B: b2, D: d, E: e, F: f }) {
    const { A: a, B: b, C: c } = line;
    const exponentOfB = Math.pow(b, 2);
    const quadratic = {
        A: a2 * Math.pow(a, 2) + b2 * exponentOfB,
        B: exponentOfB * d + 2 * a * c * b2 - a * b * e,
        C: exponentOfB * f + b2 * Math.pow(c, 2) - b * e * c,
    };
    const [x1, x2] = formula_resolver_1.getQuadraticSolved(quadratic);
    let y1, y2;
    if (b === 0 && isFinite(x1)) {
        // 垂直相交时通过 圆 方程式转换成一元二次方程时取圆方程式 y 值
        // Ax² + By² + Dx + Ey + F = 0 -> Ax² + By² + C = 0
        const quadraticForCircle = {
            A: b2,
            B: e,
            C: a2 * Math.pow(x1, 2) + d * x1 + f,
        };
        [y1, y2] = formula_resolver_1.getQuadraticSolved(quadraticForCircle);
    }
    else {
        [y1, y2] = [formula_resolver_1.getLineSolved(line, x1), formula_resolver_1.getLineSolved(line, x2)];
    }
    return [
        {
            x: x1,
            y: y1,
        },
        {
            x: x2,
            y: y2,
        },
    ];
}
// function getLineIntersection({A: a1, B:b1, C:c1}: LineFormula, {A: a2, B:b2, C:c2}: LineFormula): Position{
// }
function getNearestPoint({ x, y }, points) {
    const [{ x: x1, y: y1 }, { x: x2, y: y2 }] = points;
    let leftPoint, rightPoint, topPoint, bottomPoint;
    if (x1 < x2) {
        [leftPoint, rightPoint] = points;
    }
    else {
        [rightPoint, leftPoint] = points;
    }
    if (y1 < y2) {
        [topPoint, bottomPoint] = points;
    }
    else {
        [bottomPoint, topPoint] = points;
    }
    return x < leftPoint.x
        ? leftPoint
        : x > rightPoint.x
            ? rightPoint
            : y < topPoint.y
                ? topPoint
                : y > bottomPoint.y
                    ? bottomPoint
                    : {
                        x: NaN,
                        y: NaN,
                    };
}
/**
 * 计算某点到某个形状之间的连线与该形状的交点
 * @param from
 * @param to
 */
function getCrossPoint(from, to) {
    const point = from.center;
    switch (to.kind) {
        case shapes_1.ShapeKind.Circle:
            return getCrossPointWithCircle(point, to);
        case shapes_1.ShapeKind.Rectangle:
            return getCrossPointWithRect(point, to);
        default:
            return {
                x: Infinity,
                y: Infinity,
            };
    }
}
exports.getCrossPoint = getCrossPoint;
function getCrossPointWithCircle(from, to) {
    const line = shape_formula_1.getLineFormula(from, to.center);
    const circle = shape_formula_1.getCircleFormula(to);
    const intersection = getLineCircleIntersection(line, circle);
    return getNearestPoint(from, intersection);
}
function getCrossPointWithRect(from, to) {
    const { x: tx, y: ty } = to.center;
    const { w, h, r } = to.dimension;
    const { x: fx, y: fy } = from;
    // 判断是与圆角相交， 或与边框相交
    /**
     * 使用椭圆算法计算圆
     */
    const [rx, ry] = [r, r];
    /**
     * half width and half height
     */
    const [hw, hh] = [w / 2, h / 2];
    const ratio = fx === tx // 0/0 will get NaN
        ? Infinity
        : Math.abs((fy - ty) / (fx - tx));
    switch (ratio) {
        case 0:
            return {
                x: tx + Math.imul(fx > tx ? 1 : -1, hw),
                y: ty,
            };
        case Infinity:
            return {
                x: tx,
                y: ty + Math.imul(fy > ty ? 1 : -1, hh),
            };
        default: {
            // 判断与椭圆边角相交， 或与直线边框相交
            if (ratio > (hh - ry) / hw && ratio < hh / (hw - rx)) {
                // 4 ellipse center
                const leftTop = { x: tx - hw + rx, y: ty - hh + ry };
                const rightTop = { x: tx + hw - rx, y: leftTop.y };
                const leftBottom = { x: leftTop.x, y: ty + hh - ry };
                const rightBottom = { x: rightTop.x, y: leftBottom.y };
                /**
                 * 相交椭圆边角的中心
                 */
                let intersectionEllipseCenter = undefined;
                if (fx < leftTop.x) {
                    intersectionEllipseCenter = fy < leftTop.y ? leftTop : leftBottom;
                }
                if (fx > rightTop.x) {
                    intersectionEllipseCenter = fy < leftTop.y ? rightTop : rightBottom;
                }
                if (intersectionEllipseCenter !== undefined) {
                    const ellipseShape = {
                        center: intersectionEllipseCenter,
                        dimension: { rx, ry },
                        kind: shapes_1.ShapeKind.Ellipse,
                    };
                    // const { A: ae, B: be, D: d, E: e, F: f } = getEllipseFormula(ellipseShape);
                    const line = shape_formula_1.getLineFormula(from, to.center);
                    const intersection = getLineEllipseIntersection(line, shape_formula_1.getEllipseFormula(ellipseShape));
                    return getNearestPoint(from, intersection);
                }
                // 不相交， 没有交点
                return {
                    x: NaN,
                    y: NaN,
                };
            }
            return ratio > h / w
                ? {
                    x: tx + Math.imul(fx > tx ? 1 : -1, hh) / ratio,
                    y: ty + Math.imul(fy > ty ? 1 : -1, hh),
                }
                : {
                    x: tx + Math.imul(fx > tx ? 1 : -1, hw),
                    y: ty + Math.imul(fy > ty ? 1 : -1, hw) * ratio,
                };
        }
    }
}
// function getDistance({ x: fx, y: fy }: Position, { x: tx, y: ty }: Position) {
//   return Math.sqrt((fx - tx) ** 2 + (fy - ty) ** 2);
// }
function isOverlap(from, to) {
    const crossPoint = global.DOMPointReadOnly.fromPoint(from);
    return !to.isPointInStroke(crossPoint) && !to.isPointInFill(crossPoint);
}
exports.isOverlap = isOverlap;
//# sourceMappingURL=shape-lib.js.map