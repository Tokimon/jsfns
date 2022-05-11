import objectType from './objectType';



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
// eslint-disable-next-line @typescript-eslint/ban-types
export default function isObject(x: unknown): x is object {
  return objectType(x) === 'object' && Object(x) === x;
}
