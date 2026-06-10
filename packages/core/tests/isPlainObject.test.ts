import { isPlainObject } from '@jsfns/core/isPlainObject.js';
import { describe, expect, it } from 'vitest';

class TestObj {
	name = 'test';
}

describe('"isPlainObject"', () => {
	describe('Returns `true` for:', () => {
		it.each([
			['object literal', {}],
			['object literal with keys', { a: 1 }],
			['new Object()', new Object()],
			['Object.create(null)', Object.create(null)],
		])('%s', (_label, value) => {
			expect(isPlainObject(value)).toBe(true);
		});

		it('a plain object from another realm (prototype differs from the local Object.prototype)', () => {
			// Simulate a cross-realm `{}`: its prototype is a top-level prototype
			// (own prototype null) that is NOT this realm's `Object.prototype`
			const foreignProto = Object.create(null);
			const foreignObject = Object.create(foreignProto);

			expect(Object.getPrototypeOf(foreignObject)).not.toBe(Object.prototype);
			expect(isPlainObject(foreignObject)).toBe(true);
		});
	});

	describe('Returns `false` for:', () => {
		it.each([
			['Undefined', undefined],
			['Null', null],
			['Number', 123],
			['String', ''],
			['Boolean', true],
			['Array', []],
			['Date', new Date()],
			['RegExp', /x/],
			['Map', new Map()],
			['Set', new Set()],
			['class instance', new TestObj()],
		])('%s', (_label, value) => {
			expect(isPlainObject(value)).toBe(false);
		});
	});
});
