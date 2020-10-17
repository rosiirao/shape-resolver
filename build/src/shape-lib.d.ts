import { Point, Shape } from './shapes';
/**
 * 计算某点到某个形状中心之间的连线与该形状的交点
 * @param from
 * @param to
 */
export declare function getCrossPoint(from: Shape, to: Shape): Point;
export declare function isOverlap(from: Point, to: SVGGeometryElement): boolean;
