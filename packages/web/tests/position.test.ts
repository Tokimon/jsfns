import { positionAbsolute, positionRelative, positionRelativeTo } from '@jsfns/web/position.js';
import { afterAll, beforeAll, describe, expect, it, type MockInstance } from 'vitest';
import { byId, generateId, getOne, insertHtml, removeElement } from './assets/helpers.js';
import { mockOffsetParent, mockOffsetPosition } from './assets/mocks.js';

const testID = generateId('position');
const zero = { top: 0, left: 0, right: 0, bottom: 0 };

describe('"position" methods', () => {
	let testNode: HTMLElement;
	let ChildElm: HTMLElement;
	let FixedElm: HTMLElement;

	let offsetPositionRestore: () => void;
	let offsetParentSpy: MockInstance<() => Element | null>;

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

	it.each([
		['positionAbsolute', positionAbsolute, { top: 350, left: 450, right: 550, bottom: 600 }],
		['positionRelative', positionRelative, { top: 300, left: 400, right: 500, bottom: 550 }],
	])('"%s" returns the position of a given element', (_, fn, expected) => {
		expect(fn(ChildElm)).toEqual(expected);
	});

	it('Fixed elements have the same absolute and relative position', () => {
		const expected = { top: 300, left: 400, right: 500, bottom: 550 };
		expect(positionAbsolute(FixedElm)).toEqual(expected);
		expect(positionRelative(FixedElm)).toEqual(expected);
	});

	describe('positionRelativeTo', () => {
		it('Returns position compared to an ancestor', () => {
			const parent = getOne(`#${testID} #Parent`);
			expect(positionRelativeTo(ChildElm, parent)).toEqual({
				top: 300,
				left: 400,
				right: 500,
				bottom: 550,
			});
		});

		it('Returns position compared to a sibling', () => {
			expect(positionRelativeTo(ChildElm, FixedElm)).toEqual({
				top: 50,
				left: 50,
				right: 150,
				bottom: 300,
			});
		});

		it('Returns absolute position when target is null', () => {
			expect(positionRelativeTo(ChildElm, null)).toEqual(positionAbsolute(ChildElm));
		});
	});

	it.each([
		['positionAbsolute', positionAbsolute],
		['positionRelative', positionRelative],
		['positionRelativeTo', (elm: HTMLElement | null) => positionRelativeTo(elm, ChildElm)],
	])('"%s" returns 0 position when given element is null', (_, fn) => {
		expect(fn(null)).toEqual(zero);
	});
});
