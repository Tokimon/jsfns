/**
 * Is the given argument a boolean
 *
 * @param x - Argument to test
 *
 * @returns Whether the argument a Boolean or not
 *
 * @example
 * ```ts
 * isBoolean(false); // --> true
 * isBoolean('string'); // --> false
 * ```
 */
export const isBoolean = (x: unknown): x is boolean =>
	x === true || x === false || x instanceof Boolean;

export default isBoolean;
