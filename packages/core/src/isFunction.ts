/**
 * Is the given argument a Function
 *
 * @param obj - Argument to test
 *
 * @returns Whether the argument a Function or not
 *
 * @example
 * ```ts
 * isFunction(() => {}); // --> true
 * isFunction('string'); // --> false
 * ```
 */
export const isFunction = (x: unknown): x is (...args: unknown[]) => unknown =>
	typeof x === 'function';

export default isFunction;
