import { isNumber } from '@jsfns/core/isNumber';

describe('"isNumber"', () => {
	describe('Returns `true` for Number values', () => {
		it.each([8, 9.5, Number('0'), new Number('5')])('"%s"', (n) => {
			expect(isNumber(n)).toBe(true);
		});
	});

	describe('Returns `false` for non Number values', () => {
		it.each([null, undefined, Number.POSITIVE_INFINITY, Number.NaN, '', new String(''), [], {}])(
			'"%s"',
			(n) => {
				expect(isNumber(n)).toBe(false);
			},
		);
	});
});
