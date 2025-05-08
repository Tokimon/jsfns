import { findByName } from '@jsfns/web/findByName';
import { generateId, insertHtml, removeElement } from './assets/helpers';

const testID = generateId('FindByName');

describe('"findByName"', () => {
	beforeAll(() =>
		insertHtml(`
    <form id="${testID}">
      <meta name="meta">
      <input name="inputs" id="Input1">
      <input name="inputs" id="Input2">
    </form>
  `),
	);

	afterAll(() => removeElement(testID));

	it('Finds DOM elements with a name attribute - meta', () => {
		const nodes = findByName('meta');

		expect(nodes).toHaveLength(1);
		expect(nodes[0]).toBeInstanceOf(HTMLMetaElement);
	});

	it('Finds DOM elements with a name attribute - inputs', () => {
		const nodes = findByName('inputs');

		expect(nodes).toHaveLength(2);
		expect(nodes[1]).toBeInstanceOf(HTMLInputElement);
	});

	it('Returns empty Array when no elements were found', () => {
		expect(findByName('not-found')).toHaveLength(0);
	});

	it('Finds DOM elements with name attributes from a list', () => {
		const nodes = findByName(['meta', 'inputs']);

		expect(nodes).toHaveLength(3);
		expect(nodes[2].id).toBe('Input2');
	});
});
