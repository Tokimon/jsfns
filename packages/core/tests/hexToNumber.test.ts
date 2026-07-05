import { hexToNumber } from '@jsfns/core/hexToNumber.js';
import { describe, expect, it } from 'vitest';

describe('"hexToNumber"', () => {
	it('Generates a number from a hexadecimal', () => {
		expect(hexToNumber('ab')).toBe(171);
	});

	describe('Returns NaN on non-parsable values', () => {
		it.each(['', 'g', 'gh'])('%s', (x) => {
			expect(hexToNumber(x)).toBe(Number.NaN);
		});
	});

	it('Ignores any subsequent non-parsable values', () => {
		expect(hexToNumber('fh')).toBe(15);
	});
});
