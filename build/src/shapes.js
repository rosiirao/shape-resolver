"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.circleFrom = exports.ShapeKind = void 0;
var ShapeKind;
(function (ShapeKind) {
    ShapeKind[ShapeKind["Circle"] = 0] = "Circle";
    ShapeKind[ShapeKind["Rectangle"] = 1] = "Rectangle";
    ShapeKind[ShapeKind["Ellipse"] = 2] = "Ellipse";
})(ShapeKind = exports.ShapeKind || (exports.ShapeKind = {}));
exports.circleFrom = ({ center, r, }) => ({
    kind: ShapeKind.Circle,
    center,
    dimension: {
        r,
    },
});
//# sourceMappingURL=shapes.js.map