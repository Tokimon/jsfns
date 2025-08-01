import { findById } from '@jsfns/web/findById';
import { generateId, insertHtml, removeElement } from './assets/helpers';

const testID = generateId('FindByIDTest');

describe('"findById"', () => {
	beforeAll(() =>
		insertHtml(`
    <div id="${testID}"></div>
    <div id="Duplicate" class="first"></div>
    <div id="Duplicate" class="second">
      <div id='Child'></div>
      <div id='SecondChild'></div>
    </div>
  `),
	);

	afterAll(() => {
		for (const id of [testID, 'Duplicate', 'Duplicate']) removeElement(id);
	});

	it('Finds a DOM element with a given ID', () => {
		const elm = findById(testID) as Element;

		expect(elm.id).toBe(testID);
	});

	it('Finds only the first DOM element with a given duplicate ID', () => {
		const elm = findById('Duplicate') as Element;

		expect(elm.id).toBe('Duplicate');
		expect(elm.className).toBe('first');
	});

	it('Finds multiple DOM elements with a given IDs from a list', () => {
		const nodes = findById([testID, 'Duplicate']);

		expect(nodes).toHaveLength(2);
		expect(nodes[0].id).toBe(testID);
		expect(nodes[1].id).toBe('Duplicate');
	});
});
