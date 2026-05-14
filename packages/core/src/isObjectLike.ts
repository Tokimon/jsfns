/**
 * Is the given argument of type of `object` and not `null`
 *
 * @param x - Argument to test
 *
 * @returns Whether the argument a plain object or not
 *
 * @example
 * ```ts
 * class Obj {}
 *
 * isObject({}); // --> true
 * isObject([]); // --> true
 * isObject(new Obj()); // --> true
 *
 * isObject('123'); // --> false
 * isObject(null); // --> false
 * ```
 */
export function isObjectLike(x: unknown): x is Record<string, unknown> | unknown[] {
	return x != null && typeof x === 'object';
}

export default isObjectLike;
