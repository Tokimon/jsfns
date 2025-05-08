import { jest } from '@jest/globals';
import { findByQuery, findOneByQuery } from '@jsfns/web/findByQuery';
import { byId, generateId, insertHtml, removeElement } from './assets/helpers';

const testID = generateId('findByQuery');

describe('"findByQuery"', () => {
	beforeAll(() => {
		insertHtml(`
      <div id="${testID}">
        <div id='Item1' class="item"></div>
        <div id='Item2' class="item second">
          <div class='item child'></div>
          <div class='item child second-child'></div>
        </div>
      </div>
    `);
	});

	afterAll(() => {
		removeElement(testID);
	});

	function suite(getTarget: () => HTMLElement | Document) {
		let target: HTMLElement | Document;

		// biome-ignore lint/suspicious/noDuplicateTestHooks: I am not sure how to do it otherwise
		beforeAll(() => {
			target = getTarget();
		});

		describe('.findByQuery', () => {
			it.each([null, undefined])('Returns empty array when given element is falsy: %s', (elm) => {
				expect(findByQuery(elm, '.item')).toHaveLength(0);
			});

			it('Finds all DOM elements matching a given CSS selector: #Item2.item', () => {
				const nodes = findByQuery(target, '#Item2.item');
				expect(nodes).toHaveLength(1);
				expect(nodes[0].id).toBe('Item2');
			});

			it('Finds all DOM elements matching a given CSS selector: #Item2 .item', () => {
				const nodes = findByQuery(target, '#Item2 .item');
				expect(nodes).toHaveLength(2);
				expect(nodes[1].className).toBe('item child second-child');
			});

			it('Finds all DOM elements matching a given CSS selector: .item', () => {
				const nodes = findByQuery(target, '.item');
				expect(nodes).toHaveLength(4);
				expect(nodes[0].id).toBe('Item1');
			});

			it('Fails on bad queries', () => {
				expect(() => findByQuery(target, ':badquery')).toThrow();
			});

			it('Finds a unique collection of DOM elements from a list of CSS selectors', () => {
				const nodes = findByQuery(target, ['.item', '.item.child']);

				expect(nodes).toHaveLength(4);
				expect(nodes[3].className).toBe('item child second-child');
			});
		});

		describe('.findOneByQuery', () => {
			it.each([null, undefined])('Returns `null` when given element is falsy: %s', (elm) => {
				expect(findOneByQuery(elm, '.item')).toBeNull();
			});

			it('Find a DOM element matching a given CSS selector: #Item2.item', () => {
				const node = findOneByQuery(target, '#Item2.item');
				expect(node?.id).toBe('Item2');
			});

			it('Find a DOM element matching a given CSS selector: #Item2 .item', () => {
				const node = findOneByQuery(target, '#Item2 .item');
				expect(node?.className).toBe('item child');
			});

			it('Find a DOM element matching a given CSS selector: .item', () => {
				const node = findOneByQuery(target, '.item') as Element;
				expect(node?.id).toBe('Item1');
			});

			it('Fails on bad queries', () => {
				expect(() => findOneByQuery(target, ':badquery')).toThrow();
			});

			it('Returns null when nothings is found', () => {
				expect(findOneByQuery(target, '.not-found')).toBeNull();
			});

			it('Find a DOM element from a list of CSS selectors: space separated string', () => {
				const node = findOneByQuery(target, '.item, .item.child');
				expect(node?.id).toBe('Item1');
			});
		});
	}

	describe('With document', () => {
		describe('Falls back to document when no element is given', () => {
			it('.findByQuery', () => {
				const spy = jest.spyOn(document, 'querySelectorAll');

				findByQuery('#Item2 .item');
				expect(spy).toHaveBeenCalledTimes(1);

				spy.mockRestore();
			});

			it('.findOneByQuery', () => {
				const spy = jest.spyOn(document, 'querySelector');

				findOneByQuery('#Item2 .item');
				expect(spy).toHaveBeenCalledTimes(1);

				spy.mockRestore();
			});
		});

		suite(() => document);
	});

	describe('With a given element', () => {
		suite(() => byId(testID));
	});
});
