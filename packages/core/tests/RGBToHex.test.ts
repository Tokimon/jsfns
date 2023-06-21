import { RGBToHex } from '@js-fns/core/RGBToHex';

describe('"RGBToHex"', () => {
  it('Generates a hex color from a RGB entries', () => {
    expect(RGBToHex(0, 0, 255)).toBe('#0000ff');
  });

  it('Defaults to 0 for negative numbers', () => {
    expect(RGBToHex(-10, -255, -120)).toBe('#000000');
  });

  it('Limits numbers to 255', () => {
    expect(RGBToHex(300, 256, 10000)).toBe('#ffffff');
  });

  describe('With an alpha channel defined', () => {
    it('Adds it to the hex value', () => {
      expect(RGBToHex(0, 255, 0, 0.5)).toBe('#00ff0080');
    });

    it('Set negative numbers to 0', () => {
      expect(RGBToHex(0, 255, 0, -2)).toBe('#00ff0000');
    });

    it('Limits the alpha channel to 1', () => {
      expect(RGBToHex(0, 255, 0, 200)).toBe('#00ff00ff');
    });
  });

  describe('RGB colors as array', () => {
    it('Generates a hex', () => {
      expect(RGBToHex([255, 0, 0])).toBe('#ff0000');
    });

    describe('Adds the alpha channel correctly', () => {
      it.each([
        [-1, '00'],
        [0, '00'],
        [0.5, '80'],
        [1, 'ff'],
      ])('Alpha: %i', (a, hexA) => {
        expect(RGBToHex([255, 0, 0, a])).toBe('#ff0000' + hexA);
      });
    });
  });
});
