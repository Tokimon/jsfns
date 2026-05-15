import { isObjectLike } from '@jsfns/core/isObjectLike.js';
import { describe, expect, it } from 'vitest';

class TestObj {
	name = '';
	constructor(name: string) {
		this.name = name;
	}
}

describe('"isObjectLike"', () => {
	describe('Returns `true` for object-like values', () => {
		it.each([
			{},
			[],
			new Object(),
			new TestObj('test'),
			new Date(),
			new Map(),
			new Set(),
			/foo/,
		])('"%s"', (n) => {
			expect(isObjectLike(n)).toBe(true);
		});
	});

	describe('Returns `false` for non object-like values', () => {
		it.each([null, undefined, 'hello', 123, Number.NaN, true, false, () => null])('"%s"', (n) => {
			expect(isObjectLike(n)).toBe(false);
		});
	});
});
