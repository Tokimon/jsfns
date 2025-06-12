import { outerSize } from '@jsfns/web/outerSize';
import type { GeneralWindow } from '@jsfns/web/types';
import { viewport } from '@jsfns/web/viewport';
import { byId, generateId, insertHtml, removeElement } from './assets/helpers';

const testID = generateId('outerSize');

describe('outerSize', () => {
	let testNode: HTMLElement;

	const width = 100;
	const height = 100;
	const border = 2;
	const margin = 10;
	const padding = 5;

	beforeAll(() => {
		insertHtml(`
      <div
        id="${testID}"
        style="width: ${width}px; height: ${height}px; border: ${border}px solid; margin: ${margin}px; padding: ${padding}px;"
      ></div>
    `);

		testNode = byId(testID);
	});

	afterAll(() => {
		removeElement(testID);
	});

	it('Returns the outer size of the given element, including margins', () => {
		expect(outerSize(testNode)).toEqual({
			width: testNode.offsetWidth,
			height: testNode.offsetHeight,
		});
	});

	it('When given window it returns the windows outer size', () => {
		// NOTE: I have to do it like this since jsDom doesn't give window a size
		const MockWindow = new Proxy(window, {
			get(target, property) {
				if (property === 'outerWidth') return 800;
				if (property === 'outerHeight') return 1000;

				return target[property as keyof GeneralWindow];
			},
		});

		expect(outerSize(MockWindow)).toEqual({ width: 800, height: 1000 });
	});

	it('When given document it returns the outer size of the viewport, including borders', () => {
		const vp = viewport(document);
		expect(outerSize(document)).toEqual(outerSize(vp));
	});
});
