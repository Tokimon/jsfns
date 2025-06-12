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
export function isFunction(x: unknown): x is (...args: unknown[]) => unknown {
	return typeof x === 'function';
}

export default isFunction;
