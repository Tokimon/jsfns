import { isDOMChildNode } from '@jsfns/web/isDOMChildNode';
import {
	appendFrame,
	byId,
	createDetachedDocument,
	createElement,
	generateId,
	insertHtml,
	removeElement,
} from './assets/helpers';

const testID = generateId('IsDOMChildNode');

describe('"isDOMChildNode"', () => {
	beforeAll(() =>
		insertHtml(`
    <div id="${testID}">
      <span></span>
    </div>
  `),
	);

	afterAll(() => removeElement(testID));

	describe('Returns `true` for', () => {
		it('DOM nodes in the DOM below the DOM root element', () => {
			expect(isDOMChildNode(document.body)).toBe(true);
			expect(isDOMChildNode(byId(testID).firstChild)).toBe(true);
		});

		it('Child DOM nodes of a DOM element not in the DOM', () => {
			const div = createElement('div');
			div.innerHTML = '<b></b>\ntext';
			const first = div.firstChild;

			expect(isDOMChildNode(first)).toBe(true);
			expect(isDOMChildNode(first?.nextSibling)).toBe(true);
		});

		it('DOM nodes in a Frame', () => {
			const frame = appendFrame();

			expect(isDOMChildNode(frame.contentDocument?.body)).toBe(true);

			frame.remove();
		});

		it('DOM nodes from a detached document', () => {
			expect(isDOMChildNode(createDetachedDocument().body)).toBe(true);
		});
	});

	describe('Returns `false` for', () => {
		it('DOM nodes not in the DOM', () => {
			const div = createElement('div');
			expect(isDOMChildNode(div)).toBe(false);
		});

		it.each([
			['Document', document],
			['<html> element', document.documentElement],
		])('DOM root elements', (_, elm) => {
			expect(isDOMChildNode(elm)).toBe(false);
		});
	});
});
