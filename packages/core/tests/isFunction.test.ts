import { isFunction } from '@jsfns/core/isFunction';

describe('"isFunction"', () => {
	describe('Returns `true` for Function values', () => {
		it.each([() => undefined, () => undefined, new Function()])('"%s"', (fn) => {
			expect(isFunction(fn)).toBe(true);
		});
	});

	describe('Return `false` for non Function values', () => {
		it.each([null, 'Function', undefined])('"%s"', (nonFn) => {
			expect(isFunction(nonFn)).toBe(false);
		});
	});
});
