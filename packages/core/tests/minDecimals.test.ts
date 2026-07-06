import { minDecimals } from '@jsfns/core/minDecimals.js';
import { describe, expect, it } from 'vitest';

describe('"minDecimals"', () => {
	it('Pads a number that has fewer decimals than the given minimum', () => {
		expect(minDecimals(1.2, 4)).toBe('1.2000');
	});

	it('Leaves a number unchanged when it already has more decimals than the given minimum', () => {
		expect(minDecimals(1.23456, 2)).toBe('1.23456');
	});

	it('Leaves a number unchanged when it has exactly the given minimum of decimals', () => {
		expect(minDecimals(1.23, 2)).toBe('1.23');
	});

	it('Pads a whole number with no decimal point', () => {
		expect(minDecimals(1, 2)).toBe('1.00');
	});

	it('Pads negative numbers correctly', () => {
		expect(minDecimals(-1.2, 4)).toBe('-1.2000');
	});

	it('Never truncates decimals, even when the minimum is 0', () => {
		expect(minDecimals(1.5, 0)).toBe('1.5');
	});

	it('Leaves a whole number unchanged when the minimum is 0', () => {
		expect(minDecimals(5, 0)).toBe('5');
	});

	it('Clamps a negative minimum to 0, instead of throwing', () => {
		expect(minDecimals(1.5, -3)).toBe('1.5');
	});
});
