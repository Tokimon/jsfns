/**
 * Filter out duplicate values from an array
 *
 * @param arr - Array to filter on
 * @param settings - Settings to use with the truncation
 *
 * @returns The truncated string
 *
 * @example
 * ```ts
 * uniqueArray([1,2,3,1,4,5,3,7]); // -> [1,2,3,4,5,6,7]
 * ```
 */
export default function uniqueArray(arr: unknown[]): unknown[] {
  return Array.from(new Set(arr));
}
