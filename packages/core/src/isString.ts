/**
 * Is the given argument of type String
 *
 * @param obj - Argument to test
 *
 * @returns Whether the argument a string or not
 *
 * @example
 * ```ts
 * isString('string'); // --> true
 * isString(123); // --> false
 * ```
 */
export const isString = (x: unknown): x is string => typeof x === 'string';

export default isString;
