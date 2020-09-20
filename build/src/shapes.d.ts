export declare type Point = {
    x: number;
    y: number;
    z?: number;
};
export interface Shape {
    kind: ShapeKind;
    center: Point;
    dimension?: Partial<Record<'w' | 'h' | 'r' | 'rx' | 'ry', number>>;
}
export declare enum ShapeKind {
    Circle = 0,
    Rectangle = 1,
    Ellipse = 2
}
export interface RectShape extends Shape {
    kind: ShapeKind.Rectangle;
    dimension: {
        w: number;
        h: number;
        r: number;
    };
}
export interface CircleShape extends Shape {
    kind: ShapeKind.Circle;
    dimension: {
        r: number;
    };
}
export interface EllipseShape extends Shape {
    kind: ShapeKind.Ellipse;
    dimension: {
        rx: number;
        ry: number;
    };
}
export declare const circleFrom: (param: {
    center: Point;
    r: number;
}) => CircleShape;
