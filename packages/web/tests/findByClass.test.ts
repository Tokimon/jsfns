import { findByClass } from '@jsfns/web/findByClass';
import { byId, insertHtml, removeElement } from './assets/helpers';

describe('"findByClass"', () => {
  beforeAll(() =>
    insertHtml(`
    <div id='Item1' class="item"></div>
    <div id='Item2' class="item second">
      <div class='item'></div>
      <div class='item child'></div>
      <div class='item child second-child'></div>
    </div>
  `)
  );

  afterAll(() => ['Item1', 'Item2'].forEach((id) => removeElement(id)));

  it('Finds DOM elements with a given class name', () => {
    const nodes = findByClass('item');

    expect(nodes).toHaveLength(5);
    expect(nodes[1].id).toBe('Item2');
  });

  it('Finds DOM elements with all given class names', () => {
    const nodes = findByClass('item child');

    expect(nodes).toHaveLength(2);
    expect(nodes[1].className).toBe('item child second-child');
  });

  describe('With multiple queries', () => {
    it('Finds a unique DOM element collection from a list of classnames', () => {
      const nodes = findByClass(['item', 'item child']);

      expect(nodes).toHaveLength(5);
      expect(nodes[2].className).toBe('item');
      expect(nodes[4].className).toBe('item child second-child');
    });
  });

  describe('With defined elm', () => {
    let elm: HTMLElement;

    beforeAll(() => {
      elm = byId('Item2');
    });

    it.each([null, undefined])('Returns empty array when given element is falsy: %s', (elm) => {
      expect(findByClass(elm, 'item')).toHaveLength(0);
    });

    it('Finds DOM elements with a given class name', () => {
      const nodes = findByClass(elm, 'item');

      expect(nodes).toHaveLength(3);
      expect(nodes[0].className).toBe('item');
    });

    it('Finds DOM elements with all given class names', () => {
      const nodes = findByClass(elm, 'item child');

      expect(nodes).toHaveLength(2);
      expect(nodes[1].className).toBe('item child second-child');
    });

    describe('With multiple queries', () => {
      it('Finds a unique DOM element collection from a list of classnames', () => {
        const nodes = findByClass(elm, ['item', 'item child']);

        expect(nodes).toHaveLength(3);
        expect(nodes[0].className).toBe('item');
        expect(nodes[2].className).toBe('item child second-child');
      });
    });
  });
});
