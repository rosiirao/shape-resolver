import {
  sizeToDimension,
  curveDisplayDimension,
  DisplaySpec,
} from '../src/display-size';

describe('display size', () => {
  test('sizeToDimension passed', () => {
    expect(sizeToDimension(5, [4, 3])).toEqual({
      width: 4,
      height: 3,
    });
  });

  const displaySpecParams: [DisplaySpec][] = [
    [
      {
        size: 1000,
        ratio: [4, 3],
      },
    ],
    [
      {
        size: 1000,
        ratio: [4, 3],
        curveRadius: 1000,
      },
    ],
    [
      {
        size: 49 * 25.4,
        ratio: [32, 9],
        curveRadius: 1000,
      },
    ],
  ];

  test.each<DisplaySpec[]>(displaySpecParams)(
    'curveDisplayDimension',
    displaySpec => {
      expect(curveDisplayDimension(displaySpec)).toMatchObject({
        width: expect.any(Number),
        height: expect.any(Number),
        depth: expect.any(Number),
      });
    }
  );
});
