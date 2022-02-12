import isNumeric from '../src/isNumeric';



describe('"isNumeric"', () => {
  describe('Returns `true` for numeric values', () => {
    it.each([
      8,
      9.5,
      Number('0'),
      // eslint-disable-next-line no-new-wrappers
      new Number('5'),
      '7.4',
      String('6'),
      // eslint-disable-next-line no-new-wrappers
      new String('3.4')
    ])('"%s"', (n) => {
      expect(isNumeric(n)).toBe(true);
    });
  });

  describe('Returns `false` for non numeric values', () => {
    it.each([
      null,
      undefined,
      Infinity,
      NaN,
      '',
      // eslint-disable-next-line no-new-wrappers
      new String(''),
      [],
      {}
    ])('"%s"', (n) => {
      expect(isNumeric(n)).toBe(false);
    });
  });
});
