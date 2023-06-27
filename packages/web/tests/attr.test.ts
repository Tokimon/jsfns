import { attr } from '@jsfns/web/attr';
import { byId, generateId, insertHtml, removeElement } from './assets/helpers';

const testID = generateId('Attr');

describe('"attr"', () => {
  let testNode: HTMLElement;

  const attrs = {
    normal: ['title', 'title attribute'] as const,
    custom: ['custom', 'custom attribute'] as const,
    data: ['data-attr', 'data attribute'] as const,
  };

  beforeAll(() => {
    insertHtml(`<div id="${testID}"></div>`);
    testNode = byId(testID);
  });

  beforeEach(() => {
    testNode.setAttribute(...attrs.normal);
    testNode.setAttribute(...attrs.custom);
    testNode.setAttribute(...attrs.data);
  });

  afterAll(() => removeElement(testID));

  it.each([
    ['normal', ...attrs.normal],
    ['custom', ...attrs.custom],
    ['data', ...attrs.data],
  ])('Retrieves the value of a "%s" attribute on a DOM element', (_, key, value) => {
    expect(attr(testNode, key)).toBe(value);
  });

  describe.each([
    ['normal', ...attrs.normal],
    ['custom', ...attrs.custom],
    ['data', ...attrs.data],
  ])('Setting the value of a "%s" attribute on a DOM element', (_, key, value) => {
    beforeEach(() => {
      testNode.setAttribute(key, value);
    });

    it('Sets the new value', () => {
      attr(testNode, key, 'new value');
      expect(testNode.getAttribute(key)).toBe('new value');
    });

    it('Returns the old value', () => {
      expect(attr(testNode, key, 'new value')).toBe(value);
    });

    it('Sets an empty attribute on a DOM element when value is true', () => {
      attr(testNode, key, true);
      expect(testNode.getAttribute(key)).toBe('');
    });
  });

  describe('Removes the attribute from a DOM element when value is', () => {
    it.each([false, null])('%s', (value) => {
      const initialValue = 'To Remove';
      testNode.setAttribute('toRemove', initialValue);

      expect(testNode.getAttribute('toRemove')).toBe(initialValue);

      const oldValue = attr(testNode, 'toRemove', value);

      expect(oldValue).toBe(initialValue);
      expect(testNode.getAttribute('toRemove')).toBeNull();
    });
  });
});
