import { clamp } from '@jsfns/core/clamp.js';
import { describe, expect, it } from 'vitest';

describe('"clamp"', () => {
	it('Limits a number to the given minimum value', () => {
		expect(clamp(10, 0, 20)).toBe(10);
	});

	it('Limits a number to the given maximum value', () => {
		expect(clamp(10, 200, 20)).toBe(20);
	});

	it('Returns the given number as is, when it is within the given range', () => {
		expect(clamp(10, 15, 20)).toBe(15);
	});
});
