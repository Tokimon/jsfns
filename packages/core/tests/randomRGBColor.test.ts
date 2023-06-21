import { jest } from '@jest/globals';
import randomRGBColor from '@js-fns/core/randomRGBColor';

describe('"randomRGBColor"', () => {
  it('Generates a random RGB color', () => {
    const spy = jest.spyOn(Math, 'random').mockReturnValueOnce(0).mockReturnValueOnce(0.5).mockReturnValueOnce(1);

    const rgb = randomRGBColor();

    expect(rgb).toEqual([0, 128, 255]);

    spy.mockRestore();
  });
});
