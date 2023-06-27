import { hexToNumber } from '@jsfns/core/hexToNumber';

describe('"hexToNumber"', () => {
  it('Returns 0 on empty strings', () => {
    expect(hexToNumber('')).toBe(0);
  });

  it('Generates a number from a hexadecimal', () => {
    expect(hexToNumber((250.0).toString(16))).toBe(250);
  });
});
