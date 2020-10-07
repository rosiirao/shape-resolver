import {getQuadraticSolved} from './formula-resolver';

type QuadraticFormula = Parameters<typeof getQuadraticSolved>[0];

type Size = number;

type Ratio = [width: number, height: number];

type Dimension = {
  width: number;
  height: number;
};

// type CurveDimension = Dimension & {
//   depth: number;
// };

export function sizeToDimension(size: Size, ratio: Ratio): Dimension {
  const quadraticFormula: QuadraticFormula = {
    A: ratio[0] ** 2 + ratio[1] ** 2,
    B: 0,
    C: 0 - size ** 2 * ratio[1] ** 2,
  };
  const resolver = getQuadraticSolved(quadraticFormula);
  const height = Math.max(...resolver);
  const width = (height * ratio[0]) / ratio[1];
  return {
    width,
    height,
  };
}
