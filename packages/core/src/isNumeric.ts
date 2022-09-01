import isNumber from './isNumber';
import isString from './isString';



/**
 * Is the given argument is a finite numeric value (number as string or number directly) or not.
 *
 * @param x - Argument to test
 *
 * @returns Whether the given argument is a numeric value
 *
 * @example
 * ```ts
 * isNumeric(123); // -> true
 * isNumeric('123'); // -> true
 * isNumeric(Infinity); // -> false
 * ```
 */
export default function isNumeric(x: unknown): boolean {
  if (isString(x)) {
    if (!x) return false;
    x = Number(x);
  }

  return isNumber(x) && !Number.isNaN(x);
}
