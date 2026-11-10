import { hash, hashCode } from '@jsfns/core/hash.js';
import { describe, expect, it } from 'vitest';

describe('"hash"', () => {
	describe('"hashCode"', () => {
		it('Returns a positive hash code', () => {
			expect(hashCode('')).toBe(0);
		});

		it.each(['abcdefg!!', '#/!&?^1235[]()@$£¤*µù%èéàç'])(
			'Returns the same hash code, for the same string: %s',
			(str) => {
				expect(hashCode(str)).toBe(hashCode(str));
			},
		);

		it.each([
			['abcdefg!!', 'abcdegf!!'],
			['abc/de/fg', 'abc/d/efg'],
		])('Returns a unique hash code for a given string: %s', (str, str2) => {
			expect(hashCode(str)).not.toBe(hashCode(str2));
		});
	});

	describe('"hash (string)"', () => {
		it('Returns an empty string when an empty string is given', () => {
			expect(hash('')).toBe('');
		});

		it.each([
			['abcdefg!!', 'abcdegf!!'],
			['abc/de/fg', 'abc/d/efg'],
		])('Returns a unique hash code for a given string: %s', (str, str2) => {
			expect(hash(str)).not.toBe(hash(str2));
		});
	});

	describe('"hash (string[])"', () => {
		it('Returns an empty string when an empty array is given', () => {
			expect(hash([])).toBe('');
		});

		it('Returns the same hash for the same array', () => {
			expect(hash(['a', 'b'])).toBe(hash(['a', 'b']));
		});

		it('Does not collide on different item boundaries', () => {
			expect(hash(['ab', 'c'])).not.toBe(hash(['a', 'bc']));
		});
	});

	describe('"hash (multiple arguments)"', () => {
		it('Returns an empty string when no arguments are given', () => {
			expect(hash()).toBe('');
		});

		it('Mixes strings and arrays, equal to the flattened array', () => {
			expect(hash('str', ['foo', 'bar'], 'more')).toBe(
				hash(['str', 'foo', 'bar', 'more']),
			);
		});
	});
});
