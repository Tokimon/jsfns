import { isMap } from '@jsfns/core/isMap.js';
import { describe, expect, it } from 'vitest';

describe('"isMap"', () => {
	it('Returns `true` for a Map', () => {
		expect(isMap(new Map())).toBe(true);
	});

	it('Returns `true` for a Map-tagged object from another realm (not instanceof Map)', () => {
		// A cross-realm Map is not an instance of this realm's Map, but is still
		// tagged `[object Map]` — which is what the cross-realm fallback relies on
		const crossRealmMap = { [Symbol.toStringTag]: 'Map' };

		expect(crossRealmMap instanceof Map).toBe(false);
		expect(isMap(crossRealmMap)).toBe(true);
	});

	it.each([
		['Undefined', undefined],
		['Null', null],
		['Object', {}],
		['Array', []],
		['Set', new Set()],
		['WeakMap', new WeakMap()],
	])('Returns `false` for %s', (_, obj) => {
		expect(isMap(obj)).toBe(false);
	});
});
