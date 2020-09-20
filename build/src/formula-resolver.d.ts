import { LineFormula, QuadraticFormula } from './shape-formula';
export declare function getLineSolved({ A: a, B: b, C: c }: LineFormula, x: number): number;
export declare function getQuadraticSolved({ A: a, B: b, C: c, }: QuadraticFormula): [number, number];
