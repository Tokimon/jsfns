import { getByPointer } from './getByPointer.js';

type PointerArgs = Parameters<typeof getByPointer>;
type PointerValue<T> = ReturnType<typeof getByPointer<T>>['value'];

/** Replace every `From` in `S` with `To` */
export type Replace<
	S extends string,
	From extends string,
	To extends string,
> = S extends `${infer A}${From}${infer B}` ? `${A}${To}${Replace<B, From, To>}` : S;

/** Same order as `getByPointer`: `~1` first, so `~01` becomes `~1` */
export type Unescape<S extends string> = Replace<Replace<S, '~1', '/'>, '~0', '~'>;

/** Numeric segments are arrays, anything else is a key */
export type Wrap<K extends string, V> = K extends `${number}` ? V[] : { [Key in K]: V };

/** `FromPointer<'/a/b', string>` is `{ a: { b: string } }` */
export type FromPointer<P extends string, T> = P extends `/${infer Head}/${infer Rest}`
	? Wrap<Unescape<Head>, FromPointer<`/${Rest}`, T>>
	: P extends `/${infer Last}`
		? Wrap<Unescape<Last>, T>
		: unknown;

/**
 * Checks if the given path ends up with a value that passes the given type guard,
 * and narrows `input` to include it.
 *
 * Needs a literal pointer. Only safe for loosely typed input (e.g. parsed JSON): the `false`
 * branch is wrong if `input` is already typed with the value at the pointer.
 *
 * @example
 * ```ts
 * const isString = (value: unknown): value is string => typeof value === 'string';
 *
 * if (validateProperty(data, '/user/name', isString)) data.user.name; // --> string
 * ```
 */
export function validateProperty<const P extends string, T, I extends PointerArgs[0]>(
	input: I,
	pointer: P,
	validator: (value: unknown) => value is T,
): input is I & FromPointer<P, T>;
/**
 * Checks if the given path ends up with a value that passes the check given validator.
 *
 * @typeParam T - Type of the value at the pointer. Not inferred, and not checked at runtime.
 *
 * @param input - The object or array to read from
 * @param pointer - A JSON Pointer (e.g. `'/a/b/0'`), see `getByPointer`
 * @param validator - Validates the value, if found
 *
 * @returns Wether the given pointer is found and if the validation passes
 *
 * @example
 * ```ts
 * validateProperty({ a: { b: 2 } }, '/a/b', (value) => value === 2); // --> true
 * validateProperty({ a: 1 }, '/b', () => true); // --> false (missing path)
 *
 * type User = { name: string };
 * validateProperty<User>({ user: { name: 'john' } }, '/user', (user) => user?.name === 'john'); // --> true
 * ```
 */
export function validateProperty<T = unknown>(
	input: PointerArgs[0],
	pointer: PointerArgs[1],
	validator: (value: PointerValue<T>) => boolean,
): boolean;
export function validateProperty(
	input: PointerArgs[0],
	pointer: PointerArgs[1],
	validator: (value: unknown) => boolean,
): boolean {
	const { success, value } = getByPointer(input, pointer);
	return success && validator(value);
}

export default validateProperty;
