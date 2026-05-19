/**
 * Extracts all elements of a tuple or array type except the first.
 * (Useful for working with rest parameters after the first argument)
 *
 * @typeParam T - The inferred list of which to exclude the first element from
 *
 * @example
 * ```ts
 * type Rest = NotFirst<[string, number, boolean]>; // [number, boolean]
 * ```
 */
export type NotFirst<T extends Array<unknown>> = T extends [arg0: T[0], ...rest: infer R]
	? R
	: never;

/**
 * A generic wrapper for values that may be `null` or `undefined`.
 *
 * @example
 * ```ts
 * type MaybeString = Maybe<string>; // string | null | undefined
 * ```
 */
export type Maybe<T> = T | null | undefined;

/**
 * A generic wrapper for a arecord with string only keys
 */
export type Dictionary<T = unknown> = Record<string, T>;
