import { isEditableElement } from '@jsfns/web/isEditableElement.js';
import { describe, expect, it } from 'vitest';
import { createElement } from './assets/helpers.ts';

function input(type?: string): HTMLInputElement {
	const elm = createElement('input') as HTMLInputElement;
	if (type) elm.type = type;
	return elm;
}

describe('"isEditableElement"', () => {
	describe('Returns `false` for non-`HTMLElement` values', () => {
		it.each([
			['null', null],
			['undefined', undefined],
			['a string', 'hi'],
			['a number', 42],
			['a boolean', true],
			['an array', [1, 2, 3]],
			['a function', () => {}],
			['a plain object', {}],
			['the `document`', document],
			['the `window`', window],
			['a `Text` node', document.createTextNode('hi')],
			['a `Comment` node', document.createComment('hi')],
			['a `DocumentFragment`', document.createDocumentFragment()],
		])('%s', (_label, value) => {
			expect(isEditableElement(value)).toBe(false);
		});
	});

	describe('Returns `true` for editable elements', () => {
		it('a `<textarea>`', () => {
			expect(isEditableElement(createElement('textarea'))).toBe(true);
		});

		it('an `<input>` with no explicit type (defaults to text)', () => {
			expect(isEditableElement(input())).toBe(true);
		});

		it.each([
			['text', 'text'],
			['password', 'password'],
			['email', 'email'],
			['search', 'search'],
			['tel', 'tel'],
			['url', 'url'],
			['number', 'number'],
			['date', 'date'],
			['datetime-local', 'datetime-local'],
			['month', 'month'],
			['week', 'week'],
			['time', 'time'],
		])('an `<input type="%s">`', (_label, type) => {
			expect(isEditableElement(input(type))).toBe(true);
		});

		// jsdom does not implement `isContentEditable` (it always reports
		// `undefined`), so it is stubbed here to exercise the branch the way a
		// real browser would report it - see https://github.com/jsdom/jsdom/issues/1670
		it('an element with `contenteditable="true"`', () => {
			const elm = createElement('div');
			Object.defineProperty(elm, 'isContentEditable', { value: true, configurable: true });
			expect(isEditableElement(elm)).toBe(true);
		});

		it('a descendant of a `contenteditable` element', () => {
			const child = createElement('span');
			Object.defineProperty(child, 'isContentEditable', { value: true, configurable: true });
			expect(isEditableElement(child)).toBe(true);
		});
	});

	describe('Returns `false` for non-editable elements', () => {
		it.each([
			['button', 'button'],
			['checkbox', 'checkbox'],
			['color', 'color'],
			['file', 'file'],
			['hidden', 'hidden'],
			['image', 'image'],
			['radio', 'radio'],
			['range', 'range'],
			['reset', 'reset'],
			['submit', 'submit'],
		])('an `<input type="%s">`', (_label, type) => {
			expect(isEditableElement(input(type))).toBe(false);
		});

		it('a `<select>`', () => {
			expect(isEditableElement(createElement('select'))).toBe(false);
		});

		it('a plain `<div>`', () => {
			expect(isEditableElement(createElement('div'))).toBe(false);
		});
	});

	describe('Respects disabled and read-only state', () => {
		it('a disabled `<input>`', () => {
			const elm = input('text');
			elm.disabled = true;
			expect(isEditableElement(elm)).toBe(false);
		});

		it('a read-only `<input>`', () => {
			const elm = input('text');
			elm.readOnly = true;
			expect(isEditableElement(elm)).toBe(false);
		});

		it('a disabled `<textarea>`', () => {
			const elm = createElement('textarea') as HTMLTextAreaElement;
			elm.disabled = true;
			expect(isEditableElement(elm)).toBe(false);
		});

		it('a read-only `<textarea>`', () => {
			const elm = createElement('textarea') as HTMLTextAreaElement;
			elm.readOnly = true;
			expect(isEditableElement(elm)).toBe(false);
		});

		it('an `<input>` inside a disabled `<fieldset>`', () => {
			const fieldset = createElement('fieldset') as HTMLFieldSetElement;
			fieldset.disabled = true;

			const elm = input('text');
			fieldset.append(elm);

			expect(isEditableElement(elm)).toBe(false);
		});
	});
});
