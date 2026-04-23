import { getPropertyValue } from '@jsfns/core/getPropertyValue.js';
import { describe, expect, it } from 'vitest';

describe('"getPropertyValue"', () => {
	describe('Reading top-level properties', () => {
		it('Returns the value at a top-level key', () => {
			expect(getPropertyValue({ a: 1 }, 'a')).toBe(1);
		});

		it('Returns an array when the property holds an array', () => {
			const arr = [1, 2, 3];
			expect(getPropertyValue({ a: arr }, 'a')).toBe(arr);
		});

		it('Returns an object when the property holds an object', () => {
			const nested = { b: 2 };
			expect(getPropertyValue({ a: nested }, 'a')).toBe(nested);
		});

		it.each([
			['null value', { a: null }, null],
			['undefined value', { a: undefined }, undefined],
			['zero', { a: 0 }, 0],
			['false', { a: false }, false],
			['empty string', { a: '' }, ''],
		])('Returns the raw value when it is %s', (_label, obj, expected) => {
			expect(getPropertyValue(obj, 'a')).toBe(expected);
		});
	});

	describe('Reading nested properties', () => {
		it('Returns the value at a nested object path', () => {
			expect(getPropertyValue({ a: { b: 2 } }, 'a.b')).toBe(2);
		});

		it('Returns the value several levels deep', () => {
			expect(getPropertyValue({ a: { b: { c: 'x' } } }, 'a.b.c')).toBe('x');
		});

		it('Returns the value at a numeric array index', () => {
			expect(getPropertyValue({ a: [10, 20, 30] }, 'a.1')).toBe(20);
		});

		it('Returns the value when the path traverses arrays and objects', () => {
			expect(getPropertyValue({ a: [{ b: 'hi' }] }, 'a.0.b')).toBe('hi');
		});
	});

	describe('Missing properties', () => {
		it('Returns null when a top-level property does not exist', () => {
			expect(getPropertyValue({ a: 1 }, 'b')).toBe(null);
		});

		it('Returns null when a nested property does not exist', () => {
			expect(getPropertyValue({ a: { b: 2 } }, 'a.c')).toBe(null);
		});

		it('Returns null when an array index is out of bounds', () => {
			expect(getPropertyValue({ a: [1, 2] }, 'a.5')).toBe(null);
		});

		it('Returns null when a non-numeric key is used on an array', () => {
			expect(getPropertyValue({ a: [1, 2] }, 'a.foo')).toBe(null);
		});

		it('Returns null when accessing an inherited array property', () => {
			expect(getPropertyValue({ a: [1, 2] }, 'a.length')).toBe(null);
		});

		it('Returns null when the path continues through a non-numeric array key', () => {
			expect(getPropertyValue({ a: [{ b: 'hi' }] }, 'a.foo.b')).toBe(null);
		});

		it('Returns null when the path continues past a primitive value', () => {
			expect(getPropertyValue({ a: 1 }, 'a.b')).toBe(null);
		});

		it('Returns null when the path continues past null', () => {
			expect(getPropertyValue({ a: null }, 'a.b')).toBe(null);
		});
	});
});
