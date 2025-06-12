import position from '@jsfns/web/position';
import type { SpiedGetter } from 'jest-mock';
import { byId, generateId, getOne, insertHtml, removeElement } from './assets/helpers';
import { mockOffsetParent, mockOffsetPosition } from './assets/mocks';

const testID = generateId('position');

describe('"position"', () => {
	let testNode: HTMLElement;
	let ChildElm: HTMLElement;
	let FixedElm: HTMLElement;

	let offsetPositionRestore: () => void;
	let offsetParentSpy: SpiedGetter<Element | null>;

	beforeAll(() => {
		insertHtml(`
    <div id="${testID}" style="padding: 50px; position: relative;">
      <div id="Parent" style="overflow: scroll;">
        <div id="Child" style="position: absolute; top: 300px; left: 400px; width: 100px; height: 250px;"></div>
        <div id="Fixed" style="position: fixed; top: 300px; left: 400px; width: 100px; height: 250px;"></div>
      </div>
    </div>
    `);

		testNode = byId(testID);
		ChildElm = getOne(`#${testID} #Child`);
		FixedElm = getOne(`#${testID} #Fixed`);

		offsetPositionRestore = mockOffsetPosition(HTMLElement.prototype);
		offsetParentSpy = mockOffsetParent(HTMLElement.prototype);
	});

	afterAll(() => {
		offsetPositionRestore();
		offsetParentSpy.mockRestore();
		removeElement(testNode);
	});

	it('Returns position of a given element', () => {
		const { top, left, right, bottom } = position(ChildElm);
		expect({ top, left, right, bottom }).toEqual({ top: 350, left: 450, right: 550, bottom: 600 });
	});

	it('Returns position of a given element compared to its offset parent', () => {
		const { relative } = position(ChildElm);
		expect(relative).toEqual({ top: 300, left: 400, right: 500, bottom: 550 });
	});

	it('Returns position of a given fixed element', () => {
		const { top, left, right, bottom, relative } = position(FixedElm);
		const expectation = { top: 300, left: 400, right: 500, bottom: 550 };

		expect({ top, left, right, bottom }).toEqual(expectation);
		expect(relative).toEqual(expectation);
	});

	it('Returns 0 position when given element is null', () => {
		expect(position(null)).toEqual({ top: 0, left: 0, right: 0, bottom: 0 });
	});
});
