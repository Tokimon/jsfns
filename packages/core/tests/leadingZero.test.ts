import { leadingZero } from '@js-fns/core/leadingZero';

describe('"leadingZero"', () => {
  describe('Adds a zero to a value of just one character', () => {
    it.each([1, '2', '|'])('%s', (input) => {
      expect(leadingZero(input)).toBe('0' + input);
    });
  });

  describe('Add a zeroes to a value until it is the desired length', () => {
    it.each(Array.from(Array(5), (_, i) => '12345'.slice(0, i + 1)))('"%s"', (input) => {
      const l = 5 - input.length;
      expect(leadingZero(input, 5)).toBe('0'.repeat(l) + input);
    });
  });

  it('Return the value without zeroes when it is longer than the desired length', () => {
    expect(leadingZero(123456, 5)).toBe('123456');
  });
});
