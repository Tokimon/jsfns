import { safeToFixed } from '@jsfns/core/safeToFixed.js';
import { describe, expect, it } from 'vitest';

describe('"safeToFixed"', () => {
	it('Formats a number to a fixed number of decimals', () => {
		expect(safeToFixed(1.2345, 2)).toBe('1.23');
	});

	it('Clamps a negative decimal count to 0, instead of throwing', () => {
		expect(safeToFixed(1.2345, -2)).toBe('1');
	});

	it('Clamps a decimal count above 100 down to 100, instead of throwing', () => {
		expect(safeToFixed(1.2345, 150)).toBe((1.2345).toFixed(100));
	});
});
