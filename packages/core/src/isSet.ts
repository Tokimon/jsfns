import { getObjectName } from './getObjectName.js';

/**
 * Is the given argument a Set
 *
 * Works across realms (e.g. a Set created in an iframe), where `instanceof`
 * against the local realm's `Set` would fail.
 *
 * @param x - Argument to test
 *
 * @returns Whether the argument is a Set or not
 *
 * @example
 * ```ts
 * isSet(new Set()); // --> true
 * isSet(new Map()); // --> false
 * isSet([]); // --> false
 * ```
 */
export const isSet = (x: unknown): x is Set<unknown> =>
	x instanceof Set || getObjectName(x) === 'Set';

export default isSet;
