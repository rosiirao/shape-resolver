import { Point } from './shapes';
/**
 * 设置曲线长度和曲率， 获取曲线在平面坐标的起点和终点位置
 */
declare type ToCurve = (length: number, r: number) => [start: Point, end: Point];
/**
 * 获取以原点为圆心， -X 轴顺时针方向旋转的曲线
 * @param length
 * @param r
 */
declare const toCurve: ToCurve;
/**
 * 按 Y 轴对称的， 原点为圆心的曲线
 * @param length
 * @param r
 */
declare const toCurveByYAxis: ToCurve;
export default toCurve;
export { toCurve, toCurveByYAxis };
