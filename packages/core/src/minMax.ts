/**
 * Limit a number to a certain range defined by Minimum and a Maximum
 *
 * @example
 * ```ts
 * minMax(5, 10, 20); // -> 10
 * minMax(15, 10, 20); // -> 15
 * minMax(25, 10, 20); // -> 20
 * ```
 *
 * @param num - The number to limit
 * @param min - Lower limit
 * @param max - Upper limit
 */
export default function minMax(num: number, min: number, max: number): number {
  return num < min ? min : (num > max ? max : num);
}
