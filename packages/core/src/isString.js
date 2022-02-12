import objectType from './objectType';
/**
 * Is the given argument of type String
 *
 * @example
 * ```ts
 * isString('string'); // -> true
 * isString(123); // -> false
 * ```
 *
 * @param obj - Argument to test
 * @return - Whether the argument a string or not
 */
export default function isString(x) {
    return typeof x === 'string' || objectType(x) === 'string';
}
