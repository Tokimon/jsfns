import { append } from '@jsfns/web/append.js';
import { afterAll, beforeAll, beforeEach, describe, expect, expectTypeOf, it } from 'vitest';
import {
	byId,
	createElement,
	generateId,
	getOne,
	insertHtml,
	removeElement,
} from './assets/helpers.js';

const testID = generateId('Append');
const insertHTML = '<div class="inserted"></div>';

describe('"append"', () => {
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
		it('Returns null when DOM element to append to is not a container element', () => {
			// This test is in honor of FireFox where document.parentNode is 'HTMLDocument' (nodeType 9)
			expect(append(document.parentNode as Element, insertHTML)).toBe(null);
		});

		it('Returns null (and does not move the node) when the root is not a container element', () => {
			const div = createElement('div');

			expect(append(document.parentNode as Element, div)).toBe(null);
			expect(div.parentNode).toBe(null);
		});

		it('Appends plain HTML to a DOM element', () => {
			append(testNode, insertHTML);
			expect((testNode.lastChild as Element).className).toBe('inserted');
		});

		it('Appends DOM element to a DOM element', () => {
			const div = createElement('div');
			div.className = 'inserted';

			append(testNode, div);
			expect((testNode.lastChild as Element).className).toBe('inserted');
		});

		it('Appends to DOM elements not in the DOM', () => {
			const div = createElement('div');

			append(div, insertHTML);

			expect(div.lastChild).not.toBeFalsy();
			expect((div.lastChild as Element).className).toBe('inserted');
		});

		it('Moves element from one DOM element to another', () => {
			testNode.innerHTML = '<div class="insert-container"></div><div class="moved"></div>';

			const insertContainer = getOne('.insert-container', testNode);
			const moved = getOne('.moved', testNode);

			append(insertContainer, moved);

			expect(testNode.lastChild).toBe(insertContainer);
			expect((insertContainer.lastChild as Element).className).toBe('moved');
		});

		it('Return the inserted DOM element', () => {
			const div = createElement('div');
			expect(append(testNode, div) as Element).toBe(div);
		});

		it('Return the inserted DOM element from HTML', () => {
			const html = '<div class="html"></div>';

			const elm = append(testNode, html) as Element;
			expect(elm.className).toBe('html');
		});

		it('Creates a `div` when the given selector has no explicit tag', () => {
			const elm = append(testNode, '.no-tag') as Element;

			expect(elm.tagName).toBe('DIV');
			expect(elm.className).toBe('no-tag');
		});

		it('Creates the tag given in a tagged selector', () => {
			const elm = append(testNode, 'span.with-tag') as Element;

			expect(elm.tagName).toBe('SPAN');
			expect(elm.className).toBe('with-tag');
		});

		it('Creates an empty `div` for an empty string', () => {
			const elm = append(testNode, '') as Element;

			expect(elm.tagName).toBe('DIV');
			expect(elm.attributes.length).toBe(0);
		});

		it('Handles a self-closing tag with attributes', () => {
			const elm = append(testNode, '<input type="text" />') as HTMLInputElement;

			expect(elm.tagName).toBe('INPUT');
			expect(elm.type).toBe('text');
		});
	});

	describe('With root omitted (defaults to `document.body`)', () => {
		it('Appends plain HTML to `document.body`', () => {
			const elm = append('<span class="body-appended"></span>') as Element;

			expect(elm.parentNode).toBe(document.body);
			expect(elm.className).toBe('body-appended');

			elm.remove();
		});

		it('Appends a DOM element to `document.body`', () => {
			const div = createElement('div');

			expect(append(div)).toBe(div);
			expect(div.parentNode).toBe(document.body);

			div.remove();
		});

		it('Returns the created element from a bare selector', () => {
			const elm = append('.only-a-class') as Element;

			expect(elm.tagName).toBe('DIV');
			expect(elm.parentNode).toBe(document.body);

			elm.remove();
		});
	});

	describe('Edge cases', () => {
		it('Returns the exact `Text` node reference (not an element) when appending text', () => {
			const text = document.createTextNode('hello');

			const returned = append(testNode, text);

			expect(returned).toBe(text);
			expect(testNode.lastChild).toBe(text);
		});

		it('Moves the children of a `DocumentFragment` and returns the (now empty) fragment', () => {
			const fragment = document.createDocumentFragment();
			const a = createElement('div');
			const b = createElement('div');

			a.className = 'frag-a';
			b.className = 'frag-b';
			fragment.append(a, b);

			const returned = append(testNode, fragment);

			expect(returned).toBe(fragment);
			expect(fragment.childNodes.length).toBe(0);
			expect(testNode.lastChild).toBe(b);
			expect(testNode.contains(a)).toBe(true);
		});

		it('Returns the last top-level element when the HTML has several siblings', () => {
			const elm = append(testNode, '<i class="first"></i><b class="second"></b>') as Element;

			expect(elm.tagName).toBe('B');
			expect(elm.className).toBe('second');
			expect(testNode.querySelector('.first')).not.toBe(null);
		});

		it('Treats a selector without a leading class/id/attribute marker as a tag name', () => {
			const elm = append(testNode, 'em') as Element;

			expect(elm.tagName).toBe('EM');
		});
	});

	describe('Typing', () => {
		it('Infers the return type from a given Node/Element', () => {
			const div = document.createElement('div');
			const text = document.createTextNode('hi');

			expectTypeOf(append(div)).toEqualTypeOf<HTMLDivElement | null>();
			expectTypeOf(append(testNode, div)).toEqualTypeOf<HTMLDivElement | null>();
			expectTypeOf(append(testNode, text)).toEqualTypeOf<Text | null>();
		});

		it('Infers the element type from a bare tag name', () => {
			expectTypeOf(append('span')).toEqualTypeOf<HTMLSpanElement | null>();
			expectTypeOf(append(testNode, 'span')).toEqualTypeOf<HTMLSpanElement | null>();
		});

		it('Infers `HTMLDivElement` for a selector with no explicit tag', () => {
			expectTypeOf(append('.my-class')).toEqualTypeOf<HTMLDivElement | null>();
			expectTypeOf(append(testNode, '.my-class')).toEqualTypeOf<HTMLDivElement | null>();
		});

		it('Infers the element type from a tagged selector and from HTML with attributes', () => {
			expectTypeOf(append('span.my-class')).toEqualTypeOf<HTMLSpanElement | null>();
			expectTypeOf(append('<input type="text">')).toEqualTypeOf<HTMLInputElement | null>();
			expectTypeOf(append(testNode, 'span.my-class')).toEqualTypeOf<HTMLSpanElement | null>();
			expectTypeOf(
				append(testNode, '<input type="text">'),
			).toEqualTypeOf<HTMLInputElement | null>();
		});

		it('Falls back to `HTMLElement` for a non-literal (widened) string', () => {
			const selector: string = '.my-class';
			expectTypeOf(append(selector)).toEqualTypeOf<HTMLElement | null>();
			expectTypeOf(append(testNode, selector)).toEqualTypeOf<HTMLElement | null>();
		});

		it("Falls back to `HTMLElement` for a tag name inference can't recognize (e.g. a hyphenated custom element)", () => {
			expectTypeOf(
				append('<my-custom-element></my-custom-element>'),
			).toEqualTypeOf<HTMLElement | null>();
		});

		it('Allows an explicit type argument to override the inferred type', () => {
			expectTypeOf(
				append<HTMLElement>('<my-custom-element></my-custom-element>'),
			).toEqualTypeOf<HTMLElement | null>();
			expectTypeOf(
				append<HTMLElement>(testNode, '<my-custom-element></my-custom-element>'),
			).toEqualTypeOf<HTMLElement | null>();
		});
	});
});
