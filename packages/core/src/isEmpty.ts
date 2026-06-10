import { isBoolean } from './isBoolean.js';
import { isMap } from './isMap.js';
import { isNumber } from './isNumber.js';
import { isPlainObject } from './isPlainObject.js';
import { isSet } from './isSet.js';

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

	if (isMap(x) || isSet(x)) return !x.size;

	if (isPlainObject(x)) return !Object.keys(x).length;

	return false;
}
