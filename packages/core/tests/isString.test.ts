import isString from '~core/isString';

describe('"isString"', () => {
  describe('Returns `true` for String values', () => {
    it.each(['', String('test')])('"%s"', (n) => {
      expect(isString(n)).toBe(true);
    });
  });

  describe('Returns `false` for non String values', () => {
    it.each([null, undefined, Infinity, NaN, 9, [], {}])('"%s"', (n) => {
      expect(isString(n)).toBe(false);
    });
  });
});
