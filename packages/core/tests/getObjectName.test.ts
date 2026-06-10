import { getObjectName } from '@jsfns/core/getObjectName.js';
import { describe, expect, it } from 'vitest';

describe('"getObjectName"', () => {
	it.each([
		['Undefined', undefined],
		['Null', null],
		['Boolean', true],
		['Number', 123],
		['String', ''],
		['Array', []],
		['Object', {}],
		['Function', () => undefined],
		['RegExp', /x/],
		['Date', new Date()],
		['Map', new Map()],
		['Set', new Set()],
	])('Returns `%s` for the matching value', (expected, obj) => {
		expect(getObjectName(obj)).toBe(expected);
	});
});
