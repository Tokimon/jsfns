import { randomRGBColor } from '@jsfns/core/randomRGBColor';
import { describe, expect, it, vi } from 'vitest';

describe('"randomRGBColor"', () => {
	it('Generates a random RGB color', () => {
		const spy = vi
			.spyOn(Math, 'random')
			.mockReturnValueOnce(0)
			.mockReturnValueOnce(0.5)
			.mockReturnValueOnce(1);

		const rgb = randomRGBColor();

		expect(rgb).toEqual([0, 128, 255]);

		spy.mockRestore();
	});
});
