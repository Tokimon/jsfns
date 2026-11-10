import { isPrimitiveValue } from '@jsfns/core/isPrimitiveValue.js';
import { describe, expect, it } from 'vitest';

describe('"isPrimitiveValue"', () => {
	describe('Returns `true` for string, number and boolean values', () => {
		it.each(['', 'abc', 0, 1, 9.5, true, false, new Number(1), new Boolean(false)])(
			'"%s"',
			(input) => {
				expect(isPrimitiveValue(input)).toBe(true);
			},
		);
	});

	describe('Returns `false` for other values', () => {
		it.each([
			null,
			new String('a'),
			undefined,
			Number.NaN,
			Number.POSITIVE_INFINITY,
			Symbol('a'),
			BigInt(1),
			[],
			{},
			() => {},
		])('"%s"', (input) => {
			expect(isPrimitiveValue(input)).toBe(false);
		});
	});
});
