import { hexToRGB } from '@jsfns/core/hexToRGB.js';
import { describe, expect, it } from 'vitest';

describe('"hexToRGB"', () => {
	describe('Generates a RGB array from a hex color', () => {
		it.each([
			['#ff0000', [255, 0, 0]],
			['#0f0', [0, 255, 0]],
			['0ff', [0, 255, 255]],
			['#ff000080', [255, 0, 0, 0.5]],
		])('"%s"', (input, output) => {
			expect(hexToRGB(input)).toEqual(output);
		});
	});

	it('Strips trailing spaces', () => {
		expect(hexToRGB('  #fff  ')).toEqual([255, 255, 255]);
	});

	describe('Returns `null` when rgb value could not be parsed correctly', () => {
		it.each(['', 'rgb', 'hef', '#', '#ab', 'a', '#ffzz0080', 'ffzz80'])('"%s"', (str) => {
			expect(hexToRGB(str)).toBe(null);
		});
	});

	describe('Converts alpha value', () => {
		it('Converts alpha value to number', () => {
			expect(hexToRGB('#00000080')).toEqual([0, 0, 0, 0.5]);
		});

		it('Ignores un-parsable alpha hex value', () => {
			expect(hexToRGB('#000000gg')).toEqual([0, 0, 0]);
		});

		it('Parses the 4th value as alpha, when string is only 4 chars long', () => {
			expect(hexToRGB('#0008')).toEqual([0, 0, 0, 0.53]);
		});
	});
});
