import limitDecimals from '../src/limitDecimals';



describe('"limitDecimals"', () => {
  it('Cuts decimals completely when decimal indication is not defined correctly', () => {
    expect(limitDecimals(9.678, 'none')).toBe('10');
  });

  describe('Format the decimals to the default number of digits (2)', () => {
    it.each([
      [1, '1.00'],
      [0.234, '0.23'],
      [0.5, '0.50'],
      [0.9999, '1.00']
    ])('%s => %s', (num, output) => {
      expect(limitDecimals(num)).toBe(output);
    });
  });

  describe('`n` (3) formats the decimals to a specific number of digits', () => {
    it.each([
      [1, '1.000'],
      [0.234, '0.234'],
      [0.5, '0.500'],
      [0.9999, '1.000']
    ])('%s => %s', (num, output) => {
      expect(limitDecimals(num, 3)).toBe(output);
    });
  });

  describe('`>n` (>2) formats the decimals to a minimum number of digits', () => {
    it.each([
      [1, '1.00'],
      [0.234, '0.234'],
      [0.5, '0.50'],
      [0.9999, '0.9999']
    ])('%s => %s', (num, output) => {
      expect(limitDecimals(num, '>2')).toBe(output);
    });
  });

  describe('`<n` (<2) format the decimals to a maximum number of digits', () => {
    it.each([
      [1, '1'],
      [0.234, '0.23'],
      [0.5, '0.5'],
      [0.9999, '1']
    ])('%s => %s', (num, output) => {
      expect(limitDecimals(num, '<2')).toBe(output);
    });
  });

  describe('`x,y` (2,4) defines a range for the number of digits', () => {
    describe.each([
      [1, '1.00'],
      [0.234, '0.234'],
      [0.5, '0.50'],
      [0.9999, '0.9999'],
      [0.334567, '0.3346']
    ])('%s => %s', (num, output) => {
      it('In correct order', () => {
        expect(limitDecimals(num, '2,4')).toBe(output);
      });

      it('Auto corrects "min" and "max"', () => {
        expect(limitDecimals(num, '4,2')).toBe(output);
      });
    });
  });
});
