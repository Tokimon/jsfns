import { toSafeFractionDigits } from '@jsfns/core/toSafeFractionDigits.js';
import { describe, expect, it } from 'vitest';

describe('"toSafeFractionDigits"', () => {
	it('Returns the number as is, when already within the 0-100 range', () => {
		expect(toSafeFractionDigits(4)).toBe(4);
	});

	it('Rounds a fractional decimal count', () => {
		expect(toSafeFractionDigits(2.6)).toBe(3);
	});

	describe('Clamps values below 0 up to 0', () => {
		it.each([-1, -100])('%s', (n) => {
			expect(toSafeFractionDigits(n)).toBe(0);
		});
	});

	describe('Clamps values above 100 down to 100', () => {
		it.each([101, 1000])('%s', (n) => {
			expect(toSafeFractionDigits(n)).toBe(100);
		});
	});

	it('Keeps the boundary values 0 and 100 unchanged', () => {
		expect(toSafeFractionDigits(0)).toBe(0);
		expect(toSafeFractionDigits(100)).toBe(100);
	});
});
