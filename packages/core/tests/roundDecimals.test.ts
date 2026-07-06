import { roundDecimals } from '@jsfns/core/roundDecimals.js';
import { describe, expect, it } from 'vitest';

describe('"roundDecimals"', () => {
	it('Rounds a number to the given number of decimals', () => {
		expect(roundDecimals(Math.PI, 2)).toBe(3.14);
	});

	it('Does not pad the result with trailing zeroes', () => {
		expect(roundDecimals(3.1, 4)).toBe(3.1);
	});

	it('Avoids floating point imprecision when rounding', () => {
		expect(roundDecimals(3.4500000003, 2)).toBe(3.45);
	});

	it('Rounds negative numbers correctly', () => {
		expect(roundDecimals(-Math.PI, 2)).toBe(-3.14);
	});

	it('Rounds to a whole number when the decimal count is clamped to 0', () => {
		expect(roundDecimals(3.6, -2)).toBe(4);
	});

	it('Clamps a decimal count over 100 down to 100, instead of throwing', () => {
		// 5e-105 needs 105 decimal places to show any non-zero digit, so it gets
		// rounded away to 0 at the 100-decimal cap, proving 150 was actually clamped
		expect(roundDecimals(5e-105, 150)).toBe(0);
	});
});
