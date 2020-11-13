"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.curveDisplayDimension = exports.sizeToDimension = void 0;
const formula_resolver_1 = require("./formula-resolver");
const curve_line_1 = require("./curve-line");
function sizeToDimension(size, ratio) {
    const quadraticFormula = {
        A: ratio[0] ** 2 + ratio[1] ** 2,
        B: 0,
        C: 0 - size ** 2 * ratio[1] ** 2,
    };
    const resolver = formula_resolver_1.getQuadraticSolved(quadraticFormula);
    const height = Math.max(...resolver);
    const width = (height * ratio[0]) / ratio[1];
    return {
        width,
        height,
    };
}
exports.sizeToDimension = sizeToDimension;
function curveDisplayDimension(spec) {
    // let [width, height, depth]: number[] = [0, 0, 0];
    /** 获取非曲面的长宽 */
    const { width: widthPlain, height } = sizeToDimension(spec.size, spec.ratio);
    if (spec.curveRadius === undefined || spec.curveRadius === 0) {
        return {
            ...sizeToDimension(spec.size, spec.ratio),
            depth: 0,
        };
    }
    const [, end] = curve_line_1.toCurveByYAxis(widthPlain, spec.curveRadius || 0);
    return {
        width: end.x * 2,
        height,
        depth: (spec.curveRadius || 0) - end.y,
    };
}
exports.curveDisplayDimension = curveDisplayDimension;
//# sourceMappingURL=display-size.js.map