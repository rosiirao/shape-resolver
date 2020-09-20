import {getCircleFormula, QuadraticFormula} from './shape-formula';
import {CircleShape, Point} from './shapes';
import {getQuadraticSolved} from './formula-resolver';

/**
 *
 * @param circle 圆心
 * @param radians -X 轴顺时针转动的弧度
 */
export function circleEdgePoint(circle: CircleShape, radians: number): Point {
  if (radians < 0 || radians > Math.PI * 2) {
    throw new Error('弧度参数需要大于 0 且小于 2π ');
  }

  const {
    center: {x, y},
    dimension: {r},
  } = circle;
  const {D, E, F} = getCircleFormula(circle);
  const edgeX = x - Math.cos(radians) * r;
  const quadratic: QuadraticFormula = {
    A: 1,
    B: E,
    C: Math.pow(edgeX, 2) + D * edgeX + F,
  };
  const [y1, y2] = getQuadraticSolved(quadratic);
  return radians < Math.PI
    ? {x: edgeX, y: y2}
    : radians > Math.PI
    ? {x: edgeX, y: y1}
    : {
        x: edgeX,
        y,
      };
}
