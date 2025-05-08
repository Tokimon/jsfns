import { popAtIndex, popAtIndexPure } from '@jsfns/core/popAtIndex';

describe('"popAtIndex"', () => {
	describe('"popAtIndex"', () => {
		it('Returns the value a the given index', () => {
			expect(popAtIndex([1, 2, 3], 1)).toBe(2);
		});

		it('Removes the value a the given index from the given array', () => {
			const a = [1, 2, 3];
			popAtIndex(a, 1);
			expect(a).toEqual([1, 3]);
		});

		describe.each([-1, 10])('When index is out of bounds: %i', (index) => {
			it('Returns undefined', () => {
				expect(popAtIndex([1, 2, 3], index)).toBe(undefined);
			});

			it('Does not alter the given array', () => {
				const a = [1, 2, 3];
				popAtIndex(a, index);
				expect(a).toEqual(a);
			});
		});
	});

	describe('"popAtIndexPure"', () => {
		it('Removes the value a the given index from the given array', () => {
			expect(popAtIndexPure([1, 2, 3], 1)).toEqual([2, [1, 3]]);
		});

		describe.each([-1, 10])('When index is out of bounds: %i', (index) => {
			it('Returns undefined', () => {
				const a = [1, 2, 3];
				expect(popAtIndexPure(a, index)).toEqual([undefined, a]);
			});

			it('Does not alter the given array', () => {
				const a = [1, 2, 3];
				expect(popAtIndexPure(a, index)[1]).toBe(a);
			});
		});
	});
});
