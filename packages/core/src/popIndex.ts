/**
 * Removes and returns an entry from a given array, at a designated index position.
 * WARNING: This is not a pure function and will alter the given array internally
 *
 * @param list - The Array to remove the item from
 * @param index - At what index to remove from
 *
 * @returns An array with two entries: the first entry is the value just removed and the second
 *          is the new array with the entry removed.
 *
 * @example
 * ```ts
 * popIndexPure([1,2,3], 1); // -> 2 (array will then be [1, 3])
 * ```
 */
export function popIndexPure(list: unknown[], index: number): [unknown, unknown[]] {
  const value = list[index];

  if (index >= 0 && index < list.length) {
    list = list.slice(0, index).concat(list.slice(index + 1));
  }

  return [value, list];
}



/**
 * Removes and returns an entry from a given array, at a designated index position.
 * WARNING: This is not a pure function and will alter the given array internally
 *
 * @param list - The Array to remove the item from
 * @param index - At what index to remove from
 *
 * @example
 * ```ts
 * popIndex([1,2,3], 1); // -> 2 (array will then be [1, 3])
 * ```
 */
export function popIndex<T>(list: T[], index: number): T | undefined {
  if (index >= 0 && index < list.length) {
    return list.splice(index, 1)[0];
  }
}

export default popIndex;
