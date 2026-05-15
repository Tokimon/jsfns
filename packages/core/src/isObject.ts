import { isObjectLike } from './isObjectLike.ts';

/**
 * Is the given argument a plain object (non-null, non-array) or not
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
 * isObject(new Obj()); // --> true
 * isObject('123'); // --> false
 * ```
 */
export function isObject(x: unknown): x is Record<string, unknown> {
	return isObjectLike(x) && !Array.isArray(x);
}

export default isObject;
