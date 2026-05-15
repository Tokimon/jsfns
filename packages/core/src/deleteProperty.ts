import { getProperty } from './getProperty.ts';
import { isEmpty } from './isEmpty.ts';
import { popAtIndex } from './popAtIndex.ts';
import type { Dictionary } from './types.js';

/** An object or array that `deleteProperty` can traverse */
export type InputObject = Dictionary | unknown[];

/** Behavior modifiers for `deleteProperty` */
export type DeletePropertyOptions = {
	/**
	 * Remove any empty objects left in the path.
	 * *Note:* this will remove any empty objects in the path even if the given property was not finally found
	 */
	cleanup?: boolean;

	/** Do not modify the given object directly, but return a modified copy */
	immutable?: boolean;

	/** Only remove property if it is empty */
	safe?: boolean;
};

// Options used by the recursive cleanup call: the top-level call has already
// cloned the input (if immutable was set), so we mutate from here; safe ensures
// we only strip empty ancestors; cleanup propagates the recursion.
const cleanUpOptions: DeletePropertyOptions = { immutable: false, safe: true, cleanup: true };

/**
 * Remove a property from an object or array by following a path of keys.
 * The removal behavior is configurable via the given options.
 *
 * @param input - The object or array to remove from
 * @param path - A dot-separated string (e.g. `'a.b.0.c'`) or an array of keys
 *               (e.g. `['a', 'b', '0', 'c']`)
 * @param options - Optional behavior modifiers
 * @param options.cleanup - Also remove any ancestor levels that become empty after the deletion
 * @param options.immutable - Work on a `structuredClone` of `input` instead of mutating it
 * @param options.safe - Only remove the property if its current value is empty
 *
 * @returns An object with `removed` (whether anything was deleted) and `obj`
 *          (the resulting object — the same reference as `input`, unless
 *          `immutable` is set *and* a modification was made, in which case
 *          `obj` is a new reference)
 *
 * @example
 * ```ts
 * // Object input
 * deleteProperty({ a: { b: 1 } }, 'a.b');
 * // --> { removed: true, obj: { a: {} } }
 *
 * deleteProperty({ a: [10, 20, 30] }, 'a.1');
 * // --> { removed: true, obj: { a: [10, 30] } }
 *
 * // Array input
 * deleteProperty([10, 20, 30], '1');
 * // --> { removed: true, obj: [10, 30] }
 *
 * // Array path
 * deleteProperty({ a: { b: 1 } }, ['a', 'b']);
 * // --> { removed: true, obj: { a: {} } }
 *
 * // Options
 * deleteProperty({ a: { b: { c: 1 } } }, 'a.b.c', { cleanup: true });
 * // --> { removed: true, obj: {} }
 *
 * deleteProperty({ a: { b: 1 } }, 'a.b', { safe: true });
 * // --> { removed: false, obj: { a: { b: 1 } } }
 * ```
 */
export function deleteProperty(
	input: InputObject,
	path: string | string[],
	options: DeletePropertyOptions = {},
): {
	/** Whether anything was deleted */
	removed: boolean;
	/** The resulting object — see `@returns` description for reference semantics */
	obj: InputObject;
} {
	// convert (or conserve) keys to array and filter out any empty entries
	const keys = (Array.isArray(path) ? path : path.split('.')).filter(Boolean);
	const key = keys.at(-1);
	const failure = { removed: false, obj: input };

	if (!key) return failure;

	const { cleanup, immutable, safe } = options;

	const curr = getProperty(input, keys);
	const parentPath = keys.slice(0, -1);

	if (!curr.success) {
		return cleanup ? deleteProperty(input, parentPath, { ...options, safe: true }) : failure;
	}

	if (safe && !isEmpty(curr.value)) return failure;

	// Copy object if we need it immutable
	const obj = immutable ? structuredClone(input) : input;

	// At this point we are sure that getting the parent property will be successful
	const parent = parentPath.length ? (getProperty(obj, parentPath).value as InputObject) : obj;

	let removed = true;
	if (Array.isArray(parent)) popAtIndex(parent, Number(key));
	else removed = delete parent[key];

	if (cleanup) removed = deleteProperty(obj, parentPath, cleanUpOptions).removed || removed;
	return { removed, obj };
}

export default deleteProperty;
