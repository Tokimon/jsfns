import isBoolean from '../src/isBoolean';



describe('"isBoolean"', () => {
  describe('Returns `true` for Boolean values', () => {
    it.each([
      true,
      false,
      Boolean(1),
      Boolean(0),
      // eslint-disable-next-line no-new-wrappers
      new Boolean(0),
      // eslint-disable-next-line no-new-wrappers
      new Boolean(1)
    ])('"%s"', (input) => {
      expect(isBoolean(input)).toBe(true);
    });
  });

  describe('Returns `false` for non Boolean values', () => {
    it.each([
      'true',
      'false',
      0,
      1,
      null,
      undefined
    ])('"%s"', (input) => {
      expect(isBoolean(input)).toBe(false);
    });
  });
});
