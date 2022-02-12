import isNumber from './isNumber';
import isString from './isString';



/**
 * Is the given argument is a finite numeric value (number as string or number directly) or not.
 *
 * @example
 * ```ts
 * isNumber(123); // -> true
 * isNumber('123'); // -> true
 * isNumber(Infinity); // -> false
 * ```
 *
 * @param x - Argument to test
 * @return - Whether the given argument is a numeric value
 */
export default function isNumeric(x: unknown): boolean {
  if (isString(x)) {
    if (!x.length) { return false; }
    x = Number(x);
  }

  return isNumber(x) && !Number.isNaN(x);
}
