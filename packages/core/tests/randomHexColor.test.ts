import { randomHexColor } from '@jsfns/core/randomHexColor.js';
import { describe, expect, it, vi } from 'vitest';

describe('"randomHexColor"', () => {
	it('Generates a random Hex color', () => {
		const spy = vi
			.spyOn(Math, 'random')
			.mockReturnValueOnce(0)
			.mockReturnValueOnce(0.5)
			.mockReturnValueOnce(1);

		const hex = randomHexColor();

		expect(hex).toBe('#0080ff');

		spy.mockRestore();
	});
});
