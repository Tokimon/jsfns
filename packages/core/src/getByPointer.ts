import { isObjectLike } from './isObjectLike.js';
import type { Dictionary, FailedPathResolution, SuccessfulPathResolution } from './types.js';

// RFC 6901 array index: `0` or digits without leading zeros (so no `-`, `1e0`, ` 1`, `01`)
const arrayIndex = /^(0|[1-9]\d*)$/;
const failure: FailedPathResolution = { success: false, value: null };

/**
 * Read a value from an object or array using a JSON Pointer ([RFC 6901](https://datatracker.ietf.org/doc/html/rfc6901)).
 *
 * Returns `{ success, value }`: use `success` to tell a missing path from a stored `null`
 * or `undefined`.
 *
 * @typeParam T - Type of the found value. Not inferred, and not checked at runtime.
 *
 * @param input - The object or array to read from
 * @param pointer - A JSON Pointer (`'/a/b/0'`). `~1` is unescaped to `/` and `~0` to `~`.
 *
 * @returns An indication of wether the path found its target or not as well as the final value (or null if not).
 *
 * @remarks
 * - A pointer that doesn't start with `/` (including the empty string) fails.
 * - Only own properties are read. Arrays only accept canonical indices, so `'length'`, `'-'` and `'01'` fail.
 * - Sparse-array holes are missing, not a stored `undefined`.
 *
 * @example
 * ```ts
 * getByPointer({ a: { b: 2 } }, '/a/b'); // --> { success: true, value: 2 }
 * getByPointer({ a: [{ b: 'hi' }] }, '/a/0/b'); // --> { success: true, value: 'hi' }
 * getByPointer({ a: 1 }, '/a/b'); // --> { success: false, value: null }
 * getByPointer({ 'a/b': 1 }, '/a~1b'); // --> { success: true, value: 1 }
 * getByPointer({ '': { '': 3 } }, '//'); // --> { success: true, value: 3 }
 * ```
 */
export function getByPointer<T = unknown>(
	input: Dictionary | unknown[],
	pointer: string,
): SuccessfulPathResolution<T> | FailedPathResolution {
	if (!pointer?.startsWith('/')) return failure;

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
