import {CircleShape, Point, circleFrom} from './shapes';
import {circleEdgePoint} from './circle-lib';

/**
 * 设置曲线长度和曲率， 获取以原点为圆心， -X 轴顺时针方向旋转的曲线
 */
type ToCurve = (length: number, r: number) => [start: Point, end: Point];

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
  const w = length / r;
  const start: Point = {x: -r, y: 0};
  const end: Point = circleEdgePoint(circle, w);
  return [start, end];
};

export default toCurve;
