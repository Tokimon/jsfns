import { getObjectName } from './getObjectName.js';

/**
 * Is the given argument a Map
 *
 * Works across realms (e.g. a Map created in an iframe), where `instanceof`
 * against the local realm's `Map` would fail.
 *
 * @param x - Argument to test
 *
 * @returns Whether the argument is a Map or not
 *
 * @example
 * ```ts
 * isMap(new Map()); // --> true
 * isMap(new Set()); // --> false
 * isMap({}); // --> false
 * ```
 */
export const isMap = (x: unknown): x is Map<unknown, unknown> =>
	x instanceof Map || getObjectName(x) === 'Map';

export default isMap;
