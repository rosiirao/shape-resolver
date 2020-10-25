import {getQuadraticSolved} from './formula-resolver';
import {toCurveByYAxis} from './curve-line';

type QuadraticFormula = Parameters<typeof getQuadraticSolved>[0];

type Size = number;

type Ratio = [width: number, height: number];

type Dimension = {
  width: number;
  height: number;
};

type CurveDimension = Dimension & {
  depth: number;
};

export type DisplaySpec = {
  size: Size;
  ratio: Ratio;
  curveRadius?: number;
};

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

export function curveDisplayDimension(spec: DisplaySpec): CurveDimension {
  // let [width, height, depth]: number[] = [0, 0, 0];
  /** 获取非曲面的长宽 */
  const {width: widthPlain, height} = sizeToDimension(spec.size, spec.ratio);
  if (spec.curveRadius === undefined || spec.curveRadius === 0) {
    return {
      ...sizeToDimension(spec.size, spec.ratio),
      depth: 0,
    };
  }
  const [, end] = toCurveByYAxis(widthPlain, spec.curveRadius || 0);
  return {
    width: end.x * 2,
    height,
    depth: (spec.curveRadius || 0) - end.y,
  };
}
