import { isObject } from './isObject.js';

/**
 * Is the given argument a plain object (created via `{}`, `new Object()`, or
 * `Object.create(null)`) rather than a class instance, array, or built-in like
 * `Date`/`Map`.
 *
 * Works across realms (e.g. an object literal from an iframe), by checking the
 * prototype chain instead of identity against this realm's `Object.prototype`.
 *
 * @param x - Argument to test
 *
 * @returns Whether the argument is a plain object or not
 *
 * @example
 * ```ts
 * class Obj {}
 *
 * isPlainObject({}); // --> true
 * isPlainObject(Object.create(null)); // --> true
 * isPlainObject(new Obj()); // --> false
 * isPlainObject([]); // --> false
 * isPlainObject(new Date()); // --> false
 * ```
 */
export function isPlainObject(x: unknown): x is Record<string, unknown> {
	if (!isObject(x)) return false;

	// A plain object's prototype is either null or a top-level `Object.prototype`
	// (one whose own prototype is null)
	const proto = Object.getPrototypeOf(x);
	return proto === null || Object.getPrototypeOf(proto) === null;
}

export default isPlainObject;
