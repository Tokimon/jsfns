/**
 * Is the given argument a Function
 *
 * @param obj - Argument to test
 *
 * @returns Whether the argument a Function or not
 *
 * @example
 * ```ts
 * isFunction(() => {}); // -> true
 * isFunction('string'); // -> false
 * ```
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export default function isFunction(x: unknown): x is Function {
  return typeof x === 'function';
}
