import { isSet } from '@jsfns/core/isSet.js';
import { describe, expect, it } from 'vitest';

describe('"isSet"', () => {
	it('Returns `true` for a Set', () => {
		expect(isSet(new Set())).toBe(true);
	});

	it('Returns `true` for a Set-tagged object from another realm (not instanceof Set)', () => {
		// A cross-realm Set is not an instance of this realm's Set, but is still
		// tagged `[object Set]` — which is what the cross-realm fallback relies on
		const crossRealmSet = { [Symbol.toStringTag]: 'Set' };

		expect(crossRealmSet instanceof Set).toBe(false);
		expect(isSet(crossRealmSet)).toBe(true);
	});

	it.each([
		['Undefined', undefined],
		['Null', null],
		['Object', {}],
		['Array', []],
		['Map', new Map()],
		['WeakSet', new WeakSet()],
	])('Returns `false` for %s', (_, obj) => {
		expect(isSet(obj)).toBe(false);
	});
});
