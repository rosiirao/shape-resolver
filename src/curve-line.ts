import {CircleShape, Point, circleFrom} from './shapes';
import {circleEdgePoint} from './circle-lib';

/**
 * 设置曲线长度和曲率， 获取曲线在平面坐标的起点和终点位置
 */
type ToCurve = (length: number, r: number) => [start: Point, end: Point];

/**
 * 获取以原点为圆心， -X 轴顺时针方向旋转的曲线
 * @param length
 * @param r
 */
const toCurve: ToCurve = (length, r) => {
  if (length < 0) {
    throw new Error('curve length can not less than 0');
  }
  if (length === 0) {
    return [
      {x: -r, y: 0},
      {x: -r, y: 0},
    ];
  }
  const circle: CircleShape = circleFrom({
    center: {x: 0, y: 0},
    r,
  });
  /**
   * -X 轴顺时针转动的圆心角
   */
  const radian = length / r;
  const start: Point = {x: -r, y: 0};
  const end: Point = circleEdgePoint(circle, radian);
  return [start, end];
};

/**
 * 按 Y 轴对称的， 原点为圆心的曲线
 * @param length
 * @param r
 */
const toCurveByYAxis: ToCurve = (length, r) => {
  /** 从 -X 轴到终点的长度 2πr/4 + length/2 */
  const lengthFromX = (Math.PI * r + length) / 2;
  const end = toCurve(lengthFromX, r)[1];
  const start = {x: -end.x, y: end.y};
  return [start, end];
};

export default toCurve;

export {toCurve, toCurveByYAxis};
