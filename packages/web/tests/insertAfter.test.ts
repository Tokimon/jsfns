import { insertAfter } from '@jsfns/web/insertAfter.js';
import { afterAll, beforeAll, beforeEach, describe, expect, expectTypeOf, it } from 'vitest';
import { byId, createElement, generateId, insertHtml, removeElement } from './assets/helpers.js';

const testID = generateId('InsertAfter');
const nodeID = generateId('InsertAfterNode');

describe('"insertAfter"', () => {
	let testNode: HTMLElement;

	beforeAll(() => insertHtml(`<div id="${testID}"></div>`));

	beforeEach(() => {
		byId(testID).innerHTML = `<div id="${nodeID}"></div>`;
		testNode = byId(nodeID);
	});

	afterAll(() => removeElement(testID));

	describe('With an explicit reference element', () => {
		it('Inserts DOM element after a given DOM element', () => {
			const node = byId(nodeID);
			const div = createElement('div');
			div.className = 'inserted-dom';

			insertAfter(node, div);

			const next = node.nextElementSibling as Element;
			expect(next.className).toBe('inserted-dom');
		});

		it('Inserts plain HTML after a given DOM element', () => {
			insertAfter(testNode, '<div class="inserted-html"></div>');

			const next = testNode.nextElementSibling as Element;
			expect(next.className).toBe('inserted-html');
		});

		it('Converts a selector to a DOM element before inserting it after a given DOM element', () => {
			insertAfter(testNode, '.selector-element');

			const next = testNode.nextElementSibling as Element;
			expect(next.className).toBe('selector-element');
		});

		it('Returns the inserted DOM element (given as a Node)', () => {
			const div = createElement('div');

			const elm = insertAfter(testNode, div);
			expect(elm).toBe(div);
		});

		it('Returns the inserted DOM element (given as HTML)', () => {
			const elm = insertAfter(testNode, '<div class="inserted-always-html"></div>') as Element;
			expect(elm.className).toBe('inserted-always-html');
		});

		it('Creates a `div` when the given selector has no explicit tag', () => {
			const elm = insertAfter(testNode, '.no-tag') as Element;

			expect(elm.tagName).toBe('DIV');
			expect(elm.className).toBe('no-tag');
		});

		it('Creates the tag given in a tagged selector', () => {
			const elm = insertAfter(testNode, 'span.with-tag') as Element;

			expect(elm.tagName).toBe('SPAN');
			expect(elm.className).toBe('with-tag');
		});

		it('Creates an empty `div` for an empty string', () => {
			const elm = insertAfter(testNode, '') as Element;

			expect(elm.tagName).toBe('DIV');
			expect(elm.attributes.length).toBe(0);
		});

		it('Handles a self-closing tag with attributes', () => {
			const elm = insertAfter(testNode, '<input type="text" />') as HTMLInputElement;

			expect(elm.tagName).toBe('INPUT');
			expect(elm.type).toBe('text');
		});

		describe('Ignores and returns `null` for', () => {
			it('The <HTML> element', () => {
				const htmlElm = document.documentElement;
				const htmlNext = htmlElm.nextSibling;

				expect(insertAfter(htmlElm, createElement('div'))).toBe(null);
				expect(htmlElm.nextSibling).toBe(htmlNext);
			});

			it('An element with no parent', () => {
				const div = createElement('div');

				expect(insertAfter(div, createElement('div'))).toBe(null);
				expect(div.nextSibling).toBe(null);
			});
		});

		it('Allows insertion relative to a detached element that still has a parent', () => {
			const parent = createElement('div');
			const child = createElement('span');
			parent.append(child);

			const div = createElement('div');
			const inserted = insertAfter(child, div);

			expect(inserted).toBe(div);
			expect(parent.lastChild).toBe(div);
		});
	});

	describe('Typing', () => {
		it('Infers the return type from a given Element', () => {
			const div = document.createElement('div');

			expectTypeOf(insertAfter(testNode, div)).toEqualTypeOf<HTMLDivElement | null>();
		});

		it('Infers the element type from a bare tag name', () => {
			expectTypeOf(insertAfter(testNode, 'span')).toEqualTypeOf<HTMLSpanElement | null>();
		});

		it('Infers `HTMLDivElement` for a selector with no explicit tag', () => {
			expectTypeOf(insertAfter(testNode, '.my-class')).toEqualTypeOf<HTMLDivElement | null>();
		});

		it('Infers the element type from a tagged selector and from HTML with attributes', () => {
			expectTypeOf(insertAfter(testNode, 'span.my-class')).toEqualTypeOf<HTMLSpanElement | null>();
			expectTypeOf(
				insertAfter(testNode, '<input type="text">'),
			).toEqualTypeOf<HTMLInputElement | null>();
		});

		it('Falls back to `HTMLElement` for a non-literal (widened) string', () => {
			const selector: string = '.my-class';
			expectTypeOf(insertAfter(testNode, selector)).toEqualTypeOf<HTMLElement | null>();
		});

		it("Falls back to `HTMLElement` for a tag name inference can't recognize (e.g. a hyphenated custom element)", () => {
			expectTypeOf(
				insertAfter(testNode, '<my-custom-element></my-custom-element>'),
			).toEqualTypeOf<HTMLElement | null>();
		});

		it('Allows an explicit type argument to override the inferred type', () => {
			expectTypeOf(
				insertAfter<HTMLElement>(testNode, '<my-custom-element></my-custom-element>'),
			).toEqualTypeOf<HTMLElement | null>();
		});
	});
});
