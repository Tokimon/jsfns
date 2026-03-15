/**
 * Is the given argument a Function
 *
 * @param x - Argument to test
 *
 * @returns Whether the argument a Function or not
 *
 * @example
 * ```ts
 * isFunction(() => {}); // --> true
 * isFunction('string'); // --> false
 * ```
 */

// biome-ignore lint/complexity/noBannedTypes: In this instance Function is the right type
export function isFunction(x: unknown): x is Function {
	return typeof x === 'function';
}

export default isFunction;
