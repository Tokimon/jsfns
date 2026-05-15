import { getProperty } from '@jsfns/core/getProperty.js';
import { describe, expect, it } from 'vitest';

describe('"getProperty"', () => {
	describe('Reading top-level properties', () => {
		it('Returns the value at a top-level key', () => {
			expect(getProperty({ a: 1 }, 'a')).toEqual({ success: true, value: 1 });
		});

		it('Returns the value a the index of the given array', () => {
			expect(getProperty([1], '0')).toEqual({ success: true, value: 1 });
		});

		it('Returns the array reference when the property holds an array', () => {
			const arr = [1, 2, 3];
			expect(getProperty({ a: arr }, 'a')).toEqual({ success: true, value: arr });
		});

		it('Returns the object reference when the property holds an object', () => {
			const nested = { b: 2 };
			expect(getProperty({ a: nested }, 'a')).toEqual({ success: true, value: nested });
		});

		it.each([
			['null value', { a: null }, null],
			['undefined value', { a: undefined }, undefined],
			['zero', { a: 0 }, 0],
			['false', { a: false }, false],
			['empty string', { a: '' }, ''],
		])('Returns the raw value when it is %s', (_label, obj, expected) => {
			expect(getProperty(obj, 'a')).toEqual({ success: true, value: expected });
		});
	});

	describe('Reading nested properties', () => {
		it('Returns the value at a nested object path', () => {
			expect(getProperty({ a: { b: 2 } }, 'a.b')).toEqual({ success: true, value: 2 });
		});

		it('Returns the value several levels deep', () => {
			expect(getProperty({ a: { b: { c: 'x' } } }, 'a.b.c')).toEqual({ success: true, value: 'x' });
		});

		it('Returns the value at a numeric array index', () => {
			expect(getProperty({ a: [10, 20, 30] }, 'a.1')).toEqual({ success: true, value: 20 });
		});

		it('Returns the value when the path traverses arrays and objects', () => {
			expect(getProperty({ a: [{ b: 'hi' }] }, 'a.0.b')).toEqual({ success: true, value: 'hi' });
		});

		it('Returns the value at index of nested array', () => {
			expect(getProperty(['a', ['b', 'c', [10, 20, 30, 40]]], '1.2.3')).toEqual({
				success: true,
				value: 40,
			});
		});
	});

	describe('Missing properties - Returns success:false when', () => {
		it('a top-level property does not exist', () => {
			expect(getProperty({ a: 1 }, 'b').success).toBe(false);
		});

		it('non existing property list', () => {
			expect(getProperty({ a: { b: 1 } }, 'x.y').success).toBe(false);
		});

		it('a nested property does not exist', () => {
			expect(getProperty({ a: { b: 2 } }, 'a.c').success).toBe(false);
		});

		it('an array index is out of bounds', () => {
			expect(getProperty([1, 2], '3').success).toBe(false);
		});

		it('an index is out of bounds fo nested array', () => {
			expect(getProperty({ a: [1, 2] }, 'a.5').success).toBe(false);
		});

		it('a non-numeric key is used on a nested array', () => {
			expect(getProperty({ a: [1, 2] }, 'a.length').success).toBe(false);
		});

		it('the path continues through a non-numeric array key', () => {
			expect(getProperty({ a: [{ b: 'hi' }] }, 'a.foo.b').success).toBe(false);
		});

		it('a non-numeric key is used on an array', () => {
			expect(getProperty([1, 2], 'length').success).toBe(false);
		});

		it('the path continues past a primitive', () => {
			expect(getProperty({ a: 1 }, 'a.b').success).toBe(false);
		});

		it('the path continues past null', () => {
			expect(getProperty({ a: null }, 'a.b').success).toBe(false);
		});
	});

	describe('Missing steps', () => {
		it('multidot (a..b) are ignored', () => {
			expect(getProperty({ a: { b: [1, 2] } }, 'a..b....1')).toEqual({ success: true, value: 2 });
		});

		it('Trailing dots (.a.b.) are ignored', () => {
			expect(getProperty({ a: { b: [1, 2] } }, '...a.b.1.')).toEqual({ success: true, value: 2 });
		});

		it('Empty array entries are ignored', () => {
			expect(getProperty({ a: { b: [1, 2] } }, ['', 'a', '', '', 'b', '1'])).toEqual({
				success: true,
				value: 2,
			});
		});
	});

	describe('Empty path', () => {
		it('Returns success:false for an empty string path', () => {
			expect(getProperty({ a: 1 }, '')).toEqual({ success: false, value: null });
		});

		it('Returns success:false for a string path of only separators', () => {
			expect(getProperty({ a: 1 }, '...')).toEqual({ success: false, value: null });
		});

		it('Returns success:false for an empty array path', () => {
			expect(getProperty({ a: 1 }, [])).toEqual({ success: false, value: null });
		});

		it('Returns success:false for an array path of only empty entries', () => {
			expect(getProperty({ a: 1 }, ['', '', ''])).toEqual({ success: false, value: null });
		});
	});
});
