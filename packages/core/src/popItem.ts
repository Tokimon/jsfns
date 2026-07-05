import { popAtIndex, popAtIndexPure } from './popAtIndex.js';

/**
 * Find, removes and returns an entry from a given array
 *
 * @param list - The Array to remove the item from
 * @param find - The method to find the item in the array
 *
 * @returns An array with two entries: the first entry is the value found and removed and the
 *          second is the new array with the entry removed.
 *
 * @example
 * ```ts
 * popItemPure([1,2,3], (n) => n === 2); // --> [2, [1, 3]]
 * ```
 */
export function popItemPure<T>(list: T[], find: Parameters<T[]['findIndex']>[0]) {
	const index = list.findIndex(find);
	return popAtIndexPure(list, index);
}

/**
 * Find, removes and returns an entry from a given array
 *
 * @remarks
 *
 * This is not a pure function and will alter the given array internally
 *
 * @param list - The Array to remove the item from
 * @param find - The method to find the item in the array
 *
 * @returns The item popped from the array, if any
 *
 * @example
 * ```ts
 * popItem([1,2,3], (n) => n === 2); // --> 2 (array will then be [1, 3])
 * ```
 */
export function popItem<T>(list: T[], find: Parameters<T[]['findIndex']>[0]) {
	const index = list.findIndex(find);
	return popAtIndex(list, index);
}

export default popItem;
