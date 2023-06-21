import isNumber from '@js-fns/core/isNumber';

describe('"isNumber"', () => {
  describe('Returns `true` for Number values', () => {
    it.each([
      8,
      9.5,
      Number('0'),
      // eslint-disable-next-line no-new-wrappers
      new Number('5'),
    ])('"%s"', (n) => {
      expect(isNumber(n)).toBe(true);
    });
  });

  describe('Returns `false` for non Number values', () => {
    it.each([
      null,
      undefined,
      Infinity,
      NaN,
      '',
      // eslint-disable-next-line no-new-wrappers
      new String(''),
      [],
      {},
    ])('"%s"', (n) => {
      expect(isNumber(n)).toBe(false);
    });
  });
});
