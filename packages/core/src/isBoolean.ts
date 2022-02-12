/**
 * Is the given argument a boolean
 *
 * @example
 * ```ts
 * isBoolean(false); // -> true
 * isBoolean('string'); // -> false
 * ```
 *
 * @param x - Argument to test
 * @return - Whether the argument a Boolean or not
 */
export default function isBoolean(x: unknown): x is boolean {
  return x === true || x === false || x instanceof Boolean;
}
