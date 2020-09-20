import { Point } from './shapes';
/**
 * 设置曲线长度和曲率， 获取以原点为圆心， -X 轴顺时针方向旋转的曲线
 */
declare type ToCurve = (length: number, r: number) => [start: Point, end: Point];
declare const toCurve: ToCurve;
export default toCurve;
