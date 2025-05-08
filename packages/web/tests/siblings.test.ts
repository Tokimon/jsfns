import { siblings } from '@jsfns/web/siblings';
import { byId, createElement, generateId, insertHtml, removeElement } from './assets/helpers';

const testID = generateId('Siblings');

describe('"siblings"', () => {
	beforeAll(() =>
		insertHtml(
			`<div id="${testID}">
      <span id="FirstChild">
        <b id="LoneChild"></b>
      </span>
      text
      <br>
      <!-- Comment -->
      <i></i>
      <b></b>
      <span id="MiddleChild"></span>
      <div></div>
      <input>
      <button></button>
      <span id="LastChild"></span>
    </div>`,
		),
	);

	afterAll(() => removeElement(testID));

	describe('.siblings', () => {
		it('Returns an array of siblings of the element', () => {
			const elm = byId('MiddleChild');
			const elms = siblings(elm);

			expect(elms).toHaveLength(8);
			expect(elms.every((node) => node !== elm)).toBe(true);
			expect(elms[0].id).toBe('FirstChild');
			expect(elms[elms.length - 1].id).toBe('LastChild');
		});

		describe('Returns an empty array when', () => {
			it('The given node is not a child in the DOM', () => {
				expect(siblings(createElement('div'))).toHaveLength(0);
			});

			it('The element has no siblings', () => {
				const elm = byId('LoneChild');
				const elms = siblings(elm);

				expect(elms).toHaveLength(0);
			});
		});
	});
});
