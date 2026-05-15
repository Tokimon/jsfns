import { isNumeric } from './isNumeric.ts';
import { isObjectLike } from './isObjectLike.ts';
import type { Dictionary } from './types.js';

/**
 * Read a value from an object or array by following a path of keys.
 *
 * Returns a `{ success, value }` discriminator — use `success` to distinguish
 * a missing path from a stored `null` or `undefined`.
 *
 * @param input - The object or array to read from
 * @param path - A dot-separated string (e.g. `'a.b.0.c'`) or an array of keys
 *               (e.g. `['a', 'b', '0', 'c']`). Empty segments are ignored, so
 *               `'a..b'` and `'.a.b.'` resolve the same as `'a.b'`.
 *
 * @returns `{ success, value }` — see the property docs for details.
 *
 * @remarks
 * - An empty path (or one that filters down to no keys) returns
 *   `{ success: false, value: null }`.
 * - On arrays, only canonical numeric-string keys are accepted; `'length'`,
 *   `'map'`, and other inherited or non-numeric keys return failure.
 * - Sparse-array holes are treated as missing (`success: false`), not as a
 *   stored `undefined`.
 *
 * @example
 * ```ts
 * // Object input
 * getProperty({ a: { b: 2 } }, 'a.b'); // --> { success: true, value: 2 }
 * getProperty({ a: [{ b: 'hi' }] }, 'a.0.b'); // --> { success: true, value: 'hi' }
 * getProperty({ a: 1 }, 'a.b'); // --> { success: false, value: null }
 *
 * // Distinguishing missing from stored null
 * getProperty({ a: null }, 'a'); // --> { success: true, value: null }
 * getProperty({}, 'a');          // --> { success: false, value: null }
 *
 * // Array input
 * getProperty([10, 20, 30], '1'); // --> { success: true, value: 20 }
 * getProperty(['a', ['b', 'c']], '1.0'); // --> { success: true, value: 'b' }
 *
 * // Array path
 * getProperty({ a: { b: 2 } }, ['a', 'b']); // --> { success: true, value: 2 }
 * ```
 */
export function getProperty(
	input: Dictionary | unknown[],
	path: string | string[],
): {
	/** Whether the path was fully traversed */
	success: boolean;
	/** The value at the path, or `null` if any step could not be traversed */
	value: unknown;
} {
	const keys = (Array.isArray(path) ? path : path.split('.')).filter(Boolean);
	const failure = { success: false, value: null };

	if (!keys.length) return failure;

	let current: unknown = input;

	for (const key of keys) {
		if (!isObjectLike(current)) return failure;
		if (Array.isArray(current) && !isNumeric(key)) return failure;
		if (!(key in current)) return failure;

		current = (current as Dictionary)[key];
	}

	return { success: true, value: current };
}
