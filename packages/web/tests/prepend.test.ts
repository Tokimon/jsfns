import { prepend } from '@jsfns/web/prepend.js';
import { afterAll, beforeAll, beforeEach, describe, expect, expectTypeOf, it } from 'vitest';
import { byId, createElement, generateId, insertHtml, removeElement } from './assets/helpers.js';

const testID = generateId('Prepend');
const insertHTML = '<div class="inserted"></div>';

describe('"prepend"', () => {
	let testNode: HTMLElement;

	beforeAll(() => {
		insertHtml(`<div id="${testID}"></div>`);
		testNode = byId(testID);
	});

	beforeEach(() => {
		testNode.innerHTML = '<span></span>';
	});

	afterAll(() => removeElement(testID));

	describe('With an explicit root', () => {
		it('Returns null when DOM element to prepend to is not a container element', () => {
			// This test is in honor of FireFox where document.parentNode is 'HTMLDocument' (nodeType 9)
			expect(prepend(document.parentNode as Element, insertHTML)).toBe(null);
		});

		it('Returns null (and does not move the node) when the root is not a container element', () => {
			const div = createElement('div');

			expect(prepend(document.parentNode as Element, div)).toBe(null);
			expect(div.parentNode).toBe(null);
		});

		it('Prepends plain HTML to a DOM element', () => {
			prepend(testNode, insertHTML);
			expect((testNode.firstChild as Element).className).toBe('inserted');
		});

		it('Prepends DOM element to a DOM element', () => {
			const div = createElement('div');

			prepend(testNode, div);
			expect(testNode.firstChild).toBe(div);
		});

		it('Prepends to DOM elements not in the DOM', () => {
			const div = createElement('div');

			prepend(div, insertHTML);

			expect((div.firstChild as Element).className).toBe('inserted');
		});

		it('Moves element from one DOM element to another', () => {
			const insertContainer = createElement('div');
			const moved = createElement('div');

			testNode.appendChild(insertContainer);
			testNode.appendChild(moved);

			expect(testNode.lastChild).toBe(moved);

			prepend(insertContainer, moved);

			expect(testNode.lastChild).toBe(insertContainer);
			expect(insertContainer.firstChild).toBe(moved);
		});

		it('Return the inserted DOM element', () => {
			const div = createElement('div');
			expect(prepend(testNode, div)).toBe(div);
		});

		it('Return the inserted DOM element from HTML', () => {
			const html = '<div class="html"></div>';

			const elm = prepend(testNode, html) as Element;
			expect(elm.className).toBe('html');
		});

		it('Creates a `div` when the given selector has no explicit tag', () => {
			const elm = prepend(testNode, '.no-tag') as Element;

			expect(elm.tagName).toBe('DIV');
			expect(elm.className).toBe('no-tag');
		});

		it('Creates the tag given in a tagged selector', () => {
			const elm = prepend(testNode, 'span.with-tag') as Element;

			expect(elm.tagName).toBe('SPAN');
			expect(elm.className).toBe('with-tag');
		});

		it('Creates an empty `div` for an empty string', () => {
			const elm = prepend(testNode, '') as Element;

			expect(elm.tagName).toBe('DIV');
			expect(elm.attributes.length).toBe(0);
		});

		it('Handles a self-closing tag with attributes', () => {
			const elm = prepend(testNode, '<input type="text" />') as HTMLInputElement;

			expect(elm.tagName).toBe('INPUT');
			expect(elm.type).toBe('text');
		});
	});

	describe('With root omitted (defaults to `document.body`)', () => {
		it('Prepends plain HTML to `document.body`', () => {
			const elm = prepend('<span class="body-prepended"></span>') as Element;

			expect(elm.parentNode).toBe(document.body);
			expect(elm.className).toBe('body-prepended');

			elm.remove();
		});

		it('Prepends a DOM element to `document.body`', () => {
			const div = createElement('div');

			expect(prepend(div)).toBe(div);
			expect(div.parentNode).toBe(document.body);

			div.remove();
		});

		it('Returns the created element from a bare selector', () => {
			const elm = prepend('.only-a-class') as Element;

			expect(elm.tagName).toBe('DIV');
			expect(elm.parentNode).toBe(document.body);

			elm.remove();
		});
	});

	describe('Edge cases', () => {
		it('Returns the exact `Text` node reference (not an element) when prepending text', () => {
			const text = document.createTextNode('hello');

			const returned = prepend(testNode, text);

			expect(returned).toBe(text);
			expect(testNode.firstChild).toBe(text);
		});

		it('Moves the children of a `DocumentFragment` and returns the (now empty) fragment', () => {
			const fragment = document.createDocumentFragment();
			const a = createElement('div');
			const b = createElement('div');

			a.className = 'frag-a';
			b.className = 'frag-b';
			fragment.append(a, b);

			const returned = prepend(testNode, fragment);

			expect(returned).toBe(fragment);
			expect(fragment.childNodes.length).toBe(0);
			expect(testNode.firstChild).toBe(a);
			expect(testNode.contains(b)).toBe(true);
		});

		it('Returns the first top-level element when the HTML has several siblings', () => {
			const elm = prepend(testNode, '<i class="first"></i><b class="second"></b>') as Element;

			expect(elm.tagName).toBe('I');
			expect(elm.className).toBe('first');
			expect(testNode.querySelector('.second')).not.toBe(null);
		});

		it('Treats a selector without a leading class/id/attribute marker as a tag name', () => {
			const elm = prepend(testNode, 'em') as Element;

			expect(elm.tagName).toBe('EM');
		});
	});

	describe('Typing', () => {
		it('Infers the return type from a given Node/Element', () => {
			const div = document.createElement('div');
			const text = document.createTextNode('hi');

			expectTypeOf(prepend(div)).toEqualTypeOf<HTMLDivElement | null>();
			expectTypeOf(prepend(testNode, div)).toEqualTypeOf<HTMLDivElement | null>();
			expectTypeOf(prepend(testNode, text)).toEqualTypeOf<Text | null>();
		});

		it('Infers the element type from a bare tag name', () => {
			expectTypeOf(prepend('span')).toEqualTypeOf<HTMLSpanElement | null>();
			expectTypeOf(prepend(testNode, 'span')).toEqualTypeOf<HTMLSpanElement | null>();
		});

		it('Infers `HTMLDivElement` for a selector with no explicit tag', () => {
			expectTypeOf(prepend('.my-class')).toEqualTypeOf<HTMLDivElement | null>();
			expectTypeOf(prepend(testNode, '.my-class')).toEqualTypeOf<HTMLDivElement | null>();
		});

		it('Infers the element type from a tagged selector and from HTML with attributes', () => {
			expectTypeOf(prepend('span.my-class')).toEqualTypeOf<HTMLSpanElement | null>();
			expectTypeOf(prepend('<input type="text">')).toEqualTypeOf<HTMLInputElement | null>();
			expectTypeOf(prepend(testNode, 'span.my-class')).toEqualTypeOf<HTMLSpanElement | null>();
			expectTypeOf(
				prepend(testNode, '<input type="text">'),
			).toEqualTypeOf<HTMLInputElement | null>();
		});

		it('Falls back to `HTMLElement` for a non-literal (widened) string', () => {
			const selector: string = '.my-class';
			expectTypeOf(prepend(selector)).toEqualTypeOf<HTMLElement | null>();
			expectTypeOf(prepend(testNode, selector)).toEqualTypeOf<HTMLElement | null>();
		});

		it("Falls back to `HTMLElement` for a tag name inference can't recognize (e.g. a hyphenated custom element)", () => {
			expectTypeOf(
				prepend('<my-custom-element></my-custom-element>'),
			).toEqualTypeOf<HTMLElement | null>();
		});

		it('Allows an explicit type argument to override the inferred type', () => {
			expectTypeOf(
				prepend<HTMLElement>('<my-custom-element></my-custom-element>'),
			).toEqualTypeOf<HTMLElement | null>();
			expectTypeOf(
				prepend<HTMLElement>(testNode, '<my-custom-element></my-custom-element>'),
			).toEqualTypeOf<HTMLElement | null>();
		});
	});
});
