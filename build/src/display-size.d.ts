declare type Size = number;
declare type Ratio = [width: number, height: number];
declare type Dimension = {
    width: number;
    height: number;
};
declare type CurveDimension = Dimension & {
    depth: number;
};
export declare type DisplaySpec = {
    size: Size;
    ratio: Ratio;
    curveRadius?: number;
};
export declare function sizeToDimension(size: Size, ratio: Ratio): Dimension;
export declare function curveDisplayDimension(spec: DisplaySpec): CurveDimension;
export {};
