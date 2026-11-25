import { getByPointer } from '@jsfns/core/getByPointer.js';
import { describe, expect, expectTypeOf, it } from 'vitest';

describe('"getByPointer"', () => {
	describe('Reading properties', () => {
		it.each([
			['a top-level key', { a: 1 }, '/a', 1],
			['a nested key', { a: { b: { c: 'x' } } }, '/a/b/c', 'x'],
			['an array index', [10, 20, 30], '/1', 20],
			['a nested array index', { a: [10, 20, 30] }, '/a/1', 20],
			['objects inside arrays', { a: [{ b: 'hi' }] }, '/a/0/b', 'hi'],
			['null', { a: null }, '/a', null],
			['undefined', { a: undefined }, '/a', undefined],
			['zero', { a: 0 }, '/a', 0],
			['false', { a: false }, '/a', false],
			['an empty string', { a: '' }, '/a', ''],
			['an empty key', { '': { '': 3 } }, '//', 3],
			['an empty key after a segment', { a: { '': 1 } }, '/a/', 1],
		])('Returns the value of %s', (_label, input, pointer, expected) => {
			expect(getByPointer(input, pointer)).toEqual({ success: true, value: expected });
		});

		it('Returns the reference of object values', () => {
			const nested = { b: 2 };
			expect(getByPointer({ a: nested }, '/a').value).toBe(nested);
		});
	});

	describe('Escaping', () => {
		it.each([
			['/a~1b', 1],
			['/~0', 2],
			['/~01', 3], // `~01` is the key `~1`, not `/`
			['/m~0n', 4],
		])('Unescapes the pointer "%s"', (pointer, expected) => {
			const input = { 'a/b': 1, '~': 2, '~1': 3, 'm~n': 4 };
			expect(getByPointer(input, pointer)).toEqual({ success: true, value: expected });
		});
	});

	describe('Missing properties - Returns success:false when', () => {
		it.each([
			['a top-level key does not exist', { a: 1 }, '/b'],
			['a nested key does not exist', { a: { b: 2 } }, '/a/c'],
			['an array index is out of bounds', [1, 2], '/3'],
			['the pointer continues past a primitive', { a: 1 }, '/a/b'],
			['the pointer continues past null', { a: null }, '/a/b'],
			['the pointer does not start with "/"', { a: 1 }, 'a'],
			['the empty pointer', { a: 1 }, ''],
			['the pointer is a dot-path', { a: { b: 1 } }, 'a.b'],
			['an empty segment is not ignored', { a: { b: 1 } }, '/a//b'],
			['an inherited key is read', {}, '/constructor'],
			['`__proto__` is read', {}, '/__proto__'],
			['`length` is read from an array', [1, 2], '/length'],
			['the "-" index is used', [1, 2], '/-'],
			['an array method is read', [1, 2], '/map'],
		])('%s', (_label, input, pointer) => {
			expect(getByPointer(input, pointer)).toEqual({ success: false, value: null });
		});

		it.each(['01', '1e0', '-1', '1.5', '+1', ' 1'])(
			'a non-canonical array index is used: "%s"',
			(key) => {
				expect(getByPointer([1, 2, 3], `/${key}`).success).toBe(false);
			},
		);

		it('a sparse array hole exists at the index', () => {
			const sparse: number[] = [1];
			sparse[2] = 3;

			expect(getByPointer(sparse, '/1').success).toBe(false);
		});
	});

	describe('Typing', () => {
		it('Types `value` as `unknown` by default', () => {
			expectTypeOf(getByPointer({ a: 1 }, '/a').value).toEqualTypeOf<unknown>();
		});

		it('Types `value` as given, when a type argument is explicitly provided', () => {
			expectTypeOf(getByPointer<number>({ a: 1 }, '/a').value).toEqualTypeOf<number | null>();
		});
	});
});
