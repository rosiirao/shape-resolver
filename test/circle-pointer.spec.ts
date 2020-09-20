import {circleEdgePoint} from '../src/circle-lib';
import toCurve from '../src/curve-line';
import {circleFrom, CircleShape, Point} from '../src/shapes';

/**
 *
 * @param circle_degree
 */
// function* circleEdges(
//   circle_degree: () => [CircleShape, number][]
// ): Generator<Point, void, unknown> {
//   for (const [circle, degree] of circle_degree()) {
//     yield circleEdgePoint(circle, degree);
//   }
// }

describe.only('circle edge', () => {
  const r = 20;
  const center: Point = {x: 0, y: 0};
  const circle: CircleShape = circleFrom({center, r});
  test('circle edge passed', () => {
    const edge = circleEdgePoint(circle, Math.PI / 2);
    expect(edge.x).toBeCloseTo(0);
    expect(edge.y).toBeCloseTo(r);
  });
});

describe('curve line', () => {
  const r = 20;
  test.each([
    [
      (Math.PI * r) / 2,
      [
        {x: -r, y: 0},
        {x: 0, y: -r},
      ],
    ],
  ])('curve line points passed', (length: number, expected: Point[]) => {
    const points = toCurve(length, r);
    expect(points).toEqual(expected);
  });
});
