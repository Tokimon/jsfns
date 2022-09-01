/**
 * Is the given argument of type String
 *
 * @param x - Argument to test
 *
 * @returns Whether the argument a plain object or not
 *
 * @example
 * ```ts
 * class Obj {}
 *
 * isObject({}); // -> true
 * isObject(new Obj()); // -> true
 * isObject('123'); // -> false
 * ```
 */
export default function isObject(x: unknown): x is object {
  return x != null && typeof x === 'object' && !Array.isArray(x) && Object(x) === x;
}
