export type Point = {
  x: number;
  y: number;
  z?: number;
};

export interface Shape {
  kind: ShapeKind;
  center: Point;
  dimension?: Partial<Record<'w' | 'h' | 'r' | 'rx' | 'ry', number>>;
}

export enum ShapeKind {
  Circle,
  Rectangle,
  Ellipse,
}

export interface RectShape extends Shape {
  kind: ShapeKind.Rectangle;
  dimension: {
    w: number;
    h: number;
    r: number /* the corner radius */;
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

export const circleFrom: (param: {center: Point; r: number}) => CircleShape = ({
  center,
  r,
}) => ({
  kind: ShapeKind.Circle,
  center,
  dimension: {
    r,
  },
});
