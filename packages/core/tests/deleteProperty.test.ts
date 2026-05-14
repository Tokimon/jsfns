import { deleteProperty } from '@jsfns/core/deleteProperty.js';
import { describe, expect, it } from 'vitest';

describe('"deleteProperty"', () => {
	describe('Basic removal', () => {
		it('Removes a top-level property', () => {
			const obj = { a: 1, b: 2 };
			const result = deleteProperty(obj, 'a');
			expect(result.removed).toBe(true);
			expect(result.obj).toEqual({ b: 2 });
		});

		it('Removes a nested property', () => {
			const obj = { a: { b: 1, c: 2 } };
			const result = deleteProperty(obj, 'a.b');
			expect(result.removed).toBe(true);
			expect(result.obj).toEqual({ a: { c: 2 } });
		});

		it('Removes a property several levels deep', () => {
			const obj = { a: { b: { c: 1, d: 2 } } };
			const result = deleteProperty(obj, 'a.b.c');
			expect(result.removed).toBe(true);
			expect(result.obj).toEqual({ a: { b: { d: 2 } } });
		});

		it('Splices an array element by numeric index', () => {
			const obj = { a: [10, 20, 30] };
			const result = deleteProperty(obj, 'a.1');
			expect(result.removed).toBe(true);
			expect(result.obj).toEqual({ a: [10, 30] });
		});

		it('Splices a falsy array element correctly', () => {
			const obj = { a: [0, 1, 2] };
			const result = deleteProperty(obj, 'a.0');
			expect(result.removed).toBe(true);
			expect(result.obj).toEqual({ a: [1, 2] });
		});

		it('Removes at index of array', () => {
			const obj = [0, { a: 1 }, 2];
			const result = deleteProperty(obj, '1');
			expect(result.removed).toBe(true);
			expect(result.obj).toEqual([0, 2]);
		});

		it('Removes property of object in array', () => {
			const obj = [0, { a: 1 }, 2];
			const result = deleteProperty(obj, '1.a');
			expect(result.removed).toBe(true);
			expect(result.obj).toEqual([0, {}, 2]);
		});

		it('Removes index of array in an object in array', () => {
			const obj = [0, { a: [3, 4] }, 2];
			const result = deleteProperty(obj, '1.a.0');
			expect(result.removed).toBe(true);
			expect(result.obj).toEqual([0, { a: [4] }, 2]);
		});

		it('Mutates the input object by default', () => {
			const obj = { a: 1 };
			const result = deleteProperty(obj, 'a');
			expect(result.obj).toBe(obj);
			expect(obj).toEqual({});
		});
	});

	describe('Missing properties', () => {
		describe('Returns `removed: false` and leaves the object untouched', () => {
			it.each([
				['top-level key does not exist', { a: 1 }, 'b'],
				['nested key does not exist', { a: { b: 1 } }, 'a.c'],
				['path continues past a primitive', { a: 1 }, 'a.b'],
				['array index is out of bounds', [1, 2], '5'],
				['nested array index is out of bounds', { a: [1, 2] }, 'a.5'],
				['nested array index is non-numeric', { a: [1, 2] }, 'a.b'],
				['non-numeric key is used on an array', { a: [1, 2] }, 'a.foo'],
			])('When %s', (_label, obj, path) => {
				const before = structuredClone(obj);
				const result = deleteProperty(obj, path);

				expect(result).toEqual({ removed: false, obj: before });
			});
		});
	});

	describe('Option: `immutable`', () => {
		it('Returns a clone and leaves the input untouched', () => {
			const base = { a: { b: 1 } };
			const obj = structuredClone(base);
			const result = deleteProperty(obj, 'a.b', { immutable: true });
			expect(result.obj).not.toBe(obj);
			expect(obj).toEqual(base);
			expect(result.obj).toEqual({ a: {} });
		});

		it('Leaves the input untouched when the property is missing', () => {
			const obj = { a: 1 };
			const result = deleteProperty(obj, 'b', { immutable: true });
			expect(result.removed).toBe(false);
			expect(result.obj).toBe(obj);
			expect(obj).toEqual({ a: 1 });
		});

		it('Handles top-level deletion without mutating the input', () => {
			const obj = { a: 1 };
			const result = deleteProperty(obj, 'a', { immutable: true });
			expect(result.removed).toBe(true);
			expect(obj).toEqual({ a: 1 });
			expect(result.obj).toEqual({});
		});

		it('Returns a new array', () => {
			const obj = [1, 2, 3];
			const result = deleteProperty(obj, '1', { immutable: true });
			expect(result.removed).toBe(true);
			expect(obj).toEqual([1, 2, 3]);
			expect(result.obj).toEqual([1, 3]);
		});

		it('Leaves the array untouched when the property is out of bounds', () => {
			const obj = [1, 2, 3];
			const result = deleteProperty(obj, '5', { immutable: true });
			expect(result.removed).toBe(false);
			expect(result.obj).toBe(obj);
			expect(obj).toEqual([1, 2, 3]);
		});
	});

	describe('Option: `safe`', () => {
		describe.each([
			null,
			undefined,
			'',
			[],
			{},
		])('Removes the property when its value is empty: "%s"', (value) => {
			it('Object', () => {
				const obj = { a: { b: value } };
				const result = deleteProperty(obj, 'a.b', { safe: true });
				expect(result).toEqual({ removed: true, obj: { a: {} } });
			});

			it('Array', () => {
				const obj = [0, { a: [value] }, 1];
				const result = deleteProperty(obj, '1.a.0', { safe: true });
				expect(result).toEqual({ removed: true, obj: [0, { a: [] }, 1] });
			});
		});

		describe('Does not remove the property when its value is non-empty', () => {
			it('Object', () => {
				const obj = { a: { b: 0 } };
				const result = deleteProperty(obj, 'a.b', { safe: true });
				expect(result).toEqual({ removed: false, obj: { a: { b: 0 } } });
			});

			it('Array', () => {
				const obj = [0, { a: [0] }, 1];
				const result = deleteProperty(obj, '1.a.0', { safe: true });
				expect(result).toEqual({ removed: false, obj: [0, { a: [0] }, 1] });
			});
		});
	});

	describe('Option: `cleanup`', () => {
		it('Removes ancestor levels that become empty after the deletion', () => {
			const obj = { a: { b: { c: 1 } } };
			const result = deleteProperty(obj, 'a.b.c', { cleanup: true });
			expect(result.removed).toBe(true);
			expect(result.obj).toEqual({});
		});

		it('Stops cleanup at the first non-empty ancestor', () => {
			const obj = { a: { b: { c: 1 }, d: 2 } };
			const result = deleteProperty(obj, 'a.b.c', { cleanup: true });
			expect(result.removed).toBe(true);
			expect(result.obj).toEqual({ a: { d: 2 } });
		});

		it('Removes empty leftover levels even when the path was not fully resolved', () => {
			const obj = { a: {} };
			const result = deleteProperty(obj, 'a.x', { cleanup: true });
			expect(result.removed).toBe(true);
			expect(result.obj).toEqual({});
		});

		it('Cleans up empty arrays along the path', () => {
			const obj = { a: { b: [{ c: 1 }] } };
			const result = deleteProperty(obj, 'a.b.0.c', { cleanup: true });
			expect(result.removed).toBe(true);
			expect(result.obj).toEqual({});
		});
	});

	describe('Option combinations', () => {
		it('Combines `immutable` and `cleanup`', () => {
			const obj = { a: { b: { c: 1 } } };
			const result = deleteProperty(obj, 'a.b.c', { immutable: true, cleanup: true });
			expect(obj).toEqual({ a: { b: { c: 1 } } });
			expect(result).toEqual({ removed: true, obj: {} });
		});

		it('Does not mutate the input when `immutable` is set and the path is missing during cleanup', () => {
			const obj = { a: { b: {} } };
			const result = deleteProperty(obj, 'a.b.x', { immutable: true, cleanup: true });
			expect(obj).toEqual({ a: { b: {} } });
			expect(result.obj).not.toBe(obj);
			expect(result.obj).toEqual({});
		});

		it('Combines `safe` and `cleanup`', () => {
			const obj = { a: { b: null } };
			const result = deleteProperty(obj, 'a.b', { safe: true, cleanup: true });
			expect(result).toEqual({ removed: true, obj: {} });
		});

		it('Does not delete or cleanup in `safe` mode when the leaf is non-empty', () => {
			const obj = { a: { b: 1 } };
			const result = deleteProperty(obj, 'a.b', { safe: true, cleanup: true });
			expect(result).toEqual({ removed: false, obj: { a: { b: 1 } } });
		});
	});
});
