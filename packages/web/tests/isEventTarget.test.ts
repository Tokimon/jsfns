import { isEventTarget } from '@jsfns/web/isEventTarget.js';
import { describe, expect, it } from 'vitest';

class Custom extends EventTarget {}

describe('"isEventTarget"', () => {
	describe('Returns `false` for:', () => {
		it.each([
			['Undefined', undefined],
			['NULL', null],
			['Object', {}],
			['Array', []],
			['String', ''],
			['Number', 123],
			['Boolean', true],
			// Implements only part of the contract — `off` would fail on this
			['Object with addEventListener but no removeEventListener', { addEventListener() {} }],
		])('%s', (_, obj) => {
			expect(isEventTarget(obj)).toBe(false);
		});
	});

	describe('Returns `true` for:', () => {
		it.each([
			['Window', window],
			['Document', document],
			['<div> Element', document.createElement('div')],
			['Text Node', document.createTextNode('')],
			['Comment Node', document.createComment('')],
			['XMLHttpRequest', new XMLHttpRequest()],
			['Object extending EventTarget', new Custom()],
			// A cross-realm target (e.g. an iframe's contentWindow) is not an
			// instance of this realm's EventTarget, but still implements the API
			[
				'Cross-realm target (not instanceof EventTarget)',
				{ addEventListener() {}, removeEventListener() {} },
			],
		])('%s', (_, obj) => {
			expect(isEventTarget(obj)).toBe(true);
		});
	});
});
