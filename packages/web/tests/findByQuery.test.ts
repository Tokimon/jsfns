import { type argsWithoutTarget, findByQuery } from '@js-fns/web/findByQuery';
import { byId, insertHtml, removeElement } from './assets/helpers';

describe('"findByQuery"', () => {
  let elm: Element;

  beforeAll(() => {
    insertHtml(`
    <div id="wrapper">
      <div id='Item1' class="item"></div>
      <div id='Item2' class="item second">
        <div class='item child'></div>
        <div class='item child second-child'></div>
      </div>
    </div>
  `);

    elm = byId('Wrapper');
  });

  afterAll(() => ['Item1', 'Item2'].forEach((id) => removeElement(id)));

  function suite(queryCall: (...args: argsWithoutTarget) => Element[] | Element | null) {
    describe('find ALL', () => {
      it('Finds all DOM elements matching a given CSS selector: #Item2.item', () => {
        const nodes = queryCall('#Item2.item') as Element[];
        expect(nodes).toHaveLength(1);
        expect(nodes[0].id).toBe('Item2');
      });

      it('Finds all DOM elements matching a given CSS selector: #Item2 .item', () => {
        const nodes = queryCall('#Item2 .item') as Element[];
        expect(nodes).toHaveLength(2);
        expect(nodes[1].className).toBe('item child second-child');
      });

      it('Finds all DOM elements matching a given CSS selector: .item', () => {
        const nodes = queryCall('.item') as Element[];
        expect(nodes).toHaveLength(4);
        expect(nodes[0].id).toBe('Item1');
      });

      it('Fails on bad queries', () => {
        expect(() => queryCall(':badquery')).toThrow();
      });

      it('Finds a unique collection of DOM elements from a list of CSS selectors', () => {
        const nodes = queryCall(['.item', '.item.child']) as Element[];

        expect(nodes).toHaveLength(4);
        expect(nodes[3].className).toBe('item child second-child');
      });
    });

    describe('find FIRST', () => {
      it('Find a DOM element matching a given CSS selector: #Item2.item', () => {
        const node = queryCall('#Item2.item', true) as Element;
        expect(node.id).toBe('Item2');
      });

      it('Find a DOM element matching a given CSS selector: #Item2 .item', () => {
        const node = queryCall('#Item2 .item', true) as Element;
        expect(node.className).toBe('item child');
      });

      it('Find a DOM element matching a given CSS selector: .item', () => {
        const node = queryCall('.item', true) as Element;
        expect(node.id).toBe('Item1');
      });

      it('Fails on bad queries', () => {
        expect(() => queryCall(':badquery', true)).toThrow();
      });

      it('Find a DOM element from a list of CSS selectors: space separated string', () => {
        const node = queryCall('.item, .item.child', true) as Element;
        expect(node.id).toBe('Item1');
      });
      it('Find a DOM element from a list of CSS selectors: array', () => {
        const node = queryCall(['.item', '.item.child'], true) as Element;
        expect(node.id).toBe('Item1');
      });
    });
  }

  describe('With no given element', () => {
    suite((...args) => findByQuery(...args));
  });

  describe('With a given element', () => {
    suite((...args) => findByQuery(elm, ...args));
  });
});
