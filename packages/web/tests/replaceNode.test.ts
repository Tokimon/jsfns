import { replaceNode } from '@jsfns/web/replaceNode';
import {
	byId,
	createElement,
	generateId,
	getOne,
	insertHtml,
	removeElement,
} from './assets/helpers';

const testID = generateId('ReplaceNode');

describe('"replaceNode"', () => {
	let testNode: HTMLElement;

	beforeAll(() => {
		insertHtml(`<div id="${testID}"></div>`);
		testNode = byId(testID);
	});

	beforeEach(() => {
		testNode.innerHTML = '';
	});

	afterAll(() => {
		removeElement(testID);
	});

	it('Returns the replaced element', () => {
		const elm = createElement('div');
		const replacement = createElement('div');

		testNode.appendChild(elm);
		expect(replaceNode(elm, replacement)).toEqual(elm);
	});

	it('Returns undefined when given element is not in the DOM', () => {
		const elm = createElement('div');
		const replacement = createElement('div');

		expect(replaceNode(elm, replacement)).toBeUndefined();
	});

	it.each(['', undefined, null])(
		'Removes the given DOM node when replacement is not given',
		(replacement) => {
			insertHtml('<div class="removed"></div>', testNode);
			const element = getOne('.removed', testNode);

			const returnValue = replaceNode(element, replacement);

			expect(getOne('.removed', testNode)).toBeFalsy();
			expect(returnValue).toBeUndefined();
		},
	);

	describe.each([
		['HTML element', createElement('div')],
		['Comment Node', document.createComment('Comment to replace')],
		['Text Node', document.createTextNode('Text to replace')],
	])('Replaces a given DOM node', (_, node) => {
		beforeEach(() => testNode.appendChild(node));

		it.each([
			['HTML Element', createElement('div')],
			['Comment Node', document.createComment('Replacement Comment')],
			['Text Node', document.createTextNode('Replacement Text')],
		])('With a given DOM node: %s', (_, replacement) => {
			replaceNode(node, replacement);

			const children = testNode.childNodes;
			expect(children).toHaveLength(1);
			expect(children[0]).toBe(replacement);
		});

		it('With a Document Fragment', () => {
			const div = createElement('div');
			const fragment = document.createDocumentFragment();
			fragment.appendChild(div);

			replaceNode(node, fragment);

			const children = testNode.childNodes;
			expect(children).toHaveLength(1);
			expect(children[0]).toBe(div);
		});

		it('With a given CSS selector', () => {
			replaceNode(node, '.replacement');

			const children = testNode.childNodes;
			expect(children).toHaveLength(1);
			expect((children[0] as Element).className).toBe('replacement');
		});

		it('With a DOM element elsewhere in the DOM', () => {
			const item = createElement('div');
			const parent = createElement('div');
			parent.appendChild(item);
			testNode.appendChild(parent);

			replaceNode(node, item);

			const children = testNode.childNodes;

			expect(children).toHaveLength(2);
			expect(children[0]).toBe(item);
			expect(children[1]).toBe(parent);
			expect(parent.childNodes).toHaveLength(0);
		});
	});
});
