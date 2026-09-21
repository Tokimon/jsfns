import { isVoidElement, voidTags } from '@jsfns/web/isVoidElement.js';
import { describe, expect, it } from 'vitest';

describe('"isVoidElement"', () => {
	describe('Returns `true` for every void tag', () => {
		it.each(voidTags)('<%s>', (tagName) => {
			expect(isVoidElement(document.createElement(tagName))).toBe(true);
		});

		it('Is case-insensitive about the tag name', () => {
			const elm = document.createElement('input');
			Object.defineProperty(elm, 'tagName', { value: 'INPUT' });

			expect(isVoidElement(elm)).toBe(true);
		});
	});

	describe('Returns `false` for', () => {
		it.each([
			['<div>', document.createElement('div')],
			['<span>', document.createElement('span')],
			['<html>', document.documentElement],
			['<body>', document.body],
		])('%s', (_, elm) => {
			expect(isVoidElement(elm)).toBe(false);
		});

		it.each([
			['Document', document],
			['Fragment', document.createDocumentFragment()],
			['Text Node', document.createTextNode('')],
			['Comment Node', document.createComment('')],
			['Window', window],
			['NULL', null],
			['Object', {}],
		])('%s', (_, obj) => {
			expect(isVoidElement(obj)).toBe(false);
		});
	});
});
