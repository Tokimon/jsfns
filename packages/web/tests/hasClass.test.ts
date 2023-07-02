import { hasAllClass, hasAnyClass, hasClass } from '@jsfns/web/hasClass';
import { byId, generateId, insertHtml, removeElement } from './assets/helpers';

const testID = generateId('HasClass');

describe('"hasClass"', () => {
  let testNode: HTMLElement;

  beforeAll(() => {
    insertHtml(`<div id="${testID}"></div>`);
    testNode = byId(testID);
  });

  beforeEach(() => {
    testNode.className = 'class1 class2';
  });

  afterAll(() => removeElement(testID));

  describe('"hasClass"', () => {
    it('Detects whether a DOM element has a given class name or not', () => {
      expect(hasClass(testNode, 'class1')).toBe(true);
      expect(hasClass(testNode, 'class3')).toBe(false);
    });

    it('Returns false when given element is null', () => {
      expect(hasClass(null, 'class1')).toBe(false);
    });

    describe('class names as Array', () => {
      it('Detects when a DOM element has all of the given class names', () => {
        expect(hasClass(testNode, ['class1', 'class2'])).toBe(true);
        expect(hasClass(testNode, ['class1', 'class3'])).toBe(false);
        expect(hasClass(testNode, ['class3', 'class4'])).toBe(false);
      });

      it('Detect when a DOM element has any of the given class names (any = true)', () => {
        expect(hasClass(testNode, ['class1', 'class2'], true)).toBe(true);
        expect(hasClass(testNode, ['class1', 'class3'], true)).toBe(true);
        expect(hasClass(testNode, ['class3', 'class4'], true)).toBe(false);
      });
    });
  });

  describe('"hasAnyClass"', () => {
    it('Detects whether a DOM element has a given class name or not', () => {
      expect(hasAnyClass(testNode, 'class1')).toBe(true);
      expect(hasAnyClass(testNode, 'class3')).toBe(false);
    });

    it('Detects when a DOM element has any of the given class names', () => {
      expect(hasAnyClass(testNode, ['class1', 'class2'])).toBe(true);
      expect(hasAnyClass(testNode, ['class1', 'class3'])).toBe(true);
      expect(hasAnyClass(testNode, ['class3', 'class4'])).toBe(false);
    });
  });

  describe('"hasAllClass"', () => {
    it('Detects whether a DOM element has a given class name or not', () => {
      expect(hasAllClass(testNode, 'class1')).toBe(true);
      expect(hasAllClass(testNode, 'class3')).toBe(false);
    });

    it('Detects when a DOM element has all of the given class names', () => {
      expect(hasAllClass(testNode, ['class1', 'class2'])).toBe(true);
      expect(hasAllClass(testNode, ['class1', 'class3'])).toBe(false);
      expect(hasAllClass(testNode, ['class3', 'class4'])).toBe(false);
    });
  });
});
