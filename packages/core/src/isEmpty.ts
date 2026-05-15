import { isBoolean } from './isBoolean.ts';
import { isNumber } from './isNumber.ts';
import { isObject } from './isObject.ts';

/**
 * Is the given value considered empty.
 *
 * @remarks
 *
 * - `null`, `undefined`, and `''` are always empty
 * - Numbers and booleans are never empty (including `0` and `false`)
 * - Arrays, `Map`s, and `Set`s are empty when they have no entries
 * - Plain objects (including `Object.create(null)`) are empty when they have
 *   no own enumerable keys
 * - Non-plain objects (`Date`, `RegExp`, class instances, etc.) are never
 *   reported as empty
 *
 * @param x - The value to check
 *
 * @returns Whether the value is empty or not
 *
 * @example
 * ```ts
 * isEmpty(null); // --> true
 * isEmpty(''); // --> true
 * isEmpty([]); // --> true
 * isEmpty({}); // --> true
 * isEmpty(new Set()); // --> true
 *
 * isEmpty(0); // --> false
 * isEmpty(false); // --> false
 * isEmpty([1]); // --> false
 * isEmpty({ a: 1 }); // --> false
 * isEmpty(new Date()); // --> false
 * ```
 */
export function isEmpty(x: unknown) {
	if (isNumber(x) || isBoolean(x)) return false;

	if (!x) return true;

	if (Array.isArray(x)) return !x.length;

	if (x instanceof Map || x instanceof Set) return !x.size;

	if (isObject(x)) {
		const proto = Object.getPrototypeOf(x);
		const isPlain = proto === null || proto === Object.prototype;
		return isPlain && !Object.keys(x).length;
	}

	return false;
}
