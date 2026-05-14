import { isEmpty } from '@jsfns/core/isEmpty.js';
import { describe, expect, it } from 'vitest';

class TestObj {
	name = 'test';
}

describe('"isEmpty"', () => {
	describe('Returns `true` for empty values', () => {
		it.each([
			['null', null],
			['undefined', undefined],
			['NaN', Number.NaN],
			['empty string', ''],
			['empty array', []],
			['empty object', {}],
			['Object.create(null)', Object.create(null)],
			['empty Map', new Map()],
			['empty Set', new Set()],
		])('%s', (_label, value) => {
			expect(isEmpty(value)).toBe(true);
		});
	});

	describe('Returns `false` for non-empty containers', () => {
		it.each([
			['non-empty string', 'hi'],
			['non-empty array', [1]],
			['non-empty object', { a: 1 }],
			['non-empty Map', new Map([['a', 1]])],
			['non-empty Set', new Set([1])],
		])('%s', (_label, value) => {
			expect(isEmpty(value)).toBe(false);
		});
	});

	describe('Returns `false` for scalars (numbers and booleans are never empty)', () => {
		it.each([
			['zero', 0],
			['positive number', 1],
			['true', true],
			['false', false],
		])('%s', (_label, value) => {
			expect(isEmpty(value)).toBe(false);
		});
	});

	describe('Returns `false` for non-plain objects', () => {
		it.each([
			['Date', new Date()],
			['RegExp', /foo/],
			['class instance', new TestObj()],
		])('%s', (_label, value) => {
			expect(isEmpty(value)).toBe(false);
		});
	});
});
