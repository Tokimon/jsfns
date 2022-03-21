import numberToHex from '~core/numberToHex';



describe('"numberToHex"', () => {
  it('Generates a hexadecimal from a number', () => {
    expect(numberToHex(250)).toBe('fa');
  });

  it('Converts larger numbers', () => {
    expect(numberToHex(123565)).toBe(123565.0.toString(16));
  });

  describe('Adds a zero to single digit results', () => {
    it.each(
      Array.from(Array(15), (_, i) => i + 1)
    )('%s', (n) => {
      expect(numberToHex(n)).toBe('0' + n.toString(16));
    });
  });
});
