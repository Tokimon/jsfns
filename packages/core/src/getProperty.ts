import { isNumeric } from './isNumeric.js';
import { isObjectLike } from './isObjectLike.js';
import type { Dictionary, FailedPathResolution, SuccessfulPathResolution } from './types.js';

const failure: FailedPathResolution = { success: false, value: null };

/**
 * Read a value from an object or array by following a path of keys.
 *
 * Returns `{ success, value }`: use `success` to tell a missing path from a stored `null`
 * or `undefined`.
 *
 * @typeParam T - Type of the found value. Not inferred, and not checked at runtime.
 *
 * @param input - The object or array to read from
 * @param path - A dot-separated string (`'a.b.0'`) or an array of keys (`['a', 'b', '0']`).
 *               Empty segments are ignored, so `'a..b'` equals `'a.b'`.
 *
 * @returns Whether the path was followed to its end, and the found value (`null` if it wasn't)
 *
 * @remarks
 * - An empty path (or one with no keys left after filtering) fails.
 * - Only own properties are read. Arrays only accept numeric keys, so `'length'` fails.
 * - Sparse-array holes are missing, not a stored `undefined`.
 *
 * @example
 * ```ts
 * getProperty({ a: { b: 2 } }, 'a.b'); // --> { success: true, value: 2 }
 * getProperty({ a: [{ b: 'hi' }] }, 'a.0.b'); // --> { success: true, value: 'hi' }
 * getProperty({ a: { b: 2 } }, ['a', 'b']); // --> { success: true, value: 2 }
 * getProperty({ a: null }, 'a'); // --> { success: true, value: null }
 * getProperty({}, 'a'); // --> { success: false, value: null }
 * getProperty<number>({ a: { b: 2 } }, 'a.b'); // --> value is `number | null`, `number` once `success` is checked
 * ```
 */
export function getProperty<T = unknown>(
	input: Dictionary | unknown[],
	path: string | string[],
): SuccessfulPathResolution<T> | FailedPathResolution {
	const keys = (Array.isArray(path) ? path : path.split('.')).filter(Boolean);
	if (!keys.length) return failure;

	let current: unknown = input;

	for (const key of keys) {
		if (!isObjectLike(current)) return failure;
		if (Array.isArray(current) && !isNumeric(key)) return failure;
		if (!Object.hasOwn(current, key)) return failure;

		current = (current as Dictionary)[key];
	}

	return { success: true, value: current as T };
}

export default getProperty;
