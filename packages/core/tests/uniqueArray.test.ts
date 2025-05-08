import { uniqueArray } from '@jsfns/core/uniqueArray';

const numberArray = [1, 2, 1, 3, 3, 2, 1];

const CustomIterator: Iterable<number> = {
	[Symbol.iterator]() {
		let n = 0;
		return {
			next() {
				return { value: numberArray[n] ?? 0, done: n++ >= numberArray.length - 1 };
			},
		};
	},
};

describe('"uniqueArray"', () => {
	const obj = {};

	it('Does nothing to an empty array', () => {
		expect(uniqueArray([])).toEqual([]);
	});

	describe('Creates unique array from an Iterator', () => {
		it('Custom Iterator', () => {
			expect(uniqueArray(CustomIterator)).toEqual([1, 2, 3]);
		});

		it('Set', () => {
			expect(uniqueArray(new Set(numberArray))).toEqual([1, 2, 3]);
		});
	});

	describe('Filter out duplicate items in the array', () => {
		it.each([
			['Numbers', numberArray, [1, 2, 3]],
			['Strings', ['a', 'c', 'b', 'c', 'a'], ['a', 'c', 'b']],
			['Objects', [obj, obj, obj, {}, {}], [obj, {}, {}]],
			['Mixed values', [[1, 2], 1, 'a', 'a', obj, obj], [[1, 2], 1, 'a', obj]],
			[
				'No deep check',
				[
					[1, 2, 1],
					[1, 2, 2],
					[1, 2, 3],
				],
				[
					[1, 2, 1],
					[1, 2, 2],
					[1, 2, 3],
				],
			],
		])('%s', (_, arr, result) => {
			expect(uniqueArray(arr)).toEqual(result);
		});
	});
});
