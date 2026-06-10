/**
 * Get the internal type name of a value via `Object.prototype.toString`.
 *
 * @param obj - The object to get the name of
 * @returns The internal type name (e.g. `'Map'`, `'RegExp'`, `'Array'`)
 *
 * @example
 *
 * ```ts
 * getObjectName(new Map()) // --> 'Map'
 * getObjectName(/x/) // --> 'RegExp'
 * getObjectName([]) // --> 'Array'
 * getObjectName(null) // --> 'Null'
 * ```
 */
export const getObjectName = (obj: unknown): string =>
	Object.prototype.toString.call(obj).slice(8, -1);

export default getObjectName;
