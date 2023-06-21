import { hasAllClassNames, hasAnyClassName, hasClassName } from '@js-fns/web/hasClassName';
import { byId, generateId, insertHtml, removeElement } from './assets/helpers';

const testID = generateId('HasClass');

describe('"hasClassName"', () => {
  let testNode: HTMLElement;

  beforeAll(() => {
    insertHtml(`<div id="${testID}"></div>`);
    testNode = byId(testID);
  });

  beforeEach(() => {
    testNode.className = 'class1 class2';
  });

  afterAll(() => removeElement(testID));

  describe('"hasClassName"', () => {
    it('Detects whether a DOM element has a given class name or not', () => {
      expect(hasClassName(testNode, 'class1')).toBe(true);
      expect(hasClassName(testNode, 'class3')).toBe(false);
    });

    describe('class names as Array', () => {
      it('Detects when a DOM element has all of the given class names', () => {
        expect(hasClassName(testNode, ['class1', 'class2'])).toBe(true);
        expect(hasClassName(testNode, ['class1', 'class3'])).toBe(false);
        expect(hasClassName(testNode, ['class3', 'class4'])).toBe(false);
      });

      it('Detect when a DOM element has any of the given class names (any = true)', () => {
        expect(hasClassName(testNode, ['class1', 'class2'], true)).toBe(true);
        expect(hasClassName(testNode, ['class1', 'class3'], true)).toBe(true);
        expect(hasClassName(testNode, ['class3', 'class4'], true)).toBe(false);
      });
    });
  });

  describe('"hasAnyClass"', () => {
    it('Detects whether a DOM element has a given class name or not', () => {
      expect(hasAnyClassName(testNode, 'class1')).toBe(true);
      expect(hasAnyClassName(testNode, 'class3')).toBe(false);
    });

    it('Detects when a DOM element has any of the given class names', () => {
      expect(hasAnyClassName(testNode, ['class1', 'class2'])).toBe(true);
      expect(hasAnyClassName(testNode, ['class1', 'class3'])).toBe(true);
      expect(hasAnyClassName(testNode, ['class3', 'class4'])).toBe(false);
    });
  });

  describe('"hasAllClassNames"', () => {
    it('Detects whether a DOM element has a given class name or not', () => {
      expect(hasAllClassNames(testNode, 'class1')).toBe(true);
      expect(hasAllClassNames(testNode, 'class3')).toBe(false);
    });

    it('Detects when a DOM element has all of the given class names', () => {
      expect(hasAllClassNames(testNode, ['class1', 'class2'])).toBe(true);
      expect(hasAllClassNames(testNode, ['class1', 'class3'])).toBe(false);
      expect(hasAllClassNames(testNode, ['class3', 'class4'])).toBe(false);
    });
  });
});
