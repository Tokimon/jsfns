import { insertBefore } from '@jsfns/web/insertBefore.js';
import { afterAll, beforeAll, beforeEach, describe, expect, expectTypeOf, it } from 'vitest';
import { byId, createElement, generateId, insertHtml, removeElement } from './assets/helpers.js';

const testID = generateId('InsertBefore');
const nodeID = generateId('InsertBeforeNode');

describe('"insertBefore"', () => {
	let testNode: HTMLElement;

	beforeAll(() => insertHtml(`<div id="${testID}"></div>`));

	beforeEach(() => {
		byId(testID).innerHTML = `<div id="${nodeID}"></div>`;
		testNode = byId(nodeID);
	});

	afterAll(() => removeElement(testID));

	describe('With an explicit reference element', () => {
		it('Inserts DOM element before a given DOM element', () => {
			const node = byId(nodeID);
			const div = createElement('div');
			div.className = 'inserted-dom';

			insertBefore(node, div);

			const prev = node.previousSibling as Element;
			expect(prev.className).toBe('inserted-dom');
		});

		it('Inserts plain HTML before a given DOM element', () => {
			insertBefore(testNode, '<div class="inserted-html"></div>');

			const prev = testNode.previousSibling as Element;
			expect(prev.className).toBe('inserted-html');
		});

		it('Converts a selector to a DOM element before inserting it before a given DOM element', () => {
			insertBefore(testNode, '.selector-element');

			const prev = testNode.previousSibling as Element;
			expect(prev.className).toBe('selector-element');
		});

		it('Returns the inserted DOM element (given as a Node)', () => {
			const div = createElement('div');

			const elm = insertBefore(testNode, div);
			expect(elm).toBe(div);
		});

		it('Returns the inserted DOM element (given as HTML)', () => {
			const elm = insertBefore(testNode, '<div class="inserted-always-html"></div>') as Element;
			expect(elm.className).toBe('inserted-always-html');
		});

		it('Creates a `div` when the given selector has no explicit tag', () => {
			const elm = insertBefore(testNode, '.no-tag') as Element;

			expect(elm.tagName).toBe('DIV');
			expect(elm.className).toBe('no-tag');
		});

		it('Creates the tag given in a tagged selector', () => {
			const elm = insertBefore(testNode, 'span.with-tag') as Element;

			expect(elm.tagName).toBe('SPAN');
			expect(elm.className).toBe('with-tag');
		});

		it('Creates an empty `div` for an empty string', () => {
			const elm = insertBefore(testNode, '') as Element;

			expect(elm.tagName).toBe('DIV');
			expect(elm.attributes.length).toBe(0);
		});

		it('Handles a self-closing tag with attributes', () => {
			const elm = insertBefore(testNode, '<input type="text" />') as HTMLInputElement;

			expect(elm.tagName).toBe('INPUT');
			expect(elm.type).toBe('text');
		});

		describe('Ignores and returns `null` for', () => {
			it('The <HTML> element', () => {
				const htmlElm = document.documentElement;
				const htmlPrev = htmlElm.previousSibling;

				expect(insertBefore(htmlElm, createElement('div'))).toBe(null);
				expect(htmlElm.previousSibling).toBe(htmlPrev);
			});

			it('An element with no parent', () => {
				const div = createElement('div');

				expect(insertBefore(div, createElement('div'))).toBe(null);
				expect(div.previousSibling).toBe(null);
			});
		});

		it('Allows insertion relative to a detached element that still has a parent', () => {
			const parent = createElement('div');
			const child = createElement('span');
			parent.append(child);

			const div = createElement('div');
			const inserted = insertBefore(child, div);

			expect(inserted).toBe(div);
			expect(parent.firstChild).toBe(div);
		});
	});

	describe('Typing', () => {
		it('Infers the return type from a given Element', () => {
			const div = document.createElement('div');

			expectTypeOf(insertBefore(testNode, div)).toEqualTypeOf<HTMLDivElement | null>();
		});

		it('Infers the element type from a bare tag name', () => {
			expectTypeOf(insertBefore(testNode, 'span')).toEqualTypeOf<HTMLSpanElement | null>();
		});

		it('Infers `HTMLDivElement` for a selector with no explicit tag', () => {
			expectTypeOf(insertBefore(testNode, '.my-class')).toEqualTypeOf<HTMLDivElement | null>();
		});

		it('Infers the element type from a tagged selector and from HTML with attributes', () => {
			expectTypeOf(insertBefore(testNode, 'span.my-class')).toEqualTypeOf<HTMLSpanElement | null>();
			expectTypeOf(
				insertBefore(testNode, '<input type="text">'),
			).toEqualTypeOf<HTMLInputElement | null>();
		});

		it('Falls back to `HTMLElement` for a non-literal (widened) string', () => {
			const selector: string = '.my-class';
			expectTypeOf(insertBefore(testNode, selector)).toEqualTypeOf<HTMLElement | null>();
		});

		it("Falls back to `HTMLElement` for a tag name inference can't recognize (e.g. a hyphenated custom element)", () => {
			expectTypeOf(
				insertBefore(testNode, '<my-custom-element></my-custom-element>'),
			).toEqualTypeOf<HTMLElement | null>();
		});

		it('Allows an explicit type argument to override the inferred type', () => {
			expectTypeOf(
				insertBefore<HTMLElement>(testNode, '<my-custom-element></my-custom-element>'),
			).toEqualTypeOf<HTMLElement | null>();
		});
	});
});
