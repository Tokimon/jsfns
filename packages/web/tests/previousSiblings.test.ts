import { previousSiblings } from '@jsfns/web/previousSiblings';
import { byId, createElement, generateId, insertHtml, removeElement } from './assets/helpers';

const testID = generateId('previousSiblings');

describe('"previousSiblings"', () => {
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

	describe('.previousSiblings', () => {
		it('Returns an array of all siblings after the given element', () => {
			const elm = byId('MiddleChild');
			const elms = previousSiblings(elm);

			expect(elms).toHaveLength(4);
			expect(elms.every((node) => node !== elm)).toBe(true);
			expect(elms[elms.length - 1].id).toBe('FirstChild');
		});

		describe('Returns an empty array when', () => {
			it('The given node is not a child in the DOM', () => {
				expect(previousSiblings(createElement('div'))).toHaveLength(0);
			});

			it('The element has no siblings', () => {
				const elm = byId('LoneChild');
				const elms = previousSiblings(elm);

				expect(elms).toHaveLength(0);
			});
		});
	});
});
