import { isBoolean } from './isBoolean.js';
import { isNumber } from './isNumber.js';
import { isString } from './isString.js';

/**
 * Is the given argument a primitive value (a string, a finite number or a boolean)
 *
 * @param x - Argument to test
 *
 * @returns Whether the argument is a string, a finite number or a boolean
 *
 * @example
 * ```ts
 * isPrimitiveValue('abc'); // --> true
 * isPrimitiveValue(123); // --> true
 * isPrimitiveValue(false); // --> true
 * isPrimitiveValue(Infinity); // --> false
 * isPrimitiveValue(null); // --> false
 * isPrimitiveValue({}); // --> false
 * ```
 */
export function isPrimitiveValue(x: unknown): x is number | string | boolean {
	return isString(x) || isNumber(x) || isBoolean(x);
}
