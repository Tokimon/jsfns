import isNumeric from '~core/isNumeric';



describe('"isNumeric"', () => {
  describe('Returns `true` for numeric values', () => {
    it.each([
      8,
      9.5,
      Number('0'),
      '7.4',
      String('6')
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
      [],
      {}
    ])('"%s"', (n) => {
      expect(isNumeric(n)).toBe(false);
    });
  });
});
