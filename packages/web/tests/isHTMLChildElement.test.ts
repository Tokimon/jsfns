import { type SpiedGetter } from 'jest-mock';
import { isHTMLChildElement } from '@jsfns/web/isHTMLChildElement';
import { appendFrame, byId, createDetachedDocument, createElement, generateId, insertHtml, removeElement } from './assets/helpers';
import { mockOffsetParent } from './assets/mocks';

const testID = generateId('IsDOMChildNode');

describe('"isHTMLChildElement"', () => {
  let spy: SpiedGetter<Element | null>;

  beforeAll(() => {
    insertHtml(`
      <div id="${testID}">
        <span></span>
      </div>
    `);

    spy = mockOffsetParent(HTMLElement.prototype);
  });

  afterAll(() => {
    spy.mockRestore();
    removeElement(testID);
  });

  describe('Returns `true` for', () => {
    it('HTML Elements that is a descendant of the DOM root element', () => {
      const testNode = byId(testID);
      expect(isHTMLChildElement(testNode)).toBe(true);
      expect(isHTMLChildElement(testNode.firstElementChild)).toBe(true);
    });

    it('HTML Elements in a Frame', () => {
      const frame = appendFrame();
      const { body } = frame.contentDocument as Document;
      body.innerHTML = '<div></div>';

      const iframeSpy = mockOffsetParent((frame.contentWindow as unknown as typeof globalThis).HTMLElement.prototype);

      expect(isHTMLChildElement(body.firstElementChild)).toBe(true);

      frame.remove();
      iframeSpy.mockRestore();
    });

    it('HTML Elements from a detached document', () => {
      const { body } = createDetachedDocument();
      body.innerHTML = '<div></div>';
      expect(isHTMLChildElement(body.firstElementChild)).toBe(true);
    });
  });

  describe('Returns `false` for', () => {
    it('HTML Elements not in the DOM', () => {
      const div = createElement('div');
      expect(isHTMLChildElement(div)).toBe(false);
    });

    it('HTML Elements of a DOM element not in the DOM', () => {
      const div = createElement('div');
      div.innerHTML = '<b></b>';
      const first = div.firstElementChild;

      expect(isHTMLChildElement(first)).toBe(false);
    });

    it.each([
      ['Document', document],
      ['<html> element', document.documentElement],
      ['<body> element', document.body],
    ])('DOM root elements', (_, elm) => {
      expect(isHTMLChildElement(elm)).toBe(false);
    });
  });
});
