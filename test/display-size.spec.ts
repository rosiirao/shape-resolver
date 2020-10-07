import {sizeToDimension} from '../src/display-size';

describe('display size', () => {
  test('sizeToDimension passed', () => {
    expect(sizeToDimension(5, [4, 3])).toEqual({
      width: 4,
      height: 3,
    });
  });
});
