import { isNumber } from './isNumber';
import { isString } from './isString';

/**
 * Is the given argument is a finite numeric value (number as string or number directly) or not.
 *
 * @param x - Argument to test
 *
 * @returns Whether the given argument is a numeric value
 *
 * @example
 * ```ts
 * isNumeric(123); // --> true
 * isNumeric('123'); // --> true
 * isNumeric(Infinity); // --> false
 * ```
 */
export function isNumeric(x: unknown): boolean {
	const num = isString(x) && !!x ? Number(x) : x;
	return isNumber(num) && !Number.isNaN(num);
}

export default isNumeric;
