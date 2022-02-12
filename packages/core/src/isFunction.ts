/**
 * Is the given argument a Function
 *
 * @example
 * ```ts
 * isFunction(() => {}); // -> true
 * isFunction('string'); // -> false
 * ```
 *
 * @param obj - Argument to test
 * @return - Whether the argument a Function or not
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export default function isFunction(x: unknown): x is Function {
  return typeof x === 'function';
}
