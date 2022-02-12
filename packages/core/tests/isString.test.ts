import isString from '../src/isString';



describe('"isString"', () => {
  describe('Returns `true` for String values', () => {
    it.each([
      '',
      String(''),
      // eslint-disable-next-line no-new-wrappers
      new String('')
    ])('"%s"', (n) => {
      expect(isString(n)).toBe(true);
    });
  });

  describe('Returns `false` for non String values', () => {
    it.each([
      null,
      undefined,
      Infinity,
      NaN,
      9,
      [],
      {}
    ])('"%s"', (n) => {
      expect(isString(n)).toBe(false);
    });
  });
});
