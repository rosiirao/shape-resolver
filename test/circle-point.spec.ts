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

const r = 20;

describe.each([
  [Math.PI / 2, [0, r]],
  [(Math.PI * 3) / 2, [0, -r]],
  [Math.PI / 4, [-Math.SQRT1_2 * 20, Math.SQRT1_2 * 20]],
])('circle edge', (radian, [x, y]) => {
  const center: Point = {x: 0, y: 0};
  const circle: CircleShape = circleFrom({center, r});
  test('circle edge passed', () => {
    const edge = circleEdgePoint(circle, radian);
    expect(edge.x).toBeCloseTo(x);
    expect(edge.y).toBeCloseTo(y);
  });
});

describe('curve line', () => {
  const r = 20;
  test.each([
    [
      (Math.PI * r) / 2,
      [
        {x: -r, y: 0},
        {x: 0, y: r},
      ],
    ],
    [
      (Math.PI * r) / 4,
      [
        {x: -r, y: 0},
        {x: -Math.SQRT1_2 * 20, y: Math.SQRT1_2 * 20},
      ],
    ],
  ])('curve line points passed', (length: number, expected: [Point, Point]) => {
    const points = toCurve(length, r);
    const [start, end] = points;

    expect(start.x).toBeCloseTo(expected[0].x);
    expect(start.y).toBeCloseTo(expected[0].y);
    expect(end.x).toBeCloseTo(expected[1].x);
    expect(end.y).toBeCloseTo(expected[1].y);
  });
});
