import './util/polyfill';
import { Point, CircleShape, EllipseShape } from './shapes';
/**
 * 直接方程式 Ax +  By + C = 0
 */
export declare type LineFormula = {
    A: number;
    B: number;
    C: number;
};
/**
 * 圆方程 x² + y² + Dx + Ey + F = 0
 */
export declare type CircleFormula = {
    D: number;
    E: number;
    F: number;
};
/**
 * 椭圆方程 Ax² + By² + Dx + Ey + F = 0
 */
export declare type EllipseFormula = {
    A: number;
    B: number;
} & CircleFormula;
/**
 * 一元二次方程 Ax² + Bx + C = 0
 */
export declare type QuadraticFormula = {
    A: number;
    B: number;
    C: number;
};
/**
 * y-y1=(y2-y1)/(x2-x1)×(x-x1)
 * (y-y1)x(x2-x1)=(y2-y1)*(x-x1)
 */
export declare function getLineFormula({ x: x1, y: y1 }: Point, { x: x2, y: y2 }: Point): LineFormula;
/**
 *  圆心为 O(a, b)
 *  (x-a)² + (y-b)² = r² => x² + y² + Dx + Ey + F = 0
 */
export declare function getCircleFormula({ center: { x, y }, dimension: { r }, }: CircleShape): CircleFormula;
export declare function getEllipseFormula({ center: { x, y }, dimension: { rx, ry }, }: EllipseShape): EllipseFormula;
