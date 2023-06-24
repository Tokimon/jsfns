import { css } from '@js-fns/web/css';
import { byId, generateId, insertHtml, removeElement } from './assets/helpers';

const testID = generateId('CSS');
const styleID = generateId('CSS_style');

describe('"css"', () => {
  let testNode: HTMLElement;

  beforeAll(() => {
    insertHtml(`
      <style id="${styleID}">
        #${testID} { overflow: hidden; font-size: 15px; line-height: 1.5; }
        #${testID}:after { content: 'after'; }
      </style>
      <div id="${testID}"></div>
    `);

    testNode = byId(testID);
  });

  beforeEach(() => testNode.removeAttribute('style'));

  afterAll(() => {
    removeElement(testID);
    removeElement(styleID);
  });

  it('Reads the current style of a DOM element', () => {
    const styling = css(testNode);
    expect(styling.overflow).toBe('hidden');
  });

  describe('With `property name` given', () => {
    it('Gets the value of the given style property', () => {
      expect(css(testNode, 'overflow')).toBe('hidden');
    });

    it('Converts numeric values to Number', () => {
      expect(css(testNode, 'lineHeight')).toBe(1.5);
    });

    it('Converts `px` values to Number', () => {
      expect(css(testNode, 'fontSize')).toBe(15);
    });

    it('Name can be snake-case', () => {
      expect(css(testNode, 'font-size')).toBe(15);
    });

    describe('And `value`', () => {
      it('Returns all computed css values', () => {
        const result = css(testNode, 'fontSize', '20px');
        expect(result.toString()).toBe(window.getComputedStyle(testNode).toString());
      });

      it('Applies the value to the property as inline style', () => {
        css(testNode, 'fontSize', '20em');
        expect(testNode.style.cssText).toBe('font-size: 20em;');
      });

      it('Applies `px` to numeric values for properties that need units', () => {
        css(testNode, 'fontSize', 20);
        expect(testNode.style.cssText).toBe('font-size: 20px;');
      });

      it('Does not apply `px` to numeric values for properties that does not need units', () => {
        css(testNode, 'lineHeight', 2);
        expect(testNode.style.cssText).toBe('line-height: 2;');
      });

      describe('When value includes `!important` it is taken into account', () => {
        it('Applies the value to the property as inline style', () => {
          css(testNode, 'fontSize', '20em !important');
          expect(testNode.style.cssText).toBe('font-size: 20em !important;');
        });

        it('Applies `px` to numeric values for properties that need units', () => {
          css(testNode, 'fontSize', '20 !important');
          expect(testNode.style.cssText).toBe('font-size: 20px !important;');
        });

        it('Does not apply `px` to numeric values for properties that does not need units', () => {
          css(testNode, 'lineHeight', '2 !important');
          expect(testNode.style.cssText).toBe('line-height: 2 !important;');
        });
      });
    });
  });

  describe('With `property mapping` given', () => {
    it('Returns all computed css values', () => {
      const result = css(testNode, { fontSize: '20px' });
      expect(result.toString()).toBe(window.getComputedStyle(testNode).toString());
    });

    it('Applies the value to the property as inline style', () => {
      css(testNode, { fontSize: '20px' });
      expect(testNode.style.cssText).toBe('font-size: 20px;');
    });

    it('Applies `px` to numeric values for properties that need units', () => {
      css(testNode, { fontSize: 20 });
      expect(testNode.style.cssText).toBe('font-size: 20px;');
    });

    it('Does not apply `px` to numeric values for properties that does not need units', () => {
      css(testNode, { lineHeight: 2 });
      expect(testNode.style.cssText).toBe('line-height: 2;');
    });

    it('When value includes `!important` it is taken into account', () => {
      css(testNode, { fontSize: '20em !important' });
      expect(testNode.style.cssText).toBe('font-size: 20em !important;');
    });

    it('Applies every property in the given mapping', () => {
      css(testNode, { fontSize: '20em !important', color: 'blue', border: '1px solid green' });
      expect(testNode.style.cssText).toBe('font-size: 20em !important; color: blue; border: 1px solid green;');
    });
  });
});
