/**
 * Is the given argument of type String
 *
 * @param obj - Argument to test
 *
 * @returns Whether the argument a string or not
 *
 * @example
 * ```ts
 * isString('string'); // -> true
 * isString(123); // -> false
 * ```
 */
export default function isString(x: unknown): x is string {
  return typeof x === 'string';
}
