import { isObjectLike } from './isObjectLike.js';
import type { Dictionary } from './types.js';

// RFC 6901 array index: `0` or digits without leading zeros (so no `-`, `1e0`, ` 1`, `01`)
const arrayIndex = /^(0|[1-9]\d*)$/;
const failure = { success: false, value: null };

/**
 * Read a value from an object or array using a JSON Pointer ([RFC 6901](https://datatracker.ietf.org/doc/html/rfc6901)).
 *
 * Unlike `getProperty`, empty segments are *significant* (`'/a//b'` reads the key `""` inside `a`)
 * and only own properties are read. Use this for pointers coming from JSON Schema `$ref`,
 * JSON Patch, OpenAPI etc. — use `getProperty` for hand written dot-paths.
 *
 * Returns a `{ success, value }` discriminator — use `success` to distinguish
 * a missing path from a stored `null` or `undefined`.
 *
 * @typeParam T - Optional type to assert the found value as (defaults to `unknown`).
 *                Not inferred from `input`, so it must be given explicitly.
 *
 * @param input - The object or array to read from
 * @param pointer - A JSON Pointer string (e.g. `'/a/b/0/c'`). `~1` is unescaped to `/`
 *                  and `~0` to `~`. An empty string points to `input` itself.
 *
 * @returns `{ success, value }` — see the property docs for details.
 *
 * @remarks
 * - A pointer that is not empty and does not start with `/` returns `{ success: false, value: null }`.
 * - On arrays, only canonical indices are accepted; `'length'`, `'-'`, `'01'` and other
 *   keys return failure.
 * - Sparse-array holes are treated as missing (`success: false`).
 *
 * @example
 * ```ts
 * getByPointer({ a: { b: 2 } }, '/a/b'); // --> { success: true, value: 2 }
 * getByPointer({ a: [{ b: 'hi' }] }, '/a/0/b'); // --> { success: true, value: 'hi' }
 * getByPointer({ a: 1 }, '/a/b'); // --> { success: false, value: null }
 *
 * // Escaping: `~1` is `/` and `~0` is `~`
 * getByPointer({ 'a/b': 1, '~': 2 }, '/a~1b'); // --> { success: true, value: 1 }
 * getByPointer({ 'a/b': 1, '~': 2 }, '/~0'); // --> { success: true, value: 2 }
 *
 * // Empty keys are real keys
 * getByPointer({ '': { '': 3 } }, '//'); // --> { success: true, value: 3 }
 *
 * // The empty pointer is the input itself
 * getByPointer({ a: 1 }, ''); // --> { success: true, value: { a: 1 } }
 * ```
 */
export function getByPointer<T = unknown>(
	input: Dictionary | unknown[],
	pointer: string,
): {
	/** Whether the pointer was fully traversed */
	success: boolean;
	/** The value at the pointer, or `null` if any step could not be traversed */
	value: T | null;
} {
	if (!pointer) return { success: true, value: input as T };
	if (!pointer.startsWith('/')) return failure;

	let current: unknown = input;

	for (const segment of pointer.slice(1).split('/')) {
		const key = segment.replaceAll('~1', '/').replaceAll('~0', '~'); // order matters: `~01` must become `~1`

		if (!isObjectLike(current)) return failure;
		if (Array.isArray(current) && !arrayIndex.test(key)) return failure;
		if (!Object.hasOwn(current, key)) return failure;

		current = (current as Dictionary)[key];
	}

	return { success: true, value: current as T };
}

export default getByPointer;
