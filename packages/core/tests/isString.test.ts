import { isString } from '@jsfns/core/isString';

describe('"isString"', () => {
	describe('Returns `true` for String values', () => {
		it.each(['', String('test')])('"%s"', (n) => {
			expect(isString(n)).toBe(true);
		});
	});

	describe('Returns `false` for non String values', () => {
		it.each([null, undefined, Number.POSITIVE_INFINITY, Number.NaN, 9, [], {}])('"%s"', (n) => {
			expect(isString(n)).toBe(false);
		});
	});
});
