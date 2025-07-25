import { replaceClass } from '@jsfns/web/replaceClass';
import { byId, generateId, insertHtml, removeElement } from './assets/helpers';

const testID = generateId('ReplaceClass');

describe('"replaceClass"', () => {
	let testNode: HTMLElement;

	beforeAll(() => {
		insertHtml(`<div id="${testID}"></div>`);
		testNode = byId(testID);
	});

	beforeEach(() => {
		testNode.className = '';
	});

	afterAll(() => removeElement(testID));

	it('Removes given class names, when no replacements are given', () => {
		testNode.className = 'root one two';
		replaceClass(testNode, ['one', 'two'], []);
		expect(testNode.className).toBe('root');
	});

	it('Adds given replacement class names, when no class names are given', () => {
		testNode.className = 'root one two';
		replaceClass(testNode, [], ['one', 'two']);
		expect(testNode.className).toBe('root one two');
	});

	it('Returns the given element', () => {
		expect(replaceClass(testNode, 'one', 'two')).toBe(testNode);
	});

	it('Returns null when given element is null', () => {
		expect(replaceClass(null, 'one', 'two')).toBeNull();
	});

	describe('Replaces given class names with the given replacements', () => {
		it('Single class replaced by a single class', () => {
			testNode.className = 'root class';
			replaceClass(testNode, 'class', 'replacement');
			expect(testNode.className).toBe('root replacement');
		});

		it('Multiple classes replaced by a single class', () => {
			testNode.className = 'root one two';
			replaceClass(testNode, ['one', 'two'], 'replacement');
			expect(testNode.className).toBe('root replacement');
		});

		it('Single class replaced by multiple classes', () => {
			testNode.className = 'root class';
			replaceClass(testNode, 'class', ['one', 'two']);
			expect(testNode.className).toBe('root one two');
		});

		it('Multiple classes replaced by multiple class', () => {
			testNode.className = 'root one two';
			replaceClass(testNode, ['one', 'two'], ['three', 'four']);
			expect(testNode.className).toBe('root three four');
		});
	});
});
