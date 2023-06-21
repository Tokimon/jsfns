import hexToRGB from '@js-fns/core/hexToRGB';

describe('"hexToRGB"', () => {
  it('Generates a RGB array from empty string', () => {
    expect(hexToRGB('')).toEqual([0, 0, 0]);
  });

  it.each([
    ['#ff0000', [255, 0, 0]],
    ['#0f0', [0, 255, 0]],
    ['0ff', [0, 255, 255]],
    ['#ff000080', [255, 0, 0, 0.5]],
  ])('Generates a RGB array from a hex color: ', (input, output) => {
    expect(hexToRGB(input)).toEqual(output);
  });
});
