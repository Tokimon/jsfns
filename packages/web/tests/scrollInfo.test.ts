import { scrollInfo } from '@jsfns/web/scrollInfo';
import { byId, generateId, insertHtml, removeElement } from './assets/helpers';

const testID = generateId('ScrollInfo');

describe('"scrollInfo"', () => {
	let testNode: Element;

	beforeAll(() => {
		insertHtml(`
      <div id="${testID}" style="width: 100px; hight: 100px; overflow: scroll">
        <div style="width: 10px; height: 10px; margin: 100px;"></div>
      </div>
    `);

		testNode = byId(testID);
	});

	afterAll(() => removeElement(testID));

	it.each([
		[100, 50, 50],
		[50, 25, 25],
		[0, 0, 0],
	])('Collects the scroll information: %i%', (pct, x, y) => {
		testNode.scrollTop = x;
		testNode.scrollLeft = y;

		expect(scrollInfo(testNode)).toEqual({
			x,
			y,
			xMax: 50,
			yMax: 50,
			xPct: pct / 100,
			yPct: pct / 100,
		});
	});

	describe.each([
		['Undefined', undefined],
		['Document', document],
		['Window', window],
	])('Returns scroll info from global scrolling ELement for: %1', (_, elm) => {
		it.each([
			[100, 50, 50],
			[50, 25, 25],
			[0, 0, 0],
		])('Collects the scroll information: %i%', (pct, x, y) => {
			const htmlElm = document.documentElement;
			htmlElm.scrollTop = x;
			htmlElm.scrollLeft = y;

			expect(scrollInfo(elm)).toEqual({
				x,
				y,
				xMax: 50,
				yMax: 50,
				xPct: pct / 100,
				yPct: pct / 100,
			});
		});
	});
});
