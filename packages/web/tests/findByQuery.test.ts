import { jest } from '@jest/globals';
import { findByQuery } from '@js-fns/web/findByQuery';
import { byId, insertHtml, removeElement } from './assets/helpers';

const testID = 'findByQuery';

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

    beforeAll(() => {
      target = getTarget();
    });

    describe('find ALL', () => {
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

    describe('find FIRST', () => {
      it('Find a DOM element matching a given CSS selector: #Item2.item', () => {
        const node = findByQuery(target, '#Item2.item', true);
        expect(node?.id).toBe('Item2');
      });

      it('Find a DOM element matching a given CSS selector: #Item2 .item', () => {
        const node = findByQuery(target, '#Item2 .item', true);
        expect(node?.className).toBe('item child');
      });

      it('Find a DOM element matching a given CSS selector: .item', () => {
        const node = findByQuery(target, '.item', true) as Element;
        expect(node?.id).toBe('Item1');
      });

      it('Fails on bad queries', () => {
        expect(() => findByQuery(target, ':badquery', true)).toThrow();
      });

      it('Returns null when nothings is found', () => {
        expect(findByQuery(target, '.not-found', true)).toBeNull();
      });

      it('Find a DOM element from a list of CSS selectors: space separated string', () => {
        const node = findByQuery(target, '.item, .item.child', true) as Element;
        expect(node?.id).toBe('Item1');
      });
      it('Find a DOM element from a list of CSS selectors: array', () => {
        const node = findByQuery(target, ['.item', '.item.child'], true) as Element;
        expect(node?.id).toBe('Item1');
      });
    });
  }

  describe('With document', () => {
    describe('Falls back to document when no element is given', () => {
      it('ALL', () => {
        const spy = jest.spyOn(document, 'querySelectorAll');

        findByQuery('#Item2 .item');
        expect(spy).toHaveBeenCalledTimes(1);

        spy.mockRestore();
      });

      it('FIRST', () => {
        const spy = jest.spyOn(document, 'querySelector');

        findByQuery('#Item2 .item', true);
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
