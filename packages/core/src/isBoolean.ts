/**
 * Is the given argument a boolean
 *
 * @param x - Argument to test
 *
 * @returns Whether the argument a Boolean or not
 *
 * @example
 * ```ts
 * isBoolean(false); // -> true
 * isBoolean('string'); // -> false
 * ```
 */
export default function isBoolean(x: unknown): x is boolean {
  return x === true || x === false || x instanceof Boolean;
}
