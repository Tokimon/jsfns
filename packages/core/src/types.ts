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
 * @typeParam T - The wrapped value type
 *
 * @example
 * ```ts
 * type MaybeString = Maybe<string>; // string | null | undefined
 * ```
 */
export type Maybe<T> = T | null | undefined;

/**
 * A generic wrapper for a arecord with string only keys
 *
 * @typeParam T - The type of the record's values
 */
export type Dictionary<T = unknown> = Record<string, T>;

/**
 * The result of following a path that could be fully traversed
 *
 * @typeParam T - The type of the found value
 */
export type SuccessfulPathResolution<T> = {
	/** Path resolved successfully */
	success: true;
	/** The found value */
	value: T;
};

/** The result of following a path that could not be fully traversed */
export type FailedPathResolution = {
	/** Path failed to resolve */
	success: false;
	/** Value not found, so always `null` */
	value: null;
};
