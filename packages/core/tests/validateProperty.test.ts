import { validateProperty } from '@jsfns/core/validateProperty.js';
import { describe, expect, expectTypeOf, it, vi } from 'vitest';

const isString = (value: unknown) => typeof value === 'string';
const isNumber = (value: unknown) => typeof value === 'number';
const isNull = (value: unknown) => value === null;
const isUndefined = (value: unknown) => value === undefined;
const isAnything = (_value: unknown) => true;

describe('"validateProperty"', () => {
	describe('Validating values', () => {
		it.each([
			['a top-level key', { a: 'x' }, '/a', isString],
			['a nested key', { a: { b: { c: 1 } } }, '/a/b/c', isNumber],
			['an array index', [10, 20, 30], '/1', isNumber],
			['a nested array index', { a: ['x', 'y'] }, '/a/1', isString],
			['objects inside arrays', { a: [{ b: 'hi' }] }, '/a/0/b', isString],
			['null', { a: null }, '/a', isNull],
			['undefined', { a: undefined }, '/a', isUndefined],
			['an empty key', { '': { '': 'x' } }, '//', isString],
			['an escaped key', { 'a/b': 1 }, '/a~1b', isNumber],
		])('Returns true when the validator accepts %s', (_label, input, pointer, validator) => {
			expect(validateProperty(input, pointer, validator)).toBe(true);
		});

		it.each([
			['a string that is not a number', { a: 'x' }, '/a', isNumber],
			['a number that is not a string', { a: 1 }, '/a', isString],
			['null where a string is expected', { a: null }, '/a', isString],
			['undefined where a string is expected', { a: undefined }, '/a', isString],
			['a nested value', { a: { b: 1 } }, '/a/b', isString],
			['an array item', [1, 2, 3], '/0', isString],
			['an object where a string is expected', { a: { b: 1 } }, '/a', isString],
		])('Returns false when the validator rejects %s', (_label, input, pointer, validator) => {
			expect(validateProperty(input, pointer, validator)).toBe(false);
		});

		it('Passes falsy values to the validator', () => {
			for (const value of [0, false, '', null, undefined, Number.NaN]) {
				const validator = vi.fn(isAnything);
				expect(validateProperty({ a: value }, '/a', validator)).toBe(true);
				expect(validator).toHaveBeenCalledWith(value);
			}
		});

		it('Hands the exact reference of object values to the validator', () => {
			const nested = { b: 2 };
			const validator = vi.fn(isAnything);
			validateProperty({ a: nested }, '/a', validator);
			expect(validator.mock.calls[0]?.[0]).toBe(nested);
		});

		it('Supports validators that check the value itself, not only its type', () => {
			type User = { name: string; age: number };
			const user = { user: { name: 'john', age: 30 } };
			expect(validateProperty<User>(user, '/user', (u) => u?.name === 'john')).toBe(true);
			expect(validateProperty<User>(user, '/user', (u) => u?.name === 'jane')).toBe(false);
			expect(validateProperty<number>(user, '/user/age', (age) => (age ?? 0) >= 18)).toBe(true);
			expect(validateProperty<number[]>({ list: [1, 2, 3] }, '/list', (l) => l?.length === 3)).toBe(
				true,
			);
		});

		it('Calls the validator exactly once with a single argument', () => {
			const validator = vi.fn(isNumber);
			validateProperty({ a: 1 }, '/a', validator);
			expect(validator).toHaveBeenCalledTimes(1);
			expect(validator).toHaveBeenCalledWith(1);
		});
	});

	describe('Missing paths', () => {
		it.each([
			['a missing top-level key', { a: 1 }, '/b'],
			['a missing nested key', { a: { b: 1 } }, '/a/c'],
			['traversing through a primitive', { a: 1 }, '/a/b'],
			['traversing through null', { a: null }, '/a/b'],
			['an out of range array index', [1], '/5'],
			['a non canonical array index', [1, 2], '/01'],
			['the array "length"', [1, 2], '/length'],
			['the "-" array token', [1, 2], '/-'],
			['an inherited property', {}, '/toString'],
			['a pointer without a leading slash', { a: 1 }, 'a'],
			['the empty pointer', { a: 1 }, ''],
			// biome-ignore lint/suspicious/noSparseArray: a hole is the point of this case
			['a sparse array hole', [, 1], '/0'],
		])('Returns false for %s', (_label, input, pointer) => {
			expect(validateProperty(input, pointer, isAnything)).toBe(false);
		});

		it('Does not call the validator when the path is missing', () => {
			const validator = vi.fn(isAnything);
			expect(validateProperty({ a: 1 }, '/b', validator)).toBe(false);
			expect(validateProperty({ a: 1 }, 'a', validator)).toBe(false);
			expect(validator).not.toHaveBeenCalled();
		});

		it('Does not treat a missing path as an undefined or null value', () => {
			expect(validateProperty({ a: 1 }, '/b', isUndefined)).toBe(false);
			expect(validateProperty({ a: 1 }, '/b', isNull)).toBe(false);
		});
	});

	it('Propagates errors thrown by the validator', () => {
		const validator = (_value: unknown): boolean => {
			throw new Error('boom');
		};
		expect(() => validateProperty({ a: 1 }, '/a', validator)).toThrow('boom');
	});

	describe('Types', () => {
		it('Returns a boolean', () => {
			expectTypeOf(validateProperty).returns.toEqualTypeOf<boolean>();
		});

		it('Takes the input and pointer from getByPointer', () => {
			expectTypeOf(validateProperty)
				.parameter(0)
				.toEqualTypeOf<Record<string, unknown> | unknown[]>();
			expectTypeOf(validateProperty).parameter(1).toEqualTypeOf<string>();
		});

		it('Takes a plain boolean predicate as the validator', () => {
			expectTypeOf(validateProperty({}, '/a', (v) => v === 1)).toBeBoolean();
			expectTypeOf(validateProperty<string>({}, '/a', (v) => v === 'x')).toBeBoolean();
		});

		describe('Narrowing the input with a type guard', () => {
			const isText = (value: unknown): value is string => typeof value === 'string';
			const isInt = (value: unknown): value is number => Number.isInteger(value);

			// The data matches its runtime shape, so each `if` runs; the types are checked by `tsc`

			it('Narrows a nested path', () => {
				const data: { id: number; user?: unknown } = { id: 1, user: { name: 'john' } };
				if (validateProperty(data, '/user/name', isText)) {
					expectTypeOf(data.user.name).toEqualTypeOf<string>();
					expectTypeOf(data.id).toEqualTypeOf<number>();
				} else expect.unreachable();
			});

			it('Narrows a numeric segment to an array', () => {
				const data: Record<string, unknown> = { list: [1] };
				if (validateProperty(data, '/list/0', isInt)) {
					expectTypeOf(data.list).toEqualTypeOf<number[]>();
				} else expect.unreachable();
			});

			it('Unescapes `~1` and `~0` in the pointer', () => {
				const data: Record<string, unknown> = { 'a/b': { 'c~d': 'x' }, '~1': 'y' };
				if (validateProperty(data, '/a~1b/c~0d', isText)) {
					expectTypeOf(data['a/b']).toEqualTypeOf<{ 'c~d': string }>();
				} else expect.unreachable();
				if (validateProperty(data, '/~01', isText)) {
					expectTypeOf(data['~1']).toEqualTypeOf<string>(); // `~01` is `~1`, not `/`
				} else expect.unreachable();
			});

			it('Does not narrow with a plain predicate', () => {
				const data: { user?: unknown } = { user: 1 };
				if (validateProperty(data, '/user', () => true)) {
					expectTypeOf(data.user).toBeUnknown();
				} else expect.unreachable();
			});

			it('Does not narrow when the pointer is not a literal', () => {
				const data: { user?: unknown } = { user: 'x' };
				const pointer: string = '/user';
				if (validateProperty(data, pointer, isText)) {
					expectTypeOf(data.user).toBeUnknown();
				} else expect.unreachable();
			});

			it('Is false when the type guard rejects the value', () => {
				expect(validateProperty({ a: 'x' }, '/a', isInt)).toBe(false);
			});
		});
	});
});
