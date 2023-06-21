import { jest } from '@jest/globals';
import { randomHexColor } from '@js-fns/core/randomHexColor';

describe('"randomHexColor"', () => {
  it('Generates a random Hex color', () => {
    const spy = jest.spyOn(Math, 'random').mockReturnValueOnce(0).mockReturnValueOnce(0.5).mockReturnValueOnce(1);

    const hex = randomHexColor();

    expect(hex).toBe('#0080ff');

    spy.mockRestore();
  });
});
