/**
 * Filter out duplicate values from an array
 *
 * @param arr - ArrayLike or Iterable collection to convert
 *
 * @returns A list with only unique items
 *
 * @example
 * ```ts
 * uniqueArray([1,2,3,1,4,5,3,7]); // --> [1,2,3,4,5,6,7]
 * uniqueArray(document.querySelectorAll('.my-elm, .selected')); // --> unique array of elements (so .my-elm.selected will only be present once)
 * ```
 */
export function uniqueArray<T>(arr: ArrayLike<T> | Iterable<T>): T[] {
  const a = !Array.isArray(arr) ? Array.from(arr) : arr;
  return Array.from<T>(new Set(a));
}

export default uniqueArray;
