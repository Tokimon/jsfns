import { wrap } from '@jsfns/web/wrap.js';
import { afterEach, beforeEach, describe, expect, expectTypeOf, it } from 'vitest';
import { byId, createElement, generateId, insertHtml, removeElement } from './assets/helpers.js';

const testID = generateId('Wrap');
const elmID = generateId('Wrap_Elm');

describe('wrap', () => {
	beforeEach(() => {
		insertHtml(`
      <div id="${testID}">
        <div id="${elmID}"></div>
      </div>
    `);
	});

	afterEach(() => removeElement(testID));

	it('Returns null when no HTML given', () => {
		const elm = byId(elmID);
		const result = wrap(elm, '');

		expect(result).toBeNull();
		expect(elm.parentElement?.id).toBe(testID);
	});

	it('Returns null when element given is not in the DOM', () => {
		const elm = document.createElement('div');
		const result = wrap(elm, '<div></div>');

		expect(result).toBeNull();
	});

	it('Returns wrapper element when element is successfully wrapped', () => {
		const elm = byId(elmID);
		const wrapperElm = createElement('div');
		const result = wrap(elm, wrapperElm);

		expect(result).toBe(wrapperElm);
		expect(elm.parentElement).toBe(wrapperElm);
	});

	it('Wraps element with given HTML', () => {
		const elm = byId(elmID);

		const result = wrap(elm, '<div class="wrapper"></div>');

		expect(result?.className).toBe('wrapper');
		expect(elm.parentElement?.className).toBe('wrapper');
	});

	it('Inserts the given element after the text in the wrap', () => {
		const elm = byId(elmID);

		const result = wrap(
			elm,
			`
      <div class="wrapper">
        some text here
      </div>
      `,
		);

		expect(result?.className).toBe('wrapper');
		expect(elm.previousSibling?.nodeValue?.trim()).toBe('some text here');
	});

	it('Creates a `div` when the given selector has no explicit tag', () => {
		const elm = byId(elmID);

		const result = wrap(elm, '.no-tag');

		expect(result?.tagName).toBe('DIV');
		expect(result?.className).toBe('no-tag');
		expect(elm.parentElement?.className).toBe('no-tag');
	});

	it('Creates the tag given in a tagged selector', () => {
		const elm = byId(elmID);

		const result = wrap(elm, 'span.with-tag');

		expect(result?.tagName).toBe('SPAN');
		expect(result?.className).toBe('with-tag');
	});

	it('Does not guard against wrapping in a void element - the DOM allows appendChild there too, it just never renders', () => {
		const elm = byId(elmID);
		const voidElm = document.createElement('input');

		const result = wrap(elm, voidElm);

		expect(result).toBe(voidElm);
		expect(elm.parentElement).toBe(voidElm);
	});

	describe('Typing', () => {
		it('Infers the return type from a given Element', () => {
			const elm = byId(elmID);
			const div = document.createElement('div');

			expectTypeOf(wrap(elm, div)).toEqualTypeOf<HTMLDivElement | null>();
		});

		it('Infers the element type from a bare tag name', () => {
			const elm = byId(elmID);
			expectTypeOf(wrap(elm, 'span')).toEqualTypeOf<HTMLSpanElement | null>();
		});

		it('Infers `HTMLDivElement` for a selector with no explicit tag', () => {
			const elm = byId(elmID);
			expectTypeOf(wrap(elm, '.my-class')).toEqualTypeOf<HTMLDivElement | null>();
		});

		it('Infers the element type from a tagged selector and from HTML with attributes', () => {
			const elm = byId(elmID);

			expectTypeOf(wrap(elm, 'span.my-class')).toEqualTypeOf<HTMLSpanElement | null>();
			expectTypeOf(wrap(elm, '<input type="text">')).toEqualTypeOf<HTMLInputElement | null>();
		});

		it('Falls back to `HTMLElement` for a non-literal (widened) string', () => {
			const elm = byId(elmID);
			const selector: string = '.my-class';

			expectTypeOf(wrap(elm, selector)).toEqualTypeOf<HTMLElement | null>();
		});

		it("Falls back to `HTMLElement` for a tag name inference can't recognize (e.g. a hyphenated custom element)", () => {
			const elm = byId(elmID);

			expectTypeOf(
				wrap(elm, '<my-custom-element></my-custom-element>'),
			).toEqualTypeOf<HTMLElement | null>();
		});

		it('Allows an explicit type argument to override the inferred type', () => {
			const elm = byId(elmID);

			expectTypeOf(
				wrap<HTMLElement>(elm, '<my-custom-element></my-custom-element>'),
			).toEqualTypeOf<HTMLElement | null>();
		});
	});

	describe('Nested html structure', () => {
		it('Wraps the element in the deepest child', () => {
			const elm = byId(elmID);

			const result = wrap(
				elm,
				`
        <div class="root">
          <div class="level1">
            <div class="wrapper"></div>
          </div>
        </div>
      `,
			);

			expect(result?.className).toBe('root');
			expect(elm.parentElement?.className).toBe('wrapper');
			expect(elm.parentElement?.parentElement?.parentElement?.className).toBe('root');
		});

		it('Wraps the element in the first child', () => {
			const elm = byId(elmID);

			const result = wrap(
				elm,
				`
        <div class="root">
          <div class="wrapper"></div>
          <div class="not-the-wrapper"></div>
        </div>
      `,
			);

			expect(result?.className).toBe('root');
			expect(elm.parentElement?.className).toBe('wrapper');
			expect(elm.parentElement?.parentElement?.className).toBe('root');
		});
	});
});
