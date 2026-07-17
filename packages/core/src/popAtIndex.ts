/**
 * Removes and returns an entry from a given array, at a designated index position.
 *
 * @param list - The Array to remove the item from
 * @param index - At what index to remove from
 * @typeParam T - The inferred tuple/array type of the given list
 *
 * @returns An array with two entries: the first entry is the value just removed and the second
 *          is the new array with the entry removed.
 *
 * @example
 * ```ts
 * popAtIndexPure([1,2,3], 1); // --> [2, [1, 3]]
 * ```
 */
export function popAtIndexPure<T>(list: T[], index: number): [T | undefined, T[]] {
	if (index < 0 || index >= list.length) return [undefined, list];
	return [list[index], list.toSpliced(index, 1)];
}

/**
 * Removes and returns an entry from a given array, at a designated index position.
 *
 * @remarks
 *
 * This is not a pure function and will alter the given array internally
 *
 * @param list - The Array to remove the item from
 * @param index - At what index to remove from
 * @typeParam T - The inferred type of the items in the given list
 *
 * @returns The item popped from the array, if any
 *
 * @example
 * ```ts
 * popAtIndex([1,2,3], 1); // --> 2 (array will then be [1, 3])
 * ```
 */
export function popAtIndex<T>(list: T[], index: number): T | undefined {
	if (index >= 0 && index < list.length) return list.splice(index, 1)[0];
}

export default popAtIndex;
