import { removeClass } from '@jsfns/web/removeClass';
import { byId, createElement, generateId, insertHtml, removeElement } from './assets/helpers';

const testID = generateId('RemoveClass');

describe('"removeClass"', () => {
  let testNode: HTMLElement;

  beforeAll(() => {
    insertHtml(`<div id="${testID}"></div>`);
    testNode = byId(testID);
  });

  beforeEach(() => {
    testNode.className = 'class';
  });

  afterAll(() => removeElement(testID));

  it('Removes a given CSS class from a DOM element', () => {
    expect(testNode.className).toBe('class');
    removeClass(testNode, 'class');
    expect(testNode.className).toBe('');
  });

  it('Returns the given element', () => {
    const div = createElement('div');
    expect(removeClass(div, 'class')).toBe(div);
  });

  it('Returns null when given element is null', () => {
    expect(removeClass(null, 'class')).toBeNull();
  });

  describe('Multiple class names', () => {
    it('Removes several CSS classes from a DOM element', () => {
      testNode.className = 'class added class3';

      removeClass(testNode, ['class', 'added', 'class3']);
      expect(testNode.className).toBe('');
    });

    it('Only removes existing CSS classes from a DOM element', () => {
      testNode.className = 'class class3 not-removed';

      removeClass(testNode, ['class', 'added', 'class3']);
      expect(testNode.className).toBe('not-removed');
    });
  });
});
