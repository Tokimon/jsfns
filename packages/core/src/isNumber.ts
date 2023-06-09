/**
 * Is the given argument is a finite Number
 *
 * @param x - Argument to test
 *
 * @returns Whether the argument a finite number or not
 *
 * @example
 * ```ts
 * isNumber(123); // -> true
 * isNumber(Infinity); // -> false
 * isNumber('123'); // -> false
 * ```
 */
export default function isNumber(x: unknown): x is number {
  return (typeof x === 'number' || x instanceof Number) && Number.isFinite(Number(x));
}
