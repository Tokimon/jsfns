import { popItem, popItemPure } from '@jsfns/core/popItem.js';
import { describe, expect, it } from 'vitest';

describe('"popItem"', () => {
	describe('"popItem"', () => {
		it('Returns the found item', () => {
			expect(popItem([1, 2, 3], (n) => n === 2)).toBe(2);
		});

		it('Removes the found value from the given array', () => {
			const a = [1, 2, 3];
			popItem(a, (n) => n === 2);
			expect(a).toEqual([1, 3]);
		});

		describe.each([0, 5])('When item is not found: %i', (x) => {
			it('Returns undefined', () => {
				expect(popItem([1, 2, 3], (n) => n === x)).toBe(undefined);
			});

			it('Does not alter the given array', () => {
				const a = [1, 2, 3];
				popItem([1, 2, 3], (n) => n === x);
				expect(a).toEqual(a);
			});
		});
	});

	describe('"popItemPure"', () => {
		it('Returns the found item and the altered array', () => {
			const a = [1, 2, 3];
			expect(popItemPure(a, (n) => n === 2)).toEqual([2, [1, 3]]);
			expect(a).toEqual([1, 2, 3]);
		});

		describe.each([0, 5])('When index is out of bounds: %i', (x) => {
			it('Returns undefined and the given array', () => {
				const a = [1, 2, 3];
				expect(popItemPure(a, (n) => n === x)).toEqual([undefined, a]);
				expect(a).toEqual([1, 2, 3]);
			});
		});
	});
});
